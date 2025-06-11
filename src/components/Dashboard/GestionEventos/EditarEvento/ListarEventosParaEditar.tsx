import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaArrowLeft, FaEdit, FaPencilAlt } from "react-icons/fa";
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

const ListarEventosParaEditar: React.FC = () => {
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

    const handleEditEvent = (event: Evento) => {
        console.log('Evento a editar:', event);
        navigate(`/dashboard/editarevento/${event.id}`, {
            state: { eventoData: event }
        });
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
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mb-4 flex items-center text-white hover:text-secondary"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver al Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-white">Editar Eventos</h1>
                    <p className="mt-2 text-gray-400">Selecciona un evento para editarlo</p>
                </div>

                {/* Lista de eventos */}
                <div className="overflow-x-auto rounded-lg bg-black/40">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-black text-gray-400">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Nombre del Evento</th>
                                <th className="px-4 py-3 font-semibold">Fecha</th>
                                <th className="px-4 py-3 font-semibold">Categoría</th>
                                <th className="px-4 py-3 font-semibold">Ubicación</th>
                                <th className="px-4 py-3 text-center font-semibold">Estado</th>
                                <th className="px-4 py-3 text-end font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-gray-500">
                                        No hay eventos disponibles para editar
                                    </td>
                                </tr>
                            )}

                            {events.map((event) => (
                                <tr
                                    key={event.id}
                                    className="border-t border-gray-700 hover:bg-black/30"
                                >
                                    <td className="px-4 py-3 text-white">{event.nombre}</td>
                                    <td className="px-4 py-3 text-white">
                                        {format(new Date(event.fechaInicio), "PPP", { locale: es })}
                                    </td>
                                    <td className="px-4 py-3 text-white">{event.categoriaNombre}</td>
                                    <td className="px-4 py-3 text-white">
                                        {event.address.street}, {event.address.city}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${event.estado === "ACTIVO"
                                                ? "bg-green-500/20 text-green-500"
                                                : "bg-red-500/20 text-red-500"
                                                }`}
                                        >
                                            {event.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <button
                                            onClick={() => handleEditEvent(event)}
                                            className="flex items-center gap-2 rounded px-4 py-2 text-sm text-white hover:bg-secondary/80"
                                        >
                                            <FaPencilAlt className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListarEventosParaEditar; 