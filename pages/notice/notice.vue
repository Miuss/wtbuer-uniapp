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
	import back from '../../assets/images/back.svg'
	export default {
		data() {
			return {
				svg: {
					back,
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
