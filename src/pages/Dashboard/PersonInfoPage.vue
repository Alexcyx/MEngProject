<template>
  <div class="content">
    <div class="card">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <md-icon>contacts</md-icon>
          </div>
          <p class="category">Dataset ID: {{dataset_id}}</p>
          <h3 class="title">Badge ID: {{badge_id}} , Name: {{name}}</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>business</md-icon>
            Team: {{team}}
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-size-50 md-small-size-100">
        <a @click="movementDetail('energy')">
          <line-chart
            color="blue"
            type="moveEner"
            :data="movementData.energy"
            :label="movementData.label"
            :key="1"
          ></line-chart>
        </a>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <line-chart
          color="green"
          type="moveCons"
          :data="movementData.consistency"
          :label="movementData.label"
          :key="2"
        ></line-chart>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <line-chart
          color="warning"
          type="voicAmpl"
          :data="voiceData.amplitude"
          :label="voiceData.label"
          :key="3"
        ></line-chart>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <line-chart
          color="blue"
          type="voicFreq"
          :data="voiceData.frequency"
          :label="voiceData.label"
          :key="4"
        ></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from "@/components/Cards/StatsCard.vue";
import LineChart from "@/pages/MyComponents/LineChart.vue";
import api from "../../axios.js";
export default {
  components: {
    StatsCard,
    LineChart
  },
  created() {
    this.getBadge();
    this.getData();
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
  data() {
    return {
      color: "blue",
      badge_id: Number.parseInt(this.$route.query.badge_id),
      dataset_id: Number.parseInt(this.$route.query.dataset_id),
      name: "Name",
      team: 1,
      movementData: {
        label: [],
        energy: [],
        consistency: []
      },
      voiceData: {
        label: [],
        amplitude: [],
        frequency: []
      }
    };
  },
  methods: {
    getBadge() {
      api
        .getBadge({
          badge_id: this.badge_id,
          dataset_id: this.dataset_id
        })
        .then(({ data }) => {
          this.name = data.user_name;
        });
    },
    getData() {
      let time = new Date().getTime();
      let obj = {
        badge_id: this.badge_id,
        dataset_id: this.dataset_id,
        end: new Date().setTime(time),
        start: 0,
        size: 30
      };
      api.getBm(obj).then(({ data }) => {
        let energy = [];
        let consistency = [];
        let timestamp = [];
        data.forEach(entry => {
          energy.push(entry.energy);
          consistency.push(entry.consistency);
          this.movementData.label.push(entry.timestamp);
        });
        this.movementData.energy.push(energy.reverse());
        this.movementData.consistency.push(consistency.reverse());
        this.movementData.label.reverse();
      });
      let obj2 = {
        badge_id: this.badge_id,
        dataset_id: this.dataset_id,
        end: new Date().setTime(time),
        start: 0,
        size: 30
      };
      api.getVoice(obj2).then(({ data }) => {
        let frequency = [];
        let amplitude = [];
        let timestamp = [];
        data.forEach(entry => {
          frequency.push(entry.frequency);
          amplitude.push(entry.amplitude);
          this.voiceData.label.push(entry.timestamp);
        });
        this.voiceData.frequency.push(frequency.reverse());
        this.voiceData.amplitude.push(amplitude.reverse());
        this.voiceData.label.reverse();
      });
    },
    movementDetail(t) {
      this.$router.push({
        path: "/movement_detail",
        query: {
          badge_id: this.badge_id,
          dataset_id: this.dataset_id,
          type: t
        }
      });
    }
  }
};
</script>

<style scoped>
.card {
  padding: 0px 20px;
  padding-bottom: 30px;
}
</style>
