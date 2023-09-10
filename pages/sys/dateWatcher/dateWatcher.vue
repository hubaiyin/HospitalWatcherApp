<template>
	<view class="main" :style="{height:safeHeight + 'px'}">
		<view class="inner">	
			<view class="header">
				<view class="topNav">
					<view class="left">
						<span>
							<h2>实时监测</h2>
						</span>
					</view>
					<view class="right">
						<span>
							<h3>历史数据</h3>
						</span>
					</view>
				</view>
				<view class="setting">
					<image src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png" mode="aspectFit" alt=""></image>
				</view>
			</view>
			<view class="body">
				<view class="total">
					<view class="left">
						<span>今日报警数：47</span>
						<span>总报警数：12</span>
						<span>较昨日变化：-15</span>
					</view>
					<view class="right">
						<image src="../../../static/统计.png" mode="aspectFit" alt=""></image>
					</view>
				</view>		 
				<view class="chart"></view>
				<view class="category">
					<view class="dangerArea"></view>
					<view class="fog"></view>
					<view class="standArea"></view>
					<view class="fall"></view>
					<view class="fire"></view>
					<view class="smoke"></view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safeHeight:0,
			};
		},
		onLoad(){
			this.safeHeight = uni.getWindowInfo().safeArea.height;
			console.log(this.safeHeight);		
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
		justify-content: center;
		.inner {
			width: 95%;
			// border: 2px solid blue;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
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
							font-size:  40rpx;
							position: relative;
						}
						h2::after {
							content: '';
							position: absolute;
							width: 100%;
							height: 28%;
							left: 0;
							bottom: 2px;
							background: #9EB3FF;
							z-index: -1;
							border-radius: 5rpx;
						}
					}
					.right {
						// border: 2px solid pink;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						span {
							font-size: 38rpx;
						}
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
				.total {
					// background-color: #7BBAF5;
					background-image: linear-gradient(to right, #4D87EF , #99DCF9);
					width: 99%;
					height: 16%;
					border-radius: 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					.left {
						// border: 2px solid red;
						width: 50%;
						height: 80%;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: space-around;
						span {
							color: white;
							font-weight: 600;
							font-size: 15px;
						}	
					}
					.right {
						// border: 2px solid red;
						width: 100rpx;
						height: 100rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.chart {
					background-color: #E1EDF6;
					width: 99%;
					height: 27%;
					border-radius: 15rpx;
				}
				.category {
					width: 99%;
					height: 51%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					// border: 2px solid purple; 
					.dangerArea,.fog,.standArea,.fire,.fall,.smoke {
						width: 48%;
						height: 31%;
						border-radius: 15rpx;
					}
					.dangerArea {
						background-color: #D6F6DB;
					}					
					.fog {
						background-color: #F5F6CC;
					}					
					.standArea {
						background-color: #DBFDF7;
					}					
					.fall {
						background-color: #ffe3c2;
					}					
					.fire {
						background-color: #E7E3FE;
					}					
					.smoke {
						background-color: #FFD9D9;
					}					
				}
			}
		}
	}
</style>
