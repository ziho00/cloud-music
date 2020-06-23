<template>
	<div class="singer-detail">
		<Header :color="'var(--color-white)'">
			<div v-if="singer" slot="middle" class="title">{{singer.name}}</div>
		</Header>
		<div class="singer-img" v-if="singer"  :style="{background: `url(${singer.picUrl}) 0 0 / cover`, transform: `scale(${scale})`}">
			<div class="filter-mask"></div>
		</div>
		<Scroll ref="scroll" :probeType="3" @scroll="scroll" @scrollEnd="scroll">
			<div class="util-div"></div>
			<div class="content">
				<PlayAllItem :songs="songs"></PlayAllItem>
				<SongItem	ongItem v-for="(item, index) in songs" :activeId="musicInfo.id" :key="item.id" :index="index" :song="item" @play="handlePlay"></SongItem>
			</div>
		</Scroll>
	</div>
</template>

<script>
import {
  Song
} from "@/common/class"
import {
  getSingerSongs
} from "@/api/singer"
import {
  classCreator,
  throttle
} from "@utils"
import Scroll from "@/components/scroll"
import SongItem from "@/base/song"
import Header from '@/components/header'
import PlayAllItem from '@/base/playall-item'
export default {
  components: {
		Scroll,
		Header,
		SongItem,
		PlayAllItem
  },
  data() {
    return {
      singer: null,
      songs: [],
      scale: 1,
      inited: false
    }
  },
  computed: {
    ...Vuex.mapState(["musicInfo"])
  },
  created() {
    this.getData()
  },
  activated() {
    if (this.inited) {
      this.getData()
    }
  },
  mounted() {
    this.changeScale = throttle((args) => {
      this.scale = args && args[0] || this.scale
    }, 50)
  },
  methods: {
    async getData() {
      const { id } = this.$route.params
      try {
        this.$loading.show({
          message: "加载中...",
          banClick: true
        })
        const songsRes = await getSingerSongs({id})
				this.singer = songsRes.artist
				this.songs = classCreator(songsRes.hotSongs, Song)
				this.$refs.scroll.refresh()
      } catch (err) {
        console.log(err)
      }
      this.$loading.hide()
      this.inited = true
    },
    back() {
      this.$router.back()
    },
    scroll(params){
			if(!params || params.y <= 0){
				this.changeScale(1)
			} else {
        this.changeScale(1 + params.y / 300)
      }
    },
    handlePlay(song, index) {
      this.$store.dispatch("playMusic", song.id)
      this.$store.dispatch("setCurrentIndex", index)
      this.$store.dispatch("setPlayList", this.songs)
    },
    playAll() {
      this.handlePlay(this.songs[0], 0)
    }
  }
}
</script>

<style  scoped>
Header {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	display: flex;
	width: 100%;
	height: var(--header-height);
	font-size: var(--title-size);
	color: var(--color-white);
}
.title {
	width: 550px;
	line-height: 100px;
	text-align: center;
}
.singer-img {
	position: relative;
	z-index: -100;
	height: 0;
	padding-top: 75%;
	width: 100%;
	transform-origin: center top;
	transition: transform .1s;
  will-change: transform;
}
.filter-mask {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, .2);
}
.util-div {
	width: 100%;
	height: 1px;
	padding-top: 13.5rem;
}
.content{
	background: var(--color-white);
}
</style>
