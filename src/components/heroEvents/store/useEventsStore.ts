// src/store/useEventsStore.ts
import { create } from "zustand";
import axios from "axios";
import { api_url } from "@/api/api";
import { RemoteEvent } from "@/components/Eventos/SeccionEventos/data/Interfaces";

interface EventsState {
  events: RemoteEvent[];
  fetchEvents: () => Promise<void>;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  fetchEvents: async () => {
    try {
      const response = await axios.get(api_url.get_eventos);
      set({ events: response.data });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },
}));
