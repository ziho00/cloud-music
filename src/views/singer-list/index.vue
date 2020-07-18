<template>
	<div>
		<Header>
			<div class="title" slot="middle">歌手分类</div>
		</Header>
		<div class="select-content">
			<div class="select-item" :class="{'selected': select1 === index}" v-for="(item, index) in options1" :key="item.value" @click="changeSelect1(index)">{{item.label}}</div>
		</div>
		<div class="select-content">
			<div class="select-item" :class="{'selected': select2 === index}" v-for="(item, index) in options2" :key="item.value" @click="changeSelect2(index)">{{item.label}}</div>
		</div>
		<Scroll ref="scroll" :top="'5.8rem'" :hasLazyItem="true">
			<div class="content">
				<ArtistItem v-for="item in artists" :key="item.id" :singer="item"></ArtistItem>
			</div>
		</Scroll>
	</div>
</template>

<script>
import {
  getArtistList
} from '@/api/singer'
import {
  SearchSinger
} from '@/common/class'
import { classCreator } from '@utils'
import Header from '@/components/header'
import ArtistItem from '@/base/singer'
import Scroll from '@/components/scroll'
export default {
  components: {
		Scroll,
		Header,
    ArtistItem
  },
  data() {
    return {
      options1: [
        {
          label: '华语',
          value: 7
        }, {
          label: '欧美',
          value: 96
        }, {
          label: '日本',
          value: 8
        }, {
          label: '韩国',
          value: 16
        }, {
          label: '其他',
          value: 0
        }
      ],
      options2: [{
        label: '男歌手',
        value: 1
      }, {
        label: '女歌手',
        value: 2
      }, {
        label: '乐队/组合',
        value: 3
      }],
      select1: -1,
      select2: -1,
      artists: [],
      inited: false
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
  updated(){
    this.$refs.scroll.refresh()
  },
  watch: {
    select1() {
      this.getData()
    },
    select2() {
      this.getData()
    }
  },
  methods: {
    async getData() {
      const { select1, select2 } = this
      const type = select2 === -1 ? select2 : this.options2[select2].value
      const area = select1 === -1 ? select1 : this.options1[select1].value
      try {
        this.$loading.show({
          message: '加载中...',
          banClick: true
        })
        const res = await getArtistList({type, area})
        this.artists = classCreator(res.artists, SearchSinger)
      } catch (err) {
        console.log(err)
      }
      this.$loading.hide()
      this.inited = true
    },
    back() {
      this.$router.back()
    },
    changeSelect1(index){
      if (this.select1 !== index){
        this.select1 = index
      }
    },
    changeSelect2(index){
      if (this.select2 !== index){
        this.select2 = index
      }
    }
  }
}
</script>

<style scoped>
.title {
	width: calc(100vw - 200px);
	line-height: 100px;
	text-align: center;
}
.select-content{
  display: flex;
  height: 40px;
	line-height: 40px;
}
.select-item{
	padding: 0 20px;
  color: var(--desc-color);
  font-size: var(--info-size);
}
.selected{
	color: var(--color-red) ;
}
.content{
	padding: 0 10px;
}
</style>
