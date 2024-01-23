import { ActionObject } from 'amis-core';
import { AllowedComponentProps } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { FormControlProps } from 'amis';
import type { PageObject } from '@nop-chaos/nop-core';
import { PageOptions } from '@nop-chaos/nop-core';
import { PropType } from 'vue';
import { Raw } from 'vue';
import { default as React_2 } from 'react';
import { Ref } from 'vue';
import { RegisterPage } from '@nop-chaos/nop-core';
import { RendererData } from 'amis-core';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { ShallowRef } from 'vue';
import { VNode } from 'vue';
import { VNodeProps } from 'vue';

export declare const AmisPageEditor: DefineComponent<{
    schema: ObjectConstructor;
    rollbackPageSource: FunctionConstructor;
    getPageSource: {
        type: FunctionConstructor;
        required: true;
    };
    savePageSource: {
        type: FunctionConstructor;
        required: true;
    };
}, {
    editorRef: Ref<null>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "exit"[], "exit", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    schema: ObjectConstructor;
    rollbackPageSource: FunctionConstructor;
    getPageSource: {
        type: FunctionConstructor;
        required: true;
    };
    savePageSource: {
        type: FunctionConstructor;
        required: true;
    };
}>> & {
    onExit?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

export declare const AmisSchemaPage: DefineComponent<{
    schema: ObjectConstructor;
    data: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    schema: ObjectConstructor;
    data: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}>>, {}, {}>;

export declare const AmisToast: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}, {}>;

export declare class AmisVueComponent extends React_2.Component<VueControlProps, any> {
    vueComponent: any;
    constructor(props: any);
    doAction(action: ActionObject, data: RendererData, throwErrors?: boolean): void;
    dispatchChangeEvent(eventData?: any): Promise<void>;
    render(): React_2.DetailedReactHTMLElement<React_2.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export declare function defineReactPageComponent(builder: (props: {
    actions?: Record<string, Function>;
}) => ReactPageOptions): DefineComponent<{
    schema: ObjectConstructor;
    data: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    schema: ObjectConstructor;
    data: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}>>, {}, {}>;

export declare type ReactPageOptions = PageOptions & {
    onRenderPage(schema: any, data: any, page: PageObject): Promise<JSX.Element> | JSX.Element;
    onDestroyPage?(page: PageObject): void;
};

declare interface VueControlProps extends FormControlProps {
    componentName: string;
    props: Record<string, any>;
}

export declare const XuiLoading: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}, {}>;

/**
 * 在AmisSchemaPage的基础上增加AmisDebugger调试功能，以及根据path动态加载schema的功能
 */
export declare const XuiPage: DefineComponent<{
    path: {
        type: StringConstructor;
        required: true;
    };
    data: ObjectConstructor;
    config: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}, {
    pageSchema: ShallowRef<any>;
    updateSchema: (value: any) => void;
    rebuild: () => void;
    registerPage: (p: PageObject) => void;
    debug: Ref<boolean>;
    actions: {
        [x: string]: Function;
    };
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    path: {
        type: StringConstructor;
        required: true;
    };
    data: ObjectConstructor;
    config: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}>>, {}, {}>;

export declare const XuiPageEditor: DefineComponent<{
    rollbackPageSource: FunctionConstructor;
    getPageSource: {
        type: FunctionConstructor;
        required: true;
    };
    savePageSource: {
        type: FunctionConstructor;
        required: true;
    };
}, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    exit: (...args: any[]) => void;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    rollbackPageSource: FunctionConstructor;
    getPageSource: {
        type: FunctionConstructor;
        required: true;
    };
    savePageSource: {
        type: FunctionConstructor;
        required: true;
    };
}>> & {
    onExit?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

/**
 * 嵌入到vue中的amis页面。每个AmisSchemaPage都对应一个ReactRooot。schema发生变化时会重新创建react组件
 */
export declare const XuiSchemaPage: DefineComponent<{
    schema: ObjectConstructor;
    data: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}, {
    componentType: Ref<Raw<DefineComponent<{
        schema: ObjectConstructor;
        data: ObjectConstructor;
        registerPage: PropType<RegisterPage>;
        actions: PropType<Record<string, Function>>;
    }, () => VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
        schema: ObjectConstructor;
        data: ObjectConstructor;
        registerPage: PropType<RegisterPage>;
        actions: PropType<Record<string, Function>>;
    }>>, {}, {}>>>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    schema: ObjectConstructor;
    data: ObjectConstructor;
    registerPage: PropType<RegisterPage>;
    actions: PropType<Record<string, Function>>;
}>>, {}, {}>;

export { }
