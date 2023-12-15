import { noop, themeable, localeable, uncontrollable, autobind, FormItem, unRegisterRenderer, Renderer, isEffectiveApi } from "amis-core";
import * as React from "react";
import React__default, { useRef, useCallback, useState } from "react";
import { PickerContainer, ResultBox } from "amis-ui";
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
class PopupEditor extends React__default.Component {
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
    return /* @__PURE__ */ React__default.createElement("div", { className: cx("CPGroup-result"), dangerouslySetInnerHTML: html });
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
    return /* @__PURE__ */ React__default.createElement(
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
      ({ onClick, isOpened }) => /* @__PURE__ */ React__default.createElement(
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
          actions: pickerIcon && /* @__PURE__ */ React__default.createElement("span", { className: cx("CBPicker-trigger"), onClick }, pickerIcon),
          onResultClick: onClick
        }
      )
    );
  }
}
__decorateClass$2([
  autobind
], PopupEditor.prototype, "handleClear", 1);
__decorateClass$2([
  autobind
], PopupEditor.prototype, "highlightValue", 1);
const PopupEditor$1 = themeable(
  localeable(
    uncontrollable(PopupEditor, {
      value: "onChange"
    })
  )
);
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
class PopupEditorControl extends React__default.Component {
  renderPickerIcon() {
    const { render, pickerIcon } = this.props;
    return pickerIcon ? render("picker-icon", pickerIcon) : void 0;
  }
  render() {
    const { className, classnames: cx, style, pickerIcon, ...rest } = this.props;
    return /* @__PURE__ */ React__default.createElement("div", { className: cx(`ConditionBuilderControl`, className) }, /* @__PURE__ */ React__default.createElement(
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
PopupEditorRenderer = __decorateClass$1([
  FormItem({
    type: "popup-editor",
    strictMode: false
  })
], PopupEditorRenderer);
function useSplitter(options) {
  const codeWrapRef = useRef(null);
  const start = useRef({ startX: 0, startWidth: 0 });
  const handleResizeMouseDown = useCallback((e) => {
    const isRightMB = e.nativeEvent.which === 3;
    if (isRightMB) {
      return;
    }
    const current = e.currentTarget.parentElement;
    if (!current)
      return;
    const handleResizeMouseMove = (e2) => {
      const dx = e2.clientX - start.current.startX;
      const mx = start.current.startWidth + (options.alignRight ? -dx : dx);
      const width = Math.min(Math.max(mx, options.asideMinWidth), options.asideMaxWidth);
      if (codeWrapRef.current)
        codeWrapRef.current.style.width = `${width}px`;
    };
    const handleResizeMouseUp = () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };
    codeWrapRef.current = current;
    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
    start.current.startX = e.clientX;
    start.current.startWidth = current.offsetWidth;
  }, []);
  return [handleResizeMouseDown];
}
const designer = "";
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
function updateMainData(data, values) {
  return {
    ...data,
    ...cleanData(values)
  };
}
function updateElement(data, elm, values) {
  return {
    ...data,
    [elm.groupName]: {
      ...data == null ? void 0 : data[elm.groupName],
      [elm.elementId]: cleanData(values)
    }
  };
}
function removeElement(data, elm) {
  return {
    ...data,
    [elm.groupName]: {
      ...data == null ? void 0 : data[elm.groupName],
      [elm.elementId]: void 0
    }
  };
}
function getDesignerAction(action) {
  var _a;
  if ((_a = action.actionType) == null ? void 0 : _a.startsWith("designer:"))
    return action.actionType.substring("designer:".length);
  if (action.api instanceof String) {
    if (action.api.startsWith("designer://"))
      return action.api.substring("designer://".length);
  }
  return;
}
function cleanData(data) {
  const { __super, __pristine, __prev, ...ret } = data || {};
  return ret;
}
function GraphDesigner(props) {
  const {
    className,
    toolbarClassName,
    classnames: cx,
    onAction,
    style,
    render,
    minPanelWidth,
    maxPanelWidth,
    initApi,
    saveApi,
    toolbar,
    value,
    onChange,
    ...rest
  } = props;
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [graphData, setGraphData] = useState((value == null ? void 0 : value.data) || {});
  const [graphDiagram, setGraphDiagram] = useState((value == null ? void 0 : value.diagram) || {});
  const [inited, setInited] = useState(false);
  const [currentElement, setCurrentElement] = useState({
    groupName: "main",
    elementType: "default",
    elementId: "default"
  });
  const editorCallbacks = React.useRef([]);
  const [handleResizeMouseDown] = useSplitter({
    alignRight: true,
    asideMinWidth: minPanelWidth || 50,
    asideMaxWidth: maxPanelWidth || 800
  });
  if (!inited) {
    setInited(true);
    if (isEffectiveApi(initApi, props.data)) {
      const store = props.store;
      store.fetchData(initApi, props.data).then((res) => {
        setGraphData(res || {});
      });
    }
  }
  function selectMain() {
    setCurrentElement({ groupName: "main", elementType: "default", elementId: "default" });
  }
  const handleAction = useCallback((e, action, ctx, throwErrors = false, delegate) => {
    const designerAction = getDesignerAction(action);
    if (designerAction == "save") {
      const data = { data: graphData, diagram: graphDiagram };
      if (onChange && (graphData != (value == null ? void 0 : value.data) || graphDiagram != (value == null ? void 0 : value.diagram)))
        onChange(data);
      if (isEffectiveApi(saveApi, action.data)) {
        const store = props.store;
        store.fetchData(saveApi, { data });
      } else {
        console.log("designer:save", data);
      }
      return;
    } else if (designerAction == "selectMain") {
      selectMain();
      return;
    }
    onAction && onAction(e, action, ctx, throwErrors, delegate);
  }, [currentElement, graphData]);
  const handleEditorAction = useCallback((e, action, ctx, throwErrors = false, delegate) => {
    if (action.actionType == "submit") {
      if (currentElement && currentElement.groupName != "main") {
        let group = graphData[currentElement.groupName] || (graphData[currentElement.groupName] = {});
        group[currentElement.elementId] = action.payload;
      }
      return;
    }
    onAction && onAction(e, action, ctx, throwErrors, delegate);
  }, [currentElement, graphData]);
  const handleEditorChange = useCallback((values) => {
    if (currentElement && currentElement.groupName != "main") {
      let data = updateElement(graphData, currentElement, values);
      setGraphData(data);
    } else if (currentElement && currentElement.groupName == "main") {
      let data = updateMainData(graphData, values);
      setGraphData(data);
    }
  }, [currentElement, graphData]);
  const handleEditorEvent = useCallback((event, data) => {
    if (event == "selectElement") {
      setCurrentElement(data);
      setShowRightPanel(data != null);
    } else if (event == "selectMain") {
      selectMain();
    } else if (event == "removeElement") {
      if (data.elementId == currentElement.elementId) {
        selectMain();
      }
      let newData = removeElement(graphData, data);
      setGraphData(newData);
    }
    editorCallbacks.current.forEach((callback) => {
      callback(event, data);
    });
  }, [editorCallbacks]);
  const registerEditorCallback = useCallback((callback) => {
    editorCallbacks.current.push(callback);
  }, [editorCallbacks]);
  const subProps = {
    onAction: handleAction,
    onEditorEvent: handleEditorEvent,
    registerEditorCallback
  };
  function renderToolbar() {
    return /* @__PURE__ */ React.createElement("div", { className: cx(`GraphDesigner-toolbar`, toolbarClassName) }, render("toolbar", toolbar || "", subProps));
  }
  function renderRightPanel() {
    var _a, _b, _c;
    let schema;
    let data;
    if (!currentElement || currentElement.groupName == "main") {
      schema = (_a = props.subEditors["main"]) == null ? void 0 : _a.default;
      data = graphData;
    } else {
      schema = (_b = props.subEditors[currentElement.groupName]) == null ? void 0 : _b[currentElement.elementType];
      data = (_c = graphData == null ? void 0 : graphData[currentElement.groupName]) == null ? void 0 : _c[currentElement.elementId];
    }
    if (!schema)
      return null;
    if (!data)
      data = {};
    return /* @__PURE__ */ React.createElement("div", { className: cx(`GraphDesigner-rightPanel`) }, /* @__PURE__ */ React.createElement(
      "div",
      {
        onMouseDown: handleResizeMouseDown,
        className: cx(`GraphDesigner-panelResizor`)
      }
    ), render("subEditor", schema || "", {
      ...subProps,
      data,
      onAction: handleEditorAction,
      onChange: handleEditorChange
    }));
  }
  return /* @__PURE__ */ React.createElement("div", { className: cx("GraphDesigner", className) }, toolbar ? renderToolbar() : null, /* @__PURE__ */ React.createElement("div", { className: cx("GraphDesigner-inner") }, /* @__PURE__ */ React.createElement("div", { className: cx("GraphDesigner-main") }, render("main", props.mainEditor, subProps)), showRightPanel ? renderRightPanel() : null));
}
unRegisterRenderer("nop-graph-designer");
let GraphDesignerRenderer = class extends React.Component {
  render() {
    const props = this.props;
    return /* @__PURE__ */ React.createElement(GraphDesigner, { ...props });
  }
};
GraphDesignerRenderer = __decorateClass([
  Renderer({
    type: "nop-graph-designer"
  })
], GraphDesignerRenderer);
export {
  PopupEditor$1 as PopupEditor
};
