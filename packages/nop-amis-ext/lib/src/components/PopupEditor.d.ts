import React from 'react';
import { ThemeProps, LocaleProps, SchemaNode, PlainObject } from 'amis-core';
export interface PopupEditorProps extends ThemeProps, LocaleProps {
    pickerIcon?: JSX.Element;
    placeholder?: string;
    title?: string;
    value?: any;
    data?: any;
    onChange: (value?: any) => void;
    disabled?: boolean;
    popOverContainer?: any;
    popup: SchemaNode;
    render: (region: string, node: SchemaNode, props?: PlainObject) => JSX.Element;
}
export interface PopupEditorState {
    tmpValue: any;
}
export declare class PopupEditor extends React.Component<PopupEditorProps, PopupEditorState> {
    handleClear(): void;
    highlightValue(value: any): React.JSX.Element;
    renderBody(onChange: (value: any) => void, value?: any, popOverContainer?: any): JSX.Element;
    render(): React.JSX.Element;
}
declare const _default: any;
export default _default;
