import React, { useRef } from "react";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useLoteForm } from "./store/useLoteForm";
import { useFormik } from "formik";
import { initialSchema, validationSchema } from "./data/lotesEntrada.data";

interface GestionarLoteUIProps {
  eventName: string;
  eventId: number;
  prevStep: () => void;
  nextStep: () => void;
  active: number;
  stepsLength: number;
}

const GestionarLoteUI: React.FC<GestionarLoteUIProps> = ({
  eventId,
  eventName,
  nextStep,
}) => {
  const { createLote, success } = useLoteForm();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: initialSchema,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createLote(values, eventId);
        resetForm();
        nextStep();
      } catch (error) {
        // El error ya se maneja en el store
        console.error("Error al crear el lote:", error);
      }
    },
  });

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <form onSubmit={formik.handleSubmit} className="relative w-full rounded-2xl bg-black/80 p-8 shadow-lg">
      {/* Mensaje de éxito */}

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
            name="nombre"
            type="text"
            placeholder='p. ej. "Entrada anticipada", "Entrada general"'
            className={`w-full rounded-lg border ${formik.touched.nombre && formik.errors.nombre
              ? "border-red-500"
              : "border-red-400"
              } bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FaEdit className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {formik.touched.nombre && formik.errors.nombre && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.nombre}</div>
        )}
      </div>
      {/* Precio y Fecha */}
      <div className="mb-4 flex gap-4">
        <div className="relative flex-1">
          <input
            name="precio"
            type="number"
            placeholder="Precio"
            className={`w-full rounded-lg border ${formik.touched.precio && formik.errors.precio
              ? "border-red-500"
              : "border-gray-700"
              } bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
            value={formik.values.precio || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FaDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {formik.touched.precio && formik.errors.precio && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.precio}</div>
          )}
        </div>
        <div className="relative flex-1">
          <input
            ref={dateInputRef}
            name="fechaValidez"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            placeholder="Válido hasta"
            className={`w-full rounded-lg border ${formik.touched.fechaValidez && formik.errors.fechaValidez
              ? "border-red-500"
              : "border-gray-700"
              } bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
            value={formik.values.fechaValidez}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={handleCalendarClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary"
          >
            <FaCalendarAlt />
          </button>
          {formik.touched.fechaValidez && formik.errors.fechaValidez && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.fechaValidez}</div>
          )}
        </div>
      </div>
      {/* Tipo de Comisión */}
      <div className="mb-4 rounded-lg bg-black/60 p-4">
        <label className="mb-2 block text-sm font-semibold text-white">
          Asigna un Tipo de Comisión
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipoComision"
              checked={formik.values.tipoComision === "MONTO_FIJO"}
              onChange={formik.handleChange}
              value="MONTO_FIJO"
              className="accent-red-500"
            />
            <span className="text-white">Monto Fijo</span>
            <div className="relative ml-4 flex-1">
              <input
                name="montoFijo"
                type="number"
                placeholder="Escribe un monto"
                className={`w-full rounded-lg border ${formik.touched.montoFijo && formik.errors.montoFijo
                  ? "border-red-500"
                  : "border-gray-700"
                  } bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                value={formik.values.montoFijo || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.values.tipoComision !== "MONTO_FIJO"}
              />
              <FaDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </label>
          {formik.touched.montoFijo && formik.errors.montoFijo && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.montoFijo}</div>
          )}
          <label className="mt-2 flex items-center gap-2">
            <input
              type="radio"
              name="tipoComision"
              checked={formik.values.tipoComision === "PORCENTAJE"}
              onChange={formik.handleChange}
              value="PORCENTAJE"
              className="accent-red-500"
            />
            <span className="text-white">Porcentaje</span>
            <div className="relative ml-4 flex-1">
              <input
                name="porcentaje"
                type="number"
                placeholder="Escribe un porcentaje"
                className={`w-full rounded-lg border ${formik.touched.porcentaje && formik.errors.porcentaje
                  ? "border-red-500"
                  : "border-gray-700"
                  } bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                value={formik.values.porcentaje || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.values.tipoComision !== "PORCENTAJE"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                %
              </span>
            </div>
          </label>
          {formik.touched.porcentaje && formik.errors.porcentaje && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.porcentaje}</div>
          )}
        </div>
      </div>
      {/* Cantidad de Tickets */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-secondary">
          Cantidad de Tickets
        </label>
        <div className="relative">
          <input
            name="cantidadTickets"
            type="number"
            placeholder="Cantidad de tickets disponibles"
            className={`w-full rounded-lg border ${formik.touched.cantidadTickets && formik.errors.cantidadTickets
              ? "border-red-500"
              : "border-gray-700"
              } bg-black/60 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
            value={formik.values.cantidadTickets || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.cantidadTickets}</div>
          )}
        </div>
        {success && (
          <div className="mb-4 flex items-center justify-end gap-2 text-sm text-green-400">
            <FaCheckCircle /> Lote creado con éxito
          </div>
        )}
      </div>
      {/* Botón Agregar Lote */}
      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-secondary py-3 text-lg font-semibold text-white transition hover:opacity-90"
      >
        Agregar Lote
      </button>
    </form>
  );
};

export default GestionarLoteUI;
