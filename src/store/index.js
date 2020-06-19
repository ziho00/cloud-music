import Vue from "vue"
import Vuex from "vuex"
import * as actions from "./action"
import state from "./state"
import mutations from "./mutations"
import getters from "./getters"
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters
})
