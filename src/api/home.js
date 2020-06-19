import {get} from "./index"

/**
 * 获取轮播图
 */
export const getBanner = () => get("/banner")

/**
 * 获取排行榜
 * @param {*} params
 */
export const getLeaderboard = (params) => get(`/top/list?idx=${params.idx}`)

/**
 * 获取推荐歌单
 * @param {*} params
 */
export const getRecommendedSongsList = () => get("/personalized")
