import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventoDetallesStore } from "@/components/Dashboard/Admin/Eventos/store/useEventoDetallesStore";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import EventoInfoGrid from "@/components/Dashboard/Admin/Eventos/EventoInfoGrid";

function formatFechaCompleta(fechaStr: string) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = fecha.toLocaleString("es-ES", { month: "short" });
    const anio = fecha.getFullYear();
    const diaSemana = fecha.toLocaleString("es-ES", { weekday: "long" });
    const hora = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    return { dia, mes, anio, diaSemana, hora };
}

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

    const { dia, mes, anio, hora } = formatFechaCompleta(evento.fechaInicio);
    const fechaFin = formatFechaCompleta(evento.fechaFin);
    const estadoTexto = evento.estado === "ACTIVO" ? "En Curso" : evento.estado;
    const estadoColor = evento.estado === "ACTIVO" ? "bg-green-600 text-white" : "bg-gray-600 text-white";
    const revendedoresCount = evento.revendedores?.length || 0;
    const galeria = evento.galeriaUrls || [];

    // Google Maps link
    const mapsUrl = evento.address?.latitude && evento.address?.longitude
        ? `https://www.google.com/maps?q=${evento.address.latitude},${evento.address.longitude}`
        : null;

    return (
        <div className="min-h-screen bg-black px-2 py-8">
            <div className="mx-auto max-w-7xl">
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
                                    {mapsUrl && (
                                        <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm font-semibold text-red-400 hover:underline"
                                        >
                                            <FaMapMarkerAlt /> Ver Mapa
                                        </a>
                                    )}
                                </div>
                                {/* Cards de info clave */}
                                {evento.lotes && (
                                    <EventoInfoGrid
                                        lotes={evento.lotes}
                                        loteIndex={loteIndex}
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
                                            >&#8592;</button>
                                            <button
                                                onClick={() => setGaleriaIndex((i) => (i === galeria.length - 1 ? 0 : i + 1))}
                                                className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white"
                                            >&#8594;</button>
                                        </div>
                                    )}
                                </div>
                                {/* Paginación de galería */}
                                {galeria.length > 1 && (
                                    <div className="mt-2 flex justify-center gap-1">
                                        {galeria.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`inline-block w-2 h-2 rounded-full ${galeriaIndex === idx ? 'bg-secondary' : 'bg-gray-600'}`}
                                            ></span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventoDetalles; 