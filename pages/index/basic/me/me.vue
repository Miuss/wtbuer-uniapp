<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				个人中心
			</div>
		</van-nav-bar>
		<scroll-list class="scroll-list" :refreshLoading="refreshLoading" @refresh="initList" @loadmore="loadmore"
			:showTip="false">
			<div class="mine-container">
				<div class="user-avatar-card">
					<div class="avatar">
						<img class="icon" :src="user.avatarurl" />
					</div>
					<div class="info">
						<div class="title">
							<div class="name">{{ user.member_id===''?user.nickname:user.eamsinfo.name }}</div>
							<div class="department">{{ user.member_id===''?'': user.eamsinfo.department }}</div>
						</div>
						<div class="addtime">
							学号 {{ user.member_id===''?user.addtime: user.eamsinfo.uid }}
						</div>
					</div>
				</div>
			</div>
			<div v-if="user.member_id!=''" class="user-info-card">
				<div class="card-container">
					<div class="grid grid-flex">
						<div class="grid-info">
							<div class="value">{{user.eamsinfo.class}}</div>
							<div class="title">专业班级</div>
						</div>
						<div class="straight-line">
							<image style="width: 70rpx;height:70rpx;" :src="image.straight" mode="aspectFill">
							</image>
						</div>
						<div class="grid-info">
							<div class="value">{{graduate===-1?'-':graduatetime+'天'}}</div>
							<div class="title">离毕业还有</div>
						</div>
					</div>
				</div>
			</div>
			<div class="func-container">
				<div class="func-bar" style="border-top: 1px solid #e7e7e7;" @click="toAbout()">
					<div class="left">
						<image class="func-img" :src="svg.info"></image>
						<div>
							关于我们
						</div>
					</div>
					<image class="arrow-icon" :src="svg.rightArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="showQrcode()">
					<div class="left">
						<image class="func-img" :src="svg.hold"></image>
						<div>
							赞助支持
						</div>
					</div>
					<image class="arrow-icon" :src="svg.rightArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="showQQQrcode()">
					<div class="left">
						<image class="func-img" :src="svg.service"></image>
						<div>
							加入企鹅交流群
						</div>
					</div>
					<image class="arrow-icon" :src="svg.rightArrow" mode="aspectFill" />
				</div>
				<div class="func-bar">
					<div class="left">
						<image class="func-img" :src="svg.share"></image>
						<div>
							分享小程序
						</div>
					</div>
					<image class="arrow-icon" :src="svg.rightArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="user.member_id === ''?bindStuBtnClick():unbindStuBtnClick()">
					<div class="left">
						<image class="func-img" :src="svg.unbind"></image>
						<div>
							{{user.member_id===''?'绑定教务系统账号':'解绑'}}
						</div>
					</div>
					<image class="arrow-icon" :src="svg.rightArrow" mode="aspectFill" />
				</div>
				<div class="func-bar" @click="logout()">
					<div class="left">
						<image class="func-img" :src="svg.logout"></image>
						<div>
							退出登录
						</div>
					</div>
					<image class="arrow-icon" :src="svg.rightArrow" mode="aspectFill" />
				</div>
			</div>
		</scroll-list>
	</view>
</template>

<script>
	import info from '../../../../assets/images/info.svg'
	import hold from '../../../../assets/images/hold.svg'
	import share from '../../../../assets/images/share.svg'
	import service from '../../../../assets/images/service.svg'
	import logout from '../../../../assets/images/logout.svg'
	import unbind from '../../../../assets/images/unbind.svg'
	import rightArrow from '../../../../assets/images/rightArrow.svg'
	export default {
		data() {
			return {
				refreshLoading: false,
				svg: {
					info,
					hold,
					share,
					service,
					unbind,
					logout,
					rightArrow,
				},
				isUnBind: false
			}
		},
		created() {},
		watch: {},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			},
			user() {
				return this.$store.getters.user
			},
			//获取毕业时间
			graduatetime() {
				let result = 0
				if (this.$store.getters.user.eamsinfo != undefined) {
					let graduateTime = new Date(
						`${parseInt(this.$store.getters.user.eamsinfo.grade) + parseInt(this.$store.getters.user.eamsinfo.studyyears)}-06-30 00:00:00`
					).getTime()
					let today = new Date().getTime()
					result = Math.ceil((graduateTime - today) / (1000 * 60 * 60 * 24))
				} else {
					result = -1
				}
				return result
			}
		},
		methods: {
			initList() {
				this.refreshLoading = true
				setTimeout(() => {
					this.refreshLoading = false
				}, 1000)
			},
			toAbout() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/about/about',
				})
			},
			showQrcode() {
				wx.vibrateShort();
				wx.previewImage({
					urls: ['https://wtbu.miuss.icu/Pay.jpg'],
					current: 'https://wtbu.miuss.icu/Pay.jpg'
				})
			},
			showQQQrcode() {
				wx.vibrateShort();
				wx.previewImage({
					urls: ['https://tva1.sinaimg.cn/large/002ZE6Hrgy1gu62bz7vxdj606a082dgt02.jpg'],
					current: 'https://tva1.sinaimg.cn/large/002ZE6Hrgy1gu62bz7vxdj606a082dgt02.jpg'
				})
			},
			bindStuBtnClick() {
				wx.vibrateShort()
				this.$store.dispatch('showBindMember', true)
			},
			unbindStuBtnClick() {
				let that = this
				wx.vibrateShort()
				wx.showModal({
					title: '教务系统账号解绑提示！',
					content: '您确定要解绑教务系统？',
					success(res) {
						that.$store.dispatch('unbindEamsMember')
						wx.showToast({
							icon: 'none',
							title: '解绑成功，如需查看课表请重新绑定账号!'
						})
					}
				})
			},
			logout() {
				let that = this
				wx.vibrateShort()
				wx.showModal({
					title: '账号登出提示！',
					content: '您确定要登出账号？',
					success(res) {
						if (res.confirm) {
							wx.removeStorageSync('token')
							wx.removeStorageSync('courseList')
							wx.removeStorageSync('courseIds')
							that.$store.commit('CLEAR_USER')
							that.$store.commit('CLEAR_ALL')
							wx.showToast({
								title: '成功登出',
								icon: 'none',
								duration: 1000,
								mask: true
							})
							wx.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

	/*用户信息展示部分*/
	.user-avatar-card {
		display: flex;
		background-color: #ffffff;
		align-items: center;
		position: relative;
		padding: 24rpx;
		height: 98px;
	}

	.user-avatar-card .avatar {
		display: flex;
		position: relative;
		transition: transform .3s;
		border-radius: 5em;
		background: #F5F5F5;
	}

	.user-avatar-card .avatar .icon {
		border-radius: 5em;
		width: 72px;
		height: 72px;
		background-color: #b5b5b5;
		border: 3px solid #fefefe63;
	}

	.user-avatar-card .info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		margin-left: 27rpx;
		color: #444444;
	}

	.user-avatar-card .info .title {
		display: flex;
		align-items: center;
	}

	.user-avatar-card .info .title .name {
		font-size: 42rpx;
		font-weight: 600;
		color: #333333;
		margin-right: 0.3em;
	}

	.user-avatar-card .info .title .department {
		font-size: 30rpx;
		font-weight: 600;
		color: #7a7a7a;
		align-self: flex-end;
	}

	.user-avatar-card .info .addtime {
		font-size: 13px;
		opacity: .6;
		margin-top: 4px;
		color: #333333;
	}

	/*信息展示*/

	.user-info-card {
		height: 13vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: flex-start;
	}

	.user-info-card .card-container {
		z-index: 999;
		width: 90%;
		height: 12vh;
		color: #ffffff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card-container .user-department {
		width: 100%;
		color: #c3c3c3;
		font-size: 80rpx;
		font-weight: 600;
		background-color: #5975FF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.card-container .user-defpartment-flex {
		display: flex;
		justify-content: center;
	}

	.card-container .grid {
		width: 100%;
		height: 100%;
		background-color: #5479ff;
		border-radius: 30rpx;
	}

	.card-container .grid-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card-container .grid .grid-info {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 600;
	}

	.card-container .grid .grid-info .value {
		font-size: 32rpx;
	}

	.card-container .grid .grid-info .title {
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.card-container .grid .grid-info {
		color: #ffffff;
	}

	.func-container {
		width: 90%;
		margin-left: 5%;
	}
	
	.func-container .func-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 5vh;
		border-bottom: 1px solid #e7e7e7;
	}
	
	.func-container .func-bar:active{
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
	}
	
	.func-container .func-bar .left{
		width: 50%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.func-container .func-bar .left .func-img{
		margin-right: 5%;
		margin-left: 5%;
	}

	.func-container .func-bar .arrow-icon,
	.func-img {
		width: 25rpx;
		height: 25rpx;
		margin-right: 2%;
	}
</style>
