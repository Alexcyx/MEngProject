<template>
    <stats-card :header-color=color>
        <template slot="header">
          <div class="card-icon">
            <md-icon>equalizer</md-icon>
          </div>
          <p class="category">DataSet {{id}}</p>
          <h3 class="title">
            {{name}}
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>update</md-icon>
            Created at: {{date}}
          </div>
        </template>
      </stats-card>
</template>

<script>
import StatsCard from "@/components/Cards/StatsCard.vue";
export default {
    name: "dataset-card",
    components: {
        StatsCard
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            color: "blue"
        }
    }
}
</script>
