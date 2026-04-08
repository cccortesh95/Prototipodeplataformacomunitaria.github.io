import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { ShieldOff } from "lucide-react";

const ROLE_HOME: Record<string, string> = {
  madre:      "/",
  inspector:  "/monitoreo",
  voluntario: "/voluntariado/voluntarios",
};

export default function Unauthorized() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-6">
      <ShieldOff className="w-16 h-16 text-red-400" />
      <h2 className="text-2xl font-bold text-gray-800">Acceso no permitido</h2>
      <p className="text-gray-500 max-w-sm">No tienes permiso para ver esta página.</p>
      <Button onClick={() => navigate(user ? ROLE_HOME[user.role] : "/login")}>
        Volver al inicio
      </Button>
    </div>
  );
}
