<template>
  <div class="h-100 w-100" style="min-height: 100vh">
    <NavbarComponent />

    <div class="d-flex">
      <SidebarAdmin />

      <div class="w-100 h-100 p-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarComponent from "../../components/NavbarComponent.vue";
import SidebarAdmin from "./components/sidebar.vue";
</script>

<style scoped></style>
