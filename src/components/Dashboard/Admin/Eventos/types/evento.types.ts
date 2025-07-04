export interface Lote {
    id: number;
    nombre: string;
    porcentajeComision: number;
    montoComision: number;
    precio: number;
    cantidadTickets: number;
    ticketsDisponibles: number;
    ticketsVendidos: number;
    estado: string;
}

export interface Revendedor {
    id: number;
    nombre: string;
    apellido: string;
    phoneNumber: string;
    email: string;
}

export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
    softDelete: boolean;
}

export interface EventoDetalle {
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
    lotes: Lote[];
    revendedores: Revendedor[];
    address: Address;
} 