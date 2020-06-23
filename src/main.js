// import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from './store'
import setRem from "./utils/setRem"
import routerConfig from "@utils/routerConfig.js"
import "normalize.css"
import './common/css/iconfont/iconfont.css'
import "./common/css/normailze.css"
import "./common/css/index.css"
Vue.config.productionTip = false

setRem()
window.onresize = function() {
  setRem()
}

// 插件
import Loading from './components/loading/index'
import Confirm from './components/confirm/index'
import Toast from './components/toast/index'
Vue.use(Loading)
Vue.use(Confirm)
Vue.use(Toast)

// 设置路由守卫
routerConfig(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
