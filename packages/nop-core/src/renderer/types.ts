import { ApiObject } from '../core/types';

export type OptionsType = {
  [propName: string]: any;
};

export type SchemaType = {
  type: string;
  [propName: string]: any;
};

export type SchemaCollectionType = SchemaType | Array<SchemaType>;

export type VDomType = any;

export type OnEventType = (event: string, data: any, ctx: any) => any;

export type EventCallbacks = {
  [source: string]: OnEventType[];
};

export type EventCleanup = () => void;

export type RenderContext = {
  /**
   * 将json对象渲染为虚拟DOM类型。不同的框架实现不同
   */
  render: (
    name: string,
    schema: SchemaType,
    props: OptionsType,
    ctx: any
  ) => VDomType;

  /**
   * 动态执行ajax调用，
   */
  executor: (api: ApiObject, data: any, ctx: any) => Promise<any> | any;
};
