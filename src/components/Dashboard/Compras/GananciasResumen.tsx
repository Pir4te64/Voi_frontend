import React, { useEffect } from 'react';
import { useGananciasStore } from './store/useGananciasStore';

interface GananciasResumenProps {
    visible: boolean;
}

const GananciasResumen: React.FC<GananciasResumenProps> = ({ visible }) => {
    const { resumen, loading, error, fetchGanancias } = useGananciasStore();

    useEffect(() => {
        if (visible) fetchGanancias();
        // eslint-disable-next-line
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="mb-8 rounded-lg bg-[#FF5C70] px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-black">
            {loading ? (
                <div className="w-full text-center">Cargando resumen...</div>
            ) : error ? (
                <div className="w-full text-center text-red-700">{error}</div>
            ) : resumen ? (
                <>
                    <div className="flex-1 min-w-[180px] border-r border-black/20 last:border-none px-4">
                        <div className="font-bold flex items-center gap-2">💲 INGRESO TOTAL</div>
                        <div className="text-xs mb-1">En todos los eventos</div>
                        <div className="text-2xl font-extrabold">${resumen.gananciaTotal.toLocaleString('es-AR', { minimumFractionDigits: 3 })}</div>
                    </div>
                    <div className="flex-1 min-w-[180px] border-r border-black/20 last:border-none px-4">
                        <div className="font-bold flex items-center gap-2">🎟️ TICKETS VENDIDOS</div>
                        <div className="text-xs mb-1">De todos los eventos</div>
                        <div className="text-2xl font-extrabold">{resumen.ticketsVendidos.toString().padStart(2, '0').padEnd(6, '.')}</div>
                    </div>
                    <div className="flex-1 min-w-[180px] px-4">
                        <div className="font-bold flex items-center gap-2">📈 INGRESO PROMEDIO</div>
                        <div className="text-xs mb-1">POR EVENTO</div>
                        <div className="text-2xl font-extrabold">${resumen.precioPromedio.toLocaleString('es-AR', { minimumFractionDigits: 3 })}</div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default GananciasResumen; 