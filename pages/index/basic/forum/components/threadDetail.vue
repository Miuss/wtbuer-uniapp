<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="back" :src="svg.back" />
			</div>
		</van-nav-bar>
		{{id}}
		<div class="content-box" v-if="detail!=''">
			<div class="name margin-bottom">{{detail.title}}</div>
			<div class="post-info margin-bottom">
				<div class="time text-cut fr">{{detail.createAt}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import back from '../../../../../assets/images/back.svg'
	import { getThreadDetail } from '../../../../../api/forumapi'
	export default {
		data() {
			return {
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
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
			async getThreadDetail() {
				this.loading = false
				const res = await getThreadDetail(this.id)
				this.detail = res.data
				this.loading = true
			}
		}
	}
</script>

<style>
	@import url("../../../../../assets/css/nav_bar.css");
</style>
