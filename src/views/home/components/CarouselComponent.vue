<template>
  <div class="px-lg-5 px-0 fadeInUp">
    <div id="carouselExampleIndicators" class="carousel slide rounded" data-bs-ride="true">
      <div class="carousel-indicators">
        <button v-for="(banner, index) in banners" type="button" data-bs-target="#carouselExampleIndicators"
          :data-bs-slide-to="`${index}`" :class="`${index == 0 ? 'active' : ''}`"
          :aria-current="index == 0 ? 'true' : 'false'" aria-label="Slide 1"></button>
      </div>
      <div class="carousel-inner">
        <div v-for="(banner, index) in banners" :class="`carousel-item ${index == 0 ? 'active' : ''}`">
          <div class="imgbanner">
            <img style="height: 50vh; object-fit: cover" :src="banner.img_banner" :alt="banner.img_banner"
              class="d-block w-100" />
          </div>
          <div class="carousel-caption">
            <h1 v-if="banner.nombre_banner != null" class="pb-3">
              {{ banner.nombre_banner }}
            </h1>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

let banners = ref();
try {
  await axios.get("/banners").then((res) => {
    banners = res.data.banners;
  });
} catch (error) {
  console.log(error);
}
</script>

<style scoped>
.imgbanner {
  background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);
}


#carouselExampleIndicators {

  background-color: rgb(27, 31, 38);

}
</style>
