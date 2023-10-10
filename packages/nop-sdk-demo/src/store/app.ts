import { defineStore } from 'pinia'
import { ajaxRequest,XuiPage,useDebug} from '@nop-chaos/sdk'
import { useRouter } from '../router/index';

type SiteMapBean = {
    id: string,
    supportDebug: boolean,
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
            supportDebug:false,
            resources: [],
        } as SiteMapBean
    }),
    getters: {
        getSitemap: (state) => state.sitemap,
    },
    actions: {
        setSitemap(sitemap: SiteMapBean) {
            if (!sitemap.id)
                sitemap.id = 'app'
            this.sitemap = sitemap
        },

        async fetchSitemap() {
            const router = useRouter()
            
            const sitemap:SiteMapBean = await ajaxRequest({
                url: '/r/SiteMapApi__getSiteMap',
                data: {
                  siteId: 'main'
                }
            })
            
            if (sitemap.supportDebug) {
                useDebug().supportDebug.value = true
                useDebug().debug.value = true
            }

            this.setSitemap(sitemap)
            for (const resource of sitemap.resources || []) {
                for (const item of resource.children || []) {
                    router.addRoute("Home",{
                        name: item.id,
                        path: item.routePath,
                        component: XuiPage,
                        props: {
                            path: item.url,
                        },
                        meta: {
                            requiresAuth: true,
                            dynamic: true
                        }
                    })
                }
            }
            return sitemap  
        }
    },
});