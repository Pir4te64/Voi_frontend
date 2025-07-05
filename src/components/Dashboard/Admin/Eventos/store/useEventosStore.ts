import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";

interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    estado: string;
    categoriaNombre: string;
    productora?: string;
    address?: {
        street: string | null;
        city: string;
    };
    lotes?: Array<{
        ticketsVendidos: number;
        precio: number;
    }>;
    ganancias?: number;
}

interface EventosState {
    eventos: Evento[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    fetchEventos: (page?: number) => Promise<void>;
    setPage: (page: number) => void;
    // Filtros y búsqueda
    search: string;
    setSearch: (s: string) => void;
    estadoFiltro: string;
    setEstadoFiltro: (e: string) => void;
    categoriaFiltro: string;
    setCategoriaFiltro: (c: string) => void;
    orden: string;
    setOrden: (o: string) => void;
}

export const useEventosStore = create<EventosState>((set) => ({
    eventos: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 1,
    fetchEventos: async (page = 0) => {
        set({ loading: true, error: null });
        try {
            const userData = localStorage.getItem('auth');
            const token = userData ? JSON.parse(userData).accessToken : null;
            const response = await axios.get(`${api_url.get_eventos_con_ganancias}?page=${page}&size=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            set({ 
                eventos: response.data.content, 
                totalPages: response.data.totalPages || 1,
                page: page,
                loading: false 
            });
        } catch (err) {
            set({ error: "Error al cargar los eventos", loading: false });
        }
    },
    setPage: (page) => set({ page }),
    // Filtros y búsqueda
    search: "",
    setSearch: (s) => set({ search: s }),
    estadoFiltro: "Todos",
    setEstadoFiltro: (e) => set({ estadoFiltro: e }),
    categoriaFiltro: "Todos",
    setCategoriaFiltro: (c) => set({ categoriaFiltro: c }),
    orden: "Reciente",
    setOrden: (o) => set({ orden: o }),
})); 