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
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-4 sm:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={handleBackToEvents}
                        className="mb-4 flex items-center text-sm text-white hover:text-secondary sm:text-base"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver a Gestión
                    </button>
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-secondary sm:text-3xl">
                                Lotes de {selectedEvent.nombre}
                            </h1>
                            <p className="mt-2 text-sm text-gray-400 sm:text-base">
                                Gestiona los lotes de entrada para este evento
                            </p>
                        </div>
                        <button
                            onClick={handleCreateLote}
                            className="flex w-full items-center justify-center rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80 sm:w-auto"
                        >
                            <FaPlus className="mr-2" /> Crear Lote
                        </button>
                    </div>
                </div>

                {/* Lista de lotes */}
                <div className="rounded-lg bg-[#1C1C1E]">
                    {loadingLotes ? (
                        <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                        </div>
                    ) : (
                        <>
                            {/* Vista de escritorio - Tabla */}
                            <div className="hidden overflow-x-auto lg:block">
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
                            </div>

                            {/* Vista móvil - Cards */}
                            <div className="lg:hidden">
                                {lotes.length === 0 && (
                                    <div className="p-6 text-center text-gray-500">
                                        No hay lotes configurados para este evento
                                    </div>
                                )}

                                <div className="space-y-4 p-4">
                                    {lotes.map((lote) => (
                                        <div
                                            key={lote.id}
                                            className="rounded-lg border border-gray-700 bg-black/30 p-4 hover:bg-black/50"
                                        >
                                            <div className="mb-3">
                                                <h3 className="text-lg font-semibold text-white">{lote.nombre}</h3>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-secondary">
                                                        {formatCurrency(lote.precio)}
                                                    </span>
                                                    <select
                                                        value={lote.estado}
                                                        onChange={(e) =>
                                                            cambiarEstadoLote(lote.id, e.target.value)
                                                        }
                                                        className={`rounded-md border-none px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-secondary ${lote.estado === "ACTIVO"
                                                            ? "bg-green-500 text-white"
                                                            : lote.estado === "PAUSADO"
                                                                ? "bg-yellow-500 text-white"
                                                                : lote.estado === "AGOTADO"
                                                                    ? "bg-purple-500 text-white"
                                                                    : "bg-red-500 text-white"
                                                            }`}
                                                    >
                                                        <option value="ACTIVO" className="bg-gray-800 text-green-500">ACTIVO</option>
                                                        <option value="PAUSADO" className="bg-gray-800 text-yellow-500">PAUSADO</option>
                                                        <option value="CANCELADO" className="bg-gray-800 text-red-500">CANCELADO</option>
                                                        <option value="AGOTADO" className="bg-gray-800 text-purple-500">AGOTADO</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-4 space-y-2 text-sm">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-gray-400">Total Tickets:</span>
                                                        <div className="font-semibold text-white">{lote.cantidadTickets}</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Vendidos:</span>
                                                        <div className="font-semibold text-white">{lote.cantidadTickets - lote.ticketsDisponibles}</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Disponibles:</span>
                                                        <div className="font-semibold text-white">{lote.ticketsDisponibles}</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400">Comisión:</span>
                                                        <div className="font-semibold text-white">{formatCurrency(lote.montoComision)}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Válido hasta:</span>
                                                    <div className="font-semibold text-white">{formatDate(lote.fechaValidez)}</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditLote(lote)}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                                                >
                                                    <FaPencilAlt className="h-4 w-4" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => setLoteToDelete(lote)}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                                >
                                                    <FaRegTrashAlt className="h-4 w-4" />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LotesUI; 