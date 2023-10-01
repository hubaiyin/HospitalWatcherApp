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
    props: {
        template: {
            type: Array,
            required: true,
        },
    },
    data() {
      return {
        chartData:{},
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
        this.getData();
    },
    methods: {
        getData(){
            let res = {
                series: [
                    {
                    //   data: [{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18,"labelText":"四班:18人"},{"name":"五班","value":8}]
                    data: this.template
                    }
                ]
            }
            this.chartData = JSON.parse(JSON.stringify(res))
        }
    }
  };
  </script>
  
  <style scoped>
    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */

  </style>