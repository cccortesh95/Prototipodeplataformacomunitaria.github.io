import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Bell, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export default function VoluntariadoMadres() {
  const [necesidadForm, setNecesidadForm] = useState({
    tipo: '',
    descripcion: '',
    cantidad: '',
  });

  const handlePublicarNecesidad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!necesidadForm.tipo || !necesidadForm.descripcion) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    toast.success("Necesidad publicada con éxito. La comunidad podrá verla.", { duration: 3000 });
    setNecesidadForm({ tipo: '', descripcion: '', cantidad: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold">Voluntariado — Madres Comunitarias</h2>
        </div>
        <p className="text-gray-600">Publica las necesidades de tu hogar para que la comunidad pueda ayudar</p>
      </motion.div>

      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-green-900">¿Cómo funciona?</h3>
              <p className="text-gray-700 text-sm">
                Registra las necesidades específicas de tu hogar comunitario. La comunidad podrá
                ver tu solicitud y responder de manera transparente y segura. Toda la información
                es verificada por trabajadores sociales.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {["Necesidades verificadas", "Proceso seguro y transparente", "Apoyo directo a los niños"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
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
          <div className="text-3xl font-bold text-green-600 mb-1">24</div>
          <p className="text-sm text-gray-600">Necesidades Atendidas</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">47</div>
          <p className="text-sm text-gray-600">Voluntarios Activos</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
          <p className="text-sm text-gray-600">Hogares Beneficiados</p>
        </Card>
      </motion.div>

      {/* Formulario */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-lg">Publicar una Necesidad</h3>
          </div>
          <p className="text-sm text-gray-600 mb-5">
            ¿Tu hogar comunitario necesita algo? Regístralo aquí y la comunidad podrá ayudar.
          </p>
          <form onSubmit={handlePublicarNecesidad} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Necesidad *</Label>
              <Input
                id="tipo"
                placeholder="Ej: Materiales didácticos, Alimentos, Equipamiento..."
                value={necesidadForm.tipo}
                onChange={(e) => setNecesidadForm(prev => ({ ...prev, tipo: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción *</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe la necesidad con detalle..."
                value={necesidadForm.descripcion}
                onChange={(e) => setNecesidadForm(prev => ({ ...prev, descripcion: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad Estimada (opcional)</Label>
              <Input
                id="cantidad"
                placeholder="Ej: 10 libros, 5kg de frutas..."
                value={necesidadForm.cantidad}
                onChange={(e) => setNecesidadForm(prev => ({ ...prev, cantidad: e.target.value }))}
              />
            </div>
            <Button type="submit" className="w-full gap-2 bg-green-600 hover:bg-green-700">
              <Bell className="w-4 h-4" />
              Publicar Necesidad
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
