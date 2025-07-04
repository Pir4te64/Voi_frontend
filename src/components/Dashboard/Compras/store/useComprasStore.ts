import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';
import { Ticket } from './types';

interface ComprasState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    qrModal: string | null;
    tipo: 'compras' | 'ventas';
    titulo: string;

    // Actions
    setTipo: (tipo: 'compras' | 'ventas') => void;
    setTitulo: (titulo: string) => void;
    setQrModal: (qrCode: string | null) => void;
    setPage: (page: number) => void;
    fetchTickets: (pageNumber?: number) => Promise<void>;
    reset: () => void;
}

const initialState = {
    tickets: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 1,
    qrModal: null,
    tipo: 'compras' as const,
    titulo: 'Mis Compras',
};

export const useComprasStore = create<ComprasState>((set, get) => ({
    ...initialState,

    setTipo: (tipo) => {
        set({
            tipo,
            titulo: tipo === 'ventas' ? 'Mis Ventas' : 'Mis Compras'
        });
    },

    setTitulo: (titulo) => set({ titulo }),

    setQrModal: (qrCode) => set({ qrModal: qrCode }),

    setPage: (page) => set({ page }),

    fetchTickets: async (pageNumber = 0) => {
        const { tipo } = get();

        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;

            if (!token) throw new Error('No autenticado');

            // URL base para obtener tickets
            const baseUrl = `${api_url.get_tickets}?pageNumber=${pageNumber}&pageSize=10&sortDirection=DESC`;

            const res = await axios.get(baseUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const content = Array.isArray(res.data?.content) ? res.data.content : [];
            set({
                tickets: content,
                totalPages: res.data?.totalPages || 1,
                page: pageNumber
            });

        } catch (err: any) {
            set({ tickets: [] });

            // Manejar diferentes tipos de errores
            let errorMessage = `Error al cargar las ${tipo === 'ventas' ? 'ventas' : 'compras'}`;

            if (err.response?.data?.error) {
                // Error con formato específico de la API
                const apiError = err.response.data.error;
                if (apiError.description && Array.isArray(apiError.description)) {
                    errorMessage = apiError.description.join(', ');
                } else if (apiError.description) {
                    errorMessage = apiError.description;
                }
            } else if (err.response?.data?.message) {
                // Error con mensaje directo
                errorMessage = err.response.data.message;
            } else if (err.message) {
                // Error general
                errorMessage = err.message;
            }

            set({ error: errorMessage });
        } finally {
            set({ loading: false });
        }
    },

    reset: () => set(initialState),
})); 