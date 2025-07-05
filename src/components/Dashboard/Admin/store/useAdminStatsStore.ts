import { create } from 'zustand';
import axios from 'axios';
import { api_url } from '@/api/api';

export interface AdminStats {
    productoras: number;
    eventosActivos: number;
    revendedores: number;
    usuariosParticulares: number;
    solicitudesPendientes: number;
    ticketsVendidos: number;
    gananciasTotal: number;
}

interface AdminStatsState {
    stats: AdminStats | null;
    loading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
}

export const useAdminStatsStore = create<AdminStatsState>((set) => ({
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
            
            // Obtenemos eventos activos (usando el endpoint de admin que trae todos los eventos)
            const eventosUrl = `${api_url.get_eventos}`;
            const eventosRes = await axios.get(eventosUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // Usamos los valores pre-calculados de cada evento
            let ticketsVendidosTotal = 0;
            let gananciasTotal = 0;
            
            if (Array.isArray(eventosRes.data?.content)) {
                eventosRes.data.content.forEach((evento: any) => {
                    ticketsVendidosTotal += evento.cantidadTickets || 0;
                    gananciasTotal += evento.gananciaTotal || 0;
                });
            }
            
            // Obtenemos revendedores
            const revendedoresUrl = `${api_url.get_revendedores}`;
            const revendedoresRes = await axios.get(revendedoresUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // Obtenemos solicitudes de alta de productoras
            const solicitudesUrl = `${api_url.admin_solicitudes_get}`;
            const solicitudesRes = await axios.get(solicitudesUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // Filtramos solo las solicitudes pendientes
            const solicitudesPendientes = Array.isArray(solicitudesRes.data) 
                ? solicitudesRes.data.filter((solicitud: any) => solicitud.status === 'PENDING').length
                : 0;
            
            // Construimos las estadísticas con datos reales
            const stats: AdminStats = {
                productoras: 12, // Por ahora simulado
                eventosActivos: eventosRes.data?.totalElements || 0,
                revendedores: revendedoresRes.data?.length || 0,
                usuariosParticulares: 150, // Por ahora simulado
                solicitudesPendientes: solicitudesPendientes,
                ticketsVendidos: ticketsVendidosTotal,
                gananciasTotal: gananciasTotal
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