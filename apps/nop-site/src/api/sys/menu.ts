import { PageEnum } from '/@/enums/pageEnum';
import { ajaxRequest, useDebug } from '@nop-chaos/sdk';
import { URL_HASH_TAB } from '/@/utils';

const {supportDebug,debug} = useDebug()

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  if (import.meta.env.VITE_USE_MOCK) {
    // mock模式下总是开启调试功能
    supportDebug.value = true
    debug.value = true
    return import("../../../public/mock/get-menu-result.json").then(d => d.default.menu)
  }

  return ajaxRequest({
    url: '/r/SiteMapApi__getSiteMap',
    data: {
      siteId: 'main'
    }
  }).then(data => {
    supportDebug.value = data.supportDebug
    debug.value = data.supportDebug
    const menus = transformMenu(data.resources || [])
    fixHomePath(menus)
    return menus
  })
};

function transformMenu(resources: any) {
  if (!resources)
    return

  return resources.map(r => {
    let children = transformMenu(r.children)
    let menu = {
      id: r.id,
      name: getRouteName(r.routePath),
      path: r.routePath,
      hidden: r.hidden,
      component: r.component,
      redirect: children && children.length ? children[0].path : undefined,
      route: r.routePath ? "1" : "0",
      meta: {
        ...r.meta,
        keepAlive: r.keepAlive,
        icon: r.icon,
        url: r.url,
        title: r.displayName,
        pageComponent: r.component == 'AMIS'
      },
      children
    }

    if (menu.component == 'IFRAME') {
      if (r.target == 'external') {
        // 外部打开
        menu.meta.internalOrExternal = true
        menu.path = menu.meta.url
        menu.path = menu.path.replace('#', URL_HASH_TAB);
      } else {
        // 内部打开
        menu.meta.frameSrc = menu.meta.url
      }
    } else if (!menu.component && menu.meta.url) {
      // 没有指定组件且指定了url，则作为iframe打开
      menu.meta.frameSrc = menu.meta.url
    }
    return menu
  })
}

function getRouteName(path: any) {
  if (!path)
    return
  if (path.charAt(0) == '/')
    path = path.substring(1)
  let name = path.replace('/', '-');
  name = name.replace(':', '@');
  return name
}

/**
 * jeeboot的homePath写死了是进入/dashboard/analysis。
 * 如果返回的菜单中不包含此项内容，则重定向到第一个有效菜单
 */
function fixHomePath(menus: any) {
  if (!menus.length)
    return

  if (!containsBaseHome(menus)) {
    const path = menus[0].path
    menus.splice(0, 0, {
      path: PageEnum.BASE_HOME,
      component: "layouts/default/index",
      redirect: path,
      hidden: true,
      name: "dashboard-analysis",
      id: "9502685863ab87f0ad1134142788a385",
      meta: {
        affix: false
      }
    })
  }
}

function containsBaseHome(menus: any) {
  if (!menus)
    return false
  for (const menu of menus) {
    if (menu.path == PageEnum.BASE_HOME)
      return true
    if (containsBaseHome(menu.children))
      return true
  }
  return false
}

/**
 * 切换成vue3菜单
 */
export const switchVue3Menu = () => {
  return Promise.resolve(null)
};
