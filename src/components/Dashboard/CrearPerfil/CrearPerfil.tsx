// src/components/Dashboard/CrearPerfil/CrearPerfil.jsx
import React, { useRef, useState } from "react";
import agregarImgIcon from "@/assets/agregarimg.svg";

const CrearPerfil = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & { files: FileList };
    }

    const handleFileChange = (e: FileChangeEvent): void => {
        const file = e.target.files[0];
        if (!file) return;
        // opcional: validar tamaño y dimensiones aquí
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // aquí recolectas el formulario y envías al servidor
    };

    return (
        <div className=" rounded-lg p-6 text-white">
            <h2 className="text-secondary text-2xl font-semibold mb-6">
                Crear Perfil
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                {/* Formulario */}
                <form className="space-y-4 " onSubmit={handleSubmit}>
                    {/* Nombre de Productora */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Nombre de Productora
                        </label>
                        <input
                            type="text"
                            placeholder="VOI"
                            className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {/* Ubicación */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Ubicación</label>
                        <select className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary">
                            <option>Selecciona ubicación</option>
                            <option>Buenos Aires</option>
                            <option>Córdoba</option>
                            <option>Mendoza</option>
                        </select>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Categoría</label>
                        <select className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary">
                            <option>Selecciona categoría</option>
                            <option>Productora</option>
                            <option>Organizador</option>
                            <option>Promotor</option>
                        </select>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Descripción</label>
                        <textarea
                            rows={4}
                            placeholder="Escribe una breve descripción..."
                            className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Número de Teléfono
                        </label>
                        <input
                            type="tel"
                            placeholder="+54 9 11 1234-5678"
                            className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="usuario@ejemplo.com"
                            className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Restablecer contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {/* Repetir contraseña */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Volver a ingresar contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full bg-back border  rounded-xl px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {/* Botón Crear Perfil */}
                    <button
                        type="submit"
                        className="mt-6 w-full bg-secondary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
                    >
                        Crear Perfil
                    </button>
                </form>

                {/* Cargar Foto de Perfil */}
                <div className="flex flex-col items-center justify-start">
                    <label className="block text-sm text-gray-300 mb-2">Foto de Perfil</label>
                    <div
                        onClick={handleUploadClick}
                        className="w-full max-w-80 h-80 border-2 border-white rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-secondary transition"
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
                                <span className="text-gray-400">
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
                    <p className="text-xs text-white mt-2 text-center">
                        La imagen debe tener 400 x 400 px<br />con un peso máximo de 1 Mb.
                    </p>
                    <button
                        onClick={handleUploadClick}
                        className="mt-4 border text-white font-semibold px-6 py-4 rounded-xl hover:opacity-90 transition"
                    >
                        Cargar imagen
                    </button>
                </div>
            </div >
        </div >
    );
};

export default CrearPerfil;
