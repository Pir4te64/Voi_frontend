// src/components/LoginUser/Register.tsx
import React, { useState } from "react";
import AccountTypeSelector from "@/components/Register/AccountTypeSelector";
import ProductoraForm from "@/components/Register/ProductoraForm";
import UsuarioForm from "@/components/Register/UsuarioForm";

type AccountType = "" | "Productora" | "Usuario";

const Register: React.FC = () => {
    const [accountType, setAccountType] = useState<AccountType>("");
    const [selectedType, setSelectedType] = useState<AccountType>("");

    // 1) Si no hay tipo seleccionado, muestro el selector
    if (!accountType) {
        return (
            <AccountTypeSelector
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                setAccountType={setAccountType}
            />
        );
    }

    // 2) Si eligió “Productora”, delego a ProductoraForm
    if (accountType === "Productora") {
        return (
            <ProductoraForm
                onBack={() => {
                    setAccountType("");
                    setSelectedType("");
                }}
            />
        );
    }

    // 3) Si eligió “Usuario”, delego a UsuarioForm
    return (
        <UsuarioForm
            onBack={() => {
                setAccountType("");
                setSelectedType("");
            }}
        />
    );
};

export default Register;
