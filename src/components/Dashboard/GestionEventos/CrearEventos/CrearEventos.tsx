// src/components/Dashboard/CrearEventos/CrearEventos.tsx
import React, { useState } from "react";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/EventForm";
import { useCrearEventoForm } from "@/components/Dashboard/GestionEventos/CrearEventos/store/useCrearEventoForm";

const CrearEventos: React.FC = () => {
    const {
        resetKey,
        sliderImage,
        setSliderImage,
        eventImages,
        setEventImages,
        formik,
        categories,
    } = useCrearEventoForm();

    /* paso actual (0-based) */
    const [active, setActive] = useState(0);

    /* lista de pasos (label + contenido) */
    const steps = [
        {
            label: "Detalles del Evento",
            content: (
                <EventoForm
                    resetKey={resetKey}
                    sliderImage={sliderImage}
                    setSliderImage={setSliderImage}
                    eventImages={eventImages}
                    setEventImages={setEventImages}
                    formik={formik}
                    categories={categories}
                />
            ),
        },
        { label: "Lotes de Entrada", content: <div className="p-6">Paso 2</div> },
        { label: "Revendedores", content: <div className="p-6">Paso 3</div> },
    ];

    const nextStep = () => setActive((p) => Math.min(p + 1, steps.length - 1));
    const prevStep = () => setActive((p) => Math.max(p - 1, 0));

    return (
        <div className="rounded-lg bg-primary p-6 text-white">
            <h2 className="mb-6 text-2xl font-semibold text-secondary">
                Crear Evento
            </h2>

            {/* ---------- Pestañas ---------- */}
            <div className="mb-8 flex gap-4 rounded-lg bg-black/40 p-2">
                {steps.map(({ label }, idx) => (
                    <button
                        key={label}
                        onClick={() => setActive(idx)}
                        className={`whitespace-nowrap rounded px-6 py-4 text-md font-semibold transition
              ${active === idx
                                ? "bg-secondary text-black font-bold"
                                : "bg-black hover:bg-gray-800 font-normal"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* ---------- Contenido ---------- */}
            <div className="grid grid-cols-1 gap-6">{steps[active].content}</div>

            {/* ---------- Navegación abajo ---------- */}
            <div className="mt-8 flex justify-end gap-4">
                <button
                    onClick={prevStep}
                    disabled={active === 0}
                    className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Volver
                </button>

                <button
                    onClick={nextStep}
                    disabled={active === steps.length - 1}
                    className="rounded-xl bg-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default CrearEventos;
