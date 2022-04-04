import axios from "axios";
import { config } from "../config";

async function registerUser(data) {
  return await axios.post(`${config.api_host}/api/v1/auth/register`, data);
}

async function loginUser(email, password) {
  return await axios.post(`${config.api_host}/api/v1/auth/login`, {
    email,
    password,
  });
}

async function logoutUser() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios
    .get(`${config.api_host}/api/v1/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      localStorage.removeItem("auth");
      return res;
    });
}

export { registerUser, loginUser, logoutUser };
