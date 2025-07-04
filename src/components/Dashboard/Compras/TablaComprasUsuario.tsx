import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useComprasStore } from '@/components/Dashboard/Compras/store/useComprasStore';
import { estadoColors, TablaComprasUsuarioProps } from '@/components/Dashboard/Compras/store/types';
import QRModal from '@/components/Dashboard/Compras/components/QRModal';
import GananciasResumen from '@/components/Dashboard/Compras/GananciasResumen';

const TablaComprasUsuario: React.FC<TablaComprasUsuarioProps> = ({
    titulo = "Mis Compras",
    tipo = 'compras'
}) => {
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

    const safeTickets = Array.isArray(tickets) ? tickets : [];
    const currentPage = page + 1;

    // Modal QR
    const closeModal = () => setQrModal(null);

    return (
        <div className="container mx-auto bg-[#131315] px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold text-secondary">{titulo}</h1>
            {tipo === 'ventas' && <GananciasResumen visible={true} />}

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
                <div className="overflow-x-auto rounded-lg bg-[#1C1C1E] p-1">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#1C1C1E] text-gray-400">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Evento</th>
                                <th className="px-4 py-3 font-semibold">Estado</th>
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
                                    <td className="px-4 py-3">{ticket.fechaEvento}</td>
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
                    {/* Paginación con flechas y números */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between">
                            {/* Flecha izquierda */}
                            <button
                                onClick={() => setPage(Math.max(0, page - 1))}
                                disabled={currentPage === 1}
                                className={`flex items-center justify-center w-16 h-10 rounded-lg border transition ${currentPage === 1
                                    ? "border-gray-600 text-gray-600 cursor-not-allowed"
                                    : "border-gray-600 text-white hover:bg-secondary hover:border-secondary"
                                    }`}
                            >
                                <FaChevronLeft className="h-3 w-3" />
                            </button>

                            {/* Números de página centrados */}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum - 1)}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition ${currentPage === pageNum
                                            ? "text-white"
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
                                className={`flex items-center justify-center w-16 h-10 rounded-lg border transition ${currentPage === totalPages
                                    ? "border-gray-600 text-gray-600 cursor-not-allowed"
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