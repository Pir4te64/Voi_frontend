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
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBackToEvents}
                        className="mb-4 flex items-center text-white hover:text-secondary"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver a Gestión
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">
                            Revendedores de {selectedEvent.nombre}
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Gestiona los revendedores asignados a este evento
                        </p>
                    </div>
                </div>

                {/* Componente AsignarRevendedor */}
                <div className="rounded-lg bg-[#1C1C1E] p-6">
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