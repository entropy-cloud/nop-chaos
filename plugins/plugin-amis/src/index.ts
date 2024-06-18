import AmisSchemaPage from './AmisSchemaPage';
import AmisPageEditor from './AmisPageEditor.vue';
import AmisToast from './AmisToast.vue';

import './nop-page-scope.tsx'

import { XuiPageEditorButton } from './XuiPageEditorButton';

import AmisVueComponent from './AmisVueComponent';
import {
  registerAdapter,
  registerModule,
  SchemaComponentProps,
  EditorComponentProps,
  registerSchemaProcessorType,
  addRenderComponentEventListener
} from '@nop-chaos/sdk';

import './register-action'

import type { Plugin} from '@nop-chaos/sdk'

import {
  alert,
  confirm,
  toast,
  ToastLevel,
  ToastConf,
  dataMapping
} from 'amis';

import { h } from 'vue';
import { transformSchemaFromStdAmis, transformSchemaToStdAmis} from './amis-json-transform'
import type { RenderComponentConfig, SchemaProcessorType } from '@nop-chaos/sdk';
import { defineAmisComponent } from './define-amis-component';

const AmisSchemaType: SchemaProcessorType = {
  renderPageSchema(props: SchemaComponentProps) {
    const schema = transformSchemaToStdAmis(props.schema)
    return h(AmisSchemaPage, { ...props,schema });
  },

  renderEditor(props: EditorComponentProps, onExit: () => void) {
    return h(AmisPageEditor, { ...props, onExit: onExit });
  },

  transformSchemaIn: transformSchemaToStdAmis,
  transformSchemaOut: transformSchemaFromStdAmis
};

let cleanup:any = null;

function install() {
  registerAdapter({
    dataMapping,
    alert,
    confirm,
    notify(type: ToastLevel, msg: any, conf?: ToastConf): void {
      // AMSI 6之后msg不再是string类型，而是传入了VDOM节点
      if (msg instanceof String && msg.startsWith('_')) return;
      conf = { closeButton: true, ...conf };
      toast[type]
        ? toast[type](msg, conf)
        : console.warn('[notify]', type, msg);
      console.log('[notify]', type, msg);
    }
  });

  registerSchemaProcessorType('amis', AmisSchemaType);
  registerSchemaProcessorType('default', AmisSchemaType);

  cleanup  = addRenderComponentEventListener((name:string, config:RenderComponentConfig)=>{
      if(name == 'register' && config.amis){
        // 注册react控件且标记为amis支持，应该增加一个AMIS包装对象
        defineAmisComponent({
          type: config.name,
          autoVar: config.autoVar,
          isolateScope: config.isolateScope,
          isFormItem: config.isFormItem,
          reactComponent: config.reactComponent,
          component:null
        })
      }
  })
}

function uninstall(){
  if(cleanup)
    cleanup();
}

export function loadPlugin(): Plugin{
  return {
    name: "plugin-amis",
    install,
    uninstall,

    vueRenderInMainPage(){
      return h(AmisToast,{theme:'cxd'})
    }
  }
}

export {
  AmisPageEditor,
  AmisSchemaPage,
  AmisToast,
  AmisVueComponent,
  XuiPageEditorButton
};
