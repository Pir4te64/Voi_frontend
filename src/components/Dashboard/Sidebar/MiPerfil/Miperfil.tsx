// src/components/Dashboard/MiPerfil/Miperfil.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { useUserInfo, AllUser } from "@/context/useUserInfo";
import { api_url } from "@/api/api";
import { GETME } from "@/api/api";

type UserType = "PRODUCTORA" | "REVENDEDOR" | "USUARIO" | "ADMIN";

const fieldsConfig: Record<
    UserType,
    { name: keyof AllUser; label: string; type?: string }[]
> = {
    PRODUCTORA: [
        { name: "razonSocial", label: "Razón Social" },
        { name: "cuit", label: "CUIT" }
    ],
    REVENDEDOR: [
        { name: "name", label: "Nombre" },
        { name: "lastName", label: "Apellido" },
        { name: "phoneNumber", label: "Teléfono de contacto", type: "tel" }
    ],
    USUARIO: [
        { name: "firstName", label: "Nombre" },
        { name: "lastName", label: "Apellido" }
    ],
    ADMIN: [
        { name: "name", label: "Nombre" },
        { name: "lastName", label: "Apellido" }
    ]
};

const Miperfil: React.FC = () => {
    const { email, userType, allUser, setAllUser } = useUserInfo();
    const [formValues, setFormValues] = useState<Partial<Record<keyof AllUser, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!allUser) return;
        const initial: Partial<Record<keyof AllUser, string>> = {};
        fieldsConfig[userType].forEach(({ name }) => {
            initial[name] = allUser[name]?.toString() ?? "";
        });
        setFormValues(initial);
    }, [allUser, userType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth')!).accessToken
                : null;

            const payload = {
                email,
                ...formValues
            };

            await axios.put(
                api_url.update_profile,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const response = await GETME();
            await setAllUser(response.data);

            // Esperar a que los datos se actualicen antes de limpiar los campos
            const initial: Partial<Record<keyof AllUser, string>> = {};
            fieldsConfig[userType].forEach(({ name }) => {
                initial[name] = response.data[name]?.toString() ?? "";
            });
            await setFormValues(initial);

            toast.success('Perfil actualizado correctamente');
            // Esperar un momento para asegurar que los datos se hayan actualizado
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error: any) {
            console.error('Error al actualizar perfil:', error);
            const message = error.response?.data?.message || 'Error al actualizar el perfil';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-lg bg-primary p-6 text-white">
            <h2 className="mb-6 text-2xl font-semibold text-secondary">
                Mi Perfil
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {fieldsConfig[userType].map(({ name, label, type }) => (
                    <FloatingField key={name} label={label}>
                        <input
                            name={name}
                            type={type ?? "text"}
                            value={(formValues[name] as string) ?? ""}
                            onChange={handleChange}
                            placeholder=" "
                            disabled={isLoading}
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none disabled:opacity-50"
                        />
                    </FloatingField>
                ))}

                <FloatingField label="Email">
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 text-gray-600"
                    />
                </FloatingField>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full rounded-xl bg-secondary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span className="ml-2">Guardando...</span>
                        </div>
                    ) : (
                        "Guardar Perfil"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Miperfil;
