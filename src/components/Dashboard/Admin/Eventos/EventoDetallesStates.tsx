import React from "react";
import { useNavigate } from "react-router-dom";

interface EventoDetallesStatesProps {
    loading: boolean;
    error: string | null;
    evento: any | null;
}

const EventoDetallesStates: React.FC<EventoDetallesStatesProps> = ({ loading, error, evento }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md rounded-lg bg-red-500/10 p-6 text-center text-red-500">
                    <p className="mb-2 text-lg font-semibold">Error</p>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate("/dashboard/eventos")}
                        className="mt-4 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        Volver a Eventos
                    </button>
                </div>
            </div>
        );
    }

    if (!evento) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="mb-4 text-xl text-gray-400">Evento no encontrado</p>
                    <button
                        onClick={() => navigate("/dashboard/eventos")}
                        className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        Volver a Eventos
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default EventoDetallesStates; 