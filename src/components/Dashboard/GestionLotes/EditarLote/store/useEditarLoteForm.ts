import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { EditarLoteFormData } from "@/components/Dashboard/GestionLotes/EditarLote/data/editarLote.data";

interface EditarLoteFormStore {
    success: boolean;
    setSuccess: (value: boolean) => void;
    updateLote: (values: EditarLoteFormData, loteId: number) => Promise<void>;
}

export const useEditarLoteForm = create<EditarLoteFormStore>((set) => ({
    success: false,
    setSuccess: (value) => set({ success: value }),
    updateLote: async (values, loteId) => {
        try {
            const payload = {
                nombre: values.nombre,
                precio: values.precio,
                fechaValidez: values.fechaValidez,
                tipoComision: values.tipoComision,
                montoComision: values.tipoComision === "MONTO_FIJO" ? values.montoFijo : values.porcentaje,
                cantidadTickets: values.cantidadTickets
            };


            await axios.put(api_url.editar_lote(loteId), payload, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                    'Content-Type': 'application/json'
                },
            });


            toast.success("Lote actualizado correctamente", {
                position: "top-right",
                autoClose: 3000,
            });

            set({ success: true });
            return Promise.resolve();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Error al actualizar el lote",
                { position: "top-right", autoClose: 3000 }
            );
            set({ success: false });
            return Promise.reject(error);
        }
    },
})); 