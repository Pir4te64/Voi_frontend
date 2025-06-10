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
import { useEditarLoteForm } from "./store/useEditarLoteForm";
import { useFormik } from "formik";
import { editarValidationSchema } from "./data/editarLote.data";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";

interface Lote {
    id: number;
    nombre: string;
    precio: number;
    fechaValidez: string;
    tipoComision: string;
    montoComision: number;
    estado: string;
    cantidadTickets: number;
    ticketsDisponibles: number;
    tickets: any[];
}

interface EditarLoteUIProps {
    eventName: string;
    eventId: number;
    lote: Lote;
    onBack: () => void;
    onLoteUpdated: () => void;
}

const EditarLoteUI: React.FC<EditarLoteUIProps> = ({
    eventId,
    eventName,
    lote,
    onBack,
    onLoteUpdated,
}) => {
    const { updateLote, success } = useEditarLoteForm();

    const formik = useFormik({
        initialValues: {
            nombre: lote.nombre,
            precio: lote.precio,
            fechaValidez: lote.fechaValidez,
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(amount);
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
                <h1 className="text-3xl font-bold text-white">
                    Editar Cantidad de Tickets - {lote.nombre}
                </h1>
                <p className="mt-2 text-gray-400">
                    Evento: {eventName} | Solo puedes editar la cantidad total de tickets disponibles
                </p>
            </div>

            <div className="rounded-lg bg-black/40 p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Nombre del Lote - Solo lectura */}
                    <div>
                        <FloatingField label="Nombre del Lote" htmlFor="nombreLote">
                            <input
                                id="nombreLote"
                                name="nombre"
                                type="text"
                                className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-10 text-gray-400"
                                value={formik.values.nombre}
                                disabled
                                readOnly
                            />
                            <FaEdit className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                        </FloatingField>
                        <p className="mt-1 text-xs text-gray-500">Este campo no se puede editar</p>
                    </div>

                    {/* Precio y Fecha - Solo lectura */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <FloatingField label="Precio" htmlFor="precio">
                                <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                                <input
                                    id="precio"
                                    name="precio"
                                    type="text"
                                    className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pl-10 pr-10 text-gray-400"
                                    value={formatCurrency(formik.values.precio)}
                                    disabled
                                    readOnly
                                />
                                <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                            </FloatingField>
                            <p className="mt-1 text-xs text-gray-500">Este campo no se puede editar</p>
                        </div>
                        <div>
                            <FloatingField label="Válido hasta" htmlFor="fechaValidez">
                                <FaCalendarAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                                <input
                                    id="fechaValidez"
                                    name="fechaValidez"
                                    type="text"
                                    className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pl-10 pr-10 text-gray-400"
                                    value={new Date(formik.values.fechaValidez).toLocaleDateString("es-ES")}
                                    disabled
                                    readOnly
                                />
                                <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                            </FloatingField>
                            <p className="mt-1 text-xs text-gray-500">Este campo no se puede editar</p>
                        </div>
                    </div>

                    {/* Tipo de Comisión - Solo lectura */}
                    <div className="rounded-lg bg-gray-800 p-6">
                        <label className="mb-4 block text-lg font-semibold text-gray-400">
                            Tipo de Comisión (No editable)
                        </label>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 opacity-60">
                                <input
                                    type="radio"
                                    checked={formik.values.tipoComision === "MONTO_FIJO"}
                                    disabled
                                    className="accent-gray-500"
                                />
                                <span className="font-medium text-gray-400">Monto Fijo</span>
                                <div className="flex-1">
                                    <FloatingField htmlFor="montoFijo">
                                        <FaDollarSign className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                                        <input
                                            id="montoFijo"
                                            type="text"
                                            className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pl-10 pr-10 text-gray-400"
                                            value={formik.values.tipoComision === "MONTO_FIJO" ? formatCurrency(formik.values.montoFijo) : ""}
                                            disabled
                                            readOnly
                                        />
                                        <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                                    </FloatingField>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 opacity-60">
                                <input
                                    type="radio"
                                    checked={formik.values.tipoComision === "PORCENTAJE"}
                                    disabled
                                    className="accent-gray-500"
                                />
                                <span className="font-medium text-gray-400">Porcentaje</span>
                                <div className="flex-1">
                                    <FloatingField htmlFor="porcentaje">
                                        <FaPercent className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                                        <input
                                            id="porcentaje"
                                            type="text"
                                            className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pl-10 pr-10 text-gray-400"
                                            value={formik.values.tipoComision === "PORCENTAJE" ? `${formik.values.porcentaje}%` : ""}
                                            disabled
                                            readOnly
                                        />
                                        <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-600" />
                                    </FloatingField>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Los datos de comisión no se pueden editar</p>
                    </div>

                    {/* Cantidad de Tickets - EDITABLE */}
                    <div className="rounded-lg border-2 border-secondary/30 bg-back p-6">
                        <label className="mb-2 block text-lg font-semibold text-white">
                            🎫 Campo Editable: Cantidad Total de Tickets
                        </label>
                        <FloatingField label="Cantidad Total de Tickets" htmlFor="cantidadTickets">
                            <FaTicketAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                            <input
                                id="cantidadTickets"
                                name="cantidadTickets"
                                type="number"
                                className={`w-full rounded-lg border ${formik.touched.cantidadTickets && formik.errors.cantidadTickets
                                    ? "border-red-500"
                                    : "border-secondary"
                                    } bg-back px-4 py-3 pl-10 pr-10 text-white placeholder-gray-400 focus:border-secondary focus:outline-none`}
                                value={formik.values.cantidadTickets || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min={lote.cantidadTickets - lote.ticketsDisponibles} // No puede ser menor que los tickets ya vendidos
                            />
                            <FaEdit className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                        </FloatingField>
                        {formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
                            <div className="mt-1 text-sm text-red-500">{formik.errors.cantidadTickets}</div>
                        )}
                        <div className="mt-2 text-sm text-gray-400">
                            <p>• Tickets vendidos: {lote.cantidadTickets - lote.ticketsDisponibles}</p>
                            <p>• Tickets disponibles actuales: {lote.ticketsDisponibles}</p>
                            <p>• Mínimo permitido: {lote.cantidadTickets - lote.ticketsDisponibles} (no puedes reducir por debajo de los vendidos)</p>
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
                            Actualizar Cantidad Total
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarLoteUI; 