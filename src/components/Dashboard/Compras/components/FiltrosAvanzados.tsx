import React, { useState } from 'react';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import { useComprasStore } from '@/components/Dashboard/Compras/store/useComprasStore';
import { useUserInfo } from '@/context/useUserInfo';

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
    const [localFiltros, setLocalFiltros] = useState(filtros);
    const limpiarFiltrosStore = useComprasStore(state => state.limpiarFiltros);
    const { userType } = useUserInfo();

    const handleInputChange = (campo: 'estado' | 'tipoTicket' | 'nombreEvento' | 'nombreLote', valor: string) => {
        setLocalFiltros({
            ...localFiltros,
            [campo]: (campo === 'nombreEvento' || campo === 'nombreLote') ? valor.trimStart() : valor
        });
    };

    // Al aplicar filtros, hacer trim final a los campos de búsqueda
    const aplicarFiltros = () => {
        onFiltrosChange({
            ...localFiltros,
            nombreEvento: localFiltros.nombreEvento.trim(),
            nombreLote: localFiltros.nombreLote.trim()
        });
    };

    const limpiarFiltros = () => {
        setLocalFiltros({
            estado: '',
            tipoTicket: '',
            nombreEvento: '',
            nombreLote: ''
        });
        onFiltrosChange({
            estado: '',
            tipoTicket: '',
            nombreEvento: '',
            nombreLote: ''
        });
        limpiarFiltrosStore();
    };

    const tieneFiltrosActivos = localFiltros.estado || localFiltros.tipoTicket || localFiltros.nombreEvento || localFiltros.nombreLote;

    return (
        <div className="mb-4">
            {/* Campos de búsqueda separados solo para ADMIN */}
            {(userType === 'ADMIN' || userType === 'PRODUCTORA') && (
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                    {/* Búsqueda por Evento */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre de evento..."
                            value={localFiltros.nombreEvento}
                            onChange={(e) => handleInputChange('nombreEvento', e.target.value)}
                            className="w-full rounded-md bg-[#232326] px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                    </div>

                    {/* Búsqueda por Lote + Botón Buscar */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre de lote..."
                            value={localFiltros.nombreLote}
                            onChange={(e) => handleInputChange('nombreLote', e.target.value)}
                            className="w-full rounded-md bg-[#232326] px-10 py-3 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary sm:pr-24"
                        />
                        <button
                            onClick={aplicarFiltros}
                            className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs text-white transition-all hover:bg-green-700 sm:px-4 sm:py-2 sm:text-sm"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            )}

            {/* Filtros avanzados solo para ADMIN */}
            {(userType === 'ADMIN' || userType === 'PRODUCTORA') && (
                <>
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
                                    {[localFiltros.estado, localFiltros.tipoTicket, localFiltros.nombreEvento, localFiltros.nombreLote].filter(Boolean).length}
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
                                        value={localFiltros.estado}
                                        onChange={(e) => handleInputChange('estado', e.target.value)}
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
                                        value={localFiltros.tipoTicket}
                                        onChange={(e) => handleInputChange('tipoTicket', e.target.value)}
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
                </>
            )}
        </div>
    );
};

export default FiltrosAvanzados; 