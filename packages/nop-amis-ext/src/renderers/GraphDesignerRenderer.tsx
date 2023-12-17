
unRegisterRenderer("nop-graph-designer")

@Renderer({
    type: 'nop-graph-designer'
})
export class GraphDesignerRenderer extends React.Component<GraphDesignerProps> {
    render() {
        const props = this.props;
        return <GraphDesigner {...props} />
    }
}