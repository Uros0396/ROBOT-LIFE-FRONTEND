import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { isAuth } from "../utils/isAuth";
import { isTokenExpired } from "../utils/verifyToken";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = isAuth();
    if (session) {
      try {
        const decodedSession = jwtDecode(session);
        console.log("Decoded session:", decodedSession);

        const expiredCallback = () => {
          localStorage.removeItem("Authorization");
          navigate("/");
        };

        if (isTokenExpired(decodedSession.exp, expiredCallback)) {
          setSessionData(null);
        } else {
          setSessionData({
            token: session,
            ...decodedSession,
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("Authorization");
        setSessionData(null);
        navigate("/");
      }
    } else {
      setSessionData(null);
      navigate("/");
    }
  }, [navigate]);

  return sessionData;
};

export default useSession;
