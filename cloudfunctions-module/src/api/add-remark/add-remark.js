'use strict';
const {
	validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database()
const defaultRemarkInfo = {
	title:"",
	content:"",
	remark:""
}

exports.main = async (event = {}, context) => {
	let operator_username = event.operator_username

	if (!operator_username) {
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
		operator_username = validateResult.username
	} else {
		const userCollection = db.collection('user')
		let checkOperatorResult = await userCollection.where({
			username: operator_username
		}).get()
		if (checkOperatorResult.data && checkOperatorResult.data.length === 0) {
			return {
				code: -4,
				errCode: 'OPERATOR_ID_INVALID',
				msg: '操作员信息无效，请重新扫码录入'
			}
		}
	}

	const currentTime = new Date().toISOString()

	if (event.check_in_time) {
		event.check_in_time = new Date(event.check_in_time).toISOString()
	}

	if (event.body_status && event.body_status.time) {
		event.body_status.time = new Date(event.body_status.time).toISOString()
	}

	
	const remarkCollection = db.collection('remark')

	const remarkInfo = {}
	const title = event.title;

	// remark
	Object.keys(defaultRemarkInfo).forEach(key => {
		if (key in event && event[key] !== '') {
			remarkInfo[key] = event[key]
		}
	})
	remarkInfo.operator_username = operator_username
	remarkInfo.create_time = currentTime

	if (!remarkInfo.title) {
		return {
			code: -1,
			msg: '标题不能为空'
		}
	}
	if (!remarkInfo.content) {
		return {
			code: -1,
			msg: '内容不能为空'
		}
	}

	// 没有事务，无法回滚。只能一步到底

	try {
		const remarkInDb = await remarkCollection.where({
			title
		}).get()

		let remarkUpdateResult,
			remark_id
		if (remarkInDb.data && remarkInDb.data.length === 0) {
			remarkUpdateResult = await remarkCollection.add(remarkInfo)
			remark_id = remarkUpdateResult.id
		} else {
			remarkUpdateResult = await memberCollection.doc(remarkInDb.data[0]._id).update(memberInfo)
			remark_id = memberInDb.data[0]._id
		}

		return {
			code: 0,
			msg: '记录添加成功'
		}
	} catch (e) {
		return {
			code: -2,
			msg: '记录添加失败'
		}
	}
};
