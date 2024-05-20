import { VDomType } from '../renderer/types';

export type Plugin = {
    name: string;
  
    install(): void;
  
    uninstall(): void;
  
    reactRenderInMainPage?: () => VDomType;
  
    vueRenderInMainPage?: () => VDomType;
  };
  
  export type PluginSystem = {
    registerPlugin(plugin: Plugin): ()=> void 

    vueRenderInMainPage(): VDomType[]

    reactRenderInMainPage(): VDomType[]
  
    start():void
  
    stop(): void
  }