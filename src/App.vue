<template>
	<div id="app">
		<Audio></Audio>
		<MusicIcon></MusicIcon>
		<keep-alive>
			<router-view class="Router"></router-view>
		</keep-alive>
	</div>
</template>

<script>
import MusicIcon from './components/music-icon'
import Audio from './base/I-Audio'
export default {
	components: {
		MusicIcon,
		Audio
	}
}
</script>

<style  scoped>

</style>
