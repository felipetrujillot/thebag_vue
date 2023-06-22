<template>
  <header>
    <NavbarComponentVue />
  </header>

  <main>
    <div class="container text-center pt-5 min-vh-60 fadeInUp">
      <h1 class="border-bottom mb-4 pb-3">Contact</h1>
      <div class="d-flex justify-content-center">
        <div class="text-start">
          <h4 class="pt-3">
            <i class="bi bi-person"></i>
            <span> Rodrigo Valenzuela </span>
          </h4>
          <h4 class="pt-3">
            <i class="bi bi-whatsapp"></i>&nbsp;
            <a href="https://wa.me/56975793649" class="text-white"
              >+56 9 7579 3649</a
            >
          </h4>
          <h4 class="pt-3">
            <i class="bi bi-clipboard"></i>&nbsp;
            <a
              href="#"
              @click.prevent="copyEmail()"
              class="link-underline-primary text-white"
              >rodrigo@thebag.cl</a
            >
          </h4>
        </div>
      </div>

      <div>
        <h6>
          Manuel Bulnes 358, Puerto Natales, Natales, Magallanes y la Antártica
          Chilena
        </h6>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1235.6577610682148!2d-72.50884201733238!3d-51.72726405836294!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdafe8195c2b1769%3A0xadabda26b80e6403!2sManuel%20Bulnes%20358%2C%20Puerto%20Natales%2C%20Natales%2C%20Magallanes%20y%20la%20Ant%C3%A1rtica%20Chilena!5e0!3m2!1sen!2scl!4v1682623679592!5m2!1sen!2scl"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </main>
  <BottomComponent />
</template>

<script setup>
import NavbarComponentVue from "../components/NavbarComponent.vue";
import BottomComponent from "../components/BottomComponent.vue";
import { toast } from "../helper.js";

const copyEmail = () => {
  const copyText = "rodrigo@thebag.cl";
  navigator.clipboard.writeText(copyText);

  toast("success", "Copied the email");
};
</script>
