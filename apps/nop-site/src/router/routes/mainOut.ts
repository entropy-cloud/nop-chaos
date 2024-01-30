/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';
import { XuiPage } from '@nop-chaos/sdk';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [

  {
    path: '/pages/',
    name: 'jsonPage',
    component: XuiPage,
    meta: {
      title: 'Page',
      hideMenu: true,
      hideBreadcrumb: true,
    },

    props: (route) => {
      return { path: '/' + route.params.path }
    }
  },

];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
