// src/components/LoginUser/data/login.schema.ts
import * as Yup from 'yup';

export interface LoginFormValues {
    email: string;
    password: string;
}

export const loginInitialValues: LoginFormValues = {
    email: '',
    password: '',
};

export const loginValidationSchema = Yup.object<LoginFormValues>({
    email: Yup.string()
        .email('Debe ser un email válido')
        .required('El email es requerido'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es requerida'),
});
