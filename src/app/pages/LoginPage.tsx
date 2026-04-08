import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, Role } from "../context/AuthContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Heart, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const MOCK_USERS: Record<string, { password: string; nombre: string; role: Role }> = {
  "madre@ecomadre.co":     { password: "madre123",     nombre: "Rosa Martínez",   role: "madre" },
  "inspector@ecomadre.co": { password: "inspector123", nombre: "Carlos Pérez",    role: "inspector" },
  "voluntario@ecomadre.co":{ password: "voluntario123",nombre: "Ana Gómez",       role: "voluntario" },
};

const ROLE_LABELS: Record<Role, string> = {
  madre:      "Madre Comunitaria",
  inspector:  "Inspector ICBF",
  voluntario: "Voluntario",
};

const ROLE_HOME: Record<Role, string> = {
  madre:      "/",
  inspector:  "/monitoreo",
  voluntario: "/voluntariado/voluntarios",
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_USERS[email.toLowerCase()];
    if (!found || found.password !== password) {
      toast.error("Correo o contraseña incorrectos");
      return;
    }
    login({ nombre: found.nombre, role: found.role });
    toast.success(`Bienvenido/a, ${found.nombre}`);
    navigate(ROLE_HOME[found.role], { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">EcoMadre</h1>
          <p className="text-sm text-gray-500 mt-1">Ayudando a las madres comunitarias</p>
        </div>

        <Card className="p-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-center">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ecomadre.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 mt-2">
              <LogIn className="w-4 h-4" />
              Ingresar
            </Button>
          </form>

          {/* Usuarios de prueba */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 text-center font-medium">Usuarios de prueba</p>
            <div className="space-y-2">
              {Object.entries(MOCK_USERS).map(([email, u]) => (
                <button
                  key={email}
                  type="button"
                  onClick={() => { setEmail(email); setPassword(u.password); }}
                  className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-xs font-medium text-gray-800">{u.nombre}</p>
                  <p className="text-xs text-gray-500">{ROLE_LABELS[u.role]} · {email}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
