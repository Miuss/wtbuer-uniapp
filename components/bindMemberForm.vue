<template>
  <div>
    <div class="bind-title">绑定武汉工商学院教务系统账号</div>
    <van-cell-group custom-class="bind-form" inset>
      <van-field
        :value="username"
        title-width="3.2em"
        size="large"
        clearable
        label="账号"
        placeholder="请输入学号 / 教师工号"
        @change="onChangeUsername"
      ></van-field>
      <van-field
        :value="password"
        title-width="3.2em"
        size="large"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :border="false"
        @change="onChangePassword"
      ></van-field>
    </van-cell-group>
    <div class="bind-bottom">
      <van-button class="bind-button" color="#4562e5" type="primary" custom-style="border-radius: 8px;" block @click="bindEamsMember">立即绑定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    bindEamsMember () {
      this.$store.dispatch('bindEamsMember', {
        username: this.username,
        password: this.password
      })
	  console.log("bindVUE:",this.$store.getters.user)
    },
    onChangeUsername (event) {
      this.username = event.detail
    },
    onChangePassword (event) {
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

.bind-bottom {
  margin: 16px;
}
</style>