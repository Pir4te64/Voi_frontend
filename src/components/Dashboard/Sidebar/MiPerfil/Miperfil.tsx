// src/components/Dashboard/MiPerfil/Miperfil.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { useUserInfo, AllUser, UserType } from "@/context/useUserInfo";

const fieldsConfig: Record<
    UserType,
    { name: keyof AllUser; label: string; type?: string }[]
> = {
    PRODUCTORA: [
        { name: "razonSocial", label: "Razón Social" },
        { name: "cuit", label: "CUIT" },
        { name: "dni", label: "DNI" },
        { name: "direccion", label: "Dirección" },
        { name: "cbu", label: "CBU" },
        { name: "status", label: "Estado" },
    ],
    REVENDEDOR: [
        { name: "name", label: "Nombre" },
        { name: "lastName", label: "Apellido" },
        { name: "phoneNumber", label: "Teléfono de contacto", type: "tel" },
    ],
    USUARIO: [
        { name: "firstName", label: "Nombre" },
        { name: "lastName", label: "Apellido" },
    ],
};

const Miperfil: React.FC = () => {
    const { email, userType, allUser } = useUserInfo();
    const [formValues, setFormValues] = useState<Partial<Record<keyof AllUser, string>>>({});

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            userType,
            email,
            ...formValues,
        };

        console.log("Payload a enviar:", payload);
        // Aquí llamás a tu API con fetch o axios…
    };

    return (
        <div className="rounded-lg bg-primary p-6 text-white">
            <h2 className="mb-6 text-2xl font-semibold text-secondary">
                Mi Perfil ({userType})
            </h2>

            <div className="grid grid-cols-1 gap-6">
                {/* Formulario Dinámico */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {fieldsConfig[userType].map(({ name, label, type }) => (
                        <FloatingField key={name} label={label}>
                            <input
                                name={name}
                                type={type ?? "text"}
                                value={(formValues[name] as string) ?? ""}
                                onChange={handleChange}
                                placeholder=" "
                                className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                            />
                        </FloatingField>
                    ))}

                    {/* Email (solo lectura) */}
                    <FloatingField label="Email">
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6"
                        />
                    </FloatingField>

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-secondary py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Guardar Perfil
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Miperfil;
