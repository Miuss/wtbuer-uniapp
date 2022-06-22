<template>
	<div>
		<div class="page-bg"></div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				<img class="logo" :src="logo" /> 武工商课表
			</div>
		</van-nav-bar>
		<scroll-list class="scroll-list" :refreshLoading="refreshLoading" @refresh="initList" :showTip="false" :customScrollBox="scrollViewHeight">
			<div class="mine-container">
				<div class="user-avatar-card">
					<div class="avatar" v-if="user">
						<img :src="user.avatarurl" />
					</div>
					<div class="info">
						<div class="title">
							<div class="name">
								{{ user.member_id===''?user.nickname:user.eamsinfo.name }}
								<span v-if="user.member_id!=='' &&  user.eamsinfo.type === 'student'">{{ user.eamsinfo.department }}</span>
								<span v-if="user.member_id!=='' &&  user.eamsinfo.type === 'teacher'">武工商教职工</span>
							</div>
						</div>
						<div class="addtime">
							{{ user.member_id===''?`注册时间：${user.addtime}`:(user.eamsinfo.type === 'student'?`学号：${user.eamsinfo.uid}`:`工号：${user.eamsinfo.uid}`) }}
						</div>
					</div>
				</div>
			</div>
			<div v-if="user.member_id!=='' && user.eamsinfo.type === 'student'" class="user-info-card">
				<van-row>
					<van-col span="12">
						<div class="value">{{user.eamsinfo.class}}</div>
						<div class="title">专业班级</div>
					</van-col>
					<van-col span="12">
						<div class="value">{{graduatetime}}</div>
						<div class="title">离毕业还有</div>
					</van-col>
				</van-row>
			</div>
			<van-cell-group class="user-cell-group" inset>
				<van-cell size="large" @click="toAbout()" is-link>
					<img slot="icon" class="icon" :src="svg.info" />
					<div slot="title">
						<div class="van-cell-text">关于我们</div>
					</div>
				</van-cell>
				<van-cell size="large" @click="showQrcode()" is-link>
					<img slot="icon" class="icon" :src="svg.hold" />
					<div slot="title">
						<div class="van-cell-text">赞助支持</div>
					</div>
				</van-cell>
				<button open-type="contact" session-from="wtbukb">
					<van-cell size="large" is-link>
						<img slot="icon" class="icon" :src="svg.service" />
						<div slot="title">
							<div class="van-cell-text">在线客服</div>
						</div>
					</van-cell>
				</button>
				<button open-type="feedback">
					<van-cell size="large" is-link>
						<img slot="icon" class="icon" :src="svg.feedback" />
						<div slot="title">
							<div class="van-cell-text">意见反馈</div>
						</div>
					</van-cell>
				</button>
				<button open-type="share">
					<van-cell size="large" is-link>
						<img slot="icon" class="icon" :src="svg.shareOutline" />
						<div slot="title">
							<div class="van-cell-text">分享小程序</div>
						</div>
					</van-cell>
				</button>
				<van-cell size="large" @click="user.member_id === ''?bindStuBtnClick():unbindStuBtnClick()" is-link>
					<img slot="icon" class="icon" :src="svg.bind" />
					<div slot="title">
						<div class="van-cell-text">{{user.member_id===''?'绑定 WTBU 账号':'解绑 WTBU 账号'}}</div>
					</div>
				</van-cell>
				<van-cell size="large" @click="logout()" is-link>
					<img slot="icon" class="icon" :src="svg.logout" />
					<div slot="title">
						<div class="van-cell-text">退出登录</div>
					</div>
				</van-cell>
			</van-cell-group>
		</scroll-list>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import info from '../../../../assets/images/info.svg'
	import feedback from '../../../../assets/images/feedback.svg'
	import shareOutline from '../../../../assets/images/share-outline.svg'
	import bind from '../../../../assets/images/bind.svg'
	import hold from '../../../../assets/images/hold.svg'
	import logout from '../../../../assets/images/logout.svg'
	import service from '../../../../assets/images/service.svg'

	export default {
		data() {
			return {
				refreshLoading: false,
				logo,
				svg: {
					info,
					feedback,
					shareOutline,
					bind,
					hold,
					logout,
					service
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
				console.log(this.$store.getters.user.member_id === '')
				return this.$store.getters.user
			},
			graduatetime() {
				if (this.$store.getters.user.member_id !== '') {
					const today = new Date()
					const graduateTime = new Date(parseInt(this.$store.getters.user.eamsinfo.grade) + parseInt(this.$store.getters.user.eamsinfo.studyyears), 6, 30);
					return parseInt((graduateTime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))+'天';
				}
				
				return '-'
			},
			scrollViewHeight() {
				return 'auto'
			}
		},
		methods: {
			initList() {
				this.refreshLoading = true
				setTimeout(async () => {
					await this.$store.dispatch('checkToken')
					await this.$store.dispatch('getUserInfo')
					this.refreshLoading = false
				}, 300)
			},
			toAbout() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/about/about',
				})
			},
			scanLogin() {
				wx.vibrateShort()
				wx.scanCode({
				  onlyFromCamera: true,
				  success (res) {
					console.log(res)
				  }
				})	
			},
			showQrcode() {
				wx.vibrateShort();
				wx.previewImage({
					urls: ['https://wtbuer-server.miuss.icu/Pay.jpg'],
					current: 'https://wtbuer-server.miuss.icu/Pay.jpg'
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
						if (res.confirm) {
							that.$store.dispatch('unbindEamsMember')
							wx.removeStorageSync('courseList')
							wx.removeStorageSync('courseIds')
							wx.removeStorageSync('courseUpdateTime')
							that.initList()
							wx.showToast({
								icon: 'none',
								title: '解绑成功，如需查看课表请重新绑定账号!'
							})
						}
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
							wx.removeStorageSync('courseUpdateTime')
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
	
	page {
		overflow: hidden;
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

	.user-avatar-card {
		background-color: #ffffff;
		position: relative;
		display: block;
		padding: 32px 16px;
		height: 64px;
		border-bottom: 1px solid #eeeeee;
		margin-bottom: 16px;
	}

	.user-avatar-card .avatar {
		z-index: 1;
		position: absolute;
		left: 16px;
	}

	.user-avatar-card .avatar img {
		border-radius: 5px;
		width: 64px;
		height: 64px;
	}

	.user-avatar-card .info {
		margin-left: 84px;
	}

	.user-avatar-card .name {
		font-size: 20px;
		margin-top: 6px;
		font-weight: 600;
	}

	.user-avatar-card .name span {
		margin-left: 8px;
		font-size: 13px;
		background-color: #000000;
		color: #FFFFFF;
		padding: 0 4px;
		border-radius: 3px;
	}

	.user-avatar-card .addtime {
		margin-top: 5px;
		opacity: .6;
		font-size: 16px;
	}

	.user-avatar-card .department {
		position: absolute;
		z-index: 0;
		opacity: .05;
		right: 2px;
		bottom: -6px;
		font-weight: 600;
		font-size: 34px;
	}

	.user-info-card {
		margin: 0 16px;
		margin-bottom: 16px;
		background-color: #ffffff;
		border-radius: 5px;
		padding: 24px 16px;
		text-align: center;
	}

	.user-info-card .title {
		opacity: .6;
		font-size: 13px;
	}
	
	.user-info-card .value {
		font-weight: 600;
		font-size: 16px;
		margin-bottom: 3px;
	}

	.user-cell-group .icon {
		margin-right: 10px;
		width: 25px;
		height: 25px;
	}

	.user-cell-group button {
		padding: 0;
		background-color: transparent;
		text-align: unset;
		font-size: unset;
	}

	.user-cell-group button::after {
		content: unset;
	}
</style>
