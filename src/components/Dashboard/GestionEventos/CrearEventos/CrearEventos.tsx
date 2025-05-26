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
            <div className="grid grid-cols-1 gap-6">
                {steps[active].content}
            </div>
        </div>
    );
};

export default CrearEventos;
