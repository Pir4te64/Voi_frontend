// src/components/Dashboard/GestionEventos/CrearEventos/store/crearEvento.schema.ts
import * as Yup from "yup";

export const crearEventoInitialValues = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    category: "",
    social1: "",
    social2: "",
};

export const crearEventoValidationSchema = Yup.object({
    name: Yup.string().required("El nombre del evento es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    startDate: Yup.date()
        .required("La fecha de inicio es requerida")
        .typeError("Fecha inválida"),
    endDate: Yup.date()
        .required("La fecha de finalización es requerida")
        .min(Yup.ref("startDate"), "La fecha de finalización debe ser posterior")
        .typeError("Fecha inválida"),
    location: Yup.string().required("El lugar es requerido"),
    category: Yup.string()
        .typeError("Categoría inválida")
        .required("La categoría es requerida"),
    social1: Yup.string()
        .url("Debe ser una URL válida")
        .required("El link es requerido"),
    social2: Yup.string().url("Debe ser una URL válida").notRequired(),
});
