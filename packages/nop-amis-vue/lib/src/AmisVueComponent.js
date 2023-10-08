import React from 'react';
import { FormItem, Renderer, ScopedContext } from 'amis';
import { createObject, resolveVariableAndFilter } from 'amis-core';
import { useAdapter } from '@nop-chaos/nop-core';
import { applyPureVueInReact } from 'veaury';
const { resolveVueComponent } = useAdapter();
export default class VueControl extends React.Component {
    constructor(props) {
        super(props);
        this.vueComponent = applyPureVueInReact(resolveVueComponent(props.vueComponent));
    }
    doAction(action, data, throwErrors) {
        const { resetValue, onChange } = this.props;
        const actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange(undefined);
        }
        else if (actionType === 'reset') {
            onChange(resetValue);
        }
    }
    async dispatchChangeEvent(eventData = {}) {
        const { dispatchEvent, data, onChange } = this.props;
        const rendererEvent = await dispatchEvent('change', createObject(data, {
            value: eventData
        }));
        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
            return;
        }
        onChange && onChange(eventData);
    }
    render() {
        let { props, value, env, store } = this.props;
        if (props) {
            props = Object.assign({}, props);
            for (const key of Object.keys(props)) {
                if (typeof props[key] === 'string') {
                    props[key] = resolveVariableAndFilter(props[key], this.props.data, '| raw');
                }
            }
        }
        let mergedProps = Object.assign(Object.assign({ env, store }, props), { value, 'onUpdate:value': ((value) => this.dispatchChangeEvent(value)) });
        return React.createElement(this.vueComponent, mergedProps);
    }
}
// @Renderer({
//     type: 'vue-renderer',
//     autoVar:true
// })
class VueRenderer extends VueControl {
    constructor(props) {
        super(props);
        const scoped = this.context;
        if (scoped)
            scoped.registerComponent(this);
    }
    componentWillUnmount() {
        const scoped = this.context;
        if (scoped)
            scoped.unRegisterComponent(this);
    }
}
VueRenderer.contextType = ScopedContext;
// autoVar只对最顶层的string字符串属性有效
Renderer({
    type: 'vue-renderer',
    autoVar: false
})(VueRenderer);
// @FormItem({
//     type: 'vue-form-item',
//     autoVar:true
// })
class VueFormItem extends VueControl {
}
FormItem({
    type: 'vue-form-item',
    autoVar: false
})(VueFormItem);
// export default class WebComponent extends React.Component<RendererProps> {
//     renderBody(): JSX.Element | null {
//       const {body, render} = this.props;
//       return body ? (render('body', body) as JSX.Element) : null;
//     }
//     render() {
//       const {tag, props, data} = this.props;
//       const propsValues = mapValues(props, s => {
//         if (typeof s === 'string') {
//           return resolveVariableAndFilter(s, data, '| raw') || s;
//         } else {
//           return s;
//         }
//       });
//       const Component = (tag as keyof JSX.IntrinsicElements) || 'div';
//       return <Component {...propsValues}>{this.renderBody()}</Component>;
//     }
//   }
//   @Renderer({
//     type: 'web-component'
//   })
//   export class WebComponentRenderer extends WebComponent {}
