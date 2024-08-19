import { Navigate, useLocation } from "react-router-dom";
import { routeNames } from "../config";

export function PrivateRoute({ children }) {
  const { pathname } = useLocation();
  const token = 1;

  return token ? <>{children}</> : <Navigate to={routeNames.SignIn} replace state={{ redirect: pathname }} />;
}
