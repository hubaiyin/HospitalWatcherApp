<template>
  <u-modal
    :show="showEdit"
    :closeOnClickOverlay="true"
    :showCancelButton="true"
    @confirm="checkChange"
    @cancel="changeShow"
    @close="changeShow"
    width="348px"
  >
    <view class="informBox">
      <view class="titleBox">
        <view class="title">
          {{ warnData.name }}
        </view>
        <view class="img" @tap="locked = !locked">
          <image
            :src="
              locked ? '../../../static/lock.png' : '../../../static/unlock.png'
            "
            mode="aspectFit"
          ></image>
        </view>
      </view>
      <view class="video">
        <video
          :src="warnData.video"
          :is-live="true"
          :autoplay="true"
          style="
            height: 100%;
            width: 100%;
            object-fit: fill;
            position: relative;
          "
        >
          <cover-view
            class="border"
            v-for="(box, index) in border"
            :key="index"
            :style="{
              width: box.rightX - box.leftX + 'px',
              height: box.rightY - box.leftY + 'px',
              top: box.leftY + 'px',
              left: box.leftX + 'px',
            }"
          ></cover-view>
        </video>
      </view>
      <view class="scroll">
        <view class="edit">
          <span>编辑区</span>
          <image
            src="../../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png"
            mode="aspectFit"
            style="width: 40rpx; height: 40rpx"
            @tap="resetBorder"
          ></image>
        </view>
        <view class="img">
          <canvas
            canvas-id="myCanvas"
            style="
              margin: 0 auto;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 10;
            "
            :style="{ height: 246 + 'px', width: 328 + 'px' }"
            @touchstart="start"
            @touchmove="move"
            @touchend="stop"
            :disable-scroll="!locked"
          ></canvas>
          <image
            :src="img.replace(/[\r\n]/g, '')"
            mode="aspectFit"
            style="width: 100%; height: 100%"
          ></image>
          <view
            class="border"
            v-for="(box, index) in border"
            :key="index"
            :style="{
              width: box.rightX - box.leftX + 'px',
              height: box.rightY - box.leftY + 'px',
              top: box.leftY + 'px',
              left: box.leftX + 'px',
            }"
          >
          </view>
        </view>
        <view class="edit">
          <span>编辑区</span>
          <image
            src="../../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png"
            mode="aspectFit"
            style="width: 40rpx; height: 40rpx"
            @tap="reset"
          ></image>
        </view>
        <view class="options">
          <view class="uni-list">
            <checkbox-group @change="checkboxChange" class="group">
              <view class="borderBox" v-for="item in ability" :key="item.value">
                <label class="uni-list-cell uni-list-cell-pd checkbox">
                  <view>
                    <checkbox :value="item.value" :checked="item.checked" />
                  </view>
                  <view>{{ item.name }}</view>
                </label>
                <!-- <view class="time">
                  <input
                    type="number"
                    v-model="item.time"
                    style="width: 100%; height: 100%; text-align: center"
                    @input="limitation(item)"
                  />
                </view> -->
              </view>
            </checkbox-group>
          </view>
        </view>
      </view>
    </view>
  </u-modal>
</template>

<script>
import { throttle } from "lodash";
export default {
  name: "Edit",
  props: {
    showEdit: {
      type: Boolean,
    },
    warnData: {
      type: Object,
    },
    monitorData: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.warnData, this.monitorData);
    console.log(this.border);
    this.getImg();
  },
  data() {
    return {
      lockImg: ["../../../static/lock.png", "../../../static/unlock.png"],
      locked: true,
      startPoint: {
        x: null,
        y: null,
      },
      border: this.warnData.border,
      borData: {},
      painting: false,
      ability: JSON.parse(JSON.stringify(this.warnData.ability)),
      img: "",
    };
  },
  methods: {
    async getImg() {
      await uni.$http
        .get(`/api/v1/monitor/image/${this.warnData.id}`)
        .then(({ data }) => {
          this.img = ("data:image/png;base64," + data.message).replace(
            /[\r\n]/g,
            ""
          );
        });
    },
    start(e) {
      if (this.locked) return;
      let x = e.touches[0].x;
      let y = e.touches[0].y;
      /* let x = e.touches[0].y;
				let y = e.touches[0].x; */
      this.startPoint.x = x;
      this.startPoint.y = y;
      // console.log(this.startPoint);
      this.painting = true;
      this.borData = {
        maxX: x,
        minX: x,
        maxY: y,
        minY: y,
      };
    },
    move(e) {
      if (this.locked) return;
      // console.log("e", e.touches[0]);
      let x = e.touches[0].x;
      let y = e.touches[0].y;
      let newPoint = { x: x, y: y };
      const throttlePush = throttle(this.push, 500);
      if (this.painting) {
        this.startPoint = newPoint;
        throttlePush(newPoint);
      }
    },
    stop() {
      if (this.locked) return;
      this.painting = false;
      this.border = [
        {
          leftY: this.borData.minY,
          leftX: this.borData.minX,
          rightY: this.borData.maxY,
          rightX: this.borData.maxX,
        },
      ];
      this.borData = {};
      console.log("end", this.border);
    },
    push(newPoint) {
      this.borData.maxX = Math.max(newPoint.x, this.borData.maxX);
      this.borData.minX = Math.min(newPoint.x, this.borData.minX);
      this.borData.maxY = Math.max(newPoint.y, this.borData.maxY);
      this.borData.minY = Math.min(newPoint.y, this.borData.minY);
    },
    changeShow() {
      this.$emit("change", false);
    },
    reset() {
      console.log("bye");
      this.ability = [
        {
          name: "挥手",
          value: 2,
          checked: false,
        },
        {
          name: "摔倒",
          value: 3,
          checked: false,
        },
        {
          name: "明火",
          value: 4,
          checked: false,
        },
        {
          name: "吸烟",
          value: 5,
          checked: false,
        },
        {
          name: "打拳",
          value: 6,
          checked: false,
        },
      ];
    },
    resetBorder() {
      console.log("hi");
      this.border = [];
    },
    async checkChange() {
      console.log(this.border);
      uni.showModal({
        title: "警告",
        content: "确定修改?",
        showCancel: true,
        success: async (res) => {
          if (res.confirm) {
            let data = {};
            if (this.border.length === 0) {
              console.log("empty");
              data = {
                id: this.warnData.id,
                name: this.warnData.name,
                area: this.warnData.department,
                leader: this.warnData.leader,
                ip: this.warnData.video,
                longitude: this.monitorData.longitude,
                latitude: this.monitorData.latitude,
                latitude: this.monitorData.latitude,
                fall: this.ability[1].checked,
                flame: this.ability[2].checked,
                smoke: this.ability[3].checked,
                wave: this.ability[0].checked,
                punch: this.ability[4].checked,
              };
            } else {
              data = {
                id: this.warnData.id,
                name: this.warnData.name,
                area: this.warnData.department,
                leader: this.warnData.leader,
                ip: this.warnData.video,
                longitude: this.monitorData.longitude,
                latitude: this.monitorData.latitude,
                fall: this.ability[1].checked,
                flame: this.ability[2].checked,
                smoke: this.ability[3].checked,
                wave: this.ability[0].checked,
                punch: this.ability[4].checked,
                leftX: Math.floor(this.border[0].leftX),
                leftY: Math.floor(this.border[0].leftY),
                rightX: Math.floor(this.border[0].rightX),
                rightY: Math.floor(this.border[0].rightY),
              };
            }
            await uni.$http
              .post("/api/v1/monitor/update", data)
              .then(({ data }) => {
                console.log("edit", data);
                this.$emit("change", true);
              });
          }
        },
      });
    },
    checkboxChange(e) {
      let values = e.target.value;
      this.ability.forEach((item) => {
        if (values.includes(item.value)) {
          item.checked = true;
        }
      });
    },
    limitation(item) {
      item.time = Math.abs(item.time);
    },
  },
};
</script>

<style lang="scss" scoped>
.informBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .border {
    border: 1px dotted red;
    position: absolute;
    background-color: rgba(red, 0.5);
  }
  .titleBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10rpx;
    .title {
      font-size: 38rpx;
      font-weight: bold;
    }
    .img {
      width: 48rpx;
      height: 48rpx;
      image {
        height: 100%;
        width: 100%;
      }
    }
  }
  .video {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 328px;
    height: 246px;
  }
  .scroll {
    margin-top: 10px;
    height: 246px;
    overflow: auto;
    width: 328px;

    .img {
      overflow: hidden;
      width: 328px;
      height: 246px;
      position: relative;
    }
    .edit {
      width: 100%;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 34rpx;
        font-weight: bold;
      }
    }
    .options {
      width: 100%;
      .group {
        display: flex;
        flex-wrap: wrap;
        // background-color: pink;
        padding: 0;
        width: 100%;
      }
      .borderBox {
        width: 44%;
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 10px;
        .checkbox {
          display: flex;
          align-items: center;
          border: 1px solid grey;
          padding: 4px;
          padding-top: 2px;
          width: 100%;
          border-radius: 4px;
        }
        .time {
          width: 36%;
          height: 36px;
          background-color: #e5e5e5;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
