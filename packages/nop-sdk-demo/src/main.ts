import React from 'react'

const oldLazy = React.lazy;
React.lazy = async (fn: any) => {
  console.log(fn)
  return oldLazy(fn)
}

import { createApp } from 'vue';
import App from './App.vue';
import {useRouter} from './router';
import 'ant-design-vue/dist/reset.css';

import { initNopApp } from './nop/initNopApp';
import { useStore } from './store';

const router = useRouter()
const store = useStore()
const app = createApp(App);
app.use(router);
app.use(store)

// 与Nop平台的集成工作主要集中在这个函数中
initNopApp(app)

app.mount('#app');