<template>
  <div class="content">
    <div class="md-layout">
      <!-- <button @click="del(1)">test</button> -->
      <div
        v-for="dataset in datasets"
        :key="dataset.dataset_id"
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <a @click="gotoInfo(dataset.dataset_id)">
          <dataset-card
            :id="dataset.dataset_id"
            :name="dataset.dataset_name"
            :date="dataset.created_time"
          ></dataset-card>
        </a>
      </div>
    </div>
    <paginated-table title="More Datasets" :table="moreDatasets" @goto="gotoInfo" @delete="del"></paginated-table>
  </div>
</template>

<script>
import DatasetCard from "@/pages/MyComponents/DatasetCard.vue";
import PaginatedTables from "@/pages/MyComponents/PaginatedTables.vue";
import users from "@/pages/MyComponents/users.js";
import moment from "moment";
import api from "../../axios.js";
import example from "../../dataset.js";

export default {
  components: {
    DatasetCard,
    "paginated-table": PaginatedTables
  },
  created() {
    // this.del();
    this.getDataset();
  },
  data() {
    return {
      moreDatasets: [],
      datasets: []
    };
  },
  methods: {
    gotoInfo(to) {
      this.$router.push({
        path: "/dataset_info",
        query: {
          id: to
        }
      });
    },
    del(id) {
      console.log("dataset_id: ", id);
      console.log(example);
      api.initialize(example).then(({ data }) => {
        console.log(data.success);
      });
    },
    getDataset() {
      api.allDatasets().then(({ data }) => {
        if (data.length < 4) {
          this.datasets = data;
        } else {
          this.datasets = data.slice(0, 4);
          data.slice(4).forEach(data => {
            this.moreDatasets.push({
              id: data.dataset_id,
              name: data.dataset_name,
              teams: data.teams,
              participants: data.participants
            });
          });
        }
      });
    }
  }
};
</script>
