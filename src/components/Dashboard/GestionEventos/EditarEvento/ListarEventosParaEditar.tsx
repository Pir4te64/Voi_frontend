import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  FaArrowLeft,
  FaPencilAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import { api_url } from "@/api/api";

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

const ListarEventosParaEditar: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(api_url.get_eventos_productora, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")!).accessToken
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

  useEffect(() => {
    loadEvents();
  }, []);

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

  const handleEditEvent = (event: Evento) => {
    console.log("Evento a editar:", event);
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
    <div className="min-h-screen bg-primary">
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
          <h1 className="text-3xl font-bold text-secondary">Editar Eventos</h1>
          <p className="mt-2 text-gray-400">
            Selecciona un evento para editarlo
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

        {/* Lista de eventos */}
        <div className="overflow-x-auto rounded-lg bg-black/40">
          <table className="w-full text-left text-sm">
            <thead className="bg-black text-gray-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Nombre del Evento</th>
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Categoría</th>
                <th className="px-4 py-3 font-semibold">Ubicación</th>
                <th className="px-4 py-3 text-center font-semibold">Estado</th>
                <th className="px-4 py-3 text-end font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length === 0 && filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
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
                      className={`rounded-full px-3 py-1 text-sm ${
                        event.estado === "ACTIVO"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {event.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="flex items-center gap-2 rounded px-4 py-2 text-sm text-white hover:bg-secondary/80"
                    >
                      <FaPencilAlt className="h-4 w-4" />
                    </button>
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
              className={`flex h-10 w-16 items-center justify-center rounded-lg border transition ${
                currentPage === 1
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
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                      currentPage === pageNum
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
              className={`flex h-10 w-16 items-center justify-center rounded-lg border transition ${
                currentPage === totalPages
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

export default ListarEventosParaEditar;
