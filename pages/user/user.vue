<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="back" :src="svg.back" />
			</div>
		</van-nav-bar>
		<img class="bg-avatar" :src="detail.avatarurl" />
		<div class="user-info-card">
			<div class="user-info">
				<img class="avatar" :src="detail.avatarurl"/>
				<div class="header-content">
					<div class="nickname">
						{{detail.nickname}}
					</div>
					<div class="info">
						<div class="item fans"><span>{{detail.follows}}</span> 粉丝</div>
						<div class="item follows"><span>{{detail.follows}}</span> 关注</div>
						<div class="item threads"><span>{{detail.threads}}</span> 帖子</div>
					</div>
				</div>
			</div>
			<div class="loading">👷 更多信息还在开发中</div>
		</div>
	</div>
</template>

<script>
	import { getUserInfoById } from '../../api/userapi.js'
	import back from '../../assets/images/back.svg'
	
	export default {
		props: ['id'],
		data() {
			return {
				svg: {
					back,
				},
				detail: ''
			}
		},
		mounted() {
			this.getUserDetail()
		},
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
			async getUserDetail() {
				this.loading = true
				const res = await getUserInfoById(this.id)
				this.loading = false
				if (res.data == null) {
					wx.showToast({
						title: '该用户不存在',
						icon: 'none',
						duration: 2000
					})
					wx.navigateBack({
						delta: 1
					})
				} else {
					this.detail = res.data
				}
			}
		}
		
	}
</script>

<style lang="scss">
	@import url("../../assets/css/nav_bar.css");
	
	.nav-bar {
		background-color: transparent!important;
		
		.title {
			color: #FFFFFF!important;
		}
		
		.back {
			background-color: #FFFFFF;
		}
	}
	
	.loading {
		margin-top: 30px;
		text-align: center;
		font-size: 21px;
	}
		
	.bg-avatar {
		top: -20px;
		left: -20px;
		right: -20px;
		height: 280px;
		position: fixed;
		z-index: 0;
		width: calc(100% + 40px);
		filter: blur(15px);
	}
	
	.user-info-card {
		margin-top: 160px;
		position: relative;
		width: 100%;
		z-index: 1;
		background-color: #FFFFFF;
		border-top-left-radius: 14px;
		border-top-right-radius: 14px;
		
		.user-info {
			width: 100%;
			text-align: center;
			
			.avatar {
				margin-top: -104px;
				width: 100px;
				height: 100px;
				border-radius: 8px;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
			}
			
			.nickname {
				margin-top: 8px;
				font-size: 18px;
				font-weight: 600;
			}
			
			.info {
				margin-top: 10px;
				display: flex;
				justify-content: center;
				
				.item {
					margin-right: 10px;
					color: #666666;
					
					&:last-child {
						margin-right: 0;
					}
					
					span {
						color: #333333;
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>
