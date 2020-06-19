<template>
	<div class="playall">
		<div class="playall-item" @click="playAll">
			<div class="playall-icon" >
				<i class="iconfont icon-bofang2"></i>
			</div>
			播放全部
			<span>( 共{{songs.length}}首 )</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		songs: {
			type: Array
		}
	},
	methods: {
		playAll() {
			this.$store.dispatch("playMusic", this.songs[0].id)
      this.$store.dispatch("setCurrentIndex", 0)
      this.$store.dispatch("setPlayList", this.songs)
		}
	}
}
</script>

<style scoped>
.playall{
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