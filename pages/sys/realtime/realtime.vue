<template>
  <view style="height: 100vh; width: 100vw; position: relative">
    <view :style="{ height: safeAreaTop + 'px' }" class="warnBox" id="warnBox">
      <view class="title">
        <view class="topNav">
          <view
            class="left"
            :class="choosen === 0 ? 'choosen' : ''"
            @click="choosen = 0"
          >
            <span>
              <h2 v-show="choosen === 0">实时警报</h2>
              <h3 v-show="choosen === 1">实时警报</h3>
            </span>
          </view>
          <view
            class="right"
            :class="choosen === 1 ? 'choosen' : ''"
            @click="choosen = 1"
          >
            <span>
              <h2 v-show="choosen === 1">历史事件</h2>
              <h3 v-show="choosen === 0">历史事件</h3>
            </span>
          </view>
        </view>
        <view class="icon" @tap="jump">
          <image
            src="../../../static/edb8e6b3-f7e0-4778-bdc4-691d6e4f1511.png"
            mode="aspectFit"
            class="img"
          ></image>
        </view>
      </view>
      <view class="second">
        <view class="options">
          <view class="selector" @tap="showFilter = true">
            <view class="icon">
              <image
                src="../../../static/7d163ad9-885d-47cb-a29e-043e5a9933ac.png"
                mode="aspectFit"
                class="img"
              ></image>
            </view>
            <u-picker
              :show="showFilter"
              :columns="filters"
              class="select"
              @confirm="setFilter"
              @cancel="showFilter = false"
            ></u-picker>
            <view class="timeText">
              {{
                filterIndex !== null
                  ? filters[0][filterIndex]
                  : "请选择事件名称"
              }}
            </view>
          </view>
          <view class="selector" @tap="showStatus = true">
            <view class="icon">
              <image
                src="../../../static/5de7d537-e96d-4269-ad0a-684f3443643d.png"
                mode="aspectFit"
                class="img"
              ></image>
            </view>
            <u-picker
              :show="showStatus"
              :columns="status"
              class="select"
              @confirm="setStatus"
              @cancel="showStatus = false"
            ></u-picker>
            <view class="timeText">
              {{
                statusIndex !== null ? status[0][statusIndex] : "请选择警报级别"
              }}
            </view>
          </view>
        </view>
        <view class="icons" @click="reset">
          <image
            src="../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png"
            mode="aspectFit"
            class="img"
          ></image>
        </view>
      </view>
      <scroll-view
        class="content"
        scroll-y="true"
        :style="{ height: scrollHeight + 'px' }"
      >
        <view
          class="box"
          v-for="(item, index) in choosen === 0 ? warnData : historyData"
          :key="item.id"
          @touchstart="startMove($event, item)"
          @touchmove="moving($event, item)"
          @touchend="stopMove($event, item)"
          :style="{ transform: 'translateX(' + item.moveX + 'px)' }"
        >
          <view class="details">
            <view class="deviceName">
              {{ item.name }}
            </view>
            <view class="happen">
              <view class="event">
                {{ item.eventName }}
              </view>
              <view v-for="l in item.level" :key="l" class="stars">
                <image src="../../../static/start.png" mode="aspectFit"></image>
              </view>
            </view>
            <view class="positonAndtime">
              <view class="time">
                {{ item.time }}
              </view>
              <view class="position">
                {{ item.department }}
              </view>
            </view>
            <view
              class="buttons"
              v-show="item.deal === '未处理'"
              @click="alert"
            >
              <image src="../../../static/alert.png" mode="aspectFit"></image>
            </view>
            <view :class="item.deal === '已处理' ? 'isDealt' : 'unDealt'">
              <span>{{ item.deal }}</span>
              <view class="img">
                <image
                  :src="item.deal === '已处理' ? dealIcon[0] : dealIcon[1]"
                  mode="aspectFit"
                  class="image"
                ></image>
              </view>
            </view>
          </view>
          <view class="deleteBox">
            <view class="edit" @tap="check(index)">
              查看<image
                src="../../../static/watch.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="deal" @tap="deal(index)">
              处理<image
                src="../../../static/pencil.png"
                mode="aspectFit"
              ></image>
            </view>
            <view class="delete" @tap="deleteItem(index)">
              删除<image
                src="../../../static/white-rubbish.png"
                mode="aspectFit"
              ></image>
            </view>
          </view>
        </view>
      </scroll-view>
      <u-modal
        style="position: absolute"
        :show="showVideo"
        :closeOnClickOverlay="true"
        @close="showVideo = false"
        @confirm="showVideo = false"
        width="348px"
      >
        <check
          v-if="showVideo"
          :warnData="choosen === 0 ? warnData[index] : historyData[index]"
        ></check>
      </u-modal>
      <u-modal
        style="position: absolute"
        :show="showDeal"
        :closeOnClickOverlay="true"
        @close="showDeal = false"
        @confirm="sendDeal"
        showCancelButton
        @cancel="showDeal = false"
        width="348px"
      >
        <edit
          v-if="showDeal"
          @getContent="setContent"
          :warnData="choosen === 0 ? warnData[index] : historyData[index]"
        ></edit>
      </u-modal>
    </view>
  </view>
</template>

<script>
import check from "./components/check.vue";
import edit from "./components/edit.vue";
export default {
  components: {
    check,
    edit,
  },
  data() {
    return {
      moveX: 0,
      startX: 0,
      safeAreaTop: 0,
      show: false,
      showFilter: false,
      showStatus: false,
      status: [["1级", "2级", "3级"]],
      statusValue: [1, 2, 3],
      statusIndex: null,
      filters: [["进入危险区域", "烟雾",  "摔倒", "明火", "吸烟"]],
      filterValue: [1, 2, 3, 4, 5],
      filterIndex: null,
      scrollHeight: 0,
      choosen: 0,
      pageSize: 10,
      pageNum: 1,
      warnIsAll: false,
      hisIsAll: false,
      caseType: null,
      warningLevel: null,
      warnData: [],
      historyData: [],
      dealIcon: [
        "../../../static/20230910-194834.png",
        "../../../static/attention.png",
      ],
      showVideo: false,
      showDeal: false,
      content: "",
      id: null,
      index: 0,
    };
  },
  onLoad() {
    // console.log(uni.getWindowInfo().safeArea);
    this.safeAreaTop = uni.getWindowInfo().safeArea.height;
    let boxTop = 0;
    let scrollTop = 0;
    let boxHeight = 0;
    this.$nextTick(() => {
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#warnBox")
        .boundingClientRect((data) => {
          boxTop = data.top;
          boxHeight = data.height;
        })
        .exec();
      query
        .select(".content")
        .boundingClientRect((data) => {
          scrollTop = data.top;
        })
        .exec();
      this.scrollHeight = boxHeight - scrollTop + boxTop;
    });
  },
  onShow() {
	this.choosen = 0;
    this.caseType = null;
    this.filterIndex = null;
    this.warningLevel = null;
    this.statusIndex = null;
    this.getRealList();
  },
  methods: {
    alert() {
      uni.showToast({
        title: "已向相关部门发送通知",
        duration: 2000,
        icon: "none",
      });
    },
    setFilter(e) {
      this.caseType = this.filterValue[e.indexs[0]];
      this.filterIndex = e.indexs[0];
      this.showFilter = false;
      if (this.choosen) {
        this.getHistoryList();
      } else {
        this.getRealList();
      }
    },
    setStatus(e) {
      this.warningLevel = this.statusValue[e.indexs[0]];
      this.statusIndex = e.indexs[0];
      this.showStatus = false;
      if (this.choosen) {
        this.getHistoryList();
      } else {
        this.getRealList();
      }
    },
    getRealList() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: 0,
      };
      if (this.caseType) {
        data.caseType = this.caseType;
      }
      if (this.warningLevel) {
        data.warningLevel = this.warningLevel;
      }
      uni.$http.get("/api/v1/alarm/query", data).then(({ data }) => {
        console.log(data);
        this.warnData = data.data.alarmList;
        if (data.data.count < this.pageSize) {
          this.warnIsAll = true;
        }
        this.warnData.map((item) => {
          this.$set(item, "moveX", 0);
        });
      });
    },
    getHistoryList() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: 1,
      };
      if (this.caseType) {
        data.caseType = this.caseType;
      }
      if (this.warningLevel) {
        data.warningLevel = this.warningLevel;
      }
      uni.$http.get("/api/v1/alarm/query", data).then(({ data }) => {
        this.historyData = data.data.alarmList;
        if (data.data.count < this.pageSize) {
          this.hisIsAll = true;
        }
        this.historyData.map((item) => {
          this.$set(item, "moveX", 0);
        });
      });
    },
    reset() {
      this.caseType = null;
      this.filterIndex = null;
      this.warningLevel = null;
      this.statusIndex = null;
      if (this.choosen) {
        this.getHistoryList();
      } else {
        this.getRealList();
      }
    },
    jump() {
      uni.navigateTo({
        url: "/pages/sys/personal/setting/setting",
      });
    },
    startMove(e, item) {
      this.startX = e.touches[0].clientX;
    },
    moving(e, item) {
      let dis = e.touches[0].clientX - this.startX;
      let move = function (dis) {
        item.moveX = dis;
      };
      // const throttlePush = throttle(move,10);
      if (item.moveX <= -100 && dis < 0) return;
      // throttlePush(dis);
      move(dis);
      if (item.moveX > 0) item.moveX = 0;
    },
    stopMove(e, item) {
      if (item.moveX < -40) item.moveX = -100;
      else item.moveX = 0;
    },
    check(index) {
      this.index = index;
      this.showVideo = true;
      this.resetX(index)
    },
    deal(index) {
      this.index = index;
      this.showDeal = true;
	  this.resetX(index)
    },
	resetX(index){
		if(this.choosen){
				  this.historyData[index].moveX = 0;
		}
		else this.warnData[index].moveX = 0;
	},
    deleteItem(index) {
      this.resetX(index)
      uni.showModal({
        title: "警告",
        content: "是否要删除该项?",
        showCancel: true,
        success: () => {
          let alarmId = this.choosen
            ? this.historyData[index].id
            : this.warnData[index].id;
          uni.$http.delete(`/api/v1/alarm/${alarmId}`).then(() => {
            if (this.choosen) {
              this.getHistoryList();
            } else {
              this.getRealList();
            }
          });
        },
      });
    },
    setContent(val, id) {
      console.log(val, id);
      this.content = val;
      this.id = id;
    },
    async sendDeal() {
      if (this.conten === "") {
        uni.showToast({
          title: "内容不能为空",
          duration: 2000,
          icon: "none",
        });
        return;
      }
      const data = {
        id: this.id,
        status: 1,
        processingContent: this.content,
      };
      await uni.$http.put("/api/v1/alarm/update", data).then(({ data }) => {
        console.log(data);
        if (this.choosen) {
          this.getHistoryList();
        } else {
          this.getRealList();
        }
      });
      this.showDeal = false;
      this.content = "";
      this.id = null;
    },
  },
  watch: {
    choosen: {
      handler(newVal) {
        this.caseType = null;
        this.filterIndex = null;
        this.warningLevel = null;
        this.statusIndex = null;
        if (newVal === 1) {
          this.getHistoryList();
        } else {
          this.getRealList();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.warnBox {
  position: absolute;
  bottom: 0;
  padding: 16rpx 32rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5%;
    // border-bottom: 1px solid red;
    .topNav {
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
          font-size: 38rpx;
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
    .icon {
      // background: #000;
      height: 30px;
      width: 30px;
      .img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .second {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 12rpx;
    .icons {
      width: 56rpx;
      height: 56rpx;
      margin-bottom: 26rpx;
      .img {
        height: 100%;
        width: 100%;
      }
    }
    .options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 90%;
      .selector {
        border-radius: 12rpx;
        position: relative;
        width: 49%;
        border: 1px solid #eaeaea;
        box-sizing: border-box;
        height: 88rpx;
        padding: 12rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;
        .select {
          background-color: #fff;
          border: none;
          padding: 0;
          margin: 0;
          height: 100%;
          flex: 1;
        }
        .date {
          flex: 1;
          height: 100%;
          // background: #000;
        }
        .timeText {
          font-size: 28rpx;
          width: 110px;
          position: absolute;
          right: 0;
          color: #b5b5b5;
        }
      }
      .icon {
        width: 46rpx;
        height: 46rpx;
        display: flex;
        align-items: center;
        .img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .content {
    flex: 1;
    width: 100%;
    .box {
      width: 100%;
      height: 300rpx;
      margin-bottom: 20rpx;
      position: relative;
      .details {
        width: 100%;
        height: 300rpx;
        background-color: #e9eeff;
        border-radius: 15rpx 0 0 15rpx;
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
        .happen {
          position: absolute;
          display: flex;
          align-items: center;
          left: 20rpx;
          top: 50%;
          transform: translateY(-50%);
          font-size: 46rpx;
          .event {
            color: black;
            margin-right: 16rpx;
          }
          .stars {
            width: 48rpx;
            height: 48rpx;
            image {
              height: 100%;
              width: 100%;
            }
          }
        }
        .positonAndtime {
          position: absolute;
          bottom: 18rpx;
          left: 20rpx;
          display: flex;
          align-items: baseline;
          .time {
            font-size: 28rpx;
            margin-right: 16rpx;
          }
          .position {
            font-size: 34rpx;
          }
        }
        .buttons {
          position: absolute;
          top: 18rpx;
          right: 20rpx;
          width: 84rpx;
          height: 84rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .isDealt {
          position: absolute;
          bottom: 18rpx;
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
          bottom: 18rpx;
          right: 20rpx;
          color: #f09035;
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
      .deleteBox {
        border-radius: 0 15rpx 15rpx 0;
        overflow: hidden;
        height: 300rpx;
        width: 100px;
        display: flex;
        position: absolute;
        right: -100px;
        top: 0;
        z-index: 9;
        font-size: 32rpx;
        font-weight: bold;
        color: #fff;
        display: flex;
        flex-direction: column;
        .edit,
        .deal,
        .delete {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            height: 44rpx;
            width: 44rpx;
          }
        }
        .edit {
          background-color: #40a4ff;
        }
        .deal {
          background-color: #ffbc5d;
        }
        .delete {
          background-color: #ff5d5d;
          image {
            height: 34rpx;
            width: 34rpx;
          }
        }
      }
    }
  }
}
</style>
