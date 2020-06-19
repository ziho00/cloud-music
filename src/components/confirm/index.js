import element from './confirm.vue'

let Confirm = {}

let confirmInstances = []

function returnAnInstance(instance) {
	if(instance) {
		if(confirmInstances.length > 0 
			&& confirmInstances[confirmInstances.length - 1] === instance) return
			confirmInstances.push(instance)
	}
}

Confirm.install = function(Vue) {
	const ConfirmConstructor = Vue.extend(element)
	let instance = null
	if(confirmInstances.length > 0) {
		instance = confirmInstances.shift()
	} else {
		instance = new ConfirmConstructor()
		instance.$mount(document.createElement('div'))
		document.body.append(instance.$el)
	}
	Vue.prototype.$confirm = function({title, msg}) {
		instance.title = title || ""
		instance.msg = msg || ""
		instance.visiable = true
		return instance.isConfirm(returnAnInstance)
	}
}
export default Confirm