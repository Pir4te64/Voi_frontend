import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

interface TicketUsuario {
    id: number;
    eventoId: number;
    evento: string;
    codigo: string;
    qrCode: string;
    estado: string;
    tipoTicket: string;
    fechaEvento: string;
    fechaCompra: string;
    fechaUtilizacion: string | null;
}

interface PaginatedResponse {
    content: TicketUsuario[];
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

interface TicketsUsuarioStore {
    tickets: TicketUsuario[];
    totalTickets: number;
    loading: boolean;
    error: string | null;
    fetchTickets: () => Promise<void>;
}

export const useTicketsUsuarioStore = create<TicketsUsuarioStore>((set) => ({
    tickets: [],
    totalTickets: 0,
    loading: false,
    error: null,
    fetchTickets: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await axios.get(api_url.get_tickets, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data: PaginatedResponse = response.data;
            console.log('Tickets obtenidos:', data); // Para ver qué llega

            set({
                tickets: data.content,
                totalTickets: data.totalElements,
                loading: false
            });
        } catch (error) {
            console.error('Error al obtener tickets del usuario:', error);
            set({
                error: error instanceof Error ? error.message : 'Error al obtener tickets',
                loading: false
            });
        }
    },
})); 