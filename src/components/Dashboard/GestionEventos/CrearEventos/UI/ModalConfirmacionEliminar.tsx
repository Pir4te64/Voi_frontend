import React from "react";

interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    categoriaNombre: string;
    address: {
        street: string | null;
        city: string;
    };
    estado: string;
}

interface ModalConfirmacionEliminarProps {
    eventToDelete: Evento | null;
    setEventToDelete: (event: Evento | null) => void;
    deleteEvent: (id: number, callback: () => void) => void;
    onEventDeleted: () => void;
}

const ModalConfirmacionEliminar: React.FC<ModalConfirmacionEliminarProps> = ({
    eventToDelete,
    setEventToDelete,
    deleteEvent,
    onEventDeleted,
}) => {
    if (!eventToDelete) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-primary p-6">
                <h3 className="mb-4 text-xl font-bold text-white">
                    ¿Eliminar evento?
                </h3>
                <p className="mb-6 text-gray-300">
                    ¿Estás seguro que deseas eliminar el evento "{eventToDelete.nombre}"? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setEventToDelete(null)}
                        className="rounded bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => deleteEvent(eventToDelete.id, onEventDeleted)}
                        className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacionEliminar; 