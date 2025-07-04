import React, { useEffect } from 'react';
import { useGananciasStore } from '@/components/Dashboard/Compras/store/useGananciasStore';
import { useUserInfo } from '@/context/useUserInfo';
import { BiDollar } from "react-icons/bi";
import { FaWallet, FaChartLine } from "react-icons/fa";

interface GananciasResumenProps {
    visible: boolean;
}

const GananciasResumen: React.FC<GananciasResumenProps> = ({ visible }) => {
    const { resumen, loading, error, fetchGanancias } = useGananciasStore();
    const { userType } = useUserInfo();

    useEffect(() => {
        if (visible) fetchGanancias();
        // eslint-disable-next-line
    }, [visible]);

    // Solo mostrar para ADMIN y PRODUCTORA
    if (!visible || (userType !== 'ADMIN' && userType !== 'PRODUCTORA')) return null;

    return (
        <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-lg bg-[#FF5C70] px-6 py-6 text-black md:flex-row">
            {loading ? (
                <div className="w-full text-center">Cargando resumen...</div>
            ) : error ? (
                <div className="w-full text-center text-red-700">{error}</div>
            ) : resumen ? (
                <>
                    <div className="min-w-[180px] flex-1 border-r border-black/20 px-4 last:border-none">
                        <div className="flex items-center gap-2 font-bold"><BiDollar /> INGRESO TOTAL</div>
                        <div className="mb-1 text-xs">En todos los eventos</div>
                        <div className="text-2xl font-extrabold">${resumen.gananciaTotal.toLocaleString('es-AR')}</div>
                    </div>
                    <div className="min-w-[180px] flex-1 border-r border-black/20 px-4 last:border-none">
                        <div className="flex items-center gap-2 font-bold"><FaWallet /> TICKETS VENDIDOS</div>
                        <div className="mb-1 text-xs">De todos los eventos</div>
                        <div className="text-2xl font-extrabold">{resumen.ticketsVendidos}</div>
                    </div>
                    <div className="min-w-[180px] flex-1 px-4">
                        <div className="flex items-center gap-2 font-bold"><FaChartLine /> INGRESO PROMEDIO</div>
                        <div className="mb-1 text-xs">POR EVENTO</div>
                        <div className="text-2xl font-extrabold">${resumen.precioPromedio.toLocaleString('es-AR')}</div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default GananciasResumen; 