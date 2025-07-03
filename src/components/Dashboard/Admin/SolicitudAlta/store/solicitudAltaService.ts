import axios from 'axios';
import { api_url } from '@/api/api';
import { ProductoraPendiente } from '@/components/Dashboard/Admin/SolicitudAlta/types';

const getAuthToken = (): string | null => {
    const auth = localStorage.getItem("auth");
    if (!auth) return null;

    try {
        const parsedAuth = JSON.parse(auth);
        return parsedAuth.accessToken || null;
    } catch {
        return null;
    }
};

const createAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No hay token de autenticación");
    }

    return {
        Authorization: `Bearer ${token}`
    };
};

export const solicitudAltaService = {
    /**
     * Obtiene todas las solicitudes de alta de productoras
     */
    async getSolicitudes(): Promise<ProductoraPendiente[]> {
        try {
            const headers = createAuthHeaders();
            const response = await axios.get(api_url.admin_solicitudes_get, { headers });

            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al obtener las solicitudes');
            }
            throw error;
        }
    },

    /**
     * Actualiza el estado de una solicitud de productora
     */
    async updateSolicitudStatus(productoraId: number, status: string): Promise<void> {
        try {
            const headers = createAuthHeaders();
            await axios.put(
                api_url.admin_solicitudes_put,
                {
                    productoraId,
                    status
                },
                { headers }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al actualizar el estado');
            }
            throw error;
        }
    }
}; 