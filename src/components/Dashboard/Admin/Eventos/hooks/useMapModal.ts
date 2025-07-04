import { useState } from 'react';

interface UseMapModalReturn {
    isMapModalOpen: boolean;
    openMapModal: () => void;
    closeMapModal: () => void;
    toggleMapModal: () => void;
}

export const useMapModal = (): UseMapModalReturn => {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    const openMapModal = () => setIsMapModalOpen(true);
    const closeMapModal = () => setIsMapModalOpen(false);
    const toggleMapModal = () => setIsMapModalOpen(prev => !prev);

    return {
        isMapModalOpen,
        openMapModal,
        closeMapModal,
        toggleMapModal
    };
}; 