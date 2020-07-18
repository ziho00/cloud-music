import store from '@/store'
export default function routerConfig(router) {
	router.beforeEach((to, from, next) => {
		const login = !!store.state.account.id
		const isAnonymous = !!store.state.isAnonymous
		if (login || isAnonymous) {
			next()
		} else {
			if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
				next()
			} else { // 否则 跳转到登录页面
				next({ path: '/' })
			}
		}
	})
}