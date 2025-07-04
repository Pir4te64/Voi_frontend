import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventoDetallesStore } from "./store/useEventoDetallesStore";
import { FaArrowLeft, FaMapMarkerAlt, FaTag, FaCalendar, FaClock, FaFacebook, FaInstagram, FaUsers, FaTicketAlt, FaPercent, FaEye } from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";

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
                        onClick={() => navigate("/dashboard/admin/eventos")}
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
                        onClick={() => navigate("/dashboard/admin/eventos")}
                        className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        Volver a Eventos
                    </button>
                </div>
            </div>
        );
    }

    const { dia, mes, anio, diaSemana, hora } = formatFechaCompleta(evento.fechaInicio);
    const fechaFin = formatFechaCompleta(evento.fechaFin);

    // Estadísticas generales
    const totalTickets = evento.lotes.reduce((acc, lote) => acc + lote.cantidadTickets, 0);
    const ticketsVendidos = evento.lotes.reduce((acc, lote) => acc + lote.ticketsVendidos, 0);
    const ticketsDisponibles = evento.lotes.reduce((acc, lote) => acc + lote.ticketsDisponibles, 0);
    const gananciasTotales = evento.lotes.reduce((acc, lote) => acc + (lote.ticketsVendidos * lote.precio), 0);
    const comisionesTotales = evento.lotes.reduce((acc, lote) => acc + (lote.ticketsVendidos * lote.montoComision), 0);

    // Estado visual
    let estadoColor = "bg-gray-600 text-white";
    let estadoTexto = evento.estado;
    if (evento.estado === "ACTIVO") {
        estadoColor = "bg-green-600 text-white";
        estadoTexto = "En Curso";
    } else if (evento.estado === "PASADO" || evento.estado === "Pasado") {
        estadoColor = "bg-gray-600 text-white";
        estadoTexto = "Pasado";
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header con botón de regreso */}
                <div className="mb-8 flex items-center gap-4">
                    <button
                        onClick={() => navigate("/dashboard/admin/eventos")}
                        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                    >
                        <FaArrowLeft />
                        <span>Volver a Eventos</span>
                    </button>
                </div>

                {/* Información principal del evento */}
                <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Columna principal */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Imagen principal */}
                        {evento.sliderImageUrl && (
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={evento.sliderImageUrl}
                                    alt={evento.nombre}
                                    className="h-64 w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Información básica */}
                        <div className="rounded-xl bg-[#1C1C1E] p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <h1 className="text-3xl font-bold text-white">{evento.nombre}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${estadoColor}`}>
                                    {estadoTexto}
                                </span>
                            </div>

                            <p className="mb-6 text-gray-300">{evento.descripcion}</p>

                            {/* Detalles del evento */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <FaCalendar className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-400">Fecha</p>
                                        <p className="font-semibold text-white">{diaSemana}, {dia} {mes} {anio}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaClock className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-400">Horario</p>
                                        <p className="font-semibold text-white">{hora} - {fechaFin.hora}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-400">Ubicación</p>
                                        <p className="font-semibold text-white">{evento.address.street}, {evento.address.city}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaTag className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-400">Categoría</p>
                                        <p className="font-semibold text-white">{evento.categoriaNombre}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Redes sociales */}
                            {(evento.linkRedSocial1 || evento.linkRedSocial2) && (
                                <div className="mt-6 border-t border-gray-700 pt-6">
                                    <h3 className="mb-3 text-lg font-semibold text-white">Redes Sociales</h3>
                                    <div className="flex gap-4">
                                        {evento.linkRedSocial1 && (
                                            <a
                                                href={evento.linkRedSocial1}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
                                            >
                                                <FaFacebook />
                                                <span>Facebook</span>
                                            </a>
                                        )}
                                        {evento.linkRedSocial2 && (
                                            <a
                                                href={evento.linkRedSocial2}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-pink-400 transition-colors hover:text-pink-300"
                                            >
                                                <FaInstagram />
                                                <span>Instagram</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Galería */}
                        {evento.galeriaUrls && evento.galeriaUrls.length > 0 && (
                            <div className="rounded-xl bg-[#1C1C1E] p-6">
                                <h3 className="mb-4 text-xl font-semibold text-white">Galería</h3>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {evento.galeriaUrls.map((url, index) => (
                                        <div key={index} className="overflow-hidden rounded-lg">
                                            <img
                                                src={url}
                                                alt={`Galería ${index + 1}`}
                                                className="h-32 w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar con estadísticas */}
                    <div className="space-y-6">
                        {/* Fecha destacada */}
                        <div className="rounded-xl bg-white p-4 text-center">
                            <span className="text-xs font-semibold capitalize text-black">{diaSemana}</span>
                            <div className="text-4xl font-bold leading-none text-black">{dia}</div>
                            <span className="text-xs uppercase text-black">{mes}</span>
                            <span className="text-xs text-black">{anio}</span>
                        </div>

                        {/* Estadísticas generales */}
                        <div className="rounded-xl bg-[#1C1C1E] p-6">
                            <h3 className="mb-4 text-lg font-semibold text-white">Estadísticas Generales</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaTicketAlt className="text-blue-500" />
                                        <span className="text-sm text-gray-400">Total Tickets</span>
                                    </div>
                                    <span className="font-semibold text-white">{totalTickets}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaUsers className="text-green-500" />
                                        <span className="text-sm text-gray-400">Vendidos</span>
                                    </div>
                                    <span className="font-semibold text-green-400">{ticketsVendidos}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaEye className="text-yellow-500" />
                                        <span className="text-sm text-gray-400">Disponibles</span>
                                    </div>
                                    <span className="font-semibold text-yellow-400">{ticketsDisponibles}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BiSolidDollarCircle className="text-green-500" />
                                        <span className="text-sm text-gray-400">Ganancias</span>
                                    </div>
                                    <span className="font-semibold text-green-400">${gananciasTotales.toLocaleString("es-AR")}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaPercent className="text-red-500" />
                                        <span className="text-sm text-gray-400">Comisiones</span>
                                    </div>
                                    <span className="font-semibold text-red-400">${comisionesTotales.toLocaleString("es-AR")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Revendedores */}
                        {evento.revendedores && evento.revendedores.length > 0 && (
                            <div className="rounded-xl bg-[#1C1C1E] p-6">
                                <h3 className="mb-4 text-lg font-semibold text-white">Revendedores Asignados</h3>
                                <div className="space-y-3">
                                    {evento.revendedores.map((revendedor) => (
                                        <div key={revendedor.id} className="rounded-lg bg-[#232326] p-3">
                                            <p className="font-semibold text-white">{revendedor.nombre} {revendedor.apellido}</p>
                                            <p className="text-sm text-gray-400">{revendedor.email}</p>
                                            <p className="text-sm text-gray-400">{revendedor.phoneNumber}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Lotes */}
                <div className="rounded-xl bg-[#1C1C1E] p-6">
                    <h3 className="mb-6 text-xl font-semibold text-white">Lotes de Entrada</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {evento.lotes.map((lote) => {
                            const porcentajeVendido = (lote.ticketsVendidos / lote.cantidadTickets) * 100;
                            const gananciasLote = lote.ticketsVendidos * lote.precio;
                            const comisionesLote = lote.ticketsVendidos * lote.montoComision;

                            return (
                                <div key={lote.id} className="rounded-lg bg-[#232326] p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-white">{lote.nombre}</h4>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${lote.estado === "ACTIVO" ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                                            }`}>
                                            {lote.estado}
                                        </span>
                                    </div>

                                    <div className="mb-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-400">Precio:</span>
                                            <span className="font-semibold text-white">${lote.precio}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-400">Comisión:</span>
                                            <span className="font-semibold text-white">${lote.montoComision} ({lote.porcentajeComision}%)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-400">Total:</span>
                                            <span className="font-semibold text-white">{lote.cantidadTickets}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-400">Vendidos:</span>
                                            <span className="font-semibold text-green-400">{lote.ticketsVendidos}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-400">Disponibles:</span>
                                            <span className="font-semibold text-yellow-400">{lote.ticketsDisponibles}</span>
                                        </div>
                                    </div>

                                    {/* Barra de progreso */}
                                    <div className="mb-3">
                                        <div className="mb-1 flex justify-between text-xs text-gray-400">
                                            <span>Progreso de ventas</span>
                                            <span>{porcentajeVendido.toFixed(1)}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-green-500 transition-all duration-300"
                                                style={{ width: `${porcentajeVendido}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-700 pt-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Ganancias:</span>
                                            <span className="font-semibold text-green-400">${gananciasLote.toLocaleString("es-AR")}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Comisiones:</span>
                                            <span className="font-semibold text-red-400">${comisionesLote.toLocaleString("es-AR")}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventoDetalles; 