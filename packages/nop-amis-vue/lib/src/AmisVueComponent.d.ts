import React from 'react';
import { FormControlProps } from 'amis';
import { ActionObject, RendererData } from 'amis-core';
export interface VueControlProps extends FormControlProps {
    componentName: string;
    props: Record<string, any>;
}
export default class VueControl extends React.Component<VueControlProps, any> {
    vueComponent: any;
    constructor(props: any);
    doAction(action: ActionObject, data: RendererData, throwErrors?: boolean): void;
    dispatchChangeEvent(eventData?: any): Promise<void>;
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
