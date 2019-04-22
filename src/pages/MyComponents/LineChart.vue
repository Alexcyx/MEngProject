<template>
  <chart-card
    header-animation="false"
    :chart-data="datum"
    :chart-options="options"
    chart-type="Line"
    header-icon
    chart-inside-content
    no-footer
    :background-color="color"
  >
    <template slot="chartInsideHeader">
      <div class="card-icon">
        <md-icon>timeline</md-icon>
      </div>
      <h4 class="title">
        {{chartTitle}} Line Chart
        <small>- {{subTitle}}</small>
      </h4>
    </template>
  </chart-card>
</template>

<script>
import { ChartCard } from "@/components";

export default {
  name: "line-chart",
  components: {
    ChartCard
  },
  props: {
    color: {
      type: String,
      default: "blue"
    },
    type: {
      type: String,
      required: true,
      default: "movement"
    },
    data: {
      type: Array,
      required: true
    },
    label: {
      type: Array,
      required: true
    }
  },
  created() {
    this.setType(this.type);
  },
  methods: {
    setType(type) {
      switch (type) {
        case "moveEner":
          this.chartTitle = "Body Movement";
          this.subTitle = "Energy";
          break;
        case "moveCons":
          this.chartTitle = "Body Movement";
          this.subTitle = "Consistency";
          break;
        case "voicFreq":
          this.chartTitle = "Voice";
          this.subTitle = "Frequency";
          break;
        case "voicAmpl":
          this.chartTitle = "Voice";
          this.subTitle = "Amplitude";
          break;
        default:
          break;
      }
      // this.colouredLineChart.data.series = this.data;
      // this.colouredLineChart.data.labels = this.label;
      let array = this.data[0];
      //   this.min = Math.min(...array) - 10;
      //   this.max = Math.max(...array) + 10;
      //   this.min = 0;
      //   this.max = 1;
    }
  },
  data() {
    return {
      chartTitle: "",
      subTitle: "",
      min: 0,
      max: 10,
      datum: {
        series: this.data,
        labels: this.label
      },
      options: {
        lineSmooth: this.$Chartist.Interpolation.cardinal({
          tension: 10
        }),
        axisY: {
          showGrid: true,
          offset: 40
        },
        axisX: {
          showGrid: false
        },
        low: this.min,
        high: this.max,
        showPoint: true,
        height: "300px"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.category {
  margin: 0;
}

.md-card-actions .md-layout-item {
  padding: 0;
}
</style>