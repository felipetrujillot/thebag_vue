<script setup>
import NavbarComponent from "../../components/NavbarComponent.vue";
import { ref } from 'vue'
import { toast } from "../../helper";
import { useRouter } from 'vue-router'
import BottomComponent from "../../components/BottomComponent.vue";
const token = ref("")

const router = useRouter()

/**
 * find an existing order based on it's token number
 */
const searchToken = () => {
    axios.get('/token/' + token.value.trim()).then((res) => {
        if (res.data.msg == 'ok') {
            router.push({ name: "orderToken", params: { id: res.data.data.token } });
            return
        }
        if (res.data.msg == 'error') {
            return toast('warning', res.data.data)
        }
        return toast('error', 'There was a problem searching for your order, please contact support')
    }).catch((err) => {
        console.log(err);
        return toast('error', 'There was a problem searching for your order, please contact support')
    })

}
</script>
<template>
    <header>
        <NavbarComponent />
    </header>
    <main class="pt-5 container fadeInUp minh-60 ">
        <div class="container pt-5">
            <h1 class="text-center pb-3">Find my order</h1>
        </div>
        <div class="py-2">
            Check your email to find your order number.
        </div>
        <div class="input-group input-group-lg">
            <input type="text" class="form-control" v-model="token" aria-label="Sizing example input"
                placeholder="Paste your order number" aria-describedby="inputGroup-sizing-lg">

            <span class="input-group-text bg-dark hand" id="inputGroup-sizing-lg" @click="searchToken()">
                <i class="bi bi-search"></i>
            </span>
        </div>

        <div class="d-flex justify-content-center pt-3">
            <div>
                <button class="btn btn-secondary btn-lg" :disabled="token.length == 0" @click.prevent="searchToken()">
                    Search
                </button>
            </div>
        </div>

    </main>
    <div class="pt-5"></div>

    <BottomComponent />
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
