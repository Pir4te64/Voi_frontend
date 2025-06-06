import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { LoteFormData } from "../data/lotesEntrada.data";

interface LoteFormStore {
    success: boolean;
    setSuccess: (value: boolean) => void;
    createLote: (values: LoteFormData, eventoId: number) => Promise<void>;
}

export const useLoteForm = create<LoteFormStore>((set) => ({
    success: false,
    setSuccess: (value) => set({ success: value }),
    createLote: async (values, eventoId) => {
        try {
            const payload = {
                nombre: values.nombre,
                precio: values.precio,
                fechaValidez: values.fechaValidez,
                tipoComision: values.tipoComision,
                montoComision: values.tipoComision === "MONTO_FIJO" ? values.montoFijo : values.porcentaje,
                cantidadTickets: values.cantidadTickets,
                eventoId,
            };

            await axios.post(`${api_url.crear_lote}?eventoId=${eventoId}`, payload, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });

            toast.success("Lote creado correctamente", {
                position: "top-right",
                autoClose: 3000,
            });

            set({ success: true });
            return Promise.resolve();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Error al crear el lote",
                { position: "top-right", autoClose: 3000 }
            );
            set({ success: false });
            return Promise.reject(error);
        }
    },
})); 