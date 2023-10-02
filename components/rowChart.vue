<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="bar"
      :opts="opts"
      :chartData="chartData"
      :canvas2d="true"
      canvasId="kbpyNAwnfJhsqovOQuyYjtuAwHDWDyuB"
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
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,30,0,5],
        enableScroll: false,
        legend: {},
        xAxis: {
          boundaryGap: "justify",
          disableGrid: false,
          min: 0,
          axisLine: false,
          max: 40
        },
        yAxis: {},
        extra: {
          bar: {
            type: "group",
            width: 30,
            meterBorde: 1,
            meterFillColor: "#FFFFFF",
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            linearType: "custom",
            barBorderCircle: true,
            seriesGap: 2,
            categoryGap: 2
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
      setTimeout(() => {
        let res = {
            categories: ["急诊大厅","病房1楼走廊","病房2楼走廊","发热门诊大厅","精神科走廊"],
            series: [
              {
                name: "各区域报警事件数量",
                data: [12,3,5,18,2]
              }
            ]
        };
        if(val == 1) {
            res = {
                categories: ["急诊大厅","病房1楼走廊","病房2楼走廊","发热门诊大厅","精神科走廊"],
                series: [
                    {
                        name: "各区域报警事件数量",
                        data: [12,3,5,18,2]
                    }
                ]
            }
        }
        if(val == 3) {
            res = {
                categories: ["急诊大厅","病房1楼走廊","病房2楼走廊","发热门诊大厅","精神科走廊"],
                series: [
                    {
                        name: "各区域报警事件数量",
                        data: [35,23,43,33,15]
                    }
                ]
            }
        }
        if(val == 7) {
            res = {
                categories: ["急诊大厅","病房1楼走廊","病房2楼走廊","发热门诊大厅","精神科走廊"],
                series: [
                    {
                        name: "各区域报警事件数量",
                        data: [45,35,45,38,20]
                    }
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
    height: 100%;
}
</style>