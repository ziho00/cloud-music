<template>
  <Scroll :top="'5.625rem'" :hasLazyItem="true">
    <!-- 歌手 -->
    <div class="singer-content" v-if="singers">
      <span>你可能感兴趣</span>
      <SingerItem v-for="item in singers" :key="item.id" :singer="item"></SingerItem>
    </div>
    <!-- 单曲 -->
    <div class="songs">
      <div class="songs-header">
        <span>单曲</span>
        <div class="songs-header-btn" @click="playAll">播放全部</div>
      </div>
      <SongItem v-for="(item, index) in songs" :activeId="musicInfo.id" :key="item.id" :index="index" :song="item" @play="handlePlay"></SongItem>
      <div class="more" @click="changeActive('songs')">
        查看更多{{$route.params.keywords}}的相关歌曲<i class="iconfont icon-youjiantoubeifen"></i>
      </div>
    </div>
    <!-- 歌单 -->
    <div class="playList">
      <div class="playList-header">
        <span>歌单</span>
      </div>
      <PlayListItem v-for="item in playLists" :key="item.id" :playList="item" @click="handleToPlayList"></PlayListItem>
      <div class="more" @click="changeActive('playlists')">
        查看更多{{$route.params.keywords}}的相关歌单<i class="iconfont icon-youjiantoubeifen"></i>
      </div>
    </div>
  </Scroll>
</template>

<script>
import {
  search
} from "@/api/search"
import {
  Song,
  SearchSinger,
  SearchPlayList
} from "@/common/class"
import { classCreator } from "@utils"
import PlayListItem from "@/base/playlist"
import SingerItem from "@/base/singer"
import SongItem from "@/base/song"
import { mapState } from "vuex"
import Scroll from "@/components/scroll"

export default {
  components: {
    PlayListItem,
    SingerItem,
    SongItem,
    Scroll
  },
  data(){
    return {
      singers: null,
      songs: null,
      playLists: null,
      inited: false
    }
  },
  computed: {
    ...mapState(["musicInfo"])
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
        let res = await search({keywords, type: 1018})
        this.inited = true
        this.singers = classCreator(res.result.artist.artists, SearchSinger)
        this.songs = classCreator(res.result.song.songs, Song)
        this.playLists = classCreator(res.result.playList.playLists, SearchPlayList)
        this.$loading.hide()
      } catch (err) {
        this.$loading.hide()
      }
    },
    handlePlay(song, index) {
      this.$store.dispatch("playMusic", song.id)
      this.$store.dispatch("setCurrentIndex", index)
      this.$store.dispatch("setPlayList", this.songs)
    },
    playAll(){
      this.handlePlay(this.songs[0], 0)
    },
    handleToPlayList(id){
      this.$router.push({
        path: `/playlist/${id}`
      })
    },
    changeActive(path) {
      this.$router.replace({
        path: `/search/${this.$route.params.keywords}/${path}`
      })
    }
  }
}
</script>

<style  scoped>
.singer-content{
	padding: 0 20px;
	width: calc(100% - 40px);
	font-size: var(--info-size);
	color: var(--title-color);
}
.singer-content>span{
		line-height: 70px;
}
.songs{
  width: 100vw;
}
.songs-header{
  padding: 0 20px;
  position: relative;
  display: flex;
  width: calc(100vw - 40px);
  line-height: 70px;
  border-bottom: 1px solid var(--border-color);
}
.songs-header>span{
  font-weight: 600;
}
.songs-header-btn{
  position: absolute;
  padding: 15px 25px;
  right: 15px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
  font-size: var(--desc-size);
  color: var(--info-color);
  line-height: 25px;
}

.playList{
  margin-top: 30px;
  padding: 0 20px;
  width: calc(100% - 40px);
}
.playList-header{
  position: relative;
  display: flex;
  width: 100%;
  line-height: 70px;
  border-bottom: 1px solid var(--border-color);
}
.playList-header>span{
  font-weight: 600;
}

.more{
  line-height: 70px;
  text-align: center;
  color: var(--desc-color);
  font-size: var(--desc-size);
}
.more>i{
  margin-left: 10px;
  font-size: var(--info-color);
}
</style>
