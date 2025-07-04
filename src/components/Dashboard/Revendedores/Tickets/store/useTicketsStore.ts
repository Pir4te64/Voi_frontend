import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";
import { Evento, TicketsState } from "@/components/Dashboard/Revendedores/Tickets/types/tickets.types";

interface TicketsStore extends TicketsState {
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
    loadEvents: () => Promise<void>;
    getFilteredEvents: () => Evento[];
    getCurrentEvents: () => Evento[];
    getTotalPages: () => number;
}

export const useTicketsStore = create<TicketsStore>((set, get) => ({
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
            const auth = localStorage.getItem("auth");
            if (!auth) {
                throw new Error("No hay token de autenticación");
            }

            // Endpoint para obtener eventos con ganancias (eventos asignados al revendedor)
            const response = await axios.get(api_url.get_eventos, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(auth).accessToken}`,
                },
            });
            console.log(response.data);

            // Obtener información del usuario actual para filtrar eventos asignados
            const userData = localStorage.getItem("me");
            const currentUser = userData ? JSON.parse(userData) : null;

            // Filtrar eventos que tengan al revendedor actual en el array de revendedores
            const allEvents = response.data.content || response.data;
            const assignedEvents = allEvents.filter((event: any) =>
                event.revendedores &&
                event.revendedores.some((revendedor: any) =>
                    revendedor.id === currentUser?.id ||
                    revendedor.email === currentUser?.email
                )
            );

            set({ events: assignedEvents, error: null });
        } catch (error: any) {
            console.error("Error al cargar eventos:", error);
            set({
                error: error.response?.data?.message || "Error al cargar los eventos asignados"
            });
        } finally {
            set({ loading: false });
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