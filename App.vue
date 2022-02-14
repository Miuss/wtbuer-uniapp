<script>
	export default {
		async created() {
			// 调用API从本地缓存中获取数据
			/*
			 * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
			 * 微信：mpvue === wx, mpvuePlatform === 'wx'
			 * 头条：mpvue === tt, mpvuePlatform === 'tt'
			 * 百度：mpvue === swan, mpvuePlatform === 'swan'
			 * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
			 */

			await this.getSystemInfo()

			this.$store.dispatch('fetchParams')

		 // 启动时获取 token
			const token = wx.getStorageSync('token') || ''

			if (token !== '') {
				this.$store.commit('UPDATE_TOKEN', token)
				this.$store.dispatch('checkToken')
				this.$store.dispatch('getUserInfo')
				this.getStorageCourseList()
				this.getStorageCourseIds()
			} else {
				wx.redirectTo({
					// url: '/pages/login/login'
					url: '/pages/index/index'
				})
			}
		},
		methods: {
			getStorageCourseList() {
				const courseList = wx.getStorageSync('courseList') || []

				if (courseList.length > 0) {
					this.$store.commit('UPDATE_COURSELIST', courseList)
					console.log(this.$store.state)
				}
			},
			getStorageCourseIds() {
				const courseIds = wx.getStorageSync('courseIds') || {}

				if (courseIds) {
					this.$store.commit('UPDATE_COURSEIDS', courseIds)
				}
			},
			async getSystemInfo() {
				try {
					const res = await wx.getSystemInfoSync()
					this.$store.commit('UPDATE_SYSTEMINFO', res)
					console.log(this.$store.getters.systemInfo)
				} catch (err) {
					// Do something when catch error
					console.error(err)
				}
			}
		}
	};
</script>

<style>
	@import url("/wxcomponents/vant/common/index.wxss");

	/*全局样式*/
	page {
		background-color: #eeeeee;
	}

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 200rpx 0;
		box-sizing: border-box;
	}

	.nav-bar {
		--padding-md: 8px;
	}

	.nav-bar.backdrop {
		--nav-bar-background-color: rgba(255, 255, 255, 0.7) !important;
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
	}

	.nav-bar .logo_img {
		margin-right: 3pt;
		width: 32px;
		height: 32px;
	}

	.nav-bar .title_div {
		display: flex;
		align-items: center;
		font-weight: 600;
		font-size: 12pt;
		color: #444;
	}

	/* this rule will be remove */
	* {
		transition: width 2s;
		-moz-transition: width 2s;
		-webkit-transition: width 2s;
		-o-transition: width 2s;
	}
</style>
