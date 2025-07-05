import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEventosStore } from "@/components/Dashboard/Admin/Eventos/store/useEventosStore";
import { FaEye, FaWallet, FaMapMarkerAlt, FaTag, FaSearch } from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";
import { formatFechaCompleta } from "@/components/Dashboard/Admin/Eventos/utils/dateUtils";

const ListarEventos: React.FC = () => {
    const navigate = useNavigate();
    const {
        eventos, loading, error, fetchEventos,
        search, setSearch,
        estadoFiltro, setEstadoFiltro,
        categoriaFiltro, setCategoriaFiltro,
        orden, setOrden
    } = useEventosStore();

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

    // Funciones helper para procesar datos del evento
    const getEventoData = (evento: any) => {
        const { dia, mes, anio, diaSemana } = formatFechaCompleta(evento.fechaInicio);
        const ticketsVendidos = evento.cantidadTickets || 0;
        const ganancias = evento.gananciaTotal || 0;

        return { dia, mes, anio, diaSemana, ticketsVendidos, ganancias };
    };

    const getEstadoInfo = (estado: string) => {
        let estadoColor = "bg-gray-600 text-white";
        let estadoTexto = estado;

        if (estado === "ACTIVO") {
            estadoColor = "bg-green-600 text-white";
            estadoTexto = "En Curso";
        } else if (estado === "PASADO" || estado === "Pasado") {
            estadoColor = "bg-gray-600 text-white";
            estadoTexto = "Pasado";
        }

        return { estadoColor, estadoTexto };
    };

    return (
        <div className="container mx-auto w-full bg-black px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Resumen de Eventos</h1>
            <p className="mb-6 text-gray-300">Supervisión de todos los eventos en la plataforma.</p>

            {/* Filtros y buscador */}
            <div className="flex flex-col gap-4 rounded-t-xl bg-[#1C1C1E] p-4 shadow">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar evento por título, productora, ubicación..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full rounded-md bg-[#232326] py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
                    <select
                        className="w-full rounded bg-[#232326] px-4 py-2 text-white md:w-auto"
                        value={estadoFiltro}
                        onChange={e => setEstadoFiltro(e.target.value)}
                    >
                        {estadosUnicos.map((e) => (
                            <option key={e}>{e}</option>
                        ))}
                    </select>
                    <select
                        className="w-full rounded bg-[#232326] px-4 py-2 text-white md:w-auto"
                        value={categoriaFiltro}
                        onChange={e => setCategoriaFiltro(e.target.value)}
                    >
                        {categoriasUnicas.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <select
                        className="w-full rounded bg-[#232326] px-4 py-2 text-white md:ml-auto md:w-auto"
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
            <div className="flex flex-col gap-6 bg-[#1C1C1E]">
                {eventosFiltrados.map((evento) => {
                    const eventoData = getEventoData(evento);
                    const { estadoColor, estadoTexto } = getEstadoInfo(evento.estado);

                    return (
                        <div
                            key={evento.id}
                            className="grid grid-cols-1 gap-4 rounded-xl bg-[#1C1C1E] p-4 shadow-2xl md:grid-cols-[auto_1fr_auto]"
                        >
                            {/* Fecha grande */}
                            <div className="mx-auto flex w-28 min-w-[7rem] flex-col items-center justify-center rounded-lg bg-white p-2 text-center md:mx-0">
                                <span className="mb-1 text-xs font-semibold capitalize text-black">{eventoData.diaSemana}</span>
                                <span className="text-3xl font-bold leading-none text-black">{eventoData.dia}</span>
                                <span className="text-xs uppercase leading-none text-black">{eventoData.mes}</span>
                                <span className="text-xs leading-none text-black">{eventoData.anio}</span>
                            </div>
                            {/* Info evento */}
                            <div className="flex flex-1 flex-col justify-between gap-2 md:pl-2">
                                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                    <span className="text-xl font-bold text-white">{evento.nombre}</span>
                                    <span className={`mt-1 md:mt-0 md:ml-2 rounded px-2 py-1 text-xs font-semibold ${estadoColor} md:self-end inline-block w-auto`}>{estadoTexto}</span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Por <span className="font-semibold text-white">Productora Desconocida</span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-red-400" />{evento.address?.city || "Ciudad"}</span>
                                    <span className="flex items-center gap-1"><FaTag className="text-secondary" />{evento.categoriaNombre}</span>
                                </div>
                                <div className="mt-2 flex flex-col divide-y divide-gray-700">
                                    {/* Tickets Vendidos */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <FaWallet className="text-red-500" />
                                            <span className="text-xs font-bold uppercase text-red-400">TICKETS VENDIDOS</span>
                                        </div>
                                        <span className="text-lg font-bold text-red-400">{eventoData.ticketsVendidos.toString()}</span>
                                    </div>
                                    {/* Ganancias */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <BiSolidDollarCircle className="text-green-500" />
                                            <span className="text-xs font-bold uppercase text-green-400">GANANCIAS</span>
                                        </div>
                                        <span className="text-lg font-bold text-green-400">${eventoData.ganancias.toLocaleString("es-AR", { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Columna de botones */}
                            <div className="flex flex-row items-center justify-center gap-2 md:flex-col md:items-end md:justify-start md:pl-4">
                                <button
                                    onClick={() => navigate(`/dashboard/eventos/${evento.id}`)}
                                    className="flex items-center gap-2 rounded border border-gray-400 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-700/30"
                                >
                                    <FaEye className="text-base" /> Ver Detalles
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