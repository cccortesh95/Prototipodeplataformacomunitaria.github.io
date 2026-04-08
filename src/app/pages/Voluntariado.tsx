import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, MapPin, Bell, Users, CheckCircle, Home } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export default function Voluntariado() {
  const [necesidadForm, setNecesidadForm] = useState({
    tipo: '',
    descripcion: '',
    cantidad: '',
  });

  const necesidades = [
    {
      id: '1',
      hogar: 'Los Girasoles',
      tipo: 'Materiales Didácticos',
      descripcion: 'Se necesitan libros de cuentos y material de motricidad fina',
      prioridad: 'Media',
      fecha: '2026-04-05'
    },
    {
      id: '2',
      hogar: 'Las Margaritas',
      tipo: 'Alimentos',
      descripcion: 'Frutas frescas y verduras para complementar nutrición',
      prioridad: 'Alta',
      fecha: '2026-04-07'
    },
    {
      id: '3',
      hogar: 'Los Girasoles',
      tipo: 'Equipamiento',
      descripcion: 'Juguetes educativos para desarrollo cognitivo',
      prioridad: 'Baja',
      fecha: '2026-04-03'
    },
  ];

  const handleRegistrarInteres = (necesidadId: string) => {
    toast.success("¡Gracias! Un trabajador social te contactará pronto", {
      duration: 4000,
    });
  };

  const handlePublicarNecesidad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!necesidadForm.tipo || !necesidadForm.descripcion) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    toast.success("Necesidad publicada con éxito. La comunidad podrá verla.", {
      duration: 3000,
    });
    setNecesidadForm({ tipo: '', descripcion: '', cantidad: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold">Voluntariado</h2>
        </div>
        <p className="text-gray-600">
          Conecta hogares comunitarios con personas que quieren ayudar
        </p>
      </motion.div>

      {/* Banner introductorio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-green-900">¿Cómo funciona el voluntariado?</h3>
              <p className="text-gray-700 text-sm">
                Las madres comunitarias pueden registrar necesidades específicas de su hogar 
                y la comunidad puede responder de manera transparente y segura. 
                Toda la información es verificada por trabajadores sociales del ICBF.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Necesidades verificadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Proceso seguro y transparente</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Apoyo directo a los niños</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
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

      {/* Necesidades Activas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-gray-600" />
          <h3 className="text-xl font-semibold">Necesidades Activas</h3>
        </div>
        <div className="space-y-4">
          {necesidades.map((necesidad, idx) => (
            <motion.div
              key={necesidad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card className={`p-4 border-l-4 ${
                necesidad.prioridad === 'Alta' ? 'border-red-500 bg-red-50' :
                necesidad.prioridad === 'Media' ? 'border-orange-500 bg-orange-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <h4 className="font-semibold">{necesidad.hogar}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{necesidad.tipo}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      necesidad.prioridad === 'Alta' ? 'bg-red-200 text-red-900' :
                      necesidad.prioridad === 'Media' ? 'bg-orange-200 text-orange-900' :
                      'bg-blue-200 text-blue-900'
                    }`}>
                      {necesidad.prioridad}
                    </span>
                  </div>

                  <p className="text-gray-700">{necesidad.descripcion}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Publicado: {necesidad.fecha}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleRegistrarInteres(necesidad.id)}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Heart className="w-4 h-4" />
                      Quiero Ayudar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Formulario para Notificar Necesidad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
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

      {/* Cómo Ser Voluntario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-lg">¿Cómo ser voluntario?</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Explora', desc: 'Revisa las necesidades activas de los hogares comunitarios', color: 'bg-blue-100 text-blue-700' },
              { step: '2', title: 'Elige', desc: 'Selecciona la necesidad con la que deseas contribuir', color: 'bg-purple-100 text-purple-700' },
              { step: '3', title: 'Ayuda', desc: 'Un trabajador social del ICBF te guiará en el proceso', color: 'bg-green-100 text-green-700' },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${item.color}`}>
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
