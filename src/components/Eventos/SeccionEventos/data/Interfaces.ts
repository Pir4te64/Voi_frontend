// --- TYPES ---

// TicketType para entradas
export interface TicketType {
  type: string;
  price: number;
  available: boolean;
  loteId?: number; // ID del lote para la compra
}

// Shape de un evento estático (usado como fallback y template)
export interface StaticEventDetail {
  id: number;
  title: string;
  description: string;
  address: string;
  fullDate: string;
  gallery: string[];
  ticketTypes: TicketType[];
  defaultTicket: string;
  mapUrl?: string;
}

// Shape de un evento remoto desde API
export interface RemoteEvent {
  id: number;
  productorId: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  categoriaNombre: string;
  linkRedSocial1: string;
  linkRedSocial2: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  sliderImageUrl: string;
  galeriaUrls: string[];
  lotes: Array<{
    id: number;
    nombre: string;
    tipoComision: string;
    precio: number;
    cantidadTickets: number;
    ticketsDisponibles: number;
    estado: string;
  }>;
  revendedores: any[];
  address: {
    id: number;
    street: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
  };
}

export type CardData = {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
  location: string;
  city: string;
  createdAt: string;
};
