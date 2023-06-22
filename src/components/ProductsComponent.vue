<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let productos = ref();

try {
  await axios.get("/products").then((res) => {
    productos = res.data.productos;
    console.log(res.data.productos);
  });
} catch (error) {
  console.log(error);
}

defineEmits(["addItemCart"]);

const detailProduct = (idProducto) => {
  console.log("aa");
  router.push({ name: "detailProduct", params: { id: idProducto } });
};

</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 mb-3  text-center m-5">


    <div v-for="producto in productos" class="col-md-2">
      <div class="card mb-4 rounded-3 shadow-lg ">
        <div class="card-body" style="padding: 0 !important">
          <div style="height: 25vh">
            <img @click.prevent="detailProduct(producto.idProducto)"
              class="bd-placeholder-img bd-placeholder-img-lg imagenProducto featurette-image img-fluid mx-auto h-100 w-100"
              style="object-fit: cover" :src="producto.imgProducto" />
          </div>
          <p class="text-start m-2 text-muted brandProduct" style="text-transform: uppercase">
            {{ producto.marcaProducto }}
          </p>

          <h4 class="card-title pricing-card-title text-start m-2">
            ${{ producto.precioProducto }}<small class="text-muted fw-light">/day</small>
          </h4>
          <ul class="list-unstyled descripcionProducto mt-3 mb-4 text-start m-2">
            <li>{{ producto.descripcionProducto }}</li>
          </ul>
          <button @click.prevent="$emit('addItemCart', producto)" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" type="button"
            class="w-70 btn btn-lg btn-secondary mb-3" :disabled="producto.inventarioDisponible <= 0">
            Add to Cart
          </button>
        </div>
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
