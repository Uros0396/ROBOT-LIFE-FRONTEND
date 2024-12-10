import HomePage from "../../Pages/HomePage/HomePage";
import { Outlet } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

const ProtectedRoutes = () => {
  const isAuthorized = isAuth();

  return isAuthorized ? <Outlet /> : <HomePage />;
};

export default ProtectedRoutes;
