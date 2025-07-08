import React from 'react';
import GananciasResumen from '@/components/Dashboard/Compras/GananciasResumen';
import FiltrosAvanzados from '@/components/Dashboard/Compras/components/FiltrosAvanzados';

interface TablaHeaderProps {
    titulo?: string;
    tipo?: 'compras' | 'ventas';
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

const TablaHeader: React.FC<TablaHeaderProps> = ({
    titulo,
    tipo = 'compras',
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