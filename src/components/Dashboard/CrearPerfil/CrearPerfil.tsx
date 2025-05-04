// src/components/Dashboard/CrearPerfil/CrearPerfil.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "../ComponentesReutilizables/ImageUpload";
import { FloatingField } from "../ComponentesReutilizables/FloatingField";

const CrearPerfil: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes usar `selectedFile` al enviar el formulario
        if (!selectedFile) {
            toast.error("Debes cargar una imagen de perfil");
            return;
        }
        // lógica de envío…
    };


    return (
        <>
            <div className="bg-primary rounded-lg p-6 text-white">
                <h2 className="text-secondary text-2xl font-semibold mb-6">
                    Crear Perfil
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* IZQUIERDA: Formulario */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <FloatingField label="Nombre de Productora">
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

                        <FloatingField label="Ubicación">
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
                                    Selecciona ubicación
                                </option>
                                <option>Buenos Aires</option>
                                <option>Córdoba</option>
                                <option>Mendoza</option>
                            </select>
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
                                <option>Productora</option>
                                <option>Organizador</option>
                                <option>Promotor</option>
                            </select>
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

                        <FloatingField label="Número de Teléfono">
                            <input
                                type="tel"
                                placeholder=" "
                                className="
                  w-full bg-back border border-gray-700 rounded-xl
                  px-3 pt-6 pb-2
                  focus:outline-none focus:border-secondary
                  transition
                "
                            />
                        </FloatingField>

                        <FloatingField label="Email">
                            <input
                                type="email"
                                placeholder=" "
                                className="
                  w-full bg-back border border-gray-700 rounded-xl
                  px-3 pt-6 pb-2
                  focus:outline-none focus:border-secondary
                  transition
                "
                            />
                        </FloatingField>

                        <FloatingField label="Restablecer contraseña">
                            <input
                                type="password"
                                placeholder=" "
                                className="
                  w-full bg-back border border-gray-700 rounded-xl
                  px-3 pt-6 pb-2
                  focus:outline-none focus:border-secondary
                  transition
                "
                            />
                        </FloatingField>

                        <FloatingField label="Volver a ingresar contraseña">
                            <input
                                type="password"
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
                            Crear Perfil
                        </button>
                    </form>

                    {/* DERECHA: Carga de Foto de Perfil */}
                    <ImageUpload
                        label="Foto de Perfil"
                        description={
                            <>
                                La imagen debe tener 400 x 400 px
                                <br />
                                con un peso máximo de 1 Mb.
                            </>
                        }
                        onFileSelect={(file, previewUrl) => {
                            setSelectedFile(file);
                            // si necesitas previewUrl para mostrarlo en otro lugar, lo guardas aquí
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default CrearPerfil;
