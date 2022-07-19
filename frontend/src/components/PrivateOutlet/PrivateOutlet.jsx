import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateOutlet() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateOutlet;
