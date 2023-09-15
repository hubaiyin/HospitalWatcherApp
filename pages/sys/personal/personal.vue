<template>
	<view style="height: 100vh;width: 100vw; position: relative;background-color: #7DB6FF;">
		<view class="mainBox" :style="{height:safeHeight+'px'}">
			<view class="backImg">
				<view class="title">
					<h2>个人中心</h2>
				</view>
			  <image
			    src="../../../static/d53eb072-3395-4bc6-9dd1-41b32cc61095.png"
			    mode=""
			    style="width: 100vw"
			  ></image>
			</view>
			<view class="content">
				<view class="inform">
					<view class="avatar">
						<image src="../../../static/96@J%D{CDI3BJ~UV46U)SWG.png" mode="aspectFit"></image>
					</view>
					<view class="user">
						<view class="name">
							Awayer
						</view>
						<view class="phone">
							168****4809
						</view>
					</view>
				</view>
				<view class="command">
					<view class="items" @tap="jump('/pages/sys/personal/setting/setting')">
						<view class="left">
							<view class="img">
								<image src="../../../static/431f6795-3757-42bc-bea2-6bf124b64131.png" mode="aspectFit"></image>
							</view>
							<view class="text">
								前往设置
							</view>
						</view>
						<view class="img">
							<image src="../../../static/arrow-right.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="items" @tap="jump('/pages/sys/personal/edit/edit')">
						<view class="left">
							<view class="img">
								<image src="../../../static/f810fcf9-a1b3-43f2-b2c4-55a7ce72c064.png" mode="aspectFit"></image>
							</view>
							<view class="text">
								修改个人信息
							</view>
						</view>
						<view class="img">
							<image src="../../../static/arrow-right.png" mode="aspectFit"></image>
						</view>
					</view>
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
		},
		methods:{
			jump(url){
				console.log(url);
				uni.navigateTo({
					url:url,
					success(res) {
						console.log(res);
					},
					fail(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mainBox{
	position: absolute;
	width: 100%;
	bottom: 0;
	background-color: #fff;
	.backImg{
		position: absolute;
		.title{
			position: absolute;
			top: 0;
			z-index: 999;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 26rpx 36rpx;
			box-sizing: border-box;
			.setting {
			  width: 34px;
			  height: 34px;
			  image {
			    width: 100%;
			    height: 100%;
			  }
			}
		}
	}
	.content{
		width: 88%;
		box-sizing: border-box;
		padding: 36rpx 28rpx;
		padding-bottom: 160rpx;
		border-radius: 15rpx;
		background: #DCEAFF;
		position: absolute;
		top: 32%;
		left: 50%;
		transform: translate(-50%);
		.inform{
			display: flex;
			justify-content: flex-start;
			align-items:flex-end;
			padding-bottom: 32rpx;
			margin-bottom: 94rpx;
			border-bottom: 1px solid #B2CBF0;
			.avatar{
				background-color: #fff;
				width: 98rpx;
				height: 98rpx;
				border:1.3px solid #6A7990;
				border-radius: 12rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.user{
				margin-left: 18rpx;
				color: #6A7990;
				font-weight: bold;
				.name{
					margin-bottom: 10rpx;
					font-size: 39rpx;
					font-family: "Novecento wide", "半展开", "粗体";
				}
				.phone{
					font-size: 20rpx;
					
				}
			}
		}
		.command{
			width: 100%;
			.items{
				background: #fff;
				height: 106rpx;
				width: 100%;
				margin-top: 48rpx;
				border-radius: 18rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 24rpx;
				box-sizing: border-box;
				.left{
					display: flex;
					width: 80%;
					align-items: center;
					.text{
						margin-left: 16rpx;
						color: #8496B0;
						font-weight: bold;
						font-size: 36rpx;
						display: flex;
						align-items: center;
					}
				}
				.img{
					height: 46rpx;
					width: 46rpx;
					image{
						height: 100%;
						width: 100%;
					}
				}
				
			}
		}
	}
}
</style>
