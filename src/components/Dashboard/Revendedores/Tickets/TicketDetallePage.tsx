import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
    FaArrowLeft,
    FaSearch,
} from "react-icons/fa";
import { Evento } from "@/components/Dashboard/Revendedores/Tickets/types/tickets.types";
import { useTicketDetalleStore } from "@/components/Dashboard/Revendedores/Tickets/store/useTicketDetalleStore";
import { LoadingSpinner, ErrorState, LoaderOverlay } from "@/components/Dashboard/ComponentesReutilizables";
import TicketForm from "@/components/Dashboard/Revendedores/Tickets/components/TicketForm";
import { enviarTicket } from "@/api/api";
import { toast } from "react-toastify";

const TicketDetallePage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const eventoData = location.state?.eventoData as Evento;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLoteId, setSelectedLoteId] = useState<number | null>(null);
    const [sendingTicket, setSendingTicket] = useState(false);

    const handleTicketSubmit = async (values: any) => {
        setSendingTicket(true);

        try {
            const response = await enviarTicket(values);
            console.log("Ticket enviado exitosamente:", response.data);

            toast.success("¡Ticket enviado exitosamente!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Navegar hacia atrás después del éxito
            setTimeout(() => {
                navigate(-1);
            }, 1500);

        } catch (error: any) {
            console.error("Error al enviar ticket:", error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Error al enviar el ticket. Inténtalo de nuevo.",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        } finally {
            setSendingTicket(false);
        }
    };

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
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <ErrorState
                error={error}
                onRetry={() => loadTickets(Number(id))}
            />
        );
    }

    return (
        <>
            {sendingTicket && <LoaderOverlay />}
            <div className="min-h-screen bg-black">
                <div className="container mx-auto px-4 py-4 sm:py-8">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <button
                            onClick={() => navigate("/dashboard/ticket")}
                            className="mb-4 flex items-center text-white hover:text-secondary"
                        >
                            <FaArrowLeft className="mr-2" />
                            <span className="hidden sm:inline">Volver a Mis Tickets</span>
                            <span className="sm:hidden">Volver</span>
                        </button>
                        <h1 className="text-2xl font-bold text-secondary sm:text-3xl">Enviar tickets</h1>
                        <p className="mt-2 text-sm text-gray-400 sm:text-base">
                            Gestioná y enviá entradas a tus clientes para tus eventos.
                        </p>
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-col gap-4 rounded-t-lg bg-[#1c1c1c] p-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative w-full rounded-lg border border-gray-700 md:w-3/6">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaSearch className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar ticket..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg bg-[#1C1C1E] py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                        </div>
                    </div>

                    {/* Lista de lotes seleccionables */}
                    <div className="flex flex-col gap-4 bg-[#1c1c1c] p-4">
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
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <span className="text-lg font-bold text-white">
                                                {lote.nombre}
                                            </span>
                                            <div className="flex flex-col items-start sm:items-end">
                                                <span className="text-xl font-bold text-white sm:text-2xl">
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

                    {/* Formulario de envío de tickets */}
                    <TicketForm
                        onSubmit={handleTicketSubmit}
                        selectedLoteId={selectedLoteId}
                        isSubmitting={sendingTicket}
                    />
                </div>
            </div>
        </>
    );
};

export default TicketDetallePage; 