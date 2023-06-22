<template>
  <div class="modal show d-block fadeIn" id="modalNuevoProducto" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title text-white">Nuevo Producto</h5>
          <button
            type="button"
            class="btn-close bg-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('cerrarModalNuevo')"
          ></button>
        </div>

        <div class="modal-body text-white">
          <div class="row">
            <div class="mb-3 col-12">
              <label class="form-label text-white">Nombre Producto</label>
              <input
                type="text"
                class="form-control text-white bg-dark"
                :class="productoValidator.nombre_producto ? 'form-error' : ''"
                v-model="producto.nombre_producto"
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
                <option value="2" class="text-white bg-dark">
                  Tickets Pasajes
                </option>
                <option value="3" class="text-white bg-dark">Comida</option>
                <option value="4" class="text-white bg-dark">Servicios</option>
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
                    productoValidator.participantes_producto ? 'form-error' : ''
                  "
                  v-model="producto.participantes_producto"
                  placeholder="Cantidad de participantes"
                />
              </template>
            </div>

            <div class="mb-3 col-6">
              <label class="form-label text-white">Marca</label>
              <input
                type="text"
                class="form-control text-white bg-dark"
                :class="productoValidator.marca_producto ? 'form-error' : ''"
                v-model="producto.marca_producto"
                placeholder="Marca del producto"
              />
            </div>

            <div class="mb-3 col-6">
              <label class="form-label text-white">Imagen Producto</label>
              <br />
              <input
                type="file"
                id="formFile"
                @change="updateImagen()"
                ref="imagenProducto"
              />
            </div>

            <div class="mb-3 col-12">
              <label class="form-label text-white">Descripción</label>
              <textarea
                type="text"
                rows="6"
                class="form-control text-white bg-dark"
                :class="
                  productoValidator.descripcion_producto ? 'form-error' : ''
                "
                v-model="producto.descripcion_producto"
                placeholder="Descripción del producto"
              ></textarea>
            </div>

            <div class="mb-3 col-6">
              <label class="form-label text-white">Precio Producto USD</label>
              <input
                type="number"
                class="form-control text-white bg-dark"
                :class="productoValidator.precio_producto ? 'form-error' : ''"
                v-model="producto.precio_producto"
                placeholder="Precio del producto"
              />
            </div>

            <div class="mb-3 col-6">
              <label class="form-label text-white bg-dark">Estado</label>
              <select class="form-select" v-model="producto.estado">
                <option value="0" class="text-white bg-dark">No activo</option>
                <option value="1" class="text-white bg-dark">Activo</option>
              </select>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="crearProducto()"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script setup>
import { toast } from "../../../helper";
import { showModal, closeModal } from "../../../helper";
const emits = defineEmits(["cerrarModalNuevo"]);
const props = defineProps(["id_producto"]);
const producto = ref({
  nombre_producto: "",
  marca_producto: "",
  descripcion_producto: "",
  precio_producto: 0,
  estado: 0,
  participantes_producto: 0,
  categoria_producto: 0,
});

const productoValidator = ref({
  nombre_producto: false,
  marca_producto: false,
  descripcion_producto: false,
  precio_producto: false,
  estado: false,
  categoria_producto: false,
  participantes_producto: false,
});

const imagenProducto = ref("");

const updateImagen = () => {
  if (imagenProducto.value.files[0].type.includes("image")) {
    imagenProducto.value.files;
  } else {
    toast("error", "Sólo se permiten imágenes tipo (png, jpg, jpeg, pdf)");
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
    precio_producto: false,
    participantes_producto: false,
    categoria_producto: false,
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
 * post a la api para crear producto
 */
const crearProducto = async () => {
  if (validaProducto() == true)
    return toast("warning", "Completa los campos marcados");
  const formData = new FormData();

  formData.append("imagen_producto", imagenProducto.value.files[0]);
  formData.append("id_producto", producto.value.id_producto);
  formData.append("nombre_producto", producto.value.nombre_producto);
  formData.append("marca_producto", producto.value.marca_producto);
  formData.append("descripcion_producto", producto.value.descripcion_producto);
  formData.append("img_producto", producto.value.img_producto);
  formData.append("categoria_producto", producto.value.categoria_producto);
  formData.append("precio_producto", producto.value.precio_producto);
  formData.append(
    "participantes_producto",
    producto.value.participantes_producto
  );
  formData.append("estado", producto.value.estado);
  await axios.post("newProduct", formData).then((res) => {
    if (res.data.msg == "error") return toast("error", res.data.data);
    if (res.data.msg == "ok") {
      toast("ok", res.data.data);
      emits("cerrarModalNuevo");
    }
  });
};
onMounted(() => {
  showModal("modalNuevoProducto");
});
onUnmounted(() => {
  closeModal();
});
</script>
