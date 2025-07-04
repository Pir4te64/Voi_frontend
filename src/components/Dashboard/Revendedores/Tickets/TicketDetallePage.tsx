import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    FaArrowLeft,
    FaSearch,
} from "react-icons/fa";
import { Evento, Ticket } from "@/components/Dashboard/Revendedores/Tickets/types/tickets.types";
import { useTicketDetalleStore } from "@/components/Dashboard/Revendedores/Tickets/store/useTicketDetalleStore";

const TicketDetallePage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const eventoData = location.state?.eventoData as Evento;
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("TODOS");

    const {
        loading,
        error,
        tickets,
        loadTickets,
    } = useTicketDetalleStore();

    useEffect(() => {
        if (!eventoData) {
            navigate("/dashboard/ticket");
            return;
        }
        loadTickets(Number(id));
    }, [id, eventoData, navigate, loadTickets]);

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = ticket.evento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ticket.loteNombre || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "TODOS" || ticket.estado === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DISPONIBLE":
                return "bg-green-500 text-white";
            case "VENDIDO":
                return "bg-blue-500 text-white";
            case "USADO":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-400 text-white";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "DISPONIBLE":
                return "Disponible";
            case "VENDIDO":
                return "Vendido";
            case "USADO":
                return "Usado";
            default:
                return status;
        }
    };

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
                    <p className="mt-2 text-gray-400">{eventoData.nombre}</p>
                    <p className="text-sm text-gray-500">
                        {format(new Date(eventoData.fechaInicio), "PPP", { locale: es })}
                    </p>
                </div>

                {/* Estadísticas rápidas */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-[#1C1C1E] p-4">
                        <h3 className="text-sm font-medium text-gray-400">Total Lotes</h3>
                        <p className="text-2xl font-bold text-white">{tickets.length}</p>
                    </div>
                    <div className="rounded-lg bg-[#1C1C1E] p-4">
                        <h3 className="text-sm font-medium text-gray-400">Total Tickets</h3>
                        <p className="text-2xl font-bold text-green-500">
                            {tickets.reduce((total: number, t: Ticket) => total + (t.cantidadTickets || 0), 0)}
                        </p>
                    </div>
                    <div className="rounded-lg bg-[#1C1C1E] p-4">
                        <h3 className="text-sm font-medium text-gray-400">Disponibles</h3>
                        <p className="text-2xl font-bold text-blue-500">
                            {tickets.reduce((total: number, t: Ticket) => total + (t.ticketsDisponibles || 0), 0)}
                        </p>
                    </div>
                    <div className="rounded-lg bg-[#1C1C1E] p-4">
                        <h3 className="text-sm font-medium text-gray-400">Vendidos</h3>
                        <p className="text-2xl font-bold text-gray-500">
                            {tickets.reduce((total: number, t: Ticket) => total + (t.ticketsVendidos || 0), 0)}
                        </p>
                    </div>
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
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="rounded-lg border border-gray-600 bg-[#1C1C1E] px-4 py-3 text-white focus:border-secondary focus:outline-none"
                        >
                            <option value="TODOS">Todos los estados</option>
                            <option value="DISPONIBLE">Disponibles</option>
                            <option value="VENDIDO">Vendidos</option>
                            <option value="USADO">Usados</option>
                        </select>
                    </div>
                </div>

                {/* Tabla de tickets */}
                <div className="overflow-x-auto rounded-lg bg-[#1C1C1E]">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#1C1C1E] text-gray-400">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-white">Lote</th>
                                <th className="px-4 py-3 font-semibold text-white">Precio</th>
                                <th className="px-4 py-3 font-semibold text-white">Estado</th>
                                <th className="px-4 py-3 text-center font-semibold text-white">Total Tickets</th>
                                <th className="px-4 py-3 text-center font-semibold text-white">Disponibles</th>
                                <th className="px-4 py-3 text-center font-semibold text-white">Vendidos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-gray-500">
                                        {searchTerm.trim() || filterStatus !== "TODOS"
                                            ? "No se encontraron tickets que coincidan con los filtros"
                                            : "No hay tickets disponibles para este evento"}
                                    </td>
                                </tr>
                            )}

                            {filteredTickets.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="border-t border-gray-700 hover:bg-black/30"
                                >
                                    <td className="px-4 py-3 text-white">{ticket.loteNombre}</td>
                                    <td className="px-4 py-3 text-white">${ticket.precio}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`rounded px-3 py-1 text-sm ${getStatusColor(ticket.estado)}`}
                                        >
                                            {getStatusText(ticket.estado)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-white">{ticket.cantidadTickets}</td>
                                    <td className="px-4 py-3 text-center text-white">{ticket.ticketsDisponibles}</td>
                                    <td className="px-4 py-3 text-center text-white">{ticket.ticketsVendidos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TicketDetallePage; 