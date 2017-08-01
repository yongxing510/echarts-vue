# echarts-vue

> Echarts(3.x) component for vue.js(2.x)

## Features
1. Simple, lightweight, efficient, scalable;
2. Support for importing ECharts.js components on demand;
3. Support for binding events on-demand;
4. Provide an optimized resize event for updating view;
5. Provide an extension method (invoke) to deal with the future api of echarts.

## Installation
Currently there are **three ways** to install the echarts-vue component for your application.

**1. Manual**

Download and copy the echarts-vue bundle file ([v-echarts-full.js][1]) into your project, then include it in your HTML file. eg.
```
<script type="text/javascript" src="./v-echarts-full.js"></script>
```

**2. npm**
```
npm install echarts-vue
```

**3. bower**
```
bower install echarts-vue
```

## Usage
**1. Manual**

Download ([vue.min.js][2]) and ([v-echarts-full.js][3]) and include it in your HTML file (eg. index.html). eg.
```
<!DOCTYPE html>
<html>
<head>
	<title>echarts-vue</title>
	<script type="text/javascript" src="./vue.min.js"></script>
	<script type="text/javascript" src="./v-echarts-full.js"></script>
</head>
<body>
<div id="app">
    {{ message }}
    <echarts :option="option" style="width: 50%; height: 400px;"></echarts>
  </div>

  <script>
    ECharts.default.install(Vue)
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!',
        option: {
            title: {
                text: 'ECharts-vue entry example'
            },
            tooltip: {},
            legend: {
                data:['Sales']
            },
            xAxis: {
                data: ['shirt','cardign','chiffon shirt','pants','heels','socks']
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
      }
    })
  </script>
</body>
</html>
```
Then, you can open index.html in your chrome.

**2. ES modules with npm & vue-loader (Recommended)**

importing echarts on demand

***import & register***
```
import Echarts from 'echarts-vue'
Echarts.install(Vue)
```
### In main.js file which will look like:
```
import Vue from 'vue'
import App from './App.vue'

// import & register
import Echarts from 'echarts-vue'
Echarts.install(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    demo: App
  },
  render: h => h(App)
})
```
### In App.vue file which will look like:
```
<template>
  <div>
    <echarts :option="option" :events="events" style="width:50%;height:420px;"></echarts>
 </div>
 </template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default {
  data () {
    return {
      option: {
            title: {
                text: 'ECharts-vue entry example'
            },
            tooltip: {},
            legend: {
                data:['Sales']
            },
            xAxis: {
                data: ['shirt','cardign','chiffon shirt','pants','heels','socks']
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        },
        events: {
            click: this.click
        }
    }
  },
  methods: {
      click (data) {
          console.log(data)
      }
  }
}
</script>
```

**3. ES modules with npm & vue-loader (with full echarts bundle,  not recommended)**

### In main.js file which will look like:
```
import Vue from 'vue'
import App from './App.vue'

// import & register
import Echarts from 'echarts-vue/src/components/echarts/index-full.js'
Echarts.install(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    demo: App
  },
  render: h => h(App)
})
```

### In App.vue file which will look like:
```
<template>
  <div>
    <echarts :option="option" :events="events" style="width:50%;height:420px;"></echarts>
 </div>
 </template>

<script>

export default {
  data () {
    return {
      option: {
            title: {
                text: 'ECharts-vue entry example'
            },
            tooltip: {},
            legend: {
                data:['Sales']
            },
            xAxis: {
                data: ['shirt','cardign','chiffon shirt','pants','heels','socks']
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        },
        events: {
            click: this.click
        }
    }
  },
  methods: {
      click (data) {
          console.log(data)
      }
  }
}
</script>
```

## Properties

* `option` **[required, reactive]**

  Used to update data for ECharts instance. Modifying this property will trigger ECharts' `setOption` method.

* `events` [Optional]

Event-handling functions are mainly added through on in ECharts. Binding events on demand. The property of events will look like:
```
{
  "click": handler_function(){},
  "dblclick": handler_function(){},
  "mouseover": handler_function(){},
  "mouseout": handler_function(){},
  "mousedown": handler_function(){},
  "mouseup": handler_function(){},
  "globalout": handler_function(){},
  ......
}
```

* `theme` & `opts` [Optional]

Used to creates an ECharts instance
 `theme` : [Optional]
   Theme to be applied. This can be a configuring object of a theme, or a
 theme name registered through echarts.registerTheme.

`opts` : [Optional]

which may contain:

> *devicePixelRatio* : Ratio of one physical pixel to the size of one device independent pixels. Browser's window.devicePixelRatio is used by default.

> *renderer* : The renderer only supports 'canvas' by now.
> *width* :  Specify width explicitly, in pixel. If setting to null/undefined/'auto', width of dom (instance container) will be used.
> *height* : Specify height explicitly, in pixel. If setting to null/undefined/'auto', height of dom (instance container) will be used.


* `group` [Optional]

  This property is automatically bound to the same property of the ECharts instance.

* `not-merge` [Optional, default: true]

  This property indicates ECharts states whether not to merge with previous option; true by defualt, stating not merging.

* `lazy-update` [Optional, default: false]

  This property indicates ECharts states whether not to update chart immediately; false by defualt, stating update immediately.

* `auto-resize` [Optional, default: true]

  This property indicates ECharts instance should be resized automatically whenever the window is resized.

### Instance Methods

* `getGroup`
* `setOption` [ user should not call this method in most cases ]
* `getWidth`
* `getHeight`
* `getDom`
* `getOption`
* `resize` [ user should not call this method in most cases, invoked by instance automatically ]
* `dispatchAction`
* `on`
* `off`
* `convertToPixel`
* `convertFromPixel`
* `containPixel`
* `showLoading`
* `hideLoading`
* `getDataURL`
* `getConnectedDataURL`
* `clear` [ user should not call this method in most cases]
* `isDisposed`
* `dispose` [ *invoked by echarts-vue component, user should not call this method* ]
* `invoke` [ **This method like a reflection method in Java. The invoke method provides  strong ability to cater to the future method of Echarts**. ]
```
// invoke usage:

echartsVueComponent.invoke('setOption', option, notMerge, lazyUpdate)

// is equivalent to

echartsVueComponent.setOption(option, notMerge, lazyUpdate)
```

### Static Methods

* `connect`
* `disconnect`
* `dispose`
* `registerMap`
* `getMap`
* `registerTheme`
* `clipPointsByRect`
* `clipRectByRect`

### Events

ECharts-Vue support the following events:

* Mouse events
  * `click`
  * `dblclick`
  * `mouseover`
  * `mouseout`
  * `mousedown`
  * `mouseup`
  * `globalout`

* `legendselectchanged`
* `legendselected`
* `legendunselected`
* `datazoom`
* `datarangeselected`
* `timelinechanged`
* `timelineplaychanged`
* `restore`
* `dataviewchanged`
* `magictypechanged`
* `geoselectchanged`
* `geoselected`
* `geounselected`
* `pieselectchanged`
* `pieselected`
* `pieunselected`
* `mapselectchanged`
* `mapselected`
* `mapunselected`
* `axisareaselected`
* `brush`
* `brushselected`

For further details, see [ECharts' API documentation]([\[https://ecomfe.github.io/echarts-doc/public/en/api.html#events\]][4]).



## Build Setup & Local Development

``` bash
# install dependencies
npm install

# serve examples with hot reload at localhost:8080
npm run dev

# build for production with minification (v-echarts-full.js)
npm run dist


```


  [1]: https://github.com/yongxing510/echarts-vue/blob/master/bundle/v-echarts-full.js
  [2]: https://github.com/vuejs/vue/blob/dev/dist/vue.min.js
  [3]: https://github.com/yongxing510/echarts-vue/blob/master/bundle/v-echarts-full.js
  [4]: https://ecomfe.github.io/echarts-doc/public/en/api.html#events
