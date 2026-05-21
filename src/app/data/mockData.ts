// Mock data para el prototipo

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


// ============================================================================
// COMUNIDAD — Posts del blog entre madres y voluntarios que aportaron
// ============================================================================

export interface ComunidadComentario {
  id: string;
  autor: string;
  rolAutor: 'madre' | 'voluntario' | 'inspector';
  contenido: string;
  fecha: string;
  esVoz?: boolean;
}

export interface ComunidadPost {
  id: string;
  autor: string;
  rolAutor: 'madre' | 'voluntario';
  hogar: string;
  contenido: string;
  fecha: string;
  esVoz?: boolean;
  imagen?: string;
  reacciones: number;
  comentarios: ComunidadComentario[];
  /**
   * Segmento del blog:
   * - 'madres'  → privado, solo madres comunitarias e inspectores pueden verlo
   * - 'aportes' → público entre madres y voluntarios que han aportado
   */
  tipo: 'madres' | 'aportes';
}

export const comunidadPosts: ComunidadPost[] = [
  {
    id: 'p1',
    autor: 'Rosa Fernández',
    rolAutor: 'madre',
    hogar: 'Los Girasoles',
    contenido: '¡Mil gracias a Ana Gómez por los libros de cuentos! El hogar los recibió con mucha alegría. Es muy lindo ver cómo un detalle puede cambiar el día.',
    fecha: '2026-04-08',
    esVoz: true,
    reacciones: 12,
    tipo: 'aportes',
    comentarios: [
      {
        id: 'c1',
        autor: 'Ana Gómez',
        rolAutor: 'voluntario',
        contenido: '¡Qué alegría leer esto! Voy a tratar de conseguir más libros la próxima semana. ¿Hay alguna temática que recomienden?',
        fecha: '2026-04-08',
      },
      {
        id: 'c2',
        autor: 'Rosa Fernández',
        rolAutor: 'madre',
        contenido: 'Cuentos de animales y con mucho color. ¡Mil gracias!',
        fecha: '2026-04-08',
        esVoz: true,
      },
    ],
  },
  {
    id: 'p2',
    autor: 'Laura Gómez',
    rolAutor: 'madre',
    hogar: 'Las Margaritas',
    contenido: 'Compañeras, ¿alguna ha probado las rondas con instrumentos caseros? Estoy buscando ideas para la planificación de la próxima semana.',
    fecha: '2026-04-07',
    reacciones: 8,
    tipo: 'madres',
    comentarios: [
      {
        id: 'c3',
        autor: 'Rosa Fernández',
        rolAutor: 'madre',
        contenido: 'Sí Laura, en el hogar hicimos maracas con botellas y arroz. Quedaron felices. Te paso fotos por interno.',
        fecha: '2026-04-07',
        esVoz: true,
      },
    ],
  },
  {
    id: 'p3',
    autor: 'Carlos Ruiz',
    rolAutor: 'voluntario',
    hogar: 'Los Girasoles',
    contenido: 'Acabo de entregar las frutas de esta semana al hogar Los Girasoles. Si alguien más quiere sumarse para abril, estoy organizando una compra grupal.',
    fecha: '2026-04-06',
    reacciones: 15,
    tipo: 'aportes',
    comentarios: [],
  },
  {
    id: 'p4',
    autor: 'Diana Castillo',
    rolAutor: 'madre',
    hogar: 'Los Naranjos',
    contenido: 'Compañeras, ¿qué actividades hacen los lunes en la mañana? A mí me funciona muy bien empezar con un círculo de saludos para que entren en ritmo.',
    fecha: '2026-04-05',
    reacciones: 6,
    tipo: 'madres',
    comentarios: [
      {
        id: 'c4',
        autor: 'Laura Gómez',
        rolAutor: 'madre',
        contenido: 'Diana, en el hogar también arrancamos con saludo y luego hacemos una canción de bienvenida. Funciona muy bien.',
        fecha: '2026-04-05',
      },
    ],
  },
];

// ============================================================================
// MENSAJES — Voluntarios ↔ Madres (chat directo por necesidad)
// ============================================================================

export interface MensajeChat {
  id: string;
  remitente: string;
  rolRemitente: 'madre' | 'voluntario';
  contenido: string;
  fecha: string;
  hora: string;
  esVoz?: boolean;
}

export interface ConversacionVoluntario {
  id: string;
  necesidadId: string;
  hogar: string;
  madre: string;
  voluntario: string;
  ultimaActividad: string;
  mensajes: MensajeChat[];
}

export const conversacionesVoluntario: ConversacionVoluntario[] = [
  {
    id: 'conv1',
    necesidadId: '1',
    hogar: 'Los Girasoles',
    madre: 'Rosa Fernández',
    voluntario: 'Ana Gómez',
    ultimaActividad: 'Hace 2 horas',
    mensajes: [
      {
        id: 'm1',
        remitente: 'Ana Gómez',
        rolRemitente: 'voluntario',
        contenido: 'Buenas tardes Rosa, vi que necesitan libros de cuentos. ¿Cuántos hogares atiendes y qué cantidad sería útil?',
        fecha: '2026-04-07',
        hora: '14:20',
      },
      {
        id: 'm2',
        remitente: 'Rosa Fernández',
        rolRemitente: 'madre',
        contenido: 'Hola Ana, cualquier cantidad nos sirve. Lo ideal serían libros con mucho color y temáticas de animales.',
        fecha: '2026-04-07',
        hora: '14:35',
        esVoz: true,
      },
      {
        id: 'm3',
        remitente: 'Ana Gómez',
        rolRemitente: 'voluntario',
        contenido: 'Perfecto, voy a llevar 10 libros el viernes. ¿A qué hora les queda bien la entrega?',
        fecha: '2026-04-08',
        hora: '09:10',
      },
    ],
  },
  {
    id: 'conv2',
    necesidadId: '2',
    hogar: 'Las Margaritas',
    madre: 'Laura Gómez',
    voluntario: 'Carlos Ruiz',
    ultimaActividad: 'Hace 1 día',
    mensajes: [
      {
        id: 'm4',
        remitente: 'Carlos Ruiz',
        rolRemitente: 'voluntario',
        contenido: 'Hola Laura, soy Carlos. Quiero aportar con las frutas de esta semana. ¿Hay alguna que prefieran?',
        fecha: '2026-04-06',
        hora: '11:00',
      },
      {
        id: 'm5',
        remitente: 'Laura Gómez',
        rolRemitente: 'madre',
        contenido: 'Hola Carlos, manzana y banano son las que mejor se reciben. Si pudieras incluir algo de papaya sería un lujo.',
        fecha: '2026-04-06',
        hora: '11:30',
        esVoz: true,
      },
    ],
  },
];

// ============================================================================
// TUTORIALES — Lista completa para la página dedicada
// ============================================================================

export interface Tutorial {
  id: string;
  emoji: string;
  title: string;
  duration: string;
  points: string;
  desc: string;
  categoria: 'Voz' | 'Salud' | 'Reportes' | 'Gamificación' | 'Desarrollo' | 'Voluntariado' | 'Planificación' | 'Configuración';
  completado?: boolean;
}

export const tutorialesData: Tutorial[] = [
  { id: 't1', emoji: '🎤', title: 'Uso del Asistente de Voz',           duration: '2 min', points: '+50 pts',  desc: 'Aprende a dictar observaciones con tu voz de forma rápida y precisa.', categoria: 'Voz', completado: true },
  { id: 't2', emoji: '🥗', title: 'Alertas Nutricionales',               duration: '3 min', points: '+75 pts',  desc: 'Identifica señales de alerta en la alimentación de los niños.', categoria: 'Salud' },
  { id: 't3', emoji: '📊', title: 'Cómo Generar Reportes',               duration: '4 min', points: '+100 pts', desc: 'Crea reportes mensuales de seguimiento en pocos pasos.', categoria: 'Reportes' },
  { id: 't4', emoji: '🏅', title: 'Sistema de Puntos y Badges',          duration: '2 min', points: '+50 pts',  desc: 'Descubre cómo ganar puntos y desbloquear certificaciones.', categoria: 'Gamificación', completado: true },
  { id: 't5', emoji: '👶', title: 'Registro de Desarrollo Infantil',     duration: '5 min', points: '+120 pts', desc: 'Documenta hitos del desarrollo motor, cognitivo y social.', categoria: 'Desarrollo' },
  { id: 't6', emoji: '🚨', title: 'Gestión de Alertas de Salud',         duration: '3 min', points: '+75 pts',  desc: 'Cómo actuar ante una alerta de salud generada por el sistema.', categoria: 'Salud' },
  { id: 't7', emoji: '❤️', title: 'Publicar Necesidades de Voluntariado', duration: '2 min', points: '+50 pts',  desc: 'Conecta tu hogar con voluntarios que quieren ayudar.', categoria: 'Voluntariado' },
  { id: 't8', emoji: '📅', title: 'Planificación Semanal de Actividades', duration: '4 min', points: '+100 pts', desc: 'Organiza las actividades pedagógicas de la semana.', categoria: 'Planificación' },
  { id: 't9', emoji: '🔔', title: 'Configurar Notificaciones',            duration: '2 min', points: '+50 pts',  desc: 'Personaliza qué alertas y recordatorios quieres recibir.', categoria: 'Configuración' },
];
