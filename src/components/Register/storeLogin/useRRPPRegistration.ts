// src/hooks/useRRPPRegistration.ts
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { initialValues, validationSchema } from '@/components/Register/data/RRPPForm.schema';
import { api_url } from '@/api/api';

export const useRRPPRegistration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                // 1. Registro de revendedor
                const payload = {
                    email: values.email,
                    password: values.password,
                    nombre: values.name,
                    apellido: values.apellido,
                    phoneNumber: values.phoneNumber,
                    termsAndConditions: values.termsAccepted,
                };
                await axios.post(api_url.register_revendedor, payload);

                // 2. Login automático
                const loginRes = await axios.post(api_url.login, {
                    email: values.email,
                    password: values.password,
                });
                const authData = loginRes.data;
                login(authData);

                // 3. Toast y redirección tras cerrarlo
                toast.success('Registro e inicio de sesión exitosos', {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        resetForm();
                        navigate('/');
                    },
                });
            } catch (error: any) {
                const descriptions: string[] = error.response?.data?.error?.description;
                if (Array.isArray(descriptions)) {
                    descriptions.forEach(desc => {
                        if (desc.startsWith('User with email')) {
                            toast.error('El usuario con ese correo ya está registrado.', {
                                position: 'top-right',
                                autoClose: 3000,
                            });
                        } else {
                            toast.error(desc, { position: 'top-right', autoClose: 3000 });
                        }
                    });
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
