import { BrowserRouter, Routes, Route } from "react-router-dom";
import "upkit/dist/style.min.css";
import { Provider } from "react-redux";
import { listen } from "./app/listener";
import store from "./app/store";
import Home from "./pages/Home";
import { useEffect } from "react";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    listen();
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
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
