<template>
  <Scroll :top="'5.625rem'" :hasLazyItem="true">
    <div class="content">
      <PlayListItem v-for="item in playLists" :key="item.id" :playList="item" @click="handleToPlayList"></PlayListItem>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "../../../components/scroll"
import PlayListItem from "../../../base/playlist"
import {
  search
} from "../../../api/search"
import {
  SearchPlayList
} from "../../../common/class"
export default {
  components: {
    PlayListItem,
    Scroll
  },
  data(){
    return {
      playLists: [],
      inited: false
    }
  },
  computed: {
    keywords(){
      return this.$route.params.keywords
    }
  },
  created(){
    this.getData()
  },
  activated(){
    if (this.inited){
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
        const res = await search({keywords, type: 1000})
        if (res.code === 200) {
          let playLists = []
          for (let i = 0, l = res.result.playlists.length; i < l; i++){
            playLists.push(new SearchPlayList(res.result.playlists[i]))
          }
          this.inited = true
          this.playLists = playLists
        }
      } catch (err) {
        console.log(err)
      }
      this.$loading.hide()
    },
    handleToPlayList(id){
      this.$router.push({
        path: `/playlist/${id}`
      })
    },
  }
}
</script>

<style scoped>
.content{
  padding: 0 20px;
}
</style>
