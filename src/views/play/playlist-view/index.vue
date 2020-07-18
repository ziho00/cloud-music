<template>
  <div>
    <div ref="playList" class="play-list">
      <header>
        <span class="text">当前播放</span>
        <span class="songs-counter"> ({{playList.length}})</span>
      </header>
      <Scroll ref="scroll" class="scroll">
        <div class="song-item" v-for="(song, index) in playList" :key="song.id" @click="handlePlay(song, index)">
          <div class="songs-item__info ellsips" :style="musicInfo.id === song.id ? 'color: red;' : ''">
            <i v-show="musicInfo.id === song.id" class="iconfont icon-yinlianglabashengyin-xianxing"></i>
            {{song.name}}
            <span class="author"> - {{song.artists}}</span>
          </div>
          <!-- <div class="songs-item__del">
            <i class="iconfont icon-guanbibeifen"></i>
          </div> -->
        </div>
      </Scroll>
      <footer @click="hide">
        关闭
      </footer>
    </div>
    <transition name="show">
      <div v-show="visiable" class="mask" @click="hide"></div>
    </transition>
  </div>
</template>

<script>
import Scroll from '@/components/scroll'
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    playList: {
      type: Array,
      default: null
    },
    musicInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    Scroll
  },
  data() {
    return {
			songsCount: 100,
			inited: false
    }
	},
	mounted(){
		this.inited = true
	},
  watch: {
    visiable(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.playList.style.transform = 'translateY(0vh)'
        })
      } else {
        this.$nextTick(() => {
          this.$refs.playList.style.transform = 'translateY(65vh)'
        })
      }
    },
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    handlePlay(song, index) {
			this.$store.dispatch('playMusic', song.id)
			this.$store.dispatch('setCurrentIndex', index)
    }
  }
}
</script>

<style scoped>
.play-list{
  position: fixed;
  z-index: 101;
  left: 0;
  right: 0;
  bottom: 0;
  height: 65vh;
  background-color: var(--color-white);

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  will-change: transform;
  transform: translateY(65vh);
  transition: transform .3s ease;
}

header{
	margin-top: 20px;
	padding: 0 20px;
}
.text{
	color: var(--info-color);
	font-size: var(--name-size);
}
.songs-counter{
	color: var(--desc-color);
	font-size: var(--info-size);
}
footer{
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	color: var(--title-color);
	text-align: center;
	line-height: var(--header-height);
	border-top: 1px solid var(--border-color);
}
.scroll{
  height: calc(65vh - 200px);
}
.song-item{
  position: relative;
  display: flex;
  margin: 0 20px;
  line-height: 80px;
  border-bottom: 1px solid var(--border-color);
}
.songs-item__info{
    overflow: hidden;
    width: calc(100vw - 120px);
    font-size: var(--info-size);
    color: var(--info-color);
}
.songs-item__info>i{
	font-size: var(--name-size);
}
.author{
	font-size: var(--desc-size);
	color: var(--desc-color);
}
.songs-item__del{
	width: 80px;
	line-height: 80px;
	text-align: center;
}
.songs-item__del>i{
	font-size: var(--info-size);
	color: var(--desc-color);
}

.active-item{
  color: var(--color-red);
}

</style>
