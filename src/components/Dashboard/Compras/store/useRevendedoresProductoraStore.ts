import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

interface RevendedorProductora {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
    fechaRegistro?: string;
    estado?: string;
    // Agregar más campos según la respuesta del API
}

interface RevendedoresProductoraState {
    revendedores: RevendedorProductora[];
    loading: boolean;
    error: string | null;
    fetchRevendedores: () => Promise<void>;
}

export const useRevendedoresProductoraStore = create<RevendedoresProductoraState>((set) => ({
    revendedores: [],
    loading: false,
    error: null,
    fetchRevendedores: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;
            if (!token) throw new Error('No autenticado');

            const url = `${api_url.get_revendedores}`;
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ revendedores: res.data, loading: false });
        } catch (err: any) {
            let errorMessage = 'Error al cargar los revendedores';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, loading: false, revendedores: [] });
        }
    },
})); 