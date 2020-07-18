import {get} from './index'

/**
 * 获取歌单详情信息
 * @param {*} params id
 */
export const getSongsList = (params) => get('/playlist/detail', params)

/**
 * 获取该类歌单
 * @param {*} params
 */
export const getSongsListByTag = (params) => get('/top/playlist', params)
