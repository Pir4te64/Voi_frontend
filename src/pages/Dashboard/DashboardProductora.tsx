import { FaTicketAlt, FaEye } from "react-icons/fa";
import { MdGroup, MdEventAvailable } from "react-icons/md";

const DashboardProductora = () => {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-secondary">Dashboard</h1>
            <div className="flex flex-col rounded-2xl bg-secondary p-8 shadow-lg md:flex-row md:items-center md:justify-start">
                {/* Ingreso total */}
                <div className="mb-8 mr-12 flex min-w-[260px] flex-col justify-center md:mb-0">
                    <div className="mb-2 text-base font-bold uppercase text-white">INGRESO TOTAL</div>
                    <div className="flex items-center gap-2">
                        <span className="text-4xl font-extrabold tracking-wider text-white md:text-5xl">$ 000.000</span>
                        <FaEye className="text-lg text-white opacity-80" />
                    </div>
                    <div className="mt-2 text-sm font-medium text-white/80">+12% con respecto al mes pasado</div>
                </div>
                {/* Métricas */}
                <div className="flex flex-1 flex-col justify-center divide-y divide-black/20 bg-transparent">
                    {/* Tickets vendidos */}
                    <div className="flex flex-row items-center gap-4 py-3">
                        <FaTicketAlt className="mr-2 text-xl text-black" />
                        <div className="flex-1">
                            <div className="text-xs font-bold uppercase text-black">TICKETS VENDIDOS</div>
                            <div className="text-xs text-gray-700">En todas los eventos</div>
                        </div>
                        <div className="flex min-w-[90px] flex-col items-end">
                            <span className="text-base font-bold text-black">00.000</span>
                            <span className="text-xs font-medium text-gray-700">+8% con respecto al mes pasado</span>
                        </div>
                    </div>
                    {/* Eventos activos */}
                    <div className="flex flex-row items-center gap-4 py-3">
                        <MdEventAvailable className="mr-2 text-xl text-black" />
                        <div className="flex-1">
                            <div className="text-xs font-bold uppercase text-black">EVENTOS ACTIVOS</div>
                        </div>
                        <div className="flex min-w-[90px] flex-col items-end">
                            <span className="text-base font-bold text-black">7</span>
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