<script setup>
import axios from "axios";
import { ref } from "vue";
import NavbarComponent from "../../components/NavbarComponent.vue";
import { useRoute } from "vue-router";
import { useCounterStore } from '../../stores/carritoCompra'

const carritoCompraStore = useCounterStore()

const route = useRoute();

const producto = ref("");
const imagenesProducto = ref(true);
const imagenPrincipal = ref("");
console.log();

const getDetail = async (id_producto) => {
    await axios
        .get("/detailProduct/" + route.params.id, {
        })
        .then((res) => {
            if (res.data.msg == "ok") {
                console.log(res.data);
                producto.value = res.data.producto;
                imagenesProducto.value = res.data.img_producto;
                imagenPrincipal.value = res.data.producto.img_producto;
            }
        }).catch((error) => {
            console.log(error);

        })
}

await getDetail(route.params.id)

const cambiarImagen = (url) => {
    imagenPrincipal.value = url
}
</script>
<template>
    <div class="container pt-5 fadeInUp">
        <div class="row row-cols-1 row-cols-md-2 mb-3 text-center align-items-center">
            <div class="col-md-4">
                <div class="rounded-3 shadow-lg">
                    <div class="card-body" style="padding: 0 !important">
                        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto h-100 w-100"
                            style="object-fit: cover" :src="imagenPrincipal" />
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-3 col-md-3 border border-dark m-1 border-3 cuadroImagen"
                        style="--bs-border-opacity: 0.5">
                        <a href="#" class="nav-link"><img :src="producto.img_producto" style="width: -webkit-fill-available"
                                @click="cambiarImagen(producto.img_producto)" /></a>
                    </div>
                    <div v-for="items in imagenesProducto" key="imagenesProducto.idImagenProducto"
                        class="col-3 col-md-3 border border-dark m-1 border-3 cuadroImagen"
                        style="--bs-border-opacity: 0.5">
                        <a href="#" class="nav-link"><img :src="items.url_imagen" @click="cambiarImagen(items.url_imagen)"
                                style="width: -webkit-fill-available" /></a>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <h1 class="card-title  text-start">
                    {{ producto.nombre_producto }}
                </h1>
                <h1 class="text-start text-muted" style="text-transform: uppercase">
                    {{ producto.marca_producto }}
                </h1>
                <h4 class="card-title pricing-card-title fs-4 text-start">
                    USD {{ $filters.currencyUSD(producto.precio_producto) }}<small class="text-muted fw-light"> /day</small>
                </h4>
                <ul class="list-unstyled mt-3 mb-4 text-start">
                    <li>{{ producto.descripcion_producto }}</li>
                </ul>
                <div>
                    <div class="w-100 text-center">
                        <button @click.prevent="carritoCompraStore.addItemCart(producto)" type="button"
                            data-bs-toggle="offcanvas" data-bs-target="#sidebarCart"
                            class="w-70 btn btn-md btn-dark btnComprar">
                            Add to Cart&nbsp;<i class="ml-1 fa-solid bi-cart" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card:hover {
    transition: transform 0.2s;
    transform: scale(1.05);
}

.cuadroImagen:hover {
    box-shadow: 0 1rem 2rem rgb(0 0 0 / 20%) !important;
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

.btn-dark {
    background-color: black !important;
}
</style>
