import * as React from 'react';
import { useCallback, useState } from 'react';

import { useSplitter } from './Splitter';

import './designer.css'

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
    className?: any, // AMIS声明className类型为any
    value?: any,
    data: {
        [propName: string]: any;
    }
    onChange?: (value: any) => void
    [propName: string]: any
    defaultValue: any
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
        initApi, saveApi, toolbar, defaultValue, onChange } = props;

    const [showRightPanel, setShowRightPanel] = useState(true)
    const [graphData, setGraphData] = useState<GraphData>(defaultValue?.data || {})
    const [graphDiagram, setGraphDiagram] = useState(defaultValue?.diagram || {})

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
    const { render, executor, observeEvent } = renderContext

    React.useEffect(() => {
        return observeEvent?.("delegate", handleEvent)
    })

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

    const handleEvent = (event: string, data: any) => {
        if (event == 'designer:save') {
            const data = { data: graphData, diagram: graphDiagram }
            if (onChange && (graphData != defaultValue?.data || graphDiagram != defaultValue?.diagram))
                onChange(data)

            const future = saveApi && executor?.(saveApi, data, props)
            if (!future) {
                console.log("designer:save", data)
            }
        } else if (event == 'designer:selectMain') {
            selectMain()
        } else if (event == 'designer:selectElement') {
            setCurrentElement(data)
            setShowRightPanel(data != null)
        } else if (event == 'designer:removeElement') {
            if (data.elementId == currentElement.elementId) {
                selectMain()
            }
            let newData = removeElement(graphData, data)
            setGraphData(newData)
        } else {
            console.log("unknown-event:", event, data)
        }
    }

    const handleEditorChange = useCallback((values: any) => {
        if (currentElement && currentElement.groupName != 'main') {
            let data = updateElementData(graphData, currentElement, values)
            setGraphData(data)
        } else if (currentElement && currentElement.groupName == 'main') {
            let data = updateMainData(graphData, values)
            setGraphData(data)
        }
        const callbacks = editorCallbacks.current['subEditorChange']
        if (callbacks) {
            callbacks.forEach(callback => {
                callback("subEditor:onChange", values, props)
            })
        }
    }, [currentElement, graphData])

    const registerEditorCallback = useCallback((source: string, callback: OnEventType) => {
        let callbacks = editorCallbacks.current[source]
        if (!callbacks) {
            callbacks = []
            editorCallbacks.current[source] = callbacks
        }
        callbacks.push(callback)
        return () => {
            const index = callbacks.indexOf(callback)
            index >= 0 && callbacks.splice(index, 1)
        }
    }, [editorCallbacks])

    const subProps = {
        graphDiagram
    }

    function renderToolbar() {
        return <div className={'nop-graph-designer-toolbar ' + (toolbarClassName || '')}>
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
                ...subProps, data, onChange: handleEditorChange
            }, props)}
        </div>
    }

    return (
        <RenderContextKey.Provider value={{
            ...renderContext,
            onEvent: handleEvent, observeEvent: registerEditorCallback
        }}>
            <div className={'nop-graph-designer ' + (className || '')}>
                {toolbar ? renderToolbar() : null}
                <div className={'nop-graph-designer-inner'}>
                    <div className={'nop-graph-designer-main'}>
                        {render('main', props.mainEditor, subProps, props)}
                    </div>
                    {showRightPanel ? renderRightPanel() : null}
                </div>
            </div>
        </RenderContextKey.Provider>
    )
}