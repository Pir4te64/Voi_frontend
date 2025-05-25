// src/components/Dashboard/GestionEventos/CrearEventos/store/crearEvento.schema.ts
import * as Yup from "yup";

export const crearEventoInitialValues = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    category: 0,
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
    // validamos como número y mayor que cero
    category: Yup.number()
        .typeError("Categoría inválida")
        .min(1, "Debes seleccionar una categoría")
        .required("La categoría es requerida"),
    social1: Yup.string()
        .url("Debe ser una URL válida")
        .notRequired(),
    social2: Yup.string()
        .url("Debe ser una URL válida")
        .notRequired(),
});
