import React, { useState } from 'react';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

interface FiltrosAvanzadosProps {
    filtros: {
        estado: string;
        tipoTicket: string;
        nombreEvento: string;
        nombreLote: string;
    };
    onFiltrosChange: (filtros: {
        estado: string;
        tipoTicket: string;
        nombreEvento: string;
        nombreLote: string;
    }) => void;
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

    const handleFiltroChange = (campo: 'estado' | 'tipoTicket' | 'nombreEvento' | 'nombreLote', valor: string) => {
        onFiltrosChange({
            ...filtros,
            [campo]: valor
        });
    };

    const limpiarFiltros = () => {
        onFiltrosChange({
            estado: '',
            tipoTicket: '',
            nombreEvento: '',
            nombreLote: ''
        });
    };

    const tieneFiltrosActivos = filtros.estado || filtros.tipoTicket || filtros.nombreEvento || filtros.nombreLote;

    return (
        <div className="mb-4">
            {/* Campos de búsqueda separados */}
            <div className="mb-4 grid gap-4 md:grid-cols-2">
                {/* Búsqueda por Evento */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre de evento..."
                        value={filtros.nombreEvento}
                        onChange={(e) => handleFiltroChange('nombreEvento', e.target.value)}
                        className="w-full rounded-md bg-[#232326] px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                {/* Búsqueda por Lote */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre de lote..."
                        value={filtros.nombreLote}
                        onChange={(e) => handleFiltroChange('nombreLote', e.target.value)}
                        className="w-full rounded-md bg-[#232326] px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
            </div>

            {/* Filtros avanzados */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${mostrarFiltros || tieneFiltrosActivos
                        ? 'bg-secondary text-white'
                        : 'bg-[#232326] text-gray-300 hover:bg-[#2a2a2d]'
                        }`}
                >
                    <FaFilter className="h-4 w-4" />
                    Filtros Avanzados
                    {tieneFiltrosActivos && (
                        <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                            {[filtros.estado, filtros.tipoTicket, filtros.nombreEvento, filtros.nombreLote].filter(Boolean).length}
                        </span>
                    )}
                </button>

                {tieneFiltrosActivos && (
                    <button
                        onClick={limpiarFiltros}
                        className="flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/30"
                    >
                        <FaTimes className="h-3 w-3" />
                        Limpiar Todos
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
                                className="w-full rounded-md border border-gray-600 bg-[#232326] px-3 py-2 text-white focus:border-secondary focus:outline-none"
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
                                className="w-full rounded-md border border-gray-600 bg-[#232326] px-3 py-2 text-white focus:border-secondary focus:outline-none"
                            >
                                <option value="">Todos los tipos</option>
                                {tiposDisponibles.map((tipo) => {
                                    // Convertir valores del backend a valores de interfaz para el select
                                    const tipoInterfaz = tipo === 'VENTA_REVENDEDOR' ? 'RRPP' :
                                        tipo === 'COMPRA_DIRECTA' ? 'WEB' : tipo;
                                    return (
                                        <option key={tipo} value={tipoInterfaz}>
                                            {tipoInterfaz}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiltrosAvanzados; 