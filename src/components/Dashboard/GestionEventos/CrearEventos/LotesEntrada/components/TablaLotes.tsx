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
            <div className="rounded-lg bg-back p-6">
                <h2 className="mb-6 text-xl font-semibold text-white">
                    Lotes Agregados al Evento
                </h2>

                {loadingLotes ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="rounded-md bg-[#1C1C1E] text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">Nombre del Lote</th>
                                    <th className="px-4 py-3">Precio</th>
                                    <th className="px-4 py-3">Válido hasta</th>
                                    <th className="px-4 py-3">Monto Comision</th>
                                    <th className="px-4 py-3">Estado</th>
                                    <th className="px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lotes.map((lote) => (
                                    <tr key={lote.id} className="border-t border-gray-700">
                                        <td className="px-4 py-3 text-white">{lote.nombre}</td>
                                        <td className="px-4 py-3 text-white">
                                            {formatCurrency(lote.precio)}
                                        </td>
                                        <td className="px-4 py-3 text-white">
                                            {formatDate(lote.fechaValidez)}
                                        </td>
                                        <td className="px-4 py-3 text-white">
                                            {lote.tipoComision === "MONTO_FIJO"
                                                ? formatCurrency(lote.montoComision)
                                                : `${lote.montoComision}%`}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={lote.estado}
                                                onChange={(e) => onChangeEstado(lote.id, e.target.value)}
                                                className={`rounded-md border-none px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${lote.estado === "ACTIVO"
                                                    ? "bg-green-500/20 text-green-500"
                                                    : lote.estado === "PAUSADO"
                                                        ? "bg-yellow-500/20 text-yellow-500"
                                                        : "bg-red-500/20 text-red-500"
                                                    }`}
                                            >
                                                <option value="ACTIVO" className="bg-gray-800 text-green-500">
                                                    ACTIVO
                                                </option>
                                                <option value="PAUSADO" className="bg-gray-800 text-yellow-500">
                                                    PAUSADO
                                                </option>
                                                <option value="CANCELADO" className="bg-gray-800 text-red-500">
                                                    CANCELADO
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onEdit(lote)}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-back p-6">
                        <h3 className="mb-4 text-xl font-semibold text-white">
                            Confirmar Eliminación
                        </h3>
                        <p className="mb-6 text-gray-400">
                            ¿Estás seguro de que deseas eliminar el lote "{loteToDelete.nombre}"?
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => onSetLoteToDelete(null)}
                                className="rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => onDelete(eventId, loteToDelete.id)}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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