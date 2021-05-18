import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 Vant 组件
import Vant from 'vant'

// 引入 amfe-flexible
import 'amfe-flexible'

// Vant 组件库样式
import 'vant/lib/index.css'

// 引入全局样式表
import './styles/index.less'

// 全局注册 Vant
Vue.use(Vant)

Vue.config.productionTip = false

// 创建 Vue 根实例，导入组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
