export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
}

export interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    categoriaNombre: string;
    address: {
        street: string | null;
        city: string;
    };
    estado: string;
    ticketsDisponibles?: number;
    lotes?: Lote[];
}

export interface Lote {
    id: number;
    nombre: string;
    porcentajeComision: number;
    tipoComision?: "PORCENTAJE" | "MONTO_FIJO";
    precio: number;
    cantidadTickets: number;
    ticketsDisponibles: number;
    ticketsVendidos: number;
    estado: string;
}

export interface Ticket {
    id: string;
    evento: string;
    estado: string;
    tipoTicket?: string;
    fechaEvento: string;
    fechaCompra: string | null;
    qrCode?: string | null;
    eventoId?: number;
    precio?: number;
    loteNombre?: string;
    ticketsDisponibles?: number;
    ticketsVendidos?: number;
    cantidadTickets?: number;
}

export interface TicketsState {
    events: Evento[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
} 