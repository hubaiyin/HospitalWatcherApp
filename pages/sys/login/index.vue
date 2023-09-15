<template>
  <view class="loginBox">
    <view class="img">
      <image
        src="../../../static/logBack.jpeg"
        mode=""
        style="width: 100vw"
      ></image>
    </view>
    <view class="login">
      <text class="title">医患智警</text>
	  <view class="mainTitle">
	  	基于YOLOv8的医院危险事件智能警报系统
	  </view>
      <view class="logContent">
        <text class="title">LOGIN</text>
        <view class="log">
          <view class="iconBox">
            <image
              src="../../../static/phone.png"
              mode="aspectFit"
              class="icon"
            ></image>
          </view>
          <input class="input" type="text" placeholder="请输入手机号" />
        </view>
        <view class="log">
          <view class="iconBox">
            <image
              src="../../../static/lock-blue.png"
              mode="aspectFit"
              class="icon"
            ></image>
          </view>
          <input class="input" password type="text" placeholder="请输入密码" />
        </view>
        <view class="log" >
          <button class="btn" style="color: #fff;" @tap="jump">登录</button>
        </view>
        <view class="log">
          <view>
            <checkbox style="transform: scale(0.6)" /><text
              class="deal"
              >登录即代表您已阅读并同意<span @tap="changeShow">用户协议</span>与<span@tap="changeShow"
                >隐私政策</span
              ></text
            >
          </view>
        </view>
      </view>
      <view class="more">
        <view class="text">
          <view class="line"> </view>
          <view class="word"> DEVELOPED BY UNIAPP AND YOLOV8 </view>
          <view class="line"> </view>
        </view>
      </view>
    </view>
    <u-modal
      :show="isShow"
      :closeOnClickOverlay="true"
      @close="isShow = false"
      @confirm="isShow = false"
    >
      <scroll-view scroll-y="true" style="height: 400px">
        <view>
          <h3>用户协议</h3>
          <br />
          <p>
            欢迎使用我们的服务！在使用本应用程序之前，请仔细阅读以下用户协议。<br />用户协议规定了您与我们之间的权利和责任。通过使用本应用程序，即表示您同意遵守以下条款和条件。
          </p>
          <br />
          <!-- <br> -->
          <h4>1. 服务接受与使用</h4>
          <br />
          <p>
            1.1
            您确认并同意，您仅在合法、合规的目的下使用本应用程序，并遵守适用的法律法规。
          </p>
          <br />
          <p>
            1.2
            您应确保所提供的个人信息和数据的准确性和完整性，并对您提供的信息和数据的安全负责。
          </p>
          <br />
          <p>
            1.3
            您不得使用本应用程序进行任何违法、欺诈、侵权、虚假、威胁、骚扰、诽谤、淫秽、攻击性或其他不当行为。
          </p>
          <br />
          <h4>2. 知识产权</h4>
          <br />
          <p>
            2.1
            本应用程序及其相关内容（包括但不限于文字、图像、音频、视频、标识、商标、服务标识等）的知识产权归属于我们或相关权利人所有。
          </p>
          <br />
          <p>
            2.2
            未经我们或相关权利人明确授权，您不得复制、修改、传播、展示、使用或以其他方式侵犯知识产权的行为。
          </p>
          <br />
          <h4>3. 隐私保护</h4>
          <br />
          <p>
            3.1 我们将按照隐私政策的规定收集、使用、存储和保护您的个人信息。
          </p>
          <br />
          <p>
            3.2
            您理解并同意，为了提供更好的服务，我们可能会与第三方共享您的个人信息，但我们将采取合理的措施保护您的个人信息的安全和保密性。
          </p>
          <br />
          <h4>4. 免责声明</h4>
          <br />
          <p>
            4.1
            您理解并同意，您使用本应用程序的风险由您自行承担。本应用程序提供的服务仅按照现有技术和条件提供，不对服务的及时性、安全性、准确性做出任何明示或暗示的保证。
          </p>
          <br />
          <p>
            4.2
            您理解并同意，我们不对由于以下原因导致的任何直接或间接损失承担责任：网络故障、计算机病毒、黑客攻击、系统不稳定、第三方服务故障等。
          </p>
          <br />
          <h4>5. 终止与修改</h4>
          <br />
          <p>
            5.1
            我们有权根据实际情况，在任何时候终止或修改本应用程序的部分或全部功能。
          </p>
          <br />
          <p>
            5.2
            如您违反本用户协议的任何条款，我们有权立即终止您使用本应用程序的权利。
          </p>
          <br />
          <h4>6. 其他条款</h4>
          <br />
          <p>6.1 本用户协议适用中华人民共和国的法律。</p>
          <br />
          <p>
            6.2
            如本用户协议的任何条款被认定为无效或不可执行，不影响其他条款的有效性。
          </p>
          <br />
          <p>
            6.3
            本用户协议构成您与我们之间的完整协议，取代您与我们之间的任何其他口头或书面协议。
          </p>
          <br />
          <p>
            请在使用本应用程序之前仔细阅读并理解以上用户协议。如您对协议内容有任何疑问，请与我们联系。感谢您的合作和支持！
          </p>
        </view>
      </scroll-view>
    </u-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      which: 0,
    };
  },
  methods: {
    changeShow(number) {
      console.log(this.isShow);
      this.isShow = true;
    },
	jump(){
		console.log('jump')
		uni.switchTab({
			url:"/pages/sys/home/home"
		})
	}
  },
};
</script>

<style lang="scss" scoped>
.loginBox {
  height: 100vh;
  width: 100vw;
  position: relative;
  .login {
    box-sizing: border-box;
    padding: 82rpx;
    background: #fff;
    position: absolute;
    height: 78vh;
    width: 100%;
    bottom: 0;
    border-radius: 80rpx 80rpx 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      color: #6C84C3;
      font-size: 72rpx;
	  font-weight: bold;
	  letter-spacing: 8rpx;
    }
	.mainTitle{
		margin-top: 16rpx;
		color: #A8BAEA;
		font-size: 28rpx;
		border-top: 1.5px solid #A8BAEA;
		height: 60rpx;
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
	}
    .logContent {
      margin-top: 80rpx;
      height: 580rpx;
      width: 665rpx;
      background-color: #D8E3FF;
      border-radius: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
	  .title {
	    color: #5672B9;
	    font-size: 82rpx;
	    font-family: "Novecento wide", "半展开", "粗体";
	  }
      .log {
        display: flex;
        .iconBox {
          height: 90rpx;
          width: 80rpx;
          border-radius: 15rpx 0 0 15rpx;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            height: 60%;
            width: 60%;
          }
        }
        .input {
          width: 500rpx;
          height: 90rpx;
          background-color: #fff;
          border-radius: 0 15rpx 15rpx 0;
          box-sizing: border-box;
          padding: 16rpx;
        }
        .btn {
          width: 580rpx;
          height: 90rpx;
          background-color: #7B9AEA;
        }
        .deal {
          font-size: 24rpx;
		  font-weight: bold;
          span {
            color: #5672B9;
            font-style: italic;
          }
        }
      }
    }
    .more {
      position: absolute;
      bottom: 52rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .text {
        width: 665rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25rpx;
        font-weight: 800;
		color: #d7d7d7;
        // flex-direction: row;
        padding: 22rpx;
        box-sizing: border-box;
        .line {
          height: 0.5px;
          width: 12%;
          border: 0.5px solid #d7d7d7;
        }
        .word {
          padding: 0 10rpx;
          font-size: 26rpx;
          color: #d7d7d7;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  font-weight: "Novecento wide", "半展开", "粗体";
        }
		span{
			color: #000;
		}
      }
      .other {
        width: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .logo {
          width: 94rpx;
          height: 94rpx;
        }
      }
    }
  }
}
</style>