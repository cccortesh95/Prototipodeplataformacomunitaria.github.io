import { useMemo, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { GraduationCap, Search, CheckCircle2, Clock, Award, Play } from "lucide-react";
import { motion } from "motion/react";
import { tutorialesData, Tutorial } from "../data/mockData";
import { toast } from "sonner";

const CATEGORIAS: Tutorial["categoria"][] = [
  "Voz",
  "Salud",
  "Reportes",
  "Gamificación",
  "Desarrollo",
  "Voluntariado",
  "Planificación",
  "Configuración",
];

export default function Tutoriales() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Tutorial["categoria"] | "Todos">("Todos");

  const filtrados = useMemo(() => {
    return tutorialesData.filter((t) => {
      const matchCat = categoria === "Todos" || t.categoria === categoria;
      const matchBusqueda =
        busqueda.trim() === "" ||
        t.title.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.desc.toLowerCase().includes(busqueda.toLowerCase());
      return matchCat && matchBusqueda;
    });
  }, [busqueda, categoria]);

  const completados = tutorialesData.filter((t) => t.completado).length;
  const total = tutorialesData.length;
  const progreso = Math.round((completados / total) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-8 h-8 text-[#9b59b6]" />
          <h2 className="text-3xl font-bold text-[#4a2c5e]">Tutoriales</h2>
        </div>
        <p className="text-[#7c5a8e]">
          Aprende a tu ritmo con videos cortos. Te recomendamos verlos en momentos de calma, antes
          o después de la jornada con los niños.
        </p>
      </motion.div>

      {/* Banner: aviso de uso (alineado con la intención de cuidado) */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#c76b9f]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#4a2c5e] mb-1">Pensados para tu día a día</h3>
              <p className="text-sm text-[#6b3a7d]">
                Cada tutorial dura entre 2 y 5 minutos. Ideal para verlos antes de iniciar la jornada,
                en la siesta de los niños o al final del día. Te avisaremos cuando sea un buen
                momento para retomarlos.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Progreso */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#9b59b6]" />
              <h3 className="font-semibold text-[#4a2c5e]">Tu progreso</h3>
            </div>
            <span className="text-sm text-[#7c5a8e]">
              {completados} de {total} completados
            </span>
          </div>
          <div className="h-3 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#9b59b6] to-[#c76b9f]"
            />
          </div>
        </Card>
      </motion.div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7c5a8e]" />
            <Input
              placeholder="Buscar tutorial…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategoria("Todos")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                categoria === "Todos"
                  ? "bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                  : "bg-pink-50 text-[#6b3a7d] hover:bg-pink-100"
              }`}
            >
              Todos
            </button>
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => setCategoria(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  categoria === c
                    ? "bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                    : "bg-pink-50 text-[#6b3a7d] hover:bg-pink-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Listado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-5 hover:shadow-lg transition-shadow h-full flex flex-col bg-gradient-to-br from-pink-50/50 to-purple-50/50 border-pink-100">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{t.emoji}</div>
                {t.completado && (
                  <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Completado
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-[#4a2c5e] mb-1">{t.title}</h4>
              <p className="text-xs text-[#7c5a8e] mb-3 leading-relaxed flex-1">{t.desc}</p>
              <div className="flex items-center justify-between text-xs text-[#7c5a8e] mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {t.duration}
                </span>
                <span className="text-[#9b59b6] font-semibold">{t.points}</span>
              </div>
              <Button
                size="sm"
                className="w-full gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] hover:opacity-90 text-white"
                onClick={() => toast.success(`Iniciando "${t.title}"…`)}
              >
                <Play className="w-3.5 h-3.5" />
                {t.completado ? "Repasar" : "Comenzar"}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <Card className="p-10 text-center text-[#7c5a8e]">
          No encontramos tutoriales con ese criterio. Prueba con otra categoría o búsqueda.
        </Card>
      )}
    </div>
  );
}
