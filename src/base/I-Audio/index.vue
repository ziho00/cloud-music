<template>
  <audio
    :src="musicUrl"
    ref="myAudio"
    @ended="handleEnd"
    @durationchange="refreshDuration"
    autoplay
    ></audio>
</template>

<script>
import {
  mapState
} from "vuex"
export default {
  data() {
    return {
      timer: null
    }
  },
  computed: {
    ...mapState(["musicInfo", "musicUrl", "isPlaying", "changeCurrentTime"])
  },
  watch: {
    isPlaying(newVal) {
      newVal ? this.play() : this.pause()
    },
    changeCurrentTime(newVal) {
      this.$refs.myAudio.currentTime = newVal
    }
  },
  methods: {
    setTimer(){
      const vm = this
      vm.timer = setInterval(() => {
        vm.$store.dispatch("setCurrentTime", vm.$refs.myAudio.currentTime)
      }, 500)
    },
    clearTimer() {
      const vm = this
      clearInterval(vm.timer)
    },
    handleEnd() {
      const vm = this
      vm.$store.dispatch("setCurrentTime", vm.$refs.myAudio.currentTime)
      vm.$store.dispatch("setPlayState", false)
			vm.$store.dispatch("nextMusic")
    },
    refreshDuration() {
      this.$store.dispatch("setTotalTime", this.$refs.myAudio.duration)
      this.setTimer()
    },
    play() { // 播放（点击暂停后点击的播放）
      this.$refs.myAudio.play()
      this.setTimer()
    },
    pause() { // 暂停
      this.$refs.myAudio.pause()
      this.clearTimer()
    }
  }
}
</script>
