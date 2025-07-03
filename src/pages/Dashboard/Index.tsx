import { FaUsers, FaCalendarAlt, FaRegClock, FaUserTie } from "react-icons/fa";
import { MdGroup } from "react-icons/md";

const Index = () => {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Dashboard</h1>
            <p className="mb-6 text-gray-300">Monitoreo del rendimiento y la actividad de la plataforma.</p>

            <div className="w-full overflow-hidden rounded-xl bg-secondary p-0">
                <div className="grid grid-cols-1 divide-y divide-black/30 md:grid-cols-2 md:divide-x md:divide-y-0">
                    {/* Columna izquierda */}
                    <div className="flex flex-col divide-y divide-black/30">
                        {/* Productoras */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <MdGroup className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">PRODUCTORAS</div>
                                    <div className="text-xs font-normal text-black/60">Registradas</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
                        </div>
                        {/* Eventos Activos */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">EVENTOS ACTIVOS</div>
                                    <div className="text-xs font-normal text-black/60">En curso</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
                        </div>
                        {/* Revendedores */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaUserTie className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">REVENDEDORES</div>
                                    <div className="text-xs font-normal text-black/60">Registrados</div>
                                </div>
                            </div>
                            <div className="flex h-full flex-col items-end justify-center">
                                <div className="text-3xl font-bold text-black">00</div>
                            </div>
                        </div>
                    </div>
                    {/* Columna derecha */}
                    <div className="flex flex-col divide-y divide-black/30">
                        {/* Usuarios Particulares */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaUsers className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">USUARIOS PARTICULARES</div>
                                    <div className="text-xs font-normal text-black/60">Registrados</div>
                                </div>
                            </div>
                            <div className="flex h-full flex-col items-end justify-center">
                                <div className="text-3xl font-bold text-black">000</div>
                            </div>
                        </div>
                        {/* Solicitudes Pendientes */}
                        <div className="flex min-h-[80px] items-center justify-between px-6 py-6">
                            <div className="flex items-center gap-3">
                                <FaRegClock className="text-2xl text-black" />
                                <div>
                                    <div className="text-base font-bold text-black">SOLICITUDES PENDIENTES</div>
                                    <div className="text-xs font-normal text-black/60">En revisión</div>
                                </div>
                            </div>
                            <div className="flex h-full items-center text-3xl font-bold text-black">00</div>
                        </div>
                        {/* Espacio vacío para alinear visualmente */}
                        <div className="min-h-[80px] px-6 py-6" />
                    </div>
                </div>
            </div>

            {/* Actividad reciente (solo título, visual) */}
            <div className="mt-10">
                <h2 className="mb-4 rounded-t bg-black/60 px-4 py-2 text-xl font-bold text-white">Actividad reciente</h2>
                {/* Aquí iría la lista de actividad reciente, solo visual por ahora */}
            </div>
        </div>
    );
};

export default Index;
