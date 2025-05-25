// src/components/Dashboard/CrearEventos/CrearEventos.tsx
import React from "react";
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

    return (
        <div className="rounded-lg bg-primary p-6 text-white">
            <h2 className="mb-6 text-2xl font-semibold text-secondary">
                Crear Evento
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <EventoForm
                    resetKey={resetKey}
                    sliderImage={sliderImage}
                    setSliderImage={setSliderImage}
                    eventImages={eventImages}
                    setEventImages={setEventImages}
                    formik={formik}
                    categories={categories}
                />
            </div>
        </div>
    );
};

export default CrearEventos;
