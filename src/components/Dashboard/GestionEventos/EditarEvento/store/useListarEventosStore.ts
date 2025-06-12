import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";
import { Evento, ListarEventosState } from "./interfaces";
import { toast } from "react-toastify";

interface ListarEventosStore extends ListarEventosState {
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
    loadEvents: () => Promise<void>;
    deleteEvent: (eventId: number) => Promise<void>;
    getFilteredEvents: () => Evento[];
    getCurrentEvents: () => Evento[];
    getTotalPages: () => number;
}

export const useListarEventosStore = create<ListarEventosStore>((set, get) => ({
    events: [],
    loading: true,
    error: null,
    searchTerm: "",
    currentPage: 1,
    itemsPerPage: 10,

    setSearchTerm: (term) => {
        set({ searchTerm: term, currentPage: 1 });
    },

    setCurrentPage: (page) => {
        set({ currentPage: page });
    },

    loadEvents: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(api_url.get_eventos_productora, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            set({ events: response.data, error: null });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Error al cargar los eventos" });
        } finally {
            set({ loading: false });
        }
    },

    deleteEvent: async (eventId: number) => {
        try {
            await axios.delete(`${api_url.delete_evento}?eventoId=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });

            // Actualizar la lista de eventos después de eliminar
            const events = get().events.filter(event => event.id !== eventId);
            set({ events });

            toast.success("Evento eliminado correctamente", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Error al eliminar el evento",
                { position: "top-right", autoClose: 3000 }
            );
        }
    },

    getFilteredEvents: () => {
        const { events, searchTerm } = get();
        if (!searchTerm.trim()) return events;
        return events.filter((event) =>
            event.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },

    getCurrentEvents: () => {
        const { currentPage, itemsPerPage } = get();
        const filteredEvents = get().getFilteredEvents();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredEvents.slice(startIndex, endIndex);
    },

    getTotalPages: () => {
        const { itemsPerPage } = get();
        const filteredEvents = get().getFilteredEvents();
        return Math.ceil(filteredEvents.length / itemsPerPage);
    },
})); 