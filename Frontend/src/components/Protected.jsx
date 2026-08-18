import { Navigate, Outlet } from "react-router-dom";
import { useApp } from '../context/AppContext'

const ProtectedRoutes = () => {
  const { isAuth } = useApp();

  if (!isAuth) {
    return <Navigate to={"/signin"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

