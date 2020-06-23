<template>
	<transition name="show">
		<div v-if="visiable" class="toast">
			<div v-if="iconfont[icon]" class="toast-icon">
				<i :class="`iconfont ${iconfont[icon]}`" ></i>
			</div>
			<div class="toast-text">
				{{msg}}
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
    return {
      iconfont: {
        success: "icon-icon-test23",
        warning: "icon-icon-test32",
        error: "icon-icon-test24"
      },
      visiable: false,
      msg: "",
      icon: ""
    }
  },
}
</script>

<style scoped>
.toast {
	position: fixed;
  z-index: 110;
  top: 50%;
  left: 50%;
  width: 200px;
  padding: 20px 0;
  color: var(--color-gray);
  font-size: var(--desc-size);
  text-align: center;
  background: rgba(0, 0 , 0, .7);
  border-radius: 10px;
  transform: translate(-50%, -50%);
}
.toast-icon{
  margin: 0 auto 15px auto;
  width: 140px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.toast-icon>i{
  color: rgba(255, 255, 255, 0.8);
  font-size: 3.5rem;
}
.toast-text{
  margin: 0 15px;
  line-height: 1rem;
  font-size: var(--desc-size);
}
</style>