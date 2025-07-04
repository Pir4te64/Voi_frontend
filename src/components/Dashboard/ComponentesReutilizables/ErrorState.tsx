import React from "react";

interface ErrorStateProps {
    error: string;
    onRetry?: () => void;
    retryText?: string;
    className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error,
    onRetry,
    retryText = "Reintentar",
    className = ""
}) => {
    return (
        <div className={`flex h-screen items-center justify-center ${className}`}>
            <div className="text-center text-red-500">
                <p className="text-xl font-bold">{error}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-4 rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80"
                    >
                        {retryText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorState; 