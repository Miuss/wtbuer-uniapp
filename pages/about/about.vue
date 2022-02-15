<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				关于我们
			</div>
		</van-nav-bar>
		<view class='margin-xl padding-xl about'>
			<view class='text-center margin-bottom text-lg text-bold'>关于武工商课表</view>
			<view class='text-content text-grey'>
				<view>Hi！各位武工商校友们，欢迎各位使用武工商课表小程序！</view>
				<view class='margin-top-sm'>
					武工商课表是续（简简课小程序）后的一个重新开发的学生查阅课表以及教务系统数据的检索小程序。项目后端是基于php开发的，因为简简课下线太告急，我开发仓促，更多功能正在继续完善。
				</view>
				<view class='margin-top-sm'>免责声明：</view>
				<view class='margin-top-sm'>1.本小程序不会存放任何用户的数据，所有数据都将缓存到本地进行存储。</view>
				<view class='margin-top-sm'>2.小程序后端因不存储用户数据，每次获取课表可能会长达10几秒，请各位耐心等待。</view>
				<view class='margin-top-sm'>3.教务系统登录密码错误告知，并不是我们小程序修改了您的密码，而是教务系统程序本身的问题。</view>
				<view class='margin-top-sm'>小程序由19级人工智能学院学生自运营开发，与学校官方无关。</view>
			</view>
		</view>
		<view class='text-center margin-bottom text-lg text-gray'>© 2021 GenesisMiuss.</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				svg:{
					back: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik0zOTUuMjE1IDUxMy42MDVMNzE4LjM1MSAyMDEuMjNjMTkuMDUzLTE4LjQxNiAxOS4wNTMtNDguMjczIDAtNjYuNjYtMTkuMDU0LTE4LjQxNy00OS45MTEtMTguNDE3LTY4Ljk2NSAwTDI5MS43NTIgNDgwLjI5Yy0xOS4wNTMgMTguNDE2LTE5LjA1MyA0OC4yNzMgMCA2Ni42NmwzNTcuNjMzIDM0NS42ODhjOS41MjYgOS4yMDggMjIuMDEyIDEzLjc5NiAzNC40OTggMTMuNzk2IDEyLjQ4NSAwIDI0Ljk3MS00LjU4OCAzNC40NjctMTMuODI5IDE5LjA1My0xOC40MTYgMTkuMDUzLTQ4LjI0MiAwLTY2LjY2TDM5NS4yMTUgNTEzLjYwNXoiLz48L3N2Zz4="
				}
			}
		},
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({delta:1})
			},
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
