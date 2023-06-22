import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import { useCounterStore } from '../stores/loginStore'

function guard(to, from, next) {
  const loginStore = useCounterStore()

  if (loginStore.autenticado == 'true') {
    window.axios.defaults.headers.common.Authorization = store.state.accessToken;
    next();
  } else {
    next('/');
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/tyc',
      name: 'tyc',
      component: () => import('../views/TycView.vue')
    },
    {
      path: '/buy',
      name: 'buy',
      component: () => import('../views/buy/BuyView.vue')
    },

    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },

    {
      path: '/admin/orders',
      name: 'Orders',
      component: () => import('../views/admin/orders/AdminOrdersView.vue')
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'DetailOrder',
      component: () => import('../views/admin/orders/detail/DetailOrderView.vue')
    },

    {
      path: '/details/:id',
      name: 'detailProduct',
      component: () => import('../views/detailproduct/DetailProductView.vue')
    },


    {
      path: '/about',
      name: 'aboutView',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/orders',
      name: 'ordersView',
      component: () => import('../views/order/OrdersView.vue')
    },

    {
      path: '/order/:id',
      name: 'orderToken',
      component: () => import('../views/order/DetailOrderView.vue')
    },

    {
      path: '/admin/inventory',
      name: 'Inventory',
      component: () => import('../views/admin/inventory/InventoryView.vue')
    },
    {
      path: '/admin/products',
      name: 'listadoProductos',
      component: () => import('../views/admin/products/AdminProductosView.vue')
    },
    {
      path: '/admin/product/:id',
      name: 'editarproducto',
      component: () => import('../views/admin/products/edit/AdminEditProductView.vue')
    },

  ]
})

export default router
