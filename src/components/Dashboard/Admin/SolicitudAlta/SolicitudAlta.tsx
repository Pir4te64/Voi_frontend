import React, { useEffect, useState } from 'react';
import { api_url } from '@/api/api';
import { ProductoraPendiente } from '@/components/Dashboard/Admin/SolicitudAlta/types';
import axios from 'axios';
import { toast } from 'react-toastify';

const SolicitudAlta: React.FC = () => {
    const [productoras, setProductoras] = useState<ProductoraPendiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<number | null>(null);

    const fetchProductoras = async () => {
        try {
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await axios.get(api_url.admin_solicitudes_get, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProductoras(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductoras();
    }, []);

    const handleStatusChange = async (productoraId: number, newStatus: string) => {
        try {
            setUpdating(productoraId);
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            await axios.put(
                api_url.admin_solicitudes_put,
                {
                    productoraId,
                    status: newStatus
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            toast.success('Estado actualizado correctamente');
            await fetchProductoras(); // Recargar la lista
        } catch (err) {
            toast.error('Error al actualizar el estado');
            console.error('Error:', err);
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
            </div>
        );
    }

    if (error) {
        return <div className="rounded-lg bg-red-500/10 p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary">Solicitudes de Alta de Productoras</h1>
            </div>

            <div className="overflow-x-auto rounded-lg bg-black/40">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black text-gray-400">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Razón Social</th>
                            <th className="px-4 py-3 font-semibold">CUIT</th>
                            <th className="px-4 py-3 font-semibold">DNI</th>
                            <th className="px-4 py-3 font-semibold">Email</th>
                            <th className="px-4 py-3 font-semibold">Dirección</th>
                            <th className="px-4 py-3 text-center font-semibold">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productoras.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                    No hay solicitudes pendientes
                                </td>
                            </tr>
                        ) : (
                            productoras.map((productora) => (
                                <tr key={productora.id} className="border-t border-gray-700 hover:bg-black/30">
                                    <td className="px-4 py-3">{productora.razonSocial}</td>
                                    <td className="px-4 py-3">{productora.cuit}</td>
                                    <td className="px-4 py-3">{productora.dni}</td>
                                    <td className="px-4 py-3">{productora.email}</td>
                                    <td className="px-4 py-3">{productora.direccion}</td>
                                    <td className="px-4 py-3 text-center">
                                        <select
                                            value={productora.status}
                                            onChange={(e) => handleStatusChange(productora.id, e.target.value)}
                                            disabled={updating === productora.id}
                                            className={`rounded-md border-none px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${productora.status === "PENDING"
                                                ? "bg-yellow-500/20 text-yellow-500"
                                                : "bg-green-500/20 text-green-500"
                                                }`}
                                        >
                                            <option value="PENDING" className="bg-gray-800 text-yellow-500">
                                                PENDING
                                            </option>
                                            <option value="APPROVED" className="bg-gray-800 text-green-500">
                                                APPROVED
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SolicitudAlta; 