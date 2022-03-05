import * as utils from '../utils'
import store from '../store'

/* 封装微信请求 */
export async function request(obj) {
	const token = store.state.user.token

	let Authorization = ''

	if (token !== '' && token !== undefined) {
		Authorization = {
			'Authorization': 'Bearer ' + token
		}
	}

	return new Promise((resolve, reject) => {
		wx.request({
			url: `${utils.api}${obj.url}`,
			data: obj.data,
			method: obj.method,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...Authorization,
				...obj.header
			},

			success(res) {
				// 处理返回信息
				handleResult(res)

				resolve(res.data)
			},

			fail(e) {
				reject(e)
			}

		})
	})
}

/* 微信获取用户信息 */
export async function getUserProfile() {
	return new Promise((resolve, reject) => {
		wx.getUserProfile({
			desc: '用于登录更新用户信息数据',
			success: (res) => {
				resolve(res)
			},
			fail(e) {
				reject(e)
			}
		})
	})
}

/* 微信登录 */
export async function wxlogin() {
	return new Promise((resolve, reject) => {
		wx.login({
			success: (res) => {
				resolve(res)
			},
			fail(e) {
				reject(e)
			}
		})
	})
}

/**
 * 处理code信息
 * @param res
 */
function handleResult(res) {
	let code = res.statusCode
	switch (code) {
		case 200:
			break
		case 401:
			utils.showToast('身份校验信息失败，请刷新页面重试！')
			store.commit('CLEAR_USER')
			break
		default:
			let msg = res.data.message ? res.data.message : '未知错误，请重试！'
			utils.showToast(msg)
	}
}
