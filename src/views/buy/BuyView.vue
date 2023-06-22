<template>
  <header class="pb-2">
    <NavbarComponent />
  </header>

  <Suspense>
    <BuyBody />
    <template #fallback>
      <AnimatedPlaceholder height="30vh" width="100%" />
    </template>
  </Suspense>
  <BottomComponent />
</template>

<script setup>
import NavbarComponent from "../../components/NavbarComponent.vue";
import BottomComponent from '../../components/BottomComponent.vue'
import BuyBody from './BuyBody.vue'
import AnimatedPlaceholder from "../../components/skeleton/AnimatedPlaceholder.vue";
</script>

<style >
.toast-success,
.toast-error,
.toast-warning {
  background: #000;
}

.has-error {
  border-color: #ed5565;
}


.datepicker {
  background: #181818 !important;

}
</style>
