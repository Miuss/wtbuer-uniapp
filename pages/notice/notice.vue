<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				最新公告
			</div>
		</van-nav-bar>
		<view class='margin-xl padding-xl about'>
			<view class='text-center margin-bottom text-lg text-bold'>最新公告</view>
			<view class='text-content text-grey'>
				<view>{{notice.title}}</view>
				<view class='margin-top-sm'>{{notice.content}}</view>
			</view>
		</view>
		<view class='text-center margin-bottom text-lg text-gray'>© 2021 GenesisMiuss.</view>
	</view>
</template>

<script>
	import {
		getNotices
	} from '../../api/systemapi.js'
	export default {
		data() {
			return {
				svg: {
					back: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MDkuOTIgNzk1Ljg0YzE1Ny45MDQgMCAyODUuOTItMTI4LjAxNiAyODUuOTItMjg1LjkyQzc5NS44NCAzNTIgNjY3LjgwOCAyMjQgNTA5LjkyIDIyNCAzNTIgMjI0IDIyNCAzNTIgMjI0IDUwOS45MmMwIDE1Ny45MDQgMTI4IDI4NS45MiAyODUuOTIgMjg1Ljkyem0wIDQ4QzMyNS41MDQgODQzLjg0IDE3NiA2OTQuMzIgMTc2IDUwOS45MiAxNzYgMzI1LjUwNCAzMjUuNTA0IDE3NiA1MDkuOTIgMTc2YzE4NC40MTYgMCAzMzMuOTIgMTQ5LjUwNCAzMzMuOTIgMzMzLjkyIDAgMTg0LjQxNi0xNDkuNTA0IDMzMy45Mi0zMzMuOTIgMzMzLjkyem01OC4yNzItNDg3LjI5NmExNiAxNiAwIDAgMSAwIDIyLjYyNGwtMTI5LjEyIDEyOS4xMiAxMjkuMTIgMTI5LjEyYTE2IDE2IDAgMCAxIDAgMjIuNjRMNTU2Ljg4IDY3MS4zNmExNiAxNiAwIDAgMS0yMi42MjQgMEwzODIuNDk2IDUxOS42YTE2IDE2IDAgMCAxIDAtMjIuNjI0bDE1MS43Ni0xNTEuNzQ0YTE2IDE2IDAgMCAxIDIyLjYyNCAwbDExLjMxMiAxMS4zMTJ6IiBmaWxsPSIjY2RjZGNkIi8+PC9zdmc+"
				},
				notice: {
					title: '',
					content: ''
				}
			}
		},
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
		},
		created() {
			getNotices(1, 20).then(res => {
				console.log(res)
				if (res.code === 0) {
					const data = res.data.data
					this.notice = {
						...data[data.length - 1]
					}
				}
			})
		}
	}
</script>

<style>
	@import url("../../assets/css/nav_bar.css");

	.about {
		border-radius: 8px !important;
		border-top: 5px solid #5975ff;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
	}

	.margin-xl {
		margin: 50rpx;
	}

	.margin-top-sm {
		margin-top: 20rpx;
	}

	.margin-bottom {
		margin-bottom: 30rpx;
	}

	.padding-xl {
		padding: 50rpx;
	}

	.text-center {
		text-align: center;
	}

	.text-bold {
		font-weight: bold;
	}

	.text-lg {
		font-size: 32rpx;
	}

	.text-content {
		line-height: 1.6;
	}

	.text-grey,
	.line-grey,
	.lines-grey {
		color: var(--grey);
	}
</style>
