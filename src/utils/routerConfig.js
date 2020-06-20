import store from '@/store'
export default function routerConfig(router) {
	router.beforeEach((to, from, next) => {
		const login = !!store.state.account.id
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
}