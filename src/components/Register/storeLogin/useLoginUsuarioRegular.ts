// src/hooks/useLoginUsuarioRegular.ts
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { validationSchema, initialValues } from '@/components/Register/data/UsuarioForm.schema';
import { api_url } from '@/api/api';

// Traducción de errores comunes
const errorTranslations: Record<string, string> = {
    'Password must contain at least one uppercase letter.':
        'La contraseña debe contener al menos una letra mayúscula.',
    'Password must contain at least one lowercase letter.':
        'La contraseña debe contener al menos una letra minúscula.',
    // Agrega más traducciones si es necesario
};

export const useLoginUsuarioRegular = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                // 1. Registro
                const payload = {
                    email: values.email,
                    password: values.password,
                    firstName: values.name,
                    lastName: values.apellido,
                    termsAndConditions: values.termsAccepted,
                };
                await axios.post(api_url.register_user, payload);

                // 2. Inicio de sesión automático
                const loginRes = await axios.post(api_url.login, {
                    email: values.email,
                    password: values.password,
                });

                const { idUser, idProfile, userType, accessToken, refreshToken } = loginRes.data;
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ idUser, idProfile, userType, accessToken, refreshToken })
                );

                // 3. Mostrar toast y luego reset, onBack y redirección
                toast.success('Registro e inicio de sesión exitosos', {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        resetForm();
                        window.location.href = '/';
                    },
                });
            } catch (error: any) {
                const descriptions: string[] = error.response?.data?.error?.description;
                if (Array.isArray(descriptions)) {
                    const messages = descriptions
                        .map((msg) => errorTranslations[msg] || msg)
                        .join('\n');
                    toast.error(messages, { position: 'top-right', autoClose: 5000 });
                } else {
                    toast.error(
                        error.response?.data?.message || 'No se pudo registrar el usuario',
                        { position: 'top-right', autoClose: 3000 }
                    );
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return { showPassword, setShowPassword, formik };
};
