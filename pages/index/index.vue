<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.redirectTo({
				url: '/pages/login/login'
			})
			// const token = uni.getStorageSync('token')
			// if (token) {
			// 	uni.switchTab({
			// 		url: '/pages/tabbar/search'
			// 	})
			// } else {
			// 	uni.redirectTo({
			// 		url: '/pages/login/login'
			// 	})
			// }
		}
	}
</script>

<style>

</style>
