import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, FileText, BarChart3, Heart, Users, Menu, X, LogOut, GraduationCap, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import ChatBot from "../components/ChatBot";
import { useAuth, Role } from "../context/AuthContext";

type NavItem = { name: string; path: string; icon: React.ElementType };

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  madre: [
    { name: "Inicio",       path: "/",                         icon: Home },
    { name: "Registro",     path: "/registro",                 icon: FileText },
    { name: "Monitoreo",    path: "/monitoreo",                icon: BarChart3 },
    { name: "Voluntariado", path: "/voluntariado/madres",      icon: Heart },
    { name: "Comunidad",    path: "/comunidad",                icon: MessageCircle },
    { name: "Tutoriales",   path: "/tutoriales",               icon: GraduationCap },
  ],
  inspector: [
    { name: "Monitoreo",    path: "/monitoreo",                icon: BarChart3 },
    { name: "Necesidades",  path: "/voluntariado/madres",      icon: Heart },
    { name: "Voluntarios",  path: "/voluntariado/voluntarios", icon: Users },
  ],
  voluntario: [
    { name: "Voluntariado", path: "/voluntariado/voluntarios", icon: Users },
    { name: "Comunidad",    path: "/comunidad",                icon: MessageCircle },
  ],
};

const ROLE_LABELS: Record<Role, string> = {
  madre:      "Madre Comunitaria",
  inspector:  "Inspector",
  voluntario: "Voluntario",
};

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = user ? NAV_BY_ROLE[user.role] : [];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/ecomadre.svg" alt="EcoMadre" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
              <div>
                <h1 className="font-bold text-lg sm:text-xl text-[#4a2c5e]">EcoMadre</h1>
                <p className="text-xs text-[#7c5a8e] hidden sm:block">Ayudando a las madres comunitarias</p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-2 items-center">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button variant={isActive(item.path) ? "default" : "ghost"} className={isActive(item.path) ? "gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white" : "gap-2 text-[#6b3a7d] hover:bg-pink-50"}>
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              {/* User info + logout */}
              {user && (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-pink-200">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium text-[#4a2c5e]">{user.nombre}</p>
                    <p className="text-xs text-[#7c5a8e]">{ROLE_LABELS[user.role]}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-[#7c5a8e] hover:text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Salir</span>
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant={isActive(item.path) ? "default" : "ghost"} className={isActive(item.path) ? "w-full justify-start gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white" : "w-full justify-start gap-2 text-[#6b3a7d]"}>
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              {user && (
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-600" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión — {user.nombre}
                </Button>
              )}
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      <ChatBot />
    </div>
  );
}
