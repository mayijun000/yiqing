'use strict';
const {
	validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database();
exports.main = async (event = {}, context) => {
	let validateResult;
	try {
		validateResult = await validateToken$1(event.token);
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

	const pageSize = Number(event.pageSize) || 10;
	const page = Number(event.page) || 0;
	const result = await db.collection('remark').aggregate().sort({
		create_time: -1
	}).skip((page - 1) * pageSize).limit(pageSize).end();
	return {
		code: 0,
		data: result.data,
		msg: 'ok'
	}
};

