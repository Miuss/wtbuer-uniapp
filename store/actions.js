import * as api from '@/api'
import {
	showToast
} from '@/utils'

export const login = async ({
	commit
}, {
	code,
	userInfo
}) => {
	try {
		const res = await api.login(code, userInfo)

		if (!res.code) {
			commit('UPDATE_USER', res.data)
			wx.setStorageSync('token', res.data.token)
			wx.redirectTo({
				url: '/pages/index/index'
			})
		} else {
			throw new Error('服务器处理错误，请重试')
		}
	} catch (err) {
		console.error(err)
		showToast(err)
	}
}

export const checkToken = async ({
	commit
}) => {
	try {
		const res = await api.checkUserToken()

		if (res.code) {
			wx.redirectTo({
				url: '/pages/login/login'
			})
			commit('CLEAR_USER')
			wx.removeStorageSync('token')
		}
	} catch (err) {
		console.error(err)
		showToast(err)
	}
}

export const getUserInfo = async ({
	commit,
	state
}) => {
	if (!state.user.authenticated) {
		return
	}

	try {
		const res = await api.getUserInfo()
		if (!res.code) {
			commit('UPDATE_USER', res.data)
		}
	} catch (err) {
		console.error(err)
		showToast(err)
	}
}

export const fetchParams = async ({
	commit
}) => {
	try {
		const res = await api.getSemesterId()
		console.log(res)

		commit('UPDATE_SEMESTERIDS', res.data)

		return res
	} catch (err) {
		console.error(err)
		showToast(err)
	}
}

export const getCourseList = async ({
	commit
}, ids) => {
	wx.showLoading({
		title: '课表载入中',
		mask: true
	})

	try {
		const res = await api.getCourseList(ids.id)

		commit('UPDATE_COURSELIST', res.data)
		commit('UPDATE_COURSEIDS', ids)
		wx.setStorageSync('courseList', res.data)
		wx.setStorageSync('courseIds', ids)
	} catch (err) {
		console.error(err)
		showToast(err)
	} finally {
		wx.hideLoading()
	}
}

export const showBindMember = async ({
	commit
}, show) => {
	commit('UPDATE_SHOWBINDMEMBER', show)
}

export const bindEamsMember = async ({
	commit,
	getters,
	dispatch
}, {
	username,
	password
}) => {
	wx.showLoading({
		title: '绑定中',
		mask: true
	})
	let success = false
	try {
		const res = await api.bindEamsMember(username, password)
		console.log(res)
		if (res.code) {
			throw new Error(res.msg)
		}
		const user = Object.assign({}, getters.user)
		success = true
		user.member_id = username
		user.member_password = password
		commit('UPDATE_USER', user)
		dispatch('showBindMember', false)
	} catch (err) {
		wx.showToast({
			icon: 'none',
			title: `${err}`
		})
	} finally {
		wx.hideLoading()
		if (success) {
			wx.showToast({
				icon: 'success',
				title: '绑定成功'
			})
			dispatch('getUserInfo')
		}
	}
}

export const unbindEamsMember = async ({
	commit,
	getters,
	dispatch
}) => {
	wx.showLoading({
		title: '解绑中',
		mask: true
	})
	try {
		const res = await api.unbindEamsMember()

		if (res.code) {
			throw new Error(res.msg)
		}
		const user = {
			...getters.user,
			member_id: "",
			member_password: ""
		}
		commit('UPDATE_USER', user)
		dispatch('showBindMember', false)
	} catch (err) {
		console.error(err)
		showToast(err)
	} finally {
		wx.hideLoading()
	}
}
