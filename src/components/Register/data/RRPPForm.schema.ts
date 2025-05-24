// src/components/Register/RRPPForm.schema.ts
import * as Yup from "yup";

// Valores iniciales para el formulario de Relaciones Públicas
export const initialValues = {
    name: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
    termsAccepted: false,
    phoneNumber: "",
};

// Esquema de validación con Yup para RRPPForm
export const validationSchema = Yup.object({
    name: Yup.string()
        .required("El nombre es obligatorio")
        .max(50, "Máximo 50 caracteres"),
    apellido: Yup.string()
        .required("El apellido es obligatorio")
        .max(50, "Máximo 50 caracteres"),
    email: Yup.string()
        .required("El email es obligatorio")
        .email("Formato de email inválido"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "Mínimo 8 caracteres"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Repite tu contraseña"),
    termsAccepted: Yup.boolean()
        .oneOf([true], "Debes aceptar los términos"),
    phoneNumber: Yup.string()
        .required("El número de teléfono es obligatorio")
        .matches(/^[0-9]{10}$/, "Debe tener exactamente 10 dígitos numéricos"),
});
