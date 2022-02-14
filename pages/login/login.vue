<template>
	<view>
		<div class="login-bg">
			<image
				style="background-image: url('http://tva1.sinaimg.cn/large/002ZE6Hrgy1guerewdsnkj62s02307wh02.jpg');">
			</image>
		</div>
		<div class="login-box">
			<div class="logo">
				<image :src="logo"></image>
			</div>
			<div class="title">Wtbuer</div>
			<div class="sub-title">武汉工商学院学生社区</div>
			<div class="sub-title">咳咳，说点啥?</div>
			<div class="sub-title">我在划水，别打扰我 💦</div>
			<div class="sub-title">Emmmm，我说点啥？</div>
			<div class="sub-title">开发君：🙇🏻‍别嫁人，我努力！</div>
			<div class="sub-title">由人工智能学院学生运营 🤖</div>
		</div>
		<div class="login-action" style="bottom: 20px;">
			<van-button type="primary" @click="wxlogin">微信账号快速登录</van-button>
			<div class="login-tips">提示：登录后绑定教务账号才能查阅课表噢~</div>
		</div>
	</view>
</template>

<script>
	import {
		wxlogin,
		getUserProfile
	} from '../../utils/fetch'
	import logo from '../../assets/images/logo.png'
	export default {
		data() {
			return {
				logo
			}
		},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			}
		},
		methods: {
			async wxlogin() {
				const infoResult = await getUserProfile()
				const loginResult = await wxlogin()

				if (infoResult.userInfo === '' || loginResult.code === '') {
					throw new Error('登录失败，请重试')
				}

				this.$store.dispatch('login', {
					code: loginResult.code,
					userInfo: infoResult.userInfo
				})
			}
		}
	}
</script>

<style scoped>
	.login-bg {
		position: fixed;
		height: 100vh;
		width: 100vw;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.login-bg image {
		z-index: -1;
		width: 140vw;
		height: 140vh;
		left: -20px;
		right: -20px;
		top: -20px;
		bottom: -20px;
		position: absolute;
		background-size: cover;
	}

	.login-bg::after {
		background-color: rgba(17, 17, 17, 0.6);
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
	}

	.login-box {
		padding: 3em;
	}

	.login-box .logo image {
		margin-top: 3em;
		width: 64px;
		height: 64px;
		border-radius: 5em;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 2%), 0 16px 32px 0 rgb(0 0 0 / 7%);
		-webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
	}

	.login-box .title {
		margin-top: 20px;
		margin-bottom: 8px;
		font-size: 1.7em;
		font-weight: 600;
		color: #fff;
	}

	.login-box .sub-title {
		margin-top: 6px;
		font-size: 1.2em;
		opacity: .8;
		color: #fff;
	}

	.login-action {
		position: fixed;
		left: 3em;
		right: 3em;
		text-align: center;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.login-action .login-button {
		margin: 0 auto;
		width: 80%;
		padding: .8em 1.5em;
		color: #ffffff;
		font-weight: 500;
		font-size: 15px;
		border-radius: 8rpx;
		text-align: center;
	}

	.login-action .login-button:active {
		transform: scale(.98);
		transition: .2s;
	}

	.login-action .login-tips {
		margin-top: 8px;
		font-size: 13px;
		opacity: .6;
		color: #fff;
	}
</style>
