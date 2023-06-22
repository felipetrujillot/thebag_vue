<template>
  <header>
    <NavbarComponentVue />
  </header>

  <main>
    <!--  <div class="container text-center pt-5">
      <h1 class="border-bottom mb-4">
        About Us
      </h1>
    </div>
 -->

    <div class="px-4 pt-5 text-center fadeInUp">
      <h1 class="display-4 fw-bold text-body-emphasis">TheBag Patagonia</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">Welcome to our outdoor store located in the beautiful region of Patagonia, Chile. We offer a
          wide range of rental
          equipment for all your outdoor needs, including hiking, camping, and climbing gear. </p>

      </div>
      <div class="overflow-hidden" style="max-height: 30vh;">
        <div class="container px-5">
          <img
            src="https://images.pexels.com/photos/3739624/pexels-photo-3739624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy">
        </div>
      </div>
    </div>



    <div class="container col-xxl-8 px-4 pt-5 fadeInUp">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6 rounded">
          <img
            src="https://images.pexels.com/photos/1684166/pexels-photo-1684166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="d-block mx-lg-auto img-fluid rounded" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Outdoor Store & Rental</h1>
          <p class="lead">
            Outdoor Equipment Store
            Sale, Rental & Manufacturing of Mountain Articles, Tourist Information, We apply technology + tourism,
            Let's evolve the experience!</p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          </div>
        </div>
      </div>
    </div>




    <div class="container col-xxl-8 px-4 fadeInUp">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">

        <div class="col-lg-7">
          <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Even better</h1>
          <p class="lead">
            In addition to our rental service, we also offer guided trips to help you explore the stunning Patagonian
            landscape.
            Our experienced guides will lead you on unforgettable adventures, from day hikes to multi-day expeditions.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          </div>
        </div>

        <div class="col-10 col-sm-8 col-lg-5 rounded">
          <img
            src="https://images.pexels.com/photos/1684168/pexels-photo-1684168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="d-block mx-lg-auto img-fluid rounded" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
        </div>
      </div>
    </div>


    <div class="text-secondary px-4 py-5 text-center fadeInUp">
      <div class="py-5">
        <h1 class="display-5 fw-bold text-white">Even more</h1>
        <div class="col-lg-6 mx-auto">
          <p class="fs-5 mb-4">

            Our knowledgeable staff is
            always ready to assist you in finding the right equipment for your adventure.


            For those who prefer to plan their own adventures, we offer the convenience of online equipment ordering. You
            can
            browse our selection of high-quality gear and have it shipped directly to your door, so you can focus on
            enjoying
            your trip.

            At our store, we are committed to promoting responsible tourism and preserving the natural beauty of
            Patagonia.
            We
            strive to minimize our environmental impact by using sustainable practices in our operations.

            Thank you for considering our outdoor store for your next adventure. We look forward to helping you make the
            most of
            your time in Patagonia!</p>

        </div>
      </div>
    </div>




  </main>
  <BottomComponent />
</template>

<script setup>
import NavbarComponentVue from '../components/NavbarComponent.vue';
import BottomComponent from '../components/BottomComponent.vue';

</script>