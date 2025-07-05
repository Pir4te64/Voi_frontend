import React from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Lote } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/types/lote.types";

interface TablaLotesProps {
    lotes: Lote[];
    loadingLotes: boolean;
    loteToDelete: Lote | null;
    eventId: number;
    onEdit: (lote: Lote) => void;
    onSetLoteToDelete: (lote: Lote | null) => void;
    onDelete: (eventId: number, loteId: number) => void;
    onChangeEstado: (loteId: number, nuevoEstado: string) => void;
    formatCurrency: (amount: number) => string;
    formatDate: (date: string) => string;
}

const TablaLotes: React.FC<TablaLotesProps> = ({
    lotes,
    loadingLotes,
    loteToDelete,
    eventId,
    onEdit,
    onSetLoteToDelete,
    onDelete,
    onChangeEstado,
    formatCurrency,
    formatDate,
}) => {
    return (
        <>
            {/* Lista de Lotes */}
            <div className="rounded-lg bg-back p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">
                    Lotes Agregados al Evento
                </h2>

                {loadingLotes ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="rounded-md bg-[#1C1C1E] text-gray-400">
                                <tr>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Nombre del Lote</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Precio</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Válido hasta</th>
                                    <th className="hidden md:table-cell px-2 py-2 sm:px-4 sm:py-3">Monto Comisión</th>
                                    <th className="hidden md:table-cell px-2 py-2 sm:px-4 sm:py-3">Porcentaje Comisión</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Estado</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lotes.map((lote) => (
                                    <tr key={lote.id} className="border-t border-gray-700">
                                        <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{lote.nombre}</td>
                                        <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{formatCurrency(lote.precio)}</td>
                                        <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{formatDate(lote.fechaValidez)}</td>
                                        <td className="hidden px-2 py-2 text-white md:table-cell sm:px-4 sm:py-3">{lote.montoComision > 0 ? formatCurrency(lote.montoComision) : "-"}</td>
                                        <td className="hidden px-2 py-2 text-white md:table-cell sm:px-4 sm:py-3">{lote.porcentajeComision > 0 ? `${lote.porcentajeComision}%` : "-"}</td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <select
                                                value={lote.estado}
                                                onChange={(e) => onChangeEstado(lote.id, e.target.value)}
                                                className={`rounded-md border-none px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${lote.estado === "ACTIVO"
                                                    ? "bg-green-500/20 text-green-500"
                                                    : lote.estado === "PAUSADO"
                                                        ? "bg-yellow-500/20 text-yellow-500"
                                                        : lote.estado === "AGOTADO"
                                                            ? "bg-purple-500/20 text-purple-500"
                                                            : "bg-red-500/20 text-red-500"
                                                    }`}
                                            >
                                                <option value="ACTIVO" className="bg-gray-800 text-green-500">ACTIVO</option>
                                                <option value="PAUSADO" className="bg-gray-800 text-yellow-500">PAUSADO</option>
                                                <option value="CANCELADO" className="bg-gray-800 text-red-500">CANCELADO</option>
                                                <option value="AGOTADO" className="bg-gray-800 text-purple-500">AGOTADO</option>
                                            </select>
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <div className="flex gap-1 sm:gap-2">
                                                <button
                                                    onClick={() => onEdit({
                                                        ...lote,
                                                        montoComision: lote.montoComision ?? 0,
                                                        porcentajeComision: lote.porcentajeComision ?? 0
                                                    })}
                                                    className="rounded p-1 text-gray-400 hover:text-secondary"
                                                >
                                                    <FaPencilAlt />
                                                </button>
                                                <button
                                                    onClick={() => onSetLoteToDelete(lote)}
                                                    className="rounded p-1 text-gray-400 hover:text-red-500"
                                                >
                                                    <FaRegTrashAlt />
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

            {/* Modal de confirmación de eliminación */}
            {loteToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-back p-4 sm:p-6">
                        <h3 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
                            Confirmar Eliminación
                        </h3>
                        <p className="mb-4 text-sm text-gray-400 sm:mb-6 sm:text-base">
                            ¿Estás seguro de que deseas eliminar el lote "{loteToDelete.nombre}"?
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
                            <button
                                onClick={() => onSetLoteToDelete(null)}
                                className="rounded-lg border border-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700 sm:px-4 sm:text-base"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => onDelete(eventId, loteToDelete.id)}
                                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 sm:px-4 sm:text-base"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TablaLotes;