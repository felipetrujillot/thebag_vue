<template>
  <div class="container">
    <h1 class="border-bottom mb-4 pb-3">My Order</h1>
    <div class="row row-cols-1 row-cols-sm-2 justify-content-center">
      <div class="px-5">
        <div
          class="row"
          v-for="producto in order.detalle"
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
          </div>
          <div class="col-md-3 col-4">
            <span
              >USD
              {{
                $filters.currencyUSD(
                  producto.precio_producto * producto.cantidad
                )
              }}</span
            >
            <br />
            <div class="mt-3">
              <span class="m-2">Quantity: {{ producto.cantidad }}</span>
            </div>
            <br />
          </div>
          <hr class="featurette-divider m-3" />
        </div>
      </div>

      <div class="border-start">
        <h3>Status</h3>

        <!--  orden en estado 0 NUEVA ORDEN-->
        <div
          class="alert alert-secondary text-white bg-dark mb-3"
          role="alert"
          v-if="order.estado_orden == 0"
        >
          <p>
            Our team is reviewing the documents submitted and managing the
            inventory for your product order, and will contact you shortly to
            confirm that your products are in stock and available for pickup on
            the scheduled day. Remember that payment is made at the time of
            picking up your products, TheBag Patagonia will not ask you for any
            advance payment.
          </p>
        </div>
        <!--  orden en estado 0 -->

        <!--  orden en estado 1 VERIFICACION-->
        <div
          class="alert alert-danger text-white bg-dark mb-3"
          role="alert"
          v-if="order.estado_orden == 1"
        >
          <p>
            Your documents has been reviewed by our team and now we are checking
            stock.
          </p>
        </div>

        <!--  orden en estado 2 APROBADA-->
        <div
          class="alert alert-danger text-white bg-success mb-3"
          role="alert"
          v-if="order.estado_orden == 2"
        >
          <p>
            Your order has been approbed and your items are ready to be retired
            <a href="https://goo.gl/maps/sevF976B86vAC8xs9" class="text-white"
              >here.</a
            >
          </p>
        </div>

        <!--  orden en estado 3 ENTREGADA -->
        <div
          class="alert alert-danger text-white bg-success mb-3"
          role="alert"
          v-if="order.estado_orden == 3"
        >
          <p>Your order has been paid and your equipment it's in your hands.</p>
        </div>
        <!--  orden en estado 3 -->

        <!--  orden en estado 4 COMPLETADA -->
        <div
          class="alert alert-danger text-white bg-success mb-3"
          role="alert"
          v-if="order.estado_orden == 4"
        >
          <p>Your order has been returned correctly to our team.</p>
        </div>
        <!--  orden en estado 4 -->

        <!--  orden en estado 5 RECHAZADA-->
        <div
          class="alert alert-danger text-white bg-danger mb-3"
          role="alert"
          v-if="order.estado_orden == 5"
        >
          <p>
            Your order has been rejected, contact our support team to get more
            information.
            <router-link to="/contact" class="text-white"
              >Contact Info.</router-link
            >
          </p>
        </div>
        <!--  orden en estado 5 -->

        <div class="alert alert-secondary text-white bg-dark mb-3" role="alert">
          <div class="form-check">
            <div class="form-text text-white">
              Order Number:
              <router-link :to="'/order/' + order.token"
                >{{ order.token }}
              </router-link>
            </div>

            <div class="form-text text-white">
              Created:
              <span>{{ order.created_at }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { toast } from "../../helper";

const router = useRouter();
const route = useRoute();
const order = ref({});

const estadoOrden = [
  `Our team is reviewing the documents submitted and managing the inventory for your product order, 
    and will contact you shortly to confirm that your products are in stock and available for pickup on the scheduled day.
    Remember that payment is made at the time of picking up your products, TheBag Patagonia will not ask you for any advance payment.`,
  `Your documents has been reviewed by our team and now we are checking stock`,
];

const getOrderByToken = async (token) => {
  await axios
    .get("/token/" + token)
    .then((res) => {
      console.log(res.data.data);

      if (res.data.msg == "ok") {
        return (order.value = res.data.data);
      }
      if (res.data.msg == "error") {
        return toast("warning", res.data.data);
      }
      toast("warning", "There was a problem finding your product");
      router.push({ name: "ordersView" });
    })
    .catch((err) => {
      toast("warning", "There was a problem finding your product");
    });
};

await getOrderByToken(route.params.id);
</script>
