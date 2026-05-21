import { useMemo, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Heart, MapPin, Users, CheckCircle, MessageCircle, Send, X, ArrowUp, Clock, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { conversacionesVoluntario, ConversacionVoluntario, MensajeChat } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import VoiceReplyButton from "../components/VoiceReplyButton";

interface Necesidad {
  id: string;
  hogar: string;
  madre: string;
  tipo: string;
  descripcion: string;
  prioridad: "Alta" | "Media" | "Baja";
  fecha: string;
}

const necesidades: Necesidad[] = [
  { id: "1", hogar: "Los Girasoles",  madre: "Rosa Fernández", tipo: "Materiales Didácticos", descripcion: "Se necesitan libros de cuentos y material de motricidad fina", prioridad: "Media", fecha: "2026-04-05" },
  { id: "2", hogar: "Las Margaritas", madre: "Laura Gómez",    tipo: "Alimentos",            descripcion: "Frutas frescas y verduras para complementar nutrición",        prioridad: "Alta",  fecha: "2026-04-07" },
  { id: "3", hogar: "Los Girasoles",  madre: "Rosa Fernández", tipo: "Equipamiento",         descripcion: "Juguetes educativos para desarrollo cognitivo",                prioridad: "Baja", fecha: "2026-04-03" },
  { id: "4", hogar: "Los Naranjos",   madre: "Diana Castillo", tipo: "Vestuario",            descripcion: "Ropa de abrigo para los niños en temporada de lluvias",        prioridad: "Alta", fecha: "2026-03-30" },
];

const prioridadStyles: Record<string, { border: string; bg: string; badge: string; orden: number }> = {
  Alta:  { border: "border-red-500",    bg: "bg-red-50",    badge: "bg-red-200 text-red-900",       orden: 1 },
  Media: { border: "border-orange-500", bg: "bg-orange-50", badge: "bg-orange-200 text-orange-900", orden: 2 },
  Baja:  { border: "border-[#9b59b6]",  bg: "bg-pink-50",   badge: "bg-pink-200 text-[#6b3a7d]",    orden: 3 },
};

function diasDesde(fecha: string): number {
  const d = new Date(fecha);
  const hoy = new Date();
  return Math.max(0, Math.floor((hoy.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)));
}

export default function VoluntariadoVoluntarios() {
  const { user } = useAuth();
  const [conversaciones, setConversaciones] = useState<ConversacionVoluntario[]>(conversacionesVoluntario);
  const [chatActivo, setChatActivo] = useState<string | null>(null);
  const [mensajeBorrador, setMensajeBorrador] = useState("");

  // Ordenamiento por jerarquía: prioridad (Alta > Media > Baja) y antigüedad (más antiguo primero)
  const necesidadesOrdenadas = useMemo(() => {
    return [...necesidades].sort((a, b) => {
      const dif = prioridadStyles[a.prioridad].orden - prioridadStyles[b.prioridad].orden;
      if (dif !== 0) return dif;
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
  }, []);

  const handleAyudar = (n: Necesidad) => {
    // Si no hay conversación, la creamos automáticamente y abrimos el chat
    let conv = conversaciones.find((c) => c.necesidadId === n.id);
    if (!conv && user) {
      conv = {
        id: `conv-${n.id}`,
        necesidadId: n.id,
        hogar: n.hogar,
        madre: n.madre,
        voluntario: user.nombre,
        ultimaActividad: "Ahora",
        mensajes: [],
      };
      setConversaciones([conv, ...conversaciones]);
    }
    setChatActivo(conv?.id ?? null);
    toast.success(`Conversación abierta con ${n.madre}. Coordina la entrega aquí mismo.`);
  };

  const enviarMensaje = (esVoz = false) => {
    if (!mensajeBorrador.trim() || !chatActivo || !user) return;
    const nuevo: MensajeChat = {
      id: `m${Date.now()}`,
      remitente: user.nombre,
      rolRemitente: "voluntario",
      contenido: mensajeBorrador,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      esVoz,
    };
    setConversaciones(
      conversaciones.map((c) =>
        c.id === chatActivo
          ? { ...c, mensajes: [...c.mensajes, nuevo], ultimaActividad: "Ahora" }
          : c
      )
    );
    setMensajeBorrador("");
  };

  const conversacionActiva = conversaciones.find((c) => c.id === chatActivo);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-[#9b59b6]" />
          <h2 className="text-3xl font-bold text-[#4a2c5e]">Voluntariado — Voluntarios</h2>
        </div>
        <p className="text-[#7c5a8e]">
          Explora las necesidades activas y conversa directamente con las madres comunitarias.
        </p>
      </motion.div>

      {/* Cómo funciona */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-[#9b59b6]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#4a2c5e]">¿Cómo ser voluntario?</h3>
              <p className="text-[#6b3a7d] text-sm">
                Las necesidades aparecen ordenadas por urgencia y antigüedad. Elige una y abre una
                conversación directa con la madre comunitaria del hogar para coordinar la entrega.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {["Proceso seguro y verificado", "Comunicación directa con la madre", "Acompañamiento profesional"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-[#6b3a7d]">
                    <CheckCircle className="w-4 h-4 text-[#9b59b6]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Necesidades activas */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#7c5a8e]" />
            <h3 className="text-xl font-semibold text-[#4a2c5e]">Necesidades Activas</h3>
          </div>
          <span className="flex items-center gap-1 text-xs text-[#7c5a8e]">
            <ArrowUp className="w-3 h-3" />
            Ordenadas por urgencia y antigüedad
          </span>
        </div>
        <div className="space-y-4">
          {necesidadesOrdenadas.map((n, idx) => {
            const s = prioridadStyles[n.prioridad];
            const dias = diasDesde(n.fecha);
            const conv = conversaciones.find((c) => c.necesidadId === n.id);
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
              >
                <Card className={`p-4 border-l-4 ${s.border} ${s.bg}`}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-[#7c5a8e]" />
                          <h4 className="font-semibold text-[#4a2c5e]">{n.hogar}</h4>
                          <span className="text-xs text-[#7c5a8e]">· con {n.madre}</span>
                        </div>
                        <p className="text-sm text-[#7c5a8e]">{n.tipo}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${s.badge} flex-shrink-0`}>
                        {n.prioridad}
                      </span>
                    </div>
                    <p className="text-[#4a2c5e]">{n.descripcion}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="flex items-center gap-1 text-xs text-[#7c5a8e]">
                        <Clock className="w-3 h-3" />
                        Publicado hace {dias} {dias === 1 ? "día" : "días"}
                      </span>
                      <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                        {conv && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setChatActivo(conv.id)}
                            className="gap-2 border-[#9b59b6] text-[#6b3a7d] hover:bg-pink-50 w-full sm:w-auto"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Continuar conversación
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleAyudar(n)}
                          className="gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white w-full sm:w-auto"
                        >
                          <Heart className="w-4 h-4" />
                          {conv ? "Quiero ayudar" : "Quiero ayudar y escribir"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal de chat */}
      <AnimatePresence>
        {conversacionActiva && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setChatActivo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header chat */}
              <div className="bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold leading-none">{conversacionActiva.madre}</h3>
                  <p className="text-xs opacity-90 mt-1">{conversacionActiva.hogar}</p>
                </div>
                <button
                  onClick={() => setChatActivo(null)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Aviso de privacidad */}
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 leading-snug">
                  Por la seguridad de los niños, no se comparten sus nombres, fotos ni datos personales en este chat.
                  Coordina aquí únicamente la entrega del aporte.
                </p>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-pink-50/30">
                {conversacionActiva.mensajes.length === 0 && (
                  <p className="text-center text-sm text-[#7c5a8e] py-8">
                    Inicia la conversación con un saludo amable. La madre te responderá pronto.
                  </p>
                )}
                {conversacionActiva.mensajes.map((m) => {
                  const esMio = m.rolRemitente === "voluntario";
                  return (
                    <div key={m.id} className={`flex ${esMio ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                          esMio
                            ? "bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white rounded-tr-sm"
                            : "bg-white shadow-sm text-[#4a2c5e] rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm">{m.contenido}</p>
                        <div className={`flex items-center gap-2 text-[10px] mt-1 ${esMio ? "text-pink-100" : "text-[#7c5a8e]"}`}>
                          <span>{m.hora}</span>
                          {m.esVoz && <span>· 🎙</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Caja de mensaje */}
              <div className="p-3 border-t border-pink-100 bg-white space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Escribe un mensaje…"
                    value={mensajeBorrador}
                    onChange={(e) => setMensajeBorrador(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") enviarMensaje();
                    }}
                  />
                  <Button
                    onClick={() => enviarMensaje()}
                    className="gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <VoiceReplyButton
                  onTranscription={(text) => {
                    setMensajeBorrador(text);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
