<template>
  <div class="frosted-glass">
    <div class="background">
      <img v-if="imgUrl" :src="imgUrl" width="120%" height="120%" alt="背景图片">
    </div>
    <div class="gray"></div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.frosted-glass{
	position: fixed;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	z-index: -1;
	background: rgb(242, 243, 244);
}
.background{
  position: absolute;
  margin: -10vh -10vw;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: -3;
  opacity: 0.6;
  filter: blur(30px);
}
.gray{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -2;
  opacity: 0.6;
  filter: blur(30px);
  filter: none;
  background: rgba(45, 45, 45, .2);
}
</style>
