// src/store/useUsuarioFormStore.ts
import { create } from "zustand";

interface UsuarioFormState {
    name: string;
    apellido: string;
    email: string;
    password: string;
    repeatPassword: string;
    termsAccepted: boolean;

    setName: (name: string) => void;
    setApellido: (apellido: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setRepeatPassword: (repeat: string) => void;
    setTermsAccepted: (accepted: boolean) => void;

    reset: () => void;
}

const useUsuarioFormStore = create<UsuarioFormState>((set) => ({
    name: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
    termsAccepted: false,

    setName: (name) => set({ name }),
    setApellido: (apellido) => set({ apellido }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setRepeatPassword: (repeatPassword) => set({ repeatPassword }),
    setTermsAccepted: (termsAccepted) => set({ termsAccepted }),

    reset: () =>
        set({
            name: "",
            apellido: "",
            email: "",
            password: "",
            repeatPassword: "",
            termsAccepted: false,
        }),
}));

export default useUsuarioFormStore;
