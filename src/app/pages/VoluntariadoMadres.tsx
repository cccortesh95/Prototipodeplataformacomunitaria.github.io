import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Heart, Bell, CheckCircle, MessageCircle, Send, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { conversacionesVoluntario, ConversacionVoluntario, MensajeChat } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import VoiceReplyButton from "../components/VoiceReplyButton";

export default function VoluntariadoMadres() {
  const { user } = useAuth();
  const [necesidadForm, setNecesidadForm] = useState({ tipo: "", descripcion: "", cantidad: "" });
  const [conversaciones, setConversaciones] = useState<ConversacionVoluntario[]>(conversacionesVoluntario);
  const [chatActivo, setChatActivo] = useState<string | null>(null);
  const [mensajeBorrador, setMensajeBorrador] = useState("");

  const handlePublicarNecesidad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!necesidadForm.tipo || !necesidadForm.descripcion) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    toast.success("Necesidad publicada con éxito. La comunidad podrá verla.", { duration: 3000 });
    setNecesidadForm({ tipo: "", descripcion: "", cantidad: "" });
  };

  const enviarMensaje = (esVoz = false) => {
    if (!mensajeBorrador.trim() || !chatActivo || !user) return;
    const nuevo: MensajeChat = {
      id: `m${Date.now()}`,
      remitente: user.nombre,
      rolRemitente: "madre",
      contenido: mensajeBorrador,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      esVoz,
    };
    setConversaciones(
      conversaciones.map((c) =>
        c.id === chatActivo ? { ...c, mensajes: [...c.mensajes, nuevo], ultimaActividad: "Ahora" } : c
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
          <Heart className="w-8 h-8 text-[#c76b9f]" />
          <h2 className="text-3xl font-bold text-[#4a2c5e]">Voluntariado — Madres Comunitarias</h2>
        </div>
        <p className="text-[#7c5a8e]">
          Publica las necesidades de tu hogar y mantente en contacto con los voluntarios que ofrecen ayuda.
        </p>
      </motion.div>

      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 text-[#c76b9f]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#4a2c5e]">¿Cómo funciona?</h3>
              <p className="text-[#6b3a7d] text-sm">
                Registra las necesidades específicas de tu hogar comunitario. Los voluntarios verán tu
                solicitud y podrán escribirte directamente para coordinar la entrega. Toda la información
                es verificada por trabajadores sociales.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {["Necesidades verificadas", "Comunicación directa con voluntarios", "Apoyo directo a los niños"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-[#6b3a7d]">
                    <CheckCircle className="w-4 h-4 text-[#c76b9f]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4"
      >
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-[#9b59b6] mb-1">24</div>
          <p className="text-sm text-[#7c5a8e]">Necesidades Atendidas</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-[#c76b9f] mb-1">47</div>
          <p className="text-sm text-[#7c5a8e]">Voluntarios Activos</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-[#7c4dab] mb-1">8</div>
          <p className="text-sm text-[#7c5a8e]">Hogares Beneficiados</p>
        </Card>
      </motion.div>

      {/* Conversaciones con voluntarios */}
      {user?.role === "madre" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="w-5 h-5 text-[#9b59b6]" />
              <h3 className="font-semibold text-lg text-[#4a2c5e]">Conversaciones con voluntarios</h3>
            </div>
            <p className="text-sm text-[#7c5a8e] mb-4">
              Los voluntarios que se ofrecieron a ayudar te escriben aquí. Puedes responder por voz si prefieres.
            </p>

            {conversaciones.length === 0 ? (
              <p className="text-sm text-[#7c5a8e] py-6 text-center">
                Aún no tienes conversaciones. Cuando un voluntario se ofrezca a ayudar, aparecerá aquí.
              </p>
            ) : (
              <div className="space-y-2">
                {conversaciones.map((c) => {
                  const ultimo = c.mensajes[c.mensajes.length - 1];
                  return (
                    <button
                      key={c.id}
                      onClick={() => setChatActivo(c.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-pink-50/60 transition-colors flex items-start gap-3 border border-pink-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9b59b6] to-[#7c4dab] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {c.voluntario.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm text-[#4a2c5e] truncate">{c.voluntario}</p>
                          <span className="text-[10px] text-[#7c5a8e] flex-shrink-0">{c.ultimaActividad}</span>
                        </div>
                        <p className="text-xs text-[#7c5a8e] truncate">
                          {ultimo ? `${ultimo.rolRemitente === "madre" ? "Tú: " : ""}${ultimo.contenido}` : "Sin mensajes"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {/* Formulario */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-[#9b59b6]" />
            <h3 className="font-semibold text-lg text-[#4a2c5e]">Publicar una Necesidad</h3>
          </div>
          <p className="text-sm text-[#7c5a8e] mb-5">
            ¿Tu hogar comunitario necesita algo? Regístralo aquí y la comunidad podrá ayudar.
          </p>
          <form onSubmit={handlePublicarNecesidad} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Necesidad *</Label>
              <Input
                id="tipo"
                placeholder="Ej: Materiales didácticos, Alimentos, Equipamiento…"
                value={necesidadForm.tipo}
                onChange={(e) => setNecesidadForm((prev) => ({ ...prev, tipo: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción *</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe la necesidad con detalle…"
                value={necesidadForm.descripcion}
                onChange={(e) => setNecesidadForm((prev) => ({ ...prev, descripcion: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad Estimada (opcional)</Label>
              <Input
                id="cantidad"
                placeholder="Ej: 10 libros, 5kg de frutas…"
                value={necesidadForm.cantidad}
                onChange={(e) => setNecesidadForm((prev) => ({ ...prev, cantidad: e.target.value }))}
              />
            </div>
            <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white">
              <Bell className="w-4 h-4" />
              Publicar Necesidad
            </Button>
          </form>
        </Card>
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
              <div className="bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold leading-none">{conversacionActiva.voluntario}</h3>
                  <p className="text-xs opacity-90 mt-1">Voluntario · {conversacionActiva.hogar}</p>
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
                  Por seguridad de los niños, evita compartir sus nombres, fotos o datos personales aquí.
                  Coordina solo la entrega del aporte.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-pink-50/30">
                {conversacionActiva.mensajes.map((m) => {
                  const esMio = m.rolRemitente === "madre";
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
                <VoiceReplyButton onTranscription={(text) => setMensajeBorrador(text)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
