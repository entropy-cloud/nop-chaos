import { jsx } from "react/jsx-runtime";
import React, { createContext, createRef, createElement, Component, useContext, forwardRef, useState, useMemo, useRef, useImperativeHandle, useEffect } from "react";
import { Drawer, Popover, Popconfirm } from "antd";
import { RenderContextKey } from "@nop-chaos/nop-react-core";
import "systemjs/dist/system.js";
import { findDOMNode } from "react-dom";
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
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
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
(function(module, exports) {
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
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }
  function addSetEntry(set, value2) {
    set.add(value2);
    return set;
  }
  function arrayEach(array, iteratee) {
    var index2 = -1, length = array ? array.length : 0;
    while (++index2 < length) {
      if (iteratee(array[index2], index2, array) === false) {
        break;
      }
    }
    return array;
  }
  function arrayPush(array, values) {
    var index2 = -1, length = values.length, offset = array.length;
    while (++index2 < length) {
      array[offset + index2] = values[index2];
    }
    return array;
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index2 = -1, length = array ? array.length : 0;
    if (initAccum && length) {
      accumulator = array[++index2];
    }
    while (++index2 < length) {
      accumulator = iteratee(accumulator, array[index2], index2, array);
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
  function getValue2(object, key) {
    return object == null ? void 0 : object[key];
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
  function setToArray(set) {
    var index2 = -1, result = Array(set.size);
    set.forEach(function(value2) {
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
  var DataView = getNative2(root2, "DataView"), Map2 = getNative2(root2, "Map"), Promise2 = getNative2(root2, "Promise"), Set = getNative2(root2, "Set"), WeakMap = getNative2(root2, "WeakMap"), nativeCreate2 = getNative2(Object, "create");
  var dataViewCtorString = toSource2(DataView), mapCtorString = toSource2(Map2), promiseCtorString = toSource2(Promise2), setCtorString = toSource2(Set), weakMapCtorString = toSource2(WeakMap);
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
  function Hash2(entries) {
    var index2 = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index2 < length) {
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
    var index2 = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index2 < length) {
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
    var index2 = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index2 < length) {
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
    var length = result.length, skipIndexes = !!length;
    for (var key in value2) {
      if ((inherited || hasOwnProperty2.call(value2, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue(object, key, value2) {
    var objValue = object[key];
    if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value2)) || value2 === void 0 && !(key in object)) {
      object[key] = value2;
    }
  }
  function assocIndexOf2(array, key) {
    var length = array.length;
    while (length--) {
      if (eq2(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }
  function baseClone(value2, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value2, key, object, stack) : customizer(value2);
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
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if (isHostObject2(value2)) {
          return object ? value2 : {};
        }
        result = initCloneObject(isFunc ? {} : value2);
        if (!isDeep) {
          return copySymbols(value2, baseAssign(result, value2));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value2 : {};
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
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function baseGetTag(value2) {
    return objectToString2.call(value2);
  }
  function baseIsNative2(value2) {
    if (!isObject2(value2) || isMasked2(value2)) {
      return false;
    }
    var pattern = isFunction2(value2) || isHostObject2(value2) ? reIsNative2 : reIsHostCtor2;
    return pattern.test(toSource2(value2));
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
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
    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array, addMapEntry, new map.constructor());
  }
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
    return arrayReduce(array, addSetEntry, new set.constructor());
  }
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function copyArray(source, array) {
    var index2 = -1, length = source.length;
    array || (array = Array(length));
    while (++index2 < length) {
      array[index2] = source[index2];
    }
    return array;
  }
  function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index2 = -1, length = props.length;
    while (++index2 < length) {
      var key = props[index2];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      assignValue(object, key, newValue === void 0 ? source[key] : newValue);
    }
    return object;
  }
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  function getMapData2(map, key) {
    var data = map.__data__;
    return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative2(object, key) {
    var value2 = getValue2(object, key);
    return baseIsNative2(value2) ? value2 : void 0;
  }
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
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
  function initCloneArray(array) {
    var length = array.length, result = array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }
  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);
      case boolTag:
      case dateTag:
        return new Ctor(+object);
      case dataViewTag:
        return cloneDataView(object, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep);
      case mapTag:
        return cloneMap(object, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object);
      case regexpTag:
        return cloneRegExp(object);
      case setTag:
        return cloneSet(object, isDeep, cloneFunc);
      case symbolTag2:
        return cloneSymbol(object);
    }
  }
  function isIndex(value2, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value2 == "number" || reIsUint.test(value2)) && (value2 > -1 && value2 % 1 == 0 && value2 < length);
  }
  function isKeyable2(value2) {
    var type = typeof value2;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value2 !== "__proto__" : value2 === null;
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
    var type = typeof value2;
    return !!value2 && (type == "object" || type == "function");
  }
  function isObjectLike2(value2) {
    return !!value2 && typeof value2 == "object";
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module.exports = cloneDeep2;
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
function getValue(object, key) {
  return object == null ? void 0 : object[key];
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
var Map = getNative(root, "Map"), nativeCreate = getNative(Object, "create");
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function Hash(entries) {
  var index2 = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index2 < length) {
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
  var index2 = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index2 < length) {
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
  var index2 = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
function mapCacheClear() {
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map || ListCache)(),
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
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index2 = 0, length = path.length;
  while (object != null && index2 < length) {
    object = object[toKey(path[index2++])];
  }
  return index2 && index2 == length ? object : void 0;
}
function baseIsNative(value2) {
  if (!isObject(value2) || isMasked(value2)) {
    return false;
  }
  var pattern = isFunction(value2) || isHostObject(value2) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value2));
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
function getNative(object, key) {
  var value2 = getValue(object, key);
  return baseIsNative(value2) ? value2 : void 0;
}
function isKey(value2, object) {
  if (isArray(value2)) {
    return false;
  }
  var type = typeof value2;
  if (type == "number" || type == "symbol" || type == "boolean" || value2 == null || isSymbol(value2)) {
    return true;
  }
  return reIsPlainProp.test(value2) || !reIsDeepProp.test(value2) || object != null && value2 in Object(object);
}
function isKeyable(value2) {
  var type = typeof value2;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value2 !== "__proto__" : value2 === null;
}
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var stringToPath = memoize(function(string) {
  string = toString(string);
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, string2) {
    result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
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
  var type = typeof value2;
  return !!value2 && (type == "object" || type == "function");
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
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
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
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
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
var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== "production") {
    if (format === void 0) {
      throw new Error("invariant requires an error message argument");
    }
  }
  if (!condition) {
    var error;
    if (format === void 0) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() {
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
  var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
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
                case h:
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
  reactIs_production_min.ContextProvider = h;
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
    return z(a) === h;
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
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
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
      function isValidElementType(type) {
        return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
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
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      reactIs_development.AsyncMode = AsyncMode;
      reactIs_development.ConcurrentMode = ConcurrentMode;
      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
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
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty2.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
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
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== "production") {
      for (var typeSpecName in typeSpecs) {
        if (has2(typeSpecs, typeSpecName)) {
          var error;
          try {
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error(
                (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              err.name = "Invariant Violation";
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : "";
            printWarning(
              "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
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
  factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
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
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
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
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
            }
            return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
          }
          return null;
        } else {
          return validate2(props, propName, componentName, location, propFullName);
        }
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
      function validate2(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          var preciseType = getPreciseType(propValue);
          return new PropTypeError(
            "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
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
      function validate2(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createElementTypeChecker() {
      function validate2(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createElementTypeTypeChecker() {
      function validate2(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createInstanceTypeChecker(expectedClass) {
      function validate2(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
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
      function validate2(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }
        var valuesString = JSON.stringify(expectedValues, function replacer(key, value2) {
          var type = getPreciseType(value2);
          if (type === "symbol") {
            return String(value2);
          }
          return value2;
        });
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
      }
      return createChainableTypeChecker(validate2);
    }
    function createObjectOfTypeChecker(typeChecker) {
      function validate2(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== "function") {
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
        }
        for (var key in propValue) {
          if (has2(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
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
      function validate2(props, propName, componentName, location, propFullName) {
        var expectedTypes = [];
        for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
          var checker2 = arrayOfTypeCheckers[i2];
          var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has2(checkerResult.data, "expectedType")) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
      }
      return createChainableTypeChecker(validate2);
    }
    function createNodeChecker() {
      function validate2(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function invalidValidatorError(componentName, location, propFullName, key, type) {
      return new PropTypeError(
        (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
      );
    }
    function createShapeTypeChecker(shapeTypes) {
      function validate2(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker !== "function") {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate2);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate2(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== "object") {
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        }
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has2(shapeTypes, key) && typeof checker !== "function") {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          if (!checker) {
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
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
          if (propValue === null || isValidElement(propValue)) {
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
      var type = getPreciseType(value2);
      switch (type) {
        case "array":
        case "object":
          return "an " + type;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + type;
        default:
          return type;
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
    function shim(props, propName, componentName, location, propFullName, secret) {
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
    value: function add(collection, ref) {
      if (!this.refs[collection]) {
        this.refs[collection] = [];
      }
      this.refs[collection].push(ref);
    }
  }, {
    key: "remove",
    value: function remove(collection, ref) {
      var index2 = this.getIndex(collection, ref);
      if (index2 !== -1) {
        this.refs[collection].splice(index2, 1);
      }
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "getActive",
    value: function getActive() {
      var _this = this;
      return this.refs[this.active.collection].find(function(_ref) {
        var node = _ref.node;
        return node.sortableInfo.index == _this.active.index;
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex(collection, ref) {
      return this.refs[collection].indexOf(ref);
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
function setInlineStyles(node, styles) {
  Object.keys(styles).forEach(function(key) {
    node.style[key] = styles[key];
  });
}
function setTranslate3d(node, translate) {
  node.style["".concat(vendorPrefix, "Transform")] = translate == null ? "" : "translate3d(".concat(translate.x, "px,").concat(translate.y, "px,0)");
}
function setTransitionDuration(node, duration) {
  node.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? "" : "".concat(duration, "ms");
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
  var style = window.getComputedStyle(element);
  return {
    bottom: getPixelValue(style.marginBottom),
    left: getPixelValue(style.marginLeft),
    right: getPixelValue(style.marginRight),
    top: getPixelValue(style.marginTop)
  };
}
function provideDisplayName(prefix, Component$$1) {
  var componentName = Component$$1.displayName || Component$$1.name;
  return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
}
function getScrollAdjustedBoundingClientRect(node, scrollDelta) {
  var boundingClientRect = node.getBoundingClientRect();
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
function getEdgeOffset(node, parent) {
  var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    left: 0,
    top: 0
  };
  if (!node) {
    return void 0;
  }
  var nodeOffset = {
    left: offset.left + node.offsetLeft,
    top: offset.top + node.offsetTop
  };
  if (node.parentNode === parent) {
    return nodeOffset;
  }
  return getEdgeOffset(node.parentNode, parent, nodeOffset);
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
    var match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);
    invariant$1(match !== null, 'lockOffset value should be a number or a string of a number followed by "px" or "%". Given %s', lockOffset);
    offsetX = parseFloat(lockOffset);
    offsetY = parseFloat(lockOffset);
    unit = match[1];
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
  var style = window.getComputedStyle(element);
  if (style.display === "grid") {
    return {
      x: getPixelValue(style.gridColumnGap),
      y: getPixelValue(style.gridRowGap)
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
function cloneNode(node) {
  var selector = "input, textarea, select, canvas, [contenteditable]";
  var fields = node.querySelectorAll(selector);
  var clonedNode = node.cloneNode(true);
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
      var _this;
      _classCallCheck(this, WithSortableHandle);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithSortableHandle)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "wrappedInstance", createRef());
      return _this;
    }
    _createClass(WithSortableHandle, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var node = findDOMNode(this);
        node.sortableHandle = true;
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant$1(config.withRef, "To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call");
        return this.wrappedInstance.current;
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? this.wrappedInstance : null;
        return createElement(WrappedComponent, _extends({
          ref
        }, this.props));
      }
    }]);
    return WithSortableHandle;
  }(Component), _defineProperty$1(_class, "displayName", provideDisplayName("sortableHandle", WrappedComponent)), _temp;
}
function isSortableHandle(node) {
  return node.sortableHandle != null;
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
      var _this = this;
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
          _this.isAutoScrolling = true;
          var offset = {
            left: speed.x * direction.x,
            top: speed.y * direction.y
          };
          _this.container.scrollTop += offset.top;
          _this.container.scrollLeft += offset.left;
          _this.onScrollCallback(offset);
        }, 5);
      }
    }
  }]);
  return AutoScroller2;
}();
function defaultGetHelperDimensions(_ref) {
  var node = _ref.node;
  return {
    height: node.offsetHeight,
    width: node.offsetWidth
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
      var _this;
      _classCallCheck(this, WithSortableContainer);
      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithSortableContainer).call(this, props));
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleStart", function(event) {
        var _this$props = _this.props, distance = _this$props.distance, shouldCancelStart = _this$props.shouldCancelStart;
        if (event.button === 2 || shouldCancelStart(event)) {
          return;
        }
        _this.touched = true;
        _this.position = getPosition(event);
        var node = closest(event.target, function(el) {
          return el.sortableInfo != null;
        });
        if (node && node.sortableInfo && _this.nodeIsChild(node) && !_this.state.sorting) {
          var useDragHandle = _this.props.useDragHandle;
          var _node$sortableInfo = node.sortableInfo, index2 = _node$sortableInfo.index, collection = _node$sortableInfo.collection, disabled = _node$sortableInfo.disabled;
          if (disabled) {
            return;
          }
          if (useDragHandle && !closest(event.target, isSortableHandle)) {
            return;
          }
          _this.manager.active = {
            collection,
            index: index2
          };
          if (!isTouchEvent(event) && event.target.tagName === NodeType.Anchor) {
            event.preventDefault();
          }
          if (!distance) {
            if (_this.props.pressDelay === 0) {
              _this.handlePress(event);
            } else {
              _this.pressTimer = setTimeout(function() {
                return _this.handlePress(event);
              }, _this.props.pressDelay);
            }
          }
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "nodeIsChild", function(node) {
        return node.sortableInfo.manager === _this.manager;
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleMove", function(event) {
        var _this$props2 = _this.props, distance = _this$props2.distance, pressThreshold = _this$props2.pressThreshold;
        if (!_this.state.sorting && _this.touched && !_this._awaitingUpdateBeforeSortStart) {
          var position = getPosition(event);
          var delta = {
            x: _this.position.x - position.x,
            y: _this.position.y - position.y
          };
          var combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);
          _this.delta = delta;
          if (!distance && (!pressThreshold || combinedDelta >= pressThreshold)) {
            clearTimeout(_this.cancelTimer);
            _this.cancelTimer = setTimeout(_this.cancel, 0);
          } else if (distance && combinedDelta >= distance && _this.manager.isActive()) {
            _this.handlePress(event);
          }
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleEnd", function() {
        _this.touched = false;
        _this.cancel();
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "cancel", function() {
        var distance = _this.props.distance;
        var sorting = _this.state.sorting;
        if (!sorting) {
          if (!distance) {
            clearTimeout(_this.pressTimer);
          }
          _this.manager.active = null;
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handlePress", function(event) {
        try {
          var active = _this.manager.getActive();
          var _temp6 = function() {
            if (active) {
              var _temp7 = function _temp72() {
                var index2 = _node.sortableInfo.index;
                var margin = getElementMargin(_node);
                var gridGap = getContainerGridGap(_this.container);
                var containerBoundingRect = _this.scrollContainer.getBoundingClientRect();
                var dimensions = _getHelperDimensions({
                  index: index2,
                  node: _node,
                  collection: _collection
                });
                _this.node = _node;
                _this.margin = margin;
                _this.gridGap = gridGap;
                _this.width = dimensions.width;
                _this.height = dimensions.height;
                _this.marginOffset = {
                  x: _this.margin.left + _this.margin.right + _this.gridGap.x,
                  y: Math.max(_this.margin.top, _this.margin.bottom, _this.gridGap.y)
                };
                _this.boundingClientRect = _node.getBoundingClientRect();
                _this.containerBoundingRect = containerBoundingRect;
                _this.index = index2;
                _this.newIndex = index2;
                _this.axis = {
                  x: _axis.indexOf("x") >= 0,
                  y: _axis.indexOf("y") >= 0
                };
                _this.offsetEdge = getEdgeOffset(_node, _this.container);
                if (_isKeySorting) {
                  _this.initialOffset = getPosition(_objectSpread({}, event, {
                    pageX: _this.boundingClientRect.left,
                    pageY: _this.boundingClientRect.top
                  }));
                } else {
                  _this.initialOffset = getPosition(event);
                }
                _this.initialScroll = {
                  left: _this.scrollContainer.scrollLeft,
                  top: _this.scrollContainer.scrollTop
                };
                _this.initialWindowScroll = {
                  left: window.pageXOffset,
                  top: window.pageYOffset
                };
                _this.helper = _this.helperContainer.appendChild(cloneNode(_node));
                setInlineStyles(_this.helper, {
                  boxSizing: "border-box",
                  height: "".concat(_this.height, "px"),
                  left: "".concat(_this.boundingClientRect.left - margin.left, "px"),
                  pointerEvents: "none",
                  position: "fixed",
                  top: "".concat(_this.boundingClientRect.top - margin.top, "px"),
                  width: "".concat(_this.width, "px")
                });
                if (_isKeySorting) {
                  _this.helper.focus();
                }
                if (_hideSortableGhost) {
                  _this.sortableGhost = _node;
                  setInlineStyles(_node, {
                    opacity: 0,
                    visibility: "hidden"
                  });
                }
                _this.minTranslate = {};
                _this.maxTranslate = {};
                if (_isKeySorting) {
                  var _ref = _useWindowAsScrollContainer ? {
                    top: 0,
                    left: 0,
                    width: _this.contentWindow.innerWidth,
                    height: _this.contentWindow.innerHeight
                  } : _this.containerBoundingRect, containerTop = _ref.top, containerLeft = _ref.left, containerWidth = _ref.width, containerHeight = _ref.height;
                  var containerBottom = containerTop + containerHeight;
                  var containerRight = containerLeft + containerWidth;
                  if (_this.axis.x) {
                    _this.minTranslate.x = containerLeft - _this.boundingClientRect.left;
                    _this.maxTranslate.x = containerRight - (_this.boundingClientRect.left + _this.width);
                  }
                  if (_this.axis.y) {
                    _this.minTranslate.y = containerTop - _this.boundingClientRect.top;
                    _this.maxTranslate.y = containerBottom - (_this.boundingClientRect.top + _this.height);
                  }
                } else {
                  if (_this.axis.x) {
                    _this.minTranslate.x = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - _this.boundingClientRect.left - _this.width / 2;
                    _this.maxTranslate.x = (_useWindowAsScrollContainer ? _this.contentWindow.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - _this.boundingClientRect.left - _this.width / 2;
                  }
                  if (_this.axis.y) {
                    _this.minTranslate.y = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - _this.boundingClientRect.top - _this.height / 2;
                    _this.maxTranslate.y = (_useWindowAsScrollContainer ? _this.contentWindow.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - _this.boundingClientRect.top - _this.height / 2;
                  }
                }
                if (_helperClass) {
                  _helperClass.split(" ").forEach(function(className) {
                    return _this.helper.classList.add(className);
                  });
                }
                _this.listenerNode = event.touches ? event.target : _this.contentWindow;
                if (_isKeySorting) {
                  _this.listenerNode.addEventListener("wheel", _this.handleKeyEnd, true);
                  _this.listenerNode.addEventListener("mousedown", _this.handleKeyEnd, true);
                  _this.listenerNode.addEventListener("keydown", _this.handleKeyDown);
                } else {
                  events.move.forEach(function(eventName) {
                    return _this.listenerNode.addEventListener(eventName, _this.handleSortMove, false);
                  });
                  events.end.forEach(function(eventName) {
                    return _this.listenerNode.addEventListener(eventName, _this.handleSortEnd, false);
                  });
                }
                _this.setState({
                  sorting: true,
                  sortingIndex: index2
                });
                if (_onSortStart) {
                  _onSortStart({
                    node: _node,
                    index: index2,
                    collection: _collection,
                    isKeySorting: _isKeySorting,
                    nodes: _this.manager.getOrderedRefs(),
                    helper: _this.helper
                  }, event);
                }
                if (_isKeySorting) {
                  _this.keyMove(0);
                }
              };
              var _this$props3 = _this.props, _axis = _this$props3.axis, _getHelperDimensions = _this$props3.getHelperDimensions, _helperClass = _this$props3.helperClass, _hideSortableGhost = _this$props3.hideSortableGhost, updateBeforeSortStart = _this$props3.updateBeforeSortStart, _onSortStart = _this$props3.onSortStart, _useWindowAsScrollContainer = _this$props3.useWindowAsScrollContainer;
              var _node = active.node, _collection = active.collection;
              var _isKeySorting = _this.manager.isKeySorting;
              var _temp8 = function() {
                if (typeof updateBeforeSortStart === "function") {
                  _this._awaitingUpdateBeforeSortStart = true;
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
                    _this._awaitingUpdateBeforeSortStart = false;
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
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleSortMove", function(event) {
        var onSortMove = _this.props.onSortMove;
        if (typeof event.preventDefault === "function" && event.cancelable) {
          event.preventDefault();
        }
        _this.updateHelperPosition(event);
        _this.animateNodes();
        _this.autoscroll();
        if (onSortMove) {
          onSortMove(event);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleSortEnd", function(event) {
        var _this$props4 = _this.props, hideSortableGhost = _this$props4.hideSortableGhost, onSortEnd = _this$props4.onSortEnd;
        var _this$manager = _this.manager, collection = _this$manager.active.collection, isKeySorting = _this$manager.isKeySorting;
        var nodes = _this.manager.getOrderedRefs();
        if (_this.listenerNode) {
          if (isKeySorting) {
            _this.listenerNode.removeEventListener("wheel", _this.handleKeyEnd, true);
            _this.listenerNode.removeEventListener("mousedown", _this.handleKeyEnd, true);
            _this.listenerNode.removeEventListener("keydown", _this.handleKeyDown);
          } else {
            events.move.forEach(function(eventName) {
              return _this.listenerNode.removeEventListener(eventName, _this.handleSortMove);
            });
            events.end.forEach(function(eventName) {
              return _this.listenerNode.removeEventListener(eventName, _this.handleSortEnd);
            });
          }
        }
        _this.helper.parentNode.removeChild(_this.helper);
        if (hideSortableGhost && _this.sortableGhost) {
          setInlineStyles(_this.sortableGhost, {
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
        _this.autoScroller.clear();
        _this.manager.active = null;
        _this.manager.isKeySorting = false;
        _this.setState({
          sorting: false,
          sortingIndex: null
        });
        if (typeof onSortEnd === "function") {
          onSortEnd({
            collection,
            newIndex: _this.newIndex,
            oldIndex: _this.index,
            isKeySorting,
            nodes
          }, event);
        }
        _this.touched = false;
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "autoscroll", function() {
        var disableAutoscroll = _this.props.disableAutoscroll;
        var isKeySorting = _this.manager.isKeySorting;
        if (disableAutoscroll) {
          _this.autoScroller.clear();
          return;
        }
        if (isKeySorting) {
          var translate = _objectSpread({}, _this.translate);
          var scrollX = 0;
          var scrollY = 0;
          if (_this.axis.x) {
            translate.x = Math.min(_this.maxTranslate.x, Math.max(_this.minTranslate.x, _this.translate.x));
            scrollX = _this.translate.x - translate.x;
          }
          if (_this.axis.y) {
            translate.y = Math.min(_this.maxTranslate.y, Math.max(_this.minTranslate.y, _this.translate.y));
            scrollY = _this.translate.y - translate.y;
          }
          _this.translate = translate;
          setTranslate3d(_this.helper, _this.translate);
          _this.scrollContainer.scrollLeft += scrollX;
          _this.scrollContainer.scrollTop += scrollY;
          return;
        }
        _this.autoScroller.update({
          height: _this.height,
          maxTranslate: _this.maxTranslate,
          minTranslate: _this.minTranslate,
          translate: _this.translate,
          width: _this.width
        });
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "onAutoScroll", function(offset) {
        _this.translate.x += offset.left;
        _this.translate.y += offset.top;
        _this.animateNodes();
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function(event) {
        var keyCode = event.keyCode;
        var _this$props5 = _this.props, shouldCancelStart = _this$props5.shouldCancelStart, _this$props5$keyCodes = _this$props5.keyCodes, customKeyCodes = _this$props5$keyCodes === void 0 ? {} : _this$props5$keyCodes;
        var keyCodes = _objectSpread({}, defaultKeyCodes, customKeyCodes);
        if (_this.manager.active && !_this.manager.isKeySorting || !_this.manager.active && (!keyCodes.lift.includes(keyCode) || shouldCancelStart(event) || !_this.isValidSortingTarget(event))) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();
        if (keyCodes.lift.includes(keyCode) && !_this.manager.active) {
          _this.keyLift(event);
        } else if (keyCodes.drop.includes(keyCode) && _this.manager.active) {
          _this.keyDrop(event);
        } else if (keyCodes.cancel.includes(keyCode)) {
          _this.newIndex = _this.manager.active.index;
          _this.keyDrop(event);
        } else if (keyCodes.up.includes(keyCode)) {
          _this.keyMove(-1);
        } else if (keyCodes.down.includes(keyCode)) {
          _this.keyMove(1);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "keyLift", function(event) {
        var target = event.target;
        var node = closest(target, function(el) {
          return el.sortableInfo != null;
        });
        var _node$sortableInfo2 = node.sortableInfo, index2 = _node$sortableInfo2.index, collection = _node$sortableInfo2.collection;
        _this.initialFocusedNode = target;
        _this.manager.isKeySorting = true;
        _this.manager.active = {
          index: index2,
          collection
        };
        _this.handlePress(event);
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "keyMove", function(shift) {
        var nodes = _this.manager.getOrderedRefs();
        var lastIndex = nodes[nodes.length - 1].node.sortableInfo.index;
        var newIndex = _this.newIndex + shift;
        var prevIndex = _this.newIndex;
        if (newIndex < 0 || newIndex > lastIndex) {
          return;
        }
        _this.prevIndex = prevIndex;
        _this.newIndex = newIndex;
        var targetIndex = getTargetIndex(_this.newIndex, _this.prevIndex, _this.index);
        var target = nodes.find(function(_ref2) {
          var node = _ref2.node;
          return node.sortableInfo.index === targetIndex;
        });
        var targetNode = target.node;
        var scrollDelta = _this.containerScrollDelta;
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
          x: shouldAdjustForSize && _this.axis.x ? targetNode.offsetWidth - _this.width : 0,
          y: shouldAdjustForSize && _this.axis.y ? targetNode.offsetHeight - _this.height : 0
        };
        _this.handleSortMove({
          pageX: targetPosition.left + sizeAdjustment.x,
          pageY: targetPosition.top + sizeAdjustment.y,
          ignoreTransition: shift === 0
        });
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "keyDrop", function(event) {
        _this.handleSortEnd(event);
        if (_this.initialFocusedNode) {
          _this.initialFocusedNode.focus();
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyEnd", function(event) {
        if (_this.manager.active) {
          _this.keyDrop(event);
        }
      });
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "isValidSortingTarget", function(event) {
        var useDragHandle = _this.props.useDragHandle;
        var target = event.target;
        var node = closest(target, function(el) {
          return el.sortableInfo != null;
        });
        return node && node.sortableInfo && !node.sortableInfo.disabled && (useDragHandle ? isSortableHandle(target) : target.sortableInfo);
      });
      var manager = new Manager();
      validateProps(props);
      _this.manager = manager;
      _this.wrappedInstance = createRef();
      _this.sortableContextValue = {
        manager
      };
      _this.events = {
        end: _this.handleEnd,
        move: _this.handleMove,
        start: _this.handleStart
      };
      return _this;
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
        var offset = getPosition(event);
        var translate = {
          x: offset.x - this.initialOffset.x,
          y: offset.y - this.initialOffset.y
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
          var offset = {
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
              if (mustShiftForward || index2 < this.index && (sortingOffset.left + windowScrollDelta.left - offset.width <= edgeOffset.left && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height || sortingOffset.top + windowScrollDelta.top + offset.height <= edgeOffset.top)) {
                translate.x = this.width + this.marginOffset.x;
                if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width) {
                  if (nextNode) {
                    translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                    translate.y = nextNode.edgeOffset.top - edgeOffset.top;
                  }
                }
                if (this.newIndex === null) {
                  this.newIndex = index2;
                }
              } else if (mustShiftBackward || index2 > this.index && (sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top || sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top + height)) {
                translate.x = -(this.width + this.marginOffset.x);
                if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width) {
                  if (prevNode) {
                    translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                    translate.y = prevNode.edgeOffset.top - edgeOffset.top;
                  }
                }
                this.newIndex = index2;
              }
            } else {
              if (mustShiftBackward || index2 > this.index && sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left) {
                translate.x = -(this.width + this.marginOffset.x);
                this.newIndex = index2;
              } else if (mustShiftForward || index2 < this.index && sortingOffset.left + windowScrollDelta.left <= edgeOffset.left + offset.width) {
                translate.x = this.width + this.marginOffset.x;
                if (this.newIndex == null) {
                  this.newIndex = index2;
                }
              }
            }
          } else if (this.axis.y) {
            if (mustShiftBackward || index2 > this.index && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top) {
              translate.y = -(this.height + this.marginOffset.y);
              this.newIndex = index2;
            } else if (mustShiftForward || index2 < this.index && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height) {
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
      value: function getContainer() {
        var getContainer2 = this.props.getContainer;
        if (typeof getContainer2 !== "function") {
          return findDOMNode(this);
        }
        return getContainer2(config.withRef ? this.getWrappedInstance() : void 0);
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? this.wrappedInstance : null;
        return createElement(SortableContext.Provider, {
          value: this.sortableContextValue
        }, createElement(WrappedComponent, _extends({
          ref
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
      var _this;
      _classCallCheck(this, WithSortableElement);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithSortableElement)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _defineProperty$1(_assertThisInitialized(_assertThisInitialized(_this)), "wrappedInstance", createRef());
      return _this;
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
      value: function register() {
        var _this$props = this.props, collection = _this$props.collection, disabled = _this$props.disabled, index2 = _this$props.index;
        var node = findDOMNode(this);
        node.sortableInfo = {
          collection,
          disabled,
          index: index2,
          manager: this.context.manager
        };
        this.node = node;
        this.ref = {
          node
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
      value: function render() {
        var ref = config.withRef ? this.wrappedInstance : null;
        return createElement(WrappedComponent, _extends({
          ref
        }, omit(this.props, omittedProps$1)));
      }
    }]);
    return WithSortableElement;
  }(Component), _defineProperty$1(_class, "displayName", provideDisplayName("sortableElement", WrappedComponent)), _defineProperty$1(_class, "contextType", SortableContext), _defineProperty$1(_class, "propTypes", propTypes$1), _defineProperty$1(_class, "defaultProps", {
    collection: 0
  }), _temp;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
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
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
    return generator._invoke = function(innerFn2, self3, context2) {
      var state = "suspendedStart";
      return function(method, arg) {
        if ("executing" === state)
          throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method)
            throw arg;
          return doneResult();
        }
        for (context2.method = method, context2.arg = arg; ; ) {
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
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
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
    this._invoke = function(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (void 0 === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method))
          return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
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
  function Context(tryLocsList) {
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
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
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
  }), exports.keys = function(object) {
    var keys = [];
    for (var key in object)
      keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object)
          return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
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
    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
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
var getRegisterNode = function getRegisterNode2(registerNodes, type) {
  return registerNodes.find(function(node) {
    return type && node.type === type;
  });
};
var getIsStartNode = function getIsStartNode2(registerNodes, type) {
  var _registerNodes$find;
  return (_registerNodes$find = registerNodes.find(function(item) {
    return item.type === type;
  })) === null || _registerNodes$find === void 0 ? void 0 : _registerNodes$find.isStart;
};
var getIsEndNode = function getIsEndNode2(registerNodes, type) {
  var _registerNodes$find2;
  return (_registerNodes$find2 = registerNodes.find(function(item) {
    return item.type === type;
  })) === null || _registerNodes$find2 === void 0 ? void 0 : _registerNodes$find2.isEnd;
};
var getIsLoopNode = function getIsLoopNode2(registerNodes, type) {
  var _registerNodes$find3;
  return (_registerNodes$find3 = registerNodes.find(function(item) {
    return item.type === type;
  })) === null || _registerNodes$find3 === void 0 ? void 0 : _registerNodes$find3.isLoop;
};
var getIsConditionNode = function getIsConditionNode2(registerNodes, type) {
  var conditionNode = getRegisterNode(registerNodes, type);
  var branchNode = registerNodes.find(function(item) {
    return type && item.conditionNodeType === type;
  });
  return conditionNode && branchNode && (branchNode === null || branchNode === void 0 ? void 0 : branchNode.type) !== (branchNode === null || branchNode === void 0 ? void 0 : branchNode.conditionNodeType);
};
var getIsBranchNode = function getIsBranchNode2(registerNodes, type) {
  var branchNode = getRegisterNode(registerNodes, type);
  var conditionNode = getRegisterNode(registerNodes, branchNode === null || branchNode === void 0 ? void 0 : branchNode.conditionNodeType);
  return branchNode && conditionNode && (branchNode === null || branchNode === void 0 ? void 0 : branchNode.type) !== (branchNode === null || branchNode === void 0 ? void 0 : branchNode.conditionNodeType);
};
var getAbstractNodeType = function getAbstractNodeType2(registerNodes, type) {
  if (getIsStartNode(registerNodes, type)) {
    return "start";
  } else if (getIsEndNode(registerNodes, type)) {
    return "end";
  } else if (getIsLoopNode(registerNodes, type)) {
    return "loop";
  } else if (getIsBranchNode(registerNodes, type)) {
    return "branch";
  } else if (getIsConditionNode(registerNodes, type)) {
    return "condition";
  } else {
    return "common";
  }
};
var createNewNode = function createNewNode2(registerNodes, type) {
  var customCreateUuid = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : createUuid;
  var registerNode = getRegisterNode(registerNodes, type);
  if (!registerNode)
    return;
  var isBranchNode = getIsBranchNode(registerNodes, type);
  var isConditionNode = getIsConditionNode(registerNodes, type);
  var isLoopNode = getIsLoopNode(registerNodes, type);
  var initialNodeData = cloneDeep((registerNode === null || registerNode === void 0 ? void 0 : registerNode.initialNodeData) || {});
  var extraProps = isBranchNode ? _objectSpread2({
    children: [createNewNode2(registerNodes, registerNode.conditionNodeType, customCreateUuid), createNewNode2(registerNodes, registerNode.conditionNodeType, customCreateUuid)]
  }, initialNodeData) : isConditionNode || isLoopNode ? _objectSpread2({
    children: []
  }, initialNodeData) : initialNodeData;
  return _objectSpread2({
    id: customCreateUuid(type),
    type: registerNode.type,
    name: registerNode.name
  }, extraProps);
};
var DFS = function DFS2(nodes) {
  var allNodes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var _iterator = _createForOfIteratorHelper(nodes), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var node = _step.value;
      allNodes.push(node);
      if (Array.isArray(node.children)) {
        DFS2(node.children, allNodes);
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
    var node = children[index2];
    node.path = [].concat(_toConsumableArray(parentPath), ["children", String(index2)]);
    if (Array.isArray(node.children) && node.children.length > 0) {
      computeChildrenPath2(node.children, node.path);
    }
  }
};
var computeNodesPath = function computeNodesPath2(nodes) {
  for (var index2 = 0; index2 < nodes.length; index2++) {
    var node = nodes[index2];
    node.path = [String(index2)];
    if (Array.isArray(node.children) && node.children.length > 0) {
      computeChildrenPath(node.children, node.path);
    }
  }
  return nodes;
};
var loadRemoteNode = /* @__PURE__ */ function() {
  var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(params) {
    var url, cssUrl, tasks;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = params.url, cssUrl = params.cssUrl;
            tasks = [url, cssUrl].filter(function(item) {
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
  var history = function history2(type) {
    var latestIndex = type === "undo" ? activeHistoryRecordIndex > 0 ? activeHistoryRecordIndex - 1 : 0 : activeHistoryRecordIndex < historyRecords.length - 1 ? activeHistoryRecordIndex + 1 : historyRecords.length - 1;
    onChange(JSON.parse(JSON.stringify(historyRecords[latestIndex])), type);
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
  var zoom = function zoom2(type) {
    var latestZoom = typeof type === "number" ? type : type === "out" ? zoomValue - zoomStep : zoomValue + zoomStep;
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
    var node = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentNode;
    var registerNode = getRegisterNode(registerNodes, node.type);
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
      node.configuring = true;
      setSelectedNode(node);
      if (typeof registerNode.configTitle === "string") {
        setDrawerTitle(registerNode.configTitle || "");
      } else if (typeof registerNode.configTitle === "function") {
        setDrawerTitle(registerNode.configTitle(node, nodes) || "");
      }
      onChange(_toConsumableArray(nodes), "click-node", node);
    }
  };
  var addNode = function addNode2(_node, _newNodeType) {
    var node = !!_newNodeType ? _node : currentNode;
    var newNodeType = !!_newNodeType ? _newNodeType : _node;
    var registerNode = getRegisterNode(registerNodes, newNodeType);
    var newNode = createNewNode(registerNodes, newNodeType, createUuid3);
    if (!newNode) {
      return;
    }
    if (getIsConditionNode(registerNodes, newNodeType)) {
      node.children = node.children || [];
      node.children.push(newNode);
    } else if (getIsConditionNode(registerNodes, node.type)) {
      node.children = node.children || [];
      node.children.unshift(newNode);
    } else {
      var _node$path, _ref;
      var path = (_node$path = node.path) === null || _node$path === void 0 ? void 0 : _node$path.slice();
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
    var node = currentNode;
    var registerNode = getRegisterNode(registerNodes, newNodeType);
    var newNode = createNewNode(registerNodes, newNodeType, createUuid3);
    if (!newNode) {
      return;
    }
    node.children = node.children || [];
    node.children.unshift(newNode);
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
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = ".flow-builder-default-node {\n  width: 200px;\n  height: 100px;\n  font-weight: 500;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);\n  border-radius: 4px;\n  background-color: #fff;\n}\n";
styleInject(css_248z);
var DefaultDisplayComponent = function DefaultDisplayComponent2(_ref) {
  var node = _ref.node;
  var id = node.id, name = node.name, path = node.path, configuring = node.configuring, data = node.data;
  var borderColor = configuring ? "blue" : "transparent";
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-default-node",
    style: {
      border: "1px solid ".concat(borderColor)
    }
  }, /* @__PURE__ */ React.createElement("div", null, "name: ", (data === null || data === void 0 ? void 0 : data.name) || name), /* @__PURE__ */ React.createElement("div", null, "id: ", id), /* @__PURE__ */ React.createElement("div", null, "path: ", path === null || path === void 0 ? void 0 : path.join(" - ")));
};
var css_248z$1 = ".flow-builder-action-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #ffffff;\n  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.08);\n  cursor: pointer;\n  z-index: 1;\n}\n.flow-builder-action-button img {\n  width: 16px;\n  height: 16px;\n}\n.flow-builder-horizontal .flow-builder-branch-node__add-button,\n.flow-builder-horizontal .flow-builder-sortable-handle {\n  transform: rotate(90deg);\n}\n";
styleInject(css_248z$1);
var ActionButton = function ActionButton2(props) {
  var _props$size = props.size, size = _props$size === void 0 ? 28 : _props$size, icon = props.icon;
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-action-button",
    style: {
      width: "".concat(size, "px"),
      height: "".concat(size, "px"),
      borderRadius: "".concat(size / 2, "px")
    }
  }, /* @__PURE__ */ React.createElement("img", {
    src: icon
  }));
};
var SplitLine = function SplitLine2(props) {
  var _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, style = props.style;
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, spaceX = _useContext.spaceX, spaceY = _useContext.spaceY, layout = _useContext.layout;
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-line__split ".concat(className),
    style: _objectSpread2({
      backgroundColor: lineColor,
      width: "".concat(layout === "vertical" ? 2 : spaceX, "px"),
      height: "".concat(layout === "vertical" ? spaceY : 2, "px")
    }, style)
  });
};
var FillLine = function FillLine2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, layout = _useContext.layout;
  return /* @__PURE__ */ React.createElement("div", {
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
  return /* @__PURE__ */ React.createElement("div", {
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
  return /* @__PURE__ */ React.createElement("div", {
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
  var node = useContext(NodeContext);
  var _useAction = useAction(), addNode = _useAction.addNode, addNodeInLoop = _useAction.addNodeInLoop;
  var handleAdd = inLoop ? addNodeInLoop : addNode;
  var _useState = useState(false), _useState2 = _slicedToArray(_useState, 2), visible = _useState2[0], setVisible = _useState2[1];
  var registerNode = getRegisterNode(registerNodes, node.type);
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
  var addableOptions = AddableComponent ? /* @__PURE__ */ React.createElement(AddableComponent, {
    node,
    nodes,
    add: handleAddNode
  }) : /* @__PURE__ */ React.createElement(React.Fragment, null, options.map(function(item) {
    var registerNode2 = getRegisterNode(registerNodes, item.type);
    var defaultIcon = getIsBranchNode(registerNodes, item.type) ? AddBranchIcon : AddNormalIcon;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flow-builder-addable-node-item",
      key: item.type,
      onClick: function onClick() {
        return handleAddNode(item.type);
      }
    }, /* @__PURE__ */ React.createElement("span", {
      className: "flow-builder-addable-node-icon"
    }, (registerNode2 === null || registerNode2 === void 0 ? void 0 : registerNode2.addIcon) || /* @__PURE__ */ React.createElement("img", {
      src: defaultIcon
    })), /* @__PURE__ */ React.createElement("span", null, item.name));
  }));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SplitLine, null), !readonly && options.length > 0 ? droppable ? /* @__PURE__ */ React.createElement(DropComponent, {
    onDrop: handleDrop
  }) : PopoverComponent2 ? /* @__PURE__ */ React.createElement(PopoverComponent2, {
    visible,
    onVisibleChange: setVisible,
    overlayClassName: "flow-builder-addable-nodes",
    placement: "rightTop",
    trigger: "click",
    content: addableOptions,
    getPopupContainer: function getPopupContainer(triggerNode) {
      return triggerNode;
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-add-btn"
  }, /* @__PURE__ */ React.createElement(ActionButton, {
    icon: AddIcon
  }))) : null : null, /* @__PURE__ */ React.createElement(SplitLine, null));
};
var StartNode = function StartNode2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, allowStartConfig = _useContext.allowStartConfig;
  var node = useContext(NodeContext);
  var registerNode = getRegisterNode(registerNodes, node.type);
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
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node flow-builder-start-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React.createElement(Component2, {
    node,
    nodes
  })), /* @__PURE__ */ React.createElement(AddNodeButton, null));
};
var css_248z$5 = ".flow-builder-arrow {\n  display: inline-flex;\n}\n.flow-builder-loop-node__content > .flow-builder-arrow {\n  position: absolute;\n}\n.flow-builder-vertical .flow-builder-loop-node__content > .flow-builder-arrow {\n  transform: rotate(180deg);\n  top: 2px;\n  left: -9px;\n}\n.flow-builder-horizontal .flow-builder-arrow {\n  transform: rotate(-90deg);\n}\n.flow-builder-horizontal .flow-builder-loop-node__content > .flow-builder-arrow {\n  transform: rotate(90deg);\n  bottom: -9px;\n  left: 2px;\n}\n";
styleInject(css_248z$5);
var Arrow = function Arrow2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor, backgroundColor = _useContext.backgroundColor, showArrow = _useContext.showArrow, arrowIcon = _useContext.arrowIcon;
  return showArrow ? /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-arrow",
    style: {
      backgroundColor
    }
  }, arrowIcon || /* @__PURE__ */ React.createElement("svg", {
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z",
    fill: lineColor
  }))) : null;
};
var EndNode = function EndNode2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, allowEndConfig = _useContext.allowEndConfig;
  var node = useContext(NodeContext);
  var registerNode = getRegisterNode(registerNodes, node.type);
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
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node flow-builder-end-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React.createElement(Arrow, null), /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React.createElement(Component2, {
    node,
    nodes
  })));
};
var RemoveIcon = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2048%2048%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%3E%3Cg%3E%3Crect%20fill-opacity%3D%220.01%22%20fill%3D%22%23FFFFFF%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2248%22%20height%3D%2248%22%20stroke-width%3D%224%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3Ccircle%20stroke%3D%22%23ff5d3b%22%20stroke-width%3D%224%22%20fill%3D%22%23ff5d3b%22%20fill-rule%3D%22nonzero%22%20stroke-linejoin%3D%22round%22%20cx%3D%2224%22%20cy%3D%2224%22%20r%3D%2220%22%2F%3E%3Cpath%20d%3D%22M24%2C16%20L24%2C32%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate%2824.000000%2C%2024.000000%29%20scale%28-1%2C%201%29%20rotate%28-45.000000%29%20translate%28-24.000000%2C%20-24.000000%29%20%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3Cpath%20d%3D%22M24%2C16%20L24%2C32%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate%2824.000000%2C%2024.000000%29%20rotate%28-45.000000%29%20translate%28-24.000000%2C%20-24.000000%29%20%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
var css_248z$6 = ".flow-builder-node .flow-builder-node__remove {\n  position: absolute;\n  top: -9px;\n  right: -9px;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.flow-builder-node .flow-builder-node__remove:hover {\n  opacity: 1;\n}\n.flow-builder-node .flow-builder-node__content-wrap:hover .flow-builder-node__remove,\n.flow-builder-node .flow-builder-node__content:hover .flow-builder-node__remove,\n.flow-builder-node .flow-builder-node__content-wrap:hover .flow-builder-sortable-handle,\n.flow-builder-node .flow-builder-node__content:hover .flow-builder-sortable-handle {\n  opacity: 1;\n}\n";
styleInject(css_248z$6);
var RemoveButton = function RemoveButton2() {
  var _useContext = useContext(BuilderContext), registerNodes = _useContext.registerNodes, readonly = _useContext.readonly, PopconfirmComponent2 = _useContext.PopconfirmComponent, onRemoveNodeSuccess = _useContext.onRemoveNodeSuccess;
  var node = useContext(NodeContext);
  var _useAction = useAction(), removeNode = _useAction.removeNode;
  var registerNode = getRegisterNode(registerNodes, node.type);
  return !readonly && !(registerNode === null || registerNode === void 0 ? void 0 : registerNode.customRemove) && PopconfirmComponent2 ? /* @__PURE__ */ React.createElement(PopconfirmComponent2, {
    title: (registerNode === null || registerNode === void 0 ? void 0 : registerNode.removeConfirmTitle) || "Are you sure to remove this node?",
    onConfirm: function onConfirm() {
      removeNode();
      onRemoveNodeSuccess === null || onRemoveNodeSuccess === void 0 ? void 0 : onRemoveNodeSuccess(node);
    },
    getPopupContainer: function getPopupContainer(triggerNode) {
      return triggerNode.parentNode;
    }
  }, /* @__PURE__ */ React.createElement("img", {
    className: "flow-builder-node__remove",
    src: RemoveIcon
  })) : null;
};
var CommonNode = function CommonNode2() {
  var _useContext = useContext(BuilderContext), readonly = _useContext.readonly, registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick;
  var node = useContext(NodeContext);
  var _useAction = useAction(), clickNode = _useAction.clickNode, removeNode = _useAction.removeNode;
  var registerNode = getRegisterNode(registerNodes, node.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React.createElement(Arrow, null), /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React.createElement(Component2, {
    readonly,
    node,
    nodes,
    remove: removeNode
  })), /* @__PURE__ */ React.createElement(RemoveButton, null)), /* @__PURE__ */ React.createElement(AddNodeButton, null));
};
var AddConditionIcon = "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23clip0%29%22%3E%3Cpath%20d%3D%22M5%208C5%206.89543%204.10457%206%203%206C1.89543%206%201%206.89543%201%208C1%209.10457%201.89543%2010%203%2010C4.10457%2010%205%209.10457%205%208Z%22%20fill%3D%22%23333333%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M15%208C15%206.89543%2014.1046%206%2013%206C11.8954%206%2011%206.89543%2011%208C11%209.10457%2011.8954%2010%2013%2010C14.1046%2010%2015%209.10457%2015%208Z%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M4.5%208L11%208%22%20stroke%3D%22%23333333%22%20stroke-width%3D%221.3333%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0%22%3E%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20transform%3D%22translate%280%2016%29%20rotate%28-90%29%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
var ConditionsDashed = function ConditionsDashed2() {
  var _useContext = useContext(BuilderContext), lineColor = _useContext.lineColor;
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-branch-node__dashed",
    style: {
      border: "2px dashed ".concat(lineColor)
    }
  });
};
var SortingDashed = function SortingDashed2() {
  var _useContext2 = useContext(BuilderContext), lineColor = _useContext2.lineColor;
  return /* @__PURE__ */ React.createElement("div", {
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
  var node = useContext(NodeContext);
  var _useAction = useAction(), addNode = _useAction.addNode, removeNode = _useAction.removeNode, clickNode = _useAction.clickNode;
  var children = node.children;
  var registerNode = getRegisterNode(registerNodes, node.type);
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
              return beforeAddConditionNode === null || beforeAddConditionNode === void 0 ? void 0 : beforeAddConditionNode(node);
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
              return beforeAddConditionNode === null || beforeAddConditionNode === void 0 ? void 0 : beforeAddConditionNode(node);
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
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node flow-builder-branch-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React.createElement(Arrow, null), ((_registerNode$showPra = registerNode === null || registerNode === void 0 ? void 0 : registerNode.showPracticalBranchNode) !== null && _registerNode$showPra !== void 0 ? _registerNode$showPra : showPracticalBranchNode) ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React.createElement(Component2, {
    readonly,
    node,
    nodes,
    remove: removeNode
  })), ((_registerNode$showPra2 = registerNode === null || registerNode === void 0 ? void 0 : registerNode.showPracticalBranchRemove) !== null && _registerNode$showPra2 !== void 0 ? _registerNode$showPra2 : showPracticalBranchRemove) ? /* @__PURE__ */ React.createElement(RemoveButton, null) : null), /* @__PURE__ */ React.createElement(SplitLine, null)) : null, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-branch-node__content"
  }, !readonly && !disabled ? /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-branch-node__add-button",
    onClick: function onClick() {
      handleAddCondition();
    }
  }, droppable ? /* @__PURE__ */ React.createElement(DropComponent, {
    onDrop: handleDrop
  }) : (registerNode === null || registerNode === void 0 ? void 0 : registerNode.addConditionIcon) || /* @__PURE__ */ React.createElement(ActionButton, {
    size: 20,
    icon: AddConditionIcon
  })) : /* @__PURE__ */ React.createElement(SplitLine, {
    className: "branch-add-disabled",
    style: _defineProperty({}, layout === "vertical" ? "top" : "left", layout === "vertical" ? "".concat(-spaceY, "px") : "".concat(-spaceX, "px"))
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-branch-node__conditions"
  }, conditionCount === 1 ? /* @__PURE__ */ React.createElement(ConditionsDashed, null) : null, children === null || children === void 0 ? void 0 : children.map(function(branch, index2) {
    var _node$path;
    return sortable ? /* @__PURE__ */ React.createElement(SortableItem, {
      key: branch.id,
      index: index2,
      collection: (_node$path = node.path) === null || _node$path === void 0 ? void 0 : _node$path.join(","),
      branch,
      branchIndex: index2,
      renderConditionNode
    }) : renderConditionNode({
      node: branch,
      nodeIndex: index2,
      parentNode: node
    });
  })), sortable ? /* @__PURE__ */ React.createElement(SortingDashed, null) : null), /* @__PURE__ */ React.createElement(AddNodeButton, null));
};
var ConditionNode = function ConditionNode2(props) {
  var parentNode = props.parentNode, conditionIndex = props.conditionIndex, renderNext = props.renderNext;
  var _useContext = useContext(BuilderContext), layout = _useContext.layout, spaceX = _useContext.spaceX, spaceY = _useContext.spaceY, readonly = _useContext.readonly, registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, sortable = _useContext.sortable, sortableAnchor = _useContext.sortableAnchor;
  var node = useContext(NodeContext);
  var _useAction = useAction(), clickNode = _useAction.clickNode, removeNode = _useAction.removeNode;
  var conditionCount = Array.isArray(parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) ? (parentNode === null || parentNode === void 0 ? void 0 : parentNode.children.length) || 0 : 0;
  var registerNode = getRegisterNode(registerNodes, node.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var ConditionDragHandle = useMemo(function() {
    return sortableHandle(function() {
      return /* @__PURE__ */ React.createElement("span", {
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
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node);
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node flow-builder-condition-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || ""),
    style: {
      padding: layout === "vertical" ? "0 ".concat(spaceX, "px") : "".concat(spaceY, "px 0")
    }
  }, conditionCount > 1 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CoverLine, {
    full: conditionIndex !== 0 && conditionIndex !== conditionCount - 1,
    className: "cover-condition-start ".concat(coverIndexClassName)
  }), /* @__PURE__ */ React.createElement(CoverLine, {
    full: conditionIndex !== 0 && conditionIndex !== conditionCount - 1,
    className: "cover-condition-end ".concat(coverIndexClassName)
  })) : null, /* @__PURE__ */ React.createElement(SplitLine, null), /* @__PURE__ */ React.createElement(Arrow, null), /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React.createElement(Component2, {
    readonly,
    node,
    nodes,
    remove: removeNode
  })), /* @__PURE__ */ React.createElement(RemoveButton, null), sortable ? /* @__PURE__ */ React.createElement(ConditionDragHandle, null) : null), /* @__PURE__ */ React.createElement(AddNodeButton, null), Array.isArray(node.children) ? renderNext({
    nodes: node.children,
    parentNode: node
  }) : null, /* @__PURE__ */ React.createElement(FillLine, null));
};
var LoopNode = function LoopNode2(props) {
  var renderNext = props.renderNext;
  var ref = useRef(null);
  var _useContext = useContext(BuilderContext), readonly = _useContext.readonly, registerNodes = _useContext.registerNodes, nodes = _useContext.nodes, beforeNodeClick = _useContext.beforeNodeClick, layout = _useContext.layout, spaceX = _useContext.spaceX, spaceY = _useContext.spaceY, lineColor = _useContext.lineColor;
  var node = useContext(NodeContext);
  var _useAction = useAction(), clickNode = _useAction.clickNode, removeNode = _useAction.removeNode;
  var registerNode = getRegisterNode(registerNodes, node.type);
  var Component2 = (registerNode === null || registerNode === void 0 ? void 0 : registerNode.displayComponent) || DefaultDisplayComponent;
  var handleNodeClick = /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return beforeNodeClick === null || beforeNodeClick === void 0 ? void 0 : beforeNodeClick(node);
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
    if (!ref.current)
      return;
    if (layout === "vertical") {
      var _ref$current, _ref$current$parentNo;
      var defaultSpaceX = spaceX;
      var loopContentWidth = ref.current.clientWidth;
      ref.current.style.marginRight = "-".concat(loopContentWidth, "px");
      var parentDom = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$parentNo = _ref$current.parentNode) === null || _ref$current$parentNo === void 0 ? void 0 : _ref$current$parentNo.parentNode;
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
      var loopContentHeight = ref.current.clientHeight;
      ref.current.style.marginTop = "-".concat(loopContentHeight, "px");
      var _parentDom = (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$parentN = _ref$current2.parentNode) === null || _ref$current2$parentN === void 0 ? void 0 : _ref$current2$parentN.parentNode;
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node flow-builder-loop-node ".concat((registerNode === null || registerNode === void 0 ? void 0 : registerNode.className) || "")
  }, /* @__PURE__ */ React.createElement(Arrow, null), /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content-wrap"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-node__content",
    onClick: handleNodeClick
  }, /* @__PURE__ */ React.createElement(Component2, {
    readonly,
    node,
    nodes,
    remove: removeNode
  })), /* @__PURE__ */ React.createElement(RemoveButton, null)), /* @__PURE__ */ React.createElement(SplitLine, null), /* @__PURE__ */ React.createElement("div", {
    ref,
    className: "flow-builder-loop-node__content",
    style: _defineProperty({
      padding: layout === "vertical" ? "0 ".concat(spaceX, "px") : "".concat(spaceY, "px 0")
    }, layout === "vertical" ? "borderLeft" : "borderBottom", "2px solid ".concat(lineColor))
  }, /* @__PURE__ */ React.createElement(Arrow, null), /* @__PURE__ */ React.createElement(CoverLine, {
    className: "cover-loop-start"
  }), /* @__PURE__ */ React.createElement(CoverLine, {
    className: "cover-loop-end"
  }), /* @__PURE__ */ React.createElement(AddNodeButton, {
    inLoop: true
  }), Array.isArray(node.children) ? renderNext({
    nodes: node.children,
    parentNode: node
  }) : null), /* @__PURE__ */ React.createElement(AddNodeButton, null));
};
var css_248z$7 = ".flow-builder-node,\n.flow-builder-node__content-wrap,\n.flow-builder-node__content,\n.flow-builder-branch-node__content,\n.flow-builder-loop-node__content {\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n.flow-builder-loop-node__content {\n  z-index: 5;\n}\n.flow-builder-node__content-wrap,\n.flow-builder-node__content {\n  cursor: pointer;\n}\n.flow-builder-branch-node__add-button {\n  position: absolute;\n  cursor: pointer;\n  z-index: 1;\n}\n.flow-builder-branch-node__add-button .flow-builder-drop-button {\n  width: 20px;\n  height: 20px;\n}\n.flow-builder-branch-node .branch-add-disabled {\n  position: absolute;\n}\n.flow-builder-branch-node__conditions {\n  display: flex;\n}\n.flow-builder-branch-node__dashed,\n.flow-builder-branch-node__sorting__dashed {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.flow-builder-branch-node__sorting__dashed {\n  display: none;\n}\n.flow-builder-vertical {\n  margin: 0 auto;\n  flex-direction: column;\n}\n.flow-builder-vertical .flow-builder-node,\n.flow-builder-vertical .flow-builder-node__content-wrap,\n.flow-builder-vertical .flow-builder-node__content,\n.flow-builder-vertical .flow-builder-branch-node__content,\n.flow-builder-vertical .flow-builder-loop-node__content {\n  flex-direction: column;\n}\n.flow-builder-vertical .flow-builder-start-node {\n  padding-top: 16px;\n}\n.flow-builder-vertical .flow-builder-end-node {\n  padding-bottom: 16px;\n}\n.flow-builder-vertical .flow-builder-branch-node .flow-builder-branch-node__content {\n  margin-top: 10px;\n}\n.flow-builder-vertical .flow-builder-branch-node__add-button {\n  top: -10px;\n}\n.flow-builder-vertical .flow-builder-branch-node__conditions {\n  flex-direction: row;\n}\n.flow-builder-horizontal {\n  margin: auto 0;\n  flex-direction: row;\n}\n.flow-builder-horizontal .flow-builder-node,\n.flow-builder-horizontal .flow-builder-node__content-wrap,\n.flow-builder-horizontal .flow-builder-node__content,\n.flow-builder-horizontal .flow-builder-branch-node__content {\n  flex-direction: row;\n}\n.flow-builder-horizontal .flow-builder-start-node {\n  padding-left: 16px;\n}\n.flow-builder-horizontal .flow-builder-end-node {\n  padding-right: 16px;\n}\n.flow-builder-horizontal .flow-builder-branch-node .flow-builder-branch-node__content {\n  margin-left: 10px;\n}\n.flow-builder-horizontal .flow-builder-branch-node__add-button {\n  left: -10px;\n}\n.flow-builder-horizontal .flow-builder-branch-node__conditions {\n  flex-direction: column;\n}\n.flow-builder-sortable-handle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  cursor: move;\n  opacity: 0;\n  position: absolute;\n}\n";
styleInject(css_248z$7);
var ZoomTool = function ZoomTool2() {
  var _useContext = useContext(BuilderContext), zoomTool = _useContext.zoomTool, zoomValue = _useContext.zoomValue;
  var _useZoom = useZoom(), minZoom = _useZoom.minZoom, maxZoom = _useZoom.maxZoom, zoom = _useZoom.zoom;
  var showZoom = Object.prototype.toString.call(zoomTool) === "[object Object]" ? !zoomTool.hidden : !!zoomTool;
  var minDisabled = zoomValue === minZoom;
  var maxDisabled = zoomValue === maxZoom;
  return showZoom ? /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-zoom-tool"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flow-builder-tool-btn ".concat(minDisabled ? "flow-builder-tool-btn-disabled" : ""),
    disabled: minDisabled,
    onClick: function onClick() {
      return zoom("out");
    }
  }, "-"), /* @__PURE__ */ React.createElement("span", {
    className: "flow-builder-zoom-tool__number"
  }, zoomValue + "%"), /* @__PURE__ */ React.createElement("button", {
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
  return showHistory ? /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-undo-redo-tool"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flow-builder-tool-btn ".concat(undoDisabled ? "flow-builder-tool-btn-disabled" : ""),
    disabled: undoDisabled,
    onClick: function onClick() {
      return history("undo");
    }
  }, "<"), /* @__PURE__ */ React.createElement("button", {
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
  var handleDragStart = function handleDragStart2(type) {
    setDragType(type);
  };
  var handleDragEnd = function handleDragEnd2() {
    setDragType("");
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-drag-panel",
    style: {
      border: "1px solid ".concat(lineColor)
    }
  }, /* @__PURE__ */ React.createElement("ul", null, registerNodes.filter(function(item) {
    return !(item.isStart || item.isEnd);
  }).map(function(item) {
    var registerNode = getRegisterNode(registerNodes, item.type);
    var defaultIcon = getIsBranchNode(registerNodes, item.type) ? AddBranchIcon : getIsConditionNode(registerNodes, item.type) ? AddConditionIcon : AddNormalIcon;
    return /* @__PURE__ */ React.createElement("li", {
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
    }, /* @__PURE__ */ React.createElement("span", {
      className: "flow-builder-drag-node-icon"
    }, (registerNode === null || registerNode === void 0 ? void 0 : registerNode.addIcon) || /* @__PURE__ */ React.createElement("img", {
      src: defaultIcon,
      draggable: false
    })), /* @__PURE__ */ React.createElement("span", null, item.name));
  })));
};
var css_248z$9 = ".flow-builder-wrap {\n  position: relative;\n  height: 100%;\n  display: flex;\n}\n.flow-builder-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n.flow-builder {\n  display: flex;\n  align-items: center;\n}\n.flow-builder-tool {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: #fff !important;\n  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);\n}\n.flow-builder-zoom-tool {\n  width: 120px;\n  display: inline-flex;\n  align-items: center;\n}\n.flow-builder-zoom-tool__number {\n  flex: 1;\n  text-align: center;\n}\n.flow-builder-undo-redo-tool {\n  width: 80px;\n  display: inline-flex;\n  align-items: center;\n}\n.flow-builder-tool-btn {\n  cursor: pointer;\n  border: none;\n  background: none;\n  padding: 0;\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 32px;\n}\n.flow-builder-tool-btn:hover {\n  color: #40a9ff;\n}\n.flow-builder-tool-btn-disabled {\n  cursor: not-allowed;\n  color: rgba(0, 0, 0, 0.25);\n}\n.flow-builder-tool-btn-disabled:hover {\n  color: rgba(0, 0, 0, 0.25);\n}\n";
styleInject(css_248z$9);
var Builder = /* @__PURE__ */ forwardRef(function(props, ref) {
  var builderContext = useContext(BuilderContext);
  var _builderContext$class = builderContext.className, className = _builderContext$class === void 0 ? "" : _builderContext$class, backgroundColor = builderContext.backgroundColor, layout = builderContext.layout, drawerProps = builderContext.drawerProps, registerNodes = builderContext.registerNodes, nodes = builderContext.nodes, onChange = builderContext.onChange, zoomValue = builderContext.zoomValue, onZoomChange = builderContext.onZoomChange, historyRecords = builderContext.historyRecords, activeHistoryRecordIndex = builderContext.activeHistoryRecordIndex, onHistoryChange = builderContext.onHistoryChange, selectedNode = builderContext.selectedNode, drawerTitle = builderContext.drawerTitle, draggable = builderContext.draggable, _builderContext$DragC = builderContext.DragComponent, DragComponent = _builderContext$DragC === void 0 ? DragPanel : _builderContext$DragC, setDragType = builderContext.setDragType, DrawerComponent2 = builderContext.DrawerComponent, createUuid3 = builderContext.createUuid;
  var _useZoom = useZoom(), minZoom = _useZoom.minZoom, maxZoom = _useZoom.maxZoom, zoom = _useZoom.zoom;
  var _useHistory = useHistory(), pushHistory = _useHistory.pushHistory, history = _useHistory.history;
  var _useAction = useAction(), addNode = _useAction.addNode, removeNode = _useAction.removeNode;
  var _useDrawer = useDrawer(), closeDrawer = _useDrawer.closeDrawer, saveDrawer = _useDrawer.saveDrawer;
  var _useState = useState(false), _useState2 = _slicedToArray(_useState, 2), hasMounted = _useState2[0], setHasMounted = _useState2[1];
  var ConfigComponent = useMemo(function() {
    var _getRegisterNode;
    return (_getRegisterNode = getRegisterNode(registerNodes, selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.type)) === null || _getRegisterNode === void 0 ? void 0 : _getRegisterNode.configComponent;
  }, [registerNodes, selectedNode]);
  var configComponentRef = useRef();
  var renderNode = function renderNode2(_ref) {
    var node = _ref.node, nodeIndex = _ref.nodeIndex, parentNode = _ref.parentNode;
    var id = node.id, type = node.type;
    var abstractNodeType = getAbstractNodeType(registerNodes, type);
    var renderAbstractNode = function renderAbstractNode2() {
      switch (abstractNodeType) {
        case "start":
          return /* @__PURE__ */ React.createElement(StartNode, null);
        case "end":
          return /* @__PURE__ */ React.createElement(EndNode, null);
        case "branch":
          return /* @__PURE__ */ React.createElement(BranchNode, {
            renderConditionNode: renderNode2
          });
        case "condition":
          return /* @__PURE__ */ React.createElement(ConditionNode, {
            parentNode,
            conditionIndex: nodeIndex,
            renderNext: render
          });
        case "loop":
          return /* @__PURE__ */ React.createElement(LoopNode, {
            renderNext: render
          });
        default:
          return /* @__PURE__ */ React.createElement(CommonNode, null);
      }
    };
    return /* @__PURE__ */ React.createElement(NodeContext.Provider, {
      key: id,
      value: node
    }, renderAbstractNode());
  };
  var render = function render2(_ref2) {
    var nodes2 = _ref2.nodes, parentNode = _ref2.parentNode;
    return nodes2.map(function(node, index2) {
      return renderNode({
        node,
        nodeIndex: index2,
        parentNode
      });
    });
  };
  var renderZoomTool = /* @__PURE__ */ React.createElement(ZoomTool, null);
  var renderHistoryTool = /* @__PURE__ */ React.createElement(HistoryTool, null);
  useImperativeHandle(ref, function() {
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-wrap ".concat(className)
  }, renderHistoryTool || renderZoomTool ? /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-tool"
  }, renderHistoryTool, renderZoomTool) : null, draggable ? /* @__PURE__ */ React.createElement(DragComponent, {
    onDragStart: setDragType,
    onDragEnd: function onDragEnd() {
      return setDragType("");
    }
  }) : null, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder-content",
    style: {
      backgroundColor
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flow-builder flow-builder-".concat(layout),
    style: {
      zoom: "".concat(zoomValue, "%")
    }
  }, render({
    nodes
  }))), DrawerComponent2 ? /* @__PURE__ */ React.createElement(DrawerComponent2, _objectSpread2(_objectSpread2({
    title: drawerTitle || "Configuration",
    width: 480,
    destroyOnClose: true,
    maskClosable: false,
    visible: !!selectedNode,
    onClose: closeDrawer
  }, drawerProps), {}, {
    configComponentRef
  }), ConfigComponent && selectedNode ? /* @__PURE__ */ React.createElement(ConfigComponent, {
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
  return /* @__PURE__ */ React.createElement(Builder, {
    ref: props.builderRef
  });
});
var FlowBuilder$1 = /* @__PURE__ */ forwardRef(function(props, ref) {
  var zoomTool = props.zoomTool, nodes = props.nodes, onChange = props.onChange, sortable = props.sortable;
  var _useState = useState((zoomTool === null || zoomTool === void 0 ? void 0 : zoomTool.initialValue) || 100), _useState2 = _slicedToArray(_useState, 2), zoomValue = _useState2[0], setZoomValue = _useState2[1];
  var _useState3 = useState([]), _useState4 = _slicedToArray(_useState3, 2), historyRecords = _useState4[0], setHistoryRecords = _useState4[1];
  var _useState5 = useState(-1), _useState6 = _slicedToArray(_useState5, 2), activeHistoryRecordIndex = _useState6[0], setActiveHistoryRecordIndex = _useState6[1];
  var _useState7 = useState(), _useState8 = _slicedToArray(_useState7, 2), selectedNode = _useState8[0], setSelectedNode = _useState8[1];
  var _useState9 = useState(""), _useState10 = _slicedToArray(_useState9, 2), drawerTitle = _useState10[0], setDrawerTitle = _useState10[1];
  var _useState11 = useState(""), _useState12 = _slicedToArray(_useState11, 2), dragType = _useState12[0], setDragType = _useState12[1];
  var _useState13 = useState(props.registerNodes || []), _useState14 = _slicedToArray(_useState13, 2), registerNodes = _useState14[0], setRegisterNodes = _useState14[1];
  var defaultProps2 = useMemo(function() {
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
  var handleChange = function handleChange2(nodes2, changeEvent, node) {
    computeNodesPath(nodes2);
    onChange(nodes2, changeEvent, node);
  };
  var handleSortStart = function handleSortStart2(params) {
    var _node$parentNode;
    var node = params.node;
    (_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.parentNode.classList.add(conditionSortingClassName);
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
  return /* @__PURE__ */ React.createElement(BuilderContext.Provider, {
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
  }, sortable ? /* @__PURE__ */ React.createElement(SortableBuilder, {
    helperClass: "flow-builder-".concat(layout, " flow-builder-condition-node__sorting"),
    axis: layout === "vertical" ? "x" : "y",
    useDragHandle: true,
    onSortStart: handleSortStart,
    onSortEnd: handleSortEnd,
    builderRef: ref
  }) : /* @__PURE__ */ React.createElement(Builder, {
    ref
  }));
});
const index = "";
const flowModelRegistry = {};
function registerFlowModel(flowModel, nodeModels) {
  flowModelRegistry[flowModel] = nodeModels;
}
function getFlowModel(flowModel) {
  return flowModelRegistry[flowModel];
}
const DrawerComponent = (props) => {
  const { visible, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(Drawer, { open: visible, ...restProps, children });
};
const PopoverComponent = (props) => {
  const { visible, onVisibleChange, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(Popover, { open: visible, onOpenChange: onVisibleChange, ...restProps, children });
};
const PopconfirmComponent = (props) => {
  const { children, ...restProps } = props;
  return /* @__PURE__ */ jsx(Popconfirm, { ...restProps, children });
};
function FlowBuilder(props) {
  var _a;
  const [nodes, setNodes] = useState(((_a = props.graphDiagram) == null ? void 0 : _a.nodes) || []);
  const renderContext = useContext(RenderContextKey);
  const { onEvent } = renderContext;
  const nodeModels = getFlowModel(props.flowModel);
  if (!nodeModels)
    throw new Error("nop.err.unknown-flow-model:" + props.flowModel);
  const handleChange = (nodes2, event, node) => {
    console.log("nodes change", nodes2, "event=", event);
    setNodes(nodes2);
    if (onEvent) {
      if (event == "click-node") {
        onEvent("designer:selectElement", { groupName: "steps", elementType: "step", elementId: node.id }, props);
      } else if (event == "remove-node") {
        onEvent("designer:removeElement", { groupName: "steps", elementType: "step", elementId: node.id }, props);
      }
      onEvent("designer:graphChange", { nodes: nodes2 }, props);
    }
  };
  return /* @__PURE__ */ jsx(
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
export {
  FlowBuilder,
  NodeContext,
  getFlowModel,
  registerFlowModel
};
