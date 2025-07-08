import React from 'react';
import { FaChevronLeft, FaChevronRight, FaQrcode } from 'react-icons/fa';
import { Ticket } from '@/components/Dashboard/Compras/store/types';
import { estadoColors } from '@/components/Dashboard/Compras/store/types';

interface TablaBodyProps {
    tickets: Ticket[];
    tipo: 'compras' | 'ventas';
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onQrClick: (qrCode: string | null) => void;
}

const TablaBody: React.FC<TablaBodyProps> = ({
    tickets,
    tipo,
    page,
    totalPages,
    onPageChange,
    onQrClick
}) => {
    const currentPage = page + 1;

    return (
        <div className="rounded-lg bg-[#1C1C1E] p-1">
            {/* Vista de escritorio - Tabla */}
            <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#1C1C1E] text-gray-400">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Evento</th>
                            <th className="px-4 py-3 font-semibold">Lote</th>
                            <th className="px-4 py-3 font-semibold">Estado</th>
                            <th className="px-4 py-3 font-semibold">Tipo de Ticket</th>
                            <th className="px-4 py-3 font-semibold">Fecha del evento</th>
                            <th className="px-4 py-3 font-semibold">Fecha de {tipo === 'ventas' ? 'venta' : 'compra'}</th>
                            <th className="px-4 py-3 font-semibold">QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="border-t border-gray-700 hover:bg-black/30">
                                <td className="px-4 py-3">{ticket.evento}</td>
                                <td className="px-4 py-3">{ticket.lote || 'N/A'}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${estadoColors[ticket.estado] || 'bg-gray-500/20 text-gray-400'}`}>{ticket.estado}</span>
                                </td>
                                <td className="px-4 py-3">
                                    {ticket.tipoTicket === 'VENTA_REVENDEDOR' ? 'RRPP' :
                                        ticket.tipoTicket === 'COMPRA_DIRECTA' ? 'Web' :
                                            ticket.tipoTicket || 'N/A'}
                                </td>
                                <td className="px-4 py-3">
                                    {ticket.fechaEvento ? new Date(ticket.fechaEvento).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : '-'}
                                </td>
                                <td className="px-4 py-3">{ticket.fechaCompra ? new Date(ticket.fechaCompra).toLocaleString() : '-'}</td>
                                <td className="px-4 py-3">
                                    {ticket.qrCode ? (
                                        <button
                                            className="focus:outline-none"
                                            onClick={() => onQrClick(ticket.qrCode || null)}
                                            title="Ver QR"
                                        >
                                            <img src={ticket.qrCode} alt="QR" className="inline-block h-12 w-12 rounded object-contain shadow transition hover:scale-110" />
                                        </button>
                                    ) : (
                                        <span className="text-gray-400">No disponible</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Vista móvil - Cards */}
            <div className="lg:hidden">
                <div className="space-y-4 p-4">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="rounded-lg border border-gray-700 bg-black/30 p-4 hover:bg-black/50"
                        >
                            <div className="mb-3">
                                <h3 className="text-lg font-semibold text-white">{ticket.evento}</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${estadoColors[ticket.estado] || 'bg-gray-500/20 text-gray-400'}`}>
                                        {ticket.estado}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {ticket.tipoTicket === 'VENTA_REVENDEDOR' ? 'RRPP' :
                                            ticket.tipoTicket === 'COMPRA_DIRECTA' ? 'Web' :
                                                ticket.tipoTicket || 'N/A'}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-sm text-gray-400">Lote: </span>
                                    <span className="text-sm text-white">{ticket.lote || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="mb-4 space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Fecha del evento:</span>
                                    <span className="text-right text-white">
                                        {ticket.fechaEvento ? new Date(ticket.fechaEvento).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : '-'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Fecha de {tipo === 'ventas' ? 'venta' : 'compra'}:</span>
                                    <span className="text-right text-white">
                                        {ticket.fechaCompra ? new Date(ticket.fechaCompra).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : '-'}
                                    </span>
                                </div>
                            </div>

                            {ticket.qrCode && (
                                <button
                                    onClick={() => onQrClick(ticket.qrCode || null)}
                                    className="flex w-full items-center justify-center gap-2 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                                    title="Ver QR"
                                >
                                    <FaQrcode className="h-4 w-4" />
                                    Ver QR
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    {/* Flecha izquierda */}
                    <button
                        onClick={() => onPageChange(Math.max(0, page - 1))}
                        disabled={currentPage === 1}
                        className={`flex h-10 w-12 items-center justify-center rounded-lg border transition sm:w-16 ${currentPage === 1
                            ? "cursor-not-allowed border-gray-600 text-gray-600"
                            : "border-gray-600 text-white hover:bg-secondary hover:border-secondary"
                            }`}
                    >
                        <FaChevronLeft className="h-3 w-3" />
                    </button>

                    {/* Números de página centrados */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum - 1)}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition sm:h-10 sm:w-10 sm:text-base ${currentPage === pageNum
                                    ? "bg-secondary text-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    {/* Flecha derecha */}
                    <button
                        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
                        disabled={currentPage === totalPages}
                        className={`flex h-10 w-12 items-center justify-center rounded-lg border transition sm:w-16 ${currentPage === totalPages
                            ? "cursor-not-allowed border-gray-600 text-gray-600"
                            : "border-gray-600 text-white hover:bg-secondary hover:border-secondary"
                            }`}
                    >
                        <FaChevronRight className="h-3 w-3" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TablaBody; 