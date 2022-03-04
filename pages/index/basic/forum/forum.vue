<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				<img class="logo" :src="logo" />武工商社区
			</div>
		</van-nav-bar>
		<div class="tab-bar">
			<div class="find" :class="tabBar===0?'selected':''" @click="tabBar=0">发现</div>
			<div class="mine" :class="tabBar===1?'selected':''" @click="tabBar=1">我的</div>
			<div class="add">
				<img class="img" :src="svg.add" @click="addContent()" />
			</div>
		</div>
		<div class="forum-list" v-if="tabBar===0">
			<div class="forum-container" v-for="(item,index) in threadList" :key="item.id" @tap="getDetail(item.id)">
				<div class="name">{{item.name}}</div>
				<div class="content">{{item.content}}</div>
				<div class="time">{{item.createAt}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import add from '../../../../assets/images/add.svg'
	import { getDiscuss, getThread, addThread, delThread, editThread, getThreadDetail } from '../../../../api/forumapi.js'
	
	export default {
		data() {
			return {
				logo,
				svg: {
					add
				},
				discuss: {},
				threadList: [],
				tabBar: 0
			}
		},
		methods: {
			addContent() {
				wx.navigateTo({
					url: '/pages/index/basic/forum/components/addThread'
				})
			},
			getDetail(id) {
				wx.navigateTo({
					url: '/pages/index/basic/forum/components/threadDetail?id=' + id
				})
			},
			timeTrans(timestr){
				let time = new Date(timestr)
				return `${time.getHours()}:${time.getMinutes()} ${time.toDateString().slice(4,10)},${time.toDateString().slice(10,15)}`
			}
		},
		mounted() {
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
		width: 30px;
		height: 30px;
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
		color: 
		#b6b6b6;
	}
</style>
