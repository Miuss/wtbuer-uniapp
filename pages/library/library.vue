<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				图书馆
			</div>
		</van-nav-bar>
		<van-empty class="custom-image" :image="svg.empty" description="还是空的哦~ 开发君正在加急开发中..." />
	</view>
</template>

<script>
	import {libraryLogin} from '../../api/easmapi.js'
	import back from '../../assets/images/back.svg'
	import empty from '../../assets/images/empty.svg'
	export default {
		data() {
			return {
				svg: {
					back,
					empty
				}
			}
		},
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			}
		},
		mounted(){
			libraryLogin('1950805046','290011').then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style>
	@import url("../../assets/css/nav_bar.css");
</style>
