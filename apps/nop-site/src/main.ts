import '/@/design/index.less';

// 注册图标
import 'virtual:svg-icons-register';

import { createApp } from 'vue';

import { registerGlobComp } from '@/components/registerGlobComp';
import { setupI18n } from '@/locales/setupI18n';
import { setupErrorHandle } from '@/logics/error-handle';
import { initAppConfigStore } from '@/logics/initAppConfig';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';

import App from './App.vue';

import {initNopApp} from './nop/initNopApp'

// 这个css必须放在amis引入的css后面，它的优先级才能覆盖amis的样式
import 'uno.css';
import 'ant-design-vue/dist/reset.css';

async function bootstrap() {
  const app = createApp(App);
  // Configure store
  // 配置 store
  setupStore(app);

  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore();

  // Register global components
  // 注册全局组件
  registerGlobComp(app);

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);
  // Configure routing
  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);

  // Register global directive
  // 注册全局指令
 // setupGlobDirectives(app);

  // Configure global error handling
  // 配置全局错误处理
  setupErrorHandle(app);

  await initNopApp(app)

  // 当路由准备好时再执行挂载( https://next.router.vuejs.org/api/#isready)
 // await router.isReady();

  app.mount('#app');
}

bootstrap();
