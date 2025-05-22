// src/components/LoginUser/ProductoraForm.schema.ts
import * as Yup from "yup";

export const initialValues = {
    razonSocial: "",
    cuit: "",
    dni: "",
    direccion: "",
    cbu: "",
    termsAccepted: false as boolean,
};

export const validationSchema = Yup.object({
    razonSocial: Yup.string()
        .required("La razón social es obligatoria")
        .max(100, "Máximo 100 caracteres"),
    cuit: Yup.string()
        .required("El CUIT/CUIL es obligatorio")
        .matches(/^[0-9]{11}$/, "Debe tener 11 dígitos numéricos"),
    dni: Yup.string()
        .required("El DNI es obligatorio")
        .matches(/^[0-9]{7,8}$/, "Debe tener entre 7 y 8 dígitos"),
    direccion: Yup.string()
        .required("La dirección es obligatoria")
        .max(150, "Máximo 150 caracteres"),
    cbu: Yup.string()
        .required("El CBU es obligatorio")
        .matches(/^[0-9]{22}$/, "Debe tener 22 dígitos numéricos"),
    termsAccepted: Yup.boolean()
        .oneOf([true], "Debes aceptar los términos y condiciones"),
});
