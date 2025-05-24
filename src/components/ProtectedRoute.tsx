// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isReady } = useAuth();
    const location = useLocation();

    // 1) Mientras no sepamos si hay o no sesión, no renderizamos nada
    if (!isReady) return null;

    // 2) Si ya cargamos y no hay usuario, redirigimos
    if (!isReady) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3) Si está OK, renderizamos la ruta normal
    return <>{children}</>;
};

export default ProtectedRoute;
