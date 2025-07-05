import { FaCalendarAlt, FaTicketAlt, FaHeart, FaHistory } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import MetricasGrid from '@/components/Dashboard/ComponentesReutilizables/MetricasGrid';
import { useUsuarioStatsStore } from '@/components/Dashboard/Compras/store/useUsuarioStatsStore';
import { useEffect } from 'react';

const DashboardUsuario = () => {
    const { stats, loading, error, fetchStats } = useUsuarioStatsStore();

    useEffect(() => {
        fetchStats();
        // eslint-disable-next-line
    }, []);

    const metricasUsuario = [
        {
            icon: <CgShoppingCart />,
            title: "MIS COMPRAS",
            subtitle: "Total",
            value: loading ? "..." : stats?.misCompras?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaCalendarAlt />,
            title: "MIS EVENTOS",
            subtitle: "Próximos",
            value: loading ? "..." : stats?.misEventos?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaTicketAlt />,
            title: "TICKETS ACTIVOS",
            subtitle: "Válidos",
            value: loading ? "..." : stats?.ticketsActivos?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaHeart />,
            title: "FAVORITOS",
            subtitle: "Guardados",
            value: loading ? "..." : stats?.favoritos?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaHistory />,
            title: "HISTORIAL",
            subtitle: "Eventos pasados",
            value: loading ? "..." : stats?.historial?.toString() || "0",
            loading: loading
        }
    ];

    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Mi Dashboard</h1>
            <p className="mb-6 text-gray-300">Panel personal para gestionar tus eventos y compras.</p>

            {error && (
                <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-center text-red-500">
                    {error}
                </div>
            )}

            <MetricasGrid metricas={metricasUsuario} />
        </div>
    );
};

export default DashboardUsuario; 