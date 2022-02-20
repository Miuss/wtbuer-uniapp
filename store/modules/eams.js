const state = {
  courseList: [],
  courseIds: {},
  week: 1
}

const mutations = {
  UPDATE_COURSELIST (state, data) {
    state.courseList = data
  },

  UPDATE_COURSEIDS (state, data) {
    state.courseIds = data
  },

  UPDATE_WEEK (state, data) {
    state.week = data
  },
  
  CLEAR_ALL(state){
	  state.courseIds = {},
	  state.courseList = []
  }

}

export default {
  state,
  mutations
}
