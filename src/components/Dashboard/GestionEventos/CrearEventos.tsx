import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import TicketLotsForm from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";
import { FiChevronLeft } from "react-icons/fi";
import { useCrearEventoForm } from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/store/useCrearEventoForm";

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
      content: <TicketLotsForm />,
    },
    {
      label: "Revendedores",
      content: <div className="p-6">Paso 3</div>,
    },
  ];

  const nextStep = () => setActive((p) => Math.min(p + 1, steps.length - 1));
  const prevStep = () => setActive((p) => Math.max(p - 1, 0));

  // Vista de lista de eventos
  if (!isCreating) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-white hover:text-secondary"
          >
            <FaArrowLeft className="mr-2" />
            Volver
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Eventos</h1>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              <FaPlus />
              Crear Evento
            </button>
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
                <th className="px-4 py-3 font-semibold text-center">Estado</th>
                <th className="px-4 py-3 font-semibold text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No hay eventos disponibles
                  </td>
                </tr>
              )}

              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-t border-gray-700 hover:bg-black/30"
                >
                  <td className="px-4 py-3">{event.nombre}</td>
                  <td className="px-4 py-3">
                    {format(new Date(event.fechaInicio), "PPP", { locale: es })}
                  </td>
                  <td className="px-4 py-3">{event.categoriaNombre}</td>
                  <td className="px-4 py-3">
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
                    <button className="rounded bg-secondary px-4 py-2 text-sm text-primary transition hover:bg-secondary/80">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
              onClick={() => setActive(idx)}
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
  );
};

export default CrearEventos;
