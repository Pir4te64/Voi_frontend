// src/components/Dashboard/CrearEventos/CrearEventos.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "../ComponentesReutilizables/ImageUpload";
import { FloatingField } from "../ComponentesReutilizables/FloatingField";

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
        <div className="bg-primary rounded-lg p-6 text-white">
            <h2 className="text-secondary text-2xl font-semibold mb-6">
                Crear Evento
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* IZQUIERDA: Formulario */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <FloatingField label="Nombre del Evento">
                        <input
                            type="text"
                            placeholder=" "
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 pt-6 pb-2
                focus:outline-none focus:border-secondary
                transition
              "
                        />
                    </FloatingField>

                    <FloatingField label="Descripción">
                        <textarea
                            rows={4}
                            placeholder=" "
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 pt-6 pb-2
                focus:outline-none focus:border-secondary
                resize-none transition
              "
                        />
                    </FloatingField>

                    <FloatingField label="Fecha de Inicio">
                        <input
                            type="date"
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 py-4
                focus:outline-none focus:border-secondary
                transition
              "
                        />
                    </FloatingField>

                    <FloatingField label="Fecha de Finalización">
                        <input
                            type="date"
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 py-4
                focus:outline-none focus:border-secondary
                transition
              "
                        />
                    </FloatingField>

                    <FloatingField label="Lugar">
                        <input
                            type="text"
                            placeholder=" "
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 pt-6 pb-2
                focus:outline-none focus:border-secondary
                transition
              "
                        />
                    </FloatingField>

                    <FloatingField label="Categoría">
                        <select
                            defaultValue=""
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 py-4
                focus:outline-none focus:border-secondary
                appearance-none transition
              "
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
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 pt-6 pb-2
                focus:outline-none focus:border-secondary
                transition
              "
                        />
                    </FloatingField>

                    <FloatingField label="Link a Red Social 2 (opcional)">
                        <input
                            type="url"
                            placeholder=" "
                            className="
                w-full bg-back border border-gray-700 rounded-xl
                px-3 pt-6 pb-2
                focus:outline-none focus:border-secondary
                transition
              "
                        />
                    </FloatingField>

                    <button
                        type="submit"
                        className="
              mt-4 w-full bg-secondary text-white font-semibold
              py-3 rounded-xl hover:opacity-90 transition
            "
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
