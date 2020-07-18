<template>
	<div class="login">
		<div class="logo_animation">
			<img class="login__logo" src="http://116.62.70.150/static/image/logo.png" alt="appLogo">
			<div class="wave wave0 border-1px"></div>
			<div class="wave wave1 border-1px"></div>
			<div class="wave wave2 border-1px"></div>
		</div>
		<div class="login__form">
			<input class="form__input form__input-phone" :class="{ 'form__input-active' : isActive === 1 }"
				@focus="isActive = 1" @blur="inputBlur" v-model="phone" type="text" maxlength="11" placeholder="输入手机号">
			<input class="form__input form__input-password" :class="{ 'form__input-active' : isActive === 2 }"  
				@focus="isActive = 2" @blur="inputBlur"   v-model="pwd" type="text" placeholder="输入密码">
			<button  :class="disabled?'form__btn__disabled':'form__btn'" @click="submitLoginForm" :disabled="disabled">登录</button>
			<div class="youke-login pointer" @click="anonymousLogin" >
				游客登录 <i class="iconfont icon-icon-test50"></i>
			</div>
		</div>
		<div class="copyright">
			&copy;2020 cloud-music Powered by zihao
		</div>
	</div>
</template>

<script>
import {
	iOS_ScrollTop
} from "@utils"
export default {
  data(){
    return {
      phone: "",
      pwd: "",
      isActive: 0
    }
  },
  computed: {
    disabled(){
      const {phone, pwd} = this
      return (phone.trim() === "" || pwd.trim() === "")
    }
  },
  methods: {
    submitLoginForm(){
      const vm = this
      const {phone, pwd} = vm
      const phoneReg = /^1\d{10}$/
      if (!phoneReg.test(phone)) {
        vm.$toast({
          message: "请输入正确的手机号码!",
          icon: "error"
        })
        return void 0
      }
      if (pwd.trim() === "") {
        vm.$toast({
          message: "请输入正确的密码!",
          icon: "error"
        })
        return void 0
      }
      this.$store.dispatch("handleLogin", {phone, password: pwd})
        .then(() => {
					this.$store.dispatch("setAnonymous", false)
          vm.$router.replace("/main")
        })
    },
    inputBlur(){
      this.isActive = 0
      iOS_ScrollTop()
		},
		anonymousLogin() {
			this.$store.dispatch("setAnonymous", true)
			this.$router.replace("/main")
		}
  }
}
</script>

<style lang="scss" scoped>
input,
button {
	border: transparent;
	outline: none;
}
.login {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	overflow: hidden;
	width: 100%;

	background: rgba(0, 0, 0, .8);
	box-sizing: border-box;
}
.logo_animation {
	position: relative;
	margin: 200px auto 0 auto;
	border-radius: 50%;
	width: 160px;
	height: 160px;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, .2);
	background: var(--color-white);
}
.login__logo {
	position: absolute;
	overflow: hidden;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2;

	width: 100px;
	height: 100px;
	margin: auto;
	border-radius: 50%;
}
.wave {
	position: absolute;
	box-sizing: border-box;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;

	margin: auto;
	width: 160px;
	height: 160px;
	border-radius: 50%;

	box-shadow: 0 0 8px 0 rgba(0,0,0,0.4);
	will-change: transform, opacity;
}
.wave0 {
	animation: wave 10s linear infinite 0s;
}
.wave1 {
	animation: wave 10s linear infinite 3s;
}
.wave2 {
	animation: wave 10s linear infinite 7s;
}

.copyright{
	position: absolute;
	bottom: 20px;
	width: 100%;
	color: var(--desc-color);
	font-size: var(--desc-size);
	text-align: center;
}

@keyframes wave{
	0%{
		transform: scale(1);
		opacity: 0;
	}

  5%{
		transform: scale(1.2);
		opacity: 0.4;
	}

  10%{
		transform: scale(1.6);
		opacity: 0.6;
	}

  15%{
		transform: scale(2.2);
		opacity: 0.8;
	}

  20%{
		transform: scale(2.8);
		opacity: 0.9;
	}

  25%{
		transform: scale(3.4);
		opacity: 0.8;
	}

  30%{
		transform: scale(4);
		opacity: 0.8;
	}

  35%{
		transform: scale(4.8);
		opacity: 0.7;
	}

  40%{
		transform: scale(5.6);
		opacity: 0.7;
	}

  45%{
		transform: scale(6.4);
		opacity: 0.6;
	}

  50%{
		transform: scale(7.2);
		opacity: 0.6;
	}

  55%{
		transform: scale(8);
		opacity: 0.5;
	}

  60%{
		transform: scale(8.8);
		opacity: 0.5;
	}

  65%{
		transform: scale(9.7);
		opacity: 0.4;
	}

  70%{
		transform: scale(10.4);
		opacity: 0.4;
	}

  75%{
		transform: scale(11.4);
		opacity: 0.3;
	}

  80%{
		transform: scale(12.4);
		opacity: 0.3;
	}

  85%{
		transform: scale(13.6);
		opacity: 0.2;
	}

  90%{
		transform: scale(14.8);
		opacity: 0.2;
	}

  95%{
		transform: scale(16);
		opacity: 0.1;
	}

	100%{
		transform: scale(17.5);
		opacity: 0.1;
	}
}

.login__form{
	position: fixed;
	z-index: 20;
	bottom: calc(10vh + 260px);
	width: 100vw;
	box-shadow: 0 0 1px 0 rgba(0, 0, 0, .1);
}
.form__input{
	position: absolute;
	z-index: 100;

	width: 70vw;
	margin: 30px 12vw;
	padding: 10px 3vw;
	height: 70px;
	border-radius: 60px;
	color: rgba(255, 255, 255, 0.2);
	background: rgba(0,0,0,0.3);
	text-align: center;
	font-size: 0.9rem;
}
.form__input-phone{
	bottom: 120px;
}
.form__input-password{
	bottom: 0;
}
.form__input-active{
	background: rgba(255,255,255,0.8);
	color: var(--title-color);
}

.form__btn{
	position: fixed;
	z-index: 100;
	bottom: calc(10vh + 130px);

	width: 76vw;
	height: 90px;
	margin: 20px 12vw;
	border-radius: 60px;

	background: rgba(255,255,255,0.9);
	font-size: 0.9rem;
}
.form__btn__disabled {
	position: fixed;
	bottom: calc(10vh + 130px);
	z-index: 100;
	width: 76vw;
	height: 90px;
	margin: 20px 12vw;
	border-radius: 60px;
	color: var(--color-gray);
	background: rgba(255,255,255,0.4);
	font-size: 0.9rem;
}

.youke-login {
	position: fixed;
	z-index: 100;
  bottom: 12vh;
	width: 30vw;
	margin: 20px 35vw;
	line-height: 50px;
	text-align: center;
	background: transparent;
	color: rgba(255,255,255,0.9);
	font-size: 0.9rem;
}
.youke-login>i{
	font-size: 1rem;
}
</style>
