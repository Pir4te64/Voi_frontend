// src/components/GlowWrapper.tsx
import React, { PropsWithChildren } from 'react';

interface GlowWrapperProps {
    /** Clases extra para el contenedor interior */
    className?: string;
}

/**
 * Envuelve sus hijos y añade dos glows diagonales (top-right y bottom-left).
 */
const GlowWrapper: React.FC<PropsWithChildren<GlowWrapperProps>> = ({
    children,
    className = '',
}) => (
    <div className={`relative overflow-hidden ${className}`}>
        {/* Glow diagonal superior derecha */}
        <div
            className="
        absolute -top-10 -right-10
        w-40 h-40
        bg-secondary rounded-full
        filter blur-3xl opacity-80
        pointer-events-none
      "
        />
        {children}
        {/* Glow diagonal inferior izquierda */}
        <div
            className="
        absolute -bottom-10 -left-10
        w-40 h-40
        bg-secondary rounded-full
        filter blur-3xl opacity-80
        pointer-events-none
      "
        />
    </div>
);

export default GlowWrapper;
