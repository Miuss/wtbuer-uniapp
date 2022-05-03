<template>
	<div>
		<scroll-list class="scroll-list" :refreshLoading="refreshLoading" @refresh="initList" :showTip="true" :noData="noData" @loadmore="loadmore" :customScrollBox="scrollViewHeight">
		  	<div class="forum-list">
		  		<div class="forum-container" v-for="(item,index) in threadList" :key="index" @click="toDetail(item.id)">
		  			<div class="card-header">
		  				<div class="user-info">
		  					<img class="avatar" :src="item.avatarurl" @click.native.stop="toUserDetail(item.uid)"/>
		  					<div class="header-content">
								<div class="nickname">
									{{item.nickname}}
									<van-tag v-if="[1,2040].includes(item.uid)" color="#ffe1e1" text-color="#ad0000" style="margin-left: 6px;">社区管理员</van-tag>
									<van-tag v-else-if="item.online" color="#1fbf49" text-color="#ffffff" style="margin-left: 6px;">在线</van-tag>
								</div>
		  						<div class="time">{{item.createAt}}</div>
		  					</div>
		  				</div>
		  				<van-button class="follow-btn" v-if="!item.mine" @click.native.stop="followUser(item)" color="#4562E5" :plain="item.follow" type="primary" size="small" block>{{item.follow?'取关':'关注'}}</van-button>
		  			</div>
		  			<div class="content">{{item.content}}</div>
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
					<div class="post-footer">
						<div class="comment">
							<van-icon class="icon" name="comment-o" /> {{item.comment}}
						</div>
						<div class="view">
							<van-icon class="icon" name="eye-o" /> {{item.view}}
						</div>
						<div class="like" @click.native.stop="likeThread(item)">
							<van-icon class="icon" name="like" color="#ee0a24" v-if="item.liking" />
							<van-icon class="icon" name="like-o" v-else />
							{{item.likes}}
						</div>
					</div>
		  		</div>
		  	</div>
		</scroll-list>
	</div>
</template>

<script>
	import logo from '../../../../../assets/images/logo.png'
	import add from '../../../../../assets/images/add.svg'
	import { getDiscuss, getThread, addThread, delThread, editThread, getFollowThread, likeThreadById } from '../../../../../api/forumapi.js'
	import { followUserById } from '../../../../../api/userapi.js'
	import * as utils from '../../../../../utils'
	
	export default {
		data() {
			return {
				utils,
				pageIndex: 1,
				pageSize: 10,
				discussTabs: [],
				threadList: [],
				refreshLoading: false,
				noData: false
			}
		},
		methods: {
			addContent() {
				wx.navigateTo({
					url: '/pages/index/basic/forum/components/addThread'
				})
			},
			toDetail(id) {
				wx.navigateTo({
					url: '/pages/index/basic/forum/components/threadDetail?id=' + id
				})
			},
			toUserDetail(id) {
				wx.navigateTo({
					url: '/pages/user/user?id=' + id
				})
			},
			timeTrans(timestr){
				let time = new Date(timestr)
				return `${time.getHours()}:${time.getMinutes()} ${time.toDateString().slice(4,10)},${time.toDateString().slice(10,15)}`
			},
			initList() {
				this.refreshLoading = true
				setTimeout(async () => {
					this.pageIndex = 1
					this.noData = false
					const res = await getFollowThread(this.pageIndex, this.pageSize, 1)
					this.threadList = res.data.data.map(item => {
						item.createAt = utils.formatThreadTime(item.createAt)
						item.content = item.content.length>100?item.content.substring(0, 100) + "......":item.content
						item.images = JSON.parse(item.images)
						item.images = item.images.map(item => {
							return {url: item}
						})
						return item
					})
					if (res.data.data.length < this.pageSize) {
						this.noData = true
					}
					this.refreshLoading = false
				}, 100)
			},
			loadmore() {
				if (!this.noData) {
					setTimeout(async () => {
						this.pageIndex++
						const res = await getFollowThread(this.pageIndex, this.pageSize, 1)
						const data2 = res.data.data.map(item => {
							item.createAt = utils.formatThreadTime(item.createAt)
							item.content = item.content.length>100?item.content.substring(0, 100) + "......":item.content
							item.images = JSON.parse(item.images)
							item.images = item.images.map(item => {
								return {url: item}
							})
							return item
						})
						this.threadList = [...this.threadList, ...data2]
						if (res.data.data.length < this.pageSize) {
							this.noData = true
						}
					}, 100)
				}
			},
			async followUser(row) {
				const data = await followUserById(row.uid)
				this.threadList.map((item) => {
					if (item.uid === row.uid) {
						item.follow = !item.follow
					}
					return item
				})
			},
			likeThread(row) {
				const data = likeThreadById(row.id)
				this.threadList.map((item) => {
					if (item.id === row.id) {
						if (item.liking) {
							item.likes--
						} else {
							item.likes++
						}
						item.liking = !item.liking
					}
					return item
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
			}
 		},
		mounted() {
			this.initList()
		},
		computed: {
			scrollViewHeight() {
				console.log(this.$store.getters.systemInfo)
				return `${this.$store.getters.systemInfo.safeArea.height - 50 - 44}px`
			},
			statusBarHeight() {
				return this.$store.getters.systemInfo.statusBarHeight
			}
		}
	}
</script>

<style lang="scss">
	
	.no-center {
		flex: unset!important;
		padding: 0 20px!important;
	}
	
	.navbar-tab-active {
		font-size: 32rpx!important;
	}

	.forum-list {
		width: 100%;
		
		.forum-container {
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			background-color: #ffffff;
			padding: 32rpx;
			margin-bottom: 16rpx;
			
			.card-header {
				position: relative;
				
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
							color: #888888;
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
			
			.content {
				color: #333333;
				font-size: 28rpx;
				margin-top: 32rpx;
				margin-bottom: 32rpx;
			}
			
			.post-footer {
				margin: -16px;
				border-top: 1px solid #EEEEEE;
				padding: 8px 16px;
				display: flex;
				justify-content: space-around;
				margin-top: 16px;
				
				.comment,
				.view,
				.like {
					opacity: .6;
					font-size: 26rpx;
					
					.icon {
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>
