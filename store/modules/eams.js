const state = {
  courseList: [],
  courseIds: {},
  courseUpdateTime: '',
  week: 1
}

const mutations = {
  UPDATE_COURSELIST (state, data) {
    state.courseList = data
  },

  UPDATE_COURSEIDS (state, data) {
    state.courseIds = data
  },
  
  UPDATE_COURSE_UPDATE_TIME (state, data) {
	state.courseUpdateTime = data
  },

  UPDATE_WEEK (state, data) {
    state.week = data
  },
  
  CLEAR_ALL(state){
	  state.courseIds = {}
	  state.courseList = []
	  state.courseUpdateTime = ''
  }

}

export default {
  state,
  mutations
}
