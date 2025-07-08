import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface FiltrosAvanzadosProps {
    filtros: {
        estado: string;
        tipoTicket: string;
    };
    onFiltrosChange: (filtros: { estado: string; tipoTicket: string }) => void;
    estadosDisponibles: string[];
    tiposDisponibles: string[];
}

const FiltrosAvanzados: React.FC<FiltrosAvanzadosProps> = ({
    filtros,
    onFiltrosChange,
    estadosDisponibles,
    tiposDisponibles
}) => {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const handleFiltroChange = (campo: 'estado' | 'tipoTicket', valor: string) => {
        onFiltrosChange({
            ...filtros,
            [campo]: valor
        });
    };

    const limpiarFiltros = () => {
        onFiltrosChange({
            estado: '',
            tipoTicket: ''
        });
    };

    const tieneFiltrosActivos = filtros.estado || filtros.tipoTicket;

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${mostrarFiltros || tieneFiltrosActivos
                            ? 'bg-secondary text-white'
                            : 'bg-[#232326] text-gray-300 hover:bg-[#2a2a2d]'
                        }`}
                >
                    <FaFilter className="h-4 w-4" />
                    Filtros
                    {tieneFiltrosActivos && (
                        <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                            {[filtros.estado, filtros.tipoTicket].filter(Boolean).length}
                        </span>
                    )}
                </button>

                {tieneFiltrosActivos && (
                    <button
                        onClick={limpiarFiltros}
                        className="flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/30"
                    >
                        <FaTimes className="h-3 w-3" />
                        Limpiar
                    </button>
                )}
            </div>

            {mostrarFiltros && (
                <div className="mt-4 rounded-lg bg-[#1C1C1E] p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Filtro por Estado */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Estado
                            </label>
                            <select
                                value={filtros.estado}
                                onChange={(e) => handleFiltroChange('estado', e.target.value)}
                                className="w-full rounded-md bg-[#232326] px-3 py-2 text-white border border-gray-600 focus:border-secondary focus:outline-none"
                            >
                                <option value="">Todos los estados</option>
                                {estadosDisponibles.map((estado) => (
                                    <option key={estado} value={estado}>
                                        {estado}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro por Tipo de Ticket */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Tipo de Ticket
                            </label>
                            <select
                                value={filtros.tipoTicket}
                                onChange={(e) => handleFiltroChange('tipoTicket', e.target.value)}
                                className="w-full rounded-md bg-[#232326] px-3 py-2 text-white border border-gray-600 focus:border-secondary focus:outline-none"
                            >
                                <option value="">Todos los tipos</option>
                                {tiposDisponibles.map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo === 'VENTA_REVENDEDOR' ? 'Revendedor' :
                                            tipo === 'VENTA_WEB' ? 'Web' : tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiltrosAvanzados; 