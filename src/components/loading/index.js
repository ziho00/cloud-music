import element from './loading.vue'

let Loading = {}

let loadingInstances = []

function returnAnInstance(instance) {
	if(instance) {
		if(loadingInstances.length > 0 
			&& loadingInstances[loadingInstances.length - 1] === instance) return
			loadingInstances.push(instance)
	}
}

Loading.install = function(Vue) {
	const LoadingConstructor = Vue.extend(element)
	let instance = null
	if(loadingInstances.length > 0) {
		instance = loadingInstances.shift()
	} else {
		instance = new LoadingConstructor()
		instance.$mount(document.createElement('div'))
		document.body.append(instance.$el)
	}
	Vue.prototype.$loading = {
		show({msg, banClick}) {
			instance.banClick = banClick || false
      instance.msg = msg || "加载中..."
			instance.visiable = true
		},
		hide(){
			instance.msg = ""
			instance.visiable = false
			returnAnInstance(instance)
		}
	}
}

export default Loading