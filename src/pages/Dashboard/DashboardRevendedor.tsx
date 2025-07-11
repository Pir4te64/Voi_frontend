import { FaTicketAlt, FaShoppingCart, } from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { usePageTitle } from '@/context/usePageTitle';
import { useEventosRevendedorStore } from '@/components/Dashboard/Compras/store/useEventosRevendedorStore';
import { useTicketsUsuarioStore } from '@/components/Dashboard/Compras/store/useTicketsUsuarioStore';
import { useGananciasStore } from '@/components/Dashboard/Compras/store/useGananciasStore';
import { useEffect } from 'react';

const DashboardRevendedor = () => {
    usePageTitle('Dashboard Revendedor');
    const { eventos, loading: eventosLoading, error: eventosError, fetchEventos } = useEventosRevendedorStore();
    const { fetchTickets } = useTicketsUsuarioStore();
    const { resumen, loading: gananciasLoading, error: gananciasError, fetchGanancias } = useGananciasStore();

    useEffect(() => {
        fetchEventos();
        fetchTickets();
        fetchGanancias();
    }, [fetchEventos, fetchTickets, fetchGanancias]);

    // Calcular métricas de tickets
    //const ticketsUtilizados = tickets.filter(ticket => ticket.estado === 'UTILIZADO').length;
    //const ticketsPagados = tickets.filter(ticket => ticket.estado === 'PAGADO').length;
    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Dashboard Revendedor</h1>
            <p className="mb-6 text-gray-300">Panel de control para gestión de ventas y comisiones.</p>

            <div className="w-full overflow-hidden rounded-xl bg-secondary p-0">
                <div className="grid grid-cols-1 divide-y divide-black/30 md:grid-cols-2 md:divide-x md:divide-y-0">
                    {/* Columna izquierda */}
                    <div className="flex flex-col divide-y divide-black/30">
                        {/* Tickets Vendidos */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaTicketAlt className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">TICKETS VENDIDOS</div>
                                    <div className="text-xs font-normal text-black/60">Total</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">
                                {gananciasLoading ? '...' : gananciasError ? '0' : resumen?.ticketsVendidos?.toString().padStart(2, '0') ?? '0'}
                            </div>
                        </div>
                        {/* Ventas Totales */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaShoppingCart className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">VENTAS TOTALES</div>
                                    <div className="text-xs font-normal text-black/60">Este mes</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">
                                {gananciasLoading ? '...' : gananciasError ? '$0' : `$${resumen?.gananciaTotal?.toLocaleString('es-AR') ?? '0'}`}
                            </div>
                        </div>
                        {/* Comisiones Generadas */}
                        {/*
                    <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3">
                            <FaChartLine className="text-2xl text-black" />
                            <div>
                                <div className="text-base font-bold text-black">COMISIONES</div>
                                <div className="text-xs font-normal text-black/60">Generadas</div>
                            </div>
                        </div>
                        <div className="flex h-full flex-col items-end justify-center">
                            <div className="text-3xl font-bold text-black">$0</div>
                        </div>
                    </div>
                    */}
                    </div>
                    {/* Columna derecha */}
                    <div className="flex flex-col divide-y divide-black/30">
                        {/* Eventos Activos */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <BiBarChartAlt2 className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">EVENTOS ACTIVOS</div>
                                    <div className="text-xs font-normal text-black/60">Disponibles</div>
                                </div>
                            </div>
                            <div className="flex h-full flex-col items-end justify-center">
                                <div className="text-3xl font-bold text-black">
                                    {eventosLoading ? '...' : eventosError ? '0' : eventos.length.toString().padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                        {/* Notificaciones */}
                        {/*
                    <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3">
                            <FaBell className="text-2xl text-black" />
                            <div>
                                <div className="text-base font-bold text-black">NOTIFICACIONES</div>
                                <div className="text-xs font-normal text-black/60">Pendientes</div>
                            </div>
                        </div>
                        <div className="flex h-full items-center text-3xl font-bold text-black">09</div>
                    </div>
                    */}
                        {/* QR Personalizado */}
                        {/*
                    <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3">
                            <FaQrcode className="text-2xl text-black" />
                            <div>
                                <div className="text-base font-bold text-black">QR PERSONALIZADO</div>
                                <div className="text-xs font-normal text-black/60">Disponible</div>
                            </div>
                        </div>
                        <div className="flex h-full items-center text-3xl font-bold text-black">✓</div>
                    </div>
                    */}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardRevendedor; 