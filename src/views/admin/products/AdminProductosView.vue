<script setup>
import axios from "axios";
import { toast } from "../../../helper.js";
import { ref } from "vue";
import SkeletonBodyVue from "../components/SkeletonBody.vue";
import AdminLayout from "../AdminLayout.vue";
import ModalNuevoProducto from "./ModalNuevoProducto.vue";

let productsList = [];
const router = useRouter();
const isLoaded = ref(false);

const foundProducts = ref([]);
const modalNuevo = ref(false);
const inputSearch = ref("");
const cerrarModalNuevo = () => (modalNuevo.value = !modalNuevo.value);

const traerProductos = async () => {
  isLoaded.value = false;

  await axios
    .get("getProducts")
    .then((res) => {
      if (res.data.msg == "ok") {
        isLoaded.value = true;
        productsList = res.data.productos;
        searchTable();
        return;
      }
      console.log(res.data);
    })
    .catch((err) => {
      toast("error", "Hubo un problema al traer la data");
      console.log(err);
    });
};

/**
 * Recorre el listado de productos y mapea la data requerida
 * @author FT
 */
const searchTable = () => {
  if (inputSearch.value.length == 0)
    return (foundProducts.value = productsList);
  const filteredProducts = productsList.filter((producto) => {
    if (
      producto.id_producto == inputSearch.value ||
      producto.nombre_producto
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      producto.marca_producto
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
      return producto;
  });

  foundProducts.value = filteredProducts;
};

const routerEditar = (id_producto) => {
  router.push({ name: "editarproducto", params: { id: id_producto } });
};

traerProductos();
</script>

<template>
  <AdminLayout>
    <div class="container-flex">
      <main v-if="!isLoaded">
        <SkeletonBodyVue />
      </main>

      <main v-if="isLoaded" class="fadeIn">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              Productos
            </li>
          </ol>
        </nav>

        <h4>Productos</h4>

        <div class="card bg-dark rounded-4 p-3">
          <div class="my-2">
            <button class="btn btn-primary" @click="modalNuevo = !modalNuevo">
              Nuevo Producto
            </button>
          </div>
          <div class="d-flex justify-content-end my-3">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control bg-dark text-white"
                placeholder="Búsqueda"
                v-model="inputSearch"
                @keyup="searchTable()"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span
                class="input-group-text bg-dark text-white"
                id="basic-addon1"
              >
                <i class="bi bi-search"></i>
              </span>
            </div>
          </div>

          <div class="table-responsive">
            <table
              class="table table-dark table-hover"
              v-if="foundProducts.length > 0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Producto</th>
                  <th>Marca</th>
                  <th>Img</th>
                  <th>Precio Producto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in foundProducts" :key="item.id_producto">
                  <td>{{ item.id_producto }}</td>
                  <td>{{ item.nombre_producto }}</td>
                  <td>{{ item.marca_producto }}</td>
                  <td>
                    <img
                      :src="item.img_producto"
                      class="imgProducto"
                      height="100"
                      width="100"
                    />
                  </td>
                  <td>USD ${{ item.precio_producto }}</td>
                  <td>{{ item.estado == 1 ? "Activo" : "No Activo" }}</td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="routerEditar(item.id_producto)"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="text-center p-3" v-if="foundProducts.length == 0">
              <h3>No se encontraron órdenes</h3>
            </div>
          </div>
        </div>
        <ModalNuevoProducto
          v-if="modalNuevo"
          @cerrarModalNuevo="cerrarModalNuevo"
        />
      </main>
    </div>
  </AdminLayout>
</template>

<style scoped>
.imgProducto {
  object-fit: contain;
}
</style>
