<template>
	<header :style="{color, background}">
		<div class="back-icon pointer" @click="back" >
			<i class="iconfont icon-icon-test39"></i>
		</div>
		<div class="middle">
			<slot name="middle">

			</slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</header>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#303133'
		},
		background: {
			type: String,
			default: 'transparent'
		}
	},
	methods: {
		back(){
			this.$router.back()
		}
	}
}
</script>

<style scoped>
header {
	display: flex;
	width: 100vw;
	height: var(--header-height);
}
header::after{
	content: '';
	clear: both;
}
.back-icon{
	width: var(--header-height);
	line-height: var(--header-height);
	text-align: center;
}
.back-icon>i{
	font-size: 1.8rem;
}
.middle {
	width: calc(100vw - 200px);
}
.right{
	width: var(--header-height);
	line-height: var(--header-height);
	text-align: center;
}
</style>