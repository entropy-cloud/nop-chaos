import { ActionObject, ButtonSchema, IServiceStore, Renderer, RendererProps, Schema, SchemaApi } from 'amis';
import { FeedbackDialog, SchemaReload } from 'amis/lib/Schema';
import React, { Fragment } from 'react';
import { applyVueInReact } from 'veaury';

import XuiPageEditorDialog from './XuiPageEditorDialog.vue';

interface XuiPageEditorButtonSchema extends ButtonSchema {
    actionType: 'popEditor',
    initApi: SchemaApi,
    rollbackApi?: SchemaApi,
    api: SchemaApi;
    feedback?: FeedbackDialog;
    reload?: SchemaReload;
    redirect?: string;
    ignoreConfirm?: boolean;
    /**
     * 是否开启请求隔离, 主要用于隔离联动CRUD, Service的请求
     */
    isolateScope?: boolean;
}

type XuiPageEditorButtonProps = RendererProps & XuiPageEditorButtonSchema

type ButtonState = {
    dialogVisible: boolean
}

function getPageStore(store: any) {
    if (!store)
        return
    if (store.fetchData)
        return store
    return getPageStore(store.parentStore)
}

export class XuiPageEditorButton extends React.Component<XuiPageEditorButtonProps, ButtonState>{
    dialogComponent: any

    savePageSource: (data: any) => Promise<any>

    getPageSource: () => Promise<any>

    rollbackPageSource: () => Promise<any>

    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false
        }
        this.dialogComponent = applyVueInReact(XuiPageEditorDialog)
        this.handleAction = this.handleAction.bind(this)

        const store = getPageStore(this.props.store) as IServiceStore

        this.getPageSource = () => {
            return store.fetchData(this.props.initApi, this.props.data).then(res => res.data)
        }

        this.savePageSource = (data: any) => {
            return store.fetchData(this.props.api, { ...this.props.data, data }).then(res => res.data)
        }

        this.rollbackPageSource = () => {
            if (!this.props.rollbackApi)
                return Promise.resolve(null)
            return store.fetchData(this.props.rollbackApi, this.props.data).then(res => res.data)
        }
    }

    handleAction(e: React.MouseEvent<any>, action: ActionObject) {
        const actionType: string = action.actionType!
        if (actionType == 'popEditor') {
            this.setState({ dialogVisible: true })
        } else {
            return this.props.onAction(e, action,)
        }
    }

    render() {
        const props = this.props;
        const actionSchema: Schema = {
            ...props,
            type: 'action',
            actionType: 'popEditor'
        }

        const body = [
            props.render('button',
                actionSchema, { onAction: this.handleAction }) as any,
            React.createElement(this.dialogComponent, {
                modelValue: this.state.dialogVisible,
                savePageSource: this.savePageSource,
                getPageSource: this.getPageSource,
                rollbackPageSource: this.rollbackPageSource,
                "onUpdate:modelValue": (value:boolean) => this.setState({ dialogVisible: value },
                )
            })
        ]

        return React.createElement(Fragment, null, body)
    }
}

Renderer({
    type: 'xui-page-editor-button',
    autoVar: false
})(XuiPageEditorButton)