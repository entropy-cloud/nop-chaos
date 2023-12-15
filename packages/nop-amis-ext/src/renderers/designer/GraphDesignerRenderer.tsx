import {
    ActionObject,
    BaseSchemaWithoutType,
    IScopedContext,
    IServiceStore,
    PlainObject,
    Renderer,
    RendererProps,
    Schema,
    isEffectiveApi,
    unRegisterRenderer
} from 'amis-core';

import * as React from 'react';
import { useCallback, useState } from 'react';

import { SchemaApi, SchemaCollection } from 'amis';
import { useSplitter } from '../Splitter';

import "./designer.css";

export interface GraphDesignerSchema extends BaseSchemaWithoutType {
    type: 'graph-designer',

    mainEditor: Schema,

    toolbar?: SchemaCollection,

    subEditors: {
        [groupName: string]: {
            [elementType: string]: Schema
        }
    },

    maxPanelWidth: number,
    minPanelWidth: number,

    /**
     * 初始化数据 API
     */
    initApi?: SchemaApi,

    saveApi?: SchemaApi
}

/**
 * 例如
 * {
 *    wfName: "aaa",
 *    wfVersion: 1,
 *    steps: {
 *      "a": {
 *      }
 *    },
 *    actions: {
 *      "approve": {
 *      }
 *    }
 * }
 */
export type GraphData = PlainObject & {
    [groupName: string]: {
        [id: string]: PlainObject & {
            type: string
        }
    }
}

function updateMainData(data: GraphData, values: any){
    return {
        ...data,
        ...cleanData(values)
    }
}


function updateElement(data: GraphData, elm: SelectedElement, values: any) {
    return {
        ...data,
        [elm.groupName]: {
            ...data?.[elm.groupName],
            [elm.elementId]: cleanData(values)
        }
    }
}

function removeElement(data: GraphData, elm: SelectedElement) {
    return {
        ...data,
        [elm.groupName]: {
            ...data?.[elm.groupName],
            [elm.elementId]: undefined
        }
    }
}

type SelectedElement = {
    groupName: string,
    elementType: string,
    elementId: string
}

export type HandleEditorEvent = (event: string, data: any) => any

export interface GraphDesignerProps
    extends RendererProps,
    Omit<GraphDesignerSchema, 'type' | 'className'> {
}

function getDesignerAction(action: ActionObject) {
    if (action.actionType?.startsWith("designer:"))
        return action.actionType.substring("designer:".length)
    if (action.api instanceof String) {
        if (action.api.startsWith("designer://"))
            return action.api.substring("designer://".length)
    }
    return
}

function cleanData(data: any) {
    const { __super, __pristine, __prev, ...ret } = data || {}
    return ret
}

export function GraphDesigner(props: GraphDesignerProps) {

    const { className, toolbarClassName, classnames: cx, onAction, style, render, minPanelWidth, maxPanelWidth,
        initApi, saveApi, toolbar, value, onChange, ...rest } = props;

    const [showRightPanel, setShowRightPanel] = useState(true)
    const [graphData, setGraphData] = useState<GraphData>(value?.data || {})
    const [graphDiagram, setGraphDiagram] = useState(value?.diagram || {})

    const [inited, setInited] = useState(false)
    const [currentElement, setCurrentElement] = useState<SelectedElement>({
        groupName: "main",
        elementType: "default",
        elementId: "default"
    })

    const editorCallbacks = React.useRef([] as HandleEditorEvent[])
    const [handleResizeMouseDown] = useSplitter({
        alignRight: true, asideMinWidth: minPanelWidth || 50,
        asideMaxWidth: maxPanelWidth || 800
    })

    if (!inited) {
        setInited(true)
        if (isEffectiveApi(initApi, props.data)) {
            const store = props.store as IServiceStore
            store.fetchData(initApi, props.data).then(res => {
                setGraphData(res || {})
            })
        }
    }

    function selectMain() {
        setCurrentElement({ groupName: "main", elementType: "default", elementId: "default" })
    }

    const handleAction = useCallback((
        e: React.UIEvent<any> | void,
        action: ActionObject,
        ctx: object,
        throwErrors: boolean = false,
        delegate?: IScopedContext) => {
        const designerAction = getDesignerAction(action);
        if (designerAction == 'save') {
            const data = { data: graphData, diagram: graphDiagram}
            if (onChange && (graphData != value?.data || graphDiagram != value?.diagram))
                onChange(data)

            if (isEffectiveApi(saveApi, action.data)) {
                const store = props.store as IServiceStore
                store.fetchData(saveApi, { data })
            } else {
                console.log("designer:save", data)
            }
            return
        } else if (designerAction == 'selectMain') {
            selectMain()
            return
        }
        onAction && onAction(e, action, ctx, throwErrors, delegate)
    }, [currentElement, graphData])

    const handleEditorAction = useCallback((
        e: React.UIEvent<any> | void,
        action: ActionObject,
        ctx: object,
        throwErrors: boolean = false,
        delegate?: IScopedContext) => {
        if (action.actionType == 'submit') {
            if (currentElement && currentElement.groupName != 'main') {
                let group = graphData[currentElement.groupName] || (graphData[currentElement.groupName] = {})
                group[currentElement.elementId] = action.payload
            }
            return
        }
        onAction && onAction(e, action, ctx, throwErrors, delegate)
    }, [currentElement, graphData])

    const handleEditorChange = useCallback((values: any) => {
        if (currentElement && currentElement.groupName != 'main') {
            let data = updateElement(graphData,currentElement,values)
            setGraphData(data)
        } else if (currentElement && currentElement.groupName == 'main') {
            let data = updateMainData(graphData,values)
            setGraphData(data)
        }
    }, [currentElement, graphData])

    const handleEditorEvent = useCallback((event: string, data: any) => {
        if (event == 'selectElement') {
            setCurrentElement(data)
            setShowRightPanel(data != null)
        } else if (event == 'selectMain') {
            selectMain()
        } else if (event == 'removeElement') {
            if (data.elementId == currentElement.elementId) {
                selectMain()
            }
            let newData = removeElement(graphData,data)
            setGraphData(newData)
        }
        editorCallbacks.current.forEach(callback => {
            callback(event, data)
        })
    }, [editorCallbacks])

    const registerEditorCallback = useCallback((callback: HandleEditorEvent) => {
        editorCallbacks.current.push(callback)
    }, [editorCallbacks])

    const subProps = {
        onAction: handleAction,
        onEditorEvent: handleEditorEvent,
        registerEditorCallback
    }

    function renderToolbar() {
        return <div className={cx(`GraphDesigner-toolbar`, toolbarClassName)}>
            {render('toolbar', toolbar || '', subProps)}
        </div>
    }

    function renderRightPanel() {
        let schema;
        let data;
        if (!currentElement || currentElement.groupName == 'main') {
            schema = props.subEditors['main']?.default
            data = graphData
        } else {
            schema = props.subEditors[currentElement.groupName]?.[currentElement.elementType]
            data = graphData?.[currentElement.groupName]?.[currentElement.elementId]
        }
        if (!schema)
            return null

        if (!data) data = {}

        return <div className={cx(`GraphDesigner-rightPanel`)}>
            <div
                onMouseDown={handleResizeMouseDown}
                className={cx(`GraphDesigner-panelResizor`)}
            ></div>

            {render('subEditor', schema || '', {
                ...subProps, data,
                onAction: handleEditorAction, onChange: handleEditorChange
            })}
        </div>
    }

    return (
        <div className={cx('GraphDesigner', className)}>
            {toolbar ? renderToolbar() : null}
            <div className={cx('GraphDesigner-inner')}>
                <div className={cx('GraphDesigner-main')}>
                    {render('main', props.mainEditor, subProps)}
                </div>
                {showRightPanel ? renderRightPanel() : null}
            </div>
        </div>)
}

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