import Toastify from "toastify-js";

export const toast = (status, msg) => {
    if (status == "success" || status == "ok")
        Toastify({
            text: msg,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#002efe",
            },
        }).showToast();

    if (status == "warning" || status == "wrn")
        Toastify({
            text: msg,
            duration: 6000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#f8ac59",
            },
        }).showToast();

    if (status == "error" || status == "err")
        Toastify({
            text: msg,
            duration: 6000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ed5565",
            },
        }).showToast();
}


export const showModal = (id_content) => {
    const modal = document.getElementById(id_content);
    modal.classList.add('show')
    modal.classList.add('d-block')
    const body = document.querySelector('body');
    body.style.overflowY = 'hidden';
}
export const closeModal = () => {
    const body = document.querySelector('body');
    body.style.overflowY = 'auto';
}

export const hash = Math.floor(Math.random() * 90000) + 10000;

export const dataTables = (id) => {
    $(id).DataTable({
        order: [[1, "desc"]],
        bInfo: true,
        paging: true,
    });
}

