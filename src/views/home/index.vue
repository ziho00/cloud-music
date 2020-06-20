<template>
	<div>
		<!-- 轮播 -->
		<Swapper v-if="banners.length > 0" class="swapper">
			<div class="swapper-list" v-for="item in banners" :key="item.id">
				<img :src="item.imageUrl" alt="轮播图">
			</div>
		</Swapper>
		<!-- 音乐排行榜 -->
		<LeaderBoard></LeaderBoard>
		<!-- 推荐歌单 -->
		<RecommendPlaylist></RecommendPlaylist>
	</div>
</template>

<script>
import {
	getBanner
}  from '@/api/home'
import Swapper from '@/components/swapper'
import LeaderBoard from './leader-board'
import RecommendPlaylist from './recommend-playlist'
export default {
	components: {
		Swapper,
		LeaderBoard,
		RecommendPlaylist,
	},
	data() {
		return {
			banners: []
		}
	},
	created(){
		this.getData()
	},
	methods: {
		async getData() {
			try {
				const res = await getBanner()
				this.banners = res.banners
			} catch(err) {
				console.log(err)
			}
		}
	}
}
</script>

<style scoped>
.swapper{
	overflow: hidden;
	padding: 20px 0;
}
.swapper-list{
	width: calc(100vw - 40px);
	margin: 0 20px;
}
.swapper-list>img {
	width: calc(100vw - 40px);
	border-radius: 12px;	
	height: auto;
}
</style>
