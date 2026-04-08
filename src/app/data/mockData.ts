// Mock data para el prototipo ICBF

export interface Nino {
  id: string;
  nombre: string;
  edad: number;
  hogarComunitario: string;
  riesgoNutricional: 'bajo' | 'medio' | 'alto';
  ultimaRevision: string;
}

export interface Registro {
  id: string;
  ninoId: string;
  fecha: string;
  tipo: 'alimentacion' | 'salud' | 'desarrollo' | 'comportamiento';
  observacion: string;
  madreComuniaria: string;
  alertaGenerada: boolean;
}

export interface MadreComuniaria {
  id: string;
  nombre: string;
  hogar: string;
  certificaciones: number;
  puntosLudificacion: number;
  nivel: string;
}

export interface BlockchainRecord {
  hash: string;
  timestamp: string;
  tipo: string;
  datos: string;
  prevHash: string;
}

export const ninos: Nino[] = [
  { id: '1', nombre: 'Juanito Pérez', edad: 4, hogarComunitario: 'Los Girasoles', riesgoNutricional: 'bajo', ultimaRevision: '2026-04-05' },
  { id: '2', nombre: 'María García', edad: 3, hogarComunitario: 'Los Girasoles', riesgoNutricional: 'medio', ultimaRevision: '2026-04-07' },
  { id: '3', nombre: 'Carlos López', edad: 5, hogarComunitario: 'Las Margaritas', riesgoNutricional: 'alto', ultimaRevision: '2026-04-06' },
  { id: '4', nombre: 'Ana Rodríguez', edad: 2, hogarComunitario: 'Los Girasoles', riesgoNutricional: 'bajo', ultimaRevision: '2026-04-08' },
  { id: '5', nombre: 'Pedro Martínez', edad: 4, hogarComunitario: 'Las Margaritas', riesgoNutricional: 'medio', ultimaRevision: '2026-04-04' },
];

export const registros: Registro[] = [
  {
    id: '1',
    ninoId: '1',
    fecha: '2026-04-08',
    tipo: 'salud',
    observacion: 'Juanito hoy no quiso almorzar y tiene fiebre',
    madreComuniaria: 'Rosa Fernández',
    alertaGenerada: true
  },
  {
    id: '2',
    ninoId: '2',
    fecha: '2026-04-07',
    tipo: 'desarrollo',
    observacion: 'María participó activamente en las actividades de motricidad',
    madreComuniaria: 'Rosa Fernández',
    alertaGenerada: false
  },
  {
    id: '3',
    ninoId: '3',
    fecha: '2026-04-06',
    tipo: 'alimentacion',
    observacion: 'Carlos no ha comido bien en los últimos 3 días',
    madreComuniaria: 'Laura Gómez',
    alertaGenerada: true
  },
];

export const madreComuniaria: MadreComuniaria = {
  id: '1',
  nombre: 'Rosa Fernández',
  hogar: 'Los Girasoles',
  certificaciones: 3,
  puntosLudificacion: 850,
  nivel: 'Experta'
};

// Datos para gráficos
export const desarrolloData = [
  { mes: 'Ene', peso: 15.2, talla: 98, desarrolloMotor: 85 },
  { mes: 'Feb', peso: 15.5, talla: 99, desarrolloMotor: 87 },
  { mes: 'Mar', peso: 15.8, talla: 100, desarrolloMotor: 90 },
  { mes: 'Abr', peso: 16.0, talla: 101, desarrolloMotor: 92 },
];

export const alertasData = [
  { categoria: 'Nutrición', cantidad: 12, color: '#ef4444' },
  { categoria: 'Salud', cantidad: 8, color: '#f59e0b' },
  { categoria: 'Desarrollo', cantidad: 3, color: '#3b82f6' },
];

export const blockchainRecords: BlockchainRecord[] = [
  {
    hash: '0x7f9a2b3c8e1d4f6a5b2c9e8d7f3a1b5c',
    timestamp: '2026-04-08 10:30:45',
    tipo: 'Registro de Salud',
    datos: 'Niño: Juanito Pérez - Fiebre registrada',
    prevHash: '0x3a1b5c7f9a2b3c8e1d4f6a5b2c9e8d7f'
  },
  {
    hash: '0x3a1b5c7f9a2b3c8e1d4f6a5b2c9e8d7f',
    timestamp: '2026-04-07 14:22:10',
    tipo: 'Registro de Desarrollo',
    datos: 'Niño: María García - Actividad motriz completada',
    prevHash: '0x5b2c9e8d7f3a1b5c7f9a2b3c8e1d4f6a'
  },
];
