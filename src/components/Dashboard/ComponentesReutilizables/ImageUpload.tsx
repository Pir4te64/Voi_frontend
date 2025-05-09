// src/components/Common/ImageUpload.tsx
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import agregarImgIcon from "@/assets/agregarimg.svg";

export interface ImageUploadProps {
    /** Texto de la etiqueta sobre el recuadro */
    label: string;
    /** Callback al seleccionar un archivo válido */
    onFileSelect: (file: File, previewUrl: string) => void;
    /** Texto o fragmento HTML para debajo del recuadro */
    description?: React.ReactNode;
    /** Tamaño máximo en bytes (por defecto 1 MB) */
    maxImageSize?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    onFileSelect,
    description,
    maxImageSize = 1 * 1024 * 1024, // 1 MB
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxImageSize) {
            toast.error(`La imagen no debe pesar más de ${maxImageSize / 1024 / 1024} MB.`);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onFileSelect(file, url);
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
                    className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-white transition hover:border-secondary"
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full rounded-lg object-cover"
                        />
                    ) : (
                        <>
                            <img
                                src={agregarImgIcon}
                                alt="Agregar"
                                className="mb-2 h-28 w-28 opacity-70"
                            />
                            <span className="text-center text-gray-400">
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

            {description && (
                <p className="mt-2 text-center text-xs text-white">{description}</p>
            )}

            <button
                type="button"
                onClick={handleUploadClick}
                className="mt-4 rounded-xl border border-white px-6 py-4 font-semibold text-white transition hover:opacity-90"
            >
                Cargar imagen
            </button>
        </div>
    );
};

export default ImageUpload;
