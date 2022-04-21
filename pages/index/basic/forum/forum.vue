<template>
	<div>
		<div class="page-bg"></div>
		<div class="statusHeightBar" :style="{height: statusBarHeight+'px'}"></div>
		<van-tabs active="a" swipeable animated tab-class="no-center" tab-active-class="navbar-tab-active" @change="changeTab" color="#4562E5">
		  <van-tab title="最新" name="a">
			<newList ref="new" v-if="tabActive === 'a'"></newList>
		  </van-tab>
		  <van-tab title="关注" name="b">
			<myFollow ref="follow" v-if="tabActive === 'b'"></myFollow>
		  </van-tab>
		</van-tabs>
		<div class="add" @click="addContent" v-if="tabActive === 'a'"><van-icon name="edit" /></div>
		<van-popup :show="addtThread" round position="bottom" custom-style="height: 80%;background: #FFFFFF;" :close-on-click-overlay="true">
			<addThread></addThread>
		</van-popup>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import newList from './components/newList.vue'
	import myFollow from './components/myFollow.vue'
	import addThread from './components/addThread.vue'
	
	export default {
		data() {
			return {
				logo,
				tabActive: 'a',
				addtThread: false,
			}
		},
		components: {
			newList,
			myFollow,
			addThread
		},
		methods: {
			onClose() {
				this.addtThread = false
			},
			changeTab(e) {
				console.log(e)
				console.log(this.tabActive)
				this.tabActive = e.detail.name
				// if (this.tabActive === 'a') {
				// 	this.$refs.new.initList()
				// }
				// if (this.tabActive === 'b') {
				// 	this.$refs.follow.initList()
				// }
			},
			addContent() {
				this.addtThread = true
			},
 		},
		computed: {
			scrollViewHeight() {
				return `${this.$store.getters.systemInfo.safeArea.height - 50 - 44}px`
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
	
	.add {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 84rpx;
		height: 84rpx;
		background-color: #4562E5;
		color: #FFFFFF;
		font-size: 48rpx;
		position: fixed;
		right: 20rpx;
		bottom: 240rpx;
		border-radius: 5em;
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
				z-index: 100;
			}
		}
	}
</style>
