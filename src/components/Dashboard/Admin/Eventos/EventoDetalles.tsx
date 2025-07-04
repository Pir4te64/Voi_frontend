import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventoDetallesStore } from "./store/useEventoDetallesStore";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

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
                {/* Layout principal */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* Columna principal */}
                    <div>
                        {/* Imagen principal */}
                        {evento.sliderImageUrl && (
                            <div className="mb-4 overflow-hidden rounded-xl">
                                <img
                                    src={evento.sliderImageUrl}
                                    alt={evento.nombre}
                                    className="h-64 w-full object-cover object-center"
                                />
                            </div>
                        )}
                        {/* Título y estado */}
                        <div className="mb-2 flex items-center justify-between">
                            <h1 className="text-3xl font-bold leading-tight text-secondary">{evento.nombre}</h1>
                            <span className={`rounded px-3 py-1 text-sm font-semibold ${estadoColor}`}>{estadoTexto}</span>
                        </div>
                        {/* Descripción */}
                        <div className="mb-4">
                            <h2 className="mb-1 text-lg font-bold text-red-500">DESCRIPCIÓN</h2>
                            <p className="text-base leading-relaxed text-white/90">{evento.descripcion}</p>
                        </div>
                        {/* Info clave */}
                        <div className="mb-4 flex flex-wrap gap-4">
                            {/* Lote (solo el nombre del primer lote como ejemplo) */}
                            {evento.lotes && evento.lotes.length > 0 && (
                                <div className="flex min-w-[120px] flex-col rounded-lg bg-[#18181b] px-4 py-3">
                                    <span className="text-xs text-gray-400">Lote</span>
                                    <span className="font-semibold text-white">{evento.lotes[0].nombre}</span>
                                </div>
                            )}
                            {/* Fecha */}
                            <div className="flex min-w-[120px] flex-col rounded-lg bg-[#18181b] px-4 py-3">
                                <span className="text-xs text-gray-400">Fecha</span>
                                <span className="font-semibold text-white">{dia} - {mes} - {anio}</span>
                                <span className="text-xs text-gray-400">{hora} hs a {fechaFin.hora} hs</span>
                            </div>
                            {/* Ubicación */}
                            <div className="flex min-w-[180px] flex-col rounded-lg bg-[#18181b] px-4 py-3">
                                <span className="text-xs text-gray-400">Locación</span>
                                <span className="font-semibold text-white">{evento.address?.street}</span>
                                <span className="text-xs text-gray-400">{evento.address?.city} - {evento.address?.state}</span>
                                {mapsUrl && (
                                    <a
                                        href={mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 flex items-center gap-1 text-xs text-blue-400 hover:underline"
                                    >
                                        <FaMapMarkerAlt /> Ver Mapa
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Sidebar derecha */}
                    <div className="flex flex-col gap-6">
                        {/* Revendedores */}
                        <div className="flex flex-col items-start rounded-xl bg-[#18181b] p-5 text-left">
                            <div className="flex items-center gap-2">
                                <FiUsers className="text-2xl text-secondary" />
                                <span className="text-base font-bold tracking-wider text-secondary">REVENDEDORES</span>
                            </div>
                            <span className="mt-1 text-sm text-white/80">En este evento</span>
                            <span className="mt-4 text-4xl font-bold text-secondary">{revendedoresCount}</span>
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