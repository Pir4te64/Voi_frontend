import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { LoteFormData } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/data/lotesEntrada.data";
import { Lote } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/types/lote.types";

interface LotesState {
    lotes: Lote[];
    loadingLotes: boolean;
    isEditing: boolean;
    loteToDelete: Lote | null;
    success: boolean;

    // Acciones
    setSuccess: (value: boolean) => void;
    setIsEditing: (value: boolean) => void;
    setLoteToDelete: (lote: Lote | null) => void;

    // Operaciones con lotes
    cargarLotes: (eventId: number) => Promise<void>;
    createLote: (values: LoteFormData, eventId: number) => Promise<void>;
    updateLote: (values: LoteFormData & { id: number }, eventId: number) => Promise<void>;
    deleteLote: (eventId: number, loteId: number) => Promise<void>;
    cambiarEstadoLote: (loteId: number, nuevoEstado: string) => Promise<void>;
}

export const useLotesStore = create<LotesState>((set, get) => ({
    lotes: [],
    loadingLotes: false,
    isEditing: false,
    loteToDelete: null,
    success: false,

    setSuccess: (value) => set({ success: value }),
    setIsEditing: (value) => set({ isEditing: value }),
    setLoteToDelete: (lote) => set({ loteToDelete: lote }),

    cargarLotes: async (eventId) => {
        set({ loadingLotes: true });
        try {
            const response = await axios.get(api_url.get_lotes_evento(eventId), {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            set({ lotes: response.data });
        } catch (error) {
            console.error("Error al cargar lotes:", error);
            toast.error("Error al cargar los lotes");
        } finally {
            set({ loadingLotes: false });
        }
    },

    createLote: async (values: LoteFormData, eventId: number) => {
        try {
            const payload = {
                nombre: values.nombre,
                precio: values.precio,
                fechaValidez: values.fechaValidez,
                tipoComision: values.tipoComision,
                montoComision: values.tipoComision === "MONTO_FIJO" ? values.montoFijo : values.porcentaje,
                cantidadTickets: values.cantidadTickets,
                eventoId: eventId,
            };

            await axios.post(`${api_url.crear_lote}?eventoId=${eventId}`, payload, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });

            set({ success: true });
            toast.success("Lote creado correctamente");
            get().cargarLotes(eventId);

            setTimeout(() => {
                set({ success: false });
            }, 3000);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error al crear el lote");
            console.error("Error al crear lote:", error);
        }
    },

    updateLote: async (values: LoteFormData & { id: number }, eventId: number) => {
        try {
            await axios.put(api_url.actualizar_tickets_disponibles(values.id, values.cantidadTickets), {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            toast.success("Cantidad de tickets actualizada correctamente");
            set({ isEditing: false, success: true });
            get().cargarLotes(eventId);

            setTimeout(() => {
                set({ success: false });
            }, 3000);
        } catch (error) {
            toast.error("Error al actualizar el lote");
            console.error("Error al actualizar lote:", error);
        }
    },

    deleteLote: async (eventId: number, loteId: number) => {
        try {
            await axios.delete(api_url.eliminar_lote(eventId, loteId), {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            toast.success("Lote eliminado correctamente");
            set({ loteToDelete: null });
            get().cargarLotes(eventId);
        } catch (error) {
            toast.error("Error al eliminar el lote");
            console.error("Error al eliminar lote:", error);
        }
    },

    cambiarEstadoLote: async (loteId: number, nuevoEstado: string) => {
        const lote = get().lotes.find(l => l.id === loteId);
        if (!lote?.eventoId) {
            toast.error("Error: No se pudo encontrar el evento asociado al lote");
            return;
        }

        // Guardamos el estado anterior por si hay error
        const estadoAnterior = lote.estado;

        // Optimistic update
        set((state) => ({
            lotes: state.lotes.map((l) =>
                l.id === loteId ? { ...l, estado: nuevoEstado } : l
            )
        }));

        try {
            let endpoint: string;
            switch (nuevoEstado) {
                case "ACTIVO":
                    endpoint = api_url.activar_lote(loteId);
                    break;
                case "PAUSADO":
                    endpoint = api_url.pausar_lote(loteId);
                    break;
                case "CANCELADO":
                    endpoint = api_url.cancelar_lote(loteId);
                    break;
                default:
                    throw new Error("Estado no válido");
            }

            await axios.put(endpoint, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });

            // Recargamos los datos para asegurar consistencia
            await get().cargarLotes(lote.eventoId);
            toast.success(`Estado del lote cambiado a: ${nuevoEstado}`);
        } catch (error) {
            // Revertimos el cambio si hay error
            set((state) => ({
                lotes: state.lotes.map((l) =>
                    l.id === loteId ? { ...l, estado: estadoAnterior } : l
                )
            }));
            toast.error("Error al cambiar el estado del lote");
            console.error("Error al cambiar estado del lote:", error);
        }
    },
})); 