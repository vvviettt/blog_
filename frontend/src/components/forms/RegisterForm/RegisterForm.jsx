import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { register as registerCreate } from "~/features/registerSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required("Tên là bắt buộc"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      username: yup
        .string()
        .min(5, "Tên tài khoản quá ngắn")
        .max(20, "Tên tài khoản quá dài")
        .matches(
          /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
          "Tên tài khoản khồng hợp lệ"
        )
        .required("Tên tài khoản là bắt buộc"),
      password: yup
        .string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
          "Password không hợp lệ"
        )
        .required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const action = registerCreate({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    });
    const result = unwrapResult(await dispatch(action));

    if (result.error) {
      return toast.error(result.message);
    }
    toast.success(result.message);
    setTimeout(() => {
      navigate("/account/login");
    }, 3000);
  };
  return (
    <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-7">
        <input
          className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
          type="text"
          placeholder="Tên của bạn"
          {...register("name", { required: true })}
        />
        <p className="absolute top-full text-[#f56c6c] text-[14px]">
          {errors.name?.message}
        </p>
      </div>
      <div className="flex">
        <div className="relative mb-7 w-1/2 pr-1">
          <input
            className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
            type="text"
            placeholder="Email của bạn"
            {...register("email", { required: true })}
          />
          <p className="absolute top-full text-[#f56c6c] text-[14px]">
            {errors.name?.email}
          </p>
        </div>
        <div className="relative mb-7 w-1/2 pl-1">
          <input
            className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
            type="text"
            placeholder="Tên của bạn"
            {...register("username", { required: true })}
          />
          <p className="absolute top-full text-[#f56c6c] text-[14px]">
            {errors.username?.message}
          </p>
        </div>
      </div>
      <div className="relative mb-7 w-full ">
        <input
          className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
          type="text"
          placeholder="Tên của bạn"
          {...register("password", { required: true })}
        />
        <p className="absolute top-full text-[#f56c6c] text-[14px]">
          {errors.name?.message}
        </p>
      </div>
      <div className="relative mb-7 w-full ">
        <input
          className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
          type="text"
          placeholder="Tên của bạn"
          {...register("confirmPassword", { required: true })}
        />
        <p className="absolute top-full text-[#f56c6c] text-[14px]">
          {errors.name?.confirmPassword}
        </p>
      </div>
      <div className="mb-3">
        <p className="text-[14px] ">
          Đã có tài khoản?
          <Link className="hover:underline text-[#007bff]" to="/account/login">
            Đăng nhập
          </Link>
        </p>
      </div>
      <button
        className="w-full bg-[#007bff] px-5 py-2 my-2 rounded text-white font-semibold"
        type="submit"
      >
        Đăng kí
      </button>
    </form>
  );
}

export default RegisterForm;
