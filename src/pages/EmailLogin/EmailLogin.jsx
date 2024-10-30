import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import logo from "../../assets/images/socialLogin/logo2.png";
import socialBg from "../../assets/images/socialLogin/social bg.jpeg";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios or fetch for API requests

const EmailLogin = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/socialLogin"); // Navigate to the home page or any desired route
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    navigate("/new_reg", { state: { email: data.mail } });

    // Uncomment to enable email existence check
    // try {
    //   // Replace with your API endpoint
    //   const response = await axios.post("/api/check-email", { email: data.mail });

    //   if (response.data.exists) {
    //     // If email is registered, navigate to login page with email
    //     navigate("/login", { state: { email: data.mail } });
    //   } else {
    //     // If email is not registered, navigate to password page with email
    //     navigate("/password", { state: { email: data.mail } });
    //   }
    // } catch (error) {
    //   console.error("Error checking email:", error);
    // }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${socialBg})` }}
    >
      <div className="absolute inset-0 bg-[#072233fb] h-screen "></div>

      <div className="bg-white p-6 rounded-[10px] shadow-xl text-center relative w-[291px] h-[336px]">
        <img src={logo} alt="Logo" className="w-[150px] h-auto mx-auto mb-4" />

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
                    message: "Invalid email format"
                  }
                })}
                name="mail"
                type="text"
                placeholder="メールアドレス"
                className="input border rounded-[3px] py-4 mt-1 mb-[9px] w-[253px] pl-4 font-Noto text-[#44495B80] text-sm"
              />
              {errors.mail && (
                <span className="text-red-500 mt-1">{errors.mail.message}</span>
              )}
            </div>

            <button>
              <ButtonPrimary
                btnText="新規登録"
                style="bg-gradient-to-r from-[#65D0F2] to-[#2399F4] min-w-[253px] rounded-full font-hiragino text-center py-[10px] font-bold text-white"
              />
            </button>
          </form>

          <div className="flex font-hiragino text-xs text-[#626262A6] justify-center gap-2 mt-6 mb-2">
            <button className="">利用規約</button>
            <p>|</p>
            <button>プライバシーポリシー</button>
          </div>
          <Link
            to="/socialLogin"
            className="font-hiragino font-bold text-sm text-[#5297FF]"
          >
            ログイン画面へ
          </Link>
        </div>
      </div>

      <button className="mt-[88px] p-2 relative" onClick={handleClose}>
        <img
          src={closeIcon}
          alt="Close"
          className="w-[17px] h-[17px] text-gray-500 hover:text-gray-700"
        />
      </button>
    </div>
  );
};

export default EmailLogin;
