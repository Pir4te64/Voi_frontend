import React from 'react';

interface TablaStatesProps {
    loading: boolean;
    error: string | null;
    hasData: boolean;
    tipo: 'compras' | 'ventas';
}

const TablaStates: React.FC<TablaStatesProps> = ({ loading, error, hasData, tipo }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-secondary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-500/10 p-8 text-center text-red-500">
                {error}
            </div>
        );
    }

    if (!hasData) {
        return (
            <div className="rounded-lg bg-black/40 p-8 text-center text-gray-500">
                {tipo === 'ventas' ? 'No tienes ventas registradas.' : 'No tienes compras registradas.'}
            </div>
        );
    }

    return null;
};

export default TablaStates; 