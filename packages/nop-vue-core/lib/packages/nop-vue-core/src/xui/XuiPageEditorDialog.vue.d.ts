import { DefineComponent, ComponentOptionsMixin, PublicProps, ExtractPropTypes, PropType } from 'vue';
import { EditorComponentProps } from '@nop-chaos/nop-core';
declare const _default: DefineComponent<__VLS_TypePropsToRuntimeProps<EditorComponentProps | {
    modelValue: string;
}>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    exit: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<EditorComponentProps>> | ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    modelValue: string;
}>>> & {
    onExit?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {} | {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};
