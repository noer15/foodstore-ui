import store from "../app/store";
import axios from "axios";
import { config } from "../config";
import { setItems } from "../features/Cart/action";

export async function saveCart(token, cart) {
  return await axios.put(
    `${config.api_host}/api/v1/carts`,
    { items: cart },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getCart() {
  let token = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).token
    : {};
  if (!token) return;

  let { data } = await axios.get(`${config.api_host}/api/v1/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data.error) {
    store.dispatch(setItems(data));
  }
}
