import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import logoPequeno from '@/assets/Logo.svg';
import logoGrande from '@/assets/LogoGrande.svg';
import FloatingField from '@/components/Dashboard/ComponentesReutilizables/FloatingField';
import { api_url } from '@/api/api';
import axios from 'axios';

const RecuperarPassword: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
            code: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email inválido')
                .required('El email es requerido'),
            newPassword: Yup.string()
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
                )
                .required('La nueva contraseña es requerida'),
            code: Yup.string()
                .length(4, 'El código debe tener 4 caracteres')
                .required('El código es requerido')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(api_url.recuperar_password, values);

                if (response.status === 200) {
                    toast.success('Contraseña actualizada exitosamente', {
                        position: "top-right",
                        autoClose: 3000
                    });
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error al recuperar contraseña:', error);
                toast.error('Error al recuperar la contraseña. Por favor, intenta nuevamente.', {
                    position: "top-right",
                    autoClose: 3000
                });
            }
        }
    });

    return (
        <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
            {/* Columna del formulario */}
            <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
                {/* Logo pequeño top-right */}
                <div className="absolute right-4 top-4">
                    <Link to="/" className="relative h-8 w-8 md:h-16 md:w-16">
                        <span className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-secondary opacity-80 blur-3xl filter md:h-52 md:w-52 md:blur-3xl" />
                        <img
                            src={logoPequeno}
                            alt="Logo Pequeño"
                            className="relative z-10 w-full cursor-pointer object-cover"
                        />
                    </Link>
                </div>

                {/* Formulario */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
                >
                    {/* Back button */}
                    <Link
                        to="/login"
                        className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 md:-top-64 md:left-6 md:h-10 md:w-10 lg:-top-28 lg:left-8 lg:h-8 lg:w-8"
                    >
                        <FaArrowLeft className="text-lg md:text-xl lg:text-xl" />
                    </Link>

                    <h2 className="text-center text-3xl font-bold text-secondary md:text-5xl">
                        Recuperar Contraseña
                    </h2>

                    {/* Email */}
                    <FloatingField label="Email*">
                        <input
                            id="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
                        )}
                    </FloatingField>

                    {/* Nueva Contraseña */}
                    <FloatingField label="Nueva Contraseña*">
                        <input
                            id="newPassword"
                            type="password"
                            {...formik.getFieldProps('newPassword')}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.newPassword}</p>
                        )}
                    </FloatingField>

                    {/* Código */}
                    <FloatingField label="Código de Verificación*">
                        <input
                            id="code"
                            type="text"
                            maxLength={4}
                            {...formik.getFieldProps('code')}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.code && formik.errors.code && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.code}</p>
                        )}
                    </FloatingField>

                    {/* Botón Recuperar */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
                    >
                        {formik.isSubmitting ? 'Procesando…' : 'Recuperar Contraseña'}
                    </button>

                    <div className="text-center">
                        <Link to="/login">
                            ¿Recordaste tu contraseña?{' '}
                            <strong className="text-secondary underline">Iniciar Sesión</strong>
                        </Link>
                    </div>
                </form>
            </div>

            {/* Columna del logo grande */}
            <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                <div className="relative w-full max-w-lg p-8">
                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-secondary opacity-20 blur-3xl filter"></div>
                    <img
                        src={logoGrande}
                        alt="Logo Grande"
                        className="relative z-10 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default RecuperarPassword; 