
import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from '@/store/getters'
import * as actions from '@/store/actions'
import user from '@/store/modules/user'
import application from '@/store/modules/application'
import eams from '@/store/modules/eams'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  modules: {
    user,
    application,
    eams
  }
})
