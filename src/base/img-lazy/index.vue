<template>
	<img :class="`lazy ${className}`" :src="defaultImg" :data-src="url" :data-srcset="`${url} 1x `" alt="图片">
</template>

<script>
export default {
	props: {
		url: {
			type: String
		},
		defaultImg: {
			type: String,
			default: 'http://s3.music.126.net/mobile-new/img/disc_default.png'
		},
		className: {
			type: String,
			default: ''
		}
	}
}
</script>

<style>

</style>