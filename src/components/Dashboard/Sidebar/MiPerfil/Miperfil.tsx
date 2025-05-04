// src/components/Dashboard/MiPerfil/Miperfil.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import ImageUpload from "@/components/Dashboard/ComponentesReutilizables/ImageUpload";


const Miperfil: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error("Debes cargar una foto de perfil");
            return;
        }
        // Aquí tu lógica de guardado/actualización de perfil,
        // con los valores de los inputs y `selectedFile`.
    };

    return (
        <>
            <div className="bg-primary rounded-lg p-6 text-white">
                <h2 className="text-secondary text-2xl font-semibold mb-6">
                    Mi Perfil
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* IZQUIERDA: Formulario */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <FloatingField label="Nombre y Apellido">
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

                        <FloatingField label="Teléfono de contacto">
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

                        <FloatingField label="Provincia / Localidad">
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
                            Guardar Perfil
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
                        onFileSelect={(file) => setSelectedFile(file)}
                    />
                </div>
            </div>
        </>
    );
};

export default Miperfil;
