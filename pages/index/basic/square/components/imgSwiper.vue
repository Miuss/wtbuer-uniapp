<template>
	<view>
		<div class="container">
			<div class="swipper-card">
				<swiper class="swipper" indicator-active-color="#5555ff" :circular="true" :autoplay="true"
					:indicator-dots="true">
					<swiper-item style="height: 100%;" v-for="(item,index) in swiper" :key="index">
						<div class="swiper-item">
							<image class="img" :src="item"></image>
						</div>
					</swiper-item>
				</swiper>
			</div>
		</div>
	</view>
</template>

<script>
	import school1 from '../../../../../assets/images/school_1.png'
	import school2 from '../../../../../assets/images/school_2.png'
	import school3 from '../../../../../assets/images/school_3.png'
	import school4 from '../../../../../assets/images/school_4.png'
	import school5 from '../../../../../assets/images/school_5.png'
	import school6 from '../../../../../assets/images/school_6.png'
	export default {
		data() {
			return {
				swiper: [
					school1, school2, school3, school4, school5, school6
				]
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.swipper-card {
		width: 100%;
		height: 430rpx;
		border: 10px solid #ffffff;
	}

	.swipper {
		height: 100%;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
	}

	.swipper-card .img {
		width: 95%;
		height: 360rpx;
		border-radius: 30rpx;
	}
</style>
