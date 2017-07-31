<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <echarts :option="option" :events="events" class="echarts-wrap"></echarts>


  </div>
</template>

<script>
  import Echarts from './echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to use v-echarts',
        option: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        events: {
          click: this.click,
          dblclick: this.dblclick,
          mousedown: this.mousedown
        }
      }
    },
    methods: {
      click (...args) {
        console.log('clicked')
        console.log(args)
      },
      dblclick (...args) {
        console.log('dblclicked')
        console.log(args)
      },
      mousedown (...args) {
        console.log('mousedown')
        console.log(args)
      }
    },
    components: {
      Echarts
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  .echarts-wrap{
    height: 400px;
    width: 50%;
  }

</style>
