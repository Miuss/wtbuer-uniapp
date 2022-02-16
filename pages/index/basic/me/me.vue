<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				我的
			</div>
		</van-nav-bar>
		<scroll-list :refreshLoading="refreshLoading" @refresh="initList" @loadmore="loadmore" :showTip="false">
			<div class="user-avatar-card">
				<div class="avatar">
					<img class="icon" :src="user.avatarurl" />
				</div>
				<div class="info">
					<div class="title">{{ user.nickname }}</div>
					<div class="addtime">{{ user.addtime }}</div>
				</div>
			</div>
			<van-cell-group inset>
				<van-cell title="关于我们" @click="toAbout()" is-link></van-cell>
				<van-cell title="赞助支持" @click="showQrcode()" is-link></van-cell>
				<van-cell title="分享小程序" is-link></van-cell>
				<van-cell title="加入企鹅交流群" @click="showQQQrcode()" is-link></van-cell>
				<van-cell v-if="user.member_id===''" title="绑定教务系统" @click="bindStuBtnClick()" is-link></van-cell>
				<van-cell v-else title="解绑" @click="unbindStuBtnClick()" is-link></van-cell>
			</van-cell-group>
			<van-share-sheet :show="shareVis" title="立即分享给好友" :options="options" @select="onSelect" @close="onClose" />
		</scroll-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshLoading: false,
				svg: {
					info: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMi4zIDk2MC4yQzI2NiA5NjAuMiA2NS42IDc1OS45IDY1LjYgNTEzLjZTMjY2IDY3IDUxMi4zIDY3czQ0Ni42IDIwMC40IDQ0Ni42IDQ0Ni42LTIwMC40IDQ0Ni42LTQ0Ni42IDQ0Ni42em0wLTgwMy45Yy0xOTcgMC0zNTcuMyAxNjAuMy0zNTcuMyAzNTcuM3MxNjAuMyAzNTcuMyAzNTcuMyAzNTcuMyAzNTcuMy0xNjAuMyAzNTcuMy0zNTcuMy0xNjAuMy0zNTcuMy0zNTcuMy0zNTcuM3oiIGZpbGw9IiM1OTc1ZmYiLz48cGF0aCBkPSJNNDYyLjA5OTk5OTk5OTk5OTk3IDM3OS42YTUwLjIgNTAuMiAwIDEgMCAxMDAuNCAwIDUwLjIgNTAuMiAwIDEgMC0xMDAuNCAwek01MTIuMyA3MzkuMmMtMjQuNyAwLTQ0LjctMjAtNDQuNy00NC43VjUxMy42YzAtMjQuNyAyMC00NC43IDQ0LjctNDQuNyAyNC43IDAgNDQuNyAyMCA0NC43IDQ0Ljd2MTgwLjljLS4xIDI0LjctMjAuMSA0NC43LTQ0LjcgNDQuN3oiIGZpbGw9IiM1OTc1ZmYiLz48L3N2Zz4=",
					hold: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE0Mi4yIDg5Ni42Yy0yNC45IDAtNDUtMjAuMi00NS00NVYzOTYuN2MwLTI0LjkgMjAuMi00NSA0NS00NXM0NSAyMC4yIDQ1IDQ1djQ1NC44YzAgMjQuOS0yMC4yIDQ1LjEtNDUgNDUuMXptNjIwLjQgNTYuN0g1MzcuOGMtNTguNiAwLTExNS4zLTE3LjItMTY0LTQ5LjhsLTE0LTkuM2gtNTQuN2MtMjQuOSAwLTQ1LTIwLjItNDUtNDVWMzk2LjdjMC0yNC45IDIwLjItNDUgNDUtNDVoNzEuOGMyNS44IDAgNDguMi0xOS4zIDUxLjktNDQuOGwyMC41LTEzOC41YzQuNi0zMSAyMS4xLTU4IDQ2LjUtNzYuMyAyNS40LTE4LjIgNTYuNC0yNS4yIDg3LjEtMTkuNiA1MiA5LjUgOTUuMSA0NC4zIDExNS4zIDkzLjIgMjAuOSA1MC42IDI0IDEwNy41IDguOSAxNjAuMWwtNy41IDI2aDEwOC44YzY1LjYgMCAxMTkgNTMuNCAxMTkgMTE5djMzNy4zYzAgMzAtMTEuMSA1OC43LTMxLjQgODAuOGwtOC44IDkuNmMtMzEuOCAzNC43LTc3LjMgNTQuOC0xMjQuNiA1NC44ek0zNTAuMiA4MDRoMjMuNGM4LjkgMCAxNy42IDIuNyAyNS4xIDcuNmwyNS4zIDE3YzMzLjggMjIuNiA3My4yIDM0LjYgMTEzLjkgMzQuNmgyMjQuOGMyMi4xIDAgNDMuMy05LjMgNTguMi0yNS42bDguOC05LjZjNS01LjUgNy44LTEyLjYgNy44LTIwLjFWNDcwLjZjMC0xNS45LTEzLTI4LjktMjguOS0yOC45SDYzOS44Yy0xNC4xIDAtMjcuNS02LjctMzYtMThzLTExLjItMjYtNy4zLTM5LjZsMjQuMS04My41YzkuNS0zMy4xIDcuNi02OC45LTUuNi0xMDAuOC04LjQtMjAuNC0yNi40LTM0LjktNDguMS0zOC45LTguOS0xLjYtMTUuNCAxLjktMTguNSA0LjItMy4xIDIuMi04LjYgNy4zLTkuOSAxNi4yTDUxOCAzMTkuOWMtMTAuMyA2OS40LTcwLjkgMTIxLjgtMTQxLjEgMTIxLjhoLTI2LjdWODA0eiIgZmlsbD0iIzU5NzVmZiIvPjwvc3ZnPg==",
					share: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlPkBmb250LWZhY2V7Zm9udC1mYW1pbHk6ZmVlZGJhY2staWNvbmZvbnQ7c3JjOnVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUuZW90PyNpZWZpeCZxdW90OykgZm9ybWF0KCZxdW90O2VtYmVkZGVkLW9wZW50eXBlJnF1b3Q7KSx1cmwoJnF1b3Q7Ly9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4XzF1aHI4cmkwcGs1LndvZmYyJnF1b3Q7KSBmb3JtYXQoJnF1b3Q7d29mZjImcXVvdDspLHVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUud29mZiZxdW90OykgZm9ybWF0KCZxdW90O3dvZmYmcXVvdDspLHVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUudHRmJnF1b3Q7KSBmb3JtYXQoJnF1b3Q7dHJ1ZXR5cGUmcXVvdDspLHVybCgmcXVvdDsvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfMXVocjhyaTBwazUuc3ZnI2ljb25mb250JnF1b3Q7KSBmb3JtYXQoJnF1b3Q7c3ZnJnF1b3Q7KX08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzQ0LjQgNDI2LjZjLTkwLjUgMC0xNjQuMi03My43LTE2NC4yLTE2NC4yIDAtOTAuNSA3My43LTE2NC4yIDE2NC4yLTE2NC4yIDkwLjUgMCAxNjQuMiA3My43IDE2NC4yIDE2NC4yLS4xIDkwLjUtNzMuNyAxNjQuMi0xNjQuMiAxNjQuMnptMC0yNDUuNGMtNDQuOCAwLTgxLjIgMzYuNC04MS4yIDgxLjIgMCA0NC44IDM2LjQgODEuMiA4MS4yIDgxLjJzODEuMi0zNi40IDgxLjItODEuMmMwLTQ0LjgtMzYuNC04MS4yLTgxLjItODEuMnpNMjcxLjIgNzIyLjZjLTk3IDAtMTc1LjktNzguOS0xNzUuOS0xNzUuOXM3OC45LTE3NS45IDE3NS45LTE3NS45IDE3NS45IDc4LjkgMTc1LjkgMTc1LjktNzguOSAxNzUuOS0xNzUuOSAxNzUuOXptMC0yNjguOWMtNTEuMiAwLTkzIDQxLjctOTMgOTNzNDEuNyA5MyA5MyA5MyA5My00MS43IDkzLTkzLTQxLjctOTMtOTMtOTN6bTUxOS43IDQ3MC40Yy03NCAwLTEzNC4xLTYwLjItMTM0LjEtMTM0LjFTNzE3IDY1NS45IDc5MC45IDY1NS45IDkyNSA3MTYgOTI1IDc5MHMtNjAuMiAxMzQuMS0xMzQuMSAxMzQuMXptMC0xODUuM2MtMjguMiAwLTUxLjEgMjIuOS01MS4xIDUxLjEgMCAyOC4yIDIzIDUxLjEgNTEuMSA1MS4xczUxLjEtMjIuOCA1MS4xLTUxLTIyLjktNTEuMi01MS4xLTUxLjJ6IiBmaWxsPSIjNTk3NWZmIi8+PHBhdGggZD0iTTM4MC45IDUxMC40Yy0xMy44IDAtMjcuNC02LjktMzUuMi0xOS41LTEyLjEtMTkuNC02LjItNDUgMTMuMi01Ny4ybDI0MC44LTE1MC4zYzE5LjQtMTIuMSA0NS02LjIgNTcuMSAxMy4yIDEyLjEgMTkuNCA2LjIgNDUtMTMuMiA1Ny4yTDQwMi44IDUwNC4xYy02LjggNC4zLTE0LjQgNi4zLTIxLjkgNi4zem0zMTcuMyAyOTAuMmMtNC42IDAtOS4zLS44LTE0LTIuNGwtMzMxLTExOC4zYy0yMS42LTcuNy0zMi44LTMxLjQtMjUuMS01MyA3LjctMjEuNiAzMS41LTMyLjggNTMtMjUuMWwzMzEuMSAxMTguM2MyMS42IDcuNyAzMi44IDMxLjQgMjUuMSA1My02LjEgMTctMjIgMjcuNS0zOS4xIDI3LjV6IiBmaWxsPSIjNTk3NWZmIi8+PC9zdmc+",
					service: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTgwOS4xIDQ3MC43Yy0yNC42IDAtNDQuNS0xOS45LTQ0LjUtNDQuNSAwLTE0OS45LTExMy42LTI3MS45LTI1My4zLTI3MS45UzI1OCAyNzYuMyAyNTggNDI2LjJjMCAyNC42LTE5LjkgNDQuNS00NC41IDQ0LjVTMTY5IDQ1MC44IDE2OSA0MjYuMmMwLTE5OSAxNTMuNS0zNjAuOCAzNDIuMi0zNjAuOHMzNDIuMiAxNjEuOSAzNDIuMiAzNjAuOGMuMiAyNC42LTE5LjggNDQuNS00NC4zIDQ0LjV6IiBmaWxsPSIjNTk3NWZmIi8+PHBhdGggZD0iTTI0Ni44IDcwMy4zaC02NGMtNDguNiAwLTg4LjEtMzkuNS04OC4xLTg4LjFWNDkzLjdjMC00Ni4zIDM3LjctODQgODQtODRoNjguMmM0Ny4yIDAgODUuNyAzOC40IDg1LjcgODUuNnYxMjIuM2MtLjEgNDcuMy0zOC41IDg1LjctODUuOCA4NS43em0tNjMuMi0yMDQuN3YxMTYuNmw2MC0uOFY0OTguNmgtNjB6bTYzLjIgMTE1Ljh6bTAtMTE1LjhoLjItLjJ6bTU5NS42IDIwNC43aC02NC4xYy00OC42IDAtODguMS0zOS41LTg4LjEtODguMVY0OTMuN2MwLTQ2LjMgMzcuNy04NCA4NC04NGg2OC4yYzQ3LjIgMCA4NS42IDM4LjQgODUuNiA4NS42djEyMi4zYzAgNDcuMy0zOC40IDg1LjctODUuNiA4NS43em0tNjMuMy0yMDQuN3YxMTYuNmw1OS45LS44VjQ5OC42aC01OS45em02My4zIDExNS44Yy0uMSAwLS4xIDAgMCAwem0wLTExNS44aC4yLS4yek00MTEgODIyLjRoMjAwLjZ2MTMyLjRINDExem0xMDAuMy0xMTkuMWMtODQuMSAwLTEyNC41LTU0LjItMTM1LjItODYuMi03LjgtMjMuMyA0LjgtNDguNSAyOC4xLTU2LjIgMjMtNy43IDQ3LjggNC41IDU1LjkgMjcuMSAyIDQuOCAxMy4xIDI2LjQgNTEuMiAyNi40IDQxLjMgMCA1MC44LTI1LjIgNTAuOS0yNS40IDcuOC0yMy4zIDMyLjktMzUuOSA1Ni4zLTI4LjEgMjMuMyA3LjggMzUuOSAzMyAyOC4xIDU2LjItMTAuNyAzMi01MS4yIDg2LjItMTM1LjMgODYuMnoiIGZpbGw9IiM1OTc1ZmYiLz48cGF0aCBkPSJNNzM3LjggOTM3LjJINTQ5LjZjLTI0LjYgMC00NC41LTE5LjktNDQuNS00NC41czE5LjktNDQuNSA0NC41LTQ0LjVoMTg4LjNjMTkuOSAwIDM2LjEtMTYuMiAzNi4xLTM2LjF2LTE0NmMwLTI0LjYgMTkuOS00NC41IDQ0LjUtNDQuNXM0NC41IDE5LjkgNDQuNSA0NC41djE0NmMtLjEgNjkuMS01Ni4yIDEyNS4xLTEyNS4yIDEyNS4xeiIgZmlsbD0iIzU5NzVmZiIvPjwvc3ZnPg==",
					feedback: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMy42IDk2MS41Yy0yNDcgMC00NDgtMjAxLTQ0OC00NDhzMjAxLTQ0OCA0NDgtNDQ4IDQ0OCAyMDEgNDQ4IDQ0OC0yMDAuOSA0NDgtNDQ4IDQ0OHptMC04MDYuNGMtMTk3LjYgMC0zNTguNCAxNjAuOC0zNTguNCAzNTguNFMzMTYgODcxLjkgNTEzLjYgODcxLjkgODcyIDcxMS4xIDg3MiA1MTMuNSA3MTEuMiAxNTUuMSA1MTMuNiAxNTUuMXoiIGZpbGw9IiM1OTc1ZmYiLz48cGF0aCBkPSJNNTEwLjIgNzQ0LjFjLTI1LjgtLjItNDYuOC0yMS42LTQ2LjUtNDguMy4yLTI2LjcgMjEuNi00Ny43IDQ3LjQtNDcuNSAyNS44LjIgNDYuOCAyMS42IDQ2LjYgNDguMy0uNCAyNS44LTIxLjggNDcuOC00Ny41IDQ3LjV6bTEzNC4yLTMwMC45Yy02LjUgMTEuOS0xNCAyMi45LTIzLjMgMzItOS4zIDkuMS0yNS4xIDIzLjctNDguMyA0NC43LTYuNSA2LjQtMTIuMSAxMC45LTE1LjggMTUuNS0zLjcgNC42LTYuNSA4LjItOC40IDEyLjgtMS45IDMuNy0zLjcgNy4zLTQuNyAxMXMtMi44IDEwLjEtNC44IDIwLjJjLTMuOSAyMC4yLTE1IDMwLjMtMzQuMyAzMC4xLTEwLjEtLjEtMTguNC0zLjgtMjQuOC0xMC4zLTYuNC02LjUtMTAtMTYuNy05LjktMjkuNi4xLTE2LjYgMy0zMC40IDcuNy00Mi4zIDQuNy0xMS45IDExLjItMjIgMTkuNi0zMS4xIDguNC05LjEgMTkuNS0xOS4yIDMzLjQtMzEuOSAxMi4xLTEwLjkgMjEuMy0xOS4yIDI2LTI0LjYgNS42LTUuNSAxMC4yLTExLjkgMTQtMTguMyAzLjctNi40IDUuNi0xMy44IDUuNy0yMi4xLjEtMTUuNy0yLjgtMTkuNS0xMy44LTMwLjYtMTEtMTEuMS0yNS43LTE1LjktNDMuMS0xNi0yMC4zLS4yLTM0LjggNi42LTQ2LjIgMTUuMy0xMi41IDkuNi0yMS4xIDE3LjQtMjcuNyAzOC41LTYuNiAyMi0xOC43IDMzLTM3LjEgMzIuOC0xMC4xLS4xLTE5LjMtMy44LTI2LjYtMTEuMy03LjMtNy40LTEwLjktMTUuNy0xMC44LTI1IC4yLTE4LjQgNS44LTM2LjggMTgtNTYgMTEuMi0xOC4zIDI4LjgtMzMuOCA1MS00Ni41IDIyLjItMTEuOCA0OC0xOCA3Ny41LTE3LjggMjcuNi4yIDUxLjUgNiA3Mi42IDE2LjMgMjEuMSAxMC4zIDM2LjYgMjUuMiA0OC40IDQyLjggMTAuOSAxNy42IDE3LjIgMzcgMTcgNTguMi0xLjkgMTYuNi00LjcgMzEuMy0xMS4zIDQzLjJ6bTAgMCIgZmlsbD0iIzU5NzVmZiIvPjwvc3ZnPg==",
					logout: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTU4MyA5MjguM2MtMTEuNSAwLTIzLTQuNC0zMS43LTEzLjJMMTEwLjkgNDc0LjhjLTguNC04LjQtMTMuMi0xOS45LTEzLjItMzEuOCAwLTExLjkgNC44LTIzLjMgMTMuMi0zMS44bDU2LjYtNTYuNGMyMy44LTIzLjggNTUuNS0zNi45IDg5LjItMzYuOXM2NS40IDEzLjEgODkuMyAzN2wxLjkgMS45IDE5Mi4zLTE5Mi4zYzg4LjctODguNSAyMzIuOS04OC41IDMyMS4zIDAgNDMgNDIuOSA2Ni42IDEwMCA2Ni42IDE2MC43IDAgNjAuNy0yMy43IDExNy43LTY2LjYgMTYwLjdMNjY5LjMgNjc4LjFsMS45IDEuOWMyMy44IDIzLjggMzcgNTUuNiAzNyA4OS40IDAgMzMuOC0xMy4xIDY1LjUtMzcgODkuNGwtNTYuNCA1Ni40Yy04LjggOC43LTIwLjMgMTMuMS0zMS44IDEzLjF6TTIwNi4yIDQ0My4xTDU4MyA4MTkuOWwyNC43LTI0LjdjNi45LTYuOSAxMC43LTE2LjEgMTAuNy0yNS45IDAtOS44LTMuOC0xOS0xMC43LTI1LjlsLTMzLjYtMzMuNmMtMTcuNS0xNy41LTE3LjUtNDUuOSAwLTYzLjVsMjI0LTIyNGMyNi0yNiA0MC4zLTYwLjUgNDAuMy05Ny4yUzgyNC4xIDI1NCA3OTguMSAyMjhjLTUzLjUtNTMuNS0xNDAuNy01My41LTE5NC40LjFsLTIyNCAyMjRjLTE3LjUgMTcuNS00NS45IDE3LjUtNjMuNSAwbC0zMy42LTMzLjZjLTEzLjgtMTMuOC0zNy44LTEzLjgtNTEuNiAwbC0yNC44IDI0LjZ6bTEwOSA0ODMuM2MtMTEuNSAwLTIzLTQuNC0zMS43LTEzLjItMTcuNS0xNy41LTE3LjUtNDUuOSAwLTYzLjVsNDUuOC00NS44YzE3LjUtMTcuNSA0NS45LTE3LjUgNjMuNSAwIDE3LjUgMTcuNSAxNy41IDQ1LjkgMCA2My41TDM0NyA5MTMuM2MtOC44IDguNy0yMC4zIDEzLjEtMzEuOCAxMy4xeiIgZmlsbD0iIzU5NzVmZiIvPjxwYXRoIGQ9Ik01OTEuMyA0MTEuNmMtMTEuNSAwLTIzLTQuNC0zMS43LTEzLjEtMTcuNS0xNy41LTE3LjUtNDUuOSAwLTYzLjVsNDUuOC00NS44YzE3LjUtMTcuNSA0NS45LTE3LjUgNjMuNSAwIDE3LjUgMTcuNSAxNy41IDQ1LjkgMCA2My41bC00NS44IDQ1LjhjLTguOCA4LjctMjAuMyAxMy4xLTMxLjggMTMuMXpNMTQ2LjYgNzU3LjhjLTExLjUgMC0yMy00LjQtMzEuNy0xMy4yLTE3LjUtMTcuNS0xNy41LTQ1LjkgMC02My41bDQ1LjgtNDUuOGMxNy41LTE3LjUgNDYtMTcuNSA2My41IDBzMTcuNSA0NS45IDAgNjMuNWwtNDUuOCA0NS44Yy04LjggOC44LTIwLjMgMTMuMi0zMS44IDEzLjJ6IiBmaWxsPSIjNTk3NWZmIi8+PC9zdmc+"
				}
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
		methods: {
			initList() {
				this.refreshLoading = true
				setTimeout(() => {
					this.refreshLoading = false
				}, 500)
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
				wx.vibrateShort()
				this.$store.dispatch('unbindEamsMember')
			}
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

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
		background-color: #F5F5F5;
		border: 3px solid #33333363;
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
		font-size: 42rpx;
		font-weight: 600;
	}

	.user-avatar-card .info .addtime {
		font-size: 13px;
		opacity: .6;
		margin-top: 4px;
	}

	/*图标样式*/
	.mine-icon {
		margin-bottom: 4px;
		width: 1.4em;
		height: 1.4em;

	}
</style>
