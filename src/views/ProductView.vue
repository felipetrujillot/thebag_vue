<script setup>
import axios from "axios";
import { ref } from "vue";
import ProductsComponent from "../components/ProductsComponent.vue";
import AnimatedPlaceholder from "../components/skeleton/AnimatedPlaceholder.vue";
import CartComponent from "../components/CartComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import { useCounterStore } from '../stores/carritoCompra'

</script>
<template>
  <header>
    <NavbarComponent />
  </header>
  <div>
    <div class="row">
      <div class="col bg-secondary">
        <Suspense>
          <ProductsComponent @addItemCart="addItemCartVue"></ProductsComponent>
          <template #fallback>
            <AnimatedPlaceholder height="50vh" width="100%" />
          </template>
        </Suspense>

      </div>
    </div>
  </div>
</template>

<style scoped>
.card:hover {
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 60%) !important;
  transition: transform 0.2s;
  transform: scale(1.05);
}

.brandProduct {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.descripcionProducto {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
