<template>
  <div>
    <line-chart color="blue" type="moveEner" :data="data" :label="label"></line-chart>
    <h3>End time: {{value}}</h3>
    <slider :start="this.start" v-model="v" :range="{min: this.min, max: this.max}"></slider>
    <paginated-table title="Movement Detail" :table="tabledata" :show="false"></paginated-table>
  </div>
</template>

<script>
import LineChart from "@/pages/MyComponents/LineChart.vue";
import { Slider } from "@/components";
import PaginatedTables from "@/pages/MyComponents/PaginatedTables.vue";
import api from "../../axios.js";
export default {
  components: {
    LineChart,
    Slider,
    "paginated-table": PaginatedTables
  },
  data() {
    return {
      badge_id: Number.parseInt(this.$route.query.badge_id),
      dataset_id: Number.parseInt(this.$route.query.dataset_id),
      type: this.$route.query.type,
      size: 30,
      label: [],
      data: [],
      tabledata: [],
      min: 0,
      max: 100,
      date_min: 0,
      date_max: 100,
      start: 100,
      v: 100
    };
  },
  created() {
    this.getLimit();
    // this.getData();
    this.refresh();
  },
  computed: {
    value: function() {
      return Math.floor(
        this.date_min + ((this.date_max - this.date_min) / 100) * this.v
      );
    }
  },
  watch: {
    v: function(val) {
      let timestamp = Math.floor(
        this.date_min + ((this.date_max - this.date_min) / 100) * val
      );
      this.tabledata = [];
      // this.label = [];
      // this.data = [];
      this.getData(timestamp);
    }
  },
  methods: {
    getLimit() {
      let obj = {
        badge_id: this.badge_id,
        dataset_id: this.dataset_id
      };
      api.bmLimit(obj).then(({ data }) => {
        this.date_min = new Date(data[0].min).getTime();
        this.date_max = new Date(data[0].max).getTime();
        this.getData(this.date_max);
      });
    },
    getData(value) {
      let obj = {
        badge_id: this.badge_id,
        dataset_id: this.dataset_id,
        end: value,
        size: this.size
      };
      console.log(obj);
      api.getBm(obj).then(({ data }) => {
        // this.tabledata = [];
        // this.label = [];
        // this.data = [];
        console.log(this.tabledata);
        let energy = [];
        let consistency = [];
        let timestamp = [];
        data.forEach(entry => {
          energy.push(entry.energy);
          consistency.push(entry.consistency);
          this.label.push(entry.timestamp);
          this.tabledata.push({
            dataset_id: entry.dataset_id,
            badge_id: entry.badge_id,
            energy: entry.energy,
            consistency: entry.consistency,
            x: entry.x,
            y: entry.y,
            z: entry.z,
            timestamp: new Date(entry.timestamp)
          });
        });
        if (this.type == "energy") {
          this.data.push(energy.reverse());
        } else {
          this.data.push(consistency.reverse());
        }
        this.label.reverse();
        console.log(this.tabledata);
      });
    },
    refresh() {
      if (localStorage.getItem("reloaded")) {
        localStorage.removeItem("reloaded");
      } else {
        localStorage.setItem("reloaded", "1");
        location.reload();
      }
    }
  }
};
</script>

<style>
</style>

