import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { EditarLoteFormData } from "@/components/Dashboard/GestionLotes/EditarLote/data/editarLote.data";

interface EditarLoteFormStore {
    success: boolean;
    setSuccess: (value: boolean) => void;
    updateLote: (values: EditarLoteFormData, eventoId: number, loteId: number) => Promise<void>;
}

export const useEditarLoteForm = create<EditarLoteFormStore>((set) => ({
    success: false,
    setSuccess: (value) => set({ success: value }),
    updateLote: async (values, loteId) => {
        try {


            // Solo enviamos la nueva cantidad de tickets disponibles
            await axios.put(api_url.actualizar_tickets_disponibles(loteId, values.cantidadTickets), {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });

            console.log("✅ Actualización exitosa!");

            toast.success("Cantidad de tickets actualizada correctamente", {
                position: "top-right",
                autoClose: 3000,
            });

            set({ success: true });
            return Promise.resolve();
        } catch (error: any) {

            toast.error(
                error.response?.data?.message || "Error al actualizar la cantidad de tickets",
                { position: "top-right", autoClose: 3000 }
            );
            set({ success: false });
            return Promise.reject(error);
        }
    },
})); 