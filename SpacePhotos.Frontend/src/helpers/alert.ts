import Swal, { SweetAlertOptions } from "sweetalert2";

export function Toast(title: string, options?: SweetAlertOptions) {
    Swal.fire({
        confirmButtonColor: 'var(--bs-info)', //'#0dcaf0',
        toast: true,
        timer: 2000,
        timerProgressBar: true,
        title: `<h6>${title}</h6>`,
        inputAutoFocus: false,
        position: "bottom-right",
        ...options
    });
}

export function Alert(title: string, options?: SweetAlertOptions) {
    Swal.fire({
        confirmButtonColor: 'var(--bs-info)', //'#0dcaf0',
        timer: undefined,
        timerProgressBar: true,
        title: `<h6>${title}</h6>`,
        inputAutoFocus: false,
        position: "center",
        ...options
    });
}

export function Question(title: string, text: string, callback?: () => void, options?: SweetAlertOptions) {
    Swal.fire({
        confirmButtonColor: 'var(--bs-info)', //'#0dcaf0',
        denyButtonColor: 'var(--bs-secondary)', //'#6c757d',
        toast: false,
        title: `<h6>${title}</h6>`,
        text: text,
        html: `<p class='m-0'>${text}</p>`,
        position: "center",
        confirmButtonText: "Ok",
        denyButtonText: "Cancel",
        showDenyButton: true,
        focusDeny: true,
        focusConfirm: false,
        inputAutoFocus: false,
        ...options
    }).then((res) => {
        if (res.isConfirmed) {
            callback?.();
        }
    });
}