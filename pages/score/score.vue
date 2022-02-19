<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				分数查询
			</div>
		</van-nav-bar>
		<div class="cu-form-group scorePicker">
			<div class="title">学期</div>
			<picker @change="onConfirmChangeIds" :value="courseId===''?semesterIds.length-1:courseId"
				:range="semesterIds" range-key="year">
				<div class="picker">
					{{courseId===''?semesterIds[semesterIds.length-1].year:semesterIds[courseId].year}}
					<van-icon name="arrow" style="color:#8799a3" />
				</div>
			</picker>
		</div>
		<div class="content-box">
			<block v-if="scoreList.length != 0">
				<div class="score">学期平均分数：{{avgScore}}</div>
				<div class="score">学期平均绩点：{{avgPoint}}</div>
				<div class="list margin-top-sm">
					<div class="title flex">
						<div class="flex-treble padding text-bold">课程名</div>
						<div class="flex-sub padding text-bold">学分</div>
						<div class="flex-sub padding text-bold">分数</div>
					</div>
					<div class="item flex" v-for="item in scoreList" bindtap="showCardView" :data-name="item.name"
						:data-type="item.type" :data-credit="item.credit" :data-score="item.score"
						:data-point="item.point">
						<div class="flex-treble padding text-cut">{{item.name}}</div>
						<div class="flex-sub padding text-blue">{{item.credit}}</div>
						<div v-if="item.score>=60" class="flex-sub padding text-green">{{item.score}}</div>
						<div v-else class="flex-sub padding text-red">{{item.score}}</div>
					</div>
				</div>
			</block>
			<div class="msg margin-top-lg" v-if="list.length == 0 && got">该学期暂无考试成绩</div>
		</div>
	</view>
</template>

<script>
	import {
		getExamScore,
		getSemesterId
	} from '../../api/easmapi.js'
	export default {
		data() {
			return {

				svg: {
					back: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MDkuOTIgNzk1Ljg0YzE1Ny45MDQgMCAyODUuOTItMTI4LjAxNiAyODUuOTItMjg1LjkyQzc5NS44NCAzNTIgNjY3LjgwOCAyMjQgNTA5LjkyIDIyNCAzNTIgMjI0IDIyNCAzNTIgMjI0IDUwOS45MmMwIDE1Ny45MDQgMTI4IDI4NS45MiAyODUuOTIgMjg1Ljkyem0wIDQ4QzMyNS41MDQgODQzLjg0IDE3NiA2OTQuMzIgMTc2IDUwOS45MiAxNzYgMzI1LjUwNCAzMjUuNTA0IDE3NiA1MDkuOTIgMTc2YzE4NC40MTYgMCAzMzMuOTIgMTQ5LjUwNCAzMzMuOTIgMzMzLjkyIDAgMTg0LjQxNi0xNDkuNTA0IDMzMy45Mi0zMzMuOTIgMzMzLjkyem01OC4yNzItNDg3LjI5NmExNiAxNiAwIDAgMSAwIDIyLjYyNGwtMTI5LjEyIDEyOS4xMiAxMjkuMTIgMTI5LjEyYTE2IDE2IDAgMCAxIDAgMjIuNjRMNTU2Ljg4IDY3MS4zNmExNiAxNiAwIDAgMS0yMi42MjQgMEwzODIuNDk2IDUxOS42YTE2IDE2IDAgMCAxIDAtMjIuNjI0bDE1MS43Ni0xNTEuNzQ0YTE2IDE2IDAgMCAxIDIyLjYyNCAwbDExLjMxMiAxMS4zMTJ6IiBmaWxsPSIjY2RjZGNkIi8+PC9zdmc+",
					leftArrow: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik03NTguOTgzIDUyMC42NzNhMjMuMTU0IDIzLjE1NCAwIDAgMS0xNi40MjItNi44MThMMjc3LjcxIDQ5LjAwNWMtOS4wOS05LjA4OS05LjA5LTIzLjgxNCAwLTMyLjkwNCA5LjA4OC05LjA5IDIzLjgxNC05LjA5IDMyLjkwNCAwbDQ2NC44NSA0NjQuODVjOS4wOSA5LjA5IDkuMDkgMjMuODE1IDAgMzIuOTA1LTQuNTQ0IDQuNTQ1LTEwLjUxMyA2LjgxNy0xNi40ODIgNi44MTd6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTI2NS4xMDYgMTAxNC41OTVjLTUuOTUzIDAtMTEuOTA4LTIuMzAzLTE2LjQ1Mi02Ljg0Ny05LjA5LTkuMDktOS4wOS0yMy44MTUgMC0zMi45MDVsNDkzLjkwOC00OTMuODkyYzkuMDktOS4wOSAyMy44MTQtOS4wOSAzMi45MDQgMHM5LjA5IDIzLjgxNSAwIDMyLjkwNWwtNDkzLjkwOCA0OTMuODkyYy00LjU0NCA0LjU0NC0xMC40OTkgNi44NDctMTYuNDUyIDYuODQ3eiIgZmlsbD0iIzUxNTE1MSIvPjwvc3ZnPg=="
				},
				courseId: '', //学期号
				scoreList: [],
				pickerVis: false
			}
		},
		created() {},
		computed: {
			courseIds() {
				return this.$store.getters.courseIds
			},
			semesterIds() {
				return this.$store.getters.semesterIds
			},
			avgScore() {
				if (this.scoreList && this.scoreList.length > 0) {
					return (this.scoreList.reduce((result, next) => {
						if (next.point * 1 === 0) {
							return result
						}
						return result + next.point * 10 + 50
					}, 0) / this.scoreList.length).toFixed(2)
				}
				return 0
			},
			avgPoint() {
				if (this.scoreList && this.scoreList.length > 0) {
					return (this.scoreList.reduce((result, next) => 1 * result + 1 * next.point, 0) / this.scoreList
							.length)
						.toFixed(2)
				}
				return 0
			},
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
				console.log(this.semesterIds[this.courseId].id)
				wx.showLoading({
					title: '查询分数中',
					mask: true
				})
				try {
					const res = await getExamScore(semsterid)
					if (res.code) {
						throw new Error(res.msg)
					}
					console.log(res)
					this.scoreList = res.data
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

	.flex {
		display: flex;
	}

	.flex-sub {
		flex: 1;
	}

	.flex-treble {
		flex: 3;
	}

	.margin-top-sm {
		margin-top: 20rpx;
	}

	.padding {
		padding: 30rpx;
	}

	.text-cut {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.text-blue {
		color: #5975FF;
	}

	.text-red {
		color: #ff0004;
	}

	.text-green {
		color: #29e215;
	}

	.margin-top-lg {
		margin-top: 40rpx;
	}


	page {
		background-color: #eee;
	}

	.content-box {
		margin-top: 50px;
	}

	.content-box {
		padding: 18rpx;
		width: 100%;
		position: relative;
		display: block;
	}

	.content-box.bg-image {
		margin-top: 9.375rem;
	}

	.banner {
		position: relative;
		padding: 1.6em;
		background-image: linear-gradient(135deg, #FEC163 10%, #DE4313 100%);
	}

	.banner .sub-title {
		margin-top: .5em;
	}

	.banner .title,
	.banner .sub-title {
		color: #ffffff;
	}

	.banner .title {
		font-size: 1.5em;
		font-weight: 600;
	}

	.banner image {
		position: absolute;
		right: 1.6em;
		width: 54px;
		top: 22px;
		height: 54px;
		border-radius: 5em;
		box-shadow: 0 0px 13px 6px rgb(160 49 8 / 20%);
	}

	.scorePicker {
		position: fixed;
		width: 100%;
		z-index: 1;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%); 
	}

	.score {
		opacity: .8;
		font-size: 13px;
	}

	.list {
		position: relative;
		background-color: #ffffff;
		border-radius: 16rpx;
		padding: 8px;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		margin-right: 30rpx;
	}

	.list .title {
		font-size: 1.1em;
		border-bottom: 1px solid #eeeeee;
	}

	.list .item {
		position: relative;
		overflow: hidden;
		color: #333333;
		border-bottom: 1px solid #eee;
	}

	.list .item:last-child {
		border-bottom: 0;
	}

	.list .item .type {
		position: absolute;
		bottom: -7px;
		z-index: 1;
		right: -1px;
		font-weight: 900;
		font-size: 2.3em;
		opacity: .1;
		color: #333333;
	}

	.list .item .body {
		opacity: .8;
	}

	.list .item .name {
		font-weight: 600;
	}

	.list .item .address,
	.list .item .number {
		float: right;
	}

	.msg {
		text-align: center;
		opacity: .6;
		font-size: 14px;
	}
</style>
