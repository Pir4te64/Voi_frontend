import React from "react";

const LoaderOverlay: React.FC = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative">
            {/* Spinner exterior */}
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-secondary" />

            {/* Spinner interior */}
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-4 border-white/30" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

            {/* Punto central */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 animate-pulse rounded-full bg-secondary" />
            </div>
        </div>
    </div>
);

export default LoaderOverlay; 