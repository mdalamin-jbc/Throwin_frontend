import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/axiosPublic";

const AccountActivation = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  
  const hasActivated = useRef(false); // Track if activation has already occurred

  useEffect(() => {
    const activateAccount = async () => {
      // Prevent multiple activations
      if (hasActivated.current) return;

      try {
        // Updated URL path to match the correct endpoint
        const response = await axiosPublic.get(
          `/auth/user/acivate/${userId}/${token}` // Note the "acivate" spelling
        );

        hasActivated.current = true; // Mark as activated

        // Show success message and navigate to onboarding
        Swal.fire({
          title: "Success",
          text: response.data.detail || "Your account has been activated!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/onboarding"); // Navigate to the onboarding page
          }
        });
      } catch (error) {
        // Show error message if activation fails
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

    activateAccount(); // Call the activation function
  }, [userId, token, axiosPublic, navigate]); // Dependency array

  return <div>Activating your account...</div>; // Optional loading message
};

export default AccountActivation;

