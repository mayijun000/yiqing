<template>
	<view>
		<view class="UCenter-bg">
		  <image src="/static/logo1.png" class="png" mode="widthFix"></image>
		  <view class="text-xl">出入人员信息登记
		    <text class="text-df">v1.0</text>
		  </view>
		  <view class="margin-top-sm">
		    <text>By:中国系统</text>
		  </view>
		  <image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input v-model="username" placeholder="请输入用户名" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">  密码</view>
				<input v-model="password" placeholder="请输入密码" name="input"></input>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button @click="login" class="cu-btn bg-blue margin-tb-sm lg">登录</button>
		</view>
	</view>
</template>

<script>
	let _self;
	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		methods: {
			login() {
				const {
					username,
					password
				} = this
				if (!username) {
					uni.showModal({
						content: '请填写手机号码',
						showCancel: false
					})
					return
				}
				if (!password) {
					uni.showModal({
						content: '请填写手机号码',
						showCancel: false
					})
					return
				}
				uni.showLoading({
					title: '登录中...'
				})
				this.$cloud.callFunction({
					name: 'login',
					data: {
						username,
						password,
					}
				}).then((res) => {
					uni.hideLoading()
					if (res.result.token) {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						uni.setStorageSync('token', res.result.token)
						uni.setStorageSync('username', res.result.username)
						uni.switchTab({
							url: '/pages/tabbar/search'
						})
					} else {
						return Promise.reject(new Error(res.result.msg))
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: err.message || '登录失败',
						showCancel: false
					})
				})
			}
		}
	}
</script>

<style scoped>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.UCenter-bg {
	  background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
	  background-size: cover;
	  height: 550upx;
	  display: flex;
	  justify-content: center;
	  padding-top: 40upx;
	  overflow: hidden;
	  position: relative;
	  flex-direction: column;
	  align-items: center;
	  color: #fff;
	  font-weight: 300;
	  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}
	
	.UCenter-bg text {
	  opacity: 0.8;
	}
	
	.UCenter-bg image {
	  width: 200upx;
	  height: 200upx;
	}
	
	.UCenter-bg .gif-wave{
	  position: absolute;
	  width: 100%;
	  bottom: 0;
	  left: 0;
	  z-index: 99;
	  mix-blend-mode: screen;  
	  height: 100upx;   
	}
</style>
