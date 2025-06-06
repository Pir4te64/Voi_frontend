// src/components/Common/ImageUpload.tsx
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import agregarImgIcon from "@/assets/agregarimg.svg";

export interface ImageUploadProps {
    /** Texto de la etiqueta flotante sobre el recuadro */
    label: string;
    /** Callback al seleccionar un archivo válido */
    onFileSelect: (file: File, previewUrl: string) => void;
    /** Texto o fragmento HTML adicional debajo (opcional) */
    description?: React.ReactNode;
    /** Tamaño máximo en bytes (por defecto 10 MB) */
    maxImageSize?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    onFileSelect,
    description,
    maxImageSize = 10 * 1024 * 1024, // 10 MB por defecto
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    /* ---------- Handlers ---------- */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxImageSize) {
            toast.error(
                `La imagen no debe pesar más de ${maxImageSize / 1024 / 1024} MB.`
            );
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onFileSelect(file, url);
    };

    const triggerSelect = () => fileInputRef.current?.click();

    /* ---------- Render ---------- */
    return (
        <div className="w-full">
            {/* Label flotante sobre el borde */}
            <span className="absolute z-10 -translate-y-1/2 translate-x-4 select-none rounded bg-back px-2 text-xs font-medium text-white">
                {label}
            </span>

            <div
                onClick={triggerSelect}
                className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-back py-10 transition hover:border-secondary"
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
                            className="mb-4 h-16 w-16 opacity-70 md:h-28 md:w-28"
                        />
                        <p className="md:text-md mb-1 text-center text-base font-semibold text-white">
                            <span className="font-bold">Sube una imagen</span> o arrástrala y
                            suéltala
                        </p>
                        {description && <p className="text-center text-[10px] text-gray-300 md:text-xs">{description}</p>}
                    </>
                )}

                <input
                    type="file"
                    required
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default ImageUpload;
