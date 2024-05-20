import { Plugin, PluginSystem} from './types'

function createPluginSystem(): PluginSystem{
  const plugins: Plugin[] = []
  let started = false;

  function registerPlugin(plugin: Plugin){
    plugins.push(plugin)
    if(started)
      plugin.install()

    return ()=> unregisterPlugin(plugin)
  }

  function unregisterPlugin(plugin: Plugin){
    const index = plugins.indexOf(plugin)
    if(index >= 0){
      plugins.splice(index,1)
      if(started)
        plugin.uninstall()
    }
  }

  function start(){
    if(started)
      return;

    for(const plugin of plugins){
      plugin.install()
    }
  }

  function stop(){
    if(!started)
      return
    started = false
    for(const plugin of plugins){
      plugin.uninstall()
    }
  }

  function vueRenderInMainPage(){
    const ret: VDomType[] = []
    for(const plugin of plugins){
      const dom = plugin.vueRenderInMainPage()
      if(dom)
        ret.push(dom)
    }
    return ret
  }

  function reactRenderInMainPage(){
    const ret: VDomType[] = []
    for(const plugin of plugins){
      const dom = plugin.reactRenderInMainPage()
      if(dom)
        ret.push(dom)
    }
    return ret
  }

  return {
    registerPlugin,
    vueRenderInMainPage,
    reactRenderInMainPage,
    start,stop
  }
}

const g_pluginSystem = createPluginSystem()

export function usePluginSystem(){
  return g_pluginSystem;
}