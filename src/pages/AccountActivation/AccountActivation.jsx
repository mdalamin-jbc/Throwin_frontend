import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";

const AccountActivation = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const hasActivated = useRef(false); // Flag to prevent double calls

  useEffect(() => {
    const activateAccount = async () => {
      if (hasActivated.current) return; // Exit if already called once
      hasActivated.current = true; // Set flag after first call

      try {
        const response = await axiosPublic.get(`/auth/user/acivate/${userId}/${token}`);
        if (response.data.detail === "Account Activated Successfully") {
          Swal.fire({
            title: "Success",
            text: response.data.detail || "Your account has been activated!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/onboarding"));
        }
      } catch (error) {
        Swal.fire({
          title: "Activation Failed",
          text: error.response
            ? error.response.data.detail
            : "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token, navigate]);

  return <div></div>;
};

export default AccountActivation;

