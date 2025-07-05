import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventoDetallesStore } from "@/components/Dashboard/Admin/Eventos/store/useEventoDetallesStore";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import EventoInfoGrid from "@/components/Dashboard/Admin/Eventos/EventoInfoGrid";
import MapButton from "@/components/Dashboard/Admin/Eventos/components/MapButton";
import { formatFechaCompleta } from "@/components/Dashboard/Admin/Eventos/utils/dateUtils";
import EventoDetallesStates from "@/components/Dashboard/Admin/Eventos/EventoDetallesStates";
import LoteResumen from "@/components/Dashboard/Admin/Eventos/LoteResumen";
import axios from "axios";
import { api_url } from "@/api/api";
import TablaComprasUsuario from "@/components/Dashboard/Compras/TablaComprasUsuario";

const EventoDetalles: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { evento, loading, error, fetchEventoDetalle } = useEventoDetallesStore();
    const [galeriaIndex, setGaleriaIndex] = React.useState(0);
    const [loteIndex, setLoteIndex] = React.useState(0);

    useEffect(() => {
        if (id) {
            fetchEventoDetalle(parseInt(id));
        }
    }, [id, fetchEventoDetalle]);

    useEffect(() => {
        if (evento?.id) {
            const userData = localStorage.getItem('auth');
            const token = userData ? JSON.parse(userData).accessToken : null;
            axios.get(`${api_url.get_tickets}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(res => {
                    console.log("Tickets API response:", res.data);
                })
                .catch(err => {
                    console.error("Error al obtener tickets:", err);
                });
        }
    }, [evento?.id]);

    // Resetear loteIndex cuando cambie el evento
    // useEffect(() => {
    //     if (evento && evento.lotes) {
    //         setLoteIndex(0);
    //     }
    // }, [evento?.id]);

    // Asegurar que loteIndex sea válido
    const validLoteIndex = evento?.lotes && evento.lotes.length > 0
        ? Math.min(loteIndex, evento.lotes.length - 1)
        : 0;



    // Manejar estados de carga, error y evento no encontrado
    const stateComponent = <EventoDetallesStates loading={loading} error={error} evento={evento} />;
    if (loading || error || !evento) {
        return stateComponent;
    }

    const { dia, mes, anio, hora } = formatFechaCompleta(evento.fechaInicio);
    const fechaFin = formatFechaCompleta(evento.fechaFin);
    const estadoTexto = evento.estado === "ACTIVO" ? "En Curso" : evento.estado;
    const estadoColor = evento.estado === "ACTIVO" ? "bg-green-600 text-white" : "bg-gray-600 text-white";
    const revendedoresCount = evento.revendedores?.length || 0;
    const galeria = evento.galeriaUrls || [];

    return (
        <div className="min-h-screen bg-black px-2 py-8">
            <div className="container mx-auto">
                {/* Header y botón volver */}
                <div className="mb-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate("/dashboard/eventos")}
                        className="flex items-center gap-2 text-secondary hover:underline"
                    >
                        <FaArrowLeft /> Volver
                    </button>
                </div>
                {/* Grid principal: card evento | sidebar (revendedores + galería) */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* Columna principal */}
                    <div>
                        {/* Card principal del evento */}
                        <div className="overflow-hidden rounded-2xl bg-[#18181b] p-0 shadow-lg">
                            {/* Imagen principal */}
                            <div className="relative">
                                {evento.sliderImageUrl && (
                                    <img
                                        src={evento.sliderImageUrl}
                                        alt={evento.nombre}
                                        className="h-80 w-full object-cover object-center"
                                    />
                                )}
                            </div>
                            {/* Contenido principal */}
                            <div className="p-6">
                                <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <h1 className="text-2xl font-bold leading-tight text-white md:text-3xl">{evento.nombre}</h1>
                                    <span className={`rounded px-3 py-1 text-sm font-semibold ${estadoColor}`}>{estadoTexto}</span>
                                </div>
                                {/* Descripción */}
                                <div className="mb-4">
                                    <h2 className="mb-1 text-base font-bold uppercase tracking-wide text-red-500">DESCRIPCIÓN</h2>
                                    <p className="mb-2 text-base leading-relaxed text-white/90">{evento.descripcion}</p>
                                    <MapButton
                                        latitude={evento.address?.latitude || ""}
                                        longitude={evento.address?.longitude || ""}
                                        address={evento.address}
                                        eventName={evento.nombre}
                                    />
                                </div>
                                {/* Cards de info clave */}
                                {evento.lotes && (
                                    <EventoInfoGrid
                                        lotes={evento.lotes}
                                        loteIndex={validLoteIndex}
                                        setLoteIndex={setLoteIndex}
                                        dia={dia}
                                        mes={mes}
                                        anio={anio}
                                        hora={hora}
                                        fechaFinHora={fechaFin.hora}
                                        addressStreet={evento.address?.street}
                                        addressCity={evento.address?.city}
                                        addressState={evento.address?.state}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Segunda columna: sidebar derecha */}
                    <div className="flex flex-col gap-6">
                        {/* Revendedores */}
                        <div className="flex flex-col rounded-xl bg-[#18181b] p-5 text-left">
                            <div>
                                <div className="flex items-center gap-2">
                                    <FiUsers className="text-2xl text-secondary" />
                                    <span className="text-base font-bold tracking-wider text-secondary">REVENDEDORES</span>
                                </div>
                                <span className="mt-1 block text-sm text-white/80">En este evento</span>
                            </div>
                            <span className="mt-4 text-center text-4xl font-bold text-secondary">{revendedoresCount}</span>
                        </div>
                        {/* Galería de evento */}
                        {galeria.length > 0 && (
                            <div className="rounded-xl bg-[#18181b] p-5">
                                <span className="mb-2 block text-xs text-gray-400">GALERÍA DE EVENTO</span>
                                <div className="relative">
                                    <img
                                        src={galeria[galeriaIndex]}
                                        alt={`Galería ${galeriaIndex + 1}`}
                                        className="mb-2 h-32 w-full rounded-lg object-cover"
                                    />
                                    {/* Flechas para navegar la galería */}
                                    {galeria.length > 1 && (
                                        <div className="absolute inset-0 flex items-center justify-between px-2">
                                            <button
                                                onClick={() => setGaleriaIndex((i) => (i === 0 ? galeria.length - 1 : i - 1))}
                                                className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white"
                                            >
                                                <FaArrowLeft className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={() => setGaleriaIndex((i) => (i === galeria.length - 1 ? 0 : i + 1))}
                                                className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white"
                                            >
                                                <FaArrowRight className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                {/* Resumen de lote seleccionado */}
                {evento.lotes && evento.lotes[validLoteIndex] && (
                    <LoteResumen
                        key={`lote-${evento.lotes[validLoteIndex].id}`}
                        lote={evento.lotes[validLoteIndex]}
                    />
                )}
            </div>
            {/* Tabla de compras del usuario */}
            <div className="mt-8">
                <TablaComprasUsuario titulo="Transacciones" />
            </div>
        </div>
    );
};

export default EventoDetalles; 