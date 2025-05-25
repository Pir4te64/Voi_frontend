// src/components/Dashboard/ComponentesReutilizables/MultiImageUpload.tsx
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import agregarImgIcon from "@/assets/agregarimg.svg";

export interface MultiImageUploadProps {
    /** Texto de la etiqueta sobre el recuadro */
    label: string;
    /** Callback al seleccionar archivos válidos */
    onFilesSelect: (files: File[], previewUrls: string[]) => void;
    /** Texto o fragmento HTML para debajo del recuadro */
    description?: React.ReactNode;
    /** Tamaño máximo en bytes (por defecto 5 MB) */
    maxImageSize?: number;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
    label,
    onFilesSelect,
    description,
    maxImageSize = 5 * 1024 * 1024, // 5 MB
}) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;

        // Validar tamaños
        for (const file of files) {
            if (file.size > maxImageSize) {
                toast.error(`La imagen "${file.name}" no debe pesar más de ${maxImageSize / 1024 / 1024} MB.`);
                return;
            }
        }

        // Crear vistas previas
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
        onFilesSelect(files, urls);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs">
                <label className="absolute -top-2 left-3 bg-back px-1 text-sm text-white">
                    {label}
                </label>

                <div
                    onClick={handleUploadClick}
                    className="flex h-80 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-white transition hover:border-secondary"
                >
                    {previews.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 p-2">
                            {previews.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`preview-${i}`}
                                    className="h-24 w-24 flex-shrink-0 rounded object-cover"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="m-auto flex flex-col items-center justify-center">
                            <img
                                src={agregarImgIcon}
                                alt="Agregar"
                                className="mb-2 h-28 w-28 opacity-70"
                            />
                            <span className="text-center text-gray-400">
                                Clic aquí para elegir imágenes
                            </span>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>

            {description && (
                <p className="mt-2 text-center text-xs text-white">{description}</p>
            )}

            <button
                type="button"
                onClick={handleUploadClick}
                className="mt-4 rounded-xl border border-white px-6 py-4 font-semibold text-white transition hover:opacity-90"
            >
                Cargar imágenes
            </button>
        </div>
    );
};

export default MultiImageUpload;
