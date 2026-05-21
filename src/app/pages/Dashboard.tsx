import { Users, FileText, AlertCircle, TrendingUp, Award, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import BadgeSystem from "../components/BadgeSystem";
import { madreComuniaria, ninos, registros, tutorialesData } from "../data/mockData";
import { motion } from "motion/react";

export default function Dashboard() {
  const alertasActivas = registros.filter((r) => r.alertaGenerada).length;
  const registrosHoy = registros.filter((r) => r.fecha === "2026-04-08").length;
  const ninosActivos = ninos.length;

  const tutorialesPendientes = tutorialesData.filter((t) => !t.completado).slice(0, 3);

  const stats = [
    { title: "Niños en Cuidado", value: ninosActivos, icon: Users,       color: "bg-[#9b59b6]", description: "Hogar Los Girasoles" },
    { title: "Registros Hoy",    value: registrosHoy, icon: FileText,    color: "bg-[#4a9e4a]", description: "Observaciones nuevas" },
    { title: "Alertas Activas",  value: alertasActivas, icon: AlertCircle, color: "bg-red-500",  description: "Requieren atención" },
    { title: "Tendencia",        value: "+12%",       icon: TrendingUp,  color: "bg-[#c76b9f]", description: "vs. semana anterior" },
  ];

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">¡Bienvenida, {madreComuniaria.nombre}!</h2>
              <p className="text-pink-100">
                {madreComuniaria.hogar} • {madreComuniaria.nivel}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Acceso Rápido (horizontal, parte superior) */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h3 className="text-lg font-semibold text-[#4a2c5e] mb-3">Acceso Rápido</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: "/registro",            emoji: "📝", title: "Nuevo Registro", desc: "Agregar observación" },
            { to: "/monitoreo",           emoji: "📊", title: "Ver Alertas",    desc: "Revisar monitoreo" },
            { to: "/voluntariado/madres", emoji: "❤️", title: "Voluntariado",   desc: "Necesidades del hogar" },
            { to: "/comunidad",           emoji: "💬", title: "Comunidad",      desc: "Comparte con otras madres" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-pink-100 hover:border-[#c76b9f]"
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className="font-medium text-sm text-[#4a2c5e]">{item.title}</p>
              <p className="text-xs text-[#7c5a8e] mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#4a2c5e]">{stat.value}</div>
                  </div>
                </div>
                <h3 className="font-semibold text-[#4a2c5e]">{stat.title}</h3>
                <p className="text-sm text-[#7c5a8e] mt-1">{stat.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-[#4a2c5e]">Actividad Reciente</h3>

          {registros.slice(0, 3).map((registro, idx) => (
            <motion.div
              key={registro.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    registro.alertaGenerada ? "bg-red-100" : "bg-pink-100"
                  }`}>
                    {registro.alertaGenerada ? "🚨" : "📝"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-[#4a2c5e]">
                        {ninos.find((n) => n.id === registro.ninoId)?.nombre}
                      </h4>
                      <span className="text-xs text-[#7c5a8e]">{registro.fecha}</span>
                    </div>
                    <p className="text-sm text-[#4a2c5e] mb-2">{registro.observacion}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-pink-50 text-[#6b3a7d] rounded">
                        {registro.tipo}
                      </span>
                      {registro.alertaGenerada && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                          Alerta generada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Tutoriales sugeridos (resumen — el detalle va en la pestaña /tutoriales) */}
          <Card className="p-5 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#9b59b6]" />
                <h3 className="font-semibold text-[#4a2c5e]">Continúa tu aprendizaje</h3>
              </div>
              <Link to="/tutoriales">
                <Button size="sm" variant="ghost" className="gap-1 text-[#6b3a7d] hover:bg-pink-100/60">
                  Ver todos <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tutorialesPendientes.map((t) => (
                <Link
                  key={t.id}
                  to="/tutoriales"
                  className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl mb-1">{t.emoji}</div>
                  <p className="font-medium text-sm text-[#4a2c5e] line-clamp-1">{t.title}</p>
                  <p className="text-xs text-[#7c5a8e] mt-1">⏱ {t.duration}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Sistema de Badges */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#4a2c5e]">Tu Progreso</h3>
          <BadgeSystem
            puntos={madreComuniaria.puntosLudificacion}
            certificaciones={madreComuniaria.certificaciones}
            nivel={madreComuniaria.nivel}
          />
        </div>
      </div>
    </div>
  );
}
