// src/components/LoginUser/UsuarioForm.schema.ts
import * as Yup from "yup";

// Valores iniciales para el formulario de usuario
export const initialValues = {
    name: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
    termsAccepted: false,
    dni: "",
};

// Esquema de validación con Yup
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
    dni: Yup.string()
        .required("El DNI es obligatorio")
        .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "Mínimo 8 caracteres"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Repite tu contraseña"),
    termsAccepted: Yup.boolean()
        .oneOf([true], "Debes aceptar los términos"),
});
