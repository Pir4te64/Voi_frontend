import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
    FaArrowLeft,
    FaSearch,
} from "react-icons/fa";
import { Evento } from "@/components/Dashboard/Revendedores/Tickets/types/tickets.types";
import { useTicketDetalleStore } from "@/components/Dashboard/Revendedores/Tickets/store/useTicketDetalleStore";

const TicketDetallePage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const eventoData = location.state?.eventoData as Evento;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLoteId, setSelectedLoteId] = useState<number | null>(null);

    const {
        loading,
        error,
        loadTickets,
    } = useTicketDetalleStore();

    useEffect(() => {
        if (!eventoData) {
            navigate("/dashboard/ticket");
            return;
        }
        loadTickets(Number(id));
    }, [id, eventoData, navigate, loadTickets]);






    if (!eventoData) {
        return null;
    }

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
                        onClick={() => loadTickets(Number(id))}
                        className="mt-4 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/dashboard/ticket")}
                        className="mb-4 flex items-center text-white hover:text-secondary"
                    >
                        <FaArrowLeft className="mr-2" />
                        Volver a Mis Tickets
                    </button>
                    <h1 className="text-3xl font-bold text-secondary">Enviar tickets</h1>
                    <p className="mt-2 text-gray-400">
                        Gestioná y enviá entradas a tus clientes para tus eventos.
                    </p>
                </div>



                {/* Filtros */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre de lote..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-600 bg-[#1C1C1E] py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </div>
                </div>

                {/* Lista de lotes seleccionables */}
                <div className="flex flex-col gap-4">
                    {eventoData.lotes?.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No hay lotes disponibles para este evento
                        </div>
                    )}
                    {eventoData.lotes
                        ?.filter((lote) => lote.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((lote) => (
                            <label
                                key={lote.id}
                                className={`flex items-start gap-4 rounded-lg border-2 p-4 cursor-pointer transition-all
                                    ${selectedLoteId?.toString() === lote.id.toString()
                                        ? 'border-red-500 bg-black shadow-lg'
                                        : 'border-transparent bg-[#18181a] hover:border-gray-700'}`}
                            >
                                {/* Radio */}
                                <div className="pt-1">
                                    <input
                                        type="radio"
                                        checked={selectedLoteId?.toString() === lote.id.toString()}
                                        onChange={() => setSelectedLoteId(Number(lote.id))}
                                        className="h-5 w-5 accent-red-500"
                                    />
                                </div>
                                {/* Info */}
                                <div className="flex flex-1 flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold">
                                            {lote.nombre}
                                        </span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-2xl font-bold text-white">
                                                ${lote.precio.toLocaleString('es-AR')}
                                            </span>
                                            <span className="mt-1 text-xs font-bold text-green-400">
                                                +{lote.porcentajeComision}% de comisión
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">{eventoData.nombre}</div>
                                </div>
                            </label>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TicketDetallePage; 