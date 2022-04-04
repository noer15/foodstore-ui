import store from "./store";

let currentAuth;

function listener() {
  // (1) buat variabel previousAuth dan berikan currentAuth sebagai nilai
  let previousAuth = currentAuth;
  // (2) update nilai currentAuth dari nilai state terbaru
  currentAuth = store.getState().auth;

  // (3) cek apakah nilai state `auth` berubah dari nilai sebelumnya
  if (currentAuth !== previousAuth) {
    // (4) jika berubah simpan ke localStorage
    localStorage.setItem("auth", JSON.stringify(currentAuth));
  }
}
function listen() {
  store.subscribe(listener);
}
export { listen };
