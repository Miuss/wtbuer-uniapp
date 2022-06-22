<script>
	export default {
		async created() {
			this.getSystemInfo()
			this.$store.dispatch('fetchParams')
			this.getStorageCourseList()
			this.getStorageCourseIds()

			// 启动时获取 token
			const token = wx.getStorageSync('token') || ''

			if (token !== '') {
				await this.$store.commit('UPDATE_TOKEN', token)
				if (this.$store.getters.courseIds !== {}) {
					this.$store.dispatch('autoUpdateCourseList')
				}
				await this.$store.dispatch('checkToken')
				await this.$store.dispatch('getUserInfo')
			} else {
				wx.redirectTo({
					url: '/pages/login/login'
				})
			}
		},
		mounted() {
			this.checkUpdate()
		},
		methods: {
			getStorageCourseList() {
				console.log("获取本地存储的课表")
				const courseList = wx.getStorageSync('courseList') || []

				if (courseList.length > 0) {
					this.$store.commit('UPDATE_COURSELIST', courseList)
					this.$store.commit('UPDATE_COURSE_UPDATE_TIME', wx.getStorageSync('courseUpdateTime') || '')
					console.log(this.$store.state)
				}
			},
			getStorageCourseIds() {
				console.log("获取本地存储的校历")
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
			},
			checkUpdate() {
				const updateManager = uni.getUpdateManager()
				
				updateManager.onCheckForUpdate(function (res) {
				  // 请求完新版本信息的回调
				  console.log(res.hasUpdate)
				})
				
				updateManager.onUpdateReady(function (res) {
				  uni.showModal({
				    title: '更新提示',
				    content: '新版本已经准备好，是否重启应用？',
				    success(res) {
				      if (res.confirm) {
				        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
				        updateManager.applyUpdate()
				      }
				    }
				  })
				
				})
				
				updateManager.onUpdateFailed(function (res) {
				  // 新的版本下载失败
				})

			}
		}
	}
</script>

<style>
	@import url("/wxcomponents/vant/common/index.wxss");
</style>
