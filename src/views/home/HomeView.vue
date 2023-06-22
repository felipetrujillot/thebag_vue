<script setup>
import { ref, inject } from "vue";
import axios from "axios";
import CarouselComponent from "./components/CarouselComponent.vue";
import FeatureComponent from "./components/FeatureComponent.vue";
import NavbarComponent from "../../components/NavbarComponent.vue";
import BottomComponent from "../../components/BottomComponent.vue";
import AnimatedPlaceholder from "../../components/skeleton/AnimatedPlaceholder.vue";
import FeaturePlaceHolder from "../../components/skeleton/FeaturePlaceHolder.vue";
import CardComponent from "./components/CardComponent.vue";
import CardSkeleton from "./skeleton/CardSkeleton.vue";
</script>

<template>
  <header>
    <NavbarComponent />
  </header>
  <main>
    <!--  carousel superior -->
    <Suspense>
      <CarouselComponent />
      <template #fallback>
        <div class="px-lg-5 px-0 fadeInUp">
          <AnimatedPlaceholder height="50vh" width="100%" />
        </div>
      </template>
    </Suspense>
    <!--  carousel superior -->

    <!-- cards de productos -->
    <Suspense>
      <CardComponent />
      <template #fallback>
        <CardSkeleton />
      </template>
    </Suspense>
    <!-- cards de productos -->

    <Suspense>
      <FeatureComponent />
      <template #fallback>
        <FeaturePlaceHolder />
      </template>
    </Suspense>
  </main>
  <footer>
    <BottomComponent />
  </footer>
</template>
