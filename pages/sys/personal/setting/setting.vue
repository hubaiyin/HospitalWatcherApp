<template>
  <view
    style="
      height: 100vh;
      width: 100vw;
      position: relative;
      background-color: #7db6ff;
    "
  >
    <view class="setBox" :style="{ height: safeHeight + 'px' }">
      <view class="backImg">
        <view class="title">
          <view class="backing" @click="back">
            <image
              src="../../../../static/left-double-arrow.png"
              mode="aspectFit"
              alt=""
            ></image>
          </view>
          <h3>设置</h3>
        </view>
        <image
          src="../../../../static/d53eb072-3395-4bc6-9dd1-41b32cc61095.png"
          mode=""
          style="width: 100vw"
        ></image>
      </view>
      <view class="content">
        <view class="items" @click="showAbout = true">
          <view class="text"> 关于 </view>
          <view class="img">
            <image
              src="../../../../static/warn-none.png"
              mode="aspectFit"
            ></image>
          </view>
        </view>
        <view class="items" @click="clear">
          <view class="text"> 清理缓存 </view>
          <view class="img">
            <image
              src="../../../../static/rubbish-none.png"
              mode="aspectFit"
            ></image>
          </view>
        </view>
        <view class="items" @click="exit">
          <view class="text"> 退出登录 </view>
          <view class="img">
            <image src="../../../../static/exit.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>
      <u-modal
        :show="showAbout"
        :title="title"
        :content="content"
        :closeOnClickOverlay="true"
        @confirm="showAbout = false"
        @close="showAbout = false"
      ></u-modal>
      <u-modal
        :show="showClear"
        title="清理成功"
        :closeOnClickOverlay="true"
        @confirm="showClear = false"
        @close="showClear = false"
      ></u-modal>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      safeHeight: 0,
      showAbout: false,
      showClear: false,
      title: "关于",
      content: "本项目旨在开发一个智能视频监控系统,能够对医院重点区域进行实时监控,使用计算机视觉技术智能分析监控画面,实现对病人跌倒、抽烟等危险情况的预警。一旦检测到危险情况,能够通过 App 推送和网页弹窗等方式向医务人员发出预警,以便采取及时干预措施,防止事态进一步恶化,保障医院安全。",
      timer: null,
    };
  },
  onLoad() {
    this.safeHeight = uni.getWindowInfo().safeArea.height;
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    exit() {
      uni.removeStorage({
        key: "token",
        success: () => {
          uni.reLaunch({
            url: "/pages/sys/login/index",
          });
        },
      });
    },
    clear() {
      uni.showLoading({
      	title:'清理中',
      })
	  setTimeout(()=>{
		  uni.hideLoading();
		  uni.showToast({
		  	icon:'success',
			duration:1000,
			title:'清理完成'
		  })
	  },2000)
    },
  },
};
</script>

<style lang="scss" scoped>
.setBox {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  .backImg {
    position: absolute;
    .title {
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
  .content {
    width: 88%;
    box-sizing: border-box;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    .items {
      background: #dceaff;
      height: 106rpx;
      width: 100%;
      margin-top: 28rpx;
      border-radius: 18rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24rpx;
      box-sizing: border-box;
      .img {
        height: 46rpx;
        width: 46rpx;
        image {
          height: 100%;
          width: 100%;
        }
      }
      .text {
        margin-left: 16rpx;
        color: #8496b0;
        font-weight: bold;
        font-size: 36rpx;
      }
    }
  }
}
</style>
