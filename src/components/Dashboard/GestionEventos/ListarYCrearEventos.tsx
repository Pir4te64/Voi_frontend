import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import GestionarLoteUI from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";
import { useCrearEventoForm } from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/store/useCrearEventoForm";
import EventosTable from "@/components/Dashboard/GestionEventos/CrearEventos/UI/EventosTable";
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

const ListarYCrearEventos: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"list" | "create" | "tickets">("list");
  const [createdEventId, setCreatedEventId] = useState<number | null>(null);

  const handleEventCreated = (eventId: number) => {
    setCreatedEventId(eventId);
    setCurrentView("tickets");
  };

  const {
    resetKey,
    sliderImage,
    setSliderImage,
    eventImages,
    setEventImages,
    formik,
    categories,
  } = useCrearEventoForm(handleEventCreated);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(api_url.get_eventos, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
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

  const handleEventDeleted = () => {
    loadEvents();
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
      {currentView === "list" && (
        <EventosTable
          events={events}
          onNavigateBack={() => navigate("/dashboard")}
          onCreateEvent={() => setCurrentView("create")}
          onEventDeleted={handleEventDeleted}
        />
      )}
      {currentView === "create" && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <button
              onClick={() => setCurrentView("list")}
              className="mb-4 flex items-center text-white hover:text-secondary"
            >
              <FaArrowLeft className="mr-2" />
              Volver
            </button>
            <h1 className="text-3xl font-bold text-white">Crear Evento</h1>
          </div>
          <EventoForm
            resetKey={resetKey}
            sliderImage={sliderImage}
            setSliderImage={setSliderImage}
            eventImages={eventImages}
            setEventImages={setEventImages}
            formik={formik}
            categories={categories}
            onEventCreated={handleEventCreated}
          />
        </div>
      )}
      {currentView === "tickets" && createdEventId && (
        <GestionarLoteUI
          eventId={createdEventId}
          eventName={events.find(e => e.id === createdEventId)?.nombre || ""}
          onClose={() => setCurrentView("list")}
        />
      )}
    </div>
  );
};

export default ListarYCrearEventos;
