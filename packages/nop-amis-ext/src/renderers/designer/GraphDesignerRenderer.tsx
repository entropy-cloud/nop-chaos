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

import "./designer.css"

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
export type DiagramData = PlainObject & {
    [groupName: string]: {
        [id: string]: PlainObject & {
            type: string
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

export function GraphDesigner(props: GraphDesignerProps) {

    const { className, toolbarClassName, classnames: cx, onAction, style, render, minPanelWidth,maxPanelWidth,
        initApi, saveApi, toolbar, value, onChange, ...rest } = props;

    const [showRightPanel, setShowRightPanel] = useState(true)
    const [diagramData, setDiagramData] = useState<DiagramData>(value)

    const [inited, setInited] = useState(false)
    const [currentElement, setCurrentElement] = useState<SelectedElement>({
        groupName: "main",
        elementType: "default",
        elementId: "default"
    })

    const editorCallbacks = React.useRef([] as HandleEditorEvent[])
    const [handleResizeMouseDown] = useSplitter({ alignRight: true, asideMinWidth: minPanelWidth || 50, 
        asideMaxWidth: maxPanelWidth || 800 })

    if (!inited) {
        setInited(true)
        if (isEffectiveApi(initApi, props.data)) {
            const store = props.store as IServiceStore
            store.fetchData(initApi, props.data).then(res => {
                setDiagramData(res)
            })
        }
    }

    const handleAction = useCallback((
        e: React.UIEvent<any> | void,
        action: ActionObject,
        ctx: object,
        throwErrors: boolean = false,
        delegate?: IScopedContext) => {
        if (action.actionType == 'submit') {
            if (onChange && diagramData != value)
                onChange(diagramData)

            if (isEffectiveApi(saveApi, action.data)) {
                const store = props.store as IServiceStore
                store.fetchData(saveApi, { data: diagramData })
            }
            return
        }
        onAction && onAction(e, action, ctx, throwErrors, delegate)
    }, [])

    const handleEditorAction = useCallback((
        e: React.UIEvent<any> | void,
        action: ActionObject,
        ctx: object,
        throwErrors: boolean = false,
        delegate?: IScopedContext) => {
        if (action.actionType == 'submit') {
            if (!diagramData)
                return

            if (currentElement && currentElement.groupName != 'main') {
                let group = diagramData[currentElement.groupName] || (diagramData[currentElement.groupName] = {})
                group[currentElement.elementId] = action.payload
            }
            return
        }
        onAction && onAction(e, action, ctx, throwErrors, delegate)
    }, [])

    const handleEditorEvent = useCallback((event: string, data: any) => {
        if (event == 'selectElement') {
            setCurrentElement(data)
            setShowRightPanel(data != null)
        } else if (event == 'selectMain') {
            setCurrentElement({ elementType: 'default', groupName: 'main', elementId: 'default' })
        }
        editorCallbacks.current.forEach(callback => {
            callback(event, data)
        })
    }, [])

    const registerEditorCallback = useCallback((callback: HandleEditorEvent) => {
        editorCallbacks.current.push(callback)
    }, [])

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
            data = diagramData
        } else {
            schema = props.subEditors[currentElement.groupName]?.[currentElement.elementType]
            data = diagramData?.[currentElement.groupName]?.[currentElement.elementId]
        }
        if (!schema)
            return null

        if (!data) data = {}

        return <div className={cx(`GraphDesigner-rightPanel`)}>
            <div
                onMouseDown={handleResizeMouseDown}
                className={cx(`GraphDesigner-panelResizor`)}
            ></div>

            {render('subEditor', schema || '', { ...subProps, onAction: handleEditorAction, data })}
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