import React from 'react';
import { FaTicketAlt } from "react-icons/fa";
import { MdGroup, MdEventAvailable } from "react-icons/md";
import { useGananciasStore } from '@/components/Dashboard/Compras/store/useGananciasStore';
import { useEventosProductoraStore } from '@/components/Dashboard/Compras/store/useEventosProductoraStore';
import { useRevendedoresProductoraStore } from '@/components/Dashboard/Compras/store/useRevendedoresProductoraStore';

interface MetricasDashboardProps {
    showEventos?: boolean;
    showRevendedores?: boolean;
}

const MetricasDashboard: React.FC<MetricasDashboardProps> = ({
    showEventos = true,
    showRevendedores = true
}) => {
    const { resumen, loading } = useGananciasStore();
    const { eventos, loading: eventosLoading } = useEventosProductoraStore();
    const { revendedores, loading: revendedoresLoading } = useRevendedoresProductoraStore();

    return (
        <div className="flex flex-1 flex-col justify-center divide-y divide-black/20 bg-transparent md:w-1/2">
            {/* Tickets vendidos */}
            <div className="flex flex-row items-center gap-4 py-3">
                <FaTicketAlt className="mr-2 text-xl text-black" />
                <div className="flex-1">
                    <div className="text-xs font-bold uppercase text-black">TICKETS VENDIDOS</div>
                    <div className="text-xs text-gray-700">En todos los eventos</div>
                </div>
                <div className="flex min-w-[90px] flex-col items-end">
                    {loading ? (
                        <div className="h-4 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
                    ) : (
                        <span className="text-base font-bold text-black">
                            {resumen?.ticketsVendidos || '0'}
                        </span>
                    )}
                    <span className="text-xs font-medium text-gray-700">
                        {resumen?.precioPromedio ? `$${resumen.precioPromedio.toLocaleString('es-AR')} promedio` : 'Promedio por ticket'}
                    </span>
                </div>
            </div>

            {/* Eventos activos */}
            {showEventos && (
                <div className="flex flex-row items-center gap-4 py-3">
                    <MdEventAvailable className="mr-2 text-xl text-black" />
                    <div className="flex-1">
                        <div className="text-xs font-bold uppercase text-black">EVENTOS ACTIVOS</div>
                    </div>
                    <div className="flex min-w-[90px] flex-col items-end">
                        {eventosLoading ? (
                            <div className="h-4 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
                        ) : (
                            <span className="text-base font-bold text-black">
                                {eventos?.length || '0'}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Revendedores */}
            {showRevendedores && (
                <div className="flex flex-row items-center gap-4 py-3">
                    <MdGroup className="mr-2 text-xl text-black" />
                    <div className="flex-1">
                        <div className="text-xs font-bold uppercase text-black">REVENDEDORES</div>
                        <div className="text-xs text-gray-700">Total</div>
                    </div>
                    <div className="flex min-w-[90px] flex-col items-end">
                        {revendedoresLoading ? (
                            <div className="h-4 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
                        ) : (
                            <span className="text-base font-bold text-black">
                                {revendedores?.length || '0'}
                            </span>
                        )}
                        <span className="text-xs font-medium text-gray-700">
                            {revendedores?.length > 0 ? `${revendedores.length} activos` : 'Sin revendedores'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetricasDashboard; 