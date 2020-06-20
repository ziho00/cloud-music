<template>
  <div class="songs">
    <div class="recommendSongs-title">
      推荐歌单
    </div>
    <PlaylistView :playlists="playlists" ></PlaylistView>
  </div>
</template>

<script>
import {
  getRecommendedSongsList
} from "@/api/home"
import {
  Playlist
} from '@/common/class'
import { classCreator } from '@utils'
import PlaylistView from "@/components/playlist"
export default {
  components: {
    PlaylistView
  },
  data() {
    return {
      playlists: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
				const res = await getRecommendedSongsList()
        this.playlists = classCreator(res.result , Playlist)
			} catch(err) {
				console.log(err)
			}
    }
  }
}
</script>

<style scoped>
.recommendSongs-title{
  position: relative;
  height: 80px;
  padding: 0 30px;
  margin: 20px 0 20px 0;
  line-height: 80px;
  color: var(--info-color);
  font-size: 1.2rem;
  font-weight: 600;
}

.recommendSongs-more{
  position: absolute;
  top: 0;
  right: 30px;

  margin: 13px 0;
  height: 54px;
  padding: 0 30px;

  line-height: 54px;
  font-size: 0.7rem;
  font-weight: 500;

  border: 1px solid var(--border-color);
  border-radius: 60px;
}

</style>
