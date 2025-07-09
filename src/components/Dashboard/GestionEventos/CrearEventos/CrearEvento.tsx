import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { FaArrowLeft } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import GestionarLoteUI from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";
import { useCrearEventoForm } from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/store/useCrearEventoForm";
import axios from "axios";
import { api_url } from "@/api/api";
import AsignarRevendedor from "@/components/Dashboard/GestionEventos/AsignarRevendedor/AsignarRevendedor";

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
        <AsignarRevendedor
          eventId={createdEventId}
          eventName={events.find((e) => e.id === createdEventId)?.nombre || ""}
        />
      ) : null,
    },
  ];

  const steps = createSteps();

  const loadEvents = async () => {
    try {
      const response = await axios.get(api_url.get_eventos_productora, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken
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



  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:ml-8">Crear Evento</h1>
        </div>

        <div className="rounded-xl bg-primary p-4 text-white sm:p-6 lg:p-8">
          {/* ---------- Pestañas ---------- */}
          <div className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto rounded-xl bg-black/40 p-2 sm:mb-8 sm:gap-4">
            {steps.map(({ label }, idx) => (
              <button
                key={label}
                onClick={() => {
                  // Si intenta ir a un paso posterior sin haber creado el evento
                  if (idx > 0 && !createdEventId) {
                    toast.error("Debes guardar los detalles del evento antes de continuar");
                    return;
                  }
                  // Si intenta ir a un paso posterior y el formulario no es válido
                  if (idx > 0 && !formik.isValid) {
                    formik.handleSubmit();
                    return;
                  }
                  setActive(idx);
                }}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition flex-shrink-0 sm:px-6 sm:py-4 sm:text-md
                  ${active === idx
                    ? "bg-secondary text-black font-bold"
                    : idx > 0 && !createdEventId
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 font-normal"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ---------- Contenido ---------- */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">{steps[active].content}</div>

          {/* ---------- Navegación abajo ---------- */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-end sm:gap-4">
            <button
              onClick={prevStep}
              disabled={active === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40 sm:px-6"
            >
              <FiChevronLeft size={20} />
              Volver
            </button>

            <button
              onClick={nextStep}
              disabled={active === steps.length - 1 || (active === 0 && !createdEventId)}
              className="rounded-xl bg-secondary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-40 sm:px-6"
              title={active === 0 && !createdEventId ? "Debes guardar los detalles del evento antes de continuar" : ""}
            >
              {active === 0 && !createdEventId ? "Guardar para Continuar" : "Continuar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEvento;
