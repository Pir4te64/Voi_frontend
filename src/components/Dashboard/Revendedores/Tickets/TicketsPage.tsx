import React, { useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    FaArrowLeft,
    FaEye,
    FaChevronLeft,
    FaChevronRight,
    FaSearch,
} from "react-icons/fa";
import { useTicketsStore } from "@/components/Dashboard/Revendedores/Tickets/store/useTicketsStore";
import { Evento } from "@/components/Dashboard/Revendedores/Tickets/types/tickets.types";
import { LoadingSpinner, ErrorState } from "@/components/Dashboard/ComponentesReutilizables";

const TicketsPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        loading,
        error,
        searchTerm,
        currentPage,
        loadEvents,
        setSearchTerm,
        setCurrentPage,
        getFilteredEvents,
        getCurrentEvents,
        getTotalPages,
    } = useTicketsStore();

    const filteredEvents = getFilteredEvents();
    const currentEvents = getCurrentEvents();
    const totalPages = getTotalPages();

    useEffect(() => {
        loadEvents();
    }, []);

    const handleViewTickets = (event: Evento) => {
        navigate(`/dashboard/ticket/${event.id}`, {
            state: { eventoData: event },
        });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <ErrorState
                error={error}
                onRetry={loadEvents}
            />
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mb-4 flex items-center text-white hover:text-secondary"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver
                    </button>
                    <h1 className="text-3xl font-bold text-secondary">Mis Tickets</h1>
                    <p className="mt-2 text-gray-400">
                        Gestiona los tickets de los eventos asignados
                    </p>
                </div>

                {/* Lista de eventos */}
                <div className="overflow-x-auto rounded-lg bg-[#1C1C1E]">
                    {/* Buscador */}
                    <div className="p-6">
                        <div className="relative max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaSearch className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar nombre del evento..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-600 bg-[#1C1C1E] py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                        </div>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#1C1C1E] text-gray-400">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-white">Nombre del Evento</th>
                                <th className="px-4 py-3 font-semibold text-white">Fecha</th>
                                <th className="px-4 py-3 font-semibold text-white">Categoría</th>
                                <th className="px-4 py-3 font-semibold text-white">Ubicación</th>
                                <th className="px-4 py-3 text-center font-semibold text-white">Estado</th>
                                <th className="px-4 py-3 text-center font-semibold text-white">Tickets Disponibles</th>
                                <th className="px-4 py-3 text-end font-semibold text-white">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEvents.length === 0 && filteredEvents.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-6 text-center text-gray-500">
                                        {searchTerm.trim()
                                            ? `No se encontraron eventos que coincidan con "${searchTerm}"`
                                            : "No hay eventos asignados para gestionar tickets"}
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
                                        {format(new Date(event.fechaInicio), "PPP", { locale: es })}
                                    </td>
                                    <td className="px-4 py-3 text-white">
                                        {event.categoriaNombre}
                                    </td>
                                    <td className="px-4 py-3 text-white">
                                        {event.address.street}, {event.address.city}
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
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-white">
                                            {event.lotes?.reduce((total: number, lote: any) => total + (lote.ticketsDisponibles || 0), 0) || 0}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleViewTickets(event)}
                                                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                                                title="Ver tickets"
                                            >
                                                Ver tickets
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
        </div>
    );
};

export default TicketsPage; 