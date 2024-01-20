根据 [jqp-amis-editor](https://gitee.com/hyz79/jqp-amis-editor) 项目修改。

将AMIS Editor的功能封装为独立使用的JS，使用时只要嵌入IFrame即可。
通过postMessage实现与iframe的通信。

具体使用方式参见demo.html

```javascript

    var frame = document.getElementById('editorIFrame');
    var inited = false;
    window.addEventListener("message",event=>{
      if(event.data == 'amis-editor-inited'){
        if(inited)
          return
        inited = true;
        var msg = {
          type:'setSchema',
          data: {
            type: 'page',
            title: 'Test Page',
            body: 'MyPage'
          }
        }
        frame.contentWindow.postMessage(JSON.stringify(msg),"*")
      }else if(event.data == 'amis-editor-exit'){
        alert('exit')
      }else{
        var data = JSON.parse(event.data)
        if(data.type == 'save'){
          alert('save:' + JSON.stringify(data.data))
        }
      }
    })
````      
