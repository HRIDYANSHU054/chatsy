import { Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useEffect } from "react";

import Navbar from "./Navbar";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeContext } from "../contexts/ThemeContext";

function AppLayout() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeContext();

  useEffect(
    function () {
      checkAuth();
    },
    [checkAuth],
  );

  if (isCheckingAuth && !authUser)
    return (
      <div
        data-theme={theme}
        className="flex h-screen items-center justify-center"
      >
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <div className="overflow-y-auto scroll-smooth">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
