<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left" style="width: 100%;">
				<img class="logo" :src="logo" /> 武工商课表
			</div>
			<div class="action-right" v-if="menuButton!=''" slot="right">
				<div :style="'margin-right: '+menuButton.width+'px'">
					<div class="action-btn" :style="'height: '+(menuButton.height-2)+'px'" v-if="toggled" @click="toggled=false">展开</div>
					<div class="action-btn" :style="'height: '+(menuButton.height-2)+'px'" v-if="!toggled" @click="toggled=true">收起</div>
				</div>
			</div>
		</van-nav-bar>
		<div class="app-lists" v-show="toggled">
			<div class="app-card" @click="toOtherApp('wx09d51addba74401e')">
				<div class="app-logo">
					<img src="http://mmbiz.qpic.cn/mmbiz_png/atpAreFqvAg6ZCgFV5gTUxJfrYUQDQJbsN3iaf5LZmiapQCKZS1FItibt3diajLbrUnD9viblZ9SjzKHwuBDr6KHwqA/640?wx_fmt=png&wxfrom=200" />
				</div>
				<div class="app-name">网上迎新</div>
			</div>
			<div class="app-card" @click="toOtherApp('wx948753398e25ea32')">
				<div class="app-logo">
					<img src="http://mmbiz.qpic.cn/mmbiz_png/lQw9lM6N2JA9FXEuWogOibT8rYTaFsugXLqSYTJXnMD6C2giaVeIEwM6EfrLbC7RJIwI8f8sA9oDw20hnxRicDLhg/640?wx_fmt=png&wxfrom=200" />
				</div>
				<div class="app-name">热水淋浴</div>
			</div>
			<div class="app-card" @click="toOtherApp('wx5e2552106768c1e1')">
				<div class="app-logo">
					<img src="http://mmbiz.qpic.cn/mmbiz_png/7Nw6s67gugXFKo5xv3vCZW8kr5WJ5fNx9hfWg24icSRotyhbB2ujnSnOFwCQs6KOJp6rmaHxe4qnXbfUxnG2KmQ/640?wx_fmt=png&wxfrom=200" />
				</div>
				<div class="app-name">一卡通支付</div>
			</div>
		</div>
		<!-- <van-notice-bar mode="link" left-icon="info-o" text="本小程序参加科技创新周比赛,快投我!" @click="handleNoticeBar" /> -->

		<!--没有绑定教务-->
		<div class="unbind-eams-member" v-if="user.member_id === ''">
			<van-empty description="尚未绑定 WTBU 账号">
				<van-button round type="primary" class="bottom-button" color="#4562e5"
					@click="$store.dispatch('showBindMember', true)">绑定 WTBU 账号</van-button>
			</van-empty>
		</div>

		<!--没获取课表-->
		<div v-else-if="courseList.length === 0 && user.member_id != ''">
			<!-- <van-notice-bar mode="link" @click="toICal()" text="新功能: 将课表导入手机系统日历, 查阅更方便!" /> -->
			<van-empty description="此次登录尚未获取课表">
				<van-button round type="primary" class="bottom-button" color="#4562e5" @click="getClass()">获取本学期课表</van-button>
			</van-empty>
		</div>

		<!--没课-->
		<div v-else-if="courseList.length !== 0 && todayClassList.length === 0">
			<!-- <van-notice-bar mode="link" @click="toICal()" text="新功能: 将课表导入手机系统日历, 查阅更方便!" /> -->
			<div class="course-title" style="margin-top: 30rpx;">
				今日课程 <text class="course-subtitle" style="margin-left: 20rpx;" v-if="courseUpdateTime != ''">数据更新于 {{courseUpdateTime}}</text>
			</div>
			<div class="cu-timeline">
				<div class="cu-item class-item">
					<div class="content" style="background-color: #5e77ff;">
						<div class="loading-card">今天没课，也不要忘记学习哦！</div>
					</div>
				</div>
			</div>
		</div>

		<!--正常有课-->
		<div v-else-if="courseList.length !== 0">
			<!-- <van-notice-bar mode="link" @click="toICal()" text="新功能: 将课表导入手机日历, 查阅更方便!" /> -->
			<div class="course-title" style="margin-top: 30rpx;">
				今日课程 <text class="course-subtitle" style="margin-left: 20rpx;" v-if="courseUpdateTime != ''">数据更新于 {{courseUpdateTime}}</text>
			</div>
			<div class="cu-timeline" v-for="(item, index) in todayClassList" :key="index" @click="showDetail(item)">
				<div class="cu-time">{{timeArrays[item.skjc-1][1]}}</div>
				<div class="cu-item class-item">
					<div class="content" :style="'background-color: #'+colorArrays[index%16]+'30;color: #'+colorArrays[index%16]">
						<div class="name">{{item.kcmc}}</div>
						<div class="teachers">老师：{{item.teachers.toString()}}</div>
						<div class="room">‍教室：{{item.room}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getNotices
	} from '../../../../api/systemapi.js'
	import * as ut from '../../../../utils'
	import logo from '../../../../assets/images/logo.png'
	export default {
		data() {
			return {
				logo,
				toggled: true,
				menuButton: '',
				//今日课程展示页
				colorArrays: [
					'f05261', '48a8e4', 'fdbd26', '13cc74', '70d3e6', '52db9a', '3f51b5', 'f3d147',
					'4adbc3', '673ab7', 'f3db49', '76bfcd', 'b495e1', 'ff9800', '8bc34a'
				],
				timeArrays: [
					[1, "08:20"],
					[2, "09:15"],
					[3, "10:20"],
					[4, "11:15"],
					[5, "12:10"],
					[6, "13:05"],
					[7, "14:10"],
					[8, "15:05"],
					[9, "16:10"],
					[10, "17:05"],
					[11, "18:30"],
					[12, "19:25"],
					[13, "20:20"]
				],
				classArr: {}
			}
		},
		created() {
			this.menuButton = wx.getMenuButtonBoundingClientRect()
		},
		computed: {
			user() {
				return this.$store.getters.user
			},
			courseList() {
				return this.$store.getters.courseList
			},
			courseIds() {
				return this.$store.getters.courseIds
			},
			courseUpdateTime() {
				if (this.$store.getters.courseUpdateTime === '') {
					return ''
				}
				
				return ut.formatTime(this.$store.getters.courseUpdateTime / 1000, 'Y/M/D h:m:s')
			},
			nowWeek() {
				const starttime = this.courseIds.time
				const now = parseInt(new Date().getTime() / 1000)
				return parseInt((now - starttime) / 7 / 86400) > 0 && parseInt((now - starttime) / 7 / 86400) +
					1 <= this.courseList.length ? parseInt((now - starttime) / 7 / 86400) + 1 : 1
			},
			nowDay() {
				const now = new Date()
				const day = now.getDay()
				if (day === 0) {
					return 7
				}

				return day
			},
			month() {
				const month = new Date()
				return month.getMonth() + 1
			},
			todayClassList() {
				if (this.courseList.length <= 0) {
					return []
				}

				return this.courseList[this.nowWeek - 1].filter(item => item.xqj === this.nowDay).sort((a, b) => a.skjc - b.skjc)
			}
		},
		methods: {
			toICal() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/ical/ical',
				})
			},
			handleNoticeBar() {
				wx.vibrateShort();
				wx.previewImage({
					urls: ['https://wtbuer-server.miuss.icu/notice.jpg'],
					current: 'https://wtbuer-server.miuss.icu/notice.jpg'
				})
			},
			toNotice() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/notice/notice'
				})
			},
			getClass() {
				const semesterIds = this.$store.getters.semesterIds
				this.$store.dispatch('getCourseList', semesterIds[semesterIds.length - 1])
			},
			showDetail(item) {
				wx.vibrateShort()
				wx.showModal({
					title: item.kcmc,
					content: item.room + '\n' + item.teachers.toString(),
					confirmText: '知道了',
					showCancel: false
				})
			},
			toOtherApp(appid) {
				wx.navigateToMiniProgram({
				     appId: appid,
				     path: '',
				　   envVersion: 'release',
				     success(res) {
				        console.log('打开成功')  
				　　 },
				     fail: function (err) {
				        console.log('打开失败')
				     }
				})    
			}
		},
		mounted() {
			console.log("nowweek: "+this.nowWeek)
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");
	
	.action-right {
		margin-top: -4px;
	}
	
	.action-btn {
		margin-right: 10px;
		padding: 0 10px;
		width: 40px;
		border: 1px solid #696a6c40;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12.5px;
		color: #333333;
		border-radius: 50px;
	}
	
	.app-lists {
		padding-top: 18px;
		position: relative;
		background-color: #f8f9fb;
		display: flex;
		overflow-x: scroll;
	}
	
	.app-lists::before {
		position: absolute;
		content: '其他校园程序';
		font-size: 10px;
		left: 10px;
		top: 4px;
	}
	
	.app-lists .app-card {
		padding: 8px 10px 5px 10px;
		text-align: center;
	}
	
	.app-lists .app-card img {
		width: 36px;
		height: 36px;
	}
	
	.app-lists .app-card .app-name {
		font-size: 11px;
		color: #333333;
		opacity: .8;
	}
	

	/* ==================
	         时间轴
	 ==================== */

	.cu-timeline {
		display: block;
		background-color: #FFFFFF;
	}

	.cu-timeline .cu-time {
		width: 120rpx;
		text-align: center;
		padding: 20rpx 0;
		font-size: 26rpx;
		color: #888;
		display: block;
	}

	.cu-timeline>.cu-item {
		padding: 30rpx 30rpx 30rpx 120rpx;
		position: relative;
		display: block;
		width: 65%;
		z-index: 0;
	}

	.cu-timeline>.cu-item:not([class*="text-"]) {
		color: #ccc;
	}

	.cu-timeline::after {
		content: "";
		display: block;
		position: absolute;
		width: 1rpx;
		background-color: #ddd;
		left: 60rpx;
		height: 100%;
		top: 0;
		z-index: 8;
	}

	.cu-timeline::before {
		display: block;
		position: absolute;
		top: 48rpx;
		z-index: 9;
		background-color: #ffffff;
		border-radius: 50%;
		width: 19rpx;
		height: 19rpx;
		border: 4rpx solid #ddd;
		text-align: center;
		line-height: 50rpx;
		left: 36rpx;
		content: "";
	}

	.cu-timeline>.cu-item>.content {
		padding: 30rpx;
		border-radius: 6rpx;
		display: block;
		line-height: 1.6;
	}

	.cu-timeline>.cu-item>.content:not([class*="bg-"]) {
		background-color: #f1f1f1;
		color: #000000;
	}

	.cu-timeline>.cu-item>.content+.content {
		margin-top: 20rpx;
	}

	.loading-card {
		padding: 18rpx;
		font-size: 13px;
		font-weight: 600;
		color: #ffffff;
	}

	/*绑定课表*/

	.content-box {
		padding: 18rpx;
		width: 100%;
		position: relative;
		display: block;
	}

	.content-box.bg-image {
		margin-top: 9.375rem;
	}

	.loginAdCard {
		position: relative;
		display: block;
		padding: 22rpx;
		height: 60px;
		border-radius: 8px;
		transform: translateY(0);
		overflow: hidden;
	}

	.loginAdCard:active {
		transform: scale(.98);
		transition: .2s;
	}

	.loginAdCard .bg {
		background-position: center;
		background-size: cover;
		position: absolute;
		width: 100%;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		-webkit-animation: move 36s infinite;
		animation: move 36s infinite;
	}

	.loginAdCard .bg::after {
		border-radius: 8px;
		background-color: rgba(17, 17, 17, 0.5);
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
	}

	.loginAdCard .icon {
		width: calc((60px - 44rpx));
		height: calc((60px - 44rpx));
		margin-right: 22rpx;
	}


	/*今日课程部分样式*/
	.course-title {
		margin-top: 8rpx;
		margin-bottom: 26rpx;
		padding: 0 18rpx;
		font-size: 16px;
		font-weight: 600;
		color: #000000;
	}

	.course-subtitle {
		font-size: 22rpx;
		font-weight: 400;
		opacity: .6;
	}

	.cu-timeline {
		position: relative;
	}

	.cu-timeline>.cu-item.class-item {
		padding: 30rpx 30rpx 30rpx 180rpx;
	}

	.cu-timeline .cu-time {
		position: absolute;
		top: 24rpx;
		font-weight: 600;
		color: #333333;
	}

	.cu-timeline::before {
		left: 125rpx;
	}

	.cu-timeline::after {
		left: 137rpx;
		width: 3rpx;
		border-radius: 3px;
	}

	.cu-timeline:last-child::after {
		height: 30%;
	}

	.class-item .content {
		padding: 15rpx 30rpx !important;
		border-radius: 8px !important;
	}

	.class-item .content:active {
		transform: scale(.98);
		transition: .2s;
	}

	.class-item .cover {
		position: absolute;
		height: 48px;
	}

	.class-item .icon {
		border-radius: 8px;
		width: 48px;
		height: 48px;
	}

	.class-item .content {
		position: relative;
		display: block;
	}

	.class-item .name {
		font-size: 14px;
		font-weight: 600;
		margin: 4px 0;
	}

	.class-item .room,
	.class-item .teachers {
		font-size: 12px;
		opacity: .8;
		margin: 4px 0;
	}

	.loginAdCard .content {
		height: calc((60px - 44rpx));
		line-height: calc((60px - 44rpx));
		color: #ffffff;
		font-size: 16px;
		font-weight: 600;
	}

	@-webkit-keyframes move {
		0% {
			transform: translateY(0)
		}

		to {
			transform: translateY(-50%)
		}
	}

	@keyframes move {
		0% {
			transform: translateY(0)
		}

		to {
			transform: translateY(-50%)
		}
	}

	/*绑定提示卡*/
	.unbind-eams-member {
		display: flex;
		justify-content: center;
	}

	.flex {
		display: flex;
	}

	.loginAdCard {
		position: relative;
		display: block;
		padding: 22rpx;
		height: 100%;
		width: 90%;
		border-radius: 30rpx;
		transform: translateY(0);
		overflow: hidden;
	}

	.loginAdCard:active {
		transform: scale(.98);
		transition: .2s;
	}

	.loginAdCard .bg {
		background-position: center;
		background-size: cover;
		position: absolute;
		width: 100%;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		-webkit-animation: move 36s infinite;
		animation: move 36s infinite;
	}

	.loginAdCard .bg::after {
		border-radius: 8px;
		background-color: rgba(17, 17, 17, 0.5);
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
	}

	.loginAdCard .icon {
		width: calc((60px - 44rpx));
		height: calc((60px - 44rpx));
		margin-right: 22rpx;
	}

	.loginAdCard .content {
		height: calc((60px - 44rpx));
		line-height: calc((60px - 44rpx));
		color: #ffffff;
		font-size: 16px;
		font-weight: 600;
	}

	@-webkit-keyframes move {
		0% {
			transform: translateY(0)
		}

		to {
			transform: translateY(-50%)
		}
	}

	@keyframes move {
		0% {
			transform: translateY(0)
		}

		to {
			transform: translateY(-50%)
		}
	}
</style>
