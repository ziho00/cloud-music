<template>
	<div>
    <!-- 头部 -->
    <Header>
      <div class="title" slot="middle">{{title}}</div>
    </Header>
    <!-- tab选项栏 -->
    <Tabs :titles="tabs" ref="tabs" :defaultActive="0" :active="activeTab" @changeActive="handleChangeTab"></Tabs>
    <div class="mg-top"></div>
      <router-view></router-view>
	</div>
</template>

<script>
import Header from '../../components/header'
import Tabs from "../../components/tabs"
export default {
  components: {
    Header,
    Tabs
  },
  data(){
    return {
      songs: [],
      tabs: [
        {
          title: "综合",
          path: ""
        }, {
          title: "单曲",
          path: "songs"
        }, {
          title: "歌单",
          path: "playlists"
        }, {
          title: "歌手",
          path: "singers"
        }
      ],
      activeTab: 0
    }
  },
  computed: {
    title(){
      return this.$route.params.keywords
    }
  },
  watch: {
    "$route.path"(val) {
      this.initActive(val)
    }
  },
  activated(){
    this.initActive(this.$route.path)
  },
  methods: {
    handleChangeTab(item){
      this.$router.replace({
        path: `/search/${this.title}/${item.path}`
      })
    },
    back(){
      this.$router.replace("/main/searchHistory")
    },
    initActive(path){
      const tabs = this.tabs
      let shouldActive = 0
      for (let i = 0, l = tabs.length; i < l; i++) {
        if (`/search/${this.title}/${tabs[i].path}` === path){
          shouldActive = i
          break
        }
      }
      if (shouldActive !== this.activeTab) {
        this.activeTab = shouldActive
      }
    }
  }
}
</script>

<style scoped>
.title{
  line-height: var(--header-height);
  text-align: center;
}
.mg-top{
  width: 100%;
  margin-top: 190px;
}
</style>
