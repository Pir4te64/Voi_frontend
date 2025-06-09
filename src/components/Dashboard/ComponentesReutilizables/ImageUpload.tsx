// src/components/Common/ImageUpload.tsx
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import agregarImgIcon from "@/assets/agregarimg.svg";

export interface ImageUploadProps {
    /** Texto de la etiqueta flotante sobre el recuadro */
    label: string;
    /** Callback al seleccionar un archivo válido */
    onFileSelect: (file: File, previewUrl: string) => void;
    /** Callback cuando se elimina la imagen */
    onImageDelete?: () => void;
    /** Texto o fragmento HTML adicional debajo (opcional) */
    description?: React.ReactNode;
    /** Tamaño máximo en bytes (por defecto 10 MB) */
    maxImageSize?: number;
    /** Indica si el campo es requerido */
    required?: boolean;
    /** URL de la imagen existente (opcional) */
    existingImageUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    onFileSelect,
    onImageDelete,
    description,
    maxImageSize = 10 * 1024 * 1024, // 10 MB por defecto
    required = false,
    existingImageUrl,
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Si hay una URL de imagen existente, la usamos como preview
        if (existingImageUrl) {
            setPreview(existingImageUrl);
        }
    }, [existingImageUrl]);

    /* ---------- Handlers ---------- */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxImageSize) {
            toast.error(
                `La imagen no debe pesar más de ${maxImageSize / 1024 / 1024} MB.`
            );
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onFileSelect(file, url);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evitar que se abra el selector de archivos
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onImageDelete?.();
    };

    const triggerSelect = () => fileInputRef.current?.click();

    /* ---------- Render ---------- */
    return (
        <div className="w-full">
            {/* Label flotante sobre el borde */}
            <span className="absolute z-10 -translate-y-1/2 translate-x-4 select-none rounded bg-back px-2 text-xs font-medium text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </span>

            <div
                onClick={triggerSelect}
                className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-back py-10 transition hover:border-secondary"
            >
                {preview ? (
                    <div className="relative h-full w-full">
                        <button
                            onClick={handleDelete}
                            className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                            title="Eliminar imagen"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full rounded-lg object-cover"
                        />
                    </div>
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
                    required={required}
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
