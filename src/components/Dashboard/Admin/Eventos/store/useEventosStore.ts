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
    fetchEventos: () => Promise<void>;
}

export const useEventosStore = create<EventosState>((set) => ({
    eventos: [],
    loading: false,
    error: null,
    fetchEventos: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(api_url.get_eventos);
            set({ eventos: response.data, loading: false });
        } catch (err) {
            set({ error: "Error al cargar los eventos", loading: false });
        }
    },
})); 