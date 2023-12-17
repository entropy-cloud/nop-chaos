import * as React from 'react';
import { useCallback, useState } from 'react';

import { useSplitter } from './Splitter';

import { ApiObject, OnEventType, EventCallbacks, RenderContext, SchemaCollectionType, SchemaType } from '@nop-chaos/nop-core'
import { RenderContextKey } from '@nop-chaos/nop-react-core';

export interface GraphDesignerSchema extends SchemaType {
    type: 'graph-designer',

    className: string,
    toolbarClassName: string,

    mainEditor: SchemaType,

    toolbar?: SchemaCollectionType,

    subEditors: {
        [groupName: string]: {
            [elementType: string]: SchemaType
        }
    },

    maxPanelWidth: number,
    minPanelWidth: number,

    /**
     * 初始化数据 API
     */
    initApi?: ApiObject,

    saveApi?: ApiObject
}

type PlainObject = {
    [propName: string]: any
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

function updateMainData(data: GraphData, values: any) {
    return {
        ...data,
        ...cleanData(values)
    }
}


function updateElementData(data: GraphData, elm: SelectedElement, values: any) {
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

export interface GraphDesignerProps
    extends Omit<GraphDesignerSchema, 'type'> {
    className: string,
    value: any,
    data: any,
    onChange: (value: any) => void
}

function cleanData(data: any) {
    if (!data)
        return data

    const ret: PlainObject = {}
    for (let k in data) {
        // 去除以__为前缀的变量，比如amis中的__super等
        if (k.startsWith("__"))
            continue;
        ret[k] = data[k]
    }
    return ret
}


export function GraphDesigner(props: GraphDesignerProps) {

    const { className, toolbarClassName, minPanelWidth, maxPanelWidth,
        initApi, saveApi, toolbar, value, onChange } = props;

    const [showRightPanel, setShowRightPanel] = useState(true)
    const [graphData, setGraphData] = useState<GraphData>(value?.data || {})
    const [graphDiagram, setGraphDiagram] = useState(value?.diagram || {})

    const [inited, setInited] = useState(false)
    const [currentElement, setCurrentElement] = useState<SelectedElement>({
        groupName: "main",
        elementType: "default",
        elementId: "default"
    })

    const editorCallbacks = React.useRef<EventCallbacks>({})

    const [handleResizeMouseDown] = useSplitter({
        alignRight: true, asideMinWidth: minPanelWidth || 50,
        asideMaxWidth: maxPanelWidth || 800
    })

    const renderContext: RenderContext = React.useContext(RenderContextKey)!
    const { render, executor } = renderContext

    if (!inited) {
        setInited(true)

        executor(initApi, props.data, props)?.then(res => {
            const graphData = res.data?.data || {} as any
            const graphDiagram = res.data?.diagram || {} as any
            setGraphData(graphData)
            setGraphDiagram(graphDiagram)
        })
    }

    function selectMain() {
        setCurrentElement({ groupName: "main", elementType: "default", elementId: "default" })
    }

    const handleEvent = (event: string, data: any){
        if (event == 'designer:save') {
            const data = { data: graphData, diagram: graphDiagram }
            if (onChange && (graphData != value?.data || graphDiagram != value?.diagram))
                onChange(data)

            const future = saveApi && executor?.(saveApi, data, props)
            if (!future) {
                console.log("designer:save", data)
            }
        } else if (event == 'designer:selectMain') {
            selectMain()
        } else {
            console.log("unknown-event:", event, data)
        }
    }

    const handleEditorEvent = useCallback((
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
            let data = updateElementData(graphData, currentElement, values)
            setGraphData(data)
        } else if (currentElement && currentElement.groupName == 'main') {
            let data = updateMainData(graphData, values)
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
            let newData = removeElement(graphData, data)
            setGraphData(newData)
        }
        editorCallbacks.current.forEach(callback => {
            callback(event, data)
        })
    }, [editorCallbacks])

    const registerEditorCallback = useCallback((source: string, callback: OnEventType) => {
        let callbacks = editorCallbacks.current[source]
        if(!callbacks){
            callbacks = []
            editorCallbacks.current[source] = callbacks
        }
        callbacks.push(callback)
        return ()=>{}
    }, [editorCallbacks])

    const subProps = {
        onAction: handleAction,
        onEditorEvent: handleEditorEvent,
        registerEditorCallback
    }

    function renderToolbar() {
        return <div className={'nop-graph-designer-toolbar ' + toolbarClassName}>
            {render('toolbar', toolbar || '', subProps, props)}
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

        return <div className={'nop-graph-designer-right-panel'}>
            <div
                onMouseDown={handleResizeMouseDown}
                className={'nop-graph-designer-panel-resizor'}
            ></div>

            {render('subEditor', schema || '', {
                ...subProps, data,
                onAction: handleEditorAction, onChange: handleEditorChange
            })}
        </div>
    }

    return (
        <div className={'nop-graph-designer ' + (className || '')}>
            {toolbar ? renderToolbar() : null}
            <div className={'nop-graph-designer-inner'}>
                <div className={'nop-graph-designer-main'}>
                    <RenderContextKey.Provider value={{ ...renderContext, onEvent: handleEvent }}>
                        {render('main', props.mainEditor, subProps, props)}
                    </RenderContextKey.Provider>
                </div>
                {showRightPanel ? renderRightPanel() : null}
            </div>
        </div>)
}