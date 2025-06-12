import React, { useEffect, useState } from 'react';
import { api_url } from '@/api/api';
import { ProductoraPendiente } from './types';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

const SolicitudAlta: React.FC = () => {
    const [productoras, setProductoras] = useState<ProductoraPendiente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        fetchProductoras();
    }, []);

    const handleEdit = (id: number) => {
        // Implementar la lógica de edición aquí
        console.log('Editar productora:', id);
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
                            <th className="px-4 py-3 text-end font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productoras.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-gray-500">
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
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${productora.status === "PENDING"
                                                ? "bg-yellow-500/20 text-yellow-500"
                                                : productora.status === "APPROVED"
                                                    ? "bg-green-500/20 text-green-500"
                                                    : "bg-red-500/20 text-red-500"
                                                }`}
                                        >
                                            {productora.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(productora.id)}
                                                className="rounded px-4 py-2 text-sm text-white hover:bg-secondary/80"
                                            >
                                                <FaEdit className="h-4 w-4" />
                                            </button>
                                        </div>
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