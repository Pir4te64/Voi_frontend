import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Evento } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";
import AsignarRevendedor from "@/components/Dashboard/GestionEventos/AsignarRevendedor/AsignarRevendedor";

interface RevendedoresUIProps {
    selectedEvent: Evento;
    handleBackToEvents: () => void;
}

const RevendedoresUI: React.FC<RevendedoresUIProps> = ({
    selectedEvent,
    handleBackToEvents,
}) => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-4 sm:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={handleBackToEvents}
                        className="mb-4 flex items-center text-sm text-white hover:text-secondary sm:text-base"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver a Gestión
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-secondary sm:text-3xl">
                            Revendedores de {selectedEvent.nombre}
                        </h1>
                        <p className="mt-2 text-sm text-gray-400 sm:text-base">
                            Gestiona los revendedores asignados a este evento
                        </p>
                    </div>
                </div>

                {/* Componente AsignarRevendedor */}
                <div className="rounded-lg bg-[#1C1C1E] p-4 sm:p-6">
                    <AsignarRevendedor
                        eventId={selectedEvent.id}
                        eventName={selectedEvent.nombre}
                    />
                </div>
            </div>
        </div>
    );
};

export default RevendedoresUI; 