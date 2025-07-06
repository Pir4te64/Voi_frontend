import React from "react";
import { Lote } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";

interface DeleteLoteModalProps {
    loteToDelete: Lote | null;
    setLoteToDelete: (lote: Lote | null) => void;
    deleteLote: (loteId: number) => void;
}

const DeleteLoteModal: React.FC<DeleteLoteModalProps> = ({
    loteToDelete,
    setLoteToDelete,
    deleteLote,
}) => {
    if (!loteToDelete) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-primary p-4 sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
                    ¿Eliminar lote?
                </h3>
                <p className="mb-6 text-sm text-gray-300 sm:text-base">
                    ¿Estás seguro que deseas eliminar el lote "{loteToDelete.nombre}"?
                    Esta acción no se puede deshacer.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
                    <button
                        onClick={() => setLoteToDelete(null)}
                        className="rounded bg-gray-600 px-4 py-2 text-sm text-white transition hover:bg-gray-700 sm:text-base"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => deleteLote(loteToDelete.id)}
                        className="rounded bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 sm:text-base"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteLoteModal; 