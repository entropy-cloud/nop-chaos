import { IServiceStore, Renderer, RendererProps, isEffectiveApi, unRegisterRenderer } from "amis";
import React from 'react'
import { GraphDesigner, GraphDesignerProps } from '@nop-chaos/nop-graph-designer'
import { RenderContextKey } from '@nop-chaos/nop-react-core'
import { ApiObject, ApiResponse } from '@nop-chaos/nop-core'

interface GraphDesignerRendererProps extends RendererProps, GraphDesignerProps {
    value?: any,
    onChange?: (values: any) => void
}

unRegisterRenderer("nop-graph-designer")

@Renderer({
    type: 'nop-graph-designer'
})
export class GraphDesignerRenderer extends React.Component<GraphDesignerRendererProps> {
    render() {
        const props = this.props;

        function amisRender(name: string, schema: any, props: any, ctx: any) {

        }

        function amisExecutor(api: ApiObject, data: any, ctx: any): Promise<ApiResponse> | undefined {
            const store = props.store as IServiceStore
            if (store) {
                if (!isEffectiveApi(api, data))
                    return
                return store.fetchData(api, data).then(res => res.data as ApiResponse)
            }
            return
        }

        return <>
            <RenderContextKey.Provider value={{ render: amisRender, executor: amisExecutor }}>
                <GraphDesigner {...props} />
            </RenderContextKey.Provider>
        </>
    }
}