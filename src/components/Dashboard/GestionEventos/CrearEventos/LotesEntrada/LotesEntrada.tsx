import React, { useRef, useEffect } from "react";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaPencilAlt,
  FaPercent,
  FaTicketAlt,
} from "react-icons/fa";
import LoaderOverlay from "@/components/Dashboard/ComponentesReutilizables/LoaderOverlay";
import { useFormik } from "formik";
import {
  initialSchema,
  validationSchema,
  LoteFormData,
} from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/data/lotesEntrada.data";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { GestionarLoteUIProps } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/data/ticketLots.data";
import { useLotesStore } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/store/useLotesStore";
import TablaLotes from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/components/TablaLotes";
import { Lote } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/types/lote.types";
import { formatCurrency, formatDate } from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/utils/format.utils";

const GestionarLoteUI: React.FC<GestionarLoteUIProps> = ({
  eventId,
}) => {
  const {
    lotes,
    loadingLotes,
    loadingSubmit,
    isEditing,
    loteToDelete,
    cargarLotes,
    createLote,
    updateLote,
    deleteLote,
    cambiarEstadoLote,
    setIsEditing,
    setLoteToDelete
  } = useLotesStore();

  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    cargarLotes(eventId);
  }, [eventId, cargarLotes]);
  const formik = useFormik({
    initialValues: initialSchema,
    validationSchema,
    onSubmit: async (values: LoteFormData, { resetForm }) => {
      console.log("Enviando formulario:", { values, isEditing, eventId }); // Debug log
      try {
        if (isEditing && values.id) {
          console.log("Actualizando lote con ID:", values.id); // Debug log
          await updateLote({ ...values, id: values.id }, eventId);
        } else {
          console.log("Creando nuevo lote"); // Debug log
          await createLote(values, eventId);
        }
        resetForm();
      } catch (error) {
        console.error("Error al procesar el lote:", error);
      }
    },
  });

  const handleEditLote = (lote: Lote) => {
    console.log("Editando lote:", lote); // Debug log
    setIsEditing(true);

    const formValues = {
      id: lote.id,
      nombre: lote.nombre,
      precio: lote.precio,
      fechaValidez: lote.fechaValidez,
      cantidadTickets: lote.cantidadTickets,
      tipoComision: lote.tipoComision,
      montoFijo: lote.tipoComision === "MONTO_FIJO" ? lote.montoComision : 0,
      porcentaje: lote.tipoComision === "PORCENTAJE" ? lote.porcentajeComision : 0,
    };

    console.log("Valores del formulario:", formValues); // Debug log
    formik.setValues(formValues);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Loader para operaciones de crear/actualizar */}
      {loadingSubmit && <LoaderOverlay />}

      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full rounded-2xl bg-back p-4 shadow-lg sm:p-6 lg:p-8"
      >
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl font-light text-white sm:text-2xl lg:text-xxl">
            {isEditing
              ? "Editar Lote de Tickets"
              : "Crea diferentes lotes de tickets con precios y disponibilidad únicos."
            }
          </h1>
        </div>

        {/* Nombre del Lote */}
        <div className="mb-4">
          <FloatingField label="Nombre del Lote" htmlFor="nombreLote">
            <input
              id="nombreLote"
              name="nombre"
              type="text"
              autoComplete="off"
              className={`w-full rounded-lg border ${formik.touched.nombre && formik.errors.nombre
                ? "border-red-500"
                : "border-gray-700"
                } bg-back px-4 py-3 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </FloatingField>
          {formik.touched.nombre && formik.errors.nombre && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.nombre}
            </div>
          )}
        </div>

        {/* Precio y Fecha */}
        <div className="mb-4 grid gap-4 sm:gap-6 md:grid-cols-2">
          <div>
            <FloatingField label="Precio" htmlFor="precio">
              <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
              <input
                id="precio"
                name="precio"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                className={`w-full rounded-lg border ${formik.touched.precio && formik.errors.precio
                  ? "border-red-500"
                  : "border-gray-700"
                  } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                value={formik.values.precio || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                onWheel={(e) => e.currentTarget.blur()}
                className={`w-full rounded-lg border ${formik.touched.fechaValidez && formik.errors.fechaValidez
                  ? "border-red-500"
                  : "border-gray-700"
                  } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                value={formik.values.fechaValidez}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </FloatingField>
            {formik.touched.fechaValidez && formik.errors.fechaValidez && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.fechaValidez}
              </div>
            )}
          </div>
        </div>

        {/* Tipo de Comisión */}
        <div className="mb-4 rounded-lg bg-back p-4 sm:p-6">
          <label className="mb-3 block text-base font-semibold text-white sm:mb-4 sm:text-lg">
            Tipo de Comisión
          </label>
          <div className="space-y-4">
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="tipoComision"
                value="MONTO_FIJO"
                checked={formik.values.tipoComision === "MONTO_FIJO"}
                onChange={formik.handleChange}
                className="accent-secondary"
              />
              <span className="font-medium text-white">Monto Fijo</span>
              <div className="flex-1">
                <FloatingField htmlFor="montoFijo">
                  <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                  <input
                    id="montoFijo"
                    name="montoFijo"
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    className={`w-full rounded-lg border ${formik.touched.montoFijo && formik.errors.montoFijo
                      ? "border-red-500"
                      : "border-gray-700"
                      } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    value={formik.values.montoFijo || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.tipoComision !== "MONTO_FIJO"}
                  />
                  <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </FloatingField>
              </div>
            </label>
            {formik.touched.montoFijo && formik.errors.montoFijo && (
              <div className="text-sm text-red-500">{formik.errors.montoFijo}</div>
            )}

            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="tipoComision"
                value="PORCENTAJE"
                checked={formik.values.tipoComision === "PORCENTAJE"}
                onChange={formik.handleChange}
                className="accent-secondary"
              />
              <span className="font-medium text-white">Porcentaje</span>
              <div className="flex-1">
                <FloatingField htmlFor="porcentaje">
                  <FaPercent className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                  <input
                    id="porcentaje"
                    name="porcentaje"
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    className={`w-full rounded-lg border ${formik.touched.porcentaje && formik.errors.porcentaje
                      ? "border-red-500"
                      : "border-gray-700"
                      } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    value={formik.values.porcentaje || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.tipoComision !== "PORCENTAJE"}
                  />
                  <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </FloatingField>
              </div>
            </label>
            {formik.touched.porcentaje && formik.errors.porcentaje && (
              <div className="text-sm text-red-500">{formik.errors.porcentaje}</div>
            )}
          </div>
        </div>

        {/* Cantidad de Tickets */}
        <div className="mb-4">
          <FloatingField label="Cantidad de Tickets" htmlFor="cantidadTickets">
            <FaTicketAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
            <input
              id="cantidadTickets"
              name="cantidadTickets"
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              className={`w-full rounded-lg border ${formik.touched.cantidadTickets && formik.errors.cantidadTickets
                ? "border-red-500"
                : "border-gray-700"
                } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              value={formik.values.cantidadTickets || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </FloatingField>
          {formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.cantidadTickets}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="submit"
            disabled={loadingSubmit}
            className="flex-1 rounded-lg bg-secondary py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            {loadingSubmit
              ? (isEditing ? "Actualizando..." : "Creando...")
              : (isEditing ? "Actualizar Lote" : "Agregar Lote")
            }
          </button>

          {isEditing && (
            <button
              type="button"
              disabled={loadingSubmit}
              onClick={() => {
                console.log("Cancelando edición"); // Debug log
                setIsEditing(false);
                formik.resetForm();
              }}
              className="flex-1 rounded-lg border border-gray-600 py-3 text-base font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <TablaLotes
        lotes={lotes}
        loadingLotes={loadingLotes}
        loteToDelete={loteToDelete}
        eventId={eventId}
        onEdit={handleEditLote}
        onSetLoteToDelete={setLoteToDelete}
        onDelete={deleteLote}
        onChangeEstado={cambiarEstadoLote}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </div>
  );
};

export default GestionarLoteUI;
