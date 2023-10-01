<template>
    <view class="charts-box">
      <qiun-data-charts 
        type="column"
        :opts="opts"
        :chartData="chartData"
        :canvas2d="true"
        canvasId="tyaNrdVFWiyYPbHnUdTKToUdjvIIkrAf"
      />
    </view>
  </template>
  
  <script>
  export default {
  props: {
    range: {
      required: true ,
      type: Number
    }
  },
    data() {
      return {
        chartData: {},
        //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
        opts: {
          color: ["#FAC858","#EE6666","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,15,0,5],
          enableScroll: false,
          legend: {},
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            data: [
              {
                min: 0
              }
            ]
          },
          extra: {
            column: {
              type: "group",
              width: 20,
              activeBgColor: "#000000",
              activeBgOpacity: 0.08,
              linearType: "custom",
              seriesGap: 5,
              linearOpacity: 0.5,
              barBorderCircle: true,
              customColor: [
                "#FA7D8D",
                "#EB88E2"
              ]
            }
          }
        }
      };
    },
    mounted() {
      this.getServerData();
    },
    methods: {
      getServerData(val) {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
              categories: ["进入禁区","摔倒","烟雾","明火","吸烟","长时停留"],
              series: [
                {
                  name: "目标值",
                  data: [10,4,3,0,15,23]
                },
              ]
            };
            if(val == 1) {
              res = {
                categories: ["进入禁区","摔倒","烟雾","明火","吸烟","长时停留"],
                series: [
                  {
                    name: "目标值",
                    data: [10,4,3,0,15,23]
                  },
                ]
              }
            }
            if(val == 3) {
              res = {
                categories: ["进入禁区","摔倒","烟雾","明火","吸烟","长时停留"],
                series: [
                  {
                    name: "目标值",
                    data: [32,13,5,2,23,34]
                  },
                ]
              }
            }
            if(val == 7) {
              res = {
                categories: ["进入禁区","摔倒","烟雾","明火","吸烟","长时停留"],
                series: [
                  {
                    name: "目标值",
                    data: [54,45,23,4,41,62]
                  },
                ]
              }
            }
          this.chartData = JSON.parse(JSON.stringify(res));
        }, 5000);
      },
    },
    watch: {
      range: {
        handler: function(newVal , oldVal) {
          this.chartData = {};
          this.getServerData(newVal);
        },
        immediate: true,
      }
    }
  };
  </script>
  
  <style scoped>
    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
    .charts-box {
      width: 100%;
      /* height: 300px; */
      height: 100%;
    }
  </style>