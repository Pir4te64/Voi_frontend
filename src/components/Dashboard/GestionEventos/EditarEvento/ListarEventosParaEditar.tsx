import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  FaArrowLeft,
  FaPencilAlt,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import { useListarEventosStore } from "@/components/Dashboard/GestionEventos/EditarEvento/store/useListarEventosStore";
import { Evento } from "@/components/Dashboard/GestionEventos/EditarEvento/store/interfaces";
import DeleteEventoModal from "@/components/Dashboard/GestionEventos/EditarEvento/UI/DeleteEventoModal";

const ListarEventosParaEditar: React.FC = () => {
  const navigate = useNavigate();
  const [eventoToDelete, setEventoToDelete] = useState<Evento | null>(null);
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
    deleteEvent,
  } = useListarEventosStore();

  const filteredEvents = getFilteredEvents();
  const currentEvents = getCurrentEvents();
  const totalPages = getTotalPages();

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEditEvent = (event: Evento) => {
    navigate(`/dashboard/editarevento/${event.id}`, {
      state: { eventoData: event },
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl font-bold">{error}</p>
          <button
            onClick={loadEvents}
            className="mt-4 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-3 flex items-center text-white hover:text-secondary sm:mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Volver
          </button>
          <h1 className="text-2xl font-bold text-secondary sm:text-3xl">Editar Eventos</h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Selecciona un evento para editarlo
          </p>
        </div>

        {/* Lista de eventos */}
        <div className="overflow-x-auto rounded-lg bg-[#1C1C1E]">
          {/* Buscador */}
          <div className="p-4 sm:p-6">
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

          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#1C1C1E] text-gray-400">
              <tr>
                <th className="px-2 py-2 font-semibold text-white sm:px-4 sm:py-3">Nombre del Evento</th>
                <th className="hidden px-2 py-2 font-semibold text-white sm:table-cell sm:px-4 sm:py-3">Fecha</th>
                <th className="hidden px-2 py-2 font-semibold text-white sm:px-4 sm:py-3 md:table-cell">Categoría</th>
                <th className="hidden px-2 py-2 font-semibold text-white sm:px-4 sm:py-3 lg:table-cell">Ubicación</th>
                <th className="px-2 py-2 text-center font-semibold text-white sm:px-4 sm:py-3">Estado</th>
                <th className="hidden px-2 py-2 text-center font-semibold text-white sm:px-4 sm:py-3 md:table-cell">RRPP</th>
                <th className="px-2 py-2 text-end font-semibold text-white sm:px-4 sm:py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length === 0 && filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-sm text-gray-500 sm:p-6 sm:text-base">
                    {searchTerm.trim()
                      ? `No se encontraron eventos que coincidan con "${searchTerm}"`
                      : "No hay eventos disponibles para editar"}
                  </td>
                </tr>
              )}

              {currentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-t border-gray-700 hover:bg-black/30"
                >
                  <td className="px-2 py-2 text-white sm:px-4 sm:py-3">{event.nombre}</td>
                  <td className="hidden px-2 py-2 text-white sm:table-cell sm:px-4 sm:py-3">
                    {format(new Date(event.fechaInicio), "PPP", { locale: es })}
                  </td>
                  <td className="hidden px-2 py-2 text-white sm:px-4 sm:py-3 md:table-cell">
                    {event.categoriaNombre}
                  </td>
                  <td className="hidden px-2 py-2 text-white sm:px-4 sm:py-3 lg:table-cell">
                    {event.address.street}, {event.address.city}
                  </td>
                  <td className="px-2 py-2 text-center sm:px-4 sm:py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm ${event.estado === "ACTIVO"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                    >
                      {event.estado}
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 text-center text-white sm:px-4 sm:py-3 md:table-cell">
                    <span className="text-white">
                      {event.revendedores ? event.revendedores.length : 0}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-end sm:px-4 sm:py-3">
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="rounded p-2 text-white hover:bg-secondary/80"
                        title="Editar evento"
                      >
                        <FaPencilAlt className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEventoToDelete(event)}
                        className="rounded p-2 text-white hover:bg-red-500/80"
                        title="Eliminar evento"
                      >
                        <FaTrashAlt className="h-4 w-4" />
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
          <div className="mt-4 flex flex-col items-center gap-4 sm:mt-6 sm:flex-row sm:justify-between">
            {/* Flecha izquierda */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`flex h-8 w-12 items-center justify-center rounded-lg border transition sm:h-10 sm:w-16 ${currentPage === 1
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
              className={`flex h-8 w-12 items-center justify-center rounded-lg border transition sm:h-10 sm:w-16 ${currentPage === totalPages
                ? "cursor-not-allowed border-gray-600 text-gray-600"
                : "border-gray-600 text-white hover:border-secondary hover:bg-secondary"
                }`}
            >
              <FaChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        <DeleteEventoModal
          eventoToDelete={eventoToDelete}
          setEventoToDelete={setEventoToDelete}
          onDelete={deleteEvent}
        />
      </div>
    </div>
  );
};

export default ListarEventosParaEditar;
