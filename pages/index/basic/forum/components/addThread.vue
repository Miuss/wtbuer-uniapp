<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" @click="onClickLeft()" slot="left">
				<img class="logo" :src="svg.back" />
				返回
			</div>
		</van-nav-bar>
		<div class="input">
			<van-cell-group>
				<van-field :value="content" type="textarea" placeholder="说点什么吧~~~" :show-word-limit="true" :maxlength="150" autosize :border=" true " />
			</van-cell-group>
			<div class="button" @click="addContent">发表</div>
		</div>
	</div>
</template>

<script>
	import addThread from "../../../../../api/forumapi.js"
	import back from '../../../../../assets/images/back.svg'
	export default {
		data() {
			return {
				svg: {
					back,
				},
				content: '',
			}
		},
		methods: {
			onClickLeft() {
				wx.vibrateShort();
				wx.navigateBack({
					delta: 1
				})
			},
			addContent() {

			}
		}
	}
</script>

<style>
	@import url("../../../../../assets/css/nav_bar.css");
	
	.input{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.button {
		background-color: #5975FF;
		color: #FFFFFF;
		border-radius: 20px;
		font-size: 20px;
		padding: 10px 20px 10px 20px;
		margin-top: 10px;
		align-self: center;
	}
</style>
