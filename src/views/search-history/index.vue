<template>
  <div class="search-history">
    <div class="history">
      搜索历史
      <div class="history-delete" @click="handleClicClear">
        <i class="iconfont icon-icon7"></i>
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="history-list" ref="tab">
      <div class="list-wrapper" ref="wrapper">
        <div class="wrapper-item" v-for="(item, index) in searchHistories" :key="index" ref="wrapperItem" @click="toSearchDetail(item)">
            {{item}}
        </div>
      </div>
    </div>
    <!-- 热搜榜 -->
      <div class="hot-search">
         热搜榜
      </div>
      <div class="hot-serch-item" v-for="(item, index) in searchHots" :key="index" @click="toSearchDetail(item.searchWord)">
        <div class="hot-index">
          {{index + 1}}
        </div>
        <div class="hot-info">
          <div class="hot-info__name ellsips">
            {{item.searchWord}}
            <img v-if="item.iconUrl" :src="item.iconUrl" alt="hot-icon.jpg">
          </div>
          <div class="hot-info__desc ellsips">{{item.content}}</div>
        </div>
        <div class="hot-count">
          {{item.score}}
        </div>
      </div>
  </div>
</template>

<script>
import {
  searchHotDetail
} from '@/api/search'
import { 
  addSearchRecord,
  classCreator
} from '@utils'
import { SearchHot } from '@/common/class'
export default {
  data(){
    return {
      scroll: null,
			searchHots: [],
			searchHistories: []
    }
  },
  created() {
		this.getSearchHot()
		this.getSearchHistory()
  },
  activated(){
    if (this.scroll){
			this.scroll.refresh()
			this.getSearchHistory()
    }
  },
  methods: {
		getSearchHistory(){
			this.searchHistories = JSON.parse(window.localStorage.getItem('searchHistories')) || []
		},
    async getSearchHot() {
			let vm = this
			try {
				const res = await searchHotDetail()
				vm.searchHots = classCreator(res.data, SearchHot)
				this.initHistoryList()
			} catch(err) {
				console.log(err)
			}
    },
    initHistoryList() {
      if (!this.searchHistories.length) { return }
      const vm = this
      const wrapperList = vm.$refs.wrapperItem
      let len = wrapperList.length
      if (!len) { return void 0 }
      let width = 0
      let margin = window.fontSize * 1.25
      for (let i = 0; i < len; i++) {
        width += wrapperList[i].clientWidth
      }
      width += len * margin
      vm.$refs.wrapper.style.width = width + 'px'
      if (!vm.scroll) {
        vm.scroll = new BScroll(vm.$refs.tab, {
          scrollX: true,
          scrollY: false,
          click: true,
          bounce: true,
          momentum: true
        })
      } else {
        vm.scroll.refresh()
      }
    },
    toSearchDetail(keywords) {
      this.$router.push({
        path: `/search/${keywords}`
      })
      addSearchRecord(keywords)
    },
    handleClicClear() {
      this.$confirm({
        msg: '确定要清空历史记录？'
      })
        .then(() => {
          window.localStorage.setItem('searchHistories', JSON.stringify([]))
          this.searchHistories = []
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.search-history{
  background: var(--color-gray);
}
.history{
  display: flex;
  position: relative;

  padding: 0 20px;
  height: var(--header-height);
  line-height: var(--header-height);
  font-size: var(--name-size);
}

.history-delete{
	position: absolute;
	top: 0;
	right: 20px;

	width: var(--header-height);
	height: var(--header-height);

	line-height: var(--header-height);
	text-align: center;
}
.history-delete>i{
	font-size: 1.3rem;
	color: var(--title-color);
}
.history-list{
  overflow: hidden;
  height: var(--header-height);
}

.list-wrapper{
	display: flex;
	white-space: nowrap;
}
.wrapper-item{
	height: 34px;
	padding: 12px 36px;
	margin: 0 10px;
	line-height: 34px;
	background: var(--color-white);
	border-radius: 60px;
	font-size: var(--desc-size);
}

.hot-search{
  padding: 0 20px;
  height: var(--header-height);
  line-height: var(--header-height);
  font-size: var(--name-size);
  background: var(--color-white);
  border: 1px solid var(--border-color);
}
.hot-serch-item{
  display: flex;
  position: relative;
  height: 90px;
  padding: 15px 0;

  background: var(--color-white);
  border-bottom: 1px solid var(--border-color);
}
.hot-index{
	height: 90px;
	width: 90px;
	line-height: 90px;
	text-align: center;
	font-size: var(--info-size);
}
.hot-info__name{
	line-height: 50px;
	font-size: 34px;
}
    
.hot-info__name>img{
	height: 30px;
}

.hot-info__desc{
	max-width: 520px;

	color: var(--desc-color);
	line-height: 40ox;
	font-size: 24px;
}
.hot-count{
	position: absolute;
	right: 30px;
	line-height: 90px;
	font-size: 24px;
	color: var(--tips-color);
}
</style>
