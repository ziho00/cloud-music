<template>
	<transition name="show">
    <div v-if="visiable">
      <div class="confirm">
        <div v-show="title" class="confirm-title">
          {{title}}
        </div>
        <div v-show="title && msg" class="confirm-message-hasTitle">
          {{msg}}
        </div>
        <div v-show="!title" class="confirm-message">
          {{msg}}
        </div>
        <div class="confirm-footer">
          <button @click="cancle" >取消</button>
          <button @click="confirm" class="confirm-footer__okey">确定</button>
        </div>
      </div>
      <div class="mask"></div>
    </div>
  </transition>
</template>

<script>
export default {
	data(){
    return {
      title: '',
      msg: '',
      visiable: false
    }
	},
	methods: {
    clear(){
      this.visiable = false
      this.title = ''
      this.msg = ''
      this.cb(this)
    },
		cancle(){
      this.clear()
      this.reject()
    },
    confirm() {
      this.clear()
      this.resolve()
    },
    isConfirm(cb){
      this.cb = cb
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    }
	}
}
</script>

<style scoped>
.confirm {
	position: fixed;
  z-index: 120;
  overflow: hidden;
  top: 50%;
  left: 50%;
  width: 80vw;
  background: var(--color-white);

  border-radius: 30px;
  transform: translate(-50%, -50%);
}
.confirm-title {
	padding-top: 30px;
	font-weight: 500;
	line-height: 50px;
	text-align: center;
	color: var(--title-color);
	font-size: var(--title-size);
}
.confirm-message {
	max-height: 60vh;
	padding: 1.8rem 1.4rem;
	overflow-y: auto;
	color: var(--info-color);
	font-size: var(--info-size);
	line-height: 1.2rem;
	text-align: center;
}
.confirm-message-hasTitle{
	max-height: 60vh;
	padding: 0.8rem 1.4rem 1.4rem 1.4rem;
	overflow-y: auto;
	color: var(--info-color);
	font-size: var(--info-size);
	line-height: 1.2rem;
	text-align: center;
}
.confirm-footer{
	display: flex;
	border-top: 1px solid var(--border-color);
}
.confirm-footer>button{
	width: 50%;
	height: 100px;
	line-height: 100px;
	text-align: center;
	background: var(--color-white);
	color: var(--title-color);
	font-size: var(--title-size);
}
button:hover {
	background: rgba(0, 0, 0, 0.1);
}
.confirm-footer__okey{
	border-left: 1px solid var(--border-color);
	color: var(--color-red) !important;
	font-weight: 600;
}
</style>