import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import RegistroSimplificado from "./pages/RegistroSimplificado";
import Monitoreo from "./pages/Monitoreo";
import Voluntariado from "./pages/Voluntariado";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "registro", Component: RegistroSimplificado },
      { path: "monitoreo", Component: Monitoreo },
      { path: "voluntariado", Component: Voluntariado },
    ],
  },
]);