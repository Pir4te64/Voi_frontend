import { FaCalendarAlt, FaTicketAlt, FaHeart, FaHistory, FaUsers } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import MetricasGrid from '@/components/Dashboard/ComponentesReutilizables/MetricasGrid';
import { useUsuarioStatsStore } from '@/components/Dashboard/Compras/store/useUsuarioStatsStore';
import { useEffect } from 'react';
import { usePageTitle } from '@/context/usePageTitle';

const DashboardUsuario = () => {
    const { stats, loading, error, fetchStats } = useUsuarioStatsStore();
    usePageTitle('Dashboard Usuario');
    useEffect(() => {
        fetchStats();
        // eslint-disable-next-line
    }, []);



    // Verificar si el usuario es admin para mostrar la métrica de usuarios
    const userData = localStorage.getItem('me');
    let isAdmin = false;
    if (userData) {
        try {
            const user = JSON.parse(userData);
            isAdmin = user.roles && user.roles.includes('ROLE_ADMIN');
        } catch (error) {
            console.warn('Error al parsear datos del usuario:', error);
        }
    }

    const metricasUsuario = [
        {
            icon: <CgShoppingCart />,
            title: "MIS COMPRAS",
            subtitle: "Total",
            value: loading ? "..." : (stats?.misCompras !== undefined ? stats.misCompras.toString() : "0"),
            loading: loading
        },
        {
            icon: <FaCalendarAlt />,
            title: "MIS EVENTOS",
            subtitle: "Próximos",
            value: loading ? "..." : (stats?.misEventos !== undefined ? stats.misEventos.toString() : "0"),
            loading: loading
        },
        {
            icon: <FaTicketAlt />,
            title: "TICKETS ACTIVOS",
            subtitle: "Válidos",
            value: loading ? "..." : (stats?.ticketsActivos !== undefined ? stats.ticketsActivos.toString() : "0"),
            loading: loading
        },
        {
            icon: <FaHeart />,
            title: "FAVORITOS",
            subtitle: "Guardados",
            value: loading ? "..." : (stats?.favoritos !== undefined ? stats.favoritos.toString() : "0"),
            loading: loading
        },
        {
            icon: <FaHistory />,
            title: "HISTORIAL",
            subtitle: "Eventos pasados",
            value: loading ? "..." : (stats?.historial !== undefined ? stats.historial.toString() : "0"),
            loading: loading
        },
        // Solo mostrar métrica de usuarios si es admin
        ...(isAdmin ? [{
            icon: <FaUsers />,
            title: "USUARIOS",
            subtitle: "Total registrados",
            value: loading ? "..." : (stats?.cantidadUsuarios !== undefined ? stats.cantidadUsuarios.toString() : "0"),
            loading: loading
        }] : [])
    ];

    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Mi Dashboard</h1>
            <p className="mb-6 text-gray-300">Panel personal para gestionar tus eventos y compras.</p>

            {error && (
                <div className="mb-6 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <MetricasGrid metricas={metricasUsuario} />
        </div>
    );
};

export default DashboardUsuario; 