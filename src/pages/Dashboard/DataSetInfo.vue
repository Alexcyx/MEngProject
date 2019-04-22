<template>
  <div>
    <div class="card">
      <testimonial-card>
        <template slot="header-icon">data_usage</template>
        <template slot="content">
          <h5 class="description">{{dataset_info.description}}</h5>
        </template>
        <template slot="footer">
          <h4 class="title">{{dataset_info.name}}</h4>
          <h6 class="category">Participants: {{dataset_info.participants}}</h6>
          <div class="avatar">
            <img
              class="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3qsHZBzwPQtPS9WaKTM7_yWDELBeBxqGVSS-TNJn5pR2Pe-yCtg"
            >
          </div>
        </template>
      </testimonial-card>
    </div>
    <paginated-table title="Badges" :table="table" @goto="gotoInfo" @delete="del"></paginated-table>
  </div>
</template>

<script>
import PaginatedTables from "@/pages/MyComponents/PaginatedTables.vue";
import { TestimonialCard } from "@/components";
import api from "../../axios.js";
export default {
  components: {
    "paginated-table": PaginatedTables,
    TestimonialCard
  },
  created() {
    api.getDataset(this.dataset_id).then(({ data }) => {
      this.dataset_info = {
        name: data.dataset_name,
        description: data.description,
        participants: data.participants
      };
    });
    this.getParticipants(this.dataset_id);
  },
  data() {
    return {
      dataset_id: this.$route.query.id,
      dataset_info: {
        name: "Dataset Name",
        description: "Here goes the description of the dataset.",
        participants: 0
      },
      table: []
    };
  },
  methods: {
    gotoInfo(to) {
      this.$router.push({
        path: "/person_info",
        query: {
          badge_id: to,
          dataset_id: this.dataset_id
        }
      });
    },
    del(id) {
      console.log("dataset_id: ", this.dataset_id);
      console.log("badge_id: ", id);
    },
    getParticipants(dataset_id) {
      api.allParticipants(dataset_id).then(({ data }) => {
        data.forEach(data => {
          this.table.push({
            id: data.badge_id,
            name: data.user_name,
            teams: data.team_id
          });
        });
      });
    }
  }
};
</script>

<style>
.card {
  padding: 0px 20px;
  padding-bottom: 30px;
}
</style>
