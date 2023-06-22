<script setup>
import { toast } from "../../../../helper.js";
import SkeletonBodyVue from "../../components/SkeletonBody.vue";
import AdminLayout from "../../AdminLayout.vue";
import { ref } from "vue";
const isLoaded = ref(false);

const route = useRoute();
const producto = ref([]);
const imagenProducto = ref("");

const productoValidator = ref({
  nombre_producto: false,
  marca_producto: false,
  descripcion_producto: false,
  participantes_producto: false,
  precio_producto: false,
  estado: false,
  categoria_producto: false,
});

const detalleProducto = async (id_producto) => {
  await axios.get("/admin/detailProduct/" + id_producto).then((res) => {
    if (res.data.msg == "ok") {
      isLoaded.value = true;
      producto.value = res.data.producto;
    }
  });
};

/**
 * Maneja el ref del selector de imágenes, valida que sean de un formato correcto
 */
const updateImagen = () => {
  if (imagenProducto.value.files[0].type.includes("image")) {
    imagenProducto.value.files;
  } else {
    toast("error", "Sólo se permiten imágenes tipo (png, jpg, jpeg)");
  }
};

/**
 * validaciones generales para el formulario
 */
const validaProducto = () => {
  let estadoValidaciones = false;

  productoValidator.value = {
    nombre_producto: false,
    marca_producto: false,
    descripcion_producto: false,
    categoria_producto: false,
    participantes_producto: false,
    precio_producto: false,
    estado: false,
  };

  if (producto.value.nombre_producto.length === 0) {
    estadoValidaciones = true;
    productoValidator.value.nombre_producto = true;
  }
  if (producto.value.marca_producto.length === 0) {
    estadoValidaciones = true;
    productoValidator.value.marca_producto = true;
  }

  if (producto.value.descripcion_producto.length === 0) {
    estadoValidaciones = true;
    productoValidator.value.descripcion_producto = true;
  }

  if (producto.value.precio_producto.length === 0) {
    estadoValidaciones = true;
    productoValidator.value.precio_producto = true;
  }

  if (producto.value.categoria_producto === 0) {
    estadoValidaciones = true;
    productoValidator.value.categoria_producto = true;
  }

  if (
    producto.value.categoria_producto == 2 &&
    producto.value.participantes_producto == 0
  ) {
    estadoValidaciones = true;
    productoValidator.value.participantes_producto = true;
  }

  return estadoValidaciones;
};

/**
 * Post a la api para generar cambios
 */
const editarProducto = async () => {
  if (validaProducto() == true)
    return toast("warning", "Completa los campos marcados");
  const formData = new FormData();

  formData.append("imagen_producto", imagenProducto.value.files[0]);
  formData.append("id_producto", producto.value.id_producto);
  formData.append("nombre_producto", producto.value.nombre_producto);
  formData.append("marca_producto", producto.value.marca_producto);
  formData.append("descripcion_producto", producto.value.descripcion_producto);
  formData.append("categoria_producto", producto.value.categoria_producto);
  formData.append("img_producto", producto.value.img_producto);
  formData.append(
    "participantes_producto",
    producto.value.participantes_producto
  );
  formData.append("precio_producto", producto.value.precio_producto);
  formData.append("estado", producto.value.estado);
  await axios.post("editProduct", formData).then((res) => {
    if (res.data.msg == "error") return toast("warning", res.data.data);
    if (res.data.msg == "ok") {
      toast("success", res.data.data);
    }
  });
};

detalleProducto(route.params.id);
</script>

<template>
  <AdminLayout>
    <div class="container-flex">
      <main v-if="!isLoaded" class="">
        <SkeletonBodyVue />
      </main>

      <main v-if="isLoaded" class="fadeIn">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/admin/products">Productos</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Detalle Producto
            </li>
          </ol>
        </nav>
        <h4>Detalle Producto</h4>

        <div class="card bg-dark rounded-4 p-3">
          <div class="pt-3">
            <div class="row col-10">
              <div class="mb-3 col-12">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-white"
                  >Nombre Producto</label
                >
                <input
                  type="text"
                  class="form-control text-white bg-dark"
                  :class="productoValidator.nombre_producto ? 'form-error' : ''"
                  v-model="producto.nombre_producto"
                  id="exampleFormControlInput1"
                  placeholder="Nombre producto"
                />
              </div>

              <div class="mb-3 col-lg-6 col-12">
                <label class="form-label text-white bg-dark"
                  >Categoría del producto</label
                >
                <select
                  class="form-select"
                  :class="
                    productoValidator.categoria_producto ? 'form-error' : ''
                  "
                  v-model="producto.categoria_producto"
                >
                  <option selected disabled hidden value="0">
                    Elige un tipo de categoría
                  </option>
                  <option value="1" class="text-white bg-dark">Renting</option>
                  <option value="2" class="text-white bg-dark">Pasajes</option>
                  <option value="3" class="text-white bg-dark">Comida</option>
                  <option value="4" class="text-white bg-dark">
                    Servicios
                  </option>
                </select>
              </div>

              <div class="mb-3 col-lg-6 col-12">
                <template v-if="producto.categoria_producto == 2">
                  <label class="form-label text-white"
                    >Cantidad Participantes del Ticket</label
                  >
                  <input
                    type="number"
                    class="form-control text-white bg-dark"
                    :class="
                      productoValidator.participantes_producto
                        ? 'form-error'
                        : ''
                    "
                    v-model="producto.participantes_producto"
                    placeholder="Cantidad de participantes"
                  />
                </template>
              </div>

              <div class="mb-3 col-6">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-white"
                  >Marca</label
                >
                <input
                  type="text"
                  class="form-control text-white bg-dark"
                  :class="productoValidator.marca_producto ? 'form-error' : ''"
                  v-model="producto.marca_producto"
                  id="exampleFormControlInput1"
                  placeholder="Marca del producto"
                />
              </div>

              <div class="mb-3 col-6">
                <img
                  alt="image"
                  style="width: 150px; height: 150px"
                  :src="producto.img_producto"
                />
                <input
                  type="file"
                  id="formFile"
                  @change="updateImagen()"
                  ref="imagenProducto"
                />
              </div>

              <div class="mb-3 col-12">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-white"
                  >Descripción</label
                >
                <textarea
                  type="text"
                  rows="6"
                  class="form-control text-white bg-dark"
                  v-model="producto.descripcion_producto"
                  :class="
                    productoValidator.descripcion_producto ? 'form-error' : ''
                  "
                  id="exampleFormControlInput1"
                  placeholder="Descripción del producto"
                ></textarea>
              </div>

              <div class="mb-3 col-6">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-white"
                  >Precio Producto USD</label
                >
                <input
                  type="number"
                  class="form-control text-white bg-dark"
                  :class="productoValidator.precio_producto ? 'form-error' : ''"
                  v-model="producto.precio_producto"
                  id="exampleFormControlInput1"
                  placeholder="Precio del producto"
                />
              </div>

              <div class="mb-3 col-6">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-white"
                  >Estado</label
                >
                <select
                  class="form-select text-white bg-dark"
                  v-model="producto.estado"
                >
                  <option value="0" class="text-white bg-dark">
                    No activo
                  </option>
                  <option value="1" class="text-white bg-dark">Activo</option>
                </select>
              </div>

              <div class="d-flex justify-content-center pt-5">
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="editarProducto()"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </AdminLayout>
</template>
