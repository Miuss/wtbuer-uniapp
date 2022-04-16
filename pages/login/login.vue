<template>
	<div>
		<div class="login-bg">
			<image
				style="background-image: url('http://tva1.sinaimg.cn/large/002ZE6Hrgy1guerewdsnkj62s02307wh02.jpg');">
			</image>
		</div>
		<div class="login-box">
			<div class="logo">
				<image :src="logo"></image>
			</div>
			<div class="title">武工商课表</div>
			<div class="sub-title">武工商学生课表查询小程序</div>
			<div class="sub-title">咳咳，说点啥?</div>
			<div class="sub-title">我在划水，别打扰我 💦</div>
			<div class="sub-title">Emmmm，我说点啥？</div>
			<div class="sub-title">开发君：🙇🏻‍别嫁人，我努力！</div>
			<div class="sub-title">由人工智能学院学生运营 🤖</div>
		</div>
		<div class="login-action" style="bottom: 20px;">
			<van-button type="primary" @click="wxlogin" block :loading="loginLoading" loading-text="微信登录中...">微信账号快速登录</van-button>
			<div class="login-tips">提示：登录后绑定教务账号才能查阅课表噢~</div>
		</div>

	</div>
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
				logo,
				loginLoading: false,
				svg: {
					schedule: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwNzcgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTM0LjYyNSIgaGVpZ2h0PSIxMjgiPjxwYXRoIGQ9Ik01MDEuMDYgNjE1LjU4Nmg3Ni45MDdjMjEuNTU4IDAgMzguNDgxLTE2LjkyMyAzOC40ODEtMzguNDI3IDAtMjEuNTU4LTE2LjkyMy0zOC40ODEtMzguNDgtMzguNDgxaC03Ni45MDljLTIxLjU1OCAwLTM4LjQ4IDE2LjkyMy0zOC40OCAzOC40OCAwIDIxLjU1OSAxNi45MjIgMzguNDI4IDM4LjQ4IDM4LjQyOHptMCAxNTMuODE1aDc2LjkwN2MyMS41NTggMCAzOC40ODEtMTYuOTIzIDM4LjQ4MS0zOC40MjcgMC0yMS41NTgtMTYuOTIzLTM4LjQ4LTM4LjQ4LTM4LjQ4aC03Ni45MDljLTIxLjU1OCAwLTM4LjQ4IDE2LjkyMi0zOC40OCAzOC40OCAwIDIxLjU1OCAxNi45MjIgMzguNDI3IDM4LjQ4IDM4LjQyN3ptNDIyLjk2NS02OTIuMTdINzcwLjI2NFYzOC44MDRjMC0yMS41NTgtMTYuOTIzLTM4LjQ4LTM4LjQ4MS0zOC40OC0yMS41NTggMC0zOC40MjcgMTYuOTIyLTM4LjQyNyAzOC40OHYzOC40MjdIMzg1LjcyNVYzOC44MDRjMC0yMS41NTgtMTYuOTIzLTM4LjQ4LTM4LjQ4MS0zOC40OC0yMS41NTggMC0zOC40MjcgMTYuOTIyLTM4LjQyNyAzOC40OHYzOC40MjdoLTE1My44N0ExNTQuMjQ3IDE1NC4yNDcgMCAwIDAgMS4xODYgMjMxLjA0N3Y2MTUuMjYyYTE1NC4yNDcgMTU0LjI0NyAwIDAgMCAxNTMuNzYxIDE1My44MTZoNzY5LjA3OGExNTQuMjQ3IDE1NC4yNDcgMCAwIDAgMTUzLjg3LTE1My44MTZWMjMxLjA0N0ExNTQuMjQ3IDE1NC4yNDcgMCAwIDAgOTI0LjAyNSA3Ny4yM3ptNzYuOTYyIDc2OS4wNzhjMCA0Mi4zMDctMzQuNjU0IDc2LjkwOC03Ni45NjIgNzYuOTA4SDE1NC45NDdhNzcuMTIzIDc3LjEyMyAwIDAgMS03Ni44NTQtNzYuOTA4VjM4NC44NjJoOTIyLjg5NFY4NDYuMzF6bTAtNTM4LjM1NEg3OC4wOTN2LTc2LjkwOGMwLTQyLjMwOCAzNC42LTc2LjkwOCA3Ni44NTQtNzYuOTA4aDE1My44N3YzOC40OGMwIDIxLjU1OSAxNi44NjkgMzguNDI4IDM4LjQyNyAzOC40MjhzMzguNDgtMTYuOTIzIDM4LjQ4LTM4LjQyN3YtMzguNDgxaDMwNy42MzJ2MzguNDhjMCAyMS41NTkgMTYuODY5IDM4LjQyOCAzOC40MjcgMzguNDI4czM4LjQ4LTE2LjkyMyAzOC40OC0zOC40Mjd2LTM4LjQ4MWgxNTMuNzYyYzQyLjMwOCAwIDc2Ljk2MiAzNC42IDc2Ljk2MiA3Ni45MDh2NzYuOTA4ek0yNzAuMzM2IDc2OS40aDc2LjkwOGMyMS41NTggMCAzOC40OC0xNi45MjMgMzguNDgtMzguNDI3IDAtMjEuNTU4LTE2LjkyMi0zOC40OC0zOC40OC0zOC40OGgtNzYuOTA4Yy0yMS41NTggMC0zOC40MjcgMTYuOTIyLTM4LjQyNyAzOC40OCAwIDIxLjU1OCAxNi44NyAzOC40MjcgMzguNDI3IDM4LjQyN3ptNDYxLjQ0Ny0xNTMuODE1aDc2LjkwOGMyMS41NTcgMCAzOC40MjYtMTYuOTIzIDM4LjQyNi0zOC40MjcgMC0yMS41NTgtMTYuODY5LTM4LjQ4MS0zOC40MjYtMzguNDgxaC03Ni45MDhjLTIxLjU1OCAwLTM4LjQyNyAxNi45MjMtMzguNDI3IDM4LjQ4IDAgMjEuNTU5IDE2Ljg2OSAzOC40MjggMzguNDI3IDM4LjQyOHptLTQ2MS40NDcgMGg3Ni45MDhjMjEuNTU4IDAgMzguNDgtMTYuOTIzIDM4LjQ4LTM4LjQyNyAwLTIxLjU1OC0xNi45MjItMzguNDgxLTM4LjQ4LTM4LjQ4MWgtNzYuOTA4Yy0yMS41NTggMC0zOC40MjcgMTYuOTIzLTM4LjQyNyAzOC40OCAwIDIxLjU1OSAxNi44NyAzOC40MjggMzguNDI3IDM4LjQyOHpNNzMxLjc4MyA3NjkuNGg3Ni45MDhjMjEuNTU3IDAgMzguNDI2LTE2LjkyMyAzOC40MjYtMzguNDI3IDAtMjEuNTU4LTE2Ljg2OS0zOC40OC0zOC40MjYtMzguNDhoLTc2LjkwOGMtMjEuNTU4IDAtMzguNDI3IDE2LjkyMi0zOC40MjcgMzguNDggMCAyMS41NTggMTYuODY5IDM4LjQyNyAzOC40MjcgMzguNDI3eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
					logo: ''
				}
			}
		},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			}
		},
		methods: {
			async wxlogin() {
				this.loginLoading = true
				try {
					const infoResult = await getUserProfile()
					const loginResult = await wxlogin()

					if (infoResult.userInfo === '' || loginResult.code === '') {
						throw new Error('登录失败，请重试')
					}

					await this.$store.dispatch('login', {
						code: loginResult.code,
						userInfo: infoResult.userInfo
					})
				} catch(e) {
					console.error(e)
				} finally {
					this.loginLoading = false
				}
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
