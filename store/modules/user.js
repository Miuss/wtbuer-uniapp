const state = {
  user: {},
  token: '',
  authenticated: false
}

const mutations = {
  UPDATE_USER (state, data) {
    state.user = data
    state.token = data.token
    state.authenticated = true
  },

  UPDATE_TOKEN (state, data) {
    state.token = data
    state.authenticated = true
  },

  CLEAR_USER (state) {
    state.user = {
		addtime: '',
		avatarurl: '',
		eamsinfo: '',
		id: '',
		member_id: '',
		member_password: '',
		nickname: '',
		openid: '',
		token: ''
	}
    state.token = ''
    state.authenticated = false
  }

}

export default {
  state,
  mutations
}
