import {
    ListenerAction,
    ListenerContext,
    registerAction,
    RendererAction,
    isExpression,
    resolveVariableAndFilterForAsync
  } from 'amis-core';
  import {RendererEvent} from 'amis-core';
  import {cloneDeep} from 'lodash-es'
  
  // 动作定义
  interface IActionInvoke extends ListenerAction {
    actionType: 'action:invoke';
    actionName: string,
    args: Record<string,any>
  }
  
  /**
   * 我的动作实现
   */
  class ActionInvoke implements RendererAction {
    async run(action: ListenerAction, renderer: ListenerContext, event: RendererEvent<any>, mergeData?: any) {
      const props = renderer.props;
      let data = action.args?.data;
      
      data = cloneDeep(data||{})

      const actionData = {
        actionType: action.actionName,
        data
      }
  
      return props.onAction?.(event,actionData,{data})
    }
  }
  
  // 注册自定义动作
  registerAction('action:invoke', new ActionInvoke());
  