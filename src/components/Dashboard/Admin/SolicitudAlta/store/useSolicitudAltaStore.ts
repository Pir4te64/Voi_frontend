import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ProductoraPendiente } from '../types';
import { solicitudAltaService } from './solicitudAltaService';

interface SolicitudAltaState {
    productoras: ProductoraPendiente[];
    loading: boolean;
    error: string | null;
    updating: number | null;

    // Actions
    fetchProductoras: () => Promise<void>;
    updateProductoraStatus: (productoraId: number, newStatus: string) => Promise<void>;
    resetError: () => void;
}

export const useSolicitudAltaStore = create<SolicitudAltaState>((set, get) => ({
    productoras: [],
    loading: false,
    error: null,
    updating: null,

    fetchProductoras: async () => {
        try {
            set({ loading: true, error: null });

            const productoras = await solicitudAltaService.getSolicitudes();
            set({ productoras, loading: false });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            set({ error: errorMessage, loading: false });
        }
    },

    updateProductoraStatus: async (productoraId: number, newStatus: string) => {
        try {
            set({ updating: productoraId });

            await solicitudAltaService.updateSolicitudStatus(productoraId, newStatus);
            toast.success('Estado actualizado correctamente');

            // Recargar la lista después de actualizar
            await get().fetchProductoras();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el estado';
            toast.error(errorMessage);
            console.error('Error:', err);
        } finally {
            set({ updating: null });
        }
    },

    resetError: () => {
        set({ error: null });
    }
})); 