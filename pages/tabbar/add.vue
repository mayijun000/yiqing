<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">出入人员登记</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="cuIcon-titles text-orange"></text> 人员信息
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input v-model="name" placeholder="请输入人员姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">证件类型</view>
				<picker @change="idTypeChange" :value="id_type" :range="idTypeList">
					<view class="picker">
						{{id_type>-1?idTypeList[id_type]:'请选择证件类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">证件号码</view>
				<input v-model="id_card" placeholder="请输入证件号码" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">年龄</view>
				<input :value="age" placeholder="请输入年龄" name="input"></input>
			</view>
			<radio-group class="block" @change="sexChange">
				<view class="cu-form-group">
					<view class="title">性别</view>
					<view>
						男<radio style="margin: 10upx;" class='blue' :class="sex=='1'?'checked':''" :checked="sex=='1'?true:false" value="1"></radio>
						女<radio style="margin: 10upx;" class='blue' :class="sex=='0'?'checked':''" :checked="sex=='0'?true:false" value="0"></radio>
					</view>
				</view>
			</radio-group>
			<radio-group class="block" @change="nativeChange">
			<view class="cu-form-group">
				<view class="title">是否本地户籍</view>
				<view>
					是<radio style="margin: 10upx;" class='blue' :class="native=='1'?'checked':''" :checked="native=='1'?true:false" value="1"></radio>
					否<radio style="margin: 10upx;" class='blue' :class="native=='0'?'checked':''" :checked="native=='0'?true:false" value="0"></radio>
				</view>
			</view>
			</radio-group>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input v-model="phone" placeholder="请输入联系电话" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="cuIcon-titles text-orange"></text> 来源地信息
				</view>
			</view>
			<radio-group class="block" @change="fromHbChange">
				<view class="cu-form-group">
					<view class="title">是否来自湖北</view>
					<view>
						是<radio style="margin: 10upx;" class='blue' :class="from_hb=='1'?'checked':''" :checked="from_hb=='1'?true:false" value="1"></radio>
						否<radio style="margin: 10upx;" class='blue' :class="from_hb=='0'?'checked':''" :checked="from_hb=='0'?true:false" value="0"></radio>
					</view>
				</view>
			</radio-group>
			<view class="cu-form-group">
				<view class="title">来源地区</view>
				<input @click="showCityPicker('from_address')" disabled="disabled" placeholder="请输入地址" :value="from_address.addressStr" />
			</view>
			<radio-group class="block" @change="trafficTypeChange">
				<view class="cu-form-group">
					<view class="title">出行方式</view>
					<view>
						火车<radio style="margin:0 10upx;" class='blue' :class="traffic.type=='0'?'checked':''" :checked="traffic.type=='0'?true:false" value="0"></radio>
						自驾<radio style="margin:0 10upx;" class='blue' :class="traffic.type=='1'?'checked':''" :checked="traffic.type=='1'?true:false" value="1"></radio>
						汽车<radio style="margin:0 10upx;" class='blue' :class="traffic.type=='2'?'checked':''" :checked="traffic.type=='2'?true:false" value="2"></radio>
						飞机<radio style="margin:0 10upx;" class='blue' :class="traffic.type=='3'?'checked':''" :checked="traffic.type=='3'?true:false" value="3"></radio>
					</view>
				</view>
			</radio-group>
			<view class="cu-form-group">
				<view class="title">到达日期</view>
				<picker mode="date" :value="checkInTimeStr" @change="checkInTimeChange">
					<view class="picker">
						{{checkInTimeStr}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">交通工具信息</view>
				<input v-model="traffic.car_plate" placeholder="请务必输入正确的信息" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="cuIcon-titles text-orange"></text> 健康状况
				</view>
			</view>
			<radio-group class="block" @change="bodyStatusChange">
				<view class="cu-form-group">
					<view class="title">身体状况</view>
					<view>
						正常<radio style="margin:0 10upx;" class='blue' :class="body_status.status=='0'?'checked':''" :checked="body_status.status=='0'?true:false" value="0"></radio>
						发烧<radio style="margin:0 10upx;" class='blue' :class="body_status.status=='1'?'checked':''" :checked="body_status.status=='1'?true:false" value="1"></radio>	
						疑似<radio style="margin:0 10upx;" class='blue' :class="body_status.status=='2'?'checked':''" :checked="body_status.status=='2'?true:false" value="2"></radio>
					</view>
				</view>
			</radio-group>
			<view class="cu-form-group">
				<view class="title">记录时间</view>
				<picker mode="date" :value="bodyStatusDate" @change="bodyStatusDateChange">
					<view class="picker">
						{{bodyStatusDate}}
					</view>
				</picker>
				<picker mode="time" :value="bodyStatusTime" @change="bodyStatusTimeChange">
					<view class="picker">
						{{bodyStatusTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">体温</view>
				<input v-model="temperature" placeholder="请务必输入正确的信息" name="input"></input>
			</view>
		</form>


		<view class="padding flex flex-direction">
			<button @click="submit" class="cu-btn bg-blue margin-tb-sm lg">提交信息</button>
		</view>

		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onCityConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		checkPhone,
		checkIDCard
	} from '@/common/util.js';
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				data: [],
				cityPickerValueDefault: [0, 0, 1],
				name: '',
				idTypeList: ['身份证','护照'],
				id_type: -1,
				id_card: '',
				isCn: false,
				age: 0,
				sex: -1,
				native: 2,
				phone: '',
				from_hb: 0,
				from_wh: 0,
				from_address: {
					addressStr: '',
					street: ''
				},
				traffic: {
					type: -1
				},
				check_in_address: {
					addressStr: '',
					street: ''
				},
				checkInTimeStr: "请选择",
				body_status: {
					status: '0',
					time: Date.now()
				},
				bodyStatusDate: '请选择日期',
				bodyStatusTime: '请选择时间',
				temperature: 36.5,
				contact_virus: {
					status: '',
					name: '',
					contact: ''
				},
				contact_like_virus: {
					status: '',
					name: '',
					contact: ''
				},
				contact_like_virus_region: {
					status: '',
					name: '',
					contact: ''
				},
				comment: '',
				operator_username: ''
			}
		},
		computed: {
			check_in_time: function() {
				return new Date(this.checkInTimeStr).getTime()
			}
		},
		watch: {
			bodyStatusDate() {
				this.getBodyStatusTimeStamp()
			},
			bodyStatusTime() {
				this.getBodyStatusTimeStamp()
			},
			id_type() {
				this.parseIdCard()
			},
			id_card() {
				this.parseIdCard()
			},
		},
		onLoad(e) {
			this.init()
			this.operator_username = e.id
			if (this.operator_username) {
				uni.hideTabBar({
					animation: false
				})
			} else {
				//非管理员登录时加载之前的填写信息
				var memberInfo = uni.getStorageSync('memberInfo');
				if (memberInfo) {
					this.id_type = memberInfo.id_type;
					this.id_card = memberInfo.id_card;
					this.name = memberInfo.name;
					this.phone = memberInfo.phone;
					this.age = memberInfo.age;
					this.sex = memberInfo.sex;
					this.native = memberInfo.native;
				}

			}
		},
		methods: {
			init() {
				let that = this;
				this.$cloud.callFunction({
					name: "get-data",
					data: {}
				}).then((res) => {
					if (res.result.code === 0) {
						that.data = res.result.data || [];
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
				    }else {
						return Promise.reject(new Error(res.result.msg))
					}
				});
			},
			parseIdCard() {
				if (this.id_type == 0) {
					this.isCn = /[^\w\.\/]/.test(this.id_card)
					if (this.id_card.length == 18) {
						let year = parseInt(this.id_card.substr(6, 4));
						let mark = parseInt(this.id_card.substr(16, 1));
						if (!isNaN(year)) {
							this.age = new Date().getFullYear() - year;
						}
						if (!isNaN(mark)) {
							this.sex = mark % 2
						}
						console.log(this.sex);
					}
				}
			},
			idTypeChange(e) {
				this.id_type = e.detail.value
			},
			ageChange(e) {
				this.age = e.detail.value
			},
			sexChange(e) {
				this.sex = e.detail.value
			},
			nativeChange(e) {
				this.native = e.detail.value
			},
			fromHbChange(e) {
				this.from_hb = e.detail.value
			},
			fromWhChange(e) {
				this.from_wh = e.detail.value
			},
			trafficTypeChange(e) {
				this.traffic.type = e.detail.value
			},
			showCityPicker(segment) {
				this.tempPickerSegment = segment
				this.$refs.mpvueCityPicker.show();
			},
			onCityConfirm(e) {
				let addressParam = this[this.tempPickerSegment]
				addressParam.province = e.value[0]
				addressParam.city = e.value[1]
				addressParam.district = e.value[2]
				addressParam.addressStr = e.label
			},
			checkInTimeChange(e) {
				this.checkInTimeStr = e.detail.value
			},
			bodyStatusChange(e) {
				this.body_status.status = e.detail.value
			},
			bodyStatusDateChange(e) {
				this.bodyStatusDate = e.detail.value
			},
			bodyStatusTimeChange(e) {
				this.bodyStatusTime = e.detail.value
			},
			getBodyStatusTimeStamp() {
				if (this.bodyStatusDate && this.bodyStatusTime) {
					this.body_status.time = new Date(this.bodyStatusDate + ' ' + this.bodyStatusTime).getTime()
				} else {
					this.body_status.time = 0
				}
			},
			temperatureChange(e) {
				this.temperature = e.detail.value
			},
			contactVirusChange(e) {
				this.contact_virus.status = e.detail.value
			},
			contactLikeChange(e) {
				this.contact_like_virus.status = e.detail.value
			},
			contactVirusRegionChange(e) {
				this.contact_like_virus_region.status = e.detail.value
			},
			submit() {
				let _this = this;
				if (!this.name) {
					uni.showModal({
						content: '请填写人员姓名',
						showCancel: false
					})
					return false
				}
				if (!this.phone) {
					uni.showModal({
						content: '请填写人员手机号',
						showCancel: false
					})
					return false
				}
				if (!checkPhone(this.phone)) {
					uni.showModal({
						content: '请检查手机号',
						showCancel: false
					})
					return false
				}
				if (this.id_type == 0 && this.id_card && !checkIDCard(this.id_card)) {
					uni.showModal({
						content: '请检查身份证号',
						showCancel: false
					})
					return false
				}
				const {
					id_type,
					id_card,
					name,
					phone,
					age,
					sex,
					native,
					from_address,
					from_hb,
					from_wh,
					traffic,
					temperature,
					check_in_address,
					check_in_time,
					body_status,
					contact_virus,
					contact_like_virus,
					contact_like_virus_region,
					comment,
					operator_username
					
				} = this
				uni.showLoading({
					title: '上传中...'
				})
				let is_danger = false
				if (this.data.length === 0) {
					// 第一次没获取到，再获取一次
					this.init()
				}
				if (this.data.length === 0) {
					// 再次获取还是没有获取到给提示
					uni.hideLoading()
					uni.showModal({
						content: '请重新提交',
						showCancel: false
					})
					return;
				}
				if (this.data.length > 0 && traffic.car_plate && check_in_time) {
					const findData = this.data.find(val => {
						return (
							val.t_no
							.toUpperCase()
							.includes(traffic.car_plate.toUpperCase()) &&
							val.t_date.includes(new Date(check_in_time).toISOString().substring(0, 10) || "")
						);
					});
					is_danger = !!findData;
				}
				this.$cloud.callFunction({
					name: 'add-member',
					data: {
						is_danger,
						id_type,
						id_card,
						name,
						phone,
						age,
						sex,
						native,
						from_address,
						from_hb,
						from_wh,
						traffic,
						temperature,
						check_in_address,
						check_in_time,
						body_status,
						contact_virus,
						contact_like_virus,
						contact_like_virus_region,
						comment,
						token: uni.getStorageSync('token'),
						operator_username
					}
				}).then((res) => {
					uni.hideLoading()
					if (res.result.code === 0) {
						uni.showModal({
							content: '信息上传完成，请勿重复提交',
							showCancel: false
						});
						if (_this.operator_username) {
							//缓存用户信息，减少重复填写
							uni.setStorageSync('memberInfo', {
								id_type,
								id_card,
								name,
								phone,
								age,
								sex,
								native
							})
						}
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
