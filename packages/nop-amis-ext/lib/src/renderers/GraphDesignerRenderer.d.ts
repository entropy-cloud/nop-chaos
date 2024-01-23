import { ActionObject, IScopedContext, RendererProps } from "amis";
import React from 'react';
import { GraphDesignerProps } from '@nop-chaos/nop-graph-designer';
import { ApiObject, ApiResponse, OnEventType } from '@nop-chaos/nop-core';
interface GraphDesignerRendererProps extends RendererProps, GraphDesignerProps {
    value?: any;
    onChange?: (values: any) => void;
}
export declare class GraphDesignerRenderer extends React.Component<GraphDesignerRendererProps> {
    eventCallbacks: {
        [name: string]: OnEventType[];
    };
    constructor(props: any);
    handleAmisAction(e: React.UIEvent<any> | void, action: ActionObject, ctx: object, throwErrors?: boolean, delegate?: IScopedContext): any;
    amisRender(name: string, schema: any, opts: any, ctx: any): JSX.Element;
    amisExecutor(api: ApiObject, data: any, ctx: any): Promise<ApiResponse> | undefined;
    registerEventCallback(source: string, callback: OnEventType): () => void;
    render(): React.JSX.Element;
}
export {};
