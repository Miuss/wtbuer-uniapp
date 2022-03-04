<template>
	<div>
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
				<div class="row-first">
					<div class="func-bar exam">
						<div class="icon">
							<img class="img left" :src="svg.exam" />
						</div>
						<div class="title">
							<div class="cn left">考试查询</div>
							<div class="en left">Examination Inquiry</div>
						</div>
						<div class="button-container">
							<div class="description left">考试顺利！</div>
							<div class="button left-btn" @click="toExam()">START</div>
						</div>
					</div>
					<div class="func-bar score">
						<div class="icon">
							<img class="img right" :src="svg.score" />
						</div>
						<div class="title">
							<div class="cn right">分数查询</div>
							<div class="en right">Score Query</div>
						</div>
						<div class="button-container">
							<div class="description right">好运伴你！</div>
							<div class="button right-btn" @click="toScore()">START</div>
						</div>
					</div>
				</div>
				<div class="row-second">
					<div class="func-bar">
						<div class="library">
							<div class="title-cn">武汉工商学院·图书馆</div>
							<div class="title-en">WTBU Library</div>
						</div>
						<div class="button" @click="toLibrary()">GO</div>
					</div>
				</div>
			</div>

			<div class="other-function">
				<van-empty image="search" description="开发君正在加班~~~" />
			</div>
		</div>
	</div>
</template>

<script>
	import logo from '../../../../assets/images/logo.png'

	import exam from '../../../../assets/images/exam.svg'
	import score from '../../../../assets/images/score.svg'
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
		width: 70%;
		height: 10vh;
		margin: 5%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: space-around;
	}

	.saying .sub-title1 {
		font-size: 24px;
		font-weight: bold;
		color: #000000;
	}

	.saying .sub-title2 {
		font-size: 16px;
		font-weight: bold;
		color: #868a94;
	}


	/*欢迎语*/
	.func-bars-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.func-bars-container .row-first {
		width: 95%;
		display: flex;
		justify-content: space-around;
	}

	.func-bars-container .row-first .func-bar {
		height: 23vh;
		width: 45%;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.func-bars-container .row-first .func-bar .icon {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: column;
	}

	.func-bars-container .row-first .func-bar .icon .img {
		width: 60px;
		height: 60px;
		align-self: flex-end;
		padding: 10px;
		border-bottom-left-radius: 30px;
		border-top-right-radius: 10px;
	}

	.func-bars-container .row-first .func-bar .icon .left {
		background-color: #8b81fd;
	}

	.func-bars-container .row-first .func-bar .icon .right {
		background-color: #f3c15c;
	}

	.func-bars-container .row-first .func-bar .title {
		width: 100%;
		height: 30%;
		margin-left: 8%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.func-bars-container .row-first .func-bar .title .cn {
		font-size: 20px;
		font-weight: bold;
	}

	.func-bars-container .row-first .func-bar .title .en {
		font-size: 13px;
		font-weight: 100;
	}

	.func-bars-container .row-first .func-bar .title .left {
		color: #ffffff;
	}

	.func-bars-container .row-first .func-bar .title .right {
		color: #3F414E;
	}

	.func-bars-container .row-first .func-bar .button-container {
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.func-bars-container .row-first .func-bar .button-container .description {
		font-size: 13px;
		font-weight: bold;
		margin-left: 5%;
	}

	.func-bars-container .row-first .func-bar .button-container .left {
		color: #FFFFFF;
	}

	.func-bars-container .row-first .func-bar .button-container .right {
		color: #3F414E;
	}

	.func-bars-container .row-first .func-bar .button-container .button {
		padding: 8px 12px 8px 12px;
		border-radius: 30px;
		margin-right: 5%;
		font-weight: bold;
		font-size: 12px;
	}

	.func-bars-container .row-first .func-bar .button-container .button:active {
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
	}

	.func-bars-container .row-first .func-bar .button-container .left-btn {
		color: #3F414E;
		background-color: #FFFFFF;
	}

	.func-bars-container .row-first .func-bar .button-container .right-btn {
		color: #FFFFFF;
		background-color: #3F414E;
	}

	.row-first .exam {
		background: #8E97FD;
	}

	.row-first .score {
		background: #FFC97E;
	}

	.func-bars-container .row-second {
		width: 95%;
		display: flex;
		justify-content: center;
	}

	.func-bars-container .row-second .func-bar {
		width: 95%;
		height: 11vh;
		border-radius: 10px;
		margin-top: 5%;
		background: #333242;
		display: flex;
		align-items: center;
	}

	.func-bars-container .row-second .func-bar .library {
		width: 50%;
		margin-left: 10%;
		display: flex;
		flex-direction: column;
	}

	.func-bars-container .row-second .func-bar .library .title-cn {
		color: #FFFFFF;
		font-size: 17px;
		font-weight: bold;
	}

	.func-bars-container .row-second .func-bar .library .title-en {
		color: #FFFFFF;
		font-size: 14px;
		margin-top: 3%;
	}

	.func-bars-container .row-second .func-bar .button {
		color: #3F414E;
		background-color: #EBEAEC;
		padding: 8px 12px 8px 12px;
		border-radius: 30px;
		font-size: 20px;
		font-weight: bold;
		margin-left: 15%;
	}

	.func-bars-container .row-second .func-bar .button:active {
		opacity: 0.7;
		transform: scale(.98);
		transition: .2s;
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
</style>
