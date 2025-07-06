import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch, FaQrcode } from 'react-icons/fa';
import { useComprasStore } from '@/components/Dashboard/Compras/store/useComprasStore';
import { estadoColors } from '@/components/Dashboard/Compras/store/types';
import QRModal from '@/components/Dashboard/Compras/components/QRModal';
import GananciasResumen from '@/components/Dashboard/Compras/GananciasResumen';

interface TablaComprasUsuarioProps {
    titulo?: string;
    tipo?: 'compras' | 'ventas';
}

const TablaComprasUsuario: React.FC<TablaComprasUsuarioProps> = ({ titulo, tipo = 'compras' }) => {
    const {
        tickets,
        loading,
        error,
        page,
        totalPages,
        qrModal,
        setTipo,
        setTitulo,
        setQrModal,
        setPage,
        fetchTickets
    } = useComprasStore();

    const [search, setSearch] = useState("");

    // Configurar el tipo y título cuando cambian las props
    useEffect(() => {
        setTipo(tipo);
        if (titulo) {
            setTitulo(titulo);
        }
    }, [tipo, titulo, setTipo, setTitulo]);

    useEffect(() => {
        fetchTickets(page);
    }, [page, fetchTickets]);

    // Filtrado local de tickets
    const filteredTickets = tickets.filter(ticket => {
        const searchLower = search.toLowerCase();
        return (
            ticket.evento?.toLowerCase().includes(searchLower) ||
            ticket.tipoTicket?.toLowerCase().includes(searchLower) ||
            ticket.estado?.toLowerCase().includes(searchLower)
        );
    });

    const safeTickets = Array.isArray(filteredTickets) ? filteredTickets : [];
    const currentPage = page + 1;

    // Modal QR
    const closeModal = () => setQrModal(null);

    return (
        <div className="container mx-auto bg-[#131315] px-4 py-4 sm:py-8">

            <h2 className="mb-4 text-xl font-bold sm:text-2xl" style={{ color: titulo ? 'white' : '#ff5c74' }}>
                {titulo || 'Mis Compras'}
            </h2>
            {tipo === 'ventas' && <GananciasResumen visible={true} />}

            <div className="relative mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Buscar por evento, tipo de ticket o estado..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full rounded-md bg-[#232326] px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                </div>
            ) : error ? (
                <div className="rounded-lg bg-red-500/10 p-8 text-center text-red-500">{error}</div>
            ) : safeTickets.length === 0 ? (
                <div className="rounded-lg bg-black/40 p-8 text-center text-gray-500">
                    {tipo === 'ventas' ? 'No tienes ventas registradas.' : 'No tienes compras registradas.'}
                </div>
            ) : (
                <div className="rounded-lg bg-[#1C1C1E] p-1">
                    {/* Vista de escritorio - Tabla */}
                    <div className="hidden overflow-x-auto lg:block">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1C1C1E] text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Evento</th>
                                    <th className="px-4 py-3 font-semibold">Estado</th>
                                    <th className="px-4 py-3 font-semibold">Tipo de Ticket</th>
                                    <th className="px-4 py-3 font-semibold">Fecha del evento</th>
                                    <th className="px-4 py-3 font-semibold">Fecha de {tipo === 'ventas' ? 'venta' : 'compra'}</th>
                                    <th className="px-4 py-3 font-semibold">QR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeTickets.map((ticket) => (
                                    <tr key={ticket.id} className="border-t border-gray-700 hover:bg-black/30">
                                        <td className="px-4 py-3">{ticket.evento}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${estadoColors[ticket.estado] || 'bg-gray-500/20 text-gray-400'}`}>{ticket.estado}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {ticket.tipoTicket === 'VENTA_REVENDEDOR' ? 'Revendedor' :
                                                ticket.tipoTicket === 'VENTA_WEB' ? 'Web' :
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
                                                    onClick={() => setQrModal(ticket.qrCode || null)}
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
                            {safeTickets.map((ticket) => (
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
                                                {ticket.tipoTicket === 'VENTA_REVENDEDOR' ? 'Revendedor' :
                                                    ticket.tipoTicket === 'VENTA_WEB' ? 'Web' :
                                                        ticket.tipoTicket || 'N/A'}
                                            </span>
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
                                            onClick={() => setQrModal(ticket.qrCode || null)}
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
                                onClick={() => setPage(Math.max(0, page - 1))}
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
                                        onClick={() => setPage(pageNum - 1)}
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
                                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
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
            )}

            {/* Modal QR */}
            {qrModal && (
                <QRModal qrCode={qrModal} onClose={closeModal} />
            )}
        </div>
    );
};

export default TablaComprasUsuario; 