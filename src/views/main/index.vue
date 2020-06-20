<template>
	<div>
		<Header @clickUserNav="showUserBar"  @handleKeywordsChange="changeKeywords"></Header>
		<Scroll :probeType="1" :hasLazyItem="true" :wrapperBackground="'#D32F2F'" :contentBackground="'#fff'">
			<router-view :keywords="keywords"></router-view>
		</Scroll>
		<UserItem ref="userBar"></UserItem>
	</div>
</template>

<script>
import Header from './header'
import Scroll from '@/components/scroll'
import UserItem from './user'
export default {
	components: {
		UserItem,
		Scroll,
		Header
	},
	data(){
		return {
			keywords: ''
		}
	},
	methods: {
		showUserBar() {
      this.$refs.userBar.show = true
    },
		changeKeywords(val) {
			this.keywords = val
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
