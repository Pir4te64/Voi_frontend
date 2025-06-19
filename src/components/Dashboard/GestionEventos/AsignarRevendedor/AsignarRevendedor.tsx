import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { api_url } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

interface AsignarRevendedorProps {
    eventId: number;
    eventName: string;
}

interface Revendedor {
    id: number;
    nombre: string;
    apellido: string;
    phoneNumber: string;
    email: string;
}

const AsignarRevendedor: React.FC<AsignarRevendedorProps> = ({ eventId }) => {
    const { user } = useAuth();
    const [revendedores, setRevendedores] = useState<Revendedor[]>([]);
    const [revendedoresAsignados, setRevendedoresAsignados] = useState<Revendedor[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingAsignados, setLoadingAsignados] = useState(false);

    // Cargar todos los revendedores disponibles
    const cargarRevendedores = async () => {
        try {
            setLoading(true);
            const response = await axios.get(api_url.get_revendedores, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setRevendedores(data);
        } catch (error) {
            console.error("Error al cargar revendedores:", error);
            toast.error("Error al cargar la lista de revendedores");
        } finally {
            setLoading(false);
        }
    };

    // Cargar revendedores asignados al evento
    const cargarRevendedoresAsignados = async () => {
        try {
            setLoadingAsignados(true);
            const response = await axios.get(api_url.get_revendedores_evento(eventId), {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setRevendedoresAsignados(data);
        } catch (error) {
            console.error("Error al cargar revendedores asignados:", error);
            toast.error("Error al cargar los revendedores asignados");
        } finally {
            setLoadingAsignados(false);
        }
    };

    useEffect(() => {
        cargarRevendedores();
        cargarRevendedoresAsignados();
    }, [eventId]);

    const handleAsignarRevendedor = async (revendedorId: number) => {
        try {
            // Llamar al endpoint de asignar revendedor
            await axios.post(api_url.asignar_revendedor, {
                eventoId: eventId,
                revendedorId: revendedorId
            }, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });

            toast.success("Revendedor asignado correctamente");

            // Recargar ambas listas después de asignar
            await Promise.all([
                cargarRevendedores(),
                cargarRevendedoresAsignados()
            ]);
        } catch (error) {
            console.error("Error al asignar revendedor:", error);
            toast.error("Error al asignar el revendedor");
        }
    };

    const handleEliminarRevendedor = async (revendedorId: number) => {
        try {
            await axios.delete(api_url.eliminar_revendedor(eventId, revendedorId), {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });

            toast.success("Revendedor eliminado correctamente");

            // Recargar ambas listas después de eliminar
            await Promise.all([
                cargarRevendedores(),
                cargarRevendedoresAsignados()
            ]);
        } catch (error) {
            console.error("Error al eliminar revendedor:", error);
            toast.error("Error al eliminar el revendedor");
        }
    };

    return (
        <div className="space-y-6 rounded-lg bg-back">

            {/* Sección de Revendedores Disponibles */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Revendedores Disponibles</h3>
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="rounded-lg bg-back">
                        <div className="overflow-x-auto rounded-lg">
                            <table className="w-full table-auto">
                                <thead className="bg-black">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-white">Nombre</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-white">Apellido</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-white">Contacto</th>
                                        <th className="px-4 py-2 text-center text-sm font-semibold text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {revendedores.map((revendedor) => (
                                        <tr key={revendedor.id} className="hover:bg-gray-800/30">
                                            <td className="px-4 py-3 text-white">{revendedor.nombre}</td>
                                            <td className="px-4 py-3 text-white">{revendedor.apellido}</td>
                                            <td className="px-4 py-3 text-white">
                                                <div className="flex flex-col">
                                                    <span>{revendedor.email}</span>
                                                    <span className="text-sm text-gray-400">{revendedor.phoneNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => handleAsignarRevendedor(revendedor.id)}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm text-white transition hover:opacity-80"
                                                >
                                                    <FaUserPlus /> Agregar Revendedor
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {revendedores.length === 0 && !loading && (
                            <p className="py-8 text-center text-gray-400">
                                No hay revendedores disponibles
                            </p>
                        )}
                    </div>
                )}
            </div>

            <h2 className="my-2 text-lg font-semibold text-white">
                Revendedores Asignados al evento
            </h2>

            {/* Sección de Revendedores Asignados */}
            <div className="">
                {loadingAsignados ? (
                    <div className="flex justify-center py-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg bg-back">
                        <table className="w-full table-auto">
                            <thead className="bg-black">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Apellido</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Contacto</th>
                                    <th className="px-4 py-2 text-center text-sm font-semibold text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {revendedoresAsignados.map((revendedor) => (
                                    <tr key={revendedor.id} className="hover:bg-gray-800/30">
                                        <td className="px-4 py-3 text-white">{revendedor.nombre}</td>
                                        <td className="px-4 py-3 text-white">{revendedor.apellido}</td>
                                        <td className="px-4 py-3 text-white">
                                            <div className="flex flex-col">
                                                <span>{revendedor.email}</span>
                                                <span className="text-sm text-gray-400">{revendedor.phoneNumber}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleEliminarRevendedor(revendedor.id)}
                                                className="inline-flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-500 transition hover:bg-red-500/30"
                                            >
                                                <FaTrash /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {revendedoresAsignados.length === 0 && (
                            <p className="py-4 text-center text-gray-400">
                                No hay revendedores asignados a este evento
                            </p>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AsignarRevendedor; 