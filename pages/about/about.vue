<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="back" :src="svg.back" />
				关于我们
			</div>
		</van-nav-bar>
		<div class="margin-xl padding-xl about">
			<div class="text-content-title">关于武工商课表</div>
			<div class="text-content">
				<div>Hi！各位武工商校友们，欢迎各位使用武工商课表小程序！</div>
				<div class="margin-top-sm">
					武工商课表是续（简简课小程序）停运后的一个重新开发的学生查阅课表以及教务系统数据的检索小程序。项目后端是基于php开发的，更多功能正在继续完善。
				</div>
				<div class="margin-top-sm">免责声明：</div>
				<div class="margin-top-sm">1.本小程序不会存放任何用户的数据，所有数据都将缓存到本地进行存储。</div>
				<div class="margin-top-sm">2.小程序为了方便用户不用重复绑定教务账号，以及给用户更好的提醒服务，从2022年3月4日开始将存储用户账号密码。</div>
				<div class="margin-top-sm">3.教务系统登录密码错误告知，并不是我们小程序修改了您的密码，而是教务系统程序本身的问题。</div>
				<div class="margin-top-sm">4.如果对账号密码存储感到担忧，请停止使用我们的小程序，您解除教务绑定，我们会删除您所有的教务账号。</div>
				<div class="margin-top-sm">小程序由19级人工智能学院学生自运营开发，与学校官方无关。</div>
			</div>
		</div>
		<div class="copyright">© 2022 GenesisMiuss.</div>
	</div>
</template>

<script>
	import back from '../../assets/images/back.svg'
	
	export default {
		data() {
			return {
				svg:{
					back,
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
	.text-content {
		line-height: 1.6;
		font-size: 16px;
		opacity: .6;
	}
	
	.text-content-title {
		text-align: center;
		font-weight: 600;
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.copyright {
		opacity: .6;
		text-align: center;
	}
	.text-grey,
	.line-grey,
	.lines-grey {
		color: var(--grey);
	}
</style>
