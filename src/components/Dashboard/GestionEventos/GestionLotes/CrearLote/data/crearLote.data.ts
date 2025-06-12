import * as Yup from "yup";

export interface LoteFormData {
    nombre: string;
    precio: number;
    fechaValidez: string;
    tipoComision: "MONTO_FIJO" | "PORCENTAJE";
    montoFijo: number;
    porcentaje: number;
    cantidadTickets: number;
}
export interface CrearLoteUIProps {
    eventName: string;
    eventId: number;
    onBack: () => void;
    onLoteCreated: () => void;
}

export const initialSchema: LoteFormData = {
    nombre: "",
    precio: 0,
    fechaValidez: "",
    tipoComision: "MONTO_FIJO",
    montoFijo: 0,
    porcentaje: 0,
    cantidadTickets: 0,
};

export const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .required("El nombre del lote es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres"),

    precio: Yup.number()
        .required("El precio es requerido")
        .min(0, "El precio no puede ser negativo")
        .max(1000000, "El precio no puede ser mayor a 1,000,000"),

    fechaValidez: Yup.string()
        .required("La fecha de validez es requerida")
        .test(
            "fecha-futura",
            "La fecha debe ser futura",
            (value) => new Date(value) > new Date()
        ),

    tipoComision: Yup.string()
        .oneOf(["MONTO_FIJO", "PORCENTAJE"], "Tipo de comisión inválido")
        .required("El tipo de comisión es requerido"),

    montoFijo: Yup.number()
        .when("tipoComision", {
            is: "MONTO_FIJO",
            then: (schema) =>
                schema
                    .required("El monto fijo es requerido")
                    .min(0, "El monto no puede ser negativo")
                    .max(1000000, "El monto no puede ser mayor a 1,000,000"),
            otherwise: (schema) => schema.notRequired(),
        }),

    porcentaje: Yup.number()
        .when("tipoComision", {
            is: "PORCENTAJE",
            then: (schema) =>
                schema
                    .required("El porcentaje es requerido")
                    .min(0, "El porcentaje no puede ser negativo")
                    .max(100, "El porcentaje no puede ser mayor a 100"),
            otherwise: (schema) => schema.notRequired(),
        }),

    cantidadTickets: Yup.number()
        .required("La cantidad de tickets es requerida")
        .min(1, "Debe haber al menos 1 ticket")
        .max(10000, "No puede haber más de 10,000 tickets")
        .integer("La cantidad debe ser un número entero"),
}); 