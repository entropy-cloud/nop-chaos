import qs, { parse } from "qs";
import { match } from "path-to-regexp";
import * as Vue from "vue";
import { ref, shallowRef, toRaw, defineComponent, onMounted, onUnmounted, watchEffect, onBeforeUnmount, markRaw, openBlock, createElementBlock, createBlock, resolveDynamicComponent, Fragment as Fragment$1, createElementVNode, createVNode, unref, withCtx, createTextVNode, createCommentVNode, normalizeProps, guardReactiveProps, resolveComponent } from "vue";
import LRUCache from "lru-cache";
import { cloneDeep, isNumber, isInteger, isBoolean, omit, isString as isString$1 } from "lodash-es";
import axios from "axios";
import { isObject, isArray, isPromise, isString, isPlainObject } from "@vue/shared";
import "systemjs/dist/system.js";
import { noop, themeable, localeable, uncontrollable, FormItem, autobind, createObject, resolveVariableAndFilter } from "amis-core";
import * as React from "react";
import React__default, { createElement, Fragment } from "react";
import { PickerContainer, ResultBox } from "amis-ui";
import { ScopedContext, Renderer, FormItem as FormItem$1, clearStoresCache, setDefaultLocale, render, ToastComponent, dataMapping, alert, confirm, toast } from "amis";
import copy from "copy-to-clipboard";
import { createRoot } from "react-dom/client";
import { ElButton, ElDialog } from "element-plus";
import yaml from "js-yaml";
import { applyPureVueInReact } from "veaury";
import * as ReactDom from "react-dom";
function default_jumpTo(router, to) {
  if (to.startsWith("open://")) {
    openWindow(to.substring("open://".length));
    return;
  }
  if (to == "__forward") {
    router.forward();
    return;
  }
  if (to == "__back") {
    router.back();
    return;
  }
  function go(to2, replace2) {
    if (replace2) {
      router.push(to2);
    } else {
      router.replace(to2);
    }
  }
  const replace = to.startsWith("replace://");
  if (replace) {
    to = to.substring("replace://".length);
  }
  if (isPageUrl(to)) {
    const pos = to.indexOf("?");
    const query = pos > 0 ? to.substring(pos + 1) : null;
    const data = query ? qs.parse(query) : null;
    const page = { name: "jsonPage", params: { path: to, data } };
    go(page, replace);
  } else {
    go(to, replace);
  }
}
function openWindow(url, opt) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature = [];
  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");
  window.open(url, target, feature.join(","));
}
function isPageUrl(url) {
  let pos = url.indexOf("?");
  if (pos > 0)
    url = url.substring(0, pos);
  return url.endsWith(".page.json5") || url.endsWith(".page.yaml") || url.endsWith(".page.json");
}
function normalizeLink(to) {
  if (/^\/api\//.test(to)) {
    return to;
  }
  to = to || "";
  const location2 = window.location;
  if (to && to[0] === "#") {
    to = location2.pathname + location2.search + to;
  } else if (to && to[0] === "?") {
    to = location2.pathname + to;
  }
  const idx = to.indexOf("?");
  const idx2 = to.indexOf("#");
  let pathname = ~idx ? to.substring(0, idx) : ~idx2 ? to.substring(0, idx2) : to;
  const search = ~idx ? to.substring(idx, ~idx2 ? idx2 : void 0) : "";
  const hash = ~idx2 ? to.substring(idx2) : "";
  if (!pathname) {
    pathname = location2.pathname;
  } else if (pathname[0] != "/" && !/^https?:\/\//.test(pathname)) {
    const relativeBase = location2.pathname;
    const paths = relativeBase.split("/");
    paths.pop();
    let m;
    while (m = /^\.\.?\//.exec(pathname)) {
      if (m[0] === "../") {
        paths.pop();
      }
      pathname = pathname.substring(m[0].length);
    }
    pathname = paths.concat(pathname).join("/");
  }
  return pathname + search + hash;
}
function default_updateLocation(to, replace) {
  if (to === "goBack") {
    return window.history.back();
  }
  if (replace && window.history.replaceState) {
    window.history.replaceState("", document.title, to);
    return;
  }
  location.href = normalizeLink(to);
}
function default_isCurrentUrl(to, ctx) {
  const link = normalizeLink(to);
  const location2 = window.location;
  let pathname = link;
  let search = "";
  const idx = link.indexOf("?");
  if (~idx) {
    pathname = link.substring(0, idx);
    search = link.substring(idx);
  }
  if (search) {
    if (pathname !== location2.pathname || !location2.search) {
      return false;
    }
    const query = qs.parse(search.substring(1));
    const currentQuery = qs.parse(location2.search.substring(1));
    return Object.keys(query).every(
      (key) => query[key] === currentQuery[key]
    );
  } else if (pathname === location2.pathname) {
    return true;
  } else if (!~pathname.indexOf("http") && ~pathname.indexOf(":")) {
    return match(link, {
      decode: decodeURIComponent,
      strict: (ctx == null ? void 0 : ctx.strict) ?? true
    })(location2.pathname);
  }
  return false;
}
const adapter = {
  globalVersion: "v3",
  // 如果存放在localStorage中的数据需要升级，这里的版本号需要增加。
  // 从localStorage中读取缓存数据时会检查版本号，如果版本不一致，会调用configUpgrade函数来升级，缺省会丢弃原有配置
  configUpgrade(configName, version, prevVersion, config) {
    return void 0;
  },
  /**
   * 返回当前的locale
   */
  useLocale() {
    throw new Error("not-impl");
  },
  useI18n() {
    throw new Error("not-impl");
  },
  /**
   * 返回当前的全局store
   */
  useStore() {
    throw new Error("not-impl");
  },
  useRouter() {
    throw new Error("not-impl");
  },
  useSettings() {
    return {
      apiUrl: ""
    };
  },
  /**
   * 返回当前的认证token
   */
  useAuthToken() {
    throw new Error("not-impl");
  },
  setAuthToken(token) {
  },
  isUserInRole(role) {
    throw new Error("not-impl");
  },
  useTenantId() {
    throw new Error("not-impl");
  },
  useAppId() {
    return "nop-chaos";
  },
  /**
   * 自动退出时执行的回调
   */
  logout(reason) {
    throw new Error("not-impl");
  },
  /**
   * 根据组件名加载Vue组件
   */
  resolveVueComponent(name) {
    throw new Error("not-impl");
  },
  processRequest(request) {
    return request;
  },
  processResponse(response) {
    return response;
  },
  compileFunction(code, page) {
    return new Function("page", "return " + code).call(null, page);
  },
  jumpTo(to, action, ctx) {
    const router = adapter.useRouter();
    return default_jumpTo(router, to);
  },
  isCurrentUrl: default_isCurrentUrl,
  updateLocation: default_updateLocation,
  notify(type, msg, conf) {
    throw new Error("not-impl");
  },
  alert(msg, title) {
    throw new Error("not-impl");
  },
  confirm(msg, title) {
    throw new Error("not-impl");
  },
  dataMapping(to, from = {}, ignoreFunction = false, convertKeyToPath, ignoreIfNotMatch = false) {
    throw new Error("not-impl");
  },
  fetchDict(dictName, options) {
    throw new Error("not-impl");
  },
  fetchPageAndTransform(pageName, options) {
    throw new Error("not-impl");
  },
  getPage(pageUrl) {
    throw new Error("not-impl");
  }
};
function registerAdapter(data) {
  Object.assign(adapter, data);
}
function useAdapter() {
  return adapter;
}
function normalizeArray(parts, allowAboveRoot) {
  const res = [];
  for (var i = 0; i < parts.length; i++) {
    const p2 = parts[i];
    if (!p2 || p2 === ".")
      continue;
    if (p2 === "..") {
      if (res.length && res[res.length - 1] !== "..") {
        res.pop();
      } else if (allowAboveRoot) {
        res.push("..");
      }
    } else {
      res.push(p2);
    }
  }
  return res;
}
function absolutePath(path, basePath) {
  if (path.indexOf(":") > 0)
    return path;
  let resolvedPath = path;
  if (basePath && !resolvedPath.startsWith("/")) {
    resolvedPath = basePath + "/../" + path;
  }
  resolvedPath = normalizeArray(
    resolvedPath.split("/"),
    false
  ).join("/");
  return "/" + resolvedPath;
}
function format(msg, placeholderStart, placeholdeEnd, resolver) {
  let pos = msg.indexOf(placeholderStart);
  if (pos < 0)
    return msg;
  let ret = msg.substring(0, pos);
  do {
    pos += placeholderStart.length;
    let pos2 = msg.indexOf(placeholdeEnd, pos);
    if (pos2 < 0) {
      ret += msg.substring(pos);
      break;
    } else {
      const name = msg.substring(pos, pos2).trim();
      const value = resolver(name);
      if (value != null) {
        ret += String(value);
      }
      pos2 += placeholdeEnd.length;
      pos = msg.indexOf(placeholderStart, pos2);
      if (pos < 0) {
        ret += msg.substring(pos2);
      } else {
        ret += msg.substring(pos2, pos);
      }
    }
  } while (pos > 0);
  return ret;
}
function treeToCondition(node) {
  if (node.$type === "and" || node.$type == "or" || node.$type == "not") {
    return { condjunction: node.$type, children: (node.$body || []).map(treeToCondition) };
  } else {
    return {
      "op": node.$type,
      left: {
        type: "field",
        field: node.name
      },
      right: node.value
    };
  }
}
function conditionToTree(cond) {
  if (cond.conjuction) {
    return {
      $type: cond.conjuction,
      $body: (cond.children || []).map(conditionToTree)
    };
  } else {
    return {
      $type: cond.op,
      name: cond.left.field,
      value: cond.right
    };
  }
}
function refHolder() {
  const value = shallowRef();
  return {
    getRaw() {
      return toRaw(value).value;
    },
    get() {
      return value.value;
    },
    set(t) {
      value.value = t;
    }
  };
}
function createAsyncCache(options) {
  const cache = new LRUCache(options);
  return {
    get(key, loader) {
      let promise = cache.get(key);
      if (promise) {
        return promise.then((v) => v && cloneDeep(v));
      }
      promise = loader(key);
      cache.set(key, promise);
      return promise.then((v) => v && cloneDeep(v)).catch((e) => {
        cache.delete(key);
        throw e;
      });
    },
    delete(key) {
      cache.delete(key);
    },
    clear() {
      cache.clear();
    }
  };
}
async function processXuiDirective(json, typeProp, processor) {
  let futures = [];
  let ret = _processXuiDirective(json, typeProp, processor, futures);
  await Promise.all(futures);
  return ret;
}
function _processXuiDirective(json, typeProp, processor, futures) {
  if (!json)
    return json;
  function processProps(json2) {
    for (let key in json2) {
      let v = json2[key];
      v = _processXuiDirective(v, typeProp, processor, futures);
      if (v === void 0) {
        delete json2[key];
      } else if (v != json2[key]) {
        json2[key] = v;
        if (isPromise(v)) {
          v.then((ret) => {
            if (ret === void 0) {
              delete json2[key];
            } else {
              json2[key] = ret;
            }
          });
          json2[key] = v;
          futures.push(v);
        }
      }
    }
    return json2;
  }
  if (isObject(json)) {
    let type = json[typeProp];
    if (type) {
      return processor(type, json, processProps);
    }
    processProps(json);
  } else if (isArray(json)) {
    for (let i = 0, n = json.length; i < n; i++) {
      let child = _processXuiDirective(json[i], typeProp, processor, futures);
      if (child === void 0) {
        delete json[i];
        i--;
        n--;
      } else if (child != json[i]) {
        json[i] = child;
        if (isPromise(child)) {
          child.then((ret) => {
            let idx = json.indexOf(child);
            if (idx < 0)
              return;
            if (ret == void 0) {
              delete json[idx];
            } else {
              json[idx] = ret;
            }
          });
        }
      }
    }
  }
  return json;
}
function processXuiValue(json, processor) {
  if (!json)
    return json;
  function processProps(json2) {
    for (let key in json2) {
      let v = json2[key];
      if (isString(v)) {
        v = processor(v, key, json2);
        if (v === void 0) {
          delete json2[key];
        } else if (v != json2[key]) {
          json2[key] = v;
        }
      } else {
        processXuiValue(v, processor);
      }
    }
    return json2;
  }
  if (isObject(json)) {
    processProps(json);
  } else if (isArray(json)) {
    for (let i = 0, n = json.length; i < n; i++) {
      let child = json[i];
      if (isString(child)) {
        let v = processor(child, i, json);
        if (v === void 0) {
          delete json[i];
          i--;
          n--;
        } else if (v != json[i]) {
          json[i] = v;
        }
      } else {
        processXuiValue(child, processor);
      }
    }
  }
  return json;
}
async function bindActions(pageUrl, json, page) {
  if (!json)
    return;
  page.resetActions();
  const promises = [];
  const fnStack = [];
  processXuiDirective(json, "xui:import", (modulePaths, obj, processProps) => {
    const standalone = obj["xui:standalone"];
    const fnScope = { standalone, libs: {} };
    fnStack.push(fnScope);
    fetchModules(pageUrl, modulePaths, promises, fnScope);
    processProps(obj);
    return obj;
  });
  await Promise.all(promises);
  let stackIndex = 0;
  function process(json2) {
    let modulePaths = json2["xui:import"];
    if (modulePaths) {
      stackIndex++;
    }
    for (let key in json2) {
      const v = json2[key];
      if (!v)
        continue;
      if (isString(v)) {
        json2[key] = processValue(key, v);
      } else if (isArray(v)) {
        for (let i = 0, n = v.length; i < n; i++) {
          process(v[i]);
        }
      } else {
        process(v);
      }
    }
    if (modulePaths) {
      stackIndex--;
    }
  }
  function processValue(key, v) {
    const [type, path] = splitPrefixUrl(v) || [];
    if (!type)
      return v;
    if (["query", "mutation", "graphql", "dict", "page"].includes(type)) {
      return type + "://" + path;
    } else if (v == "action") {
      const fnName = path.split("-")[0];
      const action = findAction(fnName, fnStack, stackIndex, page);
      for (let i = 0; i < 1e3; i++) {
        const actionName = i == 0 ? fnName : fnName + "-" + i;
        const existed = page.getAction(actionName);
        if (!existed) {
          page.registerAction(actionName, action);
          return "action://" + actionName;
        } else if (existed == action) {
          return "action://" + actionName;
        }
      }
      throw new Error("nop.err.action-name-conflict:" + v);
    } else if (type == "fn") {
      const fn = buildFunction(path, page);
      return wrapFunc(fn, v);
    }
    return v;
  }
  process(json);
}
function splitPrefixUrl(url) {
  if (url.startsWith("@")) {
    let pos2 = url.indexOf(":");
    if (pos2 < 0) {
      return;
    }
    return [url.substring(1, pos2), url.substring(pos2 + 1).trim()];
  }
  let pos = url.indexOf("://");
  if (pos < 0)
    return;
  return [url.substring(0, pos), url.substring(pos + 3)];
}
function buildFunction(fn, page) {
  return useAdapter().compileFunction(fn, page);
}
function fetchModules(pageUrl, modulePaths, promises, fnScope) {
  if (isString(modulePaths)) {
    modulePaths = modulePaths.split(",").reduce((m, p) => {
      m[getPathName(p)] = p;
      return m;
    }, {});
  }
  for (const moduleName in modulePaths) {
    const path = absolutePath(modulePaths[moduleName], pageUrl);
    const promise = importModule(path).then((mod) => {
      fnScope[moduleName] = mod;
    });
    promises.push(promise);
  }
}
function getPathName(path) {
  let pos = path.lastIndexOf("/");
  if (pos >= 0)
    path = path.substring(pos + 1);
  let pos2 = path.indexOf(".");
  if (pos2 > 0)
    return path.substring(0, pos2);
  return path;
}
function findAction(fnName, fnStack, stackIndex, page) {
  const pos = fnName.indexOf(".");
  if (pos < 0) {
    const api = page.getAction(fnName);
    if (!api)
      throw new Error("nop.err.unknown-action:" + fnName);
    return api;
  }
  const libName = fnName.substring(0, pos);
  const methodName = fnName.substring(pos + 1);
  for (let i = stackIndex; i >= 0; i--) {
    let fnScope = fnStack[i];
    if (fnScope.standalone)
      break;
    const lib = fnScope.libs[libName];
    if (lib && lib[methodName]) {
      return lib[methodName];
    }
  }
  throw new Error("nop.err.unknown-action:" + fnName);
}
function wrapFunc(fn, text) {
  const ret = (...args) => fn(...args);
  ret.toJSON = () => text;
  return ret;
}
const g_components = {};
function registerXuiComponent(type, component) {
  g_components[type] = component;
}
function unregisterXuiComponent(type) {
  delete g_components[type];
}
function resolveXuiComponent(type, json) {
  const comp = g_components[type];
  if (!comp)
    throw new Error("nop.err.xui.unknown-component:" + type);
  return comp(json);
}
async function transformPageJson(pageUrl, json) {
  json.__baseUrl = pageUrl;
  json = await processXuiDirective(json, "xui:roles", filterByAuth);
  json = await processXuiDirective(json, "xui:component", resolveXuiComponent);
  return json;
}
function filterByAuth(roles, json) {
  const { isUserInRole } = useAdapter();
  if (!isUserInRole(roles))
    return;
  return json;
}
let g_nextIndex = 0;
function createPage(options) {
  let actions = { ...options.actions };
  let page = {
    id: "page_" + String(g_nextIndex++),
    getAction(name) {
      return actions[name];
    },
    registerAction(name, fn) {
      actions[name] = fn;
    },
    resetActions() {
      actions = { ...options.actions };
    },
    getComponent: options.getComponent,
    getScopedStore: options.getScopedStore,
    getState: options.getState,
    setState: options.setState
  };
  return page;
}
function handleGraphQL(config, graphqlUrl, options) {
  let url = config.url;
  const [type, path] = splitPrefixUrl(url) || [];
  if (type == "query" || type == "mutation" || type == "subscription") {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl(type, path, config, graphqlUrl, options);
    return true;
  } else if (url.endsWith("/graphql") || url.indexOf("/graphql?") >= 0) {
    normalizeData(config);
    config.transformResponse = transformGraphQLResponse;
    config.method = "post";
    return true;
  } else {
    return false;
  }
}
function transformGraphQLResponse(data) {
  var _a, _b, _c;
  data = JSON.parse(data);
  if (((_a = data.errors) == null ? void 0 : _a.length) > 0) {
    data.status = parseInt(((_b = data.extensions) == null ? void 0 : _b["nop-status"]) || -1);
    data.msg = data.errors[0].message;
  } else {
    data.status = 0;
    data.msg = (_c = data.extensions) == null ? void 0 : _c["nop-msg"];
  }
  return data;
}
function handleGraphQLUrl(opType, url, config, graphql, options) {
  let pos = url.indexOf("?");
  if (pos > 0) {
    url = url.substring(0, pos);
  }
  let pos2 = url.indexOf("/");
  const action = pos2 > 0 ? url.substring(0, pos2) : url;
  let selection = pos2 > 0 ? url.substring(pos2 + 1) : void 0;
  if (selection) {
    selection = selection.replaceAll("%20", " ");
    selection = selection.replaceAll("%0A", "\n");
  }
  if (!selection) {
    selection = options["gql:selection"];
  }
  let stdAction = action;
  let pos3 = action.lastIndexOf("_");
  if (pos3 > 0) {
    stdAction = action.substring(pos3 + 1);
  }
  let data = config.data || {};
  if (stdAction === "findPage") {
    if (data.op === "loadOptions") {
      const values = toArray(data.value, options.delimiter);
      data = {
        ["filter_" + options.valueField + "__in"]: values
      };
      selection = "items{" + (options.valueField || "id") + "," + (options.labelField || "id") + "}";
    }
  }
  let def = operationRegistry[stdAction];
  if (!def) {
    def = guessDefinition(config.data);
  }
  let args = [...def.arguments, ...guessExtArgDefinitions(config.data)];
  let query = opType + " " + action;
  if (args.length > 0) {
    query += "(";
    query += args.map((arg) => "$" + arg.name + ":" + arg.type).join(",");
    query += ")";
  }
  query += "{\n";
  query += action + "(";
  if (args.length > 0) {
    query += args.map((arg) => arg.name + ":$" + arg.name).join(",");
  }
  query += ")";
  if (selection) {
    query += "{\n";
    query += selection;
    query += "\n}";
  }
  query += "\n}";
  const variables = {};
  args.forEach((arg) => {
    const builder = arg.builder || defaultArgBuilders[arg.type] || argValue;
    variables[arg.name] = builder(data, arg, options);
  });
  config.transformResponse = [transformGraphQLResponse, (res) => {
    res.data && (res.data = res.data[action]);
    return res;
  }];
  config.method = "post";
  config.url = graphql;
  config.data = {
    query,
    variables
  };
}
function toArray(value, delimiter) {
  if (isString(value)) {
    value = value.split(delimiter || ",");
  }
  return value;
}
function normalizeData(config) {
  const { data, params } = splitData(config.params);
  config.data = { ...filterData(config.data), ...data };
  config.params = params;
}
function filterData(data) {
  if (!data)
    return {};
  const ret = {};
  for (let k in data) {
    if (k.startsWith("__"))
      continue;
    ret[k] = data[k];
  }
  return ret;
}
function splitData(data) {
  if (!data) {
    return {};
  }
  const body = {};
  const params = {};
  for (let k in data) {
    if (k.startsWith("__"))
      continue;
    if (k.charAt(0) == "@" || k.charAt(0) == "_") {
      params[k] = data[k];
    } else {
      body[k] = data[k];
    }
  }
  return {
    data: body,
    params
  };
}
function guessDefinition(data) {
  let args = [];
  if (data) {
    for (let k in data) {
      if (isSpecialVarName(k))
        continue;
      args.push({ name: k, type: guessType(data[k]) });
    }
  }
  return { arguments: args };
}
function guessExtArgDefinitions(data) {
  let args = [];
  if (data) {
    for (let k in data) {
      if (k.startsWith("v_")) {
        args.push({ name: k, type: guessType(data[k]) });
      }
    }
  }
  return args;
}
function isSpecialVarName(name) {
  return name.startsWith("__") || name.startsWith("@") || name.startsWith("v_");
}
function guessType(value) {
  if (isString(value))
    return "String";
  if (isNumber(value)) {
    if (isInteger(value))
      return "Int";
    return "Float";
  }
  if (isBoolean(value))
    return "Boolean";
  if (isPlainObject(value))
    return "Map";
  if (isArray(value))
    return "[String]";
  return "String";
}
function registerOperation(name, op) {
  operationRegistry[name] = op;
}
const operationRegistry = {
  get: {
    //  operation: 'query',
    arguments: [
      {
        name: "id",
        type: "String",
        builder: argString
      },
      {
        name: "ignoreUnknown",
        type: "Boolean",
        builder: argBoolean
      }
    ]
  },
  findPage: {
    //  operation: 'query',
    arguments: [
      {
        name: "query",
        type: "QueryBeanInput",
        builder: argQuery
      }
    ]
  },
  findList: {
    //  operation: 'query',
    arguments: [
      {
        name: "query",
        type: "QueryBeanInput",
        builder: argQuery
      }
    ]
  },
  findFirst: {
    //  operation: 'query',
    arguments: [
      {
        name: "query",
        type: "QueryBeanInput",
        builder: argQuery
      }
    ]
  },
  update: {
    //  operation: 'mutation',
    arguments: [
      {
        name: "data",
        type: "Map",
        builder: argDataMap
      }
    ]
  },
  save: {
    // operation: 'mutation',
    arguments: [
      {
        name: "data",
        type: "Map",
        builder: argDataMap
      }
    ]
  },
  saveOrUpdate: {
    // operation: 'mutation',
    arguments: [
      {
        name: "data",
        type: "Map",
        builder: argDataMap
      }
    ]
  },
  upsert: {
    // operation: 'mutation',
    arguments: [
      {
        name: "data",
        type: "Map",
        builder: argDataMap
      }
    ]
  },
  copyForNew: {
    // operation: 'mutation',
    arguments: [
      {
        name: "data",
        type: "Map",
        builder: argDataMap
      }
    ]
  },
  delete: {
    // operation: 'mutation',
    arguments: [
      {
        name: "id",
        type: "String",
        builder: argString
      }
    ]
  },
  batchGet: {
    arguments: [
      {
        name: "ids",
        type: "[String]",
        builder: argStringList
      }
    ]
  },
  batchDelete: {
    // operation: 'mutation',
    arguments: [
      {
        name: "ids",
        type: "[String]",
        builder: argStringList
      }
    ]
  },
  batchModify: {
    // operation: 'mutation',
    arguments: [
      {
        name: "data",
        type: "[Map]",
        builder: argMapList
      },
      {
        name: "delIds",
        type: "[String]",
        builder: argStringList
      }
    ]
  }
};
const defaultArgBuilders = {
  "String": argString,
  "Boolean": argBoolean,
  "Int": argInt,
  "Float": argFloat,
  "Map": argMap,
  "[String]": argStringList,
  "[Map]": argMapList,
  "QueryBeanInput": argQuery
};
function argString(data, arg) {
  let v = data[arg.name];
  if (v == null)
    return null;
  return String(v);
}
function argBoolean(data, arg) {
  let v = data[arg.name];
  if (v == null)
    return null;
  if (v == "false" || v == "n" || v == "0" || v == "N")
    return false;
  return !!v;
}
function argInt(data, arg) {
  let v = data[arg.name];
  if (v == null)
    return null;
  return parseInt(v, 10);
}
function argFloat(data, arg) {
  let v = data[arg.name];
  if (v == null)
    return null;
  return parseFloat(v);
}
function argQuery(data, arg, options) {
  let query = {};
  query.limit = data.limit ?? data.pageSize ?? data.perPage ?? 0;
  query.offset = data.offset ?? query.limit * ((data.page || 0) - 1);
  query.orderBy = toOrderBy(data.orderBy ?? data.orderField, data.orderDir);
  query.filter = toFilter(data);
  query.cursor = data.cursor;
  query.timeout = data.timeout;
  return query;
  function toOrderBy(v, orderDir) {
    if (v == null)
      return;
    if (isString(v)) {
      if (v.length == 0)
        return;
      if (v.endsWith("_label"))
        v = v.substring(0, v.length - "_label".length);
      return [{ name: v, desc: orderDir == "desc" }];
    }
    if (isArray(v))
      return v;
    return [v];
  }
  function toFilter(data2) {
    let filter = {
      "$type": "and",
      "$body": []
    };
    for (let k in data2) {
      if (k.startsWith("filter_")) {
        let [name, op] = k.substring("filter_".length).split("__");
        op = op || "eq";
        let value = data2[k];
        if (value == null || value == "")
          continue;
        if (value == "__empty") {
          value = "";
        } else if (value == "__null") {
          value = null;
        }
        let min = void 0;
        let max = void 0;
        if (op.startsWith("between") && value != null) {
          let ary = toArray(value);
          min = ary[0];
          max = ary[1];
          value = void 0;
        }
        filter.$body.push({ "$type": op, name, value, min, max });
      }
    }
    if (options.filter) {
      if (options.filter.$type == "and" || options.filter.$type == "_" || options.filter.$type == "filter") {
        filter.$body = filter.$body.concat(options.filter.$body || []);
      } else {
        filter.$body.push(options.filter);
      }
    }
    if (filter.$body.length == 0)
      return;
    return filter;
  }
}
function argDataMap(data, arg) {
  if (data == null)
    return null;
  let ret = {};
  for (let k in data) {
    if (isSpecialVarName(k))
      continue;
    ret[k] = data[k];
  }
  return ret;
}
function argMap(data, arg) {
  return data[arg.name];
}
function argStringList(data, arg) {
  let v = data[arg.name];
  if (v == null)
    return null;
  if (isString(v))
    return v.split(",");
  return v;
}
function argMapList(data, arg) {
  return data[arg.name];
}
function argValue(data, arg) {
  return data[arg.name];
}
const HEADER_TENANT_ID = "x-tenant-id";
const HEADER_ACCESS_TOKEN = "x-access-token";
const HEADER_TIMESTAMP = "x-timestamp";
const HEADER_APP_ID = "nop-app-id";
const HEADER_VERSION = "x-version";
function attachmentAdpator(response, __) {
  if (response && response.headers && response.headers["content-disposition"]) {
    const disposition = response.headers["content-disposition"];
    let filename = "";
    if (disposition && disposition.indexOf("attachment") !== -1) {
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      let matches = disposition.match(filenameRegex);
      if (matches && matches.length) {
        filename = matches[1].replace(`UTF-8''`, "").replace(/['"]/g, "");
      }
      if (filename && filename.replace(/[^%]/g, "").length > 2) {
        filename = decodeURIComponent(filename);
      }
      let type = response.headers["content-type"];
      let blob = response.data.toString() === "[object Blob]" ? response.data : new Blob([response.data], { type });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        let URL = window.URL || window.webkitURL;
        let downloadUrl = URL.createObjectURL(blob);
        if (filename) {
          let a = document.createElement("a");
          if (typeof a.download === "undefined") {
            window.location = downloadUrl;
          } else {
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
          }
        } else {
          window.location = downloadUrl;
        }
        setTimeout(function() {
          URL.revokeObjectURL(downloadUrl);
        }, 100);
      }
      return {
        ...response,
        data: {
          status: 0,
          msg: __("sys.api.downloading")
        }
      };
    }
  } else if (response.data && response.data.toString() === "[object Blob]") {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("loadend", (e) => {
        const text = reader.result;
        try {
          resolve({
            ...response,
            data: {
              ...JSON.parse(text)
            }
          });
        } catch (e2) {
          reject(e2);
        }
      });
      reader.readAsText(response.data);
    });
  }
  return response;
}
const GRAPHQL_URL = "/graphql";
const ajax = axios.create({});
ajax.interceptors.response.use(
  (res) => {
    const token = res.headers[HEADER_ACCESS_TOKEN];
    if (token) {
      useAdapter().setAuthToken(token);
    }
    return res;
  }
);
const isCancel = axios.isCancel;
function createCancelToken(cancelExecutor) {
  return new axios.CancelToken(cancelExecutor);
}
function fetcherOk(data) {
  return {
    status: 200,
    headers: {},
    data: {
      status: 0,
      msg: "",
      data
    }
  };
}
function responseOk(data) {
  return {
    status: 0,
    msg: "",
    data
  };
}
function ajaxRequest(options) {
  const { notify, alert: alert2 } = useAdapter();
  return ajaxFetch(options).then((d) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!options.silent) {
      if ((_a = d.data) == null ? void 0 : _a.msg) {
        if ((_b = options.config) == null ? void 0 : _b.useAlert) {
          alert2(d.data.msg);
        } else {
          notify(((_c = d.data) == null ? void 0 : _c.status) == 0 ? "info" : "error", d.data.msg);
        }
      }
    }
    if (((_d = d.data) == null ? void 0 : _d.status) != 0)
      throw new Error(((_e = d.data) == null ? void 0 : _e.msg) || "ajax-fail:\ncode=" + ((_f = d.data) == null ? void 0 : _f.code) + ",status=" + ((_g = d.data) == null ? void 0 : _g.status));
    return d.data.data;
  });
}
function ajaxFetch(options) {
  var _a, _b, _c;
  options.config = options.config || {};
  let url = options.url;
  let query = options.query || {};
  const pos = url.indexOf("?");
  if (pos > 0) {
    query = { ...query, ...parse(url.substring(pos + 1)) };
    url = url.substring(0, pos);
  }
  options.query = query;
  const [type, path] = splitPrefixUrl(url) || [];
  if (type == "action") {
    const actionName = path;
    const action = (_a = options._page) == null ? void 0 : _a.getAction(actionName);
    if (!action) {
      return Promise.reject(new Error("nop.err.unknown-action:" + actionName));
    }
    try {
      let result = action(options);
      return Promise.resolve(result).then((res2) => {
        if (res2 == null)
          return fetcherOk(res2);
        return res2;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  } else if (type == "dict") {
    return useAdapter().fetchDict(path, options);
  } else if (type == "page") {
    return useAdapter().fetchPageAndTransform(path, options);
  }
  const globSetting = useAdapter().useSettings();
  if (globSetting.apiUrl && options.config.useApiUrl !== false) {
    url = `${globSetting.apiUrl}${url}`;
  }
  const config = {
    withCredentials: options.config.withCredentials ?? true,
    url,
    method: options.method || "post",
    headers: options.headers || {},
    data: options.data,
    params: query,
    responseType: options.responseType
  };
  if ((_b = options.config) == null ? void 0 : _b.cancelExecutor) {
    const controller = new AbortController();
    options.config.cancelExecutor(() => {
      controller.abort();
    });
    config.signal = controller.signal;
  }
  const opts = {
    withToken: options.config.withToken
  };
  prepareHeaders(config, opts);
  handleGraphQL(config, GRAPHQL_URL, options);
  if (((_c = config.method) == null ? void 0 : _c.toLowerCase()) == "get") {
    config.params = { ...options.data, ...query };
    config.data = null;
  }
  const { useI18n, processRequest, processResponse } = useAdapter();
  const res = ajax.request(processRequest(config)).then((res2) => {
    var _a2;
    if (res2.status == 200 && ((_a2 = options.config) == null ? void 0 : _a2.rawResponse)) {
      res2.data = responseOk(res2.data);
    }
    return res2;
  }).catch((error) => {
    var _a2;
    if (axios.isCancel(error)) {
      throw error;
    }
    const { t } = useI18n();
    const { response } = error || {};
    if (!response || !response.status) {
      throw new Error(t("sys.api.apiRequestFailed"));
    }
    const err = error.toString();
    let errMessage = normalizeErrMessage(response.status, "");
    if (!errMessage && (err == null ? void 0 : err.includes("Network Error"))) {
      errMessage = t("sys.api.networkExceptionMsg");
    }
    if (((_a2 = response.data) == null ? void 0 : _a2.status) == null) {
      return {
        status: response.status,
        data: {
          status: -1,
          msg: errMessage
        }
      };
    }
    return response;
  }).then((response) => {
    if (options.responseType == "blob") {
      if (response.status == 401) {
        doLogout("401");
        return response;
      }
      const __ = useI18n().t;
      return attachmentAdpator(response, __);
    }
    let data = response.data || {};
    if (response.status == 401 || data.status == 401) {
      doLogout("401");
    } else if (data.status == 0 || data.status == 200) {
      if (options.responseKey) {
        data = { [options.responseKey]: data.data };
      }
    }
    response.data = data;
    return response;
  });
  return processResponse(res);
}
function prepareHeaders(config, opts) {
  const { useAuthToken, useTenantId, useLocale, useAppId, globalVersion } = useAdapter();
  const token = useAuthToken();
  let tenantid = useTenantId();
  config.headers = config.headers || {};
  config.headers["nop-locale"] = useLocale();
  config.headers["x-requested-with"] = "XMLHttpRequest";
  if (token && opts.withToken !== false) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers[HEADER_TIMESTAMP] = (/* @__PURE__ */ new Date()).getTime();
    if (!tenantid) {
      tenantid = "0";
    }
    config.headers[HEADER_TENANT_ID] = tenantid;
    config.headers[HEADER_VERSION] = globalVersion;
    let appId = useAppId();
    if (appId) {
      config.headers[HEADER_APP_ID] = appId;
    }
  }
}
function normalizeErrMessage(status, msg) {
  const { t } = useAdapter().useI18n();
  let errMessage = "";
  switch (status) {
    case 401:
      errMessage = msg || t("sys.api.errMsg401");
      break;
    case 403:
      errMessage = t("sys.api.errMsg403");
      break;
    case 404:
      errMessage = t("sys.api.errMsg404");
      break;
    case 405:
      errMessage = t("sys.api.errMsg405");
      break;
    case 408:
      errMessage = t("sys.api.errMsg408");
      break;
    case 500:
      errMessage = t("sys.api.errMsg500");
      break;
    case 501:
      errMessage = t("sys.api.errMsg501");
      break;
    case 502:
      errMessage = t("sys.api.errMsg502");
      break;
    case 503:
      errMessage = t("sys.api.errMsg503");
      break;
    case 504:
      errMessage = t("sys.api.errMsg504");
      break;
    case 505:
      errMessage = t("sys.api.errMsg505");
      break;
  }
  return errMessage;
}
function doLogout(reason) {
  const { setAuthToken, logout } = useAdapter();
  setAuthToken(void 0);
  logout(reason);
}
const debug$1 = ref(false);
const supportDebug$1 = ref(false);
function toggleDebug() {
  setDebug(!debug$1.value);
}
function setDebug(b) {
  debug$1.value = b;
}
function useDebug() {
  return {
    debug: debug$1,
    supportDebug: supportDebug$1,
    toggleDebug,
    setDebug
  };
}
const System = (typeof self !== "undefined" ? self : global).System;
function importModule(path) {
  if (path.endsWith(".lib.js") && path.startsWith("/") && !path.startsWith("/p/")) {
    path = "/p/SystemJsProvider__getJs" + path;
  }
  let url = System.resolve(path);
  return System.import(
    /*@vite-ignore*/
    url
  );
}
function deleteDynamicModules() {
  for (let module of System.entries()) {
    const moduleId = module[0];
    if (moduleId.endsWith(".lib.js"))
      System.delete(moduleId);
  }
}
function registerModule(name, lib) {
  let libPath = name;
  if (name.startsWith("./")) {
    libPath = System.resolve(name);
  } else {
    libPath = System.resolve("./@nop/" + name + ".js");
    System.addImportMap({
      imports: {
        [name]: libPath
      }
    });
  }
  System.set(libPath, lib);
}
function addSystemImportMap(imports) {
  System.addImportMap({
    imports
  });
}
const pageCache = createAsyncCache({ max: 50 });
const dictCache = createAsyncCache({ max: 100 });
function buildLocaleKey(name) {
  const { useLocale } = useAdapter();
  return useLocale() + "|" + name;
}
function clearLocalCache() {
  pageCache.clear();
  dictCache.clear();
  deleteDynamicModules();
}
function clearPageCache() {
  pageCache.clear();
}
function clearDictCache() {
  dictCache.clear();
}
function deletePageCache(path) {
  const key = buildLocaleKey(path);
  pageCache.delete(key);
}
function withPageCache(path, fn) {
  const key = buildLocaleKey(path);
  return pageCache.get(key, fn);
}
function withDictCache(dictName, fn) {
  const key = buildLocaleKey(dictName);
  return dictCache.get(key, () => {
    return fn().then((res) => {
      if (!res.static) {
        dictCache.delete(key);
      }
      return res;
    });
  });
}
const PageApis = {
  DevTool__clearComponentCache,
  PageProvider__getPage,
  PageProvider__getPageSource,
  PageProvider__rollbackPageSource,
  PageProvider__savePageSource,
  DictProvider__getDict
};
function DevTool__clearComponentCache() {
  const { debug: debug2 } = useDebug();
  if (debug2) {
    return ajaxRequest({
      method: "post",
      url: "@mutation:DevTool__clearComponentCache"
    });
  }
  return Promise.resolve({});
}
function PageProvider__getPage(path) {
  if ({}.VITE_USE_MOCK)
    return ajaxRequest({ method: "get", url: `/mock${path}`, config: { rawResponse: true } });
  return withPageCache(path, () => {
    return ajaxRequest({
      method: "post",
      url: "@query:PageProvider__getPage",
      data: {
        path
      }
    });
  });
}
function PageProvider__getPageSource(path, silent) {
  return ajaxRequest({
    method: "post",
    url: "@query:PageProvider__getPageSource",
    data: {
      path
    },
    silent
  }).then((page) => {
    page.__baseUrl = path;
    return page;
  });
}
function PageProvider__rollbackPageSource(path, silent) {
  return ajaxRequest({
    method: "post",
    url: "@mutation:PageProvider__rollbackPageSource",
    data: {
      path
    },
    silent
  });
}
function PageProvider__savePageSource(path, data, silent) {
  deletePageCache(path);
  return ajaxRequest({
    method: "post",
    url: "@mutation:PageProvider__savePageSource",
    data: {
      path,
      data: omit(data, "__baseUrl")
    },
    silent
  });
}
function DictProvider__getDict(dictName, silent) {
  return withDictCache(dictName, () => {
    return ajaxRequest({
      method: "post",
      url: "@query:DictProvider__getDict/static,options{value,label}",
      data: {
        dictName
      },
      silent
    });
  });
}
const { supportDebug, debug } = useDebug();
const UserApis = {
  SiteMapApi__getSiteMap,
  LoginApi__login,
  LoginApi__getLoginUserInfo,
  LoginApi__logout,
  LoginApi__generateVerifyCode
};
function SiteMapApi__getSiteMap() {
  return ajaxRequest({
    url: "/r/SiteMapApi__getSiteMap",
    data: {
      siteId: "main"
    }
  }).then((data) => {
    supportDebug.value = data.supportDebug;
    debug.value = data.supportDebug;
    return data;
  });
}
function LoginApi__login(req) {
  return ajaxRequest({
    url: `/r/LoginApi__login?@selection=token:accessToken`,
    data: req,
    // 登录页面发现异常时会自己弹出错误提示信息，这里禁用ajaxRequest内部的提示框
    silent: true
  });
}
function LoginApi__getLoginUserInfo() {
  const { useAuthToken } = useAdapter();
  return ajaxRequest({
    url: "@query:LoginApi__getLoginUserInfo/username:userName,realname:nickName",
    data: {
      accessToken: useAuthToken()
    }
  });
}
function LoginApi__logout() {
  const { useAuthToken } = useAdapter();
  return ajaxRequest({
    url: "@mutation:LoginApi__logout",
    data: {
      accessToken: useAuthToken()
    }
  });
}
function LoginApi__generateVerifyCode(verifySecret) {
  return ajaxRequest({
    url: "/r/LoginApi__generateVerifyCode",
    method: "get",
    data: {
      verifySecret
    }
  });
}
let s_page;
function usePage() {
  return s_page;
}
function providePage(page) {
  s_page = page;
}
let s_scoped;
function useScoped() {
  return s_scoped;
}
function provideScoped(scoped) {
  s_scoped = scoped;
}
let s_scopedStore;
function useScopedStore() {
  return s_scopedStore;
}
function provideScopedStore(store) {
  s_scopedStore = store;
}
function clearScoped() {
  s_page = void 0;
  s_scoped = void 0;
  s_scopedStore = void 0;
}
const schemaTypes = {};
function registerSchemaType(typeName, schemaType) {
  schemaTypes[typeName] = schemaType;
}
function getSchemaType(typeName) {
  return schemaTypes[typeName];
}
const NopCore = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PageApis,
  UserApis,
  absolutePath,
  addSystemImportMap,
  ajax,
  ajaxFetch,
  ajaxRequest,
  bindActions,
  clearDictCache,
  clearLocalCache,
  clearPageCache,
  clearScoped,
  conditionToTree,
  createAsyncCache,
  createCancelToken,
  createPage,
  default_isCurrentUrl,
  default_jumpTo,
  default_updateLocation,
  deleteDynamicModules,
  deletePageCache,
  fetcherOk,
  format,
  getSchemaType,
  handleGraphQL,
  importModule,
  isCancel,
  isPageUrl,
  openWindow,
  processXuiDirective,
  processXuiValue,
  providePage,
  provideScoped,
  provideScopedStore,
  refHolder,
  registerAdapter,
  registerModule,
  registerOperation,
  registerSchemaType,
  registerXuiComponent,
  resolveXuiComponent,
  responseOk,
  splitPrefixUrl,
  transformPageJson,
  treeToCondition,
  unregisterXuiComponent,
  useAdapter,
  useDebug,
  usePage,
  useScoped,
  useScopedStore,
  withDictCache,
  withPageCache
}, Symbol.toStringTag, { value: "Module" }));
registerModule("@nop-chaos/nop-core", NopCore);
registerAdapter({
  fetchDict(dictName, options) {
    return PageApis.DictProvider__getDict(dictName, options.silent || false).then((res) => fetcherOk(res));
  },
  fetchPageAndTransform(pagePath, options) {
    return PageApis.PageProvider__getPage(pagePath).then(async (pageData) => {
      pageData = await transformPageJson(pagePath, pageData);
      if (options._page) {
        bindActions(pagePath, pageData, options._page);
      }
      return fetcherOk(pageData);
    });
  },
  getPage(pageUrl) {
    return PageApis.PageProvider__getPage(pageUrl);
  }
});
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
      render: render2,
      ...rest
    } = this.props;
    const props = { ...rest, value, onChange };
    return render2("popup", popup, props);
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
class PopupEditorControl extends React__default.Component {
  renderPickerIcon() {
    const { render: render2, pickerIcon } = this.props;
    return pickerIcon ? render2("picker-icon", pickerIcon) : void 0;
  }
  render() {
    const { className, classnames: cx, style: style2, pickerIcon, ...rest } = this.props;
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
PopupEditorRenderer = __decorateClass([
  FormItem({
    type: "popup-editor",
    strictMode: false
  })
], PopupEditorRenderer);
const _sfc_main$6 = defineComponent({
  props: {
    path: {
      type: String,
      required: true
    }
  },
  emits: ["exit"],
  setup(props, { emit }) {
    const editorRef = ref(null);
    let inited = false;
    let fetched = false;
    const {
      PageProvider__rollbackPageSource: rollbackPageSource,
      PageProvider__getPageSource: getPageSource,
      PageProvider__savePageSource: savePageSource
    } = PageApis;
    function handleEvent(event) {
      if (event.data == "amis-editor-inited") {
        if (fetched)
          return;
        inited = true;
        startFetch();
      } else if (event.data === "amis-editor-reload") {
        fetched = false;
        startFetch();
      } else if (event.data === "amis-editor-exit") {
        emit("exit");
      } else if (event.data === "amis-editor-rollback") {
        deletePageCache(props.path);
        rollbackPageSource(props.path, true).then(() => {
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
      } else if (isString$1(event.data) && event.data.startsWith("{")) {
        var data = JSON.parse(event.data);
        if (data.type == "save") {
          savePageSource(props.path, data.data, true).then(() => {
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
      const str = isString$1(msg) ? msg : JSON.stringify(msg);
      frame.contentWindow.postMessage(str, "*");
    }
    function startFetch() {
      const frame = editorRef.value;
      if (!frame || !props.path)
        return;
      fetched = true;
      return getPageSource(props.path, true).then((page) => {
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
    onMounted(() => {
      console.log("editor mounted:" + editorRef.value);
      if (inited) {
        startFetch();
      }
    });
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
const _hoisted_1$2 = {
  style: { "width": "100%", "height": "100%", "border": "none" },
  ref: "editorRef",
  src: "/amis-editor/index.html"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("iframe", _hoisted_1$2, null, 512);
}
const AmisPageEditor = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3]]);
function createEnv(page) {
  const { debug: debug2 } = useDebug();
  const adapter2 = useAdapter();
  let env = {
    session: page.id,
    affixOffsetTop: 0,
    fetcher(options) {
      providePage(page);
      options._page = page;
      return ajaxFetch(options);
    },
    jumpTo(to, action, ctx) {
      const router = adapter2.useRouter();
      return default_jumpTo(router, to);
    },
    isCancel,
    isCurrentUrl: default_isCurrentUrl,
    updateLocation(to, replace) {
      default_updateLocation(to, !!replace);
    },
    notify: adapter2.notify,
    enableAMISDebug: debug2.value,
    alert: adapter2.alert,
    confirm: adapter2.confirm,
    copy: (contents, options) => {
      if (options === void 0) {
        options = {};
      }
      const { t } = adapter2.useI18n();
      const ret = copy(contents, options);
      ret && (!options || options.shutup !== true) && toast.info(t("Copy To Clipboard"));
      return ret;
    }
  };
  env._page = page;
  page.env = env;
  return env;
}
const _sfc_main$5 = defineComponent({
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
    let amisScoped;
    let page = createPage({
      getComponent(name) {
        return get_component(name);
      },
      getScopedStore(name) {
        var _a2, _b;
        return (_b = (_a2 = get_component(name)) == null ? void 0 : _a2.props) == null ? void 0 : _b.store;
      },
      getState(name) {
        return get_root_store().get(name);
      },
      setState(name, value) {
        get_root_store().set(name, value);
      },
      actions: props.actions
    });
    (_a = props.registerPage) == null ? void 0 : _a.call(props, page);
    function get_root() {
      return amisScoped == null ? void 0 : amisScoped.getComponents()[0];
    }
    function get_root_store() {
      var _a2;
      return (_a2 = get_root()) == null ? void 0 : _a2.context.store;
    }
    function get_component(name) {
      var _a2, _b, _c;
      if (name[0] == "#") {
        let pos = name.indexOf(".");
        if (pos < 0) {
          return (_a2 = get_root()) == null ? void 0 : _a2.context.getComponentById(name.substring(1));
        } else {
          return (_b = get_root()) == null ? void 0 : _b.context.getComponentById(name.substring(1)).getComponentByName(name.substring(pos + 1));
        }
      } else {
        return (_c = get_root()) == null ? void 0 : _c.context.getComponentByName(name);
      }
    }
    function destroyPage() {
      root == null ? void 0 : root.unmount();
      clearStoresCache(page.id);
    }
    async function renderPage() {
      let env = createEnv(page);
      const locale = useAdapter().useLocale();
      let opts = {
        data: props.data,
        onConfirm: page.getAction("ok") || function() {
        },
        onClose: function(b) {
          var _a2, _b;
          if (b) {
            (_a2 = page.getAction("ok")) == null ? void 0 : _a2();
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
      const schema = cloneDeep(props.schema);
      await bindActions(schema.__baseUrl, schema, page);
      const vdom = render(schema, opts, env);
      root = createRoot(domRef.value);
      root.render(vdom);
    }
    watchEffect(() => {
      destroyPage();
      if (props.schema && domRef.value) {
        renderPage();
      }
    });
    onBeforeUnmount(() => {
      if (root) {
        root.unmount();
        root = void 0;
      }
    });
    return {
      domRef
    };
  }
});
const _hoisted_1$1 = {
  ref: "domRef",
  style: { "width": "100%", "height": "100%" },
  class: "amis"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, null, 512);
}
const AmisSchemaPage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "XuiPageEditor",
  props: {
    path: {
      type: String,
      required: true
    }
  },
  emits: ["exit"],
  setup(__props, { emit }) {
    const props = __props;
    function handleExit() {
      emit("exit");
    }
    const componentType = ref(markRaw(AmisPageEditor));
    const { useI18n } = useAdapter();
    watchEffect(() => {
      useAdapter().getPage(props.path).then((schema) => {
        const schemaTypeName = schema["xui:schema-type"];
        if (!schemaTypeName) {
          componentType.value = markRaw(AmisPageEditor);
        } else {
          const schemaType = getSchemaType(schemaTypeName);
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
      return openBlock(), createBlock(resolveDynamicComponent(componentType.value), {
        path: __props.path,
        onExit: handleExit
      }, null, 40, ["path"]);
    };
  }
});
const _hoisted_1 = { class: "page-debugger" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("header", null, null, -1);
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
    function handleChange(data) {
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
    function handleEditorExit() {
      designerVisible.value = false;
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
            createVNode(AmisSchemaPage, {
              schema: unref(debuggerSchema),
              actions: schemaActions,
              data: schemaData.value
            }, null, 8, ["schema", "data"])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(unref(ElDialog), {
          destroyOnClose: true,
          class: "page-full-screen",
          modelValue: designerVisible.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => designerVisible.value = $event),
          maskClosable: false,
          "append-to-body": true,
          width: "100%",
          height: "100%",
          "align-center": true,
          fullscreen: true,
          footer: null,
          closable: false,
          keyboard: false
        }, {
          default: withCtx(() => [
            _hoisted_2,
            createVNode(_sfc_main$3, {
              path: __props.path,
              onExit: handleEditorExit
            }, null, 8, ["path"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
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
        const schemaType = getSchemaType(schemaTypeName);
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
    const { debug: debug2 } = useDebug();
    const actions = { ...props.actions };
    return {
      pageSchema,
      updateSchema,
      rebuild,
      registerPage,
      debug: debug2,
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
FormItem$1({
  type: "vue-form-item",
  autoVar: false
})(VueFormItem);
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
const style = "";
const fix = "";
export {
  AmisPageEditor,
  AmisSchemaPage,
  _sfc_main$4 as AmisToast,
  VueControl as AmisVueComponent,
  PageApis,
  PopupEditor$1 as PopupEditor,
  UserApis,
  XuiPage,
  _sfc_main$3 as XuiPageEditor,
  XuiSchemaPage,
  absolutePath,
  addSystemImportMap,
  ajax,
  ajaxFetch,
  ajaxRequest,
  bindActions,
  clearDictCache,
  clearLocalCache,
  clearPageCache,
  clearScoped,
  conditionToTree,
  createAsyncCache,
  createCancelToken,
  createPage,
  default_isCurrentUrl,
  default_jumpTo,
  default_updateLocation,
  deleteDynamicModules,
  deletePageCache,
  fetcherOk,
  format,
  getSchemaType,
  handleGraphQL,
  importModule,
  isCancel,
  isPageUrl,
  openWindow,
  processXuiDirective,
  processXuiValue,
  providePage,
  provideScoped,
  provideScopedStore,
  refHolder,
  registerAdapter,
  registerModule,
  registerOperation,
  registerSchemaType,
  registerXuiComponent,
  resolveXuiComponent,
  responseOk,
  splitPrefixUrl,
  transformPageJson,
  treeToCondition,
  unregisterXuiComponent,
  useAdapter,
  useDebug,
  usePage,
  useScoped,
  useScopedStore,
  withDictCache,
  withPageCache
};
