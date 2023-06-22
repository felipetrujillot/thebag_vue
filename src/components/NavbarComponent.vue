<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useCounterStore } from '../stores/loginStore'
const router = useRouter();
const loginStore = useCounterStore()

const sidebarExtended = ref(true);
const split_url = window.location.href.split("/");
const uri = split_url[3];

const logout = () => {
  loginStore.logoutAccess();
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-black-dark" style="z-index: 10">
    <div class="container ">
      <router-link class="navbar-brand text-white" to="/"> <img src="/thebag.jpg" alt="/thebag.jpg" width="120"
          height="25"></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-white" :class="uri == '' ? 'border-bottom' : ''" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :class="uri == 'about' ? 'border-bottom' : ''" to="/about">About
              Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :class="uri == 'contact' ? 'border-bottom' : ''"
              to="/contact">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :class="uri == 'orders' ? 'border-bottom' : ''" to="/orders">My
              order</router-link>
          </li>
          <!--     <li class="nav-item">
            <router-link class="nav-link text-white" :class="uri == 'tyc' ? 'border-bottom' : ''"
              to="/tyc">T&C</router-link>
          </li> -->


        </ul>
        <form class="d-flex" role="search">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="loginStore.autenticado != true">
              <router-link to="/login" class="nav-link text-white hand">
                Login
              </router-link>
            </li>
            <li class="nav-item dropdown" v-if="loginStore.autenticado == true">
              <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Welcome {{ loginStore.getUsuario.nombre }}
              </a>
              <ul class="dropdown-menu dropdown-menu-dark bg-dark">
                <li><router-link class="dropdown-item" to="/admin/orders">Admin</router-link></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><router-link class="dropdown-item" to="/" @click="logout()">Logout</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" data-bs-target="#sidebarCart" aria-controls="sidebarCart" data-bs-toggle="offcanvas"
                class="nav-link text-white">
                <i class="bi bi-cart"></i>
              </a>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.text-white:hover {
  color: white !important;
  text-decoration: overline;
}
</style>
