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
        @tap="showDetail = false"
        @markertap="showMarker"
      >
        <cover-view class="status" @tap="test">
          <cover-view
            style="height: 40px; line-height: 40px; margin-bottom: 5px"
          >
            摄像头总数：{{ total }}
          </cover-view>
          <cover-view style="height: 40px; line-height: 40px">
            正在工作的设备：{{ working }}
          </cover-view>
        </cover-view>
        <cover-view class="detail" v-if="showDetail">
          <cover-view class="left">
            {{ markersDetail[index].name }}
          </cover-view>
          <cover-view class="right">
            <cover-view style="line-height: 20px"
              >监测到危险情况数量：{{
                markersDetail[index].alarmCnt
              }}</cover-view
            >
            <cover-view style="line-height: 20px"
              >监测区域：{{ markersDetail[index].area }}</cover-view
            >
            <cover-view style="line-height: 20px"
              >负责人：{{ markersDetail[index].leader }}</cover-view
            >
          </cover-view>
        </cover-view>
      </map>
      <scroll-view
        scroll-y="true"
        v-show="choosen === 2"
        class="content"
        :style="{ height: scrollHeight + 'px' }"
      >
        <view class="details" v-for="(item, index) in warnData" :key="item.id">
          <view class="deviceName">
            {{ item.name }}
          </view>
          <view class="positonAndtime">
            <view class="time"> 摄像头编号：{{ item.number }} </view>
            <view class="time"> 监控区域：{{ item.department }} </view>
            <view class="time"> 区域负责人：{{ item.leader }} </view>
          </view>
          <view class="buttons">
            <view class="button" @click="edit(index)">
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
    <Edit
      :showEdit="showEdit"
      @change="changeShow"
      :warnData="warnData[index]"
      :monitorData="markersDetail[index]"
      v-if="showEdit"
    ></Edit>
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
      total: 0,
      working: 0,
      longitude: 0,
      latitude: 0,
      isShow: false,
      showDetail: false,
      index: 0,
      showDelete: false,
      choosen: 2,
      scrollHeight: 0,
      index: 0,
      markers: [],
      warnData: [],
      markersDetail: [],
      dealIcon: [
        "../../../static/20230910-194834.png",
        "../../../static/20230910-194949.png",
      ],
    };
  },
  methods: {
    async changeShow() {
      console.log("被触发了");
      await this.getMonitor();
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
    edit(index) {
      this.index = index;
      this.showEdit = true;
    },
    async getMonitor() {
      await uni.$http.get("/api/v1/monitor").then(({ data }) => {
        this.warnData = data.data;
      });
    },
    async getMap() {
      await uni.$http.get("/api/v1/monitor/map").then(({ data }) => {
        const datas = data.data;
        console.log(datas);
        this.total = datas.total;
        this.working = datas.running;
        this.markersDetail = datas.monitorPosList;
        const markers = [];
        datas.monitorPosList.map((item) => {
          markers.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath:
              "../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png",
            width: 32,
            height: 32,
            title: item.name,
          });
        });
        this.markers = markers;
      });
    },
    showMarker(e) {
      const id = e.detail.markerId;
      console.log(id);
      this.index = this.markersDetail.findIndex((item) => {
        return item.id === id;
      });
      this.showDetail = true;
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
    this.getMonitor();
    this.getMap();
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
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translate(-50%);
    border: 3px solid #9eb3ff;
    background-color: #e9eeff;
    border-radius: 20rpx;
    color: #606c97;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    // align-items: center;
  }
  .detail {
    margin: 0;
    padding: 0;
    height: 82px;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translate(-50%);
    color: #fff;
    .left {
      width: 48%;
      font-size: 18px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .right {
      width: 50%;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      color: #fff;
    }
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
