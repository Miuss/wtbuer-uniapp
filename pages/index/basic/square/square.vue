<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				<img class="logo" :src="logo" />武工商课表
			</div>
		</van-nav-bar>
		<div class="unbind-eams-member" v-if="user.member_id === ''">
			<van-empty description="尚未绑定教务系统账号">
				<van-button round type="primary" class="bottom-button" color="#4562e5"
					@click="$store.dispatch('showBindMember', true)">立即绑定教务账号</van-button>
			</van-empty>
		</div>
		<div v-else>
			<van-grid :gutter="10" :border="false">
				<van-grid-item @click="toExam()" use-slot>
					<image style="width: 80%; height: 60px;" :src="svg.examLogo" /> 考试查询
				</van-grid-item>
			</van-grid>
		</div>
	</view>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	export default {
		data() {
			return {
				logo,
				svg: {
					examLogo: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTczMy43NiA0NDMuNzI4SDI5MC4xNDRWMzM3LjY5NmMwLTE2Ljc4NCAxMi44MTYtMzAuNDk2IDI4LjQ5Ni0zMC40OTZoMzg2Ljc1MmMxNS42OCAwIDI4LjQ4IDEzLjcxMiAyOC40OCAzMC40OTZ2MTA2LjAzMmgtLjA4eiIgZmlsbD0iI0E1QkJGRiIvPjxwYXRoIGQ9Ik01MTIgMEMyMjkuMjY0IDAgMCAyMjcuMjk2IDAgNTA3LjZjMCAxNjAuNjQgNzUuMzI4IDMwMy44NTYgMTkyLjc1MiAzOTYuOTI4di00MzMuMTJhMjguOCAyOC44IDAgMCAxIDI4LjgzMi0yOC41OTJIODAzLjkyYTI4LjggMjguOCAwIDAgMSAyOC44MzIgMjguNTkyVjkwMy40NEM5NDkuMjggODEwLjM2OCAxMDI0IDY2Ny42NDggMTAyNCA1MDcuNiAxMDI0IDIyNy4yOTYgNzk0LjczNiAwIDUxMiAweiIgZmlsbD0iI0ZBN0Q0RiIvPjxwYXRoIGQ9Ik03OTAuODQ4IDQ0My43MjhIMjE2LjE5MmMtMTUuNjY0IDAtMjguNDY0IDEzLjA0LTI4LjQ2NCAyOC45NzZ2NDM5LjAwOEMyNzQuMDggOTgyIDM4My42NDggMTAyNCA1MDIuNzY4IDEwMjRjMTE5LjgyNCAwIDIyOS43OTItNDIuNCAzMTYuNDMyLTExMy4zOTJ2LTQzOGMuMDk2LTE1Ljg0LTEyLjcwNC0yOC44OC0yOC4zNTItMjguODh6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTY2OS4zMjggNTQ3LjQyNGMwIDE5LjUyLTE1LjM5MiAzNS40MjQtMzQuMzIgMzUuNDI0aC0yNTkuMzZjLTE4LjkxMiAwLTM0LjMyLTE1Ljg4OC0zNC4zMi0zNS40MjQgMC0xOS41MiAxNS40MDgtMzUuNDI0IDM0LjMyLTM1LjQyNGgyNTkuMzZjMTguOTI4IDAgMzQuMzIgMTUuODg4IDM0LjMyIDM1LjQyNHptMS4xODQgODMuNzkybDIuNzM2IDIuODMyYzEyLjU2IDEyLjk2IDEyLjU2IDM0LjIwOCAwIDQ3LjI2NEw0NzMuNTIgODg3LjQ3MmwtNDguNTQ0LTUwLjA5Nkw2MjQuNzIgNjMxLjJhMzEuODQgMzEuODQgMCAwIDEgNDUuNzkyIDB6IiBmaWxsPSIjRkE3RDRGIi8+PHBhdGggZD0iTTM1MC44NjQgNzEwLjQ2NGEzNi4yNzIgMzYuMjcyIDAgMCAxIDUxLjUyIDBsMTI2LjY4OCAxMjcuODA4LTQ4Ljc2OCA0OS4yLTEyOS40NC0xMzAuNTkyYTMzLjAyNCAzMy4wMjQgMCAwIDEgMC00Ni40eiIgZmlsbD0iI0ZBN0Q0RiIvPjxwYXRoIGQ9Ik03MzMuODcyIDQ0My43MjhIMjkwLjEyOFYzNTIuOGMwLTE1LjcxMiAxMi41NDQtMjguNTI4IDI3LjkyLTI4LjUyOGgzODcuOTA0YzE1LjM3NiAwIDI3LjkyIDEyLjggMjcuOTIgMjguNTI4djkwLjkyOHoiIGZpbGw9IiNGRkJFODkiLz48L3N2Zz4="
				}
			}
		},
		methods: {
			toExam() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/exam/exam',
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
</style>
