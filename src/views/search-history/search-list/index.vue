<template>
  <div>
		<div class="search-title" @click="toSearchDetail(keywords)">
			搜索 “{{keywords}}”
		</div>
		<div class="search-more" v-for="(item, index) in searchList" :key="index" @click="toSearchDetail(item.name)">
			<div class="icon">
				<i class="iconfont icon-icon-test5"></i>
			</div>
			{{item.name}}
		</div>
  </div>
</template>

<script>
import {
  searchSuggest
} from "../../../api/search"
import { addSearchRecord } from "../../../utils"
export default {
  props: {
    keywords: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchList: []
    }
  },
  watch: {
    keywords(val) {
      let searchHistories = JSON.parse(window.localStorage.getItem("searchHistories")) || []
      val !== "" && searchHistories.unshift(val)
      this.getSearchList(val)
    }
  },
  created() {
    this.getSearchList(this.keywords)
  },
  methods: {
    async getSearchList(keywords) {
			if (keywords.trim() === "") { return }
			try {
				const res = await searchSuggest({keywords})
				this.searchList = res.result.songs
			} catch (err) {
				console.log(err)
			}
    },
    toSearchDetail(keywords) {
      this.$router.push({
        path: `/search/${keywords}`
      })
      addSearchRecord(keywords)
    }
  }
}
</script>

<style scoped>
.search-title{
	padding: 0 20px;
	line-height: 90px;
	color: #409EFF;
	border-bottom: 1px solid var(--border-color);
}
.search-more{
	display: flex;
	line-height: 80px;
	border-bottom: 1px solid var(--border-color);
	color: var(--title-color);
}
.icon{
	width: 80px;
	text-align: center;
}
.icon>i{
	font-size: 1.1rem;
}
</style>
