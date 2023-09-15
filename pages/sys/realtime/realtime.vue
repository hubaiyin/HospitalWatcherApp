<template>
  <view style="height: 100vh; width: 100vw; position: relative">
    <view :style="{ height: safeAreaTop + 'px' }" class="warnBox" id="warnBox">
      <view class="title">
        <h2>报警事件列表</h2>
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
			    {{ formatTime }}
			  </view>
			</view>
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
      	        {{ formatTime }}
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
      	        {{ formatTime }}
      	      </view>
      	    </view>
      	    <view class="selector" @tap="show = true">
      	      <view class="icon">
      	        <image
      	          src="../../../static/563aa794-f528-4ab0-8b23-4e3aff0adf48.png"
      	          mode="aspectFit"
      	          class="img"
      	        ></image>
      	      </view>
      	      <u-datetime-picker
      	        class="date"
      	        :show="show"
      	        v-model="time"
      	        mode="datetime"
      	        @confirm="setTime"
      	        @cancel="show = false"
      	        :closeOnClickOverlay="true"
      			@close="show=false"
      	      >
      	      </u-datetime-picker>
      	      <view class="timeText">
      	        {{ formatTime }}
      	      </view>
      	    </view>
      	  </view>
		<view class="icons">
			<image src="../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png" mode="aspectFit" class="img"></image>
		</view>
	  </view>
      <scroll-view
        class="content"
        scroll-y="true"
        :style="{ height: scrollHeight + 'px' }"
      >
        <view class="details" v-for="(item, index) in warnData" :key="item.id">
          <view class="deviceName">
            {{ item.name }}
          </view>
          <view class="happen">
            <view class="event">
              {{ item.eventName }}
            </view>
            <view :class="item.level >= 3 ? 'level3' : item.level === 2? 'level2':'level1'">
              {{ item.level }}级
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
          <view class="buttons">
            <span style="color: #6787f9" @tap="showVideo = true">查看</span
            >｜<span style="color: #6787f9" @tap="showDeal=true">处理</span>｜<span
              style="color: #919194"
              >删除</span
            >
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
      </scroll-view>
      <u-modal
        style="position: absolute;"
        :show="showVideo"
        :closeOnClickOverlay="true"
        @close="showVideo = false"
        @confirm="showVideo = false"
		width="348px"
      >
        <view class="informBox">
			<view class="video">
			  <video
			    v-show="showVideo"
			    src=""
			    style="width: 328px; height: 246px; transition: 1s"
			  ></video>
			</view>
          <view  style="height: 200px;overflow: auto;width: 328px;">
            <view class="contents">
              <view class="line">
                <view class="column left"> 事件id </view>
                <view class="column right">
                  {{ warnData[0].id }}
                </view>
              </view>
            </view>
            <view class="contents">
              <view class="line">
                <view class="column left"> 摄像头 </view>
                <view class="column right">
                  {{ warnData[0].name }}
                </view>
              </view>
            </view>
            <view class="contents">
              <view class="line">
                <view class="column left"> 区域 </view>
                <view class="column right">
                  {{ warnData[0].department }}
                </view>
              </view>
            </view>
            <view class="contents">
              <view class="line">
                <view class="column left"> 类别 </view>
                <view class="column right">
                  {{ warnData[0].eventName }}
                </view>
              </view>
            </view>
			<view class="contents">
			  <view class="line">
			    <view class="column left"> 等级 </view>
			    <view class="column right">
			      {{ warnData[0].level }}级
			    </view>
			  </view>
			</view>
			<view class="contents">
			  <view class="line">
			    <view class="column left"> 时间 </view>
			    <view class="column right" style="font-size: 32rpx;">
			      {{ warnData[0].time }}
			    </view>
			  </view>
			</view>
			<view class="contents">
			  <view class="line">
			    <view class="column left"> 状态 </view>
			    <view class="column right" :class="warnData[0].deal === '已处理'?'dealt':'unDealt' ">
			      {{ warnData[0].deal }}
			    </view>
			  </view>
			</view>
			<view class="contents">
			  <view class="line">
			    <view class="column left"> 处理内容 </view>
			    <view class="column right">
			      {{ warnData[0].content }}
			    </view>
			  </view>
			</view>
          </view>
        </view>
      </u-modal>
	  <u-modal
	    style="position: absolute;"
	    :show="showDeal"
	    :closeOnClickOverlay="true"
	    @close="showDeal = false"
	    @confirm="showDeal = false"
		showCancelButton
		@cancel="showDeal=false"
		width="348px"
	  >
	    <view class="informBox">
	  			<view class="video">
	  			  <video
	  			    v-show="showDeal"
	  			    src=""
	  			    style="width: 328px; height: 246px; transition: 1s"
	  			  ></video>
	  			</view>
	      <view  style="height: 200px;overflow: auto;width: 328px;">
	        <view class="contents">
	          <view class="line">
	            <view class="column left"> 事件id </view>
	            <view class="column right">
	              {{ warnData[0].id }}
	            </view>
	          </view>
	        </view>
	        <view class="contents">
	          <view class="line">
	            <view class="column left"> 摄像头 </view>
	            <view class="column right">
	              {{ warnData[0].name }}
	            </view>
	          </view>
	        </view>
	        <view class="contents">
	          <view class="line">
	            <view class="column left"> 区域 </view>
	            <view class="column right">
	              {{ warnData[0].department }}
	            </view>
	          </view>
	        </view>
	        <view class="contents">
	          <view class="line">
	            <view class="column left"> 类别 </view>
	            <view class="column right">
	              {{ warnData[0].eventName }}
	            </view>
	          </view>
	        </view>
	  			<view class="contents">
	  			  <view class="line">
	  			    <view class="column left"> 等级 </view>
	  			    <view class="column right">
	  			      {{ warnData[0].level }}级
	  			    </view>
	  			  </view>
	  			</view>
	  			<view class="contents">
	  			  <view class="line">
	  			    <view class="column left"> 时间 </view>
	  			    <view class="column right" style="font-size: 32rpx;">
	  			      {{ warnData[0].time }}
	  			    </view>
	  			  </view>
	  			</view>
	  			<view class="contents">
	  			  <view class="line">
	  			    <view class="column left"> 状态 </view>
	  			    <view class="column right dealt">
	  			      {{ warnData[0].deal }}
	  			    </view>
	  			  </view>
	  			</view>
	  			<view class="contents">
	  			  <view class="line">
	  			    <view class="column left"> 处理内容 </view>
	  			    <view class="column right">
	  			      {{ warnData[0].content }}
	  			    </view>
	  			  </view>
	  			</view>
				<view class="contents" style="margin-top: 24rpx;">
					<span style="font-size: 28rpx;">处理结果</span>
				  <view class="textarea">
				   <u--textarea :adjustPosition="false" height="120"></u--textarea>
				  </view>
				</view>
	      </view>
	    </view>
	  </u-modal>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      safeAreaTop: 0,
      show: false,
      time: Number(new Date()),
      formatTime: "",
      showFilter: false,
      showStatus: false,
      status: [["中国", "美国", "日本"]],
      filters: [["中国", "美国", "日本"]],
      scrollHeight: 0,
      warnData: [
        {
          id: "10086",
          name: "智能摄像头-1",
          eventName: "进入危险区域",
          level: 5,
          time: "09-25 22:10",
          department: "急诊部",
          deal: "已处理",
          content: "加强培训",
        },
        {
          id: "114514",
          name: "智能摄像头-3",
          eventName: "摔倒",
          level: 1,
          time: "09-24 22:14",
          department: "精神科",
          deal: "未处理",
          content: "迅速前去查看情况",
        },
        {
          id: "191919",
          name: "智能摄像头-1",
          eventName: "进入危险区域",
          level: 5,
          time: "09-24 22:10",
          department: "急诊部",
          deal: "已处理",
          content: "加强培训",
        },
        {
          id: "2203",
          name: "智能摄像头-2",
          eventName: "吸烟",
          level: 2,
          time: "09-26 22:14",
          department: "急诊部",
          deal: "已处理",
          content: "进行劝导",
        },
      ],
      dealIcon: [
        "../../../static/20230910-194834.png",
        "../../../static/20230910-194949.png",
      ],
      showVideo: false,
	  showDeal:false
    };
  },
  onLoad() {
    console.log(uni.getWindowInfo().safeArea);
    this.safeAreaTop = uni.getWindowInfo().safeArea.height;
    const timeFormat = uni.$u.timeFormat;
    this.formatTime = timeFormat(this.time, "yyyy-mm-dd hh:MM");
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
  methods: {
    setTime(e) {
      const timeFormat = uni.$u.timeFormat;
      this.show = false;
      this.time = e.value;
      this.formatTime = timeFormat(e.value, "yyyy-mm-dd hh:MM");
    },
    setFilter(e) {
      this.showFilter = false;
    },
    setStatus(e) {
      this.showStatus = false;
    },
	jump(){
		uni.navigateTo({
			url:'/pages/sys/personal/setting/setting'
		})
	}
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
    h2 {
      position: relative;
    }
    h2::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 30%;
      bottom: 2px;
      left: 0;
      background: #9eb3ff;
      z-index: -1;
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

  .second{
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
	        position: absolute;
	        right: 4%;
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
    .details {
      width: 100%;
      height: 300rpx;
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
      .happen {
        position: absolute;
        display: flex;
        left: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 46rpx;
        .event {
          color: black;
          margin-right: 16rpx;
        }
        .level3 {
          color: #ff5d5d;
        }
        .level2 {
          color: #ff8a01;
        }
		.level1{
			color: #0184FF;
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
        bottom: 18rpx;
        right: 20rpx;
        color: #b5b5b5;
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
  .informBox{
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  .video {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	  	margin-bottom: 32rpx;
	  	width: 328px;
	  	height: 246px;
	  }
	  .contents {
	    width: 100%;
	    font-size: 38rpx;
	    .line {
	      width: 100%;
	      display: flex;
	      .column {
			height: 100rpx;
	        width: 50%;
	        display: flex;
	        justify-content: center;
	        align-items: center;
	      }
	      .left {
	        background-color: #e0e0e0;
	      }
	  	  .dealt{
	  		  color: #06bfa1;
	  	  }
		  .unDealt{
			  color: #FF5D5D;
		  }
	    }
		.textarea{
			border: 1px solid  #b0b1b1;
			border-radius: 15rpx;
		}
	  }
  }
  
}
</style>
