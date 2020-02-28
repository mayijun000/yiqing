<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">备注信息列表</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 备注信息列表
			</view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="20" bottom="0" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) in dataList" :key="index">
					<view class="content padding-tb-sm">
						<view class="text-pink">标题: {{item.title}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>内容: {{item.content}}
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>备注: {{item.remark}}
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) in addList" :key="index">
					<view class="content padding-tb-sm">
						<view class="text-pink">标题: {{item.title}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>内容: {{item.content}}
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>备注: {{item.remark}}
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _this;
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			MescrollBody
		},
		data() {
			return {
				page:1,
				downOption:{
					auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
				},
				addList:[],//新增微博
				dataList: [], // 数据列表
			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			//this.load(1);
		},
		methods: {
			load: function(type) {
				this.$cloud.callFunction({
					name: 'mark-list',
					data: {
						token: uni.getStorageSync('token'),
						page: this.page,
						pageSize: 10
					}
				}).then((res) => {
					if (res.result.code === 0) {
						if (res.result.data.length == 0) {
							return;
						} else {
							let list = res.result.data;
							if(type == 1){
								_this.mescroll.endSuccess();
								_this.dataList = list;
								_this.addList = [];
							}else{
								_this.mescroll.endSuccess(list.length);
								_this.addList = _this.addList.concat(list);
								console.log("#####"+_this.addList)
							}
						}
					}else if (res.result.code === -3) {
						// 登陆无效
						uni.showModal({
						  content: "登陆状态无效",
						  showCancel: false,
						  complete: () => {
							uni.navigateTo({
							  url: "/pages/login/login"
							});
						  }
						});
						return;
				    } else {
						return Promise.reject(new Error(res.result.msg))
					}

				}).catch((err) => {
					uni.hideLoading()
					//联网失败, 结束加载
					this.mescroll.endErr();
				})

			},
			/*下拉刷新的回调 */
			downCallback(){
				this.load(1);
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//分页数据page.size
				this.page = page.num;
				this.load(2);
			}
		}
	}
</script>

<style>

</style>
