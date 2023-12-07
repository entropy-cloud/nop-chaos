import { PageOptions, createPage } from "@nop-chaos/nop-core";

import { PropType, defineComponent, onBeforeUnmount, ref, h, watchEffect } from 'vue';
import type { PageObject, RegisterPage } from '@nop-chaos/nop-core';
import { Root, createRoot } from 'react-dom/client'
import { cloneDeep } from 'lodash-es'

export type ReactPageOptions = PageOptions & {
    onRenderPage(schema, data:any, page: PageObject): Promise<JSX.Element>|JSX.Element
    onDestroyPage?(page: PageObject): void
}

export function defineReactPageComponent(builder: (props: {actions?:Record<string,Function>})=> ReactPageOptions) {
    return defineComponent({
        props: {
            schema: Object,
            data: Object,
            registerPage: Function as PropType<RegisterPage>,
            actions: Object as PropType<Record<string, Function>>
        },

        setup(props) {
            const domRef = ref<HTMLElement>()
            let root: Root | undefined;

            const options = builder({actions: props.actions})
            let page = createPage(options);

            props.registerPage?.(page)

            function destroyPage() {
                if (root) {
                    // 先卸载root触发销毁操作，然后再执行其他清理函数
                    root.unmount();
                    options.onDestroyPage?.(page);
                    root = undefined
                }
            }

            function renderPage() {
                const schema = cloneDeep(props.schema as any)
                // render返回undefined
                root = createRoot(domRef.value!);
                const r = root
                const vdom = Promise.resolve(options.onRenderPage(schema, props.data, page))
                vdom.then(v => r.render(v as any));
            }

            watchEffect(() => {
                destroyPage()
                if (props.schema && domRef.value) {
                    renderPage();
                }
            });

            onBeforeUnmount(() => {
                destroyPage()

                return {
                    domRef,
                };
            })


            return ()=> h('div', {
                ref: domRef,
                style: {
                    width: '100%',
                    height: '100%'
                },
                class: 'nop-page'
            });
        }
    });
}