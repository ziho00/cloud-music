<template>
  <div class="tabs">
    <Tab v-for="(item, index) in titles" ref="titles" :key="item.title" :tab="item" 
		:idx="index" :color="index === currentIndex ? color : ''" @changeNav="changeNav"></Tab>
    <div class="tab-line" :style="lineStyle"></div>
  </div>
</template>
<script>
import Tab from './tab'
import {
  isDef,
  addUnit
} from '@utils'
export default {
  components: {
    Tab
  },
  props: {
    active: {
      type: [Number, String]
    },
    titles: {
      type: Array,
      default: null
    },
    background: {
      type: String,
      default: '#fff'
    },
    color: {
      type: String,
      default: '#ee0a24'
    },
    sticky: {
      type: Boolean,
      default: false
    },
    lineWidth: {
      type: [Number, String],
      default: 50
    },
    lineheight: {
      type: [Number, String],
      default: 3
    }
  },
  data(){
    return {
      currentIndex: null,
      lineStyle: {
        background: this.color
      },
      inited: false
    }
  },
  watch: {
    color: 'setLine',
    currentIndex() {
      this.setLine()
    },
    active(val) {
      if (val >= 0 && val !== this.currentIndex){
        this.currentIndex = val
      }
    }
  },
  mounted(){
    this.init()
  },
  activated(){
    if (this.inited) {
      this.init()
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.currentIndex = this.active
        this.setLine()
        this.inited = true
      })
    },
    setLine(){
      this.$nextTick(() => {
        const { titles } = this.$refs
        if (
          !titles ||
          !titles[this.currentIndex]
        ) {
          return
        }
        const { lineWidth, lineheight } = this
        const title = titles[this.currentIndex].$el
        const width = isDef(lineWidth) ? lineWidth : title.offsetWidth >> 1
        const height = isDef(lineheight) ? lineheight : 3
        const left = title.offsetLeft + (title.offsetWidth >> 1)
        const lineStyle = {
          width: addUnit(width),
          height: addUnit(height),
          backgroundColor: this.color,
          transform: `translateX(${left}px) translateX(-50%)`
        }
        this.lineStyle = lineStyle
        lineStyle.transitionDuration = `${this.duration}s`
      })
    },
    changeNav(item, index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index
        this.$emit('changeIndex', this.currentIndex)
        this.$emit('changeActive', item, index)
      }
    }
  }
}
</script>

<style scoped>
.tabs{
  height: 90px;
  position: relative;
  display: flex;
}
.tabs::after {
  position: absolute;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 1px solid #ebedf0;
  transform: scale(0.5);
}
.tab-line{
  position: absolute;
  bottom: 5px;
  left: 0;
  z-index: 1;
  border-radius: 3px;
  transform: translateX(97.5px) translateX(-50%);
  transition-duration: 0.3s;
}
</style>
