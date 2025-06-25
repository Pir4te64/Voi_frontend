import React from "react";
import { FaArrowLeft, FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
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
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBackToEvents}
                        className="mb-4 flex items-center text-white hover:text-secondary"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver a Gestión
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-secondary">
                                Lotes de {selectedEvent.nombre}
                            </h1>
                            <p className="mt-2 text-gray-400">
                                Gestiona los lotes de entrada para este evento
                            </p>
                        </div>
                        <button
                            onClick={handleCreateLote}
                            className="flex items-center rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                        >
                            <FaPlus className="mr-2" /> Crear Lote
                        </button>
                    </div>
                </div>

                {/* Lista de lotes */}
                <div className="overflow-x-auto rounded-lg bg-[#1C1C1E]">
                    {loadingLotes ? (
                        <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1C1C1E] text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-white">
                                        Nombre del Lote
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-white">Precio</th>
                                    <th className="px-4 py-3 font-semibold text-white">Total Tickets</th>
                                    <th className="px-4 py-3 font-semibold text-white">Vendidos</th>
                                    <th className="px-4 py-3 font-semibold text-white">Disponibles</th>
                                    <th className="px-4 py-3 font-semibold text-white">Comisión</th>
                                    <th className="px-4 py-3 font-semibold text-white">Validez</th>
                                    <th className="px-4 py-3 text-center font-semibold text-white">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 text-end font-semibold text-white">
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
                                        <td className="px-4 py-3 text-white">{lote.nombre}</td>
                                        <td className="px-4 py-3 text-white">
                                            {formatCurrency(lote.precio)}
                                        </td>
                                        <td className="px-4 py-3 text-white">{lote.cantidadTickets}</td>
                                        <td className="px-4 py-3 text-white">
                                            {lote.cantidadTickets - lote.ticketsDisponibles}
                                        </td>
                                        <td className="px-4 py-3 text-white">{lote.ticketsDisponibles}</td>
                                        <td className="px-4 py-3 text-white">
                                            <div className="text-sm">
                                                <div>{lote.tipoComision}</div>
                                                <div className="text-gray-400">
                                                    {formatCurrency(lote.montoComision)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-white">
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
                                                    ? "bg-green-500 text-white"
                                                    : lote.estado === "PAUSADO"
                                                        ? "bg-yellow-500 text-white"
                                                        : lote.estado === "AGOTADO"
                                                            ? "bg-purple-500 text-white"
                                                            : "bg-red-500 text-white"
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
                                                <option
                                                    value="AGOTADO"
                                                    className="bg-gray-800 text-purple-500"
                                                >
                                                    AGOTADO
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditLote(lote)}
                                                    className="rounded p-2 text-white hover:bg-secondary/80"
                                                    title="Editar lote"
                                                >
                                                    <FaPencilAlt className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setLoteToDelete(lote)}
                                                    className="rounded p-2 text-white hover:bg-red-500/80"
                                                    title="Eliminar lote"
                                                >
                                                    <FaRegTrashAlt className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LotesUI; 