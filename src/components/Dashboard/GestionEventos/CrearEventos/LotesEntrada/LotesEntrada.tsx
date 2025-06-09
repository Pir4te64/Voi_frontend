import React, { useRef } from "react";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaPercent,
  FaTicketAlt,
} from "react-icons/fa";
import { useLoteForm } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/store/useLoteForm";
import { useFormik } from "formik";
import { initialSchema, validationSchema } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/data/lotesEntrada.data";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";

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
  /*  eventName, */
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
        // El error ya se maneja en el store con notificación toast
      }
    },
  });

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <form onSubmit={formik.handleSubmit} className="relative w-full rounded-2xl bg-back p-8 shadow-lg">
      {/* Mensaje de éxito */}
      <div className="mb-4">
        <h1 className="text-xxl font-light text-white">Crea diferentes lotes de tickets con precios y disponibilidad únicos.</h1>
      </div>
      {/* Nombre del Lote */}
      <div className="mb-4">
        <FloatingField label="Nombre del Lote" htmlFor="nombreLote">
          <input
            id="nombreLote"
            name="nombre"
            type="text"
            className={`w-full rounded-lg border ${formik.touched.nombre && formik.errors.nombre
              ? "border-red-500"
              : "border-gray-700"
              } bg-back px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FaEdit className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </FloatingField>
        {formik.touched.nombre && formik.errors.nombre && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.nombre}</div>
        )}
      </div>
      {/* Precio y Fecha */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <FloatingField label="Precio" htmlFor="precio">
            <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
            <input
              id="precio"
              name="precio"
              type="number"
              className={`w-full rounded-lg border ${formik.touched.precio && formik.errors.precio
                ? "border-red-500"
                : "border-gray-700"
                } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
              value={formik.values.precio || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
          </FloatingField>
          {formik.touched.precio && formik.errors.precio && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.precio}</div>
          )}
        </div>
        <div className="flex-1">
          <FloatingField label="Válido hasta" htmlFor="fechaValidez">
            <FaCalendarAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
            <input
              ref={dateInputRef}
              id="fechaValidez"
              name="fechaValidez"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={`w-full rounded-lg border ${formik.touched.fechaValidez && formik.errors.fechaValidez
                ? "border-red-500"
                : "border-gray-700"
                } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
              value={formik.values.fechaValidez}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={handleCalendarClick}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 hover:text-secondary focus:outline-none"
            >
              <FaEdit />
            </button>
          </FloatingField>
          {formik.touched.fechaValidez && formik.errors.fechaValidez && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.fechaValidez}</div>
          )}
        </div>
      </div>
      {/* Tipo de Comisión */}
      <div className="mb-4 rounded-lg bg-back p-4">
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
            <div className="ml-4 flex-1">
              <FloatingField htmlFor="montoFijo">
                <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                <input
                  id="montoFijo"
                  name="montoFijo"
                  type="number"
                  className={`w-full rounded-lg border ${formik.touched.montoFijo && formik.errors.montoFijo
                    ? "border-red-500"
                    : "border-gray-700"
                    } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                  value={formik.values.montoFijo || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.values.tipoComision !== "MONTO_FIJO"}
                />
                <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
              </FloatingField>
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
            <div className="ml-4 flex-1">
              <FloatingField htmlFor="porcentaje">
                <FaPercent className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                <input
                  id="porcentaje"
                  name="porcentaje"
                  type="number"
                  className={`w-full rounded-lg border ${formik.touched.porcentaje && formik.errors.porcentaje
                    ? "border-red-500"
                    : "border-gray-700"
                    } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                  value={formik.values.porcentaje || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.values.tipoComision !== "PORCENTAJE"}
                />
                <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
              </FloatingField>
            </div>
          </label>
          {formik.touched.porcentaje && formik.errors.porcentaje && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.porcentaje}</div>
          )}
        </div>
      </div >
      {/* Cantidad de Tickets */}
      < div className="mb-4" >
        <FloatingField label="Cantidad de Tickets" htmlFor="cantidadTickets">
          <FaTicketAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
          <input
            id="cantidadTickets"
            name="cantidadTickets"
            type="number"
            className={`w-full rounded-lg border ${formik.touched.cantidadTickets && formik.errors.cantidadTickets
              ? "border-red-500"
              : "border-gray-700"
              } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
            value={formik.values.cantidadTickets || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
        </FloatingField>
        {
          formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.cantidadTickets}</div>
          )
        }
        {
          success && (
            <div className="mt-4 flex items-center justify-end gap-2 text-sm text-green-400">
              <FaCheckCircle /> Lote creado con éxito
            </div>
          )
        }
      </div >
      {/* Botón Agregar Lote */}
      < button
        type="submit"
        className="mt-2 w-full rounded-lg bg-secondary py-3 text-lg font-semibold text-white transition hover:opacity-90"
      >
        Agregar Lote
      </button >
    </form >
  );
};

export default GestionarLoteUI;
