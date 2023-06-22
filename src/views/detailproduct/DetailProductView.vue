<script setup>
import DetailProductBody from "./DetailProductBody.vue";
import NavbarComponent from "../../components/NavbarComponent.vue";
import AnimatedPlaceholder from "../../components/skeleton/AnimatedPlaceholder.vue";
import DetailProductSkeleton from './DetailProductSkeleton.vue'
</script>
<template>
    <header>
        <NavbarComponent />
    </header>
    <main class="pt-5">

        <Suspense>
            <template #fallback>
                <DetailProductSkeleton />
            </template>
            <DetailProductBody />
        </Suspense>
    </main>
</template>

<style scoped>
.card:hover {
    transition: transform 0.2s;
    transform: scale(1.05);
}

.cuadroImagen:hover {
    box-shadow: 0 1rem 2rem rgb(0 0 0 / 20%) !important;
}

.brandProduct {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

.descripcionProducto {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.btn-dark {
    background-color: black !important;
}
</style>
