export type ID = string;

const isType =
  <T>(type: string | string[]) =>
    (obj: unknown): obj is T =>
      obj != null &&
      (Array.isArray(type) ? type : [type]).some(
        t => getType(obj) === `[object ${t}]`
      );
export const getType = (obj: any) => Object.prototype.toString.call(obj);
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction'
]);

export const isFunction = isFn

export const isWindow = isType<Window>('Window');
export const isHTMLElement = (obj: any): obj is HTMLElement => {
  return obj?.['nodeName'] || obj?.['tagName'];
};
export const isArray = Array.isArray;
export const isPlainObject = isType<object>('Object');
export const isString = isType<string>('String');
export const isBoolean = isType<boolean>('Boolean');
export const isNumber = isType<number>('Number');
export const isObject = (val: unknown): val is object => typeof val === 'object';
export const isRegExp = isType<RegExp>('RegExp');
export const isValid = (val: any) => val !== null && val !== undefined;
export const isValidNumber = (val: any): val is number =>
  !isNaN(val) && isNumber(val);

export function isPromise(value: any) {
  return value && typeof value.then === 'function'
}

export function isInteger(value: any) {
  return typeof value === 'number' && Number.isInteger(value);
}