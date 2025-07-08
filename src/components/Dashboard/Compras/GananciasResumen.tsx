import React, { useEffect } from 'react';
import { useGananciasStore } from '@/components/Dashboard/Compras/store/useGananciasStore';
import { useComprasStore } from '@/components/Dashboard/Compras/store/useComprasStore';
import { useUserInfo } from '@/context/useUserInfo';
import { BiDollar } from "react-icons/bi";
import { FaWallet, FaChartLine, FaGlobe } from "react-icons/fa";

interface GananciasResumenProps {
    visible: boolean;
}

const GananciasResumen: React.FC<GananciasResumenProps> = ({ visible }) => {
    const { resumen, loading, error, fetchGanancias } = useGananciasStore();
    const { ventasWebCount, ventasWebLoading, fetchVentasWebCount } = useComprasStore();
    const { userType } = useUserInfo();

    useEffect(() => {
        if (visible) {
            fetchGanancias();
            fetchVentasWebCount();
        }
        // eslint-disable-next-line
    }, [visible]);

    // Solo mostrar para ADMIN y PRODUCTORA
    if (!visible || (userType !== 'ADMIN' && userType !== 'PRODUCTORA')) return null;

    return (
        <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-lg bg-[#FF5C70] px-4 py-4 text-black sm:mb-8 sm:px-6 sm:py-6 md:flex-row">
            {loading ? (
                <div className="w-full text-center text-sm sm:text-base">Cargando resumen...</div>
            ) : error ? (
                <div className="w-full text-center text-sm text-red-700 sm:text-base">{error}</div>
            ) : resumen ? (
                <>
                    <div className="w-full flex-1 border-b border-black/20 px-2 py-2 last:border-none sm:min-w-[180px] sm:border-b-0 sm:border-r sm:px-4 sm:py-0">
                        <div className="flex items-center gap-2 text-sm font-bold sm:text-base">
                            <BiDollar /> INGRESO TOTAL
                        </div>
                        <div className="mb-1 text-xs">En todos los eventos</div>
                        <div className="text-xl font-extrabold sm:text-2xl">
                            ${resumen.gananciaTotal.toLocaleString('es-AR')}
                        </div>
                    </div>
                    <div className="w-full flex-1 border-b border-black/20 px-2 py-2 last:border-none sm:min-w-[180px] sm:border-b-0 sm:border-r sm:px-4 sm:py-0">
                        <div className="flex items-center gap-2 text-sm font-bold sm:text-base">
                            <FaWallet /> TICKETS VENDIDOS
                        </div>
                        <div className="mb-1 text-xs">De todos los eventos</div>
                        <div className="text-xl font-extrabold sm:text-2xl">{resumen.ticketsVendidos}</div>
                    </div>
                    <div className="w-full flex-1 border-b border-black/20 px-2 py-2 last:border-none sm:min-w-[180px] sm:border-b-0 sm:border-r sm:px-4 sm:py-0">
                        <div className="flex items-center gap-2 text-sm font-bold sm:text-base">
                            <FaGlobe /> VENTAS WEB
                        </div>
                        <div className="mb-1 text-xs">Tickets vendidos por web</div>
                        <div className="text-xl font-extrabold sm:text-2xl">
                            {ventasWebLoading ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
                            ) : (
                                ventasWebCount
                            )}
                        </div>
                    </div>
                    <div className="w-full flex-1 px-2 py-2 sm:min-w-[180px] sm:px-4 sm:py-0">
                        <div className="flex items-center gap-2 text-sm font-bold sm:text-base">
                            <FaChartLine /> INGRESO PROMEDIO
                        </div>
                        <div className="mb-1 text-xs">POR TICKET</div>
                        <div className="text-xl font-extrabold sm:text-2xl">
                            ${resumen.precioPromedio.toLocaleString('es-AR')}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default GananciasResumen; 