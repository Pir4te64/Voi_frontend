// src/store/useEventsStore.ts
import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";

export interface Event {
    id: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    categoriaId: number;
    categoriaNombre: string;
    linkRedSocial1: string;
    linkRedSocial2: string;
    fechaInicio: string;      // "YYYY-MM-DD"
    fechaFin: string;         // "YYYY-MM-DD"
    estado: string;
    sliderImageUrl: string;   // <-- aquí está la URL que usaremos
    galeriaUrls: string[];
    lotes: any[];
    revendedores: any[];
}

interface EventsState {
    events: Event[];
    fetchEvents: () => Promise<void>;
}

export const useEventsStore = create<EventsState>((set) => ({
    events: [],
    fetchEvents: async () => {
        try {
            const { data } = await axios.get<Event[]>(api_url.get_eventos, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("auth")!
                    ).accessToken}`,
                },
            });
            set({ events: data });
            console.log("Eventos obtenidos:", data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    },
}));
