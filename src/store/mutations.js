import * as type from "./mutation-typs"

const mutations = {
  [type.SET_MUSIC_URL](state, musicUrl) {
    state.musicUrl = musicUrl
  },
  [type.SET_MUSIC_INFO](state, musicInfo) {
    state.musicInfo = musicInfo
  },
  [type.SET_LYRIC](state, lyrics) {
    state.lyrics = lyrics
  },
  [type.SET_CURRENT_TIME](state, currentTime) {
    state.currentTime = currentTime
  },
  [type.SET_TOTAL_TIME](state, totalTime) {
    state.totalTime = totalTime
  },
  [type.SET_PLAY_STATE](state, isPlaying) {
    state.isPlaying = isPlaying
  },
  [type.SET_MODE](state, mode) {
    state.mode = mode
  },
  [type.SET_PLAY_LIST](state, playList) {
    state.playList = playList
  },
  [type.SET_RANDOM_PLAY_LIST](state, playList) {
    state.randomPlayList = playList
  },
  [type.MOVE_MUSIC_FROM_RANDOM](state, index) {
    state.randomPlayList = state.randomPlayList.splice(index, 1)
  },
  [type.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [type.UPDATE_CURRENT_TIME](state, changeCurrentTime) {
    state.changeCurrentTime = changeCurrentTime
  },
  [type.SET_LOGIN_INFO](state, info) {
    state.account = info.account
    state.profile = info.profile
    state.token = info.token
  },
  [type.SET_ANONYMOUS](state, value) {
    state.isAnonymous = value
  }
}

export default mutations
