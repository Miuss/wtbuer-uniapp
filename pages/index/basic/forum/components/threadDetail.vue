<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				返回
			</div>
		</van-nav-bar>
		{{id}}
	</div>
</template>

<script>
	import back from '../../../../../assets/images/back.svg'
	export default {
		data() {
			return {
				svg: {
					back,
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
