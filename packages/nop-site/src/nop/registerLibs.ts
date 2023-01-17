import { ajaxFetch, ajaxRequest } from "./core";


import { registerXuiComponent } from './amis/registry';
import { registerApi } from './api/registry';
import { absolutePath, format } from './shared';

const System = (typeof self !== 'undefined' ? self : global).System

System.set(System.resolve('./@nop/utils.js'), {
    ajaxFetch,
    ajaxRequest,
    registerApi,
    registerXuiComponent,
    format, absolutePath
})

System.addImportMap({
    imports: {
        "@nop/utils": "./@nop/utils.js"
    }
})