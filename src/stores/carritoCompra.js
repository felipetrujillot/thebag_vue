import { defineStore } from 'pinia'

export const useCounterStore = defineStore('carritoCompra', {

    state: () => ({
        carritoCompra: JSON.parse(localStorage.getItem('carritoCompra')) != null ? JSON.parse(localStorage.getItem('carritoCompra')) : [],
        totalProductos: 0,
        diasArriendo: 1,
    }),
    getters: {
        getCarritoCompra(state) {
            return state.carritoCompra;
        },
        getTotalCompra(state) {
            return state.totalProductos
        },
        getDiasArriendo(state) {
            return state.diasArriendo
        }
    },
    actions: {
        saveCart() {
            localStorage.setItem("carritoCompra", JSON.stringify(this.carritoCompra));
        },
        addItemCart(producto) {
            if (producto.categoria_producto === 2) {
                this.carritoCompra.push(producto)
                return this.calcularTotal()
            }
            let productoRepetido = false;
            this.carritoCompra.forEach(ele => {
                if (ele.id_producto == producto.id_producto) {
                    productoRepetido = true;
                    ele.cantidad += 1
                    if (ele.cantidad <= 0) this.removeitem(producto)
                }
            });
            if (productoRepetido == false) {
                this.carritoCompra.push(producto)
            }
            this.calcularTotal();
        },
        removeitem(producto) {
            producto.cantidad = 1
            const result = this.carritoCompra.filter((word) => {
                return word.id_producto != producto.id_producto;
            });
            this.carritoCompra = result;
            this.calcularTotal();
        },
        minusItemCart(producto) {
            let productoRepetido = false;
            this.carritoCompra.forEach(ele => {
                if (ele.id_producto == producto.id_producto) {
                    productoRepetido = true;
                    ele.cantidad -= 1

                    if (ele.cantidad <= 0) this.removeitem(producto)
                }
            });
            if (productoRepetido == false) {
                this.carritoCompra.push(producto)
            }
            this.calcularTotal();
        },
        updateDaysArriendo(dias) {
            if (dias > 0) {
                this.diasArriendo = dias;
                this.calcularTotal();
            }
            else {
                this.diasArriendo = 1;
                this.calcularTotal();
            }
        },
        calcularTotal() {
            this.totalProductos = 0;
            this.carritoCompra.forEach((element) => {

                if (element.categoria_producto == 2) {
                    this.totalProductos += element.precio_producto * element.cantidad;
                }
                else {
                    this.totalProductos += element.precio_producto * element.cantidad * this.diasArriendo;
                }

                //if (element.categoria_producto != 2) this.totalProductos = this.totalProductos * this.diasArriendo
            });
            //this.totalProductos = this.totalProductos * this.diasArriendo
            this.saveCart()
        },
        vaciarCarrito() {
            this.totalProductos = 0
            this.diasArriendo = 1
            this.carritoCompra = []
            localStorage.setItem('carritoCompra', null)
            this.saveCart()

        },

    },
});