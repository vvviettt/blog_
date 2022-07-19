import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "~/features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object({
    username: yup
      .string()
      .min(5, "Email hoặc tên tài khoản không hợp lệ")
      .required("Nhập trường này"),
    password: yup.string().required("Nhập trường này"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const action = login({ username: data.username, password: data.password });
    const result = unwrapResult(await dispatch(action));
    if (result.error) {
      return toast.error(result.message);
    }
    toast.success(result.message);
    navigate("/");
  };
  return (
    <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-7">
        <input
          className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
          type="text"
          placeholder="Email hoặc tên đăng nhập"
          {...register("username", { required: true })}
        />
        <p className="absolute top-full text-[#f56c6c] text-[14px]">
          {errors.username?.message}
        </p>
      </div>
      <div className="flex">
        <div className="relative mb-7 w-full ">
          <input
            className="outline-none border border-solid border-[#606266] w-full h-10 leading-10 px-4 rounded"
            type="password"
            placeholder="Mật khẩu "
            {...register("password", { required: true })}
          />
          <p className="absolute top-full text-[#f56c6c] text-[14px]">
            {errors.password?.message}
          </p>
        </div>
      </div>
      <button
        className="w-full bg-[#007bff] px-5 py-2 my-2 rounded text-white font-semibold"
        type="submit"
      >
        Đăng nhập
      </button>
      <div>
        <Link
          className="text-[14px]  hover:underline text-[#007bff]"
          to="/account/register"
        >
          Tạo tài khoản?
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
