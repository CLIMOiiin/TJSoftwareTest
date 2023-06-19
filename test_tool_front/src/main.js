import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './all.css'
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts';


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus).use(router)
app.mount('#app')
app.prototype.$echarts = echarts
app.config.globalProperties.$axios=axios;  //配置axios的全局引用

