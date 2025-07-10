import React, { useEffect, useState } from 'react';
import { useSolicitudAltaStore } from '@/components/Dashboard/Admin/SolicitudAlta/store/useSolicitudAltaStore';
import { FiEye, FiSearch } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle, FaMinusCircle } from 'react-icons/fa';
import LoaderOverlay from '@/components/Dashboard/ComponentesReutilizables/LoaderOverlay';

const SolicitudAlta: React.FC = () => {
    const {
        productoras,
        loading,
        error,
        updating,
        fetchProductoras,
        updateProductoraStatus
    } = useSolicitudAltaStore();

    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProductoras();
    }, [fetchProductoras]);

    const handleStatusChange = async (productoraId: number, newStatus: string) => {
        await updateProductoraStatus(productoraId, newStatus);
    };

    // Filtrar productoras por nombre (razonSocial)
    const filteredProductoras = productoras.filter((p) =>
        p.razonSocial.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 bg-[#131315]">
                <h1 className="mb-6 text-3xl font-bold text-secondary">Solicitudes de productoras</h1>
                {/* Barra de búsqueda funcional */}
                <div className="relative mb-8 max-w-xl">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiSearch size={20} />
                    </span>
                    <input
                        type="text"
                        className="w-full rounded-md bg-[#1C1C1E] py-3 pl-10 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Buscar solicitud por nombre de la productora..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                </div>
            ) : error ? (
                <div className="rounded-lg bg-red-500/10 p-4 text-center text-red-500">{error}</div>
            ) : (
                <div className="space-y-6 bg-[#131315]">
                    {filteredProductoras.length === 0 ? (
                        <div className="rounded-lg bg-[#1C1C1E] p-8 text-center text-gray-500">
                            No hay solicitudes pendientes
                        </div>
                    ) : (
                        filteredProductoras.map((productora) => (
                            <div
                                key={productora.id}
                                className="flex flex-col rounded-xl border border-[#1C1C1E] bg-[#1C1C1E] p-6 shadow-lg md:flex-row md:items-center md:justify-between"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="mb-2 flex items-center gap-3">
                                        <span className="text-xl font-bold text-white">{productora.razonSocial || 'Nombre de Productora'}</span>
                                        {productora.status === 'PENDING' && (
                                            <span className="rounded-md bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-black">Solicitud Pendiente</span>
                                        )}
                                        {productora.status === 'APPROVED' && (
                                            <span className="rounded-md bg-green-500 px-3 py-1 text-xs font-semibold text-white">Solicitud Aprobada</span>
                                        )}
                                        {productora.status === 'REJECTED' && (
                                            <span className="rounded-md bg-red-500 px-3 py-1 text-xs font-semibold text-white">Solicitud Rechazada</span>
                                        )}
                                    </div>
                                    <div className="mb-1 text-sm text-gray-300">{productora.email}</div>
                                    <div className="mb-2 text-sm text-gray-400">
                                        Ej: "Organizador de festivales de música a gran escala especializado en eventos de música electrónica y rock."
                                    </div>
                                    <div className="mb-2 flex flex-wrap gap-8 text-xs text-gray-400">
                                        <div>
                                            <span className="block font-semibold text-gray-300">Fecha de solicitud</span>
                                            <span>dd/mm/aaaa</span>
                                        </div>
                                        <div>
                                            <span className="block font-semibold text-gray-300">Tipo/s de evento/s</span>
                                            <span>Ej: "Sociales"</span>
                                        </div>
                                    </div>
                                    {/*   <div className='my-4 w-96 border-t border-gray-600'></div>
                                    <button
                                        className="mt-2 flex items-center gap-2 text-sm font-semibold text-red-500 hover:underline"
                                        type="button"
                                        tabIndex={-1}
                                    >
                                        <FiEye /> Ver Documentos presentados
                                    </button> */}
                                </div>
                                <div className="mt-6 flex min-w-[180px] flex-col gap-3 md:ml-8 md:mt-0">
                                    <button
                                        className="flex items-center justify-center gap-2 rounded-md bg-green-500 py-2 text-white transition hover:bg-green-600 disabled:opacity-60"
                                        disabled={updating === productora.id || productora.status === 'APPROVED'}
                                        onClick={() => handleStatusChange(productora.id, 'APPROVED')}
                                    >
                                        <FaCheckCircle className="text-white" /> Aceptar
                                    </button>
                                    <button
                                        className="flex items-center justify-center gap-2 rounded-md bg-red-500 py-2 text-white transition hover:bg-red-600 disabled:opacity-60"
                                        disabled={updating === productora.id || productora.status === 'REJECTED'}
                                        onClick={() => handleStatusChange(productora.id, 'REJECTED')}
                                    >
                                        <FaTimesCircle className="text-white" /> Rechazar
                                    </button>
                                    {/*   <button
                                        className="flex items-center justify-center gap-2 rounded-md border border-white bg-transparent py-2 text-white transition hover:bg-white/10"
                                        type="button"
                                        tabIndex={-1}
                                    >
                                        <FaMinusCircle className="text-white" /> Solicitar Más Info
                                    </button> */}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Loader overlay cuando se está actualizando una solicitud */}
            {updating && <LoaderOverlay />}
        </div>
    );
};

export default SolicitudAlta; 