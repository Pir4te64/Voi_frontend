import React, { useRef, useEffect } from "react";
import {
  FaEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaPercent,
  FaTicketAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useEditarLoteForm } from "@/components/Dashboard/GestionLotes/EditarLote/store/useEditarLoteForm";
import { useFormik } from "formik";
import { editarValidationSchema } from "@/components/Dashboard/GestionLotes/EditarLote/data/editarLote.data";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { EditarLoteUIProps } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";

const EditarLoteUI: React.FC<EditarLoteUIProps> = ({
  //eventName,
  lote,
  onBack,
  onLoteUpdated,
}) => {
  const { updateLote, success, setSuccess } = useEditarLoteForm();
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  // Obtener porcentajeComision y montoComision si existen en el objeto lote
  const porcentajeComision = (lote as any).porcentajeComision ?? 0;
  const montoComision = (lote as any).montoComision ?? 0;
  const tipoComision: "MONTO_FIJO" | "PORCENTAJE" = porcentajeComision > 0 ? "PORCENTAJE" : "MONTO_FIJO";
  const formik = useFormik({
    initialValues: {
      nombre: lote.nombre,
      precio: lote.precio,
      fechaValidez: lote.fechaValidez.split("T")[0],
      tipoComision,
      montoFijo: montoComision,
      porcentaje: porcentajeComision,
      cantidadTickets: lote.cantidadTickets,
    },
    validationSchema: editarValidationSchema,
    onSubmit: async (values) => {
      try {
        await updateLote(values, lote.id);
        onLoteUpdated();
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    },
  });

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-sm text-white hover:text-secondary sm:text-base"
        >
          <FaArrowLeft className="mr-2" />
          Volver a Lotes
        </button>
        <h1 className="text-2xl font-bold text-secondary sm:text-3xl">
          Editar Lote - {lote.nombre}
        </h1>
      </div>

      <div className="rounded-lg bg-back p-4 sm:p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Nombre del Lote */}
          <div>
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
                  className={`w-full rounded-lg border ${formik.touched.precio && formik.errors.precio
                    ? "border-red-500"
                    : "border-gray-700"
                    } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  value={formik.values.precio || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tipoComision"
                    checked={formik.values.tipoComision === "MONTO_FIJO"}
                    onChange={formik.handleChange}
                    value="MONTO_FIJO"
                    className="accent-red-500"
                  />
                  <span className="text-white">Monto Fijo</span>
                </div>
                <div className="flex-1 sm:ml-4">
                  <FloatingField htmlFor="montoFijo">
                    <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                    <input
                      id="montoFijo"
                      name="montoFijo"
                      type="number"
                      className={`w-full rounded-lg border ${formik.touched.montoFijo && formik.errors.montoFijo
                        ? "border-red-500"
                        : "border-gray-700"
                        } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      value={formik.values.montoFijo || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.values.tipoComision !== "MONTO_FIJO"}
                    />
                    <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                  </FloatingField>
                </div>
              </label>
              {formik.touched.montoFijo && typeof formik.errors.montoFijo === "string" && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.montoFijo}
                </div>
              )}

              <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tipoComision"
                    checked={formik.values.tipoComision === "PORCENTAJE"}
                    onChange={formik.handleChange}
                    value="PORCENTAJE"
                    className="accent-red-500"
                  />
                  <span className="text-white">Porcentaje</span>
                </div>
                <div className="flex-1 sm:ml-4">
                  <FloatingField htmlFor="porcentaje">
                    <FaPercent className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                    <input
                      id="porcentaje"
                      name="porcentaje"
                      type="number"
                      className={`w-full rounded-lg border ${formik.touched.porcentaje && formik.errors.porcentaje
                        ? "border-red-500"
                        : "border-gray-700"
                        } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      value={formik.values.porcentaje || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.values.tipoComision !== "PORCENTAJE"}
                    />
                    <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                  </FloatingField>
                </div>
              </label>
              {formik.touched.porcentaje && typeof formik.errors.porcentaje === "string" && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.porcentaje}
                </div>
              )}
            </div>
          </div>

          {/* Cantidad de Tickets */}
          <div>
            <FloatingField label="Cantidad de Tickets" htmlFor="cantidadTickets">
              <FaTicketAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
              <input
                id="cantidadTickets"
                name="cantidadTickets"
                type="number"
                className={`w-full rounded-lg border ${formik.touched.cantidadTickets && formik.errors.cantidadTickets
                  ? "border-red-500"
                  : "border-gray-700"
                  } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                value={formik.values.cantidadTickets || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
            </FloatingField>
            {formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.cantidadTickets}
              </div>
            )}
          </div>

          {/* Mensaje de éxito */}
          {success && (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <FaCheckCircle /> Lote actualizado con éxito
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-600 py-3 text-white transition hover:bg-gray-600 sm:flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-secondary py-3 text-white transition hover:opacity-90 sm:flex-1"
            >
              Actualizar Lote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLoteUI;
