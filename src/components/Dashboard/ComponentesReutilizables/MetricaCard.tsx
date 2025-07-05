import React from 'react';

interface MetricaCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    value: string | number;
    loading?: boolean;
    error?: boolean;
    className?: string;
}

const MetricaCard: React.FC<MetricaCardProps> = ({
    icon,
    title,
    subtitle,
    value,
    loading = false,
    error = false,
    className = ""
}) => {
    return (
        <div className={`flex min-h-[80px] items-center justify-between px-6 py-6 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="text-2xl text-black">
                    {icon}
                </div>
                <div>
                    <div className="text-base font-bold text-black">{title}</div>
                    {subtitle && (
                        <div className="text-xs font-normal text-black/60">{subtitle}</div>
                    )}
                </div>
            </div>
            <div className="flex h-full items-center text-3xl font-bold text-black">
                {loading ? (
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
                ) : error ? (
                    <span className="text-red-600">Error</span>
                ) : (
                    value
                )}
            </div>
        </div>
    );
};

export default MetricaCard; 