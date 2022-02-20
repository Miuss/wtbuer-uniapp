<template>
	<view>
		<div>
			<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
				<div class="title" slot="left">
					<img class="logo" :src="logo" />武工商课表
				</div>
			</van-nav-bar>
			<van-notice-bar @click="toNotice" background="#5e77ff" color="#fff" left-icon="volume-o"
				:text="notice.title" />
		</div>

		<div class="week-container">
			<div class="week-bar week-flex">
				<div class="month">{{month}}</div>
				<div v-for="(dayitem,index) in weekList"
					:class="dayitem.istoday?'week-day week-day-flex active':'week-day week-day-flex'">
					<div class="week">{{weekTitle[index]}}</div>
					<div class="date">{{dayitem.date}}</div>
				</div>
			</div>
		</div>

		<div class="unbind-eams-member" v-if="user.member_id === ''" @click="$store.dispatch('showBindMember', true)">
			<div class="loginAdCard margin-bottom">
				<div class="flex">
					<image class="bg"
						style="background-image: url(http://tva1.sinaimg.cn/large/002ZE6Hrgy1guerewdsnkj62s02307wh02.jpg);">
					</image>
					<image class="icon" :src="svg.wifi"></image>
					<div class="content">绑定教务后即可查看课表</div>
				</div>
			</div>
		</div>

		<!--没获取课表-->
		<div v-if="courseList.length === 0 && user.member_id != ''">
			<van-empty description="此次登录尚未获取课表">
				<van-button round type="primary" class="bottom-button" color="#4562e5" @click="getClass()">立即获取课表
				</van-button>
			</van-empty>
		</div>
		<!--正常有课-->
		<div v-if="courseList.length != 0 && todayList.length != 0 && user.member_id != ''">
			<div class="time-line" @click="showDetail(item)" v-for="(item,index) in todayList">
				<div class="time-line-before">
					<image class="straight-line1 margin-l10" :src="svg.straight" mode="aspectFill" v-if="index != 0">
					</image>
					<image v-else class="straight-line2 margin-l10" :src="svg.straight_last" mode="aspectFill"></image>
					<image class="circle margin-l10" :src="svg.circle" mode="aspectFill"></image>
					<image class="straight-line2 margin-l10" :src="svg.straight" mode="aspectFill"
						v-if="index != todayList.length-1"></image>
					<image class="straight-line2 margin-l10" :src="svg.straight_last" mode="aspectFill" v-else></image>
					<image class="straight-line3 margin-l10" :src="svg.straight" mode="aspectFill"
						v-if="index != todayList.length-1"></image>
					<image class="straight-line3 margin-l10" :src="svg.straight_last" mode="aspectFill" v-else></image>
				</div>
				<div class="time-line-card flex-container flex-just-center">
					<div class="time flex-time">
						<div class="hour">{{timeArrays[item.starttime-1][1].slice(0,2)}}</div>
						<image class="line" :src="svg.line" mode="aspectFill"></image>
						<div class="minute">{{timeArrays[item.starttime-1][1].slice(3,5)}}</div>
					</div>
					<div class="schedule flex-schedule" :style="'background-color:' + colorArrays[item.index%16]">
						<div class="name margin-l3">{{item.name}}</div>
						<div class="teacher margin-l3">老师：{{item.teachers}}</div>
						<div class="room margin-l3">教师：{{item.room}}</div>
					</div>
				</div>
			</div>
		</div>
		<!--没课-->
		<div v-if="user.member_id != 0 &&courseList.length !=0 && todayList.length === 0">
			<div class="time-line">
				<div class="time-line-before">
					<image class="straight-line1 margin-l10" :src="svg.straight" mode="aspectFill">
					</image>
					<image class="circle margin-l10" :src="svg.circle" mode="aspectFill"></image>
					<image class="straight-line2 margin-l10" :src="svg.straight_last" mode="aspectFill"></image>
					<image class="straight-line3 margin-l10" :src="svg.straight_last" mode="aspectFill"></image>
				</div>
				<div class="noclass-card flex-container">
					<div class="noclass">
						今天没课,也不要忘记学习哦！
					</div>
				</div>
			</div>
		</div>
	</view>
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
				notice: {
					title: ''
				},
				svg: {
					line: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik04NS4zMzMgOTU1LjczM2ExNy4wNSAxNy4wNSAwIDAgMS0xMi4wNjYtMjkuMTMyTDkyNi42MDEgNzMuMjY3QTE3LjA1IDE3LjA1IDAgMSAxIDk1MC43MzMgOTcuNEw5Ny4zOTkgOTUwLjczM2ExNy4wMTUgMTcuMDE1IDAgMCAxLTEyLjA2NiA1eiIgZmlsbD0iIzcwNzA3MCIvPjwvc3ZnPg==",
					straight: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MzEuMTg1IDk0My41MzJjMCA4LjktNi40OTMgMTYuMTE0LTE0LjUwMyAxNi4xMTRoLTkuMzY0Yy04LjAxIDAtMTQuNTA0LTcuMjE0LTE0LjUwNC0xNi4xMTRWODAuNDY3YzAtOC44OTkgNi40OTMtMTYuMTE0IDE0LjUwNC0xNi4xMTRoOS4zNjRjOC4wMSAwIDE0LjUwMyA3LjIxNSAxNC41MDMgMTYuMTE0djg2My4wNjV6IiBmaWxsPSIjYmZiZmJmIi8+PC9zdmc+",
					straight_last: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MzEuMTg1IDk0My41MzJjMCA4LjktNi40OTMgMTYuMTE0LTE0LjUwMyAxNi4xMTRoLTkuMzY0Yy04LjAxIDAtMTQuNTA0LTcuMjE0LTE0LjUwNC0xNi4xMTRWODAuNDY3YzAtOC44OTkgNi40OTMtMTYuMTE0IDE0LjUwNC0xNi4xMTRoOS4zNjRjOC4wMSAwIDE0LjUwMyA3LjIxNSAxNC41MDMgMTYuMTE0djg2My4wNjV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
					circle: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4Ljc3ODEwNjkuMC5pMTIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTM4Mi40MjEgNTEyYTEyMS43NyAxMjEuNzcgMCAwIDEgMTIxLjgxNC0xMjEuODEzQTEyMi4xNTUgMTIyLjE1NSAwIDAgMSA2MjYuMDkgNTEyYTEyMi4xNTUgMTIyLjE1NSAwIDAgMS0xMjEuODU2IDEyMS44NTZBMTIyLjE1NSAxMjIuMTU1IDAgMCAxIDM4Mi40MiA1MTJ6TTUwNC4yMzUgMEMyNjUuMTczIDAgNjQuOTM5IDE2My44NCA4LjEwNyAzODUuMDY3Yy0uNDI3IDEuNTM2LS40MjcgMi45ODYtLjQyNyA1LjEyIDAgMTMuMzU0IDEwLjc1MiAyNC41NzYgMjQuNTMzIDI0LjU3NmgyMDYuMjk0YzkuODEzIDAgMTguNDc0LTUuNTQ3IDIyLjA1OC0xNC4yMDggNDIuNTM5LTkyLjE2IDEzNS42OC0xNTYuNjcyIDI0My43MTItMTU2LjY3MkEyNjguNTAxIDI2OC41MDEgMCAwIDEgNzcyLjQ4IDUxMi4xMjhjMCAxNDguMDUzLTEyMC4zMiAyNjguMzczLTI2OC4zNzMgMjY4LjM3M0EyNjcuOTQ3IDI2Ny45NDcgMCAwIDEgMjYwLjQ4IDYyMy43ODdhMjUuMzQ0IDI1LjM0NCAwIDAgMC0yMi4wNTktMTQuMzM2SDMyLjIxM0EyNC41NzYgMjQuNTc2IDAgMCAwIDcuNjggNjM0LjAyN2MwIDEuNTc4LjU5NyAzLjA3Mi41OTcgNS4xMkM2NC41OTcgODYwLjE2IDI2NS4xMzEgMTAyNCA1MDQuMjM1IDEwMjRjMjgyLjYyNCAwIDUxMi0yMjkuMzMzIDUxMi01MTIgMC0yODIuNTgxLTIyOS4zNzYtNTEyLTUxMi01MTJ6IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4Ljc3ODEwNjkuMC5pMTEiIGNsYXNzPSJzZWxlY3RlZCIgZmlsbD0iI2JmYmZiZiIvPjwvc3ZnPg==",
					wifi: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTQ2My42IDQ3Mi4xYTQ2LjcgNDYuNyAwIDEgMCA5My40IDAgNDYuNyA0Ni43IDAgMSAwLTkzLjQgMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzIxLjQgODYzLjljLTEzLjIgMC0yNi4zLTYuMy0zNC4zLTE4LjEtMTMtMTguOS04LjItNDQuOCAxMC44LTU3LjggOTAuNi02Mi4xIDE0NC44LTE2NC43IDE0NC44LTI3NC40IDAtMTgzLjMtMTQ5LjEtMzMyLjQtMzMyLjQtMzMyLjRTMTc3LjkgMzMwLjQgMTc3LjkgNTEzLjZjMCAxMDkuNyA1NC4xIDIxMi4zIDE0NC43IDI3NC40IDE4LjkgMTMgMjMuOCAzOC44IDEwLjggNTcuOC0xMi45IDE4LjktMzguOCAyMy44LTU3LjggMTAuOEMxNjIuNCA3NzkgOTQuOCA2NTAuOCA5NC44IDUxMy42YzAtMjI5LjEgMTg2LjQtNDE1LjUgNDE1LjUtNDE1LjVzNDE1LjUgMTg2LjQgNDE1LjUgNDE1LjVjMCAxMzcuMS02Ny42IDI2NS4zLTE4MC45IDM0My03LjIgNC45LTE1LjQgNy4zLTIzLjUgNy4zeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02NDIuNSA3MTkuN2MtMTIuMiAwLTI0LjItNS4zLTMyLjQtMTUuNS0xNC40LTE3LjktMTEuNS00NCA2LjMtNTguNCA0MC4yLTMyLjQgNjMuMy04MC42IDYzLjMtMTMyLjIgMC01Mi4yLTIzLjYtMTAwLjgtNjQuNi0xMzMuMi0xOC0xNC4yLTIxLjEtNDAuMy02LjktNTguNCAxNC4yLTE4IDQwLjQtMjEuMSA1OC40LTYuOSA2MS4xIDQ4LjMgOTYuMiAxMjAuNiA5Ni4yIDE5OC40IDAgNzYuOS0zNC40IDE0OC43LTk0LjMgMTk2LjktNy42IDYuMy0xNi44IDkuMy0yNiA5LjN6bS0yNjcuNi0yLjVjLTkuNCAwLTE4LjgtMy4yLTI2LjYtOS43LTU3LjYtNDguMi05MC43LTExOC45LTkwLjctMTkzLjkgMC03NS40IDMzLjMtMTQ2LjIgOTEuMy0xOTQuNCAxNy43LTE0LjYgNDMuOS0xMi4yIDU4LjUgNS40IDE0LjcgMTcuNiAxMi4zIDQzLjgtNS40IDU4LjUtMzkgMzIuNC02MS4zIDc5LjktNjEuMyAxMzAuNSAwIDUwLjQgMjIuMiA5Ny44IDYwLjkgMTMwLjIgMTcuNiAxNC43IDE5LjkgNDAuOSA1LjIgNTguNS04LjIgOS45LTIwIDE0LjktMzEuOSAxNC45em0xMzUuNCAyMTEuOWMtMjIuOSAwLTQxLjUtMTguNi00MS41LTQxLjVWNTk2LjdjMC0yMi45IDE4LjYtNDEuNSA0MS41LTQxLjVzNDEuNSAxOC42IDQxLjUgNDEuNXYyOTAuOGMwIDIzLTE4LjYgNDEuNi00MS41IDQxLjZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
				},
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
				weekTitle: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
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
			week() {
				return this.$store.getters.week
			},
			month() {
				let month = new Date()
				return month.getMonth() + 1
			},
			weekList() {
				let weeklist = []
				let today = this.getToday()
				//获取本周今天之前的日期
				for (let i = 1; i <= 7; i++) {
					let day = {
						date: this.getDateAfter(i - today),
						istoday: false
					}
					if ((i - today) === 0) {
						day.istoday = true
					}
					weeklist.push(day)
				}
				console.log(weeklist)
				return weeklist
			},
			//今日课程
			todayList() {
				let todayList = []
				if (this.courseList.length === 0) {
					return todayList
				}
				let today = this.getToday() //今天周几
				this.courseList[this.week - 1].forEach((item, index) => {
					//如果是今天
					if (item.xqj === today) {
						let teacher = ''
						for (let i = 0; i < item.teachers.length; i++) {
							teacher += item.teachers[i]
							if (item.teachers.length === 1) break
							teacher += ' '
						}
						//以上课时间为key，item为value将其打包为一个对象
						this.classArr[`${item.skjc}`] = {
							name: item.kcmc,
							room: item.room,
							starttime: item.skjc,
							teachers: teacher,
							index
						}
					}
				})
				for (let i = 1; i < 14; i++) {
					if (!this.classArr[`${i}`]) {
						continue
					}
					todayList.push(this.classArr[`${i}`])
				}
				return todayList
			}
		},
		methods: {
			toNotice() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/notice/notice'
				})
			},
			getToday() {
				let nowWeek = new Date()
				if (nowWeek.getDay() === 0) {
					return 7
				} else {
					return nowWeek.getDay()
				}
			},
			getDateAfter(addDays) {
				let dd = new Date()
				dd.setDate(dd.getDate() + addDays)
				return dd.getDate()
			},
			getClass() {
				const semesterIds = this.$store.getters.semesterIds
				this.$store.dispatch('getCourseList', semesterIds[semesterIds.length - 1])
			},
			showDetail(detail){
				console.log(detail)
				wx.vibrateShort()
				wx.showModal({
					title: detail.name,
					content: detail.room + '\n' + detail.teachers,
					confirmText: '知道了',
					showCancel: false
				})
			}
		},
		created() {},
		mounted() {
			//获取公告标题
			getNotices(1, 20).then(res => {
				console.log(res)
				if (res.code === 0) {
					const data = res.data.data
					this.notice = {
						title: data[data.length - 1].title
					}
				}
			})
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

	/*周立*/

	.week-container {
		width: 100%;
		height: 10vh;
		margin-bottom: 50rpx;
		justify-content: center;
		display: flex;
	}

	.week-bar .month {
		font-size: 100rpx;
		margin-left: 0;
		color: #d9d9d9;
	}

	.week-bar {
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-top: 0.5em;
	}

	.week-flex {
		display: flex;
		align-items: center;

	}

	.week-day {
		padding: 10rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		color: #cecece;
	}

	.week-day-flex {
		display: flex;
		flex-direction: column;
		align-items: center;
	}


	.week-bar .active {
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);
		background-color: #5e77ff;
		color: #ffffff;
		border-radius: 10rpx;
	}

	.week-day .week {
		font-size: 25rpx;
		margin-bottom: 15rpx;
	}

	.week-day .date {
		font-size: 35rpx;
	}

	/*今日课程部分样式*/

	.noclass-card {
		width: 75%;
		height: 8vh;
		margin-bottom: 20rpx;
		margin-right: 50rpx;
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);
		border-radius: 12rpx;
	}

	.noclass-card:active {
		opacity: 0.7;
		background-color: #cfcfcf;
		color: #ffffff;
		transform: scale(.98);
		transition: .2s;
	}

	.noclass {
		display: flex;
		width: 100%;
		height: 100%;
		color: #ffffff;
		font-weight: 700;
		background-color: #5e77ff;
		border-radius: 12rpx;
		justify-content: center;
		align-items: center;
	}


	.time-line {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.time-line-card {
		width: 85%;
		height: 222rpx;
		margin-bottom: 20rpx;
		margin-right: 30rpx;
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);
		border-radius: 12rpx;
	}

	.time-line-card:active {
		opacity: 0.7;
		background-color: #cfcfcf;
		color: #ffffff;
		transform: scale(.98);
		transition: .2s;
	}

	.time-line-before {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		margin-right: 20rpx;
	}


	.flex-container {
		display: flex;
		background-color: #ffffff;
	}

	.flex-time {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex-schedule {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.time {
		background-color: #ffffff;
		width: 30%;
		height: 100%;
		font-size: 60rpx;
		font-weight: 900;
		color: #333333;
		border-top-left-radius: 12rpx;
		border-bottom-left-radius: 12rpx;
	}

	.time .hour,
	.minute {
		color: #504e6e;
	}

	.hour {
		margin-right: 70rpx;
	}

	.minute {
		margin-left: 70rpx;
	}

	.circle {
		font-weight: 100;
		width: 0.9em;
		height: 0.9em;
	}

	.margin-l10 {
		margin-left: 20rpx;
	}

	.straight-line1 {
		font-weight: 100;
		width: 2.5em;
		height: 2.5em;
	}

	.straight-line2 {
		font-weight: 100;
		width: 2.5em;
		height: 2.5em;
	}

	.straight-line3 {
		font-weight: 100;
		width: 2.5em;
		height: 2.5em;
	}

	.line {
		position: absolute;
		font-weight: 100;
		width: 1.5em;
		height: 1.5em;
	}

	.schedule {
		background-color: #f05261;
		width: 70%;
		height: 100%;
		color: #ffffff;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}

	.margin-l3 {
		margin-left: 10%;
	}

	.name {
		margin-bottom: 20rpx;
		font-weight: 700;
		font-size: 30rpx;
	}

	.teacher,
	.room {
		font-size: 25rpx;
		margin-bottom: 10rpx;
		opacity: .7;
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
