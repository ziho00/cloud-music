<template>
	<div class="scroll-view" :style="{top}">
    <div class="_wrapper" :style="{background: wrapperBackground}" ref="scrollview">
        <div class="_content" :style="{background: contentBackground}">
            <slot></slot>
            <div class="pulldown-wrapper">
                <slot name="pulldown"></slot>
            </div>
             <div class="pullup-wrapper">
                <slot name="pullup"></slot>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
import LazyLoad from '@utils/lazyload'
import BScroll from "better-scroll"
export default {
	props: {
		hasLazyItem: {
			type: Boolean,
			default: false
		},
		top: {
			type: String,
			default: '3.125rem'
		},
		probeType: {
      type: Number,
      default: 0
		},
		pullDownThreshold: {
      type: Number,
      default: 50
    },
    pullDwonStop: {
      type: Number,
      default: 40
		},
		refreshDelay: {
      type: Number,
      default: 20
		},
		wrapperBackground: {
      type: String,
      default: null
    },
    contentBackground: {
      type: String,
      default: null
		}
	},
	data(){
		return {
			scroll: null,
			lazy: null
		}
	},
	mounted(){
		if(this.hasLazyItem) {
			this.lazy = LazyLoad()
		}
		this.initScroll()
	},
	activated(){
		if(this.lazy) {
			this.lazy()
		}
	},
	methods: {
		initScroll(){
			const vm = this
			if (vm.scroll) {
        vm.scroll.refresh()
        return
			}
			vm.scroll = new BScroll(this.$refs.scrollview, {
        scrollY: true,
        click: true,
        probeType: vm.probeType
			})
			vm.scroll.on("scroll", (event) => {
				this.hasLazyItem && this.lazy()
				vm.$emit("scroll", event)
			})
			vm.scroll.on("scrollEnd", () => {
				this.hasLazyItem && this.lazy()
				vm.$emit("scrollEnd", event)
			})
		},
		refresh(){
			this.scroll.refresh()
		}	
	}
}
</script>

<style scoped>
.scroll-view{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
._wrapper{
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
._content{
	position: relative;
}
.pulldown-wrapper{
	position: absolute;
	left: 0;
	top: -50px;
	width: 100%;
	text-align: center;
	transition: all;
}
.pullup-wrapper{
	width: 100%;
	padding: 16px 0;
	text-align: center;
}
</style>