<template>
	<div>
		<div class="banclick-mask" v-if="banClick && visiable" ></div>
		<transition name="show">
			<div v-if="visiable" class="loading">
				<div class="loading-icon">
					<img src="../../../public/img/svg-loaders/bars.svg"  alt="">
				</div>
				<div class="loading-text">
				{{msg}}
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data(){
		return{
			visiable: false,
      msg: "",
      banClick: true
		}
	}
}
</script>

<style scoped>
.loading{
	position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;

  width: 200px;
  padding-bottom: 20px;

  color: var(--color-gray);
  font-size: var(--info-size);
  text-align: center;
  background: rgba(0, 0 , 0, .5);

  border-radius: 10px;
  transform: translate(-50%, -50%);
}
.loading-icon{
	margin: 15px auto;
	width: 140px;
	height: 110px;
	text-align: center;
}
.loading-icon>img{
	margin-top: 20px;
	width: 80px;
}
.loading-text{
	line-height: 1rem;
	font-size: var(--desc-size);
}
</style>