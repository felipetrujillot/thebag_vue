import { defineStore } from 'pinia'

export const useCounterStore = defineStore('loginStore', {

    state: () => ({
        accessToken: '' || JSON.parse(localStorage.getItem('accessToken')),
        usuario: '' || JSON.parse(localStorage.getItem('usuario')),
        autenticado: '' || JSON.parse(localStorage.getItem('autenticado')),
    }),
    getters: {
        getUsuario(state) {
            return state.usuario
        },
        getToken(state) {
            return state.accessToken
        }
    },
    actions: {
        setAccessToken(token) {
            localStorage.setItem('accessToken', JSON.stringify(token));
            localStorage.setItem('autenticado', true);
            this.accessToken = token;
            this.autenticado = true;
        },
        setUsuario(usuario) {
            this.usuario = usuario
            localStorage.setItem('usuario', JSON.stringify(usuario))
        },
        logoutAccess(data) {
            localStorage.clear();
            this.autenticado = '';
            this.accessToken = '';
        }
    },
});