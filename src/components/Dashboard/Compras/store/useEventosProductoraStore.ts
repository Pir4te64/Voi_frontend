import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

export interface EventoProductora {
    id: string;
    nombre: string;
    fecha: string;
    estado: string;
    // Agregar más campos según la respuesta del API
}

interface EventosProductoraState {
    eventos: EventoProductora[];
    loading: boolean;
    error: string | null;
    fetchEventos: () => Promise<void>;
}

export const useEventosProductoraStore = create<EventosProductoraState>((set) => ({
    eventos: [],
    loading: false,
    error: null,
    fetchEventos: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;
            if (!token) throw new Error('No autenticado');
            
            const url = `${api_url.get_eventos_productora}`;
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ eventos: res.data, loading: false });
        } catch (err: any) {
            let errorMessage = 'Error al cargar los eventos';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, loading: false, eventos: [] });
        }
    },
})); 