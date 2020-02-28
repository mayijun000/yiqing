<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">备注信息登记</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input v-model="title" placeholder="请输入标题" name="input"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">内容</view>
				<textarea maxlength="-1" @input="textareaBInput" placeholder="内容"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" @input="remarkInput" placeholder="备注"></textarea>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button @click="addRemark" class="cu-btn bg-blue margin-tb-sm lg">提交</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				content:"",
				remark:"",
				operator_username: ''
			}
		},
		onLoad(e) {
			this.operator_username = e.id;
			console.log(this.operator_username);
		},
		methods: {
			textareaBInput(e) {
				this.content = e.detail.value
			},
			remarkInput(e) {
				this.remark = e.detail.value
			},
			addRemark(){
				let that = this;
				uni.showLoading({
					title: '提交中...'
				})
				this.$cloud.callFunction({
					name: 'add-remark',
					data: {
						title:that.title,
						content:that.content,
						remark:that.remark,
						token: uni.getStorageSync('token'),
						operator_username:that.operator_username
					}
				}).then((res) => {
					uni.hideLoading()
					if (res.result.code === 0) {
						uni.showModal({
							content: '信息上传完成',
							showCancel: false,
							success() {
								uni.redirectTo({
									url: '/pages/tabbar/remark-list'
								})
							}
						});
					} else if (res.result.errCode === 'TOKEN_INVALID') {
						uni.showModal({
							content: '登录状态无效，请重新登录',
							showCancel: false,
							success() {
								uni.redirectTo({
									url: '/pages/login/login'
								})
							}
						})
					} else {
						return Promise.reject(new Error(res.result.msg))
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: err.message || '记录添加失败',
						showCancel: false
					})
				})
			}
			
		}
	}
</script>

<style>
</style>
