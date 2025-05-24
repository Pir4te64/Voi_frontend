// src/components/LoginUser/UsuarioForm.tsx
import React from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Logos from "@/components/LoginUser/Logos";
import Separador from "@/components/LoginUser/Separador";
import SmallLogo from "@/components/Register/SmallLogo";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import logoPequeno from "@/assets/Logo.svg";

import { useLoginUsuarioRegular } from "@/components/Register/storeLogin/useLoginUsuarioRegular";

interface UsuarioFormProps {
    onBack: () => void;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ onBack }) => {
    const { showPassword, setShowPassword, formik } = useLoginUsuarioRegular();
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = formik;

    return (
        <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
            <Logos />
            <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
                <SmallLogo src={logoPequeno} />

                <form
                    onSubmit={handleSubmit}
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
                    <FloatingField label="Nombre*" htmlFor="name">
                        <input
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {touched.name && errors.name && (
                            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                    </FloatingField>

                    {/* Apellido */}
                    <FloatingField label="Apellido*" htmlFor="apellido">
                        <input
                            id="apellido"
                            name="apellido"
                            value={values.apellido}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {touched.apellido && errors.apellido && (
                            <p className="mt-1 text-sm text-red-400">{errors.apellido}</p>
                        )}
                    </FloatingField>

                    {/* Email */}
                    <FloatingField label="Email*" htmlFor="email">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {touched.email && errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                    </FloatingField>

                    {/* Contraseña */}
                    <FloatingField label="Contraseña*" htmlFor="password">
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-400 hover:text-gray-200"
                                onClick={() => setShowPassword(v => !v)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {touched.password && errors.password && (
                            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                        )}
                    </FloatingField>

                    {/* Repetir Contraseña */}
                    <FloatingField label="Repetir Contraseña*" htmlFor="repeatPassword">
                        <div className="relative">
                            <input
                                id="repeatPassword"
                                name="repeatPassword"
                                type={showPassword ? "text" : "password"}
                                value={values.repeatPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-400 hover:text-gray-200"
                                onClick={() => setShowPassword(v => !v)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {touched.repeatPassword && errors.repeatPassword && (
                            <p className="mt-1 text-sm text-red-400">{errors.repeatPassword}</p>
                        )}
                    </FloatingField>

                    {/* Términos y Condiciones */}
                    <div className="flex flex-col items-center space-x-2">
                        <div className="mb-4 flex items-center space-x-2">
                            <input
                                id="termsAccepted"
                                name="termsAccepted"
                                type="checkbox"
                                checked={values.termsAccepted}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="h-4 w-4 appearance-none rounded border border-white bg-transparent checked:border-secondary checked:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <label htmlFor="termsAccepted" className="text-sm underline">
                                Ver Términos y Condiciones
                            </label>
                        </div>
                        <label htmlFor="termsAccepted" className="text-sm">
                            Acepto los Términos y Condiciones
                        </label>
                        {touched.termsAccepted && errors.termsAccepted && (
                            <p className="text-sm text-red-400">{errors.termsAccepted}</p>
                        )}
                    </div>

                    {/* Crear Cuenta */}
                    <button
                        type="submit"
                        disabled={!values.termsAccepted || isSubmitting}
                        className="w-full rounded-xl bg-secondary py-3 hover:bg-secondary/80 disabled:opacity-50"
                    >
                        {isSubmitting ? "Registrando…" : "Crear Cuenta"}
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

export default UsuarioForm;
