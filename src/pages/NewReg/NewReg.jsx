import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosReg, { fetchCSRFToken } from "../../hooks/axiosReg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Password = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosReg = useAxiosReg();

  const { email } = location.state || {};
  console.log(email);

  // Fetch the CSRF token on component mount
  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const handleClose = () => {
    navigate("/socialLogin");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    const requestData = {
      email,
      password: data.password,
      confirm_password: data.confirmPassword,
    };

    console.log("Request data:", requestData);

    try {
      const response = await axiosReg.post(
        "/auth/register/consumer",
        requestData
      );

      if (response.data.detail === "User Created Successfully") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.detail : "An error occurred."
      );
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen"></div>

      <div className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[490px]">
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label font-bold text-sm">
                <span className="label-text font-hiragino">パスワード設定</span>
              </label>
              <input
                {...register("password", { required: true })}
                name="password"
                type="password"
                placeholder="パスワード"
                className="input border rounded-[3px] py-4 mt-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.password && (
                <span className="text-red-500 mt-1">Password is required</span>
              )}
            </div>
            <div className="form-control">
              <input
                {...register("confirmPassword", {
                  required: "Confirmation is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                name="confirmPassword"
                type="password"
                placeholder="パスワード（確認用）"
                className="input border rounded-[3px] py-4 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 my-1">
                  Confirmation is required
                </span>
              )}
            </div>

            <button>
              <ButtonPrimary
                btnText="登録"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <div className="mt-11 grid gap-4 font-hiragino font-light text-[10px] text-start text-[#6B6969]">
            <p>ご利用情報がSNSに公開されることはありません。</p>
            <p>
              複数アカウントの作成、保有、または利用する行為は
              禁止されており、会員アカウントを停止・永久凍結も
              しくは強制退化させていただきます。
            </p>
          </div>
        </div>
      </div>

      <button className="mt-6 p-2 relative" onClick={handleClose}>
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </button>
    </div>
  );
};

export default Password;
