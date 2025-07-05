import { FaCalendarAlt, FaTicketAlt, FaHeart, FaHistory } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";

const DashboardUsuario = () => {
    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Mi Dashboard</h1>
            <p className="mb-6 text-gray-300">Panel personal para gestionar tus eventos y compras.</p>

            <div className="w-full overflow-hidden rounded-xl bg-secondary p-0">
                <div className="grid grid-cols-1 divide-y divide-black/30 md:grid-cols-2 md:divide-x md:divide-y-0">
                    {/* Columna izquierda */}
                    <div className="flex flex-col divide-y divide-black/30">
                        {/* Mis Compras */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <CgShoppingCart className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">MIS COMPRAS</div>
                                    <div className="text-xs font-normal text-black/60">Total</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
                        </div>
                        {/* Mis Eventos */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">MIS EVENTOS</div>
                                    <div className="text-xs font-normal text-black/60">Próximos</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
                        </div>
                        {/* Tickets Activos */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaTicketAlt className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">TICKETS ACTIVOS</div>
                                    <div className="text-xs font-normal text-black/60">Válidos</div>
                                </div>
                            </div>
                            <div className="flex h-full flex-col items-end justify-center">
                                <div className="text-3xl font-bold text-black">00</div>
                            </div>
                        </div>
                    </div>
                    {/* Columna derecha */}
                    <div className="flex flex-col divide-y divide-black/30">
                        {/* Eventos Favoritos */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaHeart className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">FAVORITOS</div>
                                    <div className="text-xs font-normal text-black/60">Guardados</div>
                                </div>
                            </div>
                            <div className="flex h-full flex-col items-end justify-center">
                                <div className="text-3xl font-bold text-black">00</div>
                            </div>
                        </div>
                        {/* Historial */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaHistory className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">HISTORIAL</div>
                                    <div className="text-xs font-normal text-black/60">Eventos pasados</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
                        </div>
                        {/* Espacio vacío para alinear visualmente */}
                        <div className="min-h-[80px] px-6 py-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUsuario; 