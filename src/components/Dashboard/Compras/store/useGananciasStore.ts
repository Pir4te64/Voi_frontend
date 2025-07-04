import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

export interface GananciasResumen {
    eventoId: string | null;
    nombreEvento: string;
    loteId: string | null;
    nombreLote: string;
    ticketsVendidos: number;
    precioPromedio: number;
    gananciaTotal: number;
}

interface GananciasState {
    resumen: GananciasResumen | null;
    loading: boolean;
    error: string | null;
    fetchGanancias: () => Promise<void>;
}

export const useGananciasStore = create<GananciasState>((set) => ({
    resumen: null,
    loading: false,
    error: null,
    fetchGanancias: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;
            if (!token) throw new Error('No autenticado');
            const url = `${api_url.get_ganancias}`;
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ resumen: res.data, loading: false });
        } catch (err: any) {
            let errorMessage = 'Error al cargar el resumen de ganancias';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, loading: false, resumen: null });
        }
    },
})); 