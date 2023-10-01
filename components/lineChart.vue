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
    this.getServerData();
  },
  methods: {
    getServerData(val) {
      console.log("range为：" , val);
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["00:00","06:00","09:00","12:00","17:00","20:00"],
          series: [
              {
                  name: "事件总数",
                  data: [0,3,5,9,12,23]
              },
          ] 
        };
        if (val == 1) {
          res = {
            categories: ["00:00","06:00","09:00","12:00","17:00","20:00"],
            series: [
                {
                    name: "事件总数",
                    data: [0,3,5,9,12,23]
                },
            ] 
          }
        }
        if(val == 3) {
          res = {
            categories: ["9.28","9.29","9.30"],
            series: [
                {
                    name: "事件总数",
                    data: [52,45,55]
                },
            ]
          }
        }
        if(val == 7) {
          res = {
            categories: ["9.25","9.26","9.27","9.28","9.29","9.30"],
            series: [
                {
                    name: "事件总数",
                    data: [50,42,34,52,45,55]
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
  .charts-box {
    width: 100%;
    height: 100%;
  }
</style>