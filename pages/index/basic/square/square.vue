<template>
	<div>
		<div class="page-bg"></div>
		<van-nav-bar custom-class="nav-bar" :fixed="true" :placeholder="true" :border="false">
			<div class="title" slot="left" style="width: 100%;">
				<img class="logo" :src="logo" />武工商课表
			</div>
		</van-nav-bar>

		<div class="outside">
			<div class="head">
				<div class="saying">
					<div class="sub-title1">
						{{wishes.time+", Wtbuer"}}
					</div>
					<div class="sub-title2">
						{{wishes.wishes}}
					</div>
				</div>
				<img class="time_icon" :src="wishes.icon" />
			</div>
			<div class="func-bars-container">
				<div class="func-bar exam" @click="toExam()">
					<img class="icon" :src="svg.exam" />
					<div class="title">考试查询</div>
					<div class="description">考试顺利！</div>
				</div>
				<div class="func-bar score" @click="toScore()">
					<img class="icon" :src="svg.score" />
					<div class="title">分数查询</div>
					<div class="description">好运伴你！</div>
				</div>
				<div class="func-bar" @click="toLibrary()">
					<img class="icon" :src="svg.ydxf" />
					<div class="title">武汉工商学院·图书馆</div>
					<div class="description">在线查询图书馆数据</div>
				</div>
			</div>

			<div class="other-function">
				<van-empty image="search" description="其他功能还在开发中..." />
			</div>
		</div>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'

	import exam from '../../../../assets/images/exam.svg'
	import score from '../../../../assets/images/score.svg'
	import ydxf from '../../../../assets/images/ydxf.png'
	import noon from '../../../../assets/images/morning.svg'
	import morning from '../../../../assets/images/light_morning.svg'
	import evening from '../../../../assets/images/moon.svg'


	export default {
		components: {},
		data() {
			return {
				logo,
				svg: {
					score,
					exam,
					ydxf,
					morning,
					noon,
					evening,
				}
			}
		},
		methods: {
			toExam() {
				if (this.user.member_id === '') {
					this.$store.dispatch('showBindMember', true)
					return
				}
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/exam/exam',
				})
			},
			toScore() {
				if (this.user.member_id === '') {
					this.$store.dispatch('showBindMember', true)
					return
				}
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/score/score',
				})
			},
			toLibrary() {
				wx.vibrateShort();
				wx.navigateTo({
					url: '/pages/library/library',
				})
			}
		},
		computed: {
			authenticated() {
				return this.$store.getters.authenticated
			},
			user() {
				return this.$store.getters.user
			},
			wishes() {
				const now = new Date()
				if (now.getHours() >= 22 || now.getHours() < 3) {
					return {
						time: '夜深了',
						wishes: '早点休息才可以更好的学习哦！',
						icon: this.svg.evening
					}
				}

				if (now.getHours() <= 22 && now.getHours() >= 19) {
					return {
						time: '晚上好',
						wishes: '充实的一天就要结束了，巩固一下今天的所学吧！',
						icon: this.svg.evening
					}
				}

				if (now.getHours() < 19 && now.getHours() > 13) {
					return {
						time: '下午好',
						wishes: '打起精神，上课要认真！',
						icon: this.svg.noon
					}
				}

				if (now.getHours() <= 13 && now.getHours() > 11) {
					return {
						time: '中午好',
						wishes: '饭后半小时的午觉是很舒服的！',
						icon: this.svg.noon
					}
				}

				return {
					time: '早上好',
					wishes: 'Wish you have a good day！',
					icon: this.svg.morning
				}
			}
		},
	}
</script>

<style>
	@import url("../../../../assets/css/nav_bar.css");

	.page-bg {
		background-color: #f7f8fa;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
	
	.nav-bar {
		border-bottom: 1px solid #eeeeee;
	}

	.unbind-eams-member {
		background-color: #fff;
	}


	.unbind-eams-member .bottom-button {
		width: 160px;
	}

	.text-purple,
	.line-purple,
	.lines-purple {
		color: var(--purple);
	}

	.padding-tb {
		padding-top: 30rpx;
		padding-bottom: 30rpx;
	}
	
	.func-bars-container {
		margin: 16px 16px;
		display: grid;
		position: relative;
		display: grid;
		--func-bars-gap: 16px;
		grid-template-columns: repeat(2,calc(50% - var(--func-bars-gap)*1/2));
		grid-row-gap: var(--func-bars-gap);
		grid-column-gap: var(--func-bars-gap);
	}
	
	.func-bars-container .func-bar {
		padding: 16px;
		background-color: #ffffff;
		min-height: 48px;
		border-radius: 10px;
		border: 1px solid #EEEEEE;
	}
	
	.func-bars-container .func-bar:active {
		transform: scale(.98);
		transition: .2s;
	}
	
	.func-bars-container .func-bar:nth-child(3) {
		grid-column-start: 1;
		grid-column-end: 3;
	    grid-row-start: 2;
	    grid-row-end: 2;
	}
	
	.func-bars-container .func-bar .icon {
		position: absolute;
		width: 48px;
		height: 48px;
	}
	
	.func-bars-container .func-bar .title,
	.func-bars-container .func-bar .description {
		margin-left: 60px;
	}
	
	.func-bars-container .func-bar .title {
		margin-top: 2px;
		color: #333333;
		font-size: 18px;
		font-weight: 600;
	}
	
	.func-bars-container .func-bar .description {
		color: #333333;
		font-size: 14px;
		opacity: .6;
	} 

	/*祝福语*/
	.head {
		display: flex;
		align-items: center;
	}

	.head .time_icon {
		width: 60px;
		height: 60px;
	}

	.saying {
		width: calc(100% - 160px);
		height: 10vh;
		margin: 32px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: space-around;
	}

	.saying .sub-title1 {
		font-size: 24px;
		font-weight: bold;
		color: #333333;
	}

	.saying .sub-title2 {
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		opacity: .4;
	}

	/*其他功能*/
	.other-function {
		width: 90%;
		margin-left: 5%;
		margin-top: 6%;
	}

	.other-function .title {
		font-size: 21px;
		font-weight: bold;
	}
	
	@media screen and (max-width: 380px) {
		.func-bars-container {
		    grid-template-columns: repeat(1,100%);
		}
		
		.func-bars-container .func-bar:nth-child(3) {
			grid-column-start: unset;
			grid-column-end: unset;
			grid-row-start: unset;
			grid-row-end: unset;
		}
		
		.saying {
		    height: 18vh;
		}
	}
</style>
