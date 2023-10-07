<template>
	<view style="width: 100vw;height: 100vh;" class="img">
		<image
		  src="../../../static/startBack.png"
		  mode="aspectFit"
		></image>
		<!-- <view class="text">
			医患智警
		</view>
		<view class="mainTitle">
			基于YOLOv8的医院危险事件智能警报系统
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
@font-face{
	font-family: YSBTH;
	src: url(../../../static/fonts/YouSheBiaoTiHei-2.ttf);
}
.img{
	position: relative;
	image{
		height: 100%;
		width: 100%;
	}
	.text{
		writing-mode: vertical-lr;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-54%);
		color: #6C84C3;
		font-size: 146rpx;
		// font-weight: bold;
		letter-spacing: 10rpx;
		font-family: YSBTH;
	}
	.mainTitle{
		color: #A8BAEA;
		font-size: 28rpx;
		position: absolute;
		// height: 60rpx;
		// padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: YSBTH;
		width: 250px;
		left: 50%;
		transform: translateX(-50%);
		bottom: 4.5%;
	}
}
</style>
