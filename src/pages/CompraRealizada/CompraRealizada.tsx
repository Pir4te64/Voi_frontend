import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const CompraRealizada = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ordenCompra = location.state?.ordenCompra as OrdenCompra;

    if (!ordenCompra) {
        navigate('/');
        return null;
    }

    const fechaFormateada = format(new Date(ordenCompra.fechaCreacion), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });

    return (
        <div className="min-h-screen bg-primary p-4 text-white">
            <div className="mx-auto max-w-2xl rounded-lg bg-[#252525] p-6 shadow-xl">
                <h1 className="mb-6 text-center text-2xl font-bold text-secondary">Detalles de tu Compra</h1>

                <div className="space-y-4">
                    <div className="flex justify-between rounded-lg bg-[#1a1a1a] p-4">
                        <span className="text-gray-400">Número de Orden:</span>
                        <span className="font-semibold">#{ordenCompra.id}</span>
                    </div>

                    <div className="flex justify-between rounded-lg bg-[#1a1a1a] p-4">
                        <span className="text-gray-400">Fecha de Compra:</span>
                        <span className="font-semibold">{fechaFormateada}</span>
                    </div>

                    <div className="flex justify-between rounded-lg bg-[#1a1a1a] p-4">
                        <span className="text-gray-400">Estado:</span>
                        <span className="font-semibold text-secondary">{ordenCompra.estado}</span>
                    </div>

                    <div className="flex justify-between rounded-lg bg-[#1a1a1a] p-4">
                        <span className="text-gray-400">Cantidad de Tickets:</span>
                        <span className="font-semibold">{ordenCompra.cantidadTickets}</span>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-secondary">Tickets:</h2>
                        {ordenCompra.tickets.map((ticket) => (
                            <div key={ticket.id} className="flex justify-between rounded-lg bg-[#1a1a1a] p-4">
                                <span className="text-gray-400">Ticket #{ticket.ticketId}</span>
                                <span className="font-semibold">${ticket.precioUnitario.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between rounded-lg bg-secondary p-4 text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${ordenCompra.montoTotal.toLocaleString()}</span>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="rounded-lg border border-secondary px-6 py-2 text-secondary transition-colors hover:bg-secondary hover:text-white"
                        >
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompraRealizada; 