// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

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
    login: (authData: AuthData) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lee de localStorage **sincrónicamente** al inicializar
function getStoredAuth(): AuthData | null {
    try {
        const json = localStorage.getItem('auth');
        return json ? JSON.parse(json) : null;
    } catch {
        return null;
    }
}

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<AuthData | null>(getStoredAuth());

    const login = (authData: AuthData) => {
        localStorage.setItem('auth', JSON.stringify(authData));
        setUser(authData);
    };

    const logout = () => {
        localStorage.removeItem('auth');
        window.location.href = '/';
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
};
