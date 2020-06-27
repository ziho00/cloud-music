<template>
  <div class="progress-bar">
		<div ref="start" class="time-item current-time">{{curTime_m_s || '00:00'}}</div>
		<div ref="progressBar" class="progress-bar-item" @click="changeValue">
			<div class="progress-bar-item__bar" :style="`width: ${value}%;`">
				<div class="bar-btn">
					<div class="bar-btn__item"></div>
				</div>
			</div>
		</div>
		<div class="time-item end-time">{{totalTime_m_s || '00:00'}}</div>
	</div>
</template>

<script>
import {
	throttle
} from '@utils'
export default {
  props: {
    curTime_m_s: {
      type: String,
      default: "00:00"
    },
    totalTime_m_s: {
      type: String,
      default: "00:00"
    },
    currentTime: {
      type: Number,
      default: 0
    },
    totalTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      startX: 0,
      endX: 0,
      totalWidth: 0,
      curX: 0,
      value: 0,
      handleMouseMove: null,
      isDraging: false // 拖动的时候不会改变音乐进度
    }
  },
  watch: {
    curX(val) {
      this.value = (val / this.totalWidth) * 100
    },
    currentTime(val) {
      const {totalTime, isDraging} = this
      if (isDraging === false) {
        this.value = (val / totalTime) * 100
      }
    }
  },
  mounted(){
    const vm = this
    vm.startX = vm.$refs.start.clientWidth
    vm.endX = vm.startX + vm.$refs.progressBar.clientWidth
    vm.totalWidth = vm.endX - vm.startX
    vm.handleMouseMove = throttle(this.move, 50)
    document.querySelector(".bar-btn").addEventListener("touchstart", vm.dragBar)
  },
  methods: {
    changeValue(event) {
      const vm = this
      const X = event.clientX
      const {startX, endX} = vm
      if (X < startX) {
        vm.curX = 0
      } else if (X > endX) {
        vm.curX = vm.totalWidth
      } else {
        vm.curX = event.clientX - startX
      }
      this.handleTouchChangeVal((this.curX / this.totalWidth) * 100)
    },
    dragBar() {
      this.isDraging = true
      document.addEventListener("touchmove", this.handleMouseMove)
      document.addEventListener("touchend", this.stop)
    },
    move(event) {
      if (!event) { return }
      const vm = this
      const X = event.touches[0].clientX
      const {startX, endX} = vm
      if (X < startX) {
        vm.curX = 0
      } else if (X > endX) {
        vm.curX = vm.totalWidth
      } else {
        vm.curX = X - startX
      }
    },
    stop() {
      document.removeEventListener("touchmove", this.handleMouseMove)
      document.removeEventListener("touchend", this.stop)
      this.handleTouchChangeVal(this.value)
      this.isDraging = false
    },
    handleTouchChangeVal(val) {
      const { totalTime } = this
      const newCurrentTime = (val / 100) * totalTime
      this.$store.dispatch("ChnageCurrentTime", newCurrentTime)
    }
  }
}
</script>

<style scoped>
.progress-bar{
	position: fixed;
	display: flex;
	bottom: 155px;
	width: 100vw;
	height: 20px;
}
.time-item{
	width: 85px;
	line-height: 20px;
	text-align: center;
	color: #EBEEF5;
	font-size: .6rem;
}

.progress-bar-item{
	position: relative;
	width: 570px;
	height: 4px;
	margin-top: 8px;
	cursor: pointer;
	border-radius: 2px;
	background-color: rgba(255, 255, 255, .5);
}
.progress-bar-item::before{
	position: absolute;
	top: -16px;
	right: 0;
	bottom: -16px;
	left: 0;
	content: '';
}
.progress-bar-item__bar{
	will-change: width;
	position: relative;
	height: 4px;
	background-color: rgba(0, 0, 0, .4);
	border-radius: 4px;
	transition: width .2s;
}
.bar-btn{
	position: absolute;
	top: 50%;
	right: 0;
	-webkit-transform: translate3d(50%, -50%, 0);
	transform: translate3d(50%, -50%, 0);
	cursor: grab;
}
.bar-btn__item{
	width: 18px;
	height: 18px;
	background-color: var(--color-white);
	border-radius: 50%;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
}
</style>
