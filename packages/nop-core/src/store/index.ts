export * from './types';

import { StdStoreInitOptions,StdStoreApi } from './types';

import { isFunction } from '@nop-chaos/nop-shared';

const g_stores: Map<string,StdStoreApi> = new Map()

export function clearGlobalStores(){
  return g_stores.clear()
}

export function getGlobalStore(name:string){
  return g_stores.get(name)
}

export function deleteGlobalstore(name:string){
  g_stores.delete(name)
}

export function registerGlobalStore(name: string, store: StdStoreApi){
  g_stores.set(name,store)
}

/**
 * 创建用于zustand状态管理库的构造函数。nop-core模块不依赖react，所以没有直接依赖zustand库
 */
export function buildStdStoreCreator(options: StdStoreInitOptions) {
  const { getDefaultValue, saveData, saveKeys, loadData } = options;

  return (set: any, get: any) => {
    const initState = {
      ...options.initState,
      ...options.stateCreator?.(set, get)
    };

    function getValue(name: string) {
      let value = get()[name];
      if (value === undefined) value = getDefaultValue?.(name);
      return value;
    }

    function setValue(name: string, value: any) {
      set({[name]:value});
    }

    function reset() {
      set(initState);
    }

    function triggerLoad(): Promise<void> {
      if (!loadData) return Promise.resolve();
      return loadData().then(data => {
        set(data);
      });
    }

    function getDataToSave() {
      if (!saveKeys) {
        // 如果没有指定saveKeys，则保存所有不是函数且不以__为前缀的所有值
        const ret: any = {};
        const keys = Object.keys(initState);
        for (const key of keys) {
          if (key.startsWith('__')) continue;
          const value = getValue(key);
          if (value != null && !isFunction(value)) {
            ret[key] = value;
          }
        }
        return ret;
      }
      const ret: any = {};
      for (const key of saveKeys) {
        ret[key] = getValue(key);
      }
      return ret;
    }

    function triggerSave(): Promise<void> {
      if (!saveData) return Promise.resolve();
      const data = getDataToSave();
      return saveData(data);
    }

    return {
      getValue,
      setValue,
      reset,
      triggerLoad,
      triggerSave,
      globalStoreName: options.globalStoreName,
      ...initState
    };
  };
}
