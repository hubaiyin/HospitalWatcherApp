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
            :src="img.replace(/[\r\n]/g,'')"
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
	  img:'',
    };
  },
  methods: {
    async getImg() {
      /* await uni.$http.get(`/api/v1/monitor/image/${this.warnData.id}`).then(({res})=>{
		  this.img = ('data:image/png;base64,'+res.data).replace(/[\r\n]/g,'');
	  }); */
	  this.img = ("data:image/png;base64,"+"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kZwxc07s+ZrfXtWsvl82TjtIDWxZ+ObqPi5hST/dGK9uvPD+mXmftFlE+fauZ1L4Z6Nc7jADbk/3RmuCplafmdcMdHqjkLbxxYSD95E8Z9zWpaa/p16HSG4QOQeDVe5+ErDd9nvnPpuAFUk+FGpbzm5jA7ENXJLKn0RssVT7nB6uu3U7of8ATQ816P4S8V6LoHhaRbf/AI/8ZKHq71U/4VTqhbm5jx67qyPF3gW58O2i3XmmeLOCfSuynTqUFexE6lKvaNzq/DHiHSrCOfV9VvhLqNx/Bz8g7CuS1LxreNrl9f2PyGXKRk84WsXw3pMOs34tprsW2ehJ616raeCND8N2TX+pbroRjJJHStIe0rR00SM5RpUZa6s81tNM17xRc7vLmnyfvN0FdDqvw4uNM8PT3skwkuI13lUB4r1T+07ODQftumxpJbqMgIO1ZF14stJYbJLuMJZ6hGMSehPY1r9Xppe89TL6zUk/dVkebeA9A0/xLbXFpOzxX8f3XB4NO1n4bavYkm1Auox/dH+NQ+DJzpvj4LCf3bsRx7mvoEDcKmjRjVhZ7odavUpS02Z8wyafrFicPBcxY9KZ9s1Ucebc/rX0+YY2HKKfqKh/s+1JyYI/ypvLl3Gse+qPmy20nWNWkxHb3E5PrXfeFfhg5ZJ9bfAHPlJwa9ajiiQfIij6CpPpWtLBQhq9TKpjZz0WhWsLKCwtkgtUWOJOAAKtKMUtFdcVY4woooqgCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAExRilooATFGKWigBMVS1Swh1KyltrlQ8cgwavUlJrmBaHz/4t8C6hoc7z2QeW2zlSvVKZpHji7t7CTTtVU3NrIuwhvvD8TX0AUDKQ4BB7VyOveANH1Uu4hEEp/jjHWuGeFcXemzuhilJWqI8/wDA3iq0sdO1HT9RkKWzhvJzz1zWTe6zY3HhV9Pdj9ot5SYD7Y4rpbj4Szea3kXuU/2utTW3wl+YG5vWx321l7Oq1y2NlUoRfNc5T4a6bPqXiiGVASkXLMa+hV+VaxvDfh+y0Cz8ixTBP3nxya21+7XZhqPso2ZxYit7WV1sLRRRXQYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACYpcUUUAGKTFLRQAYooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q==")
		// console.log(this.img)
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
      this.$emit("change",false);
    },
    reset() {
      console.log("bye");
      this.ability = [
        {
          name: "进入危险区域",
          value: 1,
          checked: false,
        },
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
        success: async () => {
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
              dangerArea: this.ability[0].checked,
              fall: this.ability[2].checked,
              flame: this.ability[3].checked,
              smoke: this.ability[4].checked,
              wave: this.ability[1].checked,
              punch: this.ability[5].checked,
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
              dangerArea: this.ability[0].checked,
              fall: this.ability[2].checked,
              flame: this.ability[3].checked,
              smoke: this.ability[4].checked,
              wave: this.ability[1].checked,
              punch: this.ability[5].checked,
              leftX: Math.floor(this.border[0].leftX),
              leftY: Math.floor(this.border[0].leftY),
              rightX: Math.floor(this.border[0].rightX),
              rightY: Math.floor(this.border[0].rightY),
            };
          }
          await uni.$http.post("/api/v1/monitor/update", data).then(({data})=>{
			  console.log('edit',data);
			  this.$emit("change",true);
		  })
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
	  .group{
		  display: flex;
		  flex-wrap: wrap;
		  // background-color: pink;
		  padding: 0;
		  width: 100%;
		  justify-content: space-around;
	  }
      .borderBox {
        width: 45%;
        margin-top: 10px;
		margin-left: -5px;
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
