import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式表
import './styles/index.less'

Vue.config.productionTip = false

// 创建 Vue 根实例，导入组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
