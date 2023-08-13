import { shallowRef, toRaw, ref } from "vue";
import LRUCache from "lru-cache";
import { cloneDeep, isNumber, isInteger, isBoolean, omit } from "lodash-es";
import axios from "axios";
import { isString, isPlainObject, isArray, isObject, isPromise } from "@vue/shared";
import { parse } from "qs";
import "systemjs/dist/system.js";
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
  useToast() {
    throw new Error("not-impl");
  },
  useAlert() {
    throw new Error("not-impl");
  },
  processRequest(request) {
    return request;
  },
  processResponse(response) {
    return response;
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
function handleGraphQL(config, graphqlUrl, options) {
  let url = config.url;
  if (url.startsWith("@query:")) {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl("query", url.substring("@query:".length), config, graphqlUrl, options);
    return true;
  } else if (url.startsWith("query://")) {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl("query", url.substring("query://".length), config, graphqlUrl, options);
    return true;
  } else if (url.startsWith("@mutation:")) {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl("mutation", url.substring("@mutation:".length), config, graphqlUrl, options);
    return true;
  } else if (url.startsWith("mutation://")) {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl("mutation", url.substring("mutation://".length), config, graphqlUrl, options);
    return true;
  } else if (url.startsWith("@subscription:")) {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl("subscription", url.substring("@subscription:".length), config, graphqlUrl, options);
    return true;
  } else if (url.startsWith("subscription://")) {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl("subscription", url.substring("subscription://".length), config, graphqlUrl, options);
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
  config.data = { ...config.data, ...data };
  config.params = { ...config.params, ...params };
}
function splitData(data) {
  if (!data) {
    return {};
  }
  const body = {};
  const params = {};
  for (let k in data) {
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
          let ary = isString(value) ? value.split(",") : value;
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
const GRAPHQL_URL = "/graphql";
const {
  useAuthToken: useAuthToken$1,
  useTenantId,
  useLocale: useLocale$1,
  setAuthToken,
  logout,
  useSettings,
  useI18n,
  useAppId,
  globalVersion,
  useToast,
  useAlert,
  processRequest,
  processResponse
} = useAdapter();
const ajax = axios.create({});
ajax.interceptors.response.use(
  (res) => {
    const token = res.headers[HEADER_ACCESS_TOKEN];
    if (token) {
      setAuthToken(token);
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
  const toast = useToast();
  const alert = useAlert();
  return ajaxFetch(options).then((d) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!options.silent) {
      if ((_a = d.data) == null ? void 0 : _a.msg) {
        if ((_b = options.config) == null ? void 0 : _b.useAlert) {
          alert(d.data.msg);
        } else {
          toast[((_c = d.data) == null ? void 0 : _c.status) == 0 ? "info" : "error"](d.data.msg);
        }
      }
    }
    if (((_d = d.data) == null ? void 0 : _d.status) != 0)
      throw new Error(((_e = d.data) == null ? void 0 : _e.msg) || "ajax-fail:\ncode=" + ((_f = d.data) == null ? void 0 : _f.code) + ",status=" + ((_g = d.data) == null ? void 0 : _g.status));
    return d.data.data;
  });
}
function ajaxFetch(options) {
  var _a, _b;
  options.config = options.config || {};
  let url = options.url;
  let query = options.query || {};
  const pos = url.indexOf("?");
  if (pos > 0) {
    query = { ...query, ...parse(url.substring(pos + 1)) };
    url = url.substring(0, pos);
  }
  const globSetting = useSettings();
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
  if ((_a = options.config) == null ? void 0 : _a.cancelExecutor) {
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
  if (((_b = config.method) == null ? void 0 : _b.toLowerCase()) == "get") {
    config.params = { ...options.data, ...query };
    config.data = null;
  }
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
      return response;
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
  const token = useAuthToken$1();
  let tenantid = useTenantId();
  config.headers = config.headers || {};
  config.headers["nop-locale"] = useLocale$1();
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
  const { t } = useI18n();
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
const pageCache = createAsyncCache({ max: 50 });
const dictCache = createAsyncCache({ max: 100 });
const { useLocale } = useAdapter();
function buildLocaleKey(name) {
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
const { useAuthToken } = useAdapter();
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
  return ajaxRequest({
    url: "@query:LoginApi__getLoginUserInfo/username:userName,realname:nickName",
    data: {
      accessToken: useAuthToken()
    }
  });
}
function LoginApi__logout() {
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
const registeredApis = {};
function registerApi(name, fn) {
  if (registeredApis[name])
    console.error("replace-api:name=" + name);
  registeredApis[name] = fn;
}
function getApi(name) {
  return registeredApis[name];
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
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
async function collectActions(pageUrl, json, fnScope, amisScope, actions) {
  if (!json)
    return;
  const promises = [];
  function process(json2, fnScope2, amisScope2) {
    if (hasScope(json2.type)) {
      let name = json2.name || json2.id;
      if (!name)
        name = json2.name = v4();
      amisScope2 = amisScope2 ? amisScope2 + "." + name : name;
    }
    let modulePaths = json2["xui:import"];
    let js = json2["xui:js"];
    if (js || modulePaths) {
      const localScope = json2["xui:scope"] = json2["xui:scope"] || v4();
      const standalone = json2["xui:standalone"];
      if (standalone) {
        fnScope2 = localScope;
      } else {
        fnScope2 = fnScope2 ? fnScope2 + "/" + localScope : localScope;
      }
      if (js) {
        buildActions(js, fnScope2, actions);
      }
      if (modulePaths) {
        fetchApis(pageUrl, modulePaths, promises, fnScope2, actions);
      }
    }
    for (let key in json2) {
      const v = json2[key];
      const processed = processValue(v, fnScope2, amisScope2);
      if (processed !== v) {
        if (isPromise(processed)) {
          processed.then((v2) => json2[key] = v2);
        } else {
          json2[key] = processed;
        }
      }
    }
  }
  function processValue(v, fnScope2, amisScope2) {
    if (isString(v)) {
      if (v.startsWith("@action:")) {
        return "temp-action://" + amisScope2 + "," + fnScope2 + "|" + v.substring("@action:".length);
      } else if (v.startsWith("action://")) {
        return "temp-action://" + amisScope2 + "," + fnScope2 + "|" + v.substring("action://".length);
      } else if (v.startsWith("@page:")) {
        return "scoped-page://" + amisScope2 + "," + fnScope2 + "|" + v.substring("@page:".length);
      } else if (v.startsWith("page://")) {
        return "scoped-page://" + amisScope2 + "," + fnScope2 + "|" + v.substring("page://".length);
      } else if (v.startsWith("@invoke:")) {
        return "scoped-invoke://" + amisScope2 + "|" + v.substring("@invoke:".length);
      } else if (v.startsWith("invoke://")) {
        return "scoped-invoke://" + amisScope2 + "|" + v.substring("invoke://".length);
      } else if (v.startsWith("@fn:")) {
        return "scoped-fn://" + fnScope2 + "|" + v.substring("@fn:".length);
      } else if (v.startsWith("fn://")) {
        return "scoped-fn://" + fnScope2 + "|" + v.substring("fn://".length);
      } else if (v.startsWith("@query:")) {
        return "query://" + v.substring("@query:".length);
      } else if (v.startsWith("@mutation:")) {
        return "mutation://" + v.substring("@mutation:".length);
      } else if (v.startsWith("@graphql:")) {
        return "graphql://" + v.substring("@graphql:".length);
      } else if (v.startsWith("@dict:")) {
        return "dict://" + v.substring("@dict:".length);
      }
    } else if (isPlainObject(v)) {
      process(v, fnScope2, amisScope2);
    } else if (isArray(v)) {
      for (let i = 0, n = v.length; i < n; i++) {
        processValue(v[i], fnScope2, amisScope2);
      }
    }
    return v;
  }
  process(json, fnScope, amisScope);
  await Promise.all(promises);
  processXuiValue(json, (v) => {
    if (v.startsWith("temp-action://")) {
      const parts = v.substring("temp-action://".length).split("|");
      const [amisScope2, fnScope2] = parts[0].split(",");
      let action = fnScope2 + "|" + parts[1];
      let found = findAction(action, actions);
      if (!found) {
        const api = getApi(parts[1]);
        if (api) {
          found = actions[action] = api;
        }
      }
      if (found) {
        return "scoped-action://" + amisScope2 + "," + found;
      } else {
        console.error("nop.unknown-action:" + action);
        return "unknown-action://" + action;
      }
    } else if (v.startsWith("scoped-fn://")) {
      const [fnScope2, fn] = v.substring("scoped-fn://".length).split("|");
      const fnName = fn.split("(")[0];
      const args = fn.substring(fnName.length) || "(event,props)";
      let action = fnScope2 + "|" + fnName;
      let found = findAction(action, actions);
      if (!found) {
        const api = getApi(fnName);
        if (api) {
          found = actions[action] = api;
        }
      }
      if (found) {
        return "return props.env._page.actions['" + action + "']" + args;
      } else {
        console.error("nop.unknown-fn:" + action);
        return "unknown-fn://" + fn;
      }
    } else {
      return v;
    }
  });
}
function fetchApis(pageUrl, modulePaths, promises, fnScope, actions) {
  if (isString(modulePaths)) {
    modulePaths = modulePaths.split(",").reduce((m, p) => {
      m[getPathName(p)] = p;
      return m;
    }, {});
  }
  for (const moduleName in modulePaths) {
    const path = absolutePath(modulePaths[moduleName], pageUrl);
    const promise = importModule(path).then((mod) => {
      actions[fnScope + "|" + moduleName] = mod;
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
function buildActions(js, fnScope, actions) {
  try {
    const fn = new Function("require", "ajaxFetch", "ajaxRequest", js);
    const map = fn(importModule, ajaxFetch, ajaxRequest);
    if (map) {
      for (let name in map) {
        let fullName = fnScope + "|" + name;
        const fn2 = map[name];
        actions[fullName] = fn2;
      }
    }
  } catch (e) {
    console.error(e);
  }
}
function findAction(url, actions) {
  let p = url.indexOf("?");
  if (p >= 0)
    url = url.substring(0, p);
  let pos = url.lastIndexOf("|");
  let scope = url.substring(0, pos);
  let name = url.substring(pos + 1);
  let names = name.split(".");
  do {
    if (actions[scope + "|" + name]) {
      return scope + "|" + name;
    }
    if (names[1] && actions[scope + "|" + names[0]] && actions[scope + "|" + names[0]][names[1]]) {
      return scope + "|" + name;
    }
    let pos2 = scope.lastIndexOf("/");
    if (pos2 < 0)
      break;
    scope = scope.substring(0, pos2);
  } while (true);
  return;
}
function hasScope(type) {
  return ["page", "dialog", "drawer", "wizard", "service", "crud", "table", "table2", "form", "combo"].includes(type);
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
const { isUserInRole } = useAdapter();
async function transformPageJson(pageUrl, json) {
  json.__baseUrl = pageUrl;
  fixPage(json);
  json = await processXuiDirective(json, "xui:roles", filterByAuth);
  json = await processXuiDirective(json, "xui:component", resolveXuiComponent);
  return json;
}
function filterByAuth(roles, json) {
  if (!isUserInRole(roles))
    return;
  return json;
}
function fixPage(json) {
  if (isArray(json)) {
    for (let i = 0, n = json.length; i < n; i++) {
      fixPage(json[i]);
    }
  } else if (isObject(json)) {
    const dlg = json["dialog"];
    if (isObject(dlg)) {
      addClassName(dlg, "bodyClassName", "nop-page");
    }
    const drawer = json["drawer"];
    if (isObject(drawer)) {
      addClassName(drawer, "className", "nop-page");
    }
    if (json["type"] == "group") {
      const body = json["body"];
      if (isObject(body)) {
        json["body"] = [body];
      }
    }
    for (let key in json) {
      fixPage(json[key]);
    }
  }
}
function addClassName(map, classNameKey, className) {
  let value = map[classNameKey];
  if (!value) {
    value = className;
  } else if (value.indexOf(className) < 0) {
    value = className + " " + value;
  }
  map[classNameKey] = value;
}
export {
  PageApis,
  UserApis,
  absolutePath,
  adapter,
  ajax,
  ajaxFetch,
  ajaxRequest,
  clearDictCache,
  clearLocalCache,
  clearPageCache,
  collectActions,
  conditionToTree,
  createAsyncCache,
  createCancelToken,
  deleteDynamicModules,
  deletePageCache,
  fetcherOk,
  format,
  getApi,
  handleGraphQL,
  importModule,
  isCancel,
  processXuiDirective,
  processXuiValue,
  refHolder,
  registerAdapter,
  registerApi,
  registerOperation,
  registerXuiComponent,
  resolveXuiComponent,
  responseOk,
  transformPageJson,
  treeToCondition,
  unregisterXuiComponent,
  useAdapter,
  useDebug,
  withDictCache,
  withPageCache
};
