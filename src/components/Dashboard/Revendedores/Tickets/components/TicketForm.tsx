import React from "react";
import { useFormik } from "formik";
import { FaEnvelope, FaUser, FaPhone, FaIdCard, FaTicketAlt } from "react-icons/fa";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { initialValues, validationSchema, TicketFormValues } from "@/components/Dashboard/Revendedores/Tickets/data/ticketForm.schema";

interface TicketFormProps {
    onSubmit: (values: TicketFormValues & { loteId: number }) => void;
    selectedLoteId: number | null;
    isSubmitting?: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, selectedLoteId, isSubmitting = false }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (selectedLoteId) {
                onSubmit({
                    ...values,
                    loteId: selectedLoteId,
                });
            }
        },
    });

    if (!selectedLoteId) { return null; }

    return (
        <div className="rounded-b-lg bg-[#1c1c1c] p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-white sm:mb-6 sm:text-xl">Cargar datos del comprador</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <FloatingField label="Email del Cliente" htmlFor="emailCliente">
                        <FaEnvelope className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                        <input
                            id="emailCliente"
                            name="emailCliente"
                            autoComplete="off"
                            type="email"
                            className={`w-full rounded-lg border ${formik.touched.emailCliente && formik.errors.emailCliente
                                ? "border-red-500"
                                : "border-gray-600"
                                } bg-[#1C1C1E] px-4 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary`}
                            value={formik.values.emailCliente}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="ejemplo@email.com"
                        />
                    </FloatingField>
                    {formik.touched.emailCliente && formik.errors.emailCliente && (
                        <div className="mt-1 text-sm text-red-500">
                            {formik.errors.emailCliente}
                        </div>
                    )}
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <FloatingField label="Nombre" htmlFor="nombreCliente">
                            <FaUser className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                            <input
                                id="nombreCliente"
                                name="nombreCliente"
                                autoComplete="off"
                                type="text"
                                className={`w-full rounded-lg border ${formik.touched.nombreCliente && formik.errors.nombreCliente
                                    ? "border-red-500"
                                    : "border-gray-600"
                                    } bg-[#1C1C1E] px-4 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary`}
                                value={formik.values.nombreCliente}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Juan"
                            />
                        </FloatingField>
                        {formik.touched.nombreCliente && formik.errors.nombreCliente && (
                            <div className="mt-1 text-sm text-red-500">
                                {formik.errors.nombreCliente}
                            </div>
                        )}
                    </div>

                    <div>
                        <FloatingField label="Apellido" htmlFor="apellidoCliente">
                            <FaUser className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                            <input
                                id="apellidoCliente"
                                name="apellidoCliente"
                                autoComplete="off"
                                type="text"
                                className={`w-full rounded-lg border ${formik.touched.apellidoCliente && formik.errors.apellidoCliente
                                    ? "border-red-500"
                                    : "border-gray-600"
                                    } bg-[#1C1C1E] px-4 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary`}
                                value={formik.values.apellidoCliente}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Pérez"
                            />
                        </FloatingField>
                        {formik.touched.apellidoCliente && formik.errors.apellidoCliente && (
                            <div className="mt-1 text-sm text-red-500">
                                {formik.errors.apellidoCliente}
                            </div>
                        )}
                    </div>
                </div>

                {/* Teléfono y DNI */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <FloatingField label="Teléfono" htmlFor="phoneNumberCliente">
                            <FaPhone className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                            <input
                                id="phoneNumberCliente"
                                name="phoneNumberCliente"
                                autoComplete="off"
                                type="text"
                                className={`w-full rounded-lg border ${formik.touched.phoneNumberCliente && formik.errors.phoneNumberCliente
                                    ? "border-red-500"
                                    : "border-gray-600"
                                    } bg-[#1C1C1E] px-4 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary`}
                                value={formik.values.phoneNumberCliente}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="+5437646302423"
                            />
                        </FloatingField>
                        {formik.touched.phoneNumberCliente && formik.errors.phoneNumberCliente && (
                            <div className="mt-1 text-sm text-red-500">
                                {formik.errors.phoneNumberCliente}
                            </div>
                        )}
                    </div>

                    <div>
                        <FloatingField label="DNI" htmlFor="dniCliente">
                            <FaIdCard className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />
                            <input
                                id="dniCliente"
                                name="dniCliente"
                                autoComplete="off"
                                type="text"
                                maxLength={8}
                                className={`w-full rounded-lg border ${formik.touched.dniCliente && formik.errors.dniCliente
                                    ? "border-red-500"
                                    : "border-gray-600"
                                    } bg-[#1C1C1E] px-4 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary`}
                                value={formik.values.dniCliente}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="12345678"
                            />
                        </FloatingField>
                        {formik.touched.dniCliente && formik.errors.dniCliente && (
                            <div className="mt-1 text-sm text-red-500">
                                {formik.errors.dniCliente}
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
                            autoComplete="off"
                            type="number"
                            min="1"
                            max="100"
                            className={`w-full rounded-lg border ${formik.touched.cantidadTickets && formik.errors.cantidadTickets
                                ? "border-red-500"
                                : "border-gray-600"
                                } bg-[#1C1C1E] px-4 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                            value={formik.values.cantidadTickets}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="1"
                        />
                    </FloatingField>
                    {formik.touched.cantidadTickets && formik.errors.cantidadTickets && (
                        <div className="mt-1 text-sm text-red-500">
                            {formik.errors.cantidadTickets}
                        </div>
                    )}
                </div>

                {/* Botón Enviar */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || !formik.isValid}
                        className="w-full rounded-lg bg-secondary px-4 py-3 font-semibold text-white transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
                    >
                        {isSubmitting ? "Enviando..." : "Enviar Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketForm; 