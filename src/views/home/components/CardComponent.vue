<template>
  <div class="container fadeInUp">
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 align-items-stretch gy-5 py-5"
    >
      <div
        class="col"
        v-for="producto in productos"
        :key="producto.id_producto"
      >
        <div
          class="card card-cover h-100 overflow-hidden text-bg-dark m-sm-0 mx-5 shadow-lg hand bg-dark"
        >
          <div
            class="d-flex flex-column h-100 pt-0 px-0 pb-3 text-white text-shadow-1"
          >
            <div style="height: 25vh" class="container-flex">
              <img
                @click.prevent="detailProduct(producto.id_producto)"
                class="bd-placeholder-img bd-placeholder-img-lg mx-auto h-100 w-100"
                style="object-fit: cover"
                :src="producto.img_producto"
                :alt="producto.img_producto"
              />
            </div>
            <p
              @click.prevent="detailProduct(producto.idProducto)"
              class="text-start m-2 text-muted brandProduct"
              style="text-transform: uppercase"
            >
              {{ producto.marca_producto }}
            </p>
            <h4
              class="pt-0 mx-2 mb-0 lh-1 fw-bold tituloProducto"
              @click.prevent="detailProduct(producto.id_producto)"
              style="min-height: 4vh"
            >
              {{ producto.nombre_producto }}
            </h4>
            <p
              @click.prevent="detailProduct(producto.idProducto)"
              class="text-start m-2 text-muted brandProduct"
              style="text-transform: uppercase"
            >
              {{ producto.nombre_categoria }}
            </p>
            <h4
              class="card-title text-start m-2 text-danger"
              @click.prevent="detailProduct(producto.id_producto)"
            >
              USD {{ $filters.currencyUSD(producto.precio_producto)
              }}<small class="text-muted fw-light">/day </small>
            </h4>
            <ul
              class="list-unstyled text-muted descripcionProducto mt-0 text-start m-2"
              @click.prevent="detailProduct(producto.id_producto)"
            >
              <li class="text-muted">{{ producto.descripcion_producto }}</li>
            </ul>

            <div class="text-center">
              <button
                @click.prevent="addToCart(producto)"
                v-if="producto.categoria_producto === 2"
                type="button"
                class="w-70 btn btn-md btn-dark btnComprar"
              >
                Add to Cart&nbsp;<i class="ml-1 fa-solid bi-cart" />
              </button>

              <button
                @click.prevent="addToCart(producto)"
                v-else
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarCart"
                class="w-70 btn btn-md btn-dark btnComprar"
              >
                Add to Cart&nbsp;<i class="ml-1 fa-solid bi-cart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalTickets
    v-if="showModalTickets"
    :producto="productoModal"
    @cerrarModalTickets="cerrarModalTickets"
  />
</template>

<script setup>
import ModalTickets from "./ModalTickets.vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../../stores/carritoCompra";
const carritoCompraStore = useCounterStore();

const router = useRouter();
let productos = ref();

const productoModal = ref([]);
const showModalTickets = ref(false);

const cerrarModalTickets = () => {
  showModalTickets.value = false;
};

/**
 * Añade parámetros al carrito,
 * en el caso de ser categoría ticket abre modal para insertar participantes
 */
const addToCart = (producto) => {
  if (
    producto.categoria_producto === 1 ||
    producto.categoria_producto === 3 ||
    producto.categoria_producto === 4
  )
    return carritoCompraStore.addItemCart(producto);
  productoModal.value = producto;
  showModalTickets.value = true;
};

/**
 * Get de productos
 */
const getProducts = async () => {
  await axios.get("/products").then((res) => {
    productos.value = res.data.productos;
    productos.value.forEach((producto) => {
      producto.nombre_categoria = mapCategoria(producto.categoria_producto);
    });
  });
};

/**
 * Mapea la categoría que corresponda al producto
 */
const mapCategoria = (idProducto) => {
  if (idProducto === 1) return "Renting";
  if (idProducto === 2) return "Ticket";
  if (idProducto === 3) return "Food";
  if (idProducto === 4) return "Services";
  return "";
};

/**
 * Enruta a la vista de detalles
 */
const detailProduct = (idProducto) => {
  router.push({ name: "detailProduct", params: { id: idProducto } });
};

await getProducts();
</script>

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

.tituloProducto {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.nombreProducto {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
