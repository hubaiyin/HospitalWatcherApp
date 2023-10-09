<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="line"
      :opts="opts"
      :chartData="chartData"
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
      result:{},
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,10,0,15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow"
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
    async getData(range){
      let data = {
        defer: range
      }
      await uni.$http.get("/api/v1/alarm/query/cnt/history" , data)
      .then(res => {
        // console.log(res);
        if(res.data.code !== "00000") {
          uni.showToast({
            title: "获取图表数据失败",
            duration: 1500,
            icon: "none",
          })
        }
        else {
          let temp = {
            time:[],
            data:[]
          }
          res.data.data.graph1.forEach(item => {
            temp.time.push(item.period);
            temp.data.push(item.cnt);
          });
          this.result = temp;
        }
      })
    },
    async getServerData(range) {
      let res = {
        categories:[],
        series: [
          {
            name: "事件总数",
            data: []
          }
        ]
      }
      await this.getData(range);
      res.categories = this.result.time;
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
  .charts-box {
    width: 100%;
    height: 100%;
  }
</style>