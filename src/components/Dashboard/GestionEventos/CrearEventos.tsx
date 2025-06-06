import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import TicketLotsForm from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";
import { FiChevronLeft } from "react-icons/fi";
import { useCrearEventoForm } from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/store/useCrearEventoForm";
import EventosTable from "@/components/Dashboard/GestionEventos/CrearEventos/UI/EventosTable";

const CrearEventos: React.FC = () => {
  const navigate = useNavigate();
  const { events, fetchEvents } = useEventsStore();
  const [isCreating, setIsCreating] = useState(false);
  const {
    resetKey,
    sliderImage,
    setSliderImage,
    eventImages,
    setEventImages,
    formik,
    categories,
  } = useCrearEventoForm();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  /* paso actual (0-based) */
  const [active, setActive] = useState(0);

  /* lista de pasos (label + contenido) */
  const steps = [
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
        />
      ),
    },
    {
      label: "Lotes de Entrada",
      content: (
        <TicketLotsForm
          onClose={() => { }}
          eventName={formik.values.name}
          eventId={0}
        />
      ),
    },
    {
      label: "Revendedores",
      content: <div className="p-6">Paso 3</div>,
    },
  ];

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

  const nextStep = () => {
    if (active === 0 && !isFormValid()) {
      formik.handleSubmit();
      return;
    }
    setActive((p) => Math.min(p + 1, steps.length - 1));
  };

  const prevStep = () => setActive((p) => Math.max(p - 1, 0));

  // Vista de lista de eventos
  if (!isCreating) {
    return (
      <EventosTable
        events={events}
        onNavigateBack={() => navigate(-1)}
        onCreateEvent={() => setIsCreating(true)}
      />
    );
  }

  // Vista de creación de evento
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => setIsCreating(false)}
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
  );
};

export default CrearEventos;
