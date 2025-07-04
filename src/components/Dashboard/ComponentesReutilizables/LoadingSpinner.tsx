import React from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    className = ""
}) => {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-32 w-32",
        lg: "h-48 w-48"
    };

    return (
        <div className={`flex h-screen items-center justify-center ${className}`}>
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-t-2 border-secondary`}></div>
        </div>
    );
};

export default LoadingSpinner; 