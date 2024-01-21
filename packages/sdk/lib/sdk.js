import qs, { parse as parse$1 } from "qs";
import { match } from "path-to-regexp";
import * as Vue from "vue";
import { ref, shallowRef, toRaw, defineComponent, onUnmounted, markRaw, watchEffect, onBeforeUnmount, h, onMounted, openBlock, createElementBlock, Fragment as Fragment$1, createBlock, resolveDynamicComponent, mergeProps, createCommentVNode, unref, withCtx, createVNode, createElementVNode, createTextVNode, normalizeProps, guardReactiveProps, resolveComponent, createStaticVNode } from "vue";
import LRUCache from "lru-cache";
import { cloneDeep as cloneDeep$2, isNumber, isInteger, isBoolean, omit as omit$2, isString as isString$2 } from "lodash-es";
import axios from "axios";
import { isObject as isObject$2, isArray as isArray$1, isPromise, isString as isString$1, isPlainObject } from "@vue/shared";
import "systemjs/dist/system.js";
import { noop as noop$3, themeable, localeable, uncontrollable, FormItem, autobind, createObject, resolveVariableAndFilter } from "amis-core";
import * as React from "react";
import React__default, { createContext, useState, useCallback, useRef, useMemo as useMemo$1, useContext, useEffect, useLayoutEffect as useLayoutEffect$1, forwardRef, useImperativeHandle, createElement, createRef, Component, Fragment } from "react";
import { PickerContainer, ResultBox } from "amis-ui";
import { unRegisterRenderer, isEffectiveApi, Renderer, ScopedContext, FormItem as FormItem$1, clearStoresCache, setDefaultLocale, render, ToastComponent, dataMapping, alert, confirm, toast } from "amis";
import * as ReactDOM from "react-dom";
import ReactDOM__default, { createPortal, findDOMNode as findDOMNode$1 } from "react-dom";
import copy from "copy-to-clipboard";
import { createRoot } from "react-dom/client";
import { ElDialog, ElButton } from "element-plus";
import yaml from "js-yaml";
import { applyPureVueInReact, applyVueInReact } from "veaury";
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
  function go(to2, replace22) {
    if (replace22) {
      router.push(to2);
    } else {
      router.replace(to2);
    }
  }
  const replace2 = to.startsWith("replace://");
  if (replace2) {
    to = to.substring("replace://".length);
  }
  if (isPageUrl(to)) {
    const pos = to.indexOf("?");
    const query = pos > 0 ? to.substring(pos + 1) : null;
    const data = query ? qs.parse(query) : null;
    const page = { name: "jsonPage", params: { path: to, data } };
    go(page, replace2);
  } else {
    go(to, replace2);
  }
}
function openWindow(url2, opt) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature = [];
  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");
  window.open(url2, target, feature.join(","));
}
function isPageUrl(url2) {
  let pos = url2.indexOf("?");
  if (pos > 0)
    url2 = url2.substring(0, pos);
  return url2.endsWith(".page.json5") || url2.endsWith(".page.yaml") || url2.endsWith(".page.json");
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
function default_updateLocation(to, replace2) {
  if (to === "goBack") {
    return window.history.back();
  }
  if (replace2 && window.history.replaceState) {
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
  configUpgrade(configName, version2, prevVersion, config) {
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
  usePinia() {
    throw new Error("not-impl");
  },
  /**
   * 返回指定的Store
   */
  useStore(name) {
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
  setAuthToken(token2) {
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
  notify(type4, msg, conf) {
    throw new Error("not-impl");
  },
  alert(msg, title) {
    throw new Error("not-impl");
  },
  confirm(msg, title) {
    throw new Error("not-impl");
  },
  dataMapping(to, from2 = {}, ignoreFunction = false, convertKeyToPath, ignoreIfNotMatch = false) {
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
function format$1(msg, placeholderStart, placeholdeEnd, resolver) {
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
      const value2 = resolver(name);
      if (value2 != null) {
        ret += String(value2);
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
function treeToCondition(node2) {
  if (node2.$type === "and" || node2.$type == "or" || node2.$type == "not") {
    return { condjunction: node2.$type, children: (node2.$body || []).map(treeToCondition) };
  } else {
    return {
      "op": node2.$type,
      left: {
        type: "field",
        field: node2.name
      },
      right: node2.value
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
  const value2 = shallowRef();
  return {
    getRaw() {
      return toRaw(value2).value;
    },
    get() {
      return value2.value;
    },
    set(t) {
      value2.value = t;
    }
  };
}
function createAsyncCache(options) {
  const cache = new LRUCache(options);
  return {
    get(key, loader) {
      let promise = cache.get(key);
      if (promise) {
        return promise.then((v) => v && cloneDeep$2(v));
      }
      promise = loader(key);
      cache.set(key, promise);
      return promise.then((v) => v && cloneDeep$2(v)).catch((e) => {
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
  if (isObject$2(json)) {
    let type4 = json[typeProp];
    if (type4) {
      return processor(type4, json, processProps);
    }
    processProps(json);
  } else if (isArray$1(json)) {
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
      if (isString$1(v)) {
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
  if (isObject$2(json)) {
    processProps(json);
  } else if (isArray$1(json)) {
    for (let i = 0, n = json.length; i < n; i++) {
      let child = json[i];
      if (isString$1(child)) {
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
  function process2(json2) {
    if (!isPlainObject(json2))
      return;
    let modulePaths = json2["xui:import"];
    if (modulePaths) {
      stackIndex++;
    }
    for (let key in json2) {
      const v = json2[key];
      if (!v)
        continue;
      if (isString$1(v)) {
        json2[key] = processValue(key, v);
      } else if (isArray$1(v)) {
        for (let i = 0, n = v.length; i < n; i++) {
          process2(v[i]);
        }
      } else {
        process2(v);
      }
    }
    if (modulePaths) {
      stackIndex--;
    }
  }
  function processValue(key, v) {
    const [type4, path] = splitPrefixUrl(v) || [];
    if (!type4)
      return v;
    if (["query", "mutation", "graphql", "dict", "page"].includes(type4)) {
      return type4 + "://" + path;
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
    } else if (type4 == "fn") {
      const fn = buildFunction(path, page);
      return wrapFunc(fn, v);
    }
    return v;
  }
  process2(json);
}
function splitPrefixUrl(url2) {
  if (url2.startsWith("@")) {
    let pos2 = url2.indexOf(":");
    if (pos2 < 0) {
      return;
    }
    return [url2.substring(1, pos2), url2.substring(pos2 + 1).trim()];
  }
  let pos = url2.indexOf("://");
  if (pos < 0)
    return;
  return [url2.substring(0, pos), url2.substring(pos + 3)];
}
function buildFunction(fn, page) {
  return useAdapter().compileFunction(fn, page);
}
function fetchModules(pageUrl, modulePaths, promises, fnScope) {
  if (isString$1(modulePaths)) {
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
function registerXuiComponent(type4, component) {
  g_components[type4] = component;
}
function unregisterXuiComponent(type4) {
  delete g_components[type4];
}
function resolveXuiComponent(type4, json) {
  const comp = g_components[type4];
  if (!comp)
    throw new Error("nop.err.xui.unknown-component:" + type4);
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
  let url2 = config.url;
  const [type4, path] = splitPrefixUrl(url2) || [];
  if (type4 == "query" || type4 == "mutation" || type4 == "subscription") {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl(type4, path, config, graphqlUrl, options);
    return true;
  } else if (url2.endsWith("/graphql") || url2.indexOf("/graphql?") >= 0) {
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
function handleGraphQLUrl(opType, url2, config, graphql, options) {
  let pos = url2.indexOf("?");
  if (pos > 0) {
    url2 = url2.substring(0, pos);
  }
  let pos2 = url2.indexOf("/");
  const action = pos2 > 0 ? url2.substring(0, pos2) : url2;
  let selection = pos2 > 0 ? url2.substring(pos2 + 1) : void 0;
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
      const values = toArray$2(data.value, options.delimiter);
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
function toArray$2(value2, delimiter2) {
  if (isString$1(value2)) {
    value2 = value2.split(delimiter2 || ",");
  }
  return value2;
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
function guessType(value2) {
  if (isString$1(value2))
    return "String";
  if (isNumber(value2)) {
    if (isInteger(value2))
      return "Int";
    return "Float";
  }
  if (isBoolean(value2))
    return "Boolean";
  if (isPlainObject(value2))
    return "Map";
  if (isArray$1(value2))
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
    if (isString$1(v)) {
      if (v.length == 0)
        return;
      if (v.endsWith("_label"))
        v = v.substring(0, v.length - "_label".length);
      return [{ name: v, desc: orderDir == "desc" }];
    }
    if (isArray$1(v))
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
        let value2 = data2[k];
        if (value2 == null || value2 == "")
          continue;
        if (value2 == "__empty") {
          value2 = "";
        } else if (value2 == "__null") {
          value2 = null;
        }
        let min = void 0;
        let max = void 0;
        if (op.startsWith("between") && value2 != null) {
          let ary = toArray$2(value2);
          min = ary[0];
          max = ary[1];
          value2 = void 0;
        }
        filter.$body.push({ "$type": op, name, value: value2, min, max });
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
  if (isString$1(v))
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
      let type4 = response.headers["content-type"];
      let blob = response.data.toString() === "[object Blob]" ? response.data : new Blob([response.data], { type: type4 });
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
    const token2 = res.headers[HEADER_ACCESS_TOKEN];
    if (token2) {
      useAdapter().setAuthToken(token2);
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
  let url2 = options.url;
  let query = options.query || {};
  const pos = url2.indexOf("?");
  if (pos > 0) {
    query = { ...query, ...parse$1(url2.substring(pos + 1)) };
    url2 = url2.substring(0, pos);
  }
  options.query = query;
  const [type4, path] = splitPrefixUrl(url2) || [];
  if (type4 == "action") {
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
  } else if (type4 == "dict") {
    return useAdapter().fetchDict(path, options);
  } else if (type4 == "page") {
    return useAdapter().fetchPageAndTransform(path, options);
  }
  const globSetting = useAdapter().useSettings();
  if (globSetting.apiUrl && options.config.useApiUrl !== false) {
    url2 = `${globSetting.apiUrl}${url2}`;
  }
  function normalizeData2(data2) {
    if (!data2)
      return data2;
    if (data2 instanceof FormData || data2 instanceof ArrayBuffer)
      return data2;
    return Object.assign({}, data2);
  }
  const data = normalizeData2(options.data);
  const config = {
    withCredentials: options.config.withCredentials ?? true,
    url: url2,
    method: options.method || "post",
    headers: options.headers || {},
    data,
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
    config.params = { ...config.data, ...query };
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
    let data2 = response.data || {};
    if (response.status == 401 || data2.status == 401) {
      doLogout("401");
    } else if (data2.status == 0 || data2.status == 200) {
      if (options.responseKey) {
        data2 = { [options.responseKey]: data2.data };
      }
    }
    response.data = data2;
    return response;
  });
  return processResponse(res);
}
function prepareHeaders(config, opts) {
  var _a;
  const { useAuthToken, useTenantId, useLocale, useAppId, globalVersion } = useAdapter();
  const token2 = useAuthToken();
  let tenantid = useTenantId();
  config.headers = config.headers || {};
  config.headers["nop-locale"] = (_a = useLocale()) == null ? void 0 : _a.replace("_", "-");
  config.headers["x-requested-with"] = "XMLHttpRequest";
  if (token2 && opts.withToken !== false) {
    config.headers.Authorization = `Bearer ${token2}`;
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
  let url2 = System.resolve(path);
  return System.import(
    /*@vite-ignore*/
    url2
  );
}
function deleteDynamicModules() {
  for (let module2 of System.entries()) {
    const moduleId = module2[0];
    if (moduleId.endsWith(".lib.js"))
      System.delete(moduleId);
  }
}
function registerModule(name, lib) {
  let libPath = name;
  if (name.startsWith("./")) {
    libPath = System.resolve(name);
  } else if (name.startsWith("@nop/")) {
    libPath = System.resolve("./nop/" + name.substring("@nop/".length) + ".js");
  } else {
    libPath = System.resolve("./nop/" + name + ".js");
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
  if (path.startsWith("/p/"))
    return withPageCache(path, () => {
      return ajaxRequest({
        method: "get",
        url: path
      });
    });
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
      data: omit$2(data, "__baseUrl")
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
const schemaProcessorTypes = {};
function registerSchemaProcessorType(typeName, schemaProcessorType) {
  schemaProcessorTypes[typeName] = schemaProcessorType;
}
function getSchemaProcessorType(typeName) {
  return schemaProcessorTypes[typeName];
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
  format: format$1,
  getSchemaProcessorType,
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
  registerSchemaProcessorType,
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
const RenderContextKey = createContext(null);
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
  const { render: render2, executor, observeEvent } = renderContext;
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
      const index2 = callbacks.indexOf(callback);
      index2 >= 0 && callbacks.splice(index2, 1);
    };
  }, [editorCallbacks]);
  const subProps = {
    graphDiagram
  };
  function renderToolbar() {
    return /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-toolbar " + (toolbarClassName || "") }, render2("toolbar", toolbar || "", subProps, props));
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
    ), render2("subEditor", schema || "", {
      ...subProps,
      data,
      onChange: handleEditorChange
    }, props));
  }
  return /* @__PURE__ */ React.createElement(RenderContextKey.Provider, { value: {
    ...renderContext,
    onEvent: handleEvent,
    observeEvent: registerEditorCallback
  } }, /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer " + (className || "") }, toolbar ? renderToolbar() : null, /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-inner" }, /* @__PURE__ */ React.createElement("div", { className: "nop-graph-designer-main" }, render2("main", props.mainEditor, subProps, props)), showRightPanel ? renderRightPanel() : null)));
}
function getDefaultExportFromCjs$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = React__default, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h2 = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h2 = a.ref);
    for (b in a)
      m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h2, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React2 = React__default;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format2) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format2, args);
          }
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format2 += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format2);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type4) {
        if (typeof type4 === "string" || typeof type4 === "function") {
          return true;
        }
        if (type4 === REACT_FRAGMENT_TYPE || type4 === REACT_PROFILER_TYPE || enableDebugTracing || type4 === REACT_STRICT_MODE_TYPE || type4 === REACT_SUSPENSE_TYPE || type4 === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type4 === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type4 === "object" && type4 !== null) {
          if (type4.$$typeof === REACT_LAZY_TYPE || type4.$$typeof === REACT_MEMO_TYPE || type4.$$typeof === REACT_PROVIDER_TYPE || type4.$$typeof === REACT_CONTEXT_TYPE || type4.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type4.$$typeof === REACT_MODULE_REFERENCE || type4.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type4) {
        return type4.displayName || "Context";
      }
      function getComponentNameFromType(type4) {
        if (type4 == null) {
          return null;
        }
        {
          if (typeof type4.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type4 === "function") {
          return type4.displayName || type4.name || null;
        }
        if (typeof type4 === "string") {
          return type4;
        }
        switch (type4) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type4 === "object") {
          switch (type4.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type4;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type4;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type4, type4.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type4.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type4.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type4;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match2 = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match2 && match2[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type4, source, ownerFn) {
        if (type4 == null) {
          return "";
        }
        if (typeof type4 === "function") {
          {
            return describeNativeComponentFrame(type4, shouldConstruct(type4));
          }
        }
        if (typeof type4 === "string") {
          return describeBuiltInComponentFrame(type4);
        }
        switch (type4) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type4 === "object") {
          switch (type4.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type4.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type4.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type4;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has2 = Function.call.bind(hasOwnProperty2);
          for (var typeSpecName in typeSpecs) {
            if (has2(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location2, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray2(a) {
        return isArrayImpl(a);
      }
      function typeName(value2) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type4 = hasToStringTag && value2[Symbol.toStringTag] || value2.constructor.name || "Object";
          return type4;
        }
      }
      function willCoercionThrow(value2) {
        {
          try {
            testStringCoercion(value2);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value2) {
        return "" + value2;
      }
      function checkKeyStringCoercion(value2) {
        {
          if (willCoercionThrow(value2)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value2));
            return testStringCoercion(value2);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty2.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty2.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type4, key, ref2, self2, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type4,
          key,
          ref: ref2,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type4, config, maybeKey, source, self2) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref2 = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref2 = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self2);
          }
          for (propName in config) {
            if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type4 && type4.defaultProps) {
            var defaultProps2 = type4.defaultProps;
            for (propName in defaultProps2) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps2[propName];
              }
            }
          }
          if (key || ref2) {
            var displayName = typeof type4 === "function" ? type4.displayName || type4.name || "Unknown" : type4;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref2) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type4, key, ref2, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement2(object4) {
        {
          return typeof object4 === "object" && object4 !== null && object4.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node2, parentType) {
        {
          if (typeof node2 !== "object") {
            return;
          }
          if (isArray2(node2)) {
            for (var i = 0; i < node2.length; i++) {
              var child = node2[i];
              if (isValidElement2(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement2(node2)) {
            if (node2._store) {
              node2._store.validated = true;
            }
          } else if (node2) {
            var iteratorFn = getIteratorFn(node2);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node2.entries) {
                var iterator = iteratorFn.call(node2);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement2(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type4 = element.type;
          if (type4 === null || type4 === void 0 || typeof type4 === "string") {
            return;
          }
          var propTypes2;
          if (typeof type4 === "function") {
            propTypes2 = type4.propTypes;
          } else if (typeof type4 === "object" && (type4.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type4.$$typeof === REACT_MEMO_TYPE)) {
            propTypes2 = type4.propTypes;
          } else {
            return;
          }
          if (propTypes2) {
            var name = getComponentNameFromType(type4);
            checkPropTypes(propTypes2, element.props, "prop", name, element);
          } else if (type4.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type4);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type4.getDefaultProps === "function" && !type4.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type4, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type4);
          if (!validType) {
            var info = "";
            if (type4 === void 0 || typeof type4 === "object" && type4 !== null && Object.keys(type4).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type4 === null) {
              typeString = "null";
            } else if (isArray2(type4)) {
              typeString = "array";
            } else if (type4 !== void 0 && type4.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type4.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type4;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type4, props, key, source, self2);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray2(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type4);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type4);
              }
            }
          }
          if (type4 === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type4, props, key) {
        {
          return jsxWithValidation(type4, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type4, props, key) {
        {
          return jsxWithValidation(type4, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t)
          return;
        f = false;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen);
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function _toPrimitive$2(input, hint) {
  if (_typeof$3(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$3(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey$2(arg) {
  var key = _toPrimitive$2(arg, "string");
  return _typeof$3(key) === "symbol" ? key : String(key);
}
function _defineProperty$4(obj, key, value2) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value2,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value2;
  }
  return obj;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf$2(subClass, superClass);
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized$1(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn$1(self2, call2) {
  if (call2 && (_typeof$3(call2) === "object" || typeof call2 === "function")) {
    return call2;
  } else if (call2 !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result);
  };
}
var classnames = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(module2) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames2() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames2.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
            classes.push(arg.toString());
            continue;
          }
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        }
      }
      return classes.join(" ");
    }
    if (module2.exports) {
      classNames2.default = classNames2;
      module2.exports = classNames2;
    } else {
      window.classNames = classNames2;
    }
  })();
})(classnames);
var classnamesExports = classnames.exports;
const classNames = /* @__PURE__ */ getDefaultExportFromCjs$1(classnamesExports);
var reactIs$1 = { exports: {} };
var reactIs_production_min$1 = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min$1;
function requireReactIs_production_min$1() {
  if (hasRequiredReactIs_production_min$1)
    return reactIs_production_min$1;
  hasRequiredReactIs_production_min$1 = 1;
  var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h2 = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
  u = Symbol.for("react.module.reference");
  function v(a) {
    if ("object" === typeof a && null !== a) {
      var r = a.$$typeof;
      switch (r) {
        case b:
          switch (a = a.type, a) {
            case d:
            case f:
            case e:
            case m:
            case n:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case h2:
                case l:
                case q:
                case p:
                case g:
                  return a;
                default:
                  return r;
              }
          }
        case c:
          return r;
      }
    }
  }
  reactIs_production_min$1.ContextConsumer = h2;
  reactIs_production_min$1.ContextProvider = g;
  reactIs_production_min$1.Element = b;
  reactIs_production_min$1.ForwardRef = l;
  reactIs_production_min$1.Fragment = d;
  reactIs_production_min$1.Lazy = q;
  reactIs_production_min$1.Memo = p;
  reactIs_production_min$1.Portal = c;
  reactIs_production_min$1.Profiler = f;
  reactIs_production_min$1.StrictMode = e;
  reactIs_production_min$1.Suspense = m;
  reactIs_production_min$1.SuspenseList = n;
  reactIs_production_min$1.isAsyncMode = function() {
    return false;
  };
  reactIs_production_min$1.isConcurrentMode = function() {
    return false;
  };
  reactIs_production_min$1.isContextConsumer = function(a) {
    return v(a) === h2;
  };
  reactIs_production_min$1.isContextProvider = function(a) {
    return v(a) === g;
  };
  reactIs_production_min$1.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === b;
  };
  reactIs_production_min$1.isForwardRef = function(a) {
    return v(a) === l;
  };
  reactIs_production_min$1.isFragment = function(a) {
    return v(a) === d;
  };
  reactIs_production_min$1.isLazy = function(a) {
    return v(a) === q;
  };
  reactIs_production_min$1.isMemo = function(a) {
    return v(a) === p;
  };
  reactIs_production_min$1.isPortal = function(a) {
    return v(a) === c;
  };
  reactIs_production_min$1.isProfiler = function(a) {
    return v(a) === f;
  };
  reactIs_production_min$1.isStrictMode = function(a) {
    return v(a) === e;
  };
  reactIs_production_min$1.isSuspense = function(a) {
    return v(a) === m;
  };
  reactIs_production_min$1.isSuspenseList = function(a) {
    return v(a) === n;
  };
  reactIs_production_min$1.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h2 || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? true : false;
  };
  reactIs_production_min$1.typeOf = v;
  return reactIs_production_min$1;
}
var reactIs_development$1 = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_development$1;
function requireReactIs_development$1() {
  if (hasRequiredReactIs_development$1)
    return reactIs_development$1;
  hasRequiredReactIs_development$1 = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type4) {
        if (typeof type4 === "string" || typeof type4 === "function") {
          return true;
        }
        if (type4 === REACT_FRAGMENT_TYPE || type4 === REACT_PROFILER_TYPE || enableDebugTracing || type4 === REACT_STRICT_MODE_TYPE || type4 === REACT_SUSPENSE_TYPE || type4 === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type4 === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type4 === "object" && type4 !== null) {
          if (type4.$$typeof === REACT_LAZY_TYPE || type4.$$typeof === REACT_MEMO_TYPE || type4.$$typeof === REACT_PROVIDER_TYPE || type4.$$typeof === REACT_CONTEXT_TYPE || type4.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type4.$$typeof === REACT_MODULE_REFERENCE || type4.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function typeOf(object4) {
        if (typeof object4 === "object" && object4 !== null) {
          var $$typeof = object4.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type4 = object4.type;
              switch (type4) {
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                  return type4;
                default:
                  var $$typeofType = type4 && type4.$$typeof;
                  switch ($$typeofType) {
                    case REACT_SERVER_CONTEXT_TYPE:
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element2 = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment2 = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal2 = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      var hasWarnedAboutDeprecatedIsConcurrentMode = false;
      function isAsyncMode(object4) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
          }
        }
        return false;
      }
      function isConcurrentMode(object4) {
        {
          if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
            hasWarnedAboutDeprecatedIsConcurrentMode = true;
            console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
          }
        }
        return false;
      }
      function isContextConsumer(object4) {
        return typeOf(object4) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object4) {
        return typeOf(object4) === REACT_PROVIDER_TYPE;
      }
      function isElement(object4) {
        return typeof object4 === "object" && object4 !== null && object4.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object4) {
        return typeOf(object4) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment2(object4) {
        return typeOf(object4) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object4) {
        return typeOf(object4) === REACT_LAZY_TYPE;
      }
      function isMemo(object4) {
        return typeOf(object4) === REACT_MEMO_TYPE;
      }
      function isPortal(object4) {
        return typeOf(object4) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object4) {
        return typeOf(object4) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object4) {
        return typeOf(object4) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object4) {
        return typeOf(object4) === REACT_SUSPENSE_TYPE;
      }
      function isSuspenseList(object4) {
        return typeOf(object4) === REACT_SUSPENSE_LIST_TYPE;
      }
      reactIs_development$1.ContextConsumer = ContextConsumer;
      reactIs_development$1.ContextProvider = ContextProvider;
      reactIs_development$1.Element = Element2;
      reactIs_development$1.ForwardRef = ForwardRef;
      reactIs_development$1.Fragment = Fragment2;
      reactIs_development$1.Lazy = Lazy;
      reactIs_development$1.Memo = Memo;
      reactIs_development$1.Portal = Portal2;
      reactIs_development$1.Profiler = Profiler;
      reactIs_development$1.StrictMode = StrictMode;
      reactIs_development$1.Suspense = Suspense;
      reactIs_development$1.SuspenseList = SuspenseList;
      reactIs_development$1.isAsyncMode = isAsyncMode;
      reactIs_development$1.isConcurrentMode = isConcurrentMode;
      reactIs_development$1.isContextConsumer = isContextConsumer;
      reactIs_development$1.isContextProvider = isContextProvider;
      reactIs_development$1.isElement = isElement;
      reactIs_development$1.isForwardRef = isForwardRef;
      reactIs_development$1.isFragment = isFragment2;
      reactIs_development$1.isLazy = isLazy;
      reactIs_development$1.isMemo = isMemo;
      reactIs_development$1.isPortal = isPortal;
      reactIs_development$1.isProfiler = isProfiler;
      reactIs_development$1.isStrictMode = isStrictMode;
      reactIs_development$1.isSuspense = isSuspense;
      reactIs_development$1.isSuspenseList = isSuspenseList;
      reactIs_development$1.isValidElementType = isValidElementType;
      reactIs_development$1.typeOf = typeOf;
    })();
  }
  return reactIs_development$1;
}
if (process.env.NODE_ENV === "production") {
  reactIs$1.exports = requireReactIs_production_min$1();
} else {
  reactIs$1.exports = requireReactIs_development$1();
}
var reactIsExports = reactIs$1.exports;
function toArray$1(children) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var ret = [];
  React__default.Children.forEach(children, function(child) {
    if ((child === void 0 || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray$1(child));
    } else if (reactIsExports.isFragment(child) && child.props) {
      ret = ret.concat(toArray$1(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}
var warned$1 = {};
var preWarningFns$1 = [];
var preMessage$1 = function preMessage(fn) {
  preWarningFns$1.push(fn);
};
function warning$6(valid, message) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    var finalMessage = preWarningFns$1.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "warning");
    }, message);
    if (finalMessage) {
      console.error("Warning: ".concat(finalMessage));
    }
  }
}
function note$1(valid, message) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    var finalMessage = preWarningFns$1.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "note");
    }, message);
    if (finalMessage) {
      console.warn("Note: ".concat(finalMessage));
    }
  }
}
function resetWarned$1() {
  warned$1 = {};
}
function call$1(method4, valid, message) {
  if (!valid && !warned$1[message]) {
    method4(false, message);
    warned$1[message] = true;
  }
}
function warningOnce$1(valid, message) {
  call$1(warning$6, valid, message);
}
function noteOnce$1(valid, message) {
  call$1(note$1, valid, message);
}
warningOnce$1.preMessage = preMessage$1;
warningOnce$1.resetWarned = resetWarned$1;
warningOnce$1.noteOnce = noteOnce$1;
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function useMemo(getValue2, condition, shouldUpdate) {
  var cacheRef = React.useRef({});
  if (!("value" in cacheRef.current) || shouldUpdate(cacheRef.current.condition, condition)) {
    cacheRef.current.value = getValue2();
    cacheRef.current.condition = condition;
  }
  return cacheRef.current.value;
}
function fillRef(ref2, node2) {
  if (typeof ref2 === "function") {
    ref2(node2);
  } else if (_typeof$3(ref2) === "object" && ref2 && "current" in ref2) {
    ref2.current = node2;
  }
}
function composeRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  var refList = refs.filter(function(ref2) {
    return ref2;
  });
  if (refList.length <= 1) {
    return refList[0];
  }
  return function(node2) {
    refs.forEach(function(ref2) {
      fillRef(ref2, node2);
    });
  };
}
function useComposeRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    refs[_key2] = arguments[_key2];
  }
  return useMemo(function() {
    return composeRef.apply(void 0, refs);
  }, refs, function(prev2, next2) {
    return prev2.length !== next2.length || prev2.every(function(ref2, i) {
      return ref2 !== next2[i];
    });
  });
}
function supportRef(nodeOrComponent) {
  var _type$prototype, _nodeOrComponent$prot;
  var type4 = reactIsExports.isMemo(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;
  if (typeof type4 === "function" && !((_type$prototype = type4.prototype) !== null && _type$prototype !== void 0 && _type$prototype.render)) {
    return false;
  }
  if (typeof nodeOrComponent === "function" && !((_nodeOrComponent$prot = nodeOrComponent.prototype) !== null && _nodeOrComponent$prot !== void 0 && _nodeOrComponent$prot.render)) {
    return false;
  }
  return true;
}
function isDOM(node2) {
  return node2 instanceof HTMLElement || node2 instanceof SVGElement;
}
function findDOMNode(node2) {
  if (isDOM(node2)) {
    return node2;
  }
  if (node2 instanceof React__default.Component) {
    return ReactDOM__default.findDOMNode(node2);
  }
  return null;
}
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value2) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value2;
        } else {
          this.__entries__.push([key, value2]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value2) {
  return parseFloat(value2) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position2) {
    var value2 = styles["border-" + position2 + "-width"];
    return size + toFloat(value2);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position2 = positions_1[_i];
    var value2 = styles["padding-" + position2];
    paddings[position2] = toFloat(value2);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this2 = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this2.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver = (
  /** @class */
  function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method4) {
  ResizeObserver.prototype[method4] = function() {
    var _a;
    return (_a = observers.get(this))[method4].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
}();
function omit$1(obj, fields) {
  var clone2 = _objectSpread2$3({}, obj);
  if (Array.isArray(fields)) {
    fields.forEach(function(key) {
      delete clone2[key];
    });
  }
  return clone2;
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$3(arr);
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$2();
}
function canUseDom$1() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function contains$1(root2, n) {
  if (!root2) {
    return false;
  }
  if (root2.contains) {
    return root2.contains(n);
  }
  var node2 = n;
  while (node2) {
    if (node2 === root2) {
      return true;
    }
    node2 = node2.parentNode;
  }
  return false;
}
var APPEND_ORDER$1 = "data-rc-order";
var APPEND_PRIORITY = "data-rc-priority";
var MARK_KEY$1 = "rc-util-key";
var containerCache$1 = /* @__PURE__ */ new Map();
function getMark$1() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
  if (mark) {
    return mark.startsWith("data-") ? mark : "data-".concat(mark);
  }
  return MARK_KEY$1;
}
function getContainer$1(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector("head");
  return head || document.body;
}
function getOrder$1(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles$1(container) {
  return Array.from((containerCache$1.get(container) || container).children).filter(function(node2) {
    return node2.tagName === "STYLE";
  });
}
function injectCSS$1(css2) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom$1()) {
    return null;
  }
  var csp = option.csp, prepend = option.prepend, _option$priority = option.priority, priority = _option$priority === void 0 ? 0 : _option$priority;
  var mergedOrder = getOrder$1(prepend);
  var isPrependQueue = mergedOrder === "prependQueue";
  var styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER$1, mergedOrder);
  if (isPrependQueue && priority) {
    styleNode.setAttribute(APPEND_PRIORITY, "".concat(priority));
  }
  if (csp !== null && csp !== void 0 && csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css2;
  var container = getContainer$1(option);
  var firstChild = container.firstChild;
  if (prepend) {
    if (isPrependQueue) {
      var existStyle = findStyles$1(container).filter(function(node2) {
        if (!["prepend", "prependQueue"].includes(node2.getAttribute(APPEND_ORDER$1))) {
          return false;
        }
        var nodePriority = Number(node2.getAttribute(APPEND_PRIORITY) || 0);
        return priority >= nodePriority;
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode$1(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var container = getContainer$1(option);
  return findStyles$1(container).find(function(node2) {
    return node2.getAttribute(getMark$1(option)) === key;
  });
}
function removeCSS(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var existNode = findExistNode$1(key, option);
  if (existNode) {
    var container = getContainer$1(option);
    container.removeChild(existNode);
  }
}
function syncRealContainer$1(container, option) {
  var cachedRealContainer = containerCache$1.get(container);
  if (!cachedRealContainer || !contains$1(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS$1("", option);
    var parentNode = placeholderStyle.parentNode;
    containerCache$1.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS$1(css2, key) {
  var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var container = getContainer$1(option);
  syncRealContainer$1(container, option);
  var existNode = findExistNode$1(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css2) {
      existNode.innerHTML = css2;
    }
    return existNode;
  }
  var newNode = injectCSS$1(css2, option);
  newNode.setAttribute(getMark$1(option), key);
  return newNode;
}
function murmur2(str) {
  var h2 = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h2 = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i) & 255;
      h2 = /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = /* Math.imul(h, m): */
  (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
function trim(value2) {
  return value2.trim();
}
function replace(value2, pattern4, replacement) {
  return value2.replace(pattern4, replacement);
}
function indexof(value2, search) {
  return value2.indexOf(search);
}
function charat(value2, index2) {
  return value2.charCodeAt(index2) | 0;
}
function substr(value2, begin, end) {
  return value2.slice(begin, end);
}
function strlen(value2) {
  return value2.length;
}
function sizeof(value2) {
  return value2.length;
}
function append(value2, array4) {
  return array4.push(value2), value2;
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value2, root2, parent, type4, props, children, length2, siblings) {
  return { value: value2, root: root2, parent, type: type4, props, children, line, column, length: length2, return: "", siblings };
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type4) {
  switch (type4) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value2) {
  return line = column = 1, length = strlen(characters = value2), position = 0, [];
}
function dealloc(value2) {
  return characters = "", value2;
}
function delimit(type4) {
  return trim(slice(position - 1, delimiter(type4 === 91 ? type4 + 2 : type4 === 40 ? type4 + 1 : type4)));
}
function whitespace$1(type4) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type4) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index2, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index2, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type4) {
  while (next())
    switch (character) {
      case type4:
        return position;
      case 34:
      case 39:
        if (type4 !== 34 && type4 !== 39)
          delimiter(character);
        break;
      case 40:
        if (type4 === 41)
          delimiter(type4);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type4, index2) {
  while (next())
    if (type4 + character === 47 + 10)
      break;
    else if (type4 + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index2, position - 1) + "*" + from(type4 === 47 ? type4 : next());
}
function identifier(index2) {
  while (!token(peek()))
    next();
  return slice(index2, position);
}
function compile(value2) {
  return dealloc(parse("", null, null, null, [""], value2 = alloc(value2), 0, [0], value2));
}
function parse(value2, root2, parent, rule, rules2, rulesets, pseudo, points, declarations) {
  var index2 = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type4 = "";
  var props = rules2;
  var children = rulesets;
  var reference = rule;
  var characters2 = type4;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace$1(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root2, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index2++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset2:
            if (ampersand == -1)
              characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root2, parent, index2, offset2, rules2, points, type4, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse(characters2, root2, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value2, reference, reference, rule && append(ruleset(value2, reference, reference, 0, 0, rules2, points, type4, rules2, props = [], length2, children), children), rules2, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index2 = offset2 = property = 0, variable = ampersand = 1, type4 = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index2++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type4 = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value2, root2, parent, index2, offset2, rules2, points, type4, props, children, length2, siblings) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules2 : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index2; ++i)
    for (var x = 0, y = substr(value2, post + 1, post = abs(j = points[i])), z = value2; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value2, root2, parent, offset2 === 0 ? RULESET : type4, props, children, length2, siblings);
}
function comment(value2, root2, parent, siblings) {
  return node(value2, root2, parent, COMMENT, from(char()), substr(value2, 2, -2), 0, siblings);
}
function declaration(value2, root2, parent, length2, siblings) {
  return node(value2, root2, parent, DECLARATION, substr(value2, 0, length2), substr(value2, length2 + 1, -1), length2, siblings);
}
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify$2(element, index2, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length)
        break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(",")))
        return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
var Entity = /* @__PURE__ */ function() {
  function Entity2() {
    _classCallCheck$1(this, Entity2);
    this.cache = /* @__PURE__ */ new Map();
  }
  _createClass$1(Entity2, [{
    key: "get",
    value: function get2(keys) {
      return this.cache.get(keys.join("%")) || null;
    }
  }, {
    key: "update",
    value: function update(keys, valueFn) {
      var path = keys.join("%");
      var prevValue = this.cache.get(path);
      var nextValue = valueFn(prevValue);
      if (nextValue === null) {
        this.cache.delete(path);
      } else {
        this.cache.set(path, nextValue);
      }
    }
  }]);
  return Entity2;
}();
var ATTR_TOKEN = "data-token-hash";
var ATTR_MARK = "data-css-hash";
var ATTR_DEV_CACHE_PATH = "data-dev-cache-path";
var CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
var CSS_IN_JS_INSTANCE_ID = Math.random().toString(12).slice(2);
function createCache() {
  if (typeof document !== "undefined") {
    var styles = document.body.querySelectorAll("style[".concat(ATTR_MARK, "]"));
    var firstChild = document.head.firstChild;
    Array.from(styles).forEach(function(style2) {
      style2[CSS_IN_JS_INSTANCE] = style2[CSS_IN_JS_INSTANCE] || CSS_IN_JS_INSTANCE_ID;
      document.head.insertBefore(style2, firstChild);
    });
    var styleHash = {};
    Array.from(document.querySelectorAll("style[".concat(ATTR_MARK, "]"))).forEach(function(style2) {
      var hash = style2.getAttribute(ATTR_MARK);
      if (styleHash[hash]) {
        if (style2[CSS_IN_JS_INSTANCE] === CSS_IN_JS_INSTANCE_ID) {
          var _style$parentNode;
          (_style$parentNode = style2.parentNode) === null || _style$parentNode === void 0 ? void 0 : _style$parentNode.removeChild(style2);
        }
      } else {
        styleHash[hash] = true;
      }
    });
  }
  return new Entity();
}
var StyleContext = /* @__PURE__ */ React.createContext({
  hashPriority: "low",
  cache: createCache(),
  defaultCache: true
});
const StyleContext$1 = StyleContext;
function useProdHMR() {
  return false;
}
var webpackHMR = false;
function useDevHMR() {
  return webpackHMR;
}
const useHMR = process.env.NODE_ENV === "production" ? useProdHMR : useDevHMR;
if (process.env.NODE_ENV !== "production" && typeof module !== "undefined" && module && module.hot) {
  var win = window;
  if (typeof win.webpackHotUpdate === "function") {
    var originWebpackHotUpdate = win.webpackHotUpdate;
    win.webpackHotUpdate = function() {
      webpackHMR = true;
      setTimeout(function() {
        webpackHMR = false;
      }, 0);
      return originWebpackHotUpdate.apply(void 0, arguments);
    };
  }
}
function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
  var _React$useContext = React.useContext(StyleContext$1), globalCache = _React$useContext.cache;
  var fullPath = [prefix].concat(_toConsumableArray$2(keyPath));
  var HMRUpdate = useHMR();
  React.useMemo(
    function() {
      globalCache.update(fullPath, function(prevCache) {
        var _ref = prevCache || [], _ref2 = _slicedToArray$3(_ref, 2), _ref2$ = _ref2[0], times = _ref2$ === void 0 ? 0 : _ref2$, cache = _ref2[1];
        var tmpCache = cache;
        if (process.env.NODE_ENV !== "production" && cache && HMRUpdate) {
          onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(tmpCache, HMRUpdate);
          tmpCache = null;
        }
        var mergedCache = tmpCache || cacheFn();
        return [times + 1, mergedCache];
      });
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [fullPath.join("_")]
  );
  React.useEffect(function() {
    return function() {
      globalCache.update(fullPath, function(prevCache) {
        var _ref3 = prevCache || [], _ref4 = _slicedToArray$3(_ref3, 2), _ref4$ = _ref4[0], times = _ref4$ === void 0 ? 0 : _ref4$, cache = _ref4[1];
        var nextCount = times - 1;
        if (nextCount === 0) {
          onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(cache, false);
          return null;
        }
        return [times - 1, cache];
      });
    };
  }, fullPath);
  return globalCache.get(fullPath)[1];
}
function flattenToken(token2) {
  var str = "";
  Object.keys(token2).forEach(function(key) {
    var value2 = token2[key];
    str += key;
    if (value2 && _typeof$3(value2) === "object") {
      str += flattenToken(value2);
    } else {
      str += value2;
    }
  });
  return str;
}
function token2key(token2, slat) {
  return murmur2("".concat(slat, "_").concat(flattenToken(token2)));
}
function warning$5(message, path) {
  warningOnce$1(false, "[Ant Design CSS-in-JS] ".concat(path ? "Error in '".concat(path, "': ") : "").concat(message));
}
var styleValidate = function styleValidate2(key, value2) {
  var info = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var path = info.path, hashId = info.hashId;
  switch (key) {
    case "content":
      var contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      var contentValues = ["normal", "none", "initial", "inherit", "unset"];
      if (typeof value2 !== "string" || contentValues.indexOf(value2) === -1 && !contentValuePattern.test(value2) && (value2.charAt(0) !== value2.charAt(value2.length - 1) || value2.charAt(0) !== '"' && value2.charAt(0) !== "'")) {
        warning$5("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(value2, "\"'`"), path);
      }
      return;
    case "marginLeft":
    case "marginRight":
    case "paddingLeft":
    case "paddingRight":
    case "left":
    case "right":
    case "borderLeft":
    case "borderLeftWidth":
    case "borderLeftStyle":
    case "borderLeftColor":
    case "borderRight":
    case "borderRightWidth":
    case "borderRightStyle":
    case "borderRightColor":
    case "borderTopLeftRadius":
    case "borderTopRightRadius":
    case "borderBottomLeftRadius":
    case "borderBottomRightRadius":
      warning$5("You seem to be using non-logical property '".concat(key, "' which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties."), path);
      return;
    case "margin":
    case "padding":
    case "borderWidth":
    case "borderStyle":
      if (typeof value2 === "string") {
        var valueArr = value2.split(" ").map(function(item) {
          return item.trim();
        });
        if (valueArr.length === 4 && valueArr[1] !== valueArr[3]) {
          warning$5("You seem to be using '".concat(key, "' property with different left ").concat(key, " and right ").concat(key, ", which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties."), path);
        }
      }
      return;
    case "clear":
    case "textAlign":
      if (value2 === "left" || value2 === "right") {
        warning$5("You seem to be using non-logical value '".concat(value2, "' of ").concat(key, ", which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties."), path);
      }
      return;
    case "borderRadius":
      if (typeof value2 === "string") {
        var radiusGroups = value2.split("/").map(function(item) {
          return item.trim();
        });
        var invalid = radiusGroups.reduce(function(result, group) {
          if (result) {
            return result;
          }
          var radiusArr = group.split(" ").map(function(item) {
            return item.trim();
          });
          if (radiusArr.length >= 2 && radiusArr[0] !== radiusArr[1]) {
            return true;
          }
          if (radiusArr.length === 3 && radiusArr[1] !== radiusArr[2]) {
            return true;
          }
          if (radiusArr.length === 4 && radiusArr[2] !== radiusArr[3]) {
            return true;
          }
          return result;
        }, false);
        if (invalid) {
          warning$5("You seem to be using non-logical value '".concat(value2, "' of ").concat(key, ", which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties."), path);
        }
      }
      return;
    case "animation":
      if (hashId && value2 !== "none") {
        warning$5("You seem to be using hashed animation '".concat(value2, "', in which case 'animationName' with Keyframe as value is recommended."), path);
      }
    default:
      return;
  }
};
var layerKey = "layer-".concat(Date.now(), "-").concat(Math.random()).replace(/\./g, "");
var layerWidth = "903px";
function supportSelector(styleStr, handleElement) {
  if (canUseDom$1()) {
    var _ele$parentNode;
    updateCSS$1(styleStr, layerKey);
    var ele = document.createElement("div");
    ele.style.position = "fixed";
    ele.style.left = "0";
    ele.style.top = "0";
    handleElement === null || handleElement === void 0 ? void 0 : handleElement(ele);
    document.body.appendChild(ele);
    if (process.env.NODE_ENV !== "production") {
      ele.innerHTML = "Test";
      ele.style.zIndex = "9999999";
    }
    var support = getComputedStyle(ele).width === layerWidth;
    (_ele$parentNode = ele.parentNode) === null || _ele$parentNode === void 0 ? void 0 : _ele$parentNode.removeChild(ele);
    removeCSS(layerKey);
    return support;
  }
  return false;
}
var canLayer = void 0;
function supportLayer() {
  if (canLayer === void 0) {
    canLayer = supportSelector("@layer ".concat(layerKey, " { .").concat(layerKey, " { width: ").concat(layerWidth, "!important; } }"), function(ele) {
      ele.className = layerKey;
    });
  }
  return canLayer;
}
var isClientSide = canUseDom$1();
var SKIP_CHECK = "_skip_check_";
function normalizeStyle(styleStr) {
  var serialized = serialize(compile(styleStr), stringify$2);
  return serialized.replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value2) {
  return _typeof$3(value2) === "object" && value2 && SKIP_CHECK in value2;
}
var animationStatistics = {};
function injectSelectorHash(key, hashId, hashPriority) {
  if (!hashId) {
    return key;
  }
  var hashClassName = ".".concat(hashId);
  var hashSelector = hashPriority === "low" ? ":where(".concat(hashClassName, ")") : hashClassName;
  var keys = key.split(",").map(function(k) {
    var _firstPath$match;
    var fullPath = k.trim().split(/\s+/);
    var firstPath = fullPath[0] || "";
    var htmlElement = ((_firstPath$match = firstPath.match(/^\w+/)) === null || _firstPath$match === void 0 ? void 0 : _firstPath$match[0]) || "";
    firstPath = "".concat(htmlElement).concat(hashSelector).concat(firstPath.slice(htmlElement.length));
    return [firstPath].concat(_toConsumableArray$2(fullPath.slice(1))).join(" ");
  });
  return keys.join(",");
}
var parseStyle = function parseStyle2(interpolation) {
  var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: true
  }, root2 = _ref.root, injectHash = _ref.injectHash;
  var hashId = config.hashId, layer = config.layer, path = config.path, hashPriority = config.hashPriority;
  var styleStr = "";
  function parseKeyframes(keyframes) {
    if (animationStatistics[keyframes.getName(hashId)]) {
      return "";
    }
    animationStatistics[keyframes.getName(hashId)] = true;
    return "@keyframes ".concat(keyframes.getName(hashId)).concat(parseStyle2(keyframes.style, config, {
      root: false
    }));
  }
  function flattenList(list) {
    var fullList = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    list.forEach(function(item) {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item);
      }
    });
    return fullList;
  }
  var flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
  flattenStyleList.forEach(function(originStyle) {
    var style2 = typeof originStyle === "string" && !root2 ? {} : originStyle;
    if (typeof style2 === "string") {
      styleStr += "".concat(style2, "\n");
    } else if (style2._keyframe) {
      styleStr += parseKeyframes(style2);
    } else {
      Object.keys(style2).forEach(function(key) {
        var value2 = style2[key];
        if (_typeof$3(value2) === "object" && value2 && (key !== "animationName" || !value2._keyframe) && !isCompoundCSSProperty(value2)) {
          var subInjectHash = false;
          var mergedKey = key.trim();
          var nextRoot = false;
          if ((root2 || injectHash) && hashId) {
            if (mergedKey.startsWith("@")) {
              subInjectHash = true;
            } else {
              mergedKey = injectSelectorHash(key, hashId, hashPriority);
            }
          } else if (root2 && !hashId && (mergedKey === "&" || mergedKey === "")) {
            mergedKey = "";
            nextRoot = true;
          }
          styleStr += "".concat(mergedKey).concat(parseStyle2(value2, _objectSpread2$3(_objectSpread2$3({}, config), {}, {
            path: "".concat(path, " -> ").concat(mergedKey)
          }), {
            root: nextRoot,
            injectHash: subInjectHash
          }));
        } else {
          var _value$value;
          var actualValue = (_value$value = value2 === null || value2 === void 0 ? void 0 : value2.value) !== null && _value$value !== void 0 ? _value$value : value2;
          if (process.env.NODE_ENV !== "production" && (_typeof$3(value2) !== "object" || !(value2 === null || value2 === void 0 ? void 0 : value2[SKIP_CHECK]))) {
            styleValidate(key, actualValue, {
              path,
              hashId
            });
          }
          var styleName = key.replace(/[A-Z]/g, function(match2) {
            return "-".concat(match2.toLowerCase());
          });
          var formatValue = actualValue;
          if (!unitlessKeys[key] && typeof formatValue === "number" && formatValue !== 0) {
            formatValue = "".concat(formatValue, "px");
          }
          if (key === "animationName" && (value2 === null || value2 === void 0 ? void 0 : value2._keyframe)) {
            styleStr += parseKeyframes(value2);
            formatValue = value2.getName(hashId);
          }
          styleStr += "".concat(styleName, ":").concat(formatValue, ";");
        }
      });
    }
  });
  if (!root2) {
    styleStr = "{".concat(styleStr, "}");
  } else if (layer && supportLayer()) {
    var layerCells = layer.split(",");
    var layerName = layerCells[layerCells.length - 1].trim();
    styleStr = "@layer ".concat(layerName, " {").concat(styleStr, "}");
    if (layerCells.length > 1) {
      styleStr = "@layer ".concat(layer, "{%%%:%}").concat(styleStr);
    }
  }
  return styleStr;
};
function uniqueHash(path, styleStr) {
  return murmur2("".concat(path.join("%")).concat(styleStr));
}
function Empty() {
  return null;
}
function useStyleRegister(info, styleFn) {
  var token2 = info.token, path = info.path, hashId = info.hashId, layer = info.layer;
  var _React$useContext = React.useContext(StyleContext$1), autoClear = _React$useContext.autoClear, mock = _React$useContext.mock, defaultCache = _React$useContext.defaultCache, hashPriority = _React$useContext.hashPriority;
  var tokenKey = token2._tokenKey;
  var fullPath = [tokenKey].concat(_toConsumableArray$2(path));
  var isMergedClientSide = isClientSide;
  if (process.env.NODE_ENV !== "production" && mock !== void 0) {
    isMergedClientSide = mock === "client";
  }
  var _useGlobalCache = useClientCache(
    "style",
    fullPath,
    // Create cache if needed
    function() {
      var styleObj = styleFn();
      var styleStr = normalizeStyle(parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer,
        path: path.join("-")
      }));
      var styleId = uniqueHash(fullPath, styleStr);
      animationStatistics = {};
      if (isMergedClientSide) {
        var style2 = updateCSS$1(styleStr, styleId, {
          mark: ATTR_MARK,
          prepend: "queue"
        });
        style2[CSS_IN_JS_INSTANCE] = CSS_IN_JS_INSTANCE_ID;
        style2.setAttribute(ATTR_TOKEN, tokenKey);
        if (process.env.NODE_ENV !== "production") {
          style2.setAttribute(ATTR_DEV_CACHE_PATH, fullPath.join("|"));
        }
      }
      return [styleStr, tokenKey, styleId];
    },
    // Remove cache if no need
    function(_ref2, fromHMR) {
      var _ref3 = _slicedToArray$3(_ref2, 3), styleId = _ref3[2];
      if ((fromHMR || autoClear) && isClientSide) {
        removeCSS(styleId, {
          mark: ATTR_MARK
        });
      }
    }
  ), _useGlobalCache2 = _slicedToArray$3(_useGlobalCache, 3), cachedStyleStr = _useGlobalCache2[0], cachedTokenKey = _useGlobalCache2[1], cachedStyleId = _useGlobalCache2[2];
  return function(node2) {
    var styleNode;
    if (isMergedClientSide || !defaultCache) {
      styleNode = /* @__PURE__ */ React.createElement(Empty, null);
    } else {
      var _objectSpread22;
      styleNode = /* @__PURE__ */ React.createElement("style", _objectSpread2$3(_objectSpread2$3({}, (_objectSpread22 = {}, _defineProperty$4(_objectSpread22, ATTR_TOKEN, cachedTokenKey), _defineProperty$4(_objectSpread22, ATTR_MARK, cachedStyleId), _objectSpread22)), {}, {
        dangerouslySetInnerHTML: {
          __html: cachedStyleStr
        }
      }));
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, styleNode, node2);
  };
}
var EMPTY_OVERRIDE = {};
var hashPrefix = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css";
var tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
function removeStyleTags(key) {
  if (typeof document !== "undefined") {
    var styles = document.querySelectorAll("style[".concat(ATTR_TOKEN, '="').concat(key, '"]'));
    styles.forEach(function(style2) {
      if (style2[CSS_IN_JS_INSTANCE] === CSS_IN_JS_INSTANCE_ID) {
        var _style$parentNode;
        (_style$parentNode = style2.parentNode) === null || _style$parentNode === void 0 ? void 0 : _style$parentNode.removeChild(style2);
      }
    });
  }
}
function cleanTokenStyle(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
  var tokenKeyList = Array.from(tokenKeys.keys());
  var cleanableKeyList = tokenKeyList.filter(function(key) {
    var count = tokenKeys.get(key) || 0;
    return count <= 0;
  });
  if (cleanableKeyList.length < tokenKeyList.length) {
    cleanableKeyList.forEach(function(key) {
      removeStyleTags(key);
      tokenKeys.delete(key);
    });
  }
}
function useCacheToken(theme, tokens) {
  var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var _option$salt = option.salt, salt = _option$salt === void 0 ? "" : _option$salt, _option$override = option.override, override = _option$override === void 0 ? EMPTY_OVERRIDE : _option$override, formatToken2 = option.formatToken;
  var mergedToken = React.useMemo(function() {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray$2(tokens)));
  }, [tokens]);
  var tokenStr = React.useMemo(function() {
    return flattenToken(mergedToken);
  }, [mergedToken]);
  var overrideTokenStr = React.useMemo(function() {
    return flattenToken(override);
  }, [override]);
  var cachedToken = useClientCache("token", [salt, theme.id, tokenStr, overrideTokenStr], function() {
    var derivativeToken = theme.getDerivativeToken(mergedToken);
    var mergedDerivativeToken = _objectSpread2$3(_objectSpread2$3({}, derivativeToken), override);
    if (formatToken2) {
      mergedDerivativeToken = formatToken2(mergedDerivativeToken);
    }
    var tokenKey = token2key(mergedDerivativeToken, salt);
    mergedDerivativeToken._tokenKey = tokenKey;
    recordCleanToken(tokenKey);
    var hashId = "".concat(hashPrefix, "-").concat(murmur2(tokenKey));
    mergedDerivativeToken._hashId = hashId;
    return [mergedDerivativeToken, hashId];
  }, function(cache) {
    cleanTokenStyle(cache[0]._tokenKey);
  });
  return cachedToken;
}
var Keyframe = /* @__PURE__ */ function() {
  function Keyframe2(name, style2) {
    _classCallCheck$1(this, Keyframe2);
    this.name = void 0;
    this.style = void 0;
    this._keyframe = true;
    this.name = name;
    this.style = style2;
  }
  _createClass$1(Keyframe2, [{
    key: "getName",
    value: function getName() {
      var hashId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return hashId ? "".concat(hashId, "-").concat(this.name) : this.name;
    }
  }]);
  return Keyframe2;
}();
function sameDerivativeOption(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (var i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
var ThemeCache = /* @__PURE__ */ function() {
  function ThemeCache2() {
    _classCallCheck$1(this, ThemeCache2);
    this.cache = void 0;
    this.keys = void 0;
    this.cacheCallTimes = void 0;
    this.cache = /* @__PURE__ */ new Map();
    this.keys = [];
    this.cacheCallTimes = 0;
  }
  _createClass$1(ThemeCache2, [{
    key: "size",
    value: function size() {
      return this.keys.length;
    }
  }, {
    key: "internalGet",
    value: function internalGet(derivativeOption) {
      var _cache2, _cache3;
      var updateCallTimes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var cache = {
        map: this.cache
      };
      derivativeOption.forEach(function(derivative2) {
        if (!cache) {
          cache = void 0;
        } else {
          var _cache, _cache$map;
          cache = (_cache = cache) === null || _cache === void 0 ? void 0 : (_cache$map = _cache.map) === null || _cache$map === void 0 ? void 0 : _cache$map.get(derivative2);
        }
      });
      if (((_cache2 = cache) === null || _cache2 === void 0 ? void 0 : _cache2.value) && updateCallTimes) {
        cache.value[1] = this.cacheCallTimes++;
      }
      return (_cache3 = cache) === null || _cache3 === void 0 ? void 0 : _cache3.value;
    }
  }, {
    key: "get",
    value: function get2(derivativeOption) {
      var _this$internalGet;
      return (_this$internalGet = this.internalGet(derivativeOption, true)) === null || _this$internalGet === void 0 ? void 0 : _this$internalGet[0];
    }
  }, {
    key: "has",
    value: function has2(derivativeOption) {
      return !!this.internalGet(derivativeOption);
    }
  }, {
    key: "set",
    value: function set2(derivativeOption, value2) {
      var _this2 = this;
      if (!this.has(derivativeOption)) {
        if (this.size() + 1 > ThemeCache2.MAX_CACHE_SIZE + ThemeCache2.MAX_CACHE_OFFSET) {
          var _this$keys$reduce = this.keys.reduce(function(result, key) {
            var _result = _slicedToArray$3(result, 2), callTimes = _result[1];
            if (_this2.internalGet(key)[1] < callTimes) {
              return [key, _this2.internalGet(key)[1]];
            }
            return result;
          }, [this.keys[0], this.cacheCallTimes]), _this$keys$reduce2 = _slicedToArray$3(_this$keys$reduce, 1), targetKey = _this$keys$reduce2[0];
          this.delete(targetKey);
        }
        this.keys.push(derivativeOption);
      }
      var cache = this.cache;
      derivativeOption.forEach(function(derivative2, index2) {
        if (index2 === derivativeOption.length - 1) {
          cache.set(derivative2, {
            value: [value2, _this2.cacheCallTimes++]
          });
        } else {
          var cacheValue = cache.get(derivative2);
          if (!cacheValue) {
            cache.set(derivative2, {
              map: /* @__PURE__ */ new Map()
            });
          } else if (!cacheValue.map) {
            cacheValue.map = /* @__PURE__ */ new Map();
          }
          cache = cache.get(derivative2).map;
        }
      });
    }
  }, {
    key: "deleteByPath",
    value: function deleteByPath(currentCache, derivatives) {
      var cache = currentCache.get(derivatives[0]);
      if (derivatives.length === 1) {
        var _cache$value;
        if (!cache.map) {
          currentCache.delete(derivatives[0]);
        } else {
          currentCache.set(derivatives[0], {
            map: cache.map
          });
        }
        return (_cache$value = cache.value) === null || _cache$value === void 0 ? void 0 : _cache$value[0];
      }
      var result = this.deleteByPath(cache.map, derivatives.slice(1));
      if ((!cache.map || cache.map.size === 0) && !cache.value) {
        currentCache.delete(derivatives[0]);
      }
      return result;
    }
  }, {
    key: "delete",
    value: function _delete(derivativeOption) {
      if (this.has(derivativeOption)) {
        this.keys = this.keys.filter(function(item) {
          return !sameDerivativeOption(item, derivativeOption);
        });
        return this.deleteByPath(this.cache, derivativeOption);
      }
      return void 0;
    }
  }]);
  return ThemeCache2;
}();
ThemeCache.MAX_CACHE_SIZE = 20;
ThemeCache.MAX_CACHE_OFFSET = 5;
var uuid$1 = 0;
var Theme = /* @__PURE__ */ function() {
  function Theme2(derivatives) {
    _classCallCheck$1(this, Theme2);
    this.derivatives = void 0;
    this.id = void 0;
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid$1;
    if (derivatives.length === 0) {
      warning$6(derivatives.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function.");
    }
    uuid$1 += 1;
  }
  _createClass$1(Theme2, [{
    key: "getDerivativeToken",
    value: function getDerivativeToken(token2) {
      return this.derivatives.reduce(function(result, derivative2) {
        return derivative2(token2, result);
      }, void 0);
    }
  }]);
  return Theme2;
}();
var cacheThemes = new ThemeCache();
function createTheme(derivatives) {
  var derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }
  return cacheThemes.get(derivativeArr);
}
var IconContext = /* @__PURE__ */ createContext({});
const Context$2 = IconContext;
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
var HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";
var warningFunc = function warningFunc2() {
  warningOnce$1(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
};
var Context$1 = /* @__PURE__ */ React.createContext({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  getFieldError: warningFunc,
  getFieldWarning: warningFunc,
  getFieldsError: warningFunc,
  isFieldsTouched: warningFunc,
  isFieldTouched: warningFunc,
  isFieldValidating: warningFunc,
  isFieldsValidating: warningFunc,
  resetFields: warningFunc,
  setFields: warningFunc,
  setFieldValue: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  submit: warningFunc,
  getInternalHooks: function getInternalHooks() {
    warningFunc();
    return {
      dispatch: warningFunc,
      initEntityValue: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      destroyForm: warningFunc,
      setCallbacks: warningFunc,
      registerWatch: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc,
      setPreserve: warningFunc,
      getInitialValue: warningFunc
    };
  }
});
function toArray(value2) {
  if (value2 === void 0 || value2 === null) {
    return [];
  }
  return Array.isArray(value2) ? value2 : [value2];
}
function _regeneratorRuntime$1() {
  _regeneratorRuntime$1 = function _regeneratorRuntime2() {
    return e;
  };
  var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t2, e2, r2) {
    t2[e2] = r2.value;
  }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
  function define(t2, e2, r2) {
    return Object.defineProperty(t2, e2, {
      value: r2,
      enumerable: true,
      configurable: true,
      writable: true
    }), t2[e2];
  }
  try {
    define({}, "");
  } catch (t2) {
    define = function define2(t3, e2, r2) {
      return t3[e2] = r2;
    };
  }
  function wrap(t2, e2, r2, n2) {
    var i2 = e2 && e2.prototype instanceof Generator ? e2 : Generator, a2 = Object.create(i2.prototype), c2 = new Context2(n2 || []);
    return o(a2, "_invoke", {
      value: makeInvokeMethod(t2, r2, c2)
    }), a2;
  }
  function tryCatch(t2, e2, r2) {
    try {
      return {
        type: "normal",
        arg: t2.call(e2, r2)
      };
    } catch (t3) {
      return {
        type: "throw",
        arg: t3
      };
    }
  }
  e.wrap = wrap;
  var h2 = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf, v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t2) {
    ["next", "throw", "return"].forEach(function(e2) {
      define(t2, e2, function(t3) {
        return this._invoke(e2, t3);
      });
    });
  }
  function AsyncIterator(t2, e2) {
    function invoke(r3, o2, i2, a2) {
      var c2 = tryCatch(t2[r3], t2, o2);
      if ("throw" !== c2.type) {
        var u2 = c2.arg, h3 = u2.value;
        return h3 && "object" == _typeof$3(h3) && n.call(h3, "__await") ? e2.resolve(h3.__await).then(function(t3) {
          invoke("next", t3, i2, a2);
        }, function(t3) {
          invoke("throw", t3, i2, a2);
        }) : e2.resolve(h3).then(function(t3) {
          u2.value = t3, i2(u2);
        }, function(t3) {
          return invoke("throw", t3, i2, a2);
        });
      }
      a2(c2.arg);
    }
    var r2;
    o(this, "_invoke", {
      value: function value2(t3, n2) {
        function callInvokeWithMethodAndArg() {
          return new e2(function(e3, r3) {
            invoke(t3, n2, e3, r3);
          });
        }
        return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e2, r2, n2) {
    var o2 = h2;
    return function(i2, a2) {
      if (o2 === f)
        throw new Error("Generator is already running");
      if (o2 === s) {
        if ("throw" === i2)
          throw a2;
        return {
          value: t,
          done: true
        };
      }
      for (n2.method = i2, n2.arg = a2; ; ) {
        var c2 = n2.delegate;
        if (c2) {
          var u2 = maybeInvokeDelegate(c2, n2);
          if (u2) {
            if (u2 === y)
              continue;
            return u2;
          }
        }
        if ("next" === n2.method)
          n2.sent = n2._sent = n2.arg;
        else if ("throw" === n2.method) {
          if (o2 === h2)
            throw o2 = s, n2.arg;
          n2.dispatchException(n2.arg);
        } else
          "return" === n2.method && n2.abrupt("return", n2.arg);
        o2 = f;
        var p2 = tryCatch(e2, r2, n2);
        if ("normal" === p2.type) {
          if (o2 = n2.done ? s : l, p2.arg === y)
            continue;
          return {
            value: p2.arg,
            done: n2.done
          };
        }
        "throw" === p2.type && (o2 = s, n2.method = "throw", n2.arg = p2.arg);
      }
    };
  }
  function maybeInvokeDelegate(e2, r2) {
    var n2 = r2.method, o2 = e2.iterator[n2];
    if (o2 === t)
      return r2.delegate = null, "throw" === n2 && e2.iterator["return"] && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e2, r2), "throw" === r2.method) || "return" !== n2 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n2 + "' method")), y;
    var i2 = tryCatch(o2, e2.iterator, r2.arg);
    if ("throw" === i2.type)
      return r2.method = "throw", r2.arg = i2.arg, r2.delegate = null, y;
    var a2 = i2.arg;
    return a2 ? a2.done ? (r2[e2.resultName] = a2.value, r2.next = e2.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
  }
  function pushTryEntry(t2) {
    var e2 = {
      tryLoc: t2[0]
    };
    1 in t2 && (e2.catchLoc = t2[1]), 2 in t2 && (e2.finallyLoc = t2[2], e2.afterLoc = t2[3]), this.tryEntries.push(e2);
  }
  function resetTryEntry(t2) {
    var e2 = t2.completion || {};
    e2.type = "normal", delete e2.arg, t2.completion = e2;
  }
  function Context2(t2) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t2.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e2) {
    if (e2 || "" === e2) {
      var r2 = e2[a];
      if (r2)
        return r2.call(e2);
      if ("function" == typeof e2.next)
        return e2;
      if (!isNaN(e2.length)) {
        var o2 = -1, i2 = function next2() {
          for (; ++o2 < e2.length; )
            if (n.call(e2, o2))
              return next2.value = e2[o2], next2.done = false, next2;
          return next2.value = t, next2.done = true, next2;
        };
        return i2.next = i2;
      }
    }
    throw new TypeError(_typeof$3(e2) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t2) {
    var e2 = "function" == typeof t2 && t2.constructor;
    return !!e2 && (e2 === GeneratorFunction || "GeneratorFunction" === (e2.displayName || e2.name));
  }, e.mark = function(t2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
  }, e.awrap = function(t2) {
    return {
      __await: t2
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function(t2, r2, n2, o2, i2) {
    void 0 === i2 && (i2 = Promise);
    var a2 = new AsyncIterator(wrap(t2, r2, n2, o2), i2);
    return e.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
      return t3.done ? t3.value : a2.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
    return this;
  }), define(g, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(t2) {
    var e2 = Object(t2), r2 = [];
    for (var n2 in e2)
      r2.push(n2);
    return r2.reverse(), function next2() {
      for (; r2.length; ) {
        var t3 = r2.pop();
        if (t3 in e2)
          return next2.value = t3, next2.done = false, next2;
      }
      return next2.done = true, next2;
    };
  }, e.values = values, Context2.prototype = {
    constructor: Context2,
    reset: function reset(e2) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e2)
        for (var r2 in this)
          "t" === r2.charAt(0) && n.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
    },
    stop: function stop() {
      this.done = true;
      var t2 = this.tryEntries[0].completion;
      if ("throw" === t2.type)
        throw t2.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e2) {
      if (this.done)
        throw e2;
      var r2 = this;
      function handle(n2, o3) {
        return a2.type = "throw", a2.arg = e2, r2.next = n2, o3 && (r2.method = "next", r2.arg = t), !!o3;
      }
      for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
        var i2 = this.tryEntries[o2], a2 = i2.completion;
        if ("root" === i2.tryLoc)
          return handle("end");
        if (i2.tryLoc <= this.prev) {
          var c2 = n.call(i2, "catchLoc"), u2 = n.call(i2, "finallyLoc");
          if (c2 && u2) {
            if (this.prev < i2.catchLoc)
              return handle(i2.catchLoc, true);
            if (this.prev < i2.finallyLoc)
              return handle(i2.finallyLoc);
          } else if (c2) {
            if (this.prev < i2.catchLoc)
              return handle(i2.catchLoc, true);
          } else {
            if (!u2)
              throw new Error("try statement without catch or finally");
            if (this.prev < i2.finallyLoc)
              return handle(i2.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t2, e2) {
      for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
        var o2 = this.tryEntries[r2];
        if (o2.tryLoc <= this.prev && n.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
          var i2 = o2;
          break;
        }
      }
      i2 && ("break" === t2 || "continue" === t2) && i2.tryLoc <= e2 && e2 <= i2.finallyLoc && (i2 = null);
      var a2 = i2 ? i2.completion : {};
      return a2.type = t2, a2.arg = e2, i2 ? (this.method = "next", this.next = i2.finallyLoc, y) : this.complete(a2);
    },
    complete: function complete(t2, e2) {
      if ("throw" === t2.type)
        throw t2.arg;
      return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e2 && (this.next = e2), y;
    },
    finish: function finish(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.finallyLoc === t2)
          return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
      }
    },
    "catch": function _catch(t2) {
      for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
        var r2 = this.tryEntries[e2];
        if (r2.tryLoc === t2) {
          var n2 = r2.completion;
          if ("throw" === n2.type) {
            var o2 = n2.arg;
            resetTryEntry(r2);
          }
          return o2;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e2, r2, n2) {
      return this.delegate = {
        iterator: values(e2),
        resultName: r2,
        nextLoc: n2
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value2 = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value2);
  } else {
    Promise.resolve(value2).then(_next, _throw);
  }
}
function _asyncToGenerator$1(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value2) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value2);
      }
      function _throw(err) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf$1(subClass, superClass);
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf$1(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf$1(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf$1(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning$4 = function warning() {
};
if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production" && typeof window !== "undefined" && typeof document !== "undefined") {
  warning$4 = function warning3(type4, errors) {
    if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
      if (errors.every(function(e) {
        return typeof e === "string";
      })) {
        console.warn(type4, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i = 0;
  var len = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x) {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value2, type4) {
  if (value2 === void 0 || value2 === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value2) && !value2.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value2 === "string" && !value2) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index2 = 0;
  var arrLength = arr.length;
  function next2(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index2;
    index2 = index2 + 1;
    if (original < arrLength) {
      func(arr[original], next2);
    } else {
      callback([]);
    }
  }
  next2([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this2;
    _this2 = _Error.call(this, "Async Validation Error") || this;
    _this2.errors = errors;
    _this2.fields = fields;
    return _this2;
  }
  return AsyncValidationError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next2 = function next3(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next2);
    });
    _pending["catch"](function(e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next2 = function next3(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(function(key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next2);
      } else {
        asyncParallelArray(arr, func, next2);
      }
    });
  });
  pending["catch"](function(e) {
    return e;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue$3(value2, path) {
  var v = value2;
  for (var i = 0; i < path.length; i++) {
    if (v == void 0) {
      return v;
    }
    v = v[path[i]];
  }
  return v;
}
function complementError(rule, source) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue$3(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value2 = source[s];
        if (typeof value2 === "object" && typeof target[s] === "object") {
          target[s] = _extends$1({}, target[s], value2);
        } else {
          target[s] = value2;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value2, source, errors, options, type4) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value2, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value2, source, errors, options) {
  if (/^\s+$/.test(value2) || value2 === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var urlReg;
var getUrlRegex = function() {
  if (urlReg) {
    return urlReg;
  }
  var word = "[a-fA-F\\d:]";
  var b = function b2(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
  };
  var v42 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
  var v6seg = "[a-fA-F\\d]{1,4}";
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v42 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v42 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v42 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v42 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v42 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v42 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v42 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
  var v46Exact = new RegExp("(?:^" + v42 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v42 + "$");
  var v6exact = new RegExp("^" + v6 + "$");
  var ip = function ip2(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v42 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
  };
  ip.v4 = function(options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v42 + b(options), "g");
  };
  ip.v6 = function(options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
  };
  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = "(?:\\S+(?::\\S*)?@)?";
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = "(?::\\d{2,5})?";
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", "i");
  return urlReg;
};
var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value2) {
    return types.number(value2) && parseInt(value2, 10) === value2;
  },
  "float": function float(value2) {
    return types.number(value2) && !types.integer(value2);
  },
  array: function array(value2) {
    return Array.isArray(value2);
  },
  regexp: function regexp(value2) {
    if (value2 instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value2);
    } catch (e) {
      return false;
    }
  },
  date: function date(value2) {
    return typeof value2.getTime === "function" && typeof value2.getMonth === "function" && typeof value2.getYear === "function" && !isNaN(value2.getTime());
  },
  number: function number(value2) {
    if (isNaN(value2)) {
      return false;
    }
    return typeof value2 === "number";
  },
  object: function object(value2) {
    return typeof value2 === "object" && !types.array(value2);
  },
  method: function method(value2) {
    return typeof value2 === "function";
  },
  email: function email(value2) {
    return typeof value2 === "string" && value2.length <= 320 && !!value2.match(pattern$2.email);
  },
  url: function url(value2) {
    return typeof value2 === "string" && value2.length <= 2048 && !!value2.match(getUrlRegex());
  },
  hex: function hex(value2) {
    return typeof value2 === "string" && !!value2.match(pattern$2.hex);
  }
};
var type$1 = function type(rule, value2, source, errors, options) {
  if (rule.required && value2 === void 0) {
    required$1(rule, value2, source, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value2)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value2 !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value2, source, errors, options) {
  var len = typeof rule.len === "number";
  var min = typeof rule.min === "number";
  var max = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value2;
  var key = null;
  var num = typeof value2 === "number";
  var str = typeof value2 === "string";
  var arr = Array.isArray(value2);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value2.length;
  }
  if (str) {
    val = value2.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value2, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value2) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value2, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value2)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value2)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options, "string");
    if (!isEmptyValue(value2, "string")) {
      rules.type(rule, value2, source, errors, options);
      rules.range(rule, value2, source, errors, options);
      rules.pattern(rule, value2, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value2, source, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules.type(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (value2 === "") {
      value2 = void 0;
    }
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules.type(rule, value2, source, errors, options);
      rules.range(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules.type(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var regexp2 = function regexp3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (!isEmptyValue(value2)) {
      rules.type(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules.type(rule, value2, source, errors, options);
      rules.range(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules.type(rule, value2, source, errors, options);
      rules.range(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if ((value2 === void 0 || value2 === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options, "array");
    if (value2 !== void 0 && value2 !== null) {
      rules.type(rule, value2, source, errors, options);
      rules.range(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules.type(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (value2 !== void 0) {
      rules[ENUM](rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (!isEmptyValue(value2, "string")) {
      rules.pattern(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
    if (!isEmptyValue(value2, "date")) {
      var dateObject;
      if (value2 instanceof Date) {
        dateObject = value2;
      } else {
        dateObject = new Date(value2);
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value2, callback, source, options) {
  var errors = [];
  var type4 = Array.isArray(value2) ? "array" : typeof value2;
  rules.required(rule, value2, source, errors, options, type4);
  callback(errors);
};
var type2 = function type3(rule, value2, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options, ruleType);
    if (!isEmptyValue(value2, ruleType)) {
      rules.type(rule, value2, source, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value2, callback, source, options) {
  var errors = [];
  var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value2) && !rule.required) {
      return callback();
    }
    rules.required(rule, value2, source, errors, options);
  }
  callback(errors);
};
var validators = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp2,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone2() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = /* @__PURE__ */ function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this2 = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item = rules2[name];
      _this2.rules[name] = Array.isArray(item) ? item : [item];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate2(source_, o, oc) {
    var _this2 = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function(z) {
      var arr = _this2.rules[z];
      var value2 = source[z];
      arr.forEach(function(r) {
        var rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = _extends$1({}, source);
          }
          value2 = source[z] = rule.transform(value2);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends$1({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value: value2,
          source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullField(key, schema) {
        return _extends$1({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errorList = Array.isArray(e) ? e : [e];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data.value).map(function(key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }
          fieldsSchema = _extends$1({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error);
          if (!options.suppressValidatorError) {
            setTimeout(function() {
              throw error;
            }, 0);
          }
          cb(error.message);
        }
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e) {
          return cb(e);
        });
      }
    }, function(results) {
      complete(results);
    }, source);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || void 0;
  };
  return Schema2;
}();
Schema.register = function register(type4, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type4] = validator;
};
Schema.warning = warning$4;
Schema.messages = messages;
Schema.validators = validators;
var typeTemplate$1 = "'${name}' is not a valid ${type}";
var defaultValidateMessages = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: typeTemplate$1,
    method: typeTemplate$1,
    array: typeTemplate$1,
    object: typeTemplate$1,
    number: typeTemplate$1,
    date: typeTemplate$1,
    boolean: typeTemplate$1,
    integer: typeTemplate$1,
    float: typeTemplate$1,
    regexp: typeTemplate$1,
    email: typeTemplate$1,
    url: typeTemplate$1,
    hex: typeTemplate$1
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};
function get$2(entity, path) {
  var current = entity;
  for (var i = 0; i < path.length; i += 1) {
    if (current === null || current === void 0) {
      return void 0;
    }
    current = current[path[i]];
  }
  return current;
}
function _toArray(arr) {
  return _arrayWithHoles$3(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableRest$3();
}
function internalSet(entity, paths, value2, removeIfUndefined) {
  if (!paths.length) {
    return value2;
  }
  var _paths = _toArray(paths), path = _paths[0], restPath = _paths.slice(1);
  var clone2;
  if (!entity && typeof path === "number") {
    clone2 = [];
  } else if (Array.isArray(entity)) {
    clone2 = _toConsumableArray$2(entity);
  } else {
    clone2 = _objectSpread2$3({}, entity);
  }
  if (removeIfUndefined && value2 === void 0 && restPath.length === 1) {
    delete clone2[path][restPath[0]];
  } else {
    clone2[path] = internalSet(clone2[path], restPath, value2, removeIfUndefined);
  }
  return clone2;
}
function set(entity, paths, value2) {
  var removeIfUndefined = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (paths.length && removeIfUndefined && value2 === void 0 && !get$2(entity, paths.slice(0, -1))) {
    return entity;
  }
  return internalSet(entity, paths, value2, removeIfUndefined);
}
function cloneDeep$1(val) {
  if (Array.isArray(val)) {
    return cloneArrayDeep(val);
  } else if (_typeof$3(val) === "object" && val !== null) {
    return cloneObjectDeep(val);
  }
  return val;
}
function cloneObjectDeep(val) {
  if (Object.getPrototypeOf(val) === Object.prototype) {
    var res = {};
    for (var key in val) {
      res[key] = cloneDeep$1(val[key]);
    }
    return res;
  }
  return val;
}
function cloneArrayDeep(val) {
  return val.map(function(item) {
    return cloneDeep$1(item);
  });
}
function getNamePath(path) {
  return toArray(path);
}
function getValue$2(store, namePath) {
  var value2 = get$2(store, namePath);
  return value2;
}
function setValue(store, namePath, value2) {
  var removeIfUndefined = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var newStore = set(store, namePath, value2, removeIfUndefined);
  return newStore;
}
function cloneByNamePathList(store, namePathList) {
  var newStore = {};
  namePathList.forEach(function(namePath) {
    var value2 = getValue$2(store, namePath);
    newStore = setValue(newStore, namePath, value2);
  });
  return newStore;
}
function containsNamePath(namePathList, namePath) {
  return namePathList && namePathList.some(function(path) {
    return matchNamePath(path, namePath);
  });
}
function isObject$1(obj) {
  return _typeof$3(obj) === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function internalSetValues(store, values) {
  var newStore = Array.isArray(store) ? _toConsumableArray$2(store) : _objectSpread2$3({}, store);
  if (!values) {
    return newStore;
  }
  Object.keys(values).forEach(function(key) {
    var prevValue = newStore[key];
    var value2 = values[key];
    var recursive = isObject$1(prevValue) && isObject$1(value2);
    newStore[key] = recursive ? internalSetValues(prevValue, value2 || {}) : cloneDeep$1(value2);
  });
  return newStore;
}
function setValues(store) {
  for (var _len = arguments.length, restValues = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restValues[_key - 1] = arguments[_key];
  }
  return restValues.reduce(function(current, newStore) {
    return internalSetValues(current, newStore);
  }, store);
}
function matchNamePath(namePath, changedNamePath) {
  if (!namePath || !changedNamePath || namePath.length !== changedNamePath.length) {
    return false;
  }
  return namePath.every(function(nameUnit, i) {
    return changedNamePath[i] === nameUnit;
  });
}
function isSimilar(source, target) {
  if (source === target) {
    return true;
  }
  if (!source && target || source && !target) {
    return false;
  }
  if (!source || !target || _typeof$3(source) !== "object" || _typeof$3(target) !== "object") {
    return false;
  }
  var sourceKeys = Object.keys(source);
  var targetKeys = Object.keys(target);
  var keys = new Set([].concat(sourceKeys, targetKeys));
  return _toConsumableArray$2(keys).every(function(key) {
    var sourceValue = source[key];
    var targetValue = target[key];
    if (typeof sourceValue === "function" && typeof targetValue === "function") {
      return true;
    }
    return sourceValue === targetValue;
  });
}
function defaultGetValueFromEvent(valuePropName) {
  var event = arguments.length <= 1 ? void 0 : arguments[1];
  if (event && event.target && _typeof$3(event.target) === "object" && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
}
function move(array4, moveIndex, toIndex) {
  var length2 = array4.length;
  if (moveIndex < 0 || moveIndex >= length2 || toIndex < 0 || toIndex >= length2) {
    return array4;
  }
  var item = array4[moveIndex];
  var diff = moveIndex - toIndex;
  if (diff > 0) {
    return [].concat(_toConsumableArray$2(array4.slice(0, toIndex)), [item], _toConsumableArray$2(array4.slice(toIndex, moveIndex)), _toConsumableArray$2(array4.slice(moveIndex + 1, length2)));
  }
  if (diff < 0) {
    return [].concat(_toConsumableArray$2(array4.slice(0, moveIndex)), _toConsumableArray$2(array4.slice(moveIndex + 1, toIndex + 1)), [item], _toConsumableArray$2(array4.slice(toIndex + 1, length2)));
  }
  return array4;
}
var AsyncValidator = Schema;
function replaceMessage(template, kv) {
  return template.replace(/\$\{\w+\}/g, function(str) {
    var key = str.slice(2, -1);
    return kv[key];
  });
}
var CODE_LOGIC_ERROR = "CODE_LOGIC_ERROR";
function validateRule(_x, _x2, _x3, _x4, _x5) {
  return _validateRule.apply(this, arguments);
}
function _validateRule() {
  _validateRule = _asyncToGenerator$1(/* @__PURE__ */ _regeneratorRuntime$1().mark(function _callee2(name, value2, rule, options, messageVariables) {
    var cloneRule, originValidator, subRuleField, validator, messages2, result, subResults, kv, fillVariableResult;
    return _regeneratorRuntime$1().wrap(function _callee2$(_context2) {
      while (1)
        switch (_context2.prev = _context2.next) {
          case 0:
            cloneRule = _objectSpread2$3({}, rule);
            delete cloneRule.ruleIndex;
            if (cloneRule.validator) {
              originValidator = cloneRule.validator;
              cloneRule.validator = function() {
                try {
                  return originValidator.apply(void 0, arguments);
                } catch (error) {
                  console.error(error);
                  return Promise.reject(CODE_LOGIC_ERROR);
                }
              };
            }
            subRuleField = null;
            if (cloneRule && cloneRule.type === "array" && cloneRule.defaultField) {
              subRuleField = cloneRule.defaultField;
              delete cloneRule.defaultField;
            }
            validator = new AsyncValidator(_defineProperty$4({}, name, [cloneRule]));
            messages2 = setValues({}, defaultValidateMessages, options.validateMessages);
            validator.messages(messages2);
            result = [];
            _context2.prev = 9;
            _context2.next = 12;
            return Promise.resolve(validator.validate(_defineProperty$4({}, name, value2), _objectSpread2$3({}, options)));
          case 12:
            _context2.next = 17;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](9);
            if (_context2.t0.errors) {
              result = _context2.t0.errors.map(function(_ref4, index2) {
                var message = _ref4.message;
                var mergedMessage = message === CODE_LOGIC_ERROR ? messages2.default : message;
                return /* @__PURE__ */ React.isValidElement(mergedMessage) ? (
                  // Wrap ReactNode with `key`
                  /* @__PURE__ */ React.cloneElement(mergedMessage, {
                    key: "error_".concat(index2)
                  })
                ) : mergedMessage;
              });
            }
          case 17:
            if (!(!result.length && subRuleField)) {
              _context2.next = 22;
              break;
            }
            _context2.next = 20;
            return Promise.all(value2.map(function(subValue, i) {
              return validateRule("".concat(name, ".").concat(i), subValue, subRuleField, options, messageVariables);
            }));
          case 20:
            subResults = _context2.sent;
            return _context2.abrupt("return", subResults.reduce(function(prev2, errors) {
              return [].concat(_toConsumableArray$2(prev2), _toConsumableArray$2(errors));
            }, []));
          case 22:
            kv = _objectSpread2$3(_objectSpread2$3({}, rule), {}, {
              name,
              enum: (rule.enum || []).join(", ")
            }, messageVariables);
            fillVariableResult = result.map(function(error) {
              if (typeof error === "string") {
                return replaceMessage(error, kv);
              }
              return error;
            });
            return _context2.abrupt("return", fillVariableResult);
          case 25:
          case "end":
            return _context2.stop();
        }
    }, _callee2, null, [[9, 14]]);
  }));
  return _validateRule.apply(this, arguments);
}
function validateRules(namePath, value2, rules2, options, validateFirst, messageVariables) {
  var name = namePath.join(".");
  var filledRules = rules2.map(function(currentRule, ruleIndex) {
    var originValidatorFunc = currentRule.validator;
    var cloneRule = _objectSpread2$3(_objectSpread2$3({}, currentRule), {}, {
      ruleIndex
    });
    if (originValidatorFunc) {
      cloneRule.validator = function(rule, val, callback) {
        var hasPromise = false;
        var wrappedCallback = function wrappedCallback2() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          Promise.resolve().then(function() {
            warningOnce$1(!hasPromise, "Your validator function has already return a promise. `callback` will be ignored.");
            if (!hasPromise) {
              callback.apply(void 0, args);
            }
          });
        };
        var promise = originValidatorFunc(rule, val, wrappedCallback);
        hasPromise = promise && typeof promise.then === "function" && typeof promise.catch === "function";
        warningOnce$1(hasPromise, "`callback` is deprecated. Please return a promise instead.");
        if (hasPromise) {
          promise.then(function() {
            callback();
          }).catch(function(err) {
            callback(err || " ");
          });
        }
      };
    }
    return cloneRule;
  }).sort(function(_ref, _ref2) {
    var w1 = _ref.warningOnly, i1 = _ref.ruleIndex;
    var w2 = _ref2.warningOnly, i2 = _ref2.ruleIndex;
    if (!!w1 === !!w2) {
      return i1 - i2;
    }
    if (w1) {
      return 1;
    }
    return -1;
  });
  var summaryPromise;
  if (validateFirst === true) {
    summaryPromise = new Promise(/* @__PURE__ */ function() {
      var _ref3 = _asyncToGenerator$1(/* @__PURE__ */ _regeneratorRuntime$1().mark(function _callee(resolve, reject) {
        var i, rule, errors;
        return _regeneratorRuntime$1().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;
              case 1:
                if (!(i < filledRules.length)) {
                  _context.next = 12;
                  break;
                }
                rule = filledRules[i];
                _context.next = 5;
                return validateRule(name, value2, rule, options, messageVariables);
              case 5:
                errors = _context.sent;
                if (!errors.length) {
                  _context.next = 9;
                  break;
                }
                reject([{
                  errors,
                  rule
                }]);
                return _context.abrupt("return");
              case 9:
                i += 1;
                _context.next = 1;
                break;
              case 12:
                resolve([]);
              case 13:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }));
      return function(_x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }());
  } else {
    var rulePromises = filledRules.map(function(rule) {
      return validateRule(name, value2, rule, options, messageVariables).then(function(errors) {
        return {
          errors,
          rule
        };
      });
    });
    summaryPromise = (validateFirst ? finishOnFirstFailed(rulePromises) : finishOnAllFailed(rulePromises)).then(function(errors) {
      return Promise.reject(errors);
    });
  }
  summaryPromise.catch(function(e) {
    return e;
  });
  return summaryPromise;
}
function finishOnAllFailed(_x8) {
  return _finishOnAllFailed.apply(this, arguments);
}
function _finishOnAllFailed() {
  _finishOnAllFailed = _asyncToGenerator$1(/* @__PURE__ */ _regeneratorRuntime$1().mark(function _callee3(rulePromises) {
    return _regeneratorRuntime$1().wrap(function _callee3$(_context3) {
      while (1)
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", Promise.all(rulePromises).then(function(errorsList) {
              var _ref5;
              var errors = (_ref5 = []).concat.apply(_ref5, _toConsumableArray$2(errorsList));
              return errors;
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
    }, _callee3);
  }));
  return _finishOnAllFailed.apply(this, arguments);
}
function finishOnFirstFailed(_x9) {
  return _finishOnFirstFailed.apply(this, arguments);
}
function _finishOnFirstFailed() {
  _finishOnFirstFailed = _asyncToGenerator$1(/* @__PURE__ */ _regeneratorRuntime$1().mark(function _callee4(rulePromises) {
    var count;
    return _regeneratorRuntime$1().wrap(function _callee4$(_context4) {
      while (1)
        switch (_context4.prev = _context4.next) {
          case 0:
            count = 0;
            return _context4.abrupt("return", new Promise(function(resolve) {
              rulePromises.forEach(function(promise) {
                promise.then(function(ruleError) {
                  if (ruleError.errors.length) {
                    resolve([ruleError]);
                  }
                  count += 1;
                  if (count === rulePromises.length) {
                    resolve([]);
                  }
                });
              });
            }));
          case 2:
          case "end":
            return _context4.stop();
        }
    }, _callee4);
  }));
  return _finishOnFirstFailed.apply(this, arguments);
}
var _excluded$6 = ["name"];
var EMPTY_ERRORS = [];
function requireUpdate(shouldUpdate, prev2, next2, prevValue, nextValue, info) {
  if (typeof shouldUpdate === "function") {
    return shouldUpdate(prev2, next2, "source" in info ? {
      source: info.source
    } : {});
  }
  return prevValue !== nextValue;
}
var Field = /* @__PURE__ */ function(_React$Component) {
  _inherits$1(Field2, _React$Component);
  var _super = _createSuper(Field2);
  function Field2(props) {
    var _this2;
    _classCallCheck$1(this, Field2);
    _this2 = _super.call(this, props);
    _this2.state = {
      resetCount: 0
    };
    _this2.cancelRegisterFunc = null;
    _this2.mounted = false;
    _this2.touched = false;
    _this2.dirty = false;
    _this2.validatePromise = null;
    _this2.prevValidating = void 0;
    _this2.errors = EMPTY_ERRORS;
    _this2.warnings = EMPTY_ERRORS;
    _this2.cancelRegister = function() {
      var _this$props = _this2.props, preserve = _this$props.preserve, isListField = _this$props.isListField, name = _this$props.name;
      if (_this2.cancelRegisterFunc) {
        _this2.cancelRegisterFunc(isListField, preserve, getNamePath(name));
      }
      _this2.cancelRegisterFunc = null;
    };
    _this2.getNamePath = function() {
      var _this$props2 = _this2.props, name = _this$props2.name, fieldContext = _this$props2.fieldContext;
      var _fieldContext$prefixN = fieldContext.prefixName, prefixName = _fieldContext$prefixN === void 0 ? [] : _fieldContext$prefixN;
      return name !== void 0 ? [].concat(_toConsumableArray$2(prefixName), _toConsumableArray$2(name)) : [];
    };
    _this2.getRules = function() {
      var _this$props3 = _this2.props, _this$props3$rules = _this$props3.rules, rules2 = _this$props3$rules === void 0 ? [] : _this$props3$rules, fieldContext = _this$props3.fieldContext;
      return rules2.map(function(rule) {
        if (typeof rule === "function") {
          return rule(fieldContext);
        }
        return rule;
      });
    };
    _this2.refresh = function() {
      if (!_this2.mounted)
        return;
      _this2.setState(function(_ref) {
        var resetCount = _ref.resetCount;
        return {
          resetCount: resetCount + 1
        };
      });
    };
    _this2.triggerMetaEvent = function(destroy) {
      var onMetaChange = _this2.props.onMetaChange;
      onMetaChange === null || onMetaChange === void 0 ? void 0 : onMetaChange(_objectSpread2$3(_objectSpread2$3({}, _this2.getMeta()), {}, {
        destroy
      }));
    };
    _this2.onStoreChange = function(prevStore, namePathList, info) {
      var _this$props4 = _this2.props, shouldUpdate = _this$props4.shouldUpdate, _this$props4$dependen = _this$props4.dependencies, dependencies = _this$props4$dependen === void 0 ? [] : _this$props4$dependen, onReset = _this$props4.onReset;
      var store = info.store;
      var namePath = _this2.getNamePath();
      var prevValue = _this2.getValue(prevStore);
      var curValue = _this2.getValue(store);
      var namePathMatch = namePathList && containsNamePath(namePathList, namePath);
      if (info.type === "valueUpdate" && info.source === "external" && prevValue !== curValue) {
        _this2.touched = true;
        _this2.dirty = true;
        _this2.validatePromise = null;
        _this2.errors = EMPTY_ERRORS;
        _this2.warnings = EMPTY_ERRORS;
        _this2.triggerMetaEvent();
      }
      switch (info.type) {
        case "reset":
          if (!namePathList || namePathMatch) {
            _this2.touched = false;
            _this2.dirty = false;
            _this2.validatePromise = null;
            _this2.errors = EMPTY_ERRORS;
            _this2.warnings = EMPTY_ERRORS;
            _this2.triggerMetaEvent();
            onReset === null || onReset === void 0 ? void 0 : onReset();
            _this2.refresh();
            return;
          }
          break;
        case "remove": {
          if (shouldUpdate) {
            _this2.reRender();
            return;
          }
          break;
        }
        case "setField": {
          if (namePathMatch) {
            var data = info.data;
            if ("touched" in data) {
              _this2.touched = data.touched;
            }
            if ("validating" in data && !("originRCField" in data)) {
              _this2.validatePromise = data.validating ? Promise.resolve([]) : null;
            }
            if ("errors" in data) {
              _this2.errors = data.errors || EMPTY_ERRORS;
            }
            if ("warnings" in data) {
              _this2.warnings = data.warnings || EMPTY_ERRORS;
            }
            _this2.dirty = true;
            _this2.triggerMetaEvent();
            _this2.reRender();
            return;
          }
          if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
            _this2.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var dependencyList = dependencies.map(getNamePath);
          if (dependencyList.some(function(dependency) {
            return containsNamePath(info.relatedFields, dependency);
          })) {
            _this2.reRender();
            return;
          }
          break;
        }
        default:
          if (namePathMatch || (!dependencies.length || namePath.length || shouldUpdate) && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
            _this2.reRender();
            return;
          }
          break;
      }
      if (shouldUpdate === true) {
        _this2.reRender();
      }
    };
    _this2.validateRules = function(options) {
      var namePath = _this2.getNamePath();
      var currentValue = _this2.getValue();
      var rootPromise = Promise.resolve().then(function() {
        if (!_this2.mounted) {
          return [];
        }
        var _this$props5 = _this2.props, _this$props5$validate = _this$props5.validateFirst, validateFirst = _this$props5$validate === void 0 ? false : _this$props5$validate, messageVariables = _this$props5.messageVariables;
        var _ref2 = options || {}, triggerName = _ref2.triggerName;
        var filteredRules = _this2.getRules();
        if (triggerName) {
          filteredRules = filteredRules.filter(function(rule) {
            return rule;
          }).filter(function(rule) {
            var validateTrigger = rule.validateTrigger;
            if (!validateTrigger) {
              return true;
            }
            var triggerList = toArray(validateTrigger);
            return triggerList.includes(triggerName);
          });
        }
        var promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);
        promise.catch(function(e) {
          return e;
        }).then(function() {
          var ruleErrors = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : EMPTY_ERRORS;
          if (_this2.validatePromise === rootPromise) {
            var _ruleErrors$forEach;
            _this2.validatePromise = null;
            var nextErrors = [];
            var nextWarnings = [];
            (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 ? void 0 : _ruleErrors$forEach.call(ruleErrors, function(_ref3) {
              var warningOnly = _ref3.rule.warningOnly, _ref3$errors = _ref3.errors, errors = _ref3$errors === void 0 ? EMPTY_ERRORS : _ref3$errors;
              if (warningOnly) {
                nextWarnings.push.apply(nextWarnings, _toConsumableArray$2(errors));
              } else {
                nextErrors.push.apply(nextErrors, _toConsumableArray$2(errors));
              }
            });
            _this2.errors = nextErrors;
            _this2.warnings = nextWarnings;
            _this2.triggerMetaEvent();
            _this2.reRender();
          }
        });
        return promise;
      });
      _this2.validatePromise = rootPromise;
      _this2.dirty = true;
      _this2.errors = EMPTY_ERRORS;
      _this2.warnings = EMPTY_ERRORS;
      _this2.triggerMetaEvent();
      _this2.reRender();
      return rootPromise;
    };
    _this2.isFieldValidating = function() {
      return !!_this2.validatePromise;
    };
    _this2.isFieldTouched = function() {
      return _this2.touched;
    };
    _this2.isFieldDirty = function() {
      if (_this2.dirty || _this2.props.initialValue !== void 0) {
        return true;
      }
      var fieldContext = _this2.props.fieldContext;
      var _fieldContext$getInte = fieldContext.getInternalHooks(HOOK_MARK), getInitialValue = _fieldContext$getInte.getInitialValue;
      if (getInitialValue(_this2.getNamePath()) !== void 0) {
        return true;
      }
      return false;
    };
    _this2.getErrors = function() {
      return _this2.errors;
    };
    _this2.getWarnings = function() {
      return _this2.warnings;
    };
    _this2.isListField = function() {
      return _this2.props.isListField;
    };
    _this2.isList = function() {
      return _this2.props.isList;
    };
    _this2.isPreserve = function() {
      return _this2.props.preserve;
    };
    _this2.getMeta = function() {
      _this2.prevValidating = _this2.isFieldValidating();
      var meta = {
        touched: _this2.isFieldTouched(),
        validating: _this2.prevValidating,
        errors: _this2.errors,
        warnings: _this2.warnings,
        name: _this2.getNamePath()
      };
      return meta;
    };
    _this2.getOnlyChild = function(children) {
      if (typeof children === "function") {
        var meta = _this2.getMeta();
        return _objectSpread2$3(_objectSpread2$3({}, _this2.getOnlyChild(children(_this2.getControlled(), meta, _this2.props.fieldContext))), {}, {
          isFunction: true
        });
      }
      var childList = toArray$1(children);
      if (childList.length !== 1 || !/* @__PURE__ */ React.isValidElement(childList[0])) {
        return {
          child: childList,
          isFunction: false
        };
      }
      return {
        child: childList[0],
        isFunction: false
      };
    };
    _this2.getValue = function(store) {
      var getFieldsValue = _this2.props.fieldContext.getFieldsValue;
      var namePath = _this2.getNamePath();
      return getValue$2(store || getFieldsValue(true), namePath);
    };
    _this2.getControlled = function() {
      var childProps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var _this$props6 = _this2.props, trigger = _this$props6.trigger, validateTrigger = _this$props6.validateTrigger, getValueFromEvent = _this$props6.getValueFromEvent, normalize2 = _this$props6.normalize, valuePropName = _this$props6.valuePropName, getValueProps = _this$props6.getValueProps, fieldContext = _this$props6.fieldContext;
      var mergedValidateTrigger = validateTrigger !== void 0 ? validateTrigger : fieldContext.validateTrigger;
      var namePath = _this2.getNamePath();
      var getInternalHooks3 = fieldContext.getInternalHooks, getFieldsValue = fieldContext.getFieldsValue;
      var _getInternalHooks = getInternalHooks3(HOOK_MARK), dispatch = _getInternalHooks.dispatch;
      var value2 = _this2.getValue();
      var mergedGetValueProps = getValueProps || function(val) {
        return _defineProperty$4({}, valuePropName, val);
      };
      var originTriggerFunc = childProps[trigger];
      var control = _objectSpread2$3(_objectSpread2$3({}, childProps), mergedGetValueProps(value2));
      control[trigger] = function() {
        _this2.touched = true;
        _this2.dirty = true;
        _this2.triggerMetaEvent();
        var newValue;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (getValueFromEvent) {
          newValue = getValueFromEvent.apply(void 0, args);
        } else {
          newValue = defaultGetValueFromEvent.apply(void 0, [valuePropName].concat(args));
        }
        if (normalize2) {
          newValue = normalize2(newValue, value2, getFieldsValue(true));
        }
        dispatch({
          type: "updateValue",
          namePath,
          value: newValue
        });
        if (originTriggerFunc) {
          originTriggerFunc.apply(void 0, args);
        }
      };
      var validateTriggerList = toArray(mergedValidateTrigger || []);
      validateTriggerList.forEach(function(triggerName) {
        var originTrigger = control[triggerName];
        control[triggerName] = function() {
          if (originTrigger) {
            originTrigger.apply(void 0, arguments);
          }
          var rules2 = _this2.props.rules;
          if (rules2 && rules2.length) {
            dispatch({
              type: "validateField",
              namePath,
              triggerName
            });
          }
        };
      });
      return control;
    };
    if (props.fieldContext) {
      var getInternalHooks2 = props.fieldContext.getInternalHooks;
      var _getInternalHooks2 = getInternalHooks2(HOOK_MARK), initEntityValue = _getInternalHooks2.initEntityValue;
      initEntityValue(_assertThisInitialized$1(_this2));
    }
    return _this2;
  }
  _createClass$1(Field2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props, shouldUpdate = _this$props7.shouldUpdate, fieldContext = _this$props7.fieldContext;
      this.mounted = true;
      if (fieldContext) {
        var getInternalHooks2 = fieldContext.getInternalHooks;
        var _getInternalHooks3 = getInternalHooks2(HOOK_MARK), registerField = _getInternalHooks3.registerField;
        this.cancelRegisterFunc = registerField(this);
      }
      if (shouldUpdate === true) {
        this.reRender();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelRegister();
      this.triggerMetaEvent(true);
      this.mounted = false;
    }
  }, {
    key: "reRender",
    value: function reRender() {
      if (!this.mounted)
        return;
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render2() {
      var resetCount = this.state.resetCount;
      var children = this.props.children;
      var _this$getOnlyChild = this.getOnlyChild(children), child = _this$getOnlyChild.child, isFunction2 = _this$getOnlyChild.isFunction;
      var returnChildNode;
      if (isFunction2) {
        returnChildNode = child;
      } else if (/* @__PURE__ */ React.isValidElement(child)) {
        returnChildNode = /* @__PURE__ */ React.cloneElement(child, this.getControlled(child.props));
      } else {
        warningOnce$1(!child, "`children` of Field is not validate ReactElement.");
        returnChildNode = child;
      }
      return /* @__PURE__ */ React.createElement(React.Fragment, {
        key: resetCount
      }, returnChildNode);
    }
  }]);
  return Field2;
}(React.Component);
Field.contextType = Context$1;
Field.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function WrapperField(_ref5) {
  var name = _ref5.name, restProps = _objectWithoutProperties$1(_ref5, _excluded$6);
  var fieldContext = React.useContext(Context$1);
  var namePath = name !== void 0 ? getNamePath(name) : void 0;
  var key = "keep";
  if (!restProps.isListField) {
    key = "_".concat((namePath || []).join("_"));
  }
  if (process.env.NODE_ENV !== "production" && restProps.preserve === false && restProps.isListField && namePath.length <= 1) {
    warningOnce$1(false, "`preserve` should not apply on Form.List fields.");
  }
  return /* @__PURE__ */ React.createElement(Field, _extends$2({
    key,
    name: namePath
  }, restProps, {
    fieldContext
  }));
}
var ListContext = /* @__PURE__ */ React.createContext(null);
var List = function List2(_ref) {
  var name = _ref.name, initialValue = _ref.initialValue, children = _ref.children, rules2 = _ref.rules, validateTrigger = _ref.validateTrigger;
  var context = React.useContext(Context$1);
  var keyRef = React.useRef({
    keys: [],
    id: 0
  });
  var keyManager = keyRef.current;
  var prefixName = React.useMemo(function() {
    var parentPrefixName = getNamePath(context.prefixName) || [];
    return [].concat(_toConsumableArray$2(parentPrefixName), _toConsumableArray$2(getNamePath(name)));
  }, [context.prefixName, name]);
  var fieldContext = React.useMemo(function() {
    return _objectSpread2$3(_objectSpread2$3({}, context), {}, {
      prefixName
    });
  }, [context, prefixName]);
  var listContext = React.useMemo(function() {
    return {
      getKey: function getKey(namePath) {
        var len = prefixName.length;
        var pathName = namePath[len];
        return [keyManager.keys[pathName], namePath.slice(len + 1)];
      }
    };
  }, [prefixName]);
  if (typeof children !== "function") {
    warningOnce$1(false, "Form.List only accepts function as children.");
    return null;
  }
  var shouldUpdate = function shouldUpdate2(prevValue, nextValue, _ref2) {
    var source = _ref2.source;
    if (source === "internal") {
      return false;
    }
    return prevValue !== nextValue;
  };
  return /* @__PURE__ */ React.createElement(ListContext.Provider, {
    value: listContext
  }, /* @__PURE__ */ React.createElement(Context$1.Provider, {
    value: fieldContext
  }, /* @__PURE__ */ React.createElement(WrapperField, {
    name: [],
    shouldUpdate,
    rules: rules2,
    validateTrigger,
    initialValue,
    isList: true
  }, function(_ref3, meta) {
    var _ref3$value = _ref3.value, value2 = _ref3$value === void 0 ? [] : _ref3$value, onChange = _ref3.onChange;
    var getFieldValue = context.getFieldValue;
    var getNewValue = function getNewValue2() {
      var values = getFieldValue(prefixName || []);
      return values || [];
    };
    var operations = {
      add: function add(defaultValue, index2) {
        var newValue = getNewValue();
        if (index2 >= 0 && index2 <= newValue.length) {
          keyManager.keys = [].concat(_toConsumableArray$2(keyManager.keys.slice(0, index2)), [keyManager.id], _toConsumableArray$2(keyManager.keys.slice(index2)));
          onChange([].concat(_toConsumableArray$2(newValue.slice(0, index2)), [defaultValue], _toConsumableArray$2(newValue.slice(index2))));
        } else {
          if (process.env.NODE_ENV !== "production" && (index2 < 0 || index2 > newValue.length)) {
            warningOnce$1(false, "The second parameter of the add function should be a valid positive number.");
          }
          keyManager.keys = [].concat(_toConsumableArray$2(keyManager.keys), [keyManager.id]);
          onChange([].concat(_toConsumableArray$2(newValue), [defaultValue]));
        }
        keyManager.id += 1;
      },
      remove: function remove(index2) {
        var newValue = getNewValue();
        var indexSet = new Set(Array.isArray(index2) ? index2 : [index2]);
        if (indexSet.size <= 0) {
          return;
        }
        keyManager.keys = keyManager.keys.filter(function(_, keysIndex) {
          return !indexSet.has(keysIndex);
        });
        onChange(newValue.filter(function(_, valueIndex) {
          return !indexSet.has(valueIndex);
        }));
      },
      move: function move$1(from2, to) {
        if (from2 === to) {
          return;
        }
        var newValue = getNewValue();
        if (from2 < 0 || from2 >= newValue.length || to < 0 || to >= newValue.length) {
          return;
        }
        keyManager.keys = move(keyManager.keys, from2, to);
        onChange(move(newValue, from2, to));
      }
    };
    var listValue = value2 || [];
    if (!Array.isArray(listValue)) {
      listValue = [];
      if (process.env.NODE_ENV !== "production") {
        warningOnce$1(false, "Current value of '".concat(prefixName.join(" > "), "' is not an array type."));
      }
    }
    return children(listValue.map(function(__, index2) {
      var key = keyManager.keys[index2];
      if (key === void 0) {
        keyManager.keys[index2] = keyManager.id;
        key = keyManager.keys[index2];
        keyManager.id += 1;
      }
      return {
        name: index2,
        key,
        isListField: true
      };
    }), operations, meta);
  })));
};
function allPromiseFinish(promiseList) {
  var hasError = false;
  var count = promiseList.length;
  var results = [];
  if (!promiseList.length) {
    return Promise.resolve([]);
  }
  return new Promise(function(resolve, reject) {
    promiseList.forEach(function(promise, index2) {
      promise.catch(function(e) {
        hasError = true;
        return e;
      }).then(function(result) {
        count -= 1;
        results[index2] = result;
        if (count > 0) {
          return;
        }
        if (hasError) {
          reject(results);
        }
        resolve(results);
      });
    });
  });
}
var SPLIT = "__@field_split__";
function normalize(namePath) {
  return namePath.map(function(cell) {
    return "".concat(_typeof$3(cell), ":").concat(cell);
  }).join(SPLIT);
}
var NameMap = /* @__PURE__ */ function() {
  function NameMap2() {
    _classCallCheck$1(this, NameMap2);
    this.kvs = /* @__PURE__ */ new Map();
  }
  _createClass$1(NameMap2, [{
    key: "set",
    value: function set2(key, value2) {
      this.kvs.set(normalize(key), value2);
    }
  }, {
    key: "get",
    value: function get2(key) {
      return this.kvs.get(normalize(key));
    }
  }, {
    key: "update",
    value: function update(key, updater) {
      var origin = this.get(key);
      var next2 = updater(origin);
      if (!next2) {
        this.delete(key);
      } else {
        this.set(key, next2);
      }
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.kvs.delete(normalize(key));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function map(callback) {
      return _toConsumableArray$2(this.kvs.entries()).map(function(_ref) {
        var _ref2 = _slicedToArray$3(_ref, 2), key = _ref2[0], value2 = _ref2[1];
        var cells = key.split(SPLIT);
        return callback({
          key: cells.map(function(cell) {
            var _cell$match = cell.match(/^([^:]*):(.*)$/), _cell$match2 = _slicedToArray$3(_cell$match, 3), type4 = _cell$match2[1], unit = _cell$match2[2];
            return type4 === "number" ? Number(unit) : unit;
          }),
          value: value2
        });
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      this.map(function(_ref3) {
        var key = _ref3.key, value2 = _ref3.value;
        json[key.join(".")] = value2;
        return null;
      });
      return json;
    }
  }]);
  return NameMap2;
}();
var _excluded$5 = ["name", "errors"];
var FormStore = /* @__PURE__ */ _createClass$1(function FormStore2(forceRootUpdate) {
  var _this2 = this;
  _classCallCheck$1(this, FormStore2);
  this.formHooked = false;
  this.forceRootUpdate = void 0;
  this.subscribable = true;
  this.store = {};
  this.fieldEntities = [];
  this.initialValues = {};
  this.callbacks = {};
  this.validateMessages = null;
  this.preserve = null;
  this.lastValidatePromise = null;
  this.getForm = function() {
    return {
      getFieldValue: _this2.getFieldValue,
      getFieldsValue: _this2.getFieldsValue,
      getFieldError: _this2.getFieldError,
      getFieldWarning: _this2.getFieldWarning,
      getFieldsError: _this2.getFieldsError,
      isFieldsTouched: _this2.isFieldsTouched,
      isFieldTouched: _this2.isFieldTouched,
      isFieldValidating: _this2.isFieldValidating,
      isFieldsValidating: _this2.isFieldsValidating,
      resetFields: _this2.resetFields,
      setFields: _this2.setFields,
      setFieldValue: _this2.setFieldValue,
      setFieldsValue: _this2.setFieldsValue,
      validateFields: _this2.validateFields,
      submit: _this2.submit,
      _init: true,
      getInternalHooks: _this2.getInternalHooks
    };
  };
  this.getInternalHooks = function(key) {
    if (key === HOOK_MARK) {
      _this2.formHooked = true;
      return {
        dispatch: _this2.dispatch,
        initEntityValue: _this2.initEntityValue,
        registerField: _this2.registerField,
        useSubscribe: _this2.useSubscribe,
        setInitialValues: _this2.setInitialValues,
        destroyForm: _this2.destroyForm,
        setCallbacks: _this2.setCallbacks,
        setValidateMessages: _this2.setValidateMessages,
        getFields: _this2.getFields,
        setPreserve: _this2.setPreserve,
        getInitialValue: _this2.getInitialValue,
        registerWatch: _this2.registerWatch
      };
    }
    warningOnce$1(false, "`getInternalHooks` is internal usage. Should not call directly.");
    return null;
  };
  this.useSubscribe = function(subscribable) {
    _this2.subscribable = subscribable;
  };
  this.prevWithoutPreserves = null;
  this.setInitialValues = function(initialValues, init) {
    _this2.initialValues = initialValues || {};
    if (init) {
      var _this$prevWithoutPres;
      var nextStore = setValues({}, initialValues, _this2.store);
      (_this$prevWithoutPres = _this2.prevWithoutPreserves) === null || _this$prevWithoutPres === void 0 ? void 0 : _this$prevWithoutPres.map(function(_ref) {
        var namePath = _ref.key;
        nextStore = setValue(nextStore, namePath, getValue$2(initialValues, namePath));
      });
      _this2.prevWithoutPreserves = null;
      _this2.updateStore(nextStore);
    }
  };
  this.destroyForm = function() {
    var prevWithoutPreserves = new NameMap();
    _this2.getFieldEntities(true).forEach(function(entity) {
      if (!_this2.isMergedPreserve(entity.isPreserve())) {
        prevWithoutPreserves.set(entity.getNamePath(), true);
      }
    });
    _this2.prevWithoutPreserves = prevWithoutPreserves;
  };
  this.getInitialValue = function(namePath) {
    var initValue = getValue$2(_this2.initialValues, namePath);
    return namePath.length ? cloneDeep$1(initValue) : initValue;
  };
  this.setCallbacks = function(callbacks) {
    _this2.callbacks = callbacks;
  };
  this.setValidateMessages = function(validateMessages) {
    _this2.validateMessages = validateMessages;
  };
  this.setPreserve = function(preserve) {
    _this2.preserve = preserve;
  };
  this.watchList = [];
  this.registerWatch = function(callback) {
    _this2.watchList.push(callback);
    return function() {
      _this2.watchList = _this2.watchList.filter(function(fn) {
        return fn !== callback;
      });
    };
  };
  this.notifyWatch = function() {
    var namePath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (_this2.watchList.length) {
      var values = _this2.getFieldsValue();
      _this2.watchList.forEach(function(callback) {
        callback(values, namePath);
      });
    }
  };
  this.timeoutId = null;
  this.warningUnhooked = function() {
    if (process.env.NODE_ENV !== "production" && !_this2.timeoutId && typeof window !== "undefined") {
      _this2.timeoutId = setTimeout(function() {
        _this2.timeoutId = null;
        if (!_this2.formHooked) {
          warningOnce$1(false, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
        }
      });
    }
  };
  this.updateStore = function(nextStore) {
    _this2.store = nextStore;
  };
  this.getFieldEntities = function() {
    var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (!pure) {
      return _this2.fieldEntities;
    }
    return _this2.fieldEntities.filter(function(field) {
      return field.getNamePath().length;
    });
  };
  this.getFieldsMap = function() {
    var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var cache = new NameMap();
    _this2.getFieldEntities(pure).forEach(function(field) {
      var namePath = field.getNamePath();
      cache.set(namePath, field);
    });
    return cache;
  };
  this.getFieldEntitiesForNamePathList = function(nameList) {
    if (!nameList) {
      return _this2.getFieldEntities(true);
    }
    var cache = _this2.getFieldsMap(true);
    return nameList.map(function(name) {
      var namePath = getNamePath(name);
      return cache.get(namePath) || {
        INVALIDATE_NAME_PATH: getNamePath(name)
      };
    });
  };
  this.getFieldsValue = function(nameList, filterFunc) {
    _this2.warningUnhooked();
    if (nameList === true && !filterFunc) {
      return _this2.store;
    }
    var fieldEntities = _this2.getFieldEntitiesForNamePathList(Array.isArray(nameList) ? nameList : null);
    var filteredNameList = [];
    fieldEntities.forEach(function(entity) {
      var _entity$isListField;
      var namePath = "INVALIDATE_NAME_PATH" in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();
      if (!nameList && ((_entity$isListField = entity.isListField) === null || _entity$isListField === void 0 ? void 0 : _entity$isListField.call(entity))) {
        return;
      }
      if (!filterFunc) {
        filteredNameList.push(namePath);
      } else {
        var meta = "getMeta" in entity ? entity.getMeta() : null;
        if (filterFunc(meta)) {
          filteredNameList.push(namePath);
        }
      }
    });
    return cloneByNamePathList(_this2.store, filteredNameList.map(getNamePath));
  };
  this.getFieldValue = function(name) {
    _this2.warningUnhooked();
    var namePath = getNamePath(name);
    return getValue$2(_this2.store, namePath);
  };
  this.getFieldsError = function(nameList) {
    _this2.warningUnhooked();
    var fieldEntities = _this2.getFieldEntitiesForNamePathList(nameList);
    return fieldEntities.map(function(entity, index2) {
      if (entity && !("INVALIDATE_NAME_PATH" in entity)) {
        return {
          name: entity.getNamePath(),
          errors: entity.getErrors(),
          warnings: entity.getWarnings()
        };
      }
      return {
        name: getNamePath(nameList[index2]),
        errors: [],
        warnings: []
      };
    });
  };
  this.getFieldError = function(name) {
    _this2.warningUnhooked();
    var namePath = getNamePath(name);
    var fieldError = _this2.getFieldsError([namePath])[0];
    return fieldError.errors;
  };
  this.getFieldWarning = function(name) {
    _this2.warningUnhooked();
    var namePath = getNamePath(name);
    var fieldError = _this2.getFieldsError([namePath])[0];
    return fieldError.warnings;
  };
  this.isFieldsTouched = function() {
    _this2.warningUnhooked();
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var arg0 = args[0], arg1 = args[1];
    var namePathList;
    var isAllFieldsTouched = false;
    if (args.length === 0) {
      namePathList = null;
    } else if (args.length === 1) {
      if (Array.isArray(arg0)) {
        namePathList = arg0.map(getNamePath);
        isAllFieldsTouched = false;
      } else {
        namePathList = null;
        isAllFieldsTouched = arg0;
      }
    } else {
      namePathList = arg0.map(getNamePath);
      isAllFieldsTouched = arg1;
    }
    var fieldEntities = _this2.getFieldEntities(true);
    var isFieldTouched = function isFieldTouched2(field) {
      return field.isFieldTouched();
    };
    if (!namePathList) {
      return isAllFieldsTouched ? fieldEntities.every(isFieldTouched) : fieldEntities.some(isFieldTouched);
    }
    var map = new NameMap();
    namePathList.forEach(function(shortNamePath) {
      map.set(shortNamePath, []);
    });
    fieldEntities.forEach(function(field) {
      var fieldNamePath = field.getNamePath();
      namePathList.forEach(function(shortNamePath) {
        if (shortNamePath.every(function(nameUnit, i) {
          return fieldNamePath[i] === nameUnit;
        })) {
          map.update(shortNamePath, function(list) {
            return [].concat(_toConsumableArray$2(list), [field]);
          });
        }
      });
    });
    var isNamePathListTouched = function isNamePathListTouched2(entities) {
      return entities.some(isFieldTouched);
    };
    var namePathListEntities = map.map(function(_ref2) {
      var value2 = _ref2.value;
      return value2;
    });
    return isAllFieldsTouched ? namePathListEntities.every(isNamePathListTouched) : namePathListEntities.some(isNamePathListTouched);
  };
  this.isFieldTouched = function(name) {
    _this2.warningUnhooked();
    return _this2.isFieldsTouched([name]);
  };
  this.isFieldsValidating = function(nameList) {
    _this2.warningUnhooked();
    var fieldEntities = _this2.getFieldEntities();
    if (!nameList) {
      return fieldEntities.some(function(testField) {
        return testField.isFieldValidating();
      });
    }
    var namePathList = nameList.map(getNamePath);
    return fieldEntities.some(function(testField) {
      var fieldNamePath = testField.getNamePath();
      return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
    });
  };
  this.isFieldValidating = function(name) {
    _this2.warningUnhooked();
    return _this2.isFieldsValidating([name]);
  };
  this.resetWithFieldInitialValue = function() {
    var info = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var cache = new NameMap();
    var fieldEntities = _this2.getFieldEntities(true);
    fieldEntities.forEach(function(field) {
      var initialValue = field.props.initialValue;
      var namePath = field.getNamePath();
      if (initialValue !== void 0) {
        var records = cache.get(namePath) || /* @__PURE__ */ new Set();
        records.add({
          entity: field,
          value: initialValue
        });
        cache.set(namePath, records);
      }
    });
    var resetWithFields = function resetWithFields2(entities) {
      entities.forEach(function(field) {
        var initialValue = field.props.initialValue;
        if (initialValue !== void 0) {
          var namePath = field.getNamePath();
          var formInitialValue = _this2.getInitialValue(namePath);
          if (formInitialValue !== void 0) {
            warningOnce$1(false, "Form already set 'initialValues' with path '".concat(namePath.join("."), "'. Field can not overwrite it."));
          } else {
            var records = cache.get(namePath);
            if (records && records.size > 1) {
              warningOnce$1(false, "Multiple Field with path '".concat(namePath.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            } else if (records) {
              var originValue = _this2.getFieldValue(namePath);
              if (!info.skipExist || originValue === void 0) {
                _this2.updateStore(setValue(_this2.store, namePath, _toConsumableArray$2(records)[0].value));
              }
            }
          }
        }
      });
    };
    var requiredFieldEntities;
    if (info.entities) {
      requiredFieldEntities = info.entities;
    } else if (info.namePathList) {
      requiredFieldEntities = [];
      info.namePathList.forEach(function(namePath) {
        var records = cache.get(namePath);
        if (records) {
          var _requiredFieldEntitie;
          (_requiredFieldEntitie = requiredFieldEntities).push.apply(_requiredFieldEntitie, _toConsumableArray$2(_toConsumableArray$2(records).map(function(r) {
            return r.entity;
          })));
        }
      });
    } else {
      requiredFieldEntities = fieldEntities;
    }
    resetWithFields(requiredFieldEntities);
  };
  this.resetFields = function(nameList) {
    _this2.warningUnhooked();
    var prevStore = _this2.store;
    if (!nameList) {
      _this2.updateStore(setValues({}, _this2.initialValues));
      _this2.resetWithFieldInitialValue();
      _this2.notifyObservers(prevStore, null, {
        type: "reset"
      });
      _this2.notifyWatch();
      return;
    }
    var namePathList = nameList.map(getNamePath);
    namePathList.forEach(function(namePath) {
      var initialValue = _this2.getInitialValue(namePath);
      _this2.updateStore(setValue(_this2.store, namePath, initialValue));
    });
    _this2.resetWithFieldInitialValue({
      namePathList
    });
    _this2.notifyObservers(prevStore, namePathList, {
      type: "reset"
    });
    _this2.notifyWatch(namePathList);
  };
  this.setFields = function(fields) {
    _this2.warningUnhooked();
    var prevStore = _this2.store;
    var namePathList = [];
    fields.forEach(function(fieldData) {
      var name = fieldData.name;
      fieldData.errors;
      var data = _objectWithoutProperties$1(fieldData, _excluded$5);
      var namePath = getNamePath(name);
      namePathList.push(namePath);
      if ("value" in data) {
        _this2.updateStore(setValue(_this2.store, namePath, data.value));
      }
      _this2.notifyObservers(prevStore, [namePath], {
        type: "setField",
        data: fieldData
      });
    });
    _this2.notifyWatch(namePathList);
  };
  this.getFields = function() {
    var entities = _this2.getFieldEntities(true);
    var fields = entities.map(function(field) {
      var namePath = field.getNamePath();
      var meta = field.getMeta();
      var fieldData = _objectSpread2$3(_objectSpread2$3({}, meta), {}, {
        name: namePath,
        value: _this2.getFieldValue(namePath)
      });
      Object.defineProperty(fieldData, "originRCField", {
        value: true
      });
      return fieldData;
    });
    return fields;
  };
  this.initEntityValue = function(entity) {
    var initialValue = entity.props.initialValue;
    if (initialValue !== void 0) {
      var namePath = entity.getNamePath();
      var prevValue = getValue$2(_this2.store, namePath);
      if (prevValue === void 0) {
        _this2.updateStore(setValue(_this2.store, namePath, initialValue));
      }
    }
  };
  this.isMergedPreserve = function(fieldPreserve) {
    var mergedPreserve = fieldPreserve !== void 0 ? fieldPreserve : _this2.preserve;
    return mergedPreserve !== null && mergedPreserve !== void 0 ? mergedPreserve : true;
  };
  this.registerField = function(entity) {
    _this2.fieldEntities.push(entity);
    var namePath = entity.getNamePath();
    _this2.notifyWatch([namePath]);
    if (entity.props.initialValue !== void 0) {
      var prevStore = _this2.store;
      _this2.resetWithFieldInitialValue({
        entities: [entity],
        skipExist: true
      });
      _this2.notifyObservers(prevStore, [entity.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(isListField, preserve) {
      var subNamePath = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      _this2.fieldEntities = _this2.fieldEntities.filter(function(item) {
        return item !== entity;
      });
      if (!_this2.isMergedPreserve(preserve) && (!isListField || subNamePath.length > 1)) {
        var defaultValue = isListField ? void 0 : _this2.getInitialValue(namePath);
        if (namePath.length && _this2.getFieldValue(namePath) !== defaultValue && _this2.fieldEntities.every(function(field) {
          return (
            // Only reset when no namePath exist
            !matchNamePath(field.getNamePath(), namePath)
          );
        })) {
          var _prevStore = _this2.store;
          _this2.updateStore(setValue(_prevStore, namePath, defaultValue, true));
          _this2.notifyObservers(_prevStore, [namePath], {
            type: "remove"
          });
          _this2.triggerDependenciesUpdate(_prevStore, namePath);
        }
      }
      _this2.notifyWatch([namePath]);
    };
  };
  this.dispatch = function(action) {
    switch (action.type) {
      case "updateValue": {
        var namePath = action.namePath, value2 = action.value;
        _this2.updateValue(namePath, value2);
        break;
      }
      case "validateField": {
        var _namePath = action.namePath, triggerName = action.triggerName;
        _this2.validateFields([_namePath], {
          triggerName
        });
        break;
      }
    }
  };
  this.notifyObservers = function(prevStore, namePathList, info) {
    if (_this2.subscribable) {
      var mergedInfo = _objectSpread2$3(_objectSpread2$3({}, info), {}, {
        store: _this2.getFieldsValue(true)
      });
      _this2.getFieldEntities().forEach(function(_ref3) {
        var onStoreChange = _ref3.onStoreChange;
        onStoreChange(prevStore, namePathList, mergedInfo);
      });
    } else {
      _this2.forceRootUpdate();
    }
  };
  this.triggerDependenciesUpdate = function(prevStore, namePath) {
    var childrenFields = _this2.getDependencyChildrenFields(namePath);
    if (childrenFields.length) {
      _this2.validateFields(childrenFields);
    }
    _this2.notifyObservers(prevStore, childrenFields, {
      type: "dependenciesUpdate",
      relatedFields: [namePath].concat(_toConsumableArray$2(childrenFields))
    });
    return childrenFields;
  };
  this.updateValue = function(name, value2) {
    var namePath = getNamePath(name);
    var prevStore = _this2.store;
    _this2.updateStore(setValue(_this2.store, namePath, value2));
    _this2.notifyObservers(prevStore, [namePath], {
      type: "valueUpdate",
      source: "internal"
    });
    _this2.notifyWatch([namePath]);
    var childrenFields = _this2.triggerDependenciesUpdate(prevStore, namePath);
    var onValuesChange = _this2.callbacks.onValuesChange;
    if (onValuesChange) {
      var changedValues = cloneByNamePathList(_this2.store, [namePath]);
      onValuesChange(changedValues, _this2.getFieldsValue());
    }
    _this2.triggerOnFieldsChange([namePath].concat(_toConsumableArray$2(childrenFields)));
  };
  this.setFieldsValue = function(store) {
    _this2.warningUnhooked();
    var prevStore = _this2.store;
    if (store) {
      var nextStore = setValues(_this2.store, store);
      _this2.updateStore(nextStore);
    }
    _this2.notifyObservers(prevStore, null, {
      type: "valueUpdate",
      source: "external"
    });
    _this2.notifyWatch();
  };
  this.setFieldValue = function(name, value2) {
    _this2.setFields([{
      name,
      value: value2
    }]);
  };
  this.getDependencyChildrenFields = function(rootNamePath) {
    var children = /* @__PURE__ */ new Set();
    var childrenFields = [];
    var dependencies2fields = new NameMap();
    _this2.getFieldEntities().forEach(function(field) {
      var dependencies = field.props.dependencies;
      (dependencies || []).forEach(function(dependency) {
        var dependencyNamePath = getNamePath(dependency);
        dependencies2fields.update(dependencyNamePath, function() {
          var fields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          fields.add(field);
          return fields;
        });
      });
    });
    var fillChildren = function fillChildren2(namePath) {
      var fields = dependencies2fields.get(namePath) || /* @__PURE__ */ new Set();
      fields.forEach(function(field) {
        if (!children.has(field)) {
          children.add(field);
          var fieldNamePath = field.getNamePath();
          if (field.isFieldDirty() && fieldNamePath.length) {
            childrenFields.push(fieldNamePath);
            fillChildren2(fieldNamePath);
          }
        }
      });
    };
    fillChildren(rootNamePath);
    return childrenFields;
  };
  this.triggerOnFieldsChange = function(namePathList, filedErrors) {
    var onFieldsChange = _this2.callbacks.onFieldsChange;
    if (onFieldsChange) {
      var fields = _this2.getFields();
      if (filedErrors) {
        var cache = new NameMap();
        filedErrors.forEach(function(_ref4) {
          var name = _ref4.name, errors = _ref4.errors;
          cache.set(name, errors);
        });
        fields.forEach(function(field) {
          field.errors = cache.get(field.name) || field.errors;
        });
      }
      var changedFields = fields.filter(function(_ref5) {
        var fieldName = _ref5.name;
        return containsNamePath(namePathList, fieldName);
      });
      onFieldsChange(changedFields, fields);
    }
  };
  this.validateFields = function(nameList, options) {
    _this2.warningUnhooked();
    var provideNameList = !!nameList;
    var namePathList = provideNameList ? nameList.map(getNamePath) : [];
    var promiseList = [];
    _this2.getFieldEntities(true).forEach(function(field) {
      if (!provideNameList) {
        namePathList.push(field.getNamePath());
      }
      if ((options === null || options === void 0 ? void 0 : options.recursive) && provideNameList) {
        var namePath = field.getNamePath();
        if (
          // nameList[i] === undefined 说明是以 nameList 开头的
          // ['name'] -> ['name','list']
          namePath.every(function(nameUnit, i) {
            return nameList[i] === nameUnit || nameList[i] === void 0;
          })
        ) {
          namePathList.push(namePath);
        }
      }
      if (!field.props.rules || !field.props.rules.length) {
        return;
      }
      var fieldNamePath = field.getNamePath();
      if (!provideNameList || containsNamePath(namePathList, fieldNamePath)) {
        var promise = field.validateRules(_objectSpread2$3({
          validateMessages: _objectSpread2$3(_objectSpread2$3({}, defaultValidateMessages), _this2.validateMessages)
        }, options));
        promiseList.push(promise.then(function() {
          return {
            name: fieldNamePath,
            errors: [],
            warnings: []
          };
        }).catch(function(ruleErrors) {
          var _ruleErrors$forEach;
          var mergedErrors = [];
          var mergedWarnings = [];
          (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 ? void 0 : _ruleErrors$forEach.call(ruleErrors, function(_ref6) {
            var warningOnly = _ref6.rule.warningOnly, errors = _ref6.errors;
            if (warningOnly) {
              mergedWarnings.push.apply(mergedWarnings, _toConsumableArray$2(errors));
            } else {
              mergedErrors.push.apply(mergedErrors, _toConsumableArray$2(errors));
            }
          });
          if (mergedErrors.length) {
            return Promise.reject({
              name: fieldNamePath,
              errors: mergedErrors,
              warnings: mergedWarnings
            });
          }
          return {
            name: fieldNamePath,
            errors: mergedErrors,
            warnings: mergedWarnings
          };
        }));
      }
    });
    var summaryPromise = allPromiseFinish(promiseList);
    _this2.lastValidatePromise = summaryPromise;
    summaryPromise.catch(function(results) {
      return results;
    }).then(function(results) {
      var resultNamePathList = results.map(function(_ref7) {
        var name = _ref7.name;
        return name;
      });
      _this2.notifyObservers(_this2.store, resultNamePathList, {
        type: "validateFinish"
      });
      _this2.triggerOnFieldsChange(resultNamePathList, results);
    });
    var returnPromise = summaryPromise.then(function() {
      if (_this2.lastValidatePromise === summaryPromise) {
        return Promise.resolve(_this2.getFieldsValue(namePathList));
      }
      return Promise.reject([]);
    }).catch(function(results) {
      var errorList = results.filter(function(result) {
        return result && result.errors.length;
      });
      return Promise.reject({
        values: _this2.getFieldsValue(namePathList),
        errorFields: errorList,
        outOfDate: _this2.lastValidatePromise !== summaryPromise
      });
    });
    returnPromise.catch(function(e) {
      return e;
    });
    return returnPromise;
  };
  this.submit = function() {
    _this2.warningUnhooked();
    _this2.validateFields().then(function(values) {
      var onFinish = _this2.callbacks.onFinish;
      if (onFinish) {
        try {
          onFinish(values);
        } catch (err) {
          console.error(err);
        }
      }
    }).catch(function(e) {
      var onFinishFailed = _this2.callbacks.onFinishFailed;
      if (onFinishFailed) {
        onFinishFailed(e);
      }
    });
  };
  this.forceRootUpdate = forceRootUpdate;
});
function useForm(form) {
  var formRef = React.useRef();
  var _React$useState = React.useState({}), _React$useState2 = _slicedToArray$3(_React$useState, 2), forceUpdate = _React$useState2[1];
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      var forceReRender = function forceReRender2() {
        forceUpdate({});
      };
      var formStore = new FormStore(forceReRender);
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
var FormContext = /* @__PURE__ */ React.createContext({
  triggerFormChange: function triggerFormChange() {
  },
  triggerFormFinish: function triggerFormFinish() {
  },
  registerForm: function registerForm() {
  },
  unregisterForm: function unregisterForm() {
  }
});
var FormProvider = function FormProvider2(_ref) {
  var validateMessages = _ref.validateMessages, onFormChange = _ref.onFormChange, onFormFinish = _ref.onFormFinish, children = _ref.children;
  var formContext = React.useContext(FormContext);
  var formsRef = React.useRef({});
  return /* @__PURE__ */ React.createElement(FormContext.Provider, {
    value: _objectSpread2$3(_objectSpread2$3({}, formContext), {}, {
      validateMessages: _objectSpread2$3(_objectSpread2$3({}, formContext.validateMessages), validateMessages),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function triggerFormChange2(name, changedFields) {
        if (onFormChange) {
          onFormChange(name, {
            changedFields,
            forms: formsRef.current
          });
        }
        formContext.triggerFormChange(name, changedFields);
      },
      triggerFormFinish: function triggerFormFinish2(name, values) {
        if (onFormFinish) {
          onFormFinish(name, {
            values,
            forms: formsRef.current
          });
        }
        formContext.triggerFormFinish(name, values);
      },
      registerForm: function registerForm2(name, form) {
        if (name) {
          formsRef.current = _objectSpread2$3(_objectSpread2$3({}, formsRef.current), {}, _defineProperty$4({}, name, form));
        }
        formContext.registerForm(name, form);
      },
      unregisterForm: function unregisterForm2(name) {
        var newForms = _objectSpread2$3({}, formsRef.current);
        delete newForms[name];
        formsRef.current = newForms;
        formContext.unregisterForm(name);
      }
    })
  }, children);
};
var _excluded$4 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"];
var Form = function Form2(_ref, ref2) {
  var name = _ref.name, initialValues = _ref.initialValues, fields = _ref.fields, form = _ref.form, preserve = _ref.preserve, children = _ref.children, _ref$component = _ref.component, Component2 = _ref$component === void 0 ? "form" : _ref$component, validateMessages = _ref.validateMessages, _ref$validateTrigger = _ref.validateTrigger, validateTrigger = _ref$validateTrigger === void 0 ? "onChange" : _ref$validateTrigger, onValuesChange = _ref.onValuesChange, _onFieldsChange = _ref.onFieldsChange, _onFinish = _ref.onFinish, onFinishFailed = _ref.onFinishFailed, restProps = _objectWithoutProperties$1(_ref, _excluded$4);
  var formContext = React.useContext(FormContext);
  var _useForm = useForm(form), _useForm2 = _slicedToArray$3(_useForm, 1), formInstance = _useForm2[0];
  var _formInstance$getInte = formInstance.getInternalHooks(HOOK_MARK), useSubscribe = _formInstance$getInte.useSubscribe, setInitialValues = _formInstance$getInte.setInitialValues, setCallbacks = _formInstance$getInte.setCallbacks, setValidateMessages = _formInstance$getInte.setValidateMessages, setPreserve = _formInstance$getInte.setPreserve, destroyForm = _formInstance$getInte.destroyForm;
  React.useImperativeHandle(ref2, function() {
    return formInstance;
  });
  React.useEffect(function() {
    formContext.registerForm(name, formInstance);
    return function() {
      formContext.unregisterForm(name);
    };
  }, [formContext, formInstance, name]);
  setValidateMessages(_objectSpread2$3(_objectSpread2$3({}, formContext.validateMessages), validateMessages));
  setCallbacks({
    onValuesChange,
    onFieldsChange: function onFieldsChange(changedFields) {
      formContext.triggerFormChange(name, changedFields);
      if (_onFieldsChange) {
        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }
        _onFieldsChange.apply(void 0, [changedFields].concat(rest));
      }
    },
    onFinish: function onFinish(values2) {
      formContext.triggerFormFinish(name, values2);
      if (_onFinish) {
        _onFinish(values2);
      }
    },
    onFinishFailed
  });
  setPreserve(preserve);
  var mountRef = React.useRef(null);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }
  React.useEffect(
    function() {
      return destroyForm;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var childrenNode;
  var childrenRenderProps = typeof children === "function";
  if (childrenRenderProps) {
    var values = formInstance.getFieldsValue(true);
    childrenNode = children(values, formInstance);
  } else {
    childrenNode = children;
  }
  useSubscribe(!childrenRenderProps);
  var prevFieldsRef = React.useRef();
  React.useEffect(function() {
    if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
      formInstance.setFields(fields || []);
    }
    prevFieldsRef.current = fields;
  }, [fields, formInstance]);
  var formContextValue = React.useMemo(function() {
    return _objectSpread2$3(_objectSpread2$3({}, formInstance), {}, {
      validateTrigger
    });
  }, [formInstance, validateTrigger]);
  var wrapperNode = /* @__PURE__ */ React.createElement(Context$1.Provider, {
    value: formContextValue
  }, childrenNode);
  if (Component2 === false) {
    return wrapperNode;
  }
  return /* @__PURE__ */ React.createElement(Component2, _extends$2({}, restProps, {
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      formInstance.submit();
    },
    onReset: function onReset(event) {
      var _restProps$onReset;
      event.preventDefault();
      formInstance.resetFields();
      (_restProps$onReset = restProps.onReset) === null || _restProps$onReset === void 0 ? void 0 : _restProps$onReset.call(restProps, event);
    }
  }), wrapperNode);
};
function stringify$1(value2) {
  try {
    return JSON.stringify(value2);
  } catch (err) {
    return Math.random();
  }
}
var useWatchWarning = process.env.NODE_ENV !== "production" ? function(namePath) {
  var fullyStr = namePath.join("__RC_FIELD_FORM_SPLIT__");
  var nameStrRef = useRef(fullyStr);
  warningOnce$1(nameStrRef.current === fullyStr, "`useWatch` is not support dynamic `namePath`. Please provide static instead.");
} : function() {
};
function useWatch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _args$ = args[0], dependencies = _args$ === void 0 ? [] : _args$, form = args[1];
  var _useState = useState(), _useState2 = _slicedToArray$3(_useState, 2), value2 = _useState2[0], setValue2 = _useState2[1];
  var valueStr = useMemo$1(function() {
    return stringify$1(value2);
  }, [value2]);
  var valueStrRef = useRef(valueStr);
  valueStrRef.current = valueStr;
  var fieldContext = useContext(Context$1);
  var formInstance = form || fieldContext;
  var isValidForm = formInstance && formInstance._init;
  if (process.env.NODE_ENV !== "production") {
    warningOnce$1(args.length === 2 ? form ? isValidForm : true : isValidForm, "useWatch requires a form instance since it can not auto detect from context.");
  }
  var namePath = getNamePath(dependencies);
  var namePathRef = useRef(namePath);
  namePathRef.current = namePath;
  useWatchWarning(namePath);
  useEffect(
    function() {
      if (!isValidForm) {
        return;
      }
      var getFieldsValue = formInstance.getFieldsValue, getInternalHooks2 = formInstance.getInternalHooks;
      var _getInternalHooks = getInternalHooks2(HOOK_MARK), registerWatch = _getInternalHooks.registerWatch;
      var cancelRegister = registerWatch(function(store) {
        var newValue = getValue$2(store, namePathRef.current);
        var nextValueStr = stringify$1(newValue);
        if (valueStrRef.current !== nextValueStr) {
          valueStrRef.current = nextValueStr;
          setValue2(newValue);
        }
      });
      var initialValue = getValue$2(getFieldsValue(), namePathRef.current);
      setValue2(initialValue);
      return cancelRegister;
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValidForm]
  );
  return value2;
}
var InternalForm = /* @__PURE__ */ React.forwardRef(Form);
var RefForm = InternalForm;
RefForm.FormProvider = FormProvider;
RefForm.Field = WrapperField;
RefForm.List = List;
RefForm.useForm = useForm;
RefForm.useWatch = useWatch;
function noop$2() {
}
var warning$2 = noop$2;
if (process.env.NODE_ENV !== "production") {
  warning$2 = function warning3(valid, component, message) {
    warningOnce$1(valid, "[antd: " + component + "] " + message);
    if (process.env.NODE_ENV === "test") {
      resetWarned$1();
    }
  };
}
const warning$3 = warning$2;
const enUS$1 = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "Page",
  // Pagination.jsx
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages",
  page_size: "Page Size"
};
var locale$2 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "OK",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
var locale$1 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const TimePicker = locale$1;
var locale = {
  lang: _extends$2({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, locale$2),
  timePickerLocale: _extends$2({}, TimePicker)
};
const enUS = locale;
var typeTemplate = "${label} is not a valid ${type}";
var localeValues = {
  locale: "en",
  Pagination: enUS$1,
  DatePicker: enUS,
  TimePicker,
  Calendar: enUS,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      "default": "Field validation error for ${label}",
      required: "Please enter ${label}",
      "enum": "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        "boolean": typeTemplate,
        integer: typeTemplate,
        "float": typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  }
};
const defaultLocale = localeValues;
var LocaleContext = /* @__PURE__ */ createContext(void 0);
const LocaleContext$1 = LocaleContext;
var LocaleReceiver = function LocaleReceiver2(props) {
  var _props$componentName = props.componentName, componentName = _props$componentName === void 0 ? "global" : _props$componentName, defaultLocale$1 = props.defaultLocale, children = props.children;
  var antLocale = React.useContext(LocaleContext$1);
  var getLocale = React.useMemo(function() {
    var _a;
    var locale2 = defaultLocale$1 || defaultLocale[componentName];
    var localeFromContext = (_a = antLocale === null || antLocale === void 0 ? void 0 : antLocale[componentName]) !== null && _a !== void 0 ? _a : {};
    return _extends$2(_extends$2({}, locale2 instanceof Function ? locale2() : locale2), localeFromContext || {});
  }, [componentName, defaultLocale$1, antLocale]);
  var getLocaleCode = React.useMemo(function() {
    var localeCode = antLocale && antLocale.locale;
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocale.locale;
    }
    return localeCode;
  }, [antLocale]);
  return children(getLocale, getLocaleCode, antLocale);
};
const LocaleReceiver$1 = LocaleReceiver;
const version = "5.0.0";
var PresetColors = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = "100%";
  }
  var isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
  } else {
    n = n % max / parseFloat(String(max));
  }
  return n;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }
  return n;
}
function pad2(c) {
  return c.length === 1 ? "0" + c : String(c);
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h2 = 0;
  var s = 0;
  var l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h2 = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s, l };
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * (6 * t);
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h2, s, l) {
  var r;
  var g;
  var b;
  h2 = bound01(h2, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  if (s === 0) {
    g = l;
    b = l;
    r = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h2 + 1 / 3);
    g = hue2rgb(p, q, h2);
    b = hue2rgb(p, q, h2 - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h2 = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  if (max === min) {
    h2 = 0;
  } else {
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s, v };
}
function hsvToRgb(h2, s, v) {
  h2 = bound01(h2, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h2);
  var f = h2 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex2 = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex2[0].startsWith(hex2[0].charAt(1)) && hex2[1].startsWith(hex2[1].charAt(1)) && hex2[2].startsWith(hex2[2].charAt(1))) {
    return hex2[0].charAt(0) + hex2[1].charAt(0) + hex2[2].charAt(0);
  }
  return hex2.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex2 = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex2[0].startsWith(hex2[0].charAt(1)) && hex2[1].startsWith(hex2[1].charAt(1)) && hex2[2].startsWith(hex2[2].charAt(1)) && hex2[3].startsWith(hex2[3].charAt(1))) {
    return hex2[0].charAt(0) + hex2[1].charAt(0) + hex2[2].charAt(0) + hex2[3].charAt(0);
  }
  return hex2.join("");
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format2 = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format2 = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format2 = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format2 = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format2,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match2 = matchers.rgb.exec(color);
  if (match2) {
    return { r: match2[1], g: match2[2], b: match2[3] };
  }
  match2 = matchers.rgba.exec(color);
  if (match2) {
    return { r: match2[1], g: match2[2], b: match2[3], a: match2[4] };
  }
  match2 = matchers.hsl.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], l: match2[3] };
  }
  match2 = matchers.hsla.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], l: match2[3], a: match2[4] };
  }
  match2 = matchers.hsv.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], v: match2[3] };
  }
  match2 = matchers.hsva.exec(color);
  if (match2) {
    return { h: match2[1], s: match2[2], v: match2[3], a: match2[4] };
  }
  match2 = matchers.hex8.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1]),
      g: parseIntFromHex(match2[2]),
      b: parseIntFromHex(match2[3]),
      a: convertHexToDecimal(match2[4]),
      format: named ? "name" : "hex8"
    };
  }
  match2 = matchers.hex6.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1]),
      g: parseIntFromHex(match2[2]),
      b: parseIntFromHex(match2[3]),
      format: named ? "name" : "hex"
    };
  }
  match2 = matchers.hex4.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1] + match2[1]),
      g: parseIntFromHex(match2[2] + match2[2]),
      b: parseIntFromHex(match2[3] + match2[3]),
      a: convertHexToDecimal(match2[4] + match2[4]),
      format: named ? "name" : "hex8"
    };
  }
  match2 = matchers.hex3.exec(color);
  if (match2) {
    return {
      r: parseIntFromHex(match2[1] + match2[1]),
      g: parseIntFromHex(match2[2] + match2[2]),
      b: parseIntFromHex(match2[3] + match2[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var TinyColor = (
  /** @class */
  function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R;
      var G;
      var B;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R = RsRGB / 12.92;
      } else {
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B = BsRGB / 12.92;
      } else {
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.isMonochrome = function() {
      var s = this.toHsl().s;
      return s === 0;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h2 = Math.round(hsv.h * 360);
      var s = Math.round(hsv.s * 100);
      var v = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h2, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h2 = Math.round(hsl.h * 360);
      var s = Math.round(hsl.s * 100);
      var l = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h2, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toHexShortString = function(allowShortChar) {
      if (allowShortChar === void 0) {
        allowShortChar = false;
      }
      return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r = Math.round(this.r);
      var g = Math.round(this.g);
      var b = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x) {
        return "".concat(Math.round(bound01(x, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x) {
        return Math.round(bound01(x, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex2 = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value2 = _b[1];
        if (hex2 === value2) {
          return key;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format2) {
      var formatSet = Boolean(format2);
      format2 = format2 !== null && format2 !== void 0 ? format2 : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format2.startsWith("hex") || format2 === "name");
      if (needsAlphaFormat) {
        if (format2 === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format2 === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format2 === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format2 === "hex" || format2 === "hex6") {
        formattedString = this.toHexString();
      }
      if (format2 === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format2 === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format2 === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format2 === "name") {
        formattedString = this.toName();
      }
      if (format2 === "hsl") {
        formattedString = this.toHslString();
      }
      if (format2 === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h2 = hsv.h;
      var s = hsv.s;
      var v = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h: h2, s, v }));
        v = (v + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      var alpha = fg.a + bg.a * (1 - fg.a);
      return new TinyColor2({
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n) {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      var result = [this];
      var increment = 360 / n;
      for (var i = 1; i < n; i++) {
        result.push(new TinyColor2({ h: (h2 + i * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  }()
);
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function toHsv(_ref) {
  var r = _ref.r, g = _ref.g, b = _ref.b;
  var hsv = rgbToHsv(r, g, b);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
}
function toHex(_ref2) {
  var r = _ref2.r, g = _ref2.g, b = _ref2.b;
  return "#".concat(rgbToHex(r, g, b, false));
}
function mix$1(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}
function getHue(hsv, i, light) {
  var hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}
function getValue$1(hsv, i, light) {
  var value2;
  if (light) {
    value2 = hsv.v + brightnessStep1 * i;
  } else {
    value2 = hsv.v - brightnessStep2 * i;
  }
  if (value2 > 1) {
    value2 = 1;
  }
  return Number(value2.toFixed(2));
}
function generate$1(color) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var patterns = [];
  var pColor = inputToRGB(color);
  for (var i = lightColorCount; i > 0; i -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex(inputToRGB({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue$1(hsv, i, true)
    }));
    patterns.push(colorString);
  }
  patterns.push(toHex(pColor));
  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = toHsv(pColor);
    var _colorString = toHex(inputToRGB({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: getValue$1(_hsv, _i)
    }));
    patterns.push(_colorString);
  }
  if (opts.theme === "dark") {
    return darkColorMap.map(function(_ref3) {
      var index2 = _ref3.index, opacity = _ref3.opacity;
      var darkColorString = toHex(mix$1(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index2]), opacity * 100));
      return darkColorString;
    });
  }
  return patterns;
}
var presetPrimaryColors = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function(key) {
  presetPalettes[key] = generate$1(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5];
  presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
    theme: "dark",
    backgroundColor: "#141414"
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});
var genControlHeight = function genControlHeight2(token2) {
  var controlHeight = token2.controlHeight;
  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25
  };
};
const genControlHeight$1 = genControlHeight;
function genSizeMapToken(token2) {
  var sizeUnit = token2.sizeUnit, sizeStep = token2.sizeStep;
  return {
    sizeXXL: sizeUnit * (sizeStep + 8),
    sizeXL: sizeUnit * (sizeStep + 4),
    sizeLG: sizeUnit * (sizeStep + 2),
    sizeMD: sizeUnit * (sizeStep + 1),
    sizeMS: sizeUnit * sizeStep,
    size: sizeUnit * sizeStep,
    sizeSM: sizeUnit * (sizeStep - 1),
    sizeXS: sizeUnit * (sizeStep - 2),
    sizeXXS: sizeUnit * (sizeStep - 3)
    // 4
  };
}
var defaultPresetColors = {
  blue: "#1677ff",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  pink: "#eb2f96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
};
var seedToken = _extends$2(_extends$2({}, defaultPresetColors), {
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#f5222d",
  colorInfo: "#1677ff",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji'",
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: false
});
const defaultSeedToken = seedToken;
function genColorMapToken(seed, _ref) {
  var generateColorPalettes3 = _ref.generateColorPalettes, generateNeutralColorPalettes3 = _ref.generateNeutralColorPalettes;
  var colorSuccessBase = seed.colorSuccess, colorWarningBase = seed.colorWarning, colorErrorBase = seed.colorError, colorInfoBase = seed.colorInfo, colorPrimaryBase = seed.colorPrimary, colorBgBase = seed.colorBgBase, colorTextBase = seed.colorTextBase;
  var primaryColors = generateColorPalettes3(colorPrimaryBase);
  var successColors = generateColorPalettes3(colorSuccessBase);
  var warningColors = generateColorPalettes3(colorWarningBase);
  var errorColors = generateColorPalettes3(colorErrorBase);
  var infoColors = generateColorPalettes3(colorInfoBase);
  var neutralColors = generateNeutralColorPalettes3(colorBgBase, colorTextBase);
  return _extends$2(_extends$2({}, neutralColors), {
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],
    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[4],
    colorError: errorColors[5],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],
    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],
    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],
    colorBgMask: new TinyColor("#000").setAlpha(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
function getFontSizes(base) {
  var fontSizes = new Array(10).fill(null).map(function(_, index2) {
    var i = index2 - 1;
    var baseSize = base * Math.pow(2.71828, i / 5);
    var intSize = index2 > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
    return Math.floor(intSize / 2) * 2;
  });
  fontSizes[1] = base;
  return fontSizes.map(function(size) {
    var height = size + 8;
    return {
      size,
      lineHeight: height / size
    };
  });
}
var genRadius = function genRadius2(radiusBase) {
  var radiusLG = radiusBase;
  var radiusSM = radiusBase;
  var radiusXS = radiusBase;
  var radiusOuter = radiusBase;
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  if (radiusBase > 4 && radiusBase < 8) {
    radiusOuter = 4;
  } else if (radiusBase >= 8) {
    radiusOuter = 6;
  }
  return {
    borderRadius: radiusBase > 16 ? 16 : radiusBase,
    borderRadiusXS: radiusXS,
    borderRadiusSM: radiusSM,
    borderRadiusLG: radiusLG,
    borderRadiusOuter: radiusOuter
  };
};
const genRadius$1 = genRadius;
function genCommonMapToken(token2) {
  var motionUnit = token2.motionUnit, motionBase = token2.motionBase, fontSize = token2.fontSize, borderRadius = token2.borderRadius, lineWidth = token2.lineWidth;
  var fontSizes = getFontSizes(fontSize);
  return _extends$2({
    // motion
    motionDurationFast: (motionBase + motionUnit).toFixed(1) + "s",
    motionDurationMid: (motionBase + motionUnit * 2).toFixed(1) + "s",
    motionDurationSlow: (motionBase + motionUnit * 3).toFixed(1) + "s",
    // font
    fontSizes: fontSizes.map(function(fs) {
      return fs.size;
    }),
    lineHeights: fontSizes.map(function(fs) {
      return fs.lineHeight;
    }),
    // line
    lineWidthBold: lineWidth + 1
  }, genRadius$1(borderRadius));
}
var getAlphaColor$1 = function getAlphaColor(baseColor, alpha) {
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString();
};
var getSolidColor = function getSolidColor2(baseColor, brightness) {
  var instance = new TinyColor(baseColor);
  return instance.darken(brightness).toHexString();
};
var generateColorPalettes = function generateColorPalettes2(baseColor) {
  var colors = generate$1(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
};
var generateNeutralColorPalettes = function generateNeutralColorPalettes2(bgBaseColor, textBaseColor) {
  var colorBgBase = bgBaseColor || "#fff";
  var colorTextBase = textBaseColor || "#000";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor$1(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor$1(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor$1(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor$1(colorTextBase, 0.25),
    colorFill: getAlphaColor$1(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor$1(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor$1(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor$1(colorTextBase, 0.02),
    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor$1(colorTextBase, 0.85),
    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6)
  };
};
function derivative(token2) {
  var colorPalettes = Object.keys(defaultPresetColors).map(function(colorKey) {
    var colors = generate$1(token2[colorKey]);
    return new Array(10).fill(1).reduce(function(prev2, _, i) {
      prev2[colorKey + "-" + (i + 1)] = colors[i];
      return prev2;
    }, {});
  }).reduce(function(prev2, cur) {
    prev2 = _extends$2(_extends$2({}, prev2), cur);
    return prev2;
  }, {});
  return _extends$2(_extends$2(_extends$2(_extends$2(_extends$2(_extends$2({}, token2), colorPalettes), genColorMapToken(token2, {
    generateColorPalettes,
    generateNeutralColorPalettes
  })), genSizeMapToken(token2)), genControlHeight$1(token2)), genCommonMapToken(token2));
}
function isStableColor(color) {
  return color >= 0 && color <= 255;
}
function getAlphaColor2(frontColor, backgroundColor) {
  var _TinyColor$toRgb = new TinyColor(frontColor).toRgb(), fR = _TinyColor$toRgb.r, fG = _TinyColor$toRgb.g, fB = _TinyColor$toRgb.b, originAlpha = _TinyColor$toRgb.a;
  if (originAlpha < 1) {
    return frontColor;
  }
  var _TinyColor$toRgb2 = new TinyColor(backgroundColor).toRgb(), bR = _TinyColor$toRgb2.r, bG = _TinyColor$toRgb2.g, bB = _TinyColor$toRgb2.b;
  for (var fA = 0.01; fA <= 1; fA += 0.01) {
    var r = Math.round((fR - bR * (1 - fA)) / fA);
    var g = Math.round((fG - bG * (1 - fA)) / fA);
    var b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r) && isStableColor(g) && isStableColor(b))
      return new TinyColor({
        r,
        g,
        b,
        a: Math.round(fA * 100) / 100
      }).toRgbString();
  }
  return new TinyColor({
    r: fR,
    g: fG,
    b: fB,
    a: 1
  }).toRgbString();
}
var __rest$8 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function formatToken(derivativeToken) {
  var override = derivativeToken.override, restToken = __rest$8(derivativeToken, ["override"]);
  var overrideTokens = _extends$2({}, override);
  Object.keys(defaultSeedToken).forEach(function(token2) {
    delete overrideTokens[token2];
  });
  var mergedToken = _extends$2(_extends$2({}, restToken), overrideTokens);
  var fontSizes = mergedToken.fontSizes, lineHeights = mergedToken.lineHeights;
  var screenXS = 480;
  var screenSM = 576;
  var screenMD = 768;
  var screenLG = 992;
  var screenXL = 1200;
  var screenXXL = 1600;
  var fontSizeSM = fontSizes[0];
  var aliasToken = _extends$2(_extends$2(_extends$2({}, mergedToken), {
    colorLink: mergedToken.colorInfoText,
    colorLinkHover: mergedToken.colorInfoHover,
    colorLinkActive: mergedToken.colorInfoActive,
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor2(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorTextLightSolid: mergedToken.colorWhite,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,
    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,
    colorErrorOutline: getAlphaColor2(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
    colorWarningOutline: getAlphaColor2(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
    // Font
    fontSizeSM,
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    fontSizeIcon: fontSizeSM,
    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],
    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2],
    // Control
    lineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,
    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorFill,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: getAlphaColor2(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
    lineType: mergedToken.lineType,
    borderRadius: mergedToken.borderRadius,
    borderRadiusXS: mergedToken.borderRadiusXS,
    borderRadiusSM: mergedToken.borderRadiusSM,
    borderRadiusLG: mergedToken.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,
    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,
    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
    boxShadow: "\n      0 1px 2px 0 rgba(0, 0, 0, 0.03),\n      0 1px 6px -1px rgba(0, 0, 0, 0.02),\n      0 2px 4px 0 rgba(0, 0, 0, 0.02)\n    ",
    boxShadowSecondary: "\n      0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ",
    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenXS - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenSM - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenMD - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenLG - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXL - 1,
    // FIXME: component box-shadow, should be removed
    boxShadowPopoverArrow: "3px 3px 7px rgba(0, 0, 0, 0.1)",
    boxShadowCard: "\n      0 1px 2px -2px " + new TinyColor("rgba(0, 0, 0, 0.16)").toRgbString() + ",\n      0 3px 6px 0 " + new TinyColor("rgba(0, 0, 0, 0.12)").toRgbString() + ",\n      0 5px 12px 4px " + new TinyColor("rgba(0, 0, 0, 0.09)").toRgbString() + "\n    ",
    boxShadowDrawerRight: "\n      -6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      -3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      -9px 0 28px 8px rgba(0, 0, 0, 0.05)\n    ",
    boxShadowDrawerLeft: "\n      6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      9px 0 28px 8px rgba(0, 0, 0, 0.05)\n    ",
    boxShadowDrawerUp: "\n      0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ",
    boxShadowDrawerDown: "\n      0 -6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 -3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 -9px 28px 8px rgba(0, 0, 0, 0.05)\n    ",
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
  }), overrideTokens);
  return aliasToken;
}
var roundedArrow = function roundedArrow2(width, innerRadius, outerRadius, bgColor, boxShadow) {
  var unitWidth = width / 2;
  var ax = unitWidth - outerRadius * (Math.sqrt(2) - 1);
  var ay = unitWidth;
  var bx = unitWidth + outerRadius * (1 - 1 / Math.sqrt(2));
  var by = unitWidth - outerRadius * (1 - 1 / Math.sqrt(2));
  var cx = 2 * unitWidth - innerRadius * (1 / Math.sqrt(2));
  var cy = innerRadius * (1 / Math.sqrt(2));
  var dx = 4 * unitWidth - cx;
  var dy = cy;
  var ex = 4 * unitWidth - bx;
  var ey = by;
  var fx = 4 * unitWidth - ax;
  var fy = ay;
  return {
    borderRadius: {
      _skip_check_: true,
      value: "0 0 " + innerRadius + "px"
    },
    pointerEvents: "none",
    width: width * 2,
    height: width * 2,
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      width: width / Math.sqrt(2),
      height: width / Math.sqrt(2),
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: "0 0 " + innerRadius + "px 0"
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    },
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width: width * 2,
      height: width / 2,
      background: bgColor,
      clipPath: "path('M " + ax + " " + ay + " A " + outerRadius + " " + outerRadius + " 0 0 0 " + bx + " " + by + " L " + cx + " " + cy + " A " + innerRadius + " " + innerRadius + " 0 0 1 " + dx + " " + dy + " L " + ex + " " + ey + " A " + outerRadius + " " + outerRadius + " 0 0 0 " + fx + " " + fy + " Z')",
      content: '""'
    }
  };
};
var resetComponent = function resetComponent2(token2) {
  return {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: token2.colorText,
    fontSize: token2.fontSize,
    // font-variant: @font-variant-base;
    lineHeight: token2.lineHeight,
    listStyle: "none",
    // font-feature-settings: @font-feature-settings-base;
    fontFamily: token2.fontFamily
  };
};
var genLinkStyle = function genLinkStyle2(token2) {
  var _a;
  return {
    a: (_a = {
      color: token2.colorLink,
      textDecoration: token2.linkDecoration,
      backgroundColor: "transparent",
      outline: "none",
      cursor: "pointer",
      transition: "color " + token2.motionDurationSlow,
      "-webkit-text-decoration-skip": "objects",
      "&:hover": {
        color: token2.colorLinkHover
      },
      "&:active": {
        color: token2.colorLinkActive
      }
    }, _defineProperty$4(_a, "&:active,\n  &:hover", {
      textDecoration: token2.linkHoverDecoration,
      outline: 0
    }), _defineProperty$4(_a, "&:focus", {
      textDecoration: token2.linkFocusDecoration,
      outline: 0
    }), _defineProperty$4(_a, "&[disabled]", {
      color: token2.colorTextDisabled,
      cursor: "not-allowed"
    }), _a)
  };
};
var genCommonStyle = function genCommonStyle2(token2, componentPrefixCls) {
  var fontFamily = token2.fontFamily, fontSize = token2.fontSize;
  var rootPrefixSelector = '[class^="' + componentPrefixCls + '"], [class*=" ' + componentPrefixCls + '"]';
  return _defineProperty$4({}, rootPrefixSelector, _defineProperty$4({
    fontFamily,
    fontSize,
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  }, rootPrefixSelector, {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  }));
};
var genFocusOutline = function genFocusOutline2(token2) {
  return {
    outline: token2.lineWidth * 4 + "px solid " + token2.colorPrimaryBorder,
    outlineOffset: 1,
    transition: "outline-offset 0s, outline 0s"
  };
};
var genFocusStyle = function genFocusStyle2(token2) {
  return {
    "&:focus-visible": _extends$2({}, genFocusOutline(token2))
  };
};
var defaultIconPrefixCls = "anticon";
var defaultGetPrefixCls = function defaultGetPrefixCls2(suffixCls, customizePrefixCls) {
  if (customizePrefixCls)
    return customizePrefixCls;
  return suffixCls ? "ant-" + suffixCls : "ant";
};
var ConfigContext = /* @__PURE__ */ React.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls
});
var ConfigConsumer = ConfigContext.Consumer;
function genComponentStyleHook(component, styleFn, getDefaultToken) {
  return function(prefixCls) {
    var _useToken = useToken(), _useToken2 = _slicedToArray$3(_useToken, 3), theme = _useToken2[0], token2 = _useToken2[1], hashId = _useToken2[2];
    var _useContext = useContext(ConfigContext), getPrefixCls = _useContext.getPrefixCls, iconPrefixCls = _useContext.iconPrefixCls;
    var rootPrefixCls = getPrefixCls();
    useStyleRegister({
      theme,
      token: token2,
      hashId,
      path: ["Shared", rootPrefixCls]
    }, function() {
      return [{
        // Link
        "&": genLinkStyle(token2)
      }];
    });
    return [useStyleRegister({
      theme,
      token: token2,
      hashId,
      path: [component, prefixCls, iconPrefixCls]
    }, function() {
      var _statisticToken = statisticToken(token2), proxyToken = _statisticToken.token, flush = _statisticToken.flush;
      var defaultComponentToken = typeof getDefaultToken === "function" ? getDefaultToken(proxyToken) : getDefaultToken;
      var mergedComponentToken = _extends$2(_extends$2({}, defaultComponentToken), token2[component]);
      var componentCls = "." + prefixCls;
      var mergedToken = merge(proxyToken, {
        componentCls,
        prefixCls,
        iconCls: "." + iconPrefixCls,
        antCls: "." + rootPrefixCls
      }, mergedComponentToken);
      var styleInterpolation = styleFn(mergedToken, {
        hashId,
        prefixCls,
        rootPrefixCls,
        iconPrefixCls,
        overrideComponentToken: token2[component]
      });
      flush(component, mergedComponentToken);
      return [genCommonStyle(token2, prefixCls), styleInterpolation];
    }), hashId];
  };
}
var enableStatistic = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC !== "undefined";
var recording = true;
function merge() {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }
  if (!enableStatistic) {
    return _extends$2.apply(void 0, [{}].concat(objs));
  }
  recording = false;
  var ret = {};
  objs.forEach(function(obj) {
    var keys = Object.keys(obj);
    keys.forEach(function(key) {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: function get2() {
          return obj[key];
        }
      });
    });
  });
  recording = true;
  return ret;
}
function noop$1() {
}
function statisticToken(token2) {
  var tokenKeys2;
  var proxy = token2;
  var flush = noop$1;
  if (enableStatistic) {
    tokenKeys2 = /* @__PURE__ */ new Set();
    proxy = new Proxy(token2, {
      get: function get2(obj, prop) {
        if (recording) {
          tokenKeys2.add(prop);
        }
        return obj[prop];
      }
    });
    flush = function flush2(componentName, componentToken) {
      ({
        global: Array.from(tokenKeys2),
        component: componentToken
      });
    };
  }
  return {
    token: proxy,
    keys: tokenKeys2,
    flush
  };
}
var defaultTheme = createTheme(derivative);
var defaultConfig = {
  token: defaultSeedToken,
  hashed: true
};
var DesignTokenContext = /* @__PURE__ */ React__default.createContext(defaultConfig);
var saltPrefix = process.env.NODE_ENV === "production" ? version : version + "-" + (/* @__PURE__ */ new Date()).getHours();
function useToken() {
  var _React$useContext = React__default.useContext(DesignTokenContext), rootDesignToken = _React$useContext.token, hashed = _React$useContext.hashed, theme = _React$useContext.theme, components = _React$useContext.components;
  var salt = saltPrefix + "-" + (hashed || "");
  var mergedTheme = theme || defaultTheme;
  var _useCacheToken = useCacheToken(mergedTheme, [defaultSeedToken, rootDesignToken], {
    salt,
    override: _extends$2({
      override: rootDesignToken
    }, components),
    formatToken
  }), _useCacheToken2 = _slicedToArray$3(_useCacheToken, 2), token2 = _useCacheToken2[0], hashId = _useCacheToken2[1];
  return [mergedTheme, token2, hashed ? hashId : ""];
}
var DisabledContext = /* @__PURE__ */ React.createContext(false);
const DisabledContext$1 = DisabledContext;
var SizeContext = /* @__PURE__ */ React.createContext(void 0);
const SizeContext$1 = SizeContext;
globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var raf = function raf2(callback) {
  return +setTimeout(callback, 16);
};
var caf = function caf2(num) {
  return clearTimeout(num);
};
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  raf = function raf3(callback) {
    return window.requestAnimationFrame(callback);
  };
  caf = function caf3(handle) {
    return window.cancelAnimationFrame(handle);
  };
}
var rafUUID = 0;
var rafIds = /* @__PURE__ */ new Map();
function cleanup(id2) {
  rafIds.delete(id2);
}
var wrapperRaf$1 = function wrapperRaf(callback) {
  var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  rafUUID += 1;
  var id2 = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id2);
      callback();
    } else {
      var realId = raf(function() {
        callRef(leftTimes - 1);
      });
      rafIds.set(id2, realId);
    }
  }
  callRef(times);
  return id2;
};
wrapperRaf$1.cancel = function(id2) {
  var realId = rafIds.get(id2);
  cleanup(id2);
  return caf(realId);
};
if (process.env.NODE_ENV !== "production") {
  wrapperRaf$1.ids = function() {
    return rafIds;
  };
}
function addEventListenerWrap(target, eventType, cb, option) {
  var callback = ReactDOM__default.unstable_batchedUpdates ? function run(e) {
    ReactDOM__default.unstable_batchedUpdates(cb, e);
  } : cb;
  if (target !== null && target !== void 0 && target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }
  return {
    remove: function remove() {
      if (target !== null && target !== void 0 && target.removeEventListener) {
        target.removeEventListener(eventType, callback, option);
      }
    }
  };
}
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$2(obj);
}
function _toPrimitive$1(input, hint) {
  if (_typeof$2(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$2(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return _typeof$2(key) === "symbol" ? key : String(key);
}
function _defineProperty$3(obj, key, value2) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value2,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value2;
  }
  return obj;
}
function ownKeys$2(object4, enumerableOnly) {
  var keys = Object.keys(object4);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object4);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object4, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit$2(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
var warned = {};
var preWarningFns = [];
var preMessage2 = function preMessage3(fn) {
  preWarningFns.push(fn);
};
function warning$1(valid, message) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "warning");
    }, message);
    if (finalMessage) {
      console.error("Warning: ".concat(finalMessage));
    }
  }
}
function note(valid, message) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "note");
    }, message);
    if (finalMessage) {
      console.warn("Note: ".concat(finalMessage));
    }
  }
}
function resetWarned() {
  warned = {};
}
function call(method4, valid, message) {
  if (!valid && !warned[message]) {
    method4(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning$1, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
warningOnce.preMessage = preMessage2;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function contains(root2, n) {
  if (!root2) {
    return false;
  }
  if (root2.contains) {
    return root2.contains(n);
  }
  var node2 = n;
  while (node2) {
    if (node2 === root2) {
      return true;
    }
    node2 = node2.parentNode;
  }
  return false;
}
var APPEND_ORDER = "data-rc-order";
var MARK_KEY = "rc-util-key";
var containerCache = /* @__PURE__ */ new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
  if (mark) {
    return mark.startsWith("data-") ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function(node2) {
    return node2.tagName === "STYLE";
  });
}
function injectCSS(css2) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom()) {
    return null;
  }
  var csp = option.csp, prepend = option.prepend;
  var styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
  if (csp !== null && csp !== void 0 && csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css2;
  var container = getContainer(option);
  var firstChild = container.firstChild;
  if (prepend) {
    if (prepend === "queue") {
      var existStyle = findStyles(container).filter(function(node2) {
        return ["prepend", "prependQueue"].includes(node2.getAttribute(APPEND_ORDER));
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var container = getContainer(option);
  return findStyles(container).find(function(node2) {
    return node2.getAttribute(getMark(option)) === key;
  });
}
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS("", option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS(css2, key) {
  var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var container = getContainer(option);
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css2) {
      existNode.innerHTML = css2;
    }
    return existNode;
  }
  var newNode = injectCSS(css2, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
function warning2(valid, message) {
  warningOnce(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return _typeof$2(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && (_typeof$2(target.icon) === "object" || typeof target.icon === "function");
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(attrs).reduce(function(acc, key) {
    var val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}
function generate(node2, key, rootProps) {
  if (!rootProps) {
    return /* @__PURE__ */ React__default.createElement(node2.tag, _objectSpread2$2({
      key
    }, normalizeAttrs(node2.attrs)), (node2.children || []).map(function(child, index2) {
      return generate(child, "".concat(key, "-").concat(node2.tag, "-").concat(index2));
    }));
  }
  return /* @__PURE__ */ React__default.createElement(node2.tag, _objectSpread2$2(_objectSpread2$2({
    key
  }, normalizeAttrs(node2.attrs)), rootProps), (node2.children || []).map(function(child, index2) {
    return generate(child, "".concat(key, "-").concat(node2.tag, "-").concat(index2));
  }));
}
function getSecondaryColor(primaryColor) {
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles2() {
  var styleStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : iconStyles;
  var _useContext = useContext(Context$2), csp = _useContext.csp;
  useEffect(function() {
    updateCSS(styleStr, "@ant-design-icons", {
      prepend: true,
      csp
    });
  }, []);
};
var _excluded$3 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
var twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return _objectSpread2$2({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props) {
  var icon = props.icon, className = props.className, onClick = props.onClick, style2 = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = _objectWithoutProperties(props, _excluded$3);
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  useInsertStyles();
  warning2(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!isIconDefinition(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === "function") {
    target = _objectSpread2$2(_objectSpread2$2({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return generate(target.icon, "svg-".concat(target.name), _objectSpread2$2({
    className,
    onClick,
    style: style2,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, restProps));
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
const ReactIcon = IconBase;
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$2(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return ReactIcon.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = ReactIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
var _excluded$2 = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
setTwoToneColor("#1890ff");
var Icon = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var _classNames;
  var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = _objectWithoutProperties(props, _excluded$2);
  var _React$useContext = React.useContext(Context$2), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
  var classString = classNames(rootClassName, prefixCls, (_classNames = {}, _defineProperty$3(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty$3(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), _classNames), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0;
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$2(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return /* @__PURE__ */ React.createElement("span", _objectSpread2$2(_objectSpread2$2({
    role: "img",
    "aria-label": icon.name
  }, restProps), {}, {
    ref: ref2,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), /* @__PURE__ */ React.createElement(ReactIcon, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = "AntdIcon";
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
const AntdIcon = Icon;
var CloseOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" } }] }, "name": "close", "theme": "outlined" };
const CloseOutlinedSvg = CloseOutlined$2;
var CloseOutlined = function CloseOutlined2(props, ref2) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2$2(_objectSpread2$2({}, props), {}, {
    ref: ref2,
    icon: CloseOutlinedSvg
  }));
};
CloseOutlined.displayName = "CloseOutlined";
const CloseOutlined$1 = /* @__PURE__ */ React.forwardRef(CloseOutlined);
var ExclamationCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "exclamation-circle", "theme": "filled" };
const ExclamationCircleFilledSvg = ExclamationCircleFilled$2;
var ExclamationCircleFilled = function ExclamationCircleFilled2(props, ref2) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2$2(_objectSpread2$2({}, props), {}, {
    ref: ref2,
    icon: ExclamationCircleFilledSvg
  }));
};
ExclamationCircleFilled.displayName = "ExclamationCircleFilled";
const ExclamationCircleFilled$1 = /* @__PURE__ */ React.forwardRef(ExclamationCircleFilled);
var Context = /* @__PURE__ */ React.createContext({});
var DomWrapper = /* @__PURE__ */ function(_React$Component) {
  _inherits$1(DomWrapper2, _React$Component);
  var _super = _createSuper(DomWrapper2);
  function DomWrapper2() {
    _classCallCheck$1(this, DomWrapper2);
    return _super.apply(this, arguments);
  }
  _createClass$1(DomWrapper2, [{
    key: "render",
    value: function render2() {
      return this.props.children;
    }
  }]);
  return DomWrapper2;
}(React.Component);
function useSafeState(defaultValue) {
  var destroyRef = React.useRef(false);
  var _React$useState = React.useState(defaultValue), _React$useState2 = _slicedToArray$3(_React$useState, 2), value2 = _React$useState2[0], setValue2 = _React$useState2[1];
  React.useEffect(function() {
    destroyRef.current = false;
    return function() {
      destroyRef.current = true;
    };
  }, []);
  function safeSetState(updater, ignoreDestroy) {
    if (ignoreDestroy && destroyRef.current) {
      return;
    }
    setValue2(updater);
  }
  return [value2, safeSetState];
}
var STATUS_NONE = "none";
var STATUS_APPEAR = "appear";
var STATUS_ENTER = "enter";
var STATUS_LEAVE = "leave";
var STEP_NONE = "none";
var STEP_PREPARE = "prepare";
var STEP_START = "start";
var STEP_ACTIVE = "active";
var STEP_ACTIVATED = "end";
var STEP_PREPARED = "prepared";
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit".concat(styleProp)] = "webkit".concat(eventName);
  prefixes["Moz".concat(styleProp)] = "moz".concat(eventName);
  prefixes["ms".concat(styleProp)] = "MS".concat(eventName);
  prefixes["O".concat(styleProp)] = "o".concat(eventName.toLowerCase());
  return prefixes;
}
function getVendorPrefixes(domSupport, win) {
  var prefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  };
  if (domSupport) {
    if (!("AnimationEvent" in win)) {
      delete prefixes.animationend.animation;
    }
    if (!("TransitionEvent" in win)) {
      delete prefixes.transitionend.transition;
    }
  }
  return prefixes;
}
var vendorPrefixes = getVendorPrefixes(canUseDom$1(), typeof window !== "undefined" ? window : {});
var style$1 = {};
if (canUseDom$1()) {
  var _document$createEleme = document.createElement("div");
  style$1 = _document$createEleme.style;
}
var prefixedEventNames = {};
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  }
  var prefixMap = vendorPrefixes[eventName];
  if (prefixMap) {
    var stylePropList = Object.keys(prefixMap);
    var len = stylePropList.length;
    for (var i = 0; i < len; i += 1) {
      var styleProp = stylePropList[i];
      if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style$1) {
        prefixedEventNames[eventName] = prefixMap[styleProp];
        return prefixedEventNames[eventName];
      }
    }
  }
  return "";
}
var internalAnimationEndName = getVendorPrefixedEventName("animationend");
var internalTransitionEndName = getVendorPrefixedEventName("transitionend");
var supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
var animationEndName = internalAnimationEndName || "animationend";
var transitionEndName = internalTransitionEndName || "transitionend";
function getTransitionName$2(transitionName, transitionType) {
  if (!transitionName)
    return null;
  if (_typeof$3(transitionName) === "object") {
    var type4 = transitionType.replace(/-\w/g, function(match2) {
      return match2[1].toUpperCase();
    });
    return transitionName[type4];
  }
  return "".concat(transitionName, "-").concat(transitionType);
}
const useDomMotionEvents = function(callback) {
  var cacheElementRef = useRef();
  var callbackRef = useRef(callback);
  callbackRef.current = callback;
  var onInternalMotionEnd = React.useCallback(function(event) {
    callbackRef.current(event);
  }, []);
  function removeMotionEvents(element) {
    if (element) {
      element.removeEventListener(transitionEndName, onInternalMotionEnd);
      element.removeEventListener(animationEndName, onInternalMotionEnd);
    }
  }
  function patchMotionEvents(element) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }
    if (element && element !== cacheElementRef.current) {
      element.addEventListener(transitionEndName, onInternalMotionEnd);
      element.addEventListener(animationEndName, onInternalMotionEnd);
      cacheElementRef.current = element;
    }
  }
  React.useEffect(function() {
    return function() {
      removeMotionEvents(cacheElementRef.current);
    };
  }, []);
  return [patchMotionEvents, removeMotionEvents];
};
var useIsomorphicLayoutEffect = canUseDom$1() ? useLayoutEffect$1 : useEffect;
const useNextFrame = function() {
  var nextFrameRef = React.useRef(null);
  function cancelNextFrame() {
    wrapperRaf$1.cancel(nextFrameRef.current);
  }
  function nextFrame(callback) {
    var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    cancelNextFrame();
    var nextFrameId = wrapperRaf$1(function() {
      if (delay <= 1) {
        callback({
          isCanceled: function isCanceled() {
            return nextFrameId !== nextFrameRef.current;
          }
        });
      } else {
        nextFrame(callback, delay - 1);
      }
    });
    nextFrameRef.current = nextFrameId;
  }
  React.useEffect(function() {
    return function() {
      cancelNextFrame();
    };
  }, []);
  return [nextFrame, cancelNextFrame];
};
var FULL_STEP_QUEUE = [STEP_PREPARE, STEP_START, STEP_ACTIVE, STEP_ACTIVATED];
var SIMPLE_STEP_QUEUE = [STEP_PREPARE, STEP_PREPARED];
var SkipStep = false;
var DoStep = true;
function isActive(step) {
  return step === STEP_ACTIVE || step === STEP_ACTIVATED;
}
const useStepQueue = function(status, prepareOnly, callback) {
  var _useState = useSafeState(STEP_NONE), _useState2 = _slicedToArray$3(_useState, 2), step = _useState2[0], setStep = _useState2[1];
  var _useNextFrame = useNextFrame(), _useNextFrame2 = _slicedToArray$3(_useNextFrame, 2), nextFrame = _useNextFrame2[0], cancelNextFrame = _useNextFrame2[1];
  function startQueue() {
    setStep(STEP_PREPARE, true);
  }
  var STEP_QUEUE = prepareOnly ? SIMPLE_STEP_QUEUE : FULL_STEP_QUEUE;
  useIsomorphicLayoutEffect(function() {
    if (step !== STEP_NONE && step !== STEP_ACTIVATED) {
      var index2 = STEP_QUEUE.indexOf(step);
      var nextStep = STEP_QUEUE[index2 + 1];
      var result = callback(step);
      if (result === SkipStep) {
        setStep(nextStep, true);
      } else if (nextStep) {
        nextFrame(function(info) {
          function doNext() {
            if (info.isCanceled())
              return;
            setStep(nextStep, true);
          }
          if (result === true) {
            doNext();
          } else {
            Promise.resolve(result).then(doNext);
          }
        });
      }
    }
  }, [status, step]);
  React.useEffect(function() {
    return function() {
      cancelNextFrame();
    };
  }, []);
  return [startQueue, step];
};
function useStatus(supportMotion, visible, getElement2, _ref) {
  var _ref$motionEnter = _ref.motionEnter, motionEnter = _ref$motionEnter === void 0 ? true : _ref$motionEnter, _ref$motionAppear = _ref.motionAppear, motionAppear = _ref$motionAppear === void 0 ? true : _ref$motionAppear, _ref$motionLeave = _ref.motionLeave, motionLeave = _ref$motionLeave === void 0 ? true : _ref$motionLeave, motionDeadline = _ref.motionDeadline, motionLeaveImmediately = _ref.motionLeaveImmediately, onAppearPrepare = _ref.onAppearPrepare, onEnterPrepare = _ref.onEnterPrepare, onLeavePrepare = _ref.onLeavePrepare, onAppearStart = _ref.onAppearStart, onEnterStart = _ref.onEnterStart, onLeaveStart = _ref.onLeaveStart, onAppearActive = _ref.onAppearActive, onEnterActive = _ref.onEnterActive, onLeaveActive = _ref.onLeaveActive, onAppearEnd = _ref.onAppearEnd, onEnterEnd = _ref.onEnterEnd, onLeaveEnd = _ref.onLeaveEnd, onVisibleChanged = _ref.onVisibleChanged;
  var _useState = useSafeState(), _useState2 = _slicedToArray$3(_useState, 2), asyncVisible = _useState2[0], setAsyncVisible = _useState2[1];
  var _useState3 = useSafeState(STATUS_NONE), _useState4 = _slicedToArray$3(_useState3, 2), status = _useState4[0], setStatus = _useState4[1];
  var _useState5 = useSafeState(null), _useState6 = _slicedToArray$3(_useState5, 2), style2 = _useState6[0], setStyle = _useState6[1];
  var mountedRef = useRef(false);
  var deadlineRef = useRef(null);
  function getDomElement() {
    return getElement2();
  }
  var activeRef = useRef(false);
  function updateMotionEndStatus() {
    setStatus(STATUS_NONE, true);
    setStyle(null, true);
  }
  function onInternalMotionEnd(event) {
    var element = getDomElement();
    if (event && !event.deadline && event.target !== element) {
      return;
    }
    var currentActive = activeRef.current;
    var canEnd;
    if (status === STATUS_APPEAR && currentActive) {
      canEnd = onAppearEnd === null || onAppearEnd === void 0 ? void 0 : onAppearEnd(element, event);
    } else if (status === STATUS_ENTER && currentActive) {
      canEnd = onEnterEnd === null || onEnterEnd === void 0 ? void 0 : onEnterEnd(element, event);
    } else if (status === STATUS_LEAVE && currentActive) {
      canEnd = onLeaveEnd === null || onLeaveEnd === void 0 ? void 0 : onLeaveEnd(element, event);
    }
    if (status !== STATUS_NONE && currentActive && canEnd !== false) {
      updateMotionEndStatus();
    }
  }
  var _useDomMotionEvents = useDomMotionEvents(onInternalMotionEnd), _useDomMotionEvents2 = _slicedToArray$3(_useDomMotionEvents, 1), patchMotionEvents = _useDomMotionEvents2[0];
  var getEventHandlers = function getEventHandlers2(targetStatus) {
    var _ref2, _ref3, _ref4;
    switch (targetStatus) {
      case STATUS_APPEAR:
        return _ref2 = {}, _defineProperty$4(_ref2, STEP_PREPARE, onAppearPrepare), _defineProperty$4(_ref2, STEP_START, onAppearStart), _defineProperty$4(_ref2, STEP_ACTIVE, onAppearActive), _ref2;
      case STATUS_ENTER:
        return _ref3 = {}, _defineProperty$4(_ref3, STEP_PREPARE, onEnterPrepare), _defineProperty$4(_ref3, STEP_START, onEnterStart), _defineProperty$4(_ref3, STEP_ACTIVE, onEnterActive), _ref3;
      case STATUS_LEAVE:
        return _ref4 = {}, _defineProperty$4(_ref4, STEP_PREPARE, onLeavePrepare), _defineProperty$4(_ref4, STEP_START, onLeaveStart), _defineProperty$4(_ref4, STEP_ACTIVE, onLeaveActive), _ref4;
      default:
        return {};
    }
  };
  var eventHandlers = React.useMemo(function() {
    return getEventHandlers(status);
  }, [status]);
  var _useStepQueue = useStepQueue(status, !supportMotion, function(newStep) {
    if (newStep === STEP_PREPARE) {
      var onPrepare = eventHandlers[STEP_PREPARE];
      if (!onPrepare) {
        return SkipStep;
      }
      return onPrepare(getDomElement());
    }
    if (step in eventHandlers) {
      var _eventHandlers$step;
      setStyle(((_eventHandlers$step = eventHandlers[step]) === null || _eventHandlers$step === void 0 ? void 0 : _eventHandlers$step.call(eventHandlers, getDomElement(), null)) || null);
    }
    if (step === STEP_ACTIVE) {
      patchMotionEvents(getDomElement());
      if (motionDeadline > 0) {
        clearTimeout(deadlineRef.current);
        deadlineRef.current = setTimeout(function() {
          onInternalMotionEnd({
            deadline: true
          });
        }, motionDeadline);
      }
    }
    if (step === STEP_PREPARED) {
      updateMotionEndStatus();
    }
    return DoStep;
  }), _useStepQueue2 = _slicedToArray$3(_useStepQueue, 2), startStep = _useStepQueue2[0], step = _useStepQueue2[1];
  var active = isActive(step);
  activeRef.current = active;
  useIsomorphicLayoutEffect(function() {
    setAsyncVisible(visible);
    var isMounted = mountedRef.current;
    mountedRef.current = true;
    var nextStatus;
    if (!isMounted && visible && motionAppear) {
      nextStatus = STATUS_APPEAR;
    }
    if (isMounted && visible && motionEnter) {
      nextStatus = STATUS_ENTER;
    }
    if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
      nextStatus = STATUS_LEAVE;
    }
    var nextEventHandlers = getEventHandlers(nextStatus);
    if (nextStatus && (supportMotion || nextEventHandlers[STEP_PREPARE])) {
      setStatus(nextStatus);
      startStep();
    } else {
      setStatus(STATUS_NONE);
    }
  }, [visible]);
  useEffect(function() {
    if (
      // Cancel appear
      status === STATUS_APPEAR && !motionAppear || // Cancel enter
      status === STATUS_ENTER && !motionEnter || // Cancel leave
      status === STATUS_LEAVE && !motionLeave
    ) {
      setStatus(STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);
  useEffect(function() {
    return function() {
      mountedRef.current = false;
      clearTimeout(deadlineRef.current);
    };
  }, []);
  var firstMountChangeRef = React.useRef(false);
  useEffect(function() {
    if (asyncVisible) {
      firstMountChangeRef.current = true;
    }
    if (asyncVisible !== void 0 && status === STATUS_NONE) {
      if (firstMountChangeRef.current || asyncVisible) {
        onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(asyncVisible);
      }
      firstMountChangeRef.current = true;
    }
  }, [asyncVisible, status]);
  var mergedStyle = style2;
  if (eventHandlers[STEP_PREPARE] && step === STEP_START) {
    mergedStyle = _objectSpread2$3({
      transition: "none"
    }, mergedStyle);
  }
  return [status, step, mergedStyle, asyncVisible !== null && asyncVisible !== void 0 ? asyncVisible : visible];
}
function genCSSMotion(config) {
  var transitionSupport = config;
  if (_typeof$3(config) === "object") {
    transitionSupport = config.transitionSupport;
  }
  function isSupportTransition(props, contextMotion) {
    return !!(props.motionName && transitionSupport && contextMotion !== false);
  }
  var CSSMotion2 = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
    var _props$visible = props.visible, visible = _props$visible === void 0 ? true : _props$visible, _props$removeOnLeave = props.removeOnLeave, removeOnLeave = _props$removeOnLeave === void 0 ? true : _props$removeOnLeave, forceRender = props.forceRender, children = props.children, motionName = props.motionName, leavedClassName = props.leavedClassName, eventProps = props.eventProps;
    var _React$useContext = React.useContext(Context), contextMotion = _React$useContext.motion;
    var supportMotion = isSupportTransition(props, contextMotion);
    var nodeRef = useRef();
    var wrapperNodeRef = useRef();
    function getDomElement() {
      try {
        return nodeRef.current instanceof HTMLElement ? nodeRef.current : findDOMNode(wrapperNodeRef.current);
      } catch (e) {
        return null;
      }
    }
    var _useStatus = useStatus(supportMotion, visible, getDomElement, props), _useStatus2 = _slicedToArray$3(_useStatus, 4), status = _useStatus2[0], statusStep = _useStatus2[1], statusStyle = _useStatus2[2], mergedVisible = _useStatus2[3];
    var renderedRef = React.useRef(mergedVisible);
    if (mergedVisible) {
      renderedRef.current = true;
    }
    var setNodeRef = React.useCallback(function(node2) {
      nodeRef.current = node2;
      fillRef(ref2, node2);
    }, [ref2]);
    var motionChildren;
    var mergedProps = _objectSpread2$3(_objectSpread2$3({}, eventProps), {}, {
      visible
    });
    if (!children) {
      motionChildren = null;
    } else if (status === STATUS_NONE) {
      if (mergedVisible) {
        motionChildren = children(_objectSpread2$3({}, mergedProps), setNodeRef);
      } else if (!removeOnLeave && renderedRef.current && leavedClassName) {
        motionChildren = children(_objectSpread2$3(_objectSpread2$3({}, mergedProps), {}, {
          className: leavedClassName
        }), setNodeRef);
      } else if (forceRender || !removeOnLeave && !leavedClassName) {
        motionChildren = children(_objectSpread2$3(_objectSpread2$3({}, mergedProps), {}, {
          style: {
            display: "none"
          }
        }), setNodeRef);
      } else {
        motionChildren = null;
      }
    } else {
      var _classNames;
      var statusSuffix;
      if (statusStep === STEP_PREPARE) {
        statusSuffix = "prepare";
      } else if (isActive(statusStep)) {
        statusSuffix = "active";
      } else if (statusStep === STEP_START) {
        statusSuffix = "start";
      }
      var motionCls = getTransitionName$2(motionName, "".concat(status, "-").concat(statusSuffix));
      motionChildren = children(_objectSpread2$3(_objectSpread2$3({}, mergedProps), {}, {
        className: classNames(getTransitionName$2(motionName, status), (_classNames = {}, _defineProperty$4(_classNames, motionCls, motionCls && statusSuffix), _defineProperty$4(_classNames, motionName, typeof motionName === "string"), _classNames)),
        style: statusStyle
      }), setNodeRef);
    }
    if (/* @__PURE__ */ React.isValidElement(motionChildren) && supportRef(motionChildren)) {
      var _ref = motionChildren, originNodeRef = _ref.ref;
      if (!originNodeRef) {
        motionChildren = /* @__PURE__ */ React.cloneElement(motionChildren, {
          ref: setNodeRef
        });
      }
    }
    return /* @__PURE__ */ React.createElement(DomWrapper, {
      ref: wrapperNodeRef
    }, motionChildren);
  });
  CSSMotion2.displayName = "CSSMotion";
  return CSSMotion2;
}
const CSSMotion = genCSSMotion(supportTransition);
var STATUS_ADD = "add";
var STATUS_KEEP = "keep";
var STATUS_REMOVE = "remove";
var STATUS_REMOVED = "removed";
function wrapKeyToObject(key) {
  var keyObj;
  if (key && _typeof$3(key) === "object" && "key" in key) {
    keyObj = key;
  } else {
    keyObj = {
      key
    };
  }
  return _objectSpread2$3(_objectSpread2$3({}, keyObj), {}, {
    key: String(keyObj.key)
  });
}
function parseKeys() {
  var keys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return keys.map(wrapKeyToObject);
}
function diffKeys() {
  var prevKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var currentKeys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var list = [];
  var currentIndex = 0;
  var currentLen = currentKeys.length;
  var prevKeyObjects = parseKeys(prevKeys);
  var currentKeyObjects = parseKeys(currentKeys);
  prevKeyObjects.forEach(function(keyObj) {
    var hit = false;
    for (var i = currentIndex; i < currentLen; i += 1) {
      var currentKeyObj = currentKeyObjects[i];
      if (currentKeyObj.key === keyObj.key) {
        if (currentIndex < i) {
          list = list.concat(currentKeyObjects.slice(currentIndex, i).map(function(obj) {
            return _objectSpread2$3(_objectSpread2$3({}, obj), {}, {
              status: STATUS_ADD
            });
          }));
          currentIndex = i;
        }
        list.push(_objectSpread2$3(_objectSpread2$3({}, currentKeyObj), {}, {
          status: STATUS_KEEP
        }));
        currentIndex += 1;
        hit = true;
        break;
      }
    }
    if (!hit) {
      list.push(_objectSpread2$3(_objectSpread2$3({}, keyObj), {}, {
        status: STATUS_REMOVE
      }));
    }
  });
  if (currentIndex < currentLen) {
    list = list.concat(currentKeyObjects.slice(currentIndex).map(function(obj) {
      return _objectSpread2$3(_objectSpread2$3({}, obj), {}, {
        status: STATUS_ADD
      });
    }));
  }
  var keys = {};
  list.forEach(function(_ref) {
    var key = _ref.key;
    keys[key] = (keys[key] || 0) + 1;
  });
  var duplicatedKeys = Object.keys(keys).filter(function(key) {
    return keys[key] > 1;
  });
  duplicatedKeys.forEach(function(matchKey) {
    list = list.filter(function(_ref2) {
      var key = _ref2.key, status = _ref2.status;
      return key !== matchKey || status !== STATUS_REMOVE;
    });
    list.forEach(function(node2) {
      if (node2.key === matchKey) {
        node2.status = STATUS_KEEP;
      }
    });
  });
  return list;
}
var _excluded$1 = ["component", "children", "onVisibleChanged", "onAllRemoved"], _excluded2 = ["status"];
var MOTION_PROP_NAMES = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function genCSSMotionList(transitionSupport) {
  var CSSMotion$1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : CSSMotion;
  var CSSMotionList = /* @__PURE__ */ function(_React$Component) {
    _inherits$1(CSSMotionList2, _React$Component);
    var _super = _createSuper(CSSMotionList2);
    function CSSMotionList2() {
      var _this2;
      _classCallCheck$1(this, CSSMotionList2);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this2 = _super.call.apply(_super, [this].concat(args));
      _defineProperty$4(_assertThisInitialized$1(_this2), "state", {
        keyEntities: []
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "removeKey", function(removeKey) {
        var keyEntities = _this2.state.keyEntities;
        var nextKeyEntities = keyEntities.map(function(entity) {
          if (entity.key !== removeKey)
            return entity;
          return _objectSpread2$3(_objectSpread2$3({}, entity), {}, {
            status: STATUS_REMOVED
          });
        });
        _this2.setState({
          keyEntities: nextKeyEntities
        });
        return nextKeyEntities.filter(function(_ref) {
          var status = _ref.status;
          return status !== STATUS_REMOVED;
        }).length;
      });
      return _this2;
    }
    _createClass$1(CSSMotionList2, [{
      key: "render",
      value: function render2() {
        var _this2 = this;
        var keyEntities = this.state.keyEntities;
        var _this$props = this.props, component = _this$props.component, children = _this$props.children, _onVisibleChanged = _this$props.onVisibleChanged, onAllRemoved = _this$props.onAllRemoved, restProps = _objectWithoutProperties$1(_this$props, _excluded$1);
        var Component2 = component || React.Fragment;
        var motionProps = {};
        MOTION_PROP_NAMES.forEach(function(prop) {
          motionProps[prop] = restProps[prop];
          delete restProps[prop];
        });
        delete restProps.keys;
        return /* @__PURE__ */ React.createElement(Component2, restProps, keyEntities.map(function(_ref2) {
          var status = _ref2.status, eventProps = _objectWithoutProperties$1(_ref2, _excluded2);
          var visible = status === STATUS_ADD || status === STATUS_KEEP;
          return /* @__PURE__ */ React.createElement(CSSMotion$1, _extends$2({}, motionProps, {
            key: eventProps.key,
            visible,
            eventProps,
            onVisibleChanged: function onVisibleChanged(changedVisible) {
              _onVisibleChanged === null || _onVisibleChanged === void 0 ? void 0 : _onVisibleChanged(changedVisible, {
                key: eventProps.key
              });
              if (!changedVisible) {
                var restKeysCount = _this2.removeKey(eventProps.key);
                if (restKeysCount === 0 && onAllRemoved) {
                  onAllRemoved();
                }
              }
            }
          }), children);
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(_ref3, _ref4) {
        var keys = _ref3.keys;
        var keyEntities = _ref4.keyEntities;
        var parsedKeyObjects = parseKeys(keys);
        var mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);
        return {
          keyEntities: mixedKeyEntities.filter(function(entity) {
            var prevEntity = keyEntities.find(function(_ref5) {
              var key = _ref5.key;
              return entity.key === key;
            });
            if (prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE) {
              return false;
            }
            return true;
          })
        };
      }
      // ZombieJ: Return the count of rest keys. It's safe to refactor if need more info.
    }]);
    return CSSMotionList2;
  }(React.Component);
  _defineProperty$4(CSSMotionList, "defaultProps", {
    component: "div"
  });
  return CSSMotionList;
}
genCSSMotionList(supportTransition);
var isValidElement = React.isValidElement;
function isFragment(child) {
  return child && isValidElement(child) && child.type === React.Fragment;
}
function replaceElement(element, replacement, props) {
  if (!isValidElement(element)) {
    return replacement;
  }
  return /* @__PURE__ */ React.cloneElement(element, typeof props === "function" ? props(element.props || {}) : props);
}
function cloneElement(element, props) {
  return replaceElement(element, element, props);
}
function useEvent(callback) {
  var fnRef = React.useRef();
  fnRef.current = callback;
  var memoFn = React.useCallback(function() {
    var _fnRef$current;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (_fnRef$current = fnRef.current) === null || _fnRef$current === void 0 ? void 0 : _fnRef$current.call.apply(_fnRef$current, [fnRef].concat(args));
  }, []);
  return memoFn;
}
var useInternalLayoutEffect = process.env.NODE_ENV !== "test" && canUseDom$1() ? React.useLayoutEffect : React.useEffect;
var useLayoutEffect = function useLayoutEffect2(callback, deps) {
  var firstMountRef = React.useRef(true);
  useInternalLayoutEffect(function() {
    return callback(firstMountRef.current);
  }, deps);
  useInternalLayoutEffect(function() {
    firstMountRef.current = false;
    return function() {
      firstMountRef.current = true;
    };
  }, []);
};
var useLayoutUpdateEffect = function useLayoutUpdateEffect2(callback, deps) {
  useLayoutEffect(function(firstMount) {
    if (!firstMount) {
      return callback();
    }
  }, deps);
};
function hasValue(value2) {
  return value2 !== void 0;
}
function useMergedState(defaultStateValue, option) {
  var _ref = option || {}, defaultValue = _ref.defaultValue, value2 = _ref.value, onChange = _ref.onChange, postState = _ref.postState;
  var _useState = useSafeState(function() {
    if (hasValue(value2)) {
      return value2;
    } else if (hasValue(defaultValue)) {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    } else {
      return typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
    }
  }), _useState2 = _slicedToArray$3(_useState, 2), innerValue = _useState2[0], setInnerValue = _useState2[1];
  var mergedValue = value2 !== void 0 ? value2 : innerValue;
  var postMergedValue = postState ? postState(mergedValue) : mergedValue;
  var onChangeFn = useEvent(onChange);
  var _useState3 = useSafeState([mergedValue]), _useState4 = _slicedToArray$3(_useState3, 2), prevValue = _useState4[0], setPrevValue = _useState4[1];
  useLayoutUpdateEffect(function() {
    var prev2 = prevValue[0];
    if (innerValue !== prev2) {
      onChangeFn(innerValue, prev2);
    }
  }, [prevValue]);
  useLayoutUpdateEffect(function() {
    if (!hasValue(value2)) {
      setInnerValue(value2);
    }
  }, [value2]);
  var triggerChange = useEvent(function(updater, ignoreDestroy) {
    setInnerValue(updater, ignoreDestroy);
    setPrevValue([mergedValue], ignoreDestroy);
  });
  return [postMergedValue, triggerChange];
}
const isMobile = function() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  var agent = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent === null || agent === void 0 ? void 0 : agent.substr(0, 4));
};
var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35,
  // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  // also NUM_WEST
  /**
   * UP
   */
  UP: 38,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40,
  // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46,
  // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  // needs localization
  /**
   * DASH
   */
  DASH: 189,
  // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187,
  // needs localization
  /**
   * COMMA
   */
  COMMA: 188,
  // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190,
  // needs localization
  /**
   * SLASH
   */
  SLASH: 191,
  // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e) {
    var keyCode = e.keyCode;
    if (e.altKey && !e.ctrlKey || e.metaKey || // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }
    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }
    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }
    if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
      return true;
    }
    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  }
};
var Portal$1 = /* @__PURE__ */ forwardRef(function(props, ref2) {
  var didUpdate = props.didUpdate, getContainer2 = props.getContainer, children = props.children;
  var parentRef = useRef();
  var containerRef = useRef();
  useImperativeHandle(ref2, function() {
    return {};
  });
  var initRef = useRef(false);
  if (!initRef.current && canUseDom$1()) {
    containerRef.current = getContainer2();
    parentRef.current = containerRef.current.parentNode;
    initRef.current = true;
  }
  useEffect(function() {
    didUpdate === null || didUpdate === void 0 || didUpdate(props);
  });
  useEffect(function() {
    if (containerRef.current.parentNode === null && parentRef.current !== null) {
      parentRef.current.appendChild(containerRef.current);
    }
    return function() {
      var _containerRef$current;
      (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 || (_containerRef$current = _containerRef$current.parentNode) === null || _containerRef$current === void 0 || _containerRef$current.removeChild(containerRef.current);
    };
  }, []);
  return containerRef.current ? /* @__PURE__ */ ReactDOM__default.createPortal(children, containerRef.current) : null;
});
function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  var baseAlign = builtinPlacements[placementStr] || {};
  return _objectSpread2$3(_objectSpread2$3({}, baseAlign), align);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  var points = align.points;
  var placements2 = Object.keys(builtinPlacements);
  for (var i = 0; i < placements2.length; i += 1) {
    var placement = placements2[i];
    if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
      return "".concat(prefixCls, "-placement-").concat(placement);
    }
  }
  return "";
}
function getMotion(_ref) {
  var prefixCls = _ref.prefixCls, motion = _ref.motion, animation = _ref.animation, transitionName = _ref.transitionName;
  if (motion) {
    return motion;
  }
  if (animation) {
    return {
      motionName: "".concat(prefixCls, "-").concat(animation)
    };
  }
  if (transitionName) {
    return {
      motionName: transitionName
    };
  }
  return null;
}
function Mask(props) {
  var prefixCls = props.prefixCls, visible = props.visible, zIndex = props.zIndex, mask = props.mask, maskMotion = props.maskMotion, maskAnimation = props.maskAnimation, maskTransitionName = props.maskTransitionName;
  if (!mask) {
    return null;
  }
  var motion = {};
  if (maskMotion || maskTransitionName || maskAnimation) {
    motion = _objectSpread2$3({
      motionAppear: true
    }, getMotion({
      motion: maskMotion,
      prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation
    }));
  }
  return /* @__PURE__ */ React.createElement(CSSMotion, _extends$2({}, motion, {
    visible,
    removeOnLeave: true
  }), function(_ref) {
    var className = _ref.className;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        zIndex
      },
      className: classNames("".concat(prefixCls, "-mask"), className)
    });
  });
}
function ownKeys$1(object4, enumerableOnly) {
  var keys = Object.keys(object4);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object4);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object4, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function _defineProperty$2(obj, key, value2) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value2,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value2;
  }
  return obj;
}
var vendorPrefix$1;
var jsCssMap = {
  Webkit: "-webkit-",
  Moz: "-moz-",
  // IE did it wrong again ...
  ms: "-ms-",
  O: "-o-"
};
function getVendorPrefix() {
  if (vendorPrefix$1 !== void 0) {
    return vendorPrefix$1;
  }
  vendorPrefix$1 = "";
  var style2 = document.createElement("p").style;
  var testProp = "Transform";
  for (var key in jsCssMap) {
    if (key + testProp in style2) {
      vendorPrefix$1 = key;
    }
  }
  return vendorPrefix$1;
}
function getTransitionName$1() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "TransitionProperty") : "transitionProperty";
}
function getTransformName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "Transform") : "transform";
}
function setTransitionProperty(node2, value2) {
  var name = getTransitionName$1();
  if (name) {
    node2.style[name] = value2;
    if (name !== "transitionProperty") {
      node2.style.transitionProperty = value2;
    }
  }
}
function setTransform(node2, value2) {
  var name = getTransformName();
  if (name) {
    node2.style[name] = value2;
    if (name !== "transform") {
      node2.style.transform = value2;
    }
  }
}
function getTransitionProperty(node2) {
  return node2.style.transitionProperty || node2.style[getTransitionName$1()];
}
function getTransformXY(node2) {
  var style2 = window.getComputedStyle(node2, null);
  var transform = style2.getPropertyValue("transform") || style2.getPropertyValue(getTransformName());
  if (transform && transform !== "none") {
    var matrix = transform.replace(/[^0-9\-.,]/g, "").split(",");
    return {
      x: parseFloat(matrix[12] || matrix[4], 0),
      y: parseFloat(matrix[13] || matrix[5], 0)
    };
  }
  return {
    x: 0,
    y: 0
  };
}
var matrix2d = /matrix\((.*)\)/;
var matrix3d = /matrix3d\((.*)\)/;
function setTransformXY(node2, xy) {
  var style2 = window.getComputedStyle(node2, null);
  var transform = style2.getPropertyValue("transform") || style2.getPropertyValue(getTransformName());
  if (transform && transform !== "none") {
    var arr;
    var match2d = transform.match(matrix2d);
    if (match2d) {
      match2d = match2d[1];
      arr = match2d.split(",").map(function(item) {
        return parseFloat(item, 10);
      });
      arr[4] = xy.x;
      arr[5] = xy.y;
      setTransform(node2, "matrix(".concat(arr.join(","), ")"));
    } else {
      var match3d = transform.match(matrix3d)[1];
      arr = match3d.split(",").map(function(item) {
        return parseFloat(item, 10);
      });
      arr[12] = xy.x;
      arr[13] = xy.y;
      setTransform(node2, "matrix3d(".concat(arr.join(","), ")"));
    }
  } else {
    setTransform(node2, "translateX(".concat(xy.x, "px) translateY(").concat(xy.y, "px) translateZ(0)"));
  }
}
var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
var getComputedStyleX;
function forceRelayout(elem) {
  var originalStyle = elem.style.display;
  elem.style.display = "none";
  elem.offsetHeight;
  elem.style.display = originalStyle;
}
function css(el, name, v) {
  var value2 = v;
  if (_typeof$1(name) === "object") {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }
    return void 0;
  }
  if (typeof value2 !== "undefined") {
    if (typeof value2 === "number") {
      value2 = "".concat(value2, "px");
    }
    el.style[name] = value2;
    return void 0;
  }
  return getComputedStyleX(el, name);
}
function getClientPosition(elem) {
  var box;
  var x;
  var y;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  box = elem.getBoundingClientRect();
  x = Math.floor(box.left);
  y = Math.floor(box.top);
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y
  };
}
function getScroll(w, top) {
  var ret = w["page".concat(top ? "Y" : "X", "Offset")];
  var method4 = "scroll".concat(top ? "Top" : "Left");
  if (typeof ret !== "number") {
    var d = w.document;
    ret = d.documentElement[method4];
    if (typeof ret !== "number") {
      ret = d.body[method4];
    }
  }
  return ret;
}
function getScrollLeft(w) {
  return getScroll(w);
}
function getScrollTop(w) {
  return getScroll(w, true);
}
function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}
function isWindow(obj) {
  return obj !== null && obj !== void 0 && obj == obj.window;
}
function getDocument(node2) {
  if (isWindow(node2)) {
    return node2.document;
  }
  if (node2.nodeType === 9) {
    return node2;
  }
  return node2.ownerDocument;
}
function _getComputedStyle(elem, name, cs) {
  var computedStyle = cs;
  var val = "";
  var d = getDocument(elem);
  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }
  return val;
}
var _RE_NUM_NO_PX = new RegExp("^(".concat(RE_NUM, ")(?!px)[a-z%]+$"), "i");
var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = "currentStyle";
var RUNTIME_STYLE = "runtimeStyle";
var LEFT = "left";
var PX = "px";
function _getComputedStyleIE(elem, name) {
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    var style2 = elem.style;
    var left = style2[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT];
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];
    style2[LEFT] = name === "fontSize" ? "1em" : ret || 0;
    ret = style2.pixelLeft + PX;
    style2[LEFT] = left;
    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === "" ? "auto" : ret;
}
if (typeof window !== "undefined") {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}
function getOffsetDirection(dir, option) {
  if (dir === "left") {
    return option.useCssRight ? "right" : dir;
  }
  return option.useCssBottom ? "bottom" : dir;
}
function oppositeOffsetDirection(dir) {
  if (dir === "left") {
    return "right";
  } else if (dir === "right") {
    return "left";
  } else if (dir === "top") {
    return "bottom";
  } else if (dir === "bottom") {
    return "top";
  }
}
function setLeftTop(elem, offset2, option) {
  if (css(elem, "position") === "static") {
    elem.style.position = "relative";
  }
  var presetH = -999;
  var presetV = -999;
  var horizontalProperty = getOffsetDirection("left", option);
  var verticalProperty = getOffsetDirection("top", option);
  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);
  if (horizontalProperty !== "left") {
    presetH = 999;
  }
  if (verticalProperty !== "top") {
    presetV = 999;
  }
  var originalTransition = "";
  var originalOffset = getOffset(elem);
  if ("left" in offset2 || "top" in offset2) {
    originalTransition = getTransitionProperty(elem) || "";
    setTransitionProperty(elem, "none");
  }
  if ("left" in offset2) {
    elem.style[oppositeHorizontalProperty] = "";
    elem.style[horizontalProperty] = "".concat(presetH, "px");
  }
  if ("top" in offset2) {
    elem.style[oppositeVerticalProperty] = "";
    elem.style[verticalProperty] = "".concat(presetV, "px");
  }
  forceRelayout(elem);
  var old = getOffset(elem);
  var originalStyle = {};
  for (var key in offset2) {
    if (offset2.hasOwnProperty(key)) {
      var dir = getOffsetDirection(key, option);
      var preset = key === "left" ? presetH : presetV;
      var off = originalOffset[key] - old[key];
      if (dir === key) {
        originalStyle[dir] = preset + off;
      } else {
        originalStyle[dir] = preset - off;
      }
    }
  }
  css(elem, originalStyle);
  forceRelayout(elem);
  if ("left" in offset2 || "top" in offset2) {
    setTransitionProperty(elem, originalTransition);
  }
  var ret = {};
  for (var _key in offset2) {
    if (offset2.hasOwnProperty(_key)) {
      var _dir = getOffsetDirection(_key, option);
      var _off = offset2[_key] - originalOffset[_key];
      if (_key === _dir) {
        ret[_dir] = originalStyle[_dir] + _off;
      } else {
        ret[_dir] = originalStyle[_dir] - _off;
      }
    }
  }
  css(elem, ret);
}
function setTransform$1(elem, offset2) {
  var originalOffset = getOffset(elem);
  var originalXY = getTransformXY(elem);
  var resultXY = {
    x: originalXY.x,
    y: originalXY.y
  };
  if ("left" in offset2) {
    resultXY.x = originalXY.x + offset2.left - originalOffset.left;
  }
  if ("top" in offset2) {
    resultXY.y = originalXY.y + offset2.top - originalOffset.top;
  }
  setTransformXY(elem, resultXY);
}
function setOffset(elem, offset2, option) {
  if (option.ignoreShake) {
    var oriOffset = getOffset(elem);
    var oLeft = oriOffset.left.toFixed(0);
    var oTop = oriOffset.top.toFixed(0);
    var tLeft = offset2.left.toFixed(0);
    var tTop = offset2.top.toFixed(0);
    if (oLeft === tLeft && oTop === tTop) {
      return;
    }
  }
  if (option.useCssRight || option.useCssBottom) {
    setLeftTop(elem, offset2, option);
  } else if (option.useCssTransform && getTransformName() in document.body.style) {
    setTransform$1(elem, offset2);
  } else {
    setLeftTop(elem, offset2, option);
  }
}
function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}
function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, "boxSizing") === "border-box";
}
var BOX_MODELS = ["margin", "border", "padding"];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;
function swap(elem, options, callback) {
  var old = {};
  var style2 = elem.style;
  var name;
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style2[name];
      style2[name] = options[name];
    }
  }
  callback.call(elem);
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style2[name] = old[name];
    }
  }
}
function getPBMWidth(elem, props, which) {
  var value2 = 0;
  var prop;
  var j;
  var i;
  for (j = 0; j < props.length; j++) {
    prop = props[j];
    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = void 0;
        if (prop === "border") {
          cssProp = "".concat(prop).concat(which[i], "Width");
        } else {
          cssProp = prop + which[i];
        }
        value2 += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value2;
}
var domUtils = {
  getParent: function getParent(element) {
    var parent = element;
    do {
      if (parent.nodeType === 11 && parent.host) {
        parent = parent.host;
      } else {
        parent = parent.parentNode;
      }
    } while (parent && parent.nodeType !== 1 && parent.nodeType !== 9);
    return parent;
  }
};
each(["Width", "Height"], function(name) {
  domUtils["doc".concat(name)] = function(refWin) {
    var d = refWin.document;
    return Math.max(
      // firefox chrome documentElement.scrollHeight< body.scrollHeight
      // ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d.documentElement["scroll".concat(name)],
      // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d.body["scroll".concat(name)],
      domUtils["viewport".concat(name)](d)
    );
  };
  domUtils["viewport".concat(name)] = function(win) {
    var prop = "client".concat(name);
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    return doc.compatMode === "CSS1Compat" && documentElementProp || body && body[prop] || documentElementProp;
  };
});
function getWH(elem, name, ex) {
  var extra = ex;
  if (isWindow(elem)) {
    return name === "width" ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === "width" ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  var borderBoxValue = name === "width" ? Math.floor(elem.getBoundingClientRect().width) : Math.floor(elem.getBoundingClientRect().height);
  var isBorderBox = isBorderBoxFn(elem);
  var cssBoxValue = 0;
  if (borderBoxValue === null || borderBoxValue === void 0 || borderBoxValue <= 0) {
    borderBoxValue = void 0;
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue === null || cssBoxValue === void 0 || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    cssBoxValue = Math.floor(parseFloat(cssBoxValue)) || 0;
  }
  if (extra === void 0) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== void 0 || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ["border", "padding"], which);
    }
    return cssBoxValue;
  } else if (borderBoxValueOrIsBorderBox) {
    if (extra === BORDER_INDEX) {
      return val;
    }
    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ["border"], which) : getPBMWidth(elem, ["margin"], which));
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which);
}
var cssShow = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function getWHIgnoreDisplay() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var val;
  var elem = args[0];
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(void 0, args);
  } else {
    swap(elem, cssShow, function() {
      val = getWH.apply(void 0, args);
    });
  }
  return val;
}
each(["width", "height"], function(name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils["outer".concat(first)] = function(el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  domUtils[name] = function(elem, v) {
    var val = v;
    if (val !== void 0) {
      if (elem) {
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ["padding", "border"], which);
        }
        return css(elem, name, val);
      }
      return void 0;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});
function mix(to, from2) {
  for (var i in from2) {
    if (from2.hasOwnProperty(i)) {
      to[i] = from2[i];
    }
  }
  return to;
}
var utils = {
  getWindow: function getWindow(node2) {
    if (node2 && node2.document && node2.setTimeout) {
      return node2;
    }
    var doc = node2.ownerDocument || node2;
    return doc.defaultView || doc.parentWindow;
  },
  getDocument,
  offset: function offset(el, value2, option) {
    if (typeof value2 !== "undefined") {
      setOffset(el, value2, option || {});
    } else {
      return getOffset(el);
    }
  },
  isWindow,
  each,
  css,
  clone: function clone(obj) {
    var i;
    var ret = {};
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }
    return ret;
  },
  mix,
  getWindowScrollLeft: function getWindowScrollLeft(w) {
    return getScrollLeft(w);
  },
  getWindowScrollTop: function getWindowScrollTop(w) {
    return getScrollTop(w);
  },
  merge: function merge2() {
    var ret = {};
    for (var i = 0; i < arguments.length; i++) {
      utils.mix(ret, i < 0 || arguments.length <= i ? void 0 : arguments[i]);
    }
    return ret;
  },
  viewportWidth: 0,
  viewportHeight: 0
};
mix(utils, domUtils);
var getParent2 = utils.getParent;
function getOffsetParent(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return null;
  }
  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent;
  var positionStyle = utils.css(element, "position");
  var skipStatic = positionStyle === "fixed" || positionStyle === "absolute";
  if (!skipStatic) {
    return element.nodeName.toLowerCase() === "html" ? null : getParent2(element);
  }
  for (parent = getParent2(element); parent && parent !== body && parent.nodeType !== 9; parent = getParent2(parent)) {
    positionStyle = utils.css(parent, "position");
    if (positionStyle !== "static") {
      return parent;
    }
  }
  return null;
}
var getParent$1 = utils.getParent;
function isAncestorFixed(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return false;
  }
  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent = null;
  for (
    parent = getParent$1(element);
    // 修复元素位于 document.documentElement 下导致崩溃问题
    parent && parent !== body && parent !== doc;
    parent = getParent$1(parent)
  ) {
    var positionStyle = utils.css(parent, "position");
    if (positionStyle === "fixed") {
      return true;
    }
  }
  return false;
}
function getVisibleRectForElement(element, alwaysByViewport) {
  var visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity
  };
  var el = getOffsetParent(element);
  var doc = utils.getDocument(element);
  var win = doc.defaultView || doc.parentWindow;
  var body = doc.body;
  var documentElement = doc.documentElement;
  while (el) {
    if ((navigator.userAgent.indexOf("MSIE") === -1 || el.clientWidth !== 0) && // body may have overflow set on it, yet we still get the entire
    // viewport. In some browsers, el.offsetParent may be
    // document.documentElement, so check for that too.
    el !== body && el !== documentElement && utils.css(el, "overflow") !== "visible") {
      var pos = utils.offset(el);
      pos.left += el.clientLeft;
      pos.top += el.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.right = Math.min(
        visibleRect.right,
        // consider area without scrollBar
        pos.left + el.clientWidth
      );
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.left);
    } else if (el === body || el === documentElement) {
      break;
    }
    el = getOffsetParent(el);
  }
  var originalPosition = null;
  if (!utils.isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    var position2 = utils.css(element, "position");
    if (position2 === "absolute") {
      element.style.position = "fixed";
    }
  }
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  var documentWidth = documentElement.scrollWidth;
  var documentHeight = documentElement.scrollHeight;
  var bodyStyle = window.getComputedStyle(body);
  if (bodyStyle.overflowX === "hidden") {
    documentWidth = win.innerWidth;
  }
  if (bodyStyle.overflowY === "hidden") {
    documentHeight = win.innerHeight;
  }
  if (element.style) {
    element.style.position = originalPosition;
  }
  if (alwaysByViewport || isAncestorFixed(element)) {
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewportWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + viewportHeight);
  } else {
    var maxVisibleWidth = Math.max(documentWidth, scrollX + viewportWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);
    var maxVisibleHeight = Math.max(documentHeight, scrollY + viewportHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }
  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
}
function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  var pos = utils.clone(elFuturePos);
  var size = {
    width: elRegion.width,
    height: elRegion.height
  };
  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  }
  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
    size.width -= pos.left + size.width - visibleRect.right;
  }
  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  }
  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  }
  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  }
  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }
  return utils.mix(pos, size);
}
function getRegion(node2) {
  var offset2;
  var w;
  var h2;
  if (!utils.isWindow(node2) && node2.nodeType !== 9) {
    offset2 = utils.offset(node2);
    w = utils.outerWidth(node2);
    h2 = utils.outerHeight(node2);
  } else {
    var win = utils.getWindow(node2);
    offset2 = {
      left: utils.getWindowScrollLeft(win),
      top: utils.getWindowScrollTop(win)
    };
    w = utils.viewportWidth(win);
    h2 = utils.viewportHeight(win);
  }
  offset2.width = w;
  offset2.height = h2;
  return offset2;
}
function getAlignOffset(region, align) {
  var V = align.charAt(0);
  var H = align.charAt(1);
  var w = region.width;
  var h2 = region.height;
  var x = region.left;
  var y = region.top;
  if (V === "c") {
    y += h2 / 2;
  } else if (V === "b") {
    y += h2;
  }
  if (H === "c") {
    x += w / 2;
  } else if (H === "r") {
    x += w;
  }
  return {
    left: x,
    top: y
  };
}
function getElFuturePos(elRegion, refNodeRegion, points, offset2, targetOffset2) {
  var p1 = getAlignOffset(refNodeRegion, points[1]);
  var p2 = getAlignOffset(elRegion, points[0]);
  var diff = [p2.left - p1.left, p2.top - p1.top];
  return {
    left: Math.round(elRegion.left - diff[0] + offset2[0] - targetOffset2[0]),
    top: Math.round(elRegion.top - diff[1] + offset2[1] - targetOffset2[1])
  };
}
function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
}
function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
}
function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
}
function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
}
function flip(points, reg, map) {
  var ret = [];
  utils.each(points, function(p) {
    ret.push(p.replace(reg, function(m) {
      return map[m];
    }));
  });
  return ret;
}
function flipOffset(offset2, index2) {
  offset2[index2] = -offset2[index2];
  return offset2;
}
function convertOffset(str, offsetLen) {
  var n;
  if (/%$/.test(str)) {
    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
  } else {
    n = parseInt(str, 10);
  }
  return n || 0;
}
function normalizeOffset(offset2, el) {
  offset2[0] = convertOffset(offset2[0], el.width);
  offset2[1] = convertOffset(offset2[1], el.height);
}
function doAlign(el, tgtRegion, align, isTgtRegionVisible) {
  var points = align.points;
  var offset2 = align.offset || [0, 0];
  var targetOffset2 = align.targetOffset || [0, 0];
  var overflow = align.overflow;
  var source = align.source || el;
  offset2 = [].concat(offset2);
  targetOffset2 = [].concat(targetOffset2);
  overflow = overflow || {};
  var newOverflowCfg = {};
  var fail = 0;
  var alwaysByViewport = !!(overflow && overflow.alwaysByViewport);
  var visibleRect = getVisibleRectForElement(source, alwaysByViewport);
  var elRegion = getRegion(source);
  normalizeOffset(offset2, elRegion);
  normalizeOffset(targetOffset2, tgtRegion);
  var elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset2, targetOffset2);
  var newElRegion = utils.merge(elRegion, elFuturePos);
  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTgtRegionVisible) {
    if (overflow.adjustX) {
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        var newPoints = flip(points, /[lr]/gi, {
          l: "r",
          r: "l"
        });
        var newOffset = flipOffset(offset2, 0);
        var newTargetOffset = flipOffset(targetOffset2, 0);
        var newElFuturePos = getElFuturePos(elRegion, tgtRegion, newPoints, newOffset, newTargetOffset);
        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = newPoints;
          offset2 = newOffset;
          targetOffset2 = newTargetOffset;
        }
      }
    }
    if (overflow.adjustY) {
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        var _newPoints = flip(points, /[tb]/gi, {
          t: "b",
          b: "t"
        });
        var _newOffset = flipOffset(offset2, 1);
        var _newTargetOffset = flipOffset(targetOffset2, 1);
        var _newElFuturePos = getElFuturePos(elRegion, tgtRegion, _newPoints, _newOffset, _newTargetOffset);
        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = _newPoints;
          offset2 = _newOffset;
          targetOffset2 = _newTargetOffset;
        }
      }
    }
    if (fail) {
      elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset2, targetOffset2);
      utils.mix(newElRegion, elFuturePos);
    }
    var isStillFailX = isFailX(elFuturePos, elRegion, visibleRect);
    var isStillFailY = isFailY(elFuturePos, elRegion, visibleRect);
    if (isStillFailX || isStillFailY) {
      var _newPoints2 = points;
      if (isStillFailX) {
        _newPoints2 = flip(points, /[lr]/gi, {
          l: "r",
          r: "l"
        });
      }
      if (isStillFailY) {
        _newPoints2 = flip(points, /[tb]/gi, {
          t: "b",
          b: "t"
        });
      }
      points = _newPoints2;
      offset2 = align.offset || [0, 0];
      targetOffset2 = align.targetOffset || [0, 0];
    }
    newOverflowCfg.adjustX = overflow.adjustX && isStillFailX;
    newOverflowCfg.adjustY = overflow.adjustY && isStillFailY;
    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
    }
  }
  if (newElRegion.width !== elRegion.width) {
    utils.css(source, "width", utils.width(source) + newElRegion.width - elRegion.width);
  }
  if (newElRegion.height !== elRegion.height) {
    utils.css(source, "height", utils.height(source) + newElRegion.height - elRegion.height);
  }
  utils.offset(source, {
    left: newElRegion.left,
    top: newElRegion.top
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform,
    ignoreShake: align.ignoreShake
  });
  return {
    points,
    offset: offset2,
    targetOffset: targetOffset2,
    overflow: newOverflowCfg
  };
}
function isOutOfVisibleRect(target, alwaysByViewport) {
  var visibleRect = getVisibleRectForElement(target, alwaysByViewport);
  var targetRegion = getRegion(target);
  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}
function alignElement(el, refNode, align) {
  var target = align.target || refNode;
  var refNodeRegion = getRegion(target);
  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target, align.overflow && align.overflow.alwaysByViewport);
  return doAlign(el, refNodeRegion, align, isTargetNotOutOfVisible);
}
alignElement.__getOffsetParent = getOffsetParent;
alignElement.__getVisibleRectForElement = getVisibleRectForElement;
function alignPoint(el, tgtPoint, align) {
  var pageX;
  var pageY;
  var doc = utils.getDocument(el);
  var win = doc.defaultView || doc.parentWindow;
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  if ("pageX" in tgtPoint) {
    pageX = tgtPoint.pageX;
  } else {
    pageX = scrollX + tgtPoint.clientX;
  }
  if ("pageY" in tgtPoint) {
    pageY = tgtPoint.pageY;
  } else {
    pageY = scrollY + tgtPoint.clientY;
  }
  var tgtRegion = {
    left: pageX,
    top: pageY,
    width: 0,
    height: 0
  };
  var pointInView = pageX >= 0 && pageX <= scrollX + viewportWidth && pageY >= 0 && pageY <= scrollY + viewportHeight;
  var points = [align.points[0], "cc"];
  return doAlign(el, tgtRegion, _objectSpread2$1(_objectSpread2$1({}, align), {}, {
    points
  }), pointInView);
}
function isEqual(obj1, obj2) {
  var shallow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var refSet = /* @__PURE__ */ new Set();
  function deepEqual(a, b) {
    var level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var circular = refSet.has(a);
    warningOnce$1(!circular, "Warning: There may be circular references");
    if (circular) {
      return false;
    }
    if (a === b) {
      return true;
    }
    if (shallow && level > 1) {
      return false;
    }
    refSet.add(a);
    var newLevel = level + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) {
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i], newLevel)) {
          return false;
        }
      }
      return true;
    }
    if (a && b && _typeof$3(a) === "object" && _typeof$3(b) === "object") {
      var keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length) {
        return false;
      }
      return keys.every(function(key) {
        return deepEqual(a[key], b[key], newLevel);
      });
    }
    return false;
  }
  return deepEqual(obj1, obj2);
}
const isVisible = function(element) {
  if (!element) {
    return false;
  }
  if (element instanceof Element) {
    if (element.offsetParent) {
      return true;
    }
    if (element.getBBox) {
      var _getBBox = element.getBBox(), width = _getBBox.width, height = _getBBox.height;
      if (width || height) {
        return true;
      }
    }
    if (element.getBoundingClientRect) {
      var _element$getBoundingC = element.getBoundingClientRect(), _width = _element$getBoundingC.width, _height = _element$getBoundingC.height;
      if (_width || _height) {
        return true;
      }
    }
  }
  return false;
};
const useBuffer = function(callback, buffer) {
  var calledRef = React__default.useRef(false);
  var timeoutRef = React__default.useRef(null);
  function cancelTrigger() {
    window.clearTimeout(timeoutRef.current);
  }
  function trigger(force) {
    cancelTrigger();
    if (!calledRef.current || force === true) {
      if (callback(force) === false) {
        return;
      }
      calledRef.current = true;
      timeoutRef.current = window.setTimeout(function() {
        calledRef.current = false;
      }, buffer);
    } else {
      timeoutRef.current = window.setTimeout(function() {
        calledRef.current = false;
        trigger();
      }, buffer);
    }
  }
  return [trigger, function() {
    calledRef.current = false;
    cancelTrigger();
  }];
};
function isSamePoint(prev2, next2) {
  if (prev2 === next2)
    return true;
  if (!prev2 || !next2)
    return false;
  if ("pageX" in next2 && "pageY" in next2) {
    return prev2.pageX === next2.pageX && prev2.pageY === next2.pageY;
  }
  if ("clientX" in next2 && "clientY" in next2) {
    return prev2.clientX === next2.clientX && prev2.clientY === next2.clientY;
  }
  return false;
}
function restoreFocus(activeElement, container) {
  if (activeElement !== document.activeElement && contains$1(container, activeElement) && typeof activeElement.focus === "function") {
    activeElement.focus();
  }
}
function monitorResize(element, callback) {
  var prevWidth = null;
  var prevHeight = null;
  function onResize(_ref) {
    var _ref2 = _slicedToArray$3(_ref, 1), target = _ref2[0].target;
    if (!document.documentElement.contains(target))
      return;
    var _target$getBoundingCl = target.getBoundingClientRect(), width = _target$getBoundingCl.width, height = _target$getBoundingCl.height;
    var fixedWidth = Math.floor(width);
    var fixedHeight = Math.floor(height);
    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      Promise.resolve().then(function() {
        callback({
          width: fixedWidth,
          height: fixedHeight
        });
      });
    }
    prevWidth = fixedWidth;
    prevHeight = fixedHeight;
  }
  var resizeObserver = new index(onResize);
  if (element) {
    resizeObserver.observe(element);
  }
  return function() {
    resizeObserver.disconnect();
  };
}
function getElement(func) {
  if (typeof func !== "function")
    return null;
  return func();
}
function getPoint(point) {
  if (_typeof$3(point) !== "object" || !point)
    return null;
  return point;
}
var Align = function Align2(_ref, ref2) {
  var children = _ref.children, disabled = _ref.disabled, target = _ref.target, align = _ref.align, onAlign = _ref.onAlign, monitorWindowResize = _ref.monitorWindowResize, _ref$monitorBufferTim = _ref.monitorBufferTime, monitorBufferTime = _ref$monitorBufferTim === void 0 ? 0 : _ref$monitorBufferTim;
  var cacheRef = React__default.useRef({});
  var nodeRef = React__default.useRef();
  var childNode = React__default.Children.only(children);
  var forceAlignPropsRef = React__default.useRef({});
  forceAlignPropsRef.current.disabled = disabled;
  forceAlignPropsRef.current.target = target;
  forceAlignPropsRef.current.align = align;
  forceAlignPropsRef.current.onAlign = onAlign;
  var _useBuffer = useBuffer(function() {
    var _forceAlignPropsRef$c = forceAlignPropsRef.current, latestDisabled = _forceAlignPropsRef$c.disabled, latestTarget = _forceAlignPropsRef$c.target, latestAlign = _forceAlignPropsRef$c.align, latestOnAlign = _forceAlignPropsRef$c.onAlign;
    var source = nodeRef.current;
    if (!latestDisabled && latestTarget && source) {
      var _result;
      var _element = getElement(latestTarget);
      var _point = getPoint(latestTarget);
      cacheRef.current.element = _element;
      cacheRef.current.point = _point;
      cacheRef.current.align = latestAlign;
      var _document = document, activeElement = _document.activeElement;
      if (_element && isVisible(_element)) {
        _result = alignElement(source, _element, latestAlign);
      } else if (_point) {
        _result = alignPoint(source, _point, latestAlign);
      }
      restoreFocus(activeElement, source);
      if (latestOnAlign && _result) {
        latestOnAlign(source, _result);
      }
      return true;
    }
    return false;
  }, monitorBufferTime), _useBuffer2 = _slicedToArray$3(_useBuffer, 2), _forceAlign = _useBuffer2[0], cancelForceAlign = _useBuffer2[1];
  var _React$useState = React__default.useState(), _React$useState2 = _slicedToArray$3(_React$useState, 2), element = _React$useState2[0], setElement = _React$useState2[1];
  var _React$useState3 = React__default.useState(), _React$useState4 = _slicedToArray$3(_React$useState3, 2), point = _React$useState4[0], setPoint = _React$useState4[1];
  useLayoutEffect(function() {
    setElement(getElement(target));
    setPoint(getPoint(target));
  });
  React__default.useEffect(function() {
    if (cacheRef.current.element !== element || !isSamePoint(cacheRef.current.point, point) || !isEqual(cacheRef.current.align, align)) {
      _forceAlign();
    }
  });
  React__default.useEffect(function() {
    var cancelFn = monitorResize(nodeRef.current, _forceAlign);
    return cancelFn;
  }, [nodeRef.current]);
  React__default.useEffect(function() {
    var cancelFn = monitorResize(element, _forceAlign);
    return cancelFn;
  }, [element]);
  React__default.useEffect(function() {
    if (!disabled) {
      _forceAlign();
    } else {
      cancelForceAlign();
    }
  }, [disabled]);
  React__default.useEffect(function() {
    if (monitorWindowResize) {
      var cancelFn = addEventListenerWrap(window, "resize", _forceAlign);
      return cancelFn.remove;
    }
  }, [monitorWindowResize]);
  React__default.useEffect(function() {
    return function() {
      cancelForceAlign();
    };
  }, []);
  React__default.useImperativeHandle(ref2, function() {
    return {
      forceAlign: function forceAlign() {
        return _forceAlign(true);
      }
    };
  });
  if (/* @__PURE__ */ React__default.isValidElement(childNode)) {
    childNode = /* @__PURE__ */ React__default.cloneElement(childNode, {
      ref: composeRef(childNode.ref, nodeRef)
    });
  }
  return childNode;
};
var RcAlign = /* @__PURE__ */ React__default.forwardRef(Align);
RcAlign.displayName = "Align";
var StatusQueue = ["measure", "alignPre", "align", null, "motion"];
const useVisibleStatus = function(visible, doMeasure) {
  var _useState = useSafeState(null), _useState2 = _slicedToArray$3(_useState, 2), status = _useState2[0], setInternalStatus = _useState2[1];
  var rafRef = useRef();
  function setStatus(nextStatus) {
    setInternalStatus(nextStatus, true);
  }
  function cancelRaf() {
    wrapperRaf$1.cancel(rafRef.current);
  }
  function goNextStatus(callback) {
    cancelRaf();
    rafRef.current = wrapperRaf$1(function() {
      setStatus(function(prev2) {
        switch (status) {
          case "align":
            return "motion";
          case "motion":
            return "stable";
        }
        return prev2;
      });
      callback === null || callback === void 0 ? void 0 : callback();
    });
  }
  useEffect(function() {
    setStatus("measure");
  }, [visible]);
  useEffect(function() {
    switch (status) {
      case "measure":
        doMeasure();
        break;
    }
    if (status) {
      rafRef.current = wrapperRaf$1(/* @__PURE__ */ _asyncToGenerator$1(/* @__PURE__ */ _regeneratorRuntime$1().mark(function _callee() {
        var index2, nextStatus;
        return _regeneratorRuntime$1().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                index2 = StatusQueue.indexOf(status);
                nextStatus = StatusQueue[index2 + 1];
                if (nextStatus && index2 !== -1) {
                  setStatus(nextStatus);
                }
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, [status]);
  useEffect(function() {
    return function() {
      cancelRaf();
    };
  }, []);
  return [status, goNextStatus];
};
const useStretchStyle = function(stretch) {
  var _React$useState = React.useState({
    width: 0,
    height: 0
  }), _React$useState2 = _slicedToArray$3(_React$useState, 2), targetSize = _React$useState2[0], setTargetSize = _React$useState2[1];
  function measureStretch(element) {
    var tgtWidth = element.offsetWidth, tgtHeight = element.offsetHeight;
    var _element$getBoundingC = element.getBoundingClientRect(), width = _element$getBoundingC.width, height = _element$getBoundingC.height;
    if (Math.abs(tgtWidth - width) < 1 && Math.abs(tgtHeight - height) < 1) {
      tgtWidth = width;
      tgtHeight = height;
    }
    setTargetSize({
      width: tgtWidth,
      height: tgtHeight
    });
  }
  var style2 = React.useMemo(function() {
    var sizeStyle = {};
    if (stretch) {
      var width = targetSize.width, height = targetSize.height;
      if (stretch.indexOf("height") !== -1 && height) {
        sizeStyle.height = height;
      } else if (stretch.indexOf("minHeight") !== -1 && height) {
        sizeStyle.minHeight = height;
      }
      if (stretch.indexOf("width") !== -1 && width) {
        sizeStyle.width = width;
      } else if (stretch.indexOf("minWidth") !== -1 && width) {
        sizeStyle.minWidth = width;
      }
    }
    return sizeStyle;
  }, [stretch, targetSize]);
  return [style2, measureStretch];
};
var PopupInner = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var visible = props.visible, prefixCls = props.prefixCls, className = props.className, style2 = props.style, children = props.children, zIndex = props.zIndex, stretch = props.stretch, destroyPopupOnHide = props.destroyPopupOnHide, forceRender = props.forceRender, align = props.align, point = props.point, getRootDomNode = props.getRootDomNode, getClassNameFromAlign = props.getClassNameFromAlign, onAlign = props.onAlign, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onMouseDown = props.onMouseDown, onTouchStart = props.onTouchStart, onClick = props.onClick;
  var alignRef = useRef();
  var elementRef = useRef();
  var _useState = useState(), _useState2 = _slicedToArray$3(_useState, 2), alignedClassName = _useState2[0], setAlignedClassName = _useState2[1];
  var _useStretchStyle = useStretchStyle(stretch), _useStretchStyle2 = _slicedToArray$3(_useStretchStyle, 2), stretchStyle = _useStretchStyle2[0], measureStretchStyle = _useStretchStyle2[1];
  function doMeasure() {
    if (stretch) {
      measureStretchStyle(getRootDomNode());
    }
  }
  var _useVisibleStatus = useVisibleStatus(visible, doMeasure), _useVisibleStatus2 = _slicedToArray$3(_useVisibleStatus, 2), status = _useVisibleStatus2[0], goNextStatus = _useVisibleStatus2[1];
  var _useState3 = useState(0), _useState4 = _slicedToArray$3(_useState3, 2), alignTimes = _useState4[0], setAlignTimes = _useState4[1];
  var prepareResolveRef = useRef();
  useLayoutEffect(function() {
    if (status === "alignPre") {
      setAlignTimes(0);
    }
  }, [status]);
  function getAlignTarget() {
    if (point) {
      return point;
    }
    return getRootDomNode;
  }
  function forceAlign() {
    var _alignRef$current;
    (_alignRef$current = alignRef.current) === null || _alignRef$current === void 0 ? void 0 : _alignRef$current.forceAlign();
  }
  function onInternalAlign(popupDomNode, matchAlign) {
    var nextAlignedClassName = getClassNameFromAlign(matchAlign);
    if (alignedClassName !== nextAlignedClassName) {
      setAlignedClassName(nextAlignedClassName);
    }
    setAlignTimes(function(val) {
      return val + 1;
    });
    if (status === "align") {
      onAlign === null || onAlign === void 0 ? void 0 : onAlign(popupDomNode, matchAlign);
    }
  }
  useLayoutEffect(function() {
    if (status === "align") {
      if (alignTimes < 3) {
        forceAlign();
      } else {
        goNextStatus(function() {
          var _prepareResolveRef$cu;
          (_prepareResolveRef$cu = prepareResolveRef.current) === null || _prepareResolveRef$cu === void 0 ? void 0 : _prepareResolveRef$cu.call(prepareResolveRef);
        });
      }
    }
  }, [alignTimes]);
  var motion = _objectSpread2$3({}, getMotion(props));
  ["onAppearEnd", "onEnterEnd", "onLeaveEnd"].forEach(function(eventName) {
    var originHandler = motion[eventName];
    motion[eventName] = function(element, event) {
      goNextStatus();
      return originHandler === null || originHandler === void 0 ? void 0 : originHandler(element, event);
    };
  });
  function onShowPrepare() {
    return new Promise(function(resolve) {
      prepareResolveRef.current = resolve;
    });
  }
  React.useEffect(function() {
    if (!motion.motionName && status === "motion") {
      goNextStatus();
    }
  }, [motion.motionName, status]);
  React.useImperativeHandle(ref2, function() {
    return {
      forceAlign,
      getElement: function getElement2() {
        return elementRef.current;
      }
    };
  });
  var mergedStyle = _objectSpread2$3(_objectSpread2$3({}, stretchStyle), {}, {
    zIndex,
    opacity: status === "motion" || status === "stable" || !visible ? void 0 : 0,
    // Cannot interact with disappearing elements
    // https://github.com/ant-design/ant-design/issues/35051#issuecomment-1101340714
    pointerEvents: !visible && status !== "stable" ? "none" : void 0
  }, style2);
  var alignDisabled = true;
  if (align !== null && align !== void 0 && align.points && (status === "align" || status === "stable")) {
    alignDisabled = false;
  }
  var childNode = children;
  if (React.Children.count(children) > 1) {
    childNode = /* @__PURE__ */ React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, children);
  }
  return /* @__PURE__ */ React.createElement(CSSMotion, _extends$2({
    visible,
    ref: elementRef,
    leavedClassName: "".concat(prefixCls, "-hidden")
  }, motion, {
    onAppearPrepare: onShowPrepare,
    onEnterPrepare: onShowPrepare,
    removeOnLeave: destroyPopupOnHide,
    forceRender
  }), function(_ref, motionRef) {
    var motionClassName = _ref.className, motionStyle = _ref.style;
    var mergedClassName = classNames(prefixCls, className, alignedClassName, motionClassName);
    return /* @__PURE__ */ React.createElement(RcAlign, {
      target: getAlignTarget(),
      key: "popup",
      ref: alignRef,
      monitorWindowResize: true,
      disabled: alignDisabled,
      align,
      onAlign: onInternalAlign
    }, /* @__PURE__ */ React.createElement("div", {
      ref: motionRef,
      className: mergedClassName,
      onMouseEnter,
      onMouseLeave,
      onMouseDownCapture: onMouseDown,
      onTouchStartCapture: onTouchStart,
      onClick,
      style: _objectSpread2$3(_objectSpread2$3({}, motionStyle), mergedStyle)
    }, childNode));
  });
});
PopupInner.displayName = "PopupInner";
var MobilePopupInner = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var prefixCls = props.prefixCls, visible = props.visible, zIndex = props.zIndex, children = props.children, _props$mobile = props.mobile;
  _props$mobile = _props$mobile === void 0 ? {} : _props$mobile;
  var popupClassName = _props$mobile.popupClassName, popupStyle = _props$mobile.popupStyle, _props$mobile$popupMo = _props$mobile.popupMotion, popupMotion = _props$mobile$popupMo === void 0 ? {} : _props$mobile$popupMo, popupRender = _props$mobile.popupRender, onClick = props.onClick;
  var elementRef = React.useRef();
  React.useImperativeHandle(ref2, function() {
    return {
      forceAlign: function forceAlign() {
      },
      getElement: function getElement2() {
        return elementRef.current;
      }
    };
  });
  var mergedStyle = _objectSpread2$3({
    zIndex
  }, popupStyle);
  var childNode = children;
  if (React.Children.count(children) > 1) {
    childNode = /* @__PURE__ */ React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, children);
  }
  if (popupRender) {
    childNode = popupRender(childNode);
  }
  return /* @__PURE__ */ React.createElement(CSSMotion, _extends$2({
    visible,
    ref: elementRef,
    removeOnLeave: true
  }, popupMotion), function(_ref, motionRef) {
    var motionClassName = _ref.className, motionStyle = _ref.style;
    var mergedClassName = classNames(prefixCls, popupClassName, motionClassName);
    return /* @__PURE__ */ React.createElement("div", {
      ref: motionRef,
      className: mergedClassName,
      onClick,
      style: _objectSpread2$3(_objectSpread2$3({}, motionStyle), mergedStyle)
    }, childNode);
  });
});
MobilePopupInner.displayName = "MobilePopupInner";
var _excluded = ["visible", "mobile"];
var Popup$1 = /* @__PURE__ */ React.forwardRef(function(_ref, ref2) {
  var visible = _ref.visible, mobile = _ref.mobile, props = _objectWithoutProperties$1(_ref, _excluded);
  var _useState = useState(visible), _useState2 = _slicedToArray$3(_useState, 2), innerVisible = _useState2[0], serInnerVisible = _useState2[1];
  var _useState3 = useState(false), _useState4 = _slicedToArray$3(_useState3, 2), inMobile = _useState4[0], setInMobile = _useState4[1];
  var cloneProps = _objectSpread2$3(_objectSpread2$3({}, props), {}, {
    visible: innerVisible
  });
  useEffect(function() {
    serInnerVisible(visible);
    if (visible && mobile) {
      setInMobile(isMobile());
    }
  }, [visible, mobile]);
  var popupNode = inMobile ? /* @__PURE__ */ React.createElement(MobilePopupInner, _extends$2({}, cloneProps, {
    mobile,
    ref: ref2
  })) : /* @__PURE__ */ React.createElement(PopupInner, _extends$2({}, cloneProps, {
    ref: ref2
  }));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Mask, cloneProps), popupNode);
});
Popup$1.displayName = "Popup";
var TriggerContext = /* @__PURE__ */ React.createContext(null);
function noop() {
}
function returnEmptyString() {
  return "";
}
function returnDocument(element) {
  if (element) {
    return element.ownerDocument;
  }
  return window.document;
}
var ALL_HANDLERS = ["onClick", "onMouseDown", "onTouchStart", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur", "onContextMenu"];
function generateTrigger(PortalComponent) {
  var Trigger2 = /* @__PURE__ */ function(_React$Component) {
    _inherits$1(Trigger3, _React$Component);
    var _super = _createSuper(Trigger3);
    function Trigger3(props) {
      var _this2;
      _classCallCheck$1(this, Trigger3);
      _this2 = _super.call(this, props);
      _defineProperty$4(_assertThisInitialized$1(_this2), "popupRef", /* @__PURE__ */ React.createRef());
      _defineProperty$4(_assertThisInitialized$1(_this2), "triggerRef", /* @__PURE__ */ React.createRef());
      _defineProperty$4(_assertThisInitialized$1(_this2), "portalContainer", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "attachId", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "clickOutsideHandler", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "touchOutsideHandler", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "contextMenuOutsideHandler1", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "contextMenuOutsideHandler2", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "mouseDownTimeout", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "focusTime", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "preClickTime", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "preTouchTime", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "delayTimer", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "hasPopupMouseDown", void 0);
      _defineProperty$4(_assertThisInitialized$1(_this2), "onMouseEnter", function(e) {
        var mouseEnterDelay = _this2.props.mouseEnterDelay;
        _this2.fireEvents("onMouseEnter", e);
        _this2.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onMouseMove", function(e) {
        _this2.fireEvents("onMouseMove", e);
        _this2.setPoint(e);
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onMouseLeave", function(e) {
        _this2.fireEvents("onMouseLeave", e);
        _this2.delaySetPopupVisible(false, _this2.props.mouseLeaveDelay);
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onPopupMouseEnter", function() {
        _this2.clearDelayTimer();
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onPopupMouseLeave", function(e) {
        var _this$popupRef$curren;
        if (e.relatedTarget && !e.relatedTarget.setTimeout && contains$1((_this$popupRef$curren = _this2.popupRef.current) === null || _this$popupRef$curren === void 0 ? void 0 : _this$popupRef$curren.getElement(), e.relatedTarget)) {
          return;
        }
        _this2.delaySetPopupVisible(false, _this2.props.mouseLeaveDelay);
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onFocus", function(e) {
        _this2.fireEvents("onFocus", e);
        _this2.clearDelayTimer();
        if (_this2.isFocusToShow()) {
          _this2.focusTime = Date.now();
          _this2.delaySetPopupVisible(true, _this2.props.focusDelay);
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onMouseDown", function(e) {
        _this2.fireEvents("onMouseDown", e);
        _this2.preClickTime = Date.now();
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onTouchStart", function(e) {
        _this2.fireEvents("onTouchStart", e);
        _this2.preTouchTime = Date.now();
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onBlur", function(e) {
        _this2.fireEvents("onBlur", e);
        _this2.clearDelayTimer();
        if (_this2.isBlurToHide()) {
          _this2.delaySetPopupVisible(false, _this2.props.blurDelay);
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onContextMenu", function(e) {
        e.preventDefault();
        _this2.fireEvents("onContextMenu", e);
        _this2.setPopupVisible(true, e);
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onContextMenuClose", function() {
        if (_this2.isContextMenuToShow()) {
          _this2.close();
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onClick", function(event) {
        _this2.fireEvents("onClick", event);
        if (_this2.focusTime) {
          var preTime;
          if (_this2.preClickTime && _this2.preTouchTime) {
            preTime = Math.min(_this2.preClickTime, _this2.preTouchTime);
          } else if (_this2.preClickTime) {
            preTime = _this2.preClickTime;
          } else if (_this2.preTouchTime) {
            preTime = _this2.preTouchTime;
          }
          if (Math.abs(preTime - _this2.focusTime) < 20) {
            return;
          }
          _this2.focusTime = 0;
        }
        _this2.preClickTime = 0;
        _this2.preTouchTime = 0;
        if (_this2.isClickToShow() && (_this2.isClickToHide() || _this2.isBlurToHide()) && event && event.preventDefault) {
          event.preventDefault();
        }
        var nextVisible = !_this2.state.popupVisible;
        if (_this2.isClickToHide() && !nextVisible || nextVisible && _this2.isClickToShow()) {
          _this2.setPopupVisible(!_this2.state.popupVisible, event);
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onPopupMouseDown", function() {
        _this2.hasPopupMouseDown = true;
        clearTimeout(_this2.mouseDownTimeout);
        _this2.mouseDownTimeout = window.setTimeout(function() {
          _this2.hasPopupMouseDown = false;
        }, 0);
        if (_this2.context) {
          var _this$context;
          (_this$context = _this2.context).onPopupMouseDown.apply(_this$context, arguments);
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "onDocumentClick", function(event) {
        if (_this2.props.mask && !_this2.props.maskClosable) {
          return;
        }
        var target = event.target;
        var root2 = _this2.getRootDomNode();
        var popupNode = _this2.getPopupDomNode();
        if (
          // mousedown on the target should also close popup when action is contextMenu.
          // https://github.com/ant-design/ant-design/issues/29853
          (!contains$1(root2, target) || _this2.isContextMenuOnly()) && !contains$1(popupNode, target) && !_this2.hasPopupMouseDown
        ) {
          _this2.close();
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "getRootDomNode", function() {
        var getTriggerDOMNode = _this2.props.getTriggerDOMNode;
        if (getTriggerDOMNode) {
          return getTriggerDOMNode(_this2.triggerRef.current);
        }
        try {
          var domNode = findDOMNode(_this2.triggerRef.current);
          if (domNode) {
            return domNode;
          }
        } catch (err) {
        }
        return ReactDOM__default.findDOMNode(_assertThisInitialized$1(_this2));
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "getPopupClassNameFromAlign", function(align) {
        var className = [];
        var _this$props = _this2.props, popupPlacement = _this$props.popupPlacement, builtinPlacements = _this$props.builtinPlacements, prefixCls = _this$props.prefixCls, alignPoint2 = _this$props.alignPoint, getPopupClassNameFromAlign = _this$props.getPopupClassNameFromAlign;
        if (popupPlacement && builtinPlacements) {
          className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint2));
        }
        if (getPopupClassNameFromAlign) {
          className.push(getPopupClassNameFromAlign(align));
        }
        return className.join(" ");
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "getComponent", function() {
        var _this$props2 = _this2.props, prefixCls = _this$props2.prefixCls, destroyPopupOnHide = _this$props2.destroyPopupOnHide, popupClassName = _this$props2.popupClassName, onPopupAlign = _this$props2.onPopupAlign, popupMotion = _this$props2.popupMotion, popupAnimation = _this$props2.popupAnimation, popupTransitionName = _this$props2.popupTransitionName, popupStyle = _this$props2.popupStyle, mask = _this$props2.mask, maskAnimation = _this$props2.maskAnimation, maskTransitionName = _this$props2.maskTransitionName, maskMotion = _this$props2.maskMotion, zIndex = _this$props2.zIndex, popup = _this$props2.popup, stretch = _this$props2.stretch, alignPoint2 = _this$props2.alignPoint, mobile = _this$props2.mobile, forceRender = _this$props2.forceRender, onPopupClick = _this$props2.onPopupClick;
        var _this$state = _this2.state, popupVisible = _this$state.popupVisible, point = _this$state.point;
        var align = _this2.getPopupAlign();
        var mouseProps = {};
        if (_this2.isMouseEnterToShow()) {
          mouseProps.onMouseEnter = _this2.onPopupMouseEnter;
        }
        if (_this2.isMouseLeaveToHide()) {
          mouseProps.onMouseLeave = _this2.onPopupMouseLeave;
        }
        mouseProps.onMouseDown = _this2.onPopupMouseDown;
        mouseProps.onTouchStart = _this2.onPopupMouseDown;
        return /* @__PURE__ */ React.createElement(Popup$1, _extends$2({
          prefixCls,
          destroyPopupOnHide,
          visible: popupVisible,
          point: alignPoint2 && point,
          className: popupClassName,
          align,
          onAlign: onPopupAlign,
          animation: popupAnimation,
          getClassNameFromAlign: _this2.getPopupClassNameFromAlign
        }, mouseProps, {
          stretch,
          getRootDomNode: _this2.getRootDomNode,
          style: popupStyle,
          mask,
          zIndex,
          transitionName: popupTransitionName,
          maskAnimation,
          maskTransitionName,
          maskMotion,
          ref: _this2.popupRef,
          motion: popupMotion,
          mobile,
          forceRender,
          onClick: onPopupClick
        }), typeof popup === "function" ? popup() : popup);
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "attachParent", function(popupContainer) {
        wrapperRaf$1.cancel(_this2.attachId);
        var _this$props3 = _this2.props, getPopupContainer = _this$props3.getPopupContainer, getDocument2 = _this$props3.getDocument;
        var domNode = _this2.getRootDomNode();
        var mountNode;
        if (!getPopupContainer) {
          mountNode = getDocument2(_this2.getRootDomNode()).body;
        } else if (domNode || getPopupContainer.length === 0) {
          mountNode = getPopupContainer(domNode);
        }
        if (mountNode) {
          mountNode.appendChild(popupContainer);
        } else {
          _this2.attachId = wrapperRaf$1(function() {
            _this2.attachParent(popupContainer);
          });
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "getContainer", function() {
        if (!_this2.portalContainer) {
          var getDocument2 = _this2.props.getDocument;
          var popupContainer = getDocument2(_this2.getRootDomNode()).createElement("div");
          popupContainer.style.position = "absolute";
          popupContainer.style.top = "0";
          popupContainer.style.left = "0";
          popupContainer.style.width = "100%";
          _this2.portalContainer = popupContainer;
        }
        _this2.attachParent(_this2.portalContainer);
        return _this2.portalContainer;
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "setPoint", function(point) {
        var alignPoint2 = _this2.props.alignPoint;
        if (!alignPoint2 || !point)
          return;
        _this2.setState({
          point: {
            pageX: point.pageX,
            pageY: point.pageY
          }
        });
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "handlePortalUpdate", function() {
        if (_this2.state.prevPopupVisible !== _this2.state.popupVisible) {
          _this2.props.afterPopupVisibleChange(_this2.state.popupVisible);
        }
      });
      _defineProperty$4(_assertThisInitialized$1(_this2), "triggerContextValue", {
        onPopupMouseDown: _this2.onPopupMouseDown
      });
      var _popupVisible;
      if ("popupVisible" in props) {
        _popupVisible = !!props.popupVisible;
      } else {
        _popupVisible = !!props.defaultPopupVisible;
      }
      _this2.state = {
        prevPopupVisible: _popupVisible,
        popupVisible: _popupVisible
      };
      ALL_HANDLERS.forEach(function(h2) {
        _this2["fire".concat(h2)] = function(e) {
          _this2.fireEvents(h2, e);
        };
      });
      return _this2;
    }
    _createClass$1(Trigger3, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.componentDidUpdate();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var props = this.props;
        var state = this.state;
        if (state.popupVisible) {
          var currentDocument;
          if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
            currentDocument = props.getDocument(this.getRootDomNode());
            this.clickOutsideHandler = addEventListenerWrap(currentDocument, "mousedown", this.onDocumentClick);
          }
          if (!this.touchOutsideHandler) {
            currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
            this.touchOutsideHandler = addEventListenerWrap(currentDocument, "touchstart", this.onDocumentClick);
          }
          if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
            currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
            this.contextMenuOutsideHandler1 = addEventListenerWrap(currentDocument, "scroll", this.onContextMenuClose);
          }
          if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
            this.contextMenuOutsideHandler2 = addEventListenerWrap(window, "blur", this.onContextMenuClose);
          }
          return;
        }
        this.clearOutsideHandler();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearDelayTimer();
        this.clearOutsideHandler();
        clearTimeout(this.mouseDownTimeout);
        wrapperRaf$1.cancel(this.attachId);
      }
    }, {
      key: "getPopupDomNode",
      value: function getPopupDomNode() {
        var _this$popupRef$curren2;
        return ((_this$popupRef$curren2 = this.popupRef.current) === null || _this$popupRef$curren2 === void 0 ? void 0 : _this$popupRef$curren2.getElement()) || null;
      }
    }, {
      key: "getPopupAlign",
      value: function getPopupAlign() {
        var props = this.props;
        var popupPlacement = props.popupPlacement, popupAlign = props.popupAlign, builtinPlacements = props.builtinPlacements;
        if (popupPlacement && builtinPlacements) {
          return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
        }
        return popupAlign;
      }
    }, {
      key: "setPopupVisible",
      value: (
        /**
         * @param popupVisible    Show or not the popup element
         * @param event           SyntheticEvent, used for `pointAlign`
         */
        function setPopupVisible(popupVisible, event) {
          var alignPoint2 = this.props.alignPoint;
          var prevPopupVisible = this.state.popupVisible;
          this.clearDelayTimer();
          if (prevPopupVisible !== popupVisible) {
            if (!("popupVisible" in this.props)) {
              this.setState({
                popupVisible,
                prevPopupVisible
              });
            }
            this.props.onPopupVisibleChange(popupVisible);
          }
          if (alignPoint2 && event && popupVisible) {
            this.setPoint(event);
          }
        }
      )
    }, {
      key: "delaySetPopupVisible",
      value: function delaySetPopupVisible(visible, delayS, event) {
        var _this2 = this;
        var delay = delayS * 1e3;
        this.clearDelayTimer();
        if (delay) {
          var point = event ? {
            pageX: event.pageX,
            pageY: event.pageY
          } : null;
          this.delayTimer = window.setTimeout(function() {
            _this2.setPopupVisible(visible, point);
            _this2.clearDelayTimer();
          }, delay);
        } else {
          this.setPopupVisible(visible, event);
        }
      }
    }, {
      key: "clearDelayTimer",
      value: function clearDelayTimer() {
        if (this.delayTimer) {
          clearTimeout(this.delayTimer);
          this.delayTimer = null;
        }
      }
    }, {
      key: "clearOutsideHandler",
      value: function clearOutsideHandler() {
        if (this.clickOutsideHandler) {
          this.clickOutsideHandler.remove();
          this.clickOutsideHandler = null;
        }
        if (this.contextMenuOutsideHandler1) {
          this.contextMenuOutsideHandler1.remove();
          this.contextMenuOutsideHandler1 = null;
        }
        if (this.contextMenuOutsideHandler2) {
          this.contextMenuOutsideHandler2.remove();
          this.contextMenuOutsideHandler2 = null;
        }
        if (this.touchOutsideHandler) {
          this.touchOutsideHandler.remove();
          this.touchOutsideHandler = null;
        }
      }
    }, {
      key: "createTwoChains",
      value: function createTwoChains(event) {
        var childPros = this.props.children.props;
        var props = this.props;
        if (childPros[event] && props[event]) {
          return this["fire".concat(event)];
        }
        return childPros[event] || props[event];
      }
    }, {
      key: "isClickToShow",
      value: function isClickToShow() {
        var _this$props4 = this.props, action = _this$props4.action, showAction = _this$props4.showAction;
        return action.indexOf("click") !== -1 || showAction.indexOf("click") !== -1;
      }
    }, {
      key: "isContextMenuOnly",
      value: function isContextMenuOnly() {
        var action = this.props.action;
        return action === "contextMenu" || action.length === 1 && action[0] === "contextMenu";
      }
    }, {
      key: "isContextMenuToShow",
      value: function isContextMenuToShow() {
        var _this$props5 = this.props, action = _this$props5.action, showAction = _this$props5.showAction;
        return action.indexOf("contextMenu") !== -1 || showAction.indexOf("contextMenu") !== -1;
      }
    }, {
      key: "isClickToHide",
      value: function isClickToHide() {
        var _this$props6 = this.props, action = _this$props6.action, hideAction = _this$props6.hideAction;
        return action.indexOf("click") !== -1 || hideAction.indexOf("click") !== -1;
      }
    }, {
      key: "isMouseEnterToShow",
      value: function isMouseEnterToShow() {
        var _this$props7 = this.props, action = _this$props7.action, showAction = _this$props7.showAction;
        return action.indexOf("hover") !== -1 || showAction.indexOf("mouseEnter") !== -1;
      }
    }, {
      key: "isMouseLeaveToHide",
      value: function isMouseLeaveToHide() {
        var _this$props8 = this.props, action = _this$props8.action, hideAction = _this$props8.hideAction;
        return action.indexOf("hover") !== -1 || hideAction.indexOf("mouseLeave") !== -1;
      }
    }, {
      key: "isFocusToShow",
      value: function isFocusToShow() {
        var _this$props9 = this.props, action = _this$props9.action, showAction = _this$props9.showAction;
        return action.indexOf("focus") !== -1 || showAction.indexOf("focus") !== -1;
      }
    }, {
      key: "isBlurToHide",
      value: function isBlurToHide() {
        var _this$props10 = this.props, action = _this$props10.action, hideAction = _this$props10.hideAction;
        return action.indexOf("focus") !== -1 || hideAction.indexOf("blur") !== -1;
      }
    }, {
      key: "forcePopupAlign",
      value: function forcePopupAlign() {
        if (this.state.popupVisible) {
          var _this$popupRef$curren3;
          (_this$popupRef$curren3 = this.popupRef.current) === null || _this$popupRef$curren3 === void 0 ? void 0 : _this$popupRef$curren3.forceAlign();
        }
      }
    }, {
      key: "fireEvents",
      value: function fireEvents(type4, e) {
        var childCallback = this.props.children.props[type4];
        if (childCallback) {
          childCallback(e);
        }
        var callback = this.props[type4];
        if (callback) {
          callback(e);
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.setPopupVisible(false);
      }
    }, {
      key: "render",
      value: function render2() {
        var popupVisible = this.state.popupVisible;
        var _this$props11 = this.props, children = _this$props11.children, forceRender = _this$props11.forceRender, alignPoint2 = _this$props11.alignPoint, className = _this$props11.className, autoDestroy = _this$props11.autoDestroy;
        var child = React.Children.only(children);
        var newChildProps = {
          key: "trigger"
        };
        if (this.isContextMenuToShow()) {
          newChildProps.onContextMenu = this.onContextMenu;
        } else {
          newChildProps.onContextMenu = this.createTwoChains("onContextMenu");
        }
        if (this.isClickToHide() || this.isClickToShow()) {
          newChildProps.onClick = this.onClick;
          newChildProps.onMouseDown = this.onMouseDown;
          newChildProps.onTouchStart = this.onTouchStart;
        } else {
          newChildProps.onClick = this.createTwoChains("onClick");
          newChildProps.onMouseDown = this.createTwoChains("onMouseDown");
          newChildProps.onTouchStart = this.createTwoChains("onTouchStart");
        }
        if (this.isMouseEnterToShow()) {
          newChildProps.onMouseEnter = this.onMouseEnter;
          if (alignPoint2) {
            newChildProps.onMouseMove = this.onMouseMove;
          }
        } else {
          newChildProps.onMouseEnter = this.createTwoChains("onMouseEnter");
        }
        if (this.isMouseLeaveToHide()) {
          newChildProps.onMouseLeave = this.onMouseLeave;
        } else {
          newChildProps.onMouseLeave = this.createTwoChains("onMouseLeave");
        }
        if (this.isFocusToShow() || this.isBlurToHide()) {
          newChildProps.onFocus = this.onFocus;
          newChildProps.onBlur = this.onBlur;
        } else {
          newChildProps.onFocus = this.createTwoChains("onFocus");
          newChildProps.onBlur = this.createTwoChains("onBlur");
        }
        var childrenClassName = classNames(child && child.props && child.props.className, className);
        if (childrenClassName) {
          newChildProps.className = childrenClassName;
        }
        var cloneProps = _objectSpread2$3({}, newChildProps);
        if (supportRef(child)) {
          cloneProps.ref = composeRef(this.triggerRef, child.ref);
        }
        var trigger = /* @__PURE__ */ React.cloneElement(child, cloneProps);
        var portal;
        if (popupVisible || this.popupRef.current || forceRender) {
          portal = /* @__PURE__ */ React.createElement(PortalComponent, {
            key: "portal",
            getContainer: this.getContainer,
            didUpdate: this.handlePortalUpdate
          }, this.getComponent());
        }
        if (!popupVisible && autoDestroy) {
          portal = null;
        }
        return /* @__PURE__ */ React.createElement(TriggerContext.Provider, {
          value: this.triggerContextValue
        }, trigger, portal);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(_ref, prevState) {
        var popupVisible = _ref.popupVisible;
        var newState = {};
        if (popupVisible !== void 0 && prevState.popupVisible !== popupVisible) {
          newState.popupVisible = popupVisible;
          newState.prevPopupVisible = prevState.popupVisible;
        }
        return newState;
      }
    }]);
    return Trigger3;
  }(React.Component);
  _defineProperty$4(Trigger2, "contextType", TriggerContext);
  _defineProperty$4(Trigger2, "defaultProps", {
    prefixCls: "rc-trigger-popup",
    getPopupClassNameFromAlign: returnEmptyString,
    getDocument: returnDocument,
    onPopupVisibleChange: noop,
    afterPopupVisibleChange: noop,
    onPopupAlign: noop,
    popupClassName: "",
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    focusDelay: 0,
    blurDelay: 0.15,
    popupStyle: {},
    destroyPopupOnHide: false,
    popupAlign: {},
    defaultPopupVisible: false,
    mask: false,
    maskClosable: true,
    action: [],
    showAction: [],
    hideAction: [],
    autoDestroy: false
  });
  return Trigger2;
}
const Trigger = generateTrigger(Portal$1);
var FormItemInputContext = /* @__PURE__ */ React.createContext({});
var NoFormStyle = function NoFormStyle2(_ref) {
  var children = _ref.children, status = _ref.status, override = _ref.override;
  var formItemInputContext = useContext(FormItemInputContext);
  var newFormItemInputContext = useMemo$1(function() {
    var newContext = _extends$2({}, formItemInputContext);
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);
  return /* @__PURE__ */ React.createElement(FormItemInputContext.Provider, {
    value: newFormItemInputContext
  }, children);
};
var tuple = function tuple2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
var getTransitionName = function getTransitionName2(rootPrefixCls, motion, transitionName) {
  if (transitionName !== void 0) {
    return transitionName;
  }
  return rootPrefixCls + "-" + motion;
};
var LoadingOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };
const LoadingOutlinedSvg = LoadingOutlined$2;
var LoadingOutlined = function LoadingOutlined2(props, ref2) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2$2(_objectSpread2$2({}, props), {}, {
    ref: ref2,
    icon: LoadingOutlinedSvg
  }));
};
LoadingOutlined.displayName = "LoadingOutlined";
const LoadingOutlined$1 = /* @__PURE__ */ React.forwardRef(LoadingOutlined);
var initMotionCommon = function initMotionCommon2(duration) {
  return {
    animationDuration: duration,
    animationFillMode: "both"
  };
};
var initMotionCommonLeave = function initMotionCommonLeave2(duration) {
  return {
    animationDuration: duration,
    animationFillMode: "both"
  };
};
var initMotion = function initMotion2(motionCls, inKeyframes, outKeyframes, duration) {
  var _ref;
  var sameLevel = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var sameLevelPrefix = sameLevel ? "&" : "";
  return _ref = {}, _defineProperty$4(_ref, "\n      " + sameLevelPrefix + motionCls + "-enter,\n      " + sameLevelPrefix + motionCls + "-appear\n    ", _extends$2(_extends$2({}, initMotionCommon(duration)), {
    animationPlayState: "paused"
  })), _defineProperty$4(_ref, "" + sameLevelPrefix + motionCls + "-leave", _extends$2(_extends$2({}, initMotionCommonLeave(duration)), {
    animationPlayState: "paused"
  })), _defineProperty$4(_ref, "\n      " + sameLevelPrefix + motionCls + "-enter" + motionCls + "-enter-active,\n      " + sameLevelPrefix + motionCls + "-appear" + motionCls + "-appear-active\n    ", {
    animationName: inKeyframes,
    animationPlayState: "running"
  }), _defineProperty$4(_ref, "" + sameLevelPrefix + motionCls + "-leave" + motionCls + "-leave-active", {
    animationName: outKeyframes,
    animationPlayState: "running",
    pointerEvents: "none"
  }), _ref;
};
var zoomIn = new Keyframe("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
var zoomOut = new Keyframe("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
var zoomBigIn = new Keyframe("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
var zoomBigOut = new Keyframe("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
var zoomUpIn = new Keyframe("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
var zoomUpOut = new Keyframe("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
var zoomLeftIn = new Keyframe("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
var zoomLeftOut = new Keyframe("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
var zoomRightIn = new Keyframe("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
var zoomRightOut = new Keyframe("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
var zoomDownIn = new Keyframe("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
var zoomDownOut = new Keyframe("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
var zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
var initZoomMotion = function initZoomMotion2(token2, motionName) {
  var _ref;
  var antCls = token2.antCls;
  var motionCls = antCls + "-" + motionName;
  var _zoomMotion$motionNam = zoomMotion[motionName], inKeyframes = _zoomMotion$motionNam.inKeyframes, outKeyframes = _zoomMotion$motionNam.outKeyframes;
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token2.motionDurationMid : token2.motionDurationMid), (_ref = {}, _defineProperty$4(_ref, "\n        " + motionCls + "-enter,\n        " + motionCls + "-appear\n      ", {
    transform: "scale(0)",
    opacity: 0,
    animationTimingFunction: token2.motionEaseOutCirc,
    "&-prepare": {
      transform: "none"
    }
  }), _defineProperty$4(_ref, motionCls + "-leave", {
    animationTimingFunction: token2.motionEaseInOutCirc
  }), _ref)];
};
function compactItemBorder(token2, borderedItemCls, popoverFocusedCls) {
  var childCombinator = borderedItemCls ? "> *" : "";
  return {
    "&-item:not(&-last-item)": {
      marginInlineEnd: -token2.lineWidth
    },
    "&-item": _extends$2(_extends$2(_defineProperty$4({}, "&:hover " + childCombinator + ", &:focus " + childCombinator + ", &:active " + childCombinator, {
      zIndex: 2
    }), popoverFocusedCls ? _defineProperty$4({}, "&" + popoverFocusedCls, {
      zIndex: 2
    }) : {}), _defineProperty$4({}, "&[disabled] " + childCombinator, {
      zIndex: 0
    }))
  };
}
function compactItemBorderRadius(prefixCls, borderedElementCls) {
  var _ref2;
  var childCombinator = borderedElementCls ? "> " + borderedElementCls : "";
  return _ref2 = {}, _defineProperty$4(_ref2, "&-item:not(&-first-item):not(&-last-item) " + childCombinator, {
    borderRadius: 0
  }), _defineProperty$4(_ref2, "&-item&-first-item", _defineProperty$4({}, "& " + childCombinator + ", &" + prefixCls + "-sm " + childCombinator + ", &" + prefixCls + "-lg " + childCombinator, {
    borderStartEndRadius: 0,
    borderEndEndRadius: 0
  })), _defineProperty$4(_ref2, "&-item&-last-item", _defineProperty$4({}, "& " + childCombinator + ", &" + prefixCls + "-sm " + childCombinator + ", &" + prefixCls + "-lg " + childCombinator, {
    borderStartStartRadius: 0,
    borderEndStartRadius: 0
  })), _ref2;
}
function genCompactItemStyle(token2, prefixCls, borderedElementCls, popoverFocusedCls) {
  return {
    "&-compact": _extends$2(_extends$2({}, compactItemBorder(token2, borderedElementCls, popoverFocusedCls)), compactItemBorderRadius(prefixCls, borderedElementCls))
  };
}
globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var SpaceCompactItemContext = /* @__PURE__ */ React.createContext(null);
var useCompactItemContext = function useCompactItemContext2(prefixCls, direction) {
  var compactItemContext = React.useContext(SpaceCompactItemContext);
  var compactItemClassnames = React.useMemo(function() {
    var _classNames;
    if (!compactItemContext)
      return "";
    var compactDirection = compactItemContext.compactDirection, isFirstItem = compactItemContext.isFirstItem, isLastItem = compactItemContext.isLastItem;
    var separator = compactDirection === "vertical" ? "-vertical-" : "-";
    return classNames((_classNames = {}, _defineProperty$4(_classNames, prefixCls + "-compact" + separator + "item", true), _defineProperty$4(_classNames, prefixCls + "-compact" + separator + "first-item", isFirstItem), _defineProperty$4(_classNames, prefixCls + "-compact" + separator + "last-item", isLastItem), _defineProperty$4(_classNames, prefixCls + "-compact" + separator + "item-rtl", direction === "rtl"), _classNames));
  }, [prefixCls, direction, compactItemContext]);
  return {
    compactSize: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize,
    compactDirection: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection,
    compactItemClassnames
  };
};
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
var targetOffset$1 = [0, 0];
var placements = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset$1
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset$1
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset$1
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset$1
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset$1
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset$1
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset$1
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset$1
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset$1
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset$1
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset$1
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset$1
  }
};
function Popup(props) {
  var showArrow = props.showArrow, arrowContent = props.arrowContent, children = props.children, prefixCls = props.prefixCls, id2 = props.id, overlayInnerStyle = props.overlayInnerStyle, className = props.className, style2 = props.style;
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-content"), className),
    style: style2
  }, showArrow !== false && /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-arrow"),
    key: "arrow"
  }, arrowContent), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-inner"),
    id: id2,
    role: "tooltip",
    style: overlayInnerStyle
  }, typeof children === "function" ? children() : children));
}
var Tooltip$2 = function Tooltip(props, ref2) {
  var overlayClassName = props.overlayClassName, _props$trigger = props.trigger, trigger = _props$trigger === void 0 ? ["hover"] : _props$trigger, _props$mouseEnterDela = props.mouseEnterDelay, mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0 : _props$mouseEnterDela, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela, overlayStyle = props.overlayStyle, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tooltip" : _props$prefixCls, children = props.children, onVisibleChange = props.onVisibleChange, afterVisibleChange = props.afterVisibleChange, transitionName = props.transitionName, animation = props.animation, motion = props.motion, _props$placement = props.placement, placement = _props$placement === void 0 ? "right" : _props$placement, _props$align = props.align, align = _props$align === void 0 ? {} : _props$align, _props$destroyTooltip = props.destroyTooltipOnHide, destroyTooltipOnHide = _props$destroyTooltip === void 0 ? false : _props$destroyTooltip, defaultVisible = props.defaultVisible, getTooltipContainer = props.getTooltipContainer, overlayInnerStyle = props.overlayInnerStyle, arrowContent = props.arrowContent, overlay = props.overlay, id2 = props.id, showArrow = props.showArrow, restProps = _objectWithoutProperties$1(props, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "motion", "placement", "align", "destroyTooltipOnHide", "defaultVisible", "getTooltipContainer", "overlayInnerStyle", "arrowContent", "overlay", "id", "showArrow"]);
  var domRef = useRef(null);
  useImperativeHandle(ref2, function() {
    return domRef.current;
  });
  var extraProps = _objectSpread2$3({}, restProps);
  if ("visible" in props) {
    extraProps.popupVisible = props.visible;
  }
  var getPopupElement = function getPopupElement2() {
    return /* @__PURE__ */ React.createElement(Popup, {
      showArrow,
      arrowContent,
      key: "content",
      prefixCls,
      id: id2,
      overlayInnerStyle
    }, overlay);
  };
  var destroyTooltip = false;
  var autoDestroy = false;
  if (typeof destroyTooltipOnHide === "boolean") {
    destroyTooltip = destroyTooltipOnHide;
  } else if (destroyTooltipOnHide && _typeof$3(destroyTooltipOnHide) === "object") {
    var keepParent = destroyTooltipOnHide.keepParent;
    destroyTooltip = keepParent === true;
    autoDestroy = keepParent === false;
  }
  return /* @__PURE__ */ React.createElement(Trigger, _extends$2({
    popupClassName: overlayClassName,
    prefixCls,
    popup: getPopupElement,
    action: trigger,
    builtinPlacements: placements,
    popupPlacement: placement,
    ref: domRef,
    popupAlign: align,
    getPopupContainer: getTooltipContainer,
    onPopupVisibleChange: onVisibleChange,
    afterPopupVisibleChange: afterVisibleChange,
    popupTransitionName: transitionName,
    popupAnimation: animation,
    popupMotion: motion,
    defaultPopupVisible: defaultVisible,
    destroyPopupOnHide: destroyTooltip,
    autoDestroy,
    mouseLeaveDelay,
    popupStyle: overlayStyle,
    mouseEnterDelay
  }, extraProps), children);
};
const Tooltip$3 = /* @__PURE__ */ forwardRef(Tooltip$2);
var autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1
};
var autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0
};
var targetOffset = [0, 0];
function getOverflowOptions(autoAdjustOverflow2) {
  if (typeof autoAdjustOverflow2 === "boolean") {
    return autoAdjustOverflow2 ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return _extends$2(_extends$2({}, autoAdjustOverflowDisabled), autoAdjustOverflow2);
}
function getPlacements(config) {
  var _config$arrowWidth = config.arrowWidth, arrowWidth = _config$arrowWidth === void 0 ? 4 : _config$arrowWidth, _config$horizontalArr = config.horizontalArrowShift, horizontalArrowShift = _config$horizontalArr === void 0 ? 16 : _config$horizontalArr, _config$verticalArrow = config.verticalArrowShift, verticalArrowShift = _config$verticalArrow === void 0 ? 8 : _config$verticalArrow, autoAdjustOverflow2 = config.autoAdjustOverflow, arrowPointAtCenter = config.arrowPointAtCenter;
  var placementMap = {
    left: {
      points: ["cr", "cl"],
      offset: [-4, 0]
    },
    right: {
      points: ["cl", "cr"],
      offset: [4, 0]
    },
    top: {
      points: ["bc", "tc"],
      offset: [0, -4]
    },
    bottom: {
      points: ["tc", "bc"],
      offset: [0, 4]
    },
    topLeft: {
      points: ["bl", "tc"],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ["tr", "cl"],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ["br", "tc"],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ["tl", "cr"],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ["tr", "bc"],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ["bl", "cr"],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ["tl", "bc"],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ["br", "cl"],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  Object.keys(placementMap).forEach(function(key) {
    placementMap[key] = arrowPointAtCenter ? _extends$2(_extends$2({}, placementMap[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow2),
      targetOffset
    }) : _extends$2(_extends$2({}, placements[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow2)
    });
    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}
function connectArrowCls(classList) {
  var showArrowCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return classList.map(function(cls) {
    return "" + showArrowCls + cls;
  }).join(",");
}
var MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffset(options) {
  var maxVerticalContentRadius = MAX_VERTICAL_CONTENT_RADIUS;
  var sizePopupArrow = options.sizePopupArrow, contentRadius = options.contentRadius, borderRadiusOuter = options.borderRadiusOuter, limitVerticalRadius = options.limitVerticalRadius;
  var arrowInnerOffset = sizePopupArrow / 2 - Math.ceil(borderRadiusOuter * (Math.sqrt(2) - 1));
  var dropdownArrowOffset = (contentRadius > 12 ? contentRadius + 2 : 12) - arrowInnerOffset;
  var dropdownArrowOffsetVertical = limitVerticalRadius ? maxVerticalContentRadius - arrowInnerOffset : dropdownArrowOffset;
  return {
    dropdownArrowOffset,
    dropdownArrowOffsetVertical
  };
}
function getArrowStyle(token2, options) {
  var _componentCls;
  var componentCls = token2.componentCls, sizePopupArrow = token2.sizePopupArrow, marginXXS = token2.marginXXS, borderRadiusXS = token2.borderRadiusXS, borderRadiusOuter = token2.borderRadiusOuter, boxShadowPopoverArrow = token2.boxShadowPopoverArrow;
  var colorBg = options.colorBg, showArrowCls = options.showArrowCls, _options$contentRadiu = options.contentRadius, contentRadius = _options$contentRadiu === void 0 ? token2.borderRadiusLG : _options$contentRadiu, limitVerticalRadius = options.limitVerticalRadius;
  var _getArrowOffset = getArrowOffset({
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  }), dropdownArrowOffsetVertical = _getArrowOffset.dropdownArrowOffsetVertical, dropdownArrowOffset = _getArrowOffset.dropdownArrowOffset;
  var dropdownArrowDistance = sizePopupArrow / 2 + marginXXS;
  return _defineProperty$4({}, componentCls, (_componentCls = {}, _defineProperty$4(_componentCls, componentCls + "-arrow", [_extends$2(_extends$2({
    position: "absolute",
    zIndex: 1,
    display: "block"
  }, roundedArrow(sizePopupArrow, borderRadiusXS, borderRadiusOuter, colorBg, boxShadowPopoverArrow)), {
    "&:before": {
      background: colorBg
    }
  })]), _defineProperty$4(_componentCls, ["&-placement-top " + componentCls + "-arrow", "&-placement-topLeft " + componentCls + "-arrow", "&-placement-topRight " + componentCls + "-arrow"].join(","), {
    bottom: 0,
    transform: "translateY(100%) rotate(180deg)"
  }), _defineProperty$4(_componentCls, "&-placement-top " + componentCls + "-arrow", {
    left: {
      _skip_check_: true,
      value: "50%"
    },
    transform: "translateX(-50%) translateY(100%) rotate(180deg)"
  }), _defineProperty$4(_componentCls, "&-placement-topLeft " + componentCls + "-arrow", {
    left: {
      _skip_check_: true,
      value: dropdownArrowOffset
    }
  }), _defineProperty$4(_componentCls, "&-placement-topRight " + componentCls + "-arrow", {
    right: {
      _skip_check_: true,
      value: dropdownArrowOffset
    }
  }), _defineProperty$4(_componentCls, ["&-placement-bottom " + componentCls + "-arrow", "&-placement-bottomLeft " + componentCls + "-arrow", "&-placement-bottomRight " + componentCls + "-arrow"].join(","), {
    top: 0,
    transform: "translateY(-100%)"
  }), _defineProperty$4(_componentCls, "&-placement-bottom " + componentCls + "-arrow", {
    left: {
      _skip_check_: true,
      value: "50%"
    },
    transform: "translateX(-50%) translateY(-100%)"
  }), _defineProperty$4(_componentCls, "&-placement-bottomLeft " + componentCls + "-arrow", {
    left: {
      _skip_check_: true,
      value: dropdownArrowOffset
    }
  }), _defineProperty$4(_componentCls, "&-placement-bottomRight " + componentCls + "-arrow", {
    right: {
      _skip_check_: true,
      value: dropdownArrowOffset
    }
  }), _defineProperty$4(_componentCls, ["&-placement-left " + componentCls + "-arrow", "&-placement-leftTop " + componentCls + "-arrow", "&-placement-leftBottom " + componentCls + "-arrow"].join(","), {
    right: {
      _skip_check_: true,
      value: 0
    },
    transform: "translateX(100%) rotate(90deg)"
  }), _defineProperty$4(_componentCls, "&-placement-left " + componentCls + "-arrow", {
    top: {
      _skip_check_: true,
      value: "50%"
    },
    transform: "translateY(-50%) translateX(100%) rotate(90deg)"
  }), _defineProperty$4(_componentCls, "&-placement-leftTop " + componentCls + "-arrow", {
    top: dropdownArrowOffsetVertical
  }), _defineProperty$4(_componentCls, "&-placement-leftBottom " + componentCls + "-arrow", {
    bottom: dropdownArrowOffsetVertical
  }), _defineProperty$4(_componentCls, ["&-placement-right " + componentCls + "-arrow", "&-placement-rightTop " + componentCls + "-arrow", "&-placement-rightBottom " + componentCls + "-arrow"].join(","), {
    left: {
      _skip_check_: true,
      value: 0
    },
    transform: "translateX(-100%) rotate(-90deg)"
  }), _defineProperty$4(_componentCls, "&-placement-right " + componentCls + "-arrow", {
    top: {
      _skip_check_: true,
      value: "50%"
    },
    transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
  }), _defineProperty$4(_componentCls, "&-placement-rightTop " + componentCls + "-arrow", {
    top: dropdownArrowOffsetVertical
  }), _defineProperty$4(_componentCls, "&-placement-rightBottom " + componentCls + "-arrow", {
    bottom: dropdownArrowOffsetVertical
  }), _defineProperty$4(_componentCls, connectArrowCls(["&-placement-topLeft", "&-placement-top", "&-placement-topRight"], showArrowCls), {
    paddingBottom: dropdownArrowDistance
  }), _defineProperty$4(_componentCls, connectArrowCls(["&-placement-bottomLeft", "&-placement-bottom", "&-placement-bottomRight"], showArrowCls), {
    paddingTop: dropdownArrowDistance
  }), _defineProperty$4(_componentCls, connectArrowCls(["&-placement-leftTop", "&-placement-left", "&-placement-leftBottom"], showArrowCls), {
    paddingRight: {
      _skip_check_: true,
      value: dropdownArrowDistance
    }
  }), _defineProperty$4(_componentCls, connectArrowCls(["&-placement-rightTop", "&-placement-right", "&-placement-rightBottom"], showArrowCls), {
    paddingLeft: {
      _skip_check_: true,
      value: dropdownArrowDistance
    }
  }), _componentCls));
}
var generatorTooltipPresetColor = function generatorTooltipPresetColor2(token2) {
  var componentCls = token2.componentCls;
  return PresetColors.reduce(function(previousValue, currentValue) {
    var _previousValue;
    var lightColor = token2[currentValue + "-6"];
    previousValue["&" + componentCls + "-" + currentValue] = (_previousValue = {}, _defineProperty$4(_previousValue, componentCls + "-inner", {
      backgroundColor: lightColor
    }), _defineProperty$4(_previousValue, componentCls + "-arrow", {
      "--antd-arrow-background-color": lightColor
    }), _previousValue);
    return previousValue;
  }, {});
};
var genTooltipStyle = function genTooltipStyle2(token2) {
  var _extends2;
  var componentCls = token2.componentCls, tooltipMaxWidth = token2.tooltipMaxWidth, tooltipColor = token2.tooltipColor, tooltipBg = token2.tooltipBg, tooltipBorderRadius = token2.tooltipBorderRadius, zIndexPopup = token2.zIndexPopup, controlHeight = token2.controlHeight, boxShadowSecondary = token2.boxShadowSecondary, paddingSM = token2.paddingSM, paddingXS = token2.paddingXS, tooltipRadiusOuter = token2.tooltipRadiusOuter;
  return [
    _defineProperty$4({}, componentCls, _extends$2(_extends$2(_extends$2(_extends$2({}, resetComponent(token2)), (_extends2 = {
      position: "absolute",
      zIndex: zIndexPopup,
      display: "block",
      "&": [{
        width: "max-content"
      }, {
        width: "intrinsic"
      }],
      maxWidth: tooltipMaxWidth,
      visibility: "visible",
      "&-hidden": {
        display: "none"
      },
      "--antd-arrow-background-color": tooltipBg
    }, _defineProperty$4(_extends2, componentCls + "-inner", {
      minWidth: controlHeight,
      minHeight: controlHeight,
      padding: paddingSM / 2 + "px " + paddingXS + "px",
      color: tooltipColor,
      textAlign: "start",
      textDecoration: "none",
      wordWrap: "break-word",
      backgroundColor: tooltipBg,
      borderRadius: tooltipBorderRadius,
      boxShadow: boxShadowSecondary
    }), _defineProperty$4(_extends2, ["&-placement-left", "&-placement-leftTop", "&-placement-leftBottom", "&-placement-right", "&-placement-rightTop", "&-placement-rightBottom"].join(","), _defineProperty$4({}, componentCls + "-inner", {
      borderRadius: tooltipBorderRadius > MAX_VERTICAL_CONTENT_RADIUS ? MAX_VERTICAL_CONTENT_RADIUS : tooltipBorderRadius
    })), _defineProperty$4(_extends2, componentCls + "-content", {
      position: "relative"
    }), _extends2)), generatorTooltipPresetColor(token2)), {
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    })),
    // Arrow Style
    getArrowStyle(merge(token2, {
      borderRadiusOuter: tooltipRadiusOuter
    }), {
      colorBg: "var(--antd-arrow-background-color)",
      showArrowCls: "",
      contentRadius: tooltipBorderRadius,
      limitVerticalRadius: true
    }),
    // Pure Render
    _defineProperty$4({}, componentCls + "-pure", {
      position: "relative",
      maxWidth: "none"
    })
  ];
};
const useStyle$4 = function(prefixCls, injectStyle) {
  var useOriginHook = genComponentStyleHook("Tooltip", function(token2) {
    if (injectStyle === false) {
      return [];
    }
    var borderRadius = token2.borderRadius, colorTextLightSolid = token2.colorTextLightSolid, colorBgDefault = token2.colorBgDefault, borderRadiusOuter = token2.borderRadiusOuter;
    var TooltipToken = merge(token2, {
      // default variables
      tooltipMaxWidth: 250,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgDefault,
      tooltipRadiusOuter: borderRadiusOuter > 4 ? 4 : borderRadiusOuter
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token2, "zoom-big-fast")];
  }, function(_ref3) {
    var zIndexPopupBase = _ref3.zIndexPopupBase, colorBgSpotlight = _ref3.colorBgSpotlight;
    return {
      zIndexPopup: zIndexPopupBase + 70,
      colorBgDefault: colorBgSpotlight
    };
  });
  return useOriginHook(prefixCls);
};
tuple("success", "processing", "error", "default", "warning");
var PresetColorTypes = tuple("pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime");
var PresetColorRegex = new RegExp("^(" + PresetColorTypes.join("|") + ")(-inverse)?$");
function parseColor(prefixCls, color) {
  var className = classNames(_defineProperty$4({}, prefixCls + "-" + color, color && PresetColorRegex.test(color)));
  var overlayStyle;
  var arrowStyle;
  if (color && !PresetColorRegex.test(color)) {
    overlayStyle = {
      background: color
    };
    arrowStyle = {
      "--antd-arrow-background-color": color
    };
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
}
function PurePanel$3(props) {
  var customizePrefixCls = props.prefixCls, className = props.className, _props$placement = props.placement, placement = _props$placement === void 0 ? "top" : _props$placement, title = props.title, color = props.color, overlayInnerStyle = props.overlayInnerStyle;
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  var _useStyle = useStyle$4(prefixCls, true), _useStyle2 = _slicedToArray$3(_useStyle, 2), wrapSSR = _useStyle2[0], hashId = _useStyle2[1];
  var colorInfo = parseColor(prefixCls, color);
  var formattedOverlayInnerStyle = _extends$2(_extends$2({}, overlayInnerStyle), colorInfo.overlayStyle);
  var arrowContentStyle = colorInfo.arrowStyle;
  return wrapSSR(/* @__PURE__ */ React.createElement("div", {
    className: classNames(hashId, prefixCls, prefixCls + "-pure", prefixCls + "-placement-" + placement, className, colorInfo.className),
    style: arrowContentStyle
  }, /* @__PURE__ */ React.createElement(Popup, _extends$2({}, props, {
    className: hashId,
    prefixCls,
    overlayInnerStyle: formattedOverlayInnerStyle
  }), title)));
}
var __rest$7 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var splitObject = function splitObject2(obj, keys) {
  var picked = {};
  var omitted = _extends$2({}, obj);
  keys.forEach(function(key) {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return {
    picked,
    omitted
  };
};
function getDisabledCompatibleChildren(element, prefixCls) {
  var elementType = element.type;
  if ((elementType.__ANT_BUTTON === true || element.type === "button") && element.props.disabled || elementType.__ANT_SWITCH === true && (element.props.disabled || element.props.loading) || elementType.__ANT_RADIO === true && element.props.disabled) {
    var _splitObject = splitObject(element.props.style, ["position", "left", "right", "top", "bottom", "float", "display", "zIndex"]), picked = _splitObject.picked, omitted = _splitObject.omitted;
    var spanStyle = _extends$2(_extends$2({
      display: "inline-block"
    }, picked), {
      cursor: "not-allowed",
      width: element.props.block ? "100%" : void 0
    });
    var buttonStyle = _extends$2(_extends$2({}, omitted), {
      pointerEvents: "none"
    });
    var child = cloneElement(element, {
      style: buttonStyle,
      className: null
    });
    return /* @__PURE__ */ React.createElement("span", {
      style: spanStyle,
      className: classNames(element.props.className, prefixCls + "-disabled-compatible-wrapper")
    }, child);
  }
  return element;
}
var Tooltip2 = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var _a, _b;
  var customizePrefixCls = props.prefixCls, openClassName = props.openClassName, getTooltipContainer = props.getTooltipContainer, overlayClassName = props.overlayClassName, color = props.color, overlayInnerStyle = props.overlayInnerStyle, children = props.children, afterOpenChange = props.afterOpenChange, afterVisibleChange = props.afterVisibleChange;
  var _React$useContext = React.useContext(ConfigContext), getContextPopupContainer = _React$useContext.getPopupContainer, getPrefixCls = _React$useContext.getPrefixCls, direction = _React$useContext.direction;
  if (process.env.NODE_ENV !== "production") {
    [["visible", "open"], ["defaultVisible", "defaultOpen"], ["onVisibleChange", "onOpenChange"], ["afterVisibleChange", "afterOpenChange"]].forEach(function(_ref) {
      var _ref2 = _slicedToArray$3(_ref, 2), deprecatedName = _ref2[0], newName = _ref2[1];
      process.env.NODE_ENV !== "production" ? warning$3(!(deprecatedName in props), "Tooltip", "`" + deprecatedName + "` is deprecated, please use `" + newName + "` instead.") : void 0;
    });
  }
  var _useMergedState = useMergedState(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  }), _useMergedState2 = _slicedToArray$3(_useMergedState, 2), open = _useMergedState2[0], setOpen = _useMergedState2[1];
  var isNoTitle = function isNoTitle2() {
    var title = props.title, overlay = props.overlay;
    return !title && !overlay && title !== 0;
  };
  var onOpenChange = function onOpenChange2(vis) {
    var _a2, _b2;
    setOpen(isNoTitle() ? false : vis);
    if (!isNoTitle()) {
      (_a2 = props.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, vis);
      (_b2 = props.onVisibleChange) === null || _b2 === void 0 ? void 0 : _b2.call(props, vis);
    }
  };
  var getTooltipPlacements = function getTooltipPlacements2() {
    var builtinPlacements = props.builtinPlacements, _props$arrowPointAtCe = props.arrowPointAtCenter, arrowPointAtCenter = _props$arrowPointAtCe === void 0 ? false : _props$arrowPointAtCe, _props$autoAdjustOver = props.autoAdjustOverflow, autoAdjustOverflow2 = _props$autoAdjustOver === void 0 ? true : _props$autoAdjustOver;
    return builtinPlacements || getPlacements({
      arrowPointAtCenter,
      autoAdjustOverflow: autoAdjustOverflow2
    });
  };
  var onPopupAlign = function onPopupAlign2(domNode, align) {
    var placements2 = getTooltipPlacements();
    var placement2 = Object.keys(placements2).find(function(key) {
      var _a2, _b2;
      return placements2[key].points[0] === ((_a2 = align.points) === null || _a2 === void 0 ? void 0 : _a2[0]) && placements2[key].points[1] === ((_b2 = align.points) === null || _b2 === void 0 ? void 0 : _b2[1]);
    });
    if (!placement2) {
      return;
    }
    var rect = domNode.getBoundingClientRect();
    var transformOrigin = {
      top: "50%",
      left: "50%"
    };
    if (/top|Bottom/.test(placement2)) {
      transformOrigin.top = rect.height - align.offset[1] + "px";
    } else if (/Top|bottom/.test(placement2)) {
      transformOrigin.top = -align.offset[1] + "px";
    }
    if (/left|Right/.test(placement2)) {
      transformOrigin.left = rect.width - align.offset[0] + "px";
    } else if (/right|Left/.test(placement2)) {
      transformOrigin.left = -align.offset[0] + "px";
    }
    domNode.style.transformOrigin = transformOrigin.left + " " + transformOrigin.top;
  };
  var getOverlay3 = function getOverlay4() {
    var title = props.title, overlay = props.overlay;
    if (title === 0) {
      return title;
    }
    return overlay || title || "";
  };
  var getPopupContainer = props.getPopupContainer, _props$placement = props.placement, placement = _props$placement === void 0 ? "top" : _props$placement, _props$mouseEnterDela = props.mouseEnterDelay, mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0.1 : _props$mouseEnterDela, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela, overlayStyle = props.overlayStyle, otherProps = __rest$7(props, ["getPopupContainer", "placement", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle"]);
  var prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var injectFromPopover = props["data-popover-inject"];
  var tempOpen = open;
  if (!("open" in props) && !("visible" in props) && isNoTitle()) {
    tempOpen = false;
  }
  var child = getDisabledCompatibleChildren(isValidElement(children) && !isFragment(children) ? children : /* @__PURE__ */ React.createElement("span", null, children), prefixCls);
  var childProps = child.props;
  var childCls = !childProps.className || typeof childProps.className === "string" ? classNames(childProps.className, _defineProperty$4({}, openClassName || prefixCls + "-open", true)) : childProps.className;
  var _useStyle = useStyle$4(prefixCls, !injectFromPopover), _useStyle2 = _slicedToArray$3(_useStyle, 2), wrapSSR = _useStyle2[0], hashId = _useStyle2[1];
  var colorInfo = parseColor(prefixCls, color);
  var formattedOverlayInnerStyle = _extends$2(_extends$2({}, overlayInnerStyle), colorInfo.overlayStyle);
  var arrowContentStyle = colorInfo.arrowStyle;
  var customOverlayClassName = classNames(overlayClassName, _defineProperty$4({}, prefixCls + "-rtl", direction === "rtl"), colorInfo.className, hashId);
  return wrapSSR(/* @__PURE__ */ React.createElement(Tooltip$3, _extends$2({}, otherProps, {
    placement,
    mouseEnterDelay,
    mouseLeaveDelay,
    prefixCls,
    overlayClassName: customOverlayClassName,
    overlayStyle: _extends$2(_extends$2({}, arrowContentStyle), overlayStyle),
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: ref2,
    builtinPlacements: getTooltipPlacements(),
    overlay: getOverlay3(),
    visible: tempOpen,
    onVisibleChange: onOpenChange,
    afterVisibleChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange,
    onPopupAlign,
    overlayInnerStyle: formattedOverlayInnerStyle,
    arrowContent: /* @__PURE__ */ React.createElement("span", {
      className: prefixCls + "-arrow-content"
    }),
    motion: {
      motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", props.transitionName),
      motionDeadline: 1e3
    }
  }), tempOpen ? cloneElement(child, {
    className: childCls
  }) : child));
});
if (process.env.NODE_ENV !== "production") {
  Tooltip2.displayName = "Tooltip";
}
Tooltip2._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$3;
const Tooltip$1 = Tooltip2;
var getRenderPropValue = function getRenderPropValue2(propValue) {
  if (!propValue) {
    return null;
  }
  if (typeof propValue === "function") {
    return propValue();
  }
  return propValue;
};
var genBaseStyle$1 = function genBaseStyle(token2) {
  var _extends2;
  var componentCls = token2.componentCls, popoverBg = token2.popoverBg, popoverColor = token2.popoverColor, width = token2.width, fontWeightStrong = token2.fontWeightStrong, popoverPadding = token2.popoverPadding, boxShadowSecondary = token2.boxShadowSecondary, colorTextHeading = token2.colorTextHeading, borderRadius = token2.borderRadiusLG, zIndexPopup = token2.zIndexPopup, marginXS = token2.marginXS;
  return [
    _defineProperty$4({}, componentCls, _extends$2(_extends$2({}, resetComponent(token2)), (_extends2 = {
      position: "absolute",
      top: 0,
      insetInlineStart: 0,
      zIndex: zIndexPopup,
      fontWeight: "normal",
      whiteSpace: "normal",
      textAlign: "start",
      cursor: "auto",
      userSelect: "text",
      "&-rtl": {
        direction: "rtl"
      },
      "&-hidden": {
        display: "none"
      }
    }, _defineProperty$4(_extends2, componentCls + "-content", {
      position: "relative"
    }), _defineProperty$4(_extends2, componentCls + "-inner", {
      backgroundColor: popoverBg,
      backgroundClip: "padding-box",
      borderRadius,
      boxShadow: boxShadowSecondary,
      padding: popoverPadding
    }), _defineProperty$4(_extends2, componentCls + "-title", {
      minWidth: width,
      marginBottom: marginXS,
      color: colorTextHeading,
      fontWeight: fontWeightStrong
    }), _defineProperty$4(_extends2, componentCls + "-inner-content", {
      color: popoverColor
    }), _extends2))),
    // Arrow Style
    getArrowStyle(token2, {
      colorBg: token2.colorBgElevated
    }),
    // Pure Render
    _defineProperty$4({}, componentCls + "-pure", _defineProperty$4({
      position: "relative",
      maxWidth: "none"
    }, componentCls + "-content", {
      display: "inline-block"
    }))
  ];
};
var genColorStyle = function genColorStyle2(token2) {
  var componentCls = token2.componentCls;
  return _defineProperty$4({}, componentCls, PresetColors.map(function(colorKey) {
    var _ref4;
    var lightColor = token2[colorKey + "-6"];
    return _defineProperty$4({}, "&" + componentCls + "-" + colorKey, (_ref4 = {}, _defineProperty$4(_ref4, componentCls + "-inner", {
      backgroundColor: lightColor
    }), _defineProperty$4(_ref4, componentCls + "-arrow", {
      background: "transparent",
      "&:before": {
        backgroundColor: lightColor
      }
    }), _ref4));
  }));
};
var genWireframeStyle = function genWireframeStyle2(token2) {
  var _componentCls;
  var componentCls = token2.componentCls, lineWidth = token2.lineWidth, lineType = token2.lineType, colorSplit = token2.colorSplit, paddingSM = token2.paddingSM, controlHeight = token2.controlHeight, fontSize = token2.fontSize, lineHeight = token2.lineHeight, padding = token2.padding;
  var titlePaddingBlockDist = controlHeight - Math.round(fontSize * lineHeight);
  var popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  var popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  var popoverPaddingHorizontal = padding;
  return _defineProperty$4({}, componentCls, (_componentCls = {}, _defineProperty$4(_componentCls, componentCls + "-inner", {
    padding: 0
  }), _defineProperty$4(_componentCls, componentCls + "-title", {
    margin: 0,
    padding: popoverTitlePaddingBlockTop + "px " + popoverPaddingHorizontal + "px " + popoverTitlePaddingBlockBottom + "px",
    borderBottom: lineWidth + "px " + lineType + " " + colorSplit
  }), _defineProperty$4(_componentCls, componentCls + "-inner-content", {
    padding: paddingSM + "px " + popoverPaddingHorizontal + "px"
  }), _componentCls));
};
const useStyle$3 = genComponentStyleHook("Popover", function(token2) {
  var colorBgElevated = token2.colorBgElevated, colorText = token2.colorText, wireframe = token2.wireframe;
  var popoverToken = merge(token2, {
    popoverBg: colorBgElevated,
    popoverColor: colorText,
    popoverPadding: 12
    // Fixed Value
  });
  return [genBaseStyle$1(popoverToken), genColorStyle(popoverToken), wireframe && genWireframeStyle(popoverToken), initZoomMotion(popoverToken, "zoom-big")];
}, function(_ref8) {
  var zIndexPopupBase = _ref8.zIndexPopupBase;
  return {
    zIndexPopup: zIndexPopupBase + 30,
    width: 177
  };
});
var __rest$6 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var getOverlay = function getOverlay2(prefixCls, title, content) {
  if (!title && !content)
    return void 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, title && /* @__PURE__ */ React.createElement("div", {
    className: prefixCls + "-title"
  }, getRenderPropValue(title)), /* @__PURE__ */ React.createElement("div", {
    className: prefixCls + "-inner-content"
  }, getRenderPropValue(content)));
};
function RawPurePanel(props) {
  var hashId = props.hashId, prefixCls = props.prefixCls, className = props.className, style2 = props.style, _props$placement = props.placement, placement = _props$placement === void 0 ? "top" : _props$placement, title = props.title, content = props.content, children = props.children;
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(hashId, prefixCls, prefixCls + "-pure", prefixCls + "-placement-" + placement, className),
    style: style2
  }, /* @__PURE__ */ React.createElement(Popup, _extends$2({}, props, {
    className: hashId,
    prefixCls
  }), children || getOverlay(prefixCls, title, content)));
}
function PurePanel$2(props) {
  var customizePrefixCls = props.prefixCls, restProps = __rest$6(props, ["prefixCls"]);
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls("popover", customizePrefixCls);
  var _useStyle = useStyle$3(prefixCls), _useStyle2 = _slicedToArray$3(_useStyle, 2), wrapSSR = _useStyle2[0], hashId = _useStyle2[1];
  return wrapSSR(/* @__PURE__ */ React.createElement(RawPurePanel, _extends$2({}, restProps, {
    prefixCls,
    hashId
  })));
}
var __rest$5 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var Overlay$1 = function Overlay(_ref) {
  var title = _ref.title, content = _ref.content, prefixCls = _ref.prefixCls;
  if (!title && !content) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, title && /* @__PURE__ */ React.createElement("div", {
    className: prefixCls + "-title"
  }, getRenderPropValue(title)), /* @__PURE__ */ React.createElement("div", {
    className: prefixCls + "-inner-content"
  }, getRenderPropValue(content)));
};
var Popover = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var customizePrefixCls = props.prefixCls, title = props.title, content = props.content, overlayClassName = props.overlayClassName, _overlay = props._overlay, _props$placement = props.placement, placement = _props$placement === void 0 ? "top" : _props$placement, _props$trigger = props.trigger, trigger = _props$trigger === void 0 ? "hover" : _props$trigger, _props$mouseEnterDela = props.mouseEnterDelay, mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0.1 : _props$mouseEnterDela, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela, _props$overlayStyle = props.overlayStyle, overlayStyle = _props$overlayStyle === void 0 ? {} : _props$overlayStyle, otherProps = __rest$5(props, ["prefixCls", "title", "content", "overlayClassName", "_overlay", "placement", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle"]);
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls("popover", customizePrefixCls);
  var _useStyle = useStyle$3(prefixCls), _useStyle2 = _slicedToArray$3(_useStyle, 2), wrapSSR = _useStyle2[0], hashId = _useStyle2[1];
  var rootPrefixCls = getPrefixCls();
  var overlayCls = classNames(overlayClassName, hashId);
  return wrapSSR(/* @__PURE__ */ React.createElement(Tooltip$1, _extends$2({
    placement,
    trigger,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayStyle
  }, otherProps, {
    prefixCls,
    overlayClassName: overlayCls,
    ref: ref2,
    overlay: _overlay || /* @__PURE__ */ React.createElement(Overlay$1, {
      prefixCls,
      title,
      content
    }),
    transitionName: getTransitionName(rootPrefixCls, "zoom-big", otherProps.transitionName),
    "data-popover-inject": true
  })));
});
if (process.env.NODE_ENV !== "production") {
  Popover.displayName = "Popover";
}
Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$2;
const Popover$1 = Popover;
var id = 0;
var ids = {};
function wrapperRaf2(callback) {
  var delayFrames = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  var myId = id++;
  var restFrames = delayFrames;
  function internalCallback() {
    restFrames -= 1;
    if (restFrames <= 0) {
      callback();
      delete ids[myId];
    } else {
      ids[myId] = wrapperRaf$1(internalCallback);
    }
  }
  ids[myId] = wrapperRaf$1(internalCallback);
  return myId;
}
wrapperRaf2.cancel = function cancel(pid) {
  if (pid === void 0)
    return;
  wrapperRaf$1.cancel(ids[pid]);
  delete ids[pid];
};
wrapperRaf2.ids = ids;
var genWaveStyle = function genWaveStyle2(token2) {
  var _ref;
  var waveEffect = new Keyframe("waveEffect", {
    "100%": {
      boxShadow: "0 0 0 6px var(--antd-wave-shadow-color)"
    }
  });
  var fadeEffect = new Keyframe("fadeEffect", {
    "100%": {
      opacity: 0
    }
  });
  return [(_ref = {}, _defineProperty$4(_ref, token2.clickAnimatingWithoutExtraNodeTrue + ",\n      " + token2.clickAnimatingTrue, {
    "--antd-wave-shadow-color": token2.colorPrimary,
    "--scroll-bar": 0,
    position: "relative"
  }), _defineProperty$4(_ref, token2.clickAnimatingWithoutExtraNodeTrueAfter + ",\n      & " + token2.clickAnimatingNode, {
    position: "absolute",
    top: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    bottom: 0,
    display: "block",
    borderRadius: "inherit",
    boxShadow: "0 0 0 0 var(--antd-wave-shadow-color)",
    opacity: 0.2,
    animation: {
      _skip_check_: true,
      value: fadeEffect.getName(token2.hashId) + " 2s " + token2.motionEaseOutCirc + ", " + waveEffect.getName(token2.hashId) + " 0.4s " + token2.motionEaseOutCirc
    },
    animationFillMode: "forwards",
    content: '""',
    pointerEvents: "none"
  }), _ref), {}, waveEffect, fadeEffect];
};
const useStyle$2 = function() {
  var _useToken = useToken(), _useToken2 = _slicedToArray$3(_useToken, 3), theme = _useToken2[0], token2 = _useToken2[1], hashId = _useToken2[2];
  var _useContext = useContext(ConfigContext), getPrefixCls = _useContext.getPrefixCls;
  var rootPrefixCls = getPrefixCls();
  var clickAnimatingTrue = "[" + rootPrefixCls + "-click-animating='true']";
  var clickAnimatingWithoutExtraNodeTrue = "[" + rootPrefixCls + "-click-animating-without-extra-node='true']";
  var clickAnimatingNode = "." + rootPrefixCls + "-click-animating-node";
  var waveToken = _extends$2(_extends$2({}, token2), {
    hashId,
    clickAnimatingNode,
    clickAnimatingTrue,
    clickAnimatingWithoutExtraNodeTrue,
    clickAnimatingWithoutExtraNodeTrueAfter: clickAnimatingWithoutExtraNodeTrue + "::after"
  });
  return [useStyleRegister({
    theme,
    token: token2,
    hashId,
    path: ["wave"]
  }, function() {
    return [genWaveStyle(waveToken)];
  }), hashId];
};
var styleForPseudo;
function isHidden(element) {
  if (process.env.NODE_ENV === "test") {
    return false;
  }
  return !element || element.offsetParent === null || element.hidden;
}
function getValidateContainer(nodeRoot) {
  if (nodeRoot instanceof Document) {
    return nodeRoot.body;
  }
  return Array.from(nodeRoot.childNodes).find(function(ele) {
    return (ele === null || ele === void 0 ? void 0 : ele.nodeType) === Node.ELEMENT_NODE;
  });
}
function isNotGrey(color) {
  var match2 = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
  if (match2 && match2[1] && match2[2] && match2[3]) {
    return !(match2[1] === match2[2] && match2[2] === match2[3]);
  }
  return true;
}
function isValidWaveColor(color) {
  return color && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && isNotGrey(color) && !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
  color !== "transparent";
}
function getTargetWaveColor(node2) {
  var computedStyle = getComputedStyle(node2);
  var borderTopColor = computedStyle.getPropertyValue("border-top-color");
  var borderColor = computedStyle.getPropertyValue("border-color");
  var backgroundColor = computedStyle.getPropertyValue("background-color");
  if (isValidWaveColor(borderTopColor)) {
    return borderTopColor;
  }
  if (isValidWaveColor(borderColor)) {
    return borderColor;
  }
  return backgroundColor;
}
var InternalWave = /* @__PURE__ */ function(_React$Component) {
  _inherits$1(InternalWave2, _React$Component);
  var _super = _createSuper(InternalWave2);
  function InternalWave2() {
    var _this2;
    _classCallCheck$1(this, InternalWave2);
    _this2 = _super.apply(this, arguments);
    _this2.containerRef = /* @__PURE__ */ React.createRef();
    _this2.animationStart = false;
    _this2.destroyed = false;
    _this2.onClick = function(node2, waveColor) {
      var _a, _b;
      var _this$props = _this2.props, insertExtraNode = _this$props.insertExtraNode, disabled = _this$props.disabled;
      if (disabled || !node2 || isHidden(node2) || node2.className.includes("-leave")) {
        return;
      }
      _this2.extraNode = document.createElement("div");
      var _assertThisInitialize = _assertThisInitialized$1(_this2), extraNode = _assertThisInitialize.extraNode;
      var getPrefixCls = _this2.context.getPrefixCls;
      extraNode.className = getPrefixCls("") + "-click-animating-node";
      var attributeName = _this2.getAttributeName();
      node2.setAttribute(attributeName, "true");
      if (isValidWaveColor(waveColor)) {
        extraNode.style.borderColor = waveColor;
        var nodeRoot = ((_a = node2.getRootNode) === null || _a === void 0 ? void 0 : _a.call(node2)) || node2.ownerDocument;
        var nodeBody = (_b = getValidateContainer(nodeRoot)) !== null && _b !== void 0 ? _b : nodeRoot;
        styleForPseudo = updateCSS$1("\n      [" + getPrefixCls("") + "-click-animating-without-extra-node='true']::after, ." + getPrefixCls("") + "-click-animating-node {\n        --antd-wave-shadow-color: " + waveColor + ";\n      }", "antd-wave", {
          csp: _this2.csp,
          attachTo: nodeBody
        });
      }
      if (insertExtraNode) {
        node2.appendChild(extraNode);
      }
      ["transition", "animation"].forEach(function(name) {
        node2.addEventListener(name + "start", _this2.onTransitionStart);
        node2.addEventListener(name + "end", _this2.onTransitionEnd);
      });
    };
    _this2.onTransitionStart = function(e) {
      if (_this2.destroyed) {
        return;
      }
      var node2 = _this2.containerRef.current;
      if (!e || e.target !== node2 || _this2.animationStart) {
        return;
      }
      _this2.resetEffect(node2);
    };
    _this2.onTransitionEnd = function(e) {
      if (!e || e.animationName !== "fadeEffect") {
        return;
      }
      _this2.resetEffect(e.target);
    };
    _this2.bindAnimationEvent = function(node2) {
      if (!node2 || !node2.getAttribute || node2.getAttribute("disabled") || node2.className.includes("disabled")) {
        return;
      }
      var onClick = function onClick2(e) {
        if (e.target.tagName === "INPUT" || isHidden(e.target)) {
          return;
        }
        _this2.resetEffect(node2);
        var waveColor = getTargetWaveColor(node2);
        _this2.clickWaveTimeoutId = window.setTimeout(function() {
          return _this2.onClick(node2, waveColor);
        }, 0);
        wrapperRaf2.cancel(_this2.animationStartId);
        _this2.animationStart = true;
        _this2.animationStartId = wrapperRaf2(function() {
          _this2.animationStart = false;
        }, 10);
      };
      node2.addEventListener("click", onClick, true);
      return {
        cancel: function cancel2() {
          node2.removeEventListener("click", onClick, true);
        }
      };
    };
    _this2.renderWave = function(_ref) {
      var csp = _ref.csp;
      var children = _this2.props.children;
      _this2.csp = csp;
      if (!/* @__PURE__ */ React.isValidElement(children))
        return children;
      var ref2 = _this2.containerRef;
      if (supportRef(children)) {
        ref2 = composeRef(children.ref, _this2.containerRef);
      }
      return cloneElement(children, {
        ref: ref2
      });
    };
    return _this2;
  }
  _createClass$1(InternalWave2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.destroyed = false;
      var node2 = this.containerRef.current;
      if (!node2 || node2.nodeType !== 1) {
        return;
      }
      this.instance = this.bindAnimationEvent(node2);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.instance) {
        this.instance.cancel();
      }
      if (this.clickWaveTimeoutId) {
        clearTimeout(this.clickWaveTimeoutId);
      }
      this.destroyed = true;
    }
  }, {
    key: "getAttributeName",
    value: function getAttributeName() {
      var getPrefixCls = this.context.getPrefixCls;
      var insertExtraNode = this.props.insertExtraNode;
      return insertExtraNode ? getPrefixCls("") + "-click-animating" : getPrefixCls("") + "-click-animating-without-extra-node";
    }
  }, {
    key: "resetEffect",
    value: function resetEffect(node2) {
      var _this2 = this;
      if (!node2 || node2 === this.extraNode || !(node2 instanceof Element)) {
        return;
      }
      var insertExtraNode = this.props.insertExtraNode;
      var attributeName = this.getAttributeName();
      node2.setAttribute(attributeName, "false");
      if (styleForPseudo) {
        styleForPseudo.innerHTML = "";
      }
      if (insertExtraNode && this.extraNode && node2.contains(this.extraNode)) {
        node2.removeChild(this.extraNode);
      }
      ["transition", "animation"].forEach(function(name) {
        node2.removeEventListener(name + "start", _this2.onTransitionStart);
        node2.removeEventListener(name + "end", _this2.onTransitionEnd);
      });
    }
  }, {
    key: "render",
    value: function render2() {
      return /* @__PURE__ */ React.createElement(ConfigConsumer, null, this.renderWave);
    }
  }]);
  return InternalWave2;
}(React.Component);
InternalWave.contextType = ConfigContext;
var Wave = /* @__PURE__ */ forwardRef(function(props, ref2) {
  useStyle$2();
  return /* @__PURE__ */ React.createElement(InternalWave, _extends$2({
    ref: ref2
  }, props));
});
const Wave$1 = Wave;
var __rest$4 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var GroupSizeContext = /* @__PURE__ */ React.createContext(void 0);
var ButtonGroup = function ButtonGroup2(props) {
  var _classNames;
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls, direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls, size = props.size, className = props.className, others = __rest$4(props, ["prefixCls", "size", "className"]);
  var prefixCls = getPrefixCls("btn-group", customizePrefixCls);
  var _useToken = useToken(), _useToken2 = _slicedToArray$3(_useToken, 3), hashId = _useToken2[2];
  var sizeCls = "";
  switch (size) {
    case "large":
      sizeCls = "lg";
      break;
    case "small":
      sizeCls = "sm";
      break;
    case "middle":
    case void 0:
      break;
    default:
      process.env.NODE_ENV !== "production" ? warning$3(!size, "Button.Group", "Invalid prop `size`.") : void 0;
  }
  var classes = classNames(prefixCls, (_classNames = {}, _defineProperty$4(_classNames, prefixCls + "-" + sizeCls, sizeCls), _defineProperty$4(_classNames, prefixCls + "-rtl", direction === "rtl"), _classNames), className, hashId);
  return /* @__PURE__ */ React.createElement(GroupSizeContext.Provider, {
    value: size
  }, /* @__PURE__ */ React.createElement("div", _extends$2({}, others, {
    className: classes
  })));
};
const Group = ButtonGroup;
var getCollapsedWidth = function getCollapsedWidth2() {
  return {
    width: 0,
    opacity: 0,
    transform: "scale(0)"
  };
};
var getRealWidth = function getRealWidth2(node2) {
  return {
    width: node2.scrollWidth,
    opacity: 1,
    transform: "scale(1)"
  };
};
var LoadingIcon = function LoadingIcon2(_ref) {
  var prefixCls = _ref.prefixCls, loading = _ref.loading, existIcon = _ref.existIcon;
  var visible = !!loading;
  if (existIcon) {
    return /* @__PURE__ */ React__default.createElement("span", {
      className: prefixCls + "-loading-icon"
    }, /* @__PURE__ */ React__default.createElement(LoadingOutlined$1, null));
  }
  return /* @__PURE__ */ React__default.createElement(CSSMotion, {
    visible,
    // We do not really use this motionName
    motionName: prefixCls + "-loading-icon-motion",
    removeOnLeave: true,
    onAppearStart: getCollapsedWidth,
    onAppearActive: getRealWidth,
    onEnterStart: getCollapsedWidth,
    onEnterActive: getRealWidth,
    onLeaveStart: getRealWidth,
    onLeaveActive: getCollapsedWidth
  }, function(_ref2, ref2) {
    var className = _ref2.className, style2 = _ref2.style;
    return /* @__PURE__ */ React__default.createElement("span", {
      className: prefixCls + "-loading-icon",
      style: style2,
      ref: ref2
    }, /* @__PURE__ */ React__default.createElement(LoadingOutlined$1, {
      className
    }));
  });
};
const LoadingIcon$1 = LoadingIcon;
var genButtonBorderStyle = function genButtonBorderStyle2(buttonTypeCls, borderColor) {
  return _defineProperty$4({}, "> span, > " + buttonTypeCls, {
    "&:not(:last-child)": _defineProperty$4({}, "&, & > " + buttonTypeCls, {
      "&:not(:disabled)": {
        borderInlineEndColor: borderColor
      }
    }),
    "&:not(:first-child)": _defineProperty$4({}, "&, & > " + buttonTypeCls, {
      "&:not(:disabled)": {
        borderInlineStartColor: borderColor
      }
    })
  });
};
var genGroupStyle = function genGroupStyle2(token2) {
  var _componentCls, _ref2;
  var componentCls = token2.componentCls, fontSize = token2.fontSize, lineWidth = token2.lineWidth, colorPrimaryHover = token2.colorPrimaryHover, colorErrorHover = token2.colorErrorHover;
  return _defineProperty$4({}, componentCls + "-group", [
    (_ref2 = {
      position: "relative",
      display: "inline-flex"
    }, _defineProperty$4(_ref2, "> span, > " + componentCls, {
      "&:not(:last-child)": _defineProperty$4({}, "&, & > " + componentCls, {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }),
      "&:not(:first-child)": _defineProperty$4({
        marginInlineStart: -lineWidth
      }, "&, & > " + componentCls, {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      })
    }), _defineProperty$4(_ref2, componentCls, (_componentCls = {
      position: "relative",
      zIndex: 1
    }, _defineProperty$4(_componentCls, "&:hover,\n          &:focus,\n          &:active", {
      zIndex: 2
    }), _defineProperty$4(_componentCls, "&[disabled]", {
      zIndex: 0
    }), _componentCls)), _defineProperty$4(_ref2, componentCls + "-icon-only", {
      fontSize
    }), _ref2),
    // Border Color
    genButtonBorderStyle(componentCls + "-primary", colorPrimaryHover),
    genButtonBorderStyle(componentCls + "-danger", colorErrorHover)
  ]);
};
const genGroupStyle$1 = genGroupStyle;
function compactItemVerticalBorder(token2) {
  return {
    // border collapse
    "&-item:not(&-last-item)": {
      marginBottom: -token2.lineWidth
    },
    "&-item": {
      "&:hover,&:focus,&:active": {
        zIndex: 2
      },
      "&[disabled]": {
        zIndex: 0
      }
    }
  };
}
function compactItemBorderVerticalRadius(prefixCls) {
  return {
    "&-item:not(&-first-item):not(&-last-item)": {
      borderRadius: 0
    },
    "&-item&-first-item": _defineProperty$4({}, "&, &" + prefixCls + "-sm, &" + prefixCls + "-lg", {
      borderEndEndRadius: 0,
      borderEndStartRadius: 0
    }),
    "&-item&-last-item": _defineProperty$4({}, "&, &" + prefixCls + "-sm, &" + prefixCls + "-lg", {
      borderStartStartRadius: 0,
      borderStartEndRadius: 0
    })
  };
}
function genCompactItemVerticalStyle(token2, prefixCls) {
  return {
    "&-compact-vertical": _extends$2(_extends$2({}, compactItemVerticalBorder(token2)), compactItemBorderVerticalRadius(prefixCls))
  };
}
var genSharedButtonStyle = function genSharedButtonStyle2(token2) {
  var _extends2, _extends3;
  var componentCls = token2.componentCls, iconCls = token2.iconCls;
  return _defineProperty$4({}, componentCls, _extends$2(_extends$2(_extends$2((_extends2 = {
    outline: "none",
    position: "relative",
    display: "inline-block",
    fontWeight: 400,
    whiteSpace: "nowrap",
    textAlign: "center",
    backgroundImage: "none",
    backgroundColor: "transparent",
    border: token2.lineWidth + "px " + token2.lineType + " transparent",
    cursor: "pointer",
    transition: "all " + token2.motionDurationMid + " " + token2.motionEaseInOut,
    userSelect: "none",
    touchAction: "manipulation",
    lineHeight: token2.lineHeight,
    color: token2.colorText,
    "> span": {
      display: "inline-block"
    }
  }, _defineProperty$4(_extends2, "> " + iconCls + " + span, > span + " + iconCls, {
    marginInlineStart: token2.marginXS
  }), _defineProperty$4(_extends2, "&" + componentCls + "-block", {
    width: "100%"
  }), _defineProperty$4(_extends2, "&:not(:disabled)", _extends$2({}, genFocusStyle(token2))), _extends2), genCompactItemStyle(token2, componentCls)), genCompactItemVerticalStyle(token2, componentCls)), (_extends3 = {
    // make `btn-icon-only` not too narrow
    "&-icon-only&-compact-item": {
      flex: "none"
    }
  }, _defineProperty$4(_extends3, "&-compact-item" + componentCls + "-primary", {
    "&:not([disabled]) + &:not([disabled])": {
      position: "relative",
      "&:after": {
        position: "absolute",
        top: -token2.lineWidth,
        insetInlineStart: -token2.lineWidth,
        display: "inline-block",
        width: token2.lineWidth,
        height: "calc(100% + " + token2.lineWidth * 2 + "px)",
        backgroundColor: token2.colorPrimaryBorder,
        content: '""'
      }
    }
  }), _defineProperty$4(_extends3, "&-compact-vertical-item", _defineProperty$4({}, "&" + componentCls + "-primary", {
    "&:not([disabled]) + &:not([disabled])": {
      position: "relative",
      "&:after": {
        position: "absolute",
        top: -token2.lineWidth,
        insetInlineStart: -token2.lineWidth,
        display: "inline-block",
        width: "calc(100% + " + token2.lineWidth * 2 + "px)",
        height: token2.lineWidth,
        backgroundColor: token2.colorPrimaryBorder,
        content: '""'
      }
    }
  })), _extends3)));
};
var genHoverActiveButtonStyle = function genHoverActiveButtonStyle2(hoverStyle, activeStyle) {
  return {
    "&:not(:disabled)": {
      "&:hover": hoverStyle,
      "&:active": activeStyle
    }
  };
};
var genCircleButtonStyle = function genCircleButtonStyle2(token2) {
  return {
    minWidth: token2.controlHeight,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    borderRadius: "50%"
  };
};
var genRoundButtonStyle = function genRoundButtonStyle2(token2) {
  return {
    borderRadius: token2.controlHeight,
    paddingInlineStart: token2.controlHeight / 2,
    paddingInlineEnd: token2.controlHeight / 2,
    width: "auto"
  };
};
var genGhostButtonStyle = function genGhostButtonStyle2(btnCls, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) {
  return _defineProperty$4({}, "&" + btnCls + "-background-ghost", _extends$2(_extends$2({
    color: textColor || void 0,
    backgroundColor: "transparent",
    borderColor: borderColor || void 0,
    boxShadow: "none"
  }, genHoverActiveButtonStyle(_extends$2({
    backgroundColor: "transparent"
  }, hoverStyle), _extends$2({
    backgroundColor: "transparent"
  }, activeStyle))), {
    "&:disabled": {
      cursor: "not-allowed",
      color: textColorDisabled || void 0,
      borderColor: borderColorDisabled || void 0
    }
  }));
};
var genSolidDisabledButtonStyle = function genSolidDisabledButtonStyle2(token2) {
  return {
    "&:disabled": {
      cursor: "not-allowed",
      borderColor: token2.colorBorder,
      color: token2.colorTextDisabled,
      backgroundColor: token2.colorBgContainerDisabled,
      boxShadow: "none"
    }
  };
};
var genSolidButtonStyle = function genSolidButtonStyle2(token2) {
  return _extends$2({}, genSolidDisabledButtonStyle(token2));
};
var genPureDisabledButtonStyle = function genPureDisabledButtonStyle2(token2) {
  return {
    "&:disabled": {
      cursor: "not-allowed",
      color: token2.colorTextDisabled
    }
  };
};
var genDefaultButtonStyle = function genDefaultButtonStyle2(token2) {
  return _extends$2(_extends$2(_extends$2(_extends$2(_extends$2({}, genSolidButtonStyle(token2)), {
    backgroundColor: token2.colorBgContainer,
    borderColor: token2.colorBorder,
    boxShadow: "0 " + token2.controlOutlineWidth + "px 0 " + token2.controlTmpOutline
  }), genHoverActiveButtonStyle({
    color: token2.colorPrimaryHover,
    borderColor: token2.colorPrimaryHover
  }, {
    color: token2.colorPrimaryActive,
    borderColor: token2.colorPrimaryActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorBgContainer, token2.colorBgContainer, token2.colorTextDisabled, token2.colorBorder)), _defineProperty$4({}, "&" + token2.componentCls + "-dangerous", _extends$2(_extends$2(_extends$2({
    color: token2.colorError,
    borderColor: token2.colorError
  }, genHoverActiveButtonStyle({
    color: token2.colorErrorHover,
    borderColor: token2.colorErrorBorder
  }, {
    color: token2.colorErrorActive,
    borderColor: token2.colorErrorActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorError, token2.colorError, token2.colorTextDisabled, token2.colorBorder)), genSolidDisabledButtonStyle(token2))));
};
var genPrimaryButtonStyle = function genPrimaryButtonStyle2(token2) {
  return _extends$2(_extends$2(_extends$2(_extends$2(_extends$2({}, genSolidButtonStyle(token2)), {
    color: token2.colorTextLightSolid,
    backgroundColor: token2.colorPrimary,
    boxShadow: "0 " + token2.controlOutlineWidth + "px 0 " + token2.controlOutline
  }), genHoverActiveButtonStyle({
    color: token2.colorTextLightSolid,
    backgroundColor: token2.colorPrimaryHover
  }, {
    color: token2.colorTextLightSolid,
    backgroundColor: token2.colorPrimaryActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorPrimary, token2.colorPrimary, token2.colorTextDisabled, token2.colorBorder, {
    color: token2.colorPrimaryHover,
    borderColor: token2.colorPrimaryHover
  }, {
    color: token2.colorPrimaryActive,
    borderColor: token2.colorPrimaryActive
  })), _defineProperty$4({}, "&" + token2.componentCls + "-dangerous", _extends$2(_extends$2(_extends$2({
    backgroundColor: token2.colorError,
    boxShadow: "0 " + token2.controlOutlineWidth + "px 0 " + token2.colorErrorOutline
  }, genHoverActiveButtonStyle({
    backgroundColor: token2.colorErrorHover
  }, {
    backgroundColor: token2.colorErrorActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorError, token2.colorError, token2.colorTextDisabled, token2.colorBorder, {
    color: token2.colorErrorHover,
    borderColor: token2.colorErrorHover
  }, {
    color: token2.colorErrorActive,
    borderColor: token2.colorErrorActive
  })), genSolidDisabledButtonStyle(token2))));
};
var genDashedButtonStyle = function genDashedButtonStyle2(token2) {
  return _extends$2(_extends$2({}, genDefaultButtonStyle(token2)), {
    borderStyle: "dashed"
  });
};
var genLinkButtonStyle = function genLinkButtonStyle2(token2) {
  return _extends$2(_extends$2(_extends$2({
    color: token2.colorLink
  }, genHoverActiveButtonStyle({
    color: token2.colorLinkHover
  }, {
    color: token2.colorLinkActive
  })), genPureDisabledButtonStyle(token2)), _defineProperty$4({}, "&" + token2.componentCls + "-dangerous", _extends$2(_extends$2({
    color: token2.colorError
  }, genHoverActiveButtonStyle({
    color: token2.colorErrorHover
  }, {
    color: token2.colorErrorActive
  })), genPureDisabledButtonStyle(token2))));
};
var genTextButtonStyle = function genTextButtonStyle2(token2) {
  return _extends$2(_extends$2(_extends$2({}, genHoverActiveButtonStyle({
    color: token2.colorText,
    backgroundColor: token2.colorBgTextHover
  }, {
    color: token2.colorText,
    backgroundColor: token2.colorBgTextActive
  })), genPureDisabledButtonStyle(token2)), _defineProperty$4({}, "&" + token2.componentCls + "-dangerous", _extends$2(_extends$2({
    color: token2.colorError
  }, genPureDisabledButtonStyle(token2)), genHoverActiveButtonStyle({
    color: token2.colorErrorHover,
    backgroundColor: token2.colorErrorBg
  }, {
    color: token2.colorErrorHover,
    backgroundColor: token2.colorErrorBg
  }))));
};
var genTypeButtonStyle = function genTypeButtonStyle2(token2) {
  var _ref3;
  var componentCls = token2.componentCls;
  return _ref3 = {}, _defineProperty$4(_ref3, componentCls + "-default", genDefaultButtonStyle(token2)), _defineProperty$4(_ref3, componentCls + "-primary", genPrimaryButtonStyle(token2)), _defineProperty$4(_ref3, componentCls + "-dashed", genDashedButtonStyle(token2)), _defineProperty$4(_ref3, componentCls + "-link", genLinkButtonStyle(token2)), _defineProperty$4(_ref3, componentCls + "-text", genTextButtonStyle(token2)), _ref3;
};
var genSizeButtonStyle = function genSizeButtonStyle2(token2) {
  var _ref4;
  var sizePrefixCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var componentCls = token2.componentCls, iconCls = token2.iconCls;
  var paddingVertical = Math.max(0, (token2.controlHeight - token2.fontSize * token2.lineHeight) / 2 - token2.lineWidth);
  var paddingHorizontal = token2.buttonPaddingHorizontal - token2.lineWidth;
  var iconOnlyCls = componentCls + "-icon-only";
  return [
    // Size
    _defineProperty$4({}, "" + componentCls + sizePrefixCls, (_ref4 = {
      fontSize: token2.fontSize,
      height: token2.controlHeight,
      padding: paddingVertical + "px " + paddingHorizontal + "px",
      borderRadius: token2.borderRadius
    }, _defineProperty$4(_ref4, "&" + iconOnlyCls, {
      width: token2.controlHeight,
      paddingInlineStart: 0,
      paddingInlineEnd: 0,
      "> span": {
        transform: "scale(1.143)"
        // 14px -> 16px
      }
    }), _defineProperty$4(_ref4, "&" + componentCls + "-loading", {
      opacity: token2.opacityLoading,
      cursor: "default"
    }), _defineProperty$4(_ref4, componentCls + "-loading-icon", {
      transition: "width " + token2.motionDurationSlow + " " + token2.motionEaseInOut + ", opacity " + token2.motionDurationSlow + " " + token2.motionEaseInOut
    }), _defineProperty$4(_ref4, "&:not(" + iconOnlyCls + ") " + componentCls + "-loading-icon > " + iconCls, {
      marginInlineEnd: token2.marginXS
    }), _ref4)),
    // Shape - patch prefixCls again to override solid border radius style
    _defineProperty$4({}, "" + componentCls + componentCls + "-circle" + sizePrefixCls, genCircleButtonStyle(token2)),
    _defineProperty$4({}, "" + componentCls + componentCls + "-round" + sizePrefixCls, genRoundButtonStyle(token2))
  ];
};
var genSizeBaseButtonStyle = function genSizeBaseButtonStyle2(token2) {
  return genSizeButtonStyle(token2);
};
var genSizeSmallButtonStyle = function genSizeSmallButtonStyle2(token2) {
  var smallToken = merge(token2, {
    controlHeight: token2.controlHeightSM,
    padding: token2.paddingXS,
    buttonPaddingHorizontal: 8,
    borderRadius: token2.borderRadiusSM
  });
  return genSizeButtonStyle(smallToken, token2.componentCls + "-sm");
};
var genSizeLargeButtonStyle = function genSizeLargeButtonStyle2(token2) {
  var largeToken = merge(token2, {
    controlHeight: token2.controlHeightLG,
    fontSize: token2.fontSizeLG,
    borderRadius: token2.borderRadiusLG
  });
  return genSizeButtonStyle(largeToken, token2.componentCls + "-lg");
};
const useStyle$1 = genComponentStyleHook("Button", function(token2) {
  var controlTmpOutline = token2.controlTmpOutline, paddingContentHorizontal = token2.paddingContentHorizontal;
  var buttonToken = merge(token2, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal
  });
  return [
    // Shared
    genSharedButtonStyle(buttonToken),
    // Size
    genSizeSmallButtonStyle(buttonToken),
    genSizeBaseButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),
    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(buttonToken),
    // Button Group
    genGroupStyle$1(buttonToken)
  ];
});
var __rest$3 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === "string";
}
function isUnBorderedButtonType(type4) {
  return type4 === "text" || type4 === "link";
}
function insertSpace(child, needInserted) {
  if (child === null || child === void 0) {
    return;
  }
  var SPACE = needInserted ? " " : "";
  if (typeof child !== "string" && typeof child !== "number" && isString(child.type) && isTwoCNChar(child.props.children)) {
    return cloneElement(child, {
      children: child.props.children.split("").join(SPACE)
    });
  }
  if (typeof child === "string") {
    return isTwoCNChar(child) ? /* @__PURE__ */ React.createElement("span", null, child.split("").join(SPACE)) : /* @__PURE__ */ React.createElement("span", null, child);
  }
  if (isFragment(child)) {
    return /* @__PURE__ */ React.createElement("span", null, child);
  }
  return child;
}
function spaceChildren(children, needInserted) {
  var isPrevChildPure = false;
  var childList = [];
  React.Children.forEach(children, function(child) {
    var type4 = _typeof$3(child);
    var isCurrentChildPure = type4 === "string" || type4 === "number";
    if (isPrevChildPure && isCurrentChildPure) {
      var lastIndex = childList.length - 1;
      var lastChild = childList[lastIndex];
      childList[lastIndex] = "" + lastChild + child;
    } else {
      childList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  return React.Children.map(childList, function(child) {
    return insertSpace(child, needInserted);
  });
}
tuple("default", "primary", "ghost", "dashed", "link", "text");
tuple("default", "circle", "round");
tuple("submit", "button", "reset");
function convertLegacyProps(type4) {
  if (type4 === "danger") {
    return {
      danger: true
    };
  }
  return {
    type: type4
  };
}
var InternalButton = function InternalButton2(props, ref2) {
  var _classNames;
  var _props$loading = props.loading, loading = _props$loading === void 0 ? false : _props$loading, customizePrefixCls = props.prefixCls, _props$type = props.type, type4 = _props$type === void 0 ? "default" : _props$type, danger = props.danger, _props$shape = props.shape, shape = _props$shape === void 0 ? "default" : _props$shape, customizeSize = props.size, customDisabled = props.disabled, className = props.className, children = props.children, icon = props.icon, _props$ghost = props.ghost, ghost = _props$ghost === void 0 ? false : _props$ghost, _props$block = props.block, block = _props$block === void 0 ? false : _props$block, _props$htmlType = props.htmlType, htmlType = _props$htmlType === void 0 ? "button" : _props$htmlType, rest = __rest$3(props, ["loading", "prefixCls", "type", "danger", "shape", "size", "disabled", "className", "children", "icon", "ghost", "block", "htmlType"]);
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls, autoInsertSpaceInButton = _React$useContext.autoInsertSpaceInButton, direction = _React$useContext.direction;
  var prefixCls = getPrefixCls("btn", customizePrefixCls);
  var _useStyle = useStyle$1(prefixCls), _useStyle2 = _slicedToArray$3(_useStyle, 2), wrapSSR = _useStyle2[0], hashId = _useStyle2[1];
  var size = React.useContext(SizeContext$1);
  var disabled = React.useContext(DisabledContext$1);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  var groupSize = React.useContext(GroupSizeContext);
  var _React$useState = React.useState(!!loading), _React$useState2 = _slicedToArray$3(_React$useState, 2), innerLoading = _React$useState2[0], setLoading = _React$useState2[1];
  var _React$useState3 = React.useState(false), _React$useState4 = _slicedToArray$3(_React$useState3, 2), hasTwoCNChar = _React$useState4[0], setHasTwoCNChar = _React$useState4[1];
  var buttonRef = ref2 || /* @__PURE__ */ React.createRef();
  var isNeedInserted = function isNeedInserted2() {
    return React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type4);
  };
  var fixTwoCNChar = function fixTwoCNChar2() {
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    var buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };
  var loadingOrDelay = typeof loading === "boolean" ? loading : (loading === null || loading === void 0 ? void 0 : loading.delay) || true;
  React.useEffect(function() {
    var delayTimer = null;
    if (typeof loadingOrDelay === "number") {
      delayTimer = window.setTimeout(function() {
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }
    return function() {
      if (delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    };
  }, [loadingOrDelay]);
  React.useEffect(fixTwoCNChar, [buttonRef]);
  var handleClick = function handleClick2(e) {
    var onClick = props.onClick;
    if (innerLoading || mergedDisabled) {
      e.preventDefault();
      return;
    }
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  process.env.NODE_ENV !== "production" ? warning$3(!(typeof icon === "string" && icon.length > 2), "Button", "`icon` is using ReactNode instead of string naming in v4. Please check `" + icon + "` at https://ant.design/components/icon") : void 0;
  process.env.NODE_ENV !== "production" ? warning$3(!(ghost && isUnBorderedButtonType(type4)), "Button", "`link` or `text` button can't be a `ghost` button.") : void 0;
  var autoInsertSpace = autoInsertSpaceInButton !== false;
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction), compactSize = _useCompactItemContex.compactSize, compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  var sizeClassNameMap = {
    large: "lg",
    small: "sm",
    middle: void 0
  };
  var sizeFullname = compactSize || groupSize || customizeSize || size;
  var sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || "" : "";
  var iconType = innerLoading ? "loading" : icon;
  var linkButtonRestProps = omit$1(rest, ["navigate"]);
  var classes = classNames(prefixCls, hashId, (_classNames = {}, _defineProperty$4(_classNames, prefixCls + "-" + shape, shape !== "default" && shape), _defineProperty$4(_classNames, prefixCls + "-" + type4, type4), _defineProperty$4(_classNames, prefixCls + "-" + sizeCls, sizeCls), _defineProperty$4(_classNames, prefixCls + "-icon-only", !children && children !== 0 && !!iconType), _defineProperty$4(_classNames, prefixCls + "-background-ghost", ghost && !isUnBorderedButtonType(type4)), _defineProperty$4(_classNames, prefixCls + "-loading", innerLoading), _defineProperty$4(_classNames, prefixCls + "-two-chinese-chars", hasTwoCNChar && autoInsertSpace && !innerLoading), _defineProperty$4(_classNames, prefixCls + "-block", block), _defineProperty$4(_classNames, prefixCls + "-dangerous", !!danger), _defineProperty$4(_classNames, prefixCls + "-rtl", direction === "rtl"), _defineProperty$4(_classNames, prefixCls + "-disabled", linkButtonRestProps.href !== void 0 && mergedDisabled), _classNames), compactItemClassnames, className);
  var iconNode = icon && !innerLoading ? icon : /* @__PURE__ */ React.createElement(LoadingIcon$1, {
    existIcon: !!icon,
    prefixCls,
    loading: !!innerLoading
  });
  var kids = children || children === 0 ? spaceChildren(children, isNeedInserted() && autoInsertSpace) : null;
  if (linkButtonRestProps.href !== void 0) {
    return wrapSSR(/* @__PURE__ */ React.createElement("a", _extends$2({}, linkButtonRestProps, {
      className: classes,
      onClick: handleClick,
      ref: buttonRef
    }), iconNode, kids));
  }
  var buttonNode = /* @__PURE__ */ React.createElement("button", _extends$2({}, rest, {
    type: htmlType,
    className: classes,
    onClick: handleClick,
    disabled: mergedDisabled,
    ref: buttonRef
  }), iconNode, kids);
  if (!isUnBorderedButtonType(type4)) {
    buttonNode = /* @__PURE__ */ React.createElement(Wave$1, {
      disabled: !!innerLoading
    }, buttonNode);
  }
  return wrapSSR(buttonNode);
};
var Button = /* @__PURE__ */ React.forwardRef(InternalButton);
if (process.env.NODE_ENV !== "production") {
  Button.displayName = "Button";
}
Button.Group = Group;
Button.__ANT_BUTTON = true;
const Button$1 = Button;
var OrderContext = /* @__PURE__ */ React.createContext(null);
var EMPTY_LIST = [];
function useDom(render2, debug2) {
  var _React$useState = React.useState(function() {
    if (!canUseDom$1()) {
      return null;
    }
    var defaultEle = document.createElement("div");
    if (process.env.NODE_ENV !== "production" && debug2) {
      defaultEle.setAttribute("data-debug", debug2);
    }
    return defaultEle;
  }), _React$useState2 = _slicedToArray$3(_React$useState, 1), ele = _React$useState2[0];
  var appendedRef = React.useRef(false);
  var queueCreate = React.useContext(OrderContext);
  var _React$useState3 = React.useState(EMPTY_LIST), _React$useState4 = _slicedToArray$3(_React$useState3, 2), queue = _React$useState4[0], setQueue = _React$useState4[1];
  var mergedQueueCreate = queueCreate || (appendedRef.current ? void 0 : function(appendFn) {
    setQueue(function(origin) {
      var newQueue = [appendFn].concat(_toConsumableArray$2(origin));
      return newQueue;
    });
  });
  function append2() {
    if (!ele.parentElement) {
      document.body.appendChild(ele);
    }
    appendedRef.current = true;
  }
  function cleanup2() {
    var _ele$parentElement;
    (_ele$parentElement = ele.parentElement) === null || _ele$parentElement === void 0 ? void 0 : _ele$parentElement.removeChild(ele);
    appendedRef.current = false;
  }
  useLayoutEffect(function() {
    if (render2) {
      if (queueCreate) {
        queueCreate(append2);
      } else {
        append2();
      }
    } else {
      cleanup2();
    }
    return cleanup2;
  }, [render2]);
  useLayoutEffect(function() {
    if (queue.length) {
      queue.forEach(function(appendFn) {
        return appendFn();
      });
      setQueue(EMPTY_LIST);
    }
  }, [queue]);
  return [ele, mergedQueueCreate];
}
var cached;
function getScrollBarSize(fresh) {
  if (typeof document === "undefined") {
    return 0;
  }
  if (fresh || cached === void 0) {
    var inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement("div");
    var outerStyle = outer.style;
    outerStyle.position = "absolute";
    outerStyle.top = "0";
    outerStyle.left = "0";
    outerStyle.pointerEvents = "none";
    outerStyle.visibility = "hidden";
    outerStyle.width = "200px";
    outerStyle.height = "150px";
    outerStyle.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var widthContained = inner.offsetWidth;
    outer.style.overflow = "scroll";
    var widthScroll = inner.offsetWidth;
    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }
    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }
  return cached;
}
function isBodyOverflowing() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
var UNIQUE_ID = "rc-util-locker-".concat(Date.now());
var uuid = 0;
function useScrollLocker(lock) {
  var mergedLock = !!lock;
  var _React$useState = React.useState(function() {
    uuid += 1;
    return "".concat(UNIQUE_ID, "_").concat(uuid);
  }), _React$useState2 = _slicedToArray$3(_React$useState, 1), id2 = _React$useState2[0];
  useLayoutEffect(function() {
    if (mergedLock) {
      var scrollbarSize = getScrollBarSize();
      var isOverflow = isBodyOverflowing();
      updateCSS$1("\nhtml body {\n  overflow-y: hidden;\n  ".concat(isOverflow ? "width: calc(100% - ".concat(scrollbarSize, "px);") : "", "\n}"), id2);
    } else {
      removeCSS(id2);
    }
    return function() {
      removeCSS(id2);
    };
  }, [mergedLock, id2]);
}
var inline = false;
function inlineMock(nextInline) {
  if (typeof nextInline === "boolean") {
    inline = nextInline;
  }
  return inline;
}
var getPortalContainer = function getPortalContainer2(getContainer2) {
  if (getContainer2 === false) {
    return false;
  }
  if (!canUseDom$1() || !getContainer2) {
    return null;
  }
  if (typeof getContainer2 === "string") {
    return document.querySelector(getContainer2);
  }
  if (typeof getContainer2 === "function") {
    return getContainer2();
  }
  return getContainer2;
};
var Portal = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var open = props.open, autoLock = props.autoLock, getContainer2 = props.getContainer, debug2 = props.debug, _props$autoDestroy = props.autoDestroy, autoDestroy = _props$autoDestroy === void 0 ? true : _props$autoDestroy, children = props.children;
  var _React$useState = React.useState(open), _React$useState2 = _slicedToArray$3(_React$useState, 2), shouldRender = _React$useState2[0], setShouldRender = _React$useState2[1];
  var mergedRender = shouldRender || open;
  if (process.env.NODE_ENV !== "production") {
    warningOnce$1(canUseDom$1() || !open, "Portal only work in client side. Please call 'useEffect' to show Portal instead default render in SSR.");
  }
  React.useEffect(function() {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);
  var _React$useState3 = React.useState(function() {
    return getPortalContainer(getContainer2);
  }), _React$useState4 = _slicedToArray$3(_React$useState3, 2), innerContainer = _React$useState4[0], setInnerContainer = _React$useState4[1];
  React.useEffect(function() {
    var customizeContainer = getPortalContainer(getContainer2);
    setInnerContainer(customizeContainer !== null && customizeContainer !== void 0 ? customizeContainer : null);
  });
  var _useDom = useDom(mergedRender && !innerContainer, debug2), _useDom2 = _slicedToArray$3(_useDom, 2), defaultContainer = _useDom2[0], queueCreate = _useDom2[1];
  var mergedContainer = innerContainer !== null && innerContainer !== void 0 ? innerContainer : defaultContainer;
  useScrollLocker(autoLock && open && canUseDom$1() && (mergedContainer === defaultContainer || mergedContainer === document.body));
  var childRef = null;
  if (children && supportRef(children) && ref2) {
    var _ref = children;
    childRef = _ref.ref;
  }
  var mergedRef = useComposeRef(childRef, ref2);
  if (!mergedRender || !canUseDom$1() || innerContainer === void 0) {
    return null;
  }
  var renderInline = mergedContainer === false || inlineMock();
  var reffedChildren = children;
  if (ref2) {
    reffedChildren = /* @__PURE__ */ React.cloneElement(children, {
      ref: mergedRef
    });
  }
  return /* @__PURE__ */ React.createElement(OrderContext.Provider, {
    value: queueCreate
  }, renderInline ? reffedChildren : /* @__PURE__ */ createPortal(reffedChildren, mergedContainer));
});
if (process.env.NODE_ENV !== "production") {
  Portal.displayName = "Portal";
}
var DrawerPanel$1 = function DrawerPanel(props) {
  var prefixCls = props.prefixCls, className = props.className, style2 = props.style, children = props.children, containerRef = props.containerRef;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-content"), className),
    style: _objectSpread2$3({}, style2),
    "aria-modal": "true",
    role: "dialog",
    ref: containerRef
  }, children));
};
if (process.env.NODE_ENV !== "production") {
  DrawerPanel$1.displayName = "DrawerPanel";
}
var DrawerContext = /* @__PURE__ */ React.createContext(null);
function parseWidthHeight(value2) {
  if (typeof value2 === "string" && String(Number(value2)) === value2) {
    warningOnce$1(false, "Invalid value type of `width` or `height` which should be number type instead.");
    return Number(value2);
  }
  return value2;
}
function warnCheck(props) {
  warningOnce$1(!("wrapperClassName" in props), "'wrapperClassName' is removed. Please use 'rootClassName' instead.");
}
var sentinelStyle = {
  width: 0,
  height: 0,
  overflow: "hidden",
  outline: "none",
  position: "absolute"
};
function DrawerPopup(props) {
  var _ref, _pushConfig$distance, _pushConfig, _classNames;
  var prefixCls = props.prefixCls, open = props.open, placement = props.placement, inline2 = props.inline, push = props.push, forceRender = props.forceRender, autoFocus = props.autoFocus, keyboard = props.keyboard, rootClassName = props.rootClassName, rootStyle = props.rootStyle, zIndex = props.zIndex, className = props.className, style2 = props.style, motion = props.motion, width = props.width, height = props.height, children = props.children, contentWrapperStyle = props.contentWrapperStyle, mask = props.mask, maskClosable = props.maskClosable, maskMotion = props.maskMotion, maskClassName = props.maskClassName, maskStyle = props.maskStyle, afterOpenChange = props.afterOpenChange, onClose = props.onClose;
  var panelRef = React.useRef();
  var sentinelStartRef = React.useRef();
  var sentinelEndRef = React.useRef();
  var onPanelKeyDown = function onPanelKeyDown2(event) {
    var keyCode = event.keyCode, shiftKey = event.shiftKey;
    switch (keyCode) {
      case KeyCode.TAB: {
        if (keyCode === KeyCode.TAB) {
          if (!shiftKey && document.activeElement === sentinelEndRef.current) {
            var _sentinelStartRef$cur;
            (_sentinelStartRef$cur = sentinelStartRef.current) === null || _sentinelStartRef$cur === void 0 ? void 0 : _sentinelStartRef$cur.focus({
              preventScroll: true
            });
          } else if (shiftKey && document.activeElement === sentinelStartRef.current) {
            var _sentinelEndRef$curre;
            (_sentinelEndRef$curre = sentinelEndRef.current) === null || _sentinelEndRef$curre === void 0 ? void 0 : _sentinelEndRef$curre.focus({
              preventScroll: true
            });
          }
        }
        break;
      }
      case KeyCode.ESC: {
        if (onClose && keyboard) {
          onClose(event);
        }
        break;
      }
    }
  };
  React.useEffect(function() {
    if (open && autoFocus) {
      var _panelRef$current;
      (_panelRef$current = panelRef.current) === null || _panelRef$current === void 0 ? void 0 : _panelRef$current.focus({
        preventScroll: true
      });
    }
  }, [open, autoFocus]);
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray$3(_React$useState, 2), pushed = _React$useState2[0], setPushed = _React$useState2[1];
  var parentContext = React.useContext(DrawerContext);
  var pushConfig;
  if (push === false) {
    pushConfig = {
      distance: 0
    };
  } else if (push === true) {
    pushConfig = {};
  } else {
    pushConfig = push || {};
  }
  var pushDistance = (_ref = (_pushConfig$distance = (_pushConfig = pushConfig) === null || _pushConfig === void 0 ? void 0 : _pushConfig.distance) !== null && _pushConfig$distance !== void 0 ? _pushConfig$distance : parentContext === null || parentContext === void 0 ? void 0 : parentContext.pushDistance) !== null && _ref !== void 0 ? _ref : 180;
  var mergedContext = React.useMemo(function() {
    return {
      pushDistance,
      push: function push2() {
        setPushed(true);
      },
      pull: function pull() {
        setPushed(false);
      }
    };
  }, [pushDistance]);
  React.useEffect(function() {
    if (open) {
      var _parentContext$push;
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$push = parentContext.push) === null || _parentContext$push === void 0 ? void 0 : _parentContext$push.call(parentContext);
    } else {
      var _parentContext$pull;
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$pull = parentContext.pull) === null || _parentContext$pull === void 0 ? void 0 : _parentContext$pull.call(parentContext);
    }
  }, [open]);
  React.useEffect(function() {
    return function() {
      var _parentContext$pull2;
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$pull2 = parentContext.pull) === null || _parentContext$pull2 === void 0 ? void 0 : _parentContext$pull2.call(parentContext);
    };
  }, []);
  var maskNode = mask && /* @__PURE__ */ React.createElement(CSSMotion, _extends$2({
    key: "mask"
  }, maskMotion, {
    visible: open
  }), function(_ref2, maskRef) {
    var motionMaskClassName = _ref2.className, motionMaskStyle = _ref2.style;
    return /* @__PURE__ */ React.createElement("div", {
      className: classNames("".concat(prefixCls, "-mask"), motionMaskClassName, maskClassName),
      style: _objectSpread2$3(_objectSpread2$3({}, motionMaskStyle), maskStyle),
      onClick: maskClosable ? onClose : void 0,
      ref: maskRef
    });
  });
  var motionProps = typeof motion === "function" ? motion(placement) : motion;
  var wrapperStyle = {};
  if (pushed && pushDistance) {
    switch (placement) {
      case "top":
        wrapperStyle.transform = "translateY(".concat(pushDistance, "px)");
        break;
      case "bottom":
        wrapperStyle.transform = "translateY(".concat(-pushDistance, "px)");
        break;
      case "left":
        wrapperStyle.transform = "translateX(".concat(pushDistance, "px)");
        break;
      default:
        wrapperStyle.transform = "translateX(".concat(-pushDistance, "px)");
        break;
    }
  }
  if (placement === "left" || placement === "right") {
    wrapperStyle.width = parseWidthHeight(width);
  } else {
    wrapperStyle.height = parseWidthHeight(height);
  }
  var panelNode = /* @__PURE__ */ React.createElement(CSSMotion, _extends$2({
    key: "panel"
  }, motionProps, {
    visible: open,
    forceRender,
    onVisibleChanged: function onVisibleChanged(nextVisible) {
      afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(nextVisible);
    },
    removeOnLeave: false,
    leavedClassName: "".concat(prefixCls, "-content-wrapper-hidden")
  }), function(_ref3, motionRef) {
    var motionClassName = _ref3.className, motionStyle = _ref3.style;
    return /* @__PURE__ */ React.createElement("div", {
      className: classNames("".concat(prefixCls, "-content-wrapper"), motionClassName),
      style: _objectSpread2$3(_objectSpread2$3(_objectSpread2$3({}, wrapperStyle), motionStyle), contentWrapperStyle)
    }, /* @__PURE__ */ React.createElement(DrawerPanel$1, {
      containerRef: motionRef,
      prefixCls,
      className,
      style: style2
    }, children));
  });
  var containerStyle = _objectSpread2$3({}, rootStyle);
  if (zIndex) {
    containerStyle.zIndex = zIndex;
  }
  return /* @__PURE__ */ React.createElement(DrawerContext.Provider, {
    value: mergedContext
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames(prefixCls, "".concat(prefixCls, "-").concat(placement), rootClassName, (_classNames = {}, _defineProperty$4(_classNames, "".concat(prefixCls, "-open"), open), _defineProperty$4(_classNames, "".concat(prefixCls, "-inline"), inline2), _classNames)),
    style: containerStyle,
    tabIndex: -1,
    ref: panelRef,
    onKeyDown: onPanelKeyDown
  }, maskNode, /* @__PURE__ */ React.createElement("div", {
    tabIndex: 0,
    ref: sentinelStartRef,
    style: sentinelStyle,
    "aria-hidden": "true",
    "data-sentinel": "start"
  }), panelNode, /* @__PURE__ */ React.createElement("div", {
    tabIndex: 0,
    ref: sentinelEndRef,
    style: sentinelStyle,
    "aria-hidden": "true",
    "data-sentinel": "end"
  })));
}
var Drawer$1 = function Drawer(props) {
  var open = props.open, getContainer2 = props.getContainer, forceRender = props.forceRender, prefixCls = props.prefixCls, afterOpenChange = props.afterOpenChange, destroyOnClose = props.destroyOnClose, mask = props.mask;
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray$3(_React$useState, 2), animatedVisible = _React$useState2[0], setAnimatedVisible = _React$useState2[1];
  if (process.env.NODE_ENV !== "production") {
    warnCheck(props);
  }
  var internalAfterOpenChange = function internalAfterOpenChange2(nextVisible) {
    setAnimatedVisible(nextVisible);
    afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(nextVisible);
  };
  if (!forceRender && !animatedVisible && !open && destroyOnClose) {
    return null;
  }
  var sharedDrawerProps = _objectSpread2$3(_objectSpread2$3({}, props), {}, {
    prefixCls,
    afterOpenChange: internalAfterOpenChange
  });
  return /* @__PURE__ */ React.createElement(Portal, {
    open: open || forceRender || animatedVisible,
    autoDestroy: false,
    getContainer: getContainer2,
    autoLock: mask && (open || animatedVisible)
  }, /* @__PURE__ */ React.createElement(DrawerPopup, _extends$2({}, sharedDrawerProps, {
    inline: getContainer2 === false
  })));
};
Drawer$1.defaultProps = {
  open: false,
  prefixCls: "rc-drawer",
  placement: "right",
  autoFocus: true,
  keyboard: true,
  width: 378,
  mask: true,
  maskClosable: true
};
if (process.env.NODE_ENV !== "production") {
  Drawer$1.displayName = "Drawer";
}
function DrawerPanel2(props) {
  var prefixCls = props.prefixCls, title = props.title, footer = props.footer, extra = props.extra, _props$closable = props.closable, closable = _props$closable === void 0 ? true : _props$closable, _props$closeIcon = props.closeIcon, closeIcon = _props$closeIcon === void 0 ? /* @__PURE__ */ React.createElement(CloseOutlined$1, null) : _props$closeIcon, onClose = props.onClose, headerStyle = props.headerStyle, drawerStyle = props.drawerStyle, bodyStyle = props.bodyStyle, footerStyle = props.footerStyle, children = props.children;
  var closeIconNode = closable && /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    className: prefixCls + "-close"
  }, closeIcon);
  function renderHeader() {
    if (!title && !closable) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: classNames(prefixCls + "-header", _defineProperty$4({}, prefixCls + "-header-close-only", closable && !title && !extra)),
      style: headerStyle
    }, /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-header-title"
    }, closeIconNode, title && /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-title"
    }, title)), extra && /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-extra"
    }, extra));
  }
  function renderFooter() {
    if (!footer) {
      return null;
    }
    var footerClassName = prefixCls + "-footer";
    return /* @__PURE__ */ React.createElement("div", {
      className: footerClassName,
      style: footerStyle
    }, footer);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: prefixCls + "-wrapper-body",
    style: _extends$2({}, drawerStyle)
  }, renderHeader(), /* @__PURE__ */ React.createElement("div", {
    className: prefixCls + "-body",
    style: bodyStyle
  }, children), renderFooter());
}
var genMotionStyle = function genMotionStyle2(token2) {
  var _componentCls;
  var componentCls = token2.componentCls, motionDurationSlow = token2.motionDurationSlow;
  var sharedPanelMotion = {
    "&-enter, &-appear, &-leave": {
      "&-start": {
        transition: "none"
      },
      "&-active": {
        transition: "all " + motionDurationSlow
      }
    }
  };
  return _defineProperty$4({}, componentCls, (_componentCls = {}, _defineProperty$4(_componentCls, componentCls + "-mask-motion", {
    "&-enter, &-appear, &-leave": {
      "&-active": {
        transition: "all " + motionDurationSlow
      }
    },
    "&-enter, &-appear": {
      opacity: 0,
      "&-active": {
        opacity: 1
      }
    },
    "&-leave": {
      opacity: 1,
      "&-active": {
        opacity: 0
      }
    }
  }), _defineProperty$4(_componentCls, componentCls + "-panel-motion", {
    // Left
    "&-left": [sharedPanelMotion, {
      "&-enter, &-appear": {
        "&-start": {
          transform: "translateX(-100%) !important"
        },
        "&-active": {
          transform: "translateX(0)"
        }
      },
      "&-leave": {
        transform: "translateX(0)",
        "&-active": {
          transform: "translateX(-100%)"
        }
      }
    }],
    // Right
    "&-right": [sharedPanelMotion, {
      "&-enter, &-appear": {
        "&-start": {
          transform: "translateX(100%) !important"
        },
        "&-active": {
          transform: "translateX(0)"
        }
      },
      "&-leave": {
        transform: "translateX(0)",
        "&-active": {
          transform: "translateX(100%)"
        }
      }
    }],
    // Top
    "&-top": [sharedPanelMotion, {
      "&-enter, &-appear": {
        "&-start": {
          transform: "translateY(-100%) !important"
        },
        "&-active": {
          transform: "translateY(0)"
        }
      },
      "&-leave": {
        transform: "translateY(0)",
        "&-active": {
          transform: "translateY(-100%)"
        }
      }
    }],
    // Bottom
    "&-bottom": [sharedPanelMotion, {
      "&-enter, &-appear": {
        "&-start": {
          transform: "translateY(100%) !important"
        },
        "&-active": {
          transform: "translateY(0)"
        }
      },
      "&-leave": {
        transform: "translateY(0)",
        "&-active": {
          transform: "translateY(100%)"
        }
      }
    }]
  }), _componentCls));
};
const genMotionStyle$1 = genMotionStyle;
var genDrawerStyle = function genDrawerStyle2(token2) {
  var _pure, _componentCls;
  var componentCls = token2.componentCls, zIndexPopup = token2.zIndexPopup, colorBgMask = token2.colorBgMask, colorBgElevated = token2.colorBgElevated, motionDurationSlow = token2.motionDurationSlow, motionDurationMid = token2.motionDurationMid, padding = token2.padding, paddingLG = token2.paddingLG, fontSizeLG = token2.fontSizeLG, lineHeightLG = token2.lineHeightLG, lineWidth = token2.lineWidth, lineType = token2.lineType, colorSplit = token2.colorSplit, marginSM = token2.marginSM, colorIcon = token2.colorIcon, colorIconHover = token2.colorIconHover, colorText = token2.colorText, fontWeightStrong = token2.fontWeightStrong, drawerFooterPaddingVertical = token2.drawerFooterPaddingVertical, drawerFooterPaddingHorizontal = token2.drawerFooterPaddingHorizontal;
  var wrapperCls = componentCls + "-content-wrapper";
  return _defineProperty$4({}, componentCls, (_componentCls = {
    position: "fixed",
    inset: 0,
    zIndex: zIndexPopup,
    pointerEvents: "none",
    "&-pure": (_pure = {
      position: "relative",
      background: colorBgElevated
    }, _defineProperty$4(_pure, "&" + componentCls + "-left", {
      boxShadow: token2.boxShadowDrawerLeft
    }), _defineProperty$4(_pure, "&" + componentCls + "-right", {
      boxShadow: token2.boxShadowDrawerRight
    }), _defineProperty$4(_pure, "&" + componentCls + "-top", {
      boxShadow: token2.boxShadowDrawerUp
    }), _defineProperty$4(_pure, "&" + componentCls + "-bottom", {
      boxShadow: token2.boxShadowDrawerDown
    }), _pure),
    "&-inline": {
      position: "absolute"
    }
  }, _defineProperty$4(_componentCls, componentCls + "-mask", {
    position: "absolute",
    inset: 0,
    zIndex: zIndexPopup,
    background: colorBgMask,
    pointerEvents: "auto"
  }), _defineProperty$4(_componentCls, wrapperCls, {
    position: "absolute",
    zIndex: zIndexPopup,
    transition: "all " + motionDurationSlow,
    "&-hidden": {
      display: "none"
    }
  }), _defineProperty$4(_componentCls, "&-left > " + wrapperCls, {
    top: 0,
    bottom: 0,
    left: {
      _skip_check_: true,
      value: 0
    },
    boxShadow: token2.boxShadowDrawerLeft
  }), _defineProperty$4(_componentCls, "&-right > " + wrapperCls, {
    top: 0,
    right: {
      _skip_check_: true,
      value: 0
    },
    bottom: 0,
    boxShadow: token2.boxShadowDrawerRight
  }), _defineProperty$4(_componentCls, "&-top > " + wrapperCls, {
    top: 0,
    insetInline: 0,
    boxShadow: token2.boxShadowDrawerUp
  }), _defineProperty$4(_componentCls, "&-bottom > " + wrapperCls, {
    bottom: 0,
    insetInline: 0,
    boxShadow: token2.boxShadowDrawerDown
  }), _defineProperty$4(_componentCls, componentCls + "-content", {
    width: "100%",
    height: "100%",
    overflow: "auto",
    background: colorBgElevated,
    pointerEvents: "auto"
  }), _defineProperty$4(_componentCls, componentCls + "-wrapper-body", {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  }), _defineProperty$4(_componentCls, componentCls + "-header", {
    display: "flex",
    flex: 0,
    alignItems: "center",
    padding: padding + "px " + paddingLG + "px",
    fontSize: fontSizeLG,
    lineHeight: lineHeightLG,
    borderBottom: lineWidth + "px " + lineType + " " + colorSplit,
    "&-title": {
      display: "flex",
      flex: 1,
      alignItems: "center",
      minWidth: 0,
      minHeight: 0
    }
  }), _defineProperty$4(_componentCls, componentCls + "-extra", {
    flex: "none"
  }), _defineProperty$4(_componentCls, componentCls + "-close", {
    display: "inline-block",
    marginInlineEnd: marginSM,
    color: colorIcon,
    fontWeight: fontWeightStrong,
    fontSize: fontSizeLG,
    fontStyle: "normal",
    lineHeight: 1,
    textAlign: "center",
    textTransform: "none",
    textDecoration: "none",
    background: "transparent",
    border: 0,
    outline: 0,
    cursor: "pointer",
    transition: "color " + motionDurationMid,
    textRendering: "auto",
    "&:focus, &:hover": {
      color: colorIconHover,
      textDecoration: "none"
    }
  }), _defineProperty$4(_componentCls, componentCls + "-title", {
    flex: 1,
    margin: 0,
    color: colorText,
    fontWeight: token2.fontWeightStrong,
    fontSize: fontSizeLG,
    lineHeight: lineHeightLG
  }), _defineProperty$4(_componentCls, componentCls + "-body", {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    padding: paddingLG,
    overflow: "auto"
  }), _defineProperty$4(_componentCls, componentCls + "-footer", {
    flexShrink: 0,
    padding: drawerFooterPaddingVertical + "px " + drawerFooterPaddingHorizontal + "px",
    borderTop: lineWidth + "px " + lineType + " " + colorSplit
  }), _defineProperty$4(_componentCls, "&-rtl", {
    direction: "rtl"
  }), _componentCls));
};
const useStyle = genComponentStyleHook("Drawer", function(token2) {
  var drawerToken = merge(token2, {
    drawerFooterPaddingVertical: token2.paddingXS,
    drawerFooterPaddingHorizontal: token2.padding
  });
  return [genDrawerStyle(drawerToken), genMotionStyle$1(drawerToken)];
}, function(token2) {
  return {
    zIndexPopup: token2.zIndexPopupBase
  };
});
var __rest$2 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
tuple("default", "large");
var defaultPushState = {
  distance: 180
};
function Drawer2(props) {
  var rootClassName = props.rootClassName, width = props.width, height = props.height, _props$size = props.size, size = _props$size === void 0 ? "default" : _props$size, _props$mask = props.mask, mask = _props$mask === void 0 ? true : _props$mask, _props$push = props.push, push = _props$push === void 0 ? defaultPushState : _props$push, open = props.open, afterOpenChange = props.afterOpenChange, onClose = props.onClose, customizePrefixCls = props.prefixCls, customizeGetContainer = props.getContainer, visible = props.visible, afterVisibleChange = props.afterVisibleChange, rest = __rest$2(props, ["rootClassName", "width", "height", "size", "mask", "push", "open", "afterOpenChange", "onClose", "prefixCls", "getContainer", "visible", "afterVisibleChange"]);
  var _React$useContext = React.useContext(ConfigContext), getPopupContainer = _React$useContext.getPopupContainer, getPrefixCls = _React$useContext.getPrefixCls, direction = _React$useContext.direction;
  var prefixCls = getPrefixCls("drawer", customizePrefixCls);
  var _useStyle = useStyle(prefixCls), _useStyle2 = _slicedToArray$3(_useStyle, 2), wrapSSR = _useStyle2[0], hashId = _useStyle2[1];
  var getContainer2 = (
    // 有可能为 false，所以不能直接判断
    customizeGetContainer === void 0 && getPopupContainer ? function() {
      return getPopupContainer(document.body);
    } : customizeGetContainer
  );
  var drawerClassName = classNames(_defineProperty$4({
    "no-mask": !mask
  }, prefixCls + "-rtl", direction === "rtl"), rootClassName, hashId);
  if (process.env.NODE_ENV !== "production") {
    [["visible", "open"], ["afterVisibleChange", "afterOpenChange"]].forEach(function(_ref) {
      var _ref2 = _slicedToArray$3(_ref, 2), deprecatedName = _ref2[0], newName = _ref2[1];
      process.env.NODE_ENV !== "production" ? warning$3(!(deprecatedName in props), "Drawer", "`" + deprecatedName + "` is deprecated, please use `" + newName + "` instead.") : void 0;
    });
  }
  var mergedWidth = React.useMemo(function() {
    return width !== null && width !== void 0 ? width : size === "large" ? 736 : 378;
  }, [width, size]);
  var mergedHeight = React.useMemo(function() {
    return height !== null && height !== void 0 ? height : size === "large" ? 736 : 378;
  }, [height, size]);
  var maskMotion = {
    motionName: getTransitionName(prefixCls, "mask-motion"),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500
  };
  var panelMotion = function panelMotion2(motionPlacement) {
    return {
      motionName: getTransitionName(prefixCls, "panel-motion-" + motionPlacement),
      motionAppear: true,
      motionEnter: true,
      motionLeave: true,
      motionDeadline: 500
    };
  };
  return wrapSSR(/* @__PURE__ */ React.createElement(NoFormStyle, {
    status: true,
    override: true
  }, /* @__PURE__ */ React.createElement(Drawer$1, _extends$2({
    prefixCls,
    onClose,
    maskMotion,
    motion: panelMotion
  }, rest, {
    open: open !== null && open !== void 0 ? open : visible,
    mask,
    push,
    width: mergedWidth,
    height: mergedHeight,
    rootClassName: drawerClassName,
    getContainer: getContainer2,
    afterOpenChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange
  }), /* @__PURE__ */ React.createElement(DrawerPanel2, _extends$2({
    prefixCls
  }, rest, {
    onClose
  })))));
}
if (process.env.NODE_ENV !== "production") {
  Drawer2.displayName = "Drawer";
}
function PurePanel$1(_a) {
  var customizePrefixCls = _a.prefixCls, style2 = _a.style, className = _a.className, _a$placement = _a.placement, placement = _a$placement === void 0 ? "right" : _a$placement, restProps = __rest$2(_a, ["prefixCls", "style", "className", "placement"]);
  var _React$useContext2 = React.useContext(ConfigContext), getPrefixCls = _React$useContext2.getPrefixCls;
  var prefixCls = getPrefixCls("drawer", customizePrefixCls);
  var _useStyle3 = useStyle(prefixCls), _useStyle4 = _slicedToArray$3(_useStyle3, 2), wrapSSR = _useStyle4[0], hashId = _useStyle4[1];
  return wrapSSR(/* @__PURE__ */ React.createElement("div", {
    className: classNames(prefixCls, prefixCls + "-pure", prefixCls + "-" + placement, hashId, className),
    style: style2
  }, /* @__PURE__ */ React.createElement(DrawerPanel2, _extends$2({
    prefixCls
  }, restProps))));
}
Drawer2._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
function isThenable(thing) {
  return !!(thing && !!thing.then);
}
var ActionButton$1 = function ActionButton(props) {
  var clickedRef = React.useRef(false);
  var ref2 = React.useRef(null);
  var _useState = useSafeState(false), _useState2 = _slicedToArray$3(_useState, 2), loading = _useState2[0], setLoading = _useState2[1];
  var close = props.close;
  var onInternalClose = function onInternalClose2() {
    close === null || close === void 0 ? void 0 : close.apply(void 0, arguments);
  };
  React.useEffect(function() {
    var timeoutId = null;
    if (props.autoFocus) {
      timeoutId = setTimeout(function() {
        var _a;
        (_a = ref2.current) === null || _a === void 0 ? void 0 : _a.focus();
      });
    }
    return function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  var handlePromiseOnOk = function handlePromiseOnOk2(returnValueOfOnOk) {
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk.then(function() {
      setLoading(false, true);
      onInternalClose.apply(void 0, arguments);
      clickedRef.current = false;
    }, function(e) {
      console.error(e);
      setLoading(false, true);
      clickedRef.current = false;
    });
  };
  var onClick = function onClick2(e) {
    var actionFn = props.actionFn;
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    var returnValueOfOnOk;
    if (props.emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        onInternalClose(e);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        onInternalClose();
        return;
      }
    }
    handlePromiseOnOk(returnValueOfOnOk);
  };
  var type4 = props.type, children = props.children, prefixCls = props.prefixCls, buttonProps = props.buttonProps;
  return /* @__PURE__ */ React.createElement(Button$1, _extends$2({}, convertLegacyProps(type4), {
    onClick,
    loading,
    prefixCls
  }, buttonProps, {
    ref: ref2
  }), children);
};
const ActionButton$2 = ActionButton$1;
var genBaseStyle2 = function genBaseStyle3(token2) {
  var _ref, _componentCls;
  var componentCls = token2.componentCls, iconCls = token2.iconCls, zIndexPopup = token2.zIndexPopup, colorText = token2.colorText, colorWarning = token2.colorWarning, marginXS = token2.marginXS, fontSize = token2.fontSize, lineHeight = token2.lineHeight;
  return _defineProperty$4({}, componentCls, (_componentCls = {
    zIndex: zIndexPopup
  }, _defineProperty$4(_componentCls, componentCls + "-inner-content", {
    color: colorText
  }), _defineProperty$4(_componentCls, componentCls + "-message", (_ref = {
    position: "relative",
    marginBottom: marginXS,
    color: colorText,
    fontSize,
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "start"
  }, _defineProperty$4(_ref, "> " + componentCls + "-message-icon " + iconCls, {
    color: colorWarning,
    fontSize,
    flex: "none",
    lineHeight: 1,
    paddingTop: (Math.round(fontSize * lineHeight) - fontSize) / 2
  }), _defineProperty$4(_ref, "&-title", {
    flex: "auto",
    marginInlineStart: marginXS
  }), _ref)), _defineProperty$4(_componentCls, componentCls + "-buttons", {
    textAlign: "end",
    button: {
      marginInlineStart: marginXS
    }
  }), _componentCls));
};
const usePopconfirmStyle = genComponentStyleHook("Popconfirm", function(token2) {
  return genBaseStyle2(token2);
}, function(token2) {
  var zIndexPopupBase = token2.zIndexPopupBase;
  return {
    zIndexPopup: zIndexPopupBase + 60
  };
});
var __rest$1 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var Overlay2 = function Overlay3(props) {
  var prefixCls = props.prefixCls, okButtonProps = props.okButtonProps, cancelButtonProps = props.cancelButtonProps, title = props.title, cancelText = props.cancelText, okText = props.okText, _props$okType = props.okType, okType = _props$okType === void 0 ? "primary" : _props$okType, _props$icon = props.icon, icon = _props$icon === void 0 ? /* @__PURE__ */ React.createElement(ExclamationCircleFilled$1, null) : _props$icon, _props$showCancel = props.showCancel, showCancel = _props$showCancel === void 0 ? true : _props$showCancel, close = props.close, onConfirm = props.onConfirm, onCancel = props.onCancel;
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls;
  return /* @__PURE__ */ React.createElement(LocaleReceiver$1, {
    componentName: "Popconfirm",
    defaultLocale: defaultLocale.Popconfirm
  }, function(contextLocale) {
    return /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-inner-content"
    }, /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-message"
    }, icon && /* @__PURE__ */ React.createElement("span", {
      className: prefixCls + "-message-icon"
    }, icon), /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-message-title"
    }, getRenderPropValue(title))), /* @__PURE__ */ React.createElement("div", {
      className: prefixCls + "-buttons"
    }, showCancel && /* @__PURE__ */ React.createElement(Button$1, _extends$2({
      onClick: onCancel,
      size: "small"
    }, cancelButtonProps), cancelText !== null && cancelText !== void 0 ? cancelText : contextLocale.cancelText), /* @__PURE__ */ React.createElement(ActionButton$2, {
      buttonProps: _extends$2(_extends$2({
        size: "small"
      }, convertLegacyProps(okType)), okButtonProps),
      actionFn: onConfirm,
      close,
      prefixCls: getPrefixCls("btn"),
      quitOnNullishReturnValue: true,
      emitEvent: true
    }, okText !== null && okText !== void 0 ? okText : contextLocale.okText)));
  });
};
function PurePanel(props) {
  var customizePrefixCls = props.prefixCls, placement = props.placement, className = props.className, style2 = props.style, restProps = __rest$1(props, ["prefixCls", "placement", "className", "style"]);
  var _React$useContext2 = React.useContext(ConfigContext), getPrefixCls = _React$useContext2.getPrefixCls;
  var prefixCls = getPrefixCls("popconfirm", customizePrefixCls);
  var _useStyle = usePopconfirmStyle(prefixCls), _useStyle2 = _slicedToArray$3(_useStyle, 1), wrapSSR = _useStyle2[0];
  return wrapSSR(/* @__PURE__ */ React.createElement(PurePanel$2, {
    placement,
    className: classNames(prefixCls, className),
    style: style2
  }, /* @__PURE__ */ React.createElement(Overlay2, _extends$2({}, restProps, {
    prefixCls
  }))));
}
var _this = globalThis;
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var Popconfirm = /* @__PURE__ */ React.forwardRef(function(props, ref2) {
  var _React$useContext = React.useContext(ConfigContext), getPrefixCls = _React$useContext.getPrefixCls;
  var _useMergedState = useMergedState(false, {
    value: props.open,
    defaultValue: props.defaultOpen
  }), _useMergedState2 = _slicedToArray$3(_useMergedState, 2), open = _useMergedState2[0], setOpen = _useMergedState2[1];
  var settingOpen = function settingOpen2(value2, e) {
    var _a;
    setOpen(value2, true);
    (_a = props.onOpenChange) === null || _a === void 0 ? void 0 : _a.call(props, value2, e);
  };
  var close = function close2(e) {
    settingOpen(false, e);
  };
  var onConfirm = function onConfirm2(e) {
    var _a;
    return (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(_this, e);
  };
  var onCancel = function onCancel2(e) {
    var _a;
    settingOpen(false, e);
    (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(_this, e);
  };
  var _onKeyDown = function onKeyDown(e) {
    if (e.keyCode === KeyCode.ESC && open) {
      settingOpen(false, e);
    }
  };
  var onOpenChange = function onOpenChange2(value2) {
    var _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled;
    if (disabled) {
      return;
    }
    settingOpen(value2);
  };
  var customizePrefixCls = props.prefixCls, _props$placement = props.placement, placement = _props$placement === void 0 ? "top" : _props$placement, _props$trigger = props.trigger, trigger = _props$trigger === void 0 ? "click" : _props$trigger, _props$okType = props.okType, okType = _props$okType === void 0 ? "primary" : _props$okType, _props$icon = props.icon, icon = _props$icon === void 0 ? /* @__PURE__ */ React.createElement(ExclamationCircleFilled$1, null) : _props$icon, children = props.children, overlayClassName = props.overlayClassName, restProps = __rest(props, ["prefixCls", "placement", "trigger", "okType", "icon", "children", "overlayClassName"]);
  var prefixCls = getPrefixCls("popconfirm", customizePrefixCls);
  var overlayClassNames = classNames(prefixCls, overlayClassName);
  var _usePopconfirmStyle = usePopconfirmStyle(prefixCls), _usePopconfirmStyle2 = _slicedToArray$3(_usePopconfirmStyle, 1), wrapSSR = _usePopconfirmStyle2[0];
  return wrapSSR(/* @__PURE__ */ React.createElement(Popover$1, _extends$2({}, restProps, {
    trigger,
    placement,
    onOpenChange,
    open,
    ref: ref2,
    overlayClassName: overlayClassNames,
    _overlay: /* @__PURE__ */ React.createElement(Overlay2, _extends$2({
      okType,
      icon
    }, props, {
      prefixCls,
      close,
      onConfirm,
      onCancel
    })),
    "data-popover-inject": true
  }), cloneElement(children, {
    onKeyDown: function onKeyDown(e) {
      var _a, _b;
      if (/* @__PURE__ */ React.isValidElement(children)) {
        (_b = children === null || children === void 0 ? void 0 : (_a = children.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      }
      _onKeyDown(e);
    }
  })));
});
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
const Popconfirm$1 = Popconfirm;
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid2) {
  return typeof uuid2 === "string" && REGEX.test(uuid2);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid2 = (byteToHex[arr[offset2 + 0]] + byteToHex[arr[offset2 + 1]] + byteToHex[arr[offset2 + 2]] + byteToHex[arr[offset2 + 3]] + "-" + byteToHex[arr[offset2 + 4]] + byteToHex[arr[offset2 + 5]] + "-" + byteToHex[arr[offset2 + 6]] + byteToHex[arr[offset2 + 7]] + "-" + byteToHex[arr[offset2 + 8]] + byteToHex[arr[offset2 + 9]] + "-" + byteToHex[arr[offset2 + 10]] + byteToHex[arr[offset2 + 11]] + byteToHex[arr[offset2 + 12]] + byteToHex[arr[offset2 + 13]] + byteToHex[arr[offset2 + 14]] + byteToHex[arr[offset2 + 15]]).toLowerCase();
  if (!validate(uuid2)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid2;
}
function v4(options, buf, offset2) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset2 = offset2 || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset2 + i] = rnds[i];
    }
    return buf;
  }
  return stringify(rnds);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lodash_clonedeep = { exports: {} };
lodash_clonedeep.exports;
(function(module2, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag2 = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
  var reFlags = /\w*$/;
  var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag2] = cloneableTags[weakMapTag] = false;
  var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
  var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }
  function addSetEntry(set2, value2) {
    set2.add(value2);
    return set2;
  }
  function arrayEach(array4, iteratee) {
    var index2 = -1, length2 = array4 ? array4.length : 0;
    while (++index2 < length2) {
      if (iteratee(array4[index2], index2, array4) === false) {
        break;
      }
    }
    return array4;
  }
  function arrayPush(array4, values) {
    var index2 = -1, length2 = values.length, offset2 = array4.length;
    while (++index2 < length2) {
      array4[offset2 + index2] = values[index2];
    }
    return array4;
  }
  function arrayReduce(array4, iteratee, accumulator, initAccum) {
    var index2 = -1, length2 = array4 ? array4.length : 0;
    if (initAccum && length2) {
      accumulator = array4[++index2];
    }
    while (++index2 < length2) {
      accumulator = iteratee(accumulator, array4[index2], index2, array4);
    }
    return accumulator;
  }
  function baseTimes(n, iteratee) {
    var index2 = -1, result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  function getValue2(object4, key) {
    return object4 == null ? void 0 : object4[key];
  }
  function isHostObject2(value2) {
    var result = false;
    if (value2 != null && typeof value2.toString != "function") {
      try {
        result = !!(value2 + "");
      } catch (e) {
      }
    }
    return result;
  }
  function mapToArray(map) {
    var index2 = -1, result = Array(map.size);
    map.forEach(function(value2, key) {
      result[++index2] = [key, value2];
    });
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set2) {
    var index2 = -1, result = Array(set2.size);
    set2.forEach(function(value2) {
      result[++index2] = value2;
    });
    return result;
  }
  var arrayProto2 = Array.prototype, funcProto2 = Function.prototype, objectProto2 = Object.prototype;
  var coreJsData2 = root2["__core-js_shared__"];
  var maskSrcKey2 = function() {
    var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var objectToString2 = objectProto2.toString;
  var reIsNative2 = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer = moduleExports ? root2.Buffer : void 0, Symbol2 = root2.Symbol, Uint8Array2 = root2.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative2(root2, "DataView"), Map2 = getNative2(root2, "Map"), Promise2 = getNative2(root2, "Promise"), Set2 = getNative2(root2, "Set"), WeakMap2 = getNative2(root2, "WeakMap"), nativeCreate2 = getNative2(Object, "create");
  var dataViewCtorString = toSource2(DataView), mapCtorString = toSource2(Map2), promiseCtorString = toSource2(Promise2), setCtorString = toSource2(Set2), weakMapCtorString = toSource2(WeakMap2);
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
  function Hash2(entries) {
    var index2 = -1, length2 = entries ? entries.length : 0;
    this.clear();
    while (++index2 < length2) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear2() {
    this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
  }
  function hashDelete2(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet2(key) {
    var data = this.__data__;
    if (nativeCreate2) {
      var result = data[key];
      return result === HASH_UNDEFINED2 ? void 0 : result;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  function hashHas2(key) {
    var data = this.__data__;
    return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
  }
  function hashSet2(key, value2) {
    var data = this.__data__;
    data[key] = nativeCreate2 && value2 === void 0 ? HASH_UNDEFINED2 : value2;
    return this;
  }
  Hash2.prototype.clear = hashClear2;
  Hash2.prototype["delete"] = hashDelete2;
  Hash2.prototype.get = hashGet2;
  Hash2.prototype.has = hashHas2;
  Hash2.prototype.set = hashSet2;
  function ListCache2(entries) {
    var index2 = -1, length2 = entries ? entries.length : 0;
    this.clear();
    while (++index2 < length2) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear2() {
    this.__data__ = [];
  }
  function listCacheDelete2(key) {
    var data = this.__data__, index2 = assocIndexOf2(data, key);
    if (index2 < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index2 == lastIndex) {
      data.pop();
    } else {
      splice2.call(data, index2, 1);
    }
    return true;
  }
  function listCacheGet2(key) {
    var data = this.__data__, index2 = assocIndexOf2(data, key);
    return index2 < 0 ? void 0 : data[index2][1];
  }
  function listCacheHas2(key) {
    return assocIndexOf2(this.__data__, key) > -1;
  }
  function listCacheSet2(key, value2) {
    var data = this.__data__, index2 = assocIndexOf2(data, key);
    if (index2 < 0) {
      data.push([key, value2]);
    } else {
      data[index2][1] = value2;
    }
    return this;
  }
  ListCache2.prototype.clear = listCacheClear2;
  ListCache2.prototype["delete"] = listCacheDelete2;
  ListCache2.prototype.get = listCacheGet2;
  ListCache2.prototype.has = listCacheHas2;
  ListCache2.prototype.set = listCacheSet2;
  function MapCache2(entries) {
    var index2 = -1, length2 = entries ? entries.length : 0;
    this.clear();
    while (++index2 < length2) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear2() {
    this.__data__ = {
      "hash": new Hash2(),
      "map": new (Map2 || ListCache2)(),
      "string": new Hash2()
    };
  }
  function mapCacheDelete2(key) {
    return getMapData2(this, key)["delete"](key);
  }
  function mapCacheGet2(key) {
    return getMapData2(this, key).get(key);
  }
  function mapCacheHas2(key) {
    return getMapData2(this, key).has(key);
  }
  function mapCacheSet2(key, value2) {
    getMapData2(this, key).set(key, value2);
    return this;
  }
  MapCache2.prototype.clear = mapCacheClear2;
  MapCache2.prototype["delete"] = mapCacheDelete2;
  MapCache2.prototype.get = mapCacheGet2;
  MapCache2.prototype.has = mapCacheHas2;
  MapCache2.prototype.set = mapCacheSet2;
  function Stack(entries) {
    this.__data__ = new ListCache2(entries);
  }
  function stackClear() {
    this.__data__ = new ListCache2();
  }
  function stackDelete(key) {
    return this.__data__["delete"](key);
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value2) {
    var cache = this.__data__;
    if (cache instanceof ListCache2) {
      var pairs = cache.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value2]);
        return this;
      }
      cache = this.__data__ = new MapCache2(pairs);
    }
    cache.set(key, value2);
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value2, inherited) {
    var result = isArray2(value2) || isArguments(value2) ? baseTimes(value2.length, String) : [];
    var length2 = result.length, skipIndexes = !!length2;
    for (var key in value2) {
      if ((inherited || hasOwnProperty2.call(value2, key)) && !(skipIndexes && (key == "length" || isIndex(key, length2)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue(object4, key, value2) {
    var objValue = object4[key];
    if (!(hasOwnProperty2.call(object4, key) && eq2(objValue, value2)) || value2 === void 0 && !(key in object4)) {
      object4[key] = value2;
    }
  }
  function assocIndexOf2(array4, key) {
    var length2 = array4.length;
    while (length2--) {
      if (eq2(array4[length2][0], key)) {
        return length2;
      }
    }
    return -1;
  }
  function baseAssign(object4, source) {
    return object4 && copyObject(source, keys(source), object4);
  }
  function baseClone(value2, isDeep, isFull, customizer, key, object4, stack) {
    var result;
    if (customizer) {
      result = object4 ? customizer(value2, key, object4, stack) : customizer(value2);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject2(value2)) {
      return value2;
    }
    var isArr = isArray2(value2);
    if (isArr) {
      result = initCloneArray(value2);
      if (!isDeep) {
        return copyArray(value2, result);
      }
    } else {
      var tag = getTag(value2), isFunc = tag == funcTag2 || tag == genTag2;
      if (isBuffer(value2)) {
        return cloneBuffer(value2, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object4) {
        if (isHostObject2(value2)) {
          return object4 ? value2 : {};
        }
        result = initCloneObject(isFunc ? {} : value2);
        if (!isDeep) {
          return copySymbols(value2, baseAssign(result, value2));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object4 ? value2 : {};
        }
        result = initCloneByTag(value2, tag, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value2);
    if (stacked) {
      return stacked;
    }
    stack.set(value2, result);
    if (!isArr) {
      var props = isFull ? getAllKeys(value2) : keys(value2);
    }
    arrayEach(props || value2, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value2[key2];
      }
      assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value2, stack));
    });
    return result;
  }
  function baseCreate(proto) {
    return isObject2(proto) ? objectCreate(proto) : {};
  }
  function baseGetAllKeys(object4, keysFunc, symbolsFunc) {
    var result = keysFunc(object4);
    return isArray2(object4) ? result : arrayPush(result, symbolsFunc(object4));
  }
  function baseGetTag(value2) {
    return objectToString2.call(value2);
  }
  function baseIsNative2(value2) {
    if (!isObject2(value2) || isMasked2(value2)) {
      return false;
    }
    var pattern4 = isFunction2(value2) || isHostObject2(value2) ? reIsNative2 : reIsHostCtor2;
    return pattern4.test(toSource2(value2));
  }
  function baseKeys(object4) {
    if (!isPrototype(object4)) {
      return nativeKeys(object4);
    }
    var result = [];
    for (var key in Object(object4)) {
      if (hasOwnProperty2.call(object4, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  function cloneMap(map, isDeep, cloneFunc) {
    var array4 = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array4, addMapEntry, new map.constructor());
  }
  function cloneRegExp(regexp4) {
    var result = new regexp4.constructor(regexp4.source, reFlags.exec(regexp4));
    result.lastIndex = regexp4.lastIndex;
    return result;
  }
  function cloneSet(set2, isDeep, cloneFunc) {
    var array4 = isDeep ? cloneFunc(setToArray(set2), true) : setToArray(set2);
    return arrayReduce(array4, addSetEntry, new set2.constructor());
  }
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function copyArray(source, array4) {
    var index2 = -1, length2 = source.length;
    array4 || (array4 = Array(length2));
    while (++index2 < length2) {
      array4[index2] = source[index2];
    }
    return array4;
  }
  function copyObject(source, props, object4, customizer) {
    object4 || (object4 = {});
    var index2 = -1, length2 = props.length;
    while (++index2 < length2) {
      var key = props[index2];
      var newValue = customizer ? customizer(object4[key], source[key], key, object4, source) : void 0;
      assignValue(object4, key, newValue === void 0 ? source[key] : newValue);
    }
    return object4;
  }
  function copySymbols(source, object4) {
    return copyObject(source, getSymbols(source), object4);
  }
  function getAllKeys(object4) {
    return baseGetAllKeys(object4, keys, getSymbols);
  }
  function getMapData2(map, key) {
    var data = map.__data__;
    return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative2(object4, key) {
    var value2 = getValue2(object4, key);
    return baseIsNative2(value2) ? value2 : void 0;
  }
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value2) {
      var result = objectToString2.call(value2), Ctor = result == objectTag ? value2.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : void 0;
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  function initCloneArray(array4) {
    var length2 = array4.length, result = array4.constructor(length2);
    if (length2 && typeof array4[0] == "string" && hasOwnProperty2.call(array4, "index")) {
      result.index = array4.index;
      result.input = array4.input;
    }
    return result;
  }
  function initCloneObject(object4) {
    return typeof object4.constructor == "function" && !isPrototype(object4) ? baseCreate(getPrototype(object4)) : {};
  }
  function initCloneByTag(object4, tag, cloneFunc, isDeep) {
    var Ctor = object4.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object4);
      case boolTag:
      case dateTag:
        return new Ctor(+object4);
      case dataViewTag:
        return cloneDataView(object4, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object4, isDeep);
      case mapTag:
        return cloneMap(object4, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object4);
      case regexpTag:
        return cloneRegExp(object4);
      case setTag:
        return cloneSet(object4, isDeep, cloneFunc);
      case symbolTag2:
        return cloneSymbol(object4);
    }
  }
  function isIndex(value2, length2) {
    length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
    return !!length2 && (typeof value2 == "number" || reIsUint.test(value2)) && (value2 > -1 && value2 % 1 == 0 && value2 < length2);
  }
  function isKeyable2(value2) {
    var type4 = typeof value2;
    return type4 == "string" || type4 == "number" || type4 == "symbol" || type4 == "boolean" ? value2 !== "__proto__" : value2 === null;
  }
  function isMasked2(func) {
    return !!maskSrcKey2 && maskSrcKey2 in func;
  }
  function isPrototype(value2) {
    var Ctor = value2 && value2.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
    return value2 === proto;
  }
  function toSource2(func) {
    if (func != null) {
      try {
        return funcToString2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function cloneDeep2(value2) {
    return baseClone(value2, true, true);
  }
  function eq2(value2, other) {
    return value2 === other || value2 !== value2 && other !== other;
  }
  function isArguments(value2) {
    return isArrayLikeObject(value2) && hasOwnProperty2.call(value2, "callee") && (!propertyIsEnumerable.call(value2, "callee") || objectToString2.call(value2) == argsTag);
  }
  var isArray2 = Array.isArray;
  function isArrayLike(value2) {
    return value2 != null && isLength(value2.length) && !isFunction2(value2);
  }
  function isArrayLikeObject(value2) {
    return isObjectLike2(value2) && isArrayLike(value2);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isFunction2(value2) {
    var tag = isObject2(value2) ? objectToString2.call(value2) : "";
    return tag == funcTag2 || tag == genTag2;
  }
  function isLength(value2) {
    return typeof value2 == "number" && value2 > -1 && value2 % 1 == 0 && value2 <= MAX_SAFE_INTEGER;
  }
  function isObject2(value2) {
    var type4 = typeof value2;
    return !!value2 && (type4 == "object" || type4 == "function");
  }
  function isObjectLike2(value2) {
    return !!value2 && typeof value2 == "object";
  }
  function keys(object4) {
    return isArrayLike(object4) ? arrayLikeKeys(object4) : baseKeys(object4);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module2.exports = cloneDeep2;
})(lodash_clonedeep, lodash_clonedeep.exports);
var lodash_clonedeepExports = lodash_clonedeep.exports;
const cloneDeep = /* @__PURE__ */ getDefaultExportFromCjs(lodash_clonedeepExports);
var FUNC_ERROR_TEXT = "Expected a function";
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var INFINITY = 1 / 0;
var funcTag = "[object Function]", genTag = "[object GeneratorFunction]", symbolTag = "[object Symbol]";
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reEscapeChar = /\\(\\)?/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
function getValue(object4, key) {
  return object4 == null ? void 0 : object4[key];
}
function isHostObject(value2) {
  var result = false;
  if (value2 != null && typeof value2.toString != "function") {
    try {
      result = !!(value2 + "");
    } catch (e) {
    }
  }
  return result;
}
var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectToString = objectProto.toString;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
var Symbol$1 = root.Symbol, splice = arrayProto.splice;
var Map$1 = getNative(root, "Map"), nativeCreate = getNative(Object, "create");
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function Hash(entries) {
  var index2 = -1, length2 = entries ? entries.length : 0;
  this.clear();
  while (++index2 < length2) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : void 0;
}
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
}
function hashSet(key, value2) {
  var data = this.__data__;
  data[key] = nativeCreate && value2 === void 0 ? HASH_UNDEFINED : value2;
  return this;
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function ListCache(entries) {
  var index2 = -1, length2 = entries ? entries.length : 0;
  this.clear();
  while (++index2 < length2) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
function listCacheClear() {
  this.__data__ = [];
}
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value2) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    data.push([key, value2]);
  } else {
    data[index2][1] = value2;
  }
  return this;
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function MapCache(entries) {
  var index2 = -1, length2 = entries ? entries.length : 0;
  this.clear();
  while (++index2 < length2) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
function mapCacheClear() {
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function mapCacheDelete(key) {
  return getMapData(this, key)["delete"](key);
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value2) {
  getMapData(this, key).set(key, value2);
  return this;
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function assocIndexOf(array4, key) {
  var length2 = array4.length;
  while (length2--) {
    if (eq(array4[length2][0], key)) {
      return length2;
    }
  }
  return -1;
}
function baseGet(object4, path) {
  path = isKey(path, object4) ? [path] : castPath(path);
  var index2 = 0, length2 = path.length;
  while (object4 != null && index2 < length2) {
    object4 = object4[toKey(path[index2++])];
  }
  return index2 && index2 == length2 ? object4 : void 0;
}
function baseIsNative(value2) {
  if (!isObject(value2) || isMasked(value2)) {
    return false;
  }
  var pattern4 = isFunction(value2) || isHostObject(value2) ? reIsNative : reIsHostCtor;
  return pattern4.test(toSource(value2));
}
function baseToString(value2) {
  if (typeof value2 == "string") {
    return value2;
  }
  if (isSymbol(value2)) {
    return symbolToString ? symbolToString.call(value2) : "";
  }
  var result = value2 + "";
  return result == "0" && 1 / value2 == -INFINITY ? "-0" : result;
}
function castPath(value2) {
  return isArray(value2) ? value2 : stringToPath(value2);
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function getNative(object4, key) {
  var value2 = getValue(object4, key);
  return baseIsNative(value2) ? value2 : void 0;
}
function isKey(value2, object4) {
  if (isArray(value2)) {
    return false;
  }
  var type4 = typeof value2;
  if (type4 == "number" || type4 == "symbol" || type4 == "boolean" || value2 == null || isSymbol(value2)) {
    return true;
  }
  return reIsPlainProp.test(value2) || !reIsDeepProp.test(value2) || object4 != null && value2 in Object(object4);
}
function isKeyable(value2) {
  var type4 = typeof value2;
  return type4 == "string" || type4 == "number" || type4 == "symbol" || type4 == "boolean" ? value2 !== "__proto__" : value2 === null;
}
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var stringToPath = memoize(function(string3) {
  string3 = toString(string3);
  var result = [];
  if (reLeadingDot.test(string3)) {
    result.push("");
  }
  string3.replace(rePropName, function(match2, number4, quote, string22) {
    result.push(quote ? string22.replace(reEscapeChar, "$1") : number4 || match2);
  });
  return result;
});
function toKey(value2) {
  if (typeof value2 == "string" || isSymbol(value2)) {
    return value2;
  }
  var result = value2 + "";
  return result == "0" && 1 / value2 == -INFINITY ? "-0" : result;
}
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
function memoize(func, resolver) {
  if (typeof func != "function" || resolver && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
function eq(value2, other) {
  return value2 === other || value2 !== value2 && other !== other;
}
var isArray = Array.isArray;
function isFunction(value2) {
  var tag = isObject(value2) ? objectToString.call(value2) : "";
  return tag == funcTag || tag == genTag;
}
function isObject(value2) {
  var type4 = typeof value2;
  return !!value2 && (type4 == "object" || type4 == "function");
}
function isObjectLike(value2) {
  return !!value2 && typeof value2 == "object";
}
function isSymbol(value2) {
  return typeof value2 == "symbol" || isObjectLike(value2) && objectToString.call(value2) == symbolTag;
}
function toString(value2) {
  return value2 == null ? "" : baseToString(value2);
}
function get(object4, path, defaultValue) {
  var result = object4 == null ? void 0 : baseGet(object4, path);
  return result === void 0 ? defaultValue : result;
}
var lodash_get = get;
const get$1 = /* @__PURE__ */ getDefaultExportFromCjs(lodash_get);
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t)
          return;
        f = false;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty$1(obj, key, value2) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value2,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value2;
  }
  return obj;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2.push.apply(ownKeys2, Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call2) {
  if (call2 && (_typeof(call2) === "object" || typeof call2 === "function")) {
    return call2;
  } else if (call2 !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
var invariant = function(condition, format2, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== "production") {
    if (format2 === void 0) {
      throw new Error("invariant requires an error message argument");
    }
  }
  if (!condition) {
    var error;
    if (format2 === void 0) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format2.replace(/%s/g, function() {
          return args[argIndex++];
        })
      );
      error.name = "Invariant Violation";
    }
    error.framesToPop = 1;
    throw error;
  }
};
var browser = invariant;
const invariant$1 = /* @__PURE__ */ getDefaultExportFromCjs(browser);
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1(arr);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}
var propTypes$2 = { exports: {} };
var reactIs = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min)
    return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h2 = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h2:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  reactIs_production_min.AsyncMode = l;
  reactIs_production_min.ConcurrentMode = m;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h2;
  reactIs_production_min.Element = c;
  reactIs_production_min.ForwardRef = n;
  reactIs_production_min.Fragment = e;
  reactIs_production_min.Lazy = t;
  reactIs_production_min.Memo = r;
  reactIs_production_min.Portal = d;
  reactIs_production_min.Profiler = g;
  reactIs_production_min.StrictMode = f;
  reactIs_production_min.Suspense = p;
  reactIs_production_min.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min.isConcurrentMode = A;
  reactIs_production_min.isContextConsumer = function(a) {
    return z(a) === k;
  };
  reactIs_production_min.isContextProvider = function(a) {
    return z(a) === h2;
  };
  reactIs_production_min.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  reactIs_production_min.isForwardRef = function(a) {
    return z(a) === n;
  };
  reactIs_production_min.isFragment = function(a) {
    return z(a) === e;
  };
  reactIs_production_min.isLazy = function(a) {
    return z(a) === t;
  };
  reactIs_production_min.isMemo = function(a) {
    return z(a) === r;
  };
  reactIs_production_min.isPortal = function(a) {
    return z(a) === d;
  };
  reactIs_production_min.isProfiler = function(a) {
    return z(a) === g;
  };
  reactIs_production_min.isStrictMode = function(a) {
    return z(a) === f;
  };
  reactIs_production_min.isSuspense = function(a) {
    return z(a) === p;
  };
  reactIs_production_min.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h2 || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };
  reactIs_production_min.typeOf = z;
  return reactIs_production_min;
}
var reactIs_development = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_development;
function requireReactIs_development() {
  if (hasRequiredReactIs_development)
    return reactIs_development;
  hasRequiredReactIs_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var hasSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
      function isValidElementType(type4) {
        return typeof type4 === "string" || typeof type4 === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type4 === REACT_FRAGMENT_TYPE || type4 === REACT_CONCURRENT_MODE_TYPE || type4 === REACT_PROFILER_TYPE || type4 === REACT_STRICT_MODE_TYPE || type4 === REACT_SUSPENSE_TYPE || type4 === REACT_SUSPENSE_LIST_TYPE || typeof type4 === "object" && type4 !== null && (type4.$$typeof === REACT_LAZY_TYPE || type4.$$typeof === REACT_MEMO_TYPE || type4.$$typeof === REACT_PROVIDER_TYPE || type4.$$typeof === REACT_CONTEXT_TYPE || type4.$$typeof === REACT_FORWARD_REF_TYPE || type4.$$typeof === REACT_FUNDAMENTAL_TYPE || type4.$$typeof === REACT_RESPONDER_TYPE || type4.$$typeof === REACT_SCOPE_TYPE || type4.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object4) {
        if (typeof object4 === "object" && object4 !== null) {
          var $$typeof = object4.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type4 = object4.type;
              switch (type4) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type4;
                default:
                  var $$typeofType = type4 && type4.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element2 = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment2 = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal2 = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      function isAsyncMode(object4) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
          }
        }
        return isConcurrentMode(object4) || typeOf(object4) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object4) {
        return typeOf(object4) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object4) {
        return typeOf(object4) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object4) {
        return typeOf(object4) === REACT_PROVIDER_TYPE;
      }
      function isElement(object4) {
        return typeof object4 === "object" && object4 !== null && object4.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object4) {
        return typeOf(object4) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment2(object4) {
        return typeOf(object4) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object4) {
        return typeOf(object4) === REACT_LAZY_TYPE;
      }
      function isMemo(object4) {
        return typeOf(object4) === REACT_MEMO_TYPE;
      }
      function isPortal(object4) {
        return typeOf(object4) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object4) {
        return typeOf(object4) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object4) {
        return typeOf(object4) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object4) {
        return typeOf(object4) === REACT_SUSPENSE_TYPE;
      }
      reactIs_development.AsyncMode = AsyncMode;
      reactIs_development.ConcurrentMode = ConcurrentMode;
      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element2;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment2;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal2;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment2;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }
  return reactIs_development;
}
var hasRequiredReactIs;
function requireReactIs() {
  if (hasRequiredReactIs)
    return reactIs.exports;
  hasRequiredReactIs = 1;
  if (process.env.NODE_ENV === "production") {
    reactIs.exports = requireReactIs_production_min();
  } else {
    reactIs.exports = requireReactIs_development();
  }
  return reactIs.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign)
    return objectAssign;
  hasRequiredObjectAssign = 1;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    var from2;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from2 = Object(arguments[s]);
      for (var key in from2) {
        if (hasOwnProperty2.call(from2, key)) {
          to[key] = from2[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from2);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from2, symbols[i])) {
            to[symbols[i]] = from2[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return objectAssign;
}
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret)
    return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
var has;
var hasRequiredHas;
function requireHas() {
  if (hasRequiredHas)
    return has;
  hasRequiredHas = 1;
  has = Function.call.bind(Object.prototype.hasOwnProperty);
  return has;
}
var checkPropTypes_1;
var hasRequiredCheckPropTypes;
function requireCheckPropTypes() {
  if (hasRequiredCheckPropTypes)
    return checkPropTypes_1;
  hasRequiredCheckPropTypes = 1;
  var printWarning = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var ReactPropTypesSecret = requireReactPropTypesSecret();
    var loggedTypeFailures = {};
    var has2 = requireHas();
    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function checkPropTypes(typeSpecs, values, location2, componentName, getStack) {
    if (process.env.NODE_ENV !== "production") {
      for (var typeSpecName in typeSpecs) {
        if (has2(typeSpecs, typeSpecName)) {
          var error;
          try {
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error(
                (componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              err.name = "Invariant Violation";
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || "React class") + ": type specification of " + location2 + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : "";
            printWarning(
              "Failed " + location2 + " type: " + error.message + (stack != null ? stack : "")
            );
          }
        }
      }
    }
  }
  checkPropTypes.resetWarningCache = function() {
    if (process.env.NODE_ENV !== "production") {
      loggedTypeFailures = {};
    }
  };
  checkPropTypes_1 = checkPropTypes;
  return checkPropTypes_1;
}
var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;
function requireFactoryWithTypeCheckers() {
  if (hasRequiredFactoryWithTypeCheckers)
    return factoryWithTypeCheckers;
  hasRequiredFactoryWithTypeCheckers = 1;
  var ReactIs = requireReactIs();
  var assign = requireObjectAssign();
  var ReactPropTypesSecret = requireReactPropTypesSecret();
  var has2 = requireHas();
  var checkPropTypes = requireCheckPropTypes();
  var printWarning = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    printWarning = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function emptyFunctionThatReturnsNull() {
    return null;
  }
  factoryWithTypeCheckers = function(isValidElement2, throwOnDirectAccess) {
    var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = "@@iterator";
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === "function") {
        return iteratorFn;
      }
    }
    var ANONYMOUS = "<<anonymous>>";
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker("array"),
      bigint: createPrimitiveTypeChecker("bigint"),
      bool: createPrimitiveTypeChecker("boolean"),
      func: createPrimitiveTypeChecker("function"),
      number: createPrimitiveTypeChecker("number"),
      object: createPrimitiveTypeChecker("object"),
      string: createPrimitiveTypeChecker("string"),
      symbol: createPrimitiveTypeChecker("symbol"),
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };
    function is(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
    function PropTypeError(message, data) {
      this.message = message;
      this.data = data && typeof data === "object" ? data : {};
      this.stack = "";
    }
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate2) {
      if (process.env.NODE_ENV !== "production") {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location2, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            var err = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            err.name = "Invariant Violation";
            throw err;
          } else if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
            var cacheKey = componentName + ":" + propName;
            if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3) {
              printWarning(
                "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
            }
            return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
          }
          return null;
        } else {
          return validate2(props, propName, componentName, location2, propFullName);
        }
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
      function validate2(props, propName, componentName, location2, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          var preciseType = getPreciseType(propValue);
          return new PropTypeError(
            "Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
            { expectedType }
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
      function validate2(props, propName, componentName, location2, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location2, propFullName + "[" + i + "]", ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createElementTypeChecker() {
      function validate2(props, propName, componentName, location2, propFullName) {
        var propValue = props[propName];
        if (!isValidElement2(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createElementTypeTypeChecker() {
      function validate2(props, propName, componentName, location2, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createInstanceTypeChecker(expectedClass) {
      function validate2(props, propName, componentName, location2, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        if (process.env.NODE_ENV !== "production") {
          if (arguments.length > 1) {
            printWarning(
              "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
            );
          } else {
            printWarning("Invalid argument supplied to oneOf, expected an array.");
          }
        }
        return emptyFunctionThatReturnsNull;
      }
      function validate2(props, propName, componentName, location2, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }
        var valuesString = JSON.stringify(expectedValues, function replacer(key, value2) {
          var type4 = getPreciseType(value2);
          if (type4 === "symbol") {
            return String(value2);
          }
          return value2;
        });
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
      }
      return createChainableTypeChecker(validate2);
    }
    function createObjectOfTypeChecker(typeChecker) {
      function validate2(props, propName, componentName, location2, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
        }
        for (var key in propValue) {
          if (has2(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        process.env.NODE_ENV !== "production" ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
        return emptyFunctionThatReturnsNull;
      }
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== "function") {
          printWarning(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
          );
          return emptyFunctionThatReturnsNull;
        }
      }
      function validate2(props, propName, componentName, location2, propFullName) {
        var expectedTypes = [];
        for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
          var checker2 = arrayOfTypeCheckers[i2];
          var checkerResult = checker2(props, propName, componentName, location2, propFullName, ReactPropTypesSecret);
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has2(checkerResult.data, "expectedType")) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
        return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
      }
      return createChainableTypeChecker(validate2);
    }
    function createNodeChecker() {
      function validate2(props, propName, componentName, location2, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function invalidValidatorError(componentName, location2, propFullName, key, type4) {
      return new PropTypeError(
        (componentName || "React class") + ": " + location2 + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type4 + "`."
      );
    }
    function createShapeTypeChecker(shapeTypes) {
      function validate2(props, propName, componentName, location2, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker !== "function") {
            return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
          }
          var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate2(props, propName, componentName, location2, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has2(shapeTypes, key) && typeof checker !== "function") {
            return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
          }
          if (!checker) {
            return new PropTypeError(
              "Invalid " + location2 + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
            );
          }
          var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function isNode(propValue) {
      switch (typeof propValue) {
        case "number":
        case "string":
        case "undefined":
          return true;
        case "boolean":
          return !propValue;
        case "object":
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement2(propValue)) {
            return true;
          }
          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }
          return true;
        default:
          return false;
      }
    }
    function isSymbol2(propType, propValue) {
      if (propType === "symbol") {
        return true;
      }
      if (!propValue) {
        return false;
      }
      if (propValue["@@toStringTag"] === "Symbol") {
        return true;
      }
      if (typeof Symbol === "function" && propValue instanceof Symbol) {
        return true;
      }
      return false;
    }
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return "array";
      }
      if (propValue instanceof RegExp) {
        return "object";
      }
      if (isSymbol2(propType, propValue)) {
        return "symbol";
      }
      return propType;
    }
    function getPreciseType(propValue) {
      if (typeof propValue === "undefined" || propValue === null) {
        return "" + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === "object") {
        if (propValue instanceof Date) {
          return "date";
        } else if (propValue instanceof RegExp) {
          return "regexp";
        }
      }
      return propType;
    }
    function getPostfixForTypeWarning(value2) {
      var type4 = getPreciseType(value2);
      switch (type4) {
        case "array":
        case "object":
          return "an " + type4;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + type4;
        default:
          return type4;
      }
    }
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithTypeCheckers;
}
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims)
    return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location2, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}
if (process.env.NODE_ENV !== "production") {
  var ReactIs = requireReactIs();
  var throwOnDirectAccess = true;
  propTypes$2.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
  propTypes$2.exports = requireFactoryWithThrowingShims()();
}
var propTypesExports = propTypes$2.exports;
const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
var Manager = function() {
  function Manager2() {
    _classCallCheck(this, Manager2);
    _defineProperty$1(this, "refs", {});
  }
  _createClass(Manager2, [{
    key: "add",
    value: function add(collection, ref2) {
      if (!this.refs[collection]) {
        this.refs[collection] = [];
      }
      this.refs[collection].push(ref2);
    }
  }, {
    key: "remove",
    value: function remove(collection, ref2) {
      var index2 = this.getIndex(collection, ref2);
      if (index2 !== -1) {
        this.refs[collection].splice(index2, 1);
      }
    }
  }, {
    key: "isActive",
    value: function isActive2() {
      return this.active;
    }
  }, {
    key: "getActive",
    value: function getActive() {
      var _this2 = this;
      return this.refs[this.active.collection].find(function(_ref) {
        var node2 = _ref.node;
        return node2.sortableInfo.index == _this2.active.index;
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex(collection, ref2) {
      return this.refs[collection].indexOf(ref2);
    }
  }, {
    key: "getOrderedRefs",
    value: function getOrderedRefs() {
      var collection = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.active.collection;
      return this.refs[collection].sort(sortByIndex);
    }
  }]);
  return Manager2;
}();
function sortByIndex(_ref2, _ref3) {
  var index1 = _ref2.node.sortableInfo.index;
  var index2 = _ref3.node.sortableInfo.index;
  return index1 - index2;
}
function omit(obj, keysToOmit) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (keysToOmit.indexOf(key) === -1) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
var events = {
  end: ["touchend", "touchcancel", "mouseup"],
  move: ["touchmove", "mousemove"],
  start: ["touchstart", "mousedown"]
};
var vendorPrefix = function() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }
  var styles = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"];
  var pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || styles.OLink === "" && ["", "o"])[1];
  switch (pre) {
    case "ms":
      return "ms";
    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : "";
  }
}();
function setInlineStyles(node2, styles) {
  Object.keys(styles).forEach(function(key) {
    node2.style[key] = styles[key];
  });
}
function setTranslate3d(node2, translate) {
  node2.style["".concat(vendorPrefix, "Transform")] = translate == null ? "" : "translate3d(".concat(translate.x, "px,").concat(translate.y, "px,0)");
}
function setTransitionDuration(node2, duration) {
  node2.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? "" : "".concat(duration, "ms");
}
function closest(el, fn) {
  while (el) {
    if (fn(el)) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}
function limit(min, max, value2) {
  return Math.max(min, Math.min(value2, max));
}
function getPixelValue(stringValue) {
  if (stringValue.substr(-2) === "px") {
    return parseFloat(stringValue);
  }
  return 0;
}
function getElementMargin(element) {
  var style2 = window.getComputedStyle(element);
  return {
    bottom: getPixelValue(style2.marginBottom),
    left: getPixelValue(style2.marginLeft),
    right: getPixelValue(style2.marginRight),
    top: getPixelValue(style2.marginTop)
  };
}
function provideDisplayName(prefix, Component$$1) {
  var componentName = Component$$1.displayName || Component$$1.name;
  return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
}
function getScrollAdjustedBoundingClientRect(node2, scrollDelta) {
  var boundingClientRect = node2.getBoundingClientRect();
  return {
    top: boundingClientRect.top + scrollDelta.top,
    left: boundingClientRect.left + scrollDelta.left
  };
}
function getPosition(event) {
  if (event.touches && event.touches.length) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  } else if (event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }
}
function isTouchEvent(event) {
  return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
}
function getEdgeOffset(node2, parent) {
  var offset2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    left: 0,
    top: 0
  };
  if (!node2) {
    return void 0;
  }
  var nodeOffset = {
    left: offset2.left + node2.offsetLeft,
    top: offset2.top + node2.offsetTop
  };
  if (node2.parentNode === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node2.parentNode, parent, nodeOffset);
}
function getTargetIndex(newIndex, prevIndex, oldIndex) {
  if (newIndex < oldIndex && newIndex > prevIndex) {
    return newIndex - 1;
  } else if (newIndex > oldIndex && newIndex < prevIndex) {
    return newIndex + 1;
  } else {
    return newIndex;
  }
}
function getLockPixelOffset(_ref) {
  var lockOffset = _ref.lockOffset, width = _ref.width, height = _ref.height;
  var offsetX = lockOffset;
  var offsetY = lockOffset;
  var unit = "px";
  if (typeof lockOffset === "string") {
    var match2 = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);
    invariant$1(match2 !== null, 'lockOffset value should be a number or a string of a number followed by "px" or "%". Given %s', lockOffset);
    offsetX = parseFloat(lockOffset);
    offsetY = parseFloat(lockOffset);
    unit = match2[1];
  }
  invariant$1(isFinite(offsetX) && isFinite(offsetY), "lockOffset value should be a finite. Given %s", lockOffset);
  if (unit === "%") {
    offsetX = offsetX * width / 100;
    offsetY = offsetY * height / 100;
  }
  return {
    x: offsetX,
    y: offsetY
  };
}
function getLockPixelOffsets(_ref2) {
  var height = _ref2.height, width = _ref2.width, lockOffset = _ref2.lockOffset;
  var offsets = Array.isArray(lockOffset) ? lockOffset : [lockOffset, lockOffset];
  invariant$1(offsets.length === 2, "lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given %s", lockOffset);
  var _offsets = _slicedToArray$1(offsets, 2), minLockOffset = _offsets[0], maxLockOffset = _offsets[1];
  return [getLockPixelOffset({
    height,
    lockOffset: minLockOffset,
    width
  }), getLockPixelOffset({
    height,
    lockOffset: maxLockOffset,
    width
  })];
}
function isScrollable(el) {
  var computedStyle = window.getComputedStyle(el);
  var overflowRegex = /(auto|scroll)/;
  var properties = ["overflow", "overflowX", "overflowY"];
  return properties.find(function(property) {
    return overflowRegex.test(computedStyle[property]);
  });
}
function getScrollingParent(el) {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode);
  }
}
function getContainerGridGap(element) {
  var style2 = window.getComputedStyle(element);
  if (style2.display === "grid") {
    return {
      x: getPixelValue(style2.gridColumnGap),
      y: getPixelValue(style2.gridRowGap)
    };
  }
  return {
    x: 0,
    y: 0
  };
}
var KEYCODE = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
var NodeType = {
  Anchor: "A",
  Button: "BUTTON",
  Canvas: "CANVAS",
  Input: "INPUT",
  Option: "OPTION",
  Textarea: "TEXTAREA",
  Select: "SELECT"
};
function cloneNode(node2) {
  var selector = "input, textarea, select, canvas, [contenteditable]";
  var fields = node2.querySelectorAll(selector);
  var clonedNode = node2.cloneNode(true);
  var clonedFields = _toConsumableArray$1(clonedNode.querySelectorAll(selector));
  clonedFields.forEach(function(field, i) {
    if (field.type !== "file") {
      field.value = fields[i].value;
    }
    if (field.type === "radio" && field.name) {
      field.name = "__sortableClone__".concat(field.name);
    }
    if (field.tagName === NodeType.Canvas && fields[i].width > 0 && fields[i].height > 0) {
      var destCtx = field.getContext("2d");
      destCtx.drawImage(fields[i], 0, 0);
    }
  });
  return clonedNode;
}
function sortableHandle(WrappedComponent) {
  var _class, _temp;
  var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function(_React$Component) {
    _inherits(WithSortableHandle, _React$Component);
    function WithSortableHandle() {
      var _getPrototypeOf2;
      var _this2;
      _classCallCheck(this, WithSortableHandle);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithSortableHandle)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "wrappedInstance", createRef());
      return _this2;
    }
    _createClass(WithSortableHandle, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var node2 = findDOMNode$1(this);
        node2.sortableHandle = true;
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant$1(config.withRef, "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call");
        return this.wrappedInstance.current;
      }
    }, {
      key: "render",
      value: function render2() {
        var ref2 = config.withRef ? this.wrappedInstance : null;
        return createElement(WrappedComponent, _extends({
          ref: ref2
        }, this.props));
      }
    }]);
    return WithSortableHandle;
  }(Component), _defineProperty$1(_class, "displayName", provideDisplayName("sortableHandle", WrappedComponent)), _temp;
}
function isSortableHandle(node2) {
  return node2.sortableHandle != null;
}
var AutoScroller = function() {
  function AutoScroller2(container, onScrollCallback) {
    _classCallCheck(this, AutoScroller2);
    this.container = container;
    this.onScrollCallback = onScrollCallback;
  }
  _createClass(AutoScroller2, [{
    key: "clear",
    value: function clear() {
      if (this.interval == null) {
        return;
      }
      clearInterval(this.interval);
      this.interval = null;
    }
  }, {
    key: "update",
    value: function update(_ref) {
      var _this2 = this;
      var translate = _ref.translate, minTranslate = _ref.minTranslate, maxTranslate = _ref.maxTranslate, width = _ref.width, height = _ref.height;
      var direction = {
        x: 0,
        y: 0
      };
      var speed = {
        x: 1,
        y: 1
      };
      var acceleration = {
        x: 10,
        y: 10
      };
      var _this$container = this.container, scrollTop = _this$container.scrollTop, scrollLeft = _this$container.scrollLeft, scrollHeight = _this$container.scrollHeight, scrollWidth = _this$container.scrollWidth, clientHeight = _this$container.clientHeight, clientWidth = _this$container.clientWidth;
      var isTop = scrollTop === 0;
      var isBottom = scrollHeight - scrollTop - clientHeight === 0;
      var isLeft = scrollLeft === 0;
      var isRight = scrollWidth - scrollLeft - clientWidth === 0;
      if (translate.y >= maxTranslate.y - height / 2 && !isBottom) {
        direction.y = 1;
        speed.y = acceleration.y * Math.abs((maxTranslate.y - height / 2 - translate.y) / height);
      } else if (translate.x >= maxTranslate.x - width / 2 && !isRight) {
        direction.x = 1;
        speed.x = acceleration.x * Math.abs((maxTranslate.x - width / 2 - translate.x) / width);
      } else if (translate.y <= minTranslate.y + height / 2 && !isTop) {
        direction.y = -1;
        speed.y = acceleration.y * Math.abs((translate.y - height / 2 - minTranslate.y) / height);
      } else if (translate.x <= minTranslate.x + width / 2 && !isLeft) {
        direction.x = -1;
        speed.x = acceleration.x * Math.abs((translate.x - width / 2 - minTranslate.x) / width);
      }
      if (this.interval) {
        this.clear();
        this.isAutoScrolling = false;
      }
      if (direction.x !== 0 || direction.y !== 0) {
        this.interval = setInterval(function() {
          _this2.isAutoScrolling = true;
          var offset2 = {
            left: speed.x * direction.x,
            top: speed.y * direction.y
          };
          _this2.container.scrollTop += offset2.top;
          _this2.container.scrollLeft += offset2.left;
          _this2.onScrollCallback(offset2);
        }, 5);
      }
    }
  }]);
  return AutoScroller2;
}();
function defaultGetHelperDimensions(_ref) {
  var node2 = _ref.node;
  return {
    height: node2.offsetHeight,
    width: node2.offsetWidth
  };
}
function defaultShouldCancelStart(event) {
  var interactiveElements = [NodeType.Input, NodeType.Textarea, NodeType.Select, NodeType.Option, NodeType.Button];
  if (interactiveElements.indexOf(event.target.tagName) !== -1) {
    return true;
  }
  if (closest(event.target, function(el) {
    return el.contentEditable === "true";
  })) {
    return true;
  }
  return false;
}
var propTypes = {
  axis: PropTypes.oneOf(["x", "y", "xy"]),
  contentWindow: PropTypes.any,
  disableAutoscroll: PropTypes.bool,
  distance: PropTypes.number,
  getContainer: PropTypes.func,
  getHelperDimensions: PropTypes.func,
  helperClass: PropTypes.string,
  helperContainer: PropTypes.oneOfType([PropTypes.func, typeof HTMLElement === "undefined" ? PropTypes.any : PropTypes.instanceOf(HTMLElement)]),
  hideSortableGhost: PropTypes.bool,
  keyboardSortingTransitionDuration: PropTypes.number,
  lockAxis: PropTypes.string,
  lockOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))]),
  lockToContainerEdges: PropTypes.bool,
  onSortEnd: PropTypes.func,
  onSortMove: PropTypes.func,
  onSortOver: PropTypes.func,
  onSortStart: PropTypes.func,
  pressDelay: PropTypes.number,
  pressThreshold: PropTypes.number,
  keyCodes: PropTypes.shape({
    lift: PropTypes.arrayOf(PropTypes.number),
    drop: PropTypes.arrayOf(PropTypes.number),
    cancel: PropTypes.arrayOf(PropTypes.number),
    up: PropTypes.arrayOf(PropTypes.number),
    down: PropTypes.arrayOf(PropTypes.number)
  }),
  shouldCancelStart: PropTypes.func,
  transitionDuration: PropTypes.number,
  updateBeforeSortStart: PropTypes.func,
  useDragHandle: PropTypes.bool,
  useWindowAsScrollContainer: PropTypes.bool
};
var defaultKeyCodes = {
  lift: [KEYCODE.SPACE],
  drop: [KEYCODE.SPACE],
  cancel: [KEYCODE.ESC],
  up: [KEYCODE.UP, KEYCODE.LEFT],
  down: [KEYCODE.DOWN, KEYCODE.RIGHT]
};
var defaultProps = {
  axis: "y",
  disableAutoscroll: false,
  distance: 0,
  getHelperDimensions: defaultGetHelperDimensions,
  hideSortableGhost: true,
  lockOffset: "50%",
  lockToContainerEdges: false,
  pressDelay: 0,
  pressThreshold: 5,
  keyCodes: defaultKeyCodes,
  shouldCancelStart: defaultShouldCancelStart,
  transitionDuration: 300,
  useWindowAsScrollContainer: false
};
var omittedProps = Object.keys(propTypes);
function validateProps(props) {
  invariant$1(!(props.distance && props.pressDelay), "Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.");
}
function _finallyRethrows(body, finalizer) {
  try {
    var result = body();
  } catch (e) {
    return finalizer(true, e);
  }
  if (result && result.then) {
    return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
  }
  return finalizer(false, value);
}
var SortableContext = createContext({
  manager: {}
});
function sortableContainer(WrappedComponent) {
  var _class, _temp;
  var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function(_React$Component) {
    _inherits(WithSortableContainer, _React$Component);
    function WithSortableContainer(props) {
      var _this2;
      _classCallCheck(this, WithSortableContainer);
      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(WithSortableContainer).call(this, props));
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {});
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleStart", function(event) {
        var _this$props = _this2.props, distance = _this$props.distance, shouldCancelStart = _this$props.shouldCancelStart;
        if (event.button === 2 || shouldCancelStart(event)) {
          return;
        }
        _this2.touched = true;
        _this2.position = getPosition(event);
        var node2 = closest(event.target, function(el) {
          return el.sortableInfo != null;
        });
        if (node2 && node2.sortableInfo && _this2.nodeIsChild(node2) && !_this2.state.sorting) {
          var useDragHandle = _this2.props.useDragHandle;
          var _node$sortableInfo = node2.sortableInfo, index2 = _node$sortableInfo.index, collection = _node$sortableInfo.collection, disabled = _node$sortableInfo.disabled;
          if (disabled) {
            return;
          }
          if (useDragHandle && !closest(event.target, isSortableHandle)) {
            return;
          }
          _this2.manager.active = {
            collection,
            index: index2
          };
          if (!isTouchEvent(event) && event.target.tagName === NodeType.Anchor) {
            event.preventDefault();
          }
          if (!distance) {
            if (_this2.props.pressDelay === 0) {
              _this2.handlePress(event);
            } else {
              _this2.pressTimer = setTimeout(function() {
                return _this2.handlePress(event);
              }, _this2.props.pressDelay);
            }
          }
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "nodeIsChild", function(node2) {
        return node2.sortableInfo.manager === _this2.manager;
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleMove", function(event) {
        var _this$props2 = _this2.props, distance = _this$props2.distance, pressThreshold = _this$props2.pressThreshold;
        if (!_this2.state.sorting && _this2.touched && !_this2._awaitingUpdateBeforeSortStart) {
          var position2 = getPosition(event);
          var delta = {
            x: _this2.position.x - position2.x,
            y: _this2.position.y - position2.y
          };
          var combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);
          _this2.delta = delta;
          if (!distance && (!pressThreshold || combinedDelta >= pressThreshold)) {
            clearTimeout(_this2.cancelTimer);
            _this2.cancelTimer = setTimeout(_this2.cancel, 0);
          } else if (distance && combinedDelta >= distance && _this2.manager.isActive()) {
            _this2.handlePress(event);
          }
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleEnd", function() {
        _this2.touched = false;
        _this2.cancel();
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "cancel", function() {
        var distance = _this2.props.distance;
        var sorting = _this2.state.sorting;
        if (!sorting) {
          if (!distance) {
            clearTimeout(_this2.pressTimer);
          }
          _this2.manager.active = null;
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handlePress", function(event) {
        try {
          var active = _this2.manager.getActive();
          var _temp6 = function() {
            if (active) {
              var _temp7 = function _temp72() {
                var index2 = _node.sortableInfo.index;
                var margin = getElementMargin(_node);
                var gridGap = getContainerGridGap(_this2.container);
                var containerBoundingRect = _this2.scrollContainer.getBoundingClientRect();
                var dimensions = _getHelperDimensions({
                  index: index2,
                  node: _node,
                  collection: _collection
                });
                _this2.node = _node;
                _this2.margin = margin;
                _this2.gridGap = gridGap;
                _this2.width = dimensions.width;
                _this2.height = dimensions.height;
                _this2.marginOffset = {
                  x: _this2.margin.left + _this2.margin.right + _this2.gridGap.x,
                  y: Math.max(_this2.margin.top, _this2.margin.bottom, _this2.gridGap.y)
                };
                _this2.boundingClientRect = _node.getBoundingClientRect();
                _this2.containerBoundingRect = containerBoundingRect;
                _this2.index = index2;
                _this2.newIndex = index2;
                _this2.axis = {
                  x: _axis.indexOf("x") >= 0,
                  y: _axis.indexOf("y") >= 0
                };
                _this2.offsetEdge = getEdgeOffset(_node, _this2.container);
                if (_isKeySorting) {
                  _this2.initialOffset = getPosition(_objectSpread({}, event, {
                    pageX: _this2.boundingClientRect.left,
                    pageY: _this2.boundingClientRect.top
                  }));
                } else {
                  _this2.initialOffset = getPosition(event);
                }
                _this2.initialScroll = {
                  left: _this2.scrollContainer.scrollLeft,
                  top: _this2.scrollContainer.scrollTop
                };
                _this2.initialWindowScroll = {
                  left: window.pageXOffset,
                  top: window.pageYOffset
                };
                _this2.helper = _this2.helperContainer.appendChild(cloneNode(_node));
                setInlineStyles(_this2.helper, {
                  boxSizing: "border-box",
                  height: "".concat(_this2.height, "px"),
                  left: "".concat(_this2.boundingClientRect.left - margin.left, "px"),
                  pointerEvents: "none",
                  position: "fixed",
                  top: "".concat(_this2.boundingClientRect.top - margin.top, "px"),
                  width: "".concat(_this2.width, "px")
                });
                if (_isKeySorting) {
                  _this2.helper.focus();
                }
                if (_hideSortableGhost) {
                  _this2.sortableGhost = _node;
                  setInlineStyles(_node, {
                    opacity: 0,
                    visibility: "hidden"
                  });
                }
                _this2.minTranslate = {};
                _this2.maxTranslate = {};
                if (_isKeySorting) {
                  var _ref = _useWindowAsScrollContainer ? {
                    top: 0,
                    left: 0,
                    width: _this2.contentWindow.innerWidth,
                    height: _this2.contentWindow.innerHeight
                  } : _this2.containerBoundingRect, containerTop = _ref.top, containerLeft = _ref.left, containerWidth = _ref.width, containerHeight = _ref.height;
                  var containerBottom = containerTop + containerHeight;
                  var containerRight = containerLeft + containerWidth;
                  if (_this2.axis.x) {
                    _this2.minTranslate.x = containerLeft - _this2.boundingClientRect.left;
                    _this2.maxTranslate.x = containerRight - (_this2.boundingClientRect.left + _this2.width);
                  }
                  if (_this2.axis.y) {
                    _this2.minTranslate.y = containerTop - _this2.boundingClientRect.top;
                    _this2.maxTranslate.y = containerBottom - (_this2.boundingClientRect.top + _this2.height);
                  }
                } else {
                  if (_this2.axis.x) {
                    _this2.minTranslate.x = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - _this2.boundingClientRect.left - _this2.width / 2;
                    _this2.maxTranslate.x = (_useWindowAsScrollContainer ? _this2.contentWindow.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - _this2.boundingClientRect.left - _this2.width / 2;
                  }
                  if (_this2.axis.y) {
                    _this2.minTranslate.y = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - _this2.boundingClientRect.top - _this2.height / 2;
                    _this2.maxTranslate.y = (_useWindowAsScrollContainer ? _this2.contentWindow.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - _this2.boundingClientRect.top - _this2.height / 2;
                  }
                }
                if (_helperClass) {
                  _helperClass.split(" ").forEach(function(className) {
                    return _this2.helper.classList.add(className);
                  });
                }
                _this2.listenerNode = event.touches ? event.target : _this2.contentWindow;
                if (_isKeySorting) {
                  _this2.listenerNode.addEventListener("wheel", _this2.handleKeyEnd, true);
                  _this2.listenerNode.addEventListener("mousedown", _this2.handleKeyEnd, true);
                  _this2.listenerNode.addEventListener("keydown", _this2.handleKeyDown);
                } else {
                  events.move.forEach(function(eventName) {
                    return _this2.listenerNode.addEventListener(eventName, _this2.handleSortMove, false);
                  });
                  events.end.forEach(function(eventName) {
                    return _this2.listenerNode.addEventListener(eventName, _this2.handleSortEnd, false);
                  });
                }
                _this2.setState({
                  sorting: true,
                  sortingIndex: index2
                });
                if (_onSortStart) {
                  _onSortStart({
                    node: _node,
                    index: index2,
                    collection: _collection,
                    isKeySorting: _isKeySorting,
                    nodes: _this2.manager.getOrderedRefs(),
                    helper: _this2.helper
                  }, event);
                }
                if (_isKeySorting) {
                  _this2.keyMove(0);
                }
              };
              var _this$props3 = _this2.props, _axis = _this$props3.axis, _getHelperDimensions = _this$props3.getHelperDimensions, _helperClass = _this$props3.helperClass, _hideSortableGhost = _this$props3.hideSortableGhost, updateBeforeSortStart = _this$props3.updateBeforeSortStart, _onSortStart = _this$props3.onSortStart, _useWindowAsScrollContainer = _this$props3.useWindowAsScrollContainer;
              var _node = active.node, _collection = active.collection;
              var _isKeySorting = _this2.manager.isKeySorting;
              var _temp8 = function() {
                if (typeof updateBeforeSortStart === "function") {
                  _this2._awaitingUpdateBeforeSortStart = true;
                  var _temp9 = _finallyRethrows(function() {
                    var index2 = _node.sortableInfo.index;
                    return Promise.resolve(updateBeforeSortStart({
                      collection: _collection,
                      index: index2,
                      node: _node,
                      isKeySorting: _isKeySorting
                    }, event)).then(function() {
                    });
                  }, function(_wasThrown, _result) {
                    _this2._awaitingUpdateBeforeSortStart = false;
                    if (_wasThrown)
                      throw _result;
                    return _result;
                  });
                  if (_temp9 && _temp9.then)
                    return _temp9.then(function() {
                    });
                }
              }();
              return _temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8);
            }
          }();
          return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function() {
          }) : void 0);
        } catch (e) {
          return Promise.reject(e);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleSortMove", function(event) {
        var onSortMove = _this2.props.onSortMove;
        if (typeof event.preventDefault === "function" && event.cancelable) {
          event.preventDefault();
        }
        _this2.updateHelperPosition(event);
        _this2.animateNodes();
        _this2.autoscroll();
        if (onSortMove) {
          onSortMove(event);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleSortEnd", function(event) {
        var _this$props4 = _this2.props, hideSortableGhost = _this$props4.hideSortableGhost, onSortEnd = _this$props4.onSortEnd;
        var _this$manager = _this2.manager, collection = _this$manager.active.collection, isKeySorting = _this$manager.isKeySorting;
        var nodes = _this2.manager.getOrderedRefs();
        if (_this2.listenerNode) {
          if (isKeySorting) {
            _this2.listenerNode.removeEventListener("wheel", _this2.handleKeyEnd, true);
            _this2.listenerNode.removeEventListener("mousedown", _this2.handleKeyEnd, true);
            _this2.listenerNode.removeEventListener("keydown", _this2.handleKeyDown);
          } else {
            events.move.forEach(function(eventName) {
              return _this2.listenerNode.removeEventListener(eventName, _this2.handleSortMove);
            });
            events.end.forEach(function(eventName) {
              return _this2.listenerNode.removeEventListener(eventName, _this2.handleSortEnd);
            });
          }
        }
        _this2.helper.parentNode.removeChild(_this2.helper);
        if (hideSortableGhost && _this2.sortableGhost) {
          setInlineStyles(_this2.sortableGhost, {
            opacity: "",
            visibility: ""
          });
        }
        for (var i = 0, len = nodes.length; i < len; i++) {
          var _node2 = nodes[i];
          var el = _node2.node;
          _node2.edgeOffset = null;
          _node2.boundingClientRect = null;
          setTranslate3d(el, null);
          setTransitionDuration(el, null);
          _node2.translate = null;
        }
        _this2.autoScroller.clear();
        _this2.manager.active = null;
        _this2.manager.isKeySorting = false;
        _this2.setState({
          sorting: false,
          sortingIndex: null
        });
        if (typeof onSortEnd === "function") {
          onSortEnd({
            collection,
            newIndex: _this2.newIndex,
            oldIndex: _this2.index,
            isKeySorting,
            nodes
          }, event);
        }
        _this2.touched = false;
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "autoscroll", function() {
        var disableAutoscroll = _this2.props.disableAutoscroll;
        var isKeySorting = _this2.manager.isKeySorting;
        if (disableAutoscroll) {
          _this2.autoScroller.clear();
          return;
        }
        if (isKeySorting) {
          var translate = _objectSpread({}, _this2.translate);
          var scrollX = 0;
          var scrollY = 0;
          if (_this2.axis.x) {
            translate.x = Math.min(_this2.maxTranslate.x, Math.max(_this2.minTranslate.x, _this2.translate.x));
            scrollX = _this2.translate.x - translate.x;
          }
          if (_this2.axis.y) {
            translate.y = Math.min(_this2.maxTranslate.y, Math.max(_this2.minTranslate.y, _this2.translate.y));
            scrollY = _this2.translate.y - translate.y;
          }
          _this2.translate = translate;
          setTranslate3d(_this2.helper, _this2.translate);
          _this2.scrollContainer.scrollLeft += scrollX;
          _this2.scrollContainer.scrollTop += scrollY;
          return;
        }
        _this2.autoScroller.update({
          height: _this2.height,
          maxTranslate: _this2.maxTranslate,
          minTranslate: _this2.minTranslate,
          translate: _this2.translate,
          width: _this2.width
        });
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "onAutoScroll", function(offset2) {
        _this2.translate.x += offset2.left;
        _this2.translate.y += offset2.top;
        _this2.animateNodes();
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleKeyDown", function(event) {
        var keyCode = event.keyCode;
        var _this$props5 = _this2.props, shouldCancelStart = _this$props5.shouldCancelStart, _this$props5$keyCodes = _this$props5.keyCodes, customKeyCodes = _this$props5$keyCodes === void 0 ? {} : _this$props5$keyCodes;
        var keyCodes = _objectSpread({}, defaultKeyCodes, customKeyCodes);
        if (_this2.manager.active && !_this2.manager.isKeySorting || !_this2.manager.active && (!keyCodes.lift.includes(keyCode) || shouldCancelStart(event) || !_this2.isValidSortingTarget(event))) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();
        if (keyCodes.lift.includes(keyCode) && !_this2.manager.active) {
          _this2.keyLift(event);
        } else if (keyCodes.drop.includes(keyCode) && _this2.manager.active) {
          _this2.keyDrop(event);
        } else if (keyCodes.cancel.includes(keyCode)) {
          _this2.newIndex = _this2.manager.active.index;
          _this2.keyDrop(event);
        } else if (keyCodes.up.includes(keyCode)) {
          _this2.keyMove(-1);
        } else if (keyCodes.down.includes(keyCode)) {
          _this2.keyMove(1);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "keyLift", function(event) {
        var target = event.target;
        var node2 = closest(target, function(el) {
          return el.sortableInfo != null;
        });
        var _node$sortableInfo2 = node2.sortableInfo, index2 = _node$sortableInfo2.index, collection = _node$sortableInfo2.collection;
        _this2.initialFocusedNode = target;
        _this2.manager.isKeySorting = true;
        _this2.manager.active = {
          index: index2,
          collection
        };
        _this2.handlePress(event);
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "keyMove", function(shift) {
        var nodes = _this2.manager.getOrderedRefs();
        var lastIndex = nodes[nodes.length - 1].node.sortableInfo.index;
        var newIndex = _this2.newIndex + shift;
        var prevIndex = _this2.newIndex;
        if (newIndex < 0 || newIndex > lastIndex) {
          return;
        }
        _this2.prevIndex = prevIndex;
        _this2.newIndex = newIndex;
        var targetIndex = getTargetIndex(_this2.newIndex, _this2.prevIndex, _this2.index);
        var target = nodes.find(function(_ref2) {
          var node2 = _ref2.node;
          return node2.sortableInfo.index === targetIndex;
        });
        var targetNode = target.node;
        var scrollDelta = _this2.containerScrollDelta;
        var targetBoundingClientRect = target.boundingClientRect || getScrollAdjustedBoundingClientRect(targetNode, scrollDelta);
        var targetTranslate = target.translate || {
          x: 0,
          y: 0
        };
        var targetPosition = {
          top: targetBoundingClientRect.top + targetTranslate.y - scrollDelta.top,
          left: targetBoundingClientRect.left + targetTranslate.x - scrollDelta.left
        };
        var shouldAdjustForSize = prevIndex < newIndex;
        var sizeAdjustment = {
          x: shouldAdjustForSize && _this2.axis.x ? targetNode.offsetWidth - _this2.width : 0,
          y: shouldAdjustForSize && _this2.axis.y ? targetNode.offsetHeight - _this2.height : 0
        };
        _this2.handleSortMove({
          pageX: targetPosition.left + sizeAdjustment.x,
          pageY: targetPosition.top + sizeAdjustment.y,
          ignoreTransition: shift === 0
        });
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "keyDrop", function(event) {
        _this2.handleSortEnd(event);
        if (_this2.initialFocusedNode) {
          _this2.initialFocusedNode.focus();
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "handleKeyEnd", function(event) {
        if (_this2.manager.active) {
          _this2.keyDrop(event);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "isValidSortingTarget", function(event) {
        var useDragHandle = _this2.props.useDragHandle;
        var target = event.target;
        var node2 = closest(target, function(el) {
          return el.sortableInfo != null;
        });
        return node2 && node2.sortableInfo && !node2.sortableInfo.disabled && (useDragHandle ? isSortableHandle(target) : target.sortableInfo);
      });
      var manager = new Manager();
      validateProps(props);
      _this2.manager = manager;
      _this2.wrappedInstance = createRef();
      _this2.sortableContextValue = {
        manager
      };
      _this2.events = {
        end: _this2.handleEnd,
        move: _this2.handleMove,
        start: _this2.handleStart
      };
      return _this2;
    }
    _createClass(WithSortableContainer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
        var container = this.getContainer();
        Promise.resolve(container).then(function(containerNode) {
          _this2.container = containerNode;
          _this2.document = _this2.container.ownerDocument || document;
          var contentWindow = _this2.props.contentWindow || _this2.document.defaultView || window;
          _this2.contentWindow = typeof contentWindow === "function" ? contentWindow() : contentWindow;
          _this2.scrollContainer = useWindowAsScrollContainer ? _this2.document.scrollingElement || _this2.document.documentElement : getScrollingParent(_this2.container) || _this2.container;
          _this2.autoScroller = new AutoScroller(_this2.scrollContainer, _this2.onAutoScroll);
          Object.keys(_this2.events).forEach(function(key) {
            return events[key].forEach(function(eventName) {
              return _this2.container.addEventListener(eventName, _this2.events[key], false);
            });
          });
          _this2.container.addEventListener("keydown", _this2.handleKeyDown);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this3 = this;
        if (this.helper && this.helper.parentNode) {
          this.helper.parentNode.removeChild(this.helper);
        }
        if (!this.container) {
          return;
        }
        Object.keys(this.events).forEach(function(key) {
          return events[key].forEach(function(eventName) {
            return _this3.container.removeEventListener(eventName, _this3.events[key]);
          });
        });
        this.container.removeEventListener("keydown", this.handleKeyDown);
      }
    }, {
      key: "updateHelperPosition",
      value: function updateHelperPosition(event) {
        var _this$props6 = this.props, lockAxis = _this$props6.lockAxis, lockOffset = _this$props6.lockOffset, lockToContainerEdges = _this$props6.lockToContainerEdges, transitionDuration = _this$props6.transitionDuration, _this$props6$keyboard = _this$props6.keyboardSortingTransitionDuration, keyboardSortingTransitionDuration = _this$props6$keyboard === void 0 ? transitionDuration : _this$props6$keyboard;
        var isKeySorting = this.manager.isKeySorting;
        var ignoreTransition = event.ignoreTransition;
        var offset2 = getPosition(event);
        var translate = {
          x: offset2.x - this.initialOffset.x,
          y: offset2.y - this.initialOffset.y
        };
        translate.y -= window.pageYOffset - this.initialWindowScroll.top;
        translate.x -= window.pageXOffset - this.initialWindowScroll.left;
        this.translate = translate;
        if (lockToContainerEdges) {
          var _getLockPixelOffsets = getLockPixelOffsets({
            height: this.height,
            lockOffset,
            width: this.width
          }), _getLockPixelOffsets2 = _slicedToArray$1(_getLockPixelOffsets, 2), minLockOffset = _getLockPixelOffsets2[0], maxLockOffset = _getLockPixelOffsets2[1];
          var minOffset = {
            x: this.width / 2 - minLockOffset.x,
            y: this.height / 2 - minLockOffset.y
          };
          var maxOffset = {
            x: this.width / 2 - maxLockOffset.x,
            y: this.height / 2 - maxLockOffset.y
          };
          translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
          translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
        }
        if (lockAxis === "x") {
          translate.y = 0;
        } else if (lockAxis === "y") {
          translate.x = 0;
        }
        if (isKeySorting && keyboardSortingTransitionDuration && !ignoreTransition) {
          setTransitionDuration(this.helper, keyboardSortingTransitionDuration);
        }
        setTranslate3d(this.helper, translate);
      }
    }, {
      key: "animateNodes",
      value: function animateNodes() {
        var _this$props7 = this.props, transitionDuration = _this$props7.transitionDuration, hideSortableGhost = _this$props7.hideSortableGhost, onSortOver = _this$props7.onSortOver;
        var containerScrollDelta = this.containerScrollDelta, windowScrollDelta = this.windowScrollDelta;
        var nodes = this.manager.getOrderedRefs();
        var sortingOffset = {
          left: this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
          top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
        };
        var isKeySorting = this.manager.isKeySorting;
        var prevIndex = this.newIndex;
        this.newIndex = null;
        for (var i = 0, len = nodes.length; i < len; i++) {
          var _node3 = nodes[i].node;
          var index2 = _node3.sortableInfo.index;
          var width = _node3.offsetWidth;
          var height = _node3.offsetHeight;
          var offset2 = {
            height: this.height > height ? height / 2 : this.height / 2,
            width: this.width > width ? width / 2 : this.width / 2
          };
          var mustShiftBackward = isKeySorting && index2 > this.index && index2 <= prevIndex;
          var mustShiftForward = isKeySorting && index2 < this.index && index2 >= prevIndex;
          var translate = {
            x: 0,
            y: 0
          };
          var edgeOffset = nodes[i].edgeOffset;
          if (!edgeOffset) {
            edgeOffset = getEdgeOffset(_node3, this.container);
            nodes[i].edgeOffset = edgeOffset;
            if (isKeySorting) {
              nodes[i].boundingClientRect = getScrollAdjustedBoundingClientRect(_node3, containerScrollDelta);
            }
          }
          var nextNode = i < nodes.length - 1 && nodes[i + 1];
          var prevNode = i > 0 && nodes[i - 1];
          if (nextNode && !nextNode.edgeOffset) {
            nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);
            if (isKeySorting) {
              nextNode.boundingClientRect = getScrollAdjustedBoundingClientRect(nextNode.node, containerScrollDelta);
            }
          }
          if (index2 === this.index) {
            if (hideSortableGhost) {
              this.sortableGhost = _node3;
              setInlineStyles(_node3, {
                opacity: 0,
                visibility: "hidden"
              });
            }
            continue;
          }
          if (transitionDuration) {
            setTransitionDuration(_node3, transitionDuration);
          }
          if (this.axis.x) {
            if (this.axis.y) {
              if (mustShiftForward || index2 < this.index && (sortingOffset.left + windowScrollDelta.left - offset2.width <= edgeOffset.left && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset2.height || sortingOffset.top + windowScrollDelta.top + offset2.height <= edgeOffset.top)) {
                translate.x = this.width + this.marginOffset.x;
                if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset2.width) {
                  if (nextNode) {
                    translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                    translate.y = nextNode.edgeOffset.top - edgeOffset.top;
                  }
                }
                if (this.newIndex === null) {
                  this.newIndex = index2;
                }
              } else if (mustShiftBackward || index2 > this.index && (sortingOffset.left + windowScrollDelta.left + offset2.width >= edgeOffset.left && sortingOffset.top + windowScrollDelta.top + offset2.height >= edgeOffset.top || sortingOffset.top + windowScrollDelta.top + offset2.height >= edgeOffset.top + height)) {
                translate.x = -(this.width + this.marginOffset.x);
                if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset2.width) {
                  if (prevNode) {
                    translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                    translate.y = prevNode.edgeOffset.top - edgeOffset.top;
                  }
                }
                this.newIndex = index2;
              }
            } else {
              if (mustShiftBackward || index2 > this.index && sortingOffset.left + windowScrollDelta.left + offset2.width >= edgeOffset.left) {
                translate.x = -(this.width + this.marginOffset.x);
                this.newIndex = index2;
              } else if (mustShiftForward || index2 < this.index && sortingOffset.left + windowScrollDelta.left <= edgeOffset.left + offset2.width) {
                translate.x = this.width + this.marginOffset.x;
                if (this.newIndex == null) {
                  this.newIndex = index2;
                }
              }
            }
          } else if (this.axis.y) {
            if (mustShiftBackward || index2 > this.index && sortingOffset.top + windowScrollDelta.top + offset2.height >= edgeOffset.top) {
              translate.y = -(this.height + this.marginOffset.y);
              this.newIndex = index2;
            } else if (mustShiftForward || index2 < this.index && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset2.height) {
              translate.y = this.height + this.marginOffset.y;
              if (this.newIndex == null) {
                this.newIndex = index2;
              }
            }
          }
          setTranslate3d(_node3, translate);
          nodes[i].translate = translate;
        }
        if (this.newIndex == null) {
          this.newIndex = this.index;
        }
        if (isKeySorting) {
          this.newIndex = prevIndex;
        }
        var oldIndex = isKeySorting ? this.prevIndex : prevIndex;
        if (onSortOver && this.newIndex !== oldIndex) {
          onSortOver({
            collection: this.manager.active.collection,
            index: this.index,
            newIndex: this.newIndex,
            oldIndex,
            isKeySorting,
            nodes,
            helper: this.helper
          });
        }
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant$1(config.withRef, "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call");
        return this.wrappedInstance.current;
      }
    }, {
      key: "getContainer",
      value: function getContainer2() {
        var getContainer22 = this.props.getContainer;
        if (typeof getContainer22 !== "function") {
          return findDOMNode$1(this);
        }
        return getContainer22(config.withRef ? this.getWrappedInstance() : void 0);
      }
    }, {
      key: "render",
      value: function render2() {
        var ref2 = config.withRef ? this.wrappedInstance : null;
        return createElement(SortableContext.Provider, {
          value: this.sortableContextValue
        }, createElement(WrappedComponent, _extends({
          ref: ref2
        }, omit(this.props, omittedProps))));
      }
    }, {
      key: "helperContainer",
      get: function get2() {
        var helperContainer = this.props.helperContainer;
        if (typeof helperContainer === "function") {
          return helperContainer();
        }
        return this.props.helperContainer || this.document.body;
      }
    }, {
      key: "containerScrollDelta",
      get: function get2() {
        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
        if (useWindowAsScrollContainer) {
          return {
            left: 0,
            top: 0
          };
        }
        return {
          left: this.scrollContainer.scrollLeft - this.initialScroll.left,
          top: this.scrollContainer.scrollTop - this.initialScroll.top
        };
      }
    }, {
      key: "windowScrollDelta",
      get: function get2() {
        return {
          left: this.contentWindow.pageXOffset - this.initialWindowScroll.left,
          top: this.contentWindow.pageYOffset - this.initialWindowScroll.top
        };
      }
    }]);
    return WithSortableContainer;
  }(Component), _defineProperty$1(_class, "displayName", provideDisplayName("sortableList", WrappedComponent)), _defineProperty$1(_class, "defaultProps", defaultProps), _defineProperty$1(_class, "propTypes", propTypes), _temp;
}
var propTypes$1 = {
  index: PropTypes.number.isRequired,
  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool
};
var omittedProps$1 = Object.keys(propTypes$1);
function sortableElement(WrappedComponent) {
  var _class, _temp;
  var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function(_React$Component) {
    _inherits(WithSortableElement, _React$Component);
    function WithSortableElement() {
      var _getPrototypeOf2;
      var _this2;
      _classCallCheck(this, WithSortableElement);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithSortableElement)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this2)), "wrappedInstance", createRef());
      return _this2;
    }
    _createClass(WithSortableElement, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.register();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.node) {
          if (prevProps.index !== this.props.index) {
            this.node.sortableInfo.index = this.props.index;
          }
          if (prevProps.disabled !== this.props.disabled) {
            this.node.sortableInfo.disabled = this.props.disabled;
          }
        }
        if (prevProps.collection !== this.props.collection) {
          this.unregister(prevProps.collection);
          this.register();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unregister();
      }
    }, {
      key: "register",
      value: function register2() {
        var _this$props = this.props, collection = _this$props.collection, disabled = _this$props.disabled, index2 = _this$props.index;
        var node2 = findDOMNode$1(this);
        node2.sortableInfo = {
          collection,
          disabled,
          index: index2,
          manager: this.context.manager
        };
        this.node = node2;
        this.ref = {
          node: node2
        };
        this.context.manager.add(collection, this.ref);
      }
    }, {
      key: "unregister",
      value: function unregister() {
        var collection = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props.collection;
        this.context.manager.remove(collection, this.ref);
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant$1(config.withRef, "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call");
        return this.wrappedInstance.current;
      }
    }, {
      key: "render",
      value: function render2() {
        var ref2 = config.withRef ? this.wrappedInstance : null;
        return createElement(WrappedComponent, _extends({
          ref: ref2
        }, omit(this.props, omittedProps$1)));
      }
    }]);
    return WithSortableElement;
  }(Component), _defineProperty$1(_class, "displayName", provideDisplayName("sortableElement", WrappedComponent)), _defineProperty$1(_class, "contextType", SortableContext), _defineProperty$1(_class, "propTypes", propTypes$1), _defineProperty$1(_class, "defaultProps", {
    collection: 0
  }), _temp;
}
function ownKeys(object4, enumerableOnly) {
  var keys = Object.keys(object4);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object4);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object4, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value2) {
    return Object.defineProperty(obj, key, {
      value: value2,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value2) {
      return obj[key] = value2;
    };
  }
  function wrap(innerFn, outerFn, self2, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context2(tryLocsList || []);
    return generator._invoke = function(innerFn2, self3, context2) {
      var state = "suspendedStart";
      return function(method4, arg) {
        if ("executing" === state)
          throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method4)
            throw arg;
          return doneResult();
        }
        for (context2.method = method4, context2.arg = arg; ; ) {
          var delegate = context2.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context2);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if ("next" === context2.method)
            context2.sent = context2._sent = context2.arg;
          else if ("throw" === context2.method) {
            if ("suspendedStart" === state)
              throw state = "completed", context2.arg;
            context2.dispatchException(context2.arg);
          } else
            "return" === context2.method && context2.abrupt("return", context2.arg);
          state = "executing";
          var record = tryCatch(innerFn2, self3, context2);
          if ("normal" === record.type) {
            if (state = context2.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
              continue;
            return {
              value: record.arg,
              done: context2.done
            };
          }
          "throw" === record.type && (state = "completed", context2.method = "throw", context2.arg = record.arg);
        }
      };
    }(innerFn, self2, context), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method4) {
      define(prototype, method4, function(arg) {
        return this._invoke(method4, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method4, arg, resolve, reject) {
      var record = tryCatch(generator[method4], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value2 = result.value;
        return value2 && "object" == typeof value2 && hasOwn.call(value2, "__await") ? PromiseImpl.resolve(value2.__await).then(function(value3) {
          invoke("next", value3, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value2).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function(method4, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method4, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method4 = delegate.iterator[context.method];
    if (void 0 === method4) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method))
          return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method4, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context2(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod)
        return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next)
        return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next2 = function next22() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next22.value = iterable[i], next22.done = false, next22;
          return next22.value = void 0, next22.done = true, next22;
        };
        return next2.next = next2;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(object4) {
    var keys = [];
    for (var key in object4)
      keys.push(key);
    return keys.reverse(), function next2() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object4)
          return next2.value = key2, next2.done = false, next2;
      }
      return next2.done = true, next2;
    };
  }, exports.values = values, Context2.prototype = {
    constructor: Context2,
    reset: function(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
        for (var name in this)
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type)
        throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function(exception) {
      if (this.done)
        throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc)
          return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally)
              throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function(type4, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type4 || "continue" === type4) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type4, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function(record, afterLoc) {
      if ("throw" === record.type)
        throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc)
          return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value2 = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value2);
  } else {
    Promise.resolve(value2).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value2) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value2);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(obj, key, value2) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value2,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value2;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
var createUuid = function createUuid2(prefix) {
  return "".concat(prefix || "node", "-").concat(v4());
};
var getRegisterNode = function getRegisterNode2(registerNodes, type4) {
  return registerNodes.find(function(node2) {
    return type4 && node2.type === type4;
  });
};
var getIsStartNode = function getIsStartNode2(registerNodes, type4) {
  var _registerNodes$find;
  return (_registerNodes$find = registerNodes.find(function(item) {
    return item.type === type4;
  })) === null || _registerNodes$find === void 0 ? void 0 : _registerNodes$find.isStart;
};
var getIsEndNode = function getIsEndNode2(registerNodes, type4) {
  var _registerNodes$find2;
  return (_registerNodes$find2 = registerNodes.find(function(item) {
    return item.type === type4;
  })) === null || _registerNodes$find2 === void 0 ? void 0 : _registerNodes$find2.isEnd;
};
var getIsLoopNode = function getIsLoopNode2(registerNodes, type4) {
  var _registerNodes$find3;
  return (_registerNodes$find3 = registerNodes.find(function(item) {
    return item.type === type4;
  })) === null || _registerNodes$find3 === void 0 ? void 0 : _registerNodes$find3.isLoop;
};
var getIsConditionNode = function getIsConditionNode2(registerNodes, type4) {
  var conditionNode = getRegisterNode(registerNodes, type4);
  var branchNode = registerNodes.find(function(item) {
    return type4 && item.conditionNodeType === type4;
  });
  return conditionNode && branchNode && (branchNode === null || branchNode === void 0 ? void 0 : branchNode.type) !== (branchNode === null || branchNode === void 0 ? void 0 : branchNode.conditionNodeType);
};
var getIsBranchNode = function getIsBranchNode2(registerNodes, type4) {
  var branchNode = getRegisterNode(registerNodes, type4);
  var conditionNode = getRegisterNode(registerNodes, branchNode === null || branchNode === void 0 ? void 0 : branchNode.conditionNodeType);
  return branchNode && conditionNode && (branchNode === null || branchNode === void 0 ? void 0 : branchNode.type) !== (branchNode === null || branchNode === void 0 ? void 0 : branchNode.conditionNodeType);
};
var getAbstractNodeType = function getAbstractNodeType2(registerNodes, type4) {
  if (getIsStartNode(registerNodes, type4)) {
    return "start";
  } else if (getIsEndNode(registerNodes, type4)) {
    return "end";
  } else if (getIsLoopNode(registerNodes, type4)) {
    return "loop";
  } else if (getIsBranchNode(registerNodes, type4)) {
    return "branch";
  } else if (getIsConditionNode(registerNodes, type4)) {
    return "condition";
  } else {
    return "common";
  }
};
var createNewNode = function createNewNode2(registerNodes, type4) {
  var customCreateUuid = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : createUuid;
  var registerNode = getRegisterNode(registerNodes, type4);
  if (!registerNode)
    return;
  var isBranchNode = getIsBranchNode(registerNodes, type4);
  var isConditionNode = getIsConditionNode(registerNodes, type4);
  var isLoopNode = getIsLoopNode(registerNodes, type4);
  var initialNodeData = cloneDeep((registerNode === null || registerNode === void 0 ? void 0 : registerNode.initialNodeData) || {});
  var extraProps = isBranchNode ? _objectSpread2({
    children: [createNewNode2(registerNodes, registerNode.conditionNodeType, customCreateUuid), createNewNode2(registerNodes, registerNode.conditionNodeType, customCreateUuid)]
  }, initialNodeData) : isConditionNode || isLoopNode ? _objectSpread2({
    children: []
  }, initialNodeData) : initialNodeData;
  return _objectSpread2({
    id: customCreateUuid(type4),
    type: registerNode.type,
    name: registerNode.name
  }, extraProps);
};
var DFS = function DFS2(nodes) {
  var allNodes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var _iterator = _createForOfIteratorHelper(nodes), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var node2 = _step.value;
      allNodes.push(node2);
      if (Array.isArray(node2.children)) {
        DFS2(node2.children, allNodes);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return allNodes;
};
var computeChildrenPath = function computeChildrenPath2(children, parentPath) {
  for (var index2 = 0; index2 < children.length; index2++) {
    var node2 = children[index2];
    node2.path = [].concat(_toConsumableArray(parentPath), ["children", String(index2)]);
    if (Array.isArray(node2.children) && node2.children.length > 0) {
      computeChildrenPath2(node2.children, node2.path);
    }
  }
};
var computeNodesPath = function computeNodesPath2(nodes) {
  for (var index2 = 0; index2 < nodes.length; index2++) {
    var node2 = nodes[index2];
    node2.path = [String(index2)];
    if (Array.isArray(node2.children) && node2.children.length > 0) {
      computeChildrenPath(node2.children, node2.path);
    }
  }
  return nodes;
};
var loadRemoteNode = /* @__PURE__ */ function() {
  var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(params) {
    var url2, cssUrl, tasks;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url2 = params.url, cssUrl = params.cssUrl;
            tasks = [url2, cssUrl].filter(function(item) {
              return !!item;
            }).map(function(item) {
              return window.System.import(item);
            });
            return _context.abrupt("return", new Promise(function(resolve, reject) {
              Promise.all(tasks).then(function(res) {
                if (res.length === 2) {
                  document.adoptedStyleSheets = [].concat(_toConsumableArray(document.adoptedStyleSheets), [res[1].default]);
                }
                resolve(res[0].default);
              }).catch(function(err) {
                return reject(err);
              });
            }));
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function loadRemoteNode2(_x) {
    return _ref3.apply(this, arguments);
  };
}();
var exchangeNodes = function exchangeNodes2(nodes, startIndex, endIndex) {
  if ((nodes === null || nodes === void 0 ? void 0 : nodes[startIndex]) && (nodes === null || nodes === void 0 ? void 0 : nodes[endIndex])) {
    var temp = nodes[startIndex];
    nodes[startIndex] = nodes[endIndex];
    nodes[endIndex] = temp;
  }
};
var BuilderContext = /* @__PURE__ */ createContext(null);
var NodeContext = /* @__PURE__ */ createContext(null);
var useHistory = function useHistory2() {
  var _useContext = useContext(BuilderContext), selectedNode = _useContext.selectedNode, nodes = _useContext.nodes, onChange = _useContext.onChange, historyTool = _useContext.historyTool, historyRecords = _useContext.historyRecords, setHistoryRecords = _useContext.setHistoryRecords, activeHistoryRecordIndex = _useContext.activeHistoryRecordIndex, setActiveHistoryRecordIndex = _useContext.setActiveHistoryRecordIndex;
  var maxLength = (historyTool === null || historyTool === void 0 ? void 0 : historyTool.max) || defaultMaxLength;
  var pushHistory = function pushHistory2() {
    var record = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : nodes;
    if (selectedNode && selectedNode.configuring === true) {
      selectedNode.configuring = false;
    }
    historyRecords.splice(activeHistoryRecordIndex + 1, historyRecords.length - activeHistoryRecordIndex - 1);
    if (historyRecords.length === maxLength) {
      historyRecords.shift();
    }
    historyRecords.push(JSON.parse(JSON.stringify(record)));
    setHistoryRecords(_toConsumableArray(historyRecords));
    setActiveHistoryRecordIndex(historyRecords.length - 1);
  };
  var history = function history2(type4) {
    var latestIndex = type4 === "undo" ? activeHistoryRecordIndex > 0 ? activeHistoryRecordIndex - 1 : 0 : activeHistoryRecordIndex < historyRecords.length - 1 ? activeHistoryRecordIndex + 1 : historyRecords.length - 1;
    onChange(JSON.parse(JSON.stringify(historyRecords[latestIndex])), type4);
    setActiveHistoryRecordIndex(latestIndex);
  };
  return {
    maxLength,
    pushHistory,
    history
  };
};
var useZoom = function useZoom2() {
  var _useContext = useContext(BuilderContext), zoomTool = _useContext.zoomTool, zoomValue = _useContext.zoomValue, setZoomValue = _useContext.setZoomValue;
  var minZoom = (zoomTool === null || zoomTool === void 0 ? void 0 : zoomTool.min) || defaultMinZoom;
  var maxZoom = (zoomTool === null || zoomTool === void 0 ? void 0 : zoomTool.max) || defaultMaxZoom;
  var zoomStep = (zoomTool === null || zoomTool === void 0 ? void 0 : zoomTool.step) || defaultZoomStep;
  var zoom = function zoom2(type4) {
    var latestZoom = typeof type4 === "number" ? type4 : type4 === "out" ? zoomValue - zoomStep : zoomValue + zoomStep;
    latestZoom = latestZoom < minZoom ? minZoom : latestZoom > maxZoom ? maxZoom : latestZoom;
    setZoomValue(latestZoom);
  };
  return {
    minZoom,
    maxZoom,
    zoom
  };
};
var useAction = function useAction2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, readonly = _useContext.readonly, drawerVisibleWhenAddNode = _useContext.drawerVisibleWhenAddNode, onChange = _useContext.onChange, setSelectedNode = _useContext.setSelectedNode, setDrawerTitle = _useContext.setDrawerTitle, createUuid3 = _useContext.createUuid;
  var currentNode = useContext(NodeContext);
  var _useHistory = useHistory(), pushHistory = _useHistory.pushHistory;
  var _useDrawer = useDrawer(), closeDrawer = _useDrawer.closeDrawer;
  var clickNode = function clickNode2() {
    var node2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentNode;
    var registerNode = getRegisterNode(registerNodes, node2.type);
    if (!readonly && (registerNode === null || registerNode === void 0 ? void 0 : registerNode.configComponent)) {
      var allNodes = DFS(nodes);
      var _iterator = _createForOfIteratorHelper(allNodes), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          if (item.configuring === true) {
            item.configuring = false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      node2.configuring = true;
      setSelectedNode(node2);
      if (typeof registerNode.configTitle === "string") {
        setDrawerTitle(registerNode.configTitle || "");
      } else if (typeof registerNode.configTitle === "function") {
        setDrawerTitle(registerNode.configTitle(node2, nodes) || "");
      }
      onChange(_toConsumableArray(nodes), "click-node", node2);
    }
  };
  var addNode = function addNode2(_node, _newNodeType) {
    var node2 = !!_newNodeType ? _node : currentNode;
    var newNodeType = !!_newNodeType ? _newNodeType : _node;
    var registerNode = getRegisterNode(registerNodes, newNodeType);
    var newNode = createNewNode(registerNodes, newNodeType, createUuid3);
    if (!newNode) {
      return;
    }
    if (getIsConditionNode(registerNodes, newNodeType)) {
      node2.children = node2.children || [];
      node2.children.push(newNode);
    } else if (getIsConditionNode(registerNodes, node2.type)) {
      node2.children = node2.children || [];
      node2.children.unshift(newNode);
    } else {
      var _node$path, _ref;
      var path = (_node$path = node2.path) === null || _node$path === void 0 ? void 0 : _node$path.slice();
      var nodeIndex = Number(path === null || path === void 0 ? void 0 : path.pop());
      var parentPath = path;
      var parentNodes = get$1(nodes, parentPath || []);
      (_ref = parentNodes || nodes) === null || _ref === void 0 ? void 0 : _ref.splice(nodeIndex + 1, 0, newNode);
    }
    onChange(_toConsumableArray(nodes), "add-node__".concat(newNodeType), newNode);
    pushHistory();
    if (drawerVisibleWhenAddNode) {
      if (getIsBranchNode(registerNodes, newNodeType) && (!(registerNode === null || registerNode === void 0 ? void 0 : registerNode.showPracticalBranchNode) || !(registerNode === null || registerNode === void 0 ? void 0 : registerNode.configComponent))) {
        clickNode(newNode.children[0]);
      } else {
        clickNode(newNode);
      }
    }
    return newNode;
  };
  var addNodeInLoop = function addNodeInLoop2(newNodeType) {
    var node2 = currentNode;
    var registerNode = getRegisterNode(registerNodes, newNodeType);
    var newNode = createNewNode(registerNodes, newNodeType, createUuid3);
    if (!newNode) {
      return;
    }
    node2.children = node2.children || [];
    node2.children.unshift(newNode);
    onChange(_toConsumableArray(nodes), "add-node-in-loop__".concat(newNodeType), newNode);
    pushHistory();
    if (drawerVisibleWhenAddNode) {
      if (getIsBranchNode(registerNodes, newNodeType) && (!(registerNode === null || registerNode === void 0 ? void 0 : registerNode.showPracticalBranchNode) || !(registerNode === null || registerNode === void 0 ? void 0 : registerNode.configComponent))) {
        clickNode(newNode.children[0]);
      } else {
        clickNode(newNode);
      }
    }
    return newNode;
  };
  var removeNodeIds = function removeNodeIds2(targetNodeIds, allNodes) {
    var restNodes = allNodes.filter(function(item) {
      return !targetNodeIds.includes(item.id);
    });
    var _iterator2 = _createForOfIteratorHelper(restNodes), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var restNode = _step2.value;
        if (Array.isArray(restNode.children)) {
          restNode.children = removeNodeIds2(targetNodeIds, restNode.children);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return restNodes;
  };
  var filterEmptyBranch = function filterEmptyBranch2(allNodes) {
    var restNodes = allNodes.filter(function(item) {
      return !(getIsBranchNode(registerNodes, item.type) && Array.isArray(item.children) && item.children.length === 0);
    });
    var _iterator3 = _createForOfIteratorHelper(restNodes), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var restNode = _step3.value;
        if (Array.isArray(restNode.children)) {
          restNode.children = filterEmptyBranch2(restNode.children);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return restNodes;
  };
  var removeNode = function removeNode2() {
    var targetNode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentNode;
    if (!targetNode) {
      return;
    }
    var targetNodes = Array.isArray(targetNode) ? targetNode : [targetNode];
    var targetNodeIds = targetNodes.map(function(item) {
      return typeof item === "string" ? item : item.id;
    });
    DFS(nodes).some(function(item) {
      return item.configuring && targetNodeIds.includes(item.id);
    }) && closeDrawer();
    var restNodes = filterEmptyBranch(removeNodeIds(targetNodeIds, nodes));
    onChange(restNodes, "remove-node", targetNode);
    pushHistory(restNodes);
  };
  return {
    clickNode,
    addNode,
    addNodeInLoop,
    removeNode
  };
};
var useDrawer = function useDrawer2() {
  var _useContext = useContext(BuilderContext), nodes = _useContext.nodes, onChange = _useContext.onChange, selectedNode = _useContext.selectedNode, setSelectedNode = _useContext.setSelectedNode;
  var _useHistory = useHistory(), pushHistory = _useHistory.pushHistory;
  var closeDrawer = function closeDrawer2() {
    if (selectedNode) {
      selectedNode.configuring = false;
    }
    setSelectedNode(void 0);
    onChange(_toConsumableArray(nodes), "close-drawer", selectedNode);
  };
  var saveDrawer = function saveDrawer2(values, validateStatusError) {
    if (selectedNode) {
      selectedNode.data = values;
      if (validateStatusError) {
        selectedNode.validateStatusError = true;
      } else {
        selectedNode.validateStatusError = false;
      }
      pushHistory();
    }
    closeDrawer();
  };
  return {
    closeDrawer,
    saveDrawer
  };
};
var defaultMinZoom = 10;
var defaultMaxZoom = 200;
var defaultZoomStep = 10;
var defaultMaxLength = 10;
function styleInject(css2, ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style2 = document.createElement("style");
  style2.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style2, head.firstChild);
    } else {
      head.appendChild(style2);
    }
  } else {
    head.appendChild(style2);
  }
  if (style2.styleSheet) {
    style2.styleSheet.cssText = css2;
  } else {
    style2.appendChild(document.createTextNode(css2));
  }
}
var css_248z = ".flow-builder-default-node {\n  width: 200px;\n  height: 100px;\n  font-weight: 500;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);\n  border-radius: 4px;\n  background-color: #fff;\n}\n";
styleInject(css_248z);
var DefaultDisplayComponent = function DefaultDisplayComponent2(_ref) {
  var node2 = _ref.node;
  var id2 = node2.id, name = node2.name, path = node2.path, configuring = node2.configuring, data = node2.data;
  var borderColor = configuring ? "blue" : "transparent";
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-default-node",
    style: {
      border: "1px solid ".concat(borderColor)
    }
  }, /* @__PURE__ */ React__default.createElement("div", null, "name: ", (data === null || data === void 0 ? void 0 : data.name) || name), /* @__PURE__ */ React__default.createElement("div", null, "id: ", id2), /* @__PURE__ */ React__default.createElement("div", null, "path: ", path === null || path === void 0 ? void 0 : path.join(" - ")));
};
var css_248z$1 = ".flow-builder-action-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #ffffff;\n  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.08);\n  cursor: pointer;\n  z-index: 1;\n}\n.flow-builder-action-button img {\n  width: 16px;\n  height: 16px;\n}\n.flow-builder-horizontal .flow-builder-branch-node__add-button,\n.flow-builder-horizontal .flow-builder-sortable-handle {\n  transform: rotate(90deg);\n}\n";
styleInject(css_248z$1);
var ActionButton2 = function ActionButton22(props) {
  var _props$size = props.size, size = _props$size === void 0 ? 28 : _props$size, icon = props.icon;
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-action-button",
    style: {
      width: "".concat(size, "px"),
      height: "".concat(size, "px"),
      borderRadius: "".concat(size / 2, "px")
    }
  }, /* @__PURE__ */ React__default.createElement("img", {
    src: icon
  }));
};
var SplitLine = function SplitLine2(props) {
  var _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, style2 = props.style;
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, spaceX = _useContext.spaceX, spaceY = _useContext.spaceY, layout = _useContext.layout;
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-line__split ".concat(className),
    style: _objectSpread2({
      backgroundColor: lineColor,
      width: "".concat(layout === "vertical" ? 2 : spaceX, "px"),
      height: "".concat(layout === "vertical" ? spaceY : 2, "px")
    }, style2)
  });
};
var FillLine = function FillLine2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, layout = _useContext.layout;
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-line__fill",
    style: {
      backgroundColor: lineColor,
      width: layout === "vertical" ? "2px" : "100%",
      height: layout === "vertical" ? "100%" : "2px"
    }
  });
};
var CoverLine = function CoverLine2(props) {
  var className = props.className, full = props.full;
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, layout = _useContext.layout;
  var percent = full ? "100%" : "50%";
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-line__cover ".concat(className),
    style: {
      backgroundColor: lineColor,
      width: layout === "vertical" ? percent : "2px",
      height: layout === "vertical" ? "2px" : percent
    }
  });
};
var css_248z$2 = ".flow-builder-line__fill {\n  flex: 1;\n}\n.flow-builder-line__cover {\n  position: absolute;\n}\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-start,\n.flow-builder-vertical .flow-builder-line__cover.cover-loop-start {\n  top: 0;\n}\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-end,\n.flow-builder-vertical .flow-builder-line__cover.cover-loop-end {\n  bottom: 0;\n}\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-start.cover-first,\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-end.cover-first,\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-start.cover-middle,\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-end.cover-middle {\n  right: 0;\n}\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-start.cover-last,\n.flow-builder-vertical .flow-builder-line__cover.cover-condition-end.cover-last {\n  left: 0;\n}\n.flow-builder-vertical .flow-builder-line__cover.cover-loop-start,\n.flow-builder-vertical .flow-builder-line__cover.cover-loop-end {\n  left: 0;\n}\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-start,\n.flow-builder-horizontal .flow-builder-line__cover.cover-loop-start {\n  left: 0;\n}\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-end,\n.flow-builder-horizontal .flow-builder-line__cover.cover-loop-end {\n  right: 0;\n}\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-start.cover-first,\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-end.cover-first,\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-start.cover-middle,\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-end.cover-middle {\n  bottom: 0;\n}\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-start.cover-last,\n.flow-builder-horizontal .flow-builder-line__cover.cover-condition-end.cover-last {\n  top: 0;\n}\n.flow-builder-horizontal .flow-builder-line__cover.cover-loop-start,\n.flow-builder-horizontal .flow-builder-line__cover.cover-loop-end {\n  bottom: 0;\n}\n.flow-builder-branch-node__content__sorting > .flow-builder-branch-node__conditions > .flow-builder-condition-node > .flow-builder-line__cover {\n  display: none;\n}\n.flow-builder-branch-node__content__sorting > .flow-builder-branch-node__sorting__dashed {\n  display: block;\n}\n";
styleInject(css_248z$2);
var css_248z$3 = ".flow-builder-drop-button {\n  height: 28px;\n  width: 28px;\n  border-radius: 50%;\n  border: 1px solid #338aff;\n}\n";
styleInject(css_248z$3);
var DropButton = function DropButton2(props) {
  var onDrop = props.onDrop;
  var _useContext = useContext(BuilderContext), backgroundColor = _useContext.backgroundColor;
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-drop-button",
    style: {
      backgroundColor
    },
    onDragOver: function onDragOver(e) {
      return e.preventDefault();
    },
    onDrop
  });
};
var AddIcon = "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%201.33325V14.6666%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M14.6667%208L1.33342%208%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E";
var AddNormalIcon = "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%205C9.10457%205%2010%204.10457%2010%203C10%201.89543%209.10457%201%208%201C6.89543%201%206%201.89543%206%203C6%204.10457%206.89543%205%208%205Z%22%20fill%3D%22%23333333%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8%2015C9.10457%2015%2010%2014.1046%2010%2013C10%2011.8954%209.10457%2011%208%2011C6.89543%2011%206%2011.8954%206%2013C6%2014.1046%206.89543%2015%208%2015Z%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8%204.5L8%2011%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E";
var AddBranchIcon = "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%205C9.10457%205%2010%204.10457%2010%203C10%201.89543%209.10457%201%208%201C6.89543%201%206%201.89543%206%203C6%204.10457%206.89543%205%208%205Z%22%20fill%3D%22%23333333%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M13%2015C14.1046%2015%2015%2014.1046%2015%2013C15%2011.8954%2014.1046%2011%2013%2011C11.8954%2011%2011%2011.8954%2011%2013C11%2014.1046%2011.8954%2015%2013%2015Z%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M3%2015C4.10457%2015%205%2014.1046%205%2013C5%2011.8954%204.10457%2011%203%2011C1.89543%2011%201%2011.8954%201%2013C1%2014.1046%201.89543%2015%203%2015Z%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M8%204.5L8%2013M8%2013L11%2013M8%2013L5%2013%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E";
var css_248z$4 = ".flow-builder-addable-nodes .flow-builder-addable-node-item {\n  display: flex;\n  align-items: center;\n  padding: 8px 16px;\n  cursor: pointer;\n}\n.flow-builder-addable-nodes .flow-builder-addable-node-item:hover {\n  background-color: #f7f7f7;\n}\n.flow-builder-addable-nodes .flow-builder-addable-node-item .flow-builder-addable-node-icon {\n  display: flex;\n  margin-right: 4px;\n}\n";
styleInject(css_248z$4);
var AddNodeButton = function AddNodeButton2(props) {
  var inLoop = props.inLoop;
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, readonly = _useContext.readonly, dragType = _useContext.dragType, _useContext$DropCompo = _useContext.DropComponent, DropComponent = _useContext$DropCompo === void 0 ? DropButton : _useContext$DropCompo, PopoverComponent2 = _useContext.PopoverComponent, onDropNodeSuccess = _useContext.onDropNodeSuccess, onAddNodeSuccess = _useContext.onAddNodeSuccess;
  var node2 = useContext(NodeContext);
  var _useAction = useAction(), addNode = _useAction.addNode, addNodeInLoop = _useAction.addNodeInLoop;
  var handleAdd = inLoop ? addNodeInLoop : addNode;
  var _useState = useState(false), _useState2 = _slicedToArray(_useState, 2), visible = _useState2[0], setVisible = _useState2[1];
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var AddableComponent = registerNode === null || registerNode === void 0 ? void 0 : registerNode.addableComponent;
  var addableNodeTypes = registerNode === null || registerNode === void 0 ? void 0 : registerNode.addableNodeTypes;
  var droppable = dragType && !getIsConditionNode(registerNodes, dragType) && (Array.isArray(addableNodeTypes) ? addableNodeTypes.includes(dragType) : true);
  var options = registerNodes.filter(function(item) {
    return !getIsStartNode(registerNodes, item.type) && !getIsEndNode(registerNodes, item.type) && !getIsConditionNode(registerNodes, item.type) && (Array.isArray(addableNodeTypes) ? addableNodeTypes.includes(item.type) : true);
  });
  var handleAddNode = function handleAddNode2(newNodeType) {
    var newNode = handleAdd(newNodeType);
    onAddNodeSuccess === null || onAddNodeSuccess === void 0 ? void 0 : onAddNodeSuccess(newNodeType, newNode);
    setVisible(false);
  };
  var handleDrop = function handleDrop2() {
    var newNode = handleAdd(dragType);
    onDropNodeSuccess === null || onDropNodeSuccess === void 0 ? void 0 : onDropNodeSuccess(dragType, newNode);
  };
  var addableOptions = AddableComponent ? /* @__PURE__ */ React__default.createElement(AddableComponent, {
    node: node2,
    nodes,
    add: handleAddNode
  }) : /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, options.map(function(item) {
    var registerNode2 = getRegisterNode(registerNodes, item.type);
    var defaultIcon = getIsBranchNode(registerNodes, item.type) ? AddBranchIcon : AddNormalIcon;
    return /* @__PURE__ */ React__default.createElement("div", {
      className: "flow-builder-addable-node-item",
      key: item.type,
      onClick: function onClick() {
        return handleAddNode(item.type);
      }
    }, /* @__PURE__ */ React__default.createElement("span", {
      className: "flow-builder-addable-node-icon"
    }, (registerNode2 === null || registerNode2 === void 0 ? void 0 : registerNode2.addIcon) || /* @__PURE__ */ React__default.createElement("img", {
      src: defaultIcon
    })), /* @__PURE__ */ React__default.createElement("span", null, item.name));
  }));
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(SplitLine, null), !readonly && options.length > 0 ? droppable ? /* @__PURE__ */ React__default.createElement(DropComponent, {
    onDrop: handleDrop
  }) : PopoverComponent2 ? /* @__PURE__ */ React__default.createElement(PopoverComponent2, {
    visible,
    onVisibleChange: setVisible,
    overlayClassName: "flow-builder-addable-nodes",
    placement: "rightTop",
    trigger: "click",
    content: addableOptions,
    getPopupContainer: function getPopupContainer(triggerNode) {
      return triggerNode;
    }
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-add-btn"
  }, /* @__PURE__ */ React__default.createElement(ActionButton2, {
    icon: AddIcon
  }))) : null : null, /* @__PURE__ */ React__default.createElement(SplitLine, null));
};
var StartNode = function StartNode2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, allowStartConfig = _useContext.allowStartConfig;
  var node2 = useContext(NodeContext);
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var _useAction = useAction(), clickNode = _useAction.clickNode;
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (allowStartConfig) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              _context.next = 5;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node2);
            case 5:
              clickNode();
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log("node click error", _context.t0);
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));
    return function handleNodeClick2() {
      return _ref.apply(this, arguments);
    };
  }();
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node flow-builder-start-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React__default.createElement(Component2, {
    node: node2,
    nodes
  })), /* @__PURE__ */ React__default.createElement(AddNodeButton, null));
};
var css_248z$5 = ".flow-builder-arrow {\n  display: inline-flex;\n}\n.flow-builder-loop-node__content > .flow-builder-arrow {\n  position: absolute;\n}\n.flow-builder-vertical .flow-builder-loop-node__content > .flow-builder-arrow {\n  transform: rotate(180deg);\n  top: 2px;\n  left: -9px;\n}\n.flow-builder-horizontal .flow-builder-arrow {\n  transform: rotate(-90deg);\n}\n.flow-builder-horizontal .flow-builder-loop-node__content > .flow-builder-arrow {\n  transform: rotate(90deg);\n  bottom: -9px;\n  left: 2px;\n}\n";
styleInject(css_248z$5);
var Arrow = function Arrow2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, backgroundColor = _useContext.backgroundColor, showArrow = _useContext.showArrow, arrowIcon = _useContext.arrowIcon;
  return showArrow ? /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-arrow",
    style: {
      backgroundColor
    }
  }, arrowIcon || /* @__PURE__ */ React__default.createElement("svg", {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16"
  }, /* @__PURE__ */ React__default.createElement("path", {
    d: "M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z",
    fill: lineColor
  }))) : null;
};
var EndNode = function EndNode2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, allowEndConfig = _useContext.allowEndConfig;
  var node2 = useContext(NodeContext);
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var _useAction = useAction(), clickNode = _useAction.clickNode;
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (allowEndConfig) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              _context.next = 5;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node2);
            case 5:
              clickNode();
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log("node click error", _context.t0);
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));
    return function handleNodeClick2() {
      return _ref.apply(this, arguments);
    };
  }();
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node flow-builder-end-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React__default.createElement(Arrow, null), /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React__default.createElement(Component2, {
    node: node2,
    nodes
  })));
};
var RemoveIcon = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2048%2048%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%3E%3Cg%3E%3Crect%20fill-opacity%3D%220.01%22%20fill%3D%22%23FFFFFF%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2248%22%20height%3D%2248%22%20stroke-width%3D%224%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3Ccircle%20stroke%3D%22%23ff5d3b%22%20stroke-width%3D%224%22%20fill%3D%22%23ff5d3b%22%20fill-rule%3D%22nonzero%22%20stroke-linejoin%3D%22round%22%20cx%3D%2224%22%20cy%3D%2224%22%20r%3D%2220%22%2F%3E%3Cpath%20d%3D%22M24%2C16%20L24%2C32%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate%2824.000000%2C%2024.000000%29%20scale%28-1%2C%201%29%20rotate%28-45.000000%29%20translate%28-24.000000%2C%20-24.000000%29%20%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3Cpath%20d%3D%22M24%2C16%20L24%2C32%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate%2824.000000%2C%2024.000000%29%20rotate%28-45.000000%29%20translate%28-24.000000%2C%20-24.000000%29%20%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
var css_248z$6 = ".flow-builder-node .flow-builder-node__remove {\n  position: absolute;\n  top: -9px;\n  right: -9px;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.flow-builder-node .flow-builder-node__remove:hover {\n  opacity: 1;\n}\n.flow-builder-node .flow-builder-node__content-wrap:hover .flow-builder-node__remove,\n.flow-builder-node .flow-builder-node__content:hover .flow-builder-node__remove,\n.flow-builder-node .flow-builder-node__content-wrap:hover .flow-builder-sortable-handle,\n.flow-builder-node .flow-builder-node__content:hover .flow-builder-sortable-handle {\n  opacity: 1;\n}\n";
styleInject(css_248z$6);
var RemoveButton = function RemoveButton2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, readonly = _useContext.readonly, PopconfirmComponent2 = _useContext.PopconfirmComponent, onRemoveNodeSuccess = _useContext.onRemoveNodeSuccess;
  var node2 = useContext(NodeContext);
  var _useAction = useAction(), removeNode = _useAction.removeNode;
  var registerNode = getRegisterNode(registerNodes, node2.type);
  return !readonly && !(registerNode === null || registerNode === void 0 ? void 0 : registerNode.customRemove) && PopconfirmComponent2 ? /* @__PURE__ */ React__default.createElement(PopconfirmComponent2, {
    title: (registerNode === null || registerNode === void 0 ? void 0 : registerNode.removeConfirmTitle) || "Are you sure to remove this node?",
    onConfirm: function onConfirm() {
      removeNode();
      onRemoveNodeSuccess === null || onRemoveNodeSuccess === void 0 ? void 0 : onRemoveNodeSuccess(node2);
    },
    getPopupContainer: function getPopupContainer(triggerNode) {
      return triggerNode.parentNode;
    }
  }, /* @__PURE__ */ React__default.createElement("img", {
    className: "flow-builder-node__remove",
    src: RemoveIcon
  })) : null;
};
var CommonNode = function CommonNode2() {
  var _useContext = useContext(BuilderContext), readonly = _useContext.readonly, registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick;
  var node2 = useContext(NodeContext);
  var _useAction = useAction(), clickNode = _useAction.clickNode, removeNode = _useAction.removeNode;
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node2);
            case 3:
              clickNode();
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.log("node click error", _context.t0);
            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));
    return function handleNodeClick2() {
      return _ref.apply(this, arguments);
    };
  }();
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React__default.createElement(Arrow, null), /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React__default.createElement(Component2, {
    readonly,
    node: node2,
    nodes,
    remove: removeNode
  })), /* @__PURE__ */ React__default.createElement(RemoveButton, null)), /* @__PURE__ */ React__default.createElement(AddNodeButton, null));
};
var AddConditionIcon = "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23clip0%29%22%3E%3Cpath%20d%3D%22M5%208C5%206.89543%204.10457%206%203%206C1.89543%206%201%206.89543%201%208C1%209.10457%201.89543%2010%203%2010C4.10457%2010%205%209.10457%205%208Z%22%20fill%3D%22%23333333%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M15%208C15%206.89543%2014.1046%206%2013%206C11.8954%206%2011%206.89543%2011%208C11%209.10457%2011.8954%2010%2013%2010C14.1046%2010%2015%209.10457%2015%208Z%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M4.5%208L11%208%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0%22%3E%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20transform%3D%22translate%280%2016%29%20rotate%28-90%29%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
var ConditionsDashed = function ConditionsDashed2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor;
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-branch-node__dashed",
    style: {
      border: "2px dashed ".concat(lineColor)
    }
  });
};
var SortingDashed = function SortingDashed2() {
  var _useContext2 = useContext(BuilderContext), lineColor = _useContext2.lineColor;
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-branch-node__sorting__dashed",
    style: {
      border: "2px dashed ".concat(lineColor)
    }
  });
};
var SortableItem = sortableElement(function(props) {
  var renderConditionNode = props.renderConditionNode, branch = props.branch, branchIndex = props.branchIndex;
  var parentNode = useContext(NodeContext);
  return renderConditionNode({
    node: branch,
    nodeIndex: branchIndex,
    parentNode
  });
});
var BranchNode = function BranchNode2(props) {
  var _registerNode$showPra, _registerNode$showPra2;
  var renderConditionNode = props.renderConditionNode;
  var _useContext3 = useContext(BuilderContext), nodes = _useContext3.nodes, layout = _useContext3.layout, spaceX = _useContext3.spaceX, spaceY = _useContext3.spaceY, readonly = _useContext3.readonly, registerNodes = _useContext3.registerNodes, beforeNodeClick = _useContext3.beforeNodeClick, beforeAddConditionNode = _useContext3.beforeAddConditionNode, dragType = _useContext3.dragType, _useContext3$DropComp = _useContext3.DropComponent, DropComponent = _useContext3$DropComp === void 0 ? DropButton : _useContext3$DropComp, showPracticalBranchNode = _useContext3.showPracticalBranchNode, showPracticalBranchRemove = _useContext3.showPracticalBranchRemove, sortable = _useContext3.sortable, onDropNodeSuccess = _useContext3.onDropNodeSuccess, onAddNodeSuccess = _useContext3.onAddNodeSuccess;
  var node2 = useContext(NodeContext);
  var _useAction = useAction(), addNode = _useAction.addNode, removeNode = _useAction.removeNode, clickNode = _useAction.clickNode;
  var children = node2.children;
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var conditionCount = Array.isArray(children) ? children.length : 0;
  var disabled = typeof (registerNode === null || registerNode === void 0 ? void 0 : registerNode.conditionMaxNum) === "number" ? conditionCount === (registerNode === null || registerNode === void 0 ? void 0 : registerNode.conditionMaxNum) : false;
  var droppable = dragType && (registerNode === null || registerNode === void 0 ? void 0 : registerNode.conditionNodeType) === dragType;
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var handleAddCondition = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      var newNode;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return beforeAddConditionNode === null || beforeAddConditionNode === void 0 ? void 0 : beforeAddConditionNode(node2);
            case 3:
              if (registerNode === null || registerNode === void 0 ? void 0 : registerNode.conditionNodeType) {
                newNode = addNode(registerNode.conditionNodeType);
                onAddNodeSuccess === null || onAddNodeSuccess === void 0 ? void 0 : onAddNodeSuccess(registerNode.conditionNodeType, newNode);
              }
              _context.next = 8;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));
    return function handleAddCondition2() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleDrop = /* @__PURE__ */ function() {
    var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
      var newNode;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return beforeAddConditionNode === null || beforeAddConditionNode === void 0 ? void 0 : beforeAddConditionNode(node2);
            case 3:
              if (registerNode === null || registerNode === void 0 ? void 0 : registerNode.conditionNodeType) {
                newNode = addNode(registerNode.conditionNodeType);
                onDropNodeSuccess === null || onDropNodeSuccess === void 0 ? void 0 : onDropNodeSuccess(registerNode.conditionNodeType, newNode);
              }
              _context2.next = 8;
              break;
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));
    return function handleDrop2() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node2);
            case 3:
              clickNode();
              _context3.next = 9;
              break;
            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              console.log("node click error", _context3.t0);
            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 6]]);
    }));
    return function handleNodeClick2() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node flow-builder-branch-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React__default.createElement(Arrow, null), ((_registerNode$showPra = registerNode === null || registerNode === void 0 ? void 0 : registerNode.showPracticalBranchNode) !== null && _registerNode$showPra !== void 0 ? _registerNode$showPra : showPracticalBranchNode) ? /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React__default.createElement(Component2, {
    readonly,
    node: node2,
    nodes,
    remove: removeNode
  })), ((_registerNode$showPra2 = registerNode === null || registerNode === void 0 ? void 0 : registerNode.showPracticalBranchRemove) !== null && _registerNode$showPra2 !== void 0 ? _registerNode$showPra2 : showPracticalBranchRemove) ? /* @__PURE__ */ React__default.createElement(RemoveButton, null) : null), /* @__PURE__ */ React__default.createElement(SplitLine, null)) : null, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-branch-node__content"
  }, !readonly && !disabled ? /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-branch-node__add-button",
    onClick: function onClick() {
      handleAddCondition();
    }
  }, droppable ? /* @__PURE__ */ React__default.createElement(DropComponent, {
    onDrop: handleDrop
  }) : (registerNode === null || registerNode === void 0 ? void 0 : registerNode.addConditionIcon) || /* @__PURE__ */ React__default.createElement(ActionButton2, {
    size: 20,
    icon: AddConditionIcon
  })) : /* @__PURE__ */ React__default.createElement(SplitLine, {
    className: "branch-add-disabled",
    style: _defineProperty({}, layout === "vertical" ? "top" : "left", layout === "vertical" ? "".concat(-spaceY, "px") : "".concat(-spaceX, "px"))
  }), /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-branch-node__conditions"
  }, conditionCount === 1 ? /* @__PURE__ */ React__default.createElement(ConditionsDashed, null) : null, children === null || children === void 0 ? void 0 : children.map(function(branch, index2) {
    var _node$path;
    return sortable ? /* @__PURE__ */ React__default.createElement(SortableItem, {
      key: branch.id,
      index: index2,
      collection: (_node$path = node2.path) === null || _node$path === void 0 ? void 0 : _node$path.join(","),
      branch,
      branchIndex: index2,
      renderConditionNode
    }) : renderConditionNode({
      node: branch,
      nodeIndex: index2,
      parentNode: node2
    });
  })), sortable ? /* @__PURE__ */ React__default.createElement(SortingDashed, null) : null), /* @__PURE__ */ React__default.createElement(AddNodeButton, null));
};
var ConditionNode = function ConditionNode2(props) {
  var parentNode = props.parentNode, conditionIndex = props.conditionIndex, renderNext = props.renderNext;
  var _useContext = useContext(BuilderContext), layout = _useContext.layout, spaceX = _useContext.spaceX, spaceY = _useContext.spaceY, readonly = _useContext.readonly, registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, sortable = _useContext.sortable, sortableAnchor = _useContext.sortableAnchor;
  var node2 = useContext(NodeContext);
  var _useAction = useAction(), clickNode = _useAction.clickNode, removeNode = _useAction.removeNode;
  var conditionCount = Array.isArray(parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) ? (parentNode === null || parentNode === void 0 ? void 0 : parentNode.children.length) || 0 : 0;
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var ConditionDragHandle = useMemo$1(function() {
    return sortableHandle(function() {
      return /* @__PURE__ */ React__default.createElement("span", {
        className: "flow-builder-sortable-handle"
      }, sortableAnchor || ":::");
    });
  }, [sortableAnchor]);
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node2);
            case 3:
              clickNode();
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.log("node click error", _context.t0);
            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));
    return function handleNodeClick2() {
      return _ref.apply(this, arguments);
    };
  }();
  var coverIndexClassName = function(index2, total) {
    if (index2 === 0) {
      return "cover-first";
    }
    if (index2 === total - 1) {
      return "cover-last";
    }
    return "cover-middle";
  }(conditionIndex, conditionCount);
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node flow-builder-condition-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || ""),
    style: {
      padding: layout === "vertical" ? "0 ".concat(spaceX, "px") : "".concat(spaceY, "px 0")
    }
  }, conditionCount > 1 ? /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(CoverLine, {
    full: conditionIndex !== 0 && conditionIndex !== conditionCount - 1,
    className: "cover-condition-start ".concat(coverIndexClassName)
  }), /* @__PURE__ */ React__default.createElement(CoverLine, {
    full: conditionIndex !== 0 && conditionIndex !== conditionCount - 1,
    className: "cover-condition-end ".concat(coverIndexClassName)
  })) : null, /* @__PURE__ */ React__default.createElement(SplitLine, null), /* @__PURE__ */ React__default.createElement(Arrow, null), /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React__default.createElement(Component2, {
    readonly,
    node: node2,
    nodes,
    remove: removeNode
  })), /* @__PURE__ */ React__default.createElement(RemoveButton, null), sortable ? /* @__PURE__ */ React__default.createElement(ConditionDragHandle, null) : null), /* @__PURE__ */ React__default.createElement(AddNodeButton, null), Array.isArray(node2.children) ? renderNext({
    nodes: node2.children,
    parentNode: node2
  }) : null, /* @__PURE__ */ React__default.createElement(FillLine, null));
};
var LoopNode = function LoopNode2(props) {
  var renderNext = props.renderNext;
  var ref2 = useRef(null);
  var _useContext = useContext(BuilderContext), readonly = _useContext.readonly, registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, layout = _useContext.layout, spaceX = _useContext.spaceX, spaceY = _useContext.spaceY, lineColor = _useContext.lineColor;
  var node2 = useContext(NodeContext);
  var _useAction = useAction(), clickNode = _useAction.clickNode, removeNode = _useAction.removeNode;
  var registerNode = getRegisterNode(registerNodes, node2.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node2);
            case 3:
              clickNode();
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.log("node click error", _context.t0);
            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));
    return function handleNodeClick2() {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function() {
    if (!ref2.current)
      return;
    if (layout === "vertical") {
      var _ref$current, _ref$current$parentNo;
      var defaultSpaceX = spaceX;
      var loopContentWidth = ref2.current.clientWidth;
      ref2.current.style.marginRight = "-".concat(loopContentWidth, "px");
      var parentDom = (_ref$current = ref2.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$parentNo = _ref$current.parentNode) === null || _ref$current$parentNo === void 0 ? void 0 : _ref$current$parentNo.parentNode;
      if (parentDom) {
        var parentContentWidth = parentDom.clientWidth - (parseInt(parentDom.style.paddingLeft) || 0) - (parseInt(parentDom.style.paddingRight) || 0);
        var offsetWidth = loopContentWidth - parentContentWidth / 2;
        if (parentDom.classList.contains("flow-builder-condition-node") || parentDom.classList.contains("flow-builder-loop-node__content")) {
          if (offsetWidth > defaultSpaceX) {
            parentDom.style.paddingRight = "".concat(offsetWidth, "px");
          } else {
            parentDom.style.paddingRight = "".concat(defaultSpaceX, "px");
          }
          if (parentDom.classList.contains("flow-builder-condition-node")) {
            var coverFirstLines = parentDom.querySelectorAll(":scope > .flow-builder-line__cover.cover-first");
            var _iterator = _createForOfIteratorHelper(coverFirstLines), _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                var item = _step.value;
                item.style.width = "calc(100% - ".concat(parentContentWidth / 2 + defaultSpaceX, "px)");
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            var coverLastLines = parentDom.querySelectorAll(":scope > .flow-builder-line__cover.cover-last");
            var _iterator2 = _createForOfIteratorHelper(coverLastLines), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var _item = _step2.value;
                _item.style.width = "".concat(parentContentWidth / 2 + defaultSpaceX, "px");
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parentDom.classList.contains("flow-builder-loop-node__content")) {
            var coverLoopLines = parentDom.querySelectorAll(":scope > .flow-builder-line__cover");
            var _iterator3 = _createForOfIteratorHelper(coverLoopLines), _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var _item2 = _step3.value;
                _item2.style.width = "".concat(parentContentWidth / 2 + defaultSpaceX, "px");
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }
      }
    } else {
      var _ref$current2, _ref$current2$parentN;
      var defaultSpaceY = spaceY;
      var loopContentHeight = ref2.current.clientHeight;
      ref2.current.style.marginTop = "-".concat(loopContentHeight, "px");
      var _parentDom = (_ref$current2 = ref2.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$parentN = _ref$current2.parentNode) === null || _ref$current2$parentN === void 0 ? void 0 : _ref$current2$parentN.parentNode;
      if (_parentDom) {
        var parentContentHeight = _parentDom.clientHeight - (parseInt(_parentDom.style.paddingTop) || 0) - (parseInt(_parentDom.style.paddingBottom) || 0);
        var offsetHeight = loopContentHeight - parentContentHeight / 2;
        if (_parentDom.classList.contains("flow-builder-condition-node") || _parentDom.classList.contains("flow-builder-loop-node__content")) {
          if (offsetHeight > defaultSpaceY) {
            _parentDom.style.paddingTop = "".concat(offsetHeight, "px");
          } else {
            _parentDom.style.paddingTop = "".concat(defaultSpaceY, "px");
          }
          if (_parentDom.classList.contains("flow-builder-condition-node")) {
            var _coverFirstLines = _parentDom.querySelectorAll(":scope > .flow-builder-line__cover.cover-first");
            var _iterator4 = _createForOfIteratorHelper(_coverFirstLines), _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                var _item3 = _step4.value;
                _item3.style.height = "".concat(parentContentHeight / 2 + defaultSpaceY, "px");
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            var _coverLastLines = _parentDom.querySelectorAll(":scope > .flow-builder-line__cover.cover-last");
            var _iterator5 = _createForOfIteratorHelper(_coverLastLines), _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                var _item4 = _step5.value;
                _item4.style.height = "calc(100% - ".concat(parentContentHeight / 2 + defaultSpaceY, "px)");
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
          if (_parentDom.classList.contains("flow-builder-loop-node__content")) {
            var _coverLoopLines = _parentDom.querySelectorAll(":scope > .flow-builder-line__cover");
            var _iterator6 = _createForOfIteratorHelper(_coverLoopLines), _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
                var _item5 = _step6.value;
                _item5.style.height = "".concat(parentContentHeight / 2 + defaultSpaceY, "px");
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        }
      }
    }
  }, [nodes, registerNodes]);
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node flow-builder-loop-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React__default.createElement(Arrow, null), /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React__default.createElement(Component2, {
    readonly,
    node: node2,
    nodes,
    remove: removeNode
  })), /* @__PURE__ */ React__default.createElement(RemoveButton, null)), /* @__PURE__ */ React__default.createElement(SplitLine, null), /* @__PURE__ */ React__default.createElement("div", {
    ref: ref2,
    className: "flow-builder-loop-node__content",
    style: _defineProperty({
      padding: layout === "vertical" ? "0 ".concat(spaceX, "px") : "".concat(spaceY, "px 0")
    }, layout === "vertical" ? "borderLeft" : "borderBottom", "2px solid ".concat(lineColor))
  }, /* @__PURE__ */ React__default.createElement(Arrow, null), /* @__PURE__ */ React__default.createElement(CoverLine, {
    className: "cover-loop-start"
  }), /* @__PURE__ */ React__default.createElement(CoverLine, {
    className: "cover-loop-end"
  }), /* @__PURE__ */ React__default.createElement(AddNodeButton, {
    inLoop: true
  }), Array.isArray(node2.children) ? renderNext({
    nodes: node2.children,
    parentNode: node2
  }) : null), /* @__PURE__ */ React__default.createElement(AddNodeButton, null));
};
var css_248z$7 = ".flow-builder-node,\n.flow-builder-node__content-wrap,\n.flow-builder-node__content,\n.flow-builder-branch-node__content,\n.flow-builder-loop-node__content {\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n.flow-builder-loop-node__content {\n  z-index: 5;\n}\n.flow-builder-node__content-wrap,\n.flow-builder-node__content {\n  cursor: pointer;\n}\n.flow-builder-branch-node__add-button {\n  position: absolute;\n  cursor: pointer;\n  z-index: 1;\n}\n.flow-builder-branch-node__add-button .flow-builder-drop-button {\n  width: 20px;\n  height: 20px;\n}\n.flow-builder-branch-node .branch-add-disabled {\n  position: absolute;\n}\n.flow-builder-branch-node__conditions {\n  display: flex;\n}\n.flow-builder-branch-node__dashed,\n.flow-builder-branch-node__sorting__dashed {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.flow-builder-branch-node__sorting__dashed {\n  display: none;\n}\n.flow-builder-vertical {\n  margin: 0 auto;\n  flex-direction: column;\n}\n.flow-builder-vertical .flow-builder-node,\n.flow-builder-vertical .flow-builder-node__content-wrap,\n.flow-builder-vertical .flow-builder-node__content,\n.flow-builder-vertical .flow-builder-branch-node__content,\n.flow-builder-vertical .flow-builder-loop-node__content {\n  flex-direction: column;\n}\n.flow-builder-vertical .flow-builder-start-node {\n  padding-top: 16px;\n}\n.flow-builder-vertical .flow-builder-end-node {\n  padding-bottom: 16px;\n}\n.flow-builder-vertical .flow-builder-branch-node .flow-builder-branch-node__content {\n  margin-top: 10px;\n}\n.flow-builder-vertical .flow-builder-branch-node__add-button {\n  top: -10px;\n}\n.flow-builder-vertical .flow-builder-branch-node__conditions {\n  flex-direction: row;\n}\n.flow-builder-horizontal {\n  margin: auto 0;\n  flex-direction: row;\n}\n.flow-builder-horizontal .flow-builder-node,\n.flow-builder-horizontal .flow-builder-node__content-wrap,\n.flow-builder-horizontal .flow-builder-node__content,\n.flow-builder-horizontal .flow-builder-branch-node__content {\n  flex-direction: row;\n}\n.flow-builder-horizontal .flow-builder-start-node {\n  padding-left: 16px;\n}\n.flow-builder-horizontal .flow-builder-end-node {\n  padding-right: 16px;\n}\n.flow-builder-horizontal .flow-builder-branch-node .flow-builder-branch-node__content {\n  margin-left: 10px;\n}\n.flow-builder-horizontal .flow-builder-branch-node__add-button {\n  left: -10px;\n}\n.flow-builder-horizontal .flow-builder-branch-node__conditions {\n  flex-direction: column;\n}\n.flow-builder-sortable-handle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  cursor: move;\n  opacity: 0;\n  position: absolute;\n}\n";
styleInject(css_248z$7);
var ZoomTool = function ZoomTool2() {
  var _useContext = useContext(BuilderContext), zoomTool = _useContext.zoomTool, zoomValue = _useContext.zoomValue;
  var _useZoom = useZoom(), minZoom = _useZoom.minZoom, maxZoom = _useZoom.maxZoom, zoom = _useZoom.zoom;
  var showZoom = Object.prototype.toString.call(zoomTool) === "[object Object]" ? !zoomTool.hidden : !!zoomTool;
  var minDisabled = zoomValue === minZoom;
  var maxDisabled = zoomValue === maxZoom;
  return showZoom ? /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-zoom-tool"
  }, /* @__PURE__ */ React__default.createElement("button", {
    className: "flow-builder-tool-btn ".concat(minDisabled ? "flow-builder-tool-btn-disabled" : ""),
    disabled: minDisabled,
    onClick: function onClick() {
      return zoom("out");
    }
  }, "-"), /* @__PURE__ */ React__default.createElement("span", {
    className: "flow-builder-zoom-tool__number"
  }, zoomValue + "%"), /* @__PURE__ */ React__default.createElement("button", {
    className: "flow-builder-tool-btn ".concat(maxDisabled ? "flow-builder-tool-btn-disabled" : ""),
    disabled: maxDisabled,
    onClick: function onClick() {
      return zoom("in");
    }
  }, "+")) : null;
};
var HistoryTool = function HistoryTool2() {
  var _useContext = useContext(BuilderContext), historyTool = _useContext.historyTool, historyRecords = _useContext.historyRecords, activeHistoryRecordIndex = _useContext.activeHistoryRecordIndex;
  var _useHistory = useHistory(), history = _useHistory.history;
  var showHistory = Object.prototype.toString.call(historyTool) === "[object Object]" ? !historyTool.hidden : !!historyTool;
  var undoDisabled = activeHistoryRecordIndex <= 0;
  var redoDisabled = activeHistoryRecordIndex === historyRecords.length - 1;
  return showHistory ? /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-undo-redo-tool"
  }, /* @__PURE__ */ React__default.createElement("button", {
    className: "flow-builder-tool-btn ".concat(undoDisabled ? "flow-builder-tool-btn-disabled" : ""),
    disabled: undoDisabled,
    onClick: function onClick() {
      return history("undo");
    }
  }, "<"), /* @__PURE__ */ React__default.createElement("button", {
    className: "flow-builder-tool-btn ".concat(redoDisabled ? "flow-builder-tool-btn-disabled" : ""),
    disabled: redoDisabled,
    onClick: function onClick() {
      return history("redo");
    }
  }, ">")) : null;
};
var css_248z$8 = ".flow-builder-drag-panel {\n  width: 272px;\n  margin-right: 16px;\n  padding: 16px;\n  overflow: auto;\n}\n.flow-builder-drag-panel ul {\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 8px;\n  margin: 0;\n}\n.flow-builder-drag-panel li {\n  list-style-type: none;\n}\n.flow-builder-drag-node-item {\n  display: flex;\n  align-items: center;\n  padding: 8px 16px;\n  cursor: move;\n}\n.flow-builder-drag-node-item .flow-builder-drag-node-icon {\n  display: flex;\n  margin-right: 4px;\n}\n";
styleInject(css_248z$8);
var DragPanel = function DragPanel2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, backgroundColor = _useContext.backgroundColor, registerNodes = _useContext.registerNodes, setDragType = _useContext.setDragType;
  var handleDragStart = function handleDragStart2(type4) {
    setDragType(type4);
  };
  var handleDragEnd = function handleDragEnd2() {
    setDragType("");
  };
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-drag-panel",
    style: {
      border: "1px solid ".concat(lineColor)
    }
  }, /* @__PURE__ */ React__default.createElement("ul", null, registerNodes.filter(function(item) {
    return !(item.isStart || item.isEnd);
  }).map(function(item) {
    var registerNode = getRegisterNode(registerNodes, item.type);
    var defaultIcon = getIsBranchNode(registerNodes, item.type) ? AddBranchIcon : getIsConditionNode(registerNodes, item.type) ? AddConditionIcon : AddNormalIcon;
    return /* @__PURE__ */ React__default.createElement("li", {
      key: item.type,
      className: "flow-builder-drag-node-item",
      style: {
        backgroundColor
      },
      draggable: true,
      onDragStart: function onDragStart() {
        return handleDragStart(item.type);
      },
      onDragEnd: handleDragEnd
    }, /* @__PURE__ */ React__default.createElement("span", {
      className: "flow-builder-drag-node-icon"
    }, (registerNode === null || registerNode === void 0 ? void 0 : registerNode.addIcon) || /* @__PURE__ */ React__default.createElement("img", {
      src: defaultIcon,
      draggable: false
    })), /* @__PURE__ */ React__default.createElement("span", null, item.name));
  })));
};
var css_248z$9 = ".flow-builder-wrap {\n  position: relative;\n  height: 100%;\n  display: flex;\n}\n.flow-builder-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n.flow-builder {\n  display: flex;\n  align-items: center;\n}\n.flow-builder-tool {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: #fff !important;\n  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);\n}\n.flow-builder-zoom-tool {\n  width: 120px;\n  display: inline-flex;\n  align-items: center;\n}\n.flow-builder-zoom-tool__number {\n  flex: 1;\n  text-align: center;\n}\n.flow-builder-undo-redo-tool {\n  width: 80px;\n  display: inline-flex;\n  align-items: center;\n}\n.flow-builder-tool-btn {\n  cursor: pointer;\n  border: none;\n  background: none;\n  padding: 0;\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 32px;\n}\n.flow-builder-tool-btn:hover {\n  color: #40a9ff;\n}\n.flow-builder-tool-btn-disabled {\n  cursor: not-allowed;\n  color: rgba(0, 0, 0, 0.25);\n}\n.flow-builder-tool-btn-disabled:hover {\n  color: rgba(0, 0, 0, 0.25);\n}\n";
styleInject(css_248z$9);
var Builder = /* @__PURE__ */ forwardRef(function(props, ref2) {
  var builderContext = useContext(BuilderContext);
  var _builderContext$class = builderContext.className, className = _builderContext$class === void 0 ? "" : _builderContext$class, backgroundColor = builderContext.backgroundColor, layout = builderContext.layout, drawerProps = builderContext.drawerProps, registerNodes = builderContext.registerNodes, nodes = builderContext.nodes, onChange = builderContext.onChange, zoomValue = builderContext.zoomValue, onZoomChange = builderContext.onZoomChange, historyRecords = builderContext.historyRecords, activeHistoryRecordIndex = builderContext.activeHistoryRecordIndex, onHistoryChange = builderContext.onHistoryChange, selectedNode = builderContext.selectedNode, drawerTitle = builderContext.drawerTitle, draggable = builderContext.draggable, _builderContext$DragC = builderContext.DragComponent, DragComponent = _builderContext$DragC === void 0 ? DragPanel : _builderContext$DragC, setDragType = builderContext.setDragType, DrawerComponent2 = builderContext.DrawerComponent, createUuid3 = builderContext.createUuid;
  var _useZoom = useZoom(), minZoom = _useZoom.minZoom, maxZoom = _useZoom.maxZoom, zoom = _useZoom.zoom;
  var _useHistory = useHistory(), pushHistory = _useHistory.pushHistory, history = _useHistory.history;
  var _useAction = useAction(), addNode = _useAction.addNode, removeNode = _useAction.removeNode;
  var _useDrawer = useDrawer(), closeDrawer = _useDrawer.closeDrawer, saveDrawer = _useDrawer.saveDrawer;
  var _useState = useState(false), _useState2 = _slicedToArray(_useState, 2), hasMounted = _useState2[0], setHasMounted = _useState2[1];
  var ConfigComponent = useMemo$1(function() {
    var _getRegisterNode;
    return (_getRegisterNode = getRegisterNode(registerNodes, selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.type)) === null || _getRegisterNode === void 0 ? void 0 : _getRegisterNode.configComponent;
  }, [registerNodes, selectedNode]);
  var configComponentRef = useRef();
  var renderNode = function renderNode2(_ref) {
    var node2 = _ref.node, nodeIndex = _ref.nodeIndex, parentNode = _ref.parentNode;
    var id2 = node2.id, type4 = node2.type;
    var abstractNodeType = getAbstractNodeType(registerNodes, type4);
    var renderAbstractNode = function renderAbstractNode2() {
      switch (abstractNodeType) {
        case "start":
          return /* @__PURE__ */ React__default.createElement(StartNode, null);
        case "end":
          return /* @__PURE__ */ React__default.createElement(EndNode, null);
        case "branch":
          return /* @__PURE__ */ React__default.createElement(BranchNode, {
            renderConditionNode: renderNode2
          });
        case "condition":
          return /* @__PURE__ */ React__default.createElement(ConditionNode, {
            parentNode,
            conditionIndex: nodeIndex,
            renderNext: render2
          });
        case "loop":
          return /* @__PURE__ */ React__default.createElement(LoopNode, {
            renderNext: render2
          });
        default:
          return /* @__PURE__ */ React__default.createElement(CommonNode, null);
      }
    };
    return /* @__PURE__ */ React__default.createElement(NodeContext.Provider, {
      key: id2,
      value: node2
    }, renderAbstractNode());
  };
  var render2 = function render22(_ref2) {
    var nodes2 = _ref2.nodes, parentNode = _ref2.parentNode;
    return nodes2.map(function(node2, index2) {
      return renderNode({
        node: node2,
        nodeIndex: index2,
        parentNode
      });
    });
  };
  var renderZoomTool = /* @__PURE__ */ React__default.createElement(ZoomTool, null);
  var renderHistoryTool = /* @__PURE__ */ React__default.createElement(HistoryTool, null);
  useImperativeHandle(ref2, function() {
    return {
      history,
      zoom,
      add: addNode,
      remove: removeNode,
      closeDrawer,
      context: builderContext
    };
  });
  useEffect(function() {
    if (hasMounted && historyRecords.length > 1) {
      onHistoryChange === null || onHistoryChange === void 0 ? void 0 : onHistoryChange(activeHistoryRecordIndex <= 0, activeHistoryRecordIndex === historyRecords.length - 1);
    }
  }, [historyRecords, activeHistoryRecordIndex]);
  useEffect(function() {
    hasMounted && (onZoomChange === null || onZoomChange === void 0 ? void 0 : onZoomChange(zoomValue === minZoom, zoomValue, zoomValue === maxZoom));
  }, [zoomValue, minZoom, maxZoom]);
  useEffect(function() {
    var defaultNodes = _toConsumableArray(nodes);
    if (defaultNodes.length === 0) {
      var _registerNodes$find, _registerNodes$find2;
      var startNodeType = (_registerNodes$find = registerNodes.find(function(item) {
        return item.isStart;
      })) === null || _registerNodes$find === void 0 ? void 0 : _registerNodes$find.type;
      var endNodeType = (_registerNodes$find2 = registerNodes.find(function(item) {
        return item.isEnd;
      })) === null || _registerNodes$find2 === void 0 ? void 0 : _registerNodes$find2.type;
      defaultNodes = [createNewNode(registerNodes, startNodeType, createUuid3), createNewNode(registerNodes, endNodeType, createUuid3)];
      onChange(defaultNodes, "init-builder");
    }
    pushHistory(defaultNodes);
    setHasMounted(true);
  }, []);
  return /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-wrap ".concat(className)
  }, renderHistoryTool || renderZoomTool ? /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-tool"
  }, renderHistoryTool, renderZoomTool) : null, draggable ? /* @__PURE__ */ React__default.createElement(DragComponent, {
    onDragStart: setDragType,
    onDragEnd: function onDragEnd() {
      return setDragType("");
    }
  }) : null, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder-content",
    style: {
      backgroundColor
    }
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: "flow-builder flow-builder-".concat(layout),
    style: {
      zoom: "".concat(zoomValue, "%")
    }
  }, render2({
    nodes
  }))), DrawerComponent2 ? /* @__PURE__ */ React__default.createElement(DrawerComponent2, _objectSpread2(_objectSpread2({
    title: drawerTitle || "Configuration",
    width: 480,
    destroyOnClose: true,
    maskClosable: false,
    visible: !!selectedNode,
    onClose: closeDrawer
  }, drawerProps), {}, {
    configComponentRef
  }), ConfigComponent && selectedNode ? /* @__PURE__ */ React__default.createElement(ConfigComponent, {
    ref: configComponentRef,
    key: selectedNode.id,
    node: selectedNode,
    nodes,
    cancel: closeDrawer,
    save: saveDrawer
  }) : null) : null);
});
var conditionSortingClassName = "flow-builder-branch-node__content__sorting";
var SortableBuilder = sortableContainer(function(props) {
  return /* @__PURE__ */ React__default.createElement(Builder, {
    ref: props.builderRef
  });
});
var FlowBuilder$1 = /* @__PURE__ */ forwardRef(function(props, ref2) {
  var zoomTool = props.zoomTool, nodes = props.nodes, onChange = props.onChange, sortable = props.sortable;
  var _useState = useState((zoomTool === null || zoomTool === void 0 ? void 0 : zoomTool.initialValue) || 100), _useState2 = _slicedToArray(_useState, 2), zoomValue = _useState2[0], setZoomValue = _useState2[1];
  var _useState3 = useState([]), _useState4 = _slicedToArray(_useState3, 2), historyRecords = _useState4[0], setHistoryRecords = _useState4[1];
  var _useState5 = useState(-1), _useState6 = _slicedToArray(_useState5, 2), activeHistoryRecordIndex = _useState6[0], setActiveHistoryRecordIndex = _useState6[1];
  var _useState7 = useState(), _useState8 = _slicedToArray(_useState7, 2), selectedNode = _useState8[0], setSelectedNode = _useState8[1];
  var _useState9 = useState(""), _useState10 = _slicedToArray(_useState9, 2), drawerTitle = _useState10[0], setDrawerTitle = _useState10[1];
  var _useState11 = useState(""), _useState12 = _slicedToArray(_useState11, 2), dragType = _useState12[0], setDragType = _useState12[1];
  var _useState13 = useState(props.registerNodes || []), _useState14 = _slicedToArray(_useState13, 2), registerNodes = _useState14[0], setRegisterNodes = _useState14[1];
  var defaultProps2 = useMemo$1(function() {
    return {
      backgroundColor: "#F7F7F7",
      lineColor: "#999999",
      spaceX: 16,
      spaceY: 16,
      layout: "vertical",
      registerNodes: [],
      nodes: []
    };
  }, []);
  var layout = props.layout || defaultProps2.layout;
  var handleChange = function handleChange2(nodes2, changeEvent, node2) {
    computeNodesPath(nodes2);
    onChange(nodes2, changeEvent, node2);
  };
  var handleSortStart = function handleSortStart2(params) {
    var _node$parentNode;
    var node2 = params.node;
    (_node$parentNode = node2.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.parentNode.classList.add(conditionSortingClassName);
  };
  var handleSortEnd = function handleSortEnd2(params) {
    var _get;
    var collection = params.collection, oldIndex = params.oldIndex, newIndex = params.newIndex, conditionNodes = params.nodes;
    conditionNodes[0].node.parentNode.parentNode.classList.remove(conditionSortingClassName);
    if (oldIndex === newIndex) {
      return;
    }
    var children = (_get = get$1(nodes, collection.split(","))) === null || _get === void 0 ? void 0 : _get.children;
    exchangeNodes(children, oldIndex, newIndex);
    handleChange(_toConsumableArray(nodes), "condition-sort");
  };
  useEffect(function() {
    if (Array.isArray(props.registerRemoteNodes) && props.registerRemoteNodes.length > 0) {
      Promise.allSettled(props.registerRemoteNodes.map(function(item) {
        return loadRemoteNode(item);
      })).then(function(res) {
        return res.filter(function(item) {
          return item.status === "fulfilled";
        }).map(function(item) {
          return item.value;
        });
      }).then(function(remoteNodes) {
        return setRegisterNodes([].concat(_toConsumableArray(props.registerNodes), _toConsumableArray(remoteNodes)));
      }).catch(function() {
        return setRegisterNodes(props.registerNodes);
      });
    } else {
      setRegisterNodes(props.registerNodes);
    }
  }, [props.registerNodes, props.registerRemoteNodes]);
  return /* @__PURE__ */ React__default.createElement(BuilderContext.Provider, {
    value: _objectSpread2(_objectSpread2(_objectSpread2({}, defaultProps2), props), {}, {
      registerNodes,
      nodes: computeNodesPath(nodes),
      onChange: handleChange,
      zoomValue,
      setZoomValue,
      historyRecords,
      setHistoryRecords,
      activeHistoryRecordIndex,
      setActiveHistoryRecordIndex,
      selectedNode,
      setSelectedNode,
      drawerTitle,
      setDrawerTitle,
      dragType,
      setDragType
    })
  }, sortable ? /* @__PURE__ */ React__default.createElement(SortableBuilder, {
    helperClass: "flow-builder-".concat(layout, " flow-builder-condition-node__sorting"),
    axis: layout === "vertical" ? "x" : "y",
    useDragHandle: true,
    onSortStart: handleSortStart,
    onSortEnd: handleSortEnd,
    builderRef: ref2
  }) : /* @__PURE__ */ React__default.createElement(Builder, {
    ref: ref2
  }));
});
const flowModelRegistry = {};
function getFlowModel(flowModel) {
  return flowModelRegistry[flowModel];
}
const DrawerComponent = (props) => {
  const { visible, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer2, { open: visible, ...restProps, children });
};
const PopoverComponent = (props) => {
  const { visible, onVisibleChange, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover$1, { open: visible, onOpenChange: onVisibleChange, ...restProps, children });
};
const PopconfirmComponent = (props) => {
  const { children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm$1, { ...restProps, children });
};
function FlowBuilder(props) {
  var _a;
  const [nodes, setNodes] = useState(((_a = props.graphDiagram) == null ? void 0 : _a.nodes) || []);
  const renderContext = useContext(RenderContextKey);
  const { onEvent } = renderContext;
  const nodeModels = getFlowModel(props.flowModel);
  if (!nodeModels)
    throw new Error("nop.err.unknown-flow-model:" + props.flowModel);
  const handleChange = (nodes2, event, node2) => {
    console.log("nodes change", nodes2, "event=", event);
    setNodes(nodes2);
    if (onEvent) {
      if (event == "click-node") {
        onEvent("designer:selectElement", { groupName: "steps", elementType: "step", elementId: node2.id }, props);
      } else if (event == "remove-node") {
        onEvent("designer:removeElement", { groupName: "steps", elementType: "step", elementId: node2.id }, props);
      }
      onEvent("designer:graphChange", { nodes: nodes2 }, props);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FlowBuilder$1,
    {
      className: "nop-flow-builder",
      historyTool: true,
      zoomTool: true,
      nodes,
      onChange: handleChange,
      registerNodes: nodeModels,
      DrawerComponent,
      PopoverComponent,
      PopconfirmComponent
    }
  );
}
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
class PopupEditor extends React__default.Component {
  handleClear() {
    this.props.onChange();
  }
  highlightValue(value2) {
    const { classnames: cx, translate: __ } = this.props;
    const html = {
      __html: `<span class="label label-info">${__(
        "Condition.configured"
      )}</span>`
    };
    return /* @__PURE__ */ React__default.createElement("div", { className: cx("CPGroup-result"), dangerouslySetInnerHTML: html });
  }
  renderBody(onChange, value2, popOverContainer) {
    const {
      popup,
      render: render2,
      ...rest
    } = this.props;
    const props = { ...rest, value: value2, onChange };
    return render2("popup", popup, props);
  }
  render() {
    const {
      classnames: cx,
      placeholder,
      pickerIcon,
      locale: locale2,
      translate,
      classPrefix,
      onChange: onFinalChange,
      value: value2,
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
        locale: locale2,
        onConfirm: onFinalChange,
        value: value2,
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
          locale: locale2,
          className: cx("CBGroup-result", { "is-active": isOpened }),
          allowInput: false,
          clearable: true,
          result: value2,
          itemRender: this.highlightValue,
          onResultChange: noop$3,
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
let GraphDesignerRenderer = class extends React__default.Component {
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
        const index2 = list.indexOf(callback);
        index2 >= 0 && list.splice(index2, 1);
      };
    }
    return () => {
    };
  }
  render() {
    const props = this.props;
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(RenderContextKey.Provider, { value: {
      render: this.amisRender,
      executor: this.amisExecutor,
      observeEvent: this.registerEventCallback
    } }, /* @__PURE__ */ React__default.createElement(GraphDesigner, { ...props, onAction: this.handleAmisAction })));
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
let FlowBulderRenderer = class extends React__default.Component {
  render() {
    const props = this.props;
    return /* @__PURE__ */ React__default.createElement(FlowBuilder, { ...props });
  }
};
FlowBulderRenderer = __decorateClass([
  Renderer({
    type: "nop-flow-builder"
  })
], FlowBulderRenderer);
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
      } else if (isString$2(event.data) && event.data.startsWith("{")) {
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
      const str = isString$2(msg) ? msg : JSON.stringify(msg);
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
    updateLocation(to, replace2) {
      default_updateLocation(to, !!replace2);
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
      let root2;
      const options = builder({ actions: props.actions });
      let page = createPage(options);
      (_a = props.registerPage) == null ? void 0 : _a.call(props, page);
      function destroyPage() {
        var _a2;
        if (root2) {
          root2.unmount();
          (_a2 = options.onDestroyPage) == null ? void 0 : _a2.call(options, page);
          root2 = void 0;
        }
      }
      function renderPage() {
        const schema = cloneDeep$2(props.schema);
        root2 = createRoot(domRef.value);
        const r = root2;
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
    setState(name, value2) {
      get_root_store().set(name, value2);
    },
    onDestroyPage(page) {
      clearStoresCache(page.id);
    },
    async onRenderPage(schema, data, page) {
      let env = createEnv(page);
      const locale2 = useAdapter().useLocale();
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
        locale: locale2,
        // amis内部会自动替换zh_CN为zh-CN
        theme: "cxd"
      };
      setDefaultLocale(locale2);
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
    let root2;
    onMounted(() => {
      root2 = createRoot(domRef.value);
      root2.render(createElement(Fragment, {}, createElement(ToastComponent, { position: "top-right" })));
    });
    onBeforeUnmount(() => {
      if (root2) {
        root2.unmount();
        root2 = void 0;
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
    function handleChange(value2) {
      emit("update:modelValue", value2);
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
    const { PageProvider__getPageSource: PageProvider__getPageSource2, PageProvider__rollbackPageSource: PageProvider__rollbackPageSource2, PageProvider__savePageSource: PageProvider__savePageSource2 } = PageApis;
    function getPageSource(silent) {
      return PageProvider__getPageSource2(props.path, silent);
    }
    function savePageSource(data) {
      deletePageCache(props.path);
      PageProvider__savePageSource2(props.path, data, true);
    }
    function rollbackPageSource() {
      PageProvider__rollbackPageSource2(props.path, true);
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
    function updateSchema(value2) {
      pageSchema.value = value2;
    }
    function rebuild() {
      pageSchema.value = cloneDeep$2(pageSchema.value);
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
    let { props, value: value2, env, store } = this.props;
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
      value: value2,
      "onUpdate:value": (value22) => this.dispatchChangeEvent(value22)
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
        "onUpdate:modelValue": (value2) => this.setState(
          { dialogVisible: value2 }
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
  notify(type4, msg, conf) {
    if (msg.startsWith("_"))
      return;
    conf = { closeButton: true, ...conf };
    toast[type4] ? toast[type4](msg, conf) : console.warn("[notify]", type4, msg);
    console.log("[notify]", type4, msg);
  }
});
registerModule("vue", Vue);
registerModule("react", React);
registerModule("react-dom", ReactDOM);
const SdkLib = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AmisPageEditor,
  AmisSchemaPage,
  AmisToast: _sfc_main$6,
  AmisVueComponent: VueControl,
  PageApis,
  PopupEditor: PopupEditor$1,
  UserApis,
  XuiLoading,
  XuiPage,
  XuiPageEditor: _sfc_main$4,
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
  defineReactPageComponent,
  deleteDynamicModules,
  deletePageCache,
  fetcherOk,
  format: format$1,
  getSchemaProcessorType,
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
  registerSchemaProcessorType,
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
const style = "";
const fix = "";
registerModule("@nop-chaos/sdk", SdkLib);
export {
  AmisPageEditor,
  AmisSchemaPage,
  _sfc_main$6 as AmisToast,
  VueControl as AmisVueComponent,
  PageApis,
  PopupEditor$1 as PopupEditor,
  UserApis,
  XuiLoading,
  XuiPage,
  _sfc_main$4 as XuiPageEditor,
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
  defineReactPageComponent,
  deleteDynamicModules,
  deletePageCache,
  fetcherOk,
  format$1 as format,
  getSchemaProcessorType,
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
  registerSchemaProcessorType,
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
