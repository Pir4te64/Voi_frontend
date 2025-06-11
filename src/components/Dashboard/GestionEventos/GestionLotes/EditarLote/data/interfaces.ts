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
