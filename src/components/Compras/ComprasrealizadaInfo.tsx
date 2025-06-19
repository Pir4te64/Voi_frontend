import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

    return (
        <div className="container mx-auto flex min-h-screen flex-col gap-6 p-4 lg:flex-row">
            {/* Navegación Lateral */}
            <div className="w-full lg:w-1/4">
                <div className="rounded-lg bg-[#252525] p-6">
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
            </div>

            {/* Contenido Principal */}
            <div className="w-full space-y-6 lg:w-3/4">
                {/* Sección 1: Resumen de Compra */}
                <div id="resumen" className="rounded-lg bg-[#252525] p-6">
                    <h2 className="mb-6 text-xl font-semibold text-secondary">Resumen de Compra</h2>
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
                    </div>
                </div>

                {/* Sección 2: Datos del Comprador */}
                <div id="datos" className="rounded-lg bg-[#252525] p-6">
                    <h2 className="mb-6 text-xl font-semibold text-secondary">Datos del Comprador</h2>
                    <div className="space-y-4">
                        {/* Aquí irán los campos del formulario de datos del comprador */}
                        <p className="text-gray-400">Sección en desarrollo</p>
                    </div>
                </div>

                {/* Sección 3: Método de Pago */}
                <div id="metodo" className="rounded-lg bg-[#252525] p-6">
                    <h2 className="mb-6 text-xl font-semibold text-secondary">Método de Pago</h2>
                    <div className="space-y-4">
                        {/* Aquí irán las opciones de pago */}
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
    );
};

export default ComprasRealizadaInfo;
