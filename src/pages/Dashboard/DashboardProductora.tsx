import { FaTicketAlt, FaEye } from "react-icons/fa";
import { MdGroup, MdEventAvailable } from "react-icons/md";
import { useGananciasStore } from '@/components/Dashboard/Compras/store/useGananciasStore';
import { useEventosProductoraStore } from '@/components/Dashboard/Compras/store/useEventosProductoraStore';
import { useEffect } from 'react';

const DashboardProductora = () => {
    const { resumen, loading, error, fetchGanancias } = useGananciasStore();
    const { eventos, loading: eventosLoading, error: eventosError, fetchEventos } = useEventosProductoraStore();

    useEffect(() => {
        fetchGanancias();
        fetchEventos();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-secondary">Dashboard</h1>
            <div className="flex flex-col rounded-2xl bg-secondary p-8 shadow-lg md:flex-row md:items-center">
                {/* Ingreso total */}
                <div className="mb-8 flex w-full flex-col justify-center md:mb-0 md:w-1/2 md:pr-8">
                    <div className="mb-2 text-base font-bold uppercase text-white">INGRESO TOTAL</div>
                    <div className="flex items-center gap-2">
                        {loading ? (
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                        ) : error ? (
                            <span className="text-2xl font-extrabold tracking-wider text-white md:text-3xl">Error</span>
                        ) : (
                            <span className="text-4xl font-extrabold tracking-wider text-white md:text-5xl">
                                $ {resumen?.gananciaTotal.toLocaleString('es-AR') || '0'}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white/80">
                        {loading ? 'Cargando...' : 'Ingresos totales de todos los eventos'}
                    </div>
                </div>
                {/* Métricas */}
                <div className="flex w-full flex-col justify-center divide-y divide-black/20 bg-transparent md:w-1/2">
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
                    <div className="flex flex-row items-center gap-4 py-3">
                        <MdEventAvailable className="mr-2 text-xl text-black" />
                        <div className="flex-1">
                            <div className="text-xs font-bold uppercase text-black">EVENTOS ACTIVOS</div>
                        </div>
                        <div className="flex min-w-[90px] flex-col items-end">
                            {eventosLoading ? (
                                <div className="h-4 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
                            ) : eventosError ? (
                                <span className="text-base font-bold text-red-600">Error</span>
                            ) : (
                                <span className="text-base font-bold text-black">
                                    {eventos?.length || '0'}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Revendedores */}
                    <div className="flex flex-row items-center gap-4 py-3">
                        <MdGroup className="mr-2 text-xl text-black" />
                        <div className="flex-1">
                            <div className="text-xs font-bold uppercase text-black">REVENDEDORES</div>
                            <div className="text-xs text-gray-700">Total</div>
                        </div>
                        <div className="flex min-w-[90px] flex-col items-end">
                            <span className="text-base font-bold text-black">6</span>
                            <span className="text-xs font-medium text-gray-700">1 nuevo este mes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProductora; 