import React from "react";
import { FaTimes, FaMapMarkerAlt } from "react-icons/fa";

interface MapModalProps {
    isOpen: boolean;
    onClose: () => void;
    latitude: number;
    longitude: number;
    address?: {
        street?: string | null;
        city?: string | null;
        state?: string | null;
    };
    eventName: string;
}

const MapModal: React.FC<MapModalProps> = ({
    isOpen,
    onClose,
    latitude,
    longitude,
    address,
    eventName
}) => {
    if (!isOpen) return null;

    const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`;

    const fullAddress = [
        address?.street,
        address?.city,
        address?.state
    ].filter(Boolean).join(", ");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl rounded-xl bg-[#18181b] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-700 p-6">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-2xl text-secondary" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Ubicación del Evento</h2>
                            <p className="text-sm text-gray-400">{eventName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-700 hover:text-white"
                        title="Cerrar"
                    >
                        <FaTimes className="h-5 w-5" />
                    </button>
                </div>

                {/* Contenido del mapa */}
                <div className="p-6">
                    {/* Información de dirección */}
                    {fullAddress && (
                        <div className="mb-4 rounded-lg bg-gray-800/50 p-4">
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                                Dirección
                            </h3>
                            <p className="text-white">{fullAddress}</p>
                        </div>
                    )}

                    {/* Mapa embebido */}
                    <div className="relative h-96 w-full overflow-hidden rounded-lg">
                        <iframe
                            src={mapsUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Mapa de ${eventName}`}
                        />
                    </div>

                    {/* Botón para abrir en Google Maps */}
                    <div className="mt-4 flex justify-center">
                        <a
                            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-black transition hover:bg-secondary/90"
                        >
                            <FaMapMarkerAlt />
                            Abrir en Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapModal; 