<template>
	<div>
		<div class="page-bg"></div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="back" :src="svg.back" />动态正文
			</div>
		</van-nav-bar>
		<div class="content-box" v-if="detail!=''">
			<div class="post-content">
				<div class="card-header">
					<div class="user-info">
						<img class="avatar" :src="detail.avatarurl"/>
						<div class="header-content">
							<div class="nickname">
								{{detail.nickname}}
								<van-tag v-if="[1,2040].includes(detail.uid)" color="#ffe1e1" text-color="#ad0000" style="margin-left: 6px;">社区管理员</van-tag>
								<van-tag v-else-if="detail.online" color="#1fbf49" text-color="#ffffff" style="margin-left: 6px;">在线</van-tag>
							</div>
							<div class="time">{{detail.createAt}}</div>
						</div>
					</div>
					<van-button class="follow-btn" v-if="!detail.mine" @click.native.stop="followUser(detail)" color="#4562E5" :plain="detail.follow" type="primary" size="small" block>{{detail.follow?'取关':'关注'}}</van-button>
				</div>
				<div class="post-info">
					<text>{{detail.content}}</text>
				</div>
				<div class="images" v-if="detail.images.length > 0 && detail.images != null" @click.stop="">
					<van-uploader
						:show-upload="false"
						image-fit="aspectFill"
						:previewSize="imagePreviewSize(detail)"
						:file-list="detail.images"
						max-count="9"
						:deletable="false"
					/>
				</div>
			</div>
			<div class="loading-text">评论还在开发中...</div>
		</div>
	</div>
</template>

<script>
	import back from '../../../../../assets/images/back.svg'
	import { getThreadDetail } from '../../../../../api/forumapi'
	import { followUserById } from '../../../../../api/userapi'
	import * as utils from '../../../../../utils'
	
	export default {
		data() {
			return {
				utils,
				svg: {
					back,
				},
				loading: false,
				detail: ''
			}
		},
		props: ['id'],
		mounted() {
			this.getThreadDetail()
		},
		methods: {
			imagePreviewSize(item) {
				// console.log(item.images)
				// if (item.images.length === 1) {
				// 	return this.$store.getters.systemInfo.safeArea.width - 32
				// } else {
				// 	return (this.$store.getters.systemInfo.safeArea.width - 32 - 16) / 3
				// }
				return (this.$store.getters.systemInfo.safeArea.width - 32 - 16) / 3
			},
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
			async getThreadDetail() {
				this.loading = true
				const res = await getThreadDetail(this.id)
				this.detail = res.data
				this.detail.createAt = utils.formatThreadTime(this.detail.createAt)
				this.detail.images = JSON.parse(this.detail.images)
				this.detail.images = this.detail.images.map(item => {
					return {url: item}
				})
				console.log(this.detail)
				this.loading = false
			},
			async followUser(row) {
				const data = await followUserById(row.uid)
				this.detail.follow = !this.detail.follow
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../../../assets/css/nav_bar.css");
	
	.loading-text {
		color: #868686;
		margin-top: 10px;
		text-align: center;
		font-size: 14px;
	}

	.page-bg {
		background-color: #f7f8fa;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
	
	.content-box {
		
		.post-content {
			position: relative;
			padding: 16px;
			background-color: #FFFFFF;
			border-bottom: 1px solid #EEEEEE;
			
			.card-header {
				position: relative;
				
				.name {
					opacity: .8;
					font-weight: 600;
					font-size: 36rpx;
					margin-bottom: 16rpx;
				}
				
				.user-info {
					.avatar {
						position: absolute;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
					}
					
					.header-content {
						margin-left: 84rpx;
						
						.nickname {
							color: #333333;
							font-size: 26rpx;
							font-weight: 600;
						}
				
						.time {
							color: #666666;
							font-size: 22rpx;
						}
					}
				}
					
				.follow-btn {
					position: absolute;
					right: 0;
					top: calc(50% - 15px);
				}
			}
				
			.post-info {
				color: #333333;
				font-size: 28rpx;
				margin-top: 32rpx;
				margin-bottom: 32rpx;
			}
		}
	}
</style>
