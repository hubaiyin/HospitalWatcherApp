<template>
	<view class="main" :style="{height:safeHeight + 'px'}">	
		<view class="inner">
			<view class="header">
				<view class="topNav">
					<view class="left">
						<span >
							<h3 @tap="jump()">实时监测</h3>
						</span>
					</view>
					<view class="right">
						<span @tap="jump()">
							<h3>历史数据</h3>
						</span>
					</view>
				</view>
				<view class="setting">
					<image src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png" mode="aspectFit" alt=""></image>
				</view>
			</view>
			<real-time v-show="!selected"></real-time>
			<history-data v-show="selected"></history-data>
		</view>
	</view>
</template>

<script>
	import realTime from './realTime.vue';
	import historyData from './historyData.vue';
	export default {
		components:{ realTime , historyData },
		data() {
			return {
				safeHeight:0,
				selected:false,
			};
		},
		onLoad(){
			this.safeHeight = uni.getWindowInfo().safeArea.height;
			console.log(this.safeHeight);		
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		// border: 2px solid red;
		width: 100%;
		margin: 0 auto;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
		.inner {
			width: 95%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.header {
			// border: 2px solid green;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			// height: 10%;
			.topNav {
				// border: 2px solid red;
				width: 445rpx;
				display: flex;
				justify-content: space-between;
				.left {
					// border: 2px solid pink;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					span {
						font-size: 38rpx;
					}
				}
				.right {
					// border: 2px solid pink;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					span {
						font-size:  38rpx;
						position: relative;
					}
					// h2::after {
					// 	content: '';
					// 	position: absolute;
					// 	width: 100%;
					// 	height: 28%;
					// 	left: 0;
					// 	bottom: 2px;
					// 	background: #9EB3FF;
					// 	z-index: -1;
					// 	border-radius: 5rpx;
					// }
				}
			}
			.setting {
				// border: 2px solid red;
				width: 65rpx;
				height: 65rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.body {
			height: 90%;
			// border: 2px solid green;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}
	}
</style>
