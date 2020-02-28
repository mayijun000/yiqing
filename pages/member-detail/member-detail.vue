<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">出入人员登记系统</block>
		</cu-custom>
		<view v-if="showxg==0">参数传递错误</view>
		<view class="ryxq" v-if="showxq!=0">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 最后更新：{{ryinfo.create_time|formatTime}}
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text>人员信息
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>姓名</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo['name']}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>性别</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.sex|sex}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>是否本地户籍</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.native|boolean}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>年龄</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.age|age}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>证件类型</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.id_type|idType}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>证件号码</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.id_card||'未知'}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>联系电话</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.phone}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text>来源地信息
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>是否来自湖北</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.from_hb.addressStr|boolean}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>出行方式</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.traffic.type|trafficType}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>车牌或列车号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.traffic.car_plate||'未知'}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>来源地区</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.from_address.addressStr||'未知'}}</text>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text>健康状况
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-tagfill text-blue"></text>
						<text>体温</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{ryinfo.temperature}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		trafficType,
		bodyStatus
	} from "@/common/name.js"
	export default {
		data() {
			return {
				ryinfo: {
					body_status: {},
					traffic: {},
					contact_virus: {},
					contact_like_virus: {},
					contact_like_virus_region: {},
					access: {},
					from_address:{}
				},
				showxg: 1,
				showxq: 1
			}
		},
		filters: {
			age(val) {
				return val ? `${val}岁` : '未知'
			},
			idType(val) {
				return (['身份证', '护照'])[val] || '未知'
			},
			boolean(val) {
				return (['否', '是'])[val] || '未知'
			},
			trafficType(val) {
				return (trafficType)[val] || '未知'
			},
			bodyStatus(val) {
				return (bodyStatus)[val] || '未知'
			},
			formatTime(val) {
				if (!val) {
					return '无'
				}
				const date = new Date(val)
				return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`
			},
			sex(val) {
				return (['女', '男'])[Number(val) % 2] || '未知'
			}
		},
		onLoad({
			item
		} = {}) {
			try {
				const ryinfo = Object.assign(this.ryinfo, JSON.parse(decodeURIComponent(item)))
				if (!ryinfo.list_id) {
					this.loadData(ryinfo._id)
				}
			} catch (e) {
				console.error(e)
			}
		},
		methods: {
			loadData(id) {
				uni.showLoading({
					title: "加载中..."
				});

				this.$cloud.callFunction({
					name: 'member-detail',
					data: {
						token: uni.getStorageSync('token'),
						id
					}
				}).then(({
					result
				}) => {
					uni.hideLoading()
					console.log(result)
                    if (result.code === -3) {// 登陆无效
                      uni.showModal({
                        content: "登陆状态无效",
                        showCancel: false,
                        complete: () => {
                          uni.redirectTo({
                              url:"/pages/login/login"
                          })
                        }
                      })
                      return;
                    }
					if (result.code !== 0) {
						uni.showToast({
							icon: 'none',
							title: result.msg
						})
						return
					}
					const info = result.data
					Object.keys(info).forEach(key => {
						if (key !== '_id') {
							this.ryinfo[key] = info[key]
						}
					})
					console.log("#########"+this.ryinfo)
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '数据加载失败'
					})
				})
			}
		}
	}
</script>

<style>
	page {
		background: #ffffff;
	}

	.ryxq {
		display: flex;
		width: 750upx;
		/* height: 100%; */
		background: #ffffff;

		/* position: fixed;
		z-index: 99;
		margin-top: 0upx;
		top: 0upx; */
		flex-direction: column;
		overflow: auto;

	}

	.xq-list {

		flex-direction: row;
		font-size: 30upx;
		line-height: 60upx;
		flex-wrap: wrap;
		margin-top: 20upx;
		height: auto;
		margin-bottom: 20upx;
	}

	.items {
		float: left;
		overflow: hidden;
		background: #efefef;
		height: 50upx;
		line-height: 50upx;
		margin: 20upx 20upx 0upx 20upx;
		padding: 5upx 15upx 5upx 15upx;
		border-radius: 20upx;

	}

	.xq-title {

		padding: 20upx;
		border-bottom: #cccccc 2upx solid;
	}
</style>
