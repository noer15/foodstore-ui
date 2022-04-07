import { Link } from "react-router-dom";
import {
  Button,
  Card,
  FormControl,
  InputPassword,
  InputText,
  LayoutOne,
} from "upkit";
import StoreLogo from "../../components/StoreLogo";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/auth";
import { userLogin } from "../../features/Auth/actions";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //   let {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     setError,
  //   } = useForm();
  const { register, handleSubmit, errors, setError } = useForm();
  const [status, setStatus] = useState(statuslist.idle);

  const onSubmit = async ({ email, password }) => {
    setStatus(statuslist.process);
    let { data } = await loginUser(email, password);
    if (data.error) {
      setError("password", {
        type: "invalidCredential",
        message: data.message,
      });
      setStatus(statuslist.error);
    } else {
      let { token, user } = data;
      dispatch(userLogin(user, token));
      navigate("/");
    }
    setStatus(statuslist.success);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <LayoutOne size="small">
        <Card color="white">
          <div className="text-center mb-5">
            <StoreLogo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl errorMessage={errors.email?.message}>
              <InputText
                placeholder="email"
                fitContainer
                name="email"
                ref={register(rules.email)}
              />
            </FormControl>

            <FormControl errorMessage={errors.password?.message}>
              <InputPassword
                placeholder="password"
                name="password"
                fitContainer
                ref={register(rules.password)}
              />
            </FormControl>

            <Button fitContainer size="large" disabled={status === "process"}>
              Login
            </Button>
          </form>
          <div className="text-center mt-2">
            Belum punya akun?{" "}
            <Link to="/register">
              <b>Daftar sekarang.</b>
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
