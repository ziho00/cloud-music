<template>
	<div v-if="playlist">
		<Header :color="'#fff'">
			<div class="title ellsips" slot="middle">
				{{playlist.name}}
			</div>
		</Header>
		<Scroll ref="scroll">
			<div class="playlist-info">
				<div class="playlist-img">
					<img :src="playlist.coverImgUrl" alt="歌单图片">
					<div class="playlist-playCount">
						<i class="iconfont icon-bofang4"></i>{{playlist.playCount}}
					</div>
				</div>
				<div class="playlist-dec">
					<div class="playlist-dec-title ellsips-line2">
						{{playlist.name}}
					</div>
					<div class="update-time">
						最近更新: {{playlist.updateTime}}
					</div>
					<div class="playlist-creator ellsips">
						<img :src="creator.avatarUrl" alt="头像">
						<span>{{creator.nickname}}</span>
					</div>
					<div class="playlist-sign">
						<div class="playlist-sign-value ellsips">{{creator.signature}}</div>
						<div class="playlist-sign-icon">
							<i class="iconfont icon-youjiantoubeifen"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="playlist-content">
				<PlayAllItem :songs="songs"></PlayAllItem>
				<SongItem v-for="(song, index) in songs" :index="index" :key="song.id" :song="song" :playingMusicId="musicInfo.id" @play="handlePlay"></SongItem>
			</div>
		</Scroll>
		<!-- 毛玻璃效果 -->
		<FrostedGlass :imgUrl="playlist.coverImgUrl"></FrostedGlass>
	</div>
</template>

<script>
import {
  getSongsList
} from '@/api/songList'
import {
	PlayList
} from '@/common/class'
import Header from '@/components/header'
import Scroll from '@/components/scroll'
import SongItem from '@/base/song-playlist'
import PlayAllItem from '@/base/playall-item'
import FrostedGlass from '@/components/frosted-glass'
export default {
	components: {
		Header,
		Scroll,
		SongItem,
		PlayAllItem,
		FrostedGlass
	},
	data() {
		return {
			songs: [],
			creator: {},
			inited: false,
			playlist: null,
		}
	},
	computed:{
		...Vuex.mapState(['musicInfo'])
	},
	created() {
		this.getData()
	},
	activated() {
		if(this.inited) {
			this.getData()
		}
	},
	methods: {
		async getData() {
			const { id } = this.$route.params
			this.inited = true
			this.$loading.show({
        message: '加载中...',
        banClick: true
      })
			try {
				const res = await getSongsList({id})
				this.playlist = new PlayList(res.playlist)
				this.songs = this.playlist.songs
				this.creator = this.playlist.creator
				this.$refs.scroll && this.$refs.scroll.refresh()
			} catch(err) {
				console.log(err)
			}
			this.$loading.hide()
		},
		handlePlay(song, index) {
			this.$store.dispatch('playMusic', song.id)
      this.$store.dispatch('setCurrentIndex', index)
      this.$store.dispatch('setPlayList', this.songs)
		}
	}
}
</script>

<style scoped>
Header{
	position: fixed;
	z-index: 10;
	top: 0;
}
.title{
	line-height: var(--header-height);
	text-align: center;
}
.playlist-info{
	position: relative;
	display: flex;
	width: 100%;
}
.playlist-img{
	position: relative;
	width: 40vw;
	height: 360px;
}
.playlist-img>img{
	width: 240px;
	height: 240px;
	margin: 60px 30px;
	border-radius: 10px;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}
.playlist-playCount{
	position: absolute;
	top: 60px;
	right: 40px;
	line-height: 48px;
	color: var(--color-gray);
	font-size: var(--info-size);
}
.playlist-playCount>i{
	margin-right: 4px;
	font-size: .9rem;
}
.playlist-dec{
	width: 60vw;
	height: 240px;
	margin: 60px 20px;
}
.playlist-dec-title{
	line-height: 40px;
	font-size: var(--name-size);
	color: var(--color-white);
}
.update-time{
	line-height: 60px;
	font-size: var(--info-size);
	color: var(--color-gray);
}
.playlist-creator{
	display: flex;
	height: 60px;
	line-height: 60px;
}
.playlist-creator>img{
	height: 48px;
	width: 48px;
	margin: 6px 12px 6px 0;
	border-radius: 50%;
}
.playlist-creator>span{
	display: inline-block;
	width: calc(100%-70px);
	font-size: var(--info-size);
	color: var(--color-gray);
}
.playlist-sign{
	display: flex;
	height: 56px;
}
.playlist-sign-value{
	width: 350px;
	height: 56px;
	line-height: 56px;
	font-size: var(--info-size);
	color: var(--color-gray);
}
.playlist-sign-icon{
	height: 56px;
	width: 50px;
	line-height: 56px;
	text-align: center;
}
.playlist-sign-icon>i{
	font-size: var(--info-size);
	color: var(--color-gray);
}
/*  */
.playlist-content{
	position: relative;
	width: 100vw;
	background: var(--color-white);
}
/* 播放全部 */
.playall{
	position: sticky;
	top: 100px;
	width: 100vw;
}
.playall-item{
	display: flex;
	line-height: 90px;
	color: var(--title-color);
	font-size: var(--name-size);
}
.playall-icon{
	margin-top: 5px;
	line-height: 80px;
	width: 80px;
	text-align: center;
}
.playall-icon>i{
	font-size: 1.2rem;
}
.playall-item>span{
	color: var(--desc-color);
	font-size: var(--info-size);
}
</style>