import element from './toast.vue'

let Toast = {}

let toastInstances = []

function returnAnInstance(instance) {
	if(instance) {
		if(toastInstances.length > 0 
			&& toastInstances[toastInstances.length - 1] === instance) return
		toastInstances.push(instance)
	}
}

Toast.install = function(Vue) {
	const ToastConstructor = Vue.extend(element)
	let instance = null
	if(toastInstances.length > 0) {
		instance = toastInstances.shift()
		console.log()
	} else {
		instance = new ToastConstructor()
		instance.$mount(document.createElement('div'))
		document.body.append(instance.$el) 
	}
	Vue.prototype.$toast = function({msg, duration, icon}){
		instance.msg = msg || ''
		instance.icon = icon || null
		duration = duration || 2000
		Vue.nextTick(() => {
			instance.visiable = true	
			let timer = setTimeout(() => {
				instance.visiable = false
				returnAnInstance(instance)
				clearTimeout(timer)
			}, duration)
		})
		return instance
	}
}

export default Toast