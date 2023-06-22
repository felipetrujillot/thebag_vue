<script setup>
import axios from "axios";
import { ref } from "vue";

var portadas = ref();

try {
  await axios.get("/portadas").then((res) => {
    portadas = res.data.portadas;
  });
} catch (error) {
  console.log(error);
}
</script>

<template>
  <hr class="featurette-divider" />
  <div v-for="(portada, key) in portadas">
    <div class="container-flex">
      <div class="row featurette gx-5 bg-dark m-5">
        <div class="col-md-6 p-3">
          <h2 class="featurette-heading fw-normal lh-1 text-white">
            {{ portada.titulo_portada }}
          </h2>
          <p class="lead">
            {{ portada.subtitulo_portada }}
          </p>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3 p-3">
          <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto h-100 w-100"
            style="object-fit: cover; max-height: 40vh" :src="portada.img_portada" :alt="portada.img_portada" />
        </div>
      </div>
    </div>
    <hr class="featurette-divider" />
  </div>
</template>


