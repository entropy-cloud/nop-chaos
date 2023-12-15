import { ApiObject, FetcherResult } from '../core/types'

export type OptionsType = {
    [propName: string]: any
}

export type SchemaType = {
    type: string,
    [propName: string]: any
}

export type VDomType = any

export type RenderType = (name: string, schema: SchemaType, props: OptionsType, ctx: any) => VDomType

export type ExecutorType = (api: ApiObject, ctx: any) => Promise<FetcherResult>

export type OnEventType = (event: string, data: any, ctx: any) => any

export type RenderContext = {
    /**
     * 将json对象渲染为虚拟DOM类型。不同的框架实现不同
     */
    render: RenderType,

    /**
     * 动态执行ajax调用，
     */
    executor: ExecutorType,

    /**
     * 向上冒泡触发自定义动作
     */
    onEvent: OnEventType,

    /**
     * 监听兄弟节点或者父节点触发的事件
     * @param source 兄弟节点或者父节点的标识
     * @param handler 回调函数
     */
    observeEvent: (source: string, handler: OnEventType) => void
}