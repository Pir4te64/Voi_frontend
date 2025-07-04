import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useMapModal } from "@/components/Dashboard/Admin/Eventos/hooks/useMapModal";
import MapModal from "@/components/Dashboard/Admin/Eventos/MapModal";

interface MapButtonProps {
    latitude: string;
    longitude: string;
    address?: {
        street?: string | null;
        city?: string | null;
        state?: string | null;
    };
    eventName: string;
    className?: string;
    children?: React.ReactNode;
}

const MapButton: React.FC<MapButtonProps> = ({
    latitude,
    longitude,
    address,
    eventName,
    className = "flex items-center gap-1 text-sm font-semibold text-red-400 hover:underline",
    children
}) => {
    const { isMapModalOpen, openMapModal, closeMapModal } = useMapModal();

    // Verificar si hay coordenadas válidas
    const hasValidCoordinates = latitude && longitude &&
        !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

    if (!hasValidCoordinates) {
        return null;
    }

    return (
        <>
            <button
                onClick={openMapModal}
                className={className}
                title="Ver ubicación en el mapa"
            >
                <FaMapMarkerAlt />
                {children || "Ver Mapa"}
            </button>

            <MapModal
                isOpen={isMapModalOpen}
                onClose={closeMapModal}
                latitude={parseFloat(latitude)}
                longitude={parseFloat(longitude)}
                address={address}
                eventName={eventName}
            />
        </>
    );
};

export default MapButton; 