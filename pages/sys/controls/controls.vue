<template>
  <view style="height: 100vh; width: 100vw; position: relative">
    <view class="main" :style="{ height: safeHeight + 'px' }" id="watchBox">
      <view class="header">
        <view class="topNav">
          <view
            class="left"
            :class="choosen === 1 ? 'choosen' : ''"
            @click="choosen = 1"
          >
            <span>
              <h2 v-show="choosen === 1">监控位置</h2>
              <h3 v-show="choosen === 2">监控位置</h3>
            </span>
          </view>
          <view
            class="right"
            :class="choosen === 2 ? 'choosen' : ''"
            @click="choosen = 2"
          >
            <span>
              <h2 v-show="choosen === 2">监控列表</h2>
              <h3 v-show="choosen === 1">监控列表</h3>
            </span>
          </view>
        </view>
        <view class="setting" @tap="jump">
          <image
            src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png"
            mode="aspectFit"
            alt=""
          ></image>
        </view>
      </view>
      <map
        v-show="choosen !== 2"
        style="flex: 1; width: 100%; position: relative"
        :longitude="longitude"
        :latitude="latitude"
        :show-location="isShow"
        id="map1"
        :markers="markers"
      >
        <cover-view class="status" @tap="test">
          <cover-view
            style="
              height: 44rpx;
              margin-left: 20%;
              margin-top: 3%;
              font-weight: bold;
            "
          >
            摄像头总数：{{ total }}
          </cover-view>
          <cover-view style="height: 44rpx; margin-left: 20%; margin-top: 3%">
            正在工作的设备：{{ working }}
          </cover-view>
        </cover-view>
      </map>
      <scroll-view
        scroll-y="true"
        v-show="choosen === 2"
        class="content"
        :style="{ height: scrollHeight + 'px' }"
      >
        <view class="details" v-for="item in warnData" :key="item.id">
          <view class="deviceName">
            {{ item.name }}
          </view>
          <view class="positonAndtime">
            <view class="time"> 摄像头编号：{{ item.number }} </view>
            <view class="time"> 监控区域：{{ item.department }} </view>
            <view class="time"> 区域负责人：{{ item.leader }} </view>
          </view>
          <view class="buttons">
            <view class="button" @click="showEdit = true">
              <image
                src="../../../static/edit.png"
                mode="aspectFit"
                style="height: 22px; width: 22px"
              ></image>
              <span style="color: #6787f9"> 编辑</span> </view
            >｜<view class="button" @click="showDelete = true">
              <image
                :src="
                  !item.running
                    ? '../../../static/shutup.png'
                    : '../../../static/rubbish.png'
                "
                mode="aspectFit"
                style="height: 22px; width: 22px"
              ></image>
              <span :style="{ color: item.running ? '#FF5D5D' : '#6787F9' }">
                {{ item.running ? "停用" : "启用" }}</span
              >
            </view>
          </view>
          <view :class="item.deal === '正在运行' ? 'isDealt' : 'unDealt'">
            <span>{{ item.deal }}</span>
            <view class="img">
              <image
                :src="item.deal === '正在运行' ? dealIcon[0] : dealIcon[1]"
                mode="aspectFit"
                class="image"
              ></image>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <Edit :showEdit="showEdit" @change="changeShow" :warnData="warnData"></Edit>
  </view>
</template>

<script>
import Edit from "./components/edit.vue";
export default {
  components: { Edit },
  data() {
    return {
      showEdit: false,
      safeHeight: 0,
      total: 20,
      working: 19,
      longitude: 0,
      latitude: 0,
      isShow: false,
      showDelete: false,
      choosen: 2,
      scrollHeight: 0,
      markers: [
        {
          id: 1221,
          latitude: 45,
          longitude: 125,
          iconPath: "../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png",
          width: 32,
          height: 32,
          title: "智慧摄像头-1",
          callout: {
            content: "欢迎来到这里", //文本
            color: "#fff", //文本颜色
            fontSize: 12, //文字大小
            borderRadius: 3, //callout边框圆角
            borderWidth: 30, //边框宽度
            borderColor: "", //边框颜色
            bgColor: "#31c27c", //背景色
            padding: 3, //文本边缘留白
            display: "ALWAYS", //'BYCLICK':点击显示; 'ALWAYS':常显
            textAlign: "center", //文本对齐方式。有效值: left, right, center
          },
        },
      ],
      warnData: [
        {
          id: "10086",
          name: "智能摄像头-1",
          deal: "正在运行",
          number: "A104",
          department: "急诊科走廊",
          leader: "沛沛",
          running: true,
          border: [],
          video: "",
        },
        {
          id: "114514",
          name: "智能摄像头-3",
          deal: "停用",
          number: "A102",
          department: "急诊部",
          leader: "潇迪",
          running: false,
          border: [],
          video: "",
        },
        {
          id: "191919",
          name: "智能摄像头-4",
          deal: "正在运行",
          number: "A103",
          department: "精神科",
          leader: "轩轩",
          running: true,
          border: [
            {
              //对应勾选的框框，要有清除框框的接口
              id: "114514",
              width: 128,
              height: 244,
              // 左上角
              leftY: 12,
              leftX: 33,
              // 右下角
              rightY: 140,
              rightX: 277,
            },
            {
              id: "10086",
              width: 118,
              height: 124,
              top: 12,
              left: 33,
              right: 161,
              bottom: 256,
            },
          ],
          video: "",
          img: "", //视频中任意一张即可，用来对应场景的
          ability: [
            {
              value: 100,
              name: "进入危险区",
              checked: true,
              time: 60,
            },
            {
              value: 101,
              name: "烟雾",
              checked: false,
              time: 60,
            },
            {
              value: 102,
              name: "区域停留",
              checked: true,
              time: 60,
            },
            {
              value: 103,
              name: "摔倒",
              checked: false,
              time: 60,
            },
            {
              value: 104,
              name: "明火",
              checked: false,
              time: 60,
            },
            {
              value: 105,
              name: "吸烟",
              checked: true,
              time: 60,
            },
          ], //该摄像头要发挥的功能
        },
        {
          id: "2203",
          name: "智能摄像头-2",
          deal: "停用",
          number: "A101",
          department: "大厅",
          leader: "阿为",
          running: false,
          border: [],
          video: "",
        },
      ],
      dealIcon: [
        "../../../static/20230910-194834.png",
        "../../../static/20230910-194949.png",
      ],
    };
  },
  methods: {
    changeShow() {
      console.log("被触发了");
      this.showEdit = false;
    },
    jump() {
      uni.navigateTo({
        url: "/pages/sys/personal/setting/setting",
      });
    },
    test() {
      console.log("hi");
      this.longitude = 116;
      this.latitude = 39;
    },
  },
  onLoad() {
    this.safeHeight = uni.getWindowInfo().safeArea.height;
    console.log(this.safeHeight);
    const that = this;
    this.$nextTick(() => {
      uni.getLocation({
        success: (res) => {
          that.longitude = res.longitude;
          that.latitude = res.latitude;
          setInterval(() => {
            let $map = uni.createMapContext("map1", that);
            let $appMap = $map.$getAppMap();
            $appMap.showUserLocation(true);
          }, 1000);
        },
      });
    });
    let boxTop = 0;
    let headerHeight = 0;
    let boxHeight = 0;
    this.$nextTick(() => {
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#watchBox")
        .boundingClientRect((data) => {
          console.log("@", data);
          boxTop = data.top;
          boxHeight = data.height;
        })
        .exec();
      query
        .select(".header")
        .boundingClientRect((data) => {
          headerHeight = data.height;
          console.log(data);
          that.scrollHeight = that.safeHeight - headerHeight - 12;
        })
        .exec();
      console.log("hi");
    });
  },
};
</script>

<style lang="scss" scpoed>
.main {
  position: absolute;
  bottom: 0;
  // padding: 16rpx 32rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3%;
    padding: 0 32rpx;
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
  .status {
    width: 80%;
    height: 180rpx;
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translate(-50%);
    border: 3px solid #9eb3ff;
    background-color: #e9eeff;
    border-radius: 20rpx;
    color: #606c97;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    // align-items: center;
  }
  .content {
    padding: 0 16rpx;
    padding-top: 16rpx;
    box-sizing: border-box;
    flex: 1;
    .details {
      width: 100%;
      height: 250rpx;
      background-color: #e9eeff;
      margin-bottom: 20rpx;
      border-radius: 15rpx;
      padding: 18rpx 20rpx;
      box-sizing: border-box;
      position: relative;
      font-weight: bold;
      color: #606c97;
      .deviceName {
        color: #606c97;
        font-size: 36rpx;
        position: absolute;
        top: 18rpx;
        left: 20rpx;
      }
      .positonAndtime {
        position: absolute;
        bottom: 18rpx;
        left: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        .time {
          font-size: 28rpx;
          margin-right: 8rpx;
        }
      }
      .buttons {
        position: absolute;
        display: flex;
        bottom: 18rpx;
        right: 20rpx;
        color: #b5b5b5;
        .button {
          display: flex;
          align-items: center;
          height: 24px;
        }
      }
      .isDealt {
        position: absolute;
        top: 18rpx;
        right: 20rpx;
        color: #06bfa1;
        display: flex;
        align-items: center;
        .img {
          margin-left: 6rpx;
          width: 40rpx;
          height: 40rpx;
          .image {
            height: 100%;
            width: 100%;
          }
        }
      }
      .unDealt {
        position: absolute;
        top: 18rpx;
        right: 20rpx;
        color: #ff5d5d;
        display: flex;
        align-items: center;
        .img {
          margin-left: 6rpx;
          width: 40rpx;
          height: 40rpx;
          .image {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
