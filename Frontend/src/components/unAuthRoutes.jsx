import { Navigate, Outlet } from "react-router-dom";
import { useApp } from '../context/AppContext'

const UnAuthRoutes = () => {
 const { isAuth } = useApp();

  if (isAuth) {
    return <Navigate to={"/chat"} replace />;
  }

  return <Outlet />;
}

export default UnAuthRoutes
