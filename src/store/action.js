import {
  getMusic,
  checkMusic,
  getMusiclyric
} from "@/api/music"

import {
  login
} from "@/api/login"

import {
  initLyric
} from '@utils'

import {
  Music
} from '@/common/class'


import Vue from "vue"

export const playMusic = async ({dispatch, commit}, id = 0) => {
  try {
    const check = await checkMusic({id})
    if (!check.success) {
      throw new Error("没有该歌曲版权")
    }
    commit("set_music_url", `https://music.163.com/song/media/outer/url?id=${id}.mp3`)
    commit("set_play_state", true)
    const music = await getMusic({ids: id})
    commit("set_music_info", new Music(music.songs[0]))
    const lyric = await getMusiclyric({id})
    commit("set_lyric", initLyric(lyric.lrc && lyric.lrc.lyric || ""))
  } catch (e) {
    Vue.prototype.$confirm({
      title: "信息",
      msg: "该歌曲因版权原因无法播放"
    })
    dispatch("nextMusic")
  }
}

export const nextMusic = ({dispatch, state}) => {
  const { currentIndex, mode, playList } = state
  /**
   * mode 播放模式
   * 0 列表循环
   * 1 单曲循环
   * 2 随机播放
   */
  switch (mode) {
  case 0:
    // eslint-disable-next-line no-case-declarations
    const nextIndex = currentIndex >= playList.length - 1 ? 0 : currentIndex + 1
    dispatch("playMusic", playList[nextIndex].id)
    dispatch("setCurrentIndex", nextIndex)
    break
  case 1:
    dispatch("playMusic", playList[currentIndex].id)
    break
  case 2:
    // eslint-disable-next-line no-case-declarations
    let index = Math.floor(Math.random() * (playList.length - 1))
    dispatch("playMusic", playList[index].id)
    dispatch("setCurrentIndex", index)
    break
  default:
    break
  }
}

export const handleLogin = ({commit}, {phone, password}) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$loading.show({
      message: "登录中...",
      banClick: true
    })
    login({phone, password})
      .then(res => {
        Vue.prototype.$loading.hide()
        if (res.code === 200) {
          commit("set_login_info", res)
          Vue.prototype.$toast({
            msg: "登录成功!",
            icon: "success"
          })
          resolve()
        } else {
          Vue.prototype.$toast({
            msg: "登录信息有误!",
            icon: "error"
          })
          reject()
        }
      })
      .catch(() => {
        Vue.prototype.$loading.hide()
        Vue.prototype.$toast({
          message: "登录失败，请重新操作!",
          icon: "error"
        })
        reject()
      })
  })
}

export const setCurrentIndex = ({commit}, currentIndex = 0) => {
  commit("set_current_index", currentIndex)
  commit("move_music_from_random", currentIndex)
}

export const setCurrentTime = ({commit}, currentTime = 0) => {
  commit("set_current_time", currentTime)
}

export const setTotalTime = ({commit}, totalTime = 0) => {
  commit("set_total_time", totalTime)
}

export const setPlayState = ({commit}, isPlaying = false) => {
  commit("set_play_state", isPlaying)
}

export const setPlayMode = ({commit}, mode) => {
  commit("set_mode", mode)
}

export const setPlayList = ({commit}, playList = []) => {
  commit("set_play_list", playList)
  commit("set_random_play_list", JSON.parse(JSON.stringify(playList)))
}

export const ChnageCurrentTime = ({commit}, changeCurrentTime = 0) => {
  commit("update_current_time", changeCurrentTime)
}

export const setAnonymous = ({commit}, value) => {
  commit("set_anonymous", value)
}
