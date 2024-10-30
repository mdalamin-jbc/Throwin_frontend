import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import useAxiosPublic from "../../hooks/axiosPublic";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const { email = "" } = location.state || {};

  const handleClose = () => {
    navigate("/socialLogin");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post(`/auth/login`, {
        email: data.mail,
        password: data.password,
      });

      if (response.data.msg === "Login Successful") {
        console.log("Login successful!", response.data);

        // Set access and refresh tokens in cookies
        Cookies.set("access_token", response.data.data.access, { expires: 7 });
        Cookies.set("refresh_token", response.data.data.refresh, {
          expires: 7,
        });

        // Show SweetAlert success message
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${response.data.msg}`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigate to the dashboard after successful login
        navigate("/gacha");
      } else {
        console.error("Login failed:", response.data.msg);

        Swal.fire({
          position: "top",
          icon: "error",
          title: `${response.data.msg}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error
      );
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${error.response?.data.msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen"></div>

      <div className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[460px]">
        {/* Logo Image */}
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

        {/* email input */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label flex font-bold text-sm">
                <span className="label-text font-Noto">メールアドレス</span>
              </label>
              <input
                {...register("mail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                name="mail"
                type="mail"
                placeholder="メールアドレス"
                className="input border rounded-[3px] py-4 mt-1 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.mail && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label flex justify-between items-center">
                <span className="label-text font-bold text-sm font-Noto">
                  パスワード
                </span>
                <Link className="label-text text-[10px] font-hiragino text-[#5297FF]">
                  パスワードをお忘れですか？
                </Link>
              </label>
              <input
                {...register("password", { required: true })}
                name="password"
                type="password"
                placeholder="パスワード"
                className="input border rounded-[3px] font-Noto py-4 mt-1 mb-[9px] w-[253px] pl-4 text-[#44495B80] text-sm"
              />
              {errors.password && (
                <span className="text-red-500 my-1 font-Noto">
                  パスワードが必要です
                </span>
              )}
            </div>

            <button>
              <ButtonPrimary
                btnText="登録"
                style="font-hiragino bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <Link
            to="/socialLogin"
            className="font-bold text-sm text-[#5297FF] mt-3 font-hiragino"
          >
            会員登録がまだの方はこちら
          </Link>
        </div>
      </div>

      {/* Close Icon Button Below the Form */}
      <button
        className="mt-6 p-2 relative"
        onClick={handleClose} // Call handleClose on click
      >
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700" // Apply your desired styles here
        />
      </button>
    </div>
  );
};

export default Login;
