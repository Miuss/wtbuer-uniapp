<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				考试查询
			</div>
		</van-nav-bar>
		<van-cell-group class="examPicker" :border="false">
			<van-cell @click="showPicker()" title-width="20%" title="学期"
				:value="courseId===''?semesterIds[courseIds.index].year:semesterIds[courseId].year" is-link />
		</van-cell-group>
		<van-popup title="请选择学期" position="bottom" round :show="pickerVis">
			<van-picker :show-toolbar="true" @cancel="pickerVis=false" @confirm="onConfirmChangeIds()" value-key="year"
				:columns="semesterIds" confirm-button-text="确认" cancel-button-text="取消"
				:default-index="courseIds.index" />
		</van-popup>
		<div class="content-box">
			<div class="list" v-if="examList.length != 0">
				<div class="item" v-for="item in examList">
					<div class="header padding-lr padding-top">
						<div class="address">{{item.address=="地点未安排"?"考场尚未安排":item.address}}</div>
						<div class="name text-cut">{{item.name}}</div>
					</div>
					<div class="body padding-lr padding-bottom padding-top-sm">
						<div class="number">{{item.number=="地点未安排"?"座位尚未安排":"座位号："+item.number}}</div>
						<div class="date">{{item.time=="时间未安排"?"考试时间尚未安排":item.date+" "+item.time}}</div>
					</div>
					<div class="footer padding">
						<div class="cid">{{item.cid}}</div>
					</div>
					<div class="type">{{item.type}}</div>
				</div>
			</div>
			<div class="msg margin-top-lg" v-if="list.length == 0">该学期暂无任何考试</div>
		</div>
	</view>
</template>

<script>
	import {
		getExamList
	} from '../../api/easmapi.js'
	export default {
		data() {
			return {
				svg: {
					back: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik0zOTUuMjE1IDUxMy42MDVMNzE4LjM1MSAyMDEuMjNjMTkuMDUzLTE4LjQxNiAxOS4wNTMtNDguMjczIDAtNjYuNjYtMTkuMDU0LTE4LjQxNy00OS45MTEtMTguNDE3LTY4Ljk2NSAwTDI5MS43NTIgNDgwLjI5Yy0xOS4wNTMgMTguNDE2LTE5LjA1MyA0OC4yNzMgMCA2Ni42NmwzNTcuNjMzIDM0NS42ODhjOS41MjYgOS4yMDggMjIuMDEyIDEzLjc5NiAzNC40OTggMTMuNzk2IDEyLjQ4NSAwIDI0Ljk3MS00LjU4OCAzNC40NjctMTMuODI5IDE5LjA1My0xOC40MTYgMTkuMDUzLTQ4LjI0MiAwLTY2LjY2TDM5NS4yMTUgNTEzLjYwNXoiLz48L3N2Zz4="
				},
				examList: [],
				pickerVis: false,
				courseId: ''
			}
		},
		computed: {
			courseIds() {
				return this.$store.getters.courseIds
			},
			semesterIds() {
				return this.$store.getters.semesterIds
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
				this.courseId = e.detail.value.index
				const semsterid = e.detail.value.id
				console.log(semsterid)
				wx.showLoading({
					title: '查询考试中',
					mask: true
				})
				try {
					const res = await getExamList(semsterid)
					if (res.code) {
						throw new Error(res.msg)
					}
					this.examList = res.data
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

	.padding {
		padding: 30rpx;
	}

	.padding-lr {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.padding-top {
		padding-top: 30rpx;
	}

	.padding-top-sm {
		padding-top: 20rpx;
	}

	.padding-bottom {
		padding-bottom: 30rpx;
	}

	.margin-top-lg {
		margin-top: 40rpx;
	}

	.text-cut {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
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

	.examPicker {
		position: fixed;
		width: 100%;
		z-index: 1;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
	}

	.list {
		position: relative;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		margin-right: 30rpx;
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
