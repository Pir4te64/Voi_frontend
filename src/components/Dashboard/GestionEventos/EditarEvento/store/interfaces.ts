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
}

export interface ListarEventosState {
    events: Evento[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
} 