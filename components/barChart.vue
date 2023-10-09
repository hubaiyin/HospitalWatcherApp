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
        result: {},
        chartData: {},
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
      this.getServerData(1);
    },
    onShow(){
      this.getServerData(1);
    },
    methods: {
      async getData(range) {
        let data = {
          defer: range
        }
        await uni.$http.get("/api/v1/alarm/query/cnt/history" , data)
        .then(res => {
          if(res.data.code !== "00000") {
            uni.showToast({
              title: "获取图表数据失败",
              duration: 1500,
              icon: "none",
            })
          }
          else {
            let temp = {
              name:[],
              data:[]
            }
            res.data.data.graph3.forEach(item => {
              temp.name.push(item.period);
              temp.data.push(item.cnt);
            });
            this.result = temp;
          }
        })
      },
      async getServerData(range) {
        let res = {
          categories: [],
          series: [
            {
              name: "各事件发生数量",
              data: []
            },
          ]
        };
        await this.getData(range);
        res.categories = this.result.name;
        res.series[0].data = this.result.data;
        setTimeout(() => {
          this.chartData = JSON.parse(JSON.stringify(res));
        }, 500);
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