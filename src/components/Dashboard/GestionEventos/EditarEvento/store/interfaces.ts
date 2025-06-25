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
    revendedores?: Array<{
        id: number;
        nombre: string;
        apellido: string;
        phoneNumber: string;
        email: string;
    }>;
}

export interface ListarEventosState {
    events: Evento[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
} 