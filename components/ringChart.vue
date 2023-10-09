<template>
      <qiun-data-charts 
        type="ring"
        :opts="opts"
        :chartData="chartData"
        :canvas2d="true"
        canvasId="WuTrqYCMnPwHxXPfqJkQyBBqgUGzcZuk"
      />
</template>
  
  <script>
  export default {
    data() {
      return {
        chartData:{},
        result:[],
        opts: {
          rotate: false,
          rotateLock: false,
          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [5,5,5,5],
          dataLabel: true,
          enableScroll: false,
          legend: {
            show: true,
            position: "right",
            lineHeight: 25
          },
          title: {
            name: "",
            fontSize: 15,
            color: "#666666"
          },
          subtitle: {
            name: "",
            fontSize: 25,
            color: "#7cb5ec"
          },
          extra: {
            ring: {
              ringWidth: 30,
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 15,
              border: true,
              borderWidth: 2,
              borderColor: "white"
            }
          }
        }
      };
    },
    mounted() {
      this.getServerData();
    },
    onShow(){
      this.getServerData();
    },
    methods: {
      async getData() {
        await uni.$http.get("/api/v1/alarm/realtime")
        .then(res => {
          if(res.data.code !== "00000") {
            uni.showToast({
              title: "获取图表数据失败",
              duration: 1500,
              icon: "none",
            })
          }
          else {
            const temp = [
              {'name':'长时停留'  , 'value': 129},
              {'name':'进入禁区','value':res.data.data.alarmCaseTypeTotalList[0].total},
              {'name':res.data.data.alarmCaseTypeTotalList[1].caseTypeName,'value':res.data.data.alarmCaseTypeTotalList[1].total},
              {'name':res.data.data.alarmCaseTypeTotalList[2].caseTypeName,'value':res.data.data.alarmCaseTypeTotalList[2].total},
              {'name':res.data.data.alarmCaseTypeTotalList[3].caseTypeName,'value':res.data.data.alarmCaseTypeTotalList[3].total},
              {'name':res.data.data.alarmCaseTypeTotalList[4].caseTypeName,'value':res.data.data.alarmCaseTypeTotalList[4].total},
            ]
            this.result = temp;
          }
        })
      },
      async getServerData() {
        let res = {
          series:[
            {
              data:[],
            }
          ]
        }
        await this.getData();
        res.series[0].data = this.result;
        // console.log(res);
        setTimeout(() => {
          this.chartData = JSON.parse(JSON.stringify(res));
        }, 2500);
      },
    }
  };
  </script>
  
  <style scoped>
    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */

  </style>
    