import { FaTicketAlt, FaShoppingCart, FaChartLine, FaBell, FaQrcode } from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { usePageTitle } from '@/context/usePageTitle';

const DashboardRevendedor = () => {
    usePageTitle('Dashboard Revendedor');
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
                                    <div className="text-xs font-normal text-black/60">Este mes</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
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
                            <div className="flex h-full items-center text-3xl font-bold text-black">$0</div>
                        </div>
                        {/* Comisiones Generadas */}
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
                                <div className="text-3xl font-bold text-black">00</div>
                            </div>
                        </div>
                        {/* Notificaciones */}
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
                        {/* QR Personalizado */}
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
                    </div>
                </div>
            </div>

            {/* Actividad reciente */}
            <div className="mt-10">
                <h2 className="mb-4 rounded-t bg-black/60 px-4 py-2 text-xl font-bold text-white">Actividad reciente</h2>
                <div className="rounded-b bg-black/30 p-4">
                    <p className="text-gray-300">No hay actividad reciente para mostrar.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardRevendedor; 