<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登记信息查询</block>
		</cu-custom>
		<view class="search uni-flex" style="align-items: center;margin-bottom:20upx;padding:20upx;background-color:#0A98D5;">
			<view class="uni-flex  bg-white" style="flex: 1;padding: 10upx 30upx;border-radius: 80upx;align-items: center;">
				<picker :range="searchType" @change="change">
					<view style="display: flex;align-items: center;">{{searchType[index]}}<text class="uni-icon uni-icon-arrowdown"
						 style="font-size: 16px;height: 16px;padding-left: 10upx;"></text></view>
				</picker>
				<input type="text" v-model="searchKey" :placeholder="'请输入搜索的'+searchType[index]" style="flex:1" @confirm="search"
				 v-if="index<2" />
				<view style="display: flex;align-items: center;flex: 1;" v-if="index==2">
					<input type="text" disabled="true" v-model="startDate" placeholder="开始日期" style="border-bottom: 1px solid #d1d1d1;padding-left: 10upx;"
					 @tap="openCalendar" />
					<text style="padding: 0 10px;">至</text>
					<input type="text" disabled="true" v-model="endDate" placeholder="结束日期" style="border-bottom: 1px solid #d1d1d1;padding-left: 10upx;"
					 @tap="openCalendar" />
				</view>
				<text class="uni-icon uni-icon-search" style="color: #999999;font-size: 24px;" @tap="search"></text>
			</view>

		</view>
		<uni-list>
			<uni-list-item v-for="(item,index) in list" :key="index" @click="openDetail(item)" :title="item.name" :note="dateUtils.format(item.create_time) + item.address"></uni-list-item>
		</uni-list>
		<view class="uni-flex" style="justify-content: center;padding: 10upx;">
			{{contentText[loadingType]}}
		</view>
		<uni-calendar ref="calendar" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate"
		 :endDate="info.endDate" :range="info.range" @confirm="confirm" />
	</view>
</template>

<script>
	import {
		dateUtils
	} from '@/common/util.js';
	var _this;
	export default {
		data() {
			return {
				searchKey: '',
				list: [],
				exportList: [],
				page: 1,
				loadingType: 0,
				index: 0,
				searchType: ['姓名', '手机', '日期'],
				showCalendar: false,
				startDate: '',
				endDate: '',
				info: {
					startDate: '2019-12-01',
					endDate: '2025-10-15',
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				contentText: ["上拉显示更多", "正在加载...", "没有更多数据了"],
				dateUtils: dateUtils

			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			this.reload();
		},
		onReachBottom() {
			this.page = this.page + 1;
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.load();
		},
		methods: {
			change: function(e) {
				this.index = e.detail.value;
				if (this.index == 2) {
					this.openCalendar();
				}
			},
			openCalendar: function() {
				this.$refs.calendar.open();
			},
			confirm: function(res) {
				this.startDate = res.range.data[0];
				this.endDate = res.range.data[res.range.data.length - 1];
				this.search();
			},
			search: function() {
				_this.reload();
			},
			load: function() {
				uni.showLoading();
				var startDate = '';
				var endDate = '';
				var name = '';
				var phone = '';
				if (this.index === 0) {
					name = this.searchKey;
				} else if (this.index === 1) {
					phone = this.searchKey;
				}
				if (this.startDate && this.startDate != '') {
					startDate = new Date(this.startDate + ' 00:00:00').toISOString();
					endDate = new Date(this.endDate + ' 23:59:59').toISOString();
				} else if (this.index === 2) {
					// 如果日期没选择成功就index就会走普通逻辑，就得把index还原
					this.index = 0
				}
				this.$cloud.callFunction({
					name: 'search',
					data: {
						token: uni.getStorageSync('token'),
						page: this.page,
						startDate: startDate,
						endDate: endDate,
						name: name,
						phone: phone,
						pageSize: 10
					}
				}).then((res) => {
					console.log('res', res)
					uni.hideLoading();
					if (res.result.code === 0) {
						if (res.result.data.length == 0) {
							this.loadingType = 2;
							return;
						} else {
							var list = [];
							res.result.data.forEach(s => {
								if (s.member && s.member.length > 0) {
									Object.keys(s.member[0]).forEach(key => {
										if (key !== '_id') {
											s[key] = s.member[0][key]
										}
									})
								}
								s.list_id = s._id;
								list.push(s)
							});
							_this.list = _this.list.concat(list);
							this.loadingType = 0;
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
					uni.showModal({
						content: err.message || '查询失败',
						showCancel: false
					})
				})

			},
			openDetail: function(item) {
				uni.navigateTo({
					url: `../member-detail/member-detail?item=${encodeURIComponent(
	    JSON.stringify(item)
	  )}`
				});
			},
			reload: function() {
				_this.page = 1;
				_this.loadingType = 0;
				_this.list = [];
				// _this.exportList = [];
				_this.load();
			},

		}
	}
</script>

<style>
	@import "../../common/uni.css";

	page {
		background-color: #EEEEEE;
	}

	.fixed {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.flex-sub {
		flex: 1;
	}

	.bg-white {
		background-color: white;
	}
</style>
