<template>
    <div class="container pt-5 fadeInUp">
        <div class="row row-cols-1 row-cols-md-2 mb-3 text-center align-items-center">
            <div class="col-md-4">
                <div class="rounded-3 shadow-lg">
                    <div class="card-body" style="padding: 0 !important">

                        <AnimatedPlaceholder
                            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto  w-100"
                            height="40vh" />
                        <!-- <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto h-100 w-100"
                            style="object-fit: cover" /> -->
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-3 col-md-3 border border-dark m-1 border-3 cuadroImagen"
                        style="--bs-border-opacity: 0.5">
                        <AnimatedPlaceholder width="100%" height="8vh" />
                    </div>
                    <div class="col-3 col-md-3 border border-dark m-1 border-3 cuadroImagen"
                        style="--bs-border-opacity: 0.5">
                        <AnimatedPlaceholder width="100%" height="8vh" />
                    </div>
                    <div class="col-3 col-md-3 border border-dark m-1 border-3 cuadroImagen"
                        style="--bs-border-opacity: 0.5">
                        <AnimatedPlaceholder width="100%" height="8vh" />
                    </div>

                </div>
            </div>

            <div class="col-md-6">
                <h1 class="card-title  text-start">
                    <AnimatedPlaceholder width="100%" height="3vh" />
                </h1>
                <h1 class="text-start text-muted" style="text-transform: uppercase">
                    <AnimatedPlaceholder width="100%" height="3vh" />
                </h1>
                <h4 class="card-title pricing-card-title fs-4 text-start">
                    <AnimatedPlaceholder width="100%" height="3vh" />
                    <small class="text-muted fw-light"></small>
                </h4>
                <ul class="list-unstyled mt-3 mb-4 text-start">
                    <AnimatedPlaceholder width="100%" height="3vh" />

                </ul>
                <div>
                    <div class="w-100 text-center">
                        <AnimatedPlaceholder width="30%" height="3vh" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AnimatedPlaceholder from "../../components/skeleton/AnimatedPlaceholder.vue";
</script>
