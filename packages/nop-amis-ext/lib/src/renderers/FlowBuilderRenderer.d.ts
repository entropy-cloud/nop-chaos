import { FlowBuilderProps } from '@nop-chaos/nop-flow-builder';
import { RendererProps } from 'amis';
import React from 'react';
interface FlowBuilderRendererProps extends RendererProps, FlowBuilderProps {
    value?: any;
    onChange?: (values: any) => void;
}
export declare class FlowBulderRenderer extends React.Component<FlowBuilderRendererProps> {
    render(): React.JSX.Element;
}
export {};
