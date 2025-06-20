import React from "react";
import {
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { Evento } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";

interface EventosUIProps {
    events: Evento[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    currentEvents: Evento[];
    filteredEvents: Evento[];
    handleEventSelect: (event: Evento) => void;
    formatDate: (date: string) => string;
}

const EventosUI: React.FC<EventosUIProps> = ({
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    currentEvents,
    filteredEvents,
    handleEventSelect,
    formatDate,
}) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Gestión de Lotes</h1>
                <p className="mt-2 text-gray-400">
                    Selecciona un evento para gestionar sus lotes de entrada
                </p>

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

            <div className="overflow-x-auto rounded-lg bg-black/40">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black text-gray-400">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Nombre del Evento</th>
                            <th className="px-4 py-3 font-semibold">Fecha</th>
                            <th className="px-4 py-3 font-semibold">Categoría</th>
                            <th className="px-4 py-3 font-semibold">Ubicación</th>
                            <th className="px-4 py-3 text-center font-semibold">
                                Estado
                            </th>
                            <th className="px-4 py-3 text-end font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.length === 0 && filteredEvents.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                    {searchTerm.trim()
                                        ? `No se encontraron eventos que coincidan con "${searchTerm}"`
                                        : "No hay eventos disponibles"}
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
                                    {formatDate(event.fechaInicio)}
                                </td>
                                <td className="px-4 py-3">{event.categoriaNombre}</td>
                                <td className="px-4 py-3">
                                    {event.address.street ? `${event.address.street}, ` : ""}
                                    {event.address.city}
                                </td>
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
                                <td className="px-4 py-3 text-end">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEventSelect(event)}
                                            className="flex items-center gap-1 rounded px-4 py-2 text-sm text-white hover:bg-secondary/80"
                                        >
                                            Ver Lotes
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
                        className={`flex h-10 w-16 items-center justify-center rounded-lg border transition ${currentPage === 1
                            ? "cursor-not-allowed border-gray-600 text-gray-600"
                            : "border-gray-600 text-white hover:border-secondary hover:bg-secondary"
                            }`}
                    >
                        <FaChevronLeft className="h-3 w-3" />
                    </button>

                    {/* Números de página centrados */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${currentPage === pageNum
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            )
                        )}
                    </div>

                    {/* Flecha derecha */}
                    <button
                        onClick={() =>
                            setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className={`flex h-10 w-16 items-center justify-center rounded-lg border transition ${currentPage === totalPages
                            ? "cursor-not-allowed border-gray-600 text-gray-600"
                            : "border-gray-600 text-white hover:border-secondary hover:bg-secondary"
                            }`}
                    >
                        <FaChevronRight className="h-3 w-3" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventosUI; 