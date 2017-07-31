/**
 *
 * Created by yongxing.liu on 2017/6/31.
 */
import Echarts from './Echarts.vue'

/* istanbul ignore next */
Echarts.install = function (Vue) {
  Vue.component(Echarts.name, Echarts)
}

export default Echarts
