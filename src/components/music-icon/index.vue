<template>
	<div v-show="showMusicIcon" @click="toPlayView" class="play-music">
		<svg x="0px" y="0px" viewBox="0 0 100 100">
			<circle class=""
							stroke="rgba(255, 255, 255, .2)"
							fill="none"
							:stroke-width="2"
							cx="50" cy="50" r="40" />
      <defs>
        <pattern id="raduisImage"  patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image class="circling" :xlink:href="musicInfo.album ? musicInfo.album.picUrl : img" x="0" y="0" width="100%" height="100%" />
        </pattern>
      </defs>
      <circle transform="rotate(90 50 50)" cx="50" cy="50" r="35" fill="url(#raduisImage)">
        <animateTransform v-if="isPlaying"  attributeType="XML" attributeName="transform" begin="0s" dur="20s" type="rotate" from="90 50 50" to="450 50 50" repeatCount="indefinite" />
      </circle>
			<circle ref="path" class="path"
							stroke="#fff"
							fill="none"
							:stroke-width="2"
							cx="50" cy="50" r="40" />
		</svg>
	</div>	
</template>

<script>
export default {
	data(){
		return {
			len: 0,
			roate: 0,
			showMusicIcon: true,
			img: 'http://s3.music.126.net/mobile-new/img/disc_default.png',
		}
	},
	computed: {
		...Vuex.mapState(['musicInfo', 'currentTime', 'totalTime', 'isPlaying'])
	}, 
	watch: {
		'$route'(to){
			if (to.meta.showMusicIcon) {
        this.showMusicIcon = true
      } else {
        this.showMusicIcon = false
      }
		},
		currentTime(newValue) {
      const circle = this.$refs.path
      const {len, totalTime} = this
      circle.style.strokeDashoffset = (1 - (newValue / totalTime)) * len
    }
	},
	mounted() {
    this.initProgressBar()
  },
	methods: {
		initProgressBar(){
      const {value, total} = this
      let circle = this.$refs.path
        , len = 2 * Math.PI * circle.getAttribute('r')
      this.len = len
      circle.style.strokeDasharray = len
      circle.style.strokeDashoffset = len
      circle.style.transition = 'stroke-dashoffset .3s ease-in-out'
      circle.style.strokeDashoffset = (1 - (value / total)) * len
    },
    changeProgressBar(newValue, total){
      let {len} = this
      let circle = this.$refs.path
      let value = len - (newValue / total) * len
      circle.style.strokeDashoffset = value
    },
    toPlayView() {
      const vm = this
      vm.$router.push('/play')
    }
	}
}
</script>

<style scoped>
.play-music{
	overflow: hidden;
	position: fixed;
	z-index: 100;
	right: 0;

	width: 100px;
	height: 100px;
}
svg{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	width: 70px;
	height: 70px;
	box-sizing: border-box;

	transform: rotate(-90deg);
}

</style>