<template>
	<div>
		<div v-if="courseList.length === 0 && user.member_id != ''">
			<van-empty description="此次登录尚未获取课表">
				<van-button round type="primary" class="bottom-button" color="#4562e5" @click="getCourseList()">获取本学期课表
				</van-button>
			</van-empty>
		</div>
		<div v-else>
			<div class="weekbar">
				<div v-for="(dayItem, index) in weekList" :key="index" class="item" :class="dayItem[1]?'active':''"
					:style="'width: '+ classItemWidth +'px;'">
					<div class="index">{{dayItem[0]}}</div>
					<div class="info">{{dayItem[2]}}</div>
				</div>
			</div>
			<div class="weekbar-position"></div>
			<div class="courseList" :style="{height: scrollViewHeight}">
				<swiper :indicator-dots="false" :autoplay="false" :current="week-1" @change="changeWeek"
					:style="'height:'+ timeList.length * classItemHeight +'px;background: #ffffff;position: relative;'">
					<swiper-item v-for="(item, index) in courseList" :key="index">
						<div class="class" :style="'height:'+ timeList.length * classItemHeight +'px;width:100%;display:flex;'">
							<!--课表左侧栏-->
							<div class="sidebar">
								<div v-for="(timeItem, timeIndex) in timeList" :key="timeIndex" class="item"
									:style="'height:'+ classItemHeight +'px;'">
									<div class="time">{{timeItem[1]}}</div>
									<div class="index">{{timeItem[0]}}</div>
								</div>
							</div>
							<div v-for="(lineItem, lineIndex) in timeList" :key="lineIndex">
								<div class="class-line" :style="'margin-top:'+ ((lineIndex+1)*classItemHeight-1) +'px;'">
								</div>
							</div>
							<!--课表-->
							<div v-for="(classItem, classIndex) in item" :key="classIndex">
								<div class="flex-item kcb-item" @click="showClassDialog(classItem)"
									:style="'width:'+ (classItemWidth - 2) +'px;margin-left:'+ ((classItem.xqj-1)*classItemWidth+1) +'px;margin-top:'+ ((classItem.skjc-1)*classItemHeight+1) +'px;height:'+ (classItem.skcd*classItemHeight-3) +'px;background-color:'+ colorArrays[classIndex%16]">
									<div class="smalltext">{{classItem.kcmc}}@{{classItem.room}}</div>
								</div>
							</div>
						</div>
					</swiper-item>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
	import * as ut from '../utils'

	export default {
		data() {
			return {
				classItemHeight: 60,
				colorArrays: [
					'#f05261', '#48a8e4', '#ffd061', '#52db9a', '#70d3e6', '#52db9a', '#3f51b5', '#f3d147',
					'#4adbc3', '#673ab7', '#f3db49', '#76bfcd', '#b495e1', '#ff9800', '#8bc34a'
				],
				timeList: [
					[1, '8:20', '9:05'],
					[2, '9:15', '10:00'],
					[3, '10:20', '11:05'],
					[4, '11:15', '12:00'],
					[5, '12:10', '12:55'],
					[6, '13:05', '13:50'],
					[7, '14:10', '14:55'],
					[8, '15:05', '15:50'],
					[9, '16:10', '16:55'],
					[10, '17:05', '17:50'],
					[11, '18:30', '19:15'],
					[12, '19:25', '20:10'],
					[13, '20:20', '21:05']
				]
			}
		},
		computed: {
			scrollViewHeight() {
				return `${this.$store.getters.systemInfo.safeArea.height - 50 - 44 - 48}px`
			},
			courseList() {
				return this.$store.getters.courseList
			},
			courseIds() {
				return this.$store.getters.courseIds
			},
			semesterIds() {
				return this.$store.getters.semesterIds
			},
			classItemWidth() {
				return (this.$store.getters.systemInfo.windowWidth - 32) / 7
			},
			week() {
				return this.$store.getters.week
			},
			weekList() {
				const week = this.week
				const starttime = this.courseIds.time
				const now = parseInt(new Date().getTime() / 1000)
				const nowweek = (now - starttime) / 7 / 86400 > 0 && (now - starttime) / 7 / 86400 +
					1 <= this.courseList.length ? parseInt((now - starttime) / 7 / 86400) + 1 : 1
				var arr = [
					[ut.formatTime(starttime + 7 * (week - 1) * 86400, 'M'), 0, '月'],
					['周一', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400, 'M/D')],
					['周二', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400 + 86400, 'M/D')],
					['周三', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400 + 86400 * 2, 'M/D')],
					['周四', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400 + 86400 * 3, 'M/D')],
					['周五', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400 + 86400 * 4, 'M/D')],
					['周六', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400 + 86400 * 5, 'M/D')],
					['周日', 0, ut.formatTime(starttime + 7 * (week - 1) * 86400 + 86400 * 6, 'M/D')]
				]
				if (week === nowweek) {
					const day = new Date().getDay()
					if (day === 0) {
						arr[7][1] = 1
					} else {
						arr[day][1] = 1
					}
				}
				return arr
			},
		},
		watch: {
			courseIds() {
				this.initWeek()
			}
		},
		mounted() {
			this.initWeek()
		},
		methods: {
			initWeek() {
				const starttime = this.courseIds.time
				const now = parseInt(new Date().getTime() / 1000)
				const nowWeek = (now - starttime) / 7 / 86400 > 0 && (now - starttime) / 7 / 86400 +
					1 <= this.courseList.length ? parseInt((now - starttime) / 7 / 86400) + 1 : 1
				this.$store.commit('UPDATE_WEEK', nowWeek)
			},
			changeWeek(e) {
				const index = e.detail.current + 1
				this.$store.commit('UPDATE_WEEK', index)
			},
			getCourseList() {
				const semesterIds = this.$store.getters.semesterIds
				this.$store.dispatch('getCourseList', semesterIds[semesterIds.length - 1])
			},
			showClassDialog(info) {
				wx.vibrateShort()
				wx.showModal({
					title: info.kcmc,
					content: info.room + '\n' + info.teachers.toString(),
					confirmText: '知道了',
					showCancel: false
				})
			}
		}
	}
</script>

<style>
	.courseList {
		height: 100px;
		overflow: scroll;
	}
	
	.sidebar {
		background-color: #fff;
		box-shadow: 0 4px 6px #ebedf0;
	}

	.sidebar .item {
		width: 32px;
		position: relative;
		box-sizing: border-box;
		text-align: center;
		font-size: 22rpx;
		border-bottom: 1px dashed rgb(219, 219, 219, .5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.sidebar .item .index {
		font-weight: 600;
	}

	.sidebar .item .time,
	.sidebar .item .endtime {
		position: absolute;
		top: 0;
		font-weight: 600;
		color: #5f5f5f;
	}

	.kcb-item {
		position: absolute;
		border-radius: 5px;
		padding: 3px;
		overflow: hidden;
		box-sizing: border-box;
		background: #eeeeee;
	}

	.kcb-item:active {
		transform: scale(.98);
		transition: .2s;
	}

	.smalltext {
		line-height: 1.3;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		padding-left: 2px;
	}

	.class-line {
		width: 100%;
		position: absolute;
		border-bottom: 1px dashed rgb(219, 219, 219, .5);
	}

	.weekbar {
		position: fixed;
		z-index: 1;
		width: 100%;
		display: flex;
		flex-direction: row;
		background-color: rgba(243, 243, 243);
		color: rgba(0, 0, 0, .87);
		border-bottom: 4px solid rgb(236, 236, 236);
	}

	.weekbar-position {
		height: 48px;
	}

	.weekbar .item:first-child {
		width: 32px !important;
		height: 44px;
		justify-content: unset;
		display: block;
		align-items: unset;
		text-align: center;
	}

	.weekbar .item .index {
		margin-top: 10px;
		font-weight: 600;
		font-size: 14px;
		line-height: 12px;
	}

	.weekbar .item .info {
		margin-top: 4px;
		font-weight: 400;
		font-size: 10px;
		opacity: .8;
		line-height: 12px;
	}

	.weekbar .item {
		width: 100px;
		height: 44px;
		font-size: 9pt;
		justify-content: unset;
		display: block;
		align-items: unset;
		text-align: center;
		position: relative;
	}

	.weekbar .item.active {
		color: #ffffff;
	}

	.weekbar .item.active:after {
		content: '';
		display: block;
		position: absolute;
		z-index: -1;
		top: 0;
		background-color: #5975ff;
		border-radius: 6px;
		left: 15%;
		top: 10%;
		width: 70%;
		height: 80%;
	}
</style>
