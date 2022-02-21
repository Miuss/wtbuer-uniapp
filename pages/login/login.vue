<template>
	<view>
		<div class="login-bg">
			<image style="background-image: url('../../assets/images/school_7.png');">
			</image>
		</div>

		<div class="login-container flex-column">
			<div class="title flex-row">
				<image class="logo" :src="logo" mode="aspectFill"></image>
				<div class="title-trans">
					<div class="cn">武工商课表</div>
					<div class="en">WTBU SCHDULE</div>
				</div>
			</div>
			<div class="content flex-column">
				<div class="sub-title1">Hi WTBUER! WELCOME</div>
				<div class="sub-title1">to 武汉工商学院学生社区</div>
				<div class="sub-title">致力打造完美学生社区 💦</div>
				<div class="sub-title">大学的学习生活应该是便捷的！</div>
				<div class="sub-title">开发君：🙇🏻‍别嫁人，我努力！</div>
				<div class="sub-title">由人工智能学院学生运营 🤖</div>
			</div>
			<div class="button-container flex-column">
				<div class="button flex" @click="wxlogin">微信账号快速登录</div>
				<div class="notified flex">
					提示：登录后绑定教务账号才能查阅课表噢~
				</div>
			</div>
		</div>

	</view>
</template>

<script>
	import {
		wxlogin,
		getUserProfile
	} from '../../utils/fetch'
	import logo from '../../assets/images/logo.png'
	import '../../assets/images/school_7.png'
	export default {
		data() {
			return {
				logo,
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
	.login-container {
		height: 100vh;
		width: 100%;
	}

	.login-container .title {
		width: 70%;
		justify-content: flex-start;	
		margin-top: 10%;
	}

	.login-container .title-trans {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		margin-left: 6%;
	}

	.login-container .title .title-trans .cn {
		height: 5vh;
		font-size: 18px;
		font-weight: bold;
		color: #FFFFFF;
		letter-spacing: 5px;
	}

	.login-container .title .title-trans .en {
		height: 5vh;
		font-size: 13px;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 10px;
		letter-spacing: 3px;
	}

	.login-container .content {
		width: 100%; 
		margin-top: 25%;
	}

	.login-container .content .sub-title1 {
		width: 65%;
		height: 5vh;
		font-size: 20px;
		font-weight: 500;
		color: #FFECCC;
		letter-spacing: 1px;
	}

	.login-container .content .sub-title {
		width: 65%;
		height: 4vh;
		font-size: 16px;
		font-weight: 500;
		color: #ffffff;
	}

	.login-container .button-container {
		width: 100%;
	}

	.login-container .button-container .button {
		width: 65%;
		height: 7vh;
		background: #5975FF;
		border-radius: 38px 38px 38px 38px;
		opacity: 1;
		font-size: 16px;
		font-weight: bold;
		color: #FFFFFF;
		letter-spacing: 0.2em;
	}

	.login-container .button-container .button:active {
		opacity: 0.6;
		transform: scale(.98);
		transition: .2s;
	}

	.login-container .button-container .notified {
		color: #FFFFFF;
		margin-top: 10rpx;
		font-size: 0.5em;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/*头像*/
	.logo {
		width: 7vh;
		height: 7vh;
	}


	/*背景图片*/
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
</style>
