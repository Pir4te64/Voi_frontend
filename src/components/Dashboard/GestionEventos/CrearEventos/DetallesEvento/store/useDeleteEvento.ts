import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";

interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    categoriaNombre: string;
    address: {
        street: string | null;
        city: string;
    };
    estado: string;
}

interface DeleteEventoStore {
    eventToDelete: Evento | null;
    setEventToDelete: (event: Evento | null) => void;
    deleteEvent: (eventId: number, onSuccess: () => void) => Promise<void>;
}

export const useDeleteEvento = create<DeleteEventoStore>((set) => ({
    eventToDelete: null,
    setEventToDelete: (event) => set({ eventToDelete: event }),
    deleteEvent: async (eventId, onSuccess) => {
        try {
            await axios.delete(`${api_url.delete_evento}?eventoId=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });

            toast.success("Evento eliminado correctamente", {
                position: "top-right",
                autoClose: 3000,
            });

            set({ eventToDelete: null });
            onSuccess();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Error al eliminar el evento",
                { position: "top-right", autoClose: 3000 }
            );
        }
    },
})); 