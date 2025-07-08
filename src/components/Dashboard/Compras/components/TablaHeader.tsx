import React from 'react';
import { FaSearch } from 'react-icons/fa';
import GananciasResumen from '@/components/Dashboard/Compras/GananciasResumen';
import FiltrosAvanzados from '@/components/Dashboard/Compras/components/FiltrosAvanzados';

interface TablaHeaderProps {
    titulo?: string;
    tipo?: 'compras' | 'ventas';
    search: string;
    onSearchChange: (value: string) => void;
    filtros: {
        estado: string;
        tipoTicket: string;
    };
    onFiltrosChange: (filtros: { estado: string; tipoTicket: string }) => void;
    estadosDisponibles: string[];
    tiposDisponibles: string[];
}

const TablaHeader: React.FC<TablaHeaderProps> = ({
    titulo,
    tipo = 'compras',
    search,
    onSearchChange,
    filtros,
    onFiltrosChange,
    estadosDisponibles,
    tiposDisponibles
}) => {
    return (
        <>
            <h2 className="mb-4 text-xl font-bold sm:text-2xl" style={{ color: titulo ? 'white' : '#ff5c74' }}>
                {titulo || 'Mis Compras'}
            </h2>
            {tipo === 'ventas' && <GananciasResumen visible={true} />}

            <div className="relative mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Buscar por nombre de evento o lote..."
                    value={search}
                    onChange={e => onSearchChange(e.target.value)}
                    className="w-full rounded-md bg-[#232326] px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
            </div>

            <FiltrosAvanzados
                filtros={filtros}
                onFiltrosChange={onFiltrosChange}
                estadosDisponibles={estadosDisponibles}
                tiposDisponibles={tiposDisponibles}
            />
        </>
    );
};

export default TablaHeader; 