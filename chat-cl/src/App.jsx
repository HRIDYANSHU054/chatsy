import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectAuthUser from "./components/RedirectAuthUser";
import { ThemeProvider } from "./contexts/ThemeContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            index: true,
            element: <HomePage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        element: <RedirectAuthUser />,
        children: [
          {
            path: "/sign-up",
            element: <SignUpPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },

      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     element: <ErrorBoundaryLayout />,
//     children: [
//       {
//         element: (
//           <ProtectedRoute>
//             <AppLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           {
//             index: true,
//             element: <Navigate to="/dashboard" replace />,
//           },
//           {
//             path: "dashboard",
//             element: <Dashboard />,
//           },
//           {
//             path: "bookings",
//             element: <Bookings />,
//           },
//           {
//             path: "bookings/:bookingId",
//             element: <Booking />,
//           },
//           {
//             path: "checkin/:bookingId",
//             element: <Checkin />,
//           },
//           {
//             path: "cabins",
//             element: <Cabins />,
//           },
//           {
//             path: "users",
//             element: <Users />,
//           },
//           {
//             path: "settings",
//             element: <Settings />,
//           },
//           {
//             path: "account",
//             element: <Account />,
//           },
//         ],
//       },

//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "*",
//         element: <PageNotFound />,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>

      <Toaster />
    </>
  );
}

export default App;
