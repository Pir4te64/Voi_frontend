import React, { useRef } from "react";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaPercent,
  FaTicketAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useEditarLoteForm } from "@/components/Dashboard/GestionEventos/GestionLotes/EditarLote/store/useEditarLoteForm";
import { useFormik } from "formik";
import { editarValidationSchema } from "@/components/Dashboard/GestionEventos/GestionLotes/EditarLote/data/editarLote.data";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { EditarLoteUIProps } from "@/components/Dashboard/GestionEventos/GestionLotes/EditarLote/data/interfaces";

const EditarLoteUI: React.FC<EditarLoteUIProps> = ({
  eventId,
  //eventName,
  lote,
  onBack,
  onLoteUpdated,
}) => {
  const { updateLote, success } = useEditarLoteForm();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      nombre: lote.nombre,
      precio: lote.precio,
      fechaValidez: lote.fechaValidez.split("T")[0], // Asegurarnos de que sea formato YYYY-MM-DD
      tipoComision: lote.tipoComision as "MONTO_FIJO" | "PORCENTAJE",
      montoFijo: lote.tipoComision === "MONTO_FIJO" ? lote.montoComision : 0,
      porcentaje: lote.tipoComision === "PORCENTAJE" ? lote.montoComision : 0,
      cantidadTickets: lote.cantidadTickets,
    },
    validationSchema: editarValidationSchema,
    onSubmit: async (values) => {
      try {
        await updateLote(values, eventId, lote.id);
        onLoteUpdated();
      } catch (error) {
        // El error ya se maneja en el store con notificación toast
      }
    },
  });

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-white hover:text-secondary"
        >
          <FaArrowLeft className="mr-2" />
          Volver a Lotes
        </button>
        <h1 className="text-3xl font-bold text-secondary">
          Editar Lote - {lote.nombre}
        </h1>
      </div>

      <div className="rounded-lg bg-back p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Nombre del Lote */}
          <div>
            <FloatingField label="Nombre del Lote" htmlFor="nombreLote">
              <input
                id="nombreLote"
                name="nombre"
                type="text"
                className={`w-full rounded-lg border ${
                  formik.touched.nombre && formik.errors.nombre
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
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.nombre}
              </div>
            )}
          </div>

          {/* Precio y Fecha */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FloatingField label="Precio" htmlFor="precio">
                <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  className={`w-full rounded-lg border ${
                    formik.touched.precio && formik.errors.precio
                      ? "border-red-500"
                      : "border-gray-700"
                  } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  value={formik.values.precio || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onWheel={(e) => e.currentTarget.blur()}
                />
                <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
              </FloatingField>
              {formik.touched.precio && formik.errors.precio && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.precio}
                </div>
              )}
            </div>
            <div>
              <FloatingField label="Válido hasta" htmlFor="fechaValidez">
                <FaCalendarAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                <input
                  ref={dateInputRef}
                  id="fechaValidez"
                  name="fechaValidez"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full rounded-lg border ${
                    formik.touched.fechaValidez && formik.errors.fechaValidez
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
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.fechaValidez}
                </div>
              )}
            </div>
          </div>

          {/* Tipo de Comisión */}
          <div className="rounded-lg bg-back p-4">
            <label className="mb-2 block text-sm font-semibold text-white">
              Tipo de Comisión
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
                      className={`w-full rounded-lg border ${
                        formik.touched.montoFijo && formik.errors.montoFijo
                          ? "border-red-500"
                          : "border-gray-700"
                      } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      value={formik.values.montoFijo || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onWheel={(e) => e.currentTarget.blur()}
                      disabled={formik.values.tipoComision !== "MONTO_FIJO"}
                    />
                    <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                  </FloatingField>
                </div>
              </label>
              {formik.touched.montoFijo && formik.errors.montoFijo && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.montoFijo}
                </div>
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
                      className={`w-full rounded-lg border ${
                        formik.touched.porcentaje && formik.errors.porcentaje
                          ? "border-red-500"
                          : "border-gray-700"
                      } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      value={formik.values.porcentaje || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onWheel={(e) => e.currentTarget.blur()}
                      disabled={formik.values.tipoComision !== "PORCENTAJE"}
                    />
                    <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                  </FloatingField>
                </div>
              </label>
              {formik.touched.porcentaje && formik.errors.porcentaje && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.porcentaje}
                </div>
              )}
            </div>
          </div>

          {/* Cantidad de Tickets */}
          <div>
            <FloatingField
              label="Cantidad Total de Tickets"
              htmlFor="cantidadTickets"
            >
              <FaTicketAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
              <input
                id="cantidadTickets"
                name="cantidadTickets"
                type="number"
                className={`w-full rounded-lg border ${
                  formik.touched.cantidadTickets &&
                  formik.errors.cantidadTickets
                    ? "border-red-500"
                    : "border-gray-700"
                } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                value={formik.values.cantidadTickets || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={lote.cantidadTickets - lote.ticketsDisponibles}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
            </FloatingField>
            {formik.touched.cantidadTickets &&
              formik.errors.cantidadTickets && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.cantidadTickets}
                </div>
              )}
            <div className="mt-2 text-sm text-gray-400">
              <p>
                • Tickets vendidos:{" "}
                {lote.cantidadTickets - lote.ticketsDisponibles}
              </p>
              <p>• Tickets disponibles actuales: {lote.ticketsDisponibles}</p>
              <p>
                • Mínimo permitido:{" "}
                {lote.cantidadTickets - lote.ticketsDisponibles} (no puedes
                reducir por debajo de los vendidos)
              </p>
            </div>
          </div>

          {/* Mensaje de éxito */}
          {success && (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <FaCheckCircle /> Lote actualizado con éxito
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-lg border border-gray-600 py-3 text-white transition hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-secondary py-3 text-white transition hover:opacity-90"
              disabled={!formik.isValid}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLoteUI;
