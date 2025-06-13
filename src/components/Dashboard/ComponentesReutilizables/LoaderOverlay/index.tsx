import React from "react";

const LoaderOverlay: React.FC = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-secondary" />
    </div>
);

export default LoaderOverlay; 