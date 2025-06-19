import { create } from 'zustand'

interface SidebarComprasStore {
    isOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

export const useSidebarComprasStore = create<SidebarComprasStore>((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    closeSidebar: () => set({ isOpen: false }),
})) 