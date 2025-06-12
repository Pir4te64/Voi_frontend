import React, { useEffect } from 'react';
import { useRevendedoresStore } from '@/components/Dashboard/GestionEventos/AsignarRevendedor/store/useRevendedoresStore';
import { FaUserPlus } from 'react-icons/fa';

interface AsignarRevendedorProps {
    eventId: number;
    eventName: string;
}

const AsignarRevendedor: React.FC<AsignarRevendedorProps> = ({ eventId, eventName }) => {
    const { revendedores, loading, error, cargarRevendedores, asignarRevendedor } = useRevendedoresStore();

    useEffect(() => {
        cargarRevendedores();
    }, [cargarRevendedores]);

    // Asegurarnos de que revendedores sea un array
    const revendedoresList = Array.isArray(revendedores) ? revendedores : [];

    const handleAsignarRevendedor = async (revendedorId: number) => {
        try {
            await asignarRevendedor(eventId, revendedorId);
        } catch (error) {
            console.error("Error al asignar revendedor:", error);
        }
    };

    return (
        <div className="rounded-lg bg-back p-8">
            <h2 className="mb-2 text-lg font-semibold text-white">
                Gestionar Revendedores para:{" "}
                <span className="text-secondary">{eventName}</span>
            </h2>
            <p className="mb-6 text-gray-400">
                ID del evento: <span className="font-mono">{eventId}</span>
            </p>

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                </div>
            ) : error ? (
                <div className="rounded-lg bg-red-500/10 p-4 text-center text-red-500">
                    {error}
                </div>
            ) : (
                <div className="rounded-lg bg-back">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-800/40">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Nombre</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Apellido</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Teléfono</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Email</th>
                                    <th className="px-4 py-2 text-center text-sm font-semibold text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {revendedoresList.map((revendedor) => (
                                    <tr key={revendedor.id} className="hover:bg-gray-800/30">
                                        <td className="px-4 py-3 text-white">{revendedor.nombre}</td>
                                        <td className="px-4 py-3 text-white">{revendedor.apellido}</td>
                                        <td className="px-4 py-3 text-white">{revendedor.phoneNumber}</td>
                                        <td className="px-4 py-3 text-white">{revendedor.email}</td>
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
                    {revendedoresList.length === 0 && !loading && (
                        <p className="py-8 text-center text-gray-400">
                            No hay revendedores disponibles
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AsignarRevendedor; 