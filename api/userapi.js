import { request } from '../utils/fetch'

export const login = async function (code, userInfo) {
  try {
    const res = await request({
      url: '/user/login',
      method: 'POST',
      data: {
        code: code,
        userInfo: JSON.stringify(userInfo)
      }
    })

    return res
  } catch (err) {
    throw err
  }
}

export const bindEamsMember = async function (username, password) {
  try {
    const res = await request({
      url: '/user/bindEamsMember',
      method: 'POST',
      data: {
        username,
        password
      }
    })

    return res
  } catch (err) {
    throw err
  }
}

export const getUserInfo = async function () {
  try {
    const res = await request({
      url: '/user/getUserInfo',
      method: 'GET'
    })

    return res
  } catch (err) {
    throw err
  }
}

export const checkUserToken = async function () {
  try {
    const res = await request({
      url: '/user/checkToken',
      method: 'GET'
    })

    return res
  } catch (err) {
    throw err
  }
}
