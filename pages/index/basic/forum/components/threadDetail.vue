<template>
	<div>
		<div class="page-bg"></div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="back" :src="svg.back" />动态正文
			</div>
		</van-nav-bar>
		<div class="content-box">
			<van-skeleton title avatar row="3" :loading="loading">
				<div class="post-content" v-if="detail">
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
						<van-icon class="setting" v-if="detail.mine" name="arrow-down" @click="deleteThreadBtn" />
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
				<div class="comments" v-if="comments">
					<div class="comments-title">回复</div>
					<div class="comments-list">
						<van-empty v-if="comments.length === 0" description="暂无评论" />
						<div class="post-content" v-for="(item, index) in comments" :key="index">
							<div class="card-header">
								<div class="user-info">
									<img class="avatar" :src="item.avatarurl"/>
									<div class="header-content">
										<div class="nickname">
											{{item.nickname}}
											<van-tag v-if="[1,2040].includes(item.uid)" color="#ffe1e1" text-color="#ad0000" style="margin-left: 6px;">社区管理员</van-tag>
											<van-tag v-else-if="item.online" color="#1fbf49" text-color="#ffffff" style="margin-left: 6px;">在线</van-tag>
										</div>
										<div class="time">{{item.createAt}}</div>
									</div>
								</div>
								<van-icon class="setting" v-if="item.mine" name="arrow-down" @click="deleteCommentBtn(item.id)" />
								<van-tag class="tags" v-else plain  color="#555555"># {{index+1}}</van-tag>
							</div>
							<div class="post-info">
								<text>{{item.content}}</text>
							</div>
							<div class="images" v-if="item.images.length > 0 && item.images != null" @click.stop="">
								<van-uploader
									:show-upload="false"
									image-fit="aspectFill"
									:previewSize="imagePreviewSize(item)"
									:file-list="item.images"
									max-count="9"
									:deletable="false"
								/>
							</div>
						</div>
					</div>
				</div>
			</van-skeleton>
		</div>
		<div class="comment-input" :style="{ 'bottom':Height + 'px'}">
			<div class="input-content">
				<input class="comment-input-text" :value="commentContent" placeholder="评论" :show-confirm-bar="false" @input="onChangeCommentContent" :adjust-position="false" @focus="getHeight" @blur="leaveInput" />
				<van-button custom-class="comment-button" color="#4562E5" type="primary" size="small" :loading="commentLoading" :disabled="commentContent === ''" @click="newComment">评论</van-button>
			</div>
		</div>
		<van-action-sheet
		  :show="show"
		  :actions="actions"
		  @close="onClose"
		  @select="onSelect"
		  :close-on-click-action="true"
		  :close-on-click-overlay="true"
		  cancel-text="取消"
		/>
	</div>
</template>

<script>
	import back from '../../../../../assets/images/back.svg'
	import { getThreadDetail, delThread, getCommentByTid, getCommentByCid, delComment, addComment } from '../../../../../api/forumapi'
	import { followUserById } from '../../../../../api/userapi'
	import * as utils from '../../../../../utils'
	
	export default {
		data() {
			return {
				utils,
				svg: {
					back,
				},
				Height:0,
				loading: false,
				detail: '',
				show: false,
				actions: [],
				comments: [],
				delCommentId: '',
				commentContent: '',
				commentLoading: false
			}
		},
		props: ['id'],
		mounted() {
			this.getThreadDetail()
		},
		methods: {
			leaveInput(e){
			    this.Height = 0;
			},
			getHeight(e){
			    this.Height = e.target.height - (this.$store.getters.systemInfo.screenHeight - this.$store.getters.systemInfo.safeArea.bottom)
			},
			onChangeCommentContent(event) {
				this.commentContent = event.detail.value
				console.log(this.commentContent)
			},
			onClose() {
			    this.show = false
			},
			deleteThreadBtn() {
				this.actions = [{id: 'delete', name: '删除动态', color: '#ee0a24' }]
			    this.show = true
			},
			deleteCommentBtn(id) {
				this.delCommentId = id
				this.actions = [{id: 'deleteComment', name: '删除评论', color: '#ee0a24' }]
			    this.show = true
			},
			async onSelect(event) {
				if (event.detail.id === 'delete') {
					await this.deleteThread()
				}
				
				if (event.detail.id === 'deleteComment') {
					await this.deleteComment()
				}
			},
			async deleteComment() {
				wx.showLoading({
					title: '删除中',
					mask: true
				})
				
				const data = await delComment(this.delCommentId)
				
				wx.hideLoading()
				wx.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 2000
				})
				
				this.getComments()
			},
			async deleteThread() {
				wx.showLoading({
					title: '删除中',
					mask: true
				})
				
				const data = await delThread(this.detail.id)
				
				wx.hideLoading()
				wx.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 2000
				})
				
				wx.navigateBack({
					delta: 1
				})
			},
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
				this.loading = false
				if (res.data == null) {
					wx.showToast({
						title: '动态已删除',
						icon: 'none',
						duration: 2000
					})
					wx.navigateBack({
						delta: 1
					})
				} else {
					this.detail = res.data
					this.detail.createAt = utils.formatThreadTime(this.detail.createAt)
					this.detail.images = JSON.parse(this.detail.images)
					this.detail.images = this.detail.images.map(item => {
						return {url: item}
					})
					this.getComments()
				}
			},
			async followUser(row) {
				const data = await followUserById(row.uid)
				this.detail.follow = !this.detail.follow
			},
			async getComments() {
				const res = await getCommentByTid(this.detail.id)
				this.comments = res.data.data.map((item) => {
					item.createAt = utils.formatThreadTime(item.createAt)
					item.images = JSON.parse(item.images)
					item.images = item.images.map(item2 => {
						return {url: item2}
					})
					return item
				})
			},
			async newComment() {
				this.commentLoading = true
				const data = await addComment(this.commentContent, this.detail.id, '', '')
				this.commentContent = ''
				wx.showToast({
					title: '评论成功',
					icon: 'success',
					duration: 2000
				})
				this.getComments()
				this.commentLoading = false
				
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
		padding-bottom: 100px;
		
		.post-content {
			position: relative;
			padding: 16px;
			background-color: #FFFFFF;
			border-bottom: 1px solid #EEEEEE;
			margin-bottom: 16px;
			
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
				
				.setting {
					position: absolute;
					right: 0;
					top: calc(50% - 16px);
				}
				
				.tags {
					position: absolute;
					right: 0;
					top: calc(50% - 16px);
				}
			}
				
			.post-info {
				color: #333333;
				font-size: 28rpx;
				margin-top: 32rpx;
				margin-bottom: 32rpx;
			}
		}
		
		.comments {
			border-top: 1px solid #EEEEEE;
			border-bottom: 1px solid #EEEEEE;
			background: #FFFFFF;
			position: relative;
			
			.comments-title {
				color: #444444;
				font-weight: 600;
				padding: 12px 16px;
				border-bottom: 1px solid #EEEEEE;
			}
			
			.comments-list {
				.post-content {
					margin-bottom: 0;
					
					.post-info {
						margin-top: 26rpx;
						margin-bottom: 26rpx;
						margin-left: 84rpx;
					}
				}
			}
		}
	}
	
	.comment-input {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		padding: 10px;
		border-top: 1px solid #EEEEEE;
		
		.input-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: env(safe-area-inset-bottom);
			
			.comment-input-text {
				border-radius: 10px;
				padding: 8px 10px;
				background-color: #f7f8fa;
				width: calc(100% - 90px);
				min-height: 20px;
				height: 20px;
				font-size: 14px;
			}
			
			.comment-button {
				height: 36px;
				border-radius: 8px;
			}
		}
	}
</style>
