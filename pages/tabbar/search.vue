<template>
	<view v-if="yiQingObj">
		<image :src="setting.top_thumb ? setting.top_thumb : '../../static/banner2.jpg'" mode="widthFix" style="width: 100%;"></image>
		<view class="text-xs" style="position:absolute;top:10rpx;right:0;z-index:100000;background-color:rgba(255,255,255,.4);color:#fff;border-radius: 30rpx 0 0 30rpx;padding: 10rpx 20rpx;">
			使用人次：<text>{{setting.click}}</text>
		</view>
		<view class="cu-bar bg-white">
			<view class="action title-style-3">
				<text class="text-xl text-bold">最新疫情</text>
				<text class="text-Abc text-gray self-end margin-left-sm">截止：{{modifyTime}}</text>

			</view>
			<view class="">
				<text class="text-gray self-end margin-right-sm" @tap="showModal" data-target="shuoming">数据说明</text>
				<view class="cu-modal" :class="modalName=='shuoming'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<view class="text-xl margin-top-xl">
							疫情数据说明
						</view>
						<view class="text-left padding">
							<view>1. 数据来源： </view>
							<view>全部数据来源于国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据；</view>
							<view>2. 数据更新时间：</view>
							<view>实时更新全国及各省市区数据，因核实计算需求，会与官方的发布时间存在一定时间的延迟；</view>
							<view>3. 数据统计方法：</view>
							<view>a）每日上午优先将全国数据与国家卫健委公布数据保持一致（此时各省市数据尚未及时更新，会出现全国数据大于各省份合计数的情况）；</view>
							<view>b）当各省公布数据总和大于国家公布数据时，则全国数据直接切换为各省数据总和；</view>
							<view>c）全国数据含港澳台地区数据；</view>
							<view>4. 全国疫情状况中，除疑似病例数据以外，“较昨日+/-”的数据为“当前实时数据-昨日24小时内国家卫健委公布的官方数据” ；</view>
							<view>5. 疑似病例数据统计按日更新，仅同步全国总数，采用国家卫健委每日通报的数据，暂不呈现分省疑似病例；“较昨日+/-”数据来源于国家卫健委每日公布的新增疑似病例数据；</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<!-- <button class="cu-btn line-green text-green" @tap="hideModal">取消</button> -->
								<button class="cu-btn bg-green margin-left" @tap="hideModal">知道了</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grid col-4 text-center margin-tb-sm">
			<view class="padding-xs">
				<view class="padding radius text-center shadow-blur bg-blue">
					<view class="text-lg">确诊</view>
					<view class="text-Abc text-xxl">{{yiQingObj.diagnosed}}</view>
					<view class="text-xs">较昨日</view>
					<view class="text-xs">+{{yiQingObj.diagnosedIncr}}</view>
				</view>
			</view>
			<view class="padding-xs">
				<view class="padding radius text-center shadow-blur bg-brown">
					<view class="text-lg">疑似</view>
					<view class="text-Abc text-xxl">{{yiQingObj.suspect}}</view>
					<view class="text-xs">较昨日</view>
					<view class="text-xs">+{{yiQingObj.suspectIncr}}</view>
				</view>
			</view>
			<view class="padding-xs">
				<view class="padding radius text-center shadow-blur bg-green">
					<view class="text-lg">治愈</view>
					<view class="text-Abc text-xxl">{{yiQingObj.cured}}</view>
					<view class="text-xs">较昨日</view>
					<view class="text-xs">+{{yiQingObj.curedIncr}}</view>
				</view>
			</view>
			<view class="padding-xs">
				<view class="padding radius text-center shadow-blur bg-gray">
					<view class="text-lg">死亡</view>
					<view class="text-Abc text-xxl">{{yiQingObj.death}}</view>
					<view class="text-xs">较昨日</view>
					<view class="text-xs">+{{yiQingObj.deathIncr}}</view>
				</view>
			</view>
		</view>
			
		<view class="bg-white shadow-blur">
			<view class="solid-bottom padding margin-bottom-sm" style="height: 200rpx;">
				<view class="flex">
					<view class="flex-sub text-center">
						<view class="cu-avatar lg round" style="background-image:url(../../static/tool_change.png);" @tap="showModal" data-target="gridModal">
							<text class="text-df" style="margin-top: 170upx;color: #333333;" >切换城市</text>
						</view>
					</view>
					<view class="flex-sub text-center">
						<view class="cu-avatar lg round" style="background-image:url(../../static/tool_search.png);" @tap="community" data-target="community">
							<text class="text-df" style="margin-top: 170upx;color: #333333;" >小区疫情查询</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop>
					<view class="cu-list grid col-4">
						<view class="cu-item" @click="clickcity(index)" v-for="(item,index) in yiQingObj.area" :key="index">
							<text>{{item.provinceName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='community'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop>
					<view class="cu-list grid col-4">
						<view class="cu-item" @click="clickcity(index)" v-for="(item,index) in yiQingObj.area" :key="index">
							<text>{{item.provinceShortName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="solids-bottom padding-tb-sm padding"><text class="cuIcon-titles text-orange"></text>{{tags}}</view>
			<view class="cu-list grid col-5">
				<view class="padding-xs bg-brown">地区</view>
				<view class="padding-xs bg-cyan">确诊</view>
				<view class="padding-xs bg-blue">治愈</view>
				<view class="padding-xs bg-green">疑似</view>
				<view class="padding-xs bg-gray">死亡</view>
			</view>
			<view class="cu-list grid col-5" style="padding:0;margin-top: 0;">
				<block v-for="(item,index) in beijing.cities" :key="index">
					<view class="padding-xs bg-brown text-xs">{{item.cityName}}</view>
					<view class="padding-xs bg-cyan">{{item.confirmedCount}}</view>
					<view class="padding-xs bg-blue">{{item.curedCount}}</view>
					<view class="padding-xs bg-green">{{item.suspectedCount}}</view>
					<view class="padding-xs bg-gray">{{item.deadCount}}</view>
				</block>

			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">疫情地图</view>
			<view>数据来源：国家及各省市地区卫健委</view>
		</view>
		<iframe class="iframe-content" name="scrollIframe" src="https://m.look.360.cn/static/html/whmap/index.html" style="height: 300px; min-height: 300px; padding: 0px 0.15rem; width: calc(100% - 0.3rem);border: 0;"></iframe>
		<view class="cu-form-group margin-top">
			<view class="title">点击看历史数据</view>
			<switch @change="SwitchA" :class="lishi?'checked':''" :checked="lishi?true:false"></switch>
		</view>
		<block v-for="(item,index) in yiQingObj.history" v-if="lishi" :key="index">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> {{item.date}}
				</view>
			</view>
			<view class="grid col-4 text-center margin-tb-sm">
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-blue">
						<view class="text-lg">确诊</view>
						<view class="margin-top-sm text-Abc text-xxl">{{item.confirmedNum}}</view>
					</view>
				</view>
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-brown">
						<view class="text-lg">疑似</view>
						<view class="margin-top-sm text-Abc text-xxl">{{item.suspectedNum}}</view>
					</view>
				</view>
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-green">
						<view class="text-lg">治愈</view>
						<view class="margin-top-sm text-Abc text-xxl">{{item.curesNum}}</view>
					</view>
				</view>
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-red">
						<view class="text-lg">死亡</view>
						<view class="margin-top-sm text-Abc text-xxl">{{item.deathsNum}}</view>
					</view>
				</view>
			</view>
		</block>
		<view class="cu-tabbar-height"></view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="bg-img margin-top">
					<view class="text-center text-white">
						<image :src="setting.ewm" mode="aspectFit" style="width: 100%;"></image>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">长按识别二维码</view>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar foot shop no-border status_bar" style="left: 25%;">
			<!-- <view class="action"></view> -->
			<view class="btn-group">
				<!-- <button class="cu-btn bg-orange round shadow-blur">加入购物车</button> -->
				<button class="cu-btn bg-orange round shadow-blur" @click="jiayou"><text class="cuIcon-appreciate"></text>为武汉加油{{setting.jiayou}}次</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {post,get} from '../../utils/index.js';
	import {yqUrl} from '../../utils/config.js';
	import chinaYiqing from '@/static/self/china-yiqing.json'
	import cityUuid from '@/static/self/city-uuid.json'
	var that;
	export default {
		data() {
			return {
				yiQingObj : {},
				xiaoQuCode: {},
				xiaoQuData: {},
				setting: {
					click: 11,
					top_thumb: '../../static/banner3.jpg',
					ewm: '../../static/rank.png',
					jiayou: 45
				},
				modifyTime: '',
				lishi: false,
				beijing: {},
				tags:'',
				modalName: null,
				latitude: '39.909',
				longitude: '116.39742',
				url: '',
				areaList: []
			}
		},
		onLoad(res) {
			that = this;
			that.getServerList();
		},
		onShow() {
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			jiayou(e) {
				let old = this.setting.jiayou;
				this.setting.jiayou = old + 1;
			},
			community(e) {
				let city = this.beijing.preProvinceName;			
				let citylist = [];
				let myCity = Object.keys(this.xiaoQuCode[city])[0];
				let mdc = this.xiaoQuCode[city][myCity];
				uni.navigateTo({
					url: '../community/community?city=' + city + '&cityone=' + myCity + '&mdc=' + mdc
				})
			},
			setTags(index) {
				this.tags = this.yiQingObj.list[index];
			},
			clickcity(index) {
				this.beijing = this.yiQingObj.area[index];
				this.setTags(index);
				this.modalName = null;
			},
			SwitchA(e) {
				this.lishi = e.detail.value
			},
			getServerList() {
				// get('/static/self/china-yiqing.json').then(res=>{
				// 	this.fillList(res.data);
				// 	get('/static/self/city-uuid.json').then(res1=>{
				// 		this.xiaoQuCode = res1.data;	
				// 	})
				// })
				this.fillList(chinaYiqing.data);
				this.xiaoQuCode = cityUuid.data;
			},
			fillList(data) {
				this.modifyTime = data.date;
				this.yiQingObj = data;
				this.areaList = [];
				data.list.forEach((v,k) => {
					let prov = v.substring(0,v.indexOf(' '))
					this.areaList.push(prov);
				})
				if (data != undefined && data.date != undefined){
					this.beijing = this.yiQingObj.area[0];
					this.setTags(0);
				}
			},
			today() {
				let global_yesterday = null;
				if(new Date().getHours() >= 5 ){
					global_yesterday = new Date( new Date().getTime() - 60 * 60 * 1000 * 24 );
				}else{
					global_yesterday = new Date( new Date().getTime() - 60 * 60 * 1000 * 24 * 2);
				}
				let date = global_yesterday;
				let year = date.getFullYear();
				let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				this.modifyTime = `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.status_bar {
	      bottom: 100upx;
	  }
</style>
