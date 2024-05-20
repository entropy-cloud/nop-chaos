import { usePluginSystem } from "@nop-chaos/nop-core";
import {defineComponent,h,Fragment} from 'vue'

export default defineComponent(()=>{
    const pluginSystem = usePluginSystem()

    return ()=>{
        return h(Fragment,null, pluginSystem.vueRenderInMainPage())
    }
})