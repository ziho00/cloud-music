import state from './state'

import {
  initTime
} from '@utils'

const getters = {
  curTime_m_s: function() {
    return initTime(state.currentTime)
  },
  totalTime_m_s: function() {
    return initTime(state.totalTime)
  }
}
export default getters
