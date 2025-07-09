import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { api_url } from "@/api/api";
import { toast } from "react-toastify";
import CrearLoteUI from "@/components/Dashboard/GestionLotes/CrearLote/CrearLoteUI";
import EditarLoteUI from "@/components/Dashboard/GestionLotes/EditarLote/EditarLoteUI";
import EventosUI from "@/components/Dashboard/GestionLotes/UI/EventosUI";
import LotesUI from "@/components/Dashboard/GestionLotes/UI/LotesUI";
import DeleteLoteModal from "@/components/Dashboard/GestionLotes/UI/DeleteLoteModal";
import { Evento, Lote } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";
import { formatFechaLarga } from "@/components/Dashboard/Admin/Eventos/utils/dateUtils";

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
    if (!lote.id) {
      toast.error("Error: El lote no tiene un ID válido");
      return;
    }
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
        case "AGOTADO":
          endpoint = api_url.sold_out_lote(loteId);
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
      toast.error(
        error.response?.data?.error?.description?.[0] || "Error al cambiar el estado del lote",
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  const formatDate = (dateString: string) => {
    return formatFechaLarga(dateString);
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
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-secondary sm:h-32 sm:w-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="text-center text-red-500">
          <p className="text-lg font-bold sm:text-xl">{error}</p>
          <button
            onClick={loadEvents}
            className="mt-4 rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-secondary/80 sm:text-base"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentView === "events" && (
        <EventosUI
          events={events}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentEvents={currentEvents}
          filteredEvents={filteredEvents}
          handleEventSelect={handleEventSelect}
          formatDate={formatDate}
        />
      )}

      {currentView === "lotes" && selectedEvent && (
        <LotesUI
          selectedEvent={selectedEvent}
          lotes={lotes}
          loadingLotes={loadingLotes}
          handleBackToEvents={handleBackToEvents}
          handleCreateLote={handleCreateLote}
          handleEditLote={handleEditLote}
          setLoteToDelete={setLoteToDelete}
          cambiarEstadoLote={cambiarEstadoLote}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
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

      <DeleteLoteModal
        loteToDelete={loteToDelete}
        setLoteToDelete={setLoteToDelete}
        deleteLote={deleteLote}
      />
    </div>
  );
};

export default GestionLotes;
