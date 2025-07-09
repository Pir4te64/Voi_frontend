import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { api_url } from "@/api/api";
import EventosUI from "@/components/Dashboard/ProductoraRevendedores/UI/EventosUI";
import RevendedoresUI from "@/components/Dashboard/ProductoraRevendedores/UI/RevendedoresUI";
import { Evento } from "@/components/Dashboard/GestionLotes/EditarLote/data/interfaces";

const ProductoraRevendedores: React.FC = () => {
    const [events, setEvents] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
    const [currentView, setCurrentView] = useState<"events" | "revendedores">("events");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(api_url.get_eventos_productora, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).accessToken
                        }`,
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

    const handleEventSelect = (event: Evento) => {
        setSelectedEvent(event);
        setCurrentView("revendedores");
    };

    const handleBackToEvents = () => {
        setCurrentView("events");
        setSelectedEvent(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Filtrar eventos basado en el término de búsqueda
    const filteredEvents = useMemo(() => {
        if (!searchTerm.trim()) return events;
        return events.filter((event) =>
            event.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    // Calcular paginación
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    // Resetear página cuando cambie la búsqueda
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-secondary sm:h-32 sm:w-32"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center px-4">
                <div className="text-center text-red-500">
                    <p className="text-lg font-bold sm:text-xl">{error}</p>
                    <button
                        onClick={loadEvents}
                        className="mt-4 rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-secondary/80 sm:text-base"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {currentView === "events" && (
                <EventosUI
                    events={events}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    currentEvents={currentEvents}
                    filteredEvents={filteredEvents}
                    handleEventSelect={handleEventSelect}
                    formatDate={formatDate}
                />
            )}

            {currentView === "revendedores" && selectedEvent && (
                <RevendedoresUI
                    selectedEvent={selectedEvent}
                    handleBackToEvents={handleBackToEvents}
                />
            )}
        </div>
    );
};

export default ProductoraRevendedores; 