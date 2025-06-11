import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventosTable from "@/components/Dashboard/GestionEventos/CrearEventos/UI/EventosTable";
import axios from "axios";
import { api_url } from "@/api/api";

interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    categoriaNombre: string;
    address: {
        street: string | null;
        city: string;
    };
    estado: string;
}

const ListarEventos: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(api_url.get_eventos_productora, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            setEvents(response.data);
            setError(null);
        } catch (error: any) {
            setError(error.response?.data?.message || "Error al cargar los eventos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleEventDeleted = () => {
        loadEvents();
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center text-red-500">
                    <p className="text-xl font-bold">{error}</p>
                    <button
                        onClick={loadEvents}
                        className="mt-4 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <EventosTable
                events={events}
                onNavigateBack={() => navigate("/dashboard")}
                onCreateEvent={() => navigate("/dashboard/crearevento")}
                onEventDeleted={handleEventDeleted}
            />
        </div>
    );
};

export default ListarEventos; 