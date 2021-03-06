import {
	request
} from '../utils/fetch'
export const getDiscuss = async function(page, pagenum) {
	try {
		const res = await request({
			url: '/forum/getDiscussList',
			method: 'GET',
			data: {
				page,
				pagenum
			}
		})

		return res
	} catch (err) {
		throw err
	}
}
export const getThread = async function(page, pagenum, id) {
	try {
		const res = await request({
			url: '/forum/getThreadList',
			method: 'GET',
			data: {
				page,
				pagenum,
				id
			}
		})

		return res
	} catch (err) {
		throw err
	}
}
export const getFollowThread = async function(page, pagenum, id) {
	try {
		const res = await request({
			url: '/forum/getFollowThreadList',
			method: 'GET',
			data: {
				page,
				pagenum,
				id
			}
		})

		return res
	} catch (err) {
		throw err
	}
}
export const addThread = async function(content, tid, images) {
	try {
		const res = await request({
			url: '/forum/addThread',
			method: 'POST',
			data: {
				images,
				content,
				tid
			}
		})

		return res
	} catch (err) {
		throw err
	}
}
export const delThread = async function(tid) {
	try {
		const res = await request({
			url: '/forum/delThread',
			method: 'POST',
			data: {
				tid
			}
		})

		return res
	} catch (err) {
		throw err
	}
}
export const editThread = async function(name, content, tid) {
	try {
		const res = await request({
			url: '/forum/editThread',
			method: 'POST',
			data: {
				name,
				content,
				tid
			}
		})

		return res
	} catch (err) {
		throw err
	}
}
export const getThreadDetail = async function(id) {
	try {
		const res = await request({
			url: '/forum/getThreadDetail',
			method: 'GET',
			data: {
				id
			}
		})

		return res
	} catch (err) {
		throw err
	}
}

export const getCommentByTid = async function(id) {
	try {
		const res = await request({
			url: '/forum/getCommentByTid',
			method: 'GET',
			data: {
				id
			}
		})

		return res
	} catch (err) {
		throw err
	}
}

export const getCommentByCid = async function(id) {
	try {
		const res = await request({
			url: '/forum/getCommentByCid',
			method: 'GET',
			data: {
				id
			}
		})

		return res
	} catch (err) {
		throw err
	}
}

export const addComment = async function(content, tid, cid, images) {
	try {
		
		const res = await request({
			url: '/forum/addComment',
			method: 'POST',
			data: {
				images,
				content,
				tid,
				cid
			}
		})
		
		return res
	} catch (err) {
		throw err
	}
}
export const delComment = async function(cid) {
	try {
		const res = await request({
			url: '/forum/delComment',
			method: 'POST',
			data: {
				cid
			}
		})

		return res
	} catch (err) {
		throw err
	}
}

export const likeThreadById = async function (tid) {
	try {
		const res = await request({
			url: '/forum/likeThread',
			method: 'POST',
			data: {
				tid
			}
		})
		
		return res
	} catch (err) {
		throw err
	}
}