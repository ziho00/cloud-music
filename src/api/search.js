import {get} from "./index"

/**
 * 搜索关键词
 * @param {*} params keywords type{ 1: 单曲 2: 专辑 100: 歌手 1000: 歌单 }
 */
export const search = (params) => get("/search", params)

/**
 * 搜索建议
 * @param {*} params
 */
export const searchSuggest = (params) => get("/search/suggest", params)

/**
 * 热门搜索
 * @param {*} params
 */
export const searchHot = () => get("/search/hot")

/**
 *热门搜索详情
 * @param {*} params
 */
export const searchHotDetail = () => get("/search/hot/detail")

/**
 * 匹配多重搜索
 * @param {*} params
 */
export const searchMultimatch = (params) => get("/search/multimatch", params)
