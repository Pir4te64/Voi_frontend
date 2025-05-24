// src/components/LoginUser/FloatingField.tsx
import React, { ReactElement, isValidElement, cloneElement } from "react";

export const FloatingField: React.FC<{
    label: string;
    children: React.ReactNode;
    htmlFor?: string;
}> = ({ label, children, htmlFor = "" }) => {
    // Añadimos clase peer al input para estilos, y placeholder para no mostrar texto
    let field = children;
    if (isValidElement(children)) {
        field = cloneElement(children as ReactElement<any>, {
            className: `${(children as ReactElement<any>).props.className} peer pt-4`,
            placeholder: " ",
        });
    }

    return (
        <div className="relative">
            <label
                className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-back px-1 text-xs text-gray-400"
                htmlFor={htmlFor}
            >
                {label}
            </label>
            {field}
        </div>
    );
};

export default FloatingField;
