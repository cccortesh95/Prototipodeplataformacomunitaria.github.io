import { Users, FileText, AlertCircle, TrendingUp, Award } from "lucide-react";
import { Card } from "../components/ui/card";
import BadgeSystem from "../components/BadgeSystem";
import { madreComuniaria, ninos, registros } from "../data/mockData";
import { motion } from "motion/react";

export default function Dashboard() {
  const alertasActivas = registros.filter(r => r.alertaGenerada).length;
  const registrosHoy = registros.filter(r => r.fecha === '2026-04-08').length;
  const ninosActivos = ninos.length;

  const stats = [
    { 
      title: "Niños en Cuidado", 
      value: ninosActivos, 
      icon: Users, 
      color: "bg-blue-500",
      description: "Hogar Los Girasoles"
    },
    { 
      title: "Registros Hoy", 
      value: registrosHoy, 
      icon: FileText, 
      color: "bg-green-500",
      description: "Observaciones nuevas"
    },
    { 
      title: "Alertas Activas", 
      value: alertasActivas, 
      icon: AlertCircle, 
      color: "bg-red-500",
      description: "Requieren atención"
    },
    { 
      title: "Tendencia", 
      value: "+12%", 
      icon: TrendingUp, 
      color: "bg-purple-500",
      description: "vs. semana anterior"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">¡Bienvenida, {madreComuniaria.nombre}!</h2>
              <p className="text-blue-100">
                {madreComuniaria.hogar} • {madreComuniaria.nivel}
              </p>
            </div>
          </div>
        </Card>
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
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">{stat.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Actividad Reciente</h3>
          
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
                    registro.alertaGenerada ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {registro.alertaGenerada ? '🚨' : '📝'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold">
                        {ninos.find(n => n.id === registro.ninoId)?.nombre}
                      </h4>
                      <span className="text-xs text-gray-500">{registro.fecha}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{registro.observacion}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
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
        </div>

        {/* Sistema de Badges */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Tu Progreso</h3>
          <BadgeSystem
            puntos={madreComuniaria.puntosLudificacion}
            certificaciones={madreComuniaria.certificaciones}
            nivel={madreComuniaria.nivel}
          />

          {/* Acceso Rápido */}
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50">
            <h4 className="font-semibold mb-3">Acceso Rápido</h4>
            <div className="space-y-2">
              <a href="/registro" className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <p className="font-medium text-sm">📝 Nuevo Registro</p>
                <p className="text-xs text-gray-600">Agregar observación</p>
              </a>
              <a href="/monitoreo" className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <p className="font-medium text-sm">📊 Ver Alertas</p>
                <p className="text-xs text-gray-600">Revisar monitoreo</p>
              </a>
              <a href="/voluntariado" className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <p className="font-medium text-sm">❤️ Voluntariado</p>
                <p className="text-xs text-gray-600">Necesidades del hogar</p>
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Tutoriales */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Micro-Tutoriales Disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Uso del Asistente de Voz", duration: "2 min", points: "+50 pts" },
            { title: "Detección de Alertas Nutricionales", duration: "3 min", points: "+75 pts" },
            { title: "Cómo Generar Reportes", duration: "4 min", points: "+100 pts" },
          ].map((tutorial, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  ▶
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{tutorial.title}</p>
                  <p className="text-xs text-gray-600">{tutorial.duration}</p>
                </div>
              </div>
              <div className="text-xs text-green-700 font-medium">{tutorial.points}</div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}