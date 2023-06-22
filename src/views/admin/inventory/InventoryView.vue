<script setup>
import NavbarComponent from "../../../components/NavbarComponent.vue";
import SidebarAdmin from "../components/sidebar.vue";
import axios from "axios";
import { toast } from "../../../helper.js";
import { ref, onMounted } from "vue";
import InventoryBody from "./InventoryBody.vue";
import SkeletonBodyVue from "../components/SkeletonBody.vue";
</script>

<template>
  <header>
    <NavbarComponent />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SidebarAdmin />
        <Suspense>
          <InventoryBody />
          <template #fallback>
            <SkeletonBodyVue />
          </template>
        </Suspense>
      </div>
    </div>
  </main>
</template>
