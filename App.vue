<script>
	export default {
		async created() {

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
					url: '/pages/login/login'
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
</style>
