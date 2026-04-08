import { Award, Star, Trophy, Medal } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";

interface BadgeSystemProps {
  puntos: number;
  certificaciones: number;
  nivel: string;
}

export default function BadgeSystem({ puntos, certificaciones, nivel }: BadgeSystemProps) {
  const badges = [
    { icon: Award, name: "Primera Semana", unlocked: true, color: "text-blue-600" },
    { icon: Star, name: "10 Registros", unlocked: true, color: "text-yellow-600" },
    { icon: Trophy, name: "Nivel Experta", unlocked: true, color: "text-purple-600" },
    { icon: Medal, name: "100 Días", unlocked: false, color: "text-gray-400" },
  ];

  const nextLevelPoints = 1000;
  const progressPercentage = (puntos / nextLevelPoints) * 100;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Nivel y Progreso */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Nivel: {nivel}</h3>
            <span className="text-sm text-gray-600">{puntos}/{nextLevelPoints} pts</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Certificaciones */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <Trophy className="w-8 h-8 text-purple-600" />
          <div>
            <p className="font-semibold">{certificaciones} Certificaciones</p>
            <p className="text-sm text-gray-600">Completadas con éxito</p>
          </div>
        </div>

        {/* Insignias */}
        <div>
          <h4 className="font-semibold mb-3">Insignias Desbloqueadas</h4>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={badge.unlocked ? { scale: 1.1 } : {}}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-blue-100 to-purple-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${badge.color}`} />
                  </div>
                  <p className="text-xs mt-1 text-center text-gray-600 max-w-[60px]">
                    {badge.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Próximo Objetivo */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">
            🎯 Próximo objetivo: {nextLevelPoints - puntos} puntos para Nivel Maestra
          </p>
        </div>
      </div>
    </Card>
  );
}
