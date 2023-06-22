<template>
  <div class="modal show d-block fadeIn" id="modalTickets" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title text-white">Add Participants</h5>
          <button
            type="button"
            class="btn-close bg-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('cerrarModalTickets')"
          ></button>
        </div>

        <div class="modal-body text-white">
          <h6>
            This ticket allows
            {{ producto.participantes_producto }}
            {{
              producto.participantes_producto == 1
                ? "participant"
                : "participants"
            }}
          </h6>

          <div class="mb-3 col-12 pt-4">
            <label class="form-label text-white fw-bold">Full Name</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Insert participant name"
                v-model="nombreParticipante"
              />
              <span
                class="input-group-text hand bg-primary"
                @click="addParticipant()"
              >
                <i class="bi bi-check"></i>
              </span>
            </div>
          </div>

          <div class="pt-3">
            <h5>Participants:</h5>
            <ul class="list-group">
              <li class="list-group-item" v-for="name in addedParticipants">
                {{ name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="modal-footer">
          <div class="d-flex justify-content-between w-100">
            <div>
              <button type="button" class="btn btn-danger" @click="resetForm">
                Reset
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addItemToCart"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script setup>
import { showModal, closeModal, toast } from "../../../helper";
import { useCounterStore } from "../../../stores/carritoCompra";

const emits = defineEmits(["cerrarModalTickets"]);
const props = defineProps(["producto"]);
const carritoCompraStore = useCounterStore();

const nombreParticipante = ref("");
const addedParticipants = ref([]);

const resetForm = () => {
  nombreParticipante.value = "";

  const emptyArray = [];
  addedParticipants.value = emptyArray;
};

const addParticipant = () => {
  if (nombreParticipante.value.length === 0)
    return toast("warning", "You must indicate a participant for the ticket");

  if (addedParticipants.value.length === props.producto.participantes_producto)
    return toast(
      "warning",
      "To add another participant you must buy another ticket"
    );

  addedParticipants.value.push(nombreParticipante.value);
  nombreParticipante.value = "";
};

const addItemToCart = () => {
  if (addedParticipants.value.length < props.producto.participantes_producto)
    return toast("warning", "To must add more participants");

  let newProducto = props.producto;

  newProducto.nombresParticipantes = addedParticipants.value;

  carritoCompraStore.addItemCart(newProducto);

  toast("success", "Your item has been added to the cart");
  emits("cerrarModalTickets");
};
onMounted(() => {
  showModal("modalTickets");
});
onUnmounted(() => {
  closeModal();
});
</script>
