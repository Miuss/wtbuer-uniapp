<template>
	<view>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				<img class="logo" :src="logo" />武工商社区
			</div>
		</van-nav-bar>
		<van-notice-bar background="#5e77ff" color="#fff" left-icon="volume-o"
			:text="discuss.description" />
			<view>
				<input type="text" placeholder="说点什么"/>
				<button type="default" @click="addContent">发表</button>
			</view>
		<view class="forum-content" v-for="(item,index) in threadList" :key="item.id" @tap="getDetail(item.id)">
			<!-- <img class="forum-content-icon" :src="logo" /> -->
			<div class="forum-content-name">{{item.name}}</div>
			<div class="forum-content-data">{{item.content}}</div>
			<div class="forum-content-time">{{item.createAt}}</div>
		</view>
		
	</view>
	
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import {getDiscuss,getThread,addThread,delThread,editThread,getThreadDetail} from '../../../../api/forumapi.js'
	export default {
		data() {
			return {
				logo,
				discuss:{},
				threadList:[],
			}
		},
		methods: {
			addContent(){
				//跳转新页面或者是就在当前页面输入
				// wx.navigateTo({
				// 	url: '/pages/index/basic/forum/components/addThread',
				// })
			},
			getDetail(id){
				wx.navigateTo({
					url: '/pages/index/basic/forum/components/threadDetail?id='+id,
				})
			}
		},
		mounted(){
			//公告
			getDiscuss(1,4).then((res)=>{
				console.log(res.data);
				res.data.data.map((v)=>{
					this.discuss=v;
				})				
			})
			getThread(1,10,1).then((res)=>{
				this.threadList=res.data.data;
				console.log(this.thread);
			})
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");
</style>
