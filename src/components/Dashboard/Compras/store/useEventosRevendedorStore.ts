import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

interface EventoRevendedor {
    id: number;
    nombre: string;
    fechaInicio: string;
    productorId: number;
    lotesId: number[];
}

interface EventosRevendedorStore {
    eventos: EventoRevendedor[];
    loading: boolean;
    error: string | null;
    fetchEventos: () => Promise<void>;
}

export const useEventosRevendedorStore = create<EventosRevendedorStore>((set) => ({
    eventos: [],
    loading: false,
    error: null,
    fetchEventos: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await axios.get(api_url.get_eventos_revendedor, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ eventos: response.data, loading: false });
        } catch (error) {
            console.error('Error al obtener eventos del revendedor:', error);
            set({
                error: error instanceof Error ? error.message : 'Error al obtener eventos',
                loading: false
            });
        }
    },
})); 