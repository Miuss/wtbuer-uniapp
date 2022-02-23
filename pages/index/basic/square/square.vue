<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left" style="width: 100%;">
				<img class="logo" :src="logo" />武工商课表
			</div>
		</van-nav-bar>

		<div class="outside">
			<div class="head">
				<div class="saying">
					<div class="sub-title1">
						{{wishes.time+", Wtbuer"}}
					</div>
					<div class="sub-title2">
						{{wishes.wishes}}
					</div>
				</div>
				<image class="time_icon" :src="wishes.icon" />
			</div>
			<div class="func-bars-container">
				<div class="row-first">
					<div class="func-bar exam">
						<div class="icon">
							<image class="img left" :src="svg.scoreLogo3"></image>
						</div>
						<div class="title">
							<div class="cn left">考试查询</div>
							<div class="en left">Examination Inquiry</div>
						</div>
						<div class="button-container">
							<div class="description left">考试顺利！</div>
							<div class="button left-btn" @click="toExam()">START</div>
						</div>
					</div>
					<div class="func-bar score">
						<div class="icon">
							<image class="img right" :src="svg.examLogo2"></image>
						</div>
						<div class="title">
							<div class="cn right">分数查询</div>
							<div class="en right">Score Query</div>
						</div>
						<div class="button-container">
							<div class="description right">好运伴你！</div>
							<div class="button right-btn" @click="toScore()">START</div>
						</div>
					</div>
				</div>
				<div class="row-second">
					<div class="func-bar">
						<div class="library">
							<div class="title-cn">武汉工商学院·图书馆</div>
							<div class="title-en">WTBU Library</div>
						</div>
						<div class="button" @click="toLibrary()">GO</div>
					</div>
				</div>
			</div>

			<div class="other-function">
				<van-empty image="search" description="开发君正在加班~~~" />
			</div>
		</div>
	</view>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	export default {
		components: {
		},
		data() {
			return {
				logo,
				svg: {
					examLogo2: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTEwNS4zMjEgOTE0LjI2NWMtMTEuNyAwLTE3LjU1LTExLjcwMi0xNy41NS0xNy41NDIgMC01Ljg3IDUuODUtMTcuNTUgMTEuNzEtMTcuNTUgMjY5LjE1NC0xMTEuMTk1IDU2MS43MjEtMTY5LjY4NiA4NDguNDQtMTgxLjR2NS44NGMyMy40MSAwIDUyLjY2Mi01Ljg0IDc2LjA3Ni01Ljg0djExLjcxMmMtMjkyLjU1OCAyOS4yNTItNTc5LjI4NCA4Ny43NTctODU0LjMgMTc1LjUzNi0xNy41NTEgMTcuNTQyLTQwLjk2NSAyMy40MDMtNjQuMzc2IDI5LjI0NHptNjY3LjA2MS0zMzMuNTIzYy0yOS4yNiAwLTU4LjUxNC01Ljg2MS03Ni4wNTQtMjkuMjQxLTE3LjU1My0yMy40MTItMzUuMTI0LTQ2LjgyNi0zNS4xMjQtNzYuMDggMC04MS45MTcgMjMuNDAzLTE1Ny45ODQgNzYuMDctMjIyLjM1IDQ2LjgzNC02NC4zNzcgMTE3LjA0Mi0xMTEuMTcgMTkzLjEwNS0xNDAuNDM0IDI5LjI1MiAwIDUyLjY1NSAxNy41NjQgNjQuMzY4IDQwLjk1NS01Ljg2MyA1Ljg1LTExLjcxMSAxMS43MTEtMTcuNTYzIDExLjcxMSAyOS4yNTEgMTEuNyA0MC45NTIgMzUuMTAyIDQwLjk1MiA2NC4zNjYgNS44NjMgMTYzLjgzNS05OS40NiAzMTAuMTIyLTI0NS43NTQgMzUxLjA3M3pNOTMwLjM4IDIwNi4yNTdjLTExLjcwMiA1Ljg1LTI5LjI3MyAxNy41NTEtNDAuOTU0IDI5LjI2NS01Ljg3IDAtNS44Ny01Ljg1LTUuODctMTEuNzEyLTg3Ljc3OSA1Mi42NjYtMTQ2LjI4MiAxNDYuMjk1LTE1Mi4xMTQgMjQ1Ljc0MyAwIDExLjcxMiA1LjgzMiA1Mi42NjYgMjMuMzgxIDQ2LjgzNSAyOS4yODQtMTEuNzEgNTIuNjYyLTIzLjQyMyA3MC4yMjYtNDYuODM1IDE5LjUwNC0yMS40NDIgMzkuMDA1LTQyLjg5NCA1OC41MDctNjQuMzQ1IDM1LjEyMi00Ni44MTUgNTguNTM2LTEwNS4zMiA3MC4yMTctMTYzLjg0NyAxMS43LTE3LjU1My01Ljg0OS0yOS4yNTMtMjMuMzkzLTM1LjEwNHptLTgwNy41MDcgODEuOTI4bC02NC4zNjYgMjkuMjUyYy01Ljg0IDUuODQtMTEuNjkgNS44NC0xNy41NCA1Ljg0LTUuODYzIDAtNS44NjMtMTEuNzE0LTUuODYzLTE3LjU0IDAtMTcuNTUyIDExLjcxMy0yOS4yNjUgMjkuMjczLTM1LjExNSAzNS4xMDQtMjkuMjY1IDcwLjIwNi01Mi42NTUgMTExLjE1OC03MC4yMTcgMTcuNTUxIDUuODUgMjkuMjY1IDIzLjQwMyAzNS4xMTUgNDAuOTUyIDAgMTcuNTQgMCAxNy41NC04MS45MiAyMDQuODEzLTI5LjI0OSA1OC41MDUtNTIuNjUgMTIyLjg3My01OC41MjIgMTg3LjIzOCAwIDUuODUyIDUuODcyIDE3LjU1MiA1Ljg3MiAyMy40MTJ2NS44NDFjLTEuOTYgMS45NDktMy45MSAzLjkxMi01Ljg3MiA1Ljg2MS01LjgzIDAtMTEuNyAwLTExLjctNS44NjEtMjkuMjU0IDAtNTIuNjY1LTE3LjU1My01OC41MDYtNDYuODA0IDAtNDYuODE0IDExLjcxMS05OS40NyAyOS4yNTItMTQwLjQzNCAyMy40MTQtNjQuMzY2IDU4LjUxNy0xMjIuODcxIDkzLjYyLTE4Ny4yMzh6bTUxNC45Mi01Ljg1OWMxMS43IDE1Ny45ODQtODcuNzYgMjk4LjQxOC0yMzkuODkyIDMzOS4zOC0yOS4yNjUgMC01OC41MTYtNS44NS03Ni4wNzgtMjkuMjYzLTIzLjQwMi0xNy41NjItMzUuMDkzLTQ2LjgxNC0zNS4wOTMtNzYuMDU3IDAtODEuOTI2IDIzLjQwMy0xNTcuOTkzIDc2LjA2OS0yMjIuMzYgNDYuODA0LTY0LjM1NSAxMTcuMDA4LTExMS4xNiAxOTMuMDg2LTE0MC40MzMgMjkuMjQyIDAgNTIuNjY1IDE3LjU1MSA2NC4zNjggNDAuOTc2LTUuODUyIDUuODQtMTEuNzAzIDExLjY5LTE3LjU1MyAxMS42OSAxNy41NTEgMTcuNTUgMzUuMDkzIDQ2LjgxMiAzNS4wOTMgNzYuMDY3em0tODEuOTA4LTM1LjEwNGMtMTEuNzEgNS44NS0yOS4yNiAxNy41NTEtNDAuOTYzIDI5LjI1Mi01Ljg1IDAtNS44NS01Ljg1LTUuODUtMTEuNy04Ny43NyA1Mi42NjUtMTQ2LjI3MyAxNDYuMjgzLTE1Mi4xMzYgMjQ1Ljc2MiAwIDExLjY4IDUuODYzIDUyLjY2NCAyMy40MTQgNDYuNzk0IDI5LjI1MS0xMS43MDMgNTIuNjY1LTIzLjQwMyA3MC4yMDUtNDYuNzk0YTE0MDI3My41NzIgMTQwMjczLjU3MiAwIDAgMCA1OC41MTYtNjQuMzY2YzM1LjEwNC00Ni44MjYgNTguNTE1LTEwNS4zMiA3MC4yMTUtMTYzLjg0NiAxMS43MTMtMTcuNTUtNS44NC0yOS4yNTMtMjMuNDAxLTM1LjEwMnpNMjMuNDE0IDgwOC45NDVDMjkyLjU3IDY5Ny43NzQgNTg1LjEyNyA2MzkuMjYgODcxLjg1MyA2MjcuNTQ2djUuODZjMjkuMjUyIDAgNTIuNjY2LTUuODYgNzYuMDctNS44NnYxMS43MTJDNjU1LjM2MiA2NjguNTIgMzY4LjYzMiA3MjcuMDM2IDkzLjYxOCA4MTQuODAyYy0yMy40MTQgMTEuNzE0LTQwLjk1NCAxNy41NTUtNjQuMzY4IDIzLjM5aC01LjgzOGMtNS44NzIgMC0xMS43MDItNS44MzUtMTEuNzAyLTE3LjU1IDMuOTAzLTMuODk2IDcuODA0LTcuNzk4IDExLjcwNC0xMS42OTd6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
					scoreLogo3: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTkwOSA4MjlIMTE1LjE4YTMyIDMyIDAgMCAwLTMyIDMyIDMyIDMyIDAgMCAwIDMyIDMySDkwOWEzMiAzMiAwIDAgMCAzMi0zMiAzMiAzMiAwIDAgMC0zMi0zMnptLTc1Ni44NS05NS43M2EzMiAzMiAwIDAgMCA0NS4xMy0zLjQyTDM2MCA1NzcuNThhMjUgMjUgMCAwIDEgMTktOC43M2gxMDguNjlhODkuNzEgODkuNzEgMCAwIDAgNTMuNi0xNy4yN0w4MTMgMzQzLjQ4VjQxMGEzMiAzMiAwIDAgMCA2NCAwVjI4My41YTU4LjU3IDU4LjU3IDAgMCAwLTU4LjUtNTguNUg2OTJhMzIgMzIgMCAwIDAgMCA2NGg4Ny40NGE0MCA0MCAwIDAgMC0zLjM4IDIuMjFMNTAzLjM5IDUwMGEyNS4yMiAyNS4yMiAwIDAgMS0xNC44MyA0Ljg2SDM3OS44N2E4OSA4OSAwIDAgMC02OC40NCAzMWwtMTYyLjcgMTUyLjI5YTMyIDMyIDAgMCAwIDMuNDIgNDUuMTJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
					morning: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTgyMy44MDggNjcwLjIwOGMxNy40MDgtOTguMzA0LTEzLjgyNC0yMDIuNzUyLTkyLjE2LTI3Ny41MDQtMTI0LjQxNi0xMTguNzg0LTMyMC41MTItMTE4Ljc4NC00NDQuOTI4IDAtNzcuODI0IDc0LjI0LTEwOC4wMzIgMTc3LjY2NC05MC42MjQgMjc1LjQ1Nk00OTYuNjQgMTM4LjI0YzE2LjM4NCAwIDI3LjY0OCAxMS4yNjQgMjcuNjQ4IDI3LjY0OHY1NS4yOTZjMCAxNi4zODQtMTEuMjY0IDI3LjY0OC0yNy42NDggMjcuNjQ4cy0yNy42NDgtMTEuMjY0LTI3LjY0OC0yNy42NDh2LTU1LjI5NmMwLTE2LjM4NCAxMS4yNjQtMjcuNjQ4IDI3LjY0OC0yNy42NDh6bTM0My4wNCAxMjYuOTc2YzExLjI2NCAxMS4yNjQgMTEuMjY0IDI3LjY0OCAwIDM4LjkxMmwtMzguOTEyIDM4LjkxMmMtMTEuMjY0IDExLjI2NC0yNy42NDggMTEuMjY0LTM4LjkxMiAwcy0xMS4yNjQtMjcuNjQ4IDAtMzguOTEybDM4LjkxMi0zOC45MTJjMTEuMjY0LTEwLjc1MiAyNy42NDgtMTAuNzUyIDM4LjkxMiAwek0yMzEuNDI0IDM0My4wNGMtMTEuMjY0IDExLjI2NC0yNy42NDggMTEuMjY0LTM4LjkxMiAwTDE1My42IDMwNC4xMjhjLTExLjI2NC0xMS4yNjQtMTEuMjY0LTI3LjY0OCAwLTM4LjkxMnMyNy42NDgtMTEuMjY0IDM4LjkxMiAwbDM4LjkxMiAzOC45MTJjMTAuNzUyIDExLjI2NCAxMC43NTIgMjcuNjQ4IDAgMzguOTEyeiIgZmlsbD0iI0ZGQjgzQyIvPjxwYXRoIGQ9Ik05NTQuODggNzExLjY4SDY3LjU4NGMtMjIuMDE2IDAtMzkuOTM2LTE3LjkyLTM5LjkzNi0zOS45MzZzMTcuOTItMzkuOTM2IDM5LjkzNi0zOS45MzZIOTU0Ljg4YzIyLjAxNiAwIDM5LjkzNiAxNy45MiAzOS45MzYgMzkuOTM2cy0xNy45MiAzOS45MzYtMzkuOTM2IDM5LjkzNnpNODA5Ljk4NCA4ODUuNzZIMTg1Ljg1NmMtMjIuMDE2IDAtMzkuOTM2LTE3LjkyLTM5LjkzNi0zOS45MzZzMTcuOTItMzkuOTM2IDM5LjkzNi0zOS45MzZoNjIzLjYxNmMyMi4wMTYgMCAzOS45MzYgMTcuOTIgMzkuOTM2IDM5LjkzNi41MTIgMjIuMDE2LTE3LjQwOCAzOS45MzYtMzkuNDI0IDM5LjkzNnoiIGZpbGw9IiMwOEM2RjIiLz48L3N2Zz4=",
					noon: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTUxMiAwYTM4LjQgMzguNCAwIDAgMSAzOC40IDM4LjR2NzYuOGEzOC40IDM4LjQgMCAwIDEtNzYuOCAwVjM4LjRBMzguNCAzOC40IDAgMCAxIDUxMiAwem0wIDg3MC40YTM4LjQgMzguNCAwIDAgMSAzOC40IDM4LjR2NzYuOGEzOC40IDM4LjQgMCAwIDEtNzYuOCAwdi03Ni44YTM4LjQgMzguNCAwIDAgMSAzOC40LTM4LjR6bTM5Ni44LTM5Ni44aDc2LjhhMzguNCAzOC40IDAgMCAxIDAgNzYuOGgtNzYuOGEzOC40IDM4LjQgMCAwIDEgMC03Ni44em0tODcwLjQgMGg3Ni44YTM4LjQgMzguNCAwIDAgMSAwIDc2LjhIMzguNGEzOC40IDM4LjQgMCAwIDEgMC03Ni44em04MzUuNjM1LTMyMy42MzVhMzguNCAzOC40IDAgMCAxIDAgNTQuMjk3bC01NC4yOTcgNTQuMzA4YTM4LjQgMzguNCAwIDEgMS01NC4zMDgtNTQuMzA4bDU0LjMwOC01NC4yOTdhMzguNCAzOC40IDAgMCAxIDU0LjI5NyAwek0yNTguNTYgNzY1LjQ0YTM4LjQgMzguNCAwIDAgMSAwIDU0LjMwOGwtNTQuMzA4IDU0LjMwM2EzOC40IDM4LjQgMCAwIDEtNTQuMzEzLTU0LjMwM2w1NC4zMTMtNTQuMzA4YTM4LjQgMzguNCAwIDAgMSA1NC4zMDMgMGguMDA1em01NjEuMTY3IDBsNTQuMjkzIDU0LjMwOGEzOC40IDM4LjQgMCAxIDEtNTQuMjkzIDU0LjMwM2wtNTQuMzEzLTU0LjMwM2EzOC40MDUgMzguNDA1IDAgMSAxIDU0LjMyNC01NC4zMDhoLS4wMXpNMjA0LjI2MiAxNDkuOTY1bDU0LjMwOCA1NC4yOTdhMzguNCAzOC40IDAgMSAxLTU0LjMwOCA1NC4zMDhsLTU0LjMwNy01NC4zMDhhMzguNCAzOC40IDAgMSAxIDU0LjMwNy01NC4yOTd6TTI1NiA1MTJjMCAxNDEuMzg0IDExNC42MTYgMjU2IDI1NiAyNTZzMjU2LTExNC42MTYgMjU2LTI1Ni0xMTQuNjE2LTI1Ni0yNTYtMjU2LTI1NiAxMTQuNjE2LTI1NiAyNTZ6IiBmaWxsPSIjRkZCQjEyIi8+PC9zdmc+",
					evening: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTcxMy4yOCA3MzQuMDhBMzI4IDMyOCAwIDAgMSAyODggMzA4LjhhMzIgMzIgMCAwIDAtNDQuNDgtNDAuMzJBMzc4Ljg4IDM3OC44OCAwIDEgMCA3NTMuNiA3NzguNTZhMzIgMzIgMCAwIDAtNDAuMzItNDQuNDh6TTQyNy4yIDE5OS4wNGw0Mi44OCAxNC40YTkwLjU2IDkwLjU2IDAgMCAxIDU3LjI4IDU3LjI4bDE0LjQgNDIuODhhMTcuMjggMTcuMjggMCAwIDAgMzIgMGwxNC40LTQyLjg4YTkwLjU2IDkwLjU2IDAgMCAxIDU3LjI4LTU3LjI4bDQyLjg4LTE0LjRhMTcuMjggMTcuMjggMCAwIDAgMC0zMmwtNDIuODgtMTQuNEE5MC41NiA5MC41NiAwIDAgMSA1ODguOCA5Nkw1NzYgNTEuODRhMTcuMjggMTcuMjggMCAwIDAtMzIgMEw1MjcuMzYgOTZhOTAuNTYgOTAuNTYgMCAwIDEtNTcuMjggNTcuMjhsLTQyLjg4IDE0LjRhMTcuMjggMTcuMjggMCAwIDAgMCAzMnpNOTg2LjI0IDQzOC40TDk0My4zNiA0MjRhOTAuNTYgOTAuNTYgMCAwIDEtNTcuMjgtNTcuMjhsLTE0LjQtNDIuODhhMTcuMjggMTcuMjggMCAwIDAtMzIgMGwtMTQuNCA0Mi44OGE5MC41NiA5MC41NiAwIDAgMS01Ny4yOCA1Ny42bC00Mi44OCAxNC40YTE3LjI4IDE3LjI4IDAgMCAwIDAgMzJsNDIuODggMTQuNEE5MC41NiA5MC41NiAwIDAgMSA4MjQuNjQgNTQ0bDE0LjQgNDIuODhhMTcuMjggMTcuMjggMCAwIDAgMzIgMEw4ODYuMDggNTQ0YTkwLjU2IDkwLjU2IDAgMCAxIDU3LjI4LTU3LjI4bDQyLjg4LTE0LjRhMTcuMjggMTcuMjggMCAwIDAgMC0zMnoiIGZpbGw9IiM4YTZlZjUiLz48L3N2Zz4="
				}
			}
		},
		methods: {
			toExam() {
				if (this.user.member_id === '') {
					this.$store.dispatch('showBindMember', true)
					return
				}
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
			toLibrary() {
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
			},
			wishes() {
				let now = new Date()
				let result = ''
				if (now.getHours() >= 22 || now.getHours() < 3) {
					result = {
						time: '夜深了',
						wishes: '早点休息才可以更好的学习哦！',
						icon: this.svg.evening
					}
				} else if (now.getHours() <= 22 && now.getHours() >= 19) {
					result = {
						time: '晚上好',
						wishes: '充实的一天就要结束了，巩固一下今天的所学吧！',
						icon: this.svg.evening
					}
				} else if (now.getHours() < 19 && now.getHours() > 13) {
					result = {
						time: '下午好',
						wishes: '打起精神，上课要认真！',
						icon:  this.svg.noon
					}
				} else if (now.getHours() <= 13 && now.getHours() > 11) {
					result = {
						time: '中午好',
						wishes: '饭后半小时的午觉是很舒服的！',
						icon: this.svg.noon
					}
				} else {
					result = {
						time: '早上好',
						wishes: 'Wish you have a good day！',
						icon:  this.svg.morning
					}
				}
				return result
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

	/*祝福语*/
	.head{
		display: flex;
		align-items: center;
	}
	.head .time_icon{
		width: 60px;
		height: 60px;
	}
	.saying {
		width: 70%;
		height: 10vh;
		margin: 5%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: space-around;
	}

	.saying .sub-title1 {
		font-size: 24px;
		font-weight: bold;
		color: #000000;
	}

	.saying .sub-title2 {
		font-size: 16px;
		font-weight: bold;
		color: #868a94;
	}


	/*欢迎语*/
	.func-bars-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.func-bars-container .row-first {
		width: 95%;
		display: flex;
		justify-content: space-around;
	}

	.func-bars-container .row-first .func-bar {
		height: 23vh;
		width: 45%;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.func-bars-container .row-first .func-bar .icon {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: column;
	}

	.func-bars-container .row-first .func-bar .icon .img {
		width: 60px;
		height: 60px;
		align-self: flex-end;
		padding: 10px;
		border-bottom-left-radius: 30px;
		border-top-right-radius: 10px;
	}

	.func-bars-container .row-first .func-bar .icon .left {
		background-color: #8b81fd;
	}

	.func-bars-container .row-first .func-bar .icon .right {
		background-color: #f3c15c;
	}

	.func-bars-container .row-first .func-bar .title {
		width: 100%;
		height: 30%;
		margin-left: 8%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.func-bars-container .row-first .func-bar .title .cn {
		font-size: 20px;
		font-weight: bold;
	}

	.func-bars-container .row-first .func-bar .title .en {
		font-size: 13px;
		font-weight: 100;
	}

	.func-bars-container .row-first .func-bar .title .left {
		color: #FFECCC;
	}

	.func-bars-container .row-first .func-bar .title .right {
		color: #3F414E;
	}

	.func-bars-container .row-first .func-bar .button-container {
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.func-bars-container .row-first .func-bar .button-container .description {
		font-size: 13px;
		font-weight: bold;
		margin-left: 5%;
	}

	.func-bars-container .row-first .func-bar .button-container .left {
		color: #FFFFFF;
	}

	.func-bars-container .row-first .func-bar .button-container .right {
		color: #3F414E;
	}

	.func-bars-container .row-first .func-bar .button-container .button {
		padding: 8px 12px 8px 12px;
		border-radius: 30px;
		margin-right: 5%;
		font-weight: bold;
		font-size: 12px;
	}

	.func-bars-container .row-first .func-bar .button-container .button:active {
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
	}

	.func-bars-container .row-first .func-bar .button-container .left-btn {
		color: #3F414E;
		background-color: #EBEAEC;
	}

	.func-bars-container .row-first .func-bar .button-container .right-btn {
		color: #EBEAEC;
		background-color: #3F414E;
	}

	.row-first .exam {
		background: #8E97FD;
	}

	.row-first .score {
		background: #FFC97E;
	}

	.func-bars-container .row-second {
		width: 95%;
		display: flex;
		justify-content: center;
	}

	.func-bars-container .row-second .func-bar {
		width: 95%;
		height: 11vh;
		border-radius: 10px;
		margin-top: 5%;
		background: #333242;
		display: flex;
		align-items: center;
	}

	.func-bars-container .row-second .func-bar .library {
		width: 50%;
		margin-left: 10%;
		display: flex;
		flex-direction: column;
	}

	.func-bars-container .row-second .func-bar .library .title-cn {
		color: #FFFFFF;
		font-size: 17px;
		font-weight: bold;
	}

	.func-bars-container .row-second .func-bar .library .title-en {
		color: #FFFFFF;
		font-size: 14px;
		margin-top: 3%;
	}

	.func-bars-container .row-second .func-bar .button {
		color: #3F414E;
		background-color: #EBEAEC;
		padding: 8px 12px 8px 12px;
		border-radius: 30px;
		font-size: 20px;
		font-weight: bold;
		margin-left: 15%;
	}

	.func-bars-container .row-second .func-bar .button:active {
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
	}

	/*其他功能*/
	.other-function {
		width: 90%;
		margin-left: 5%;
		margin-top: 6%;
	}


	.other-function .title {
		font-size: 21px;
		font-weight: bold;
	}

</style>


