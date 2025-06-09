import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
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
  const [currentView, setCurrentView] = useState<"list" | "create">("list");
  const [active, setActive] = useState(0);
  const [createdEventId, setCreatedEventId] = useState<number | null>(null);

  const prevStep = () => setActive((p) => Math.max(p - 1, 0));
  const nextStep = () => setActive((p) => Math.min(p + 1, 3 - 1)); // 3 es el número total de pasos

  const handleEventCreated = (eventId: number) => {
    setCreatedEventId(eventId);
    nextStep();
  };

  const {
    formik,
    categories,
    sliderImage,
    setSliderImage,
    eventImages,
    setEventImages,
    resetKey,
  } = useCrearEventoForm(handleEventCreated);

  const handleEdit = (eventId: number) => {
    // Implementar lógica de edición
  };

  const handleDelete = (eventId: number) => {
    // Implementar lógica de eliminación
  };

  const handleStatusChange = (eventId: number, newStatus: string) => {
    // Implementar lógica de cambio de estado
  };

  const createSteps = () => [
    {
      label: "Detalles del Evento",
      content: (
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
      ),
    },
    {
      label: "Lotes de Entrada",
      content: createdEventId ? (
        <GestionarLoteUI
          prevStep={prevStep}
          nextStep={nextStep}
          active={active}
          stepsLength={3}
          eventId={createdEventId}
          eventName={events.find(e => e.id === createdEventId)?.nombre || ""}
        />
      ) : null,
    },
    {
      label: "Revendedores",
      content: createdEventId ? (
        <div className="rounded-lg bg-black/80 p-8">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Gestionar Revendedores para:{" "}
            <span className="text-secondary">
              {events.find(e => e.id === createdEventId)?.nombre || ""}
            </span>
          </h2>
          <p className="mb-6 text-gray-400">
            ID del evento: <span className="font-mono">{createdEventId}</span>
          </p>
          <div className="rounded-lg bg-black/60 p-4">
            <p className="text-center text-gray-400">
              Aquí irá la gestión de revendedores para el evento
            </p>
          </div>
        </div>
      ) : null,
    },
  ];

  const steps = createSteps();

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(api_url.get_eventos_productora, {
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

  const isFormValid = () => {
    return (
      formik.isValid &&
      !formik.errors.name &&
      !formik.errors.description &&
      !formik.errors.startDate &&
      !formik.errors.endDate &&
      !formik.errors.latitud &&
      !formik.errors.longitud &&
      !formik.errors.category &&
      sliderImage !== null
    );
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

          <div className="rounded-lg bg-primary p-6 text-white">
            {/* ---------- Pestañas ---------- */}
            <div className="mb-8 flex gap-4 rounded-lg bg-black/40 p-2">
              {steps.map(({ label }, idx) => (
                <button
                  key={label}
                  onClick={() => {
                    if (idx > 0 && !isFormValid()) {
                      formik.handleSubmit();
                      return;
                    }
                    setActive(idx);
                  }}
                  className={`whitespace-nowrap rounded px-6 py-4 text-md font-semibold transition
                    ${active === idx
                      ? "bg-secondary text-black font-bold"
                      : "bg-black hover:bg-gray-800 font-normal"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ---------- Contenido ---------- */}
            <div className="grid grid-cols-1 gap-6">{steps[active].content}</div>

            {/* ---------- Navegación abajo ---------- */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={prevStep}
                disabled={active === 0}
                className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40"
              >
                <FiChevronLeft size={20} />
                Volver
              </button>

              <button
                onClick={nextStep}
                disabled={active === steps.length - 1}
                className="rounded-xl bg-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarYCrearEventos;
