<script setup>
import { RouterLink, RouterView } from "vue-router";
import CartComponent from "./components/CartComponent.vue";
//localStorage.clear();
</script>


<template>
  <RouterView />
  <CartComponent />
</template>
