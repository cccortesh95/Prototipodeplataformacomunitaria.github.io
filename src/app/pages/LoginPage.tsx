import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, Role } from "../context/AuthContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LogIn } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const MOCK_USERS: Record<string, { password: string; nombre: string; role: Role }> = {
  "madre@ecomadre.co":     { password: "madre123",     nombre: "Rosa Martínez",   role: "madre" },
  "inspector@ecomadre.co": { password: "inspector123", nombre: "Carlos Pérez",    role: "inspector" },
  "voluntario@ecomadre.co":{ password: "voluntario123",nombre: "Ana Gómez",       role: "voluntario" },
};

const ROLE_LABELS: Record<Role, string> = {
  madre:      "Madre Comunitaria",
  inspector:  "Inspector",
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md lg:max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Columna izquierda: Logo grande (desktop) / compacto (mobile) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.img
              src="/ecomadre.svg"
              alt="EcoMadre"
              className="w-24 h-24 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mb-3 lg:mb-6 drop-shadow-2xl rounded-full object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <h1 className="text-2xl lg:text-5xl xl:text-6xl font-bold text-[#4a2c5e]">EcoMadre</h1>
            <p className="text-sm lg:text-lg text-[#7c5a8e] mt-1 lg:mt-3 lg:max-w-md">
              Ayudando a las madres comunitarias
            </p>
          </div>

          {/* Columna derecha: Formulario */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="p-8 shadow-xl border-pink-100">
              <h2 className="text-xl font-semibold mb-6 text-center text-[#4a2c5e]">Iniciar sesión</h2>
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
                <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] hover:opacity-90 mt-2 text-white">
                  <LogIn className="w-4 h-4" />
                  Ingresar
                </Button>
              </form>

              {/* Usuarios de prueba */}
              <div className="mt-6 pt-5 border-t border-pink-100">
                <p className="text-xs text-[#7c5a8e] mb-3 text-center font-medium">Usuarios de prueba</p>
                <div className="space-y-2">
                  {Object.entries(MOCK_USERS).map(([email, u]) => (
                    <button
                      key={email}
                      type="button"
                      onClick={() => { setEmail(email); setPassword(u.password); }}
                      className="w-full text-left p-2 rounded-lg bg-pink-50/50 hover:bg-pink-100/60 transition-colors"
                    >
                      <p className="text-xs font-medium text-[#4a2c5e]">{u.nombre}</p>
                      <p className="text-xs text-[#7c5a8e]">{ROLE_LABELS[u.role]} · {email}</p>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
