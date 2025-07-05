import { FaEye } from "react-icons/fa";
import { useGananciasStore } from '@/components/Dashboard/Compras/store/useGananciasStore';
import { useEventosProductoraStore } from '@/components/Dashboard/Compras/store/useEventosProductoraStore';
import MetricasDashboard from '@/components/Dashboard/ComponentesReutilizables/MetricasDashboard';
import { useEffect } from 'react';

const DashboardProductora = () => {
    const { resumen, loading, error, fetchGanancias } = useGananciasStore();
    const { fetchEventos } = useEventosProductoraStore();

    useEffect(() => {
        fetchGanancias();
        fetchEventos();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container mx-auto w-full px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-secondary">Dashboard</h1>
            <div className="flex flex-col rounded-2xl bg-secondary p-8 shadow-lg md:flex-row md:items-center">
                {/* Ingreso total */}
                <div className="mb-8 flex w-full flex-col justify-center md:mb-0 md:w-1/2 md:pr-8">
                    <div className="mb-2 text-base font-bold uppercase text-white">INGRESO TOTAL</div>
                    <div className="flex items-center gap-2">
                        {loading ? (
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                        ) : error ? (
                            <span className="text-2xl font-extrabold tracking-wider text-white md:text-3xl">Error</span>
                        ) : (
                            <span className="text-4xl font-extrabold tracking-wider text-white md:text-5xl">
                                $ {resumen?.gananciaTotal.toLocaleString('es-AR') || '0'}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white/80">
                        {loading ? 'Cargando...' : 'Ingresos totales de todos los eventos'}
                    </div>
                </div>
                {/* Métricas */}
                <MetricasDashboard />
            </div>
        </div>
    );
};

export default DashboardProductora; 