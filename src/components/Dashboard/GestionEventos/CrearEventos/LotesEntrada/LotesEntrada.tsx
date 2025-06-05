import React, { useEffect, useState } from "react";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";

const GestionarLoteUI: React.FC<{ onClose: () => void; eventName: string }> = ({
  onClose,
  eventName,
}) => (
  <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl bg-black/80 border border-secondary shadow-lg relative">
    <button
      onClick={onClose}
      className="absolute right-4 top-4 text-white hover:text-secondary text-xl"
      title="Cerrar"
    >
      <FaTimes />
    </button>
    <h2 className="text-lg font-semibold text-white mb-6">
      Gestionar lotes para: <span className="text-secondary">{eventName}</span>
    </h2>
    {/* Nombre del Lote */}
    <div className="mb-4">
      <label className="block text-secondary text-sm mb-1" htmlFor="nombreLote">
        Nombre del Lote
      </label>
      <div className="relative">
        <input
          id="nombreLote"
          type="text"
          placeholder='p. ej. "Entrada anticipada", "Entrada general"'
          className="w-full rounded-lg border border-red-400 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
          disabled
        />
        <FaEdit className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
    {/* Precio y Fecha */}
    <div className="mb-4 flex gap-4">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Precio"
          className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
          disabled
        />
        <FaDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Válido hasta"
          className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
          disabled
        />
        <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
    {/* Tipo de Comisión */}
    <div className="mb-4 rounded-lg bg-black/60 p-4">
      <label className="block text-white text-sm mb-2 font-semibold">
        Asigna un Tipo de Comisión
      </label>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input type="radio" checked readOnly className="accent-red-500" />
          <span className="text-white">Monto Fijo</span>
          <div className="flex-1 relative ml-4">
            <input
              type="text"
              placeholder="Escribe un monto"
              className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
              disabled
            />
            <FaDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="radio" disabled className="accent-red-500" />
          <span className="text-white">Porcentaje</span>
          <div className="flex-1 relative ml-4">
            <input
              type="text"
              placeholder="Escribe un porcentaje"
              className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
              disabled
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              %
            </span>
          </div>
        </label>
      </div>
    </div>
    {/* Guardar Cambios y Mensaje */}
    <div className="flex items-center justify-between mb-4">
      <span className="text-red-400 font-semibold">Guardar Cambios</span>
      <span className="flex items-center gap-2 text-green-400 text-sm">
        <FaCheckCircle /> Perfil actualizado con éxito
      </span>
    </div>
    {/* Botón Agregar Lote */}
    <button
      className="w-full rounded-lg bg-secondary py-3 text-lg font-semibold text-white mt-2 transition hover:opacity-90"
      disabled
    >
      Agregar Lote
    </button>
  </div>
);

const TicketLotsForm: React.FC = () => {
  const { events, fetchEvents } = useEventsStore();
  const [selectedEvent, setSelectedEvent] = useState<null | {
    id: number;
    nombre: string;
  }>(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div>
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
                  <button
                    className="rounded bg-secondary px-4 py-2 text-sm text-primary transition hover:bg-secondary/80"
                    onClick={() =>
                      setSelectedEvent({ id: event.id, nombre: event.nombre })
                    }
                  >
                    Gestionar Lotes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEvent && (
        <GestionarLoteUI
          onClose={() => setSelectedEvent(null)}
          eventName={selectedEvent.nombre}
        />
      )}
    </div>
  );
};

export default TicketLotsForm;
