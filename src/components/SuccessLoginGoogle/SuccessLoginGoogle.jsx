import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessLoginGoogle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("Authorization", JSON.stringify(token));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [location, navigate]);

  return <div>Successfully Login</div>;
};

export default SuccessLoginGoogle;
