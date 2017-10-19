/**
* Created by liuyongxing on 2017/6/27.
*/

<template>
  <div style="position: relative;">
    <div :class="echartsClassName"></div>
    <slot></slot>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import debounce from 'lodash.debounce'
  import Vue from 'vue'

  let EVENT_AND_ACTION_REG = /^[a-zA-Z0-9_]+$/

  // listening events
  const listenerContainer = {}
  const resizeListener = debounce(() => {
    Object.values(listenerContainer).forEach((echartsComponent) => {
      echartsComponent._doResize()
    })
  }, 120, {leading: true})
  window.addEventListener('resize', resizeListener, false)
  document.addEventListener('DOMContentLoaded', resizeListener, false)
  const unloadListener = () => {
    window.removeEventListener('resize', resizeListener)
    window.removeEventListener('DOMContentLoaded', resizeListener)
    window.removeEventListener('unload', unloadListener)
  }
  window.addEventListener('unload', unloadListener, false)

  let isObject = (obj) => {
    return obj !== null && typeof obj === 'object'
  }

  export default {
    name: 'Echarts',
    props: {
      option: Object,
      events: Object,
      theme: String,
      opts: Object,
      group: String,
      notMerge: {   //
        type: Boolean,
        default: true
      },
      lazyUpdate: {
        type: Boolean,
        default: false
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        chart: null,
        echartsClassName: 'echart-container',
        boxHeight: null,
        boxWidth: null,
        chartInstance: null
      }
    },
    watch: {
      option: {
        handler (option) {
          if (!isObject(this.chartInstance) && isObject(option)) {
            this._doInit()
          } else {
            this.setOption(option, this.notMerge, this.lazyUpdate)
          }
        },
        deep: true
      },
      group: {
        handler (group) {
          this.chartInstance.group = group
        }
      }
    },
    methods: {
      // echarts instance methods
      dispose () {
        this.invoke('dispose')
      },
      getGroup: function () {
        return this.chartInstance.group
      },
      setOption (option, notMerge, lazyUpdate) {
        this.invoke('setOption', option, notMerge, lazyUpdate)
      },
      getWidth () {
        return this.invoke('getWidth')
      },
      getHeight () {
        return this.invoke('getHeight')
      },
      getDom () {
        return this.invoke('getDom')
      },
      getOption () {
        return this.invoke('getOption')
      },
      resize (option) {
        this.invoke('resize', option)
      },
      dispatchAction (payload) {
        this.invoke('dispatchAction', payload)
      },
      on (eventName, handler, context) {
        // (eventName: string, handler: Function, context?: Object)
        this.invoke('on', eventName, handler, context)
      },
      off (eventName, handler, context) {
        this.invoke('off', eventName, handler, context)
      },
      convertToPixel (finder, value) {
        return this.invoke('convertToPixel', finder, value)
      },
      convertFromPixel (finder, value) {
        return this.invoke('convertFromPixel', finder, value)
      },
      containPixel (finder, value) {
        return this.invoke('containPixel', finder, value)
      },
      showLoading (type, opts) {
        this.invoke('showLoading', type, opts)
      },
      hideLoading () {
        this.invoke('hideLoading')
      },
      getDataURL (opts) {
        return this.invoke('getDataURL', opts)
      },
      getConnectedDataURL (opts) {
        return this.invoke('getConnectedDataURL', opts)
      },
      clear () {
        this.invoke('clear')
      },
      isDisposed () {
        return this.invoke('isDisposed')
      },
      // provide a proxy method to enchance the ability of Echarts component
      invoke (name, ...args) {
        if (!isObject(this.chartInstance)) {
          return
        }
        return this.chartInstance[name](...args)
      },
      _doInit () {
        if (!this.option || !this.option.series) {
          return
        }
        if (isObject(this.chartInstance)) {
          this.setOption(this.option, this.notMerge, this.lazyUpdate)
          return
        }

        let chartDom = this.$el.querySelector('.' + this.echartsClassName)
        if (!chartDom) {
          Vue.util.warn('[Echarts]-[ERROR] - Cannot get the echarts dom container')
          return
        }

        let chartInstance = echarts.init(chartDom, this.theme, this.opts)
        this.chartInstance = chartInstance
        if (this.group) {
          chartInstance.group = this.group
        }

        this.setOption(this.option, this.notMerge, this.lazyUpdate)
        // register echarts events
        if (isObject(this.events)) {
          Object.keys(this.events).forEach((eventName) => {
            let handler = this.events[eventName]
            if (EVENT_AND_ACTION_REG.test(eventName)) {
              if (handler && typeof handler === 'function') {
                chartInstance.on(eventName, handler)
              } else {
                Vue.util.warn('[Echarts] - The handler should be a function for event [' + eventName + ']')
              }
            } else {
              Vue.util.warn('[Echarts] - Event name [' + eventName + '] is invalid')
            }
          })
        }

        if (this.autoResize) {
          let box = this._getBoxWidthHeight()
          this.boxWidth = box.width
          this.boxHeight = box.height
          listenerContainer[chartInstance.id] = this
        }
      },
      _doResize () {
        if (this.autoResize && this.chartInstance) {
          let box = this._getBoxWidthHeight()
          if (this.boxWidth !== box.width || this.boxHeight !== box.height) {
            this.boxWidth = box.width
            this.boxHeight = box.height
            this.resize()
          }
        }
      },
      _getBoxWidthHeight () {
        let computedStyle = window.getComputedStyle(this.$el)
        let ret = {height: computedStyle.height, width: computedStyle.width}
        computedStyle = null
        return ret
      }
    },
    mounted () {
      if (this.option) {
        this._doInit()
      }
    },
    beforeDestroy () {
      if (!this.chartInstance) {
        return
      }
      delete listenerContainer[this.chartInstance.id]
      this.dispose()
    },
    // echarts global methods
    // @return {string|Array.<module:echarts~ECharts>} groupId
    connect (group) {
      return echarts.connect(group)
    },
    // @return {string} groupId
    disconnect (group) {
      echarts.disConnect(group)
    },
    dispose (target) {
      if (target) {
        echarts.dispose(target)
      }
    },
    registerMap (...args) {
      echarts.registerMap(...args)
    },
    getMap () {
      return echarts.getMap()
    },
    registerTheme (...args) {
      echarts.registerTheme(...args)
    },
    clipPointsByRect (...args) {
      return echarts.graphic.clipPointsByRect(...args)
    },
    clipRectByRect (...args) {
      return echarts.graphic.clipRectByRect(...args)
    }
  }
</script>
<style>
  .echart-container {
    min-height: 160px;
    min-width: 200px;
    width: 100%;
    height: 100%;
  }
</style>
