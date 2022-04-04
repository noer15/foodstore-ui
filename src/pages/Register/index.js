import {
  Button,
  Card,
  FormControl,
  InputPassword,
  InputText,
  LayoutOne,
} from "upkit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import StoreLogo from "../../components/StoreLogo";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Register() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [status, setStatus] = useState(statuslist.idle);
  const onSubmit = async (formData) => {
    let { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      setError("password_confirmation", "notMatch", "Password not match");
      return;
    }
    setStatus(statuslist.process);
    let { data } = await registerUser(formData);
    if (data.error) {
      // (2) dapatkan field terkait jika ada errors
      let fields = Object.keys(data.fields);

      // (3) untuk masing-masing field kita terapkan error dan tangkap pesan errornya
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      setStatus(statuslist.error);
    }
    setStatus(statuslist.success);
    navigate("/register/berhasil");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <LayoutOne size="small">
        <Card color="white">
          <div className="text-center mb-3">
            <StoreLogo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              errorMessage={
                errors.full_name && rules.full_name?.required?.message
              }
            >
              <InputText
                name="full_name"
                placeholder="Nama Lengkap"
                fitContainer
                {...register("full_name", {
                  required: rules.full_name?.required,
                  maxLength: rules.full_name?.maxLength,
                })}
              />
            </FormControl>
            {/* (2) Input Email */}
            <FormControl
              errorMessage={errors.email && rules.email?.required?.message}
            >
              <InputText
                name="email"
                placeholder="Email"
                fitContainer
                {...register("email", {
                  required: rules.email?.required,
                  maxLength: rules.email?.maxLength,
                })}
              />
            </FormControl>
            {/* (3) Input Password */}
            <FormControl
              errorMessage={
                errors.password && rules.password?.required?.message
              }
            >
              <InputPassword
                name="password"
                placeholder="Password"
                fitContainer
                {...register("password", {
                  required: rules.password?.required,
                  maxLength: rules.password?.maxLength,
                })}
              />
            </FormControl>

            {/* (4) Input Konfirmasi Password */}
            <FormControl
              errorMessage={
                errors.password_confirmation &&
                rules.password_confirmation?.required?.message
              }
            >
              <InputPassword
                name="password_confirmation"
                placeholder="Konfirmasi Password"
                fitContainer
                {...register("password_confirmation", {
                  required: rules.password_confirmation?.required,
                })}
              />
            </FormControl>
            <Button
              size="large"
              fitContainer
              disabled={status === statuslist.process}
            >
              {status === statuslist.process ? "Processing..." : "Register"}
            </Button>
          </form>
          <div className="text-center mt-2">
            Sudah punya akun?{" "}
            <Link to="/login">
              {" "}
              <b> Masuk Sekarang. </b>{" "}
            </Link>
          </div>
        </Card>
      </LayoutOne>
    </div>
  );
}
