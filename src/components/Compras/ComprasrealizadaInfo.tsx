import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface OrdenCompra {
    id: number;
    usuarioId: number;
    fechaCreacion: string;
    estado: string;
    montoTotal: number;
    cantidadTickets: number;
    tickets: {
        id: number;
        ticketId: number;
        precioUnitario: number;
    }[];
    ordenPago: any;
}

interface ComprasRealizadaInfoProps {
    ordenCompra: OrdenCompra;
}

const ComprasRealizadaInfo: React.FC<ComprasRealizadaInfoProps> = ({ ordenCompra }) => {
    const navigate = useNavigate();
    const [isResumenOpen, setIsResumenOpen] = React.useState(true);

    return (
        <div className="flex min-h-screen">
            {/* Navegación Lateral */}
            <div className="w-64 flex-shrink-0 border-gray-800 bg-primary p-6">
                <h1 className="mb-6 text-2xl font-bold text-secondary">Comprar Ahora</h1>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white">Tabla de contenidos</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#resumen" className="text-secondary hover:text-white">
                                Resumen de Compra
                            </a>
                        </li>
                        <li>
                            <a href="#datos" className="text-gray-400 hover:text-white">
                                Datos del Comprador
                            </a>
                        </li>
                        <li>
                            <a href="#metodo" className="text-gray-400 hover:text-white">
                                Método de Pago
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="flex-grow">
                <div className="mx-auto max-w-3xl px-8 py-6">
                    {/* Sección 1: Resumen de Compra */}
                    <details
                        className="mb-6 rounded-lg bg-[#252525] p-6"
                        open={isResumenOpen}
                        onToggle={(e) => setIsResumenOpen(e.currentTarget.open)}
                    >
                        <summary className="mb-6 flex cursor-pointer items-center gap-2 text-xl font-semibold text-secondary transition-colors hover:text-white">
                            {isResumenOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                            Resumen de Compra
                        </summary>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">Nombre del Evento</h3>
                                {ordenCompra.tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between border-b border-gray-700 py-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-400">Entrada General</span>
                                            <span className="text-xs text-gray-500">Ticket #{ticket.ticketId}</span>
                                        </div>
                                        <span className="font-semibold text-white">${ticket.precioUnitario.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-gray-700 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Cargo por servicio</span>
                                    <span className="font-semibold text-white">${(ordenCompra.montoTotal * 0.1).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold text-white">TOTAL DEL CARRITO</span>
                                    <span className="text-lg font-bold text-white">${ordenCompra.montoTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={() => {
                                        setIsResumenOpen(false);
                                        setTimeout(() => {
                                            document.getElementById('datos')?.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start'
                                            });
                                        }, 100);
                                    }}
                                    className="mx-auto block w-48 rounded-lg bg-secondary py-2 text-center font-semibold text-white transition-colors hover:bg-secondary/90"
                                >
                                    Continuar Pedido
                                </button>
                            </div>
                        </div>
                    </details>

                    {/* Sección 2: Datos del Comprador */}
                    <div id="datos" className="mb-6 rounded-lg bg-[#252525] p-6">
                        <h2 className="mb-6 text-xl font-semibold text-secondary">Datos del Comprador</h2>
                        <div className="space-y-4">
                            <p className="text-gray-400">Sección en desarrollo</p>
                        </div>
                    </div>

                    {/* Sección 3: Método de Pago */}
                    <div id="metodo" className="mb-6 rounded-lg bg-[#252525] p-6">
                        <h2 className="mb-6 text-xl font-semibold text-secondary">Método de Pago</h2>
                        <div className="space-y-4">
                            <p className="text-gray-400">Sección en desarrollo</p>
                        </div>
                    </div>

                    {/* Botón de Continuar */}
                    <button
                        onClick={() => navigate('/')}
                        className="w-full rounded-lg bg-secondary py-3 text-center font-semibold text-white transition-colors hover:bg-secondary/90"
                    >
                        Continuar Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComprasRealizadaInfo;
