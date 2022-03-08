<template>
	<div>
		<div class="bind-title">绑定 WTBU 账号</div>
		<van-cell-group custom-class="bind-form" inset>
			<van-field :value="username" title-width="3.2em" size="large" clearable label="账号"
				placeholder="请输入账号" @change="onChangeUsername"></van-field>
			<van-field :value="password" title-width="3.2em" size="large" type="password" label="密码" placeholder="请输入密码"
				:border="false" @change="onChangePassword"></van-field>
		</van-cell-group>
		<div class="tips">提示：忘记密码请去 WTBU 系统找回密码</div>
		<div class="bind-bottom">
			<van-button class="bind-button" color="#4562e5" type="primary" custom-style="border-radius: 8px;" block :loading="bindLoading" loading-text="教务账号绑定中..."
				@click="bindEamsMember">立即绑定</van-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				bindLoading: false
			}
		},
		methods: {
			async bindEamsMember() {
				this.bindLoading = true
				await this.$store.dispatch('bindEamsMember', {
					username: this.username,
					password: this.password
				})
				this.bindLoading = false
			},
			onChangeUsername(event) {
				this.username = event.detail
			},
			onChangePassword(event) {
				this.password = event.detail
			}
		}
	}
</script>

<style scoped>
	.bind-title {
		line-height: 50px;
		padding: 0 16px;
		opacity: .75;
		font-size: 15px;
		margin-bottom: 15px;
	}

	.bind-bottom, .tips {
		margin: 16px;
	}
	
	.tips {
		font-size: 14px;
		opacity: .5;
	}
</style>
