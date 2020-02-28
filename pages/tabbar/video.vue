<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">视频演示</block>
		</cu-custom>
		<view>
			<!-- #ifdef H5 -->
			<video style="width:100vw" id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
				@error="videoErrorCallback" controls>
			</video>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<video style="width:100vw" id="myVideo" src="http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8"
				@error="videoErrorCallback" controls>
			</video>
			<!-- #endif -->
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> app使用的直播视频源，h5使用的是mp4视频源
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 视频演示目前使用video，app支持直播，h5不支持
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 真正实现有其他方案，可以同时支持直播
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(e) {
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
