import React from "react";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const GestionarLotes: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl bg-black/80 border border-secondary shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-6">Gestionar lotes</h2>
      {/* Nombre del Lote */}
      <div className="mb-4">
        <label
          className="block text-secondary text-sm mb-1"
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
};

export default GestionarLotes;
