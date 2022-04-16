import { request, uploadFile } from '../utils/fetch'

/**
 * @param {Object} page 页数
 * @param {Object} pagenum 每页数据条数
 */
export const getNotices = async function (page,pagenum) {
  try {
    const res = await request({
      url: `/system/getNotices?page=${page}&pagenum=${pagenum}`,
      method: 'GET'
    })
    return res
  } catch (err) {
    throw err
  }
}

/**
 * @param {Object} filePath
 */
export const uploadPic = async function (filePath) {
	try {
		const res = await uploadFile({
			url: '/system/update-pic',
			filePath: filePath
		})
		return res
	} catch (err) {
		throw err
	}
}