<template>
  <hr class="featurette-divider" />
  <div class="container-flex">
    <div class="row featurette gx-5 bg-dark m-5">
      <div class="col-md-6   p-3">
        <h2 class="featurette-heading fw-normal lh-1">
          <AnimatedPlaceholder height="3vh" width="100%" />
        </h2>
        <p class="lead">
          <AnimatedPlaceholder height="25vh" width="100%" />
        </p>
      </div>
      <div class="col-md-1">
      </div>
      <div class="col-md-3 p-3">
        <AnimatedPlaceholder height="30vh" width="100%" />
      </div>
    </div>
  </div>
  <hr class="featurette-divider" />
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
  

<style scoped>
.container-flex {
  background-color: rgb(27, 31, 38);
}
</style>
