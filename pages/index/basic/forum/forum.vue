<template>
	<div>
		<div class="page-bg"></div>
		<div class="statusHeightBar" :style="{height: statusBarHeight+'px'}"></div>
		<van-tabs active="a" swipeable animated tab-class="no-center" tab-active-class="navbar-tab-active" color="#4562E5">
		  <van-tab title="最新" name="a">
			<scroll-list class="scroll-list" :refreshLoading="refreshLoading" @refresh="initList" :showTip="true" :noData="noData" @loadmore="loadmore" :customScrollBox="scrollViewHeight">
			  	<div class="forum-list">
			  		<div class="forum-container" v-for="(item,index) in threadList" :key="index" @tap="toDetail(item.id)">
			  			<div class="card-header">
							<div class="title">{{item.title}}</div>
							<div class="user-info">
								<img class="avatar" :src="item.avatarurl"/>
								<div class="header-content">
									<div class="nickname">{{item.nickname}}</div>
								</div>
							</div>
			  			</div>
			  			<div class="content">{{item.content}}</div>
			  		</div>
			  	</div>
			</scroll-list>
		  </van-tab>
		  <van-tab title="关注" name="b">内容 2</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import add from '../../../../assets/images/add.svg'
	import { getDiscuss, getThread, addThread, delThread, editThread, getThreadDetail } from '../../../../api/forumapi.js'
	
	export default {
		data() {
			return {
				logo,
				svg: {
					add
				},
				pageIndex: 1,
				pageSize: 10,
				tabActive: '0',
				discussTabs: [],
				threadList: [],
				refreshLoading: false,
				noData: false
			}
		},
		methods: {
			changeTab(e) {
				console.log(e)
				console.log(this.tabActive)
				this.tabActive = e.detail.name
			},
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
			timeTrans(timestr){
				let time = new Date(timestr)
				return `${time.getHours()}:${time.getMinutes()} ${time.toDateString().slice(4,10)},${time.toDateString().slice(10,15)}`
			},
			async getThreadList() {
			},
			initList() {
				this.refreshLoading = true
				setTimeout(async () => {
					this.pageIndex = 1
					this.noData = false
					const res = await getThread(this.pageIndex, this.pageSize, 1)
					this.threadList = res.data.data
					if (res.data.data.length < this.pageSize) {
						this.noData = true
					}
					this.refreshLoading = false
				}, 300)
			},
			loadmore() {
				if (!this.noData) {
					setTimeout(async () => {
						this.pageIndex++
						const res = await getThread(this.pageIndex, this.pageSize, 1)
						this.threadList.concat(res.data.data)
						if (res.data.data.length < this.pageSize) {
							this.noData = true
						}
					}, 300)
				}
			}
 		},
		mounted() {
			this.initList()
		},
		computed: {
			scrollViewHeight() {
				return `${this.$store.getters.systemInfo.windowHeight - this.$store.getters.systemInfo.statusBarHeight - 90}px`
			},
			statusBarHeight() {
				return this.$store.getters.systemInfo.statusBarHeight
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../../assets/css/nav_bar.css");
	
	page {
		overflow: hidden;
		overflow-x: auto;
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
	
	.statusHeightBar {
		background-color: #FFFFFF;
	}
	
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
				
				.title {
					font-size: 32rpx;
					margin-bottom: 16rpx;
				}
				
				.user-info {
					.avatar {
						position: absolute;
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
					}
					
					.header-content {
						height: 32rpx;
						margin-left: 42rpx;
						display: flex;
						align-items: center;
						
						.nickname {
							color: #666666;
							font-size: 24rpx;
						}
					}
				}
			}
			
			.content {
				color: #666666;
				margin-top: 10px;
				font-size: 24rpx;
			}
		}
	}
</style>
