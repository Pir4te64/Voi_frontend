// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from 'react';
import { GETME } from '@/api/api';

type AuthData = {
    idUser: number;
    idProfile: number;
    userType: string;
    accessToken: string;
    refreshToken: string;
};

export type MeData = {
    idUser: number;
    idProfile: number;
    userType: string;
    email: string;
    name: string;
    roles: string[];
};

type AuthContextType = {
    user: AuthData | null;
    me: MeData | null;
    isAuthenticated: boolean;
    isReady: boolean;             // <— indica que ya intentó cargar GETME (o no había token)
    login: (authData: AuthData) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    const [me, setMe] = useState<MeData | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Si hay token, intentamos GETME, sino marcamos listo de inmediato
        if (user?.accessToken) {
            GETME()
                .then(res => setMe(res.data as MeData))
                .catch(() => {
                    localStorage.removeItem('auth');
                    setUser(null);
                    setMe(null);
                })
                .finally(() => setIsReady(true));
        } else {
            setIsReady(true);
        }
    }, [user]);

    const login = (authData: AuthData) => {
        localStorage.setItem('auth', JSON.stringify(authData));
        setUser(authData);
        // isReady volverá a false? No, lo dejamos true: el efecto correrá y actualizará me.
    };

    const logout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('me');
        setUser(null);
        setMe(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                me,
                isAuthenticated: !!user,
                isReady,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
};
