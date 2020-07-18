<template>
	<div class="list" @click="toPlayList">
		<ImgLazy :url="playList.picUrl"></ImgLazy>
		<div class="list-info">
			<div class="list-info-name ellsips">{{playList.name}}</div>
			<div class="list-info-desc ellsips">{{playList.trackCount}} 首音乐 by {{playList.creator}}，播放{{playList.playCount}}次</div>
		</div>
	</div>
</template>

<script>
import ImgLazy from '../img-lazy'
export default {
	components: {
		ImgLazy
	},
  props: {
    playList: {
      type: Object
    }
  },
  methods: {
    toPlayList(){
      this.$emit('click', this.playList.id)
    }
  }
}
</script>

<style scoped>
.list {
	display: flex;
	width: 100%;
	padding: 10px 0;
}
.list>img{
	width: 120px;
	height: 120px;
	border-radius: 8px;
}
.list-info{
	margin: 25px 15px;
	width: calc(100% - 200px);
}
.list-info-name{
	line-height: 50px;
	color: var(--info-color);
	font-size: var(--name-size);
}
.list-info-desc{
	line-height: 40px;
	font-size: var(--desc-size);
	color: var(--desc-color);
}
</style>
