// src/components/LoginUser/ProductoraForm.tsx
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import Logos from "@/components/LoginUser/Logos";
import SmallLogo from "@/components/Register/SmallLogo";
import logoPequeno from "@/assets/Logo.svg";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";

interface ProductoraFormProps {
    onBack: () => void;
}

const ProductoraForm: React.FC<ProductoraFormProps> = ({ onBack }) => {
    const [razonSocial, setRazonSocial] = useState("");
    const [cuit, setCuit] = useState("");
    const [dni, setDni] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cbu, setCbu] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            razonSocial,
            cuit,
            dni,
            direccion,
            cbu,
            termsAccepted,
        };
        console.log("Payload Productora:", payload);
        // aquí podrías llamar a tu API...
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
                    {/* Botón Volver */}
                    <button
                        type="button"
                        onClick={() => {
                            setTermsAccepted(false);
                            onBack();
                        }}
                        className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 md:-top-28 md:left-6 md:h-10 md:w-10 lg:-top-4 lg:left-8 lg:h-8 lg:w-8"
                    >
                        <FaArrowLeft />
                    </button>

                    <h2 className="text-center text-3xl font-bold text-secondary md:text-4xl">
                        Registro Productora
                    </h2>

                    <FloatingField label="Nombre legal/razón social*">
                        <input
                            id="razonSocial"
                            type="text"
                            value={razonSocial}
                            onChange={(e) => setRazonSocial(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    <FloatingField label="Nº de CUIT/CUIL*">
                        <input
                            id="cuit"
                            type="text"
                            value={cuit}
                            onChange={(e) => setCuit(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    <FloatingField label="DNI del responsable*">
                        <input
                            id="dni"
                            type="text"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    <FloatingField label="Dirección legal*">
                        <input
                            id="direccion"
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

                    <FloatingField label="Nº CBU para pagos*">
                        <input
                            id="cbu"
                            type="text"
                            value={cbu}
                            onChange={(e) => setCbu(e.target.value)}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </FloatingField>

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

                    <button
                        type="submit"
                        disabled={!termsAccepted}
                        className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
                    >
                        Crear Cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductoraForm;
