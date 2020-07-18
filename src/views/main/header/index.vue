<template>
	<header>
    <div class="user__nav" @click="showUserBar" v-show="showUserNav">
      <i class="user__nav-icon iconfont icon-indent"></i>
    </div>
    <div ref="searchInput" class="search">
      <div class="search-icon">
        <i class="iconfont icon-icon-test5"></i>
      </div>
      <form action="">
        <input class="search-input" @click="handleToSearch" v-model="keywords" @keypress="handleKeypress" type="search" placeholder="搜索热门歌曲" />
      </form>
    </div>
    <div class="search-cancle" v-show="!showUserNav" @click="handleCancleSearch">
      取消
    </div>
    <div class="header-icon" @click="toSingerPage" v-show="showSingerIcon">
      <i class="iconfont icon-flyme_icon-"></i>
    </div>
	</header>
</template>

<script>
import {
  debounce,
  preventDefault,
  addSearchRecord,
} from '@utils'
export default {
  data() {
    return {
      len: 0,
      value: 0,
      keywords: '',
      showUserNav: true,
      changeKeyWords: null,
    }
  },
  computed: {
    showSingerIcon(){
      return !!this.$route.meta.showSingerIcon 
    } 
  },
  watch: {
     keywords(val) {
      if(val == '' && this.$route.path === '/main/searchList'){
        this.$router.replace('/main/searchHistory')
      } else if(val !== '' && this.$route.path !== '/main/searchList') {
        this.$router.replace('/main/searchList')
      }
      if (val.trim() !== '') {
        this.changeKeyWords()
      }
    },
  },
  mounted(){
    this.changeKeyWords = debounce(this.handleChangeKeywords, 500, true)
  },
  methods: {
    showUserBar(){
      this.$emit('clickUserNav')
    },
    handleToSearch(){
      if (this.$route.path === '/main/searchList') {
        return
      }
      this.showUserNav = false
      this.$nextTick(() => {
        this.$refs.searchInput.style.transform = 'translateX(0)'
      })
      if (this.$route.path !== '/main/searchHistory') {
        this.$router.replace('/main/searchHistory')
      }
    },
    handleKeypress(event) {
      if(event.keyCode === 13) {
        preventDefault(event)
        this.toSearchDetail()
      }
    },
    toSearchDetail(){
      if(this.keywords.trim() == '') { return }
      addSearchRecord(this.keywords)
      this.$router.push(`/search/${this.keywords}`)
    },
    handleCancleSearch(){
      this.showUserNav = true
      this.$nextTick(()=>{
        let clientWidth = window.fontSize * 3.125
        this.$refs.searchInput.style.transform = 'translateX(' + clientWidth + 'px)'
      })
      this.keywords = ''
      this.$router.replace('/main')
    },
    handleChangeKeywords() {
      if(this.keywords.trim() == '') return
      this.$emit('handleKeywordsChange', this.keywords)
    },
    toSingerPage() {
      this.$router.push('/singers')
    },
  }
}
</script>

<style scoped>
header{
  z-index: 10;
  display: flex;
  width: 100%;
  height: var(--header-height);
  background: var(--app-bg);
}

.user__nav{
  position: absolute;
  left: 0;
  width: var(--header-height);

  line-height: var(--header-height);
  text-align: center;
}

.user__nav-icon{
  font-size: 1.3rem;
  color: #ffff;
}
.search{
  overflow: hidden;
  display: flex;
  margin: 20px 15px;

  width: 520px;
  height: 60px;
  border-radius: 60px;

  background: #f5f5f5;
  color: var(--title-color);
  will-change: transform;
  transform: translateX(var(--header-height));
  transition: transform .3s;
}
.search-icon{
  width: 60px;
  line-height: 60px;
  text-align: center;
}
.search-icon>i{
  font-size: 0.8rem;
}
.search-input{
  box-sizing: border-box;
  height: 50px;
  width: 440px;
  margin-top: 6px;

  line-height: 50px;
  border: none;
  background: var(--color-gray);
  font-size: var(--name-size);


  -webkit-appearance: none;
}
.search-cancle{
  position: absolute;
  right: var(--header-height);
  width: var(--header-height);

  line-height: var(--header-height);
  text-align: center;
  color: var(--color-white);
  font-size: var(--name-size);
}

.header-icon{
  position: absolute;
  right: 0;

  width: var(--header-height);

  line-height: var(--header-height);
  text-align: center;
}
.header-icon>i{
  font-size: 1.5rem;
  color: var(--color-white);
}
</style>