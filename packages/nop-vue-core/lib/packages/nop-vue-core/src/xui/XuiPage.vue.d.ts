import { DefineComponent, ComponentOptionsMixin, PublicProps, ExtractPropTypes, PropType } from 'vue';
import type { RegisterPage } from '@nop-chaos/nop-core';
declare const _default: DefineComponent<__VLS_TypePropsToRuntimeProps<{
    path: string;
    data: any;
    config: any;
    registerPage: RegisterPage;
    actions: Record<string, Function>;
}>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    path: string;
    data: any;
    config: any;
    registerPage: RegisterPage;
    actions: Record<string, Function>;
}>>>, {}, {}>;
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
