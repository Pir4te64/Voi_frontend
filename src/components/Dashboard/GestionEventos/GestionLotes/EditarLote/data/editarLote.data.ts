import * as Yup from "yup";

export interface EditarLoteFormData {
    nombre: string;
    precio: number;
    fechaValidez: string;
    tipoComision: "MONTO_FIJO" | "PORCENTAJE";
    montoFijo: number;
    porcentaje: number;
    cantidadTickets: number;
}

export const editarValidationSchema = Yup.object().shape({
    cantidadTickets: Yup.number()
        .required("La cantidad de tickets es requerida")
        .min(1, "Debe haber al menos 1 ticket")
        .max(50000, "No puede haber más de 50,000 tickets")
        .integer("La cantidad debe ser un número entero"),
}); 