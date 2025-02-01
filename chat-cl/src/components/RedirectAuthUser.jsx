import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

function RedirectAuthUser() {
  const { authUser } = useAuthStore();

  return authUser ? <Navigate to="/" replace /> : <Outlet />;
}

export default RedirectAuthUser;
