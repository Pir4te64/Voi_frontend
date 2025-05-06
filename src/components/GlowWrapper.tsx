import React, { PropsWithChildren } from 'react';

interface GlowWrapperProps {
    /** Clases extra para el contenedor interior */
    className?: string;
    /** Intensidad del blur en píxeles (por defecto 64) */
    intensity?: number;
    /** Invierte verticalmente la posición de los glows */
    reverse?: boolean;
}

/**
 * Envuelve sus hijos y añade dos glows diagonales.
 * - intensity: controla el radio de blur en px.
 * - reverse: invierte las posiciones verticalmente.
 */
const GlowWrapper: React.FC<PropsWithChildren<GlowWrapperProps>> = ({
    children,
    className = '',
    intensity = 64,
    reverse = false,
}) => {
    // Determina posiciones según reverse
    const topPos = reverse ? 'bottom' : 'top';
    const bottomPos = reverse ? 'top' : 'bottom';

    // Estilo común para los glows
    const glowStyle: React.CSSProperties = {
        filter: `blur(${intensity}px)`,
        opacity: 0.8,
        pointerEvents: 'none',
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Glow diagonal superior derecha o inferior derecha si reverse */}
            <div
                className={`absolute -${topPos}-10 -right-10 w-60 h-60 bg-secondary rounded-full`}
                style={glowStyle}
            />

            {children}

            {/* Glow diagonal inferior izquierda o superior izquierda si reverse */}
            <div
                className={`absolute -${bottomPos}-10 -left-10 w-52 h-52 bg-secondary rounded-full`}
                style={glowStyle}
            />
        </div>
    );
};

export default GlowWrapper;
