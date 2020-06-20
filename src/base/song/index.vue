<template>
	<div class="song" @click="playSong">
		<div class="isPlaying" v-if="activeId === song.id">
			<i class="iconfont icon-yinlianglabashengyin-xianxing"></i>
		</div>
		<div class="song-info" :class="{'pd':activeId !== song.id }">
			<div class="song-info-name ellsips" :class="{'active': activeId === song.id}">{{song.name}}</div>
			<div class="song-info-album ellsips">{{song.artists}} - {{song.album}}</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      default: null
    },
    index: {
      type: Number
    },
    activeId: {
      type: [Number, String]
    }
  },
  methods: {
    playSong(){
      this.$emit("play", this.song, this.index)
    }
  }
}
</script>

<style scoped>
.song{
	padding: 10px 0;
	display: flex;
	width: 100%;
	border-bottom: 1px solid var(--border-color);
}
.isPlaying{
	width: 80px;
	line-height: 80px;
	text-align: center;
	font-size: var(--info-size);
	color: var(--desc-color);
}
.isPlaying>i{
	color: var(--color-red);
	font-size: 1.1rem;
}

.pd {
	padding-left: 20px;
}
.song-info{
	width: calc(100% - 120px);
}
.song-info-name{
	color: var(--info-color);
	font-size: var(--name-size);
	line-height: 50px;
}
.active{
	color: var(--color-red);
}
.song-info-album{
	line-height: 30px;
	font-size: var(--desc-size);
	color: var(--desc-color);
}
</style>
