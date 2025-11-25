import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/hooks";
import { selectToken } from "@/slices/authSlice";

const ProtectedRoute = () => {
  const token = useAppSelector(selectToken);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
