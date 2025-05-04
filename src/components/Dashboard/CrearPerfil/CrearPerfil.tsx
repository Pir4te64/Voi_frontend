// src/components/Dashboard/CrearPerfil/CrearPerfil.tsx
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import agregarImgIcon from "@/assets/agregarimg.svg";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

const CrearPerfil: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & { files: FileList };
    }

    const handleFileChange = (e: FileChangeEvent): void => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error("La imagen no debe pesar más de 1 MB.");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // lógica de envío…
    };
    const FloatingField: React.FC<{
        label: string;
        children: React.ReactNode;
    }> = ({ label, children }) => (
        <div className="relative group">
            <label
                className="
              absolute left-3 top-1/2 transform -translate-y-1/2
              bg-back px-1 text-gray-400 transition-all
              group-focus-within:-top-2 group-focus-within:translate-y-0
              group-focus-within:text-xs group-focus-within:text-secondary
              pointer-events-none
            "
            >
                {label}
            </label>
            {children}
        </div>
    );

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-back rounded-lg p-6 text-white">
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
                    <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-xs">
                            {/* Label flotante sobre el borde superior */}
                            <label
                                className="
                  absolute left-3 -top-2
                  bg-back px-1 text-white text-sm
                "
                            >
                                Foto de Perfil
                            </label>

                            <div
                                onClick={handleUploadClick}
                                className="
                  w-full h-80 border-2 border-white rounded-lg
                  flex flex-col items-center justify-center cursor-pointer
                  hover:border-secondary transition
                "
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={agregarImgIcon}
                                            alt="Agregar"
                                            className="w-28 h-28 mb-2 opacity-70"
                                        />
                                        <span className="text-gray-400 text-center">
                                            Clic aquí para elegir imagen
                                        </span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <p className="text-xs text-white mt-2 text-center">
                            La imagen debe tener 400 x 400 px
                            <br />
                            con un peso máximo de 1 Mb.
                        </p>

                        <button
                            onClick={handleUploadClick}
                            className="
                mt-4 border border-secondary text-white font-semibold
                px-6 py-4 rounded-xl hover:opacity-90 transition
              "
                        >
                            Cargar imagen
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrearPerfil;
