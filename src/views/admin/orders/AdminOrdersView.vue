<script setup>
import AdminLayout from "../AdminLayout.vue";
import axios from "axios";
import { toast } from "../../../helper.js";
import { ref, onMounted, computed } from "vue";
import SkeletonBodyVue from "../components/SkeletonBody.vue";
import { useRouter } from "vue-router";

const router = useRouter();

let listadoOrders = [];
const isLoaded = ref(false);
const inputSearch = ref("");
const foundOrders = ref([]);

const listarOrdenes = async () => {
  isLoaded.value = false;
  await axios
    .get("/admin/orders")
    .then((res) => {
      if (res.data.msg == "ok") {
        isLoaded.value = true;
        listadoOrders = res.data.listado;
        listadoOrders.forEach((element) => {
          element.nombre_estado_orden = mapEstadoOrden(element.estado_orden);
        });
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
 * Recorre el listado de órdenes y mapea la data requerida
 * @author FT
 */
const searchTable = () => {
  //si no ha buscado nada trae el objeto completo
  if (inputSearch.value.length == 0) return (foundOrders.value = listadoOrders);
  const filterProjects = listadoOrders.filter((orden) => {
    if (
      orden.id_orden == inputSearch.value ||
      orden.nombre_orden
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      orden.nombre_estado_orden
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      orden.email_orden
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      orden.created_at.toLowerCase().includes(inputSearch.value.toLowerCase())
    )
      return orden;
  });

  foundOrders.value = filterProjects;
};

const detailOrder = (idOrder) => {
  router.push({ name: "DetailOrder", params: { id: idOrder } });
};

const mapEstadoOrden = (estadoOrden) => {
  if (estadoOrden == 0) return "NUEVA ORDEN";
  if (estadoOrden == 1) return "VERIFICACIÓN";
  if (estadoOrden == 2) return "APROBADA";
  if (estadoOrden == 3) return "ENTREGADA";
  if (estadoOrden == 4) return "COMPLETADA";
  if (estadoOrden == 5) return "RECHAZADA";
};

listarOrdenes();
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
            <li class="breadcrumb-item active" aria-current="page">Órdenes</li>
          </ol>
        </nav>

        <h4>Órdenes</h4>

        <div class="card bg-dark rounded-4 p-3">
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
              v-if="foundOrders.length > 0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estado Orden</th>
                  <th>Precio</th>
                  <th>Email</th>
                  <th>Creada el</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in foundOrders"
                  :key="listadoOrders.id_orden"
                >
                  <td>{{ item.id_orden }}</td>
                  <td>
                    <div
                      class="p-2 text-center bg-primary rounded-4"
                      v-if="item.estado_orden == 0"
                    >
                      {{ item.nombre_estado_orden }}
                    </div>

                    <div
                      class="p-2 text-center bg-success rounded-4"
                      v-else-if="item.estado_orden == 4"
                    >
                      {{ item.nombre_estado_orden }}
                    </div>

                    <div class="p-2 text-center bg-secondary rounded-4" v-else>
                      {{ item.nombre_estado_orden }}
                    </div>
                  </td>
                  <td>${{ item.precio_orden }}</td>
                  <td>{{ item.email_orden }}</td>
                  <td>{{ item.created_at }}</td>
                  <th>
                    <button
                      class="btn btn-danger rounded-4"
                      @click="detailOrder(item.id_orden)"
                    >
                      Detalle
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>

            <div class="text-center p-3" v-if="foundOrders.length == 0">
              <h3>No se encontraron órdenes</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  </AdminLayout>
</template>
