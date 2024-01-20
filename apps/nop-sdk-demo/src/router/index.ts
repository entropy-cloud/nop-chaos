import { createRouter, createWebHashHistory } from 'vue-router';
import {useAdapter} from '@nop-chaos/sdk'
import { useAppStore } from '../store/app';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import("../views/Home.vue"),
    meta: { requiresAuth: true } // Add this meta field to protect the home route
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import("../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isLoggedIn = useAdapter().useAuthToken()

  if (requiresAuth && !isLoggedIn) {
    next('/login');
  }else if(to.path == '/login'){
    next()	  
  } else {
    const appStore = useAppStore()
    if (!appStore.getSitemap.id) {
      await appStore.fetchSitemap()
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    } else {
      next();
    }
  }
});

export function useRouter(){
  return router;
}