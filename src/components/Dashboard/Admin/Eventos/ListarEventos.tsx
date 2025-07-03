import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "@/api/api";
import { FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";

interface Evento {
    id: number;
    nombre: string;
    fechaInicio: string;
    estado: string;
    categoriaNombre: string;
    productora?: string;
    address?: {
        street: string | null;
        city: string;
    };
    lotes?: Array<{
        ticketsVendidos: number;
        precio: number;
    }>;
    ganancias?: number;
}

const estados = ["Todos los Estados", "En Curso", "Pasado"];
const categorias = ["Todas las Categoría", "Concierto", "Festival"];

function formatFechaCompleta(fechaStr: string) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = fecha.toLocaleString("es-ES", { month: "short" });
    const anio = fecha.getFullYear();
    const diaSemana = fecha.toLocaleString("es-ES", { weekday: "long" });
    return { dia, mes, anio, diaSemana };
}

const ListarEventos: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                setLoading(true);
                const response = await axios.get(api_url.get_eventos);
                setEventos(response.data);
            } catch (err) {
                setError("Error al cargar los eventos");
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Resumen de Eventos</h1>
            <p className="mb-6 text-gray-300">Supervisión de todos los eventos en la plataforma.</p>

            {/* Filtros y buscador */}
            <div className="mb-6 flex flex-col gap-4 rounded-xl bg-[#18181b] p-4 shadow">
                <input
                    type="text"
                    placeholder="Buscar evento por título, productora, ubicación..."
                    className="w-full rounded-md bg-[#232326] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <div className="flex flex-col items-center gap-3 md:flex-row">
                    <select className="rounded bg-[#232326] px-4 py-2 text-white">
                        {estados.map((e) => (
                            <option key={e}>{e}</option>
                        ))}
                    </select>
                    <select className="rounded bg-[#232326] px-4 py-2 text-white">
                        {categorias.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <select className="ml-auto rounded bg-[#232326] px-4 py-2 text-white">
                        <option>Reciente</option>
                        <option>Antiguo</option>
                    </select>
                </div>
            </div>

            {/* Loading y error */}
            {loading && (
                <div className="flex justify-center py-10">
                    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
                </div>
            )}
            {error && (
                <div className="rounded-lg bg-red-500/10 p-4 text-center text-red-500">{error}</div>
            )}

            {/* Cards de eventos */}
            <div className="flex flex-col gap-6">
                {eventos.map((evento) => {
                    const { dia, mes, anio, diaSemana } = formatFechaCompleta(evento.fechaInicio);
                    const ticketsVendidos = evento.lotes?.reduce((acc, lote) => acc + (lote.ticketsVendidos || 0), 0) ?? 0;
                    const ganancias = evento.lotes?.reduce((acc, lote) => acc + ((lote.ticketsVendidos || 0) * (lote.precio || 0)), 0) ?? 0;
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
                        <div
                            key={evento.id}
                            className="flex flex-col gap-4 rounded-xl bg-[#18181b] p-6 shadow-lg md:flex-row"
                        >
                            {/* Fecha grande */}
                            <div className="flex w-28 min-w-[7rem] flex-col items-center justify-center rounded-lg bg-[#232326] p-2 text-center">
                                <span className="mb-1 text-xs font-semibold capitalize text-white">{diaSemana}</span>
                                <span className="text-3xl font-bold leading-none text-white">{dia}</span>
                                <span className="text-xs uppercase leading-none text-gray-300">{mes}</span>
                                <span className="text-xs leading-none text-gray-400">{anio}</span>
                            </div>
                            {/* Info evento */}
                            <div className="flex flex-1 flex-col justify-between gap-2">
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-white">{evento.nombre}</span>
                                        <span className={`ml-2 rounded px-2 py-1 text-xs font-semibold ${estadoColor}`}>{estadoTexto}</span>
                                    </div>
                                    <div className="mt-2 flex gap-2 md:mt-0">
                                        <button className="rounded border border-gray-400 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-700/30">Ver Detalles</button>
                                        <button className="flex items-center gap-2 rounded border border-red-600 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-600/10"><span className="text-lg"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg></span>Eliminar Evento</button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Por <span className="font-semibold text-white">Productora Desconocida</span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                    <span>📍 {evento.address?.city || "Ciudad"}</span>
                                    <span>🎫 {evento.categoriaNombre}</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-8 text-xs">
                                    <div className="flex items-center gap-2">
                                        <FaTicketAlt className="text-red-500" />
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">TICKETS VENDIDOS</span>
                                            <span className="text-lg font-bold text-red-500">{ticketsVendidos.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaMoneyBillWave className="text-green-500" />
                                        <div className="flex flex-col">
                                            <span className="text-gray-400">GANANCIAS</span>
                                            <span className="text-lg font-bold text-green-500">${ganancias.toLocaleString("es-AR", { minimumFractionDigits: 3 })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListarEventos; 