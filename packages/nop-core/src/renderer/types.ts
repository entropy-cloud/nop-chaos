import { ApiObject } from '../core/types';

export type OptionsType = {
  [propName: string]: any;
};

export type SchemaType = {
  type: string;
  [propName: string]: any;
};

/**
 * Vue或者React的函数式组件
 */
export type VComponentType = any;

export type SchemaCollectionType = SchemaType | Array<SchemaType>;

export type VDomType = any;

export type OnEventType = (event: string, data: any, ctx: any) => any;

export type EventCallbacks = {
  [source: string]: OnEventType[];
};

export type EventCleanup = () => void;

export type RenderComponentCtx = {
  props: Record<string, any>;
  store: any;
};

export type RenderContext = {
  /**
   * 将json对象渲染为虚拟DOM类型。不同的框架实现不同
   */
  render: (
    name: string,
    schema: SchemaCollectionType,
    options: OptionsType,
    ctx: RenderComponentCtx
  ) => VDomType;

  /**
   * 动态执行ajax调用，
   */
  invokeApi: (
    api: ApiObject,
    data: any,
    ctx: RenderComponentCtx
  ) => Promise<any> | any;
};
