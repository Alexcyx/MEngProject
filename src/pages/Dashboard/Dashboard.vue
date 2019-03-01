<template>
<div class="content">
  <div class="md-layout">
    <div v-for="dataset in datasets" :key="dataset.id">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <dataset-card :id="dataset.id" :name="dataset.name" :date="dataset.date"></dataset-card>  
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import DatasetCard from "@/pages/MyComponents/DatasetCard.vue";

export default {
  components: {
    DatasetCard
  },
  data() {
    return {
      datasets: [
        {id: 1,
        name: "1",
        date: "Jan 1 2019"},
        {id: 2,
        name: "3",
        date: "Jan 2 2019"},
        {id: 2,
        name: "3",
        date: "Jan 2 2019"},
        {id: 2,
        name: "3",
        date: "Jan 2 2019"}
      ]
    };
  }
};
</script>
