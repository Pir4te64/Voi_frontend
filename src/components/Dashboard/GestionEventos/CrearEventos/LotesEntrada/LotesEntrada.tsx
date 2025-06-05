import React, { useEffect } from "react";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TicketLotsForm: React.FC = () => {
  const { events, fetchEvents } = useEventsStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
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
                  Gestionar Lotes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketLotsForm;
