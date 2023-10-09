<template>
  <view class="main" :style="{ height: safeHeight + 'px' }">
    <view class="inner" v-if="isShow">
      <view class="header">
        <view class="topNav">
          <view
            class="left"
            :class="choosen === 1 ? 'choosen' : ''"
            @click="chooseOne()"
          >
            <span>
              <h2 v-show="choosen === 1">数据总览</h2>
              <h3 v-show="choosen === 2">数据总览</h3>
            </span>
          </view>
          <view
            class="right"
            :class="choosen === 2 ? 'choosen' : ''"
            @click="chooseTwo()"
          >
            <span>
              <h2 v-show="choosen === 2">历史数据</h2>
              <h3 v-show="choosen === 1">历史数据</h3>
            </span>
          </view>
        </view>
        <view class="setting" @click="jump">
          <image
            src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png"
            mode="aspectFit"
            alt=""
          ></image>
        </view>
      </view>
      <real-time v-if="!(choosen - 1)"></real-time>
      <history-data v-if="choosen - 1"></history-data>
    </view>
  </view>
</template>

<script>
import realTime from "./realTime.vue";
import historyData from "./historyData.vue";
export default {
  components: { realTime, historyData },
  data() {
    return {
      safeHeight: 0,
      selected: false,
      choosen: 1,
	  isShow:true,
    };
  },
  onLoad() {
    this.safeHeight = uni.getWindowInfo().safeArea.height;
    // console.log(this.safeHeight);
  },
  onShow(){
	  this.isShow = true
  },
  onHide(){
	  this.isShow = false
  },
  methods: {
    chooseOne() {
      this.choosen = 1;
      this.$forceUpdate();
    },
    chooseTwo() {
      this.choosen = 2;
      this.$forceUpdate();
    },
    jump() {
      uni.navigateTo({
        url: "/pages/sys/personal/setting/setting",
      });
    },
  },
};
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
    // border: 2px solid blue;
    width: 95%;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
  }
  .header {
    // border: 2px solid red;
    width: 100%;
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
      .left {
        // border: 2px solid pink;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        span {
          font-size: 38rpx;
        }
      }
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
      width: 30px;
      height: 30px;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
