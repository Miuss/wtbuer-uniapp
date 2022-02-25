<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				个人中心
			</div>
		</van-nav-bar>
		<scroll-list class="scroll-list" :refreshLoading="refreshLoading" @refresh="initList" @loadmore="loadmore"
			:showTip="false">
			<div class="mine-container">
				<div class="user-avatar-card">
					<div class="avatar">
						<img class="icon" :src="user.avatarurl" />
					</div>
					<div class="info">
						<div class="title">
							<div class="name">{{ user.member_id===''?user.nickname:user.eamsinfo.name }}</div>
							<div class="department">{{ user.member_id===''?'': user.eamsinfo.department }}</div>
						</div>
						<div class="addtime">
							学号 {{ user.member_id===''?user.addtime: user.eamsinfo.uid }}
						</div>
					</div>
				</div>
			</div>
			<div v-if="user.member_id!=''" class="user-info-card">
				<div class="card-container">
					<div class="grid grid-flex">
						<div class="grid-info">
							<div class="value">{{user.eamsinfo.class}}</div>
							<div class="title">专业班级</div>
						</div>
						<div class="straight-line">
							<image style="width: 70rpx;height:70rpx;" :src="image.straight" mode="aspectFill">
							</image>
						</div>
						<div class="grid-info">
							<div class="value">{{graduate===-1?'-':graduatetime+'天'}}</div>
							<div class="title">离毕业还有</div>
						</div>
					</div>
				</div>
			</div>
			<div class="func-container">
				<div class="func-bar" style="border-top: 1px solid #e7e7e7;" @click="toAbout()">
					<div class="left">
						<image class="func-img" :src="svg.info"></image>
						<div>
							关于我们
						</div>
					</div>
					<image class="arrow-icon" :src="svg.leftArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="showQrcode()">
					<div class="left">
						<image class="func-img" :src="svg.hold"></image>
						<div>
							赞助支持
						</div>
					</div>
					<image class="arrow-icon" :src="svg.leftArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="showQQQrcode()">
					<div class="left">
						<image class="func-img" :src="svg.service"></image>
						<div>
							加入企鹅交流群
						</div>
					</div>
					<image class="arrow-icon" :src="svg.leftArrow" mode="aspectFill" />
				</div>
				<div class="func-bar">
					<div class="left">
						<image class="func-img" :src="svg.share"></image>
						<div>
							分享小程序
						</div>
					</div>
					<image class="arrow-icon" :src="svg.leftArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="user.member_id === ''?bindStuBtnClick():unbindStuBtnClick()">
					<div class="left">
						<image class="func-img" :src="svg.unbind"></image>
						<div>
							{{user.member_id===''?'绑定教务系统账号':'解绑'}}
						</div>
					</div>
					<image class="arrow-icon" :src="svg.leftArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="logout()">
					<div class="left">
						<image class="func-img" :src="svg.logout"></image>
						<div>
							退出登录
						</div>
					</div>
					<image class="arrow-icon" :src="svg.leftArrow" mode="aspectFill" />
				</div>
			</div>
		</scroll-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshLoading: false,
				svg: {
					empolyeeCard: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTg0NC44IDBhMTI4IDEyOCAwIDAgMSAxMjcuODcyIDEyMi40NDVMOTcyLjggMTI4djc2OGExMjggMTI4IDAgMCAxLTEyMi40NDUgMTI3Ljg3MmwtNS41NTUuMTI4SDE3OS4yQTEyOCAxMjggMCAwIDEgNTEuMzI4IDkwMS41NTVMNTEuMiA4OTZWMTI4QTEyOCAxMjggMCAwIDEgMTczLjY0NS4xMjhMMTc5LjIgMGg2NjUuNnpNNTEyIDYxNC40Yy0xNjcuMDY2IDAtMzAyLjk1IDEzMy4xNzEtMzA3LjA5OCAyOTguOTgybC0uMTAyIDcuNzgzVjk3Mi44aDYxNC40di01MS42MzVDODE5LjIgNzUxLjc0NCA2ODEuNjc3IDYxNC40IDUxMiA2MTQuNHpNODQ0LjggNTEuMkgxNzkuMmE3Ni44IDc2LjggMCAwIDAtNzYuNjcyIDcyLjI5NEwxMDIuNCAxMjh2NzY4YzAgMzMuNDM0IDIxLjM3NiA2MS45IDUxLjIgNzIuNDQ4di00Ny4yODNjMC0xNzEuMzQxIDEyMC41MjUtMzE0LjU0NyAyODEuNDcyLTM0OS42OTZhMTc5LjIgMTc5LjIgMCAxIDEgMTUzLjg1Ni4wMjVjMTU4LjQ2NCAzNC41NiAyNzcuNzA5IDE3My45MDEgMjgxLjM5NSAzNDEuNjg0bC4wNzcgNy45ODd2NDcuMjU3YTc2Ljg3NyA3Ni44NzcgMCAwIDAgNTEuMDQ2LTY3LjQ1Nkw5MjEuNiA4OTZWMTI4YTc2LjggNzYuOCAwIDAgMC03Mi4yOTQtNzYuNjcyTDg0NC44IDUxLjJ6TTUxMiAyODEuNmExMjggMTI4IDAgMSAwIDAgMjU2IDEyOCAxMjggMCAwIDAgMC0yNTZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
					info: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MTIuMDAxIDBDMjI5LjIyIDAgMCAyMjkuMjE4IDAgNTEyYzAgMjgyLjc4IDIyOS4yMiA1MTIgNTEyLjAwMSA1MTJTMTAyNCA3OTQuNzggMTAyNCA1MTJDMTAyNCAyMjkuMjE4IDc5NC43ODIgMCA1MTIuMDAxIDB6bTAgOTI3Ljk5N0MyODIuNjI0IDkyNy45OTcgOTYgNzQxLjM3NSA5NiA1MTJTMjgyLjYyMyA5NS45OTggNTEyIDk1Ljk5OGMyMjkuMzc2IDAgNDE2IDE4Ni42MjcgNDE2IDQxNi4wMDJTNzQxLjM3NiA5MjcuOTk3IDUxMi4wMDEgOTI3Ljk5N3ptLjAwNy0yODcuOTk4Yy0zNS4zNDQgMC02NCAyOC42NTUtNjQgNjMuOTk3IDAgMzUuMzQ3IDI4LjY1NiA2NC4wMDUgNjQgNjQuMDA1czY0LTI4LjY1OCA2NC02NC4wMDVjMC0zNS4zNDItMjguNjU2LTYzLjk5Ny02NC02My45OTd6bTAtMzUyLjAwMWMtMzUuMzQ0IDAtNjQgMjguNjU1LTY0IDYzLjk5OSAwIDMuNjU2LjMxMiA3LjI1NC45MDQgMTAuNzVsMzEuNTM0IDE4Ni42MjdjMi41NjIgMTUuMTI0IDE1LjcxOSAyNi42MjUgMzEuNTYxIDI2LjYyNSAxNS44NDMgMCAyOS4wMDEtMTEuNTAxIDMxLjU2MS0yNi42MjVsMzEuNTMzLTE4Ni42MjdjLjU5Mi0zLjQ5Ni45MDUtNy4wOTQuOTA1LTEwLjc1LjAwMi0zNS4zNDMtMjguNjU0LTYzLjk5OS02My45OTgtNjMuOTk5eiIgZmlsbD0iIzU5NzVGRiIvPjwvc3ZnPg==",
					hold: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik05MzguNzg0IDU5MC44MzRsLjA5NS4wMjctMTA0LjM3NSAyOTMuNjQ3LS4zNDYtLjA3N2MtMTYgMzYuNDM0LTUyLjI4OCA2MS45NDItOTQuNjI5IDYxLjk0Mkg0NDkuOTQ2Yy0yMi44NDcgMC00MS4zNy0xOC41Mi00MS4zNy00MS4zN3MxOC41MjMtNDEuMzY4IDQxLjM3LTQxLjM2OGgxODguMjQ2Yy0uMDEtLjA0MS0uMDA2LS4wOS0uMDE0LS4xM2wxMDAuNzg2LjAxNmMuMTk5LjAwNi4zNjQuMTE0LjU2NS4xMTQgOC45MjcgMCAxNi4zNjgtNS43MjQgMTkuMjY0LTEzLjY1bC4zMTYtLjIyNSA5OS42OC0yODAuNTMzLS4xNTctLjIzYzMuMTE5LTguMDg0IDUuMDA0LTE2Ljc4NiA1LjAwNC0yNS45NyAwLTM5LjcyMy0zMi4wMTYtNzEuOTA0LTcxLjYzOS03Mi4zMmwtLjYzLS45Mjd2Ljg1SDY3Ni4yOTRjLTQ5LjI4NyAwLTcxLjcyOC0zNy4yNS01Ni4yMTctNzAuODYyIDE1LjUxNC0zMy42MTMgMTYuMDMtMTcyLjY2IDE2LjAzLTE3Ny4zNDh2LTIwLjY4NmMwLTIyLjg0Ny0xOC41MjItNDEuMzctNDEuMzY5LTQxLjM3LTIyLjg0OCAwLTQxLjM2OSAxOC41MjMtNDEuMzY5IDQxLjM3djIwLjY4NmMwIDEzNC4zOTktOTguNzE0IDI0NS40NDUtMjI3LjUzIDI2NS4zODl2NDE3LjE5NWMwIDIyLjg0OC0xOC41MjIgNDEuMzY5LTQxLjM2OCA0MS4zNjlIMTE4Ljk5N2MtMjIuODQ4IDAtNDEuMzY5LTE4LjUyLTQxLjM2OS00MS4zN1Y0NDkuOTVjMC0yMi44NSAxOC41Mi00MS4zNyA0MS4zNy00MS4zN2gxNjUuNDc1YzEwMi44MTIgMCAxODYuMTYtODMuMzQ4IDE4Ni4xNi0xODYuMTZ2LTIwLjY4NWMwLTY4LjU0MyA1NS41NjQtMTI0LjEwNyAxMjQuMTA2LTEyNC4xMDdzMTI0LjEwNyA1NS41NjQgMTI0LjEwNyAxMjQuMTA3djIwLjY4NmMwIDIxLjM5NC00LjcwMyAxNDUuNTIxLTkuNDI0IDE2NS40NzNoODEuODE4Yzg1LjY4IDAgMTU1LjEzMyA2OS40NTQgMTU1LjEzMyAxNTUuMTM0LS4wMDEgMTYuNjk0LTIuNzA5IDMyLjczOC03LjU4OSA0Ny44MDd6bS02OTUuNjgtOTkuNTE4aC04Mi43Mzh2MzcyLjMyaDgyLjczOHYtMzcyLjMyeiIgZmlsbD0iIzU5NzVGRiIvPjwvc3ZnPg==",
					share: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlPkBmb250LWZhY2V7Zm9udC1mYW1pbHk6ZmVlZGJhY2staWNvbmZvbnQ7c3JjOnVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUuZW90PyNpZWZpeCZxdW90OykgZm9ybWF0KCZxdW90O2VtYmVkZGVkLW9wZW50eXBlJnF1b3Q7KSx1cmwoJnF1b3Q7Ly9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4XzF1aHI4cmkwcGs1LndvZmYyJnF1b3Q7KSBmb3JtYXQoJnF1b3Q7d29mZjImcXVvdDspLHVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUud29mZiZxdW90OykgZm9ybWF0KCZxdW90O3dvZmYmcXVvdDspLHVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUudHRmJnF1b3Q7KSBmb3JtYXQoJnF1b3Q7dHJ1ZXR5cGUmcXVvdDspLHVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUuc3ZnI2ljb25mb250JnF1b3Q7KSBmb3JtYXQoJnF1b3Q7c3ZnJnF1b3Q7KX08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzQ0LjQgNDI2LjZjLTkwLjUgMC0xNjQuMi03My43LTE2NC4yLTE2NC4yIDAtOTAuNSA3My43LTE2NC4yIDE2NC4yLTE2NC4yIDkwLjUgMCAxNjQuMiA3My43IDE2NC4yIDE2NC4yLS4xIDkwLjUtNzMuNyAxNjQuMi0xNjQuMiAxNjQuMnptMC0yNDUuNGMtNDQuOCAwLTgxLjIgMzYuNC04MS4yIDgxLjIgMCA0NC44IDM2LjQgODEuMiA4MS4yIDgxLjJzODEuMi0zNi40IDgxLjItODEuMmMwLTQ0LjgtMzYuNC04MS4yLTgxLjItODEuMnpNMjcxLjIgNzIyLjZjLTk3IDAtMTc1LjktNzguOS0xNzUuOS0xNzUuOXM3OC45LTE3NS45IDE3NS45LTE3NS45IDE3NS45IDc4LjkgMTc1LjkgMTc1LjktNzguOSAxNzUuOS0xNzUuOSAxNzUuOXptMC0yNjguOWMtNTEuMiAwLTkzIDQxLjctOTMgOTNzNDEuNyA5MyA5MyA5MyA5My00MS43IDkzLTkzLTQxLjctOTMtOTMtOTN6bTUxOS43IDQ3MC40Yy03NCAwLTEzNC4xLTYwLjItMTM0LjEtMTM0LjFTNzE3IDY1NS45IDc5MC45IDY1NS45IDkyNSA3MTYgOTI1IDc5MHMtNjAuMiAxMzQuMS0xMzQuMSAxMzQuMXptMC0xODUuM2MtMjguMiAwLTUxLjEgMjIuOS01MS4xIDUxLjEgMCAyOC4yIDIzIDUxLjEgNTEuMSA1MS4xczUxLjEtMjIuOCA1MS4xLTUxLTIyLjktNTEuMi01MS4xLTUxLjJ6IiBmaWxsPSIjNTk3NWZmIi8+PHBhdGggZD0iTTM4MC45IDUxMC40Yy0xMy44IDAtMjcuNC02LjktMzUuMi0xOS41LTEyLjEtMTkuNC02LjItNDUgMTMuMi01Ny4ybDI0MC44LTE1MC4zYzE5LjQtMTIuMSA0NS02LjIgNTcuMSAxMy4yIDEyLjEgMTkuNCA2LjIgNDUtMTMuMiA1Ny4yTDQwMi44IDUwNC4xYy02LjggNC4zLTE0LjQgNi4zLTIxLjkgNi4zem0zMTcuMyAyOTAuMmMtNC42IDAtOS4zLS44LTE0LTIuNGwtMzMxLTExOC4zYy0yMS42LTcuNy0zMi44LTMxLjQtMjUuMS01MyA3LjctMjEuNiAzMS41LTMyLjggNTMtMjUuMWwzMzEuMSAxMTguM2MyMS42IDcuNyAzMi44IDMxLjQgMjUuMSA1My02LjEgMTctMjIgMjcuNS0zOS4xIDI3LjV6IiBmaWxsPSIjNTk3NWZmIi8+PC9zdmc+",
					service: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTgwOS4xIDQ3MC43Yy0yNC42IDAtNDQuNS0xOS45LTQ0LjUtNDQuNSAwLTE0OS45LTExMy42LTI3MS45LTI1My4zLTI3MS45UzI1OCAyNzYuMyAyNTggNDI2LjJjMCAyNC42LTE5LjkgNDQuNS00NC41IDQ0LjVTMTY5IDQ1MC44IDE2OSA0MjYuMmMwLTE5OSAxNTMuNS0zNjAuOCAzNDIuMi0zNjAuOHMzNDIuMiAxNjEuOSAzNDIuMiAzNjAuOGMuMiAyNC42LTE5LjggNDQuNS00NC4zIDQ0LjV6IiBmaWxsPSIjNTk3NWZmIi8+PHBhdGggZD0iTTI0Ni44IDcwMy4zaC02NGMtNDguNiAwLTg4LjEtMzkuNS04OC4xLTg4LjFWNDkzLjdjMC00Ni4zIDM3LjctODQgODQtODRoNjguMmM0Ny4yIDAgODUuNyAzOC40IDg1LjcgODUuNnYxMjIuM2MtLjEgNDcuMy0zOC41IDg1LjctODUuOCA4NS43em0tNjMuMi0yMDQuN3YxMTYuNmw2MC0uOFY0OTguNmgtNjB6bTYzLjIgMTE1Ljh6bTAtMTE1LjhoLjItLjJ6bTU5NS42IDIwNC43aC02NC4xYy00OC42IDAtODguMS0zOS41LTg4LjEtODguMVY0OTMuN2MwLTQ2LjMgMzcuNy04NCA4NC04NGg2OC4yYzQ3LjIgMCA4NS42IDM4LjQgODUuNiA4NS42djEyMi4zYzAgNDcuMy0zOC40IDg1LjctODUuNiA4NS43em0tNjMuMy0yMDQuN3YxMTYuNmw1OS45LS44VjQ5OC42aC01OS45em02My4zIDExNS44Yy0uMSAwLS4xIDAgMCAwem0wLTExNS44aC4yLS4yek00MTEgODIyLjRoMjAwLjZ2MTMyLjRINDExem0xMDAuMy0xMTkuMWMtODQuMSAwLTEyNC41LTU0LjItMTM1LjItODYuMi03LjgtMjMuMyA0LjgtNDguNSAyOC4xLTU2LjIgMjMtNy43IDQ3LjggNC41IDU1LjkgMjcuMSAyIDQuOCAxMy4xIDI2LjQgNTEuMiAyNi40IDQxLjMgMCA1MC44LTI1LjIgNTAuOS0yNS40IDcuOC0yMy4zIDMyLjktMzUuOSA1Ni4zLTI4LjEgMjMuMyA3LjggMzUuOSAzMyAyOC4xIDU2LjItMTAuNyAzMi01MS4yIDg2LjItMTM1LjMgODYuMnoiIGZpbGw9IiM1OTc1ZmYiLz48cGF0aCBkPSJNNzM3LjggOTM3LjJINTQ5LjZjLTI0LjYgMC00NC41LTE5LjktNDQuNS00NC41czE5LjktNDQuNSA0NC41LTQ0LjVoMTg4LjNjMTkuOSAwIDM2LjEtMTYuMiAzNi4xLTM2LjF2LTE0NmMwLTI0LjYgMTkuOS00NC41IDQ0LjUtNDQuNXM0NC41IDE5LjkgNDQuNSA0NC41djE0NmMtLjEgNjkuMS01Ni4yIDEyNS4xLTEyNS4yIDEyNS4xeiIgZmlsbD0iIzU5NzVmZiIvPjwvc3ZnPg==",
					feedback: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMy42IDk2MS41Yy0yNDcgMC00NDgtMjAxLTQ0OC00NDhzMjAxLTQ0OCA0NDgtNDQ4IDQ0OCAyMDEgNDQ4IDQ0OC0yMDAuOSA0NDgtNDQ4IDQ0OHptMC04MDYuNGMtMTk3LjYgMC0zNTguNCAxNjAuOC0zNTguNCAzNTguNFMzMTYgODcxLjkgNTEzLjYgODcxLjkgODcyIDcxMS4xIDg3MiA1MTMuNSA3MTEuMiAxNTUuMSA1MTMuNiAxNTUuMXoiIGZpbGw9IiM1OTc1ZmYiLz48cGF0aCBkPSJNNTEwLjIgNzQ0LjFjLTI1LjgtLjItNDYuOC0yMS42LTQ2LjUtNDguMy4yLTI2LjcgMjEuNi00Ny43IDQ3LjQtNDcuNSAyNS44LjIgNDYuOCAyMS42IDQ2LjYgNDguMy0uNCAyNS44LTIxLjggNDcuOC00Ny41IDQ3LjV6bTEzNC4yLTMwMC45Yy02LjUgMTEuOS0xNCAyMi45LTIzLjMgMzItOS4zIDkuMS0yNS4xIDIzLjctNDguMyA0NC43LTYuNSA2LjQtMTIuMSAxMC45LTE1LjggMTUuNS0zLjcgNC42LTYuNSA4LjItOC40IDEyLjgtMS45IDMuNy0zLjcgNy4zLTQuNyAxMXMtMi44IDEwLjEtNC44IDIwLjJjLTMuOSAyMC4yLTE1IDMwLjMtMzQuMyAzMC4xLTEwLjEtLjEtMTguNC0zLjgtMjQuOC0xMC4zLTYuNC02LjUtMTAtMTYuNy05LjktMjkuNi4xLTE2LjYgMy0zMC40IDcuNy00Mi4zIDQuNy0xMS45IDExLjItMjIgMTkuNi0zMS4xIDguNC05LjEgMTkuNS0xOS4yIDMzLjQtMzEuOSAxMi4xLTEwLjkgMjEuMy0xOS4yIDI2LTI0LjYgNS42LTUuNSAxMC4yLTExLjkgMTQtMTguMyAzLjctNi40IDUuNi0xMy44IDUuNy0yMi4xLjEtMTUuNy0yLjgtMTkuNS0xMy44LTMwLjYtMTEtMTEuMS0yNS43LTE1LjktNDMuMS0xNi0yMC4zLS4yLTM0LjggNi42LTQ2LjIgMTUuMy0xMi41IDkuNi0yMS4xIDE3LjQtMjcuNyAzOC41LTYuNiAyMi0xOC43IDMzLTM3LjEgMzIuOC0xMC4xLS4xLTE5LjMtMy44LTI2LjYtMTEuMy03LjMtNy40LTEwLjktMTUuNy0xMC44LTI1IC4yLTE4LjQgNS44LTM2LjggMTgtNTYgMTEuMi0xOC4zIDI4LjgtMzMuOCA1MS00Ni41IDIyLjItMTEuOCA0OC0xOCA3Ny41LTE3LjggMjcuNi4yIDUxLjUgNiA3Mi42IDE2LjMgMjEuMSAxMC4zIDM2LjYgMjUuMiA0OC40IDQyLjggMTAuOSAxNy42IDE3LjIgMzcgMTcgNTguMi0xLjkgMTYuNi00LjcgMzEuMy0xMS4zIDQzLjJ6bTAgMCIgZmlsbD0iIzU5NzVmZiIvPjwvc3ZnPg==",
					unbind: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik05MjcuNDI0IDY0Yy0yMzAuMjcyLjI1Ni00MjUuODU2IDEyNi45MTItNTY1LjQ0IDI1Nkg5NmwtMzIgMzJ2MTkybDkuNDA4IDIyLjY1NiA2My40MjQgNjMuNDI0LjA2NC41NzYgMjU2IDI1NiAuNTc2LjA2NCA2My45MzYgNjMuOTM2TDQ4MCA5NjBoMTkybDMyLTMyVjY2Mi4xNDRDODMzLjIxNiA1MjIuNzUyIDk1OS43NDQgMzI3LjIzMiA5NTkuNDg4IDk2bC0zMi4wNjQtMzJ6TTEyOCAzODRoMTY5LjE1MmExNTI0Ljk5MiAxNTI0Ljk5MiAwIDAgMC0xNDIuNCAxNzMuNDRMMTI4IDUzMC44MTZWMzg0em0zNjQuOCA1MTJsLTI2Ljg4LTI3LjA3MmExNTA5Ljc2IDE1MDkuNzYgMCAwIDAgMTczLjc2LTE0MS44MjRWODk2SDQ5Mi44em0tNzMuMTUyLTczLjIxNkwyMDAuNzA0IDYwMy45NjhDMjY0LjE5MiA1MTIgNTM2LjI1NiAxNTAuNzIgODk0LjU5MiAxMjkuMDI0Yy0yMC44NjQgMzU5LjE2OC0zODMuMTY4IDYzMC41OTItNDc0Ljk0NCA2OTMuNzZ6TTI1NiA5NjB2LTY0SDEyOFY3NjhINjR2MTkyaDE5MnptNDMxLjg3Mi00OTAuNjg4YTk2IDk2IDAgMSAwLTE1OS42MTYtMTA2LjYyNCA5NiA5NiAwIDAgMCAxNTkuNjE2IDEwNi42MjR6IiBmaWxsPSIjMmMyYzJjIi8+PC9zdmc+",
					logout: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEzNjIgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjEuMjgxIiBoZWlnaHQ9IjE2Ij48cGF0aCBkPSJNMTM2MC45MTUgMzQyLjI2NGMtMTMuODkyLTU1LjQ0Mi0xMDUuNzIyLTg4LjY4Mi0yNDAuNjEzLTk1LjYwN2E1MTQuMzgzIDUxNC4zODMgMCAwIDAtOTUyLjcxNiAyMzkuNjljLTExNi44NDQgNjcuOTA3LTE3OS40MjIgMTM3LjItMTY1LjUzIDE5NS4zN0MxNS45NSA3MzcuMTU4IDEwNy43OCA3NzAuMzk4IDIzOS45IDc3Ny4zMjNhNTE1LjMwNiA1MTUuMzA2IDAgMCAwIDk1NC4xODUtMjM5LjY5YzExNS4zMzMtNjYuNTIyIDE4MC43MjItMTM3LjIgMTY2LjgzLTE5NS4zN3pNNjgwLjc1IDk0LjIyMmE0MTguNDgxIDQxOC40ODEgMCAwIDEgMzQ2LjMzNSAxODEuNTIgMTguNDY3IDE4LjQ2NyAwIDAgMSA0LjE5NyA2LjkyNSAxOTQuMjc4IDE5NC4yNzggMCAwIDAgMTYuNzg4IDI0LjkzIDE4LjQyNSAxOC40MjUgMCAwIDEgNC4xOTcgNi45MjUgNDA1LjAxIDQwNS4wMSAwIDAgMSA0OC42ODUgMTcwLjQ0IDE4MDcuNDMyIDE4MDcuNDMyIDAgMCAxLTM4OS40OCAxNDEuMzEyIDIwMjIuOTQ3IDIwMjIuOTQ3IDAgMCAxLTQxMS43MjQgNTguMjEyIDQwNy44MjEgNDA3LjgyMSAwIDAgMS0zNy41NjMtMTcwLjQ0QTQxOC45MDEgNDE4LjkwMSAwIDAgMSA2ODAuNzA5IDk0LjIyM3pNMTA5LjA4IDY2Mi4zMjZjLTIuNzctMi43Ny02Ljk2Ny0yLjc3LTkuNzM3LTQuMTk3IDIuNzctMi43NyA0LjE5Ny00LjE5NyA0LjE5Ny02LjkyNWEyNzAuMjg2IDI3MC4yODYgMCAwIDEgNjguMTU5LTU1LjQ0MiA0MzAuODIgNDMwLjgyIDAgMCAwIDIwLjk4NSA4NS45MTIgNjI4LjI4OSA2MjguMjg5IDAgMCAxLTgzLjY0Ni0xOS4zNDh6TTY4MC43NSA5MzAuOTM0QTQxOC42NSA0MTguNjUgMCAwIDEgMzUzLjg5IDc3NS42NDVhMTk1Ni4yNTcgMTk1Ni4yNTcgMCAwIDAgMzc4LjM1OC01OC4xNyAxODkxLjgzNCAxODkxLjgzNCAwIDAgMCAzNjEuNjU0LTEyNS45MUE0MTguMjMgNDE4LjIzIDAgMCAxIDY4MC43MSA5MzEuMTQzem01NzQuNDg0LTU1NS42NGEzNDQuNjk4IDM0NC42OTggMCAwIDEtNjguMTYgNTguMjEzIDQzMC42NTMgNDMwLjY1MyAwIDAgMC0yMC45ODQtODUuOTEzIDM3MC40MjYgMzcwLjQyNiAwIDAgMSA4Ni4yNDggMTguMDA1YzIuNzcgMi43NyA2Ljk2NyAyLjc3IDkuNzM3IDQuMTk3LTEuMzg1IDEuNTUzLTQuMTEzIDIuOTM4LTYuODgzIDUuNzA4eiIgZmlsbD0iIzJjMmMyYyIvPjxwYXRoIGQ9Ik0zNzcuNDc3IDUxMi43MDRhNDcuMyA0Ny4zIDAgMSAwIDQ3LjMtNDcuMTMyIDQ3LjcyIDQ3LjcyIDAgMCAwLTQ3LjMgNDcuMTMyem0zOTcuNzktMTg1LjY3NWE2OS42MjggNjkuNjI4IDAgMCAwIDY5LjU0NCA2OS4yOTIgNjkuMjkyIDY5LjI5MiAwIDEgMCAwLTEzOC41IDY5LjYyOCA2OS42MjggMCAwIDAtNjkuNTQ0IDY5LjIwOHpNNTg3LjQ5NCA4MTQuNzYxYTQ3LjMgNDcuMyAwIDEgMCA0Ny4zLTQ3LjEzMiA0OC42NDMgNDguNjQzIDAgMCAwLTQ3LjMgNDcuMTMyeiIgZmlsbD0iIzJjMmMyYyIvPjwvc3ZnPg==",
					leftArrow: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik02NzkuNDI1IDUwNi40MTRMMjY5LjIxMSA4ODEuMTM3Yy0xNC4zNDEgMTQuMjY5LTE0LjM0MSAzNy40MzIgMCA1MS43MzggMTQuMzAxIDE0LjI3NSAzNy41NCAxNC4yNzUgNTEuODkgMEw3NTcuNjA3IDUzNC4xNGM3LjY1NC03LjYxOSAxMC45MTEtMTcuNzYxIDEwLjM5NC0yNy43MjUuNTE3LTkuOTU4LTIuNzM5LTIwLjA3LTEwLjM5NC0yNy42NzlMMzIxLjEwMSA3OS45OTZjLTE0LjM1MS0xNC4zMTYtMzcuNTkxLTE0LjMxNi01MS44OSAwLTE0LjM0MSAxNC4yNjQtMTQuMzQxIDM3LjQzMiAwIDUxLjczMmw0MTAuMjE0IDM3NC42ODd6IiBmaWxsPSIjOGE4YThhIi8+PC9zdmc+",
					leftArrow_black: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik02NzkuNDI1IDUwNi40MTRMMjY5LjIxMSA4ODEuMTM3Yy0xNC4zNDEgMTQuMjY5LTE0LjM0MSAzNy40MzIgMCA1MS43MzggMTQuMzAxIDE0LjI3NSAzNy41NCAxNC4yNzUgNTEuODkgMEw3NTcuNjA3IDUzNC4xNGM3LjY1NC03LjYxOSAxMC45MTEtMTcuNzYxIDEwLjM5NC0yNy43MjUuNTE3LTkuOTU4LTIuNzM5LTIwLjA3LTEwLjM5NC0yNy42NzlMMzIxLjEwMSA3OS45OTZjLTE0LjM1MS0xNC4zMTYtMzcuNTkxLTE0LjMxNi01MS44OSAwLTE0LjM0MSAxNC4yNjQtMTQuMzQxIDM3LjQzMiAwIDUxLjczMmw0MTAuMjE0IDM3NC42ODd6IiBmaWxsPSIjMmMyYzJjIi8+PC9zdmc+"
				},
				image: {
					straight: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MzEuMTg1IDk0My41MzJjMCA4LjktNi40OTMgMTYuMTE0LTE0LjUwMyAxNi4xMTRoLTkuMzY0Yy04LjAxIDAtMTQuNTA0LTcuMjE0LTE0LjUwNC0xNi4xMTRWODAuNDY3YzAtOC44OTkgNi40OTMtMTYuMTE0IDE0LjUwNC0xNi4xMTRoOS4zNjRjOC4wMSAwIDE0LjUwMyA3LjIxNSAxNC41MDMgMTYuMTE0djg2My4wNjV6IiBmaWxsPSIjYmZiZmJmIi8+PC9zdmc+"
				},
				isUnBind: false
			}
		},
		created() {},
		watch: {},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			},
			user() {
				return this.$store.getters.user
			},
			//获取毕业时间
			graduatetime() {
				let result = 0
				if (this.$store.getters.user.eamsinfo != undefined) {
					let graduateTime = new Date(
						`${parseInt(this.$store.getters.user.eamsinfo.grade) + parseInt(this.$store.getters.user.eamsinfo.studyyears)}-06-30 00:00:00`
					).getTime()
					let today = new Date().getTime()
					result = Math.ceil((graduateTime - today) / (1000 * 60 * 60 * 24))
				} else {
					result = -1
				}
				return result
			}
		},
		methods: {
			initList() {
				this.refreshLoading = true
				setTimeout(() => {
					this.refreshLoading = false
				}, 1000)
			},
			toAbout() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/about/about',
				})
			},
			showQrcode() {
				wx.vibrateShort();
				wx.previewImage({
					urls: ['https://wtbu.miuss.icu/Pay.jpg'],
					current: 'https://wtbu.miuss.icu/Pay.jpg'
				})
			},
			showQQQrcode() {
				wx.vibrateShort();
				wx.previewImage({
					urls: ['https://tva1.sinaimg.cn/large/002ZE6Hrgy1gu62bz7vxdj606a082dgt02.jpg'],
					current: 'https://tva1.sinaimg.cn/large/002ZE6Hrgy1gu62bz7vxdj606a082dgt02.jpg'
				})
			},
			bindStuBtnClick() {
				wx.vibrateShort()
				this.$store.dispatch('showBindMember', true)
			},
			unbindStuBtnClick() {
				let that = this
				wx.vibrateShort()
				wx.showModal({
					title: '教务系统账号解绑提示！',
					content: '您确定要解绑教务系统？',
					success(res) {
						that.$store.dispatch('unbindEamsMember')
						wx.showToast({
							icon: 'none',
							title: '解绑成功，如需查看课表请重新绑定账号!'
						})
					}
				})
			},
			logout() {
				let that = this
				wx.vibrateShort()
				wx.showModal({
					title: '账号登出提示！',
					content: '您确定要登出账号？',
					success(res) {
						if (res.confirm) {
							wx.removeStorageSync('token')
							wx.removeStorageSync('courseList')
							wx.removeStorageSync('courseIds')
							that.$store.commit('CLEAR_USER')
							that.$store.commit('CLEAR_ALL')
							wx.showToast({
								title: '成功登出',
								icon: 'none',
								duration: 1000,
								mask: true
							})
							wx.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

	/*用户信息展示部分*/
	.user-avatar-card {
		display: flex;
		background-color: #ffffff;
		align-items: center;
		position: relative;
		padding: 24rpx;
		height: 98px;
	}

	.user-avatar-card .avatar {
		display: flex;
		position: relative;
		transition: transform .3s;
		border-radius: 5em;
		background: #F5F5F5;
	}

	.user-avatar-card .avatar .icon {
		border-radius: 5em;
		width: 72px;
		height: 72px;
		background-color: #b5b5b5;
		border: 3px solid #fefefe63;
	}

	.user-avatar-card .info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		margin-left: 27rpx;
		color: #444444;
	}

	.user-avatar-card .info .title {
		display: flex;
		align-items: center;
	}

	.user-avatar-card .info .title .name {
		font-size: 42rpx;
		font-weight: 600;
		color: #333333;
		margin-right: 0.3em;
	}

	.user-avatar-card .info .title .department {
		font-size: 30rpx;
		font-weight: 600;
		color: #7a7a7a;
		align-self: flex-end;
	}

	.user-avatar-card .info .addtime {
		font-size: 13px;
		opacity: .6;
		margin-top: 4px;
		color: #333333;
	}

	/*信息展示*/

	.user-info-card {
		height: 13vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: flex-start;
	}

	.user-info-card .card-container {
		z-index: 999;
		width: 90%;
		height: 12vh;
		color: #ffffff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card-container .user-department {
		width: 100%;
		color: #c3c3c3;
		font-size: 80rpx;
		font-weight: 600;
		background-color: #5975FF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.card-container .user-defpartment-flex {
		display: flex;
		justify-content: center;
	}

	.card-container .grid {
		width: 100%;
		height: 100%;
		background-color: #5479ff;
		border-radius: 30rpx;
	}

	.card-container .grid-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card-container .grid .grid-info {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 600;
	}

	.card-container .grid .grid-info .value {
		font-size: 32rpx;
	}

	.card-container .grid .grid-info .title {
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.card-container .grid .grid-info {
		color: #ffffff;
	}

	.func-container {
		width: 90%;
		margin-left: 5%;
	}
	
	.func-container .func-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 5vh;
		border-bottom: 1px solid #e7e7e7;
	}
	
	.func-container .func-bar:active{
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
	}
	
	.func-container .func-bar .left{
		width: 50%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.func-container .func-bar .left .func-img{
		margin-right: 5%;
		margin-left: 5%;
	}

	.func-container .func-bar .arrow-icon,
	.func-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 2%;
	}
</style>
