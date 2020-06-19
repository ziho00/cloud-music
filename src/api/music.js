import {get} from "./index"

/**
 * 获取音乐链接
 * @param {*} params
 */
export const getMusicUrl = (params) => get("/song/url", params)

/**
 * 获取歌曲
 * @param {*} params
 */
export const getMusic = (params) => get("/song/detail", params)

/**
 * 检查音乐是否可用
 * @param {*} params
 */
export const checkMusic = (params) => get("/check/music", params)
/**
 * 获取歌词
 * @param {*} params
 */
export const getMusiclyric = (params) => get("/lyric", params)
