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
          <h3 className="font-semibold text-lg mb-2">Asistente de Voz con NLP</h3>
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
                  : 'bg-gradient-to-br from-blue-600 to-purple-600'
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
              className="text-blue-600 font-medium"
            >
              🤖 Procesando con IA...
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
