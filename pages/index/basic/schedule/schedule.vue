<template>
	<div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left">
				<img class="logo" :src="logo" />
				<div class="timetable" v-if="courseIds.index && user.member_id!==''">
					<picker @change="onConfirmChangeIds" :value="courseIds.index" :range="semesterIds" range-key="year">
						<div class="week">{{ weekPicker[week-1] }}</div>
						<div class="semester">{{courseIds.year}}
							<van-icon name="arrow-down" />
						</div>
					</picker>
				</div>
				<div v-else>
					武工商课表
				</div>
			</div>
		</van-nav-bar>

		<div class="unbind-eams-member" v-if="user.member_id === ''">
			<van-empty description="尚未绑定教务系统账号">
				<van-button round type="primary" class="bottom-button" color="#4562e5"
					@click="$store.dispatch('showBindMember', true)">绑定教务系统账号</van-button>
			</van-empty>
		</div>
		<courseList v-else></courseList>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'
	import courseList from '../../../../components/courseList.vue'
	
	export default {
		data() {
			return {
				weekPicker: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周',
					'第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'
				],
				logo,
				changeIds: false
			}
		},
		created(){
		},
		computed: {
			user() {
				return this.$store.getters.user
			},
			courseIds() {
				return this.$store.getters.courseIds
			},
			semesterIds() {
				return this.$store.getters.semesterIds
			},
			week() {
				return this.$store.getters.week
			}
		},
		methods: {
			onConfirmChangeIds(e) {
				this.$store.dispatch('getCourseList', this.semesterIds[e.detail.value])
			}
		},
		components: {
			courseList
		}
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");
	
	.unbind-eams-member {
		background-color: #fff;
	}


	.unbind-eams-member .bottom-button {
		width: 160px;
	}

	.timetable {
		pointer-events: unset !important;
		text-align: left;
	}

	.timetable .week {
		line-height: 17px;
		font-size: 15px;
		font-weight: 600;
		margin-top: 4px;
	}

	.timetable .semester {
		line-height: 16px;
		font-weight: 400;
		font-size: 10px;
		opacity: .8;
	}
</style>
