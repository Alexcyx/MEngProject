<template>
<div class="content">
  <div class="md-layout">
    <person-info></person-info>
  </div>
  </div>
</template>

<script>
import PersonInfo from "@/components/MyComponents/PersonInfo.vue";

export default {
  components: {
    'person-info': PersonInfo
  }
  
};
</script>
