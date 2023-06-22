<script setup>
import axios from "axios";
import { toast, dataTables } from "../../../helper.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const inventoryList = ref([]);
const router = useRouter();
const listarOrdenes = async () => {
  const data = {};
  await axios
    .get("getInventory")
    .then((res) => {
      if (res.data.msg == "ok") {
        inventoryList.value = res.data.data;
        return;
      }

      console.log(res.data);
    })
    .catch((err) => {
      toast("error", "Hubo un problema al traer la data");
      console.log(err);
    });
};

const routerEditar = (id_producto) => {
  router.push({ name: "editarproducto", params: { id: id_producto } });
};

await listarOrdenes();
onMounted(() => {
  //dataTables("#orderList")
});
</script>

<template>
  <div class="col pt-5">
    <div class="row pt-5 justify-content-center">
      <div class="col-10" style="background-color: #1d2730; padding: 10px">
        <table id="orderList" class="table table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Serial Number</th>
              <th>estado</th>
              <th>nombre_producto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in inventoryList"
              :key="inventoryList.id_inventario"
            >
              <td>{{ item.id_inventario }}</td>
              <td>{{ item.serial_number }}</td>
              <td>{{ item.estado }}</td>
              <td>
                <a href="#">
                  {{ item.nombre_producto }}
                </a>
              </td>
              <th>
                <button
                  class="btn btn-primary ml-2"
                  @click="routerEditar(item.id_producto)"
                >
                  Ver Producto
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
