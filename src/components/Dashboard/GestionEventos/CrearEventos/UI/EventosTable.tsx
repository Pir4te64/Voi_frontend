import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useDeleteEvento } from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/store/useDeleteEvento";
import ModalConfirmacionEliminar from "./ModalConfirmacionEliminar";

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

interface EventosTableProps {
    events: Evento[];
    onNavigateBack: () => void;
    onCreateEvent: () => void;
    onEventDeleted: () => void;
}

const EventosTable: React.FC<EventosTableProps> = ({
    events,
    onCreateEvent,
    onEventDeleted,
}) => {
    const { eventToDelete, setEventToDelete, deleteEvent } = useDeleteEvento();



    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-secondary">Eventos</h1>
                    <button
                        onClick={onCreateEvent}
                        className="flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <FaPlus />
                        Crear Evento
                    </button>
                </div>
            </div>

            {/* Lista de eventos */}
            <div className="overflow-x-auto rounded-lg bg-black/40">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black text-gray-400">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Evento</th>
                            <th className="px-4 py-3 font-semibold">Fecha</th>
                            <th className="px-4 py-3 font-semibold">Locación</th>
                            <th className="px-4 py-3 font-semibold">Categoría</th>
                            <th className="px-4 py-3 text-center font-semibold">Estado</th>
                            <th className="px-4 py-3 text-center font-semibold">Revendedores</th>
                            <th className="px-4 py-3 text-end font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-gray-500">
                                    No hay eventos disponibles
                                </td>
                            </tr>
                        )}

                        {events.map((event) => (
                            <tr
                                key={event.id}
                                className="border-t border-gray-700 hover:bg-black/30"
                            >
                                <td className="px-4 py-3">{event.nombre}</td>
                                <td className="px-4 py-3">
                                    {format(new Date(event.fechaInicio), "PPP", { locale: es })}
                                </td>
                                <td className="px-4 py-3">
                                    {event.address.street}, {event.address.city}
                                </td>
                                <td className="px-4 py-3">{event.categoriaNombre}</td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm ${event.estado === "ACTIVO"
                                            ? "bg-green-500/20 text-green-500"
                                            : "bg-red-500/20 text-red-500"
                                            }`}
                                    >
                                        {event.estado}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-gray-400">-</span>
                                </td>
                                <td className="px-4 py-3 text-end">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setEventToDelete(event)}
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

            {/* Modal de confirmación */}
            <ModalConfirmacionEliminar
                eventToDelete={eventToDelete}
                setEventToDelete={setEventToDelete}
                deleteEvent={deleteEvent}
                onEventDeleted={onEventDeleted}
            />
        </div>
    );
};

export default EventosTable; 