<template>
  <div
    class="offcanvas offcanvas-end bg-dark"
    data-bs-scroll="true"
    tabindex="-1"
    id="sidebarCart"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">
        Cart
        <h6
          class="text-white"
          v-if="carritoCompraStore.getCarritoCompra != null"
        >
          ({{ carritoCompraStore.getCarritoCompra.length }} products)
        </h6>
      </h5>
      <button
        type="button"
        class="btn-close bg-danger"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body pt-0">
      <div class="container">
        <hr class="featurette-divider" />
        <h6
          class="text-white"
          v-if="carritoCompraStore.getCarritoCompra.length == 0"
        >
          There is no products in the cart
        </h6>
        <div
          class="row"
          v-for="producto in carritoCompraStore.getCarritoCompra"
        >
          <div class="col-md-3 col-3">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg imagenProducto featurette-image img-fluid mx-auto h-100 w-100"
              style="object-fit: cover"
              :src="producto.img_producto"
            />
          </div>
          <div class="col-md-5 col-5">
            <p class="list-group-item text-sm text-muted">
              {{ producto.marca_producto }}
            </p>
            <p class="list-group-item text-sm">
              {{ producto.nombre_producto }}
            </p>

            <span v-if="producto.categoria_producto == 2">
              <p v-for="name in producto.nombresParticipantes">
                {{ name }}
              </p>
            </span>
          </div>
          <div class="col-md-4 col-4">
            <span class="text-white"
              >USD
              {{ $filters.currencyUSD(producto.precio_producto) }} /day</span
            >
            <div class="mt-4">
              <a
                @click.prevent="minusItemCartVue(producto)"
                href="#"
                class="text-white border p-1 bg-dark"
              >
                <i
                  :class="
                    producto.cantidad <= 1
                      ? 'bi bi-trash text-danger'
                      : 'bi bi-dash'
                  "
                ></i>
              </a>
              <span class="m-2 text-white">{{ producto.cantidad }}</span>
              <a
                v-if="producto.categoria_producto != 2"
                @click.prevent="addItemCartVue(producto)"
                href="#"
                class="text-white border p-1 bg-dark"
              >
                <i class="bi bi-plus"></i>
              </a>
            </div>
          </div>
          <hr class="featurette-divider m-3" />
        </div>
      </div>
    </div>
    <span class="border-top"></span>

    <div class="container text-center mb-3 mt-3">
      <div class="d-flex justify-content-between">
        <div class="text-start">
          <h5>Rent days: {{ carritoCompraStore.getDiasArriendo }}</h5>
          <h5 v-if="carritoCompraStore.getCarritoCompra.length > 0">
            Total: USD
            {{ $filters.currencyUSD(carritoCompraStore.getTotalCompra) }}
          </h5>
        </div>
        <div class="text-end">
          <router-link
            to="/buy"
            v-if="carritoCompraStore.getCarritoCompra.length != 0"
          >
            <button
              class="btn btn-lg w-10 btn-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Place Order
            </button>
          </router-link>
          <button
            v-else
            class="btn btn-lg w-10 btn-dark"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            disabled=""
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/carritoCompra";
const carritoCompraStore = useCounterStore();

const addItemCartVue = (producto) => {
  carritoCompraStore.addItemCart(producto);
};

const removeitemVue = (producto) => {
  carritoCompraStore.removeitem(producto);
};

const minusItemCartVue = (producto) => {
  carritoCompraStore.minusItemCart(producto);
};

carritoCompraStore.calcularTotal();
</script>

<style scoped>
.btn-dark {
  background-color: black !important;
}
</style>
