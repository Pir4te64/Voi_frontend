export interface Lote {
  id: number;
  nombre: string;
  precio: number;
  fechaValidez: string;
  tipoComision: string;
  montoComision: number;
  estado: string;
  cantidadTickets: number;
  ticketsDisponibles: number;
  tickets: any[];
}

export interface EditarLoteUIProps {
  eventName: string;
  eventId: number;
  lote: Lote;
  onBack: () => void;
  onLoteUpdated: () => void;
}

export
  interface Evento {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  categoriaNombre: string;
  address: {
    street: string | null;
    city: string;
  };
  estado: string;
}

export interface Lote {
  id: number;
  nombre: string;
  precio: number;
  fechaValidez: string;
  tipoComision: string;
  montoComision: number;
  estado: string;
  cantidadTickets: number;
  ticketsDisponibles: number;
  tickets: any[];
}
