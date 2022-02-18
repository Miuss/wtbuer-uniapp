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
		<div class="unbind-eams-member" v-if="user.member_id === ''">
			<van-empty description="尚未绑定教务系统账号">
				<van-button round type="primary" class="bottom-button" color="#4562e5"
					@click="$store.dispatch('showBindMember', true)">立即绑定教务账号</van-button>
			</van-empty>
		</div> 
		<div class="title" style="margin-top:30rpx;">今日课程</div>
		<div class="cu-timeline" v-for="(item,index) in todayList" :key="index">
			<div class="cu-time">{{timeArrays[item.starttime][1]}}</div>
			<div class="cu-item class-item">
				<div class="content" :style="'background-color:'+colorArrays[item.index%16]">
					<div class="name">{{item.name}}</div>
					<div class="teachers">老师：{{item.teachers}}</div>
					<div class="room"> 教室：{{item.room}}</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		getNotices
	} from '../../../../api/systemapi.js'
	import logo from '../../../../assets/images/logo.png'
	export default {
		data() {
			return {
				logo,
				notice: {
					title: ''
				},
				//今日课程展示页
				colorArrays: ["#f05261", "#48a8e4", "#ffd061", "#52db9a", "#70d3e6", "#52db9a", "#3f51b5", "#f3d147",
					"#4adbc3", "#673ab7", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a"
				],
				timeArrays: [
					[1, "8:20"],
					[2, "9:15"],
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
			week() {
				return this.$store.getters.week
			},
			//今日课程
			todayList() {
				let today = []
				for (let i = 1; i < 14; i++) {
					if (!this.classArr[`${i}`]) {
						continue
					}
					today.push(this.classArr[`${i}`])
				}
				console.log(today)
				return today
			}
		},
		methods: {
			toNotice() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/notice/notice',
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
			updateClassList() {
				const data = this.courseList[this.week - 1] //第n周的课表
				let today = this.getToday() //今天周几
				data.forEach((item, index) => {
					let teacher = ''
					let len = item.teachers.length
					//如果是今天
					if (item.xqj === today) {
						for (let i = 0; i < len; i++) {
							teacher += item.teachers[i]
							if (len === 1) {
								break;
							}
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
			}
		},

		created() {
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
			//获取当日课程
			this.updateClassList()

		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");
	@import url("../../../../assets/css/time_line.css");

	/*未绑定账号界面展示样式*/
	.unbind-eams-member {
		background-color: #fff;
	}


	.unbind-eams-member .bottom-button {
		width: 160px;
	}

	/*今日课程部分样式*/

	.title {
		margin-top: 8rpx;
		margin-bottom: 26rpx;
		padding: 0 18rpx;
		font-size: 16px;
		font-weight: 600;
		color: #000000;
	}

	.sub-title {
		font-size: 11px;
		font-weight: 400;
		opacity: .6;
	}

	.app-notice {
		background-color: #5e77ff;
		padding: 8px 10px;
		color: #fff;
		font-size: 26rpx;
	}

	.bbs {
		padding: .5em 18rpx;
		background-color: #fafafa;
		color: #444444;
		font-size: 13px;
		font-weight: 800;
	}

	.cu-timeline {
		position: relative;
	}

	.cu-timeline>.cu-item.class-item {
		padding: 30rpx 30rpx 30rpx 180rpx;
	}

	.cu-timeline>.cu-item.class-item::before {
		left: 113rpx;
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

	.grid.col-2 .class-item:nth-child(2n) {
		margin-right: 0;
	}
</style>
