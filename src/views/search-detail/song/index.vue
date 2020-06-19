<template>
  <Scroll :top="'5.625rem'">
    <div class="single-music">
      <PlayAllItem :songs="songs"></PlayAllItem>
        <SongItem v-for="(item, index) in songs" :activeId="musicInfo.id" :key="item.id" :index="index" :song="item" @play="handlePlay"></SongItem>
    </div>
  </Scroll>
</template>

<script>
import {
  search
} from "../../../api/search"
import { mapState } from "vuex"
import PlayAllItem from '../../../base/playall-item'
import SongItem from "../../../base/song"
import Scroll from "../../../components/scroll"
import { 
  SearchSong 
}from "../../../common/class"
export default {
  components: {
    PlayAllItem,
    SongItem,
    Scroll
  },
  data(){
    return {
      songs: [],
      inited: false
    }
  },
  computed: {
    keywords(){
      return this.$route.params.keywords
    },
    ...mapState(["musicInfo"])
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
        const { keywords } = this
        let res = await search({keywords, type: 1})
        let songs = []
        console.log(res)
        for (let i = 0, l = res.result.songs.length; i < l; i++) {
          songs.push(new SearchSong(res.result.songs[i]))
        }
        this.songs = songs
        this.inited = true
      } catch (err) {
        console.log(err)
      }
      this.$loading.hide()
    },
    handlePlay(song, index) {
      this.$store.dispatch("playMusic", song.id)
      this.$store.dispatch("setCurrentIndex", index)
      this.$store.dispatch("setPlayList", this.songs)
    },
    playAll(){
      this.handlePlay(this.songs[0], 0)
    }
  }
}
</script>

<style scoped>
header{
  padding: 0 20px;
  line-height: 90px;
  border-bottom: 1px solid var(--border-color);
}
.playAll>i{
  font-size: 1.3rem;
  margin-right: 15px;
}
</style>
