import { defineStore } from 'pinia'
import { ajaxRequest} from '@nop-chaos/sdk'

type SiteMapBean = {
    id: string,
    resources: SiteResourceBean[],
}

type SiteResourceBean = {
    id: string,
    displayName: string,
    routePath: string,
    url: string,
    component: string,
    children: SiteResourceBean[]
}

export const useAppStore = defineStore('app', {
    state: () => ({
        sitemap: {
            id: '',
            resources: [],
        } as SiteMapBean
    }),
    getters: {
        getSitemap: (state) => state.sitemap,
    },
    actions: {
        setSitemap(sitemap: SiteMapBean) {
            this.sitemap = sitemap
        },

        async fetchSitemap() {
            const sitemap = await ajaxRequest({
                url: '/r/SiteMapApi__getSiteMap',
                data: {
                  siteId: 'main'
                }
              })

            this.setSitemap(sitemap)
            return sitemap  
        }
    },
});