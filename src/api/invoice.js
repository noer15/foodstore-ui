import axios from "axios";
import { config } from "../config";

export async function getInvoiceByOrderId(orderId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios.get(`${config.api_host}/api/v1/invoices/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
