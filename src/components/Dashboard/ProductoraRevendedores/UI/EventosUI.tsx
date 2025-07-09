import React from "react";
import {
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
    FaUsers,
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
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-4 sm:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl font-bold text-secondary sm:text-3xl">Revendedores por Evento</h1>
                    <p className="mt-2 text-sm text-gray-400 sm:text-base">
                        Gestión de revendedores asignados a cada evento.
                    </p>
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por evento"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-600 bg-[#1C1C1E] py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </div>
                </div>

                {/* Lista de eventos */}
                <div className="rounded-lg bg-[#1C1C1E]">
                    {/* Vista de escritorio - Tabla */}
                    <div className="hidden overflow-x-auto lg:block">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1C1C1E] text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-white">Nombre del Evento</th>
                                    <th className="px-4 py-3 font-semibold text-white">Fecha</th>
                                    <th className="px-4 py-3 font-semibold text-white">Categoría</th>
                                    <th className="px-4 py-3 font-semibold text-white">Ubicación</th>
                                    <th className="px-4 py-3 text-center font-semibold text-white">Estado</th>
                                    <th className="px-4 py-3 text-end font-semibold text-white">Acciones</th>
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
                                        <td className="px-4 py-3 text-white">{event.nombre}</td>
                                        <td className="px-4 py-3 text-white">
                                            {formatDate(event.fechaInicio)}
                                        </td>
                                        <td className="px-4 py-3 text-white">{event.categoriaNombre}</td>
                                        <td className="px-4 py-3 text-white">
                                            {event.address.street ? `${event.address.street}, ` : ""}
                                            {event.address.city}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span
                                                className={`rounded px-3 py-1 text-sm ${event.estado === "ACTIVO"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                                    }`}
                                            >
                                                {event.estado}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEventSelect(event)}
                                                    className="rounded p-2 text-white hover:bg-secondary/80"
                                                    title="Ver revendedores"
                                                >
                                                    Ver Revendedores
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Vista móvil - Cards */}
                    <div className="lg:hidden">
                        {currentEvents.length === 0 && filteredEvents.length === 0 && (
                            <div className="p-6 text-center text-gray-500">
                                {searchTerm.trim()
                                    ? `No se encontraron eventos que coincidan con "${searchTerm}"`
                                    : "No hay eventos disponibles"}
                            </div>
                        )}

                        <div className="space-y-4 p-4">
                            {currentEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="rounded-lg border border-gray-700 bg-black/30 p-4 hover:bg-black/50"
                                >
                                    <div className="mb-3">
                                        <h3 className="text-lg font-semibold text-white">{event.nombre}</h3>
                                        <p className="text-sm text-gray-400">{event.categoriaNombre}</p>
                                    </div>

                                    <div className="mb-3 space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Fecha:</span>
                                            <span className="text-white">{formatDate(event.fechaInicio)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Ubicación:</span>
                                            <span className="text-right text-white">
                                                {event.address.street ? `${event.address.street}, ` : ""}
                                                {event.address.city}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Estado:</span>
                                            <span
                                                className={`rounded px-2 py-1 text-xs ${event.estado === "ACTIVO"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                                    }`}
                                            >
                                                {event.estado}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleEventSelect(event)}
                                        className="flex w-full items-center justify-center gap-2 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                                    >
                                        <FaUsers className="h-4 w-4" />
                                        Ver Revendedores
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        {/* Flecha izquierda */}
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`flex h-10 w-12 items-center justify-center rounded-lg border transition sm:w-16 ${currentPage === 1
                                ? "cursor-not-allowed border-gray-600 text-gray-600"
                                : "border-gray-600 text-white hover:border-secondary hover:bg-secondary"
                                }`}
                        >
                            <FaChevronLeft className="h-3 w-3" />
                        </button>

                        {/* Números de página centrados */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition sm:h-10 sm:w-10 sm:text-base ${currentPage === pageNum
                                            ? "bg-secondary text-white"
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
                            className={`flex h-10 w-12 items-center justify-center rounded-lg border transition sm:w-16 ${currentPage === totalPages
                                ? "cursor-not-allowed border-gray-600 text-gray-600"
                                : "border-gray-600 text-white hover:border-secondary hover:bg-secondary"
                                }`}
                        >
                            <FaChevronRight className="h-3 w-3" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventosUI; 