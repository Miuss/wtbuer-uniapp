<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				<img class="logo" :src="logo" />武工商社区
			</div>
		</van-nav-bar>
		<div class="tab-bar">
			<div class="find" :class="tabBar===0?'selected':''" @click="tabBar=0">发现</div>
			<div class="mine" :class="tabBar===1?'selected':''" @click="tabBar=1">我的</div>
			<div class="add">
				<image class="img" :src="svg.add" mode="aspectFill" @click="addContent()"></image>
			</div>
		</div>
		<div>
			<van-notice-bar background="#6f62ff" color="#fff" left-icon="volume-o" :text="discuss.description" />
		</div>

		<div class="forum-list" v-if="tabBar===0">
			<div class="forum-container" v-for="(item,index) in threadList" :key="item.id" @tap="getDetail(item.id)">
				<div class="name">{{item.name}}</div>
				<div class="content">{{item.content}}</div>
				<div class="time">{{item.createAt}}</div>
			</div>
		</div>

	</view>

</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import {
		getDiscuss,
		getThread,
		addThread,
		delThread,
		editThread,
		getThreadDetail
	} from '../../../../api/forumapi.js'
	export default {
		data() {
			return {
				logo,
				svg: {
					add: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PHBhdGggZD0iTTUxMiA5MzYuOTE2QzI3Ny4zMjcgOTM2LjkxNiA4Ny4wODQgNzQ2LjY3MiA4Ny4wODQgNTEyUzI3Ny4zMjcgODcuMDgzIDUxMiA4Ny4wODNjMjM0LjY3NyAwIDQyNC45MTcgMTkwLjI0NCA0MjQuOTE3IDQyNC45MTZTNzQ2LjY3NyA5MzYuOTE2IDUxMiA5MzYuOTE2em0yMTIuNDU4LTQ2Ny40MTJINTU0LjQ5MlYyOTkuNTQ2aC04NC45ODR2MTY5Ljk1OEgyOTkuNTQydjg0Ljk5MmgxNjkuOTY2djE2OS45NjZoODQuOTg0VjU1NC40OTZoMTY5Ljk2NnYtODQuOTkyeiIgZmlsbD0iIzhhNmVmNSIvPjwvc3ZnPg==',

				},
				discuss: {},
				threadList: [],
				tabBar: 0
			}
		},
		methods: {
			addContent() {
				//跳转新页面或者是就在当前页面输入
				wx.navigateTo({
					url: '/pages/index/basic/forum/components/addThread',
				})
			},
			getDetail(id) {

				wx.navigateTo({
					url: '/pages/index/basic/forum/components/threadDetail?id=' + id,

				})
			},
			timeTrans(timestr){
				let time = new Date(timestr)
				return `${time.getHours()}:${time.getMinutes()} ${time.toDateString().slice(4,10)},${time.toDateString().slice(10,15)}`
			}
		},
		mounted() {
			//公告
			getDiscuss(1, 4).then((res) => {
				res.data.data.map((v) => {
					this.discuss = v;
				})
			})
			getThread(1, 10, 1).then((res) => {
				if(res.length === 0 || res=== null){
					return
				}
				res.data.data.forEach(item=>{
					let showtime = this.timeTrans(item.createAt)
					this.threadList.push({
						...item,
						createAt: showtime
					})
				})
				console.log(this.threadList);
			})
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

	.tab-bar {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;
	}
	
	.tab-bar .selected{
		border-bottom: 5px solid #6f62ff;
		font-weight: bold;
	}

	.tab-bar .add .img {
		width: 40px;
		height: 40px;
	}

	.forum-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid #dadada;
		border-radius: 10px;
	}
	
	.forum-list .forum-container{
		width: 90%;
		display: flex;
		flex-direction: column;
		padding-top: 8%;
		margin-left: 8%;
	}
	
	.forum-list .forum-container .name{
		font-size: 15px;
		font-weight: bold;
	}
	
	.forum-list .forum-container .content{
		margin-top: 10px;
	}
	
	.forum-list .forum-container .time{
		font-size: 12px;
		font-weight: 600;
		color: #b6b6b6;
	}
</style>
