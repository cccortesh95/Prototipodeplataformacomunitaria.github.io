import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  text: string;
  isBot: boolean;
}

// Tipado mínimo para SpeechRecognition (no incluido en lib dom por defecto)
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
}
declare const SpeechRecognition: new () => SpeechRecognitionInstance;
declare const webkitSpeechRecognition: new () => SpeechRecognitionInstance;

const getSpeechRecognition = (): (new () => SpeechRecognitionInstance) | null => {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
};

const getBotResponse = (message: string): string => {
  const m = message.toLowerCase();
  if (m.includes("registro") || m.includes("registrar"))
    return "Para registrar una observación ve al módulo de Registro. Puedes usar el asistente de voz o escribir manualmente.";
  if (m.includes("alerta") || m.includes("emergencia"))
    return "Las alertas se generan automáticamente en Monitoreo cuando se detectan riesgos. Revísalas allí.";
  if (m.includes("voz") || m.includes("dictar") || m.includes("micrófono"))
    return "El asistente de voz está en el módulo de Registro. Presiona el micrófono y dicta tu observación.";
  if (m.includes("certificación") || m.includes("badge") || m.includes("punto"))
    return "Tus certificaciones y puntos están en el Dashboard. Completa registros y tutoriales para ganar más.";
  if (m.includes("voluntari"))
    return "En la sección de Voluntariado puedes publicar necesidades de tu hogar o ver cómo ayudar como voluntario.";
  return "Estoy aquí para ayudarte con registro de observaciones, alertas, certificaciones y el uso del sistema.";
};

export default function ChatBot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState<Message[]>([
    { text: "¡Hola! Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy?", isBot: true },
  ]);
  const [input, setInput]         = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInput("");
    setIsProcessing(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: getBotResponse(text), isBot: true }]);
      setIsProcessing(false);
    }, 500);
  };

  const handleVoice = () => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setMessages(prev => [...prev, {
        text: "Tu navegador no soporta reconocimiento de voz. Prueba con Chrome.",
        isBot: true,
      }]);
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SR();
    recognition.lang = "es-CO";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend   = () => setIsRecording(false);

    recognition.start();
    setIsRecording(true);
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
              <div>
                <h3 className="font-semibold leading-none">Asistente Virtual</h3>
                <p className="text-xs opacity-80 mt-0.5">Disponible 24/7</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot
                      ? "bg-white shadow-sm text-gray-800 rounded-tl-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t flex gap-2 items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe o usa el micrófono..."
                className="flex-1 text-sm"
              />
              {/* Botón de voz */}
              <Button
                onClick={handleVoice}
                size="icon"
                variant="outline"
                className={`flex-shrink-0 transition-colors ${
                  isRecording ? "bg-red-100 border-red-400 text-red-600 animate-pulse" : "text-gray-600"
                }`}
                title={isRecording ? "Detener grabación" : "Grabar voz"}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={() => handleSend()} size="icon" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {isRecording && (
              <div className="px-3 pb-2 bg-white">
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
                  Escuchando... habla ahora
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
