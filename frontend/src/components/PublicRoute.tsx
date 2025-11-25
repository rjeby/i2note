import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/hooks";
import { selectToken } from "@/slices/authSlice";

const PublicRoute = () => {
  const token = useAppSelector(selectToken);
  return !token ? <Outlet /> : <Navigate to="/account" />;
};

export default PublicRoute;
