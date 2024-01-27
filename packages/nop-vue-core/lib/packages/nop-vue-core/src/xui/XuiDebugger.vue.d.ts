import { DefineComponent, ComponentOptionsMixin, PublicProps, ExtractPropTypes, PropType } from 'vue';
declare const _default: DefineComponent<__VLS_TypePropsToRuntimeProps<{
    path: string;
    schema: any;
}>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    "update:schema": (...args: any[]) => void;
    rebuild: (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    path: string;
    schema: any;
}>>> & {
    "onUpdate:schema"?: ((...args: any[]) => any) | undefined;
    onRebuild?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
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
