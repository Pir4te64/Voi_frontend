import * as Yup from "yup";

export const editarEventoSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    startDate: Yup.date().required("La fecha de inicio es requerida"),
    endDate: Yup.date()
        .min(
            Yup.ref("startDate"),
            "La fecha de fin debe ser posterior a la fecha de inicio"
        )
        .required("La fecha de fin es requerida"),
    latitud: Yup.string().required("La ubicación es requerida"),
    longitud: Yup.string().required("La ubicación es requerida"),
    category: Yup.number().required("La categoría es requerida"),
}); 