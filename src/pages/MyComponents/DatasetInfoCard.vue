<template>
  <md-card class="md-card-profile">
    <md-card-content>
      <h4 class="card-title">{{ Name }}</h4>
      <p class="card-description">
        Created at: {{CreatedTime}}
      </p>
      <md-button class="md-round" :class="getColorButton(buttonColor)"
        >Delete</md-button
      >
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: "datasetinfo-card",
  props: {
    Name:{
        type: String
    },
    CreatedTime: {
      type: String,
    },
    buttonColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    }
  }
};
</script>
<style></style>