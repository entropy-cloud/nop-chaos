import * as React from "react";
import { useRef, useCallback, useState } from "react";
import { RenderContextKey } from "@nop-chaos/nop-react-core";
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
  }, [start]);
  return [handleResizeMouseDown];
}
const designer = "";
function updateMainData(data, values) {
  return {
    ...data,
    ...cleanData(values)
  };
}
function updateElementData(data, elm, values) {
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
function cleanData(data) {
  if (!data)
    return data;
  const ret = {};
  for (let k in data) {
    if (k.startsWith("__"))
      continue;
    ret[k] = data[k];
  }
  return ret;
}
function GraphDesigner(props) {
  var _a;
  const {
    className,
    toolbarClassName,
    minPanelWidth,
    maxPanelWidth,
    initApi,
    saveApi,
    toolbar,
    defaultValue,
    onChange
  } = props;
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [graphData, setGraphData] = useState((defaultValue == null ? void 0 : defaultValue.data) || {});
  const [graphDiagram, setGraphDiagram] = useState((defaultValue == null ? void 0 : defaultValue.diagram) || {});
  const [inited, setInited] = useState(false);
  const [currentElement, setCurrentElement] = useState({
    groupName: "main",
    elementType: "default",
    elementId: "default"
  });
  const editorCallbacks = React.useRef({});
  const [handleResizeMouseDown] = useSplitter({
    alignRight: true,
    asideMinWidth: minPanelWidth || 50,
    asideMaxWidth: maxPanelWidth || 800
  });
  const renderContext = React.useContext(RenderContextKey);
  const { render, executor, observeEvent } = renderContext;
  React.useEffect(() => {
    return observeEvent == null ? void 0 : observeEvent("delegate", handleEvent);
  });
  if (!inited) {
    setInited(true);
    (_a = executor(initApi, props.data, props)) == null ? void 0 : _a.then((res) => {
      var _a2, _b;
      const graphData2 = ((_a2 = res.data) == null ? void 0 : _a2.data) || {};
      const graphDiagram2 = ((_b = res.data) == null ? void 0 : _b.diagram) || {};
      setGraphData(graphData2);
      setGraphDiagram(graphDiagram2);
    });
  }
  function selectMain() {
    setCurrentElement({ groupName: "main", elementType: "default", elementId: "default" });
  }
  const handleEvent = (event, data) => {
    if (event == "designer:save") {
      const data2 = { data: graphData, diagram: graphDiagram };
      if (onChange && (graphData != (defaultValue == null ? void 0 : defaultValue.data) || graphDiagram != (defaultValue == null ? void 0 : defaultValue.diagram)))
        onChange(data2);
      const future = saveApi && (executor == null ? void 0 : executor(saveApi, data2, props));
      if (!future) {
        console.log("designer:save", data2);
      }
    } else if (event == "designer:selectMain") {
      selectMain();
    } else if (event == "designer:selectElement") {
      setCurrentElement(data);
      setShowRightPanel(data != null);
    } else if (event == "designer:removeElement") {
      if (data.elementId == currentElement.elementId) {
        selectMain();
      }
      let newData = removeElement(graphData, data);
      setGraphData(newData);
    } else {
      console.log("unknown-event:", event, data);
    }
  };
  const handleEditorChange = useCallback((values) => {
    if (currentElement && currentElement.groupName != "main") {
      let data = updateElementData(graphData, currentElement, values);
      setGraphData(data);
    } else if (currentElement && currentElement.groupName == "main") {
      let data = updateMainData(graphData, values);
      setGraphData(data);
    }
    const callbacks = editorCallbacks.current["subEditorChange"];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback("subEditor:onChange", values, props);
      });
    }
  }, [currentElement, graphData]);
  const registerEditorCallback = useCallback((source, callback) => {
    let callbacks = editorCallbacks.current[source];
    if (!callbacks) {
      callbacks = [];
      editorCallbacks.current[source] = callbacks;
    }
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      index >= 0 && callbacks.splice(index, 1);
    };
  }, [editorCallbacks]);
  const subProps = {
    graphDiagram
  };
  function renderToolbar() {
    return /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-toolbar " + (toolbarClassName || "") }, render("toolbar", toolbar || "", subProps, props));
  }
  function renderRightPanel() {
    var _a2, _b, _c;
    let schema;
    let data;
    if (!currentElement || currentElement.groupName == "main") {
      schema = (_a2 = props.subEditors["main"]) == null ? void 0 : _a2.default;
      data = graphData;
    } else {
      schema = (_b = props.subEditors[currentElement.groupName]) == null ? void 0 : _b[currentElement.elementType];
      data = (_c = graphData == null ? void 0 : graphData[currentElement.groupName]) == null ? void 0 : _c[currentElement.elementId];
    }
    if (!schema)
      return null;
    if (!data)
      data = {};
    return /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-right-panel" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        onMouseDown: handleResizeMouseDown,
        className: "nop-graph-designer-panel-resizor"
      }
    ), render("subEditor", schema || "", {
      ...subProps,
      data,
      onChange: handleEditorChange
    }, props));
  }
  return /* @__PURE__ */ React.createElement(RenderContextKey.Provider, { value: {
    ...renderContext,
    onEvent: handleEvent,
    observeEvent: registerEditorCallback
  } }, /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer " + (className || "") }, toolbar ? renderToolbar() : null, /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-inner" }, /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-main" }, render("main", props.mainEditor, subProps, props)), showRightPanel ? renderRightPanel() : null)));
}
export {
  GraphDesigner
};
