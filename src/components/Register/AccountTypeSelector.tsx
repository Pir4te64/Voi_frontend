// src/components/AccountTypeSelector.tsx
import React from "react";
import { Link } from "react-router-dom";
import Logos from "@/components/LoginUser/Logos";
import SmallLogo from "@/components/Register/SmallLogo";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import logoPequeno from "@/assets/Logo.svg";

type AccountType = "" | "Productora" | "RRPP" | "Usuario";

interface AccountTypeSelectorProps {
    selectedType: AccountType;
    setSelectedType: (type: AccountType) => void;
    setAccountType: (type: AccountType) => void;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
    selectedType,
    setSelectedType,
    setAccountType,
}) => {
    return (
        <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
            <Logos />
            <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
                <SmallLogo src={logoPequeno} />

                <div className="mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:p-6 lg:max-w-xl">
                    <h2 className="mb-6 text-center text-2xl font-bold text-secondary md:text-4xl lg:text-6xl">
                        Elige tu tipo de cuenta
                    </h2>

                    <FloatingField label="Tipo de cuenta*">
                        <select
                            value={selectedType}
                            onChange={(e) =>
                                setSelectedType(e.target.value as AccountType)
                            }
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Productora">Productora</option>
                            <option value="RRPP">RRPP</option>
                            <option value="Usuario Único">Usuario</option>
                        </select>
                    </FloatingField>

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <button
                            type="button"
                            onClick={() => setAccountType(selectedType)}
                            disabled={!selectedType}
                            className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
                        >
                            Continuar
                        </button>

                        <Link
                            to="/"
                            className="mt-4 w-full py-3 text-center transition hover:underline"
                        >
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountTypeSelector;
