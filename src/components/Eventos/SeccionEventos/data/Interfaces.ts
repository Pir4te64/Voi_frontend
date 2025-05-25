
// --- TYPES ---

// TicketType para entradas
export interface TicketType {
    type: string;
    price: number;
    available: boolean;
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
}

// Shape de un evento remoto desde API
export interface RemoteEvent {
    id: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    fechaInicio: string;    // "YYYY-MM-DD"
    fechaFin: string;       // "YYYY-MM-DD"
    galeriaUrls: string[];
}
