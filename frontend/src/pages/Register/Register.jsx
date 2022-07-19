import { RegisterForm } from "~/components/forms";

function Register() {
  return (
    <>
      <h2 className="font-normal text-[22px] mb-3">
        Đăng ký tài khoản cho Viblo
      </h2>
      <p className="text-[14px] mt-2">
        Chào mừng bạn đến Nền tảng Viblo! Tham gia cùng chúng tôi để tìm kiếm
        thông tin hữu ích cần thiết để cải thiện kỹ năng IT của bạn. Vui lòng
        điền thông tin của bạn vào biểu mẫu bên dưới để tiếp tục.
      </p>
      <RegisterForm />
    </>
  );
}

export default Register;
