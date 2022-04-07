import { BrowserRouter, Routes, Route } from "react-router-dom";
import "upkit/dist/style.min.css";
import { Provider } from "react-redux";
import { listen } from "./app/listener";
import { getCart } from "./api/cart";
import store from "./app/store";
import Home from "./pages/Home";
import { useEffect } from "react";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserAddress from "./pages/UserAddress";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import UserAccount from "./pages/UserAccount";
import UserOrders from "./pages/UserOrders";
import Logout from "./pages/Logout";

function App() {
  useEffect(() => {
    listen();
    getCart();
  }, []);
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/berhasil" element={<RegisterSuccess />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/tambah/alamat-pengirim"
              element={<UserAddressAdd />}
            />
            <Route path="/alamat-pengirim" element={<UserAddress />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/invoice/:order_id" element={<Invoice />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/pesanan" element={<UserOrders />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
