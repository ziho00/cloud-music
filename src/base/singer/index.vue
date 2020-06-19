<template>
	<div class="singer-item" @click="toSingerDetail">
    <ImgLazy :url="singer.img1v1Url" defaultImg="http://116.62.70.150/static/image/default_avatar.jpg"></ImgLazy>
		<div class="singer-info ellsips">
			{{singer.name}}
			<span>
				{{singer.alia}}
			</span>
		</div>
		<div class="siner-icon">
			<i class="iconfont icon-icon-test41"></i>
		</div>
	</div>
</template>

<script>
import ImgLazy from '../img-lazy'
export default {
  components: {
    ImgLazy
  },
  props: {
		singer: {
			type: Object,
			default: null
		}
  },
  methods: {
    toSingerDetail() {
      this.$router.push({
        path: `/singer/${this.singer.id}`,
      })
    }
  }
}
</script>

<style scoped>
.singer-item{
  position: relative;
  padding: 15px 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
}
.singer-item>img{
  height: var(--header-height);
  width: var(--header-height);
  border-radius: 50%;
 }

.singer-info{
  width: calc(100% - 200px);
  line-height: 100px;
  margin-left: 25px;
  font-size: var(--name-size);
}
.singer-info>span {
	color: var(--title-color);
}
.siner-icon{
  position: absolute;
  right: 0;
  width: 50px;
  line-height: var(--header-height);
  text-align: center;
}
.siner-icon>i{
  font-size: 1.6rem;
  color: var(--title-color);
}
</style>
