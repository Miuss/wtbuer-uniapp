<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left" style="width: 100%;">
				<img class="logo" :src="logo" /> 武工商课表
			</div>
		</van-nav-bar>

		<!--没有绑定教务-->
		<div class="unbind-eams-member" v-if="user.member_id === ''">
			<van-empty description="尚未绑定教务系统账号">
				<van-button round type="primary" class="bottom-button" color="#4562e5"
					@click="$store.dispatch('showBindMember', true)">绑定教务系统账号</van-button>
			</van-empty>
		</div>

		<!--没获取课表-->
		<div v-else-if="courseList.length === 0 && user.member_id != ''">
			<van-empty description="此次登录尚未获取课表">
				<van-button round type="primary" class="bottom-button" color="#4562e5" @click="getClass()">获取本学期课表</van-button>
			</van-empty>
		</div>

		<!--没课-->
		<div class="cu-timeline" v-else-if="courseList.length !== 0 && todayClassList.length === 0">
			<div class="cu-item class-item">
				<div class="content" style="background-color: #5e77ff;">
					<div class="loading-card">今天没课，也不要忘记学习哦！</div>
				</div>
			</div>
		</div>

		<!--正常有课-->
		<div v-else-if="courseList.length !== 0 && todayClassList.length > 0" class="course-title" style="margin-top: 30rpx;">今日课程 <text class="course-subtitle"
				style="margin-left: 20rpx;">数据获取于本地课表缓存</text></div>
		<div class="cu-timeline" v-for="(item, index) in todayClassList" :key="index" @click="showDetail(item)">
			<div class="cu-time">{{timeArrays[item.skjc-1][1]}}</div>
			<div class="cu-item class-item">
				<div class="content" :style="'background-color:'+colorArrays[index%16]">
					<div class="name">{{item.kcmc}}</div>
					<div class="teachers">老师：{{item.teachers.toString()}}</div>
					<div class="room">‍教室：{{item.room}}</div>
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
				//今日课程展示页
				colorArrays: ["#f05261", "#48a8e4", "#aaaa7f", "#52db9a", "#70d3e6", "#52db9a", "#3f51b5", "#f3d147",
					"#4adbc3", "#673ab7", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a"
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
			nowWeek() {
				const starttime = this.courseIds.time
				const now = parseInt(new Date().getTime() / 1000)
				return (now / 1000 - starttime) / 7 / 86400 > 0 && (now / 1000 - starttime) / 7 / 86400 +
					1 <= this.data.wlist.length ? parseInt((now / 1000 - starttime) / 7 / 86400) + 1 : 1
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

				return this.courseList[2].filter(item => {
					return item.xqj === 1
				})
			}
		},
		methods: {
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
			}
		},
		created() {},
		mounted() {}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

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

	.cu-timeline>.cu-item::after {
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

	.cu-timeline>.cu-item::before {
		display: block;
		position: absolute;
		top: 28px;
		z-index: 9;
		background-color: #ffffff;
		border-radius: 50%;
		width: 9px;
		height: 9px;
		border: 2px solid #ddd;
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
		font-size: 11px;
		font-weight: 400;
		opacity: .6;
	}

	.cu-timeline {
		position: relative;
	}

	.cu-timeline>.cu-item.class-item {
		padding: 30rpx 30rpx 30rpx 180rpx;
	}

	.cu-timeline>.cu-item.class-item::before {
		left: 72px;
	}

	.cu-timeline>.cu-item.class-item::after {
		left: 137rpx;
		width: 3rpx;
		border-radius: 3px;
	}

	.cu-timeline:last-child .class-item::after {
		height: 30%;
	}

	.cu-timeline .cu-time {
		position: absolute;
		top: 24rpx;
		font-weight: 600;
		color: #333333;
	}

	.class-item .content {
		padding: 15rpx 30rpx !important;
		color: #ffffff !important;
		border-radius: 8px !important;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
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
		opacity: .7;
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
