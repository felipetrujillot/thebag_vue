<template>
    <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark">
                <div class="modal-header text-center">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Processing your order</h1>
                </div>
                <div class="modal-body text-center">
                    <h3 class="pb-3">
                        <AnimatedPlaceholder height="3vh" width="100%" />
                    </h3>
                    <p>
                        <AnimatedPlaceholder height="3vh" width="100%" />
                    </p>
                    <p>
                        <AnimatedPlaceholder height="3vh" width="100%" />
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
</template>


<script setup>
import AnimatedPlaceholder from '../../components/skeleton/AnimatedPlaceholder.vue'

</script>