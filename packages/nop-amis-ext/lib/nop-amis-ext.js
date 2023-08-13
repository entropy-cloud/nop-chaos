import { noop, themeable, localeable, uncontrollable, autobind, FormItem } from "amis-core";
import React from "react";
import { PickerContainer, ResultBox } from "amis-ui";
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
__decorateClass$1([
  autobind
], PopupEditor.prototype, "handleClear", 1);
__decorateClass$1([
  autobind
], PopupEditor.prototype, "highlightValue", 1);
const PopupEditor$1 = themeable(
  localeable(
    uncontrollable(PopupEditor, {
      value: "onChange"
    })
  )
);
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
PopupEditorRenderer = __decorateClass([
  FormItem({
    type: "popup-editor",
    strictMode: false
  })
], PopupEditorRenderer);
export {
  PopupEditor$1 as PopupEditor
};
