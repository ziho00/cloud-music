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
export default {
  data() {
    return {
      timer: null,
    }
  },
  computed: {
    ...Vuex.mapState(["musicInfo", "musicUrl", "isPlaying", "changeCurrentTime"])
  },
  watch: {
    isPlaying(newVal) {
      newVal ? this.play() : this.pause()
    },
    changeCurrentTime(newVal) {
      this.$refs.myAudio.currentTime = newVal
    }
  },
  mounted(){
    this.$refs.myAudio._play = this.$refs.myAudio.play
    this.$refs.myAudio._load = this.$refs.myAudio.load
    this.$refs.myAudio.play = function() {
      this._lockLoad = true
      this._play()
    }
    this.$refs.myAudio.load = function() {
      this._lockLoad || this._load()
    }
  },
  methods: {
    setTimer(){
      const vm = this
      vm.timer = setInterval(() => {
        vm.$store.dispatch("setCurrentTime", vm.$refs.myAudio.currentTime)
      }, 300)
    },
    clearTimer() {
      const vm = this
      clearInterval(vm.timer)
    },
    handleEnd() {
      const vm = this
      vm.$store.dispatch("setCurrentTime", vm.$refs.myAudio.currentTime)
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
