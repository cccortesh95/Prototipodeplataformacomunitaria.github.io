import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import VoiceInput from "../components/VoiceInput";
import { ninos } from "../data/mockData";
import { toast } from "sonner";
import { Save, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function RegistroSimplificado() {
  const [formData, setFormData] = useState({
    ninoId: '',
    tipo: '',
    observacion: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  const handleVoiceTranscription = (text: string) => {
    setFormData(prev => ({ ...prev, observacion: text }));
    
    // Auto-categorización basada en palabras clave
    if (text.includes('fiebre') || text.includes('tos') || text.includes('dolor')) {
      setFormData(prev => ({ ...prev, tipo: 'salud' }));
    } else if (text.includes('almorzar') || text.includes('comido') || text.includes('desayuno')) {
      setFormData(prev => ({ ...prev, tipo: 'alimentacion' }));
    } else if (text.includes('jugar') || text.includes('actividad') || text.includes('participó')) {
      setFormData(prev => ({ ...prev, tipo: 'desarrollo' }));
    } else {
      setFormData(prev => ({ ...prev, tipo: 'comportamiento' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ninoId || !formData.tipo || !formData.observacion) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    // Simulación de guardado
    toast.success("Registro guardado exitosamente");
    
    // Verificar si debe generar alerta
    const palabrasAlerta = ['fiebre', 'no quiso', 'no ha comido', 'dolor', 'vómito'];
    const debeGenerarAlerta = palabrasAlerta.some(palabra => 
      formData.observacion.toLowerCase().includes(palabra)
    );

    if (debeGenerarAlerta) {
      setTimeout(() => {
        toast.warning("⚠️ Alerta generada automáticamente - Requiere seguimiento", {
          duration: 5000,
        });
      }, 1000);
    }

    // Limpiar formulario
    setFormData({
      ninoId: '',
      tipo: '',
      observacion: '',
      fecha: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold">Registro Simplificado</h2>
        </div>
        <p className="text-gray-600">
          Registra observaciones de manera rápida usando voz o texto
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asistente de Voz */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <VoiceInput onTranscription={handleVoiceTranscription} />
        </motion.div>

        {/* Información */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 h-full">
            <h3 className="font-semibold text-lg mb-4">💡 ¿Cómo funciona el registro?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="text-[#9b59b6]">1.</span>
                <p>Presiona el micrófono y dicta tu observación naturalmente</p>
              </div>
              <div className="flex gap-2">
                <span className="text-[#9b59b6]">2.</span>
                <p>El sistema convierte tu voz en texto automáticamente</p>
              </div>
              <div className="flex gap-2">
                <span className="text-[#9b59b6]">3.</span>
                <p>La observación se clasifica por categoría de forma inteligente</p>
              </div>
              <div className="flex gap-2">
                <span className="text-[#9b59b6]">4.</span>
                <p>Si detecta situaciones de atención, genera una alerta automática</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-pink-200">
              <p className="text-xs font-semibold text-[#6b3a7d] mb-2">Ejemplos de uso:</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• "Juanito tiene fiebre y no quiso almorzar"</li>
                <li>• "María participó muy bien en las actividades"</li>
                <li>• "Carlos no ha comido bien en 3 días"</li>
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Formulario Manual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold text-xl mb-6">Formulario de Registro</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selección de Niño */}
              <div className="space-y-2">
                <Label htmlFor="nino">Niño/a</Label>
                <Select value={formData.ninoId} onValueChange={(value) => setFormData(prev => ({ ...prev, ninoId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un niño" />
                  </SelectTrigger>
                  <SelectContent>
                    {ninos.map((nino) => (
                      <SelectItem key={nino.id} value={nino.id}>
                        {nino.nombre} ({nino.edad} años)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Observación */}
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Observación</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salud">🏥 Salud</SelectItem>
                    <SelectItem value="alimentacion">🍽️ Alimentación</SelectItem>
                    <SelectItem value="desarrollo">🎯 Desarrollo</SelectItem>
                    <SelectItem value="comportamiento">😊 Comportamiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fecha */}
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData(prev => ({ ...prev, fecha: e.target.value }))}
                />
              </div>
            </div>

            {/* Observación */}
            <div className="space-y-2">
              <Label htmlFor="observacion">Observación</Label>
              <Textarea
                id="observacion"
                placeholder="Describe lo que observaste..."
                value={formData.observacion}
                onChange={(e) => setFormData(prev => ({ ...prev, observacion: e.target.value }))}
                rows={4}
              />
              {formData.observacion && (
                <p className="text-xs text-gray-600">
                  {formData.observacion.length} caracteres
                </p>
              )}
            </div>

            {/* Indicador de Auto-categorización */}
            {formData.tipo && formData.observacion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-sm font-medium text-green-900">
                  ✅ Categoría detectada automáticamente: <strong>{formData.tipo}</strong>
                </p>
              </motion.div>
            )}

            {/* Botón de Guardar */}
            <Button type="submit" size="lg" className="w-full gap-2">
              <Save className="w-5 h-5" />
              Guardar Registro
            </Button>
          </form>
        </Card>
      </motion.div>

      {/* Ventajas del Sistema */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-pink-50">
        <h3 className="font-semibold text-lg mb-4">✨ Ventajas del Registro Simplificado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">⚡</div>
            <p className="font-medium">Más Rápido</p>
            <p className="text-sm text-gray-600">Reduce el tiempo de registro en un 70%</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🎯</div>
            <p className="font-medium">Auto-Categorización</p>
            <p className="text-sm text-gray-600">Clasifica automáticamente cada observación</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🔒</div>
            <p className="font-medium">Seguro</p>
            <p className="text-sm text-gray-600">Datos protegidos y respaldados</p>
          </div>
        </div>
      </Card>
    </div>
  );
}