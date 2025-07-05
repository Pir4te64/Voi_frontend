import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

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
            const comprasUrl = `${api_url.get_tickets}`;
            const comprasRes = await axios.get(comprasUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // La respuesta viene paginada, usamos totalElements para el total
            const totalCompras = comprasRes.data?.totalElements || 0;

            // Para tickets activos, filtramos del contenido actual
            const ticketsActivos = Array.isArray(comprasRes.data?.content)
                ? comprasRes.data.content.filter((ticket: any) => ticket.estado !== 'CANCELADO').length
                : 0;

            // Obtenemos la cantidad de usuarios
            const cantidadUsuariosUrl = `${api_url.get_cantidad_usuarios}`;
            const cantidadUsuariosRes = await axios.get(cantidadUsuariosUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const cantidadUsuarios = cantidadUsuariosRes.data?.count || 0;

            // Construimos las estadísticas con datos reales
            const stats: UsuarioStats = {
                misCompras: totalCompras,
                misEventos: 0, // Por ahora simulado
                ticketsActivos: ticketsActivos,
                favoritos: 0, // Por ahora simulado
                historial: 0, // Por ahora simulado
                cantidadUsuarios: cantidadUsuarios
            };

            set({ stats: stats, loading: false });
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