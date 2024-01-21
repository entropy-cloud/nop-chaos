import qs, { parse } from "qs";
import { match } from "path-to-regexp";
import { shallowRef, toRaw, ref } from "vue";
import LRUCache from "lru-cache";
import { cloneDeep, isNumber, isInteger, isBoolean, omit } from "lodash-es";
import axios from "axios";
import { isObject, isArray, isPromise, isString, isPlainObject } from "@vue/shared";
import "systemjs/dist/system.js";
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
  const { notify, alert } = useAdapter();
  return ajaxFetch(options).then((d) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!options.silent) {
      if ((_a = d.data) == null ? void 0 : _a.msg) {
        if ((_b = options.config) == null ? void 0 : _b.useAlert) {
          alert(d.data.msg);
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
    url,
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
  const token = useAuthToken();
  let tenantid = useTenantId();
  config.headers = config.headers || {};
  config.headers["nop-locale"] = (_a = useLocale()) == null ? void 0 : _a.replace("_", "-");
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
  format,
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
export {
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
