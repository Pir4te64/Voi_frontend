import { create } from 'zustand';
import { toast } from 'react-toastify';

interface ItemCarrito {
    eventId: number;
    title: string;
    ticketType: string;
    quantity: number;
    price: number;
    loteId: number; // ID del lote para la compra
}

interface CarritoStore {
    items: ItemCarrito[];
    addToCart: (item: ItemCarrito) => void;
    removeFromCart: (eventId: number, ticketType: string) => void;
    clearCart: () => void;
    isAuthenticated: () => boolean;
    updateQuantity: (eventId: number, ticketType: string, quantity: number, itemData?: Partial<ItemCarrito>) => void;
    getItemQuantity: (eventId: number, ticketType: string) => number;
}

export const useCarritoStore = create<CarritoStore>((set, get) => ({
    items: [],

    isAuthenticated: () => {
        const auth = localStorage.getItem('auth');
        return !!auth;
    },

    getItemQuantity: (eventId: number, ticketType: string) => {
        const item = get().items.find(
            i => i.eventId === eventId && i.ticketType === ticketType
        );
        return item?.quantity || 0;
    },

    updateQuantity: (eventId: number, ticketType: string, quantity: number, itemData?: Partial<ItemCarrito>) => {
        if (!get().isAuthenticated()) {
            toast.error('Debes iniciar sesión para modificar el carrito');
            return;
        }

        const existingItem = get().items.find(
            i => i.eventId === eventId && i.ticketType === ticketType
        );

        if (existingItem) {
            set((state) => ({
                items: state.items.map(item =>
                    item.eventId === eventId && item.ticketType === ticketType
                        ? { ...item, quantity }
                        : item
                ).filter(item => item.quantity > 0)
            }));
        } else if (quantity > 0 && itemData) {
            // Si el item no existe y se proveen datos, lo agregamos
            const newItem: ItemCarrito = {
                eventId,
                ticketType,
                quantity,
                price: itemData.price || 0,
                title: itemData.title || '',
                loteId: itemData.loteId || 0,
            };
            set((state) => ({
                items: [...state.items, newItem]
            }));
            toast.success('Item agregado al carrito');
        }
    },

    addToCart: (item: ItemCarrito) => {
        if (!get().isAuthenticated()) {
            toast.error('Debes iniciar sesión para agregar items al carrito');
            return;
        }

        set((state) => {
            const existingItemIndex = state.items.findIndex(
                (i) => i.eventId === item.eventId && i.ticketType === item.ticketType
            );

            if (existingItemIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingItemIndex].quantity = item.quantity;
                toast.success('Cantidad actualizada en el carrito');
                return { items: newItems };
            } else {
                toast.success('Item agregado al carrito');
                return { items: [...state.items, item] };
            }
        });
    },

    removeFromCart: (eventId: number, ticketType: string) => {
        set((state) => ({
            items: state.items.filter(
                (item) => !(item.eventId === eventId && item.ticketType === ticketType)
            ),
        }));
        toast.info('Item eliminado del carrito');
    },

    clearCart: () => {
        set({ items: [] });
        toast.info('Carrito vaciado');
    },
})); 