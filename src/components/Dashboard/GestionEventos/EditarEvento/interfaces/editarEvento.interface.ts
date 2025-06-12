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

export interface Lote {
    id: number;
    nombre: string;
    tipoComision: "PORCENTAJE" | "MONTO_FIJO";
    precio: number;
    cantidadTickets: number;
    ticketsDisponibles: number;
    estado: string;
}

export interface Revendedor {
    id: number;
    nombre: string;
    apellido: string;
    phoneNumber: string;
    email: string;
}

export interface EventoData {
    id: number;
    productorId: number;
    nombre: string;
    descripcion: string;
    categoriaId: number;
    categoriaNombre: string;
    linkRedSocial1: string;
    linkRedSocial2?: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
    sliderImageUrl?: string;
    galeriaUrls?: string[];
    lotes?: Lote[];
    revendedores?: Revendedor[];
    address: Address;
}

export interface FormValues {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    latitud: string;
    longitud: string;
    category: number;
    social1: string;
    social2: string;
} 