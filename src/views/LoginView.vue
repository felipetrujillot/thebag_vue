<script setup>
import NavbarComponent from "../components/NavbarComponent.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCounterStore } from '../stores/loginStore'
import { toast } from "../helper";
import BottomComponent from "../components/BottomComponent.vue";
const email = ref();
const password = ref();
//const store = useStore();
const router = useRouter();
const loginStore = useCounterStore()

const loginForm = async () => {
  if (
    email.value == null ||
    email.value == "" ||
    password.value == null ||
    password.value == ""
  ) {
    toast('warning', "Debes completar los campos para iniciar sesión");
    return;
  }

  await axios.post("/login", {
    email: email.value,
    password: password.value,
  }).then((res) => {
    if (res.data.error)
      return toast('error', error);
    if (res.data.msg === "ok") {
      loginStore.setAccessToken("Bearer " + res.data.token)
      loginStore.setUsuario(res.data.usuarioDB);

      axios.defaults.headers = { Authorization: "Bearer " + res.data.token }
      return router.push({ name: "Orders" });
    }
    return toast('error', "Ocurrió un error inesperado");
  })
};
</script>

<template>
  <header>
    <NavbarComponent />
  </header>
  <div class="container col-xl-10 col-xxl-8 px-4 py-5  ">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-md-10 mx-auto col-lg-5  ">
        <form @submit.prevent="loginForm" class="p-4 p-md-5 border rounded-3 ">
          <div class="form-floating mb-3 ">
            <input v-model="email" type="email" class="form-control  text-black" id="floatingInput"
              placeholder="name@example.com" />
            <label for="floatingInput" class="text-dark">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control  text-black" id="floatingPassword"
              placeholder="Password" />
            <label for="floatingPassword" class="text-dark">Password</label>
          </div>
          <div class="checkbox mb-3"></div>
          <button class="w-100 btn btn-lg btn-secondary" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>

  <BottomComponent />
</template>
