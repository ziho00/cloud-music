import {get, post} from './index'

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * @param {*} params
 */
export const getUserSubcount = () => get('/user/subcount')

/**
 * 获取用户播放记录
 */
export const getUserPlayRecord = (params) => get('/user/record', params)

/**
 * 获取每日推荐歌曲
 */
export const getRecommendSongs = () => get(`/recommend/songs?timetamp=${new Date().getTime()}`)

/**
 * 获取用户详情
 * @param {*} params
 */
export const getUserDetail = (params) => get('/user/detail', params)

/**
 * 获取用户歌单
 * @param {*} params
 */
export const getUserPlayList = (params) => get('/user/playlist', params)


export const refresh = () => post('/login/refresh')
