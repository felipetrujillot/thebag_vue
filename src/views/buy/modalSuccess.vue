<template>
  <!-- Modal -->
  <div class="modal fade" id="modalSuccess" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content  bg-dark">
        <div class="modal-header text-center">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Order Status</h1>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"
            @click.prevent="salir()"></button>
        </div>
        <div class="modal-body ">
          <h3 class="pb-3">
            Your order has been received!
          </h3>
          <p>
            Our team will begin processing right away.
          </p>
          <p>
            You will receive an order confirmation shortly at your email or
            phone
            via WhatsApp.
          </p>

          <p>Your order number is: <a :href="'https://thebag.cl/order/' + props.modalSuccessInfo.token" target="_blank">{{
            props.modalSuccessInfo.token }}</a>.</p>


        </div>

        <div class="modal-footer">
          <button class="btn btn-primary text-center" @click.prevent="salir()">
            Okay
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useCounterStore } from '../../stores/carritoCompra'
import { useRouter } from "vue-router"
import { showModal, closeModal } from "../../helper";

const props = defineProps(['modalSuccessInfo'])

console.log(props);

const router = useRouter();
const carritoCompraStore = useCounterStore()

const emit = defineEmits(['cerrarModal'])

const salir = () => {
  emit('cerrarModal')
  carritoCompraStore.vaciarCarrito()
  router.push({ name: "home" })
}


onMounted(() => {
  showModal("modalSuccess")
})
onUnmounted(() => {
  closeModal()
})
</script>