<template>
  <view class="body">
    <view class="total">
      <view class="left">
        <span>今日报警数：{{ upTotal.todayNew }}</span>
        <span>总报警数：{{ upTotal.total }}</span>
        <span>较昨日变化：{{ upTotal.dayChange }}</span>
      </view>
      <view class="right">
        <image
          src="../../../static/analysis.png"
          mode="aspectFit"
          alt=""
        ></image>
      </view>
    </view>
    <view class="chart">
      <ring-chart></ring-chart>
    </view>
    <view class="category">
      <!--  -->
      <view class="dangerArea">
        <view class="title">
          <view class="icon">
            <image src="../../../static//alarm.png" mode="aspectFit"></image>
          </view>
          <view class="titleText">禁区</view>
        </view>
        <view class="text">
          <span
            >总事件数：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "禁区";
                })
              ].total
            }}</span
          >
          <span
            >今日新增：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "禁区";
                })
              ].todayNew
            }}</span
          >
        </view>
      </view>
      <!--  -->
      <view class="fog">
        <view class="title">
          <view class="icon">
            <image src="../../../static/fog.png" mode="aspectFit"></image>
          </view>
          <div class="titleText">打拳</div>
        </view>
        <view class="text">
          <span
            >总事件数：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "打拳";
                })
              ].total
            }}</span
          >
          <span
            >今日新增：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "打拳";
                })
              ].todayNew
            }}</span
          >
        </view>
      </view>
      <!--  -->
      <view class="standArea">
        <view class="title">
          <view class="icon">
            <image src="../../../static/fuck.png" mode="aspectFit"></image>
          </view>
          <div class="titleText">挥手</div>
        </view>
        <view class="text">
          <span
            >总事件数：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "挥手";
                })
              ].total
            }}</span
          >
          <span
            >今日新增：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "挥手";
                })
              ].todayNew
            }}</span
          >
        </view>
      </view>
      <!--  -->
      <view class="fall">
        <view class="title">
          <view class="icon">
            <image src="../../../static/fall.png" mode="aspectFit"></image>
          </view>
          <div class="titleText">摔倒</div>
        </view>
        <view class="text">
          <span
            >总事件数：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "摔倒";
                })
              ].total
            }}</span
          >
          <span
            >今日新增：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "摔倒";
                })
              ].todayNew
            }}</span
          >
        </view>
      </view>
      <!--  -->
      <view class="fire">
        <view class="title">
          <view class="icon">
            <image src="../../../static/fire.png"></image>
          </view>
          <div class="titleText">明火</div>
        </view>
        <view class="text">
          <span
            >总事件数：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "明火";
                })
              ].total
            }}</span
          >
          <span
            >今日新增：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "明火";
                })
              ].todayNew
            }}</span
          >
        </view>
      </view>
      <!--  -->
      <view class="smoke">
        <view class="title">
          <view class="icon">
            <image src="../../../static/smoke.png"></image>
          </view>
          <div class="titleText">吸烟</div>
        </view>
        <view class="text">
          <span
            >总事件数：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "吸烟";
                })
              ].total
            }}</span
          >
          <span
            >今日新增：{{
              caseList[
                caseList.findIndex((item) => {
                  return item.caseTypeName === "吸烟";
                })
              ].todayNew
            }}</span
          >
        </view>
      </view>
      <!--  -->
    </view>
  </view>
</template>

<script>
import ringChart from "../../../components/ringChart.vue";
export default {
  components: { ringChart },
  data() {
    return {
      upTotal: {},
      safeHeight: 0,
      caseList: [
        { todayNew: null, total: null },
        { todayNew: null, total: null },
        { todayNew: null, total: null },
        { todayNew: null, total: null },
        { todayNew: null, total: null },
      ],
    };
  },
  methods: {
    getInfo() {
      uni.$http.get("/api/v1/alarm/realtime").then((res) => {
        if (res.data.code === "D0400") {
          uni.showToast({
            title: "登录失效，请重新登录！",
            duration: 1500,
            icon: "none",
          });
          uni.removeStorage({
            key: "token",
            success: () => {
              uni.reLaunch({
                url: "/pages/sys/login/index",
              });
            },
          });
        }
        if (res.data.code != "00000") {
          uni.showToast({
            title: "数据加载失败！",
            duration: 1500,
            icon: "none",
          });
        }
        if (res.data.code === "00000") {
          this.upTotal = res.data.data.alarmTotal;
          this.caseList = res.data.data.alarmCaseTypeTotalList;
        }
      });
    },
  },
  mounted() {
    this.getInfo();
  },
  onShow() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.body {
  height: 95%;
  // border: 2px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  // margin-bottom: 20rpx;
  .total {
    // background-color: #7BBAF5;
    background-image: linear-gradient(to right, #4d87ef, #99dcf9);
    width: 99%;
    height: 16%;
    border-radius: 15rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left {
      // border: 2px solid red;
      width: 70%;
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
    // border: 2px solid red;
    background-color: #e1edf6;
    width: 99%;
    height: 28%;
    // height: 400rpx;
    border-radius: 15rpx;
  }
  .category {
    width: 99%;
    height: 51%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // border: 2px solid purple;
    .dangerArea,
    .fog,
    .standArea,
    .fire,
    .fall,
    .smoke {
      width: 48%;
      height: 31%;
      border-radius: 15rpx;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: flex-start;
      .title {
        margin-left: 5%;
        margin-top: 15rpx;
        margin-bottom: 10rpx;
        // border: 2px solid red;
        width: 80%;
        height: 45%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
          // border: 2px solid blue;
          width: 31%;
          height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 15rpx;
          image {
            width: 80%;
            height: 80%;
          }
        }
        .titleText {
          // border: 2px solid green;
          margin-left: 20rpx;
          width: 65%;
          font-size: 37rpx;
          font-weight: 700;
        }
      }
      .text {
        margin-left: 5%;
        // border: 2px solid red;
        width: 80%;
        // height: 45%;
        display: flex;
        flex-direction: column;
        // justify-content: flex-end;
        span {
          font-size: 30rpx;
          font-weight: 700;
        }
      }
    }
    .dangerArea {
      background-color: #d6f6db;
      .titleText {
        color: #42a852;
      }
    }
    .fog {
      background-color: #f5f6cc;
      .titleText {
        color: #a89f42;
      }
    }
    .standArea {
      background-color: #dbfdf7;
      .titleText {
        color: #1db095;
      }
    }
    .fall {
      background-color: #ffe3c2;
      .titleText {
        color: #d79547;
      }
    }
    .fire {
      background-color: #e7e3fe;
      .titleText {
        color: #9c8eee;
      }
    }
    .smoke {
      background-color: #ffd9d9;
      .titleText {
        color: #c47a7a;
      }
    }
  }
}
</style>
