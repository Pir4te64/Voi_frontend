import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus, FaTimes, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useRevendedoresStore } from '@/components/Dashboard/GestionEventos/AsignarRevendedor/store/useRevendedoresStore';

interface AsignarRevendedorProps {
    eventId: number;
    eventName: string;
}

const AsignarRevendedor: React.FC<AsignarRevendedorProps> = ({ eventId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsModalOpen(false); // Cerrar modal después de asignar
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 rounded-lg">
            {/* Sección de Revendedores Asignados */}
            <div>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-white">Revendedores Asignados al Evento</h3>
                    <button
                        onClick={openModal}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm text-white transition hover:opacity-80 sm:w-auto"
                    >
                        <FaPlus />
                        Agregar Revendedor
                    </button>
                </div>

                {loadingAsignados ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="rounded-lg">
                        {/* Vista de escritorio - Tabla */}
                        <div className="hidden overflow-x-auto lg:block">
                            <table className="w-full table-auto text-xs sm:text-sm">
                                <thead className="rounded-lg bg-[#131315]">
                                    <tr>
                                        <th className="px-2 py-2 text-left font-semibold text-white sm:px-4">Nombre</th>
                                        <th className="px-2 py-2 text-left font-semibold text-white sm:px-4">Apellido</th>
                                        <th className="px-2 py-2 text-left font-semibold text-white sm:px-4">Contacto</th>
                                        <th className="px-2 py-2 text-center font-semibold text-white sm:px-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {revendedoresAsignados.map((revendedor) => (
                                        <tr key={revendedor.id} className="">
                                            <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{revendedor.nombre}</td>
                                            <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{revendedor.apellido}</td>
                                            <td className="px-2 py-2 text-white sm:px-4 sm:py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs sm:text-sm">{revendedor.email}</span>
                                                    <span className="text-xs text-gray-400 sm:text-sm">{revendedor.phoneNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-2 py-2 text-center sm:px-4 sm:py-3">
                                                <button
                                                    onClick={() => handleEliminarRevendedor(revendedor.id)}
                                                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white transition hover:bg-red-500 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Vista móvil - Cards */}
                        <div className="lg:hidden">
                            {revendedoresAsignados.length === 0 ? (
                                <p className="py-8 text-center text-gray-400">
                                    No hay revendedores asignados a este evento
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {revendedoresAsignados.map((revendedor) => (
                                        <div
                                            key={revendedor.id}
                                            className="rounded-lg border border-gray-700 bg-black/30 p-4 hover:bg-black/50"
                                        >
                                            <div className="mb-3">
                                                <div className="flex items-center gap-2">
                                                    <FaUser className="h-4 w-4 text-secondary" />
                                                    <h4 className="text-lg font-semibold text-white">
                                                        {revendedor.nombre} {revendedor.apellido}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="mb-4 space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <FaEnvelope className="h-3 w-3 text-gray-400" />
                                                    <span className="text-white">{revendedor.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaPhone className="h-3 w-3 text-gray-400" />
                                                    <span className="text-gray-400">{revendedor.phoneNumber}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleEliminarRevendedor(revendedor.id)}
                                                className="flex w-full items-center justify-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                                            >
                                                <FaTrash className="h-4 w-4" />
                                                Eliminar Revendedor
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal para Revendedores Disponibles */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-[#1a1a1a] p-3 shadow-xl sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">Revendedores Disponibles</h3>
                            <button
                                onClick={closeModal}
                                className="rounded-lg p-2 text-white transition hover:bg-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                            </div>
                        ) : (
                            <div className="rounded-lg">
                                {/* Vista de escritorio - Tabla */}
                                <div className="hidden overflow-x-auto lg:block">
                                    <table className="w-full table-auto text-xs sm:text-sm">
                                        <thead className="bg-black/30">
                                            <tr>
                                                <th className="px-2 py-2 text-left font-semibold text-white sm:px-4">Nombre</th>
                                                <th className="px-2 py-2 text-left font-semibold text-white sm:px-4">Apellido</th>
                                                <th className="px-2 py-2 text-left font-semibold text-white sm:px-4">Contacto</th>
                                                <th className="px-2 py-2 text-center font-semibold text-white sm:px-4">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {revendedores.map((revendedor) => (
                                                <tr key={revendedor.id} className="hover:bg-gray-800/30">
                                                    <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{revendedor.nombre}</td>
                                                    <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{revendedor.apellido}</td>
                                                    <td className="px-2 py-2 text-white sm:px-4 sm:py-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs sm:text-sm">{revendedor.email}</span>
                                                            <span className="text-xs text-gray-400 sm:text-sm">{revendedor.phoneNumber}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 text-center sm:px-4 sm:py-3">
                                                        <button
                                                            onClick={() => handleAsignarRevendedor(revendedor.id)}
                                                            className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-xs text-white transition hover:opacity-80 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                                                        >
                                                            <FaPlus />
                                                            <span className="hidden sm:inline">Asignar</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Vista móvil - Cards */}
                                <div className="lg:hidden">
                                    {revendedores.length === 0 ? (
                                        <p className="py-8 text-center text-gray-400">
                                            No hay revendedores disponibles
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {revendedores.map((revendedor) => (
                                                <div
                                                    key={revendedor.id}
                                                    className="rounded-lg border border-gray-700 bg-black/30 p-4 hover:bg-black/50"
                                                >
                                                    <div className="mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <FaUser className="h-4 w-4 text-secondary" />
                                                            <h4 className="text-lg font-semibold text-white">
                                                                {revendedor.nombre} {revendedor.apellido}
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4 space-y-2 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <FaEnvelope className="h-3 w-3 text-gray-400" />
                                                            <span className="text-white">{revendedor.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaPhone className="h-3 w-3 text-gray-400" />
                                                            <span className="text-gray-400">{revendedor.phoneNumber}</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleAsignarRevendedor(revendedor.id)}
                                                        className="flex w-full items-center justify-center gap-2 rounded bg-secondary px-4 py-2 text-white transition hover:opacity-80"
                                                    >
                                                        <FaPlus className="h-4 w-4" />
                                                        Asignar Revendedor
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AsignarRevendedor; 