import { request } from '../utils/fetch'

export const getCourseList = async function (semesterid) {
  try {
    const res = await request({
      url: `/eams/getCourseList?semesterid=${semesterid}`,
      method: 'GET'
    })

    return res
  } catch (err) {
    throw err
  }
}

export const getSemesterId = async function () {
  try {
    const res = await request({
      url: '/eams/getSemesterId',
      method: 'GET'
    })

    return res
  } catch (err) {
    throw err
  }
}

export const getExamList = async function (semesterid) {
  try {
    const res = await request({
      url: `/eams/getExamList?semesterid=${semesterid}`,
      method: 'GET'
    })

    return res
  } catch (err) {
    throw err
  }
}

export const getExamScore = async function (semesterid) {
  try {
    const res = await request({
      url: `/eams/getExamScore?semesterid=${semesterid}`,
      method: 'GET'
    })

    return res
  } catch (err) {
    throw err
  }
}