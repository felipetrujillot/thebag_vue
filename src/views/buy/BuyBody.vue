<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-2 justify-content-center fadeInUp">
      <div class="px-3">
        <div v-if="carritoCompraStore.getCarritoCompra.length > 0">
          <h5 class="pb-4">My products</h5>
          <div>
            <div
              class="row px-5 ps-0"
              v-for="producto in carritoCompraStore.getCarritoCompra"
              key="producto.id_producto"
            >
              <div class="col-md-3 col-4">
                <img
                  class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto h-100 w-100"
                  style="object-fit: cover"
                  :src="producto.img_producto"
                  :alt="producto.img_producto"
                />
              </div>
              <div class="col-md-6 col-3">
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
              <div class="col-md-3 col-4">
                <span
                  >USD
                  {{ $filters.currencyUSD(producto.precio_producto) }}</span
                >
                <br />
                <div class="mt-3">
                  <a
                    @click.prevent="carritoCompraStore.minusItemCart(producto)"
                    href="#"
                    class="text-dark border p-1 bg-dark"
                  >
                    <i class="bi bi-dash" />
                  </a>
                  <span class="m-2">{{ producto.cantidad }}</span>
                  <a
                    v-if="producto.categoria_producto != 2"
                    @click.prevent="carritoCompraStore.addItemCart(producto)"
                    href="#"
                    class="text-dark border p-1 bg-dark"
                  >
                    <i class="bi bi-plus" />
                  </a>
                </div>
                <br />
              </div>
              <hr class="featurette-divider m-3" />
            </div>
          </div>
        </div>
        <div v-else>
          <h6>There is no products in the cart</h6>
        </div>
      </div>
      <div class="border-start px-3">
        <form class="">
          <div class="mb-3">
            <h5>Contact Information</h5>
            <input
              v-model="inputForm.email"
              class="form-control bg-dark text-white"
              :class="
                validaciones.errorValidaciones == true && inputForm.email == ''
                  ? 'has-error'
                  : ''
              "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="inputForm.newsLetter"
              />
              <div id="emailHelp" class="form-text">
                Email me with news and offers
              </div>
            </div>
          </div>
          <h5 class="pt-0">Personal Information</h5>
          <div class="mb-3">
            <input
              type="text"
              class="form-control bg-dark text-white"
              id="exampleFormControlInput1"
              v-model="inputForm.numeroDocumento"
              :class="
                validaciones.errorValidaciones == true &&
                inputForm.numeroDocumento == ''
                  ? 'has-error'
                  : ''
              "
              placeholder="PASSPORT - DNI - ID - RUT"
            />
          </div>
          <div class="row">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control mb-3 bg-dark text-white"
                v-model="inputForm.nombre"
                id="nombreInput_id"
                :class="
                  validaciones.errorValidaciones == true &&
                  inputForm.nombre == ''
                    ? 'has-error'
                    : ''
                "
                placeholder="First Name"
              />
            </div>
            <div class="col-md-6">
              <input
                type="text"
                class="form-control mb-3 bg-dark text-white"
                v-model="inputForm.apellido"
                :class="
                  validaciones.errorValidaciones == true &&
                  inputForm.apellido == ''
                    ? 'has-error'
                    : ''
                "
                id="apellidoInput_id"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div class="d-flex">
            <select
              class="form-select bg-dark text-white"
              @change="placePhonePrefix()"
              v-model="inputForm.phoneCountry"
              aria-label="Default select example"
            >
              <option v-for="(item, key) in countriesNumber" :value="key">
                {{ item.name }}
                <span class="text-muted">{{ item.dial_code }}</span>
              </option>
            </select>

            <div class="input-group">
              <span
                class="input-group-text bg-dark text-white"
                id="basic-addon1"
              >
                <i class="bi bi-phone me-2"></i>
                {{ inputForm.phonePrefix }}</span
              >
              <input
                type="number"
                class="form-control bg-dark text-white"
                id="exampleFormControlInput1"
                v-model="inputForm.phone"
                :class="
                  validaciones.errorValidaciones == true &&
                  inputForm.phone == ''
                    ? 'has-error'
                    : ''
                "
                placeholder="Phone Number"
              />
            </div>
          </div>

          <hr class="featurette-divider" />
          <h5 class="pt-0">Documents</h5>

          <div class="mb-1">
            <p for="formFile" class="form-label">
              DNI / Driving License Picture
            </p>
            <div id="emailHelp" class="form-text text-muted mb-1">
              This information is required to validate your identity, we do not
              share or sell your data externally.
            </div>
            <input
              class="form-control bg-dark text-white"
              @change="documentUpload('dni')"
              ref="dniDocument"
              type="file"
              id="formFile"
              :class="validaciones.dniDocument == true ? 'has-error' : ''"
            />
          </div>
          <div class="mb-1">
            <p for="formFile" class="form-label">Travel Certificate</p>
            <div id="emailHelp" class="form-text text-muted mb-1">
              This is a required certificate to validate your identity, and it
              can be obtained
              <a
                href="https://www.pdichile.cl/tr%C3%A1mites-online/certificado-de-viajes"
                >Here.</a
              >
              <br />We do not share or sell your data externally.
            </div>

            <input
              class="form-control bg-dark text-white"
              ref="travelDocument"
              @change="documentUpload('travel')"
              type="file"
              id="formFile"
              :class="validaciones.travelDocument == true ? 'has-error' : ''"
            />
          </div>

          <div
            class="alert alert-secondary text-white bg-dark mb-3"
            role="alert"
            :class="
              validaciones.errorValidaciones == true && inputForm.tyc == false
                ? 'has-error'
                : ''
            "
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="inputForm.tyc"
              />
              <div id="emailHelp" class="form-text text-white">
                I have read and agree to the
                <router-link to="/tyc">Terms and Conditions</router-link> of
                service.
              </div>
            </div>
          </div>

          <div>
            <div class="py-2">
              <div class="row justify-content-center p-0 m-0">
                <div class="col-lg-6 col-sm-6 p-0 m-0">
                  <label class="form-label"
                    >When do you want to retire your products?</label
                  >
                  <input
                    class="form-control"
                    type="date"
                    v-model="inputForm.startDate"
                    :class="validaciones.startDate == true ? 'has-error' : ''"
                    @change="dateSelector()"
                  />
                </div>
                <div class="col-lg-6">
                  <label class="form-label text-end w-100">Rent days</label>
                  <br />
                  <div class="text-end w-100">
                    <a
                      href="#"
                      class="text-dark border p-1 bg-dark"
                      @click.prevent="rentDays(-1)"
                    >
                      <i class="bi bi-dash" />
                    </a>
                    <span class="m-2 fs-5"
                      >{{ carritoCompraStore.getDiasArriendo }}
                      {{
                        carritoCompraStore.getDiasArriendo == 1 ? "day" : "days"
                      }}</span
                    >
                    <a
                      href="#"
                      class="text-dark border p-1 bg-dark"
                      @click.prevent="rentDays(1)"
                    >
                      <i class="bi bi-plus" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="featurette-divider" />
          <div class="d-flex justify-content-between">
            <div>
              <h5>
                Rent days: <br />From {{ inputForm.startDate }} until
                {{ inputForm.endDate }}
              </h5>
              <hr />
              <h5>
                Total: USD
                {{ $filters.currencyUSD(carritoCompraStore.getTotalCompra) }}
              </h5>
            </div>
            <div>
              <button
                @click.prevent="buyItems"
                class="btn btn-danger btn-lg mb-3"
                :disabled="carritoCompraStore.getCarritoCompra.length <= 0"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <LoadingComponent v-if="loading" />
  <ModalSuccess
    v-if="modalSuccess"
    @cerrarModal="cerrarModal"
    :modalSuccessInfo="modalSuccessInfo"
  />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "../../helper.js";
import { useCounterStore } from "../../stores/carritoCompra";
import ModalSuccess from "./modalSuccess.vue";
import LoadingComponent from "./LoadingComponent.vue";

const carritoCompraStore = useCounterStore();
const modalSuccess = ref(false);
const modalSuccessInfo = ref("");
const loading = ref(false);

/**
 * Obtiene la fecha de hoy, le resta la hora para evitar conflictos de cálculo al sumar y restar días,
 * y el parámetro @addedDays permite sumar días actuales
 * Se usa principalmente para obtener la fecha actual + 1 día de margen para el arriendo de equipos
 */
const todayDate = (addedDays) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + addedDays);

  return currentDate.toISOString().split("T")[0];
};

const dateSelector = () => {
  validaciones.value.startDate = false;

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const arrayStart = inputForm.value.startDate.split("-");
  const date = new Date(
    `${arrayStart[0]}-${arrayStart[1]}-${arrayStart[2]}T00:00:00`
  );
  updateEndDays();

  if (date < tomorrow) {
    validaciones.value.startDate = true;
    toast("warning", "You must indicate a valid start date");
    return false;
  }

  return true;
};

const updateEndDays = () => {
  const arrayStart = inputForm.value.startDate.split("-");
  const date = new Date(
    `${arrayStart[0]}-${arrayStart[1]}-${arrayStart[2]}T00:00:00`
  );

  date.setDate(date.getDate() + carritoCompraStore.diasArriendo);

  return (inputForm.value.endDate = date.toISOString().split("T")[0]);
};
/**
 * Actualiza los días de arriendo cuando es mayor a 0
 */
const rentDays = (number) => {
  if (carritoCompraStore.diasArriendo > 0) {
    carritoCompraStore.updateDaysArriendo(
      carritoCompraStore.diasArriendo + number
    );
    updateEndDays();
  }
};

const inputForm = ref({
  email: "",
  nombre: "",
  apellido: "",
  phonePrefix: "+56",
  phone: "",
  phoneCountry: 42,
  tyc: false,
  numeroDocumento: "",
  newsLetter: 0,
  startDate: todayDate(1),
  endDate: todayDate(2),
});

const countriesNumber = ref([]);
const dniDocument = ref("");
const travelDocument = ref("");

const validaciones = ref({
  errorValidaciones: false,
  travelDocument: false,
  dniDocument: false,
  startDate: false,
  endDate: false,
});

const placePhonePrefix = () => {
  inputForm.value.phonePrefix =
    countriesNumber.value[inputForm.value.phoneCountry].dial_code;
};

const cerrarModal = () => {
  modalSuccess.value = false;
};

const convertDateFormat = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

/**
 * Gestiona la subida de documentos al sitio
 */
const documentUpload = (name) => {
  if (name == "dni") {
    validaciones.value.dniDocument = false;

    if (
      dniDocument.value.files[0].type.includes("image") ||
      dniDocument.value.files[0].type.includes("pdf")
    )
      return true;

    toast(
      "error",
      "Only pictures or documents can be uploaded (png, jpg, jpeg, pdf)"
    );
    dniDocument.value = "";
    validaciones.value.dniDocument = true;
  }

  if (name == "travel") {
    validaciones.value.travelDocument = false;

    if (
      travelDocument.value.files[0].type.includes("image") ||
      travelDocument.value.files[0].type.includes("pdf")
    )
      return true;

    toast(
      "error",
      "Only pictures or documents can be uploaded (png, jpg, jpeg, pdf)"
    );
    validaciones.value.travelDocument = true;
    travelDocument.value = "";
  }
};

/**
 * Realiza la compra con las validaciones previas
 */
const buyItems = () => {
  validaciones.value.errorValidaciones = false;

  if (inputForm.value.email.length == 0) {
    validaciones.value.errorValidaciones = true;
  }
  if (inputForm.value.nombre.length == 0) {
    validaciones.value.errorValidaciones = true;
  }
  if (inputForm.value.apellido.length == 0) {
    validaciones.value.errorValidaciones = true;
  }
  if (inputForm.value.phone.length == 0) {
    validaciones.value.errorValidaciones = true;
  }
  if (inputForm.value.numeroDocumento.length == 0) {
    validaciones.value.errorValidaciones = true;
  }
  if (inputForm.value.tyc == false) {
    validaciones.value.errorValidaciones = true;
  }

  if (dniDocument.value.files[0] == null) {
    validaciones.value.dniDocument = true;
    validaciones.value.errorValidaciones = true;
  }
  if (travelDocument.value.files[0] == null) {
    validaciones.value.travelDocument = true;
    validaciones.value.errorValidaciones = true;
  }

  if (validaciones.value.errorValidaciones == true) {
    toast("error", "You must complete the formulary");
    return;
  }

  if (validaciones.value.dniDocument || validaciones.value.travelDocument)
    return toast(
      "error",
      "Only pictures or documents can be uploaded (png, jpg, jpeg, pdf)"
    );

  if (carritoCompraStore.diasArriendo <= 0) {
    toast("error", "You must add a valid range to rent the order");
    return;
  }

  if (dateSelector() == false) {
    return;
  }

  const formData = new FormData();
  formData.append("email", inputForm.value.email);
  formData.append("nombre", inputForm.value.nombre);
  formData.append("apellido", inputForm.value.apellido);
  formData.append("phoneNumber", inputForm.value.phone);
  formData.append("phonePrefix", inputForm.value.phonePrefix);
  formData.append("cart", JSON.stringify(carritoCompraStore.getCarritoCompra));
  formData.append("price", carritoCompraStore.totalProductos);
  formData.append("days", carritoCompraStore.diasArriendo);
  formData.append("tyc", inputForm.value.tyc == true ? 1 : 0);
  formData.append("newsLetter", inputForm.value.newsLetter == true ? 1 : 0);
  formData.append("startDate", inputForm.value.startDate);
  formData.append("endDate", inputForm.value.endDate);
  formData.append("documento_dni", dniDocument.value.files[0]);
  formData.append("documento_pdi", travelDocument.value.files[0]);

  loading.value = true;
  axios
    .post("placeOrder", formData)
    .then((res) => {
      if (res.data.msg == "ok") {
        modalSuccess.value = true;
        modalSuccessInfo.value = res.data.order;
        toast("success", res.data.data);
      } else if (res.data.msg == "error") {
        toast("error", "There was an error trying to place a new order");
      }
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      toast("error", "There was an error trying to place a new order");
    });
};

const autoTopScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

autoTopScroll();

const countryCodes = async () => {
  const response = await fetch("/CountryCodes.json");
  countriesNumber.value = await response.json();
};

await countryCodes();
</script>

<style>
.toast-success,
.toast-error,
.toast-warning {
  background: #000;
}

.has-error {
  border-color: #ed5565;
}

.datepicker {
  background: #181818 !important;
}
</style>
