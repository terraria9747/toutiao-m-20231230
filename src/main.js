import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入字体图标
import './styles/index.css'

// 导入vant相关的样式和组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 注册vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
