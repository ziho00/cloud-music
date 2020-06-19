<template>
  <div class="songs">
    <div class="songs-item" v-for="playlist in playlists" :key="playlist.id" @click="toPlaylistView(playlist.id)">
      <ImgLazy :url="playlist.picUrl"></ImgLazy>
      <!-- <img :src="" alt="歌单图片"> -->
      <div class="song-text ellsips-line2">
        {{playlist.name}}
      </div>
      <div class="song-playcount">
        <i class="iconfont icon-bofangsanjiaoxing"></i>{{playlist.playCount}}
      </div>
    </div>
  </div>
</template>

<script>
import ImgLazy from '../../base/img-lazy'
export default {
  props: {
    playlists: {
      type: Array,
      default: null
    }
  },
  components: {
    ImgLazy
  },
  methods: {
    toPlaylistView(id) {
      this.$router.push({
        path: `/playlist/${id}`
      })
    }
  }
}
</script>

<style scoped>
.songs{
  display: grid;
  margin: 0 25px;
  width: 700px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 30px;
  grid-row-gap: 20px;
}

.songs-item{
	position: relative;
}
.songs-item>img{
	width: 100%;
	border-radius: 10px;
}

.song-text{
	overflow: hidden;
	display: -webkit-box;

	font-size: var(--desc-size);
	line-height: 35px;
	color: #000;
}
.song-playcount{
	position: absolute;
	top: 0;
	right: 15px;

	line-height: 36px;
	color: white;
	font-size: var(--desc-size);
}
.song-playcount>i{
	font-size: var(--info-size);
}
</style>
