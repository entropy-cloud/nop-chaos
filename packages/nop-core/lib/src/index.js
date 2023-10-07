export * from './lib';
import { registerModule } from "./core";
import { registerAdapter } from './adapter';
import { PageApis } from './api';
import { fetcherOk } from './core';
import { transformPageJson, bindActions } from './page';
//import { useAdapter, ajaxRequest, ajaxFetch, usePage, useScoped, useScopedStore } from './index'
import * as NopCore from './lib';
registerModule("@nop-chaos/nop-core", NopCore);
registerAdapter({
    fetchDict(dictName, options) {
        return PageApis.DictProvider__getDict(dictName, options.silent || false).then(res => fetcherOk(res));
    },
    fetchPageAndTransform(pagePath, options) {
        return PageApis.PageProvider__getPage(pagePath).then(async (pageData) => {
            pageData = await transformPageJson(pagePath, pageData);
            if (options._page) {
                bindActions(pagePath, pageData, options._page);
            }
            return fetcherOk(pageData);
        });
    },
    getPage(pageUrl) {
        return PageApis.PageProvider__getPage(pageUrl);
    }
});
