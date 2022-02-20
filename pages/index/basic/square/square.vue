<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left" style="width: 100%;">
				<img class="logo" :src="logo" />武工商课表
			</div>
		</van-nav-bar>
		<swiper></swiper>
		<div class="outside">
			<div class="func-bars-container">
				<div class="func-bars">
					<div class="block-title">
						<image class="point" :src="svg.point"></image>
						教务系统
					</div>
					<div class="function-bar-container">
						<div class="function-bar" @click="toExam()">
							<div class="function-bar-icon">
								<image class="img" :src="svg.examLogo"></image>
							</div>
							<div class="function-bar-text">
								<div class="text-title">考试查询</div>
							</div>
						</div>

						<div class="function-bar" @click="toScore()">
							<div class="function-bar-icon">
								<image class="img" :src="svg.scoreLogo"></image>
							</div>
							<div class="function-bar-text">
								<div class="text-title">分数查询</div>
							</div>
						</div>
					</div>
					<div class="block-title">
						<image class="point" :src="svg.point"></image>
						其他
					</div>
					<div class="function-bar-container">
						<div class="function-bar" @click="toLibrary()">
							<div class="function-bar-icon">
								<image class="img" :src="svg.library"></image>
							</div>
							<div class="function-bar-text">
								<div class="text-title">图书馆</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import school1 from '../../../../assets/images/school_1.png'
	import swiper from './components/imgSwiper.vue'
	export default {
		components: {
			swiper
		},
		data() {
			return {
				logo,
				svg: {
					examLogo: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTczMy43NiA0NDMuNzI4SDI5MC4xNDRWMzM3LjY5NmMwLTE2Ljc4NCAxMi44MTYtMzAuNDk2IDI4LjQ5Ni0zMC40OTZoMzg2Ljc1MmMxNS42OCAwIDI4LjQ4IDEzLjcxMiAyOC40OCAzMC40OTZ2MTA2LjAzMmgtLjA4eiIgZmlsbD0iI0E1QkJGRiIvPjxwYXRoIGQ9Ik01MTIgMEMyMjkuMjY0IDAgMCAyMjcuMjk2IDAgNTA3LjZjMCAxNjAuNjQgNzUuMzI4IDMwMy44NTYgMTkyLjc1MiAzOTYuOTI4di00MzMuMTJhMjguOCAyOC44IDAgMCAxIDI4LjgzMi0yOC41OTJIODAzLjkyYTI4LjggMjguOCAwIDAgMSAyOC44MzIgMjguNTkyVjkwMy40NEM5NDkuMjggODEwLjM2OCAxMDI0IDY2Ny42NDggMTAyNCA1MDcuNiAxMDI0IDIyNy4yOTYgNzk0LjczNiAwIDUxMiAweiIgZmlsbD0iI0ZBN0Q0RiIvPjxwYXRoIGQ9Ik03OTAuODQ4IDQ0My43MjhIMjE2LjE5MmMtMTUuNjY0IDAtMjguNDY0IDEzLjA0LTI4LjQ2NCAyOC45NzZ2NDM5LjAwOEMyNzQuMDggOTgyIDM4My42NDggMTAyNCA1MDIuNzY4IDEwMjRjMTE5LjgyNCAwIDIyOS43OTItNDIuNCAzMTYuNDMyLTExMy4zOTJ2LTQzOGMuMDk2LTE1Ljg0LTEyLjcwNC0yOC44OC0yOC4zNTItMjguODh6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTY2OS4zMjggNTQ3LjQyNGMwIDE5LjUyLTE1LjM5MiAzNS40MjQtMzQuMzIgMzUuNDI0aC0yNTkuMzZjLTE4LjkxMiAwLTM0LjMyLTE1Ljg4OC0zNC4zMi0zNS40MjQgMC0xOS41MiAxNS40MDgtMzUuNDI0IDM0LjMyLTM1LjQyNGgyNTkuMzZjMTguOTI4IDAgMzQuMzIgMTUuODg4IDM0LjMyIDM1LjQyNHptMS4xODQgODMuNzkybDIuNzM2IDIuODMyYzEyLjU2IDEyLjk2IDEyLjU2IDM0LjIwOCAwIDQ3LjI2NEw0NzMuNTIgODg3LjQ3MmwtNDguNTQ0LTUwLjA5Nkw2MjQuNzIgNjMxLjJhMzEuODQgMzEuODQgMCAwIDEgNDUuNzkyIDB6IiBmaWxsPSIjRkE3RDRGIi8+PHBhdGggZD0iTTM1MC44NjQgNzEwLjQ2NGEzNi4yNzIgMzYuMjcyIDAgMCAxIDUxLjUyIDBsMTI2LjY4OCAxMjcuODA4LTQ4Ljc2OCA0OS4yLTEyOS40NC0xMzAuNTkyYTMzLjAyNCAzMy4wMjQgMCAwIDEgMC00Ni40eiIgZmlsbD0iI0ZBN0Q0RiIvPjxwYXRoIGQ9Ik03MzMuODcyIDQ0My43MjhIMjkwLjEyOFYzNTIuOGMwLTE1LjcxMiAxMi41NDQtMjguNTI4IDI3LjkyLTI4LjUyOGgzODcuOTA0YzE1LjM3NiAwIDI3LjkyIDEyLjggMjcuOTIgMjguNTI4djkwLjkyOHoiIGZpbGw9IiNGRkJFODkiLz48L3N2Zz4=",
					scoreLogo: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgNTEyYTUxMiA1MTIgMCAxIDAgMTAyNCAwQTUxMiA1MTIgMCAxIDAgMCA1MTJ6IiBmaWxsPSIjMjc4QkVEIi8+PHBhdGggZD0iTTIwOS42MTMgNzI3LjM4MWEyNS42IDI1LjYgMCAwIDEtMTkuOTM0LTQxLjY0MmwyMDkuNzgzLTI2MS4yOTFhMjUuNTY2IDI1LjU2NiAwIDAgMSAzMS4wMjgtNy4wNjZsMTY4LjEwNiA4MC4yNDhMODAwLjgwMiAyODYuNDhhMjUuNiAyNS42IDAgMSAxIDM2Ljk2NyAzNS4zOTZsLTIxNS4wNCAyMjQuNTNhMjUuNDYzIDI1LjQ2MyAwIDAgMS0yOS41MjYgNS4zOTJsLTE2Ni41MzYtNzkuNDk2TDIyOS41OCA3MTcuNzlhMjUuNiAyNS42IDAgMCAxLTE5Ljk2OCA5LjU5MXptNjUuNDMzLTIwNC4xNTFhMjUuNTMyIDI1LjUzMiAwIDAgMS0xNS43Ny01LjQyN2wtNzAuMzQ4LTU1LjA1N2EyNS42IDI1LjYgMCAwIDEgMzEuNTQtNDAuMzQ2bDcwLjM4MiA1NS4wNTdhMjUuNiAyNS42IDAgMCAxLTE1LjgwNCA0NS43NzN6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTYyMC40NDIgNzUzLjA1YTI1LjY2OCAyNS42NjggMCAwIDEtMTQuMzctNC40MDRMMzkzLjExMyA2MDQuMzY1YTI1LjYgMjUuNiAwIDEgMSAyOC43MDYtNDIuMzk0bDE5Ni40NzEgMTMzLjEyIDE4My45MS0xNjMuNDNhMjUuNiAyNS42IDAgMCAxIDM0LjEzNCAzOC4yNjNMNjM3LjU3NyA3NDYuNTk4YTI1LjYgMjUuNiAwIDAgMS0xNy4xMzUgNi40NTJ6IiBmaWxsPSIjRkZGIi8+PC9zdmc+",
					library: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MTIgMGE1MTIgNTEyIDAgMSAwIDUxMiA1MTJBNTEyIDUxMiAwIDAgMCA1MTIgMHoiIGZpbGw9IiM1OTc1RkYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkzIiBjbGFzcz0ic2VsZWN0ZWQiLz48cGF0aCBkPSJNMzA0Ljg4MSA2NzYuMzA2YzE4Ljc4IDAgMTAzLjE5Ny0xLjU3IDIxOC44OTQgNjMuODI3IDExNS42MzYtNjUuNjk5IDIwMC4yOTUtNjMuODI3IDIxOC45NTQtNjMuODI3czIwLjA0OC0xMi4wNzcgMjAuMDQ4LTEyLjA3N1YyNjQuMzAzYzAtMTcuMjEtOC4zMzMtMTMuNTI2LTguMzMzLTEzLjUyNi0xNzEuOTE1IDMuNjIzLTIzMC43OSA4Ny43OTktMjMwLjc5IDg3Ljc5OXMtNTkuMzU4LTg0Ljk2MS0yMzEuMDMtODcuOGMwIDAtOC4zMzQtMy42MjItOC4zMzQgMTMuNTI3djM5OS45MjZjLjQ4MyAwIDEuODEyIDEyLjA3NyAyMC41OTEgMTIuMDc3em0yMDUuMzA3LTMwOS41M2gyOC4zODF2MzM5LjcyMmgtMjguMnoiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNODE2Ljc2IDMwOC42MjVoLTE4LjcxOWMtNi4wMzggMC02LjAzOCAyLjM1NS02LjAzOCA2LjAzOXYzNzcuNzY1YzAgMTIuMDc3LTkuNjAxIDEyLjA3Ny0xNC43OTQgMTIuMDc3LTIwNC4wNC0zLjA4LTI1My4yNTMgNjMuMDQxLTI1My4yNTMgNjMuMDQxcy00OS4yNzQtNjYuNDIzLTI1My4yNTItNjMuMDQxYy01LjI1NCAwLTE0Ljg1NSAwLTE0Ljg1NS0xMi4wNzdWMzE0LjYwM2MwLTMuNjIzLS43ODUtNi4wMzgtNi4wMzgtNi4wMzhoLTE2LjM2NWMtNC40NjggMC02LjAzOCAxLjU3LTYuMDM4IDYuNzYzdjQxMy4yMWMwIDUuMTk0IDIuMzU1IDcuNTQ5IDYuODIzIDcuNTQ5IDM2LjcxNC0yLjM1NSAyMDQuNzY0LTMuMTQgMjU4LjQ0NiA1Ni4yNzhoNjIuODZjNjkuNTYzLTY2LjQyMyAyMjIuNzU5LTU4LjYzMyAyNTkuMTctNTYuMjc4IDQuNDY5IDAgNi44MjQtMi4zNTUgNi44MjQtNy41NDh2LTQxMy4xNWMtLjMwMi00LjQwOS0uMzAyLTYuNzY0LTQuNzctNi43NjR6IiBmaWxsPSIjRkZGIi8+PC9zdmc+",
					point: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MTIgNjAxLjZhODkuNiA4OS42IDAgMSAwLTg5LjYtODkuNiA4OS41OSA4OS41OSAwIDAgMCA4OS42IDg5LjZ6bTAgMCIgZmlsbD0iIzdhNjZlNyIvPjwvc3ZnPg=="
				}
			}
		},
		methods: {
			toExam() {
				if (this.user.member_id === '') {
					this.$store.dispatch('showBindMember', true)
					return
				}
				this.isClick.exam = true
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/exam/exam',
				})
			},
			toScore() {
				if (this.user.member_id === '') {
					this.$store.dispatch('showBindMember', true)
					return
				}
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/score/score',
				})
			},
			toLibrary(){
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/library/library',
				})
			}
		},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			},
			user() {
				return this.$store.getters.user
			}
		},
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

	.unbind-eams-member {
		background-color: #fff;
	}


	.unbind-eams-member .bottom-button {
		width: 160px;
	}

	.text-purple,
	.line-purple,
	.lines-purple {
		color: var(--purple);
	}

	.title {
		margin-top: 8rpx;
		margin-bottom: 8rpx;
		font-size: 16px;
		font-weight: 600;
		color: #000000;
	}

	.padding-tb {
		padding-top: 30rpx;
		padding-bottom: 30rpx;
	}

	/*分割线*/
	.outside {
		width: 100%;
		height: 60vh;
		display: flex;
		justify-content: center;
	}

	.func-bars-container {
		width: 100%;
		height: 55vh;
		margin-top: 23%;
		padding-top: 10rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		background-color: #5975FF;
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);

	}

	.func-bars {
		height: 55vh;
		background-color: #ffffff;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	/*基础样式*/
	.function-bar-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20rpx;
	}

	.function-bar {
		width: 20%;
		margin-left: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ffffff;
	}

	.function-bar-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 120rpx;
		width: 120rpx;
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);
		border-radius: 40rpx;
		background-color: #ffffff;
	}

	.function-bar-icon:active {
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
	}

	.function-bar-icon .img {
		width: 90rpx;
		height: 90rpx;
		background-color: #ffffff;
	}

	.function-bar-text {
		height: 40%;
		display: flex;
		justify-content: center;
		margin-top: 10rpx;
	}

	.text-title {
		font-size: 24rpx;
		font-weight: 800;
		color: #7e7e7e;
		margin-bottom: 20rpx;
	}

	/*标题*/
	.block-title {
		display: flex;
		margin-left: 10rpx;
		align-items: center;
		font-size: 1.1em;
		font-weight: 600;
	}

	.point {
		width: 70rpx;
		height: 70rpx;
		margin: 0;
	}
</style>
