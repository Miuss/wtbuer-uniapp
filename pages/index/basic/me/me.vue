<template>
	<view>
		<div v-if="user !== ''">
		    <van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
		      <div class="title" slot="left">
		        <img class="logo" :src="logo" />
		        我的
		      </div>
		    </van-nav-bar>
		    <scroll-list :refreshLoading="refreshLoading" @refresh="initList" @loadmore="loadmore" :showTip="false">
		      <div class="user-avatar-card">
		        <div class="avatar">
		          <img class="icon" :src="user.avatarurl" />
		        </div>
		        <div class="info">
		          <div class="title">{{ user.nickname }}</div>
		          <div class="addtime">{{ user.addtime }}</div>
		        </div>
		      </div>
		      <van-cell-group>
		        <van-cell title="关于我们" is-link></van-cell>
		        <van-cell title="赞助支持" is-link></van-cell>
		        <van-cell title="分享小程序" is-link></van-cell>
		      </van-cell-group>
		    </scroll-list>
		  </div>
	</view>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	export default {
		data() {
			return {
				logo,
				refreshLoading: false
			}
		},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			},
			user() {
				return this.$store.getters.user
			}
		},
		methods: {
			initList() {
				this.refreshLoading = true
				setTimeout(() => {
					this.refreshLoading = false
				}, 500)
			}
		}
	}
</script>

<style scoped>
@import url("../../../../assets/css/nav_bar.css");
.user-avatar-card {
	display: flex;
  background-color: #ffffff;
  align-items: center;
	position: relative;
	padding: 24rpx;
	height: 98px;
}

.user-avatar-card .avatar {
	display: flex;
	position: relative;
	transition: transform .3s;
	border-radius: 5em;
	background: #F5F5F5;
}

.user-avatar-card .avatar .icon {
	border-radius: 5em;
	width: 72px;
	height: 72px;
	background-color: #F5F5F5;
	border: 3px solid #33333363;
}

.user-avatar-card .info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	margin-left: 27rpx;
	color: #444444;
}

.user-avatar-card .info .title {
	font-size: 42rpx;
	font-weight: 600;
}

.user-avatar-card .info .addtime {
	font-size: 13px;
	opacity: .6;
	margin-top: 4px;
}
</style>
