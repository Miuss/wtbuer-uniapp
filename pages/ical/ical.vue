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
			<picker @change="onConfirmChangeIds" :value="courseId===''?semesterIds.length-1:courseId" :range="semesterIds" range-key="year">
				<div class="picker">
					{{courseId===''?semesterIds[semesterIds.length-1].year:semesterIds[courseId].year}}
					<van-icon name="arrow" style="color:#8799a3" />
				</div>
			</picker>
		</div>
		<div class="ical-info-card">
			什么是iCal？<br/>
			iCal日历是苹果系统自带的日历App，我们小程序系统为您提供一个订阅链接，您可以通过ios日历软件添加订阅，将您的每学期的课表直接加入到系统日历中。<br/>
			订阅教程？<br/>
			苹果手机日历APP自己研究一下吧。导入后还是很方便的，这样iWatch也可以看课表哦！<br/>
			注意：我们暂时不能确定苹果日历是否会自动去更新课表数据，逻辑上是会更新会去自动更新的，但我们还是建议定期手动更新订阅链接。
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
				token: ''				
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
			async onConfirmChangeIds(e) {
				this.pickerVis = false
				this.courseId = e.detail.value
				const semsterid = this.semesterIds[e.detail.value].id
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
