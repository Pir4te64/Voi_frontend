// src/hooks/useUserInfo.js
import { useState, useEffect } from "react";

interface User {
    email: string;
    userType: string;
    allUser: any;
}

export function useUserInfo(): User {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [allUser, setAllUser] = useState([]);
    useEffect(() => {
        const meJson = localStorage.getItem("me");
        if (!meJson) return;

        try {
            const me = JSON.parse(meJson);
            setEmail(me.email || "");
            setUserType(me.userType || "");
            setAllUser(me);
        } catch (err) {
            console.warn("useUserInfo: JSON.parse error", err);
            setEmail("");
            setUserType("");
        }
    }, []);

    return { email, userType, allUser };
}
