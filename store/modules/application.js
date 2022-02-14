const state = {
  semesterIds: [],
  showBindMember: false,
  systemInfo: {}
}

const mutations = {

  UPDATE_SEMESTERIDS (state, data) {
    state.semesterIds = data
  },

  UPDATE_SHOWBINDMEMBER (state, data) {
    state.showBindMember = data
  },

  UPDATE_SYSTEMINFO (state, data) {
    state.systemInfo = data
  }
}

export default {
  state,
  mutations
}
