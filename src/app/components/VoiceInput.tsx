import { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface VoiceInputProps {
  onTranscription: (text: string) => void;
}

export default function VoiceInput({ onTranscription }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript("");
    toast.success("Grabación iniciada. Habla ahora...");

    // Simulación de reconocimiento de voz
    timeoutRef.current = setTimeout(() => {
      handleStopRecording();
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);

    // Simulación de procesamiento NLP
    setTimeout(() => {
      const simulatedTranscriptions = [
        "Juanito hoy no quiso almorzar y tiene fiebre",
        "María participó muy bien en las actividades de hoy",
        "Carlos no ha comido bien en los últimos días",
        "Ana está con tos desde ayer",
        "Pedro jugó muy activo en el recreo",
      ];
      
      const randomTranscript = simulatedTranscriptions[
        Math.floor(Math.random() * simulatedTranscriptions.length)
      ];
      
      setTranscript(randomTranscript);
      onTranscription(randomTranscript);
      setIsProcessing(false);
      toast.success("Observación transcrita correctamente");
    }, 1500);
  };

  const handleManualStop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    handleStopRecording();
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          {/* Robot mascot */}
          <div className="flex justify-center mb-3">
            <div className="relative w-16 h-16">
              {/* Head */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c76b9f] to-[#9b59b6] rounded-xl shadow-md flex items-center justify-center">
                {/* Eyes */}
                <div className="flex gap-2 mb-1">
                  <motion.div
                    animate={isRecording ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-[#6b3a7d] rounded-full" />
                  </motion.div>
                  <motion.div
                    animate={isRecording ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                    className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-[#6b3a7d] rounded-full" />
                  </motion.div>
                </div>
              </div>
              {/* Antenna */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#c76b9f] rounded-full" />
              <motion.div
                animate={isRecording ? { backgroundColor: ["#f59e0b", "#ef4444", "#f59e0b"] } : { backgroundColor: "#93c5fd" }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Asistente de Voz</h3>
          <p className="text-sm text-gray-600">
            Presiona el micrófono y dicta tu observación naturalmente
          </p>
        </div>

        {/* Botón de Micrófono */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={isRecording ? handleManualStop : handleStartRecording}
              disabled={isProcessing}
              size="lg"
              className={`w-24 h-24 rounded-full ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                  : 'bg-gradient-to-br from-[#9b59b6] to-[#c76b9f]'
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-10 h-10 animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Estado */}
        <div className="text-center">
          {isRecording && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 font-medium"
            >
              🎤 Grabando...
            </motion.p>
          )}
          {isProcessing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#9b59b6] font-medium"
            >
              🤖 Procesando...
            </motion.p>
          )}
        </div>

        {/* Transcripción */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-sm font-medium text-green-900 mb-1">
                ✅ Transcripción procesada:
              </p>
              <p className="text-gray-700">{transcript}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicadores de categorización automática */}
        {transcript && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-blue-50 rounded text-center">
              <p className="font-medium text-blue-900">Categoría detectada</p>
              <p className="text-blue-700">
                {transcript.includes("fiebre") || transcript.includes("tos") ? "Salud" : "Desarrollo"}
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded text-center">
              <p className="font-medium text-purple-900">Alerta generada</p>
              <p className="text-purple-700">
                {transcript.includes("fiebre") || transcript.includes("no comido") ? "Sí" : "No"}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
