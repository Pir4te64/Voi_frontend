// src/components/LoginUser/UsuarioForm.tsx
import React from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import Logos from "@/components/LoginUser/Logos";
import Separador from "@/components/LoginUser/Separador";
import SmallLogo from "./SmallLogo";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import logoPequeno from "@/assets/Logo.svg";

import useUsuarioFormStore from "@/components/Register/storeLogin/useUsuarioFormStore";

interface UsuarioFormProps {
    onBack: () => void;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ onBack }) => {
    const {
        name,
        apellido,
        email,
        password,
        repeatPassword,
        termsAccepted,
        setName,
        setApellido,
        setEmail,
        setPassword,
        setRepeatPassword,
        setTermsAccepted,
        reset,
    } = useUsuarioFormStore();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            apellido,
            email,
            password,
            repeatPassword,
            termsAccepted,
        };
        console.log("Payload a enviar:", payload);
        // aquí llamas a tu API...
        reset();
    };

    return (
        <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
            <Logos />
            <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
                <SmallLogo src={logoPequeno} />

                <form
                    onSubmit={handleSubmit}
                    className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
                >
                    {/* Botón Volver interno */}
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            onBack();
                        }}
                        className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 md:-top-28 md:left-6 md:h-10 md:w-10 lg:-top-4 lg:left-8 lg:h-8 lg:w-8"
                    >
                        <FaArrowLeft />
                    </button>

                    <h2 className="text-center text-3xl font-bold text-secondary md:text-6xl">
                        Registrate
                    </h2>

                    {/* Nombre */}
                    <FloatingField label="Nombre*">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    {/* Apellido */}
                    <FloatingField label="Apellido*">
                        <input
                            id="apellido"
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    {/* Email */}
                    <FloatingField label="Email*">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    {/* Contraseña */}
                    <FloatingField label="Contraseña*">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        <span
                            className="absolute inset-y-0 right-3 top-0 flex cursor-pointer items-center text-xl text-gray-400 hover:text-gray-200"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </FloatingField>

                    {/* Repetir contraseña */}
                    <FloatingField label="Repetir Contraseña*">
                        <input
                            id="repeat-password"
                            type={showPassword ? "text" : "password"}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        <span
                            className="absolute inset-y-0 right-3 top-0 flex cursor-pointer items-center text-xl text-gray-400 hover:text-gray-200"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </FloatingField>

                    {/* Términos */}
                    <div className="flex flex-col items-center justify-center space-x-2">
                        <div className="mb-4 flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="h-4 w-4 appearance-none rounded border border-white bg-transparent checked:border-secondary checked:bg-secondary checked:accent-white focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <label htmlFor="terms" className="text-sm underline">
                                Ver Términos y Condiciones
                            </label>
                        </div>
                        <label htmlFor="terms" className="text-sm">
                            Acepto los Términos y Condiciones
                        </label>
                    </div>

                    {/* Crear Cuenta */}
                    <button
                        type="submit"
                        disabled={!termsAccepted}
                        className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
                    >
                        Crear Cuenta
                    </button>

                    {/* Separador y Google */}
                    <Separador />
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-xl border border-gray-600 py-3 transition hover:bg-gray-700"
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
