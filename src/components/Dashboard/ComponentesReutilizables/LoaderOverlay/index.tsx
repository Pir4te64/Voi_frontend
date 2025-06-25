import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoaderOverlay: React.FC = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="h-12 w-12 animate-spin text-secondary" />
            <div className="text-sm font-medium text-white">Cargando...</div>
        </div>
    </div>
);

export default LoaderOverlay; 