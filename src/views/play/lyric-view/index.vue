<template>
	<transition name="show">
		<div class="lyric-view" ref="view" v-show="showLyricView">
			<div class="scroll-view" v-if="lyrics">
				<div class="_wrapper" ref="scrollview">
					<div class="_content" ref="lyricScroll">
						<div ref="lyricItem" :class="currentLyric === index ? 'lyric-item active' : 'lyric-item'" v-for="(lyric, index) in lyrics" :key="index">{{lyric[1]}}</div>
						<div class="lyric-item" v-show="!lyrics">歌词加载中...</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import {
	findLyricInList
} from '@utils'
export default {
  props: {
    showLyricView: {
      type: Boolean,
      default: false
    },
    lyrics: {
      type: Array,
      default: null
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null,
      currentLyric: -1,
      defaultTranslate: 0,
      scrollNum: 5
    }
  },
  watch: {
    showLyricView(val){
      const current = this.currentLyric
      if (val && current >= this.scrollNum) {
        const elem = this.$refs.lyricItem[current - this.scrollNum]
        this.$nextTick(() => {
          this.scroll.scrollToElement(elem, 500)
        })
      }
    },
    currentTime(val) {
      if (!this.lyrics) { return }
      this.currentLyric = findLyricInList(val, this.lyrics)
    },
    currentLyric(newVal) {
      if (newVal < this.scrollNum) {
        this.scroll.scrollTo(0, 0, 300)
      } else {
        const elem = this.$refs.lyricItem[newVal - this.scrollNum]
        this.scroll.scrollToElement(elem, 300)
      }
    }
  },
  mounted() {
    const vm = this
		vm.initScroll()
  },
  methods: {
    initScroll() {
      const vm = this
      if (vm.scroll) {
        vm.scroll.refresh()
        return void 0
      }
      this.$nextTick(() => {
        vm.scroll = new BScroll(this.$refs.scrollview, {
          scrollY: true,
          click: () => { vm.$parent.hideLyricView() },
          probeType: vm.probeType
        })
        // 初始化第几句歌词开始滚动
        vm.scrollNum = ((window.screen.availHeight  - window.fontSize * 9.2) / (window.fontSize * 2.5) >> 1) - 1
      })
    },
  }
}
</script>

<style scoped>
.lyric-view{
	position: relative;

	height: calc(100vh - 290px);
}
.lyric-item{
  padding: 15px 25px;
  line-height: 50px;
  text-align: center;
  font-size: var(--name-size);
  color: rgba(255, 255, 255, .5);
}
.active{
	color: #fff;
}
.scroll-view{
	position: fixed;
	top: 140px;
	left: 0;
	bottom: 220px;
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
  will-change: transform;
  transition-duration: 300ms;
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
