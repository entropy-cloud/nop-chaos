import {ref} from 'vue'

const debug = ref(false)

const supportDebug = ref(false)

function toggleDebug(){
    setDebug(!debug.value)
}

function setDebug(b: boolean){
    debug.value = b;
}

/**
 * 是否进入开发调试状态。调试状态下显示在线编辑器按钮，并设置amisDebug=1，启用AMIS内置的调试器。
 * 根据后台返回的SiteMap.supportDebug属性进行初始化
 */
export function useDebug(){
    return{
        debug,
        supportDebug,
        toggleDebug,
        setDebug
    }
}