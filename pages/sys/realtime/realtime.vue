<template>
	<view style="height: 100vh;width: 100vw;position: relative;">
		<view :style="{height:safeAreaTop+'px'}" class="warnBox">
			<view class="title">
				<h2>报警事件列表</h2>
				<view class="icon">
					<image src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png" mode="aspectFit" class="img"></image>
				</view>
			</view>
			<view class="search">
				<view class="iconBox">
				  <image
				    src="../../../static/169f89a4-60bc-4983-bef6-6a34b21b3e39.png"
				    mode="aspectFit"
				    class="icon"
				  ></image>
				</view>
				<input class="input" type="text" placeholder="精神科室 摔倒..." />
				<button class="btn">搜索</button>
			</view>
			<view class="options">
				<view class="selector" @tap="showFilter = true">
					<view class="icon">
						<image src="../../../static/7d163ad9-885d-47cb-a29e-043e5a9933ac.png" mode="aspectFit" class="img"></image>
					</view>
					<u-picker :show="showFilter" :columns="filters" class="select" @confirm="setFilter" @cancel="showFilter=false"></u-picker>
				</view>
				<view class="selector" @tap="showStatus = true">
					<view class="icon">
						<image src="../../../static/5de7d537-e96d-4269-ad0a-684f3443643d.png" mode="aspectFit" class="img"></image>
					</view>
					<u-picker :show="showStatus" :columns="status" class="select" @confirm="setStatus" @cancel="showStatus=false"></u-picker>
				</view>
				<view class="selector" @tap="show=true" >
					<view class="icon">
						<image src="../../../static/563aa794-f528-4ab0-8b23-4e3aff0adf48.png" mode="aspectFit" class="img"></image>
					</view>
					<u-datetime-picker class="date"
					:show="show"
					v-model="time"
					mode="datetime"
					@confirm="setTime" @cancel="show=false"
					:closeOnClickOverlay="true"
					>
					</u-datetime-picker>
					<view class="timeText">
						{{ formatTime }}
					</view>
				</view>
				<view class="icon">
					<image src="../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png" mode="aspectFit" class="img"></image>
				</view>
			</view>
			<view class="content">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safeAreaTop:0,
				show:false,
				time:Number(new Date()),
				formatTime : '',
				showFilter:false,
				showStatus:false,
				status:[
                    ['中国', '美国', '日本']
                ],
				filters:[
                    ['中国', '美国', '日本']
                ],
			};
		},
		onLoad() {
			console.log(uni.getWindowInfo().safeArea)
			this.safeAreaTop = uni.getWindowInfo().safeArea.height;
			const timeFormat = uni.$u.timeFormat;
			this.formatTime = timeFormat(this.time,'yyyy-mm-dd hh:MM');
		},
		methods:{
			setTime(e){
				const timeFormat = uni.$u.timeFormat
				this.show=false
				this.time  = e.value
				this.formatTime = timeFormat(e.value, 'yyyy-mm-dd hh:MM')
				console.log(this.formatTime)
			},
			setFilter(e){
				this.showFilter = false;
			},
			setStatus(e){
				this.showStatus = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.warnBox{
	position: absolute;
	bottom: 0;
	padding: 16rpx 32rpx;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	.title{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-bottom: 1px solid red;
		h2{
			position: relative;
		}
		h2::after{
			content: '';
			position: absolute;
			width: 100%;
			height: 30%;
			bottom: 2px;
			left: 0;
			background: #9EB3FF;
			z-index: -1;
		}
		.icon{
			// background: #000;
			height: 30px;
			width: 30px;
			.img{
				height: 100%;
				width: 100%;
			}
			
		}
	}
	.search{
		border: 1px solid #ebebeb;
		display: flex;
		border-radius: 15rpx;
		.iconBox {
		  height: 80rpx;
		  width: 80rpx;
		  border-radius: 15rpx 0 0 15rpx;
		  background-color: #fff;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  .icon {
		    height: 50%;
		    width: 50%;
		  }
		}
		.input {
		  width: 420rpx;
		  height: 80rpx;
		  background-color: #fff;
		  border-radius: 0 15rpx 15rpx 0;
		  box-sizing: border-box;
		  padding: 16rpx;
		}
		.btn {
		  flex: 1;
		  height: 80rpx;
		  background-color: #9EB3FF;
		  color: #e9e7fd;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-radius: 0 15rpx 15rpx 0;
		}
	}
	.options{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.selector{
			border-radius: 12rpx;
			position: relative;
			width: 30%;
			border: 1px solid #eaeaea;
			box-sizing: border-box;
			height: 70rpx;
			padding: 12rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.select{
				background-color: #fff;
				border: none;
				padding: 0;
				margin: 0;
				height: 100%;
				flex: 1;
			}
			.icon{
				width: 32rpx;
				height: 32rpx;
				display: flex;
				align-items: center;
				.img{
					height: 100%;
					width: 100%;
				}
			}
			.date{
				flex: 1;
				height: 100%;
				// background: #000;
			}
			.timeText{
				font-size: 19rpx;
				position: absolute;
				right: 4%;
				color: #b5b5b5;
			}
		}
		.icon{
			width: 40rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			.img{
				
				height: 100%;
				width: 100%;
			}
		}
	}
}
</style>
