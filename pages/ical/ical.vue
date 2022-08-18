<template>
	<div>
		<div class="page-bg"></div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="back" :src="svg.back" />
				iCal日历订阅
			</div>
		</van-nav-bar>
		<div class="cu-form-group examPicker">
			<div class="title">学期</div>
			<picker @change="changeIds" :value="courseId" :range="semesterIds" range-key="year">
				<div class="picker">
					{{courseId===''?'':semesterIds[courseId].year}}
					<van-icon name="arrow" style="color:#8799a3" />
				</div>
			</picker>
		</div>
		<div class="ad-info" @click="lookAd">
			看视频获取课表订阅🔗
		</div>
		<div class="ical-info-card">
			什么是iCal？<br/>
			iCal日历是苹果系统自带的日历App，我们小程序系统为您提供一个订阅链接，您可以通过ios日历软件添加订阅，将您的每学期的课表直接加入到系统日历中。<br/>
			订阅教程？<br/>
			苹果手机日历APP自己研究一下吧。导入后还是很方便的，这样iWatch也可以看课表哦！<br/>
			注意：我们暂时不能确定苹果日历是否会自动去更新课表数据，逻辑上是会更新会去自动更新的，但我们还是建议定期手动更新订阅链接。
		</div>
		<div class="ad-container">
			<ad unit-id="adunit-ade1c6c4dbdb0731"></ad>
		</div>
	</div>
</template>

<script>
	import { generateICalToken } from '../../api/userapi'
	import back from '../../assets/images/back.svg'
	import ical from '../../assets/images/ical.jpeg'
	import { showToast } from '../../utils'
	
	export default {
		data() {
			return {
				svg: {
					back
				},
				ical,
				pickerVis: false,
				courseId: '',
				token: '',
				videoAd: null
			}
		},
		mounted() {
			this.courseId = this.semesterIds.length-1
			console.log(this.courseId)
			// 在页面中定义激励视频广告
			this.videoAd = null
			
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
			  this.videoAd = wx.createRewardedVideoAd({
				adUnitId: 'adunit-4c3d7f5140f33183'
			  })
			  this.videoAd.onLoad(() => {
			  })
			  this.videoAd.onError((err) => {})
			  this.videoAd.onClose((res) => {
				if (res && res.isEnded) {
					this.onConfirmChangeIds()
				}
			  })
			}
		},
		computed: {
			semesterIds() {
				return this.$store.getters.semesterIds
			},
			years(){
				let year = []
				this.$store.getters.semesterIds.forEach((item,index)=>{
					year.push(item.year)
				})
				return year
			}
		},
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
			showPicker() {
				this.pickerVis = true
			},
			closePicker() {
				this.pickerVis = false
			},
			changeIds(e) {
				this.pickerVis = false
				this.courseId = e.detail.value
			},
			lookAd() {
				// 用户触发广告后，显示激励视频广告
				if (this.videoAd) {
				  this.videoAd.show().catch(() => {
					// 失败重试
					this.videoAd.load()
					  .then(() => videoAd.show())
					  .catch(err => {
						console.log('激励视频 广告显示失败')
					  })
				  })
				}
			},
			async onConfirmChangeIds() {
				const semsterid = this.semesterIds[this.courseId].id
				wx.showLoading({
					title: '订阅链接生成中',
					mask: true
				})
				
				try {
					const res = await generateICalToken()
					console.log(res)
					if (res.code) {
						throw new Error(res.msg)
					}
					
					this.token = res.data.token
					
					wx.setClipboardData({
					  data: `http://wtbuer-server.miuss.icu/calendar/subscribe?semesterid=${semsterid}&token=${this.token}`
					})
				} catch (err) {
					console.error(err)
					showToast(err)
				} finally {
					wx.hideLoading()
				}
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/nav_bar.css");
	@import url("../../assets/css/cu-form.css");
	
	.ad-container {
		margin: 16px 16px!important;
		border-radius: 6px!important;
		overflow: hidden!important;
	}
	
	.examPicker {
	    position: relative;
		width: unset!important;
	    z-index: 1;
		background-color: #FFFFFF;
	    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
	    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
	    margin: 32rpx;
	    left: 0;
	    right: 0;
	    border-radius: 8rpx;
	}
	
	.ad-info {
		margin: 32rpx;
		padding: 15rpx;
		background-color: #4562e5;
		text-align: center;
		color: #FFFFFF;
		border-radius: 3px;
		font-size: 15px;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
	}
	
	.ical-info-card {
		margin: 32rpx;
		padding: 32rpx;
		font-size: 28rpx;
		opacity: .65;
		background-color: #FFFFFF;
	    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
	    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
	    border-radius: 8rpx;
	}

	page {
		background-color: #f7f8fa;
	}
</style>
