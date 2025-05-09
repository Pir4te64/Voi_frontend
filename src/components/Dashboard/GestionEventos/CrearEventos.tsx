// src/components/Dashboard/CrearEventos/CrearEventos.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "@/components/Dashboard/ComponentesReutilizables/ImageUpload";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";

const CrearEventos: React.FC = () => {
    const [sliderImage, setSliderImage] = useState<File | null>(null);
    const [eventImage, setEventImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sliderImage) {
            toast.error("Debes cargar la imagen para los eventos");
            return;
        }
        if (!eventImage) {
            toast.error("Debes cargar la imagen del Evento");
            return;
        }
        // lógica de envío…
    };

    return (
        <div className="rounded-lg bg-primary p-6 text-white">
            <h2 className="mb-6 text-2xl font-semibold text-secondary">
                Crear Evento
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* IZQUIERDA: Formulario */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <FloatingField label="Nombre del Evento">
                        <input
                            type="text"
                            placeholder=" "
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <FloatingField label="Descripción">
                        <textarea
                            rows={4}
                            placeholder=" "
                            className="w-full resize-none rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <FloatingField label="Fecha de Inicio">
                        <input
                            type="date"
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <FloatingField label="Fecha de Finalización">
                        <input
                            type="date"
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <FloatingField label="Lugar">
                        <input
                            type="text"
                            placeholder=" "
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <FloatingField label="Categoría">
                        <select
                            defaultValue=""
                            className="w-full appearance-none rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
                        >
                            <option value="" disabled hidden>
                                Selecciona categoría
                            </option>
                            <option>Concierto</option>
                            <option>Festival</option>
                            <option>Charla</option>
                            {/* …otras categorías */}
                        </select>
                    </FloatingField>

                    <FloatingField label="Link a Red Social 1">
                        <input
                            type="url"
                            placeholder=" "
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <FloatingField label="Link a Red Social 2 (opcional)">
                        <input
                            type="url"
                            placeholder=" "
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                        />
                    </FloatingField>

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-secondary py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Crear Evento
                    </button>
                </form>

                {/* DERECHA: Imágenes */}
                <div className="space-y-6">
                    <ImageUpload
                        label="Imagen para el Slider Home"
                        description={
                            <>
                                La imagen debe tener 1920 x 1080 px
                                <br />
                                con un peso máximo de 5 Mb.
                            </>
                        }
                        maxImageSize={5 * 1024 * 1024}
                        onFileSelect={(file) => setSliderImage(file)}
                    />

                    <ImageUpload
                        label="Imagen del Evento"
                        description={
                            <>
                                La imagen debe tener 1080 x 1350 px
                                <br />
                                con un peso máximo de 5 Mb.
                            </>
                        }
                        maxImageSize={5 * 1024 * 1024}
                        onFileSelect={(file) => setEventImage(file)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CrearEventos;
