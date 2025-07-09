import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';
import { Ticket } from '@/components/Dashboard/Compras/store/types';

interface Filtros {
    estado: string;
    tipoTicket: string;
    nombreEvento: string;
    nombreLote: string;
}

interface ComprasState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    qrModal: string | null;
    tipo: 'compras' | 'ventas';
    titulo: string;
    filtros: Filtros;
    ventasWebCount: number;
    ventasWebLoading: boolean;
    ventasRRPPCount: number;
    ventasRRPPLoading: boolean;
    ticketsPorLote: Record<string, Record<string, number>>;

    // Actions
    setTipo: (tipo: 'compras' | 'ventas') => void;
    setTitulo: (titulo: string) => void;
    setQrModal: (qrCode: string | null) => void;
    setPage: (page: number) => void;
    setFiltros: (filtros: Partial<Filtros>) => void;
    fetchTickets: (pageNumber?: number) => Promise<void>;
    fetchVentasWebCount: () => Promise<void>;
    fetchVentasRRPPCount: () => Promise<void>;
    reset: () => void;
    setTicketsPorLote: (tickets: Ticket[], totalElements?: number, filtros?: Filtros) => void;
    limpiarFiltros: () => void;
}

const initialState = {
    tickets: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 1,
    qrModal: null,
    tipo: 'compras' as const,
    titulo: 'Mis Compras',
    filtros: {
        estado: '',
        tipoTicket: '',
        nombreEvento: '',
        nombreLote: ''
    },
    ventasWebCount: 0,
    ventasWebLoading: false,
    ventasRRPPCount: 0,
    ventasRRPPLoading: false,
    ticketsPorLote: {},
};

export const useComprasStore = create<ComprasState>((set, get) => ({
    ...initialState,

    setTipo: (tipo) => {
        set({
            tipo,
            titulo: tipo === 'ventas' ? 'Mis Ventas' : 'Mis Compras'
        });
    },

    setTitulo: (titulo) => set({ titulo }),

    setQrModal: (qrCode) => set({ qrModal: qrCode }),

    setPage: (page) => set({ page }),

    setFiltros: (nuevosFiltros) => {
        const { filtros } = get();
        set({
            filtros: { ...filtros, ...nuevosFiltros },
            page: 0 // Resetear a la primera página cuando cambian los filtros
        });
    },

    setTicketsPorLote: (tickets, totalElements, filtros) => {
        // Si hay filtro de evento y lote, buscar coincidencia exacta
        if (typeof totalElements === 'number' && filtros?.nombreEvento && filtros?.nombreLote && tickets.length > 0) {
            // Verificar que todos los tickets coincidan con ambos filtros
            const allMatch = tickets.every(ticket => ticket.evento === filtros.nombreEvento && ticket.lote === filtros.nombreLote);
            if (allMatch) {
                set({ ticketsPorLote: { [filtros.nombreEvento]: { [filtros.nombreLote]: totalElements } } });
                return;
            }
        }
        // Si no, agrupamos manualmente
        const resumen: Record<string, Record<string, number>> = {};
        tickets.forEach(ticket => {
            const evento = ticket.evento || 'Sin evento';
            const lote = ticket.lote || 'Sin lote';
            if (!resumen[evento]) resumen[evento] = {};
            if (!resumen[evento][lote]) resumen[evento][lote] = 0;
            resumen[evento][lote] += 1;
        });
        set({ ticketsPorLote: resumen });
    },

    fetchTickets: async (pageNumber = 0) => {
        const { tipo, filtros } = get();

        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;

            if (!token) throw new Error('No autenticado');

            // Construir URL con filtros
            const params = new URLSearchParams({
                pageNumber: pageNumber.toString(),
                pageSize: '10',
                sortDirection: 'DESC'
            });

            // Agregar filtros solo si tienen valor
            if (filtros.estado) params.append('estado', filtros.estado);
            if (filtros.tipoTicket) {
                // Convertir valores de interfaz a valores del backend
                const tipoTicketBackend = filtros.tipoTicket === 'WEB' ? 'COMPRA_DIRECTA' :
                    filtros.tipoTicket === 'RRPP' ? 'VENTA_REVENDEDOR' :
                        filtros.tipoTicket;
                params.append('tipoTicket', tipoTicketBackend);
            }
            if (filtros.nombreEvento) params.append('nombreEvento', filtros.nombreEvento);
            if (filtros.nombreLote) params.append('nombreLote', filtros.nombreLote);

            const url = `${api_url.get_tickets}?${params.toString()}`;

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const content = Array.isArray(res.data?.content) ? res.data.content : [];
            set({
                tickets: content,
                totalPages: res.data?.totalPages || 1,
                page: pageNumber
            });
            // Si hay filtros de evento o lote, actualizo el resumen usando totalElements si está disponible
            if (filtros.nombreEvento || filtros.nombreLote) {
                get().setTicketsPorLote(content, res.data?.totalElements, filtros);
            }

        } catch (err: any) {
            set({ tickets: [] });

            // Manejar diferentes tipos de errores
            let errorMessage = `Error al cargar las ${tipo === 'ventas' ? 'ventas' : 'compras'}`;

            if (err.response?.data?.error) {
                // Error con formato específico de la API
                const apiError = err.response.data.error;
                if (apiError.description && Array.isArray(apiError.description)) {
                    errorMessage = apiError.description.join(', ');
                } else if (apiError.description) {
                    errorMessage = apiError.description;
                }
            } else if (err.response?.data?.message) {
                // Error con mensaje directo
                errorMessage = err.response.data.message;
            } else if (err.message) {
                // Error general
                errorMessage = err.message;
            }

            set({ error: errorMessage });
        } finally {
            set({ loading: false });
        }
    },

    fetchVentasWebCount: async () => {
        set({ ventasWebLoading: true });

        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;

            if (!token) throw new Error('No autenticado');

            // Petición específica para ventas web (WEB = COMPRA_DIRECTA)
            const params = new URLSearchParams({
                tipoTicket: 'COMPRA_DIRECTA',
                pageNumber: '0',
                pageSize: '1000', // Obtener todos los resultados para contar
                sortDirection: 'DESC'
            });

            const url = `${api_url.get_tickets}?${params.toString()}`;

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Usar totalElements si está disponible, sino contar el array
            const count = res.data?.totalElements || (Array.isArray(res.data?.content) ? res.data.content.length : 0);

            set({ ventasWebCount: count });

        } catch (err: any) {
            console.error('Error al obtener conteo de ventas web:', err);
            set({ ventasWebCount: 0 });
        } finally {
            set({ ventasWebLoading: false });
        }
    },

    fetchVentasRRPPCount: async () => {
        set({ ventasRRPPLoading: true });

        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;

            if (!token) throw new Error('No autenticado');

            // Petición específica para ventas RRPP (VENTA_REVENDEDOR)
            const params = new URLSearchParams({
                tipoTicket: 'VENTA_REVENDEDOR',
                pageNumber: '0',
                pageSize: '1000', // Obtener todos los resultados para contar
                sortDirection: 'DESC'
            });

            const url = `${api_url.get_tickets}?${params.toString()}`;

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Usar totalElements si está disponible, sino contar el array
            const count = res.data?.totalElements || (Array.isArray(res.data?.content) ? res.data.content.length : 0);
            set({ ventasRRPPCount: count });

        } catch (err: any) {
            console.error('Error al obtener conteo de ventas RRPP:', err);
            set({ ventasRRPPCount: 0 });
        } finally {
            set({ ventasRRPPLoading: false });
        }
    },

    reset: () => set(initialState),
    limpiarFiltros: () => set({
        filtros: {
            estado: '',
            tipoTicket: '',
            nombreEvento: '',
            nombreLote: ''
        },
        ticketsPorLote: {}
    }),
})); 