import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";
import { EventoDetalle } from "@/components/Dashboard/Admin/Eventos/types/evento.types";

interface EventoDetallesState {
    evento: EventoDetalle | null;
    loading: boolean;
    error: string | null;
    fetchEventoDetalle: (id: number) => Promise<void>;
}

export const useEventoDetallesStore = create<EventoDetallesState>((set) => ({
    evento: null,
    loading: false,
    error: null,
    fetchEventoDetalle: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${api_url.get_eventos}?pageNumber=0&pageSize=10&sortDirection=DESC&eventoId=${id}`
            );
            // Tomar el primer evento del array content
            const eventoData = Array.isArray(response.data.content) ? response.data.content[0] : null;
            set({ evento: eventoData, loading: false });
        } catch (err) {
            set({ error: "Error al cargar los detalles del evento", loading: false });
        }
    },
})); 