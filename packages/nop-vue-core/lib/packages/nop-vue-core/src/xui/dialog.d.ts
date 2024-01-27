import { Component } from "vue";
export type DialogOptions = {
    component: Component;
    props?: Record<string, unknown>;
    onOk?: (data?: any) => boolean | void;
    onCancel?: () => void;
};
export declare function showDialog({ component, props, onOk, onCancel }: DialogOptions): {
    cancel: () => void;
    destroy: () => void;
    update: (newConfig: any) => void;
};
