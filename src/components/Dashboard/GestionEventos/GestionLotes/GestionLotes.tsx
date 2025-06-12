import React, { useState, useEffect, useMemo } from "react";
import {
  FaArrowLeft,
  FaPencilAlt,
  FaRegTrashAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import { api_url } from "@/api/api";
import CrearLoteUI from "@/components/Dashboard/GestionEventos/GestionLotes/CrearLote/CrearLoteUI";
import EditarLoteUI from "@/components/Dashboard/GestionEventos/GestionLotes/EditarLote/EditarLoteUI";

interface Evento {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  categoriaNombre: string;
  address: {
    street: string | null;
    city: string;
  };
  estado: string;
}

interface Lote {
  id: number;
  nombre: string;
  precio: number;
  fechaValidez: string;
  tipoComision: string;
  montoComision: number;
  estado: string;
  cantidadTickets: number;
  ticketsDisponibles: number;
  tickets: any[];
}

const GestionLotes: React.FC = () => {
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loadingLotes, setLoadingLotes] = useState(false);
  const [currentView, setCurrentView] = useState<
    "events" | "lotes" | "crear" | "editar"
  >("events");
  const [loteToDelete, setLoteToDelete] = useState<Lote | null>(null);
  const [loteToEdit, setLoteToEdit] = useState<Lote | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(api_url.get_eventos_productora, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken
            }`,
        },
      });
      setEvents(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al cargar los eventos");
    } finally {
      setLoading(false);
    }
  };

  const loadLotes = async (eventId: number) => {
    try {
      setLoadingLotes(true);
      const response = await axios.get(api_url.get_lotes_evento(eventId), {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken
            }`,
        },
      });
      setLotes(response.data);
    } catch (error: any) {
      console.error("Error al cargar lotes:", error);
      setLotes([]);
    } finally {
      setLoadingLotes(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEventSelect = (event: Evento) => {
    setSelectedEvent(event);
    setCurrentView("lotes");
    loadLotes(event.id);
  };

  const handleBackToEvents = () => {
    setCurrentView("events");
    setSelectedEvent(null);
    setLotes([]);
  };

  const handleCreateLote = () => {
    setCurrentView("crear");
  };

  const handleBackToLotes = () => {
    setCurrentView("lotes");
  };

  const handleLoteCreated = () => {
    // Recargar lotes después de crear uno nuevo
    if (selectedEvent) {
      loadLotes(selectedEvent.id);
      setCurrentView("lotes");
    }
  };

  const handleEditLote = (lote: Lote) => {
    console.log("Editar lote:", lote);
    setLoteToEdit(lote);
    setCurrentView("editar");
  };

  const handleLoteUpdated = () => {
    // Recargar lotes después de actualizar uno
    if (selectedEvent) {
      loadLotes(selectedEvent.id);
      setCurrentView("lotes");
      setLoteToEdit(null);
    }
  };

  const deleteLote = async (loteId: number) => {
    if (!selectedEvent) return;

    try {
      await axios.delete(api_url.eliminar_lote(selectedEvent.id, loteId), {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken
            }`,
        },
      });

      // Recargar la lista de lotes
      loadLotes(selectedEvent.id);
      setLoteToDelete(null);

      // Opcional: mostrar notificación de éxito
      console.log("Lote eliminado correctamente");
    } catch (error: any) {
      console.error("Error al eliminar lote:", error);
      setLoteToDelete(null);
    }
  };

  const cambiarEstadoLote = async (loteId: number, nuevoEstado: string) => {
    if (!selectedEvent) return;

    try {
      let endpoint: string;

      switch (nuevoEstado) {
        case "ACTIVO":
          endpoint = api_url.activar_lote(loteId);
          break;
        case "PAUSADO":
          endpoint = api_url.pausar_lote(loteId);
          break;
        case "CANCELADO":
          endpoint = api_url.cancelar_lote(loteId);
          break;
        default:
          console.error("Estado no válido:", nuevoEstado);
          return;
      }

      await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken
              }`,
          },
        }
      );

      // Recargar la lista de lotes
      loadLotes(selectedEvent.id);
      console.log(`Estado del lote cambiado a: ${nuevoEstado}`);
    } catch (error: any) {
      console.error("Error al cambiar estado del lote:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  // Filtrar eventos basado en el término de búsqueda
  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim()) return events;
    return events.filter((event) =>
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
    <div className="min-h-screen bg-primary">
      {currentView === "events" && (
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
      )}

      {currentView === "lotes" && selectedEvent && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <button
              onClick={handleBackToEvents}
              className="mb-4 flex items-center text-white hover:text-secondary"
            >
              <FaArrowLeft className="mr-2" />
              Volver a Gestión
            </button>
            <h1 className="text-3xl font-bold text-white">
              Lotes de {selectedEvent.nombre}
            </h1>
            <p className="mt-2 text-gray-400">
              Gestiona los lotes de entrada para este evento
            </p>
          </div>

          <div className="rounded-lg bg-black/40 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Lotes de Entrada
              </h2>
              <button
                onClick={handleCreateLote}
                className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
              >
                Crear Nuevo Lote
              </button>
            </div>

            {loadingLotes ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg bg-black/40">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">
                        Nombre del Lote
                      </th>
                      <th className="px-4 py-3 font-semibold">Precio</th>
                      <th className="px-4 py-3 font-semibold">Total Tickets</th>
                      <th className="px-4 py-3 font-semibold">Vendidos</th>
                      <th className="px-4 py-3 font-semibold">Disponibles</th>
                      <th className="px-4 py-3 font-semibold">Comisión</th>
                      <th className="px-4 py-3 font-semibold">Validez</th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-end font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotes.length === 0 && (
                      <tr>
                        <td
                          colSpan={9}
                          className="p-6 text-center text-gray-500"
                        >
                          No hay lotes configurados para este evento
                        </td>
                      </tr>
                    )}

                    {lotes.map((lote) => (
                      <tr
                        key={lote.id}
                        className="border-t border-gray-700 hover:bg-black/30"
                      >
                        <td className="px-4 py-3">{lote.nombre}</td>
                        <td className="px-4 py-3">
                          {formatCurrency(lote.precio)}
                        </td>
                        <td className="px-4 py-3">{lote.cantidadTickets}</td>
                        <td className="px-4 py-3">
                          {lote.cantidadTickets - lote.ticketsDisponibles}
                        </td>
                        <td className="px-4 py-3">{lote.ticketsDisponibles}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            <div>{lote.tipoComision}</div>
                            <div className="text-gray-400">
                              {formatCurrency(lote.montoComision)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            {formatDate(lote.fechaValidez)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <select
                            value={lote.estado}
                            onChange={(e) =>
                              cambiarEstadoLote(lote.id, e.target.value)
                            }
                            className={`rounded-md border-none px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${lote.estado === "ACTIVO"
                                ? "bg-green-500/20 text-green-500"
                                : lote.estado === "PAUSADO"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-red-500/20 text-red-500"
                              }`}
                          >
                            <option
                              value="ACTIVO"
                              className="bg-gray-800 text-green-500"
                            >
                              ACTIVO
                            </option>
                            <option
                              value="PAUSADO"
                              className="bg-gray-800 text-yellow-500"
                            >
                              PAUSADO
                            </option>
                            <option
                              value="CANCELADO"
                              className="bg-gray-800 text-red-500"
                            >
                              CANCELADO
                            </option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-end">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditLote(lote)}
                              className="rounded px-4 py-2 text-sm text-white hover:bg-red-500"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => setLoteToDelete(lote)}
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
            )}
          </div>
        </div>
      )}

      {currentView === "crear" && selectedEvent && (
        <CrearLoteUI
          eventId={selectedEvent.id}
          eventName={selectedEvent.nombre}
          onBack={handleBackToLotes}
          onLoteCreated={handleLoteCreated}
        />
      )}

      {currentView === "editar" && selectedEvent && loteToEdit && (
        <EditarLoteUI
          eventId={selectedEvent.id}
          eventName={selectedEvent.nombre}
          lote={loteToEdit}
          onBack={handleBackToLotes}
          onLoteUpdated={handleLoteUpdated}
        />
      )}

      {/* Modal de confirmación para eliminar lote */}
      {loteToDelete && (
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
      )}
    </div>
  );
};

export default GestionLotes;
