import { shallowRef, toRaw, ref, defineComponent, onMounted, onUnmounted, watchEffect, onBeforeUnmount, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot, provide, watch, createBlock, resolveDynamicComponent, withCtx, Fragment, normalizeClass, createCommentVNode, reactive, toRef, createVNode, h, inject, normalizeStyle, createElementVNode, toDisplayString, useSlots, Teleport, Transition, withDirectives, createSlots, vShow, warn as warn$1, nextTick, Text, getCurrentInstance, createTextVNode, createApp, Comment, isRef, onScopeDispose, readonly, normalizeProps, guardReactiveProps, resolveComponent, getCurrentScope } from "vue";
import axios from "axios";
import { isObject as isObject$3, isArray as isArray$8, isPromise, isString as isString$2, isPlainObject as isPlainObject$1, hasOwn as hasOwn$2, NOOP, isFunction as isFunction$2, camelize } from "@vue/shared";
import { noop, themeable, localeable, uncontrollable, FormItem, autobind, createObject, resolveVariableAndFilter } from "amis-core";
import React, { forwardRef, createElement, Fragment as Fragment$1, Component, version } from "react";
import { PickerContainer, ResultBox } from "amis-ui";
import { ScopedContext, Renderer, FormItem as FormItem$1, clearStoresCache, setDefaultLocale, render, ToastComponent, toast, alert as alert$1, confirm } from "amis";
import ReactDOM, { createPortal } from "react-dom";
import { computed as computed$1 } from "@vue/reactivity";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var shams = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams;
var hasSymbols$1 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var test = {
  foo: {}
};
var $Object = Object;
var hasProto$1 = function hasProto() {
  return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice = Array.prototype.slice;
var toStr$1 = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$1 = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr$1.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice.call(arguments, 1);
  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(
        this,
        args.concat(slice.call(arguments))
      );
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(
        that,
        args.concat(slice.call(arguments))
      );
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i);
  }
  bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation = implementation$1;
var functionBind = Function.prototype.bind || implementation;
var bind$1 = functionBind;
var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$1 = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, "");
  } catch (e) {
    $gOPD = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError$1();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols2 = hasSymbols$1();
var hasProto2 = hasProto$1();
var getProto = Object.getPrototypeOf || (hasProto2 ? function(x) {
  return x.__proto__;
} : null);
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols2 && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols2 && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols2 && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$1,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
if (getProto) {
  try {
    null.error;
  } catch (e) {
    var errorProto = getProto(getProto(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto) {
      value = getProto(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind2 = functionBind;
var hasOwn$1 = src;
var $concat$1 = bind2.call(Function.call, Array.prototype.concat);
var $spliceApply = bind2.call(Function.apply, Array.prototype.splice);
var $replace$1 = bind2.call(Function.call, String.prototype.replace);
var $strSlice = bind2.call(Function.call, String.prototype.slice);
var $exec = bind2.call(Function.call, RegExp.prototype.exec);
var rePropName$2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar$2 = /\\(\\)?/g;
var stringToPath$4 = function stringToPath(string) {
  var first = $strSlice(string, 0, 1);
  var last2 = $strSlice(string, -1);
  if (first === "%" && last2 !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last2 === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace$1(string, rePropName$2, function(match2, number, quote2, subString) {
    result[result.length] = quote2 ? $replace$1(subString, reEscapeChar$2, "$1") : number || match2;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn$1(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$1("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$1("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$1('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath$4(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat$1([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last2 = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last2 === '"' || last2 === "'" || last2 === "`")) && first !== last2) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$1("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn$1(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$1 = { exports: {} };
(function(module2) {
  var bind3 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind3.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = null;
    }
  }
  module2.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind3, $call, arguments);
    if ($gOPD2 && $defineProperty) {
      var desc = $gOPD2(func, "length");
      if (desc.configurable) {
        $defineProperty(
          func,
          "length",
          { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
        );
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind3, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module2.exports, "apply", { value: applyBind });
  } else {
    module2.exports.apply = applyBind;
  }
})(callBind$1);
var callBindExports = callBind$1.exports;
var GetIntrinsic$1 = getIntrinsic;
var callBind = callBindExports;
var $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf"));
var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBind(intrinsic);
  }
  return intrinsic;
};
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString$2 = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
  return O.__proto__;
} : null);
function addNumericSeparator(num, str2) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str2)) {
    return str2;
  }
  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof num === "number") {
    var int2 = num < 0 ? -$floor(-num) : $floor(num);
    if (int2 !== num) {
      var intStr = String(int2);
      var dec = $slice.call(str2, intStr.length + 1);
      return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace.call(str2, sepRegex, "$&_");
}
var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol$2(inspectCustom) ? inspectCustom : null;
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$3(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (has$3(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }
  var numericSeparator = opts.numericSeparator;
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    var str2 = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str2) : str2;
  }
  if (typeof obj === "bigint") {
    var bigIntStr = String(obj) + "n";
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$7(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$3(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function" && !isRegExp$1(obj)) {
    var name = nameOf(obj);
    var keys2 = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys2.length > 0 ? " { " + $join.call(keys2, ", ") + " }" : "");
  }
  if (isSymbol$2(obj)) {
    var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj)) {
    var s = "<" + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
    }
    s += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s += "...";
    }
    s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
    return s;
  }
  if (isArray$7(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
      return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
    }
    if (parts.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap$4(obj)) {
    var mapParts = [];
    if (mapForEach) {
      mapForEach.call(obj, function(value, key) {
        mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
      });
    }
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet$4(obj)) {
    var setParts = [];
    if (setForEach) {
      setForEach.call(obj, function(value) {
        setParts.push(inspect2(value, obj));
      });
    }
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber$2(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt(obj)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj)));
  }
  if (isBoolean$3(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString$1(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (!isDate(obj) && !isRegExp$1(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag2 = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag2 || protoTag ? "[" + $join.call($concat.call([], stringTag2 || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
  return quoteChar + s + quoteChar;
}
function quote(s) {
  return $replace.call(String(s), /"/g, "&quot;");
}
function isArray$7(obj) {
  return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isDate(obj) {
  return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isRegExp$1(obj) {
  return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isError(obj) {
  return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isString$1(obj) {
  return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isNumber$2(obj) {
  return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isBoolean$3(obj) {
  return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isSymbol$2(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
function isBigInt(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$3(obj, key) {
  return hasOwn.call(obj, key);
}
function toStr(obj) {
  return objectToString$2.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m2 = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m2) {
    return m2[1];
  }
  return null;
}
function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }
  return -1;
}
function isMap$4(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }
    return x instanceof Map;
  } catch (e) {
  }
  return false;
}
function isWeakMap(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e) {
  }
  return false;
}
function isSet$4(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m2) {
      return true;
    }
    return x instanceof Set;
  } catch (e) {
  }
  return false;
}
function isWeakSet(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e) {
  }
  return false;
}
function isElement(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
}
function inspectString(str2, opts) {
  if (str2.length > opts.maxStringLength) {
    var remaining = str2.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString($slice.call(str2, 0, opts.maxStringLength), opts) + trailer;
  }
  var s = $replace.call($replace.call(str2, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, "single", opts);
}
function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
}
function markBoxed(str2) {
  return "Object(" + str2 + ")";
}
function weakCollectionOf(type2) {
  return type2 + " { ? }";
}
function collectionOf(type2, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
  return type2 + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), " ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$7(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i = 0; i < obj.length; i++) {
      xs[i] = has$3(obj, i) ? inspect2(obj[i], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k = 0; k < syms.length; k++) {
      symMap["$" + syms[k]] = syms[k];
    }
  }
  for (var key in obj) {
    if (!has$3(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$1;
var inspect = objectInspect;
var $TypeError = GetIntrinsic2("%TypeError%");
var $WeakMap = GetIntrinsic2("%WeakMap%", true);
var $Map = GetIntrinsic2("%Map%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $mapGet = callBound("Map.prototype.get", true);
var $mapSet = callBound("Map.prototype.set", true);
var $mapHas = callBound("Map.prototype.has", true);
var listGetNode = function(list, key) {
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr;
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = {
      // eslint-disable-line no-param-reassign
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  return !!listGetNode(objects, key);
};
var sideChannel = function getSideChannel() {
  var $wm;
  var $m;
  var $o;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    get: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapGet($m, key);
        }
      } else {
        if ($o) {
          return listGet($o, key);
        }
      }
    },
    has: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapHas($m, key);
        }
      } else {
        if ($o) {
          return listHas($o, key);
        }
      }
      return false;
    },
    set: function(key, value) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if (!$wm) {
          $wm = new $WeakMap();
        }
        $weakMapSet($wm, key, value);
      } else if ($Map) {
        if (!$m) {
          $m = new $Map();
        }
        $mapSet($m, key, value);
      } else {
        if (!$o) {
          $o = { key: {}, next: null };
        }
        listSet($o, key, value);
      }
    }
  };
  return channel;
};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var formats$3 = {
  "default": Format.RFC3986,
  formatters: {
    RFC1738: function(value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
var formats$2 = formats$3;
var has$2 = Object.prototype.hasOwnProperty;
var isArray$6 = Array.isArray;
var hexTable = function() {
  var array = [];
  for (var i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
}();
var compactQueue = function compactQueue2(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];
    if (isArray$6(obj)) {
      var compacted = [];
      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== "undefined") {
          compacted.push(obj[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source, options) {
  var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== "undefined") {
      obj[i] = source[i];
    }
  }
  return obj;
};
var merge$1 = function merge(target, source, options) {
  if (!source) {
    return target;
  }
  if (typeof source !== "object") {
    if (isArray$6(target)) {
      target.push(source);
    } else if (target && typeof target === "object") {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }
    return target;
  }
  if (!target || typeof target !== "object") {
    return [target].concat(source);
  }
  var mergeTarget = target;
  if (isArray$6(target) && !isArray$6(source)) {
    mergeTarget = arrayToObject(target, options);
  }
  if (isArray$6(target) && isArray$6(source)) {
    source.forEach(function(item, i) {
      if (has$2.call(target, i)) {
        var targetItem = target[i];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }
  return Object.keys(source).reduce(function(acc, key) {
    var value = source[key];
    if (has$2.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function(acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};
var decode = function(str2, decoder, charset) {
  var strWithoutPlus = str2.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};
var encode = function encode2(str2, defaultEncoder, charset, kind, format2) {
  if (str2.length === 0) {
    return str2;
  }
  var string = str2;
  if (typeof str2 === "symbol") {
    string = Symbol.prototype.toString.call(str2);
  } else if (typeof str2 !== "string") {
    string = String(str2);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  var out = "";
  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format2 === formats$2.RFC1738 && (c === 40 || c === 41)) {
      out += string.charAt(i);
      continue;
    }
    if (c < 128) {
      out = out + hexTable[c];
      continue;
    }
    if (c < 2048) {
      out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
      continue;
    }
    i += 1;
    c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
    out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
  }
  return out;
};
var compact = function compact2(value) {
  var queue = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys2 = Object.keys(obj);
    for (var j = 0; j < keys2.length; ++j) {
      var key = keys2[j];
      var val = obj[key];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }
  compactQueue(queue);
  return value;
};
var isRegExp = function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};
var isBuffer$4 = function isBuffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine2(a, b) {
  return [].concat(a, b);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$6(val)) {
    var mapped = [];
    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
};
var utils$2 = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer: isBuffer$4,
  isRegExp,
  maybeMap,
  merge: merge$1
};
var getSideChannel2 = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + "[]";
  },
  comma: "comma",
  indices: function indices(prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$5 = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$5(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$1 = {
  addQueryPrefix: false,
  allowDots: false,
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encoder: utils$1.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var sentinel = {};
var stringify$1 = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate2, format2, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj = object;
  var tmpSc = sideChannel2;
  var step = 0;
  var findFlag = false;
  while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
    var pos = tmpSc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        findFlag = true;
      }
    }
    if (typeof tmpSc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate2(obj);
  } else if (generateArrayPrefix === "comma" && isArray$5(obj)) {
    obj = utils$1.maybeMap(obj, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, "key", format2) : prefix;
    }
    obj = "";
  }
  if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, "key", format2);
      if (generateArrayPrefix === "comma" && encodeValuesOnly) {
        var valuesArray = split.call(String(obj), ",");
        var valuesJoined = "";
        for (var i = 0; i < valuesArray.length; ++i) {
          valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults$1.encoder, charset, "value", format2));
        }
        return [formatter(keyValue) + (i === 1 ? "[]" : "") + "=" + valuesJoined];
      }
      return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$1.encoder, charset, "value", format2))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj))];
  }
  var values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$5(obj)) {
    objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray$5(filter)) {
    objKeys = filter;
  } else {
    var keys2 = Object.keys(obj);
    objKeys = sort ? keys2.sort(sort) : keys2;
  }
  for (var j = 0; j < objKeys.length; ++j) {
    var key = objKeys[j];
    var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
    if (skipNulls && value === null) {
      continue;
    }
    var keyPrefix = isArray$5(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
    sideChannel2.set(object, step);
    var valueSideChannel = getSideChannel2();
    valueSideChannel.set(sentinel, sideChannel2);
    pushToArray(values, stringify(
      value,
      keyPrefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate2,
      format2,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
  if (!opts) {
    return defaults$1;
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$1.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format2 = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format2 = opts.format;
  }
  var formatter = formats$1.formatters[format2];
  var filter = defaults$1.filter;
  if (typeof opts.filter === "function" || isArray$5(opts.filter)) {
    filter = opts.filter;
  }
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
    allowDots: typeof opts.allowDots === "undefined" ? defaults$1.allowDots : !!opts.allowDots,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$1.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$1.encode,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$1.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
    filter,
    format: format2,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$1.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$1.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};
var stringify_1 = function(object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray$5(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }
  var keys2 = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  var arrayFormat;
  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && "indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = "indices";
  }
  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  if (!objKeys) {
    objKeys = Object.keys(obj);
  }
  if (options.sort) {
    objKeys.sort(options.sort);
  }
  var sideChannel2 = getSideChannel2();
  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    pushToArray(keys2, stringify$1(
      obj[key],
      key,
      generateArrayPrefix,
      options.strictNullHandling,
      options.skipNulls,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel2
    ));
  }
  var joined = keys2.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils = utils$2;
var has = Object.prototype.hasOwnProperty;
var isArray$4 = Array.isArray;
var defaults = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};
var interpretNumericEntities = function(str2) {
  return str2.replace(/&#(\d+);/g, function($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};
var parseArrayValue = function(val, options) {
  if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str2, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str2.replace(/^\?/, "") : str2;
  var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1;
  var i;
  var charset = options.charset;
  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf("utf8=") === 0) {
        if (parts[i] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts[i] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i;
        i = parts.length;
      }
    }
  }
  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }
    var part = parts[i];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key, val;
    if (pos === -1) {
      key = options.decoder(part, defaults.decoder, charset, "key");
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
      val = utils.maybeMap(
        parseArrayValue(part.slice(pos + 1), options),
        function(encodedVal) {
          return options.decoder(encodedVal, defaults.decoder, charset, "value");
        }
      );
    }
    if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(val);
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray$4(val) ? [val] : val;
    }
    if (has.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
  return obj;
};
var parseObject = function(chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);
  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root2 = chain[i];
    if (root2 === "[]" && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var cleanRoot = root2.charAt(0) === "[" && root2.charAt(root2.length - 1) === "]" ? root2.slice(1, -1) : root2;
      var index = parseInt(cleanRoot, 10);
      if (!options.parseArrays && cleanRoot === "") {
        obj = { 0: leaf };
      } else if (!isNaN(index) && root2 !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
        obj = [];
        obj[index] = leaf;
      } else if (cleanRoot !== "__proto__") {
        obj[cleanRoot] = leaf;
      }
    }
    leaf = obj;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options.depth > 0 && brackets2.exec(key);
  var parent2 = segment ? key.slice(0, segment.index) : key;
  var keys2 = [];
  if (parent2) {
    if (!options.plainObjects && has.call(Object.prototype, parent2)) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys2.push(parent2);
  }
  var i = 0;
  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys2.push(segment[1]);
  }
  if (segment) {
    keys2.push("[" + key.slice(segment.index) + "]");
  }
  return parseObject(keys2, val, options, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults;
  }
  if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
    delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
};
var parse$2 = function(str2, opts) {
  var options = normalizeParseOptions(opts);
  if (str2 === "" || str2 === null || typeof str2 === "undefined") {
    return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  }
  var tempObj = typeof str2 === "string" ? parseValues(str2, options) : str2;
  var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  var keys2 = Object.keys(tempObj);
  for (var i = 0; i < keys2.length; ++i) {
    var key = keys2[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str2 === "string");
    obj = utils.merge(obj, newObj, options);
  }
  if (options.allowSparse === true) {
    return obj;
  }
  return utils.compact(obj);
};
var stringify2 = stringify_1;
var parse$1 = parse$2;
var formats = formats$3;
var lib = {
  formats,
  parse: parse$1,
  stringify: stringify2
};
const qs = /* @__PURE__ */ getDefaultExportFromCjs$1(lib);
function lexer(str2) {
  var tokens = [];
  var i = 0;
  while (i < str2.length) {
    var char = str2[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str2[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str2[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str2[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str2[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str2.length) {
        var code = str2.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str2[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str2[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str2.length) {
        if (str2[j] === "\\") {
          pattern += str2[j++] + str2[j++];
          continue;
        }
        if (str2[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str2[j] === "(") {
          count++;
          if (str2[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str2[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str2[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str2, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str2);
  var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2;
  var defaultPattern = "[^".concat(escapeString$1(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type2) {
    if (i < tokens.length && tokens[i].type === type2)
      return tokens[i++].value;
  };
  var mustConsume = function(type2) {
    var value2 = tryConsume(type2);
    if (value2 !== void 0)
      return value2;
    var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type2));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str2, options) {
  var keys2 = [];
  var re = pathToRegexp(str2, keys2, options);
  return regexpToFunction(re, keys2, options);
}
function regexpToFunction(re, keys2, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.decode, decode2 = _a2 === void 0 ? function(x) {
    return x;
  } : _a2;
  return function(pathname) {
    var m2 = re.exec(pathname);
    if (!m2)
      return false;
    var path = m2[0], index = m2.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m2[i2] === void 0)
        return "continue";
      var key = keys2[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m2[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode2(value, key);
        });
      } else {
        params[key.name] = decode2(m2[i2], key);
      }
    };
    for (var i = 1; i < m2.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString$1(str2) {
  return str2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys2) {
  if (!keys2)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys2.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys2, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys2, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys2, options) {
  return tokensToRegexp(parse(path, options), keys2, options);
}
function tokensToRegexp(tokens, keys2, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode3 = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString$1(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString$1(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString$1(encode3(token));
    } else {
      var prefix = escapeString$1(encode3(token.prefix));
      var suffix = escapeString$1(encode3(token.suffix));
      if (token.pattern) {
        if (keys2)
          keys2.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys2, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys2);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys2, options);
  return stringToRegexp(path, keys2, options);
}
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
  function go(to2, replace3) {
    if (replace3) {
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
    let m2;
    while (m2 = /^\.\.?\//.exec(pathname)) {
      if (m2[0] === "../") {
        paths.pop();
      }
      pathname = pathname.substring(m2[0].length);
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
  var _a2;
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
    return Object.keys(query).every((key) => query[key] === currentQuery[key]);
  } else if (pathname === location2.pathname) {
    return true;
  } else if (!~pathname.indexOf("http") && ~pathname.indexOf(":")) {
    return match(link, {
      decode: decodeURIComponent,
      strict: (_a2 = ctx === null || ctx === void 0 ? void 0 : ctx.strict) !== null && _a2 !== void 0 ? _a2 : true
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
  notify(type2, msg, conf) {
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
  resolvedPath = normalizeArray(resolvedPath.split("/"), false).join("/");
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
const perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const hasAbortController = typeof AbortController === "function";
const AC = hasAbortController ? AbortController : class AbortController2 {
  constructor() {
    this.signal = new AS();
  }
  abort(reason = new Error("This operation was aborted")) {
    this.signal.reason = this.signal.reason || reason;
    this.signal.aborted = true;
    this.signal.dispatchEvent({
      type: "abort",
      target: this.signal
    });
  }
};
const hasAbortSignal = typeof AbortSignal === "function";
const hasACAbortSignal = typeof AC.AbortSignal === "function";
const AS = hasAbortSignal ? AbortSignal : hasACAbortSignal ? AC.AbortController : class AbortSignal2 {
  constructor() {
    this.reason = void 0;
    this.aborted = false;
    this._listeners = [];
  }
  dispatchEvent(e) {
    if (e.type === "abort") {
      this.aborted = true;
      this.onabort(e);
      this._listeners.forEach((f) => f(e), this);
    }
  }
  onabort() {
  }
  addEventListener(ev, fn) {
    if (ev === "abort") {
      this._listeners.push(fn);
    }
  }
  removeEventListener(ev, fn) {
    if (ev === "abort") {
      this._listeners = this._listeners.filter((f) => f !== fn);
    }
  }
};
const warned = /* @__PURE__ */ new Set();
const deprecatedOption = (opt, instead) => {
  const code = `LRU_CACHE_OPTION_${opt}`;
  if (shouldWarn(code)) {
    warn(code, `${opt} option`, `options.${instead}`, LRUCache);
  }
};
const deprecatedMethod = (method, instead) => {
  const code = `LRU_CACHE_METHOD_${method}`;
  if (shouldWarn(code)) {
    const { prototype } = LRUCache;
    const { get: get2 } = Object.getOwnPropertyDescriptor(prototype, method);
    warn(code, `${method} method`, `cache.${instead}()`, get2);
  }
};
const deprecatedProperty = (field, instead) => {
  const code = `LRU_CACHE_PROPERTY_${field}`;
  if (shouldWarn(code)) {
    const { prototype } = LRUCache;
    const { get: get2 } = Object.getOwnPropertyDescriptor(prototype, field);
    warn(code, `${field} property`, `cache.${instead}`, get2);
  }
};
const emitWarning = (...a) => {
  typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(...a) : console.error(...a);
};
const shouldWarn = (code) => !warned.has(code);
const warn = (code, what, instead, fn) => {
  warned.add(code);
  const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
  emitWarning(msg, "DeprecationWarning", code, fn);
};
const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
const getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
class ZeroArray extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
}
let Stack$2 = class Stack {
  constructor(max) {
    if (max === 0) {
      return [];
    }
    const UintArray = getUintArray(max);
    this.heap = new UintArray(max);
    this.length = 0;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length];
  }
};
class LRUCache {
  constructor(options = {}) {
    const {
      max = 0,
      ttl,
      ttlResolution = 1,
      ttlAutopurge,
      updateAgeOnGet,
      updateAgeOnHas,
      allowStale,
      dispose,
      disposeAfter,
      noDisposeOnSet,
      noUpdateTTL,
      maxSize = 0,
      maxEntrySize = 0,
      sizeCalculation,
      fetchMethod,
      fetchContext,
      noDeleteOnFetchRejection,
      noDeleteOnStaleGet,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort
    } = options;
    const { length, maxAge, stale } = options instanceof LRUCache ? {} : options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    this.max = max;
    this.maxSize = maxSize;
    this.maxEntrySize = maxEntrySize || this.maxSize;
    this.sizeCalculation = sizeCalculation || length;
    if (this.sizeCalculation) {
      if (!this.maxSize && !this.maxEntrySize) {
        throw new TypeError(
          "cannot set sizeCalculation without setting maxSize or maxEntrySize"
        );
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    this.fetchMethod = fetchMethod || null;
    if (this.fetchMethod && typeof this.fetchMethod !== "function") {
      throw new TypeError(
        "fetchMethod must be a function if specified"
      );
    }
    this.fetchContext = fetchContext;
    if (!this.fetchMethod && fetchContext !== void 0) {
      throw new TypeError(
        "cannot set fetchContext without fetchMethod"
      );
    }
    this.keyMap = /* @__PURE__ */ new Map();
    this.keyList = new Array(max).fill(null);
    this.valList = new Array(max).fill(null);
    this.next = new UintArray(max);
    this.prev = new UintArray(max);
    this.head = 0;
    this.tail = 0;
    this.free = new Stack$2(max);
    this.initialFill = 1;
    this.size = 0;
    if (typeof dispose === "function") {
      this.dispose = dispose;
    }
    if (typeof disposeAfter === "function") {
      this.disposeAfter = disposeAfter;
      this.disposed = [];
    } else {
      this.disposeAfter = null;
      this.disposed = null;
    }
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (this.maxSize !== 0) {
        if (!isPosInt(this.maxSize)) {
          throw new TypeError(
            "maxSize must be a positive integer if specified"
          );
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError(
          "maxEntrySize must be a positive integer if specified"
        );
      }
      this.initializeSizeTracking();
    }
    this.allowStale = !!allowStale || !!stale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || maxAge || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError(
          "ttl must be a positive integer if specified"
        );
      }
      this.initializeTTLTracking();
    }
    if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) {
      throw new TypeError(
        "At least one of max, maxSize, or ttl is required"
      );
    }
    if (!this.ttlAutopurge && !this.max && !this.maxSize) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code, LRUCache);
      }
    }
    if (stale) {
      deprecatedOption("stale", "allowStale");
    }
    if (maxAge) {
      deprecatedOption("maxAge", "ttl");
    }
    if (length) {
      deprecatedOption("length", "sizeCalculation");
    }
  }
  getRemainingTTL(key) {
    return this.has(key, { updateAgeOnHas: false }) ? Infinity : 0;
  }
  initializeTTLTracking() {
    this.ttls = new ZeroArray(this.max);
    this.starts = new ZeroArray(this.max);
    this.setItemTTL = (index, ttl, start = perf.now()) => {
      this.starts[index] = ttl !== 0 ? start : 0;
      this.ttls[index] = ttl;
      if (ttl !== 0 && this.ttlAutopurge) {
        const t = setTimeout(() => {
          if (this.isStale(index)) {
            this.delete(this.keyList[index]);
          }
        }, ttl + 1);
        if (t.unref) {
          t.unref();
        }
      }
    };
    this.updateItemAge = (index) => {
      this.starts[index] = this.ttls[index] !== 0 ? perf.now() : 0;
    };
    this.statusTTL = (status, index) => {
      if (status) {
        status.ttl = this.ttls[index];
        status.start = this.starts[index];
        status.now = cachedNow || getNow();
        status.remainingTTL = status.now + status.ttl - status.start;
      }
    };
    let cachedNow = 0;
    const getNow = () => {
      const n = perf.now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout(
          () => cachedNow = 0,
          this.ttlResolution
        );
        if (t.unref) {
          t.unref();
        }
      }
      return n;
    };
    this.getRemainingTTL = (key) => {
      const index = this.keyMap.get(key);
      if (index === void 0) {
        return 0;
      }
      return this.ttls[index] === 0 || this.starts[index] === 0 ? Infinity : this.starts[index] + this.ttls[index] - (cachedNow || getNow());
    };
    this.isStale = (index) => {
      return this.ttls[index] !== 0 && this.starts[index] !== 0 && (cachedNow || getNow()) - this.starts[index] > this.ttls[index];
    };
  }
  updateItemAge(_index) {
  }
  statusTTL(_status, _index) {
  }
  setItemTTL(_index, _ttl, _start) {
  }
  isStale(_index) {
    return false;
  }
  initializeSizeTracking() {
    this.calculatedSize = 0;
    this.sizes = new ZeroArray(this.max);
    this.removeItemSize = (index) => {
      this.calculatedSize -= this.sizes[index];
      this.sizes[index] = 0;
    };
    this.requireSize = (k, v, size, sizeCalculation) => {
      if (this.isBackgroundFetch(v)) {
        return 0;
      }
      if (!isPosInt(size)) {
        if (sizeCalculation) {
          if (typeof sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation must be a function");
          }
          size = sizeCalculation(v, k);
          if (!isPosInt(size)) {
            throw new TypeError(
              "sizeCalculation return invalid (expect positive integer)"
            );
          }
        } else {
          throw new TypeError(
            "invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set."
          );
        }
      }
      return size;
    };
    this.addItemSize = (index, size, status) => {
      this.sizes[index] = size;
      if (this.maxSize) {
        const maxSize = this.maxSize - this.sizes[index];
        while (this.calculatedSize > maxSize) {
          this.evict(true);
        }
      }
      this.calculatedSize += this.sizes[index];
      if (status) {
        status.entrySize = size;
        status.totalCalculatedSize = this.calculatedSize;
      }
    };
  }
  removeItemSize(_index) {
  }
  addItemSize(_index, _size) {
  }
  requireSize(_k, _v, size, sizeCalculation) {
    if (size || sizeCalculation) {
      throw new TypeError(
        "cannot set size without setting maxSize or maxEntrySize on cache"
      );
    }
  }
  *indexes({ allowStale = this.allowStale } = {}) {
    if (this.size) {
      for (let i = this.tail; true; ) {
        if (!this.isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.isStale(i)) {
          yield i;
        }
        if (i === this.head) {
          break;
        } else {
          i = this.prev[i];
        }
      }
    }
  }
  *rindexes({ allowStale = this.allowStale } = {}) {
    if (this.size) {
      for (let i = this.head; true; ) {
        if (!this.isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.isStale(i)) {
          yield i;
        }
        if (i === this.tail) {
          break;
        } else {
          i = this.next[i];
        }
      }
    }
  }
  isValidIndex(index) {
    return index !== void 0 && this.keyMap.get(this.keyList[index]) === index;
  }
  *entries() {
    for (const i of this.indexes()) {
      if (this.valList[i] !== void 0 && this.keyList[i] !== void 0 && !this.isBackgroundFetch(this.valList[i])) {
        yield [this.keyList[i], this.valList[i]];
      }
    }
  }
  *rentries() {
    for (const i of this.rindexes()) {
      if (this.valList[i] !== void 0 && this.keyList[i] !== void 0 && !this.isBackgroundFetch(this.valList[i])) {
        yield [this.keyList[i], this.valList[i]];
      }
    }
  }
  *keys() {
    for (const i of this.indexes()) {
      if (this.keyList[i] !== void 0 && !this.isBackgroundFetch(this.valList[i])) {
        yield this.keyList[i];
      }
    }
  }
  *rkeys() {
    for (const i of this.rindexes()) {
      if (this.keyList[i] !== void 0 && !this.isBackgroundFetch(this.valList[i])) {
        yield this.keyList[i];
      }
    }
  }
  *values() {
    for (const i of this.indexes()) {
      if (this.valList[i] !== void 0 && !this.isBackgroundFetch(this.valList[i])) {
        yield this.valList[i];
      }
    }
  }
  *rvalues() {
    for (const i of this.rindexes()) {
      if (this.valList[i] !== void 0 && !this.isBackgroundFetch(this.valList[i])) {
        yield this.valList[i];
      }
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  find(fn, getOptions) {
    for (const i of this.indexes()) {
      const v = this.valList[i];
      const value = this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, this.keyList[i], this)) {
        return this.get(this.keyList[i], getOptions);
      }
    }
  }
  forEach(fn, thisp = this) {
    for (const i of this.indexes()) {
      const v = this.valList[i];
      const value = this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, this.keyList[i], this);
    }
  }
  rforEach(fn, thisp = this) {
    for (const i of this.rindexes()) {
      const v = this.valList[i];
      const value = this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, this.keyList[i], this);
    }
  }
  get prune() {
    deprecatedMethod("prune", "purgeStale");
    return this.purgeStale;
  }
  purgeStale() {
    let deleted = false;
    for (const i of this.rindexes({ allowStale: true })) {
      if (this.isStale(i)) {
        this.delete(this.keyList[i]);
        deleted = true;
      }
    }
    return deleted;
  }
  dump() {
    const arr = [];
    for (const i of this.indexes({ allowStale: true })) {
      const key = this.keyList[i];
      const v = this.valList[i];
      const value = this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      const entry = { value };
      if (this.ttls) {
        entry.ttl = this.ttls[i];
        const age = perf.now() - this.starts[i];
        entry.start = Math.floor(Date.now() - age);
      }
      if (this.sizes) {
        entry.size = this.sizes[i];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  dispose(_v, _k, _reason) {
  }
  set(k, v, {
    ttl = this.ttl,
    start,
    noDisposeOnSet = this.noDisposeOnSet,
    size = 0,
    sizeCalculation = this.sizeCalculation,
    noUpdateTTL = this.noUpdateTTL,
    status
  } = {}) {
    size = this.requireSize(k, v, size, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.delete(k);
      return this;
    }
    let index = this.size === 0 ? void 0 : this.keyMap.get(k);
    if (index === void 0) {
      index = this.newIndex();
      this.keyList[index] = k;
      this.valList[index] = v;
      this.keyMap.set(k, index);
      this.next[this.tail] = index;
      this.prev[index] = this.tail;
      this.tail = index;
      this.size++;
      this.addItemSize(index, size, status);
      if (status) {
        status.set = "add";
      }
      noUpdateTTL = false;
    } else {
      this.moveToTail(index);
      const oldVal = this.valList[index];
      if (v !== oldVal) {
        if (this.isBackgroundFetch(oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
        } else {
          if (!noDisposeOnSet) {
            this.dispose(oldVal, k, "set");
            if (this.disposeAfter) {
              this.disposed.push([oldVal, k, "set"]);
            }
          }
        }
        this.removeItemSize(index);
        this.valList[index] = v;
        this.addItemSize(index, size, status);
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && this.isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
    }
    if (ttl !== 0 && this.ttl === 0 && !this.ttls) {
      this.initializeTTLTracking();
    }
    if (!noUpdateTTL) {
      this.setItemTTL(index, ttl, start);
    }
    this.statusTTL(status, index);
    if (this.disposeAfter) {
      while (this.disposed.length) {
        this.disposeAfter(...this.disposed.shift());
      }
    }
    return this;
  }
  newIndex() {
    if (this.size === 0) {
      return this.tail;
    }
    if (this.size === this.max && this.max !== 0) {
      return this.evict(false);
    }
    if (this.free.length !== 0) {
      return this.free.pop();
    }
    return this.initialFill++;
  }
  pop() {
    if (this.size) {
      const val = this.valList[this.head];
      this.evict(true);
      return val;
    }
  }
  evict(free) {
    const head = this.head;
    const k = this.keyList[head];
    const v = this.valList[head];
    if (this.isBackgroundFetch(v)) {
      v.__abortController.abort(new Error("evicted"));
    } else {
      this.dispose(v, k, "evict");
      if (this.disposeAfter) {
        this.disposed.push([v, k, "evict"]);
      }
    }
    this.removeItemSize(head);
    if (free) {
      this.keyList[head] = null;
      this.valList[head] = null;
      this.free.push(head);
    }
    this.head = this.next[head];
    this.keyMap.delete(k);
    this.size--;
    return head;
  }
  has(k, { updateAgeOnHas = this.updateAgeOnHas, status } = {}) {
    const index = this.keyMap.get(k);
    if (index !== void 0) {
      if (!this.isStale(index)) {
        if (updateAgeOnHas) {
          this.updateItemAge(index);
        }
        if (status)
          status.has = "hit";
        this.statusTTL(status, index);
        return true;
      } else if (status) {
        status.has = "stale";
        this.statusTTL(status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  // like get(), but without any LRU updating or TTL expiration
  peek(k, { allowStale = this.allowStale } = {}) {
    const index = this.keyMap.get(k);
    if (index !== void 0 && (allowStale || !this.isStale(index))) {
      const v = this.valList[index];
      return this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    }
  }
  backgroundFetch(k, index, options, context) {
    const v = index === void 0 ? void 0 : this.valList[index];
    if (this.isBackgroundFetch(v)) {
      return v;
    }
    const ac = new AC();
    if (options.signal) {
      options.signal.addEventListener(
        "abort",
        () => ac.abort(options.signal.reason)
      );
    }
    const fetchOpts = {
      signal: ac.signal,
      options,
      context
    };
    const cb = (v2, updateCache = false) => {
      const { aborted } = ac.signal;
      const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
      if (options.status) {
        if (aborted && !updateCache) {
          options.status.fetchAborted = true;
          options.status.fetchError = ac.signal.reason;
          if (ignoreAbort)
            options.status.fetchAbortIgnored = true;
        } else {
          options.status.fetchResolved = true;
        }
      }
      if (aborted && !ignoreAbort && !updateCache) {
        return fetchFail(ac.signal.reason);
      }
      if (this.valList[index] === p) {
        if (v2 === void 0) {
          if (p.__staleWhileFetching) {
            this.valList[index] = p.__staleWhileFetching;
          } else {
            this.delete(k);
          }
        } else {
          if (options.status)
            options.status.fetchUpdated = true;
          this.set(k, v2, fetchOpts.options);
        }
      }
      return v2;
    };
    const eb = (er) => {
      if (options.status) {
        options.status.fetchRejected = true;
        options.status.fetchError = er;
      }
      return fetchFail(er);
    };
    const fetchFail = (er) => {
      const { aborted } = ac.signal;
      const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
      const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
      const noDelete = allowStale || options.noDeleteOnFetchRejection;
      if (this.valList[index] === p) {
        const del = !noDelete || p.__staleWhileFetching === void 0;
        if (del) {
          this.delete(k);
        } else if (!allowStaleAborted) {
          this.valList[index] = p.__staleWhileFetching;
        }
      }
      if (allowStale) {
        if (options.status && p.__staleWhileFetching !== void 0) {
          options.status.returnedStale = true;
        }
        return p.__staleWhileFetching;
      } else if (p.__returned === p) {
        throw er;
      }
    };
    const pcall = (res, rej) => {
      this.fetchMethod(k, v, fetchOpts).then((v2) => res(v2), rej);
      ac.signal.addEventListener("abort", () => {
        if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
          res();
          if (options.allowStaleOnFetchAbort) {
            res = (v2) => cb(v2, true);
          }
        }
      });
    };
    if (options.status)
      options.status.fetchDispatched = true;
    const p = new Promise(pcall).then(cb, eb);
    p.__abortController = ac;
    p.__staleWhileFetching = v;
    p.__returned = null;
    if (index === void 0) {
      this.set(k, p, { ...fetchOpts.options, status: void 0 });
      index = this.keyMap.get(k);
    } else {
      this.valList[index] = p;
    }
    return p;
  }
  isBackgroundFetch(p) {
    return p && typeof p === "object" && typeof p.then === "function" && Object.prototype.hasOwnProperty.call(
      p,
      "__staleWhileFetching"
    ) && Object.prototype.hasOwnProperty.call(p, "__returned") && (p.__returned === p || p.__returned === null);
  }
  // this takes the union of get() and set() opts, because it does both
  async fetch(k, {
    // get options
    allowStale = this.allowStale,
    updateAgeOnGet = this.updateAgeOnGet,
    noDeleteOnStaleGet = this.noDeleteOnStaleGet,
    // set options
    ttl = this.ttl,
    noDisposeOnSet = this.noDisposeOnSet,
    size = 0,
    sizeCalculation = this.sizeCalculation,
    noUpdateTTL = this.noUpdateTTL,
    // fetch exclusive options
    noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
    allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
    ignoreFetchAbort = this.ignoreFetchAbort,
    allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
    fetchContext = this.fetchContext,
    forceRefresh = false,
    status,
    signal
  } = {}) {
    if (!this.fetchMethod) {
      if (status)
        status.fetch = "get";
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = this.keyMap.get(k);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = this.backgroundFetch(k, index, options, fetchContext);
      return p.__returned = p;
    } else {
      const v = this.valList[index];
      if (this.isBackgroundFetch(v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = this.isStale(index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        this.moveToTail(index);
        if (updateAgeOnGet) {
          this.updateItemAge(index);
        }
        this.statusTTL(status, index);
        return v;
      }
      const p = this.backgroundFetch(k, index, options, fetchContext);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = hasStale && isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  get(k, {
    allowStale = this.allowStale,
    updateAgeOnGet = this.updateAgeOnGet,
    noDeleteOnStaleGet = this.noDeleteOnStaleGet,
    status
  } = {}) {
    const index = this.keyMap.get(k);
    if (index !== void 0) {
      const value = this.valList[index];
      const fetching = this.isBackgroundFetch(value);
      this.statusTTL(status, index);
      if (this.isStale(index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.delete(k);
          }
          if (status)
            status.returnedStale = allowStale;
          return allowStale ? value : void 0;
        } else {
          if (status) {
            status.returnedStale = allowStale && value.__staleWhileFetching !== void 0;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        this.moveToTail(index);
        if (updateAgeOnGet) {
          this.updateItemAge(index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  connect(p, n) {
    this.prev[n] = p;
    this.next[p] = n;
  }
  moveToTail(index) {
    if (index !== this.tail) {
      if (index === this.head) {
        this.head = this.next[index];
      } else {
        this.connect(this.prev[index], this.next[index]);
      }
      this.connect(this.tail, index);
      this.tail = index;
    }
  }
  get del() {
    deprecatedMethod("del", "delete");
    return this.delete;
  }
  delete(k) {
    let deleted = false;
    if (this.size !== 0) {
      const index = this.keyMap.get(k);
      if (index !== void 0) {
        deleted = true;
        if (this.size === 1) {
          this.clear();
        } else {
          this.removeItemSize(index);
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("deleted"));
          } else {
            this.dispose(v, k, "delete");
            if (this.disposeAfter) {
              this.disposed.push([v, k, "delete"]);
            }
          }
          this.keyMap.delete(k);
          this.keyList[index] = null;
          this.valList[index] = null;
          if (index === this.tail) {
            this.tail = this.prev[index];
          } else if (index === this.head) {
            this.head = this.next[index];
          } else {
            this.next[this.prev[index]] = this.next[index];
            this.prev[this.next[index]] = this.prev[index];
          }
          this.size--;
          this.free.push(index);
        }
      }
    }
    if (this.disposed) {
      while (this.disposed.length) {
        this.disposeAfter(...this.disposed.shift());
      }
    }
    return deleted;
  }
  clear() {
    for (const index of this.rindexes({ allowStale: true })) {
      const v = this.valList[index];
      if (this.isBackgroundFetch(v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k = this.keyList[index];
        this.dispose(v, k, "delete");
        if (this.disposeAfter) {
          this.disposed.push([v, k, "delete"]);
        }
      }
    }
    this.keyMap.clear();
    this.valList.fill(null);
    this.keyList.fill(null);
    if (this.ttls) {
      this.ttls.fill(0);
      this.starts.fill(0);
    }
    if (this.sizes) {
      this.sizes.fill(0);
    }
    this.head = 0;
    this.tail = 0;
    this.initialFill = 1;
    this.free.length = 0;
    this.calculatedSize = 0;
    this.size = 0;
    if (this.disposed) {
      while (this.disposed.length) {
        this.disposeAfter(...this.disposed.shift());
      }
    }
  }
  get reset() {
    deprecatedMethod("reset", "clear");
    return this.clear;
  }
  get length() {
    deprecatedProperty("length", "size");
    return this.size;
  }
  static get AbortController() {
    return AC;
  }
  static get AbortSignal() {
    return AS;
  }
}
const LRUCache$1 = LRUCache;
var freeGlobal$2 = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$3 = freeGlobal$2;
var freeSelf$1 = typeof self == "object" && self && self.Object === Object && self;
var root$2 = freeGlobal$3 || freeSelf$1 || Function("return this")();
const root$3 = root$2;
var Symbol$3 = root$3.Symbol;
const Symbol$4 = Symbol$3;
var objectProto$q = Object.prototype;
var hasOwnProperty$k = objectProto$q.hasOwnProperty;
var nativeObjectToString$3 = objectProto$q.toString;
var symToStringTag$3 = Symbol$4 ? Symbol$4.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$k.call(value, symToStringTag$3), tag = value[symToStringTag$3];
  try {
    value[symToStringTag$3] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$3.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$3] = tag;
    } else {
      delete value[symToStringTag$3];
    }
  }
  return result;
}
var objectProto$p = Object.prototype;
var nativeObjectToString$2 = objectProto$p.toString;
function objectToString$1(value) {
  return nativeObjectToString$2.call(value);
}
var nullTag$1 = "[object Null]", undefinedTag$1 = "[object Undefined]";
var symToStringTag$2 = Symbol$4 ? Symbol$4.toStringTag : void 0;
function baseGetTag$1(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag$1 : nullTag$1;
  }
  return symToStringTag$2 && symToStringTag$2 in Object(value) ? getRawTag$1(value) : objectToString$1(value);
}
function isObjectLike$1(value) {
  return value != null && typeof value == "object";
}
var symbolTag$5 = "[object Symbol]";
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike$1(value) && baseGetTag$1(value) == symbolTag$5;
}
function arrayMap$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var isArray$2 = Array.isArray;
const isArray$3 = isArray$2;
var INFINITY$4 = 1 / 0;
var symbolProto$3 = Symbol$4 ? Symbol$4.prototype : void 0, symbolToString$1 = symbolProto$3 ? symbolProto$3.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$3(value)) {
    return arrayMap$1(value, baseToString$1) + "";
  }
  if (isSymbol$1(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$4 ? "-0" : result;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject$2(value) {
  var type2 = typeof value;
  return value != null && (type2 == "object" || type2 == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$2(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary2 = reIsBinary.test(value);
  return isBinary2 || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary2 ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var INFINITY$3 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY$3 || value === -INFINITY$3) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
function identity(value) {
  return value;
}
var asyncTag$1 = "[object AsyncFunction]", funcTag$5 = "[object Function]", genTag$3 = "[object GeneratorFunction]", proxyTag$1 = "[object Proxy]";
function isFunction$1(value) {
  if (!isObject$2(value)) {
    return false;
  }
  var tag = baseGetTag$1(value);
  return tag == funcTag$5 || tag == genTag$3 || tag == asyncTag$1 || tag == proxyTag$1;
}
var coreJsData$2 = root$3["__core-js_shared__"];
const coreJsData$3 = coreJsData$2;
var maskSrcKey$1 = function() {
  var uid = /[^.]+$/.exec(coreJsData$3 && coreJsData$3.keys && coreJsData$3.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey$1 && maskSrcKey$1 in func;
}
var funcProto$4 = Function.prototype;
var funcToString$4 = funcProto$4.toString;
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$4.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;
var funcProto$3 = Function.prototype, objectProto$o = Object.prototype;
var funcToString$3 = funcProto$3.toString;
var hasOwnProperty$j = objectProto$o.hasOwnProperty;
var reIsNative$1 = RegExp(
  "^" + funcToString$3.call(hasOwnProperty$j).replace(reRegExpChar$1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$2(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$1(value));
}
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative$1(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative$1(value) ? value : void 0;
}
var WeakMap$2 = getNative$1(root$3, "WeakMap");
const WeakMap$3 = WeakMap$2;
var objectCreate$1 = Object.create;
var baseCreate$2 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$2(proto)) {
      return {};
    }
    if (objectCreate$1) {
      return objectCreate$1(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$3 = baseCreate$2;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray$1(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty$2 = function() {
  try {
    var func = getNative$1(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$3 = defineProperty$2;
var baseSetToString = !defineProperty$3 ? identity : function(func, string) {
  return defineProperty$3(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
function arrayEach$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$3 = 9007199254740991;
var reIsUint$1 = /^(?:0|[1-9]\d*)$/;
function isIndex$1(value, length) {
  var type2 = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$3 : length;
  return !!length && (type2 == "number" || type2 != "symbol" && reIsUint$1.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue$1(object, key, value) {
  if (key == "__proto__" && defineProperty$3) {
    defineProperty$3(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq$1(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$n = Object.prototype;
var hasOwnProperty$i = objectProto$n.hasOwnProperty;
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$i.call(object, key) && eq$1(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
function copyObject$1(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var MAX_SAFE_INTEGER$2 = 9007199254740991;
function isLength$1(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$2;
}
function isArrayLike$1(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var objectProto$m = Object.prototype;
function isPrototype$1(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$m;
  return value === proto;
}
function baseTimes$1(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$5 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$1(value) && baseGetTag$1(value) == argsTag$5;
}
var objectProto$l = Object.prototype;
var hasOwnProperty$h = objectProto$l.hasOwnProperty;
var propertyIsEnumerable$3 = objectProto$l.propertyIsEnumerable;
var isArguments$2 = baseIsArguments$1(function() {
  return arguments;
}()) ? baseIsArguments$1 : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$h.call(value, "callee") && !propertyIsEnumerable$3.call(value, "callee");
};
const isArguments$3 = isArguments$2;
function stubFalse$1() {
  return false;
}
var freeExports$5 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$5 = freeExports$5 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$5 = freeModule$5 && freeModule$5.exports === freeExports$5;
var Buffer$3 = moduleExports$5 ? root$3.Buffer : void 0;
var nativeIsBuffer$1 = Buffer$3 ? Buffer$3.isBuffer : void 0;
var isBuffer$2 = nativeIsBuffer$1 || stubFalse$1;
const isBuffer$3 = isBuffer$2;
var argsTag$4 = "[object Arguments]", arrayTag$3 = "[object Array]", boolTag$6 = "[object Boolean]", dateTag$5 = "[object Date]", errorTag$3 = "[object Error]", funcTag$4 = "[object Function]", mapTag$9 = "[object Map]", numberTag$6 = "[object Number]", objectTag$6 = "[object Object]", regexpTag$5 = "[object RegExp]", setTag$9 = "[object Set]", stringTag$6 = "[object String]", weakMapTag$5 = "[object WeakMap]";
var arrayBufferTag$5 = "[object ArrayBuffer]", dataViewTag$7 = "[object DataView]", float32Tag$5 = "[object Float32Array]", float64Tag$5 = "[object Float64Array]", int8Tag$5 = "[object Int8Array]", int16Tag$5 = "[object Int16Array]", int32Tag$5 = "[object Int32Array]", uint8Tag$5 = "[object Uint8Array]", uint8ClampedTag$5 = "[object Uint8ClampedArray]", uint16Tag$5 = "[object Uint16Array]", uint32Tag$5 = "[object Uint32Array]";
var typedArrayTags$1 = {};
typedArrayTags$1[float32Tag$5] = typedArrayTags$1[float64Tag$5] = typedArrayTags$1[int8Tag$5] = typedArrayTags$1[int16Tag$5] = typedArrayTags$1[int32Tag$5] = typedArrayTags$1[uint8Tag$5] = typedArrayTags$1[uint8ClampedTag$5] = typedArrayTags$1[uint16Tag$5] = typedArrayTags$1[uint32Tag$5] = true;
typedArrayTags$1[argsTag$4] = typedArrayTags$1[arrayTag$3] = typedArrayTags$1[arrayBufferTag$5] = typedArrayTags$1[boolTag$6] = typedArrayTags$1[dataViewTag$7] = typedArrayTags$1[dateTag$5] = typedArrayTags$1[errorTag$3] = typedArrayTags$1[funcTag$4] = typedArrayTags$1[mapTag$9] = typedArrayTags$1[numberTag$6] = typedArrayTags$1[objectTag$6] = typedArrayTags$1[regexpTag$5] = typedArrayTags$1[setTag$9] = typedArrayTags$1[stringTag$6] = typedArrayTags$1[weakMapTag$5] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$1(value) && isLength$1(value.length) && !!typedArrayTags$1[baseGetTag$1(value)];
}
function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$4 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$4 = freeExports$4 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$4 = freeModule$4 && freeModule$4.exports === freeExports$4;
var freeProcess$1 = moduleExports$4 && freeGlobal$3.process;
var nodeUtil$2 = function() {
  try {
    var types2 = freeModule$4 && freeModule$4.require && freeModule$4.require("util").types;
    if (types2) {
      return types2;
    }
    return freeProcess$1 && freeProcess$1.binding && freeProcess$1.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$3 = nodeUtil$2;
var nodeIsTypedArray$1 = nodeUtil$3 && nodeUtil$3.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray$1 ? baseUnary$1(nodeIsTypedArray$1) : baseIsTypedArray$1;
const isTypedArray$3 = isTypedArray$2;
var objectProto$k = Object.prototype;
var hasOwnProperty$g = objectProto$k.hasOwnProperty;
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$3(value), isArg = !isArr && isArguments$3(value), isBuff = !isArr && !isArg && isBuffer$3(value), isType = !isArr && !isArg && !isBuff && isTypedArray$3(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes$1(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$g.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex$1(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys$2 = overArg$1(Object.keys, Object);
const nativeKeys$3 = nativeKeys$2;
var objectProto$j = Object.prototype;
var hasOwnProperty$f = objectProto$j.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$1(object)) {
    return nativeKeys$3(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$f.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys$1(object) {
  return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys$1(object);
}
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$i = Object.prototype;
var hasOwnProperty$e = objectProto$i.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$2(object)) {
    return nativeKeysIn$1(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$e.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn$1(object) {
  return isArrayLike$1(object) ? arrayLikeKeys$1(object, true) : baseKeysIn$1(object);
}
var reIsDeepProp$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp$1 = /^\w*$/;
function isKey$1(value, object) {
  if (isArray$3(value)) {
    return false;
  }
  var type2 = typeof value;
  if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp$1.test(value) || !reIsDeepProp$1.test(value) || object != null && value in Object(object);
}
var nativeCreate$2 = getNative$1(Object, "create");
const nativeCreate$3 = nativeCreate$2;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$3 = "__lodash_hash_undefined__";
var objectProto$h = Object.prototype;
var hasOwnProperty$d = objectProto$h.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$3) {
    var result = data[key];
    return result === HASH_UNDEFINED$3 ? void 0 : result;
  }
  return hasOwnProperty$d.call(data, key) ? data[key] : void 0;
}
var objectProto$g = Object.prototype;
var hasOwnProperty$c = objectProto$g.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$3 ? data[key] !== void 0 : hasOwnProperty$c.call(data, key);
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$3 && value === void 0 ? HASH_UNDEFINED$2 : value;
  return this;
}
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear$1;
Hash$1.prototype["delete"] = hashDelete$1;
Hash$1.prototype.get = hashGet$1;
Hash$1.prototype.has = hashHas$1;
Hash$1.prototype.set = hashSet$1;
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto$1 = Array.prototype;
var splice$1 = arrayProto$1.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$1(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$1(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf$1(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$1.prototype.clear = listCacheClear$1;
ListCache$1.prototype["delete"] = listCacheDelete$1;
ListCache$1.prototype.get = listCacheGet$1;
ListCache$1.prototype.has = listCacheHas$1;
ListCache$1.prototype.set = listCacheSet$1;
var Map$2 = getNative$1(root$3, "Map");
const Map$3 = Map$2;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash$1(),
    "map": new (Map$3 || ListCache$1)(),
    "string": new Hash$1()
  };
}
function isKeyable$1(value) {
  var type2 = typeof value;
  return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData$1(map2, key) {
  var data = map2.__data__;
  return isKeyable$1(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete$1(key) {
  var result = getMapData$1(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet$1(key) {
  return getMapData$1(this, key).get(key);
}
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
function mapCacheSet$1(key, value) {
  var data = getMapData$1(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$1.prototype.clear = mapCacheClear$1;
MapCache$1.prototype["delete"] = mapCacheDelete$1;
MapCache$1.prototype.get = mapCacheGet$1;
MapCache$1.prototype.has = mapCacheHas$1;
MapCache$1.prototype.set = mapCacheSet$1;
var FUNC_ERROR_TEXT$1 = "Expected a function";
function memoize$1(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache$1)();
  return memoized;
}
memoize$1.Cache = MapCache$1;
var MAX_MEMOIZE_SIZE$1 = 500;
function memoizeCapped$1(func) {
  var result = memoize$1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE$1) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar$1 = /\\(\\)?/g;
var stringToPath$2 = memoizeCapped$1(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName$1, function(match2, number, quote2, subString) {
    result.push(quote2 ? subString.replace(reEscapeChar$1, "$1") : number || match2);
  });
  return result;
});
const stringToPath$3 = stringToPath$2;
function toString$1(value) {
  return value == null ? "" : baseToString$1(value);
}
function castPath$1(value, object) {
  if (isArray$3(value)) {
    return value;
  }
  return isKey$1(value, object) ? [value] : stringToPath$3(toString$1(value));
}
var INFINITY$2 = 1 / 0;
function toKey$1(value) {
  if (typeof value == "string" || isSymbol$1(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
}
function baseGet$1(object, path) {
  path = castPath$1(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey$1(path[index++])];
  }
  return index && index == length ? object : void 0;
}
function arrayPush$1(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var spreadableSymbol = Symbol$4 ? Symbol$4.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray$3(value) || isArguments$3(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush$1(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}
function flatRest(func) {
  return setToString$1(overRest(func, void 0, flatten), func + "");
}
var getPrototype$2 = overArg$1(Object.getPrototypeOf, Object);
const getPrototype$3 = getPrototype$2;
var objectTag$5 = "[object Object]";
var funcProto$2 = Function.prototype, objectProto$f = Object.prototype;
var funcToString$2 = funcProto$2.toString;
var hasOwnProperty$b = objectProto$f.hasOwnProperty;
var objectCtorString = funcToString$2.call(Object);
function isPlainObject(value) {
  if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$5) {
    return false;
  }
  var proto = getPrototype$3(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$b.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
function stackClear$1() {
  this.__data__ = new ListCache$1();
  this.size = 0;
}
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet$1(key) {
  return this.__data__.get(key);
}
function stackHas$1(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE$1 = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs2 = data.__data__;
    if (!Map$3 || pairs2.length < LARGE_ARRAY_SIZE$1 - 1) {
      pairs2.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs2);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack$1(entries) {
  var data = this.__data__ = new ListCache$1(entries);
  this.size = data.size;
}
Stack$1.prototype.clear = stackClear$1;
Stack$1.prototype["delete"] = stackDelete$1;
Stack$1.prototype.get = stackGet$1;
Stack$1.prototype.has = stackHas$1;
Stack$1.prototype.set = stackSet$1;
function baseAssign$1(object, source) {
  return object && copyObject$1(source, keys$1(source), object);
}
function baseAssignIn$1(object, source) {
  return object && copyObject$1(source, keysIn$1(source), object);
}
var freeExports$3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$3 = freeExports$3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$3 = freeModule$3 && freeModule$3.exports === freeExports$3;
var Buffer$2 = moduleExports$3 ? root$3.Buffer : void 0, allocUnsafe$1 = Buffer$2 ? Buffer$2.allocUnsafe : void 0;
function cloneBuffer$1(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe$1 ? allocUnsafe$1(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter$1(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray$1() {
  return [];
}
var objectProto$e = Object.prototype;
var propertyIsEnumerable$2 = objectProto$e.propertyIsEnumerable;
var nativeGetSymbols$3 = Object.getOwnPropertySymbols;
var getSymbols$2 = !nativeGetSymbols$3 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter$1(nativeGetSymbols$3(object), function(symbol) {
    return propertyIsEnumerable$2.call(object, symbol);
  });
};
const getSymbols$3 = getSymbols$2;
function copySymbols$1(source, object) {
  return copyObject$1(source, getSymbols$3(source), object);
}
var nativeGetSymbols$2 = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols$2 ? stubArray$1 : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$3(object));
    object = getPrototype$3(object);
  }
  return result;
};
const getSymbolsIn$3 = getSymbolsIn$2;
function copySymbolsIn$1(source, object) {
  return copyObject$1(source, getSymbolsIn$3(source), object);
}
function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$3(object) ? result : arrayPush$1(result, symbolsFunc(object));
}
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols$3);
}
function getAllKeysIn$1(object) {
  return baseGetAllKeys$1(object, keysIn$1, getSymbolsIn$3);
}
var DataView$2 = getNative$1(root$3, "DataView");
const DataView$3 = DataView$2;
var Promise$3 = getNative$1(root$3, "Promise");
const Promise$4 = Promise$3;
var Set$3 = getNative$1(root$3, "Set");
const Set$4 = Set$3;
var mapTag$8 = "[object Map]", objectTag$4 = "[object Object]", promiseTag$1 = "[object Promise]", setTag$8 = "[object Set]", weakMapTag$4 = "[object WeakMap]";
var dataViewTag$6 = "[object DataView]";
var dataViewCtorString$1 = toSource$1(DataView$3), mapCtorString$1 = toSource$1(Map$3), promiseCtorString$1 = toSource$1(Promise$4), setCtorString$1 = toSource$1(Set$4), weakMapCtorString$1 = toSource$1(WeakMap$3);
var getTag$2 = baseGetTag$1;
if (DataView$3 && getTag$2(new DataView$3(new ArrayBuffer(1))) != dataViewTag$6 || Map$3 && getTag$2(new Map$3()) != mapTag$8 || Promise$4 && getTag$2(Promise$4.resolve()) != promiseTag$1 || Set$4 && getTag$2(new Set$4()) != setTag$8 || WeakMap$3 && getTag$2(new WeakMap$3()) != weakMapTag$4) {
  getTag$2 = function(value) {
    var result = baseGetTag$1(value), Ctor = result == objectTag$4 ? value.constructor : void 0, ctorString = Ctor ? toSource$1(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString$1:
          return dataViewTag$6;
        case mapCtorString$1:
          return mapTag$8;
        case promiseCtorString$1:
          return promiseTag$1;
        case setCtorString$1:
          return setTag$8;
        case weakMapCtorString$1:
          return weakMapTag$4;
      }
    }
    return result;
  };
}
const getTag$3 = getTag$2;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$a.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array$3 = root$3.Uint8Array;
const Uint8Array$4 = Uint8Array$3;
function cloneArrayBuffer$1(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$4(result).set(new Uint8Array$4(arrayBuffer));
  return result;
}
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags$1 = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags$1.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto$2 = Symbol$4 ? Symbol$4.prototype : void 0, symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$5 = "[object Boolean]", dateTag$4 = "[object Date]", mapTag$7 = "[object Map]", numberTag$5 = "[object Number]", regexpTag$4 = "[object RegExp]", setTag$7 = "[object Set]", stringTag$5 = "[object String]", symbolTag$4 = "[object Symbol]";
var arrayBufferTag$4 = "[object ArrayBuffer]", dataViewTag$5 = "[object DataView]", float32Tag$4 = "[object Float32Array]", float64Tag$4 = "[object Float64Array]", int8Tag$4 = "[object Int8Array]", int16Tag$4 = "[object Int16Array]", int32Tag$4 = "[object Int32Array]", uint8Tag$4 = "[object Uint8Array]", uint8ClampedTag$4 = "[object Uint8ClampedArray]", uint16Tag$4 = "[object Uint16Array]", uint32Tag$4 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$4:
      return cloneArrayBuffer$1(object);
    case boolTag$5:
    case dateTag$4:
      return new Ctor(+object);
    case dataViewTag$5:
      return cloneDataView$1(object, isDeep);
    case float32Tag$4:
    case float64Tag$4:
    case int8Tag$4:
    case int16Tag$4:
    case int32Tag$4:
    case uint8Tag$4:
    case uint8ClampedTag$4:
    case uint16Tag$4:
    case uint32Tag$4:
      return cloneTypedArray$1(object, isDeep);
    case mapTag$7:
      return new Ctor();
    case numberTag$5:
    case stringTag$5:
      return new Ctor(object);
    case regexpTag$4:
      return cloneRegExp$1(object);
    case setTag$7:
      return new Ctor();
    case symbolTag$4:
      return cloneSymbol$1(object);
  }
}
function initCloneObject$1(object) {
  return typeof object.constructor == "function" && !isPrototype$1(object) ? baseCreate$3(getPrototype$3(object)) : {};
}
var mapTag$6 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$3(value) == mapTag$6;
}
var nodeIsMap$1 = nodeUtil$3 && nodeUtil$3.isMap;
var isMap$2 = nodeIsMap$1 ? baseUnary$1(nodeIsMap$1) : baseIsMap$1;
const isMap$3 = isMap$2;
var setTag$6 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike$1(value) && getTag$3(value) == setTag$6;
}
var nodeIsSet$1 = nodeUtil$3 && nodeUtil$3.isSet;
var isSet$2 = nodeIsSet$1 ? baseUnary$1(nodeIsSet$1) : baseIsSet$1;
const isSet$3 = isSet$2;
var CLONE_DEEP_FLAG$4 = 1, CLONE_FLAT_FLAG$2 = 2, CLONE_SYMBOLS_FLAG$4 = 4;
var argsTag$3 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$4 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$3 = "[object Function]", genTag$2 = "[object GeneratorFunction]", mapTag$5 = "[object Map]", numberTag$4 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$4 = "[object String]", symbolTag$3 = "[object Symbol]", weakMapTag$3 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$3 = "[object Float32Array]", float64Tag$3 = "[object Float64Array]", int8Tag$3 = "[object Int8Array]", int16Tag$3 = "[object Int16Array]", int32Tag$3 = "[object Int32Array]", uint8Tag$3 = "[object Uint8Array]", uint8ClampedTag$3 = "[object Uint8ClampedArray]", uint16Tag$3 = "[object Uint16Array]", uint32Tag$3 = "[object Uint32Array]";
var cloneableTags$1 = {};
cloneableTags$1[argsTag$3] = cloneableTags$1[arrayTag$2] = cloneableTags$1[arrayBufferTag$3] = cloneableTags$1[dataViewTag$4] = cloneableTags$1[boolTag$4] = cloneableTags$1[dateTag$3] = cloneableTags$1[float32Tag$3] = cloneableTags$1[float64Tag$3] = cloneableTags$1[int8Tag$3] = cloneableTags$1[int16Tag$3] = cloneableTags$1[int32Tag$3] = cloneableTags$1[mapTag$5] = cloneableTags$1[numberTag$4] = cloneableTags$1[objectTag$3] = cloneableTags$1[regexpTag$3] = cloneableTags$1[setTag$5] = cloneableTags$1[stringTag$4] = cloneableTags$1[symbolTag$3] = cloneableTags$1[uint8Tag$3] = cloneableTags$1[uint8ClampedTag$3] = cloneableTags$1[uint16Tag$3] = cloneableTags$1[uint32Tag$3] = true;
cloneableTags$1[errorTag$2] = cloneableTags$1[funcTag$3] = cloneableTags$1[weakMapTag$3] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$4, isFlat = bitmask & CLONE_FLAT_FLAG$2, isFull = bitmask & CLONE_SYMBOLS_FLAG$4;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$2(value)) {
    return value;
  }
  var isArr = isArray$3(value);
  if (isArr) {
    result = initCloneArray$1(value);
    if (!isDeep) {
      return copyArray$1(value, result);
    }
  } else {
    var tag = getTag$3(value), isFunc = tag == funcTag$3 || tag == genTag$2;
    if (isBuffer$3(value)) {
      return cloneBuffer$1(value, isDeep);
    }
    if (tag == objectTag$3 || tag == argsTag$3 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject$1(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn$1(value, baseAssignIn$1(result, value)) : copySymbols$1(value, baseAssign$1(result, value));
      }
    } else {
      if (!cloneableTags$1[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag$1(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack$1());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$3(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$3(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn$1 : getAllKeys$1 : isFlat ? keysIn$1 : keys$1;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach$1(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue$1(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG$3 = 1, CLONE_SYMBOLS_FLAG$3 = 4;
function cloneDeep$1(value) {
  return baseClone$1(value, CLONE_DEEP_FLAG$3 | CLONE_SYMBOLS_FLAG$3);
}
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
function parent(object, path) {
  return path.length < 2 ? object : baseGet$1(object, baseSlice(path, 0, -1));
}
var boolTag$3 = "[object Boolean]";
function isBoolean$2(value) {
  return value === true || value === false || isObjectLike$1(value) && baseGetTag$1(value) == boolTag$3;
}
function isInteger$1(value) {
  return typeof value == "number" && value == toInteger(value);
}
var numberTag$3 = "[object Number]";
function isNumber$1(value) {
  return typeof value == "number" || isObjectLike$1(value) && baseGetTag$1(value) == numberTag$3;
}
function baseUnset(object, path) {
  path = castPath$1(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey$1(last(path))];
}
function customOmitClone(value) {
  return isPlainObject(value) ? void 0 : value;
}
var CLONE_DEEP_FLAG$2 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$2 = 4;
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap$1(paths, function(path) {
    path = castPath$1(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject$1(object, getAllKeysIn$1(object), result);
  if (isDeep) {
    result = baseClone$1(result, CLONE_DEEP_FLAG$2 | CLONE_FLAT_FLAG$1 | CLONE_SYMBOLS_FLAG$2, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
const omit$1 = omit;
function createAsyncCache(options) {
  const cache = new LRUCache$1(options);
  return {
    get(key, loader2) {
      let promise = cache.get(key);
      if (promise) {
        return promise.then((v) => v && cloneDeep$1(v));
      }
      promise = loader2(key);
      cache.set(key, promise);
      return promise.then((v) => v && cloneDeep$1(v)).catch((e) => {
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
async function processXuiDirective(json2, typeProp, processor) {
  let futures = [];
  let ret = _processXuiDirective(json2, typeProp, processor, futures);
  await Promise.all(futures);
  return ret;
}
function _processXuiDirective(json2, typeProp, processor, futures) {
  if (!json2)
    return json2;
  function processProps(json3) {
    for (let key in json3) {
      let v = json3[key];
      v = _processXuiDirective(v, typeProp, processor, futures);
      if (v === void 0) {
        delete json3[key];
      } else if (v != json3[key]) {
        json3[key] = v;
        if (isPromise(v)) {
          v.then((ret) => {
            if (ret === void 0) {
              delete json3[key];
            } else {
              json3[key] = ret;
            }
          });
          json3[key] = v;
          futures.push(v);
        }
      }
    }
    return json3;
  }
  if (isObject$3(json2)) {
    let type2 = json2[typeProp];
    if (type2) {
      return processor(type2, json2, processProps);
    }
    processProps(json2);
  } else if (isArray$8(json2)) {
    for (let i = 0, n = json2.length; i < n; i++) {
      let child = _processXuiDirective(json2[i], typeProp, processor, futures);
      if (child === void 0) {
        delete json2[i];
        i--;
        n--;
      } else if (child != json2[i]) {
        json2[i] = child;
        if (isPromise(child)) {
          child.then((ret) => {
            let idx = json2.indexOf(child);
            if (idx < 0)
              return;
            if (ret == void 0) {
              delete json2[idx];
            } else {
              json2[idx] = ret;
            }
          });
        }
      }
    }
  }
  return json2;
}
function processXuiValue(json2, processor) {
  if (!json2)
    return json2;
  function processProps(json3) {
    for (let key in json3) {
      let v = json3[key];
      if (isString$2(v)) {
        v = processor(v, key, json3);
        if (v === void 0) {
          delete json3[key];
        } else if (v != json3[key]) {
          json3[key] = v;
        }
      } else {
        processXuiValue(v, processor);
      }
    }
    return json3;
  }
  if (isObject$3(json2)) {
    processProps(json2);
  } else if (isArray$8(json2)) {
    for (let i = 0, n = json2.length; i < n; i++) {
      let child = json2[i];
      if (isString$2(child)) {
        let v = processor(child, i, json2);
        if (v === void 0) {
          delete json2[i];
          i--;
          n--;
        } else if (v != json2[i]) {
          json2[i] = v;
        }
      } else {
        processXuiValue(child, processor);
      }
    }
  }
  return json2;
}
async function bindActions(pageUrl, json2, page) {
  if (!json2)
    return;
  page.resetActions();
  const promises = [];
  const fnStack = [];
  processXuiDirective(json2, "xui:import", (modulePaths, obj, processProps) => {
    const standalone = obj["xui:standalone"];
    const fnScope = { standalone, libs: {} };
    fnStack.push(fnScope);
    fetchModules(pageUrl, modulePaths, promises, fnScope);
    processProps(obj);
    return obj;
  });
  await Promise.all(promises);
  let stackIndex = 0;
  function process2(json3) {
    let modulePaths = json3["xui:import"];
    if (modulePaths) {
      stackIndex++;
    }
    for (let key in json3) {
      const v = json3[key];
      if (!v)
        continue;
      if (isString$2(v)) {
        json3[key] = processValue(key, v);
      } else if (isArray$8(v)) {
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
    const [type2, path] = splitPrefixUrl(v) || [];
    if (!type2)
      return v;
    if (["query", "mutation", "graphql", "dict", "page"].includes(type2)) {
      return type2 + "://" + path;
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
    } else if (type2 == "fn") {
      const fn = buildFunction(path, page);
      return wrapFunc(fn, v);
    }
    return v;
  }
  process2(json2);
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
  if (isString$2(modulePaths)) {
    modulePaths = modulePaths.split(",").reduce((m2, p) => {
      m2[getPathName(p)] = p;
      return m2;
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
    const lib2 = fnScope.libs[libName];
    if (lib2 && lib2[methodName]) {
      return lib2[methodName];
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
function registerXuiComponent(type2, component) {
  g_components[type2] = component;
}
function unregisterXuiComponent(type2) {
  delete g_components[type2];
}
function resolveXuiComponent(type2, json2) {
  const comp = g_components[type2];
  if (!comp)
    throw new Error("nop.err.xui.unknown-component:" + type2);
  return comp(json2);
}
const { isUserInRole } = useAdapter();
async function transformPageJson(pageUrl, json2) {
  json2.__baseUrl = pageUrl;
  json2 = await processXuiDirective(json2, "xui:roles", filterByAuth);
  json2 = await processXuiDirective(json2, "xui:component", resolveXuiComponent);
  return json2;
}
function filterByAuth(roles, json2) {
  if (!isUserInRole(roles))
    return;
  return json2;
}
let g_nextIndex = 0;
function createPage(options) {
  let actions = Object.assign({}, options.actions);
  let page = {
    id: "page_" + String(g_nextIndex++),
    getAction(name) {
      return actions[name];
    },
    registerAction(name, fn) {
      actions[name] = fn;
    },
    resetActions() {
      actions = Object.assign({}, options.actions);
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
  const [type2, path] = splitPrefixUrl(url) || [];
  if (type2 == "query" || type2 == "mutation" || type2 == "subscription") {
    normalizeData(config);
    config.method = "post";
    handleGraphQLUrl(type2, path, config, graphqlUrl, options);
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
  var _a2, _b, _c;
  data = JSON.parse(data);
  if (((_a2 = data.errors) === null || _a2 === void 0 ? void 0 : _a2.length) > 0) {
    data.status = parseInt(((_b = data.extensions) === null || _b === void 0 ? void 0 : _b["nop-status"]) || -1);
    data.msg = data.errors[0].message;
  } else {
    data.status = 0;
    data.msg = (_c = data.extensions) === null || _c === void 0 ? void 0 : _c["nop-msg"];
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
      const values = toArray$1(data.value, options.delimiter);
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
function toArray$1(value, delimiter) {
  if (isString$2(value)) {
    value = value.split(delimiter || ",");
  }
  return value;
}
function normalizeData(config) {
  const { data, params } = splitData(config.params);
  config.data = Object.assign(Object.assign({}, filterData(config.data)), data);
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
  if (isString$2(value))
    return "String";
  if (isNumber$1(value)) {
    if (isInteger$1(value))
      return "Int";
    return "Float";
  }
  if (isBoolean$2(value))
    return "Boolean";
  if (isPlainObject$1(value))
    return "Map";
  if (isArray$8(value))
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
  var _a2, _b, _c, _d, _e;
  let query = {};
  query.limit = (_c = (_b = (_a2 = data.limit) !== null && _a2 !== void 0 ? _a2 : data.pageSize) !== null && _b !== void 0 ? _b : data.perPage) !== null && _c !== void 0 ? _c : 0;
  query.offset = (_d = data.offset) !== null && _d !== void 0 ? _d : query.limit * ((data.page || 0) - 1);
  query.orderBy = toOrderBy((_e = data.orderBy) !== null && _e !== void 0 ? _e : data.orderField, data.orderDir);
  query.filter = toFilter(data);
  query.cursor = data.cursor;
  query.timeout = data.timeout;
  return query;
  function toOrderBy(v, orderDir) {
    if (v == null)
      return;
    if (isString$2(v)) {
      if (v.length == 0)
        return;
      if (v.endsWith("_label"))
        v = v.substring(0, v.length - "_label".length);
      return [{ name: v, desc: orderDir == "desc" }];
    }
    if (isArray$8(v))
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
          let ary = toArray$1(value);
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
  if (isString$2(v))
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
const { useAuthToken: useAuthToken$1, useTenantId, useLocale: useLocale$2, setAuthToken, logout, useSettings, useI18n: useI18n$1, useAppId, globalVersion, notify, alert, processRequest, processResponse } = useAdapter();
const ajax = axios.create({});
ajax.interceptors.response.use((res) => {
  const token = res.headers[HEADER_ACCESS_TOKEN];
  if (token) {
    setAuthToken(token);
  }
  return res;
});
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
  return ajaxFetch(options).then((d) => {
    var _a2, _b, _c, _d, _e, _f, _g;
    if (!options.silent) {
      if ((_a2 = d.data) === null || _a2 === void 0 ? void 0 : _a2.msg) {
        if ((_b = options.config) === null || _b === void 0 ? void 0 : _b.useAlert) {
          alert(d.data.msg);
        } else {
          notify(((_c = d.data) === null || _c === void 0 ? void 0 : _c.status) == 0 ? "info" : "error", d.data.msg);
        }
      }
    }
    if (((_d = d.data) === null || _d === void 0 ? void 0 : _d.status) != 0)
      throw new Error(((_e = d.data) === null || _e === void 0 ? void 0 : _e.msg) || "ajax-fail:\ncode=" + ((_f = d.data) === null || _f === void 0 ? void 0 : _f.code) + ",status=" + ((_g = d.data) === null || _g === void 0 ? void 0 : _g.status));
    return d.data.data;
  });
}
function ajaxFetch(options) {
  var _a2, _b, _c, _d;
  options.config = options.config || {};
  let url = options.url;
  let query = options.query || {};
  const pos = url.indexOf("?");
  if (pos > 0) {
    query = Object.assign(Object.assign({}, query), lib.parse(url.substring(pos + 1)));
    url = url.substring(0, pos);
  }
  options.query = query;
  const [type2, path] = splitPrefixUrl(url) || [];
  if (type2 == "action") {
    const actionName = path;
    const action = (_a2 = options._page) === null || _a2 === void 0 ? void 0 : _a2.getAction(actionName);
    if (!action) {
      return Promise.reject(new Error("nop.err.unknown-action:" + actionName));
    }
    try {
      return Promise.resolve(action(options));
    } catch (e) {
      return Promise.reject(e);
    }
  } else if (type2 == "dict") {
    return useAdapter().fetchDict(path, options);
  } else if (type2 == "page") {
    return useAdapter().fetchPageAndTransform(path, options);
  }
  const globSetting = useSettings();
  if (globSetting.apiUrl && options.config.useApiUrl !== false) {
    url = `${globSetting.apiUrl}${url}`;
  }
  const config = {
    withCredentials: (_b = options.config.withCredentials) !== null && _b !== void 0 ? _b : true,
    url,
    method: options.method || "post",
    headers: options.headers || {},
    data: options.data,
    params: query,
    responseType: options.responseType
  };
  if ((_c = options.config) === null || _c === void 0 ? void 0 : _c.cancelExecutor) {
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
  if (((_d = config.method) === null || _d === void 0 ? void 0 : _d.toLowerCase()) == "get") {
    config.params = Object.assign(Object.assign({}, options.data), query);
    config.data = null;
  }
  const res = ajax.request(processRequest(config)).then((res2) => {
    var _a3;
    if (res2.status == 200 && ((_a3 = options.config) === null || _a3 === void 0 ? void 0 : _a3.rawResponse)) {
      res2.data = responseOk(res2.data);
    }
    return res2;
  }).catch((error) => {
    var _a3;
    if (axios.isCancel(error)) {
      throw error;
    }
    const { t } = useI18n$1();
    const { response } = error || {};
    if (!response || !response.status) {
      throw new Error(t("sys.api.apiRequestFailed"));
    }
    const err = error.toString();
    let errMessage = normalizeErrMessage(response.status, "");
    if (!errMessage && (err === null || err === void 0 ? void 0 : err.includes("Network Error"))) {
      errMessage = t("sys.api.networkExceptionMsg");
    }
    if (((_a3 = response.data) === null || _a3 === void 0 ? void 0 : _a3.status) == null) {
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
  config.headers["nop-locale"] = useLocale$2();
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
  const { t } = useI18n$1();
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
const debug$2 = ref(false);
const supportDebug$1 = ref(false);
function toggleDebug() {
  setDebug(!debug$2.value);
}
function setDebug(b) {
  debug$2.value = b;
}
function useDebug() {
  return {
    debug: debug$2,
    supportDebug: supportDebug$1,
    toggleDebug,
    setDebug
  };
}
/*!
 * SystemJS 6.14.1
 */
(function() {
  function errMsg(errCode, msg) {
    return (msg || "") + " (SystemJS Error#" + errCode + " https://github.com/systemjs/systemjs/blob/main/docs/errors.md#" + errCode + ")";
  }
  var hasSymbol = typeof Symbol !== "undefined";
  var hasSelf = typeof self !== "undefined";
  var hasDocument = typeof document !== "undefined";
  var envGlobal = hasSelf ? self : commonjsGlobal;
  var baseUrl;
  if (hasDocument) {
    var baseEl = document.querySelector("base[href]");
    if (baseEl)
      baseUrl = baseEl.href;
  }
  if (!baseUrl && typeof location !== "undefined") {
    baseUrl = location.href.split("#")[0].split("?")[0];
    var lastSepIndex = baseUrl.lastIndexOf("/");
    if (lastSepIndex !== -1)
      baseUrl = baseUrl.slice(0, lastSepIndex + 1);
  }
  var backslashRegEx = /\\/g;
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    if (relUrl.indexOf("\\") !== -1)
      relUrl = relUrl.replace(backslashRegEx, "/");
    if (relUrl[0] === "/" && relUrl[1] === "/") {
      return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
      var parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
      var pathname;
      if (parentUrl[parentProtocol.length + 1] === "/") {
        if (parentProtocol !== "file:") {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf("/") + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
      }
      if (relUrl[0] === "/")
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
      var segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;
      var output = [];
      var segmentIndex = -1;
      for (var i = 0; i < segmented.length; i++) {
        if (segmentIndex !== -1) {
          if (segmented[i] === "/") {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }
        } else if (segmented[i] === ".") {
          if (segmented[i + 1] === "." && (segmented[i + 2] === "/" || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
          } else if (segmented[i + 1] === "/" || i + 1 === segmented.length) {
            i += 1;
          } else {
            segmentIndex = i;
          }
        } else {
          segmentIndex = i;
        }
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(":") !== -1 ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap, parentUrl) {
    for (var p in packages) {
      var resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl2) || p;
      var rhs = packages[p];
      if (typeof rhs !== "string")
        continue;
      var mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(rhs, baseUrl2) || rhs, parentUrl);
      if (!mapped) {
        targetWarning("W1", p, rhs, "bare specifier did not resolve");
      } else
        outPackages[resolvedLhs] = mapped;
    }
  }
  function resolveAndComposeImportMap(json2, baseUrl2, outMap) {
    if (json2.imports)
      resolveAndComposePackages(json2.imports, outMap.imports, baseUrl2, outMap, null);
    var u;
    for (u in json2.scopes || {}) {
      var resolvedScope = resolveUrl(u, baseUrl2);
      resolveAndComposePackages(json2.scopes[u], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, outMap, resolvedScope);
    }
    for (u in json2.depcache || {})
      outMap.depcache[resolveUrl(u, baseUrl2)] = json2.depcache[u];
    for (u in json2.integrity || {})
      outMap.integrity[resolveUrl(u, baseUrl2)] = json2.integrity[u];
  }
  function getMatch(path, matchObj) {
    if (matchObj[path])
      return path;
    var sepIndex = path.length;
    do {
      var segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
  }
  function applyPackages(id, packages) {
    var pkgName = getMatch(id, packages);
    if (pkgName) {
      var pkg = packages[pkgName];
      if (pkg === null)
        return;
      if (id.length > pkgName.length && pkg[pkg.length - 1] !== "/") {
        targetWarning("W2", pkgName, pkg, "should have a trailing '/'");
      } else
        return pkg + id.slice(pkgName.length);
    }
  }
  function targetWarning(code, match2, target, msg) {
    console.warn(errMsg(code, "Package target " + msg + ", resolving target '" + target + "' for " + match2));
  }
  function resolveImportMap(importMap2, resolvedOrPlain, parentUrl) {
    var scopes = importMap2.scopes;
    var scopeUrl = parentUrl && getMatch(parentUrl, scopes);
    while (scopeUrl) {
      var packageResolution = applyPackages(resolvedOrPlain, scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), scopes);
    }
    return applyPackages(resolvedOrPlain, importMap2.imports) || resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain;
  }
  var toStringTag$1 = hasSymbol && Symbol.toStringTag;
  var REGISTRY = hasSymbol ? Symbol() : "@";
  function SystemJS() {
    this[REGISTRY] = {};
  }
  var systemJSPrototype = SystemJS.prototype;
  systemJSPrototype.import = function(id, parentUrl, meta) {
    var loader2 = this;
    parentUrl && typeof parentUrl === "object" && (meta = parentUrl, parentUrl = void 0);
    return Promise.resolve(loader2.prepareImport()).then(function() {
      return loader2.resolve(id, parentUrl, meta);
    }).then(function(id2) {
      var load2 = getOrCreateLoad(loader2, id2, void 0, meta);
      return load2.C || topLevelLoad(loader2, load2);
    });
  };
  systemJSPrototype.createContext = function(parentId) {
    var loader2 = this;
    return {
      url: parentId,
      resolve: function(id, parentUrl) {
        return Promise.resolve(loader2.resolve(id, parentUrl || parentId));
      }
    };
  };
  systemJSPrototype.onload = function() {
  };
  function loadToId(load2) {
    return load2.id;
  }
  function triggerOnload(loader2, load2, err, isErrSource) {
    loader2.onload(err, load2.id, load2.d && load2.d.map(loadToId), !!isErrSource);
    if (err)
      throw err;
  }
  var lastRegister;
  systemJSPrototype.register = function(deps, declare, metas) {
    lastRegister = [deps, declare, metas];
  };
  systemJSPrototype.getRegister = function() {
    var _lastRegister = lastRegister;
    lastRegister = void 0;
    return _lastRegister;
  };
  function getOrCreateLoad(loader2, id, firstParentUrl, meta) {
    var load2 = loader2[REGISTRY][id];
    if (load2)
      return load2;
    var importerSetters = [];
    var ns = /* @__PURE__ */ Object.create(null);
    if (toStringTag$1)
      Object.defineProperty(ns, toStringTag$1, { value: "Module" });
    var instantiatePromise = Promise.resolve().then(function() {
      return loader2.instantiate(id, firstParentUrl, meta);
    }).then(function(registration) {
      if (!registration)
        throw Error(errMsg(2, "Module " + id + " did not instantiate"));
      function _export(name, value) {
        load2.h = true;
        var changed = false;
        if (typeof name === "string") {
          if (!(name in ns) || ns[name] !== value) {
            ns[name] = value;
            changed = true;
          }
        } else {
          for (var p in name) {
            var value = name[p];
            if (!(p in ns) || ns[p] !== value) {
              ns[p] = value;
              changed = true;
            }
          }
          if (name && name.__esModule) {
            ns.__esModule = name.__esModule;
          }
        }
        if (changed)
          for (var i = 0; i < importerSetters.length; i++) {
            var setter = importerSetters[i];
            if (setter)
              setter(ns);
          }
        return value;
      }
      var declared = registration[1](_export, registration[1].length === 2 ? {
        import: function(importId, meta2) {
          return loader2.import(importId, id, meta2);
        },
        meta: loader2.createContext(id)
      } : void 0);
      load2.e = declared.execute || function() {
      };
      return [registration[0], declared.setters || [], registration[2] || []];
    }, function(err) {
      load2.e = null;
      load2.er = err;
      triggerOnload(loader2, load2, err, true);
      throw err;
    });
    var linkPromise = instantiatePromise.then(function(instantiation) {
      return Promise.all(instantiation[0].map(function(dep, i) {
        var setter = instantiation[1][i];
        var meta2 = instantiation[2][i];
        return Promise.resolve(loader2.resolve(dep, id)).then(function(depId) {
          var depLoad = getOrCreateLoad(loader2, depId, id, meta2);
          return Promise.resolve(depLoad.I).then(function() {
            if (setter) {
              depLoad.i.push(setter);
              if (depLoad.h || !depLoad.I)
                setter(depLoad.n);
            }
            return depLoad;
          });
        });
      })).then(function(depLoads) {
        load2.d = depLoads;
      });
    });
    return load2 = loader2[REGISTRY][id] = {
      id,
      // importerSetters, the setters functions registered to this dependency
      // we retain this to add more later
      i: importerSetters,
      // module namespace object
      n: ns,
      // extra module information for import assertion
      // shape like: { assert: { type: 'xyz' } }
      m: meta,
      // instantiate
      I: instantiatePromise,
      // link
      L: linkPromise,
      // whether it has hoisted exports
      h: false,
      // On instantiate completion we have populated:
      // dependency load records
      d: void 0,
      // execution function
      e: void 0,
      // On execution we have populated:
      // the execution error if any
      er: void 0,
      // in the case of TLA, the execution promise
      E: void 0,
      // On execution, L, I, E cleared
      // Promise for top-level completion
      C: void 0,
      // parent instantiator / executor
      p: void 0
    };
  }
  function instantiateAll(loader2, load2, parent2, loaded) {
    if (!loaded[load2.id]) {
      loaded[load2.id] = true;
      return Promise.resolve(load2.L).then(function() {
        if (!load2.p || load2.p.e === null)
          load2.p = parent2;
        return Promise.all(load2.d.map(function(dep) {
          return instantiateAll(loader2, dep, parent2, loaded);
        }));
      }).catch(function(err) {
        if (load2.er)
          throw err;
        load2.e = null;
        triggerOnload(loader2, load2, err, false);
        throw err;
      });
    }
  }
  function topLevelLoad(loader2, load2) {
    return load2.C = instantiateAll(loader2, load2, load2, {}).then(function() {
      return postOrderExec(loader2, load2, {});
    }).then(function() {
      return load2.n;
    });
  }
  var nullContext = Object.freeze(/* @__PURE__ */ Object.create(null));
  function postOrderExec(loader2, load2, seen) {
    if (seen[load2.id])
      return;
    seen[load2.id] = true;
    if (!load2.e) {
      if (load2.er)
        throw load2.er;
      if (load2.E)
        return load2.E;
      return;
    }
    var exec = load2.e;
    load2.e = null;
    var depLoadPromises;
    load2.d.forEach(function(depLoad) {
      try {
        var depLoadPromise = postOrderExec(loader2, depLoad, seen);
        if (depLoadPromise)
          (depLoadPromises = depLoadPromises || []).push(depLoadPromise);
      } catch (err) {
        load2.er = err;
        triggerOnload(loader2, load2, err, false);
        throw err;
      }
    });
    if (depLoadPromises)
      return Promise.all(depLoadPromises).then(doExec);
    return doExec();
    function doExec() {
      try {
        var execPromise = exec.call(nullContext);
        if (execPromise) {
          execPromise = execPromise.then(function() {
            load2.C = load2.n;
            load2.E = null;
            if (true)
              triggerOnload(loader2, load2, null, true);
          }, function(err) {
            load2.er = err;
            load2.E = null;
            if (true)
              triggerOnload(loader2, load2, err, true);
            throw err;
          });
          return load2.E = execPromise;
        }
        load2.C = load2.n;
        load2.L = load2.I = void 0;
      } catch (err) {
        load2.er = err;
        throw err;
      } finally {
        triggerOnload(loader2, load2, load2.er, true);
      }
    }
  }
  envGlobal.System = new SystemJS();
  var importMapPromise = Promise.resolve();
  var importMap = { imports: {}, scopes: {}, depcache: {}, integrity: {} };
  var processFirst = hasDocument;
  systemJSPrototype.prepareImport = function(doProcessScripts) {
    if (processFirst || doProcessScripts) {
      processScripts();
      processFirst = false;
    }
    return importMapPromise;
  };
  if (hasDocument) {
    processScripts();
    window.addEventListener("DOMContentLoaded", processScripts);
  }
  systemJSPrototype.addImportMap = function(newMap, mapBase) {
    resolveAndComposeImportMap(newMap, mapBase || baseUrl, importMap);
  };
  function processScripts() {
    [].forEach.call(document.querySelectorAll("script"), function(script) {
      if (script.sp)
        return;
      if (script.type === "systemjs-module") {
        script.sp = true;
        if (!script.src)
          return;
        System.import(script.src.slice(0, 7) === "import:" ? script.src.slice(7) : resolveUrl(script.src, baseUrl)).catch(function(e) {
          if (e.message.indexOf("https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3") > -1) {
            var event = document.createEvent("Event");
            event.initEvent("error", false, false);
            script.dispatchEvent(event);
          }
          return Promise.reject(e);
        });
      } else if (script.type === "systemjs-importmap") {
        script.sp = true;
        var fetchPromise = script.src ? (System.fetch || fetch)(script.src, { integrity: script.integrity, passThrough: true }).then(function(res) {
          if (!res.ok)
            throw Error("Invalid status code: " + res.status);
          return res.text();
        }).catch(function(err) {
          err.message = errMsg("W4", "Error fetching systemjs-import map " + script.src) + "\n" + err.message;
          console.warn(err);
          if (typeof script.onerror === "function") {
            script.onerror();
          }
          return "{}";
        }) : script.innerHTML;
        importMapPromise = importMapPromise.then(function() {
          return fetchPromise;
        }).then(function(text) {
          extendImportMap(importMap, text, script.src || baseUrl);
        });
      }
    });
  }
  function extendImportMap(importMap2, newMapText, newMapUrl) {
    var newMap = {};
    try {
      newMap = JSON.parse(newMapText);
    } catch (err) {
      console.warn(Error(errMsg("W5", "systemjs-importmap contains invalid JSON") + "\n\n" + newMapText + "\n"));
    }
    resolveAndComposeImportMap(newMap, newMapUrl, importMap2);
  }
  if (hasDocument) {
    window.addEventListener("error", function(evt) {
      lastWindowErrorUrl = evt.filename;
      lastWindowError = evt.error;
    });
    var baseOrigin = location.origin;
  }
  systemJSPrototype.createScript = function(url) {
    var script = document.createElement("script");
    script.async = true;
    if (url.indexOf(baseOrigin + "/"))
      script.crossOrigin = "anonymous";
    var integrity = importMap.integrity[url];
    if (integrity)
      script.integrity = integrity;
    script.src = url;
    return script;
  };
  var lastAutoImportDeps, lastAutoImportTimeout;
  var autoImportCandidates = {};
  var systemRegister = systemJSPrototype.register;
  systemJSPrototype.register = function(deps, declare) {
    if (hasDocument && document.readyState === "loading" && typeof deps !== "string") {
      var scripts = document.querySelectorAll("script[src]");
      var lastScript = scripts[scripts.length - 1];
      if (lastScript) {
        lastScript.src;
        lastAutoImportDeps = deps;
        var loader2 = this;
        lastAutoImportTimeout = setTimeout(function() {
          autoImportCandidates[lastScript.src] = [deps, declare];
          loader2.import(lastScript.src);
        });
      }
    } else {
      lastAutoImportDeps = void 0;
    }
    return systemRegister.call(this, deps, declare);
  };
  var lastWindowErrorUrl, lastWindowError;
  systemJSPrototype.instantiate = function(url, firstParentUrl) {
    var autoImportRegistration = autoImportCandidates[url];
    if (autoImportRegistration) {
      delete autoImportCandidates[url];
      return autoImportRegistration;
    }
    var loader2 = this;
    return Promise.resolve(systemJSPrototype.createScript(url)).then(function(script) {
      return new Promise(function(resolve, reject) {
        script.addEventListener("error", function() {
          reject(Error(errMsg(3, "Error loading " + url + (firstParentUrl ? " from " + firstParentUrl : ""))));
        });
        script.addEventListener("load", function() {
          document.head.removeChild(script);
          if (lastWindowErrorUrl === url) {
            reject(lastWindowError);
          } else {
            var register = loader2.getRegister(url);
            if (register && register[0] === lastAutoImportDeps)
              clearTimeout(lastAutoImportTimeout);
            resolve(register);
          }
        });
        document.head.appendChild(script);
      });
    });
  };
  systemJSPrototype.shouldFetch = function() {
    return false;
  };
  if (typeof fetch !== "undefined")
    systemJSPrototype.fetch = fetch;
  var instantiate = systemJSPrototype.instantiate;
  var jsContentTypeRegEx = /^(text|application)\/(x-)?javascript(;|$)/;
  systemJSPrototype.instantiate = function(url, parent2, meta) {
    var loader2 = this;
    if (!this.shouldFetch(url, parent2, meta))
      return instantiate.apply(this, arguments);
    return this.fetch(url, {
      credentials: "same-origin",
      integrity: importMap.integrity[url],
      meta
    }).then(function(res) {
      if (!res.ok)
        throw Error(errMsg(7, res.status + " " + res.statusText + ", loading " + url + (parent2 ? " from " + parent2 : "")));
      var contentType = res.headers.get("content-type");
      if (!contentType || !jsContentTypeRegEx.test(contentType))
        throw Error(errMsg(4, 'Unknown Content-Type "' + contentType + '", loading ' + url + (parent2 ? " from " + parent2 : "")));
      return res.text().then(function(source) {
        if (source.indexOf("//# sourceURL=") < 0)
          source += "\n//# sourceURL=" + url;
        (0, eval)(source);
        return loader2.getRegister(url);
      });
    });
  };
  systemJSPrototype.resolve = function(id, parentUrl) {
    parentUrl = parentUrl || false || baseUrl;
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  };
  function throwUnresolved(id, parentUrl) {
    throw Error(errMsg(8, "Unable to resolve bare specifier '" + id + (parentUrl ? "' from " + parentUrl : "'")));
  }
  var systemInstantiate = systemJSPrototype.instantiate;
  systemJSPrototype.instantiate = function(url, firstParentUrl, meta) {
    var preloads = importMap.depcache[url];
    if (preloads) {
      for (var i = 0; i < preloads.length; i++)
        getOrCreateLoad(this, this.resolve(preloads[i], url), url);
    }
    return systemInstantiate.call(this, url, firstParentUrl, meta);
  };
  if (hasSelf && typeof importScripts === "function")
    systemJSPrototype.instantiate = function(url) {
      var loader2 = this;
      return Promise.resolve().then(function() {
        importScripts(url);
        return loader2.getRegister(url);
      });
    };
  (function(global2) {
    var systemJSPrototype2 = global2.System.constructor.prototype;
    var firstGlobalProp, secondGlobalProp, lastGlobalProp;
    function getGlobalProp(useFirstGlobalProp) {
      var cnt = 0;
      var foundLastProp, result;
      for (var p in global2) {
        if (shouldSkipProperty(p))
          continue;
        if (cnt === 0 && p !== firstGlobalProp || cnt === 1 && p !== secondGlobalProp)
          return p;
        if (foundLastProp) {
          lastGlobalProp = p;
          result = useFirstGlobalProp && result || p;
        } else {
          foundLastProp = p === lastGlobalProp;
        }
        cnt++;
      }
      return result;
    }
    function noteGlobalProps() {
      firstGlobalProp = secondGlobalProp = void 0;
      for (var p in global2) {
        if (shouldSkipProperty(p))
          continue;
        if (!firstGlobalProp)
          firstGlobalProp = p;
        else if (!secondGlobalProp)
          secondGlobalProp = p;
        lastGlobalProp = p;
      }
      return lastGlobalProp;
    }
    var impt = systemJSPrototype2.import;
    systemJSPrototype2.import = function(id, parentUrl, meta) {
      noteGlobalProps();
      return impt.call(this, id, parentUrl, meta);
    };
    var emptyInstantiation = [[], function() {
      return {};
    }];
    var getRegister = systemJSPrototype2.getRegister;
    systemJSPrototype2.getRegister = function() {
      var lastRegister2 = getRegister.call(this);
      if (lastRegister2)
        return lastRegister2;
      var globalProp = getGlobalProp(this.firstGlobalProp);
      if (!globalProp)
        return emptyInstantiation;
      var globalExport;
      try {
        globalExport = global2[globalProp];
      } catch (e) {
        return emptyInstantiation;
      }
      return [[], function(_export) {
        return {
          execute: function() {
            _export(globalExport);
            _export({ default: globalExport, __useDefault: true });
          }
        };
      }];
    };
    var isIE11 = typeof navigator !== "undefined" && navigator.userAgent.indexOf("Trident") !== -1;
    function shouldSkipProperty(p) {
      return !global2.hasOwnProperty(p) || !isNaN(p) && p < global2.length || isIE11 && global2[p] && typeof window !== "undefined" && global2[p].parent === window;
    }
  })(typeof self !== "undefined" ? self : commonjsGlobal);
  (function(global2) {
    var systemJSPrototype2 = global2.System.constructor.prototype;
    var moduleTypesRegEx = /^[^#?]+\.(css|html|json|wasm)([?#].*)?$/;
    var _shouldFetch = systemJSPrototype2.shouldFetch.bind(systemJSPrototype2);
    systemJSPrototype2.shouldFetch = function(url) {
      return _shouldFetch(url) || moduleTypesRegEx.test(url);
    };
    var jsonContentType = /^application\/json(;|$)/;
    var cssContentType = /^text\/css(;|$)/;
    var wasmContentType = /^application\/wasm(;|$)/;
    var fetch2 = systemJSPrototype2.fetch;
    systemJSPrototype2.fetch = function(url, options) {
      return fetch2(url, options).then(function(res) {
        if (options.passThrough)
          return res;
        if (!res.ok)
          return res;
        var contentType = res.headers.get("content-type");
        if (jsonContentType.test(contentType))
          return res.json().then(function(json2) {
            return new Response(new Blob([
              'System.register([],function(e){return{execute:function(){e("default",' + JSON.stringify(json2) + ")}}})"
            ], {
              type: "application/javascript"
            }));
          });
        if (cssContentType.test(contentType))
          return res.text().then(function(source) {
            source = source.replace(/url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g, function(match2, quotes, relUrl1, relUrl2) {
              return "url(" + quotes + resolveUrl(relUrl1 || relUrl2, url) + quotes + ")";
            });
            return new Response(new Blob([
              "System.register([],function(e){return{execute:function(){var s=new CSSStyleSheet();s.replaceSync(" + JSON.stringify(source) + ');e("default",s)}}})'
            ], {
              type: "application/javascript"
            }));
          });
        if (wasmContentType.test(contentType))
          return (WebAssembly.compileStreaming ? WebAssembly.compileStreaming(res) : res.arrayBuffer().then(WebAssembly.compile)).then(function(module2) {
            if (!global2.System.wasmModules)
              global2.System.wasmModules = /* @__PURE__ */ Object.create(null);
            global2.System.wasmModules[url] = module2;
            var deps = [];
            var setterSources = [];
            if (WebAssembly.Module.imports)
              WebAssembly.Module.imports(module2).forEach(function(impt) {
                var key = JSON.stringify(impt.module);
                if (deps.indexOf(key) === -1) {
                  deps.push(key);
                  setterSources.push("function(m){i[" + key + "]=m}");
                }
              });
            return new Response(new Blob([
              "System.register([" + deps.join(",") + "],function(e){var i={};return{setters:[" + setterSources.join(",") + "],execute:function(){return WebAssembly.instantiate(System.wasmModules[" + JSON.stringify(url) + "],i).then(function(m){e(m.exports)})}}})"
            ], {
              type: "application/javascript"
            }));
          });
        return res;
      });
    };
  })(typeof self !== "undefined" ? self : commonjsGlobal);
  var toStringTag2 = typeof Symbol !== "undefined" && Symbol.toStringTag;
  systemJSPrototype.get = function(id) {
    var load2 = this[REGISTRY][id];
    if (load2 && load2.e === null && !load2.E) {
      if (load2.er)
        return null;
      return load2.n;
    }
  };
  systemJSPrototype.set = function(id, module2) {
    {
      try {
        new URL(id);
      } catch (err) {
        console.warn(Error(errMsg("W3", '"' + id + '" is not a valid URL to set in the module registry')));
      }
    }
    var ns;
    if (toStringTag2 && module2[toStringTag2] === "Module") {
      ns = module2;
    } else {
      ns = Object.assign(/* @__PURE__ */ Object.create(null), module2);
      if (toStringTag2)
        Object.defineProperty(ns, toStringTag2, { value: "Module" });
    }
    var done = Promise.resolve(ns);
    var load2 = this[REGISTRY][id] || (this[REGISTRY][id] = {
      id,
      i: [],
      h: false,
      d: [],
      e: null,
      er: void 0,
      E: void 0
    });
    if (load2.e || load2.E)
      return false;
    Object.assign(load2, {
      n: ns,
      I: void 0,
      L: void 0,
      C: done
    });
    return ns;
  };
  systemJSPrototype.has = function(id) {
    var load2 = this[REGISTRY][id];
    return !!load2;
  };
  systemJSPrototype.delete = function(id) {
    var registry = this[REGISTRY];
    var load2 = registry[id];
    if (!load2 || load2.p && load2.p.e !== null || load2.E)
      return false;
    var importerSetters = load2.i;
    if (load2.d)
      load2.d.forEach(function(depLoad) {
        var importerIndex = depLoad.i.indexOf(load2);
        if (importerIndex !== -1)
          depLoad.i.splice(importerIndex, 1);
      });
    delete registry[id];
    return function() {
      var load3 = registry[id];
      if (!load3 || !importerSetters || load3.e !== null || load3.E)
        return false;
      importerSetters.forEach(function(setter) {
        load3.i.push(setter);
        setter(load3.n);
      });
      importerSetters = null;
    };
  };
  var iterator = typeof Symbol !== "undefined" && Symbol.iterator;
  systemJSPrototype.entries = function() {
    var loader2 = this, keys2 = Object.keys(loader2[REGISTRY]);
    var index = 0, ns, key;
    var result = {
      next: function() {
        while ((key = keys2[index++]) !== void 0 && (ns = loader2.get(key)) === void 0)
          ;
        return {
          done: key === void 0,
          value: key !== void 0 && [key, ns]
        };
      }
    };
    result[iterator] = function() {
      return this;
    };
    return result;
  };
})();
const System$1 = (typeof self !== "undefined" ? self : global).System;
function importModule(path) {
  if (path.endsWith(".lib.js") && path.startsWith("/") && !path.startsWith("/p/")) {
    path = "/p/SystemJsProvider__getJs" + path;
  }
  let url = System$1.resolve(path);
  return System$1.import(
    /*@vite-ignore*/
    url
  );
}
function deleteDynamicModules() {
  for (let module2 of System$1.entries()) {
    const moduleId = module2[0];
    if (moduleId.endsWith(".lib.js"))
      System$1.delete(moduleId);
  }
}
function registerModule(name, lib2) {
  let libPath = name;
  if (name.startsWith("./")) {
    libPath = System$1.resolve(name);
  }
  System$1.set(libPath, lib2);
}
function addSystemImportMap(imports) {
  System$1.addImportMap({
    imports
  });
}
const pageCache = createAsyncCache({ max: 50 });
const dictCache = createAsyncCache({ max: 100 });
const { useLocale: useLocale$1 } = useAdapter();
function buildLocaleKey(name) {
  return useLocale$1() + "|" + name;
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
      data: omit$1(data, "__baseUrl")
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
const { supportDebug, debug: debug$1 } = useDebug();
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
    debug$1.value = data.supportDebug;
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
  adapter,
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
      translate: translate2,
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
        translate: translate2,
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
          translate: translate2,
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
    const { render: render2, pickerIcon } = this.props;
    return pickerIcon ? render2("picker-icon", pickerIcon) : void 0;
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
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$2 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$2;
}
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var isArray = Array.isArray;
const isArray$1 = isArray;
var INFINITY$1 = 1 / 0;
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
function isObject$1(value) {
  var type2 = typeof value;
  return value != null && (type2 == "object" || type2 == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject$1(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject$1(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$1$1 = WeakMap$1;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type2 = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer2 = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer2;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types2 = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types2) {
      return types2;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject$1(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type2 = typeof value;
  if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$1$1 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type2 = typeof value;
  return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath2 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match2, number, quote2, subString) {
    result.push(quote2 ? subString.replace(reEscapeChar, "$1") : number || match2);
  });
  return result;
});
const stringToPath$1 = stringToPath2;
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}
var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs2 = data.__data__;
    if (!Map$1$1 || pairs2.length < LARGE_ARRAY_SIZE - 1) {
      pairs2.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs2);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack2.prototype.clear = stackClear;
Stack2.prototype["delete"] = stackDelete;
Stack2.prototype.get = stackGet;
Stack2.prototype.has = stackHas;
Stack2.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView$1 = getNative(root$1, "DataView");
const DataView$1$1 = DataView$1;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1$1), mapCtorString = toSource(Map$1$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1$1);
var getTag = baseGetTag;
if (DataView$1$1 && getTag(new DataView$1$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1$1 && getTag(new Map$1$1()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$3 || WeakMap$1$1 && getTag(new WeakMap$1$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array$1 = root$1.Uint8Array;
const Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$2 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag$1] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack2());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function fromPairs(pairs2) {
  var index = -1, length = pairs2 == null ? 0 : pairs2.length, result = {};
  while (++index < length) {
    var pair = pairs2[index];
    result[pair[0]] = pair[1];
  }
  return result;
}
var stringTag = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
function isNil(value) {
  return value == null;
}
const _sfc_main$c = defineComponent({
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
      } else if (isString(event.data) && event.data.startsWith("{")) {
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
      const str2 = isString(msg) ? msg : JSON.stringify(msg);
      frame.contentWindow.postMessage(str2, "*");
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
const _export_sfc$1 = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$4 = {
  style: { "width": "100%", "height": "100%", "border": "none" },
  ref: "editorRef",
  src: "/amis-editor/index.html"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("iframe", _hoisted_1$4, null, 512);
}
const AmisPageEditor = /* @__PURE__ */ _export_sfc$1(_sfc_main$c, [["render", _sfc_render$4]]);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var toggleSelection = function() {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function() {
    };
  }
  var active = document.activeElement;
  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }
  switch (active.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      active.blur();
      break;
    default:
      active = null;
      break;
  }
  selection.removeAllRanges();
  return function() {
    selection.type === "Caret" && selection.removeAllRanges();
    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }
    active && active.focus();
  };
};
var deselectCurrent = toggleSelection;
var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options) {
  var debug2, message, reselectPrevious, range, selection, mark, success = false;
  if (!options) {
    options = {};
  }
  debug2 = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text;
    mark.ariaHidden = "true";
    mark.style.all = "unset";
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    mark.style.whiteSpace = "pre";
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") {
          debug2 && console.warn("unable to use e.clipboardData");
          debug2 && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format2, text);
        } else {
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug2 && console.error("unable to copy using execCommand: ", err);
    debug2 && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err2) {
      debug2 && console.error("unable to copy using clipboardData: ", err2);
      debug2 && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }
    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }
  return success;
}
var copyToClipboard = copy;
const copy$1 = /* @__PURE__ */ getDefaultExportFromCjs(copyToClipboard);
const { debug } = useDebug();
const adaptor = useAdapter();
function createEnv(page) {
  let env = {
    session: page.id,
    affixOffsetTop: 0,
    fetcher(options) {
      providePage(page);
      options._page = page;
      return ajaxFetch(options);
    },
    jumpTo(to, action, ctx) {
      const router = useAdapter().useRouter();
      return default_jumpTo(router, to);
    },
    isCancel,
    isCurrentUrl: default_isCurrentUrl,
    updateLocation(to, replace2) {
      default_updateLocation(to, !!replace2);
    },
    notify: (type2, msg, conf) => {
      if (msg.startsWith("_"))
        return;
      conf = { closeButton: true, ...conf };
      toast[type2] ? toast[type2](msg, conf) : console.warn("[notify]", type2, msg);
      console.log("[notify]", type2, msg);
    },
    enableAMISDebug: debug.value,
    alert: alert$1,
    confirm,
    copy: (contents, options) => {
      if (options === void 0) {
        options = {};
      }
      const { t } = adaptor.useI18n();
      const ret = copy$1(contents, options);
      ret && (!options || options.shutup !== true) && toast.info(t("Copy To Clipboard"));
      return ret;
    }
  };
  env._page = page;
  page.env = env;
  return env;
}
const _sfc_main$b = defineComponent({
  props: {
    schema: Object,
    data: Object,
    registerPage: Function,
    actions: Object
  },
  setup(props) {
    var _a2;
    const domRef = ref();
    let root2;
    let amisScoped;
    let page = createPage({
      getComponent(name) {
        return get_component(name);
      },
      getScopedStore(name) {
        var _a3, _b;
        return (_b = (_a3 = get_component(name)) == null ? void 0 : _a3.props) == null ? void 0 : _b.store;
      },
      getState(name) {
        return get_root_store().get(name);
      },
      setState(name, value) {
        get_root_store().set(name, value);
      },
      actions: props.actions
    });
    (_a2 = props.registerPage) == null ? void 0 : _a2.call(props, page);
    function get_root() {
      return amisScoped == null ? void 0 : amisScoped.getComponents()[0];
    }
    function get_root_store() {
      var _a3;
      return (_a3 = get_root()) == null ? void 0 : _a3.context.store;
    }
    function get_component(name) {
      var _a3, _b, _c;
      if (name[0] == "#") {
        let pos = name.indexOf(".");
        if (pos < 0) {
          return (_a3 = get_root()) == null ? void 0 : _a3.context.getComponentById(name.substring(1));
        } else {
          return (_b = get_root()) == null ? void 0 : _b.context.getComponentById(name.substring(1)).getComponentByName(name.substring(pos + 1));
        }
      } else {
        return (_c = get_root()) == null ? void 0 : _c.context.getComponentByName(name);
      }
    }
    function destroyPage() {
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
          var _a3, _b;
          if (b) {
            (_a3 = page.getAction("ok")) == null ? void 0 : _a3();
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
      const schema2 = props.schema;
      await bindActions(schema2.__baseUrl, schema2, page);
      const vdom = render(schema2, opts, env);
      root2.render(vdom);
    }
    watchEffect(() => {
      destroyPage();
      if (props.schema && domRef.value) {
        renderPage();
      }
    });
    onBeforeUnmount(() => {
    });
    return {
      domRef
    };
  }
});
const _hoisted_1$3 = {
  ref: "domRef",
  style: { "width": "100%", "height": "100%" },
  class: "amis"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, null, 512);
}
const AmisSchemaPage = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["render", _sfc_render$3]]);
var createRoot;
var m = ReactDOM;
if (process.env.NODE_ENV === "production") {
  createRoot = m.createRoot;
  m.hydrateRoot;
} else {
  var i$1 = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  createRoot = function(c, o) {
    i$1.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i$1.usingClientEntryPoint = false;
    }
  };
}
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AmisToast",
  setup(__props) {
    const domRef = ref();
    let root2;
    onMounted(() => {
      root2 = createRoot(domRef.value);
      root2.render(createElement(Fragment$1, {}, createElement(ToastComponent, { position: "top-right" })));
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
var _a;
const isClient = typeof window !== "undefined";
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, resolveUnref(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
const isUndefined = (val) => val === void 0;
const isBoolean$1 = (val) => typeof val === "boolean";
const isNumber = (val) => typeof val === "number";
const isStringNumber = (val) => {
  if (!isString$2(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
class ElementPlusError extends Error {
  constructor(m2) {
    super(m2);
    this.name = "ElementPlusError";
  }
}
function throwError$1(scope, m2) {
  throw new ElementPlusError(`[${scope}] ${m2}`);
}
function debugWarn(scope, message) {
  if (process.env.NODE_ENV !== "production") {
    const error = isString$2(scope) ? new ElementPlusError(`[${scope}] ${message}`) : scope;
    console.warn(error);
  }
}
const SCOPE = "utils/dom/style";
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls)
    return false;
  if (cls.includes(" "))
    throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
  var _a2;
  if (!isClient || !element || !styleName)
    return "";
  let key = camelize(styleName);
  if (key === "float")
    key = "cssFloat";
  try {
    const style = element.style[key];
    if (style)
      return style;
    const computed2 = (_a2 = document.defaultView) == null ? void 0 : _a2.getComputedStyle(element, "");
    return computed2 ? computed2[key] : "";
  } catch (e) {
    return element.style[key];
  }
};
function addUnit(value, defaultUnit = "px") {
  if (!value)
    return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString$2(value)) {
    return value;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}
let scrollBarWidth;
const getScrollBarWidth = (namespace) => {
  var _a2;
  if (!isClient)
    return 0;
  if (scrollBarWidth !== void 0)
    return scrollBarWidth;
  const outer = document.createElement("div");
  outer.className = `${namespace}-scrollbar__wrap`;
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  (_a2 = outer.parentNode) == null ? void 0 : _a2.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;
};
/*! Element Plus Icons Vue v2.1.0 */
var export_helper_default = (sfc, props) => {
  let target = sfc.__vccOpts || sfc;
  for (let [key, val] of props)
    target[key] = val;
  return target;
};
var close_vue_vue_type_script_lang_default = {
  name: "Close"
};
var _hoisted_156 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_256 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_355 = [
  _hoisted_256
];
function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_156, _hoisted_355);
}
var close_default = /* @__PURE__ */ export_helper_default(close_vue_vue_type_script_lang_default, [["render", _sfc_render56], ["__file", "close.vue"]]);
var loading_vue_vue_type_script_lang_default = {
  name: "Loading"
};
var _hoisted_1150 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_2150 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_3149 = [
  _hoisted_2150
];
function _sfc_render150(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1150, _hoisted_3149);
}
var loading_default = /* @__PURE__ */ export_helper_default(loading_vue_vue_type_script_lang_default, [["render", _sfc_render150], ["__file", "loading.vue"]]);
const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => isObject$3(val) && !!val[epPropKey];
const buildProp = (prop, key) => {
  if (!isObject$3(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type: type2, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn$2(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn$1(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
    }
    return valid;
  } : void 0;
  const epProp = {
    type: type2,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (hasOwn$2(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
  key,
  buildProp(option, key)
]));
const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const CloseComponents = {
  Close: close_default
};
const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
const withNoopInstall = (component) => {
  component.install = NOOP;
  return component;
};
const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref2) => {
      if (isFunction$2(ref2)) {
        ref2(el);
      } else {
        ref2.value = el;
      }
    });
  };
};
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const UPDATE_MODEL_EVENT = "update:modelValue";
const componentSizes = ["", "default", "small", "large"];
var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
  PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
  PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
  PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
  PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
  PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
  PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
  PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
  PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
  PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
  PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
  PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
  return PatchFlags2;
})(PatchFlags || {});
const useDeprecated = ({ from, replacement, scope, version: version2, ref: ref2, type: type2 = "API" }, condition) => {
  watch(() => unref(condition), (val) => {
    if (val) {
      debugWarn(scope, `[${type2}] ${from} is about to be deprecated in version ${version2}, please use ${replacement} instead.
For more detail, please visit: ${ref2}
`);
    }
  }, {
    immediate: true
  });
};
const useDraggable = (targetRef, dragRef, draggable) => {
  let transform = {
    offsetX: 0,
    offsetY: 0
  };
  const onMousedown = (e) => {
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;
    const targetRect = targetRef.value.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;
    const onMousemove = (e2) => {
      const moveX = Math.min(Math.max(offsetX + e2.clientX - downX, minLeft), maxLeft);
      const moveY = Math.min(Math.max(offsetY + e2.clientY - downY, minTop), maxTop);
      transform = {
        offsetX: moveX,
        offsetY: moveY
      };
      targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
    };
    const onMouseup = () => {
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("mouseup", onMouseup);
    };
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
  };
  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener("mousedown", onMousedown);
    }
  };
  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener("mousedown", onMousedown);
    }
  };
  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });
  onBeforeUnmount(() => {
    offDraggable();
  });
};
var English = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
  var _a2;
  return `${(_a2 = option == null ? void 0 : option[key]) != null ? _a2 : `{${key}}`}`;
});
const buildLocaleContext = (locale) => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};
const localeContextKey = Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
  const locale = localeOverrides || inject(localeContextKey, ref());
  return buildLocaleContext(computed(() => locale.value || English));
};
const defaultNamespace = "el";
const statePrefix = "is-";
const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};
const namespaceContextKey = Symbol("namespaceContextKey");
const useGetDerivedNamespace = (namespaceOverrides) => {
  const derivedNamespace = namespaceOverrides || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace));
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};
const useNamespace = (block, namespaceOverrides) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides);
  const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
  const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
  const m2 = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
  const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
  const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
  const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  const cssVar = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarBlock = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarName = (name) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
  return {
    namespace,
    b,
    e,
    m: m2,
    be,
    em,
    bm,
    bem,
    is,
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  };
};
const useLockscreen = (trigger, options = {}) => {
  if (!isRef(trigger)) {
    throwError$1("[useLockscreen]", "You need to pass a ref param to this function");
  }
  const ns = options.ns || useNamespace("popup");
  const hiddenCls = computed$1(() => ns.bm("parent", "hidden"));
  if (!isClient || hasClass(document.body, hiddenCls.value)) {
    return;
  }
  let scrollBarWidth2 = 0;
  let withoutHiddenClass = false;
  let bodyWidth = "0";
  const cleanup = () => {
    setTimeout(() => {
      removeClass(document == null ? void 0 : document.body, hiddenCls.value);
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth;
      }
    }, 200);
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width;
    }
    scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle(document.body, "overflowY");
    if (scrollBarWidth2 > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.width = `calc(100% - ${scrollBarWidth2}px)`;
    }
    addClass(document.body, hiddenCls.value);
  });
  onScopeDispose(() => cleanup());
};
const useProp = (name) => {
  const vm = getCurrentInstance();
  return computed(() => {
    var _a2, _b;
    return (_b = (_a2 = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a2.$props) == null ? void 0 : _b[name];
  });
};
const useSameTarget = (handleClick) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }
  let mousedownTarget = false;
  let mouseupTarget = false;
  const onClick = (e) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };
  const onMousedown = (e) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e) => {
    mouseupTarget = e.target === e.currentTarget;
  };
  return { onClick, onMousedown, onMouseup };
};
const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
};
const ID_INJECTION_KEY = Symbol("elIdInjection");
const useIdInjection = () => {
  return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
};
const useId = (deterministicId) => {
  const idInjection = useIdInjection();
  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  }
  const namespace = useGetDerivedNamespace();
  const idRef = computed(() => unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
  return idRef;
};
let registeredEscapeHandlers = [];
const cachedHandler = (e) => {
  const event = e;
  if (event.key === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
  }
};
const useEscapeKeydown = (handler) => {
  onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener("keydown", cachedHandler);
    }
    if (isClient)
      registeredEscapeHandlers.push(handler);
  });
  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
    if (registeredEscapeHandlers.length === 0) {
      if (isClient)
        document.removeEventListener("keydown", cachedHandler);
    }
  });
};
const zIndex = ref(0);
const defaultInitialZIndex = 2e3;
const zIndexContextKey = Symbol("zIndexContextKey");
const useZIndex = (zIndexOverrides) => {
  const zIndexInjection = zIndexOverrides || (getCurrentInstance() ? inject(zIndexContextKey, void 0) : void 0);
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection);
    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};
const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const SIZE_INJECTION_KEY = Symbol("size");
const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {});
  return computed(() => {
    return unref(injectedSize.size) || "";
  });
};
const configProviderContextKey = Symbol();
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => {
      var _a2, _b;
      return (_b = (_a2 = config.value) == null ? void 0 : _a2[key]) != null ? _b : defaultValue;
    });
  } else {
    return config;
  }
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});
const __default__$4 = defineComponent({
  name: "ElIcon",
  inheritAttrs: false
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      if (!size && !color)
        return {};
      return {
        fontSize: isUndefined(size) ? void 0 : addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        class: unref(ns).b(),
        style: unref(style)
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ElIcon = withInstall(Icon);
const formContextKey = Symbol("formContextKey");
const formItemContextKey = Symbol("formItemContextKey");
const useFormSize = (fallback, ignore = {}) => {
  const emptyRef = ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  const globalConfig2 = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
  const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(() => size.value || unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || "");
};
const useFormDisabled = (fallback) => {
  const disabled = useProp("disabled");
  const form = inject(formContextKey, void 0);
  return computed(() => disabled.value || unref(fallback) || (form == null ? void 0 : form.disabled) || false);
};
const useFormItem = () => {
  const form = inject(formContextKey, void 0);
  const formItem = inject(formItemContextKey, void 0);
  return {
    form,
    formItem
  };
};
const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
const FOCUS_AFTER_TRAPPED_OPTS = {
  cancelable: true,
  bubbles: false
};
const FOCUSOUT_PREVENTED_OPTS = {
  cancelable: true,
  bubbles: false
};
const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
const focusReason = ref();
const lastUserFocusTimestamp = ref(0);
const lastAutomatedFocusTimestamp = ref(0);
let focusReasonUserCount = 0;
const obtainAllFocusableElements = (element) => {
  const nodes = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
};
const getVisibleElement = (elements, container) => {
  for (const element of elements) {
    if (!isHidden(element, container))
      return element;
  }
};
const isHidden = (element, container) => {
  if (process.env.NODE_ENV === "test")
    return false;
  if (getComputedStyle(element).visibility === "hidden")
    return true;
  while (element) {
    if (container && element === container)
      return false;
    if (getComputedStyle(element).display === "none")
      return true;
    element = element.parentElement;
  }
  return false;
};
const getEdges = (container) => {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement(focusable, container);
  const last2 = getVisibleElement(focusable.reverse(), container);
  return [first, last2];
};
const isSelectable = (element) => {
  return element instanceof HTMLInputElement && "select" in element;
};
const tryFocus = (element, shouldSelect) => {
  if (element && element.focus) {
    const prevFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    lastAutomatedFocusTimestamp.value = window.performance.now();
    if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
      element.select();
    }
  }
};
function removeFromStack(list, item) {
  const copy2 = [...list];
  const idx = list.indexOf(item);
  if (idx !== -1) {
    copy2.splice(idx, 1);
  }
  return copy2;
}
const createFocusableStack = () => {
  let stack = [];
  const push2 = (layer) => {
    const currentLayer = stack[0];
    if (currentLayer && layer !== currentLayer) {
      currentLayer.pause();
    }
    stack = removeFromStack(stack, layer);
    stack.unshift(layer);
  };
  const remove = (layer) => {
    var _a2, _b;
    stack = removeFromStack(stack, layer);
    (_b = (_a2 = stack[0]) == null ? void 0 : _a2.resume) == null ? void 0 : _b.call(_a2);
  };
  return {
    push: push2,
    remove
  };
};
const focusFirstDescendant = (elements, shouldSelect = false) => {
  const prevFocusedElement = document.activeElement;
  for (const element of elements) {
    tryFocus(element, shouldSelect);
    if (document.activeElement !== prevFocusedElement)
      return;
  }
};
const focusableStack = createFocusableStack();
const isFocusCausedByUserEvent = () => {
  return lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value;
};
const notifyFocusReasonPointer = () => {
  focusReason.value = "pointer";
  lastUserFocusTimestamp.value = window.performance.now();
};
const notifyFocusReasonKeydown = () => {
  focusReason.value = "keyboard";
  lastUserFocusTimestamp.value = window.performance.now();
};
const useFocusReason = () => {
  onMounted(() => {
    if (focusReasonUserCount === 0) {
      document.addEventListener("mousedown", notifyFocusReasonPointer);
      document.addEventListener("touchstart", notifyFocusReasonPointer);
      document.addEventListener("keydown", notifyFocusReasonKeydown);
    }
    focusReasonUserCount++;
  });
  onBeforeUnmount(() => {
    focusReasonUserCount--;
    if (focusReasonUserCount <= 0) {
      document.removeEventListener("mousedown", notifyFocusReasonPointer);
      document.removeEventListener("touchstart", notifyFocusReasonPointer);
      document.removeEventListener("keydown", notifyFocusReasonKeydown);
    }
  });
  return {
    focusReason,
    lastUserFocusTimestamp,
    lastAutomatedFocusTimestamp
  };
};
const createFocusOutPreventedEvent = (detail) => {
  return new CustomEvent(FOCUSOUT_PREVENTED, {
    ...FOCUSOUT_PREVENTED_OPTS,
    detail
  });
};
const _sfc_main$8 = defineComponent({
  name: "ElFocusTrap",
  inheritAttrs: false,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(props, { emit }) {
    const forwardRef2 = ref();
    let lastFocusBeforeTrapped;
    let lastFocusAfterTrapped;
    const { focusReason: focusReason2 } = useFocusReason();
    useEscapeKeydown((event) => {
      if (props.trapped && !focusLayer.paused) {
        emit("release-requested", event);
      }
    });
    const focusLayer = {
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    };
    const onKeydown = (e) => {
      if (!props.loop && !props.trapped)
        return;
      if (focusLayer.paused)
        return;
      const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
      const { loop } = props;
      const isTabbing = key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
      const currentFocusingEl = document.activeElement;
      if (isTabbing && currentFocusingEl) {
        const container = currentTarget;
        const [first, last2] = getEdges(container);
        const isTabbable = first && last2;
        if (!isTabbable) {
          if (currentFocusingEl === container) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
            }
          }
        } else {
          if (!shiftKey && currentFocusingEl === last2) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(first, true);
            }
          } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(last2, true);
            }
          }
        }
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: forwardRef2,
      onKeydown
    });
    watch(() => props.focusTrapEl, (focusTrapEl) => {
      if (focusTrapEl) {
        forwardRef2.value = focusTrapEl;
      }
    }, { immediate: true });
    watch([forwardRef2], ([forwardRef22], [oldForwardRef]) => {
      if (forwardRef22) {
        forwardRef22.addEventListener("keydown", onKeydown);
        forwardRef22.addEventListener("focusin", onFocusIn);
        forwardRef22.addEventListener("focusout", onFocusOut);
      }
      if (oldForwardRef) {
        oldForwardRef.removeEventListener("keydown", onKeydown);
        oldForwardRef.removeEventListener("focusin", onFocusIn);
        oldForwardRef.removeEventListener("focusout", onFocusOut);
      }
    });
    const trapOnFocus = (e) => {
      emit(ON_TRAP_FOCUS_EVT, e);
    };
    const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
    const onFocusIn = (e) => {
      const trapContainer = unref(forwardRef2);
      if (!trapContainer)
        return;
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      const isFocusedInTrap = target && trapContainer.contains(target);
      if (!props.trapped) {
        const isPrevFocusedInTrap = relatedTarget && trapContainer.contains(relatedTarget);
        if (!isPrevFocusedInTrap) {
          lastFocusBeforeTrapped = relatedTarget;
        }
      }
      if (isFocusedInTrap)
        emit("focusin", e);
      if (focusLayer.paused)
        return;
      if (props.trapped) {
        if (isFocusedInTrap) {
          lastFocusAfterTrapped = target;
        } else {
          tryFocus(lastFocusAfterTrapped, true);
        }
      }
    };
    const onFocusOut = (e) => {
      const trapContainer = unref(forwardRef2);
      if (focusLayer.paused || !trapContainer)
        return;
      if (props.trapped) {
        const relatedTarget = e.relatedTarget;
        if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
          setTimeout(() => {
            if (!focusLayer.paused && props.trapped) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }
          }, 0);
        }
      } else {
        const target = e.target;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!isFocusedInTrap)
          emit("focusout", e);
      }
    };
    async function startTrap() {
      await nextTick();
      const trapContainer = unref(forwardRef2);
      if (trapContainer) {
        focusableStack.push(focusLayer);
        const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
        lastFocusBeforeTrapped = prevFocusedElement;
        const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
        if (!isPrevFocusContained) {
          const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
          trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
          trapContainer.dispatchEvent(focusEvent);
          if (!focusEvent.defaultPrevented) {
            nextTick(() => {
              let focusStartEl = props.focusStartEl;
              if (!isString$2(focusStartEl)) {
                tryFocus(focusStartEl);
                if (document.activeElement !== focusStartEl) {
                  focusStartEl = "first";
                }
              }
              if (focusStartEl === "first") {
                focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
              }
              if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                tryFocus(trapContainer);
              }
            });
          }
        }
      }
    }
    function stopTrap() {
      const trapContainer = unref(forwardRef2);
      if (trapContainer) {
        trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
        const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
          ...FOCUS_AFTER_TRAPPED_OPTS,
          detail: {
            focusReason: focusReason2.value
          }
        });
        trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
        trapContainer.dispatchEvent(releasedEvent);
        if (!releasedEvent.defaultPrevented && (focusReason2.value == "keyboard" || !isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) {
          tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body);
        }
        trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
        focusableStack.remove(focusLayer);
      }
    }
    onMounted(() => {
      if (props.trapped) {
        startTrap();
      }
      watch(() => props.trapped, (trapped) => {
        if (trapped) {
          startTrap();
        } else {
          stopTrap();
        }
      });
    });
    onBeforeUnmount(() => {
      if (props.trapped) {
        stopTrap();
      }
    });
    return {
      onKeydown
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$2], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const buttonGroupContextKey = Symbol("buttonGroupContextKey");
const useButton = (props, emit) => {
  useDeprecated({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, computed(() => props.type === "text"));
  const buttonGroupContext = inject(buttonGroupContextKey, void 0);
  const globalConfig2 = useGlobalConfig("button");
  const { form } = useFormItem();
  const _size = useFormSize(computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
  const _disabled = useFormDisabled();
  const _ref = ref();
  const slots = useSlots();
  const _type = computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
  const autoInsertSpace = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.autoInsertSpace) != null ? _c : false;
  });
  const _props = computed(() => {
    if (props.tag === "button") {
      return {
        ariaDisabled: _disabled.value || props.loading,
        disabled: _disabled.value || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType
      };
    }
    return {};
  });
  const shouldAddSpace = computed(() => {
    var _a2;
    const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
      const slot = defaultSlot[0];
      if ((slot == null ? void 0 : slot.type) === Text) {
        const text = slot.children;
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
      }
    }
    return false;
  });
  const handleClick = (evt) => {
    if (props.nativeType === "reset") {
      form == null ? void 0 : form.resetFields();
    }
    emit("click", evt);
  };
  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    shouldAddSpace,
    handleClick
  };
};
const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
];
const buttonNativeTypes = ["button", "submit", "reset"];
const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  icon: {
    type: iconPropType
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: definePropType([String, Object]),
    default: "button"
  }
});
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};
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
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
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
      var _a2;
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
      this.format = (_a2 = opts.format) !== null && _a2 !== void 0 ? _a2 : rgb.format;
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
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a2 = Object.entries(names); _i < _a2.length; _i++) {
        var _b = _a2[_i], key = _b[0], value = _b[1];
        if (hex === value) {
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
function darken(color, amount = 20) {
  return color.mix("#141414", amount).toString();
}
function useButtonCustomStyle(props) {
  const _disabled = useFormDisabled();
  const ns = useNamespace("button");
  return computed(() => {
    let styles = {};
    const buttonColor = props.color;
    if (buttonColor) {
      const color = new TinyColor(buttonColor);
      const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
      if (props.plain) {
        styles = ns.cssVarBlock({
          "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
          "text-color": buttonColor,
          "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
          "hover-text-color": `var(${ns.cssVarName("color-white")})`,
          "hover-bg-color": buttonColor,
          "hover-border-color": buttonColor,
          "active-bg-color": activeBgColor,
          "active-text-color": `var(${ns.cssVarName("color-white")})`,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
        }
      } else {
        const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
        const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
        styles = ns.cssVarBlock({
          "bg-color": buttonColor,
          "text-color": textColor,
          "border-color": buttonColor,
          "hover-bg-color": hoverBgColor,
          "hover-text-color": textColor,
          "hover-border-color": hoverBgColor,
          "active-bg-color": activeBgColor,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
          styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
        }
      }
    }
    return styles;
  });
}
const __default__$3 = defineComponent({
  name: "ElButton"
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: buttonProps,
  emits: buttonEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const buttonStyle = useButtonCustomStyle(props);
    const ns = useNamespace("button");
    const { _ref, _size, _type, _disabled, _props, shouldAddSpace, handleClick } = useButton(props, emit);
    expose({
      ref: _ref,
      size: _size,
      type: _type,
      disabled: _disabled,
      shouldAddSpace
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
        ref_key: "_ref",
        ref: _ref
      }, unref(_props), {
        class: [
          unref(ns).b(),
          unref(ns).m(unref(_type)),
          unref(ns).m(unref(_size)),
          unref(ns).is("disabled", unref(_disabled)),
          unref(ns).is("loading", _ctx.loading),
          unref(ns).is("plain", _ctx.plain),
          unref(ns).is("round", _ctx.round),
          unref(ns).is("circle", _ctx.circle),
          unref(ns).is("text", _ctx.text),
          unref(ns).is("link", _ctx.link),
          unref(ns).is("has-bg", _ctx.bg)
        ],
        style: unref(buttonStyle),
        onClick: unref(handleClick)
      }), {
        default: withCtx(() => [
          _ctx.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass(unref(ns).is("loading"))
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon)))
              ]),
              _: 1
            }, 8, ["class"]))
          ], 64)) : _ctx.icon || _ctx.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
            default: withCtx(() => [
              _ctx.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon), { key: 0 })) : renderSlot(_ctx.$slots, "icon", { key: 1 })
            ]),
            _: 3
          })) : createCommentVNode("v-if", true),
          _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: normalizeClass({ [unref(ns).em("text", "expand")]: unref(shouldAddSpace) })
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 16, ["class", "style", "onClick"]);
    };
  }
});
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
};
const __default__$2 = defineComponent({
  name: "ElButtonGroup"
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: buttonGroupProps,
  setup(__props) {
    const props = __props;
    provide(buttonGroupContextKey, reactive({
      size: toRef(props, "size"),
      type: toRef(props, "type")
    }));
    const ns = useNamespace("button");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`${unref(ns).b("group")}`)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const ElButton = withInstall(Button, {
  ButtonGroup
});
withNoopInstall(ButtonGroup);
const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: {
    type: Boolean,
    default: false
  },
  overlayClass: {
    type: definePropType([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: definePropType([String, Number])
  }
});
const overlayEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const BLOCK = "overlay";
var Overlay = defineComponent({
  name: "ElOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace(BLOCK);
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
    return () => {
      return props.mask ? createVNode("div", {
        class: [ns.b(), props.overlayClass],
        style: {
          zIndex: props.zIndex
        },
        onClick,
        onMousedown,
        onMouseup
      }, [renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [renderSlot(slots, "default")]);
    };
  }
});
const ElOverlay = Overlay;
const dialogInjectionKey = Symbol("dialogInjectionKey");
const dialogContentProps = buildProps({
  center: Boolean,
  alignCenter: Boolean,
  closeIcon: {
    type: iconPropType
  },
  customClass: {
    type: String,
    default: ""
  },
  draggable: Boolean,
  fullscreen: Boolean,
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const dialogContentEmits = {
  close: () => true
};
const _hoisted_1$2 = ["aria-level"];
const _hoisted_2$1 = ["aria-label"];
const _hoisted_3 = ["id"];
const __default__$1 = defineComponent({ name: "ElDialogContent" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: dialogContentProps,
  emits: dialogContentEmits,
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const { Close } = CloseComponents;
    const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
    const dialogKls = computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("draggable", props.draggable),
      ns.is("align-center", props.alignCenter),
      { [ns.m("center")]: props.center },
      props.customClass
    ]);
    const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
    const draggable = computed(() => props.draggable);
    useDraggable(dialogRef, headerRef, draggable);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref: unref(composedDialogRef),
        class: normalizeClass(unref(dialogKls)),
        style: normalizeStyle(unref(style)),
        tabindex: "-1"
      }, [
        createElementVNode("header", {
          ref_key: "headerRef",
          ref: headerRef,
          class: normalizeClass(unref(ns).e("header"))
        }, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            createElementVNode("span", {
              role: "heading",
              "aria-level": _ctx.ariaLevel,
              class: normalizeClass(unref(ns).e("title"))
            }, toDisplayString(_ctx.title), 11, _hoisted_1$2)
          ]),
          _ctx.showClose ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": unref(t)("el.dialog.close"),
            class: normalizeClass(unref(ns).e("headerbtn")),
            type: "button",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
          }, [
            createVNode(unref(ElIcon), {
              class: normalizeClass(unref(ns).e("close"))
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon || unref(Close))))
              ]),
              _: 1
            }, 8, ["class"])
          ], 10, _hoisted_2$1)) : createCommentVNode("v-if", true)
        ], 2),
        createElementVNode("div", {
          id: unref(bodyId),
          class: normalizeClass(unref(ns).e("body"))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10, _hoisted_3),
        _ctx.$slots.footer ? (openBlock(), createElementBlock("footer", {
          key: 0,
          class: normalizeClass(unref(ns).e("footer"))
        }, [
          renderSlot(_ctx.$slots, "footer")
        ], 2)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var ElDialogContent = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);
const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: Boolean,
  beforeClose: {
    type: definePropType(Function)
  },
  destroyOnClose: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: Boolean,
  modalClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: {
    type: Boolean,
    default: false
  },
  headerAriaLevel: {
    type: String,
    default: "2"
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => isBoolean$1(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
const useDialog = (props, targetRef) => {
  const instance = getCurrentInstance();
  const emit = instance.emit;
  const { nextZIndex } = useZIndex();
  let lastPosition = "";
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex2 = ref(props.zIndex || nextZIndex());
  let openTimer = void 0;
  let closeTimer = void 0;
  const namespace = useGlobalConfig("namespace", defaultNamespace);
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      if (props.width) {
        style2[`${varPrefix}-width`] = addUnit(props.width);
      }
    }
    return style2;
  });
  const overlayDialogStyle = computed(() => {
    if (props.alignCenter) {
      return { display: "flex" };
    }
    return {};
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }
  function beforeLeave() {
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel)
        return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (!isClient)
      return;
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
      event.preventDefault();
    }
  }
  if (props.lockScroll) {
    useLockscreen(visible);
  }
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  watch(() => props.modelValue, (val) => {
    if (val) {
      closed.value = false;
      open();
      rendered.value = true;
      zIndex2.value = props.zIndex ? zIndex2.value++ : nextZIndex();
      nextTick(() => {
        emit("open");
        if (targetRef.value) {
          targetRef.value.scrollTop = 0;
        }
      });
    } else {
      if (visible.value) {
        close();
      }
    }
  });
  watch(() => props.fullscreen, (val) => {
    if (!targetRef.value)
      return;
    if (val) {
      lastPosition = targetRef.value.style.transform;
      targetRef.value.style.transform = "";
    } else {
      targetRef.value.style.transform = lastPosition;
    }
  });
  onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      rendered.value = true;
      open();
    }
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex: zIndex2
  };
};
const _hoisted_1$1 = ["aria-label", "aria-labelledby", "aria-describedby"];
const __default__ = defineComponent({
  name: "ElDialog",
  inheritAttrs: false
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated({
      scope: "el-dialog",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/dialog.html#slots"
    }, computed(() => !!slots.title));
    useDeprecated({
      scope: "el-dialog",
      from: "custom-class",
      replacement: "class",
      version: "2.3.0",
      ref: "https://element-plus.org/en-US/component/dialog.html#attributes",
      type: "Attribute"
    }, computed(() => !!props.customClass));
    const ns = useNamespace("dialog");
    const dialogRef = ref();
    const headerRef = ref();
    const dialogContentRef = ref();
    const {
      visible,
      titleId,
      bodyId,
      style,
      overlayDialogStyle,
      rendered,
      zIndex: zIndex2,
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented
    } = useDialog(props, dialogRef);
    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style
    });
    const overlayEvent = useSameTarget(onModalClick);
    const draggable = computed(() => props.draggable && !props.fullscreen);
    expose({
      visible,
      dialogContentRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: "body",
        disabled: !_ctx.appendToBody
      }, [
        createVNode(Transition, {
          name: "dialog-fade",
          onAfterEnter: unref(afterEnter),
          onAfterLeave: unref(afterLeave),
          onBeforeLeave: unref(beforeLeave),
          persisted: ""
        }, {
          default: withCtx(() => [
            withDirectives(createVNode(unref(ElOverlay), {
              "custom-mask-event": "",
              mask: _ctx.modal,
              "overlay-class": _ctx.modalClass,
              "z-index": unref(zIndex2)
            }, {
              default: withCtx(() => [
                createElementVNode("div", {
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-label": _ctx.title || void 0,
                  "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                  "aria-describedby": unref(bodyId),
                  class: normalizeClass(`${unref(ns).namespace.value}-overlay-dialog`),
                  style: normalizeStyle(unref(overlayDialogStyle)),
                  onClick: _cache[0] || (_cache[0] = (...args) => unref(overlayEvent).onClick && unref(overlayEvent).onClick(...args)),
                  onMousedown: _cache[1] || (_cache[1] = (...args) => unref(overlayEvent).onMousedown && unref(overlayEvent).onMousedown(...args)),
                  onMouseup: _cache[2] || (_cache[2] = (...args) => unref(overlayEvent).onMouseup && unref(overlayEvent).onMouseup(...args))
                }, [
                  createVNode(unref(ElFocusTrap), {
                    loop: "",
                    trapped: unref(visible),
                    "focus-start-el": "container",
                    onFocusAfterTrapped: unref(onOpenAutoFocus),
                    onFocusAfterReleased: unref(onCloseAutoFocus),
                    onFocusoutPrevented: unref(onFocusoutPrevented),
                    onReleaseRequested: unref(onCloseRequested)
                  }, {
                    default: withCtx(() => [
                      unref(rendered) ? (openBlock(), createBlock(ElDialogContent, mergeProps({
                        key: 0,
                        ref_key: "dialogContentRef",
                        ref: dialogContentRef
                      }, _ctx.$attrs, {
                        "custom-class": _ctx.customClass,
                        center: _ctx.center,
                        "align-center": _ctx.alignCenter,
                        "close-icon": _ctx.closeIcon,
                        draggable: unref(draggable),
                        fullscreen: _ctx.fullscreen,
                        "show-close": _ctx.showClose,
                        title: _ctx.title,
                        "aria-level": _ctx.headerAriaLevel,
                        onClose: unref(handleClose)
                      }), createSlots({
                        header: withCtx(() => [
                          !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                            key: 0,
                            close: unref(handleClose),
                            titleId: unref(titleId),
                            titleClass: unref(ns).e("title")
                          }) : renderSlot(_ctx.$slots, "title", { key: 1 })
                        ]),
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 2
                      }, [
                        _ctx.$slots.footer ? {
                          name: "footer",
                          fn: withCtx(() => [
                            renderSlot(_ctx.$slots, "footer")
                          ])
                        } : void 0
                      ]), 1040, ["custom-class", "center", "align-center", "close-icon", "draggable", "fullscreen", "show-close", "title", "aria-level", "onClose"])) : createCommentVNode("v-if", true)
                    ]),
                    _: 3
                  }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                ], 46, _hoisted_1$1)
              ]),
              _: 3
            }, 8, ["mask", "overlay-class", "z-index"]), [
              [vShow, unref(visible)]
            ])
          ]),
          _: 3
        }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
      ], 8, ["disabled"]);
    };
  }
});
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);
const ElDialog = withInstall(Dialog);
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
        "api": "action://cancel"
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
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence))
    return sequence;
  else if (isNothing(sequence))
    return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat2(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat2;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact3) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark)
    return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact3 && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString2(compact3) {
  return this.name + ": " + formatError(this, compact3);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string, max) {
  return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer)
    return null;
  if (!options.maxLength)
    options.maxLength = 79;
  if (typeof options.indent !== "number")
    options.indent = 1;
  if (typeof options.linesBefore !== "number")
    options.linesBefore = 3;
  if (typeof options.linesAfter !== "number")
    options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match2;
  var foundLineNo = -1;
  while (match2 = re.exec(mark.buffer)) {
    lineEnds.push(match2.index);
    lineStarts.push(match2.index + match2[0].length);
    if (mark.position <= match2.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0)
    foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0)
      break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length)
      break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit)
      implicit = implicit.concat(definition.implicit);
    if (definition.explicit)
      explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null)
    return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null)
    return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null)
    return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max)
    return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max)
      return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch !== "0" && ch !== "1")
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isHexCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isOctCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_")
    return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_")
      continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_")
    return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-")
      sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0")
    return 0;
  if (ch === "0") {
    if (value[1] === "b")
      return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x")
      return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o")
      return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null)
    return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null)
    return false;
  if (YAML_DATE_REGEXP.exec(data) !== null)
    return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
    return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match2, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match2 = YAML_DATE_REGEXP.exec(data);
  if (match2 === null)
    match2 = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match2 === null)
    throw new Error("Date resolve error");
  year = +match2[1];
  month = +match2[2] - 1;
  day = +match2[3];
  if (!match2[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match2[4];
  minute = +match2[5];
  second = +match2[6];
  if (match2[7]) {
    fraction = match2[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match2[9]) {
    tz_hour = +match2[10];
    tz_minute = +(match2[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match2[9] === "-")
      delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta)
    date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge2 = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null)
    return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64)
      continue;
    if (code < 0)
      return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null)
    return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]")
      return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey)
          pairHasKey = true;
        else
          return false;
      }
    }
    if (!pairHasKey)
      return false;
    if (objectKeys.indexOf(pairKey) === -1)
      objectKeys.push(pairKey);
    else
      return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null)
    return true;
  var index, length, pair, keys2, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]")
      return false;
    keys2 = Object.keys(pair);
    if (keys2.length !== 1)
      return false;
    result[index] = [keys2[0], pair[keys2[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null)
    return [];
  var index, length, pair, keys2, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys2 = Object.keys(pair);
    result[index] = [keys2[0], pair[keys2[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null)
    return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null)
        return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default$1 = core.extend({
  implicit: [
    timestamp,
    merge2
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? " " : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default$1;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match2, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match2 = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match2 === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match2[1], 10);
    minor = parseInt(match2[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33)
    return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38)
    return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42)
    return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch))
        break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0)
      readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys2, index, length, tag, style, type2;
  if (map2 === null)
    return {};
  result = {};
  keys2 = Object.keys(map2);
  for (index = 0, length = keys2.length; index < length; index += 1) {
    tag = keys2[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default$1;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n")
      result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match2;
  while (match2 = lineRe.exec(string)) {
    var prefix = match2[1], line = match2[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ")
    return line;
  var breakRe = / [^ ]/g;
  var match2;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match2 = breakRe.exec(line)) {
    next = match2.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536)
        result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "")
        _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact3) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact3 || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "")
      pairBuffer += ", ";
    if (state.condenseFlow)
      pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024)
      pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact3) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact3 || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact3, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact3 = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact3);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact3);
        } else {
          writeBlockSequence(state, level, state.dump, compact3);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid)
        return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs)
    getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true))
    return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var Type = type;
var Schema = schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default$1;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
var types = {
  binary,
  float,
  map,
  null: _null,
  pairs,
  set,
  timestamp,
  bool,
  int,
  merge: merge2,
  omap,
  seq,
  str
};
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
  Type,
  Schema,
  FAILSAFE_SCHEMA,
  JSON_SCHEMA,
  CORE_SCHEMA,
  DEFAULT_SCHEMA,
  load,
  loadAll,
  dump,
  YAMLException,
  types,
  safeLoad,
  safeLoadAll,
  safeDump
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
    const componentType = ref(AmisPageEditor);
    const { useI18n: useI18n2 } = useAdapter();
    watchEffect(() => {
      useAdapter().getPage(props.path).then((schema2) => {
        const schemaTypeName = schema2["xui:schema-type"];
        if (!schemaTypeName) {
          componentType.value = AmisPageEditor;
        } else {
          const schemaType = getSchemaType(schemaTypeName);
          if (!schemaType) {
            const { t } = useI18n2();
            useAdapter().notify("error", t("nop.err.unknown-schema-type"));
            throw new Error("nop.err.unknown-schema-type");
          }
          componentType.value = schemaType.editorComponentType;
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
const _hoisted_1 = { class: "my4 page-debugger" };
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
      schemaData.value = { schema: jsYaml.dump(props.schema), lang: "yaml" };
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
      let json2 = schemaData.value.lang == "yaml" ? jsYaml.load(data.schema) : JSON.parse(data.schema);
      emit("update:schema", json2);
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
      let schema2 = options.data.schema;
      if (options.data.lang == "yaml") {
        schemaData.value = { lang: "json", schema: JSON.stringify(jsYaml.load(schema2), null, "  ") };
      } else {
        schemaData.value = { lang: "yaml", schema: jsYaml.dump(JSON.parse(schema2)) };
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
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("span", _hoisted_1, [
          createVNode(unref(ElButton), {
            type: "primary",
            shape: "circle",
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
            shape: "circle",
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
const { useI18n } = useAdapter();
const _sfc_main$1 = defineComponent({
  props: {
    schema: Object,
    data: Object,
    registerPage: Function,
    actions: Object
  },
  setup(props) {
    let componentType = ref(AmisSchemaPage);
    watchEffect(() => {
      var _a2;
      const schemaTypeName = (_a2 = props.schema) == null ? void 0 : _a2["xui:schema-type"];
      if (!schemaTypeName) {
        componentType.value = AmisSchemaPage;
      } else {
        const schemaType = getSchemaType(schemaTypeName);
        if (!schemaType) {
          const { t } = useI18n();
          useAdapter().notify("error", t("nop.err.unknown-schema-type"));
          throw new Error("nop.err.unknown-schema-type");
        }
        componentType.value = schemaType.componentType;
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
const XuiSchemaPage = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["render", _sfc_render$1]]);
const { getPage } = useAdapter();
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
    let pageSchema = shallowRef();
    function registerPage(p) {
      var _a2;
      (_a2 = props.registerPage) == null ? void 0 : _a2.call(props, p);
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
  return openBlock(), createElementBlock(Fragment, null, [
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
const XuiPage = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["render", _sfc_render]]);
function ownKeys(t, e) {
  var r, n = Object.keys(t);
  return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t), e && (r = r.filter(function(e2) {
    return Object.getOwnPropertyDescriptor(t, e2).enumerable;
  })), n.push.apply(n, r)), n;
}
function _objectSpread2(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2 ? ownKeys(Object(r), true).forEach(function(e2) {
      _defineProperty(t, e2, r[e2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function(e2) {
      Object.defineProperty(t, e2, Object.getOwnPropertyDescriptor(r, e2));
    });
  }
  return t;
}
function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
    return typeof e2;
  } : function(e2) {
    return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
  })(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(e, n.key, n);
  }
}
function _createClass(e, t, r) {
  return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _defineProperty(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
}
function _extends() {
  return (_extends = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r, n = arguments[t];
      for (r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
function _inherits(e, t) {
  if ("function" != typeof t && null !== t)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: true, configurable: true } }), Object.defineProperty(e, "prototype", { writable: false }), t && _setPrototypeOf(e, t);
}
function _getPrototypeOf(e) {
  return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e2) {
    return e2.__proto__ || Object.getPrototypeOf(e2);
  })(e);
}
function _setPrototypeOf(e, t) {
  return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e2, t2) {
    return e2.__proto__ = t2, e2;
  })(e, t);
}
function _isNativeReflectConstruct() {
  if ("undefined" == typeof Reflect || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if ("function" == typeof Proxy)
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (e) {
    return false;
  }
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e)
    return {};
  for (var r, n = {}, o = Object.keys(e), a = 0; a < o.length; a++)
    r = o[a], 0 <= t.indexOf(r) || (n[r] = e[r]);
  return n;
}
function _objectWithoutProperties(e, t) {
  if (null == e)
    return {};
  var r, n = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols)
    for (var o = Object.getOwnPropertySymbols(e), a = 0; a < o.length; a++)
      r = o[a], 0 <= t.indexOf(r) || Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  return n;
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _possibleConstructorReturn(e, t) {
  if (t && ("object" == typeof t || "function" == typeof t))
    return t;
  if (void 0 !== t)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(e);
}
function _createSuper(r) {
  var n = _isNativeReflectConstruct();
  return function() {
    var e, t = _getPrototypeOf(r);
    return _possibleConstructorReturn(this, n ? (e = _getPrototypeOf(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments));
  };
}
function _slicedToArray(e, t) {
  return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest();
}
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
}
function _arrayWithoutHoles(e) {
  if (Array.isArray(e))
    return _arrayLikeToArray(e);
}
function _arrayWithHoles(e) {
  if (Array.isArray(e))
    return e;
}
function _iterableToArray(e) {
  if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
    return Array.from(e);
}
function _iterableToArrayLimit(e, t) {
  var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (null != r) {
    var n, o, a = [], i = true, u = false;
    try {
      for (r = r.call(e); !(i = (n = r.next()).done) && (a.push(n.value), !t || a.length !== t); i = true)
        ;
    } catch (e2) {
      u = true, o = e2;
    } finally {
      try {
        i || null == r.return || r.return();
      } finally {
        if (u)
          throw o;
      }
    }
    return a;
  }
}
function _unsupportedIterableToArray(e, t) {
  var r;
  if (e)
    return "string" == typeof e ? _arrayLikeToArray(e, t) : "Map" === (r = "Object" === (r = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0;
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(e, t) {
  if ("object" != typeof e || null === e)
    return e;
  var r = e[Symbol.toPrimitive];
  if (void 0 === r)
    return ("string" === t ? String : Number)(e);
  r = r.call(e, t || "default");
  if ("object" != typeof r)
    return r;
  throw new TypeError("@@toPrimitive must return a primitive value.");
}
function _toPropertyKey(e) {
  e = _toPrimitive(e, "string");
  return "symbol" == typeof e ? e : String(e);
}
var originOptions = { react: { componentWrap: "div", slotWrap: "div", componentWrapAttrs: { __use_react_component_wrap: "", style: { all: "unset" } }, slotWrapAttrs: { __use_react_slot_wrap: "", style: { all: "unset" } }, vueNamedSlotsKey: ["node:"] }, vue: { componentWrapHOC: function(t) {
  return function() {
    var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).portals;
    return createElement(Fragment$1, null, t, (void 0 === e ? [] : e).map(function(e2) {
      var t2 = e2.Portal, e2 = e2.key;
      return createElement(t2, { key: e2 });
    }));
  };
}, componentWrapAttrs: { "data-use-vue-component-wrap": "", style: { all: "unset" } }, slotWrapAttrs: { "data-use-vue-slot-wrap": "", style: { all: "unset" } } } };
function setOptions() {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : { react: {}, vue: {} }, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : originOptions, r = 2 < arguments.length ? arguments[2] : void 0, t = (e.vue || (e.vue = {}), e.react || (e.react = {}), [t, _objectSpread2(_objectSpread2({}, e), {}, { react: _objectSpread2(_objectSpread2(_objectSpread2({}, t.react), e.react), {}, { componentWrapAttrs: _objectSpread2(_objectSpread2({}, t.react.componentWrapAttrs), e.react.componentWrapAttrs), slotWrapAttrs: _objectSpread2(_objectSpread2({}, t.react.slotWrapAttrs), e.react.slotWrapAttrs) }), vue: _objectSpread2(_objectSpread2(_objectSpread2({}, t.vue), e.vue), {}, { componentWrapAttrs: _objectSpread2(_objectSpread2({}, t.vue.componentWrapAttrs), e.vue.componentWrapAttrs), slotWrapAttrs: _objectSpread2(_objectSpread2({}, t.vue.slotWrapAttrs), e.vue.slotWrapAttrs) }) })]);
  return r && t.unshift({}), Object.assign.apply(this, t);
}
var domMethods = ["getElementById", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "querySelector", "querySelectorAll"], domTopObject = { Document: {}, Element: {} };
function overwriteDomMethods(i) {
  Object.keys(domTopObject).forEach(function(e) {
    domMethods.forEach(function(o) {
      var a = window[e].prototype[o];
      domTopObject[e][o] = a, window[e].prototype[o] = function() {
        for (var e2 = arguments.length, t = new Array(e2), r = 0; r < e2; r++)
          t[r] = arguments[r];
        var n = a.apply(this, t);
        return n && (n.constructor !== NodeList || n.constructor === NodeList && 0 < n.length) ? n : Element.prototype[o].apply(i, t);
      };
    });
  });
}
function recoverDomMethods() {
  Object.keys(domTopObject).forEach(function(t) {
    domMethods.forEach(function(e) {
      window[t].prototype[e] = domTopObject[t][e];
    });
  });
}
var _excluded = ["ref"], _excluded2 = ["key"], _excluded3 = ["hashList"], ReactMajorVersion = parseInt(version);
function toRaws(e) {
  return e;
}
var FunctionComponentWrap = function() {
  _inherits(r, Component);
  var t = _createSuper(r);
  function r(e) {
    return _classCallCheck(this, r), t.call(this, e);
  }
  return _createClass(r, [{ key: "render", value: function() {
    var e = this.props.component, t2 = this.props.passedProps, t2 = (t2.ref, _objectWithoutProperties(t2, _excluded));
    return createElement(e, t2, this.props.children);
  } }]), r;
}(), createReactContainer = function(p, _, f) {
  var e = function() {
    _inherits(l, Component);
    var r = _createSuper(l);
    function l(e2) {
      var t;
      return _classCallCheck(this, l), (t = r.call(this, e2)).state = _objectSpread2(_objectSpread2({}, e2), _.isSlots ? { children: p } : {}), t.setRef = t.setRef.bind(_assertThisInitialized(t)), t.vueInReactCall = t.vueInReactCall.bind(_assertThisInitialized(t)), (t.__veauryVueWrapperRef__ = f).__veauryVueInReactCall__ = t.vueInReactCall, t;
    }
    return _createClass(l, [{ key: "reactPropsLinkToVueInstance", value: function(t) {
      Object.keys(t).forEach(function(e2) {
        f[e2] || (f[e2] = t[e2]);
      }), Object.getOwnPropertyNames(t.__proto__).filter(function(e2) {
        return ["constructor", "render"].indexOf(e2) < 0;
      }).forEach(function(e2) {
        f[e2] || (f[e2] = t[e2]);
      });
    } }, { key: "setRef", value: function(e2) {
      var t = this;
      e2 && (f.__veauryReactRef__ = e2, this.reactPropsLinkToVueInstance(e2), Promise.resolve().then(function() {
        return t.reactPropsLinkToVueInstance(e2);
      }), (this.setRef.current = e2).__veauryVueWrapperRef__ = f);
    } }, { key: "createSlot", value: function(r2) {
      return { originVNode: r2, inheritAttrs: false, __fromReactSlot: true, render: function() {
        var e2, t;
        return 1 === (null == (e2 = r2 = (r2 = (null == (t = this.$slots) || null == (e2 = t.default) ? void 0 : e2.call(t)) || r2) instanceof Function ? r2(this) : r2) ? void 0 : e2.length) && null != (t = r2[0]) && t.data && ((e2 = this.$attrs).key, t = _objectWithoutProperties(e2, _excluded2), r2[0].props = _objectSpread2(_objectSpread2({}, t), r2[0].props)), r2;
      } };
    } }, { key: "componentWillUnmount", value: function() {
      f.__veauryReactRef__ && (f.__veauryReactRef__.__veauryVueWrapperRef__ = null, f.__veauryReactRef__ = null);
    } }, { key: "vueInReactCall", value: function(e2) {
      var r2 = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
      return (2 < arguments.length ? arguments[2] : void 0) && e2 && e2[0] ? e2.map(function(e3, t) {
        return applyVueInReact(r2.createSlot(e3 instanceof Function ? e3 : [e3]), _objectSpread2(_objectSpread2(_objectSpread2({}, _), n), {}, { isSlots: true, wrapInstance: f })).render({ key: (null == e3 || null == (e3 = e3.data) ? void 0 : e3.key) || t });
      }) : applyVueInReact(this.createSlot(e2), _objectSpread2(_objectSpread2(_objectSpread2({}, _), n), {}, { isSlots: true, wrapInstance: f })).render();
    } }, { key: "render", value: function() {
      var e2, t, r2, n = this, o = this.state, a = o.hashList, i = _objectWithoutProperties(o, _excluded3), u = {}, c = {};
      for (e2 in i)
        t = e2, r2 = void 0, i.hasOwnProperty(t) && null != i[t] && (i[t].__slot ? (i[t].reactSlot ? i[t] = i[t].reactSlot : (r2 = i[t], _.defaultSlotsFormatter && i[t].__trueChildren ? (i[t].__top__ = n.__veauryVueWrapperRef__, i[t] = _.defaultSlotsFormatter(i[t].__trueChildren, n.vueInReactCall, a), i[t] instanceof Array ? i[t] = _toConsumableArray(i[t]) : -1 < ["string", "number"].indexOf(_typeof(i[t])) ? i[t] = [i[t]] : "object" === _typeof(i[t]) && (i[t] = _objectSpread2({}, i[t]))) : i[t] = _objectSpread2({}, applyVueInReact(n.createSlot(i[t]), _objectSpread2(_objectSpread2({}, _), {}, { isSlots: true, wrapInstance: f })).render()), i[t].vueFunction = r2), u[t] = i[t]) : i[t].__scopedSlot && (i[t] = i[t](n.createSlot), c[t] = i[t]));
      var s, o = {};
      return o.ref = this.setRef, _.isSlots ? this.state.children || this.props.children : (s = i, s = _objectSpread2(_objectSpread2(_objectSpread2({}, s = _.defaultPropsFormatter ? _.defaultPropsFormatter(i, this.vueInReactCall, a) : s), u), c), Object.getPrototypeOf(p) !== Function.prototype && ("object" !== _typeof(p) || p.render) || l.catchVueRefs() ? (Object.getPrototypeOf(p) === Function.prototype && delete o.ref, createElement(p, _extends({}, s, o))) : createElement(FunctionComponentWrap, _extends({ passedProps: s, component: p }, o), s.children));
    } }], [{ key: "catchVueRefs", value: function() {
      if (f.$parent) {
        for (var e2 in f.$parent.$refs)
          if (f.$parent.$refs[e2] === f)
            return true;
      }
      return false;
    } }]), l;
  }();
  return _defineProperty(e, "displayName", "applyReact_".concat(p.displayName || p.name || "Component")), e;
};
function applyReactInVue(m2) {
  var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
  return m2.__esModule && m2.default && (m2 = m2.default), b.isSlots && (m2 = m2()), b = setOptions(b, void 0, true), { originReactComponent: m2, setup: function(e, t) {
    var r, n, o, a;
    if (!b.isSlots)
      return r = {}, n = reactive({}), o = getCurrentInstance(), "function" == typeof (a = b.useInjectPropsFromWrapper || m2.__veauryInjectPropsFromWrapper__) && ("function" != typeof (a = a.call(o.proxy, e)) ? (Object.assign(n, a), r.__veauryInjectedProps__ = n) : o.proxy.__veauryInjectedComputed__ = a), r;
  }, data: function() {
    return { VEAURY_Portals: [] };
  }, created: function() {
    this.__veauryPortalKeyPool__ = [], this.__veauryMaxPortalCount__ = 0;
  }, computed: { __veauryInjectedProps__: function() {
    var e;
    return null == (e = this.__veauryInjectedComputed__) ? void 0 : e.call(this);
  } }, render: function() {
    var e = h(b.react.componentWrap, _objectSpread2({ ref: "react" }, b.react.componentWrapAttrs || {}), this.VEAURY_Portals.map(function(e2) {
      var t = e2.Portal, e2 = e2.key;
      return t(h, e2);
    }));
    return this.__veauryCheckReactSlot__(this.$slots), e;
  }, methods: { __veauryCheckReactSlot__: function(i) {
    var u = this;
    function c(e, t, r) {
      return t[r] && (e[r] = t[r], 1);
    }
    Object.keys(i).forEach(function(e) {
      try {
        var t, r, n, o = i[e], a = o.apply(u, o.__reactArgs || [{}]);
        (o.__trueChildren = a).forEach(function(e2) {
          e2.children && u.__veauryCheckReactSlot__(e2.children);
        }), 1 !== a.length || c(o, r = a[0], "reactSlot") || c(o, r, "reactFunction") || r.type !== Fragment || 1 !== (null == (t = r.children) ? void 0 : t.length) || c(o, n = r.children[0], "reactSlot") || c(o, n, "reactFunction");
      } catch (e2) {
      }
    });
  }, __veauryPushVuePortal__: function(e) {
    var t = this.__veauryPortalKeyPool__.shift() || this.__veauryMaxPortalCount__++;
    this.VEAURY_Portals.push({ Portal: e, key: t });
  }, __veauryRemoveVuePortal__: function(r) {
    var n, e = this.VEAURY_Portals.find(function(e2, t) {
      if (e2.Portal === r)
        return n = t, true;
    });
    this.__veauryPortalKeyPool__.push(e.key), this.VEAURY_Portals.splice(n, 1);
  }, __veauryGetScopeSlot__: function(i, u, t) {
    var c = this;
    function e(a) {
      function e2() {
        for (var e3, t2 = this, r = arguments.length, n = new Array(r), o = 0; o < r; o++)
          n[o] = arguments[o];
        return i.reactFunction ? i.reactFunction.apply(this, n) : b.defaultSlotsFormatter ? ((e3 = i.apply(this, n)).__top__ = c, (e3 = b.defaultSlotsFormatter(e3, c.__veauryVueInReactCall__, u)) instanceof Array || -1 < _typeof(e3).indexOf("string", "number") ? e3 = _toConsumableArray(e3) : "object" === _typeof(e3) && (e3 = _objectSpread2({}, e3)), e3) : applyVueInReact(a(function() {
          return i.apply(t2, n);
        }), _objectSpread2(_objectSpread2({}, b), {}, { isSlots: true, wrapInstance: c })).render();
      }
      return b.pureTransformer && t ? e2.vueFunction = t : e2.vueFunction = i, e2;
    }
    return e.__scopedSlot = true, e;
  }, __veaurySyncUpdateProps__: function(e) {
    this.__veauryReactInstance__ && this.__veauryReactInstance__.setState(e);
  }, __veauryMountReactComponent__: function(e, t) {
    var r, n, o = this, a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, i = {}, u = [], c = this.$.vnode.scopeId, s = (c && (i[c] = "", u.push(c)), {}), l = {};
    if (!e || null != t && t.slot)
      for (var p in this.$slots || {})
        (function(t2) {
          var e2;
          o.$slots.hasOwnProperty(t2) && null != o.$slots[t2] && ((e2 = b.react.vueNamedSlotsKey.find(function(e3) {
            return 0 === t2.indexOf(e3);
          })) || "default" === t2 ? (e2 = t2.replace(new RegExp("^".concat(e2)), ""), s[e2] = o.$slots[t2], s[e2].__slot = true) : l[t2] = o.__veauryGetScopeSlot__(o.$slots[t2], u, null == (e2 = o.$.vnode) || null == (e2 = e2.children) ? void 0 : e2[t2]));
        })(p);
    (!e || null != t && t.slot) && (n = _objectSpread2({}, s), r = n.default, delete n.default), this.__veauryLast__ = this.__veauryLast__ || {}, this.__veauryLast__.slot = this.__veauryLast__.slot || {}, this.__veauryLast__.attrs = this.__veauryLast__.attrs || {};
    var _ = { slot: function() {
      o.__veauryLast__.slot = _objectSpread2(_objectSpread2(_objectSpread2({}, r ? { children: r } : { children: null }), n), l);
    }, attrs: function() {
      o.__veauryLast__.attrs = o.$attrs;
    } };
    if (t && Object.keys(t).forEach(function(e2) {
      return _[e2]();
    }), e) {
      let f = function() {
        o.__veauryReactInstance__ && o.__veauryReactInstance__.setState(function(t2) {
          return Object.keys(t2).forEach(function(e2) {
            b.isSlots && "children" === e2 || delete t2[e2];
          }), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, o.__veauryCache__), toRaws(o.__veauryInjectedProps__)), !b.isSlots && o.__veauryLast__.slot), toRaws(o.__veauryLast__.attrs));
        }), o.__veauryCache__ = null;
      };
      !this.microTaskUpdate || this.__veauryCache__ || this.$nextTick(function() {
        f(), o.microTaskUpdate = false;
      }), this.macroTaskUpdate && (clearTimeout(this.updateTimer), this.updateTimer = setTimeout(function() {
        clearTimeout(o.updateTimer), f(), o.macroTaskUpdate = false;
      })), this.__veauryCache__ = _objectSpread2(_objectSpread2({}, this.__veauryCache__ || {}), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, a), this.$attrs.class ? { className: this.$attrs.class } : {}), _objectSpread2({}, i)), {}, { hashList: u }, this.$attrs.style ? { style: this.$attrs.style } : {})), this.macroTaskUpdate || this.microTaskUpdate || f();
    } else {
      _.slot(), _.attrs();
      var c = createReactContainer(m2, b, this), d = createElement(c, _extends({}, toRaws(this.$attrs), toRaws(this.__veauryInjectedProps__), { children: r }, n, l, this.$attrs.class ? { className: this.$attrs.class } : {}, i, { hashList: u }, this.$attrs.style ? { style: this.$attrs.style } : {}, { ref: function(e2) {
        return o.__veauryReactInstance__ = e2;
      } })), y = this.$refs.react, v = b.wrapInstance;
      if (v)
        (v = b.wrapInstance).__veauryVueWrapperRef__ = this;
      else
        for (var h2 = this.$parent; h2; ) {
          if (h2.parentReactWrapperRef) {
            v = h2.parentReactWrapperRef;
            break;
          }
          if (h2.reactWrapperRef) {
            v = h2.reactWrapperRef;
            break;
          }
          h2 = h2.$parent;
        }
      v ? (this.parentReactWrapperRef = v, this.reactPortal = function() {
        return createPortal(d, y);
      }, v.pushReactPortal(this.reactPortal)) : 17 < ReactMajorVersion ? (void 0 !== ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && (ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true), this.__veauryReactApp__ = ReactDOM.createRoot(y), this.__veauryReactApp__.render(d)) : ReactDOM.render(d, y);
    }
  } }, mounted: function() {
    var e = this;
    this.__VEAURY_IGNORE_STRANGE_UPDATE__ = true, Promise.resolve().then(function() {
      e.__VEAURY_IGNORE_STRANGE_UPDATE__ = false;
    }), clearTimeout(this.updateTimer), this.__veauryMountReactComponent__();
  }, beforeUnmount: function() {
    var e;
    clearTimeout(this.updateTimer), this.reactPortal ? (overwriteDomMethods(this.$refs.react), null != (e = this.parentReactWrapperRef) && e.removeReactPortal(this.reactPortal)) : (overwriteDomMethods(this.$refs.react), 17 < ReactMajorVersion ? this.__veauryReactApp__.unmount() : ReactDOM.unmountComponentAtNode(this.$refs.react)), recoverDomMethods();
  }, updated: function() {
    this.__VEAURY_IGNORE_STRANGE_UPDATE__ || this.__veauryMountReactComponent__(true, { slot: true });
  }, inheritAttrs: false, watch: { $attrs: { handler: function() {
    this.__veauryMountReactComponent__(true, { attrs: true });
  }, deep: true }, __veauryInjectedProps__: { handler: function() {
    this.__veauryMountReactComponent__(true, { attrs: true });
  }, deep: true } } };
}
var REACT_ALL_HANDLERS = /* @__PURE__ */ new Set(["onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onChange", "onInput", "onInvalid", "onReset", "onSubmit", "onError", "onLoad", "onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture", "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut", "onSelect", "onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart", "onScroll", "onWheel", "onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting", "onLoad", "onError", "onAnimationStart", "onAnimationEnd", "onAnimationIteration", "onTransitionEnd", "onToggle"]);
function lookupVueWrapperRef(e, t) {
  for (var r = null == (e = t = (null == e ? void 0 : e._reactInternals) || (null == e ? void 0 : e._reactInternalFiber) || t) ? void 0 : e.return; r; ) {
    var n = r.stateNode;
    if (n = (null == n ? void 0 : n.parentVueWrapperRef) || (null == n ? void 0 : n.__veauryVueWrapperRef__))
      return n;
    r = r.return;
  }
}
function createModifiers(e, t, r) {
  var n = {};
  return r.forEach(function(e2) {
    n[e2] = true;
  }), e[("modelValue" === t ? "model" : t) + "Modifiers"] = n;
}
function setVModel(e, t, r) {
  var n = this, o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "v-model", a = t;
  if (!(a instanceof Array))
    throw Error("[error:veaury] Parameter type error from '".concat(o, "', a single v-model is an array, such as [val, setter, argumentKey, modifiers] or [val, setter, modifiers]"));
  if ("function" != typeof a[1])
    throw Error("[error:veaury] Parameter type error from '".concat(o, "', a single v-model is an array, the second element of the array must be a setter function"));
  var i = a[1], u = ("string" == typeof a[2] ? (r = a[2], a[3] instanceof Array && createModifiers(e, r, a[3])) : a[2] instanceof Array && createModifiers(e, r, a[2]), e["onUpdate:" + r]);
  e["onUpdate:" + r] = "function" == typeof u ? function() {
    for (var e2 = arguments.length, t2 = new Array(e2), r2 = 0; r2 < e2; r2++)
      t2[r2] = arguments[r2];
    u.apply(n, t2), i.apply(n, t2);
  } : i, e[r] = a[0];
}
function parseVModel(a) {
  var i = this, r = {}, u = _objectSpread2({}, a);
  return Object.keys(a).forEach(function(n) {
    var o, e = n.match(/^onUpdate-([^-]+)/);
    if (e)
      delete u[n], o = r["onUpdate:".concat(e[1])], r["onUpdate:".concat(e[1])] = "function" == typeof o ? function() {
        for (var e2 = arguments.length, t2 = new Array(e2), r2 = 0; r2 < e2; r2++)
          t2[r2] = arguments[r2];
        o.apply(i, t2), a[n].apply(i, t2);
      } : a[n];
    else if (e = n.match(/^v-model($|:([^:]+)|-([^:]+))/))
      e = e[2] || e[3] || "modelValue", setVModel(r, a[n], e), delete u[n];
    else if ("v-models" === n) {
      if ("object" !== _typeof(a[n]) || a[n] instanceof Array)
        throw Error("[error:veaury] The parameter 'v-models' must be an object type, such as {[argumentKey]: singleVModel}");
      var t = a[n];
      Object.keys(t).forEach(function(e2) {
        setVModel(r, t[e2], e2, "v-models");
      }), delete u[n];
    }
  }), _objectSpread2(_objectSpread2({}, u), r);
}
var _default = function() {
  function e() {
    _classCallCheck(this, e), _defineProperty(this, "pool", /* @__PURE__ */ new Set());
  }
  return _createClass(e, [{ key: "getRandomId", value: function(e2) {
    var t = e2 + (Math.random() + "").substr(2);
    return this.pool.has(t) ? this.getRandomId(e2) : (this.pool.add(t), t);
  } }]), e;
}();
function RenderReactNode(e, t) {
  var r, e = e.node;
  if ("function" == typeof e && (e = e()), null != (r = t) && r.current || "function" == typeof t || null != (r = t) && r.toString().match(/^function/) || (t = null), -1 < ["string", "number"].indexOf(_typeof(e)))
    return e;
  if (e instanceof Array) {
    if (1 !== e.length)
      return e;
    e = e[0];
  }
  return _objectSpread2(_objectSpread2({}, e), {}, { ref: t });
}
var Bridge = applyReactInVue(RenderReactNode);
function WrapVue(e) {
  return h(Bridge, { node: function() {
    return e.node;
  } });
}
WrapVue.originReactComponent = forwardRef(RenderReactNode);
var _excluded$1 = ["component", "node"], _excluded2$1 = ["component", "$slots", "children", "class", "style"], _excluded3$1 = ["className", "classname"], optionsName = "veaury-options", random = new _default();
function filterVueComponent(e, t) {
  var r;
  return e = "string" == typeof e && t ? null == (t = t.$) || null == (t = t.appContext) || null == (t = t.app) || null == (r = t.component) ? void 0 : r.call(t, e) : e;
}
function transferSlots(r) {
  if (r)
    return Object.keys(r).forEach(function(e) {
      var t = r[e];
      null != t && ("function" == typeof t ? (r[e] = t, r[e].reactFunction = t) : (r[e] = function() {
        return t;
      }, r[e].reactSlot = t), t.vueFunction && (r[e].vueFunction = t.vueFunction));
    }), r;
}
function VNodeBridge(e) {
  var t;
  return null == (t = e.node) ? void 0 : t.call(e);
}
var VueContainer = forwardRef(function(e, t) {
  var r, n = e.component, o = e.node, e = _objectWithoutProperties(e, _excluded$1);
  if (null == n && null == o)
    return null;
  if (null != o) {
    if (o.$$typeof || "string" == typeof o || "number" == typeof o)
      return o;
    "function" != typeof o && (r = o, o = function() {
      return r;
    });
  }
  var a, n = n || VNodeBridge, i = setOptions(e[optionsName] || {}, void 0, true), u = i.useInjectPropsFromWrapper || n.__veauryInjectPropsFromWrapper__;
  return i.isSlots || "function" == typeof u && (a = u(e)), createElement(VueComponentLoader, _extends({}, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({ component: n }, o ? { node: o } : {}), e), a), {}, _defineProperty({}, optionsName, i)), { ref: t }));
}), VueComponentLoader = function() {
  _inherits(n, Component);
  var r = _createSuper(n);
  function n(e) {
    var t;
    return _classCallCheck(this, n), (t = r.call(this, e)).state = { portals: [] }, t.__veauryPortalKeyPool__ = [], t.__veauryMaxPortalCount__ = 0, t.__veauryCurrentVueComponent__ = e.component, t.__veauryCreateVueInstance__ = t.__veauryCreateVueInstance__.bind(_assertThisInitialized(t)), t.__veauryVueComponentContainer__ = t.createVueComponentContainer(), t;
  }
  return _createClass(n, [{ key: "pushReactPortal", value: function(e) {
    var t = this.state.portals, r2 = this.__veauryPortalKeyPool__.shift() || this.__veauryMaxPortalCount__++;
    t.push({ Portal: e, key: r2 }), this.setState({ portals: t });
  } }, { key: "removeReactPortal", value: function(r2) {
    var n2, e = this.state.portals, t = e.find(function(e2, t2) {
      if (e2.Portal === r2)
        return n2 = t2, true;
    });
    this.__veauryPortalKeyPool__.push(t.key), e.splice(n2, 1), this.__veauryVueRef__ && this.setState({ portals: e });
  } }, { key: "createVueComponentContainer", value: function() {
    var t = this, r2 = {}, e = this.props[optionsName];
    return e.isSlots ? (Object.keys(this.props).forEach(function(e2) {
      REACT_ALL_HANDLERS.has(e2) && "function" == typeof t.props[e2] && (r2[e2] = t.props[e2]);
    }), e.vue.slotWrapAttrs && (r2 = _objectSpread2(_objectSpread2({}, r2), e.vue.slotWrapAttrs))) : e.vue.componentWrapAttrs && (r2 = _objectSpread2(_objectSpread2({}, r2), e.vue.componentWrapAttrs)), e.vue.componentWrapHOC(createElement("div", _extends({}, e.vue.componentWrapAttrs, { ref: this.__veauryCreateVueInstance__, key: null })), r2);
  } }, { key: "shouldComponentUpdate", value: function(e, t, r2) {
    var n2, o, a, i, u = this;
    return e === this.props || (n2 = e.component, e[optionsName], o = void 0 === (o = e["v-slots"]) ? null : o, a = e.children, e = _objectWithoutProperties(e, ["component", optionsName, "v-slots", "children"].map(_toPropertyKey)), this.__veauryCurrentVueComponent__ !== n2 && this.updateVueComponent(n2), !!n2.__fromReactSlot || (this.__veauryVueInstance__ ? (a && (o = o || {}, "object" !== _typeof(a) || a instanceof Array || a.$$typeof ? o.default = a : o = a), (i = this.__veauryVueInstance__.$data.$slots) && Object.keys(i).forEach(function(e2) {
      delete i[e2];
    }), o && (i || (this.__veauryVueInstance__.$data.$slots = {}), Object.assign(this.__veauryVueInstance__.$data.$slots, transferSlots(o))), Object.keys(this.__veauryVueInstance__.$data).forEach(function(e2) {
      "$slots" !== e2 && delete u.__veauryVueInstance__.$data[e2];
    }), this.__veauryVueInstance__ && Object.assign(this.__veauryVueInstance__.$data, parseVModel(e)), true) : void 0));
  } }, { key: "componentWillUnmount", value: function() {
    this.vuePortal ? this.parentVueWrapperRef.__veauryRemoveVuePortal__(this.vuePortal) : (this.__veauryVueInstance__ && this.__veauryVueInstance__.$.appContext.app.unmount(), random.pool.delete(this.__veauryVueTargetId__));
  } }, { key: "__veauryCreateVueInstance__", value: function(e) {
    var r2 = this, p = this, t = this.props, _ = (t.component, t[optionsName]), n2 = t.children, o = t["v-slots"], o = void 0 === o ? {} : o, t = _objectWithoutProperties(t, ["component", optionsName, "children", "v-slots"].map(_toPropertyKey));
    function a(e2) {
      this.__veauryVueInstance__ || (this.__veauryVueInstance__ = e2);
    }
    n2 && ("object" !== _typeof(n2) || n2 instanceof Array || n2.$$typeof ? o.default = n2 : o = n2), (o = transferSlots(o)) && (t.$slots = o), a = a.bind(this);
    var i, u = _objectSpread2({}, parseVModel(t)), c = { data: function() {
      return _.isSlots ? { children: p.__veauryCurrentVueComponent__.originVNode } : u;
    }, created: function() {
      this.reactWrapperRef = p, a(this);
    }, methods: { reactInVueCall: function(e2) {
      return (2 < arguments.length ? arguments[2] : void 0) && e2 && e2[0] ? e2.map(function(e3, t2) {
        return h(WrapVue, { node: e3, key: (null == e3 || null == (e3 = e3.data) ? void 0 : e3.key) || t2 });
      }) : h(WrapVue, { node: e2 });
    }, getScopedSlots: function(s, e2) {
      var t2, l = this, r3 = (this.getScopedSlots.__scopeSlots || (this.getScopedSlots.__scopeSlots = {}), _objectSpread2({}, e2));
      for (t2 in r3)
        (function(u2) {
          var e3, c2;
          !r3.hasOwnProperty(u2) || null == (e3 = r3[u2]) || (r3[u2] = (c2 = e3, function() {
            for (var e4, t3, r4, n3, o2 = arguments.length, a2 = new Array(o2), i2 = 0; i2 < o2; i2++)
              a2[i2] = arguments[i2];
            return c2.vueFunction ? c2.vueFunction.apply(l, a2) : (r4 = c2.reactSlot, n3 = c2.reactFunction, r4 = r4 || (null == n3 ? void 0 : n3.apply(l, a2)), n3 = _.defaultSlotsFormatter, null != (e4 = l.getScopedSlots.__scopeSlots[u2]) && null != (e4 = e4.component) && null != (e4 = e4.ctx) && e4.__veauryReactInstance__ ? (t3 = l.getScopedSlots.__scopeSlots[u2], Promise.resolve().then(function() {
              var e5;
              null != (e5 = t3) && null != (e5 = e5.component) && null != (e5 = e5.ctx) && null != (e5 = e5.__veauryReactInstance__) && e5.setState({ children: c2.apply(l, a2) });
            })) : (t3 = n3 && r4 ? [n3(r4, l.reactInVueCall)] : s(applyReactInVue(function() {
              return c2.apply(l, a2);
            }, _objectSpread2(_objectSpread2({}, _), {}, { isSlots: true, wrapInstance: p }))), l.getScopedSlots.__scopeSlots[u2] = t3), c2.reactFunction ? t3.reactFunction = c2.reactFunction : c2.reactSlot && (t3.reactSlot = c2.reactSlot), t3);
          }), r3[u2].reactFunction = e3);
        })(t2);
      return r3;
    } }, mounted: function() {
      e.removeAttribute("id"), p.__veauryVueRef__ = this.$refs.use_vue_wrapper, this.$refs.use_vue_wrapper.reactWrapperRef = p;
    }, beforeUnmount: function() {
      p.__veauryVueRef__ = null, this.$refs.use_vue_wrapper.reactWrapperRef = null;
    }, render: function() {
      var e2 = this, t2 = this.$data, r3 = (t2.component, t2.$slots), n3 = (t2.children, t2.class), o2 = t2.style, t2 = _objectWithoutProperties(t2, _excluded2$1), a2 = this.getScopedSlots(h, _objectSpread2({}, r3)), r3 = t2.className, i2 = t2.classname, t2 = _objectWithoutProperties(t2, _excluded3$1), u2 = {};
      return Object.keys(a2).forEach(function(e3) {
        var t3 = a2[e3];
        u2[e3] = "function" == typeof t3 ? t3 : function() {
          return t3;
        };
      }), h(filterVueComponent(p.__veauryCurrentVueComponent__, this), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, t2), n3 || r3 || i2 ? { class: n3 || r3 || i2 } : {}), o2 ? { style: o2 } : {}), {}, { ref: "use_vue_wrapper" }), _objectSpread2({}, _.isSlots && this.children ? { default: "function" == typeof this.children ? this.children : function() {
        return e2.children;
      } } : _objectSpread2({}, u2)));
    } };
    e && (i = random.getRandomId("__vue_wrapper_container_"), e.id = i, this.__veauryVueTargetId__ = i, (n2 = _.wrapInstance) ? (n2 = _.wrapInstance).reactWrapperRef = p : n2 = lookupVueWrapperRef(this), n2 && document.getElementById(i) ? (this.parentVueWrapperRef = n2, this.vuePortal = function(e2, t2) {
      return e2(Teleport, { to: "#" + i, key: i }, [e2(Object.assign(c, { router: r2._router }))]);
    }, n2.__veauryPushVuePortal__(this.vuePortal)) : (o = createApp(c), "function" == typeof _.beforeVueAppMount && _.beforeVueAppMount(o), this.__veauryVueInstance__ = o.mount(e)));
  } }, { key: "updateVueComponent", value: function(e) {
    this.__veauryVueInstance__ && (e.__fromReactSlot ? this.__veauryVueInstance__.children = "function" == typeof e.originVNode ? e.originVNode : function() {
      return e.originVNode;
    } : (this.__veauryCurrentVueComponent__ = e, this.__veauryVueInstance__.$forceUpdate()));
  } }, { key: "render", value: function() {
    return createElement(this.__veauryVueComponentContainer__, { portals: this.state.portals });
  } }]), n;
}();
function applyVueInReact(r) {
  var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, e = (r || console.warn("Component must be passed in applyVueInReact!"), r.__esModule && r.default && (r = r.default), forwardRef(function(e2, t) {
    return createElement(VueContainer, _extends({}, e2, { component: r, ref: t }, _defineProperty({}, optionsName, n)));
  }));
  return e.originVueComponent = r, e;
}
new _default();
function toCamelCase(e) {
  return e.replace(/-(\w)/g, function(e2, t) {
    return t.toUpperCase();
  });
}
function formatStyle(t) {
  var r;
  return t ? "string" == typeof t ? (t = t.trim()).split(/\s*;\s*/).reduce(function(e, t2) {
    return t2 && 2 === (t2 = t2.split(/\s*:\s*/)).length && Object.assign(e, _defineProperty({}, toCamelCase(t2[0]), t2[1])), e;
  }, {}) : "object" === _typeof(t) ? (r = {}, Object.keys(t).forEach(function(e) {
    r[toCamelCase(e)] = t[e];
  }), r) : {} : {};
}
function formatClass(t) {
  return t ? t instanceof Array ? t : "string" == typeof t ? (t = t.trim()).split(/\s+/) : "object" === _typeof(t) ? Object.keys(t).filter(function(e) {
    return !!t[e];
  }) : [] : [];
}
var _excluded$3 = ["ref"];
function getChildInfo(r, e, o, a, i) {
  var t = r.props || {}, t = (t.ref, _objectWithoutProperties(t, _excluded$3)), u = {}, n = (Object.keys(r.children || {}).forEach(function(t2) {
    var n2 = r.children[t2], e2 = originOptions.react.vueNamedSlotsKey.find(function(e3) {
      return 0 === t2.indexOf(e3);
    });
    e2 || "default" === t2 ? (e2 = t2.replace(new RegExp("^".concat(e2)), "").replace(/^default$/, "children"), u[e2] = a(n2(), o, i)) : u[t2] = function() {
      for (var e3 = arguments.length, t3 = new Array(e3), r2 = 0; r2 < e3; r2++)
        t3[r2] = arguments[r2];
      return n2.__reactArgs = t3, a(n2.apply(this, t3), o, i);
    };
  }), {}), c = formatStyle(t.style), s = Array.from(new Set(formatClass(t.class))).join(" ");
  return 0 < Object.keys(c).length && (n.style = c), "" !== s && (n.className = s), Object.assign(t, _objectSpread2(_objectSpread2({}, n), u)), delete t.class, t;
}
function isTextOwner(e) {
  return e.type === Text;
}
new _default();
function DirectiveHOC(e, t) {
  var r;
  return 0 < (null == (r = e.dirs) ? void 0 : r.length) ? createElement(FakeDirective, { vnode: e }, t) : t;
}
var FakeDirective = function() {
  _inherits(n, Component);
  var r = _createSuper(n);
  function n(e) {
    var t;
    return _classCallCheck(this, n), (t = r.call(this, e)).state = { prevVnode: null, savedDirectives: [], ref: null, prevProps: e }, t;
  }
  return _createClass(n, [{ key: "findDirectiveName", value: function(e) {
    var r2 = e.dir, n2 = -1;
    return [this.state.savedDirectives.find(function(e2, t) {
      if (e2.dir === r2)
        return n2 = t, true;
    }), n2];
  } }, { key: "doDirective", value: function() {
    var c = this, e = this.state, s = e.savedDirectives;
    if (!(l = e.ref)) {
      for (var l = (this._reactInternals || this._reactInternalFiber).child; l && 5 !== l.tag; )
        l = l.child;
      if (!l)
        return;
      l = l.stateNode;
    }
    var p = this.props.vnode, e = p.dirs;
    e && (e.forEach(function(e2) {
      var t, r2, n2, o, a, i, u;
      e2 && (u = (t = _slicedToArray(c.findDirectiveName(e2), 2))[0], t = t[1], r2 = (a = e2.dir).created, n2 = a.beforeMount, o = a.mounted, i = a.beforeUpdate, a = a.updated, u ? (s[t] = _objectSpread2(_objectSpread2(_objectSpread2({}, u), e2), {}, { oldValue: u.oldValue }), u = [l, s[t], p, c.state.prevVnode], null != i && i.apply(null, u), null != a && a.apply(null, u), s[t].oldValue = e2.value) : (s.push(e2), i = [l, e2, p, null], null != r2 && r2.apply(null, i), null != n2 && n2.apply(null, i), null != o && o.apply(null, i), e2.oldValue = e2.value));
    }), this.setState({ prevVnode: _objectSpread2({}, p), savedDirectives: s, ref: l }));
  } }, { key: "componentDidMount", value: function() {
    this.doDirective();
  } }, { key: "componentDidUpdate", value: function(e) {
    e.vnode !== this.props.vnode && this.doDirective();
  } }, { key: "componentWillUnmount", value: function() {
    var a = this, i = this.props.vnode, e = this.state, u = e.savedDirectives, c = e.ref, s = e.prevVnode, e = i.dirs;
    e && (e.forEach(function(e2) {
      var t, r2, n2, o;
      e2 && (t = (o = _slicedToArray(a.findDirectiveName(e2), 2))[0], o = o[1], t && (r2 = (n2 = e2.dir).beforeUnmount, n2 = n2.unmounted, u[o] = _objectSpread2(_objectSpread2({}, t), e2), o = [c, t, i, s], null != r2 && r2.apply(null, o), null != n2 && n2.apply(null, o)));
    }), this.setState({ prevVnode: _objectSpread2({}, i), savedDirectives: u }));
  } }, { key: "render", value: function() {
    var e = this.props;
    e.vnode;
    return e.children;
  } }]), n;
}();
function couldBeClass(e, t) {
  var r;
  return "function" == typeof e && (r = e.toString(), void 0 !== e.prototype && (e.prototype.constructor === e && ("class" == r.slice(0, 5) || (2 <= Object.getOwnPropertyNames(e.prototype).length || !/^function\s+\(|^function\s+anonymous\(/.test(r) && (!(!t || !/^function\s+[A-Z]/.test(r)) || !!/\b\(this\b|\bthis[\.\[]\b/.test(r) && (!(t && !/classCallCheck\(this/.test(r)) || /^function\sdefault_\d+\s*\(/.test(r)))))));
}
function resolveRef(o) {
  var a, e;
  return "function" != typeof (null == (e = o.type) ? void 0 : e.originReactComponent) || couldBeClass(null == (e = o.type) ? void 0 : e.originReactComponent) ? ((e = null == (e = o.ref) ? void 0 : e.r) && "string" == typeof e && (a = e, e = function(e2) {
    var t;
    e2 && (o.ref.i.refs && ((t = _objectSpread2({}, o.ref.i.refs))[a] = e2, o.ref.i.refs = t), void 0 !== (null == (t = o.ref.i.setupState) ? void 0 : t[a]) && (o.ref.i.setupState[a] = e2));
  }, e = new Proxy(e, { get: function(e2, t) {
    return e2[t];
  }, set: function(e2, t, r) {
    var n;
    return null != (n = o.ref.i.refs) && n[a] && ((n = _objectSpread2({}, o.ref.i.refs))[t] = r, o.ref.i.refs = n), r;
  } })), e) : null;
}
function addScopeId(t, e) {
  return !e || e instanceof Array && 0 === e.length || ("string" == typeof e && (e = [e]), (t = _objectSpread2({}, t)).props = _objectSpread2({}, t.props), e.forEach(function(e2) {
    t.props[e2] = "";
  })), t;
}
var _excluded$4 = ["style", "class"];
function takeVueDomInReact(e, t, r, n, o, a, i) {
  var u, c, s;
  return "all" === t || t instanceof Array || (t = t ? [t] : []), e.type === Fragment ? o(e.children, r, a) : "string" == typeof e.type && ("all" === t || -1 < t.indexOf(e.type)) ? (t = resolveRef(e), s = (c = e.props || {}).style, u = c.class, c = _objectSpread2(_objectSpread2({}, _objectWithoutProperties(c, _excluded$4)), {}, { style: formatStyle(s), className: Array.from(new Set(formatClass(u))).join(" ") }, t ? { ref: t } : {}), (s = e.children || c.children) && ((s = -1 < ["string", "number"].indexOf(_typeof(s)) ? [s] : _toConsumableArray(s)).__top__ = i), DirectiveHOC(e, addScopeId(React.createElement(e.type, c, o(s, r, a)), e.scopeId))) : r([e], null, n);
}
function pureInterceptProps() {
  return 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
}
function setChildKey(e, t, r) {
  return !((e = e instanceof Array && 1 === e.length ? e[0] : e) instanceof Array) && null == e.key && 1 < t.length && ((e = _objectSpread2({}, e)).key = "_key_".concat(r)), e;
}
function getDistinguishReactOrVue(e) {
  var l = e.reactComponents, p = e.domTags, e = e.division, _ = void 0 === e || e;
  return function a(i, u, c) {
    var s;
    return i && i.forEach ? (s = [], i.forEach(function(e2, t) {
      if (e2 && e2.type !== Comment) {
        if (null == (o = e2.type) || !o.originReactComponent)
          return e2.$$typeof || "string" == typeof e2 || "number" == typeof e2 ? void s.push(e2) : isTextOwner(e2) ? void ("" !== e2.children.trim() && s.push(e2.children.trim())) : void (e2.type && (addScopeId(o = setChildKey(takeVueDomInReact(e2, p, u, _, a, c, i.__top__), i, t), e2.scopeId), s.push(o)));
        var r, n, o = e2.type.originReactComponent;
        addScopeId(r = setChildKey(r = "all" === (l = "all" === l || l instanceof Array ? l : [l]) || -1 < l.indexOf(o) ? (e2.__top__ = i.__top__, r = getChildInfo(e2, "_key_".concat(t), u, a, c), n = resolveRef(e2), e2.children && (e2.children.__top__ = i.__top__), DirectiveHOC(e2, React.createElement(o, _objectSpread2(_objectSpread2(_objectSpread2({}, pureInterceptProps(r, e2, o)), e2.__extraData || {}), n ? { ref: n } : {})))) : isTextOwner(e2) ? e2.text : takeVueDomInReact(e2, p, u, _, a, c), i, t), e2.scopeId), s.push(r);
      }
    }), 1 === s.length ? s[0] : s) : i;
  };
}
getDistinguishReactOrVue({ reactComponents: "all", domTags: "all" });
getDistinguishReactOrVue({ reactComponents: "all", domTags: "all" });
function transformer$1(e) {
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, r = (t.globalName, t.combinedOption);
  t.transparentApi;
  return applyVueInReact(e, r || {});
}
var _excluded$5 = ["ref", "children", "v-slots"];
function getChildInfo$1(e, t, o, a, i) {
  var e = e.props || {}, r = (e.ref, e.children), n = e["v-slots"], u = void 0 === n ? {} : n, n = _objectWithoutProperties(e, _excluded$5), c = (r && ("object" !== _typeof(r) || r instanceof Array || r.$$typeof ? u.default = r : u = r), null), e = (Object.keys(u || {}).forEach(function(e2) {
    var n2 = u[e2];
    (c = c || {})[e2] = function() {
      if ("function" == typeof n2) {
        for (var e3 = arguments.length, t2 = new Array(e3), r2 = 0; r2 < e3; r2++)
          t2[r2] = arguments[r2];
        n2 = n2.apply(this, t2);
      }
      return a(n2, o, i);
    };
  }), {}), r = formatStyle(n.style), s = Array.from(new Set(formatClass(n.className))).join(" ");
  return 0 < Object.keys(r).length && (e.style = r), "" !== s && (e.class = s), Object.assign(n, _objectSpread2({}, e)), delete n.className, { props: n = parseVModel(n), slots: c };
}
function resolveRef$1(t) {
  var e = t.ref;
  if (e)
    return "object" === _typeof(e) ? function(e2) {
      t.ref.current = e2;
    } : "function" == typeof e ? e : void 0;
}
var _excluded$6 = ["style", "class", "children"];
function takeReactDomInVue(e, t, r, n, o, a) {
  var i, u, c, s;
  return "all" === t || t instanceof Array || (t = t ? [t] : []), e.type === Fragment$1 ? o(null == (i = e.props) ? void 0 : i.children, r) : "string" == typeof e.type && ("all" === t || -1 < t.indexOf(e.type)) ? (i = resolveRef$1(e), s = (t = e.props || {}).style, c = t.class, u = t.children, t = _objectWithoutProperties(t, _excluded$6), c = Array.from(new Set(formatClass(c))).join(" "), s = formatStyle(s), t = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, t), 0 === Object.keys(s).length ? {} : { style: s }), c ? { className: c } : {}), i ? { ref: i } : {}), 0 === Object.keys(t).length && (t = null), (s = u) && ((s = -1 < ["string", "number"].indexOf(_typeof(s)) ? [s] : s instanceof Array ? _toConsumableArray(s) : _objectSpread2({}, s)).__top__ = a), h(e.type, t, o(s, r))) : r([e], null, n);
}
function getDistinguishReactOrVue$1(e) {
  var c = e.vueComponents, s = e.domTags, e = e.division, l = void 0 === e || e;
  return function o(a, i) {
    if (null == a)
      return a;
    a instanceof Array || (a = [a]);
    var u = [];
    return a.forEach(function(e2, t) {
      if ((null == (r = e2.type) || !r.originVueComponent) && e2.type !== VueContainer)
        return e2.__v_isVNode || "string" == typeof e2 || "number" == typeof e2 ? void u.push(e2) : void (e2.type && (r = takeReactDomInVue(e2, s, i, l, o, a.__top__), u.push(r)));
      var r = e2.type.originVueComponent;
      if (e2.type === VueContainer) {
        if (!e2.props.component)
          return void u.push(e2.props.node);
        r = e2.props.component, e2 = _objectSpread2({}, e2);
        var n = _objectSpread2({}, e2.props);
        delete n.component, e2.props = n;
      }
      r = "all" === (c = "all" === c || c instanceof Array ? c : [c]) || -1 < c.indexOf(r) ? ((e2 = _objectSpread2({}, e2)).__top__ = a.__top__, t = (n = getChildInfo$1(e2, "_key_".concat(t), i, o)).props, n = n.slots, resolveRef$1(e2), e2.children && (e2.children.__top__ = a.__top__), h(r, _objectSpread2({}, t), n)) : takeReactDomInVue(e2, s, i, l, o), u.push(r);
    }), 1 === (u = u.flat(1 / 0)).length ? u[0] : u;
  };
}
var NoWrapFunction$2 = getDistinguishReactOrVue$1({ vueComponents: "all", domTags: "all" });
function applyPureVueInReact(e, t) {
  return transformer$1(e, { combinedOption: _objectSpread2({ pureTransformer: true, defaultSlotsFormatter: NoWrapFunction$2 }, t) });
}
getDistinguishReactOrVue$1({ reactComponents: "all", domTags: "all" });
new _default();
const { resolveVueComponent } = useAdapter();
class VueControl extends React.Component {
  constructor(props) {
    super(props);
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
    return React.createElement(this.vueComponent, mergedProps);
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
export {
  AmisPageEditor,
  AmisSchemaPage,
  _sfc_main$a as AmisToast,
  VueControl as AmisVueComponent,
  PageApis,
  PopupEditor$1 as PopupEditor,
  UserApis,
  XuiPage,
  _sfc_main$3 as XuiPageEditor,
  XuiSchemaPage,
  absolutePath,
  adapter,
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
  format$1 as format,
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
