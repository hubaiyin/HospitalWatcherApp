<template>
    <view class="body">
        <view class="dateSelect">
            <view class="text">
                <span>请选择时间范围</span>
            </view>
            <view class="select">
                <view class="btn" @click="onShowDatePicker('rangetime')">{{rangetime[0]}} - {{rangetime[1]}}</view>
                <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'开始'"
                :end-text="'结束'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
            </view>
        </view>
        <view class="first">

        </view>
        <view class="second">

        </view>
        <view class="third">

        </view>
    </view>
</template>

<script>
	// import ringChart from '../../../components/ringChart.vue';
    import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		components:{ MxDatePicker },
		data() {  
			return {
                date: '2019/01/01',
                time: '15:00:12',
                datetime: '2019/01/01 15:00:12',
                range: [],
                rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
                type: 'rangetime',
                value: '',
                showPicker:false
			};
		},
        methods:{
            // setTime(e) {
            //     const timeFormat = uni.$u.timeFormat;
            //     this.show = false;
            //     this.time = e.value;
            //     this.formatTime = timeFormat(e.value, "yyyy-mm-dd hh:MM");
            // },
            onShowDatePicker(type) { //显示
                console.log(JSON.stringify(type))
                this.type = type;
                this.showPicker = true;
                this.value = this[type];
            },
            onSelected(e) { //选择
                console.log(JSON.stringify(e))
                this.showPicker = false;
                if (e) {
                    this[this.type] = e.value;
                    //选择的值
                    console.log('value => ' + e.value);
                    //原始的Date对象
                    console.log('date => ' + e.date);
                }
            }
        },
        onLoad(){
            const timeFormat = uni.$u.timeFormat;
            this.formatTime = timeFormat(this.time, "yyyy-mm-dd hh:MM");
        }
	}
</script>

<style lang="scss" scoped>
    .body {
        height: 95%;
        border: 2px solid red;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .dateSelect {
            // height: 6%;
            width: 98%;
            border: 2px solid blue;
            display: flex;
            align-items: center;
            .select {
                border: 1px solid #c7c7c7;
                margin-left: 20rpx;
                border-radius: 10rpx;
                padding: 10rpx;
                display: flex;
                // height: 80%;
                // display: flex;
                // justify-content: center;
                // align-items: center;
                .btn {
                    // background-color: skyblue;
                    font-size: 20rpx;
                }
            }
        }
        .first,.second,.third {
            height: 30%;
            width: 98%;
            border-radius: 15rpx;
        }
        .first {
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
