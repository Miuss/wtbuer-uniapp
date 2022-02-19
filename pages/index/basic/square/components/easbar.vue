<template>
	<view>
		<div class="container">
			<div class="flex function-bar">
				<div class="title">教务系统</div>
				<div class="img">
					<image :src="picture.ems"></image>
				</div>
				<div class="functions">
					<div>考试查询</div>
					<div>分数查询</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import school2 from '../../../../../assets/images/school_2.png'
	export default{
		data(){
			return{
				picture:{
					ems: school2
				}
			}
		}
	}
</script>

<style>
	.container{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.function-bar{
		width: 95%;
		height: 20vh;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 8rpx 0 rgb(0, 0, 0, 0.2), 0 6rpx 20rpx 0 rgb(0, 0, 0, 0.19);
	}
	.flex{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.title{
		font-size: 50rpx;
		font-weight: 600;
	}
	.img{
		width: 95%;
		height: 5vh;
	}
</style>
