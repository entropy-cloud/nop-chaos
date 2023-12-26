<template>
  <iframe style="width: 100%; height: 100%; border: none" ref="editorRef" src="/amis-editor/index.html"></iframe>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';
import { ajaxFetch } from '@nop-chaos/nop-core';
import { isString } from 'lodash-es'

export default defineComponent({
  props: {
    schema: Object,
    rollbackPageSource: Function,
    getPageSource: {
      type: Function,
      required: true
    },
    savePageSource: {
      type: Function,
      required:true
    }
  },

  emits: ["exit"],

  setup(props, { emit }) {
    const editorRef = ref(null);
    let fetched = false;

    const { savePageSource, rollbackPageSource, getPageSource } = props

    function handleEvent(event: MessageEvent) {
      if (event.data == 'amis-editor-inited') {
        if (fetched) return;
        
        var msg = {
          type: 'setSchema',
          data: props.schema,
        };
        postMsg(msg);

      } else if (event.data === 'amis-editor-reload') {
        fetched = false;
        startFetch()
      } else if (event.data === 'amis-editor-exit') {
        emit('exit');
      } else if (event.data === 'amis-editor-rollback') {
        //deletePageCache(props.path)
        if (rollbackPageSource) {
          rollbackPageSource().then(() => {
            postMsg({
              type: 'toast',
              level: 'info',
              message: '回滚成功'
            })
          }).catch(e => {
            postMsg({
              type: 'toast',
              level: 'error',
              message: e.message || e.toString()
            })
          }).then(() => {
            fetched = false
            return startFetch()
          });
        }
      } else if (isString(event.data) && event.data.startsWith('{')) {
        var data = JSON.parse(event.data);
        if (data.type == 'save') {
          savePageSource(data.data).then(() => {
            postMsg({
              type: 'toast',
              message: '保存成功'
            })
          }).catch(e => {
            postMsg({
              type: 'toast',
              level: 'error',
              message: e.message || e.toString()
            })
          });
        } else if (data.type == 'ajaxFetch') {
          ajaxFetch(data.data).then(result => {
            postMsg({
              type: 'ajaxComplete',
              reqId: data.reqId,
              result
            })
          })
        }
      } else {
        console.log("unknown-message", event.data)
      }
    }

    function postMsg(msg: any) {
      const frame: any = editorRef.value;
      if (!frame) return;
      const str = isString(msg) ? msg : JSON.stringify(msg)
      frame.contentWindow.postMessage(str, "*")
    }

    function startFetch() {
      const frame: any = editorRef.value;
      if (!frame) return;
      fetched = true
      return getPageSource(true).then((page) => {
        postMsg({
          type: 'toast',
          level: 'info',
          message: '页面加载成功'
        })

        var msg = {
          type: 'setSchema',
          data: page,
        };
        postMsg(msg);
      }).catch(e => {
        postMsg({
          type: 'toast',
          level: 'error',
          message: e.message || e.toString()
        });
        throw e
      });
    }

    window.addEventListener('message', handleEvent);

    // onMounted(() => {
    //   console.log("editor mounted:" + editorRef.value)
    //   if (inited) {
    //     startFetch();
    //   }
    // })

    onUnmounted(() => {
      console.log("editor unmounted")
      window.removeEventListener('message', handleEvent);
    });


    return {
      editorRef
    }
  }

})


</script>