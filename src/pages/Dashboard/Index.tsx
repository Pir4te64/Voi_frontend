import { FaCalendarCheck, FaRegHourglass } from "react-icons/fa";
import { FaUserGroup, FaUserCheck } from "react-icons/fa6";
import MetricasGrid from '@/components/Dashboard/ComponentesReutilizables/MetricasGrid';
import { useAdminStatsStore } from '@/components/Dashboard/Admin/store/useAdminStatsStore';
import { useEffect } from 'react';
import { usePageTitle } from '@/context/usePageTitle';

const Index = () => {
    usePageTitle('Dashboard Admin');
    const { stats, loading, error, fetchStats } = useAdminStatsStore();

    useEffect(() => {
        fetchStats();
        // eslint-disable-next-line
    }, []);

    const metricasAdmin = [
        {
            icon: <FaUserGroup />,
            title: "PRODUCTORAS",
            value: loading ? "..." : stats?.productoras?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaCalendarCheck />,
            title: "EVENTOS ACTIVOS",
            value: loading ? "..." : stats?.eventosActivos?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaUserGroup />,
            title: "REVENDEDORES",
            value: loading ? "..." : stats?.revendedores?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaUserCheck />,
            title: "USUARIOS PARTICULARES",
            value: loading ? "..." : stats?.usuariosParticulares?.toString() || "0",
            loading: loading
        },
        {
            icon: <FaRegHourglass />,
            title: "SOLICITUDES PENDIENTES",
            value: loading ? "..." : stats?.solicitudesPendientes?.toString() || "0",
            loading: loading
        }
    ];

    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-1 text-3xl font-bold text-secondary">Dashboard Admin</h1>
            <p className="mb-6 text-gray-300">Panel de administración y monitoreo de la plataforma.</p>

            {error && (
                <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-center text-red-500">
                    {error}
                </div>
            )}

            <MetricasGrid metricas={metricasAdmin} />
        </div>
    );
};

export default Index;
