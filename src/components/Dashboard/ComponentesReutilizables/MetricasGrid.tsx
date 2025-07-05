import React from 'react';
import MetricaCard from '@/components/Dashboard/ComponentesReutilizables/MetricaCard';

interface MetricaItem {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    value: string | number;
    loading?: boolean;
    error?: boolean;
}

interface MetricasGridProps {
    metricas: MetricaItem[];
    className?: string;
}

const MetricasGrid: React.FC<MetricasGridProps> = ({ metricas, className = "" }) => {
    // Dividir las métricas en dos columnas
    const mitad = Math.ceil(metricas.length / 2);
    const columnaIzquierda = metricas.slice(0, mitad);
    const columnaDerecha = metricas.slice(mitad);

    return (
        <div className={`w-full overflow-hidden rounded-xl bg-secondary p-0 ${className}`}>
            <div className="grid grid-cols-1 divide-y divide-black/30 md:grid-cols-2 md:divide-x md:divide-y-0">
                {/* Columna izquierda */}
                <div className="flex flex-col divide-y divide-black/30">
                    {columnaIzquierda.map((metrica, index) => (
                        <MetricaCard
                            key={index}
                            icon={metrica.icon}
                            title={metrica.title}
                            subtitle={metrica.subtitle}
                            value={metrica.value}
                            loading={metrica.loading}
                            error={metrica.error}
                        />
                    ))}
                </div>
                {/* Columna derecha */}
                <div className="flex flex-col divide-y divide-black/30">
                    {columnaDerecha.map((metrica, index) => (
                        <MetricaCard
                            key={index}
                            icon={metrica.icon}
                            title={metrica.title}
                            subtitle={metrica.subtitle}
                            value={metrica.value}
                            loading={metrica.loading}
                            error={metrica.error}
                        />
                    ))}
                    {/* Espacio vacío para alinear visualmente si la columna derecha tiene menos elementos */}
                    {columnaDerecha.length < columnaIzquierda.length && (
                        <div className="min-h-[80px] px-6 py-6" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetricasGrid; 