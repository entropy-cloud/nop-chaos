import { FlowBuilder, FlowBuilderProps } from '@nop-chaos/nop-flow-builder'

import { RendererProps, unRegisterRenderer, Renderer } from 'amis'

import React from 'react'


interface FlowBuilderRendererProps extends RendererProps, FlowBuilderProps {
    value?: any,
    onChange?: (values: any) => void
}

unRegisterRenderer("nop-flow-builder")

@Renderer({
    type: 'nop-flow-builder'
})
export class FlowBulderRenderer extends React.Component<FlowBuilderRendererProps> {
    render() {
        const props = this.props;

        return <FlowBuilder {...props} />
    }
}