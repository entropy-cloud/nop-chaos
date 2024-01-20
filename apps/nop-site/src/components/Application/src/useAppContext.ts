import { InjectionKey, reactive, Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}

const key: InjectionKey<AppProviderContextProps> = Symbol();

let g_ctx:any 

export function createAppProviderContext(context: AppProviderContextProps) {
    g_ctx = reactive(context)
}

export function useAppProviderContext() {
  return g_ctx;
}
