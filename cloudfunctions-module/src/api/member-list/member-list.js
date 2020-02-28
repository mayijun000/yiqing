'use strict';
const {
	validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database()
exports.main = async (event = {}, context) => {
	let validateResult
	try {
		validateResult = await validateToken(event.token)
	} catch (e) {
		//TODO handle the exception
		return {
			code: -3,
			errCode: 'TOKEN_INVALID',
			msg: '登录状态无效，请重新登录'
		}
	}

	if (validateResult.code !== 0) {
		return {
			code: -3,
			errCode: 'TOKEN_INVALID',
			msg: '登录状态无效，请重新登录'
		}
	}

	const length = Number(event.length) || 10
	const page = Number(event.page) || 0
	const options = {} 
	// validateResult.username === 'admin' ? {} : {
	// 	operator_username: validateResult.username
	// }
	const result = await db.collection('remark').aggregate().match(options).sort({
		create_time: -1
	}).skip(length * page).limit(length).lookup({
		from: 'remark',
		localField: 'remark_id',
		foreignField: '_id',
		as: 'remark',
	}).end();
	const data = []
	if (result.data.length) {
		result.data.forEach(s => {
			if (s.remark && s.remark.length > 0) {
				Object.keys(s.remark[0]).forEach(key => {
					if (key !== '_id') {
						s[key] = s.remark[0][key]
					}
				})
			}
			s.list_id = s._id;
			data.push(s)
		});
	}
	return {
		code: 0,
		data,
		msg: 'ok'
	}
};
