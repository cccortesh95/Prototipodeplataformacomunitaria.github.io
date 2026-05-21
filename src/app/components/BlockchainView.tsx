import { Shield, Lock, CheckCircle, Link as LinkIcon } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

interface BlockchainRecord {
  hash: string;
  timestamp: string;
  tipo: string;
  datos: string;
  prevHash: string;
}

interface BlockchainViewProps {
  records: BlockchainRecord[];
}

export default function BlockchainView({ records }: BlockchainViewProps) {
  return (
    <div className="space-y-4">
      {/* Header explicativo */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">
          <Shield className="w-12 h-12 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Gobernanza con Blockchain</h3>
            <p className="text-sm text-gray-700">
              Todos los registros están protegidos mediante tecnología blockchain, 
              garantizando la <strong>trazabilidad</strong> e <strong>inmutabilidad</strong> 
              de los datos sensibles de los menores.
            </p>
          </div>
        </div>
      </Card>

      {/* Bloques de la cadena */}
      <div className="space-y-3">
        {records.map((record, idx) => (
          <motion.div
            key={record.hash}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                {/* Encabezado del bloque */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-600" />
                    <span className="font-mono text-sm font-semibold text-purple-900">
                      Bloque #{records.length - idx}
                    </span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                {/* Información del bloque */}
                <div className="grid gap-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[100px]">Tipo:</span>
                    <span className="text-gray-900">{record.tipo}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[100px]">Datos:</span>
                    <span className="text-gray-900">{record.datos}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[100px]">Timestamp:</span>
                    <span className="text-gray-700 font-mono text-xs">{record.timestamp}</span>
                  </div>
                </div>

                {/* Hash del bloque */}
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Hash del Bloque:</p>
                  <p className="text-xs font-mono text-gray-800 break-all">{record.hash}</p>
                </div>

                {/* Conexión con bloque anterior */}
                {idx < records.length - 1 && (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <LinkIcon className="w-4 h-4" />
                    <span>Enlazado con: {record.prevHash.substring(0, 20)}...</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Conector visual */}
            {idx < records.length - 1 && (
              <div className="flex justify-center my-2">
                <div className="w-0.5 h-6 bg-gradient-to-b from-purple-400 to-purple-200"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer informativo */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-2 text-sm text-green-900">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p>
            <strong>Cadena verificada.</strong> Todos los registros son inmutables y auditables.
          </p>
        </div>
      </Card>
    </div>
  );
}
