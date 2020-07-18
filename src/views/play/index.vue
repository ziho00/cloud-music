<template>
	<div>
		<Header :color="'#fff'">
			<div v-if="musicInfo" class="ellsips" slot="middle">
				<div class="header-name">
					{{musicInfo.name}}
				</div>
				<div class="header-artist">
					{{musicInfo.artists}}
				</div>
			</div>
		</Header>
		<div class="content" @click="showDiskView = !showDiskView">
			<!-- disk view -->
			<DiskView :showDiskView="showDiskView" :musicUrl="musicInfo.album && musicInfo.album.picUrl || ''"></DiskView>
			<!-- lyric view -->
			<LyricView :showLyricView="!showDiskView" :lyrics="lyrics" :currentTime="currentTime"></LyricView>
		</div>
		<!-- progress bar -->
		<ProgressBar :curTime_m_s="curTime_m_s" :currentTime="currentTime" :totalTime_m_s="totalTime_m_s" :totalTime="totalTime"></ProgressBar>
		<!-- controller icon / footer -->
		<div class="controller">
			<div class="controller-mode pointer" @click="changeMode">
				<i v-show="playMode === 0" class="iconfont icon-renwu_xh"></i>
				<i v-show="playMode === 1" class="iconfont icon-danquxunhuan"></i>
				<i v-show="playMode === 2" class="iconfont icon-suijibofang"></i>
			</div>
			<div class="controller-change-music pointer" @click="PlayPreSong">
				<i class="iconfont icon-kuaitui"></i>
			</div>
			<div class="controller-change-state pointer" @click="togglePlay">
				<i v-show="!isPlaying" class="iconfont icon-bofang2"></i>
				<i v-show="isPlaying" class="iconfont icon-zanting3"></i>
			</div>
			<div class="controller-change-music pointer" @click="PlayNextSong">
				<i class="iconfont icon-kuaijin"></i>
			</div>
			<div class="controller-show-list pointer" @click="showPlayList = true">
				<i class="iconfont icon-xuanxiang"></i>
			</div>
		</div>
		<!-- playlist -->
		<PlayListView :visiable="showPlayList" :playList="playList" :musicInfo="musicInfo" @hide="handleHidePlaylist"></PlayListView>
		<FrostedGlass :imgUrl="musicInfo.album && musicInfo.album.picUrl"></FrostedGlass>
	</div>
</template>

<script>
import DiskView from "./disk-view"
import LyricView from "./lyric-view"
import Header from "@/components/header"
import PlayListView from "./playlist-view"
import ProgressBar from "./progress-bar"
import FrostedGlass from "@/components/frosted-glass"
export default {
	components: {
		Header,
		DiskView,
		LyricView,
		ProgressBar,
		FrostedGlass,
		PlayListView,
	},
	data(){
		return {
			playMode: 0,
      modes: ["列表循环", "单曲循环", "随机播放"],
      showPlayList: false,
      showDiskView: true
		}
	},
	computed: {
    ...Vuex.mapState(["musicInfo", "currentIndex", "currentTime", "totalTime", "lyrics", "isPlaying", "playList"]),
    ...Vuex.mapGetters(["curTime_m_s", "totalTime_m_s"])
  },
	methods: {
		changeMode() {
			if (this.playMode === 2) {
				this.playMode = 0
			} else {
				this.playMode++
			}
			this.$toast({
				msg: this.modes[this.playMode]
			}, 2000)
      this.$store.dispatch("setPlayMode", this.playMode)
		},
		handleHidePlaylist(){
			this.showPlayList = false
		},
		PlayPreSong(){
			const {playList, currentIndex} = this
			if (playList.length === 0) {
        this.$toast({
				msg: "请选择播放的歌曲",
				icon: "error"
			}, 2000)
        return
			}
      let nextIndex = 0
      if (currentIndex === 0) {
        nextIndex = playList.length - 1
      } else {
        nextIndex = currentIndex - 1
			}
			this.$store.dispatch("playMusic", playList[nextIndex].id)
			this.$store.dispatch("setCurrentIndex", nextIndex)
		},
		PlayNextSong() {
			const {playList} = this
			if (playList.length === 0) {
        this.$toast({
				msg: "请选择播放的歌曲",
				icon: "error"
			}, 2000)
        return
			}
			this.$store.dispatch("nextMusic")
		},
		togglePlay() {
			const {playList} = this
			if (playList.length === 0) {
        this.$toast({
				msg: "请选择播放的歌曲",
				icon: "error"
			}, 2000)
        return
			}
			this.$store.dispatch("setPlayState", !this.isPlaying)
		},

	}
}
</script>

<style scoped>
.header-name{
	line-height: 60px;
	text-align: center;
	font-size: var(--title-size);
}
.header-artist{
	line-height: 40px;
	color: var(--color-gray);
	font-size: var(--info-size);
	text-align: center;
}
/* 主要内容 */
.content{
	height: calc(100vh - 400px);
	width: 100vw;

}

/* 底部控制栏 */
.controller{
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 150px;
	color: var(--color-white);
}
.controller-mode{
	width: 100px;
	margin: 25px 0 25px 50px;
	line-height: 100px;
	text-align: center;
	cursor: pointer;
}
.controller-mode>i{
	font-size: 1.3rem;
}
.controller-change-music{
	width: 150px;
	line-height: 150px;
	text-align: center;
}
.controller-change-music>i{
	font-size: var(--title-size);
}
.controller-change-state{
	width: 150px;
	text-align: center;
	line-height: 150px;
}
.controller-change-state>i{
	font-size: 3rem;
}
.controller-show-list{
	width: 100px;
	margin: 25px 50px 25px 0;
	line-height: 100px;
	text-align: center;
}
.controller-show-list>i{
	font-size: var(--name-size);
}
</style>