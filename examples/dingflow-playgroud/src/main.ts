import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {initNopApp} from './nop/initNopApp'

const app = createApp(App);

initNopApp(app)

app.mount('#app')
