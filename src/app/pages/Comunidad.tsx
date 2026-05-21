import { useMemo, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { MessageCircle, Heart, Send, Users, Sparkles, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { comunidadPosts as initialPosts, ComunidadPost, ComunidadComentario } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import VoiceReplyButton from "../components/VoiceReplyButton";

const ROLE_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  madre:      { label: "Madre Comunitaria", bg: "bg-pink-100",   text: "text-[#6b3a7d]" },
  voluntario: { label: "Voluntario",         bg: "bg-purple-100", text: "text-[#7c4dab]" },
  inspector:  { label: "Inspector",          bg: "bg-amber-100",  text: "text-amber-800" },
};

type Segmento = "madres" | "aportes";

function Avatar({ nombre, rol }: { nombre: string; rol: string }) {
  const initials = nombre
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg = rol === "madre" ? "from-[#c76b9f] to-[#9b59b6]" : "from-[#9b59b6] to-[#7c4dab]";
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${bg} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function Comunidad() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ComunidadPost[]>(initialPosts);
  const [nuevoPost, setNuevoPost] = useState("");
  const [comentarioPorPost, setComentarioPorPost] = useState<Record<string, string>>({});
  const [postExpandido, setPostExpandido] = useState<string | null>(null);

  // Las madres acceden a ambos segmentos. Los voluntarios solo al de aportes.
  const segmentosDisponibles: Segmento[] =
    user?.role === "voluntario" ? ["aportes"] : ["aportes", "madres"];
  const [segmento, setSegmento] = useState<Segmento>(segmentosDisponibles[0]);

  if (!user) return null;

  const postsVisibles = useMemo(
    () => posts.filter((p) => p.tipo === segmento),
    [posts, segmento]
  );

  const puedePublicar =
    (segmento === "madres" && user.role === "madre") ||
    (segmento === "aportes" && (user.role === "madre" || user.role === "voluntario"));

  const publicarPost = () => {
    if (!nuevoPost.trim()) {
      toast.error("Escribe algo antes de publicar");
      return;
    }
    const nuevo: ComunidadPost = {
      id: `p${Date.now()}`,
      autor: user.nombre,
      rolAutor: user.role as "madre" | "voluntario",
      hogar: user.role === "madre" ? "Los Girasoles" : "—",
      contenido: nuevoPost,
      fecha: new Date().toISOString().split("T")[0],
      reacciones: 0,
      comentarios: [],
      tipo: segmento,
    };
    setPosts([nuevo, ...posts]);
    setNuevoPost("");
    toast.success(
      segmento === "madres"
        ? "Publicación compartida con la red de madres"
        : "Publicación visible para la comunidad"
    );
  };

  const reaccionar = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, reacciones: p.reacciones + 1 } : p)));
  };

  const comentar = (postId: string, esVoz = false) => {
    const texto = comentarioPorPost[postId]?.trim();
    if (!texto) {
      toast.error("Escribe un comentario");
      return;
    }
    const nuevo: ComunidadComentario = {
      id: `c${Date.now()}`,
      autor: user.nombre,
      rolAutor: user.role,
      contenido: texto,
      fecha: new Date().toISOString().split("T")[0],
      esVoz,
    };
    setPosts(posts.map((p) => (p.id === postId ? { ...p, comentarios: [...p.comentarios, nuevo] } : p)));
    setComentarioPorPost({ ...comentarioPorPost, [postId]: "" });
    toast.success("Comentario enviado");
  };

  const setComentario = (postId: string, texto: string) => {
    setComentarioPorPost({ ...comentarioPorPost, [postId]: texto });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-[#9b59b6]" />
          <h2 className="text-3xl font-bold text-[#4a2c5e]">Comunidad EcoMadre</h2>
        </div>
        <p className="text-[#7c5a8e]">
          Un espacio para compartir experiencias entre madres comunitarias y los voluntarios que han aportado a sus hogares.
        </p>
      </motion.div>

      {/* Tabs de segmento */}
      <Card className="p-1.5 inline-flex gap-1 flex-wrap">
        {segmentosDisponibles.includes("aportes") && (
          <button
            onClick={() => setSegmento("aportes")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              segmento === "aportes"
                ? "bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                : "text-[#6b3a7d] hover:bg-pink-50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Aportes y agradecimientos
          </button>
        )}
        {segmentosDisponibles.includes("madres") && (
          <button
            onClick={() => setSegmento("madres")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              segmento === "madres"
                ? "bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                : "text-[#6b3a7d] hover:bg-pink-50"
            }`}
          >
            <Lock className="w-4 h-4" />
            Entre madres
          </button>
        )}
      </Card>

      {/* Banner según segmento */}
      {segmento === "madres" ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-[#c76b9f]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#4a2c5e] mb-1">Espacio privado entre madres</h3>
                <p className="text-sm text-[#6b3a7d]">
                  Solo otras madres comunitarias pueden ver y participar aquí. Los voluntarios no tienen
                  acceso a este espacio. Es ideal para compartir ideas pedagógicas, dudas y apoyo entre colegas.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#9b59b6]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#4a2c5e] mb-1">Aportes y agradecimientos</h3>
                <p className="text-sm text-[#6b3a7d]">
                  Espacio compartido entre madres y voluntarios que han aportado al hogar. Por la
                  seguridad de los niños, no se comparten nombres, fotos ni información personal de ellos.
                </p>
                {user.role === "madre" && (
                  <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900">
                      Recuerda no incluir nombres, fotos ni datos identificables de los niños en este espacio público.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Crear publicación */}
      {puedePublicar && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Avatar nombre={user.nombre} rol={user.role} />
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder={
                    segmento === "madres"
                      ? "Comparte ideas, dudas o consejos con otras madres comunitarias…"
                      : user.role === "madre"
                      ? "Agradece un aporte o cuenta cómo va tu hogar (sin datos de niños)…"
                      : "Cuéntale a la comunidad cómo fue tu aporte o si quieres organizar algo más…"
                  }
                  value={nuevoPost}
                  onChange={(e) => setNuevoPost(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <VoiceReplyButton
                    onTranscription={(text) => setNuevoPost((prev) => (prev ? prev + " " : "") + text)}
                  />
                  <Button
                    onClick={publicarPost}
                    className="gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                  >
                    <Send className="w-4 h-4" />
                    {segmento === "madres" ? "Publicar entre madres" : "Publicar"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Feed */}
      <div className="space-y-4">
        {postsVisibles.length === 0 && (
          <Card className="p-10 text-center text-[#7c5a8e]">
            Aún no hay publicaciones en este espacio. {puedePublicar && "¡Sé la primera en publicar!"}
          </Card>
        )}
        {postsVisibles.map((post, idx) => {
          const role = ROLE_BADGE[post.rolAutor];
          const expandido = postExpandido === post.id;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-5">
                {/* Cabecera del post */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar nombre={post.autor} rol={post.rolAutor} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-[#4a2c5e]">{post.autor}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${role.bg} ${role.text}`}>
                        {role.label}
                      </span>
                      {post.tipo === "madres" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-[#6b3a7d] border border-pink-200 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          Privado
                        </span>
                      )}
                      {post.rolAutor === "madre" && segmento === "madres" && (
                        <span className="text-xs text-[#7c5a8e]">· {post.hogar}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#7c5a8e]">{post.fecha}</p>
                  </div>
                </div>

                {/* Contenido */}
                <p className="text-[#4a2c5e] leading-relaxed mb-3">{post.contenido}</p>
                {post.esVoz && (
                  <p className="text-xs text-[#7c5a8e] mb-3 italic">🎙 Mensaje transcrito desde voz</p>
                )}

                {/* Acciones */}
                <div className="flex items-center gap-1 pt-3 border-t border-pink-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => reaccionar(post.id)}
                    className="gap-2 text-[#7c5a8e] hover:text-[#c76b9f] hover:bg-pink-50"
                  >
                    <Heart className="w-4 h-4" />
                    {post.reacciones}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPostExpandido(expandido ? null : post.id)}
                    className="gap-2 text-[#7c5a8e] hover:text-[#9b59b6] hover:bg-pink-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {post.comentarios.length}
                  </Button>
                </div>

                {/* Comentarios */}
                <AnimatePresence>
                  {expandido && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-3 border-t border-pink-100 space-y-3">
                        {post.comentarios.map((c) => {
                          const cRole = ROLE_BADGE[c.rolAutor];
                          return (
                            <div key={c.id} className="flex items-start gap-3">
                              <Avatar nombre={c.autor} rol={c.rolAutor} />
                              <div className="flex-1 bg-pink-50/40 rounded-2xl px-4 py-2">
                                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                  <span className="font-medium text-sm text-[#4a2c5e]">{c.autor}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${cRole.bg} ${cRole.text}`}>
                                    {cRole.label}
                                  </span>
                                </div>
                                <p className="text-sm text-[#4a2c5e]">{c.contenido}</p>
                                {c.esVoz && (
                                  <p className="text-[10px] text-[#7c5a8e] mt-0.5 italic">🎙 Voz</p>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* Caja de comentario */}
                        <div className="flex items-start gap-3 pt-2">
                          <Avatar nombre={user.nombre} rol={user.role} />
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder="Escribe un comentario o usa la voz…"
                              value={comentarioPorPost[post.id] ?? ""}
                              onChange={(e) => setComentario(post.id, e.target.value)}
                              rows={2}
                              className="resize-none"
                            />
                            <div className="flex items-center justify-between">
                              <VoiceReplyButton
                                onTranscription={(text) =>
                                  setComentario(
                                    post.id,
                                    (comentarioPorPost[post.id] ?? "") + (comentarioPorPost[post.id] ? " " : "") + text
                                  )
                                }
                              />
                              <Button
                                size="sm"
                                onClick={() => comentar(post.id)}
                                className="gap-2 bg-gradient-to-r from-[#9b59b6] to-[#c76b9f] text-white"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Comentar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
