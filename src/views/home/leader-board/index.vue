<template>
  <div class="leaderboard">
    <div class="leaderboard-text">
      排行榜
    </div>
    <div class="leaderboard__tag" ref="leaderboradTag">
      <div class="leaderboard__wrapper" ref="leaderboardWrapper">
        <img class="leaderboard__item" v-for="(leaderboard,index) in leaderboards" :key="index"
          @click="handleToLeaderboardDetail(leaderboard,index)" :src="leaderboard.imgUrl"  alt="leaderboard.png">
      </div>
    </div>
    <div class="bottom-border"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderboards: [
        {
          imgUrl: "http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg",
          id: 3779629,
          name: "新歌榜"
        }, {
          imgUrl: "http://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg",
          id: 3778678,
          name: "热歌榜"
        }, {
          imgUrl: "http://p2.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg",
          id: 2884035,
          name: "原创榜"
        }, {
          imgUrl: "http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg",
          id: 19723756,
          name: "飙升榜"
        }, {
          imgUrl: "http://p2.music.126.net/8-GBrukQ3BHhs4CmK6qE4w==/109951163424197392.jpg",
          id: 10520166,
          name: "国电榜"
        }, {
          imgUrl: "http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg",
          id: 180106,
          name: "UK排行榜周榜"
        }
      ]
    }
  },
	mounted(){
		this.initWrapperWidth()
	},
  methods: {
    initWrapperWidth () {
      const vm = this
      let parentWidth = 0
      const width = window.fontSize * 6.562
      const margin = width * 0.15
      const count = vm.leaderboards.length
      parentWidth = count * width + (count + 1) * margin
      vm.$refs.leaderboardWrapper.style.width = parentWidth + "px"
      if (!vm.scroll) {
        vm.scroll = new BScroll(vm.$refs.leaderboradTag, {
          startX: 0,
          scrollX: true,
          scrollY: false,
          click: true,
          eventPassthrough: "vertical"
        })
      } else {
        vm.scroll.refresh()
      }
    },
    handleToLeaderboardDetail (leaderboard, index) {
      const vm = this
      vm.$router.push({
        path: `/leaderboard/${index}`
      })

    }
  }
}
</script>

<style  scoped>
.leaderboard-text{
	height: 50px;
	padding: 0 30px;

	line-height: 50px;
	color: var(--info-color);
	font-size: 1.2rem;
	font-weight: 600;
}

.leaderboard__tag{
	overflow: hidden;
	width: 100%;
}

.leaderboard__wrapper{
	display: flex;
	height: 270px;
	will-change: transform;
}
.leaderboard__item{
	overflow: hidden;
	height: 210px;
	width: 210px;
	margin: 30px 0 30px 30px;
	border-radius: 8px;
}

.bottom-border{
  margin: 0 30px;
  height: 1px;
  border-bottom: 1px solid var(--border-color);
}

</style>
