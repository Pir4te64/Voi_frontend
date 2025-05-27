// src/hooks/useUserInfo.ts
import { useState, useEffect } from "react";

export type UserType = "PRODUCTORA" | "REVENDEDOR" | "USUARIO" | "ADMIN";

export interface AllUser {
    idUser: number;
    idProfile: number;
    userType: UserType;
    email: string;
    name: string;
    roles: string[];
    // Campos opcionales según rol
    razonSocial?: string;
    cuit?: string;
    dni?: string;
    direccion?: string;
    cbu?: string;
    status?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

export interface UserInfo {
    email: string;
    userType: UserType;
    allUser: AllUser | null;
    setAllUser: (user: AllUser | null) => void;
}

export function useUserInfo(): UserInfo {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState<UserType>("USUARIO");
    const [allUser, setAllUser] = useState<AllUser | null>(null);

    useEffect(() => {
        const meJson = localStorage.getItem("me");
        if (!meJson) return;

        try {
            const me: AllUser = JSON.parse(meJson);
            setEmail(me.email);
            setUserType(me.userType);
            setAllUser(me);
        } catch (err) {
            console.warn("useUserInfo: JSON.parse error", err);
            setEmail("");
            setUserType("USUARIO");
            setAllUser(null);
        }
    }, []);

    return { email, userType, allUser, setAllUser };
}
