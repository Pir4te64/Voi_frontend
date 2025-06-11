import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { FaArrowLeft } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import GestionarLoteUI from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";
import { useCrearEventoForm } from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/store/useCrearEventoForm";
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

const CrearEvento: React.FC = () => {
  //const navigate = useNavigate();
  const [events, setEvents] = useState<Evento[]>([]);
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
          eventName={events.find((e) => e.id === createdEventId)?.nombre || ""}
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
              {events.find((e) => e.id === createdEventId)?.nombre || ""}
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
      const response = await axios.get(api_url.get_eventos_productora, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")!).accessToken
          }`,
        },
      });
      setEvents(response.data);
    } catch (error: any) {
      console.error("Error al cargar eventos:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

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

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="ml-8 text-3xl font-bold text-white">Crear Evento</h1>
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
                  ${
                    active === idx
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
    </div>
  );
};

export default CrearEvento;
