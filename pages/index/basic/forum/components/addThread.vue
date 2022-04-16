<template>
	<div>
		<div class="post-buttons">
			<van-button type="primary" custom-class="close" plain @click="hide">取消</van-button>
			<van-button type="primary" size="small" :disabled="content===''" @click="addPost" :loading="loading" loading-text="发布">发布</van-button>
		</div>
		<div class="content-edit">
			<textarea :value="content" placeholder="这一刻的想法..." placeholder-style="color: #adadad;" @input="onChangeContent" />
		</div>
		<div class="content-box">
			<van-uploader
				multiple="true"
				image-fit="aspectFill"
				:previewSize="previewSize"
				:file-list="fileList"
				max-count="9"
				:deletable="true"
				@delete="deleteImg"
				@after-read="afterRead"
			/>
		</div>
	</div>
</template>

<script>
	import { uploadPic } from "../../../../../api/systemapi.js"
	import { addThread } from "../../../../../api/forumapi.js"
	import back from '../../../../../assets/images/back.svg'
	import cuEditor from '@/components/cu-editor/cu-editor'
	
	export default {
		data() {
			return {
				svg: {
					back,
				},
				content: '',
				fileList: [],
			}
		},
		computed: {
			previewSize() {
				return (this.$store.getters.systemInfo.safeArea.width - 16 - 36)/3
			}
		},
		methods: {
			hide() {
				this.content = ''
				this.fileList = []
				this.$parent.onClose()
			},
			onChangeContent(event) {
				this.content = event.detail.value
			},
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
			addContent() {

			},
			afterRead(event) {
				const { file } = event.detail
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				file.forEach(async (item) => {
					const res = await uploadPic(item.url)
					console.log(res)
					if (!res.code) {
						this.fileList.push({
							name: res.data.name,
							url: res.data.url
						})
					}
				})
			},
			deleteImg(event) {
				const file = event.target.file
				this.fileList = this.fileList.filter((item) => {
					return item.url !== file.url
				})
			},
			async addPost() {
				const images = this.fileList.map((item) => {
					return item.url
				})
				this.loading = true
				wx.showLoading({
					title: '动态发布中',
					mask: true
				})
				try {
					const data = await addThread(this.content, 1, images)
					if (data.code) {
						throw new Error(data.msg)
					}
					
					this.$parent.$refs.new.initList()
					
					wx.hideLoading()
					wx.showToast({
					  title: '发布成功',
					  icon: 'success',
					  duration: 2000
					})
					this.hide()
				} catch (e) {
					wx.showToast({
						title: e.toString().replace(/Error/, "错误"),
						icon: 'none',
						duration: 2000
					})
					console.error(e)
				} finally {
					this.loading = false
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../../../assets/css/nav_bar.css");
	
	.close {
		color: #333333!important;
		border: 0!important;
		background-color: none!important;
	}
	
	.post-buttons {
		padding: 8px 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.content-edit {
		padding: 18px;
		
		textarea {
			width: 100%;
			color: #4c4c4c;
			font-size: 15px;
		}
	}
	
	.content-box {
		padding: 18px;
	}
</style>
