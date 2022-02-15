<template>
	<view>
		<div>
			<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
				<div class="title" slot="left">
					<img class="logo" :src="logo" />武工商课表
				</div>
			</van-nav-bar>
			<van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />

		</div>
	</view>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	export default {
		data() {
			return {
				logo
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");
</style>
