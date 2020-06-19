import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from './store'
import setRem from "./utils/setRem"
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

router.beforeEach((to, from, next) => {
  const login = !!store.state.account.id
  // 路由中设置的needLogin字段就在to当中
  if (login) {
    // console.log(to.path) //每次跳转的路径
    if (to.path === "/") {
      // 登录状态下 访问login.vue页面 会跳到index.vue
      next({path: "/main"})
    } else {
      next()
    }
  } else {
    // 如果没有session ,访问任何页面。都会进入到 登录页
    if (to.path === "/") { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next()
    } else { // 否则 跳转到登录页面
      next({ path: "/" })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
