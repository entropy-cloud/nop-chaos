import * as Vue from "vue";
import { defineComponent, ref, onUnmounted, openBlock, createElementBlock, watchEffect, onBeforeUnmount, h, onMounted, createStaticVNode, shallowRef, markRaw, Fragment as Fragment$1, createBlock, resolveDynamicComponent, mergeProps, createCommentVNode, unref, withCtx, createVNode, createElementVNode, createTextVNode, normalizeProps, guardReactiveProps, resolveComponent } from "vue";
import { ajaxFetch, useDebug, useAdapter, providePage, default_jumpTo, isCancel, default_isCurrentUrl, default_updateLocation, createPage, transformPageJson, bindActions, getSchemaProcessorType, deletePageCache, PageApis, registerAdapter, registerModule } from "@nop-chaos/nop-core";
import { isString, cloneDeep } from "lodash-es";
import { toast, clearStoresCache, setDefaultLocale, render, ToastComponent, ScopedContext, Renderer, FormItem, dataMapping, alert, confirm } from "amis";
import copy from "copy-to-clipboard";
import { createRoot } from "react-dom/client";
import * as React from "react";
import React__default, { createElement, Fragment } from "react";
import { ElDialog, ElButton } from "element-plus";
import yaml from "js-yaml";
import { createObject, resolveVariableAndFilter } from "amis-core";
import { applyPureVueInReact, applyVueInReact } from "veaury";
import * as ReactDom from "react-dom";
const _sfc_main$7 = defineComponent({
  props: {
    schema: Object,
    rollbackPageSource: Function,
    getPageSource: {
      type: Function,
      required: true
    },
    savePageSource: {
      type: Function,
      required: true
    }
  },
  emits: ["exit"],
  setup(props, { emit }) {
    const editorRef = ref(null);
    let fetched = false;
    const { savePageSource, rollbackPageSource, getPageSource } = props;
    function handleEvent(event) {
      if (event.data == "amis-editor-inited") {
        if (fetched)
          return;
        var msg = {
          type: "setSchema",
          data: props.schema
        };
        postMsg(msg);
      } else if (event.data === "amis-editor-reload") {
        fetched = false;
        startFetch();
      } else if (event.data === "amis-editor-exit") {
        emit("exit");
      } else if (event.data === "amis-editor-rollback") {
        if (rollbackPageSource) {
          rollbackPageSource().then(() => {
            postMsg({
              type: "toast",
              level: "info",
              message: "回滚成功"
            });
          }).catch((e) => {
            postMsg({
              type: "toast",
              level: "error",
              message: e.message || e.toString()
            });
          }).then(() => {
            fetched = false;
            return startFetch();
          });
        }
      } else if (isString(event.data) && event.data.startsWith("{")) {
        var data = JSON.parse(event.data);
        if (data.type == "save") {
          savePageSource(data.data).then(() => {
            postMsg({
              type: "toast",
              message: "保存成功"
            });
          }).catch((e) => {
            postMsg({
              type: "toast",
              level: "error",
              message: e.message || e.toString()
            });
          });
        } else if (data.type == "ajaxFetch") {
          ajaxFetch(data.data).then((result) => {
            postMsg({
              type: "ajaxComplete",
              reqId: data.reqId,
              result
            });
          });
        }
      } else {
        console.log("unknown-message", event.data);
      }
    }
    function postMsg(msg) {
      const frame = editorRef.value;
      if (!frame)
        return;
      const str = isString(msg) ? msg : JSON.stringify(msg);
      frame.contentWindow.postMessage(str, "*");
    }
    function startFetch() {
      const frame = editorRef.value;
      if (!frame)
        return;
      fetched = true;
      return getPageSource(true).then((page) => {
        postMsg({
          type: "toast",
          level: "info",
          message: "页面加载成功"
        });
        var msg = {
          type: "setSchema",
          data: page
        };
        postMsg(msg);
      }).catch((e) => {
        postMsg({
          type: "toast",
          level: "error",
          message: e.message || e.toString()
        });
        throw e;
      });
    }
    window.addEventListener("message", handleEvent);
    onUnmounted(() => {
      console.log("editor unmounted");
      window.removeEventListener("message", handleEvent);
    });
    return {
      editorRef
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$3 = {
  style: { "width": "100%", "height": "100%", "border": "none" },
  ref: "editorRef",
  src: "/amis-editor/index.html"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("iframe", _hoisted_1$3, null, 512);
}
const AmisPageEditor = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$3]]);
function createEnv(page) {
  const { debug } = useDebug();
  const adapter = useAdapter();
  let env = {
    session: page.id,
    affixOffsetTop: 0,
    fetcher(options) {
      providePage(page);
      options._page = page;
      return ajaxFetch(options);
    },
    jumpTo(to, action, ctx) {
      const router = adapter.useRouter();
      return default_jumpTo(router, to);
    },
    isCancel,
    isCurrentUrl: default_isCurrentUrl,
    updateLocation(to, replace) {
      default_updateLocation(to, !!replace);
    },
    notify: adapter.notify,
    enableAMISDebug: debug.value,
    alert: adapter.alert,
    confirm: adapter.confirm,
    copy: (contents, options) => {
      if (options === void 0) {
        options = {};
      }
      const { t } = adapter.useI18n();
      const ret = copy(contents, options);
      ret && (!options || options.shutup !== true) && toast.info(t("Copy To Clipboard"));
      return ret;
    }
  };
  env._page = page;
  page.env = env;
  return env;
}
function defineReactPageComponent(builder) {
  return defineComponent({
    props: {
      schema: Object,
      data: Object,
      registerPage: Function,
      actions: Object
    },
    setup(props) {
      var _a;
      const domRef = ref();
      let root;
      const options = builder({ actions: props.actions });
      let page = createPage(options);
      (_a = props.registerPage) == null ? void 0 : _a.call(props, page);
      function destroyPage() {
        var _a2;
        if (root) {
          root.unmount();
          (_a2 = options.onDestroyPage) == null ? void 0 : _a2.call(options, page);
          root = void 0;
        }
      }
      function renderPage() {
        const schema = cloneDeep(props.schema);
        root = createRoot(domRef.value);
        const r = root;
        const vdom = Promise.resolve(options.onRenderPage(schema, props.data, page));
        vdom.then((v) => r.render(v));
      }
      watchEffect(() => {
        destroyPage();
        if (props.schema && domRef.value) {
          renderPage();
        }
      });
      onBeforeUnmount(() => {
        destroyPage();
        return {
          domRef
        };
      });
      return () => h("div", {
        ref: domRef,
        style: {
          width: "100%",
          height: "100%"
        },
        class: "nop-page"
      });
    }
  });
}
const AmisSchemaPage = defineReactPageComponent((props) => {
  let amisScoped;
  return {
    actions: props.actions,
    getComponent(name) {
      return get_component(name);
    },
    getScopedStore(name) {
      var _a, _b;
      return (_b = (_a = get_component(name)) == null ? void 0 : _a.props) == null ? void 0 : _b.store;
    },
    getState(name) {
      return get_root_store().get(name);
    },
    setState(name, value) {
      get_root_store().set(name, value);
    },
    onDestroyPage(page) {
      clearStoresCache(page.id);
    },
    async onRenderPage(schema, data, page) {
      let env = createEnv(page);
      const locale = useAdapter().useLocale();
      let opts = {
        data,
        onConfirm: page.getAction("ok") || function() {
        },
        onClose: function(b) {
          var _a, _b;
          if (b) {
            (_a = page.getAction("ok")) == null ? void 0 : _a();
          } else {
            (_b = page.getAction("cancel")) == null ? void 0 : _b();
          }
        },
        scopeRef: (scoped) => {
          amisScoped = scoped;
        },
        locale,
        // amis内部会自动替换zh_CN为zh-CN
        theme: "cxd"
      };
      setDefaultLocale(locale);
      schema = await transformPageJson(schema.__baseUrl, schema);
      await bindActions(schema.__baseUrl, schema, page);
      return render(schema, opts, env);
    }
  };
  function get_root() {
    return amisScoped == null ? void 0 : amisScoped.getComponents()[0];
  }
  function get_root_store() {
    var _a;
    return (_a = get_root()) == null ? void 0 : _a.context.store;
  }
  function get_component(name) {
    var _a, _b, _c;
    if (name[0] == "#") {
      let pos = name.indexOf(".");
      if (pos < 0) {
        return (_a = get_root()) == null ? void 0 : _a.context.getComponentById(name.substring(1));
      } else {
        return (_b = get_root()) == null ? void 0 : _b.context.getComponentById(name.substring(1)).getComponentByName(name.substring(pos + 1));
      }
    } else {
      return (_c = get_root()) == null ? void 0 : _c.context.getComponentByName(name);
    }
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AmisToast",
  setup(__props) {
    const domRef = ref();
    let root;
    onMounted(() => {
      root = createRoot(domRef.value);
      root.render(createElement(Fragment, {}, createElement(ToastComponent, { position: "top-right" })));
    });
    onBeforeUnmount(() => {
      if (root) {
        root.unmount();
        root = void 0;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "domRef",
        ref: domRef
      }, null, 512);
    };
  }
});
const debuggerSchema = {
  "type": "page",
  "xui:schema": "amis",
  "body": {
    "type": "form",
    "title": null,
    "actions": [
      {
        "label": "Cancel",
        "type": "action",
        "actionType": "ajax",
        "level": "default",
        "api": {
          url: "action://cancel",
          messages: {
            success: "_"
          }
        }
      },
      {
        "label": "Apply",
        "type": "action",
        "actionType": "ajax",
        "level": "success",
        "api": "action://change"
      },
      {
        "label": "Yaml/JSON",
        "type": "action",
        "actionType": "ajax",
        "level": "primary",
        "api": "action://toggleYaml"
      },
      {
        "label": "Submit",
        "type": "action",
        "actionType": "ajax",
        "level": "primary",
        "api": "action://ok"
      }
    ],
    "body": [
      {
        "type": "editor",
        "name": "schema",
        "placeholder": "{}",
        "visibleOn": "this.lang !='yaml'"
      },
      {
        "type": "yaml-editor",
        "name": "schema",
        "placeholder": {},
        "visibleOn": "this.lang == 'yaml'"
      }
    ]
  }
};
const _imports_0 = "/resource/img/logo.png";
const XuiLoading_vue_vue_type_style_index_0_scoped_2668f673_lang = "";
const _sfc_main$5 = {};
const _hoisted_1$2 = { class: "app-loading" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<div class="app-loading-wrap" data-v-2668f673><img src="' + _imports_0 + '" class="app-loading-logo" alt="Logo" data-v-2668f673><div class="app-loading-dots" data-v-2668f673><span class="dot dot-spin" data-v-2668f673><i data-v-2668f673></i><i data-v-2668f673></i><i data-v-2668f673></i><i data-v-2668f673></i></span></div><div class="app-loading-title" data-v-2668f673><b data-v-2668f673>N</b>op is n<b data-v-2668f673>o</b>t <b data-v-2668f673>P</b>rogramming </div></div>', 1);
const _hoisted_3 = [
  _hoisted_2
];
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, _hoisted_3);
}
const XuiLoading = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-2668f673"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "XuiPageEditor",
  props: {
    rollbackPageSource: Function,
    getPageSource: {
      type: Function,
      required: true
    },
    savePageSource: {
      type: Function,
      required: true
    }
  },
  emits: ["exit"],
  setup(__props, { emit }) {
    const props = __props;
    const { getPageSource } = props;
    const { useI18n } = useAdapter();
    function handleExit() {
      emit("exit");
    }
    const componentType = shallowRef();
    const schemaRef = shallowRef();
    watchEffect(() => {
      getPageSource(false).then((schema) => {
        if (!schema)
          schema = {};
        schemaRef.value = markRaw(schema);
        const schemaTypeName = schema["xui:schema-type"];
        if (!schemaTypeName) {
          componentType.value = markRaw(AmisPageEditor);
        } else {
          const schemaType = getSchemaProcessorType(schemaTypeName);
          if (!schemaType) {
            const { t } = useI18n();
            useAdapter().notify("error", t("nop.err.unknown-schema-type"));
            throw new Error("nop.err.unknown-schema-type");
          }
          componentType.value = markRaw(schemaType.editorComponentType);
        }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment$1, null, [
        componentType.value ? (openBlock(), createBlock(resolveDynamicComponent(componentType.value), mergeProps({ key: 0 }, props, {
          schema: schemaRef.value,
          onExit: handleExit
        }), null, 16, ["schema"])) : createCommentVNode("", true),
        !componentType.value ? (openBlock(), createBlock(XuiLoading, { key: 1 })) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const _hoisted_1$1 = /* @__PURE__ */ createElementVNode("header", null, null, -1);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "XuiPageEditorDialog",
  props: {
    modelValue: Boolean,
    rollbackPageSource: Function,
    getPageSource: {
      type: Function,
      required: true
    },
    savePageSource: {
      type: Function,
      required: true
    }
  },
  emits: ["update:modelValue", "exit"],
  setup(__props, { emit }) {
    function handleEditorExit() {
      emit("update:modelValue", false);
    }
    function handleChange(value) {
      emit("update:modelValue", value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElDialog), {
        destroyOnClose: true,
        class: "page-full-screen",
        modelValue: __props.modelValue,
        maskClosable: false,
        "append-to-body": true,
        width: "100%",
        height: "100%",
        "align-center": true,
        fullscreen: true,
        footer: null,
        closable: false,
        keyboard: false,
        "onUpdate:modelValue": handleChange
      }, {
        default: withCtx(() => [
          _hoisted_1$1,
          createVNode(_sfc_main$4, {
            onExit: handleEditorExit,
            savePageSource: __props.savePageSource,
            rollbackPageSource: __props.rollbackPageSource,
            getPageSource: __props.getPageSource
          }, null, 8, ["savePageSource", "rollbackPageSource", "getPageSource"])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
const XuiPageEditorDialog_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "page-debugger" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "XuiDebugger",
  props: {
    path: {
      type: String,
      required: true
    },
    schema: Object
  },
  emits: ["update:schema", "rebuild"],
  setup(__props, { emit }) {
    const props = __props;
    const schemaVisible = ref(false);
    const schemaData = shallowRef({
      schema: "",
      lang: "json"
    });
    const { PageProvider__getPageSource, PageProvider__rollbackPageSource, PageProvider__savePageSource } = PageApis;
    function getPageSource(silent) {
      return PageProvider__getPageSource(props.path, silent);
    }
    function savePageSource(data) {
      deletePageCache(props.path);
      PageProvider__savePageSource(props.path, data, true);
    }
    function rollbackPageSource() {
      PageProvider__rollbackPageSource(props.path, true);
    }
    function openSchemaEditor() {
      schemaData.value = { schema: yaml.dump(props.schema), lang: "yaml" };
      schemaVisible.value = true;
    }
    const schemaActions = {
      "ok": handleOk,
      "cancel": handleCancel,
      "change": handleChange,
      "rebuild": handleRebuild,
      "toggleYaml": handleToggleYaml
    };
    function handleChange(options) {
      const data = options.data;
      let json = schemaData.value.lang == "yaml" ? yaml.load(data.schema) : JSON.parse(data.schema);
      emit("update:schema", json);
    }
    function handleOk(data) {
      handleChange(data);
      schemaVisible.value = false;
    }
    function handleCancel() {
      schemaVisible.value = false;
    }
    function handleRebuild() {
      emit("rebuild");
    }
    function handleToggleYaml(options) {
      let schema = options.data.schema;
      if (options.data.lang == "yaml") {
        schemaData.value = { lang: "json", schema: JSON.stringify(yaml.load(schema), null, "  ") };
      } else {
        schemaData.value = { lang: "yaml", schema: yaml.dump(JSON.parse(schema)) };
      }
    }
    const designerVisible = ref(false);
    function openXuiPageEditor() {
      designerVisible.value = true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment$1, null, [
        createElementVNode("span", _hoisted_1, [
          createVNode(unref(ElButton), {
            type: "primary",
            circle: true,
            title: "Schema Json Editor",
            onClick: openSchemaEditor
          }, {
            default: withCtx(() => [
              createTextVNode("S")
            ]),
            _: 1
          }),
          __props.path ? (openBlock(), createBlock(unref(ElButton), {
            key: 0,
            type: "danger",
            circle: true,
            title: "Page Visual Designer",
            danger: "",
            onClick: openXuiPageEditor
          }, {
            default: withCtx(() => [
              createTextVNode("V")
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        createVNode(unref(ElDialog), {
          modelValue: schemaVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => schemaVisible.value = $event),
          title: "Page Schema",
          width: "600px",
          height: 500,
          center: true,
          class: "debug-modal",
          mask: false,
          maskClosable: false,
          draggable: true,
          footer: null,
          "append-to-body": true,
          destroyOnClose: ""
        }, {
          default: withCtx(() => [
            createVNode(unref(AmisSchemaPage), {
              schema: unref(debuggerSchema),
              actions: schemaActions,
              data: schemaData.value
            }, null, 8, ["schema", "data"])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(_sfc_main$3, {
          modelValue: designerVisible.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => designerVisible.value = $event),
          savePageSource,
          rollbackPageSource,
          getPageSource
        }, null, 8, ["modelValue"])
      ], 64);
    };
  }
});
const XuiDebugger_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = defineComponent({
  props: {
    schema: Object,
    data: Object,
    registerPage: Function,
    actions: Object
  },
  setup(props) {
    const { useI18n } = useAdapter();
    let componentType = ref(markRaw(AmisSchemaPage));
    watchEffect(() => {
      var _a;
      const schemaTypeName = (_a = props.schema) == null ? void 0 : _a["xui:schema-type"];
      if (!schemaTypeName) {
        componentType.value = markRaw(AmisSchemaPage);
      } else {
        const schemaType = getSchemaProcessorType(schemaTypeName);
        if (!schemaType) {
          const { t } = useI18n();
          useAdapter().notify("error", t("nop.err.unknown-schema-type"));
          throw new Error("nop.err.unknown-schema-type");
        }
        componentType.value = markRaw(schemaType.componentType);
      }
    });
    return {
      componentType
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.componentType), normalizeProps(guardReactiveProps(_ctx.$props)), null, 16);
}
const XuiSchemaPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "amis-page",
  props: {
    path: {
      type: String,
      required: true
    },
    data: Object,
    config: Object,
    registerPage: Function,
    actions: Object
  },
  components: { XuiDebugger: _sfc_main$2, XuiSchemaPage },
  setup(props) {
    const { getPage } = useAdapter();
    let pageSchema = shallowRef();
    function registerPage(p) {
      var _a;
      (_a = props.registerPage) == null ? void 0 : _a.call(props, p);
    }
    watchEffect(() => {
      getPage(props.path).then((res) => {
        res.__baseUrl = props.path;
        updateSchema(res);
      });
    });
    function updateSchema(value) {
      pageSchema.value = value;
    }
    function rebuild() {
      pageSchema.value = cloneDeep(pageSchema.value);
    }
    const { debug } = useDebug();
    const actions = { ...props.actions };
    return {
      pageSchema,
      updateSchema,
      rebuild,
      registerPage,
      debug,
      actions
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xui_debugger = resolveComponent("xui-debugger");
  const _component_XuiSchemaPage = resolveComponent("XuiSchemaPage");
  return openBlock(), createElementBlock(Fragment$1, null, [
    _ctx.debug ? (openBlock(), createBlock(_component_xui_debugger, {
      key: 0,
      path: _ctx.path,
      schema: _ctx.pageSchema,
      "onUpdate:schema": _ctx.updateSchema,
      onRebuild: _ctx.rebuild
    }, null, 8, ["path", "schema", "onUpdate:schema", "onRebuild"])) : createCommentVNode("", true),
    createVNode(_component_XuiSchemaPage, {
      schema: _ctx.pageSchema,
      registerPage: _ctx.registerPage,
      action: _ctx.actions
    }, null, 8, ["schema", "registerPage", "action"])
  ], 64);
}
const XuiPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
class VueControl extends React__default.Component {
  constructor(props) {
    super(props);
    const { resolveVueComponent } = useAdapter();
    this.vueComponent = applyPureVueInReact(resolveVueComponent(props.vueComponent));
  }
  doAction(action, data, throwErrors) {
    const { resetValue, onChange } = this.props;
    const actionType = action == null ? void 0 : action.actionType;
    if (actionType === "clear") {
      onChange(void 0);
    } else if (actionType === "reset") {
      onChange(resetValue);
    }
  }
  async dispatchChangeEvent(eventData = {}) {
    const { dispatchEvent, data, onChange } = this.props;
    const rendererEvent = await dispatchEvent(
      "change",
      createObject(data, {
        value: eventData
      })
    );
    if (rendererEvent == null ? void 0 : rendererEvent.prevented) {
      return;
    }
    onChange && onChange(eventData);
  }
  render() {
    let { props, value, env, store } = this.props;
    if (props) {
      props = { ...props };
      for (const key of Object.keys(props)) {
        if (typeof props[key] === "string") {
          props[key] = resolveVariableAndFilter(
            props[key],
            this.props.data,
            "| raw"
          );
        }
      }
    }
    let mergedProps = {
      env,
      store,
      ...props,
      value,
      "onUpdate:value": (value2) => this.dispatchChangeEvent(value2)
    };
    return React__default.createElement(this.vueComponent, mergedProps);
  }
}
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
Renderer({
  type: "vue-renderer",
  autoVar: false
})(VueRenderer);
class VueFormItem extends VueControl {
}
FormItem({
  type: "vue-form-item",
  autoVar: false
})(VueFormItem);
function getPageStore(store) {
  if (!store)
    return;
  if (store.fetchData)
    return store;
  return getPageStore(store.parentStore);
}
class XuiPageEditorButton extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false
    };
    this.dialogComponent = applyVueInReact(_sfc_main$3);
    this.handleAction = this.handleAction.bind(this);
    const store = getPageStore(this.props.store);
    this.getPageSource = () => {
      return store.fetchData(this.props.initApi, this.props.data).then((res) => res.data);
    };
    this.savePageSource = (data) => {
      return store.fetchData(this.props.api, { ...this.props.data, data }).then((res) => res.data);
    };
    this.rollbackPageSource = () => {
      if (!this.props.rollbackApi)
        return Promise.resolve(null);
      return store.fetchData(this.props.rollbackApi, this.props.data).then((res) => res.data);
    };
  }
  handleAction(e, action) {
    const actionType = action.actionType;
    if (actionType == "popEditor") {
      this.setState({ dialogVisible: true });
    } else {
      return this.props.onAction(e, action);
    }
  }
  render() {
    const props = this.props;
    const actionSchema = {
      ...props,
      type: "action",
      actionType: "popEditor"
    };
    const body = [
      props.render(
        "button",
        actionSchema,
        { onAction: this.handleAction }
      ),
      React__default.createElement(this.dialogComponent, {
        modelValue: this.state.dialogVisible,
        savePageSource: this.savePageSource,
        getPageSource: this.getPageSource,
        rollbackPageSource: this.rollbackPageSource,
        "onUpdate:modelValue": (value) => this.setState(
          { dialogVisible: value }
        )
      })
    ];
    return React__default.createElement(Fragment, null, body);
  }
}
Renderer({
  type: "xui-page-editor-button",
  autoVar: false
})(XuiPageEditorButton);
registerAdapter({
  dataMapping,
  alert,
  confirm,
  notify(type, msg, conf) {
    if (msg.startsWith("_"))
      return;
    conf = { closeButton: true, ...conf };
    toast[type] ? toast[type](msg, conf) : console.warn("[notify]", type, msg);
    console.log("[notify]", type, msg);
  }
});
registerModule("vue", Vue);
registerModule("react", React);
registerModule("react-dom", ReactDom);
export {
  AmisPageEditor,
  AmisSchemaPage,
  _sfc_main$6 as AmisToast,
  VueControl as AmisVueComponent,
  XuiLoading,
  XuiPage,
  _sfc_main$4 as XuiPageEditor,
  XuiSchemaPage,
  defineReactPageComponent
};
