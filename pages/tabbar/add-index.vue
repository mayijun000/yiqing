<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">综合</block>
		</cu-custom>
		<uni-list>
			<uni-list-item class="imgClinet" title="人员出入登记" thumb="/static/tab-icon/plus-on.png" @click="toAdd()"></uni-list-item>
			<uni-list-item class="imgClinet" title="登记信息列表" thumb="/static/tab-icon/list-on.png" @click="toMemberList()"></uni-list-item>
			<uni-list-item class="imgClinet" title="备注信息登记" thumb="/static/tab-icon/plus-on.png" @click="toRemark()"></uni-list-item>
			<uni-list-item class="imgClinet" title="备注信息列表" thumb="/static/tab-icon/list-on.png" @click="toRemarkList()"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(e) {
			this.operator_username = e.id;
			console.log(this.operator_username);
		},
		methods: {
			toAdd(){
				uni.navigateTo({
				  url: "/pages/tabbar/add"
				});
			},
			toRemark(){
				uni.navigateTo({
				  url: "/pages/tabbar/remark"
				});
			},
			toRemarkList(){
				uni.navigateTo({
				  url: "/pages/tabbar/remark-list"
				});
			},
			toMemberList(){
				uni.navigateTo({
				  url: "/pages/tabbar/member"
				});
			}
			
		}
	}
</script>

<style>

</style>
