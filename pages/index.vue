<template>
  <div>
    <highcharts :options="options" ref="highcharts"></highcharts>
    <button @click="updateChart">Update Chart</button>
  </div>
</template>

<script>
import Logo from '~components/Logo.vue'
import Vue from 'vue'
import VueHighcharts from 'vue-highcharts'

Vue.use(VueHighcharts)

var chartOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Item availability 1'
  },
  subtitle: {
    text: 'Source: JDE EnterpriseOne, Forza DV910'
  },
  xAxis: {
    categories: ['Items'],
    title: {
      text: ['Item 1', 'Item 2', 'Item 3']
    }
  },
  yAxis: {
    title: {
      text: 'Availability',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' primary UOM'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Availability',
    data: [1, 3, -1]
  }]
}

export default {
  components: {
    Logo
  },
  data () {
    return { options: chartOptions }
  },
  methods: {
    updateChart () {
      var chart = this.$refs.highcharts.chart
      var newdata = [Math.floor(Math.random() * (200)) - 100, Math.floor(Math.random() * (200)) - 100, Math.floor(Math.random() * (200)) - 100]
      console.log(chart.series[0])
      chart.series[0].setData(newdata)
      chart.xAxis[0].setTitle({
        text: 'New Title'
      })
    }
  },
  head () {
    return {
      title: 'JDE Chart v1'
    }
  }
}

</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
