import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const PrivateRouteLogin = () => {
  const [userState] = useContext(UserContext);

  if (!userState.isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const PrivateRouteUser = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.role === 'admin') {
    return <Navigate to={'/list-transactions'} />;
  }
  return <Outlet />;
};

export const PrivateRouteAdmin = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.role !== 'admin') {
    return <Navigate to={'/'} />;
  }
  return <Outlet />;
};