<template>
	<view style="height: 100vh;width: 100vw; position: relative;background-color: #7DB6FF;">
		<view class="setBox" :style="{height:safeHeight+'px'}">
			<view class="backImg">
				<view class="title">
					<view class="backing" @click="back">
					  <image
					    src="../../../../static/left-double-arrow.png"
					    mode="aspectFit"
					    alt=""
					  ></image>
					</view>
					<h3>个人信息</h3>
				</view>
			  <image
			    src="../../../../static/d53eb072-3395-4bc6-9dd1-41b32cc61095.png"
			    mode=""
			    style="width: 100vw"
			  ></image>
			</view>
			<view class="content">
				<view class="command">
					<view class="items">
						<view class="left">
							<view class="text">
								手机号
							</view>
							<input v-model="phoneNumber" :disabled="true" type="text" style="font-weight: bold; width: 50%;">
						</view>
						<view class="img" @tap="showAlert = true">
							<image src="../../../../static/edit-none.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="items">
						<view class="left">
							<view class="text">
								用户名
							</view>
							<input v-model="userName" type="text" style="font-weight: bold; width: 50%;" :focus="focus">
						</view>
						<view class="img" @click="showInput">
							<image src="../../../../static/edit-none.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="items">
						<view class="left">
							<view class="text">
								密码
							</view>
							<input v-model="password" :disabled="true" type="password" style="font-weight: bold; width: 50%;">
						</view>
						<view class="img" @tap="showChangePassword=true">
							<image src="../../../../static/edit-none.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="items">
						<view class="left">
							<view class="text">
								性别
							</view>
							<input v-model="sex" :disabled="true" type="safe-password" style="font-weight: bold; width: 50%;">
						</view>
							<view class="img" @tap="showSex = true">
								<image src="../../../../static/edit-none.png" mode="aspectFit"></image>
							</view>
					</view>
					<view class="button">
						确认
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="showAlert" title="请联系管理员进行修改" content="为了安全性考虑,若对您造成不便我们深感抱歉" @confirm="showAlert=false"></u-modal>
		<u-modal :show="showChangePassword" title="修改密码" @confirm="showChangePassword=false" :showCancelButton="true" @cancel="showChangePassword=false">
			<view class="">
				<view class="change">
					<view class="text">
						旧密码
					</view>
					<u-input v-model="oldPassword" type="password" style="font-weight: bold; width: 78%;" placeholder="请输入旧密码"></u-input>
				</view>
				<view class="change">
					<view class="text">
						新密码
					</view>
					<u-input v-model="newPassword" type="password" style="font-weight: bold; width: 78%;" placeholder="请输入新密码"></u-input>
				</view>
			</view>
		</u-modal>
		<u-picker :show="showSex" :columns="columns" @confirm="showSex = false" @cancel="showSex=false"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safeHeight:0,
				phoneNumber:'18108074809',
				sex:'男',
				password:'114514',
				userName:'Awayer',
				showAlert:false,
				showChangePassword:false,
				showSex:false,
				columns:[['男','女']],
				oldPassword:'',
				newPassword:'',
				focus:false
			};
		},
		onLoad(){
			this.safeHeight = uni.getWindowInfo().safeArea.height;
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			showInput(){
			        this.focus = true;
			        // 获取软键盘的高度
			        uni.onKeyboardHeightChange(res => {
			          console.log(res.height);
			          if(res.height === 0){
			              this.focus = false;
			          }
			        })
			      },
		}
	}
</script>

<style lang="scss" scoped>
.setBox{
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
			justify-content: flex-start;
			width: 100%;
			padding: 26rpx 36rpx;
			box-sizing: border-box;
			.backing {
			  width: 32px;
			  height: 32px;
			  margin-right: 12rpx;
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
		// padding-bottom: 160rpx;
		border-radius: 15rpx;
		background: #DCEAFF;
		position: absolute;
		top: 28%;
		left: 50%;
		transform: translate(-50%);
	.command{
		width: 100%;
		.items{
			background: #fff;
			height: 106rpx;
			width: 100%;
			margin-top: 32rpx;
			border-radius: 18rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			box-sizing: border-box;
			.left{
				display: flex;
				align-items: center;
			}
			.img{
				height: 46rpx;
				width: 46rpx;
				image{
					height: 100%;
					width: 100%;
				}
			}
			.text{
				margin-left: 16rpx;
				color: #8496B0;
				font-weight: bold;
				font-size: 34rpx;
				display: flex;
				align-items: center;
				width: 30%;
			}
		}
		.button{
			background: #ACCDFF;
			height: 114rpx;
			width: 100%;
			margin-top: 32rpx;
			border-radius: 18rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 24rpx;
			box-sizing: border-box;
			font-size: 42rpx;
			font-weight: bold;
			color: #6E8DBB;
		}
	}
	}
	
}
.change{
		height: 94rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 22rpx;
		.text{
			margin-left: 16rpx;
			// color: #8496B0;
			font-weight: bold;
			font-size: 34rpx;
			display: flex;
			align-items: center;
			width: 20%;
			margin-right: 12rpx;
		}
	}
</style>
