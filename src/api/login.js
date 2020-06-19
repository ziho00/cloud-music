import {get, post} from "./index"

/**
 * 登录
 * @param {*} params phone pwd
 */
export const login = (params) => post("/login/cellphone", params)

/**
 * 刷新登录状态
 */
export const refresh = () => get("/login/refresh")

/**
 * 获取登录状态
 */
export const logStatus = () => get("/login/status")

/**
 * 退出登录
 */
export const logout = () => get("/logout")
