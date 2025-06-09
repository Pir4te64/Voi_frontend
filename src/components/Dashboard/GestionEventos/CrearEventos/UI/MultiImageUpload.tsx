// src/components/Common/GalleryUpload.tsx
import ImageUpload from "@/components/Dashboard/ComponentesReutilizables/ImageUpload";
import React from "react";

export interface GalleryUploadProps {
    /** Callback global que recibe el índice y los datos de la imagen */
    onSlotChange: (index: number, file: File, preview: string) => void;
    /** URLs de imágenes existentes */
    existingImages?: string[];
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({ onSlotChange, existingImages = [] }) => {
    const boxes = Array.from({ length: 4 });

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {boxes.map((_, i) => (
                <ImageUpload
                    key={i}
                    label={`Galería (${i + 1})`}
                    maxImageSize={10 * 1024 * 1024}
                    description="PNG, JPG (hasta 10 MB) - Opc. de Formato 4:3 · 16:9 · 1:1."
                    onFileSelect={(file, preview) => onSlotChange(i, file, preview)}
                    existingImageUrl={existingImages[i]}
                />
            ))}
        </div>
    );
};

export default GalleryUpload;
