import { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { toast } from "sonner";

interface VoiceReplyButtonProps {
  onTranscription: (text: string) => void;
  className?: string;
}

/**
 * Botón de respuesta por voz, alineado con la intención de "Cuidado":
 * lenguaje no invasivo, retroalimentación inmediata y rutas alternativas.
 * Simula la grabación + transcripción y entrega el texto al padre.
 */
export default function VoiceReplyButton({ onTranscription, className = "" }: VoiceReplyButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const SAMPLE_REPLIES = [
    "¡Mil gracias! En verdad nos ayuda mucho a los niños y al hogar.",
    "Perfecto, te esperamos el viernes en la tarde, cualquier cosa te aviso.",
    "Buen día, los niños están felices con lo que enviaste, mil bendiciones.",
    "Claro que sí, cuéntame qué necesitas y vemos cómo coordinarnos.",
    "Estoy disponible mañana en la mañana, si te queda fácil pasar por acá.",
  ];

  const start = () => {
    setIsRecording(true);
    toast.success("Grabando respuesta…");
    timeoutRef.current = setTimeout(stop, 2500);
  };

  const stop = () => {
    setIsRecording(false);
    setIsProcessing(true);
    setTimeout(() => {
      const text = SAMPLE_REPLIES[Math.floor(Math.random() * SAMPLE_REPLIES.length)];
      onTranscription(text);
      setIsProcessing(false);
      toast.success("Respuesta transcrita");
    }, 1200);
  };

  const handleClick = () => {
    if (isRecording) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      stop();
    } else {
      start();
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={className}>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={handleClick}
        disabled={isProcessing}
        className={`gap-2 ${
          isRecording
            ? "bg-red-100 text-red-700 hover:bg-red-200 animate-pulse"
            : "text-[#6b3a7d] hover:bg-pink-50"
        }`}
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isRecording ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
        <span className="text-xs">
          {isProcessing ? "Procesando…" : isRecording ? "Detener" : "Responder por voz"}
        </span>
      </Button>
    </motion.div>
  );
}
