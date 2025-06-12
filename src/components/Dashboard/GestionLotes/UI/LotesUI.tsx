import React from "react";
import { FaArrowLeft, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Evento, Lote } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";

interface LotesUIProps {
    selectedEvent: Evento;
    lotes: Lote[];
    loadingLotes: boolean;
    handleBackToEvents: () => void;
    handleCreateLote: () => void;
    handleEditLote: (lote: Lote) => void;
    setLoteToDelete: (lote: Lote | null) => void;
    cambiarEstadoLote: (loteId: number, nuevoEstado: string) => void;
    formatCurrency: (amount: number) => string;
    formatDate: (date: string) => string;
}

const LotesUI: React.FC<LotesUIProps> = ({
    selectedEvent,
    lotes,
    loadingLotes,
    handleBackToEvents,
    handleCreateLote,
    handleEditLote,
    setLoteToDelete,
    cambiarEstadoLote,
    formatCurrency,
    formatDate,
}) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <button
                    onClick={handleBackToEvents}
                    className="mb-4 flex items-center text-white hover:text-secondary"
                >
                    <FaArrowLeft className="mr-2" />
                    Volver a Gestión
                </button>
                <h1 className="text-3xl font-bold text-white">
                    Lotes de {selectedEvent.nombre}
                </h1>
                <p className="mt-2 text-gray-400">
                    Gestiona los lotes de entrada para este evento
                </p>
            </div>

            <div className="rounded-lg bg-black/40 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        Lotes de Entrada
                    </h2>
                    <button
                        onClick={handleCreateLote}
                        className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        Crear Nuevo Lote
                    </button>
                </div>

                {loadingLotes ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg bg-black/40">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-black text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">
                                        Nombre del Lote
                                    </th>
                                    <th className="px-4 py-3 font-semibold">Precio</th>
                                    <th className="px-4 py-3 font-semibold">Total Tickets</th>
                                    <th className="px-4 py-3 font-semibold">Vendidos</th>
                                    <th className="px-4 py-3 font-semibold">Disponibles</th>
                                    <th className="px-4 py-3 font-semibold">Comisión</th>
                                    <th className="px-4 py-3 font-semibold">Validez</th>
                                    <th className="px-4 py-3 text-center font-semibold">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 text-end font-semibold">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lotes.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="p-6 text-center text-gray-500"
                                        >
                                            No hay lotes configurados para este evento
                                        </td>
                                    </tr>
                                )}

                                {lotes.map((lote) => (
                                    <tr
                                        key={lote.id}
                                        className="border-t border-gray-700 hover:bg-black/30"
                                    >
                                        <td className="px-4 py-3">{lote.nombre}</td>
                                        <td className="px-4 py-3">
                                            {formatCurrency(lote.precio)}
                                        </td>
                                        <td className="px-4 py-3">{lote.cantidadTickets}</td>
                                        <td className="px-4 py-3">
                                            {lote.cantidadTickets - lote.ticketsDisponibles}
                                        </td>
                                        <td className="px-4 py-3">{lote.ticketsDisponibles}</td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm">
                                                <div>{lote.tipoComision}</div>
                                                <div className="text-gray-400">
                                                    {formatCurrency(lote.montoComision)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm">
                                                {formatDate(lote.fechaValidez)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <select
                                                value={lote.estado}
                                                onChange={(e) =>
                                                    cambiarEstadoLote(lote.id, e.target.value)
                                                }
                                                className={`rounded-md border-none px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${lote.estado === "ACTIVO"
                                                    ? "bg-green-500/20 text-green-500"
                                                    : lote.estado === "PAUSADO"
                                                        ? "bg-yellow-500/20 text-yellow-500"
                                                        : "bg-red-500/20 text-red-500"
                                                    }`}
                                            >
                                                <option
                                                    value="ACTIVO"
                                                    className="bg-gray-800 text-green-500"
                                                >
                                                    ACTIVO
                                                </option>
                                                <option
                                                    value="PAUSADO"
                                                    className="bg-gray-800 text-yellow-500"
                                                >
                                                    PAUSADO
                                                </option>
                                                <option
                                                    value="CANCELADO"
                                                    className="bg-gray-800 text-red-500"
                                                >
                                                    CANCELADO
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditLote(lote)}
                                                    className="rounded px-4 py-2 text-sm text-white hover:bg-red-500"
                                                >
                                                    <FaPencilAlt />
                                                </button>
                                                <button
                                                    onClick={() => setLoteToDelete(lote)}
                                                    className="rounded px-4 py-2 text-sm text-white hover:bg-red-500"
                                                >
                                                    <FaRegTrashAlt className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LotesUI; 