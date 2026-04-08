import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import RegistroSimplificado from "./pages/RegistroSimplificado";
import Monitoreo from "./pages/Monitoreo";
import VoluntariadoMadres from "./pages/VoluntariadoMadres";
import VoluntariadoVoluntarios from "./pages/VoluntariadoVoluntarios";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login",        element: <LoginPage /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={["madre"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "registro",
        element: (
          <ProtectedRoute allowedRoles={["madre"]}>
            <RegistroSimplificado />
          </ProtectedRoute>
        ),
      },
      {
        path: "monitoreo",
        element: (
          <ProtectedRoute allowedRoles={["madre", "inspector"]}>
            <Monitoreo />
          </ProtectedRoute>
        ),
      },
      {
        path: "voluntariado/madres",
        element: (
          <ProtectedRoute allowedRoles={["madre", "inspector"]}>
            <VoluntariadoMadres />
          </ProtectedRoute>
        ),
      },
      {
        path: "voluntariado/voluntarios",
        element: (
          <ProtectedRoute allowedRoles={["inspector", "voluntario"]}>
            <VoluntariadoVoluntarios />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Navigate to="/unauthorized" replace /> },
    ],
  },
]);
