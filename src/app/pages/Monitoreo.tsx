import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import AlertCard from "../components/AlertCard";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { desarrolloData, alertasData, ninos } from "../data/mockData";
import { Download, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Monitoreo() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes");

  const alertas = [
    {
      id: '1',
      tipo: 'critico' as const,
      categoria: 'Nutrición',
      mensaje: 'No ha comido bien en los últimos 3 días. Requiere evaluación nutricional urgente.',
      nino: 'Carlos López',
      fecha: '2026-04-06'
    },
    {
      id: '2',
      tipo: 'critico' as const,
      categoria: 'Salud',
      mensaje: 'Presenta fiebre y rechazó el almuerzo. Necesita evaluación médica.',
      nino: 'Juanito Pérez',
      fecha: '2026-04-08'
    },
    {
      id: '3',
      tipo: 'medio' as const,
      categoria: 'Desarrollo',
      mensaje: 'Bajo rendimiento en actividades de motricidad fina.',
      nino: 'María García',
      fecha: '2026-04-07'
    },
  ];

  const handleGenerateReport = () => {
    toast.success("Generando reporte automático...", { duration: 2000 });
    setTimeout(() => {
      toast.success("Reporte descargado exitosamente", { duration: 3000 });
    }, 2000);
  };

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Monitoreo Infantil</h2>
            </div>
            <p className="text-gray-600">
              Seguimiento de desarrollo y alertas tempranas
            </p>
          </div>
          <Button onClick={handleGenerateReport} className="gap-2">
            <Download className="w-4 h-4" />
            Generar Reporte
          </Button>
        </div>
      </motion.div>

      {/* Alertas Críticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 border-l-4 border-red-500 bg-red-50">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-red-900 mb-2">
                Alertas Críticas Activas
              </h3>
              <p className="text-sm text-red-800 mb-4">
                Se han detectado {alertas.filter(a => a.tipo === 'critico').length} situaciones 
                que requieren atención inmediata de los trabajadores sociales del ICBF.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-200 text-red-900 rounded-full text-sm font-medium">
                  🚨 {alertas.filter(a => a.tipo === 'critico').length} Críticas
                </span>
                <span className="px-3 py-1 bg-orange-200 text-orange-900 rounded-full text-sm font-medium">
                  ⚠️ {alertas.filter(a => a.tipo === 'medio').length} Medias
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs de Contenido */}
      <Tabs defaultValue="alertas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alertas">Alertas Tempranas</TabsTrigger>
          <TabsTrigger value="graficos">Visualizaciones</TabsTrigger>
          <TabsTrigger value="ninos">Listado de Niños</TabsTrigger>
        </TabsList>

        {/* Tab de Alertas */}
        <TabsContent value="alertas" className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {alertas.map((alerta, idx) => (
              <motion.div
                key={alerta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <AlertCard alert={alerta} />
              </motion.div>
            ))}
          </motion.div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h4 className="font-semibold mb-2">📋 ¿Cómo se generan las alertas?</h4>
            <p className="text-sm text-gray-700">
              El sistema analiza patrones de comportamiento, alimentación y salud. 
              Las alertas se generan automáticamente cuando se detectan:
            </p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4">
              <li>• Ausencia de comidas por más de 2 días</li>
              <li>• Síntomas de enfermedad (fiebre, tos, dolor)</li>
              <li>• Cambios bruscos en comportamiento</li>
              <li>• Retrasos en desarrollo motor o cognitivo</li>
            </ul>
          </Card>
        </TabsContent>

        {/* Tab de Gráficos */}
        <TabsContent value="graficos" className="space-y-6">
          {/* Controles */}
          <div className="flex gap-2">
            <Button
              variant={selectedPeriod === "semana" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("semana")}
              size="sm"
            >
              Semana
            </Button>
            <Button
              variant={selectedPeriod === "mes" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("mes")}
              size="sm"
            >
              Mes
            </Button>
            <Button
              variant={selectedPeriod === "trimestre" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("trimestre")}
              size="sm"
            >
              Trimestre
            </Button>
          </div>

          {/* Gráfico de Desarrollo */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Tendencia de Desarrollo - Juanito Pérez</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={desarrolloData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="peso" stroke="#3b82f6" strokeWidth={2} name="Peso (kg)" />
                <Line type="monotone" dataKey="talla" stroke="#10b981" strokeWidth={2} name="Talla (cm)" />
                <Line type="monotone" dataKey="desarrolloMotor" stroke="#f59e0b" strokeWidth={2} name="Desarrollo Motor %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Barras */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Alertas por Categoría</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={alertasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Gráfico de Pastel */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Distribución de Alertas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={alertasData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.categoria}: ${entry.cantidad}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cantidad"
                  >
                    {alertasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Niños */}
        <TabsContent value="ninos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ninos.map((nino, idx) => (
              <motion.div
                key={nino.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`p-4 border-l-4 ${
                  nino.riesgoNutricional === 'alto' ? 'border-red-500 bg-red-50' :
                  nino.riesgoNutricional === 'medio' ? 'border-orange-500 bg-orange-50' :
                  'border-green-500 bg-green-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{nino.nombre}</h4>
                      <p className="text-sm text-gray-600">{nino.edad} años</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      nino.riesgoNutricional === 'alto' ? 'bg-red-200 text-red-900' :
                      nino.riesgoNutricional === 'medio' ? 'bg-orange-200 text-orange-900' :
                      'bg-green-200 text-green-900'
                    }`}>
                      {nino.riesgoNutricional.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Hogar:</strong> {nino.hogarComunitario}
                    </p>
                    <p className="text-gray-700">
                      <strong>Última revisión:</strong> {nino.ultimaRevision}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Ver Historial Completo
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}