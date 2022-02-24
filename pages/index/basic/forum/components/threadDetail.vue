<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				返回
			</div>
		</van-nav-bar>
		{{id}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				svg: {
					back: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik01MDkuOTIgNzk1Ljg0YzE1Ny45MDQgMCAyODUuOTItMTI4LjAxNiAyODUuOTItMjg1LjkyQzc5NS44NCAzNTIgNjY3LjgwOCAyMjQgNTA5LjkyIDIyNCAzNTIgMjI0IDIyNCAzNTIgMjI0IDUwOS45MmMwIDE1Ny45MDQgMTI4IDI4NS45MiAyODUuOTIgMjg1Ljkyem0wIDQ4QzMyNS41MDQgODQzLjg0IDE3NiA2OTQuMzIgMTc2IDUwOS45MiAxNzYgMzI1LjUwNCAzMjUuNTA0IDE3NiA1MDkuOTIgMTc2YzE4NC40MTYgMCAzMzMuOTIgMTQ5LjUwNCAzMzMuOTIgMzMzLjkyIDAgMTg0LjQxNi0xNDkuNTA0IDMzMy45Mi0zMzMuOTIgMzMzLjkyem01OC4yNzItNDg3LjI5NmExNiAxNiAwIDAgMSAwIDIyLjYyNGwtMTI5LjEyIDEyOS4xMiAxMjkuMTIgMTI5LjEyYTE2IDE2IDAgMCAxIDAgMjIuNjRMNTU2Ljg4IDY3MS4zNmExNiAxNiAwIDAgMS0yMi42MjQgMEwzODIuNDk2IDUxOS42YTE2IDE2IDAgMCAxIDAtMjIuNjI0bDE1MS43Ni0xNTEuNzQ0YTE2IDE2IDAgMCAxIDIyLjYyNCAwbDExLjMxMiAxMS4zMTJ6IiBmaWxsPSIjY2RjZGNkIi8+PC9zdmc+",
				},
			}
		},
		props: ['id'],
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	@import url("../../../../../assets/css/nav_bar.css");

</style>
