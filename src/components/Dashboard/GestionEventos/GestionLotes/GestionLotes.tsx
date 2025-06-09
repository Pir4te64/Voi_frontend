import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTicketAlt, FaEdit, FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import { api_url } from "@/api/api";

interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    categoriaNombre: string;
    address: {
        street: string | null;
        city: string;
    };
    estado: string;
}

interface Lote {
    id: number;
    nombre: string;
    precio: number;
    fechaValidez: string;
    tipoComision: string;
    montoComision: number;
    estado: string;
    cantidadTickets: number;
    ticketsDisponibles: number;
    tickets: any[];
}

const GestionLotes: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loadingLotes, setLoadingLotes] = useState(false);
    const [currentView, setCurrentView] = useState<"events" | "lotes">("events");

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

    const loadLotes = async (eventId: number) => {
        try {
            setLoadingLotes(true);
            const response = await axios.get(api_url.get_lotes_evento(eventId), {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken}`,
                },
            });
            setLotes(response.data);
        } catch (error: any) {
            console.error("Error al cargar lotes:", error);
            setLotes([]);
        } finally {
            setLoadingLotes(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleEventSelect = (event: Evento) => {
        setSelectedEvent(event);
        setCurrentView("lotes");
        loadLotes(event.id);
    };

    const handleBackToEvents = () => {
        setCurrentView("events");
        setSelectedEvent(null);
        setLotes([]);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(amount);
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
            {currentView === "events" && (
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mb-4 flex items-center text-white hover:text-secondary"
                        >
                            <FaArrowLeft className="mr-2" />
                            Volver al Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-white">Gestión de Lotes</h1>
                        <p className="mt-2 text-gray-400">
                            Selecciona un evento para gestionar sus lotes de entrada
                        </p>
                    </div>

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
                                            No hay eventos disponibles
                                        </td>
                                    </tr>
                                )}

                                {events.map((event) => (
                                    <tr
                                        key={event.id}
                                        className="border-t border-gray-700 hover:bg-black/30"
                                    >
                                        <td className="px-4 py-3">{event.nombre}</td>
                                        <td className="px-4 py-3">
                                            {formatDate(event.fechaInicio)}
                                        </td>
                                        <td className="px-4 py-3">{event.categoriaNombre}</td>
                                        <td className="px-4 py-3">
                                            {event.address.street ? `${event.address.street}, ` : ""}{event.address.city}
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
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEventSelect(event)}
                                                    className="flex items-center gap-1 rounded bg-secondary px-4 py-2 text-sm text-primary transition hover:bg-secondary/80"
                                                >
                                                    <FaTicketAlt />
                                                    Ver Lotes
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {currentView === "lotes" && selectedEvent && (
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <button
                            onClick={handleBackToEvents}
                            className="mb-4 flex items-center text-white hover:text-secondary"
                        >
                            <FaArrowLeft className="mr-2" />
                            Volver a Eventos
                        </button>
                        <h1 className="text-3xl font-bold text-white">
                            Lotes de {selectedEvent.nombre}
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Gestiona los lotes de entrada para este evento
                        </p>
                    </div>

                    <div className="rounded-lg bg-black/40 p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">
                                Lotes de Entrada
                            </h2>
                            <button
                                onClick={() => {
                                    // Aquí se podría implementar la creación de nuevos lotes
                                    console.log("Crear nuevo lote");
                                }}
                                className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                            >
                                Crear Nuevo Lote
                            </button>
                        </div>

                        {loadingLotes ? (
                            <div className="flex justify-center py-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-lg bg-black/40">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-black text-gray-400">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Nombre del Lote</th>
                                            <th className="px-4 py-3 font-semibold">Precio</th>
                                            <th className="px-4 py-3 font-semibold">Total Tickets</th>
                                            <th className="px-4 py-3 font-semibold">Vendidos</th>
                                            <th className="px-4 py-3 font-semibold">Disponibles</th>
                                            <th className="px-4 py-3 font-semibold">Comisión</th>
                                            <th className="px-4 py-3 font-semibold">Validez</th>
                                            <th className="px-4 py-3 text-center font-semibold">Estado</th>
                                            <th className="px-4 py-3 text-end font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lotes.length === 0 && (
                                            <tr>
                                                <td colSpan={9} className="p-6 text-center text-gray-500">
                                                    No hay lotes configurados para este evento
                                                </td>
                                            </tr>
                                        )}

                                        {lotes.map((lote) => (
                                            <tr
                                                key={lote.id}
                                                className="border-t border-gray-700 hover:bg-black/30"
                                            >
                                                <td className="px-4 py-3">{lote.nombre}</td>
                                                <td className="px-4 py-3">
                                                    {formatCurrency(lote.precio)}
                                                </td>
                                                <td className="px-4 py-3">{lote.cantidadTickets}</td>
                                                <td className="px-4 py-3">
                                                    {lote.cantidadTickets - lote.ticketsDisponibles}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {lote.ticketsDisponibles}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">
                                                        <div>{lote.tipoComision}</div>
                                                        <div className="text-gray-400">
                                                            {formatCurrency(lote.montoComision)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">
                                                        {formatDate(lote.fechaValidez)}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-sm ${lote.estado === "ACTIVO"
                                                            ? "bg-green-500/20 text-green-500"
                                                            : "bg-red-500/20 text-red-500"
                                                            }`}
                                                    >
                                                        {lote.estado}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-end">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => {
                                                                // Aquí se implementaría la edición del lote
                                                                console.log("Editar lote:", lote.id);
                                                            }}
                                                            className="flex items-center gap-1 rounded bg-secondary px-4 py-2 text-sm text-primary transition hover:bg-secondary/80"
                                                        >
                                                            <FaPencilAlt />
                                                            Editar Lotes
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionLotes; 