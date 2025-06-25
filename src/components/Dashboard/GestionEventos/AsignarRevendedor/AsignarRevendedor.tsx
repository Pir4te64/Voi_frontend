import React, { useEffect } from 'react';
import { FaUserPlus, FaTrash } from 'react-icons/fa';
import { useRevendedoresStore } from './store/useRevendedoresStore';

interface AsignarRevendedorProps {
    eventId: number;
    eventName: string;
}

const AsignarRevendedor: React.FC<AsignarRevendedorProps> = ({ eventId }) => {
    const {
        revendedores,
        revendedoresAsignados,
        loading,
        loadingAsignados,
        cargarRevendedores,
        cargarRevendedoresAsignados,
        asignarRevendedor,
        eliminarRevendedor
    } = useRevendedoresStore();

    useEffect(() => {
        cargarRevendedores();
        cargarRevendedoresAsignados(eventId);
    }, [eventId]);

    const handleAsignarRevendedor = async (revendedorId: number) => {
        try {
            await asignarRevendedor(eventId, revendedorId);
        } catch (error) {
            console.error("Error al asignar revendedor:", error);
        }
    };

    const handleEliminarRevendedor = async (revendedorId: number) => {
        try {
            await eliminarRevendedor(eventId, revendedorId);
        } catch (error) {
            console.error("Error al eliminar revendedor:", error);
        }
    };

    return (
        <div className="space-y-6 rounded-lg bg-back">

            {/* Sección de Revendedores Asignados */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Revendedores Asignados al Evento</h3>
                {loadingAsignados ? (
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
                        </div>
                        {revendedoresAsignados.length === 0 && (
                            <p className="py-8 text-center text-gray-400">
                                No hay revendedores asignados a este evento
                            </p>
                        )}
                    </div>
                )}
            </div>

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

        </div>
    );
};

export default AsignarRevendedor; 