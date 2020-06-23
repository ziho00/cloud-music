<template>
	<transition name="show">
		<div v-show="showDiskView" class="disk-view">
			<div class="height-10vh"></div>
			<div class="disk">
				<img v-if="musicUrl" :src="musicUrl" alt="歌曲图片">
				<img v-else src="http://s3.music.126.net/mobile-new/img/disc_default.png" alt="歌曲图片">
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
    showDiskView: {
      type: Boolean,
      default: true
    },
    musicUrl: {
      type: String
    }
  }
}
</script>

<style scoped>
.height-10vh{
	height: 10vh
}
.disk{
	position: relative;
	height: 45vh;
}
.disk>img{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	width: 35vh;
	height: 35vh;
	border-radius: 50%;
}
</style>