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
import { useCrearLoteForm } from "@/components/Dashboard/GestionLotes/CrearLote/store/useCrearLoteForm";
import { useFormik } from "formik";
import { CrearLoteUIProps, initialSchema, validationSchema } from "@/components/Dashboard/GestionLotes/CrearLote/data/crearLote.data";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";


const CrearLoteUI: React.FC<CrearLoteUIProps> = ({
    eventId,
    eventName,
    onBack,
    onLoteCreated,
}) => {
    const { createLote, success, setSuccess } = useCrearLoteForm();
    const dateInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, setSuccess]);

    const formik = useFormik({
        initialValues: initialSchema,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await createLote(values, eventId);
                resetForm();
                onLoteCreated();
            } catch (error) {
                console.error("Error al crear el lote:", error);
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
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Crear Nuevo Lote - {eventName}
                </h1>
                <p className="mt-2 text-sm text-gray-400 sm:text-base">
                    Crea diferentes lotes de tickets con precios y disponibilidad únicos
                </p>
            </div>

            <div className="rounded-lg bg-back p-4 sm:p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Nombre del Lote */}
                    <div>
                        <FloatingField label="Nombre del Lote" htmlFor="nombreLote">
                            <input
                                id="nombreLote"
                                name="nombre"
                                autoComplete="off"
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
                        <div>
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
                    <div className="rounded-lg bg-back p-4 sm:p-6">
                        <label className="mb-4 block text-base font-semibold text-white sm:text-lg">
                            Asigna un Tipo de Comisión
                        </label>
                        <div className="space-y-4">
                            <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="tipoComision"
                                        checked={formik.values.tipoComision === "MONTO_FIJO"}
                                        onChange={formik.handleChange}
                                        value="MONTO_FIJO"
                                        className="accent-secondary"
                                    />
                                    <span className="font-medium text-white">Monto Fijo</span>
                                </div>
                                <div className="flex-1">
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
                                <div className="text-sm text-red-500">{formik.errors.montoFijo}</div>
                            )}

                            <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="tipoComision"
                                        checked={formik.values.tipoComision === "PORCENTAJE"}
                                        onChange={formik.handleChange}
                                        value="PORCENTAJE"
                                        className="accent-secondary"
                                    />
                                    <span className="font-medium text-white">Porcentaje</span>
                                </div>
                                <div className="flex-1">
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
                                <div className="text-sm text-red-500">{formik.errors.porcentaje}</div>
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
                                    } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                                value={formik.values.cantidadTickets || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                        </FloatingField>
                        {formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
                            <div className="mt-1 text-sm text-red-500">{formik.errors.cantidadTickets}</div>
                        )}
                    </div>

                    {/* Mensaje de éxito */}
                    {success && (
                        <div className="flex items-center justify-center gap-2 text-green-400">
                            <FaCheckCircle /> Lote creado con éxito
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
                            Crear Lote
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearLoteUI; 