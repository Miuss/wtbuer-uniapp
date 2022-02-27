<template>
	<div>
		<div class="main-container">
			<home v-if="active==0" />
			<schedule v-if="active==1" />
			<square v-if="active==2" />
			<forum v-if="active==3" />
			<mine v-if="active==4" />
		</div>
		<div class="main-tabbar">
			<van-tabbar :active="active" @change="onChange" active-color="#4562e5" inactive-color="#444444"
				:placeholder="true">
				<van-tabbar-item v-for="(item, index) in icons" :key="index">
					<image slot="icon" :src="item.default" mode="aspectFit"
						:style="'width:'+ iconWidth + ';height:'+ iconHeight + ';'" />
					<image slot="icon-active" :src="item.active" mode="aspectFit"
						:style="'width:'+ iconWidth + ';height:'+ iconHeight + ';'" />
					<p>{{ item.text }}</p>
				</van-tabbar-item>
			</van-tabbar>
		</div>

		<van-popup :show="bindMember" round closeable position="bottom" custom-style="height: 70%;background: #eeeeee;"
			@close="onClose">
			<bindMemberForm></bindMemberForm>
		</van-popup>

	</div>
</template>

<script>
	import bindMemberForm from '../../components/bindMemberForm.vue'
	import home from './basic/home/home.vue'
	import forum from './basic/forum/forum.vue'
	import square from './basic/square/square.vue'
	import mine from './basic/me/me.vue'
	import schedule from './basic/schedule/schedule.vue'
	
	import svg_community from '../../assets/images/tabbar/community.svg'
	import svg_community_a from '../../assets/images/tabbar/community_a.svg'
	import svg_home from '../../assets/images/tabbar/home.svg'
	import svg_home_a from '../../assets/images/tabbar/home_a.svg'
	import svg_mine from '../../assets/images/tabbar/mine.svg'
	import svg_mine_a from '../../assets/images/tabbar/mine_a.svg'
	import svg_schedule from '../../assets/images/tabbar/schedule.svg'
	import svg_schedule_a from '../../assets/images/tabbar/schedule_a.svg'
	import svg_square from '../../assets/images/tabbar/square.svg'
	import svg_square_a from '../../assets/images/tabbar/square_a.svg'

	export default {
		data() {
			return {
				active: 0,
				iconWidth: '34px',
				iconHeight: '25px',
				icons: [{
					default: svg_home,
					active: svg_home_a,
					text: '首页'
				}, {
					default: svg_mine,
					active: svg_mine_a,
					text: '课表'
				}, {
					default: svg_square,
					active: svg_square_a,
					text: '广场'
				}, {
					default: svg_community,
					active: svg_community_a,
					text: '社区'
				}, {
					default: svg_mine,
					active: svg_mine_a,
					text: '我的'
				}]
			}
		},
		computed: {
			bindMember() {
				return this.$store.getters.showBindMember
			}
		},
		methods: {
			onChange(event) {
				this.active = event.detail;
			},
			onClose() {
				this.$store.dispatch('showBindMember', false)
			}
		},
		components: {
			bindMemberForm,
			home,
			forum,
			square,
			mine,
			schedule
		}
	}
</script>

<style>
	.main-container {
		width: 100%;
	}

	.main-tabbar p {
		font-size: 8px;
	}

	.main-tabbar .van-tabbar {
		background-color: rgba(255, 255, 255, 0.7);
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
	}
</style>
