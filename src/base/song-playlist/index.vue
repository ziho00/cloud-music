<template>
	<div class="song" @click="play">
		<div class="song-index">
			<i v-show="playingMusicId === song.id" class="iconfont icon-yinliang1"></i>
			<span v-show="playingMusicId !== song.id">{{index + 1}}</span>
		</div>
		<div class="song-info">
			<div class="song-name ellsips" :class="{'active': playingMusicId === song.id}">{{song.name}}</div>
			<div class="song-dec ellsips">{{song.artists}} - {{song.album.name}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		playingMusicId: {
			type: [Number, String],
			default: 0
		},
		index: {
			type: [Number, String],
			default: 0
		},
		song: {
			type: Object,
			default: null
		}
	},
	methods: {
		play(){
			this.$emit('play', this.song, this.index)
		}
	}
}
</script>

<style scoped>
.song {
	display: flex;
	width: 100vw;
	padding: 10px 0;
}
.song-index{
	width: 80px;
	line-height: 80px;
	text-align: center;
	font-size: var(--info-size);
	color: var(--desc-color);
}
.song-index>i{
	color: var(--color-red);
	font-size: var(--name-size);
}
.song-info{
	width: calc(100vw - 80px);
}
.song-name{
	width: 100%;
	line-height: 45px;
	font-size: var(--name-size);
	color: var(--info-color);
}
.song-dec{
	width: 100%;
	line-height: 35px;
	font-size: var(--desc-size);
	color: var(--desc-color);
}
.active{
	color: var(--color-red);
}
</style>