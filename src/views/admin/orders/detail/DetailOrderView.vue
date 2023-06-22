<script setup>
import SkeletonBodyVue from "../../components/SkeletonBody.vue";
import AdminLayout from "../../AdminLayout.vue";
import { useRoute } from "vue-router";
const isLoaded = ref(false);

const orderDetail = ref("");
const route = useRoute();

const getDetailOrder = async (idOrder) => {
  await axios
    .get("/admin/order/" + idOrder, { id_orden: route.params.id })
    .then((res) => {
      if (res.data.msg == "ok") {
        orderDetail.value = res.data.data;
        orderDetail.value.nombre_completo =
          orderDetail.value.nombre_orden + orderDetail.value.apellido_orden;
        isLoaded.value = true;
        return;
      }
    })
    .catch((err) => {
      toast("error", "Hubo un problema al traer la data");
      console.log(err);
    });
};

const mapEstadoOrden = (estadoOrden) => {
  if (estadoOrden == 0) return "NUEVA ORDEN";
  if (estadoOrden == 1) return "VERIFICACION";
  if (estadoOrden == 2) return "APROBADA";
  if (estadoOrden == 3) return "ENTREGADA";
  if (estadoOrden == 4) return "COMPLETADA";
  if (estadoOrden == 5) return "RECHAZADA";
};

const sendWsp = (idOrder, estadoOrden) => {
  const data = {
    id_orden: idOrder,
    estado_orden: estadoOrden,
  };

  axios.post("/admin/message_order", data).then((res) => {
    if (res.data.msg == "ok") {
      toast("success", "Los datos se actualizaron correctamente");
    } else return toast("error", "Hubo un problema al actualizar un proyecto");
  });
};

const updateStatus = (idOrder) => {
  const data = {
    id_orden: idOrder,
    estado_orden: orderDetail.value.estado_orden,
    telefono_orden: orderDetail.value.telefono_orden,
  };
  axios.post("/admin/update_order", data).then((res) => {
    if (res.data.msg == "ok") {
      toast("success", "Los datos se actualizaron correctamente");
    } else return toast("error", "Hubo un problema al actualizar un proyecto");
  });
};

getDetailOrder(route.params.id);
</script>
<template>
  <AdminLayout>
    <div class="container-flex">
      <main v-if="!isLoaded">
        <SkeletonBodyVue />
      </main>

      <main v-if="isLoaded" class="fadeIn">
        <nav aria-label="breadcrumb" class="pt-3">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/admin/orders">Órdenes</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Detalle</li>
          </ol>
        </nav>
        <h4>Detalle Orden</h4>
        <div class="card bg-dark rounded-4 p-3">
          <div class="row">
            <div class="col-12">
              <p>Nombre Completo:</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  class="form-control bg-dark text-white"
                  disabled
                  v-model="orderDetail.nombre_completo"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div class="col-12">
              <p>Email:</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                  type="text"
                  class="form-control bg-dark text-white"
                  disabled
                  v-model="orderDetail.email_orden"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div class="col-6">
              <p>Teléfono Orden: (es editable)</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-phone"></i>
                </span>
                <input
                  type="text"
                  class="form-control bg-dark text-white"
                  v-model="orderDetail.telefono_orden"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <div
                  class="btn btn-danger"
                  @click.prevent="updateStatus(orderDetail.id_orden)"
                >
                  Actualizar Teléfono
                </div>
              </div>
            </div>
            <div class="col-6"></div>

            <div class="col-6">
              <p>Documento DNI:</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-file-earmark"></i>
                </span>
                <a
                  class="form-control bg-dark text-white"
                  target="_blank"
                  :href="orderDetail.documento_dni"
                  >Ver</a
                >
              </div>
            </div>

            <div class="col-6">
              <p>Documento PDI:</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-file-earmark"></i>
                </span>
                <a
                  class="form-control bg-dark text-white"
                  target="_blank"
                  :href="orderDetail.documento_pdi"
                  >Ver</a
                >
              </div>
            </div>

            <div class="col-6">
              <p>Fecha Inicio: YYYY-MM-DD</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-calendar"></i>
                </span>
                <input
                  type="text"
                  class="form-control bg-dark text-white"
                  disabled
                  v-model="orderDetail.start_date"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div class="col-6">
              <p>Fecha Término: YYYY-MM-DD</p>
              <div class="input-group mb-3">
                <span class="input-group-text bg-dark" id="basic-addon1">
                  <i class="bi bi-calendar"></i>
                </span>
                <input
                  type="text"
                  class="form-control bg-dark text-white"
                  disabled
                  v-model="orderDetail.end_date"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div class="col-6">
              <p>Precio Total Orden:</p>
              <div class="input-group mb-3">
                <span
                  class="input-group-text bg-success text-white"
                  id="basic-addon1"
                >
                  <i class="bi bi-cash"></i>
                </span>
                <a class="form-control bg-dark text-white" target="_blank">{{
                  $filters.currencyUSD(orderDetail.precio_orden)
                }}</a>
              </div>
            </div>

            <hr />
          </div>
        </div>

        <h4 class="my-3">Estado de Orden</h4>
        <div class="card bg-dark rounded-4 p-3">
          <div class="col-6">
            <p>Estado Orden:</p>
            <div class="input-group mb-3">
              <span class="input-group-text bg-dark" id="basic-addon1">
                <i class="bi bi-truck"></i>
              </span>
              <select
                class="form-select bg-dark text-white"
                aria-label="Default select example"
                v-model="orderDetail.estado_orden"
              >
                <option value="0" class="bg-dark text-white">
                  NUEVA ORDEN
                </option>
                <option value="1" class="bg-dark text-white">
                  VERIFICACION
                </option>
                <option value="2" class="bg-dark text-white">APROBADA</option>
                <option value="3" class="bg-dark text-white">ENTREGADA</option>
                <option value="4" class="bg-dark text-white">COMPLETADA</option>
                <option value="5" class="bg-dark text-white">RECHAZADA</option>
              </select>
            </div>
          </div>
          <p>Acciones:</p>
          <div class="input-group mb-3">
            <button
              class="btn btn-primary"
              @click.prevent="updateStatus(orderDetail.id_orden)"
            >
              Actualizar
            </button>

            <button
              class="btn btn-success ms-4"
              @click.prevent="
                sendWsp(orderDetail.id_orden, orderDetail.estado_orden)
              "
            >
              Enviar WhatsApp
            </button>
          </div>
        </div>

        <h4 class="my-3">Productos de la Orden</h4>
        <div class="card bg-dark rounded-4 p-3">
          <div class="table-responsive">
            <table class="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Img</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">Precio Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderDetail.detalleOrden">
                  <th scope="row">{{ item.id_producto }}</th>
                  <td>
                    <span>
                      {{ item.nombre_producto }}

                      <template
                        v-if="item.nombres_ticket"
                        v-for="nombre in JSON.parse(item.nombres_ticket)"
                      >
                        <p>
                          {{ nombre }}
                        </p>
                      </template>
                    </span>
                  </td>
                  <td>{{ item.cantidad }}</td>
                  <td>
                    <img :src="item.img_producto" width="100" height="100" />
                  </td>
                  <td>{{ $filters.currencyUSD(item.precio_unitario) }}</td>
                  <td>
                    {{
                      $filters.currencyUSD(item.precio_unitario * item.cantidad)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </AdminLayout>
  <!--  <header>
        <NavbarComponent />
    </header>
    <main>
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <SidebarAdmin />
                <Suspense>
                    <OrdersBody />
                    <template #fallback>
                        <SkeletonBodyVue />
                    </template>
                </Suspense>
            </div>
        </div>
    </main> -->
</template>
