import { noop, themeable, localeable, uncontrollable, autobind, FormItem } from "amis-core";
import React from "react";
import { PickerContainer, ResultBox } from "amis-ui";
import { unRegisterRenderer, isEffectiveApi, Renderer } from "amis";
import { GraphDesigner } from "@nop-chaos/nop-graph-designer";
import { RenderContextKey } from "@nop-chaos/nop-react-core";
import { FlowBuilder } from "@nop-chaos/nop-flow-builder";
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
class PopupEditor extends React.Component {
  handleClear() {
    this.props.onChange();
  }
  highlightValue(value) {
    const { classnames: cx, translate: __ } = this.props;
    const html = {
      __html: `<span class="label label-info">${__(
        "Condition.configured"
      )}</span>`
    };
    return /* @__PURE__ */ React.createElement("div", { className: cx("CPGroup-result"), dangerouslySetInnerHTML: html });
  }
  renderBody(onChange, value, popOverContainer) {
    const {
      popup,
      render,
      ...rest
    } = this.props;
    const props = { ...rest, value, onChange };
    return render("popup", popup, props);
  }
  render() {
    const {
      classnames: cx,
      placeholder,
      pickerIcon,
      locale,
      translate,
      classPrefix,
      onChange: onFinalChange,
      value,
      title,
      disabled,
      popOverContainer
    } = this.props;
    return /* @__PURE__ */ React.createElement(
      PickerContainer,
      {
        classnames: cx,
        classPrefix,
        translate,
        locale,
        onConfirm: onFinalChange,
        value,
        size: "md",
        popOverContainer,
        bodyRender: (params) => this.renderBody(params.onChange, params.value, popOverContainer),
        title
      },
      ({ onClick, isOpened }) => /* @__PURE__ */ React.createElement(
        ResultBox,
        {
          classnames: cx,
          classPrefix,
          translate,
          locale,
          className: cx("CBGroup-result", { "is-active": isOpened }),
          allowInput: false,
          clearable: true,
          result: value,
          itemRender: this.highlightValue,
          onResultChange: noop,
          onClear: this.handleClear,
          disabled,
          borderMode: "full",
          placeholder,
          actions: pickerIcon && /* @__PURE__ */ React.createElement("span", { className: cx("CBPicker-trigger"), onClick }, pickerIcon),
          onResultClick: onClick
        }
      )
    );
  }
}
__decorateClass$3([
  autobind
], PopupEditor.prototype, "handleClear", 1);
__decorateClass$3([
  autobind
], PopupEditor.prototype, "highlightValue", 1);
const PopupEditor$1 = themeable(
  localeable(
    uncontrollable(PopupEditor, {
      value: "onChange"
    })
  )
);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
class PopupEditorControl extends React.Component {
  renderPickerIcon() {
    const { render, pickerIcon } = this.props;
    return pickerIcon ? render("picker-icon", pickerIcon) : void 0;
  }
  render() {
    const { className, classnames: cx, style, pickerIcon, ...rest } = this.props;
    return /* @__PURE__ */ React.createElement("div", { className: cx(`ConditionBuilderControl`, className) }, /* @__PURE__ */ React.createElement(
      PopupEditor$1,
      {
        pickerIcon: this.renderPickerIcon(),
        ...rest
      }
    ));
  }
}
let PopupEditorRenderer = class extends PopupEditorControl {
};
PopupEditorRenderer = __decorateClass$2([
  FormItem({
    type: "popup-editor",
    strictMode: false
  })
], PopupEditorRenderer);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
unRegisterRenderer("nop-graph-designer");
let GraphDesignerRenderer = class extends React.Component {
  constructor(props) {
    super(props);
    this.eventCallbacks = {};
    this.state = {};
    this.handleAmisAction = this.handleAmisAction.bind(this);
    this.amisRender = this.amisRender.bind(this);
    this.amisExecutor = this.amisExecutor.bind(this);
    this.registerEventCallback = this.registerEventCallback.bind(this);
  }
  handleAmisAction(e, action, ctx, throwErrors = false, delegate) {
    var _a, _b, _c;
    if ((_a = action.actionType) == null ? void 0 : _a.startsWith("designer:")) {
      const list = this.eventCallbacks["delegate"];
      if (list) {
        list.forEach((callback) => {
          callback(action.actionType || "", action.payload, this.props);
        });
      }
      return;
    }
    return (_c = (_b = this.props).onAction) == null ? void 0 : _c.call(_b, e, action, ctx, throwErrors, delegate);
  }
  amisRender(name, schema, opts, ctx) {
    return this.props.render(name, schema, { ...opts, onAction: this.handleAmisAction });
  }
  amisExecutor(api, data, ctx) {
    const store = this.props.store;
    if (store) {
      if (!isEffectiveApi(api, data))
        return;
      return store.fetchData(api, data).then((res) => res.data);
    }
    return;
  }
  registerEventCallback(source, callback) {
    if (source == "delegate") {
      const list = this.eventCallbacks[source] = this.eventCallbacks[source] || [];
      list.push(callback);
      return () => {
        const index = list.indexOf(callback);
        index >= 0 && list.splice(index, 1);
      };
    }
    return () => {
    };
  }
  render() {
    const props = this.props;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(RenderContextKey.Provider, { value: {
      render: this.amisRender,
      executor: this.amisExecutor,
      observeEvent: this.registerEventCallback
    } }, /* @__PURE__ */ React.createElement(GraphDesigner, { ...props, onAction: this.handleAmisAction })));
  }
};
GraphDesignerRenderer = __decorateClass$1([
  Renderer({
    type: "nop-graph-designer"
  })
], GraphDesignerRenderer);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
unRegisterRenderer("nop-flow-builder");
let FlowBulderRenderer = class extends React.Component {
  render() {
    const props = this.props;
    return /* @__PURE__ */ React.createElement(FlowBuilder, { ...props });
  }
};
FlowBulderRenderer = __decorateClass([
  Renderer({
    type: "nop-flow-builder"
  })
], FlowBulderRenderer);
export {
  PopupEditor$1 as PopupEditor
};
