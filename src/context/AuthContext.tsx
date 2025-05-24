import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';

type AuthData = {
    idUser: number;
    idProfile: number;
    userType: string;
    accessToken: string;
    refreshToken: string;
};

type AuthContextType = {
    user: AuthData | null;
    isAuthenticated: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<AuthData | null>(null);

    // Al montar, leo localStorage
    useEffect(() => {
        const stored = localStorage.getItem('auth');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('auth');
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('auth');
        window.location.href = '/';
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar en componentes
export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
};
