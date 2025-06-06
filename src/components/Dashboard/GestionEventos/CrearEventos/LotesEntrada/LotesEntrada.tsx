import React from "react";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

const GestionarLoteUI: React.FC<{
  onClose: () => void;
  eventName: string;
  eventId: number;
}> = ({ onClose, eventName, eventId }) => (
  console.log(eventId),
  (
    <div className="relative w-full rounded-2xl bg-black/80 p-8 shadow-lg">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-xl text-white hover:text-secondary"
        title="Cerrar"
      >
        <FaTimes />
      </button>
      <h2 className="mb-2 text-lg font-semibold text-white">
        Gestionar lotes para:{" "}
        <span className="text-secondary">{eventName}</span>
      </h2>
      <p className="mb-6 text-gray-400">
        ID del evento: <span className="font-mono">{eventId}</span>
      </p>
      {/* Nombre del Lote */}
      <div className="mb-4">
        <label
          className="mb-1 block text-sm text-secondary"
          htmlFor="nombreLote"
        >
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
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Precio"
            className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
            disabled
          />
          <FaDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative flex-1">
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
        <label className="mb-2 block text-sm font-semibold text-white">
          Asigna un Tipo de Comisión
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="radio" checked readOnly className="accent-red-500" />
            <span className="text-white">Monto Fijo</span>
            <div className="relative ml-4 flex-1">
              <input
                type="text"
                placeholder="Escribe un monto"
                className="w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none"
                disabled
              />
              <FaDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </label>
          <label className="mt-2 flex items-center gap-2">
            <input type="radio" disabled className="accent-red-500" />
            <span className="text-white">Porcentaje</span>
            <div className="relative ml-4 flex-1">
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
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold text-red-400">Guardar Cambios</span>
        <span className="flex items-center gap-2 text-sm text-green-400">
          <FaCheckCircle /> Perfil actualizado con éxito
        </span>
      </div>
      {/* Botón Agregar Lote */}
      <button
        className="mt-2 w-full rounded-lg bg-secondary py-3 text-lg font-semibold text-white transition hover:opacity-90"
        disabled
      >
        Agregar Lote
      </button>
    </div>
  )
);

export default GestionarLoteUI;
