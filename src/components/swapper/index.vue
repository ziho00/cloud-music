<template>
	<div class="swapper" ref="swapper">
		<div class="swapper-content" ref="content">
			<slot></slot>
		</div>	
		<div v-if="showDots" class="dots">
			<span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="item"></span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 5000
    },
    showDots: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      swapper: null,
      currentPageIndex: 0,
      dots: 0,
      timer: null
    }
  },
  mounted() {
    const vm = this
    vm.setSliderWidth()
    vm.initSlider()
    if (vm.autoPlay) {
      vm.play()
    }
	},
	activated(){
		if(this.swapper) {
			this.swapper.refresh()
		}
	},
  methods: {
    setSliderWidth() {
      const vm = this
      let clientWidth = vm.$refs.swapper.clientWidth
      let len = vm.$refs.content.children.length >>> 0
      let width = clientWidth * len
      if (vm.loop) {
        width += 2 * clientWidth
      }
      vm.$refs.content.style.width = width + "px"
      vm.$refs.content.style.height = vm.height + "px"
      vm.dots = len
    },
    initSlider() {
      const vm = this
      vm.swapper = new BScroll(vm.$refs.swapper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: vm.loop,
          threshold: 0.3,
          speed: 500
        },
        click: true
      })
      this.swapper.on("scrollEnd", () => {
        let pageIndex = vm.swapper.getCurrentPage().pageX
        vm.currentPageIndex = pageIndex
        vm.timer && clearTimeout(vm.timer)
        vm.play()
      })
    },
    play() {
      const vm = this
      vm.timer = setTimeout(() => {
        vm.swapper.next()
      }, vm.duration)
    }
  },
  destoryed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
.swapper{
	position: relative;
	overflow: hidden;
}

.swapper-content{
	display: flex;
	will-change: transform;
}
.dots{
	position: absolute;
	right: 0;
	bottom: 35px;
	left: 0;
	padding: 5px 0;
	font-size: 0;
	text-align: center;

	transform: translateZ(1px);
}

.dot{
	display: inline-block;
	margin: 0 5px;
	width: 12px;
	height: 12px;
	border-radius: 50%;

	background: rgba(255, 255, 255, 0.5);
}

.active{
	width: 24px;

	border-radius: 5px;

	background: var(--app-bg);
}
</style>