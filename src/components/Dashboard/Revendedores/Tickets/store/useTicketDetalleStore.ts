import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";
import { Ticket } from "@/components/Dashboard/Revendedores/Tickets/types/tickets.types";

interface TicketDetalleState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    loadTickets: (eventoId: number) => Promise<void>;
}

export const useTicketDetalleStore = create<TicketDetalleState>((set) => ({
    tickets: [],
    loading: false,
    error: null,

    loadTickets: async (eventoId: number) => {
        try {
            set({ loading: true, error: null });
            const auth = localStorage.getItem("auth");
            if (!auth) {
                throw new Error("No hay token de autenticación");
            }

            // Endpoint para obtener eventos específicos con eventId
            const response = await axios.get(`${api_url.get_eventos}?eventId=${eventoId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(auth).accessToken}`,
                },
            });

            // Extraer información de tickets de los lotes del evento
            const eventData = response.data.content?.[0] || response.data;
            const ticketsFromLotes = eventData?.lotes?.map((lote: any) => ({
                id: `lote-${lote.id}`,
                evento: eventData.nombre,
                estado: lote.estado,
                tipoTicket: lote.nombre,
                fechaEvento: eventData.fechaInicio,
                fechaCompra: null,
                qrCode: null,
                eventoId: eventoId,
                precio: lote.precio,
                loteNombre: lote.nombre,
                ticketsDisponibles: lote.ticketsDisponibles,
                ticketsVendidos: lote.ticketsVendidos,
                cantidadTickets: lote.cantidadTickets
            })) || [];

            set({ tickets: ticketsFromLotes, error: null });
        } catch (error: any) {
            console.error("Error al cargar tickets:", error);
            set({
                error: error.response?.data?.message || "Error al cargar los tickets del evento"
            });
        } finally {
            set({ loading: false });
        }
    },
})); 