import { ActionObject, IScopedContext, IServiceStore, Renderer, RendererProps, isEffectiveApi, unRegisterRenderer } from "amis";
import React, { useCallback, useRef } from 'react'
import { GraphDesigner, GraphDesignerProps } from '@nop-chaos/nop-graph-designer'
import { RenderContextKey } from '@nop-chaos/nop-react-core'
import { ApiObject, ApiResponse, EventCallbacks, OnEventType } from '@nop-chaos/nop-core'

interface GraphDesignerRendererProps extends RendererProps, GraphDesignerProps {
    value?: any,
    onChange?: (values: any) => void
}

unRegisterRenderer("nop-graph-designer")

@Renderer({
    type: 'nop-graph-designer'
})
export class GraphDesignerRenderer extends React.Component<GraphDesignerRendererProps> {
    eventCallbacks: { [name: string]: OnEventType[] } = {}

    constructor(props: any) {
        super(props)
        this.state = {}
        this.handleAmisAction = this.handleAmisAction.bind(this)
        this.amisRender = this.amisRender.bind(this)
        this.amisExecutor = this.amisExecutor.bind(this)
        this.registerEventCallback = this.registerEventCallback.bind(this)
    }

    handleAmisAction(
        e: React.UIEvent<any> | void,
        action: ActionObject,
        ctx: object,
        throwErrors: boolean = false,
        delegate?: IScopedContext
    ) {
        if (action.actionType?.startsWith('designer:')) {
            const list = this.eventCallbacks["delegate"]
            if (list) {
                list.forEach(callback => {
                    callback(action.actionType || '', action.payload, this.props)
                });
            }
            return
        }
        return this.props.onAction?.(e, action, ctx, throwErrors, delegate)
    }

    amisRender(name: string, schema: any, opts: any, ctx: any) {
        return this.props.render(name, schema, {...opts,onAction:this.handleAmisAction})
    }

    amisExecutor(api: ApiObject, data: any, ctx: any): Promise<ApiResponse> | undefined {
        const store = this.props.store as IServiceStore
        if (store) {
            if (!isEffectiveApi(api, data))
                return
            return store.fetchData(api, data).then(res => res.data as ApiResponse)
        }
        return
    }

    registerEventCallback(source: string, callback: OnEventType) {
        if (source == 'delegate') {
            const list = this.eventCallbacks[source] = (this.eventCallbacks[source] || [])
            list.push(callback)
            return () => {
                const index = list.indexOf(callback)
                index >= 0 && list.splice(index, 1)
            }
        }

        return () => {

        }
    }

    render() {
        const props = this.props;

        return <>
            <RenderContextKey.Provider value={{
                render: this.amisRender, executor: this.amisExecutor, observeEvent: this.registerEventCallback
            }}>
                <GraphDesigner {...props} onAction={this.handleAmisAction} />
            </RenderContextKey.Provider>
        </>
    }
}