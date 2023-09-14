<template>
  <view style="height: 100vh; width: 100vw; position: relative">
    <view class="main" :style="{ height: safeHeight + 'px' }" id="watchBox">
      <view class="header">
        <view class="topNav">
          <view class="left" :class="choosen === 1?'choosen':''" @click="choosen = 1">
            <span>
				<h2 v-show="choosen === 1">监控位置</h2>
              <h3 v-show="choosen === 2">监控位置</h3>
            </span>
          </view>
          <view class="right" :class="choosen === 2?'choosen':''" @click="choosen = 2">
            <span>
              <h2 v-show="choosen === 2">监控列表</h2>
              <h3 v-show="choosen === 1">监控列表</h3>
            </span>
          </view>
        </view>
        <view class="setting">
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
      >
        <cover-view class="status">
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
        <view class="details" v-for="(item, index) in warnData" :key="item.id">
          <view class="deviceName">
            {{ item.name }}
          </view>
          <view class="positonAndtime">
            <view class="time"> 摄像头编号：{{item.number}} </view>
            <view class="time"> 监控区域：{{item.department}} </view>
            <view class="time"> 区域负责人：{{item.leader}} </view>
          </view>
          <view class="buttons">
			  <view class="button" @click="showEdit = true">
			  	<image src="../../../static/edit.png" mode="aspectFit" style="height: 22px; width: 22px;"></image>
			  	<span style="color: #6787F9">
			  		编辑</span>
			  </view>｜<view class="button" @click="showDelete = true">
			  	<image src="../../../static/rubbish.png" mode="aspectFit" style="height: 22px; width: 22px;"></image>
			  	<span style="color: #FF5D5D" >
			  		删除</span>
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
	<u-modal :show="showEdit" :closeOnClickOverlay="true" :showCancelButton="true" @confirm="showEdit=false" @cancel="showEdit=false" @close="showEdit=false" width="348px">
		<view class="informBox">
			<view class="titleBox">
				<view class="title">
					{{warnData[0].name}}
				</view>
				<view class="img" @tap="locked = !locked">
					<image :src="locked?lockImg[0]:lockImg[1]" mode="aspectFit"></image>
				</view>
			</view>
			  <view class="video">
			  	<video src="" style="height: 100%;width: 100%;object-fit: fill;"></video>
			  </view>
			  <view class="scroll">
				  <view class="edit">
				  	<span>编辑区</span>
					<image src="../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
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
					  :style="{height: 246+'px',
					    width: 328+'px'}"
					  @touchstart="start"
					  @touchmove="move"
					  @touchend="stop"
					  :disable-scroll="!locked"
					  ></canvas>
					<view class="border" v-for="(box) in border" :key="box.id" :style="{width:box.width+'px',height:box.height+'px',top:box.top+'px',left:box.left+'px'}">
					</view>
			  	</view>
				<view class="edit">
					<span>编辑区</span>
					<image src="../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="options">
					<u-checkbox-group
					    v-model="checkboxValue1"
					    placement="column"
					    @change="checkboxChange"
					>
					    <u-checkbox
					        :customStyle="{marginBottom: '8px'}"
					        v-for="(item, index) in checkboxList1"
					        :key="index"
					        :label="item.name"
					        :name="item.name"
					    >
					    </u-checkbox>
					</u-checkbox-group>
				</view>
			  </view>
		</view>
	</u-modal>
  </view>
</template>

<script>
	import moment from "moment";
	import {throttle} from 'lodash'
export default {
  data() {
    return {
		lockImg:['../../../static/lock.png','../../../static/unlock.png'],
		locked:true,
	startPoint: {
	    x: null,
	    y: null,
	},
	  border: [],
	  borData: {},
	  ctx: null,
	  painting: false,
      safeHeight: 0,
      total: 20,
      working: 19,
      longitude: 0,
      latitude: 0,
      isShow: false,
	  showDelete:false,
	  showEdit:false,
      choosen: 2,
      scrollHeight: 0,
	  warnData: [
	    {
	      id: "10086",
	      name: "智能摄像头-1",
	      deal: "正在运行",
		  number:'A104',
		  department:'急诊科走廊',
		  leader:'沛沛'
	    },
	    {
	      id: "114514",
	      name: "智能摄像头-3",
	      deal: "停用",
		  number:'A102',
		  department:'急诊部',
		  leader:'潇迪'
	    },
	    {
	      id: "191919",
	      name: "智能摄像头-4",
	      deal: "正在运行",
		  number:'A103',
		  department:'精神科',
		  leader:'轩轩'
	    },
	    {
	      id: "2203",
	      name: "智能摄像头-2",
	      deal: "停用",
		  number:'A101',
		  department:'大厅',
		  leader:'阿为'
	    },
	  ],
	  dealIcon: [
	    "../../../static/20230910-194834.png",
	    "../../../static/20230910-194949.png",
	  ],
	  checkboxValue1:[],
		// 基本案列数据
		checkboxList1: [{
				name: '苹果',
			},
			{
				name: '香蕉',
			},
			{
				name: '橙子',
			}
		],
    };
  },
  methods:{
	  start(e) {
		  if(this.locked) return
	        let x = e.touches[0].x;
	        let y = e.touches[0].y;
			/* let x = e.touches[0].y;
			let y = e.touches[0].x; */
	        this.startPoint.x = x;
	        this.startPoint.y = y;
	        console.log(this.startPoint);
	        this.painting = true;
	        this.borData = {
	          maxX: x,
	          minX: x,
	          maxY: y,
	          minY: y,
	        };
	      },
	move(e) {
	  if(this.locked) return
	  console.log("e",e.touches[0]);
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
	  if(this.locked) return
	  this.painting = false;
	  this.border.push({
	    width: this.borData.maxX - this.borData.minX,
	    height: this.borData.maxY - this.borData.minY,
	    id: moment().format("MMMM Do YYYY, h:mm:ss a"),
	    top: this.borData.minY,
	    left: this.borData.minX,
	  });
	this.borData = {};
	  console.log('end');
	},
	push(newPoint) {
	  this.borData.maxX = Math.max(newPoint.x, this.borData.maxX);
	  this.borData.minX = Math.min(newPoint.x, this.borData.minX);
	  this.borData.maxY = Math.max(newPoint.y, this.borData.maxY);
	  this.borData.minY = Math.min(newPoint.y, this.borData.minY);
	},
	checkboxChange(n) {
	    console.log('change', n);
	}
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
	    background-color: #E9EEFF;
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
		  .button{
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
  }
}
.informBox{
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  .titleBox{
		  width: 100%;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding-bottom: 10rpx;
		  .title{
		  	font-size: 38rpx;
		  	font-weight: bold;
		  }
		  .img{
			  width: 48rpx;
			  height: 48rpx;
			  image{
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
	  .scroll{
		  margin-top: 10px;
		  height: 246px;
		  overflow: auto;
		  width: 328px;
		  
		  .img{
		  	width:  328px;
		  	height: 246px;
		  	background-color: pink;
			position: relative;
			.border{
				border: 1px solid red;
				position: absolute;
			}
		  }
		  .edit{
			  width: 100%;
			  height: 48rpx;
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  span{
				  font-size: 34rpx;
				  font-weight: bold;
			  }
		  }
		  .options{
			  width: 100%;
		  }
	  }
	  
	  
  }
</style>
