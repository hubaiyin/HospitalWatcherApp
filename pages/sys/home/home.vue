<template>
	<view class="main" :style="{ height: safeHeight + 'px' }">
		<view class="header">
			<view class="topNav">
				<view class="choosen">
					<span>
						<h2>智慧助手</h2>
					</span>
				</view>
			</view>
			<view class="setting">
				<image src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png" mode="aspectFit" alt=""></image>
			</view>
		</view>
		<view class="body">
			<view class="title">
				<span>AI助手</span>
			</view>
			<scroll-view :scroll-top="scrollTop" class="scroll" scroll-y @scroll="recordHeight" :style="{ height: scrollHeight + 'px' , }">
				<view class="chat">
					<view id="msgbar" v-for="(item, index) in textList" :key="index" :class="index%2 === 1 ? 'left' : 'right'">
						<view class="avatar">
							<image src="../../../static/avatar.jpg"></image>
						</view>
						<view class="msg">
							<view>{{ item }}</view>
						</view>
					</view>
					<view class="loading" v-show="isLoading">
						<view class="loadText">
							<span>智能生成中...</span>
						</view>
						<view class="spinner">
							<view></view>
							<view></view>
							<view></view>
							<view></view>
							<view></view>
							<view></view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="down" id="down">
				<view class="input">
					<input type="text" v-model="text">
					<button @click="send()">
						<span>发 送</span>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import wsRequest from '../../../api/websocket.js'
	export default {
		data() {
			return {
				safeHeight:0,
				text: "",
				answerText: "",
				textList:[],
				scrollTop:0,
				newTop:0,
				scrollHeight:0,
				count:0,
				websocket: null,
				cnt: 0,
				isLoading: false,
			}
		},
		onShow() {
			this.setSafeArea();
			this.createWs();
		},
		beforeDestroy() {

		},		
		methods:{
			createWs() {
				let token = uni.getStorageSync('token')
				this.websocket = new wsRequest(`ws://101.43.254.115:10115/api/v1/gpt/ws/${token}`,5000)
				this.websocket.getMessage(res => {
					this.cnt ++;
					this.isLoading = false;
					this.answerText += res.data;
					Vue.set(this.textList , this.textList.length-1 , this.answerText)
					if (this.cnt == 12) {
						this.toBottom();
						this.cnt = 0;
					}
				})
			},
			setSafeArea() {
				this.safeHeight = uni.getWindowInfo().safeArea.height;
				// console.log("安全高度：" + this.safeHeight);
				this.$nextTick(()=>{
					const query = uni.createSelectorQuery().in(this);
					query.select('#down').boundingClientRect(data => {
						// console.log(data);
						this.scrollHeight = (data.height / 0.1) * 0.8;	
					}).exec();	
				})
			},
			send(){
				if(this.text == ""){
					uni.showToast({
						title: '请勿发送空消息',
						icon: 'none',
						duration: 1500
					})  
				}
				else {
					// console.log("输入的消息为：" + this.text);
					this.cnt = 0;
					this.answerText = "";
					this.textList.push(this.text);
					this.toBottom();
					this.count ++;
					this.getAnswer(this.text);
					this.text = "";
					this.isLoading = true;
				}	
			},
			getAnswer(ask){
				// this.isLeft = 1;
				this.answerText = ""
				this.textList.push(this.answerText);
				this.toBottom();
				this.count ++ ;
				// 发送消息
				let data = ask;
				this.websocket.send(JSON.stringify(data));
			},
			recordHeight(e) {
				this.newTop = e.detail.scrollTop;
			},
			toBottom() {
				this.$nextTick(() => {
					this.query = uni.createSelectorQuery().in(this);
					this.query
					.selectAll("#msgbar")
					.boundingClientRect((data) => {
						// console.log(data);
						const elements = Array.from(data);
						// console.log("elements");
						// console.log(elements);
						if (!elements.length) return;
						let index = elements.length - 1;
						this.scrollTop = elements[index].bottom - elements[0].bottom;
					})
					.exec();
					this.query = null;
				});
			},
		},
		watch:{
			count: {
				handler() {
					// console.log("@count_handler");
					this.scrollTop = this.newTop;
				},
			},
		}
	}
</script>

<style lang="scss">
	.main {
		// border: 2px solid red;
		width: 100%;
		margin: 0 auto;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		// .inner {
		// 	border: 2px solid blue;
		// 	width: 95%;
		// 	display: flex;
		// 	flex-direction: column;
		//  justify-content: space-around;
			.header {
				// border: 2px solid red;
				width: 95%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 3%;
				padding: 0 5rpx;
				padding-bottom: 0;
				box-sizing: border-box;
				height: 80rpx;
				.topNav {
					// border: 2px solid red;
					width: 445rpx;
					display: flex;
					justify-content: space-between;
					.choosen {
						display: flex;
						justify-content: center;
						align-items: flex-end;
						span {
							font-size: 40rpx;
							position: relative;
						}
						h2::after {
							content: "";
							position: absolute;
							width: 100%;
							height: 28%;
							left: 0;
							bottom: 2px;
							background: #9eb3ff;
							z-index: -1;
							border-radius: 5rpx;
							font-size: 80rpx;
						}
					}
				}
				.setting {
					// border: 2px solid red;
					width: 30px;
					height: 30px;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.body {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 93%;
				background-color: #E9EEFF;
				border-radius: 50rpx 50rpx 0 0rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				.title {
					width: 80%;
					height: 7%;
					border: 2px solid #8891b5;
					border-top: 0;
					border-left: 0;
					border-right: 0;
					display: flex;
					justify-content:center;
					align-items: center;
					margin-bottom: 20rpx;
					span {
						color: #747EA1;
						font-size: 40rpx;
						font-weight: 700;
						font-family: "Novecento wide", "半展开", "粗体";
					}
				}
				.scroll {
					// background-color:red;
					flex-grow: 1;
					box-sizing: border-box;
					overflow: hidden;
					overflow-anchor: false;
					.chat {
						// width: 98%;
						// height: 79%;	
						background-color: #E9EEFF;
						// border: 2px solid red;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: flex-start;
						///////LEFT//////
						.left {
							
							width: 95%;
							// height: 10%;
							// border: 2px solid green;
							margin-bottom: 15rpx;
							display: flex;
							flex-direction: row;
							align-items: flex-start;
							.avatar {
								width: 100rpx;
								height: 100rpx;
								image {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}
							.msg {
								// width: 70%;
								margin-top: 15rpx;
								max-width: 70%;
								// height: 80%;
								background-color: white;
								margin-left: 20rpx;
								box-sizing: border-box;
								padding: 5px 10px;
								border-radius: 20rpx;
								view {
									// width: 96%;
									word-break:break-all;
									word-wrap:break-word;
									// border: 2px solid red;
								}
							}
						}
						//////RIGHT/////
						.right {
							width: 95%;
							// height: 10%;
							// border: 2px solid green;
							margin-bottom: 15rpx;
							display: flex;
							flex-direction: row-reverse;
							align-items: flex-start;
							.avatar {
								width: 100rpx;
								height: 100rpx;
								image {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}
							.msg {
								// width: 70%;
								margin-top: 15rpx;
								max-width: 70%;
								// height: 80%;
								background-color: white;
								margin-right: 20rpx;
								box-sizing: border-box;
								padding: 5px 10px;
								border-radius: 20rpx;
								view {
									// width: 96%;
									word-break:break-all;
									word-wrap:break-word;
									// border: 2px solid red;
								}
							}
						}
					}
				}
				.down {
					width: 100%;
					height: 10%;
					background-color: #DDE4FF;
					display: flex;
					align-items: center;
					justify-content: center;
					.input {
						// border: 2px solid red;
						width: 93%;
						height: 62%;
						display: flex;
						align-items: center;
						input {
							// border: 1px solid green;
							height: 98%;
							width: 73%;
							background-color: white;
							box-sizing: border-box;
							padding: 20rpx;
							border-radius: 10rpx 0 0 10rpx;
						}
						button {
							border: 0px solid green;
							height: 98%;
							width: 27%;
							border-radius: 0 10rpx 10rpx 0;
							background-color: #9EB3FF;
							display: flex;
							justify-content: center;
							align-items: center;
							span {
								color: white;
								font-weight: 700;
								font-size: 32rpx;
							}
						}
					}
				}
			}
		// }
	}
	.loading {
		// border: 2px solid red;
		position: absolute;
		bottom: 5%;
		// width: 50%;
		display: flex;
		flex-direction: row-reverse;
		.loadText {
			margin-left: 25rpx;
		}
		.spinner {
				width: 40rpx;
				height: 40rpx;
				animation: spinner-y0fdc1 2s infinite ease;
				transform-style: preserve-3d;
			}

			.spinner > view {
				background-color: rgba(0,77,255,0.2);
				height: 100%;
				position: absolute;
				width: 100%;
				border: 2px solid #004dff;
			}

			.spinner view:nth-of-type(1) {
			transform: translateZ(-21.5rpx) rotateY(180deg);
			}

			.spinner view:nth-of-type(2) {
			transform: rotateY(-270deg) translateX(50%);
			transform-origin: top right;
			}

			.spinner view:nth-of-type(3) {
			transform: rotateY(270deg) translateX(-50%);
			transform-origin: center left;
			}

			.spinner view:nth-of-type(4) {
			transform: rotateX(90deg) translateY(-50%);
			transform-origin: top center;
			}

			.spinner view:nth-of-type(5) {
			transform: rotateX(-90deg) translateY(50%);
			transform-origin: bottom center;
			}

			.spinner view:nth-of-type(6) {
			transform: translateZ(21.5rpx);
			}

			@keyframes spinner-y0fdc1 {
			0% {
			transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
			}

			50% {
			transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
			}

			100% {
			transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
			}
			}

	}
</style>
