import { createApp } from 'vue'
import './assets/css/global.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'   //持久化管理的插件
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia().use(piniaPluginPersist))  //创建pinia再使用插件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) { //这是个添加图标
    app.component(key, component)
  }
app.mount('#app')
