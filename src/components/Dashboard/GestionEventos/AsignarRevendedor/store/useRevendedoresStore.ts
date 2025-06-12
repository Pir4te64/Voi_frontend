import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { Revendedor } from "../types/revendedor.types";

interface RevendedoresState {
    revendedores: Revendedor[];
    loading: boolean;
    error: string | null;
    cargarRevendedores: () => Promise<void>;
    asignarRevendedor: (eventoId: number, revendedorId: number) => Promise<void>;
}

export const useRevendedoresStore = create<RevendedoresState>((set) => ({
    revendedores: [],
    loading: false,
    error: null,

    cargarRevendedores: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axios.get(`${api_url.get_revendedores}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            console.log('Respuesta del servidor:', response.data);
            // Asegurarnos de que siempre sea un array
            const revendedoresArray = Array.isArray(response.data) ? response.data : [];
            set({ revendedores: revendedoresArray });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al cargar revendedores";
            set({ error: errorMsg });
            toast.error(errorMsg);
        } finally {
            set({ loading: false });
        }
    },

    asignarRevendedor: async (eventoId: number, revendedorId: number) => {
        try {
            await axios.post(`${api_url.asignar_revendedor}?eventoId=${eventoId}&revendedorId=${revendedorId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            toast.success("Revendedor asignado correctamente");
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al asignar revendedor";
            toast.error(errorMsg);
            throw error;
        }
    },
})); 