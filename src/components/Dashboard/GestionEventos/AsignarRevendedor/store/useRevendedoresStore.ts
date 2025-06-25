import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { Revendedor } from "@/components/Dashboard/GestionEventos/AsignarRevendedor/types/revendedor.types";

interface RevendedoresState {
    revendedores: Revendedor[];
    revendedoresAsignados: Revendedor[];
    loading: boolean;
    loadingAsignados: boolean;
    error: string | null;
    cargarRevendedores: () => Promise<void>;
    cargarRevendedoresAsignados: (eventId: number) => Promise<void>;
    asignarRevendedor: (eventId: number, revendedorId: number) => Promise<void>;
    eliminarRevendedor: (eventId: number, revendedorId: number) => Promise<void>;
}

export const useRevendedoresStore = create<RevendedoresState>((set, get) => ({
    revendedores: [],
    revendedoresAsignados: [],
    loading: false,
    loadingAsignados: false,
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

    cargarRevendedoresAsignados: async (eventId: number) => {
        try {
            set({ loadingAsignados: true, error: null });
            const response = await axios.get(api_url.get_revendedores_evento(eventId), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            const data = Array.isArray(response.data) ? response.data : [];
            set({ revendedoresAsignados: data });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al cargar revendedores asignados";
            set({ error: errorMsg });
            toast.error(errorMsg);
        } finally {
            set({ loadingAsignados: false });
        }
    },

    asignarRevendedor: async (eventId: number, revendedorId: number) => {
        try {
            await axios.post(`${api_url.asignar_revendedor}?eventoId=${eventId}&revendedorId=${revendedorId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            toast.success("Revendedor asignado correctamente");

            // Recargar ambas listas después de asignar
            await Promise.all([
                get().cargarRevendedores(),
                get().cargarRevendedoresAsignados(eventId)
            ]);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al asignar revendedor";
            toast.error(errorMsg);
            throw error;
        }
    },

    eliminarRevendedor: async (eventId: number, revendedorId: number) => {
        try {
            await axios.delete(api_url.eliminar_revendedor(eventId, revendedorId), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            toast.success("Revendedor eliminado correctamente");

            // Recargar ambas listas después de eliminar
            await Promise.all([
                get().cargarRevendedores(),
                get().cargarRevendedoresAsignados(eventId)
            ]);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al eliminar revendedor";
            toast.error(errorMsg);
            throw error;
        }
    },
})); 