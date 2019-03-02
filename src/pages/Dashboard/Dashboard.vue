<template>
<div class="content">
  <div class="md-layout">
    <div v-for="dataset in datasets" :key="dataset.id" class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <a @click="gotoInfo(dataset.id)">
        <dataset-card :id="dataset.id" :name="dataset.name" :date="dataset.date"></dataset-card>
      </a>  
    </div>
  </div>
  <paginated-table title="More Datasets" :table="table" @goto="gotoInfo"></paginated-table>
</div>
</template>

<script>
import DatasetCard from "@/pages/MyComponents/DatasetCard.vue";
import PaginatedTables from "@/pages/MyComponents/PaginatedTables.vue";
import users from "@/pages/MyComponents/users.js";
import moment from "moment";

export default {
  components: {
    DatasetCard,
    'paginated-table': PaginatedTables
  },
  data() {
    return {
      datasets: [
        {id: 1,
        name: "DataSet Name",
        date: "Jan 1 2019"},
        {id: 2,
        name: "DataSet Name",
        date: "Jan 2 2019"},
        {id: 3,
        name: "DataSet Name",
        date: "Jan 6 2019"},
        {id: 4,
        name: "DataSet Name",
        date: "Feb 2 2019"}
      ],
      table: users
    };
  },
  methods: {
    gotoInfo(to) {
      this.$router.push({
        path: '/table-list/paginated',
        query: {
          id: to
        }
      });
    }
  }
};
</script>
