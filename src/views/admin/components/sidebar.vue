<template>
  <!-- SIDEBAR DESKTOP-->
  <div
    class="d-flex flex-nowrap d-none d-sm-none d-md-block ms-0 ps-0 bigSidebar bg-black"
  >
    &nbsp;
    <nav
      class="d-flex flex-column flex-shrink-0 h-100 top-0 position-fixed bigSidebar pt-3"
      style="z-index: 0"
    >
      <div class="my-5 px-3"></div>

      <router-link
        to="/admin/orders"
        class="p-3 my-2 text-white rounded-4 hoverRed"
        :class="uri_admin == 'orders' ? 'bg-danger' : null"
      >
        <h6>Órdenes</h6>
      </router-link>

      <router-link
        to="/admin/products"
        class="p-3 my-2 text-white rounded-4 hoverRed"
        :class="uri_admin == 'products' ? 'bg-danger' : null"
      >
        <h6>Productos</h6>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
const split_url = window.location.href.split("/");
const uri = split_url[3];
const uri_admin = split_url[4];
</script>

<style scoped>
.contenidoSidebar {
  position: fixed;
}

.bigSidebar {
  min-width: 280px !important;
  max-width: 280px !important;
}

.hoverRed:hover {
  background-color: #dc3545;
}

.active {
  background-color: #0b5ed7 !important;
}
</style>
