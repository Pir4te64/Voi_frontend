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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-primary p-6">
                <h3 className="mb-4 text-xl font-bold text-white">
                    ¿Eliminar lote?
                </h3>
                <p className="mb-6 text-gray-300">
                    ¿Estás seguro que deseas eliminar el lote "{loteToDelete.nombre}"?
                    Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setLoteToDelete(null)}
                        className="rounded bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => deleteLote(loteToDelete.id)}
                        className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteLoteModal; 