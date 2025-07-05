import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

interface TicketData {
    id: number;
    eventoId: number;
    evento: string;
    codigo: string;
    qrCode: string;
    estado: string;
    tipoTicket: string;
    fechaEvento: string;
    fechaCompra: string;
    fechaUtilizacion: string | null;
}

export interface UsuarioStats {
    misCompras: number;
    misEventos: number;
    ticketsActivos: number;
    favoritos: number;
    historial: number;
    cantidadUsuarios: number;
}

interface UsuarioStatsState {
    stats: UsuarioStats | null;
    loading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
}

export const useUsuarioStatsStore = create<UsuarioStatsState>((set) => ({
    stats: null,
    loading: false,
    error: null,
    fetchStats: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;
            if (!token) throw new Error('No autenticado');

            // Obtenemos las compras del usuario (tickets)
            let totalCompras = 0;
            let ticketsActivos = 0;

            try {
                const comprasUrl = `${api_url.get_tickets}`;
                const comprasRes = await axios.get(comprasUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // La respuesta viene paginada, usamos totalElements para el total
                totalCompras = comprasRes.data?.totalElements || 0;

                // Para tickets activos, filtramos del contenido actual
                // Consideramos activos los tickets PAGADO y UTILIZADO
                ticketsActivos = Array.isArray(comprasRes.data?.content)
                    ? comprasRes.data.content.filter((ticket: TicketData) =>
                        ticket.estado === 'PAGADO' || ticket.estado === 'UTILIZADO'
                    ).length
                    : 0;
            } catch (error) {
                console.warn('Error al obtener tickets:', error);
                // No fallamos todo el proceso, solo establecemos 0
                totalCompras = 0;
                ticketsActivos = 0;
            }

            // Obtenemos la cantidad de usuarios solo si es admin
            let cantidadUsuarios = 0;

            // Verificar si el usuario es admin
            const userData = localStorage.getItem('me');
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    const isAdmin = user.roles && user.roles.includes('ROLE_ADMIN');

                    if (isAdmin) {
                        try {
                            const cantidadUsuariosUrl = `${api_url.get_cantidad_usuarios}`;
                            const cantidadUsuariosRes = await axios.get(cantidadUsuariosUrl, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            cantidadUsuarios = cantidadUsuariosRes.data?.count || 0;
                        } catch (error) {
                            console.warn('Error al obtener cantidad de usuarios:', error);
                            cantidadUsuarios = 0;
                        }
                    } else {
                        // Si no es admin, no intentamos hacer la petición
                        cantidadUsuarios = 0;
                    }
                } catch (error) {
                    console.warn('Error al parsear datos del usuario:', error);
                    cantidadUsuarios = 0;
                }
            }

            // Construimos las estadísticas con datos reales
            const stats: UsuarioStats = {
                misCompras: totalCompras,
                misEventos: 0, // Por ahora simulado
                ticketsActivos: ticketsActivos,
                favoritos: 0, // Por ahora simulado
                historial: 0, // Por ahora simulado
                cantidadUsuarios: cantidadUsuarios
            };

            set({ stats: stats, loading: false, error: null });
        } catch (err: any) {
            let errorMessage = 'Error al cargar las estadísticas';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, loading: false, stats: null });
        }
    },
})); 