import React, { useEffect, useState, useMemo } from "react";
import { useEventosStore } from "@/components/Dashboard/Admin/Eventos/store/useEventosStore";
import { FaEye, FaTrashAlt, FaWallet } from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";

function formatFechaCompleta(fechaStr: string) {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = fecha.toLocaleString("es-ES", { month: "short" });
    const anio = fecha.getFullYear();
    const diaSemana = fecha.toLocaleString("es-ES", { weekday: "long" });
    return { dia, mes, anio, diaSemana };
}

const ListarEventos: React.FC = () => {
    const { eventos, loading, error, fetchEventos } = useEventosStore();
    const [search, setSearch] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
    const [orden, setOrden] = useState("Reciente");

    useEffect(() => {
        fetchEventos();
    }, [fetchEventos]);

    // Obtener valores únicos para los filtros
    const estadosUnicos = useMemo(() => {
        const setEstados = new Set(eventos.map(e => e.estado === "ACTIVO" ? "En Curso" : (e.estado === "PASADO" ? "Pasado" : e.estado)));
        return ["Todos", ...Array.from(setEstados)];
    }, [eventos]);
    const categoriasUnicas = useMemo(() => {
        const setCategorias = new Set(eventos.map(e => e.categoriaNombre).filter(Boolean));
        return ["Todos", ...Array.from(setCategorias)];
    }, [eventos]);

    // Filtrar eventos
    const eventosFiltrados = useMemo(() => {
        let filtrados = eventos;
        // Filtro de búsqueda
        if (search.trim()) {
            const s = search.trim().toLowerCase();
            filtrados = filtrados.filter(e =>
                e.nombre.toLowerCase().includes(s) ||
                (e.categoriaNombre && e.categoriaNombre.toLowerCase().includes(s)) ||
                (e.address?.city && e.address.city.toLowerCase().includes(s))
            );
        }
        // Filtro de estado
        if (estadoFiltro !== "Todos") {
            filtrados = filtrados.filter(e => {
                const estado = e.estado === "ACTIVO" ? "En Curso" : (e.estado === "PASADO" ? "Pasado" : e.estado);
                return estado === estadoFiltro;
            });
        }
        // Filtro de categoría
        if (categoriaFiltro !== "Todos") {
            filtrados = filtrados.filter(e => e.categoriaNombre === categoriaFiltro);
        }
        // Orden
        filtrados = filtrados.slice().sort((a, b) => {
            const fa = new Date(a.fechaInicio).getTime();
            const fb = new Date(b.fechaInicio).getTime();
            return orden === "Reciente" ? fb - fa : fa - fb;
        });
        return filtrados;
    }, [eventos, search, estadoFiltro, categoriaFiltro, orden]);

    return (
        <div className="bg-blackpx-4 mx-auto w-full max-w-7xl py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Resumen de Eventos</h1>
            <p className="mb-6 text-gray-300">Supervisión de todos los eventos en la plataforma.</p>

            {/* Filtros y buscador */}
            <div className="mb-6 flex flex-col gap-4 rounded-xl bg-[#1C1C1E] p-4 shadow">
                <input
                    type="text"
                    placeholder="Buscar evento por título, productora, ubicación..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full rounded-md bg-[#232326] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <div className="flex flex-col items-center gap-3 md:flex-row">
                    <select
                        className="rounded bg-[#232326] px-4 py-2 text-white"
                        value={estadoFiltro}
                        onChange={e => setEstadoFiltro(e.target.value)}
                    >
                        {estadosUnicos.map((e) => (
                            <option key={e}>{e}</option>
                        ))}
                    </select>
                    <select
                        className="rounded bg-[#232326] px-4 py-2 text-white"
                        value={categoriaFiltro}
                        onChange={e => setCategoriaFiltro(e.target.value)}
                    >
                        {categoriasUnicas.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <select
                        className="ml-auto rounded bg-[#232326] px-4 py-2 text-white"
                        value={orden}
                        onChange={e => setOrden(e.target.value)}
                    >
                        <option value="Reciente">Reciente</option>
                        <option value="Antiguo">Antiguo</option>
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
                {eventosFiltrados.map((evento) => {
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
                            className="grid grid-cols-1 gap-4 rounded-xl bg-[#1C1C1E] p-6 shadow-lg md:grid-cols-[auto_1fr_auto]"
                        >
                            {/* Fecha grande */}
                            <div className="flex w-28 min-w-[7rem] flex-col items-center justify-center rounded-lg bg-white p-2 text-center">
                                <span className="mb-1 text-xs font-semibold capitalize text-black">{diaSemana}</span>
                                <span className="text-3xl font-bold leading-none text-black">{dia}</span>
                                <span className="text-xs uppercase leading-none text-black">{mes}</span>
                                <span className="text-xs leading-none text-black">{anio}</span>
                            </div>
                            {/* Info evento */}
                            <div className="flex flex-1 flex-col justify-between gap-2 md:pl-2">
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <span className="text-xl font-bold text-white">{evento.nombre}</span>
                                    <span className={`ml-0 md:ml-2 rounded px-2 py-1 text-xs font-semibold ${estadoColor} md:self-end`}>{estadoTexto}</span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Por <span className="font-semibold text-white">Productora Desconocida</span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                    <span>📍 {evento.address?.city || "Ciudad"}</span>
                                    <span>🎫 {evento.categoriaNombre}</span>
                                </div>
                                <div className="mt-2 flex flex-col divide-y divide-gray-700">
                                    {/* Tickets Vendidos */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <FaWallet className="text-red-500" />
                                            <span className="text-xs font-bold uppercase text-red-400">TICKETS VENDIDOS</span>
                                        </div>
                                        <span className="text-lg font-bold text-red-400">{ticketsVendidos.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    {/* Ganancias */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <BiSolidDollarCircle className="text-green-500" />
                                            <span className="text-xs font-bold uppercase text-green-400">GANANCIAS</span>
                                        </div>
                                        <span className="text-lg font-bold text-green-400">${ganancias.toLocaleString("es-AR", { minimumFractionDigits: 3 })}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Columna de botones */}
                            <div className="flex flex-col items-end justify-start gap-2 md:justify-start md:pl-4">
                                <button className="flex items-center gap-2 rounded border border-gray-400 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-700/30">
                                    <FaEye className="text-base" /> Ver Detalles
                                </button>
                                <button className="flex items-center gap-2 rounded border border-red-600 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-600/10">
                                    <FaTrashAlt className="text-base" /> Eliminar Evento
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListarEventos; 