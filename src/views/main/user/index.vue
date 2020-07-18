<template>
  <div>
    <div class="userBar" ref="userBar">
      <div class="avatar">
        <img v-if="!isAnonymous" :src="profile.avatarUrl" alt="用户头像">
        <img v-else src="http://116.62.70.150/static/image/default_avatar.jpg" alt="用户头像">
      </div>
      <div class="username">{{profile.nickname || '游客'}}</div>
      <div class="nav-item" v-for="(item, index) in navItemList" @click="navTo(item.path)" :key="index">
        <div v-if="item.isDiaryIcon" class="nav-item__icon">
          <div class="date">{{dateNum}}</div>
        </div>
        <div v-if="!item.isDiaryIcon" class="nav-item__icon">
          <i :class="`iconfont ${item.iconfont}`"></i>
        </div>
        <div class="nav-item__right">
          <div class="nav-item__text">
            {{item.title}}
          </div>
          <div class="nav-item__navIcon">
            <i class="iconfont icon-icon-test41"></i>
          </div>
        </div>
      </div>
      <div v-if="!isAnonymous" class="userBar-logout" @click="logout">
        退出登录
      </div>
      <div v-else class="userBar-logout" @click="handleLogin">
        登录账号
      </div>
    </div>
    <transition name="fade">
      <div v-show="show" class="mask" @click="hideUserBar"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navItemList: [ // 导航对象
        {
          iconfont: null,
          title: "每日推荐",
          path: "/recommend",
          isDiaryIcon: true
        }, {
          iconfont: "icon-icon-test36",
          title: "我收藏的歌单",
          path: "/collections"
        }, {
          iconfont: "icon-tianjiazhuanlan_chuangjianzhuanlan",
          title: "我创建的歌单",
          path: "/userSongs"
        }, {
          iconfont: "icon-icon-test29",
          title: "周杰伦单曲",
          path: "/JayChou"
        }
      ],
      show: false,
      dateNum: ""
    }
  },
  computed: {
    ...Vuex.mapState(["profile", "isAnonymous"])
  },
  watch: {
    show(newValue){
			let fontSize = window.fontSize
      let clientWidth = fontSize * 13.75
      if (newValue){
        this.$nextTick(() => {
          this.$refs.userBar.style.transform = "translateX(0px)"
        })
      } else {
        this.$nextTick(() => {
          this.$refs.userBar.style.transform = "translateX(" + -clientWidth + "px)"
        })
      }
    }
  },
  created(){
    this.dateNum = new Date().getDate()
  },
  methods: {
    hideUserBar() {
      this.show = false
    },
    logout() {
      this.$confirm({
        title: "退出",
        msg: "确定退出登录?"
      })
        .then(() => {
          this.show = false
          this.$router.replace("/login")
        })
        .catch(() => {})
    },
    navTo(path) {
      if(this.isAnonymous) {
        this.$toast({
          msg: "请登录账号！",
          icon: "warning"
        })
        return
      }
      this.show = false
      if (path === "/collections") {
        this.$confirm({
          title: "提示",
          msg: "页面接口有问题，暂时不能使用"
        })
          .then()
          .catch()
        return
      }
      if (path === "/recommend") {
        this.$confirm({
          title: "提示",
          msg: "页面接口有问题，暂时不能使用"
        })
          .then()
          .catch()
        return
      } else {
        this.$confirm({
          title: "提示",
          msg: "该页面尚未开发完毕，敬请期待!"
        })
          .then()
          .catch()
        return
      }
      // this.$router.push(path)
    },
    handleLogin(){
      this.show = false
      this.$router.replace("/")
    }
  }
}
</script>

<style scoped>
.userBar{
  position: fixed;
  z-index: 101;
  top: 0;
  bottom: 0;
  left: 0;
  width: 440px;
  background: var(--color-white);
  will-change: transform;
  transform: translateX(-440px);
  transition: transform .3s ease;
}

.avatar{
	margin-top: 80px;
	text-align: center;
}
.avatar>img {
	width: 220px;
	height: 220px;
	border-radius: 50%;
}

.username {
	line-height: 90px;
	text-align: center;
	color: var(--info-color);
	font-weight: 600;
}

.nav-item{
	display: flex;
	height: 100px;

	color: var(--title-color);
}
.nav-item:nth-last-child(1){
	border-bottom: 1px solid var(--border-color);
}

.nav-item__icon{
	width: 100px;
	line-height: 100px;
	text-align: center;
}

.date{
	margin: 20px;
	width: 60px;
	height: 60px;
	border-radius: 8px;
	border: 1px solid var(--border-color);
	line-height: 60px;
	text-align: center;
	font-size: .8rem;
	color: var(--desc-color);
}
.nav-item__icon>i{
	font-size: 1.5rem;
}
.nav-item__right{
	display: flex;
	border-bottom: 1px solid var(--border-color);
}
.nav-item__text{
	width: 240px;
	line-height: 100px;
}
.nav-item__navIcon{
	width: 100px;

	line-height: 100px;
	text-align: center
}
.nav-item__navIcon>i{
	font-size: 1.5rem;
}
.userBar-logout{
	position: absolute;
	bottom: 10px;

	width: 420px;
	margin: 4px 10px;

	background: #F2F6FC;
	line-height: 100px;
	text-align: center;
	font-size: 28px;
	color: var(--desc-color);
}
</style>
