import * as Yup from "yup";

export interface TicketFormValues {
    emailCliente: string;
    nombreCliente: string;
    apellidoCliente: string;
    phoneNumberCliente: string;
    dniCliente: string;
    cantidadTickets: string;
}

export const initialValues: TicketFormValues = {
    emailCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    phoneNumberCliente: "",
    dniCliente: "",
    cantidadTickets: "",
};

export const validationSchema = Yup.object<TicketFormValues>({
    emailCliente: Yup.string()
        .required("El email es obligatorio")
        .email("Debe ser un email válido"),
    nombreCliente: Yup.string()
        .required("El nombre es obligatorio")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres"),
    apellidoCliente: Yup.string()
        .required("El apellido es obligatorio")
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido no puede tener más de 50 caracteres"),
    phoneNumberCliente: Yup.string()
        .required("El teléfono es obligatorio")
        .matches(/^(\+54)?[0-9]{10,11}$/, "Formato: +5437646302423 o 37646302423"),
    dniCliente: Yup.string()
        .required("El DNI es obligatorio")
        .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos"),
    cantidadTickets: Yup.string()
        .required("La cantidad de tickets es obligatoria")
        .matches(/^\d+$/, "Debe ser un número entero")
        .test("min-value", "Debe ser al menos 1 ticket", (value) => {
            const num = parseInt(value);
            return num >= 1;
        })
        .test("max-value", "No puede ser más de 100 tickets", (value) => {
            const num = parseInt(value);
            return num <= 100;
        }),
}); 