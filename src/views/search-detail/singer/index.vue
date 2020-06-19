<template>
	<Scroll :top="'5.625rem'" :hasLazyItem="true">
    <div class="content">
      <SingerItem v-for="item in singers" :key="item.id" :singer="item"></SingerItem>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "../../../components/scroll"
import SingerItem from "../../../base/singer"
import {
  search
} from "../../../api/search"
import {
  SearchSinger
} from "../../../common/class"
export default {
  components: {
    SingerItem,
    Scroll
  },
  data(){
    return {
      singers: [],
      inited: false
    }
  },
  created(){
    this.getData()
  },
  activated(){
    if (this.inited) {
      this.getData()
    }
  },
  methods: {
    async getData(){
      this.$loading.show({
        message: "加载中...",
        banClick: true
      })
      try {
        const { keywords } = this.$route.params
        const res = await search({keywords, type: 100})
        if (res.code === 200) {
          let singers = []
          for (let i = 0, l = res.result.artists.length; i < l; i++){
            singers.push(new SearchSinger(res.result.artists[i]))
          }
          this.inited = true
          this.singers = singers
        }
      } catch (err) {
        console.log(err)
      }
      this.$loading.hide()
    },
  }
}
</script>

<style  scoped>
.content{
  padding: 0 20px;
}
</style>
