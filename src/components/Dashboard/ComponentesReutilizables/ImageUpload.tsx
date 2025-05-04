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
                <label className="absolute left-3 -top-2 bg-back px-1 text-white text-sm">
                    {label}
                </label>

                <div
                    onClick={handleUploadClick}
                    className="
            w-full h-80 border-2 border-white rounded-lg
            flex flex-col items-center justify-center
            cursor-pointer hover:border-secondary transition
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

            {description && (
                <p className="text-xs text-white mt-2 text-center">{description}</p>
            )}

            <button
                type="button"
                onClick={handleUploadClick}
                className="
          mt-4 border border-white text-white font-semibold
          px-6 py-4 rounded-xl hover:opacity-90 transition
        "
            >
                Cargar imagen
            </button>
        </div>
    );
};

export default ImageUpload;
