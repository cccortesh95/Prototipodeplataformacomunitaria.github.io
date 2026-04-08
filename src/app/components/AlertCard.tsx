import { AlertTriangle, Bell, Activity } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface Alert {
  id: string;
  tipo: 'critico' | 'medio' | 'bajo';
  categoria: string;
  mensaje: string;
  nino: string;
  fecha: string;
}

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'critico':
        return 'border-red-500 bg-red-50';
      case 'medio':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'critico':
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'medio':
        return <Bell className="w-6 h-6 text-orange-600" />;
      default:
        return <Activity className="w-6 h-6 text-blue-600" />;
    }
  };

  const getBadgeVariant = (tipo: string): "destructive" | "secondary" | "default" => {
    switch (tipo) {
      case 'critico':
        return 'destructive';
      case 'medio':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`p-4 border-l-4 ${getAlertColor(alert.tipo)}`}>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            {getIcon(alert.tipo)}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-gray-900">{alert.nino}</h4>
              <Badge variant={getBadgeVariant(alert.tipo)} className="text-xs">
                {alert.tipo.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-gray-700">{alert.mensaje}</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>📍 {alert.categoria}</span>
              <span>🕐 {alert.fecha}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
