<template>
	<u-modal :show="showEdit" :closeOnClickOverlay="true" :showCancelButton="true" @confirm="changeShow" @cancel="changeShow" @close="changeShow" width="348px">
		<view class="informBox">
			<view class="titleBox">
				<view class="title">
					{{warnData[0].name}}
				</view>
				<view class="img" @tap="locked = !locked">
					<image :src="locked?'../../../static/lock.png':'../../../static/unlock.png'" mode="aspectFit"></image>
				</view>
			</view>
			  <view class="video">
			  	<video src="" style="height: 100%;width: 100%;object-fit: fill;"></video>
			  </view>
			  <view class="scroll">
				  <view class="edit">
				  	<span>编辑区</span>
					<image src="../../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
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
					<image src="../../../../static/fde8aa31-f3f3-41af-b0ec-d85398199844.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
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
</template>

<script>
	import moment from "moment";
	import {throttle} from 'lodash'
	export default{
		name:'Edit',
		props:{
			showEdit:{
				type:Boolean
			},
			warnData:{
				type:Array
			}
		},
		data(){
			return{
				lockImg:['../../../static/lock.png','../../../static/unlock.png'],
				locked:true,
				startPoint: {
				    x: null,
				    y: null,
				},
				border: [],
				video:'',
				borData: {},
				painting: false,
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
			}
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
			},
			changeShow(){
				this.$emit('change');
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			  background-color: red;
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
			 overflow: hidden;
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