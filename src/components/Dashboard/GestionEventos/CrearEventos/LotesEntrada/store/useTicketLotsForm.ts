import { create } from "zustand";
import { persist } from "zustand/middleware";
import { genId } from "../utils/genId";

export interface TicketLot {
  id: string;
  name: string;
  price: number;
  validUntil: string;
  commissionType: "fixed" | "percent";
  commissionValue: number;
  active: boolean;
}

interface TicketLotsState {
  lots: TicketLot[];
  addLot: (l: Omit<TicketLot, "id">) => void;
  updateLot: (l: TicketLot) => void;
  deleteLot: (id: string) => void;
}

export const useTicketLotsForm = create<TicketLotsState>()(
  persist(
    (set) => ({
      lots: [],
      addLot: (l) => set((s) => ({ lots: [...s.lots, { ...l, id: genId() }] })),
      updateLot: (l) =>
        set((s) => ({
          lots: s.lots.map((x) => (x.id === l.id ? l : x)),
        })),
      deleteLot: (id) =>
        set((s) => ({ lots: s.lots.filter((x) => x.id !== id) })),
    }),
    { name: "ticket-lots" }
  )
);
