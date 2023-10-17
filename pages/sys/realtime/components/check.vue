<template>
  <view class="informBox">
    <view class="video">
      <video
        :src="warnData.video"
        style="width: 328px; height: 246px; transition: 1s"
      ></video>
	  <!-- <video
	    src="https://hospital-alarm-1318141347.cos.ap-beijing.myqcloud.com/fake.mp4?q-sign-algorithm=sha1&q-ak=AKIDcI2rYIwPjrxxuxud7OWXP8j7VuDPOAl9&q-sign-time=1697011943%3B1728547943&q-key-time=1697011943%3B1728547943&q-header-list=host&q-url-param-list=&q-signature=bbe1620113d915ae3f0b309483630f9782880b13"
	    style="width: 328px; height: 246px; transition: 1s"
	  ></video> -->
    </view>
    <view style="height: 200px; overflow: auto; width: 328px">
      <view class="contents">
        <view class="line">
          <view class="column left"> 事件id </view>
          <view class="column right">
            {{ warnData.id }}
          </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 摄像头 </view>
          <view class="column right">
            {{ warnData.name }}
          </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 区域 </view>
          <view class="column right">
            {{ warnData.department }}
          </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 类别 </view>
          <view class="column right">
            {{ warnData.eventName }}
          </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 等级 </view>
          <view class="column right"> {{ warnData.level }}级 </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 时间 </view>
          <view class="column right" style="font-size: 32rpx">
            {{ warnData.date }}
          </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 状态 </view>
          <view
            class="column right"
            :class="warnData.deal === '已处理' ? 'dealt' : 'unDealt'"
          >
            {{ warnData.deal }}
          </view>
        </view>
      </view>
      <view class="contents">
        <view class="line">
          <view class="column left"> 处理内容 </view>
          <view class="column right">
            {{ warnData.content }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Check",
  props: {
    warnData: {
      required: true,
      type: Object,
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
      .dealt {
        color: #06bfa1;
      }
      .unDealt {
        color: #ff5d5d;
      }
    }
    .textarea {
      border: 1px solid #b0b1b1;
      border-radius: 15rpx;
    }
  }
}
</style>