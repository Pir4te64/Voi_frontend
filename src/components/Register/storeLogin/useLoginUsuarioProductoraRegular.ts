// src/hooks/useProductoraRegistration.ts
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { initialValues, validationSchema } from '@/components/Register/data/ProductoraForm';
import { api_url } from '@/api/api';

export const useProductoraRegistration = (onBack: () => void) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const payload = {
                    email: values.email,
                    password: values.password,
                    razonSocial: values.razonSocial,
                    cuit: values.cuit,
                    dni: values.dni,
                    direccion: values.direccion,
                    cbu: values.cbu,
                    termsAndConditions: values.termsAccepted,
                };
                const response = await axios.post(api_url.register_productora, payload);
                console.log('Registro Productora response:', response.data);

                toast.success('Registro exitoso', {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        resetForm();
                        onBack();
                        navigate('/gracias-productora');
                    }
                });
            } catch (error: any) {
                const descriptions: string[] = error.response?.data?.error?.description;
                if (Array.isArray(descriptions)) {
                    descriptions.forEach(desc => {
                        if (desc.startsWith('User with email')) {
                            toast.error(
                                'El usuario con ese correo ya está registrado.',
                                { position: 'top-right', autoClose: 3000 }
                            );
                        } else {
                            console.error('Registro Productora error:', desc);
                        }
                    });
                } else {
                    console.error('Registro Productora error:', error);
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return { formik };
};
