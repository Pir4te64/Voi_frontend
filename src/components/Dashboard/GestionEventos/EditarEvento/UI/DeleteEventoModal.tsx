import React from "react";
import { Evento } from "../store/interfaces";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-primary p-6">
                <h2 className="mb-4 text-xl font-bold text-white">Confirmar Eliminación</h2>
                <p className="mb-6 text-gray-300">
                    ¿Estás seguro que deseas eliminar el evento "{eventoToDelete.nombre}"?
                    Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setEventoToDelete(null)}
                        className="rounded-lg border border-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onDelete(eventoToDelete.id);
                            setEventoToDelete(null);
                        }}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEventoModal; 