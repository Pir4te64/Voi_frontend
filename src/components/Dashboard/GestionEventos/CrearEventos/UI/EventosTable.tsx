import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaPlus, FaRegTrashAlt, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtrar eventos basado en el término de búsqueda
    const filteredEvents = useMemo(() => {
        if (!searchTerm.trim()) return events;
        return events.filter(event =>
            event.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    // Calcular paginación
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    // Resetear página cuando cambie la búsqueda
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm]);



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

                {/* Buscador */}
                <div className="mt-6">
                    <div className="relative max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por evento"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-600 bg-black/40 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </div>
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
                        {currentEvents.length === 0 && filteredEvents.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-gray-500">
                                    {searchTerm.trim() ? `No se encontraron eventos que coincidan con "${searchTerm}"` : "No hay eventos disponibles"}
                                </td>
                            </tr>
                        )}

                        {currentEvents.map((event) => (
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

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    {/* Flecha izquierda */}
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-16 h-10 rounded-lg border transition ${currentPage === 1
                            ? "border-gray-600 text-gray-600 cursor-not-allowed"
                            : "border-gray-600 text-white hover:bg-secondary hover:border-secondary"
                            }`}
                    >
                        <FaChevronLeft className="h-3 w-3" />
                    </button>

                    {/* Números de página centrados */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`flex items-center justify-center w-10 h-10 rounded-lg transition ${currentPage === pageNum
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    {/* Flecha derecha */}
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-16 h-10 rounded-lg border transition ${currentPage === totalPages
                            ? "border-gray-600 text-gray-600 cursor-not-allowed"
                            : "border-gray-600 text-white hover:bg-secondary hover:border-secondary"
                            }`}
                    >
                        <FaChevronRight className="h-3 w-3" />
                    </button>
                </div>
            )}

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