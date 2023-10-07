<template>
    <view class="body">
        <view class="dateSelect">
            <view class="text">
                <span>请选择时间范围</span>
            </view>
            <view class="date">
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
                    <view class="innerText">
                        {{ range }}
                    </view>
                    <div class="triangle">▼</div>
                </view>
            </view>
        </view>
        <view class="first">
            <div class="line">
                <line-chart :range="num"></line-chart>
            </div>
        </view>
        <view class="second">
            <div class="line">
                <bar-chart :range="num"></bar-chart>
            </div>
        </view>
        <view class="third">
            <div class="line">
                <row-chart :range="num"></row-chart>
            </div>
        </view>
    </view>
</template>

<script>
import lineChart from '../../../components/lineChart.vue';
import barChart from '../../../components/barChart.vue';
import rowChart from '../../../components/rowChart.vue';

	export default {
        components:{ lineChart , barChart , rowChart },
		data() {  
			return {
                num : 1,
                showFilter: false,
                filters: [["近一天", "近三天", "近一周"]],
                range:'近一天',
			};
		},
        methods:{
            setFilter(e) {
                this.showFilter = false;
                this.range = e.value[0];
                if(this.range == "近一天") {
                    this.num = 1;
                }
                if(this.range == "近三天") {
                    this.num = 3;
                }
                if(this.range == "近一周") {
                    this.num = 7;
                }
            },
        },
	}
</script>

<style lang="scss" scoped>
    .body {
        height: 95%;
        // border: 2px solid red;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .dateSelect {
            // border: 2px solid blue;
            height: 6%;
            width: 98%;
            display: flex;
            align-items: center;
            .text {
                // border: 2px solid red;
            }
            .date {
                border: 1.5px solid #AAAAAA;
                position: relative;
                border-radius: 15rpx;
                width: 30%;
                height: 60%;
                margin-left: 20rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                .selector {
                    width: 98%;
                    height: 98%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    // background-color: pink;
                    .select {
                        // border: 2px solid rebeccapurple;
                        // width: 20rpx;
                    }
                    .icon {
                        margin-left: 10rpx;
                        height: 35rpx;
                        width: 35rpx;
                        // border: 1px solid palevioletred;
                        image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .innerText {
                        position: absolute;
                        font-size: 28rpx;
                        color:#AAAAAA;
                        // top: 13rpx;
                    }
                    .triangle {
                        color: #AAAAAA;
                        position: relative;
                        right: 15rpx;
                        font-size: 25rpx;
                    }
                }
            }
        }
        .first,.second,.third {
            height: 30%;
            width: 98%;
            border-radius: 15rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .line {
                // border: 2px solid red;
                width: 100%;
                height: 90%;
            }
        }
        .first {
            display: flex;
            justify-content: center;
            align-items: center;
            // .line {
            //     // border: 2px solid red;
            //     width: 100%;
            //     height: 90%;
            // }
            background-color: #E9FFFF;
        }
        .second {
            background-color: #F5F0FD;
        }
        .third {
            background-color: #EDFEEF;
        }
    }
</style>
