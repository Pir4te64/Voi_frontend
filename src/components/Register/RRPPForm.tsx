// src/components/Register/RRPPForm.tsx
import React from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useFormik } from "formik";

import Logos from "@/components/LoginUser/Logos";
import Separador from "@/components/LoginUser/Separador";
import SmallLogo from "@/components/Register/SmallLogo";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import logoPequeno from "@/assets/Logo.svg";

import { initialValues, validationSchema } from "@/components/Register/data/RRPPForm.schema";

interface RRPPFormProps {
    onBack: () => void;
}

const RRPPForm: React.FC<RRPPFormProps> = ({ onBack }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("Payload a enviar:", values);
            // aquí llamas a tu API...
            resetForm();
            onBack();
        },
    });

    return (
        <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
            <Logos />
            <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
                <SmallLogo src={logoPequeno} />

                <form
                    onSubmit={formik.handleSubmit}
                    className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
                >
                    {/* Botón Volver */}
                    <button
                        type="button"
                        onClick={() => {
                            formik.resetForm();
                            onBack();
                        }}
                        className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white hover:bg-white/10"
                    >
                        <FaArrowLeft />
                    </button>

                    <h2 className="text-center text-3xl font-bold text-secondary md:text-6xl">
                        Regístrate
                    </h2>

                    {/* Nombre */}
                    <FloatingField label="Nombre*">
                        <input
                            id="name"
                            {...formik.getFieldProps("name")}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.name}</p>
                        )}
                    </FloatingField>

                    {/* Apellido */}
                    <FloatingField label="Apellido*">
                        <input
                            id="apellido"
                            {...formik.getFieldProps("apellido")}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.apellido && formik.errors.apellido && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.apellido}</p>
                        )}
                    </FloatingField>

                    {/* Email */}
                    <FloatingField label="Email*">
                        <input
                            id="email"
                            type="email"
                            {...formik.getFieldProps("email")}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
                        )}
                    </FloatingField>

                    {/* Contraseña */}
                    <FloatingField label="Contraseña*">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        <span
                            className="absolute inset-y-0 right-3 top-0 flex cursor-pointer items-center text-xl text-gray-400 hover:text-gray-200"
                            onClick={() => setShowPassword(v => !v)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {formik.touched.password && formik.errors.password && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.password}</p>
                        )}
                    </FloatingField>

                    {/* Repetir Contraseña */}
                    <FloatingField label="Repetir Contraseña*">
                        <input
                            id="repeatPassword"
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("repeatPassword")}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        <span
                            className="absolute inset-y-0 right-3 top-0 flex cursor-pointer items-center text-xl text-gray-400 hover:text-gray-200"
                            onClick={() => setShowPassword(v => !v)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.repeatPassword}</p>
                        )}
                    </FloatingField>

                    {/* Términos */}
                    <div className="flex flex-col items-center space-x-2">
                        <div className="mb-4 flex items-center space-x-2">
                            <input
                                id="termsAccepted"
                                type="checkbox"
                                {...formik.getFieldProps("termsAccepted")}
                                className="h-4 w-4 appearance-none rounded border border-white bg-transparent checked:border-secondary checked:bg-secondary checked:accent-white focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <label htmlFor="terms" className="text-sm underline">
                                Ver Términos y Condiciones
                            </label>
                        </div>
                        <label htmlFor="terms" className="text-sm">
                            Acepto los Términos y Condiciones
                        </label>
                        {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                            <p className="text-sm text-red-400">{formik.errors.termsAccepted}</p>
                        )}
                    </div>

                    {/* Crear Cuenta */}
                    <button
                        type="submit"
                        disabled={!formik.values.termsAccepted || formik.isSubmitting}
                        className="w-full rounded-xl bg-secondary py-3 hover:bg-secondary/80 disabled:opacity-50"
                    >
                        Crear Cuenta
                    </button>

                    {/* Separador y Google */}
                    <Separador />
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-xl border border-gray-600 py-3 hover:bg-gray-700"
                    >
                        <FaGoogle className="mr-2 text-xl" />
                        Continuar con Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RRPPForm;
