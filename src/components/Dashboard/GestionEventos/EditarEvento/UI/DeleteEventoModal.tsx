import React from "react";
import { Evento } from "@/components/Dashboard/GestionEventos/EditarEvento/store/interfaces";

interface DeleteEventoModalProps {
    eventoToDelete: Evento | null;
    setEventoToDelete: (evento: Evento | null) => void;
    onDelete: (eventoId: number) => void;
}

const DeleteEventoModal: React.FC<DeleteEventoModalProps> = ({
    eventoToDelete,
    setEventoToDelete,
    onDelete,
}) => {
    if (!eventoToDelete) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-primary p-4 sm:p-6">
                <h2 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">Confirmar Eliminación</h2>
                <p className="mb-4 text-sm text-gray-300 sm:mb-6 sm:text-base">
                    ¿Estás seguro que deseas eliminar el evento "{eventoToDelete.nombre}"?
                    Esta acción no se puede deshacer.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
                    <button
                        onClick={() => setEventoToDelete(null)}
                        className="rounded-lg border border-gray-600 px-3 py-2 text-sm text-white transition hover:bg-gray-700 sm:px-4 sm:text-base"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onDelete(eventoToDelete.id);
                            setEventoToDelete(null);
                        }}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600 sm:px-4 sm:text-base"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEventoModal; 