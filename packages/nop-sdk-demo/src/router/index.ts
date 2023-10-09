import { createRouter, createWebHistory } from 'vue-router';
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
  history: createWebHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isLoggedIn = useAdapter().useAuthToken() != null

  if (requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    const appStore = useAppStore()
    if(!appStore.getSitemap.id){
      await appStore.fetchSitemap()
    }
    next();
  }
});

export function useRouter(){
  return router;
}